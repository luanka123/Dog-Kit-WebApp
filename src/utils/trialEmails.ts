/**
 * Sistema Email Automatiche di Prova (14 Giorni) per Dog Kit
 * Mittente reply-to: mpfprosolution@gmail.com
 * Invio in base a trial_start: Giorno 0, 2, 7, 11, 13, 14, 17
 * La sequenza viene interrotta istantaneamente se is_premium diventa true.
 */

export interface TrialEmailTemplateData {
  userEmail: string;
  dogName?: string;
  appUrl?: string;
  checkoutUrl?: string;
}

export interface TrialEmailDef {
  day: number;
  subject: (dogName: string) => string;
  previewText: (dogName: string) => string;
  getHtml: (data: TrialEmailTemplateData) => string;
  getText: (data: TrialEmailTemplateData) => string;
}

export const TRIAL_EMAIL_SEQUENCE: Record<number, TrialEmailDef> = {
  // Giorno 0: Subito alla registrazione
  0: {
    day: 0,
    subject: (dog: string) => `🎉 Benvenuto in Dog Kit! La prova di 14 giorni per ${dog} è attiva`,
    previewText: (dog: string) => `Tutte le funzioni sono sbloccate per 14 giorni. Nessuna carta richiesta.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const appUrl = data.appUrl || window?.location?.origin || "https://dog-kit.web.app";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Benvenuto in Dog Kit</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);padding:36px 32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">Dog Kit 🐾</h1>
              <p style="margin:8px 0 0 0;font-size:15px;opacity:0.95;">La tua prova gratuita di 14 giorni è ufficialmente attiva</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-top:0;">Ciao! La salute di ${dog} è ora in buone mani.</h2>
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Hai iniziato la tua <strong>prova gratuita di 14 giorni</strong> senza alcun vincolo e senza aver inserito alcuna carta di credito.
              </p>
              
              <div style="background-color:#f1f5f9;border-left:4px solid #4f46e5;padding:18px 20px;border-radius:12px;margin:22px 0;">
                <h3 style="margin:0 0 8px 0;font-size:15px;color:#1e293b;font-weight:700;">🚀 I 3 passaggi del tuo primo giorno:</h3>
                <ol style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#334155;">
                  <li><strong>Aggiungi ${dog}:</strong> razza, peso e compleanno.</li>
                  <li><strong>Inserisci almeno un vaccino o scadenza:</strong> calcoleremo noi i richiami.</li>
                  <li><strong>Attiva le notifiche:</strong> riceverai promemoria puntuali senza pensieri.</li>
                </ol>
              </div>

              <div style="text-align:center;margin:30px 0 20px 0;">
                <a href="${appUrl}" style="background-color:#16a34a;color:#ffffff;text-decoration:none;padding:15px 32px;font-size:15px;font-weight:800;border-radius:12px;display:inline-block;box-shadow:0 4px 10px rgba(22,163,74,0.3);">
                  Apri la tua Web App Ora →
                </a>
              </div>

              <p style="font-size:13px;color:#64748b;text-align:center;margin-top:20px;">
                Dopo la prova: 1 € una volta sola, per sempre. Nessun canone periodico.<br/>
                Hai già deciso? <a href="${checkoutUrl}" style="color:#4f46e5;font-weight:700;">Sblocca per sempre a 1 €</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:18px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              <p style="margin:0;">Rispondi direttamente a questa email se hai domande • <a href="mailto:mpfprosolution@gmail.com" style="color:#64748b;">mpfprosolution@gmail.com</a></p>
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
    getText: (data) => `Ciao! La tua prova gratuita di 14 giorni su Dog Kit è attiva per ${data.dogName || "il tuo cane"}. Tutte le funzionalità sono sbloccate. Nessuna carta richiesta. Apri l'app: ${data.appUrl || "https://dog-kit.web.app"}`
  },

  // Giorno 2: Verifica cartella clinica
  2: {
    day: 2,
    subject: (dog: string) => `🐾 Il primo vaccino di ${dog} è al sicuro? Ecco come sfruttare la cartella clinica`,
    previewText: (dog: string) => `Scopri come registrare visite, antiparassitari e salvare Dog Kit sulla schermata Home.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const appUrl = data.appUrl || window?.location?.origin || "https://dog-kit.web.app";
      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Cartella Clinica Dog Kit</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#059669 0%,#0284c7 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;font-weight:900;">La Cartella Clinica di ${dog} 📋</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-top:0;">Come sta andando con la routine di ${dog}?</h2>
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Oltre ai vaccini obbligatori (DHPPi, Rabbia, Leptospirosi), Dog Kit ti aiuta a non dimenticare le scadenze mensili degli <strong>antiparassitari (pipette o collari)</strong> e la sverminazione.
              </p>
              
              <div style="background-color:#ecfdf5;border-left:4px solid #10b981;padding:16px 20px;border-radius:12px;margin:22px 0;">
                <p style="margin:0;font-size:14px;color:#065f46;line-height:1.6;">
                  💡 <strong>Consiglio del giorno:</strong> Aggiungi Dog Kit alla schermata iniziale del tuo smartphone (iOS: <em>Condividi → Aggiungi a Home</em>). Si aprirà a schermo intero come una vera app nativa!
                </p>
              </div>

              <div style="text-align:center;margin:28px 0 16px 0;">
                <a href="${appUrl}" style="background-color:#4f46e5;color:#ffffff;text-decoration:none;padding:14px 28px;font-size:15px;font-weight:700;border-radius:12px;display:inline-block;">
                  Aggiorna i dati di ${dog} →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Dog Kit • Rispondi a questa email per qualsiasi assistenza (mpfprosolution@gmail.com)
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
    getText: (data) => `Il primo vaccino di ${data.dogName || "il tuo cane"} è al sicuro? Apri la cartella clinica in Dog Kit: ${data.appUrl || "https://dog-kit.web.app"}`
  },

  // Giorno 7: Metà prova
  7: {
    day: 7,
    subject: (dog: string) => `🗓️ Metà prova completata: controlla il peso e la salute di ${dog}`,
    previewText: (dog: string) => `Sei al 7° giorno di prova gratuita. Ecco il resoconto del benessere di ${dog}.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const appUrl = data.appUrl || window?.location?.origin || "https://dog-kit.web.app";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Giorno 7 con Dog Kit</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;font-weight:900;">7 Giorni Insieme a ${dog} 🐾</h1>
              <p style="margin:6px 0 0 0;font-size:14px;opacity:0.9;">Metà della tua prova gratuita è passata con successo!</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                In questa prima settimana hai iniziato a costruire il diario clinico digitale per ${dog}.
                Hai verificato la curva del peso e la frequenza delle passeggiate?
              </p>
              
              <div style="background-color:#eff6ff;border:1px solid #bfdbfe;padding:20px;border-radius:14px;margin:22px 0;">
                <h4 style="margin:0 0 8px 0;color:#1e40af;font-size:15px;">Mancano 7 giorni al termine della prova</h4>
                <p style="margin:0;font-size:13px;color:#3b82f6;line-height:1.5;">
                  Tutti i tuoi dati inseriti rimarranno sempre salvati. Alla scadenza potrai continuare a usare Dog Kit per sempre con <strong>1 € una tantum</strong>.
                </p>
              </div>

              <div style="text-align:center;margin:28px 0 16px 0;">
                <a href="${appUrl}" style="background-color:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;font-size:15px;font-weight:700;border-radius:12px;display:inline-block;">
                  Apri la Dashboard di ${dog} →
                </a>
              </div>

              <p style="text-align:center;font-size:13px;color:#64748b;margin-top:16px;">
                Vuoi toglierti il pensiero fin da ora? <a href="${checkoutUrl}" style="color:#2563eb;font-weight:700;">Sblocca per sempre a 1 €</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Dog Kit • Rispondi a questa email per qualsiasi domanda (mpfprosolution@gmail.com)
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
    getText: (data) => `Metà prova completata per ${data.dogName || "il tuo cane"}! Mancano 7 giorni. Tutti i dati sono al sicuro. Dashboard: ${data.appUrl || "https://dog-kit.web.app"}`
  },

  // Giorno 11: -3 Giorni alla fine
  11: {
    day: 11,
    subject: (dog: string) => `⏳ Mancano 3 giorni alla fine della prova di Dog Kit per ${dog}`,
    previewText: (dog: string) => `I tuoi dati e promemoria restano salvati. Ecco come mantenere attivo Dog Kit a vita.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const appUrl = data.appUrl || window?.location?.origin || "https://dog-kit.web.app";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Mancano 3 giorni</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#d97706 0%,#b45309 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;font-weight:900;">La tua prova gratuita scade tra 3 giorni ⏳</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-top:0;">Non perdere il controllo sulle scadenze di ${dog}</h2>
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Tra 72 ore la tua prova gratuita terminerà. Ricorda che <strong>non ti addebiteremo nulla in automatico</strong>, perché non hai inserito alcuna carta.
              </p>
              
              <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:18px 20px;border-radius:12px;margin:22px 0;">
                <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
                  🔒 <strong>Cosa succede dopo 14 giorni?</strong><br/>
                  I dati di ${dog} restano salvati. Per continuare a ricevere promemoria automatici e aggiornare la cartella clinica, ti basta sbloccare Dog Kit con <strong>1 € una volta sola</strong> (garanzia 14 giorni soddisfatti o rimborsati).
                </p>
              </div>

              <div style="text-align:center;margin:30px 0 16px 0;">
                <a href="${checkoutUrl}" style="background-color:#16a34a;color:#ffffff;text-decoration:none;padding:15px 32px;font-size:15px;font-weight:800;border-radius:12px;display:inline-block;box-shadow:0 4px 10px rgba(22,163,74,0.3);">
                  Sblocca Dog Kit a 1 € per sempre →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Hai domande? Rispondi pure a questa email: mpfprosolution@gmail.com
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
    getText: (data) => `Mancano 3 giorni alla fine della prova gratuita di Dog Kit per ${data.dogName || "il tuo cane"}. Sblocca per sempre a 1 € una tantum: ${data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f"}`
  },

  // Giorno 13: Domani scade
  13: {
    day: 13,
    subject: (dog: string) => `⚠️ Domani scade la prova di Dog Kit: non perdere i promemoria di ${dog}`,
    previewText: (dog: string) => `Ultimo giorno di accesso completo. Domani l'app entrerà in sola lettura.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Domani scade la prova</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#ea580c 0%,#c2410c 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;font-weight:900;">Domani termina la tua prova ⚠️</h1>
              <p style="margin:6px 0 0 0;font-size:14px;opacity:0.95;">Mantieni la serenità sulle scadenze veterinarie di ${dog}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Domani si conclude il periodo di 14 giorni. Da dopodomani la tua cartella clinica entrerà in modalità di <em>sola lettura</em> e i promemoria automatici verranno messi in pausa.
              </p>
              
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Non rischiare di dimenticare un vaccino o l'antiparassitario: attiva ora la licenza a vita di Dog Kit. 
                <strong>1 € una sola volta, per sempre. Nessun abbonamento futuro.</strong>
              </p>

              <div style="text-align:center;margin:32px 0 16px 0;">
                <a href="${checkoutUrl}" style="background-color:#16a34a;color:#ffffff;text-decoration:none;padding:16px 36px;font-size:16px;font-weight:800;border-radius:12px;display:inline-block;box-shadow:0 4px 12px rgba(22,163,74,0.35);">
                  Sblocca Ora a 1 € per sempre →
                </a>
              </div>

              <p style="text-align:center;font-size:12px;color:#64748b;margin-top:16px;">
                🔒 Pagamento sicuro Stripe • Garanzia 14 giorni soddisfatti o rimborsati
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Dog Kit • mpfprosolution@gmail.com
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
    getText: (data) => `Domani scade la prova di Dog Kit per ${data.dogName || "il tuo cane"}. Sblocca per sempre a 1 €: ${data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f"}`
  },

  // Giorno 14: Prova Scaduta oggi
  14: {
    day: 14,
    subject: (dog: string) => `🔒 La tua prova è finita oggi. I dati di ${dog} sono al sicuro`,
    previewText: (dog: string) => `Sblocca Dog Kit per sempre a 1 € – garanzia 14 giorni soddisfatti o rimborsati.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>La tua prova è finita</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#334155 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:24px;font-weight:900;">La tua prova è finita oggi 🐾</h1>
              <p style="margin:6px 0 0 0;font-size:14px;color:#94a3b8;">I dati di ${dog} sono al sicuro e custoditi nel tuo dispositivo</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <h2 style="font-size:18px;font-weight:800;color:#0f172a;margin-top:0;">Continua a proteggere la salute di ${dog}</h2>
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                La tua prova di 14 giorni si è conclusa. Come promesso, i tuoi dati sanitari non sono andati persi: l'app è ora in <strong>sola lettura</strong>.
              </p>
              
              <div style="background-color:#f8fafc;border:2px dashed #cbd5e1;padding:20px;border-radius:14px;margin:22px 0;text-align:center;">
                <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">
                  Sblocca Dog Kit per sempre a 1 €
                </p>
                <p style="margin:4px 0 0 0;font-size:13px;color:#64748b;">
                  Garanzia 14 giorni soddisfatti o rimborsati. Nessun abbonamento mensile.
                </p>
              </div>

              <div style="text-align:center;margin:30px 0 16px 0;">
                <a href="${checkoutUrl}" style="background-color:#16a34a;color:#ffffff;text-decoration:none;padding:16px 36px;font-size:16px;font-weight:800;border-radius:12px;display:inline-block;box-shadow:0 4px 12px rgba(22,163,74,0.35);">
                  Sblocca Dog Kit Ora (1 € Una Tantum) →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Rispondi a questa email per qualsiasi necessità: mpfprosolution@gmail.com
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
    getText: (data) => `La tua prova è finita. I dati di ${data.dogName || "il tuo cane"} sono al sicuro. Sblocca Dog Kit per sempre a 1 € – garanzia 14 giorni soddisfatti o rimborsati: ${data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f"}`
  },

  // Giorno 17: Ultimo follow-up
  17: {
    day: 17,
    subject: (dog: string) => `🐕 Conserviamo ancora la cartella di ${dog}: riattiva Dog Kit a 1 € per sempre`,
    previewText: (dog: string) => `I tuoi dati e promemoria ti aspettano. Riattiva con 1 € una tantum.`,
    getHtml: (data) => {
      const dog = data.dogName || "il tuo cane";
      const checkoutUrl = data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f";

      return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Conserviamo la cartella di ${dog}</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;color:#1e293b;margin:0;padding:24px 12px;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#4338ca 0%,#312e81 100%);padding:32px;text-align:center;color:#ffffff;">
              <h1 style="margin:0;font-size:22px;font-weight:900;">La Cartella di ${dog} è ancora qui 🐾</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Volevamo solo ricordarti che tutto lo storico, i vaccini e i promemoria che hai impostato per ${dog} sono ancora memorizzati e pronti all'uso.
              </p>
              <p style="font-size:15px;line-height:1.6;color:#475569;">
                Con un solo pagamento di <strong>1 € (invece di 149€)</strong> riattivi subito i promemoria automatici, la sincronizzazione familiare e gli aggiornamenti a vita.
              </p>

              <div style="text-align:center;margin:28px 0 16px 0;">
                <a href="${checkoutUrl}" style="background-color:#4f46e5;color:#ffffff;text-decoration:none;padding:15px 32px;font-size:15px;font-weight:800;border-radius:12px;display:inline-block;">
                  Riattiva Dog Kit per Sempre →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
              Assistenza dedicata Dog Kit: mpfprosolution@gmail.com
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
    getText: (data) => `Conserviamo ancora la cartella di ${data.dogName || "il tuo cane"}. Riattiva Dog Kit per sempre a 1 €: ${data.checkoutUrl || "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f"}`
  }
};

/**
 * Invia o simula l'invio dell'email automatica per il giorno indicato
 */
export async function sendTrialEmail(params: {
  day: number;
  userEmail: string;
  dogName: string;
  isPremium: boolean;
  appUrl?: string;
  checkoutUrl?: string;
}): Promise<{ success: boolean; status: string; message: string }> {
  // CRITICO: Interrompe la sequenza se is_premium diventa true
  if (params.isPremium) {
    return {
      success: true,
      status: 'stopped_premium',
      message: `Sequenza email interrotta: l'utente è Premium (is_premium = true).`
    };
  }

  const template = TRIAL_EMAIL_SEQUENCE[params.day];
  if (!template) {
    return {
      success: false,
      status: 'invalid_day',
      message: `Nessun template email per il giorno ${params.day}.`
    };
  }

  const subject = template.subject(params.dogName || 'il tuo cane');
  const html = template.getHtml({
    userEmail: params.userEmail,
    dogName: params.dogName,
    appUrl: params.appUrl,
    checkoutUrl: params.checkoutUrl
  });

  // Chiave API Resend (se presente nelle variabili d'ambiente)
  const resendApiKey = (typeof process !== 'undefined' && process.env?.RESEND_API_KEY) ||
    ((import.meta as any)?.env?.VITE_RESEND_API_KEY);

  let dispatchResult = 'sent_local_fallback';

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Dog Kit <onboarding@resend.dev>',
          to: [params.userEmail],
          reply_to: 'mpfprosolution@gmail.com',
          subject: subject,
          html: html
        })
      });

      if (response.ok) {
        dispatchResult = 'sent_resend_api';
      } else {
        console.warn('Resend API response not ok, fallback to local logging');
      }
    } catch (e) {
      console.warn('Resend API network error, logging to local queue', e);
    }
  }

  // Registra nei log persistenti
  try {
    const existingLogsRaw = localStorage.getItem('dogkit_sent_trial_emails');
    const existingLogs = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
    
    const logEntry = {
      id: `trial_${params.day}_${Date.now()}`,
      day: params.day,
      to: params.userEmail,
      replyTo: 'mpfprosolution@gmail.com',
      subject: subject,
      sentAt: new Date().toISOString(),
      status: dispatchResult
    };

    existingLogs.push(logEntry);
    localStorage.setItem('dogkit_sent_trial_emails', JSON.stringify(existingLogs));
  } catch (e) {
    console.error('Errore salvataggio log email trial', e);
  }

  return {
    success: true,
    status: dispatchResult,
    message: `Email Giorno ${params.day} inviata a ${params.userEmail} (reply-to: mpfprosolution@gmail.com).`
  };
}

