/**
 * Template Email di Benvenuto per acquirenti di Dog Kit
 * Da inviare automaticamente (es. via webhook Stripe / Resend / SendGrid / Nodemailer)
 */

export interface WelcomeEmailData {
  customerName?: string;
  customerEmail: string;
  magicLink?: string;
}

export const WELCOME_EMAIL_TEMPLATE = {
  subject: "🎉 Benvenuto in Dog Kit! Ecco come iniziare",
  
  getHtml: (data: WelcomeEmailData): string => {
    const name = data.customerName || "Amico a quattro zampe";
    const appUrl = data.magicLink || "https://dog-kit-web-app.vercel.app/?paid=true";

    return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Benvenuto in Dog Kit</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800;">Dog Kit 🐾</h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Il tuo cucciolo felice, la tua mente tranquilla</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Ciao ${name}, grazie per aver scelto Dog Kit!</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #475569;">
                Il tuo acquisto a vita di <strong>Dog Kit (4,99€ una tantum)</strong> è confermato con successo! Da questo momento hai accesso immediato e illimitato a tutte le funzionalità della web app.
              </p>

              <!-- Box Istruzioni di Accesso -->
              <div style="background-color: #f1f5f9; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <h3 style="margin-top: 0; font-size: 16px; color: #1e293b;">🚀 Come accedere alla tua Web App:</h3>
                <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #334155;">
                  <li>Clicca sul pulsante qui sotto per aprire Dog Kit con la licenza già sbloccata.</li>
                  <li>Aggiungi la web app alla schermata iniziale del tuo smartphone (iOS: <em>Condividi → Aggiungi a Schermata Home</em>; Android: <em>Installa App</em>).</li>
                  <li>Configura il profilo del tuo cane e inizia subito il calendario vaccini e l'academy educativa.</li>
                </ol>
              </div>

              <!-- Bottone CTA -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${appUrl}" style="background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 16px; font-weight: 700; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);">
                  Accedi a Dog Kit Ora →
                </a>
              </div>

              <p style="font-size: 13px; color: #64748b; text-align: center;">
                Link diretto: <a href="${appUrl}" style="color: #6366f1;">${appUrl}</a>
              </p>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />

              <!-- Supporto e contatti -->
              <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #1e293b;">Hai bisogno di assistenza o hai un dubbio?</h3>
              <p style="font-size: 14px; line-height: 1.5; color: #475569; margin: 0;">
                Rispondi direttamente a questa email o scrivi al nostro supporto: saremo felicissimi di aiutarti.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Dog Kit • Progetto sviluppato per il benessere degli animali.</p>
              <p style="margin: 4px 0 0 0;">Nessun canone periodico • Licenza a vita per ${data.customerEmail}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  getText: (data: WelcomeEmailData): string => {
    const name = data.customerName || "Amico";
    const appUrl = data.magicLink || "https://dog-kit-web-app.vercel.app/?paid=true";

    return `
Benvenuto in Dog Kit! 🐾

Ciao ${name},

Grazie per aver acquistato Dog Kit a vita (4,99€ una tantum)!
Tutte le funzionalità premium sono ora sbloccate per te.

COME ACCEDERE ALLA TUA APP:
1. Clicca su questo link di accesso rapido:
   ${appUrl}
2. Aggiungi Dog Kit alla schermata home del tuo smartphone per un'esperienza pari ad un'app nativa.
3. Inserisci il profilo del tuo cane e inizia subito!

Per qualsiasi richiesta o supporto, rispondi pure a questa email.

Buon percorso con il tuo cane!
Team Dog Kit
    `.trim();
  }
};
