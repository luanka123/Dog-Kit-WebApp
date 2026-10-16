import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Check, 
  FileText, 
  Users,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export interface LandingPageProps {
  onStartTrial?: () => void;
  onDirectCheckout?: () => void;
  onEnterApp?: () => void;
  checkoutUrl?: string;
}

export default function LandingPage({ 
  onStartTrial, 
  onDirectCheckout, 
  onEnterApp,
  checkoutUrl = "https://buy.stripe.com/9B600ieQOcHLf1ZbjEeME0f"
}: LandingPageProps) {
  const [spotsLeft, setSpotsLeft] = useState<number>(47);

  useEffect(() => {
    const saved = localStorage.getItem('dogkit_spots_left_v1');
    if (saved) {
      const val = parseInt(saved, 10);
      if (!isNaN(val) && val >= 41 && val <= 47) {
        setSpotsLeft(val);
      }
    }

    const timer = setTimeout(() => {
      setSpotsLeft(prev => {
        const next = Math.max(42, prev - 1);
        localStorage.setItem('dogkit_spots_left_v1', next.toString());
        return next;
      });
    }, 25000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartTrial = () => {
    window.location.href = checkoutUrl;
    return;
    // eslint-disable-next-line no-unreachable
    if (onStartTrial) {
      onStartTrial();
    } else if (onEnterApp) {
      onEnterApp();
    }
  };

  const handleStripeCheckout = () => {
    if (onDirectCheckout) {
      onDirectCheckout();
    } else {
      window.location.href = checkoutUrl;
    }
  };

  const features = [
    {
      emoji: "🗓️",
      title: "Promemoria Vaccini & Antiparassitari",
      desc: "Calcolo automatico dei richiami per vaccini obbligatori, pipette antiparassitarie, collari, vermifughi e visite periodiche.",
      badge: "✓ Notifiche puntuali prima della scadenza"
    },
    {
      emoji: "📋",
      title: "Cartella Clinica Digitale Completa",
      desc: "Registra anamnesi, peso, interventi, allergie e farmaci assunti. Esporta la scheda sanitaria in PDF con un clic per il veterinario.",
      badge: "✓ Storico medico sempre a portata di mano"
    },
    {
      emoji: "👨‍👩‍👧",
      title: "Condivisione con Tutta la Famiglia",
      desc: "Sincronizza le schede con partner, figli o dog sitter per sapere esattamente chi ha somministrato le cure, i pasti e le passeggiate.",
      badge: "✓ Aggiornamento istantaneo su ogni dispositivo"
    }
  ];

  const faqs = [
    {
      q: "Quanto costa e per quanto tempo vale?",
      a: "Paghi 1 € una sola volta e hai accesso per sempre. Nessun abbonamento, nessun rinnovo."
    },
    {
      q: "Cosa include l'accesso definitivo a 1 € una volta, per sempre?",
      a: "Con un unico pagamento di 1 € (invece di 149€) ottieni accesso illimitato a vita a tutte le funzionalità di Dog Kit: promemoria sanitari, cartella clinica per tutti i tuoi cani, sincronizzazione in famiglia ed esportazione PDF senza alcun abbonamento futuro."
    },
    {
      q: "Funziona su iPhone, Android e computer?",
      a: "Sì! Dog Kit è una moderna web app installabile compatibile con tutti gli smartphone iOS (iPhone), Android, tablet e computer. Non serve scaricare app pesanti dagli store e tutti i tuoi dati rimangono sempre sincronizzati."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
      
      {/* 1. HEADER (Senza bottone Stripe diretto) */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-xs">
            🐶
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">Dog Kit</span>
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">Salute & Prevenzione</span>
          </div>
        </div>

        <div>
          <button 
            onClick={handleStartTrial}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Accesso a 1 €
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-16 sm:pb-20 text-center">
        
        {/* Social Proof Reale */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold mb-6">
          <span>🐾 Appena lanciata — accesso per sempre a 1 €</span>
        </div>

        {/* H1 Richiesto Esatto */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Non dimenticare mai più un vaccino del tuo cane.
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Promemoria automatici per vaccini, antiparassitari e visite veterinarie. Cartella clinica digitale condivisa con tutta la famiglia.
        </p>

        {/* Urgenza Banner Pill */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-bold">
          <span>🔥 OFFERTA LANCIO — 1 € una volta, per sempre (Prezzo normale <span className="line-through text-slate-400">149€</span>)</span>
        </div>

        {/* CTA PRINCIPALE RICHIESTO */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
          <button 
            onClick={handleStartTrial}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-1 cursor-pointer"
          >
            <span>Accesso per sempre a 1 € 🐶</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>

          {/* SOTTO LA CTA RICHIESTO ESATTO */}
          <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center">
            Pagamento unico, sicuro con Stripe. Nessun abbonamento.
          </p>
        </div>

        {/* Quick Features */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Pagamento sicuro con Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Funziona su iPhone, Android & PC
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Condivisione familiare inclusa
          </span>
        </div>
      </section>

      {/* 3. 3 CARDS BENEFICI */}
      <section className="w-full bg-slate-50 border-y border-slate-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Tutto ciò di cui hai bisogno per la salute del tuo cane
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Progettato per semplificare la cura quotidiana e non farti mai più dimenticare una scadenza medica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-5">
                    {feat.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  {feat.badge}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SEZIONE PREZZO */}
      <section id="pricing" className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1">Accesso Permanente</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Accesso per sempre a 1 €
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Prezzo di lancio. Prezzo normale <span className="line-through text-slate-400 font-semibold">149€</span>. Nessun canone mensile.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-slate-200 shadow-xl text-center relative">
          
          <div className="inline-block px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs mb-3">
            PAGAMENTO UNICO UNA TANTUM
          </div>

          {/* Prezzo */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="text-2xl sm:text-3xl line-through text-slate-400 font-bold">149€</span>
            <span className="text-5xl sm:text-6xl font-black text-slate-950">1 €</span>
            <span className="text-xs font-extrabold uppercase bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">Per sempre</span>
          </div>

          {/* Contatore Visivo */}
          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                Disponibilità limitata
              </span>
              <span className="text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                Posti rimasti: <strong className="text-slate-950 text-sm">{spotsLeft}</strong> / 50
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700 bg-emerald-500" 
                style={{ width: `${(spotsLeft / 50) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 font-medium">
              ⚡ Quando i 50 posti saranno esauriti, il prezzo tornerà a 149€.
            </p>
          </div>

          {/* Lista Vantaggi */}
          <ul className="mt-8 space-y-3 text-xs sm:text-sm text-left text-slate-700 border-t border-slate-100 pt-6 max-w-md mx-auto">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Cartella clinica completa</strong> per tutti i cani della famiglia</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Promemoria automatici</strong> per vaccini, visite e antiparassitari</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Sincronizzazione in tempo reale</strong> con partner o dog sitter</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Esportazione PDF immediata</strong> per le visite veterinarie</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Tutti gli aggiornamenti futuri inclusi</strong> per sempre</span>
            </li>
          </ul>

          {/* CTA Principale verso Prova Gratis */}
          <div className="mt-8">
            <button 
              onClick={handleStartTrial}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-1 cursor-pointer"
            >
              <span>Accesso per sempre a 1 € 🐶</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-semibold">
              Pagamento unico, sicuro con Stripe. Nessun abbonamento.
            </p>
          </div>

          {/* Link secondario SOLO in fondo richiesto */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-4 cursor-pointer"
            >
              Accesso per sempre a 1 €
            </a>
          </div>

        </div>
      </section>

      {/* 5. SEZIONE FAQ */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Domande Frequenti
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOTER MINIMALE */}
      <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-900">Dog Kit</span>
            <span>© 2026 • Tutti i diritti riservati.</span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a 
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-2"
            >
              Accesso per sempre a 1 €
            </a>
            <span>•</span>
            <a href="mailto:mpfprosolution@gmail.com" className="text-slate-800 hover:text-slate-950 underline underline-offset-2">
              mpfprosolution@gmail.com
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
