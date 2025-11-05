"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailConfig from "@/lib/email-config";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (
      !formData.name.trim() ||
      formData.name.length < emailConfig.validation.name.minLength
    ) {
      errors.push(
        `Nome deve ter pelo menos ${emailConfig.validation.name.minLength} caracteres`
      );
    }

    if (!formData.email.trim()) {
      errors.push("Email é obrigatório");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push("Email inválido");
      }

      // Verificar domínios bloqueados
      const emailDomain = formData.email.split("@")[1]?.toLowerCase();
      if (emailConfig.security.blockedDomains.includes(emailDomain)) {
        errors.push("Email temporário não permitido");
      }
    }

    if (
      !formData.subject.trim() ||
      formData.subject.length < emailConfig.validation.subject.minLength
    ) {
      errors.push(
        `Assunto deve ter pelo menos ${emailConfig.validation.subject.minLength} caracteres`
      );
    }

    if (
      !formData.message.trim() ||
      formData.message.length < emailConfig.validation.message.minLength
    ) {
      errors.push(
        `Mensagem deve ter pelo menos ${emailConfig.validation.message.minLength} caracteres`
      );
    }

    // Verificar tamanhos máximos
    if (formData.name.length > emailConfig.validation.name.maxLength) {
      errors.push(
        `Nome muito longo (máximo ${emailConfig.validation.name.maxLength} caracteres)`
      );
    }

    if (formData.subject.length > emailConfig.validation.subject.maxLength) {
      errors.push(
        `Assunto muito longo (máximo ${emailConfig.validation.subject.maxLength} caracteres)`
      );
    }

    if (formData.message.length > emailConfig.validation.message.maxLength) {
      errors.push(
        `Mensagem muito longa (máximo ${emailConfig.validation.message.maxLength} caracteres)`
      );
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulário
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Mensagem enviada com sucesso! Em breve entrarei em contato."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (response.status === 429) {
        toast.error("Limite de emails atingido. Tente novamente em 1 hora.");
      } else {
        toast.error(
          result.error || "Erro ao enviar mensagem. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast.error("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-950/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Vamos <span className="text-cyan-400">Conversar</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tem um projeto em mente? Estou sempre aberto a novas oportunidades e
            desafios
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Entre em Contato
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Estou sempre interessado em projetos desafiadores e
                oportunidades de colaboração. Vamos criar algo incrível juntos!
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-border transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-300 text-sm">
                    matheus@flyntdev.com.br
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-border transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Localização</h4>
                  <p className="text-gray-300 text-sm">Brasil - MG</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-border transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Disponibilidade</h4>
                  <p className="text-gray-300 text-sm">
                    Segunda a Sexta, 9h - 18h
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8"
            >
              <h4 className="text-white font-semibold mb-4">
                Me siga nas redes
              </h4>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    window.open("https://github.com/mthsgwg", "_blank")
                  }
                  className="rounded-full border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                >
                  <Github className="w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/matheus-faria-984a37187/",
                      "_blank"
                    )
                  }
                  className="rounded-full border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300"
                  >
                    Nome *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={emailConfig.validation.name.maxLength}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="Seu nome completo"
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {formData.name.length}/
                    {emailConfig.validation.name.maxLength}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-300"
                >
                  Assunto *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  maxLength={emailConfig.validation.subject.maxLength}
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Sobre o que você gostaria de conversar?"
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.subject.length}/
                  {emailConfig.validation.subject.maxLength}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300"
                >
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={emailConfig.validation.message.maxLength}
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400 resize-none"
                  placeholder="Conte-me sobre seu projeto ou ideia..."
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.message.length}/
                  {emailConfig.validation.message.maxLength}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center pt-20 border-t border-gray-800 mt-20"
        >
          <p className="text-gray-400">
            © 2025 Matheus Faria. Feito com{" "}
            <span className="text-cyan-400">♥</span> usando NextJS e TypeScript.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
