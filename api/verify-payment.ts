// Funzione serverless Vercel: chiede a Stripe se una Checkout Session è stata PAGATA davvero.
// Richiede STRIPE_SECRET_KEY (chiave "ristretta" di sola lettura, impostata su Vercel, mai nel codice).
// Facoltativo: N8N_CONFERMA_KEY -> avvisa su Telegram (via n8n) ogni pagamento confermato.

const N8N_URL = 'https://srv1366849.hstgr.cloud/webhook/claude-conferma';

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  const sessionId = String(req.query?.session_id || '').trim();
  if (!/^cs_(live|test)_[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return res.status(400).json({ paid: false, error: 'session_id non valido' });
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ paid: false, error: 'STRIPE_SECRET_KEY non configurata' });

  try {
    const r = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!r.ok) return res.status(200).json({ paid: false });

    const s: any = await r.json();
    const paid = s.payment_status === 'paid';
    const email: string | null = s.customer_details?.email || s.customer_email || null;

    if (paid && process.env.N8N_CONFERMA_KEY) {
      const euro = ((Number(s.amount_total) || 0) / 100).toFixed(2);
      // Avviso a Telegram: non blocca la risposta se fallisce
      fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chiave: process.env.N8N_CONFERMA_KEY,
          testo: `💰 Pagamento CONFERMATO da Stripe (Dog Kit): ${euro} ${String(s.currency || '').toUpperCase()} da ${email || 'email n.d.'}. Sessione ${sessionId.slice(0, 14)}…`,
        }),
      }).catch(() => {});
    }

    return res.status(200).json({ paid, email: paid ? email : null });
  } catch {
    return res.status(200).json({ paid: false });
  }
}
