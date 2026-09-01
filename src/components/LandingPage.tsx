import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Check,
  Bell,
  Syringe,
  Users,
  Shield,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface LandingPageProps {
  onEnterApp?: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [demoStep, setDemoStep] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep(prev => (prev % 3) + 1);
    }, 3333);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCtaClick = () => {
    // Open Stripe checkout or app
    window.location.href = "https://buy.stripe.com/4gM28qbECazD1b95ZkeME0b";
  };

  const trustBadges = [
    { icon: <Smartphone className="w-5 h-5 text-emerald-400" aria-hidden="true" />, text: "Funziona su iPhone e Android" },
    { icon: <Users className="w-5 h-5 text-emerald-400" aria-hidden="true" />, text: "Condivisione in famiglia" },
    { icon: <Lock className="w-5 h-5 text-emerald-400" aria-hidden="true" />, text: "Crittografia SSL sicura" },
    { icon: <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />, text: "Garanzia 14 giorni soddisfatti o rimborsati" }
  ];

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
      title: "Promemoria Vaccini & Antiparassitari",
      desc: "Calcolo automatico dei giorni rimanenti e notifiche per richiami vaccinali, pipette antiparassitarie, vermifughi e visite."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-400" aria-hidden="true" />,
      title: "Cartella Clinica Digitale Completa",
      desc: "Registra peso, esami, anamnesi e sintomi; esporta lo storico in PDF con un solo clic prima di andare dal veterinario."
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" aria-hidden="true" />,
      title: "Sincronizzazione con Famiglia e Dog Sitter",
      desc: "Condividi il profilo del tuo cane con tutti i componenti della casa per coordinare pasti, cure e passeggiate in tempo reale."
    }
  ];

  const faqs = [
    {
      q: "Cosa include l'offerta a 29€ a vita?",
      a: "Con un unico pagamento di 29€ (invece di 149€) ottieni accesso completo e illimitato a Dog Kit: promemoria automatici, cartelle cliniche per tutti i tuoi cani, sincronizzazione familiare ed esportazione PDF senza alcun abbonamento futuro."
    },
    {
      q: "Come funziona la garanzia soddisfatti o rimborsati?",
      a: "Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda. Se l'app non fa al caso tuo, ti basta scriverci per ricevere subito il rimborso integrale del 100%."
    },
    {
      q: "Posso gestire più cani con lo stesso acquisto?",
      a: "Sì! L'accesso a vita include la creazione di schede sanitarie e promemoria per tutti i cani della tua famiglia."
    },
    {
      q: "Funziona su tutti i dispositivi?",
      a: "Sì! Dog Kit è una Progressive Web App compatibile al 100% con iOS (iPhone, iPad), Android e computer."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 pb-16">
      
      {/* Top Banner Offerta Lancio */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center border-b border-emerald-500/20 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>🔥 <strong>OFFERTA LANCIO LIMITATA:</strong> 29€ a vita (prezzo normale 149€) • Solo per i primi 50 acquirenti • <span className="text-amber-300 font-bold">Posti rimasti: 47</span></span>
      </div>

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
              <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
              <path d="M8 14v.5" />
              <path d="M16 14v.5" />
              <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
              <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block leading-none">Dog Kit</span>
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">Salute & Vaccini</span>
          </div>
        </div>

        <div>
          <button 
            onClick={handleCtaClick}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            ACQUISTA ORA — 29€ A VITA
          </button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          
          {/* Social Proof Reale */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold shadow-sm">
            <span className="flex -space-x-1 overflow-hidden">
              <span className="inline-block w-5 h-5 rounded-full bg-emerald-500/20 text-[10px] flex items-center justify-center border border-emerald-400/50">🐶</span>
              <span className="inline-block w-5 h-5 rounded-full bg-indigo-500/20 text-[10px] flex items-center justify-center border border-indigo-400/50">🐕</span>
              <span className="inline-block w-5 h-5 rounded-full bg-amber-500/20 text-[10px] flex items-center justify-center border border-amber-400/50">🦮</span>
            </span>
            <span>Più di <strong>1.250 cani</strong> già gestiti con Dog Kit</span>
          </div>

          {/* Headline Richiesta */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Non Dimenticare Mai Più un Vaccino.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
              Gestisci la Salute del Tuo Cane in un'App.
            </span>
          </h1>

          {/* Subheadline Richiesta */}
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Promemoria automatici per vaccini, antiparassitari e visite. Cartella clinica digitale. Condivisa con tutta la famiglia.
          </p>

          {/* Urgenza Contatore Visivo */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Offerta Lancio (Prezzo Normale 149€)
              </span>
              <span className="text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                Posti rimasti: <strong className="text-emerald-400">47</strong> / 50
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          {/* CTA PRINCIPALE (GRANDE BOTTONE VERDE) */}
          <div className="pt-2 flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
            <button 
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl uppercase tracking-wider shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
            >
              <span>ACQUISTA ORA — 29€ A VITA</span>
              <ArrowRight className="w-6 h-6 text-slate-950" />
            </button>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold text-center">
              🛡️ Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DEMO ANIMATA 10 SECONDI */}
      <section className="w-full bg-slate-900/90 border-y border-slate-800 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="mb-8">
            <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest block mb-1">In Azione in 10 Secondi</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Come Funziona Dog Kit</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 text-xs font-bold">
            <button onClick={() => setDemoStep(1)} className={`p-2.5 rounded-xl border transition ${demoStep === 1 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
              1. Aggiungi Cane
            </button>
            <button onClick={() => setDemoStep(2)} className={`p-2.5 rounded-xl border transition ${demoStep === 2 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
              2. Registra Vaccino
            </button>
            <button onClick={() => setDemoStep(3)} className={`p-2.5 rounded-xl border transition ${demoStep === 3 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
              3. Promemoria Attivo
            </button>
          </div>

          <AnimatePresence mode="wait">
            {demoStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">🐶</div>
                  <div>
                    <h3 className="font-black text-white text-base">Passo 1: Profilo Sanitario</h3>
                    <p className="text-xs text-slate-400">Cartella clinica pronta in 30 secondi</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Nome:</span>
                    <span className="font-bold text-white">Luna</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Razza & Età:</span>
                    <span className="font-bold text-emerald-400">Golden Retriever • 6 Mesi</span>
                  </div>
                </div>
              </motion.div>
            )}

            {demoStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg"><Syringe className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-black text-white text-base">Passo 2: Scelta Trattamento</h3>
                    <p className="text-xs text-slate-400">Calcolo automatico della scadenza</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Vaccino Polivalente (DHPPi)</div>
                    <div className="text-slate-400 text-[11px]">Prossimo richiamo programmato</div>
                  </div>
                  <span className="font-bold text-amber-400">Tra 14 Giorni</span>
                </div>
              </motion.div>
            )}

            {demoStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg"><Bell className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-black text-white text-base">Passo 3: Promemoria Attivo & Condiviso</h3>
                    <p className="text-xs text-slate-400">Notifiche automatiche per te e la tua famiglia</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 to-emerald-950/40 border border-emerald-500/30 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>🔔 Notifica Automatica</span>
                    <span className="text-emerald-400">Attiva</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    "Tra 3 giorni scade il richiamo vaccinale per Luna. Notifica inviata a tutta la famiglia!"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            <div key={idx} className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="p-3.5 rounded-2xl bg-slate-800 w-fit mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRICING & OFFERTA LANCIO */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-10">
        <div className="text-center mb-10">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-2">Offerta Lancio Limitata</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            29€ a Vita
          </h2>
          <p className="mt-2 text-slate-400 text-base sm:text-lg">
            Prezzo normale <span className="line-through text-slate-500">149€</span> • Risparmi il 80% • Nessun canone mensile
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl relative text-center">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-bl-2xl shadow-md">
            🔥 Solo Primi 50 Acquirenti
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs mb-4">
            ACCESSO A VITA COMPLETO
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
              <span><strong>Cartella clinica completa</strong> per tutti i cani</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Promemoria automatici</strong> per vaccini, visite e pipette</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Sincronizzazione in famiglia</strong> e con il dog sitter</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Esportazione PDF immediata</strong> per il veterinario</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Tutti gli aggiornamenti futuri inclusi</strong> per sempre</span>
            </li>
          </ul>

          <div className="mt-8">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl uppercase tracking-wider shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
            >
              <span>ACQUISTA ORA — 29€ A VITA</span>
              <ArrowRight className="w-6 h-6 text-slate-950" />
            </button>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-semibold">
              🛡️ Garanzia 14 giorni soddisfatti o rimborsati. Nessuna domanda.
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
