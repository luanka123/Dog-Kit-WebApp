import { createHmac, timingSafeEqual } from 'node:crypto';

// Codice = <scadenza in giorni (base36, 4 car.)><firma HMAC (12 car.)>, legato all'email.
// Stateless: nessun database. Il segreto resta solo su Vercel (DOGKIT_CODE_SECRET).
function sign(secret: string, email: string, exp: string): string {
  return createHmac('sha256', secret).update(`${email}|${exp}`).digest('base64url')
    .replace(/[^A-Za-z0-9]/g, '').slice(0, 12).toUpperCase();
}

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

const N8N_URL = 'https://srv1366849.hstgr.cloud/webhook/claude-conferma';

// Codici creator: env DOGKIT_CREATOR_CODES = "nome:CODICE,nome2:CODICE2". Servono a regalare
// l'accesso a un creator e a sapere chi lo ha attivato (avviso Telegram con il nome).
function creatorFor(code: string): string | null {
  const list = String(process.env.DOGKIT_CREATOR_CODES || '').split(',');
  for (const item of list) {
    const [name, raw] = item.split(':');
    const c = String(raw || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (name && c.length >= 8 && same(c, code)) return name.trim();
  }
  return null;
}

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const secret = String(process.env.DOGKIT_CODE_SECRET || '');
  const email = String(req.body?.email || '').trim().toLowerCase();
  const code = String(req.body?.code || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const creator = email && code ? creatorFor(code) : null;
  if (creator) {
    if (process.env.N8N_CONFERMA_KEY) {
      fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chiave: process.env.N8N_CONFERMA_KEY,
          testo: `🎁 Accesso creator ATTIVATO (Dog Kit): ${creator} con ${email}`,
        }),
      }).catch(() => {});
    }
    return res.status(200).json({ ok: true });
  }
  if (!secret || !email || code.length !== 16) return res.status(200).json({ ok: false });
  const exp = code.slice(0, 4);
  const days = parseInt(exp, 36);
  const today = Math.floor(Date.now() / 86400000);
  if (!Number.isFinite(days) || days < today) return res.status(200).json({ ok: false, expired: days < today });
  const ok = same(code.slice(4), sign(secret, email, exp));
  return res.status(200).json({ ok });
}
