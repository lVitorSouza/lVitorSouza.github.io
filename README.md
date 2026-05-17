# lVitorSouza.github.io
<div align="center">

# ✦ Vitu Studio

**Portfólio de Vítor Gabriel — Ilustração Digital · Edição · Identidade Visual**

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-black?style=flat-square&logo=github)](https://lVitorSouza.github.io)
[![LGPD](https://img.shields.io/badge/LGPD-conforme-4a7c59?style=flat-square)](https://lVitorSouza.github.io)
[![License](https://img.shields.io/badge/licença-MIT-b8a898?style=flat-square)](LICENSE)
</div>

---

## Sobre o projeto

Site de portfólio profissional da **Vitu Studio**, estúdio criativo de Vítor Gabriel, sediado em Londrina, PR. O projeto reúne trabalhos de ilustração digital e mista, edição fotográfica e identidade visual, com sistema de briefing integrado e formulário de contato seguro.

**Acesse:** [lVitorSouza.github.io](https://lVitorSouza.github.io)

---

## Tecnologias

- **Front-end:** HTML5, CSS3 vanilla, JavaScript ES6+
- **Back-end:** Node.js + Express
- **E-mail:** Nodemailer + Gmail SMTP
- **Deploy:** Vercel (Serverless)
- **Formulário de briefing:** Google Forms (embedded)
- **Fontes:** Cormorant Garamond + Jost (Google Fonts)

---

## Funcionalidades

- Galeria de projetos com filtro por categoria (Ilustração, Edição, Identidade Visual)
- Modal de portfólio com navegação por teclado e gestos
- Formulário de contato com proteções de segurança em camadas
- Página de briefing com Google Forms integrado
- Seção de privacidade em conformidade com a LGPD
- Cursor personalizado e animações de scroll suaves
- Design responsivo para mobile, tablet e desktop

---

## Segurança

O formulário de contato conta com três camadas de proteção:

| Proteção | Descrição |
|---|---|
| **Honeypot** | Campo oculto que detecta e bloqueia bots automaticamente |
| **Rate Limiting** | Máximo de 5 envios por IP a cada 15 minutos |
| **Sanitização** | Escape de HTML em todos os campos para prevenção de XSS |

---

## Estrutura do projeto

```
vitu-studio/
├── public/
│   └── (imagens do portfólio)
├── index.html       # Página principal
├── briefing.html    # Página de briefing
├── script.js        # Lógica do front-end
├── server.js        # API de contato (Node.js + Express)
├── vercel.json      # Configuração de deploy
├── package.json
└── .env             # Variáveis de ambiente (não versionado)
```

---

## Como rodar localmente

**1. Clone o repositório**
```bash
git clone https://github.com/lVitorSouza/lVitorSouza.github.io.git
cd lVitorSouza.github.io
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail
```

**4. Inicie o servidor**
```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## Deploy na Vercel

1. Faça o fork ou importe o repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no painel da Vercel:
   - `EMAIL_USER`
   - `EMAIL_PASS`
3. Deploy automático a cada push na branch `main`

---

## Contato

| Canal | Link |
|---|---|
| Instagram | [@studio_vitu](https://instagram.com/studio_vitu) |
| WhatsApp | [+55 43 99674581](https://wa.me/554399674581) |
| E-mail | vitustudio2026@gmail.com |

---

<div align="center">

© 2026 Vítor Gabriel · Vitu Studio — Todos os direitos reservados.

</div>