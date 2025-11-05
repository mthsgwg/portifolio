# Configuração do Resend para Envio de Emails

## Como configurar o Resend no seu portfólio

### 1. Criar conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Obter a API Key

1. No dashboard do Resend, vá para "API Keys"
2. Clique em "Create API Key"
3. Dê um nome para sua chave (ex: "Portfolio Contact Form")
4. Selecione as permissões necessárias (sending emails)
5. Copie a chave gerada

### 3. Configurar domínio (Recomendado)

Para envios em produção, é recomendado verificar um domínio:

1. No dashboard, vá para "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio (ex: flyntdev.com.br)
4. Adicione os registros DNS fornecidos pelo Resend
5. Aguarde a verificação (pode levar até 48h)

### 4. Configurar variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione sua chave:
   ```
   RESEND_API_KEY=re_sua_chave_aqui
   ```

### 5. Configurações importantes

- **From Email**: O email deve ser do domínio verificado ou usar resend.dev
- **Reply-to**: Configurado automaticamente com o email do usuário
- **Rate Limits**:
  - Plano gratuito: 100 emails/dia, 3000 emails/mês
  - Plano pago: Consulte a documentação

### 6. Testando o envio

1. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

2. Acesse o formulário de contato
3. Preencha e envie uma mensagem de teste
4. Verifique se o email chegou na sua caixa de entrada

### 7. Monitoramento

- Acesse o dashboard do Resend para ver logs de envio
- Monitore bounces, reclamações e estatísticas
- Configure webhooks se necessário

## Estrutura dos arquivos

```
app/
├── api/
│   └── send-email/
│       └── route.ts          # API route para envio de emails
├── components/
│   └── sections/
│       └── contact.tsx       # Formulário de contato atualizado
└── .env.example              # Exemplo de variáveis de ambiente
```

## Funcionalidades implementadas

✅ Validação de formulário  
✅ Sanitização de dados  
✅ Template HTML responsivo  
✅ Tratamento de erros  
✅ Loading states  
✅ Toast notifications  
✅ Reply-to automático  
✅ Escape de HTML para segurança

## Customizações possíveis

### Template de email

Edite o HTML no arquivo `app/api/send-email/route.ts` para personalizar:

- Cores e estilo
- Logo da empresa
- Informações adicionais
- Formatação da mensagem

### Validações

Adicione validações extras no backend:

- Captcha/reCAPTCHA
- Rate limiting por IP
- Blacklist de domínios
- Verificação de spam

### Notificações

Configure webhooks para:

- Confirmação de entrega
- Tracking de abertura
- Notificações de bounce
