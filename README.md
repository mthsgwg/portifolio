# 🚀 Portfólio Pessoal - Matheus Faria

Um portfólio moderno e responsivo desenvolvido com Next.js 14, TypeScript e Tailwind CSS, featuring animações suaves, design elegante e funcionalidades avançadas.

![Portfolio Preview](https://via.placeholder.com/800x400/0891b2/ffffff?text=Portfolio+Preview)

## ✨ Funcionalidades

### 🎨 **Interface & Design**

- ✅ Design responsivo e moderno
- ✅ Animações fluídas com Framer Motion
- ✅ Tema escuro com gradientes e efeitos glassmorphism
- ✅ Componentes reutilizáveis com Radix UI
- ✅ Icons elegantes com Lucide React

### 📧 **Sistema de Contato**

- ✅ Formulário de contato integrado com Resend
- ✅ Validação em tempo real (frontend + backend)
- ✅ Rate limiting e proteção contra spam
- ✅ Templates de email profissionais
- ✅ Notificações toast com Sonner

### 🛠 **Funcionalidades Técnicas**

- ✅ Server-side rendering com Next.js 14
- ✅ TypeScript para type safety
- ✅ Banco de dados com Prisma ORM
- ✅ Autenticação com NextAuth.js
- ✅ Upload de arquivos com AWS S3
- ✅ Charts e visualizações com Chart.js
- ✅ Gerenciamento de estado com Zustand

### 🔒 **Segurança**

- ✅ Sanitização de dados
- ✅ Validação robusta de formulários
- ✅ Rate limiting por IP
- ✅ Proteção contra XSS
- ✅ Bloqueio de emails temporários

## 🛠 Tech Stack

### **Frontend**

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - Components

### **Backend & Database**

- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Resend](https://resend.com/) - Email Service

### **Infrastructure**

- [AWS S3](https://aws.amazon.com/s3/) - File Storage
- [Vercel](https://vercel.com/) - Deployment
- [PostgreSQL](https://www.postgresql.org/) - Database

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm
- PostgreSQL (local ou cloud)
- Conta no Resend para emails

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/mthsgwg/portfolio.git
   cd portfolio
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env.local
   ```

   Edite o `.env.local` com suas configurações:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

   # Resend (Email)
   RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # AWS S3 (opcional)
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="your-bucket-name"
   ```

4. **Configure o banco de dados:**

   ```bash
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

5. **Execute em desenvolvimento:**

   ```bash
   pnpm dev
   ```

6. **Acesse o projeto:**
   ```
   http://localhost:3000
   ```

## 📧 Configuração do Email (Resend)

Para configurar o sistema de envio de emails, consulte o [RESEND_SETUP.md](./RESEND_SETUP.md) para instruções detalhadas.

### Resumo rápido:

1. Crie uma conta em [resend.com](https://resend.com)
2. Obtenha sua API key
3. Adicione a chave no `.env.local`
4. Configure seu domínio (recomendado para produção)

## 📁 Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── send-email/    # Endpoint de envio de email
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes React
│   ├── sections/         # Seções do portfólio
│   │   ├── about.tsx     # Seção sobre
│   │   ├── contact.tsx   # Formulário de contato
│   │   ├── hero.tsx      # Hero section
│   │   ├── projects.tsx  # Projetos
│   │   └── skills.tsx    # Habilidades
│   └── ui/               # Componentes base (Radix UI)
├── hooks/                # React hooks customizados
├── lib/                  # Utilitários e configurações
│   ├── email-config.ts   # Configurações de email
│   ├── types.ts          # Definições de tipos
│   ├── utils.ts          # Funções utilitárias
│   └── db.ts            # Configuração do banco
├── prisma/              # Prisma schema e migrations
├── public/              # Arquivos estáticos
└── README.md           # Este arquivo
```

## 🎨 Customização

### **Cores e Tema**

Edite o arquivo `tailwind.config.ts` para personalizar as cores:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#0891b2", // Cyan
        secondary: "#1f2937", // Gray
        accent: "#06b6d4", // Cyan Light
      },
    },
  },
};
```

### **Configurações de Email**

Modifique `lib/email-config.ts` para ajustar validações e templates:

```typescript
export const emailConfig = {
  validation: {
    name: { minLength: 2, maxLength: 100 },
    subject: { minLength: 3, maxLength: 200 },
    message: { minLength: 10, maxLength: 2000 },
  },
  rateLimit: {
    maxEmails: 3,
    windowMs: 60 * 60 * 1000, // 1 hora
  },
};
```

### **Conteúdo das Seções**

Edite os componentes em `components/sections/` para personalizar:

- **Hero:** Sua apresentação principal
- **About:** Informações sobre você
- **Skills:** Suas habilidades técnicas
- **Projects:** Seus projetos em destaque
- **Contact:** Informações de contato

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento

# Build e Deploy
pnpm build        # Build para produção
pnpm start        # Inicia servidor de produção
pnpm lint         # Executa linting

# Database
pnpm prisma:dev   # Executa migrations em dev
pnpm prisma:reset # Reset do banco de dados
pnpm prisma:studio # Interface visual do Prisma
```

## 🚀 Deploy

### **Vercel (Recomendado)**

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push

### **Outras Plataformas**

- **Netlify:** Configure build command como `pnpm build`
- **Railway:** Ideal para projetos com banco de dados
- **DigitalOcean:** Para maior controle de infraestrutura

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 📞 Contato

**Matheus Faria**

- Email: matheus@flyntdev.com.br
- LinkedIn: [@matheus-faria-984a37187](https://www.linkedin.com/in/matheus-faria-984a37187/)
- GitHub: [@mthsgwg](https://github.com/mthsgwg)
- Website: [flyntdev.com.br](https://flyntdev.com.br)

---

⭐ **Se este projeto te ajudou, deixe uma star!** ⭐

## 🙏 Agradecimentos

- [Vercel](https://vercel.com) pelo hosting gratuito
- [Resend](https://resend.com) pelo serviço de email
- [Radix UI](https://radix-ui.com) pelos componentes acessíveis
- [Lucide](https://lucide.dev) pelos ícones elegantes
- Comunidade open source pelo conhecimento compartilhado

---

<div align="center">
  <p>Desenvolvido com ❤️ por Matheus Faria</p>
  <p>© 2024 - Todos os direitos reservados</p>
</div>
