// Configurações para o sistema de envio de emails
export const emailConfig = {
  // Configurações do Resend
  from: {
    // Para desenvolvimento, use resend.dev
    // Para produção, configure seu domínio verificado
    email: "noreply@resend.dev",
    name: "Portfólio",
  },

  // Para onde os emails serão enviados
  to: ["matheus@flyntdev.com.br"],

  // Rate limiting
  rateLimit: {
    maxEmails: 3, // máximo de emails por janela de tempo
    windowMs: 60 * 60 * 1000, // 1 hora em millisegundos
  },

  // Validação de formulário
  validation: {
    name: {
      minLength: 2,
      maxLength: 100,
    },
    subject: {
      minLength: 3,
      maxLength: 200,
    },
    message: {
      minLength: 10,
      maxLength: 2000,
    },
  },

  // Configurações de segurança
  security: {
    // Padrões simples para detecção de spam
    spamPatterns: [
      /viagra/i,
      /casino/i,
      /lottery/i,
      /winner/i,
      /congratulations.*million/i,
      /click.*here.*now/i,
      /free.*money/i,
      /earn.*\$.*fast/i,
    ],

    // Domínios bloqueados (emails temporários comuns)
    blockedDomains: [
      "10minutemail.com",
      "tempmail.org",
      "guerrillamail.com",
      "mailinator.com",
    ],
  },

  // Template do email
  template: {
    colors: {
      primary: "#0891b2",
      background: "#f8fafc",
      cardBackground: "#ffffff",
      textPrimary: "#1f2937",
      textSecondary: "#4b5563",
      textMuted: "#6b7280",
    },
  },
};

export default emailConfig;
