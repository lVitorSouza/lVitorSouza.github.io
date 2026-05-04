const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ════════════════════════════════════════════
//  PROTEÇÃO 1 — RATE LIMITING
//  Máximo de 5 envios por IP a cada 15 minutos.
//  Se ultrapassar, bloqueia com erro 429.
//  Feito sem biblioteca extra — Map simples em memória.
// ════════════════════════════════════════════
const RATE_LIMIT_MAX      = 5;    // tentativas permitidas
const RATE_LIMIT_WINDOW   = 15 * 60 * 1000; // 15 minutos em ms
const ipRequests          = new Map(); // { ip: [timestamps] }

function rateLimiter(req, res, next) {
  // Pega o IP real mesmo atrás de proxy (Vercel)
  const ip  = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const now  = Date.now();

  // Pega histórico do IP, filtra só os que ainda estão na janela de tempo
  const timestamps = (ipRequests.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW - (now - timestamps[0])) / 1000 / 60);
    console.warn(`[RATE LIMIT] IP bloqueado: ${ip}`);
    return res.status(429).json({
      error: `Muitas tentativas. Tente novamente em ${retryAfter} minuto(s).`,
    });
  }

  // Registra este acesso
  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  // Limpeza automática: remove IPs sem atividade recente a cada 30 min
  // para não acumular memória indefinidamente
  if (Math.random() < 0.05) { // roda em ~5% das requisições
    for (const [key, val] of ipRequests.entries()) {
      if (val.every(t => now - t >= RATE_LIMIT_WINDOW)) ipRequests.delete(key);
    }
  }

  next();
}

// ════════════════════════════════════════════
//  PROTEÇÃO 2 — HONEYPOT
//  O formulário tem um campo oculto chamado "website".
//  Humanos não o veem e não preenchem.
//  Bots preenchem tudo automaticamente → bloqueado.
// ════════════════════════════════════════════
function honeypotCheck(req, res, next) {
  const { website } = req.body; // campo armadilha
  if (website && website.trim() !== '') {
    console.warn('[HONEYPOT] Bot detectado e bloqueado.');
    // Responde 200 para não revelar ao bot que foi detectado
    return res.status(200).json({ success: true });
  }
  next();
}

// ════════════════════════════════════════════
//  PROTEÇÃO 3 — SANITIZAÇÃO DE INPUT
//  Remove tags HTML do input para evitar XSS
//  caso o conteúdo seja exibido em algum lugar.
// ════════════════════════════════════════════
function sanitize(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// ── Transportador de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Rota de contato — com todas as proteções aplicadas
app.post('/api/contact', rateLimiter, honeypotCheck, async (req, res) => {
  const name    = sanitize(req.body.name);
  const email   = sanitize(req.body.email);
  const message = sanitize(req.body.message);

  // Validação de campos
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  // Limite de tamanho — evita payloads gigantes
  if (name.length > 100 || email.length > 150 || message.length > 2000) {
    return res.status(400).json({ error: 'Conteúdo muito longo.' });
  }

  try {
    // E-mail que você recebe
    await transporter.sendMail({
      from:    `"Vitu Studio — Contato" <${process.env.EMAIL_USER}>`,
      to:      'vitustudio2026@gmail.com',
      subject: `Nova mensagem de ${name} — Vitu Studio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e8e4de;border-radius:4px">
          <h2 style="font-size:1.4rem;margin-bottom:8px;color:#0d0d0d">Nova mensagem pelo site</h2>
          <hr style="border:none;border-top:1px solid #e8e4de;margin:16px 0"/>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mensagem:</strong></p>
          <p style="background:#f8f6f2;padding:16px;border-radius:4px;white-space:pre-wrap">${message}</p>
          <hr style="border:none;border-top:1px solid #e8e4de;margin:24px 0"/>
          <p style="font-size:0.75rem;color:#888">Enviado via vitustudio.vercel.app</p>
        </div>
      `,
    });

    // Confirmação para quem enviou
    await transporter.sendMail({
      from:    `"Vítor Gabriel — Vitu Studio" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: 'Recebi sua mensagem! — Vitu Studio',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e8e4de;border-radius:4px">
          <h2 style="font-size:1.4rem;color:#0d0d0d">Oi, ${name}! 👋</h2>
          <p style="color:#888;line-height:1.8">Recebi sua mensagem e vou responder em breve. Obrigado pelo contato!</p>
          <hr style="border:none;border-top:1px solid #e8e4de;margin:24px 0"/>
          <p style="font-size:0.8rem;color:#b8a898;font-style:italic">— Vítor Gabriel · Vitu Studio</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });

  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));