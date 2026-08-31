import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Heart, 
  GraduationCap, 
  Activity, 
  ShoppingCart, 
  Users, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';

// Dichiarazione elemento custom Stripe Buy Button per TypeScript JSX e React
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id'?: string;
        'publishable-key'?: string;
      };
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id'?: string;
        'publishable-key'?: string;
      };
    }
  }
}

export default function DogKitLandingPage() {
  // Caricamento script ufficiale Stripe Buy Button
  useEffect(() => {
    const scriptId = 'stripe-buy-button-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Stato per FAQ facoltative
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: <Calendar className="w-8 h-8 text-amber-300" />,
      title: "Mai più scadenze dimenticate",
      desc: "Ricevi promemoria automatici per vaccini, antiparassitari e visite veterinarie."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-300" />,
      title: "Educazione passo dopo passo",
      desc: "Micro-lezioni rapide da 5 minuti per insegnare richiamo, condotta e buone abitudini."
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-300" />,
      title: "Spese veterinarie sotto controllo",
      desc: "Monitora salute, curve di peso e budget per prevenire spese impreviste."
    }
  ];

  const trustBadges = [
    { text: "🔒 Dati protetti con SSL", desc: "Crittografia bancaria" },
    { text: "🇮🇹 Sviluppato in Italia", desc: "100% in lingua italiana" },
    { text: "❌ Nessun dato venduto", desc: "Privacy al primo posto" },
    { text: "📱 Funziona su tutti i dispositivi", desc: "Smartphone, Tablet & PC" }
  ];

  const features = [
    {
      icon: <Calendar className="w-7 h-7 text-indigo-600" />,
      emoji: "🗓️",
      title: "Calendario Vaccini",
      desc: "Promemoria automatici per vaccini, antiparassitari e visite"
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-purple-600" />,
      emoji: "🎓",
      title: "Percorso Educativo",
      desc: "Lezioni brevi personalizzate per un cucciolo educato"
    },
    {
      icon: <Activity className="w-7 h-7 text-rose-600" />,
      emoji: "🏥",
      title: "Salute & Benessere",
      desc: "Registra peso, sintomi e condividi con il veterinario"
    },
    {
      icon: <ShoppingCart className="w-7 h-7 text-emerald-600" />,
      emoji: "🛒",
      title: "Lista Spese Pet",
      desc: "Traccia cibo, giochi e cure: sai sempre quanto spendi"
    },
    {
      icon: <Users className="w-7 h-7 text-amber-600" />,
      emoji: "👨👩👧",
      title: "Famiglia Connessa",
      desc: "Condividi compiti con chi si prende cura del tuo cane"
    }
  ];

  const faqs = [
    {
      q: "Come accedo all'app dopo il pagamento?",
      a: "Subito dopo il pagamento con Stripe vieni reindirizzato automaticamente all'app con accesso completo e illimitato a vita a tutte le funzionalità."
    },
    {
      q: "Ci sono abbonamenti o costi nascosti?",
      a: "No, nessun abbonamento o rinnovo ricorrente. Paghi una sola volta 17€ ed hai accesso a vita a tutti gli aggiornamenti futuri."
    },
    {
      q: "Funziona su iPhone e Android?",
      a: "Sì! Dog Kit è una Web App moderna e funziona istantaneamente su qualsiasi smartphone iOS, Android, tablet e computer senza dover scaricare app pesanti dallo store."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Cerchi decorativi di sfondo */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>La guida & cartella clinica definitiva per il tuo cane</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Il tuo cucciolo felice, la tua mente tranquilla.
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Dog Kit organizza vaccinazioni, educazione e salute del tuo cane in un'unica app semplice.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-black text-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Inizia Ora a 17€ →
            </a>
          </div>
        </div>
      </section>

      {/* 2. BENEFIT (3 Colonne responsive) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 transition duration-300 flex flex-col items-center text-center group"
            >
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 mb-5 group-hover:scale-110 transition duration-300">
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {b.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST BADGES (Riga Orizzontale) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="py-6 px-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-2">
                <span className="text-sm sm:text-base font-bold text-slate-200">
                  {badge.text}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {badge.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES (Lista Verticale con Icone) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tutto ciò che serve al tuo cane in 1 app
          </h2>
          <p className="text-slate-400 text-base mt-2">
            Nessuna complicazione: solo strumenti pratici pensati per il benessere del cane.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex items-start gap-4 sm:gap-6 transition"
            >
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0 text-2xl">
                {feat.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <span>{feat.title}</span>
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING (UNA SOLA CARTA - 17€ PAGAMENTO UNICO) */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500 shadow-2xl relative overflow-hidden text-center">
          
          {/* Badge Offerta */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-md mb-6 animate-pulse">
            🔥 Offerta di lancio a tempo limitato
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Accesso Completo a Vita
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Nessun abbonamento, nessun costo nascosto. Paghi una sola volta ed è tuo per sempre.
          </p>

          {/* Box Prezzo */}
          <div className="my-6">
            <div className="text-xs sm:text-sm font-semibold text-slate-500 mb-1">
              Valore reale del contenuto: 99€
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-6xl sm:text-7xl font-black text-white tracking-tight">17€</span>
              <span className="text-slate-400 text-lg font-bold">/ una tantum</span>
            </div>
          </div>

          {/* Vantaggi inclusi */}
          <div className="max-w-md mx-auto my-8 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Cartella clinica & calendario vaccini illimitati</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Academy educativa completa con oltre 50 lezioni</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Monitoraggio salute, peso, sintomi & gestione spese</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Tutti gli aggiornamenti futuri inclusi gratuitamente</span>
            </div>
          </div>

          {/* PULSANTE STRIPE UFFICIALE (Stripe Buy Button) */}
          <div className="flex flex-col items-center justify-center my-6 min-h-[50px]">
            <stripe-buy-button
              buy-button-id="buy_btn_1UAJhPCO4FW4BXwqi5agf5Gu"
              publishable-key="pk_live_51RMXCHCO4FW4BXwqlwjf3R8dy1YsWafpNirP9CTv2M9tnD6i2hCClmFtdmwRjHMkTkBo3YEbkgsV3ZFdYZLj31xD00yiGXd7Xd"
            />
          </div>

          {/* Fallback CTA Link */}
          <div className="mt-3">
            <a 
              href="https://buy.stripe.com/5kQaEW4cafTX5rpcnIeME09?client_reference_id=dogkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
            >
              Oppure apri la pagina di pagamento sicura Stripe diretta →
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-4 font-medium">
            🔒 Pagamento sicuro con crittografia Stripe a 256-bit • Accesso immediato
          </p>
        </div>
      </section>

      {/* 6. FAQ A FISARMONICA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-white mb-8">
          Domande Frequenti
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-200 hover:text-white transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 py-8 border-t border-slate-900 text-center text-xs text-slate-600 max-w-5xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Dog Kit. Tutti i diritti riservati.</p>
        <p className="mt-1">Sviluppato con cura in Italia per il benessere dei nostri amici a quattro zampe.</p>
      </footer>

    </div>
  );
}
