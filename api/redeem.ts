// Funzione serverless Vercel: controlla un codice di accesso premium lato server.
// I codici validi stanno SOLO nella variabile d'ambiente DOGKIT_ACCESS_CODES (separati da virgola),
// mai nel codice dell'app. Il codice si consegna a mano a chi ha pagato / ai tester.
import { timingSafeEqual } from 'node:crypto';

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export default function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const code = String(req.body?.code || '').trim().toUpperCase();
  const valid = String(process.env.DOGKIT_ACCESS_CODES || '')
    .split(',')
    .map(c => c.trim().toUpperCase())
    .filter(Boolean);

  const ok = code.length >= 8 && valid.some(v => same(code, v));
  return res.status(200).json({ ok });
}
