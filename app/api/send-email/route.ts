import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import emailConfig from "@/lib/email-config";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting simples (em produção, use Redis ou banco de dados)
const emailAttempts = new Map<string, { count: number; lastAttempt: number }>();

function cleanOldAttempts() {
  const now = Date.now();
  for (const [ip, data] of emailAttempts.entries()) {
    if (now - data.lastAttempt > emailConfig.rateLimit.windowMs) {
      emailAttempts.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  cleanOldAttempts();
  const attempts = emailAttempts.get(ip);
  if (!attempts) return false;

  const now = Date.now();
  if (now - attempts.lastAttempt > emailConfig.rateLimit.windowMs) {
    emailAttempts.delete(ip);
    return false;
  }

  return attempts.count >= emailConfig.rateLimit.maxEmails;
}

function recordAttempt(ip: string) {
  const now = Date.now();
  const attempts = emailAttempts.get(ip);

  if (
    !attempts ||
    now - attempts.lastAttempt > emailConfig.rateLimit.windowMs
  ) {
    emailAttempts.set(ip, { count: 1, lastAttempt: now });
  } else {
    emailAttempts.set(ip, { count: attempts.count + 1, lastAttempt: now });
  }
}
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    // Verificar rate limiting
    const ip =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitos emails enviados. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const { name, email, subject, message } = await request.json();

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de tipos
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Validação de tamanho
    if (
      name.length > emailConfig.validation.name.maxLength ||
      subject.length > emailConfig.validation.subject.maxLength ||
      message.length > emailConfig.validation.message.maxLength
    ) {
      return NextResponse.json(
        { error: "Dados muito longos" },
        { status: 400 }
      );
    }

    // Validação de tamanho mínimo
    if (
      name.length < emailConfig.validation.name.minLength ||
      subject.length < emailConfig.validation.subject.minLength ||
      message.length < emailConfig.validation.message.minLength
    ) {
      return NextResponse.json(
        { error: "Dados muito curtos" },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Verificação de domínios bloqueados
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (emailConfig.security.blockedDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Email temporário não permitido" },
        { status: 400 }
      );
    }

    // Verificação básica de spam
    const fullText = `${name} ${subject} ${message}`.toLowerCase();
    if (
      emailConfig.security.spamPatterns.some((pattern) =>
        pattern.test(fullText)
      )
    ) {
      return NextResponse.json(
        { error: "Mensagem não permitida" },
        { status: 400 }
      );
    }

    // Sanitizar dados
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedSubject = sanitizeHtml(subject.trim());
    const sanitizedMessage = sanitizeHtml(message.trim());

    // Registrar tentativa
    recordAttempt(ip);

    // Enviar email
    const data = await resend.emails.send({
      from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
      to: emailConfig.to,
      subject: `[PORTFÓLIO] ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <div style="background-color: #0891b2; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nova Mensagem do Portfólio</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">Detalhes do Contato:</h2>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Nome:</strong> ${sanitizedName}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Assunto:</strong> ${sanitizedSubject}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>IP:</strong> ${ip}</p>
              <p style="margin: 5px 0; color: #4b5563;"><strong>Data:</strong> ${new Date().toLocaleString(
                "pt-BR"
              )}</p>
            </div>
            
            <div style="margin-top: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Mensagem:</h2>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #0891b2;">
                <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap;">${sanitizedMessage}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Esta mensagem foi enviada através do formulário de contato do seu portfólio.
              </p>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                Responda diretamente para o email: <strong>${email}</strong>
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Email enviado com sucesso!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