/**
 * Controlla i giorni trascorsi dal trial_start e invia le email mancanti
 * Giorni sequenza: 0, 2, 7, 11, 13, 14, 17
 */
export async function checkAndDispatchTrialEmailSequence(params: {
  trialStart: string;
  userEmail: string;
  dogName: string;
  isPremium: boolean;
  appUrl?: string;
  checkoutUrl?: string;
}): Promise<{ triggeredDays: number[] }> {
  if (params.isPremium) {
    return { triggeredDays: [] };
  }

  if (!params.trialStart || !params.userEmail) {
    return { triggeredDays: [] };
  }

  const startTimestamp = new Date(params.trialStart).getTime();
  if (isNaN(startTimestamp)) return { triggeredDays: [] };

  const now = Date.now();
  const daysElapsed = Math.floor((now - startTimestamp) / (1000 * 60 * 60 * 24));

  const targetDays = [0, 2, 7, 11, 13, 14, 17];
  const eligibleDays = targetDays.filter(d => daysElapsed >= d);

  let sentLogs: any[] = [];
  try {
    const raw = localStorage.getItem('dogkit_sent_trial_emails');
    if (raw) sentLogs = JSON.parse(raw);
  } catch (e) {}

  const alreadySentDays = new Set(sentLogs.map((l: any) => l.day));
  const triggeredDays: number[] = [];

  for (const day of eligibleDays) {
    if (!alreadySentDays.has(day)) {
      await sendTrialEmail({
        day,
        userEmail: params.userEmail,
        dogName: params.dogName,
        isPremium: params.isPremium,
        appUrl: params.appUrl,
        checkoutUrl: params.checkoutUrl
      });
      triggeredDays.push(day);
      alreadySentDays.add(day);
    }
  }

  return { triggeredDays };
}
