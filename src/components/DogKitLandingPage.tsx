import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Shield,
  FileText,
  Check
} from 'lucide-react';

export default function DogKitLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCheckout = () => {
    window.location.href = "https://buy.stripe.com/4gM28qbECazD1b95ZkeME0b";
  };

  const trustBadges = [
    { text: "🔒 Dati protetti con SSL", desc: "Crittografia bancaria" },
    { text: "📱 Funziona su iPhone & Android", desc: "Smartphone, Tablet & PC" },
    { text: "👨‍👩‍👧 Condivisione in Famiglia", desc: "Sempre sincronizzati" },
    { text: "🛡️ Garanzia Rimborso 14 Giorni", desc: "Nessuna domanda" }
  ];

  const features = [
    {
      icon: <Calendar className="w-7 h-7 text-emerald-500" />,
      emoji: "🗓️",
      title: "Calendario Vaccini & Antiparassitari",
      desc: "Promemoria automatici per vaccini, antiparassitari e visite"
    },
    {
      icon: <FileText className="w-7 h-7 text-indigo-500" />,
      emoji: "📋",
      title: "Cartella Clinica Digitale",
      desc: "Registra peso, esami, anamnesi e sintomi con esportazione PDF"
    },
    {
      icon: <Users className="w-7 h-7 text-amber-500" />,
      emoji: "👨‍👩‍👧",
      title: "Famiglia Connessa",
      desc: "Condividi compiti con chi si prende cura del tuo cane in tempo reale"
    }
  ];

  const faqs = [
    {
      q: "Cosa include l'offerta a 29€ a vita?",
      a: "Include accesso completo e illimitato a Dog Kit: cartelle cliniche per tutti i tuoi cani, promemoria vaccini e antiparassitari, sincronizzazione familiare ed esportazione PDF senza alcun canone mensile."
    },
    {
      q: "Come funziona la garanzia soddisfatti o rimborsati in 14 giorni?",
      a: "Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda. Ti rimborsiamo tempestivamente il 100% dell'importo se non sei soddisfatto."
    },
    {
      q: "Funziona su iPhone e Android?",
      a: "Sì! Dog Kit è una Progressive Web App e funziona istantaneamente su qualsiasi smartphone iOS o Android."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-sm">
            <span>🐶 Più di <strong>1.250 cani</strong> già gestiti con Dog Kit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Non Dimenticare Mai Più un Vaccino.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
              Gestisci la Salute del Tuo Cane in un'App.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Promemoria automatici per vaccini, antiparassitari e visite. Cartella clinica digitale. Condivisa con tutta la famiglia.
          </p>

          {/* Urgenza Contatore Visivo */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
              <span className="text-amber-400">🔥 Offerta Lancio (Prezzo Normale 149€)</span>
              <span className="text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                Posti rimasti: <strong className="text-emerald-400">47</strong> / 50
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
            <button 
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl uppercase tracking-wider shadow-2xl shadow-emerald-500/30 transition transform hover:-translate-y-1 cursor-pointer"
            >
              <span>ACQUISTA ORA — 29€ A VITA</span>
              <ArrowRight className="w-6 h-6 text-slate-950" />
            </button>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold text-center">
              Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="p-3">
                <div className="font-bold text-slate-200 text-sm mb-1">{badge.text}</div>
                <div className="text-xs text-slate-400">{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Funzionalità Chiave</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Tutto ciò che serve al tuo cane in un'unica app
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">{feat.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRICING & GARANZIA */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-10">
        <div className="text-center mb-10">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-2">Offerta Lancio Limitata</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            29€ a Vita
          </h2>
          <p className="mt-2 text-slate-400 text-base sm:text-lg font-medium">
            Prezzo normale <span className="line-through text-slate-500">149€</span> • Solo per i primi 50 acquirenti
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl text-center relative">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-bl-2xl shadow-md">
            🔥 Risparmi l'80%
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs mb-4">
            ACCESSO ILLIMITATO A VITA
          </div>

          <div className="flex items-center justify-center gap-3 my-2">
            <span className="text-2xl sm:text-3xl line-through text-slate-500 font-bold">149€</span>
            <span className="text-5xl sm:text-6xl font-black text-white">29€</span>
            <span className="text-sm font-bold text-emerald-400 uppercase bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">Una Tantum</span>
          </div>

          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-amber-400">⚡ Offerta a tempo</span>
              <span className="text-white">Posti rimasti: <strong className="text-emerald-400">47</strong> / 50</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <ul className="mt-8 space-y-3.5 text-xs sm:text-sm text-left text-slate-200 border-t border-slate-800/80 pt-6 max-w-lg mx-auto">
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Cartella clinica completa</strong> per tutti i tuoi cani</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Promemoria automatici</strong> per vaccini e visite</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Condivisione familiare</strong> in tempo reale</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Tutti gli aggiornamenti futuri inclusi</strong> per sempre</span>
            </li>
          </ul>

          <div className="mt-8">
            <button 
              onClick={handleCheckout}
              className="w-full inline-block py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg uppercase tracking-wider transition cursor-pointer"
            >
              ACQUISTA ORA — 29€ A VITA
            </button>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-semibold">
              Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda.
            </p>
          </div>
        </div>

        {/* GARANZIA */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-950 border border-emerald-500/30 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div className="text-left">
            <h3 className="font-black text-white text-base">Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda.</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Se non sei soddisfatto al 100%, ti rimborsiamo l'intero importo entro 14 giorni dall'acquisto.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-200"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-400 border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Dog Kit. Tutti i diritti riservati.</p>
        <p className="mt-1">Assistenza: mpfprosolution@gmail.com</p>
      </footer>
    </div>
  );
}
