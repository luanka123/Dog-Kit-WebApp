import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  GraduationCap, 
  Activity, 
  ShoppingCart, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ArrowRight,
  Clock,
  Dog,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Link di pagamento Stripe di produzione
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/5kQaEW4cafTX5rpcnIeME09";

export interface LandingPageProps {
  onEnterApp?: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  // Stato per gestire le FAQ a fisarmonica
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: <Calendar className="w-8 h-8 text-amber-300" aria-hidden="true" />,
      title: "Mai più scadenze dimenticate",
      desc: "Promemoria automatici e puntuali per richiami vaccinali, pipette antiparassitarie, vermifughi e visite veterinarie."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-300" aria-hidden="true" />,
      title: "Educazione passo dopo passo",
      desc: "Oltre 50 micro-lezioni pratiche e quiz quotidiani per insegnare richiamo, condotta al guinzaglio e calma."
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-300" aria-hidden="true" />,
      title: "Spese veterinarie sotto controllo",
      desc: "Cartella clinica, tracciamento del peso, monitoraggio dei sintomi e calcolatore dosi per prevenire emergenze costose."
    }
  ];

  const trustBadges = [
    { icon: <Lock className="w-5 h-5 text-emerald-400" aria-hidden="true" />, text: "🔒 Dati protetti con SSL" },
    { icon: <ShieldCheck className="w-5 h-5 text-indigo-400" aria-hidden="true" />, text: "🇮🇹 Sviluppato in Italia" },
    { icon: <CheckCircle2 className="w-5 h-5 text-amber-400" aria-hidden="true" />, text: "❌ Nessun dato venduto" },
    { icon: <Smartphone className="w-5 h-5 text-purple-400" aria-hidden="true" />, text: "📱 Funziona su tutti i dispositivi" }
  ];

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" aria-hidden="true" />,
      title: "Calendario Vaccini & Antiparassitari",
      desc: "Promemoria automatici per vaccini, antiparassitari e visite, con calcolo automatico dei giorni rimanenti."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-purple-400" aria-hidden="true" />,
      title: "Percorso Educativo & Academy",
      desc: "Lezioni brevi personalizzate per un cucciolo educato, audio-flashcard e dispense scaricabili."
    },
    {
      icon: <Activity className="w-6 h-6 text-rose-400" aria-hidden="true" />,
      title: "Salute & Benessere Digitale",
      desc: "Registra peso, sintomi e condividi con il veterinario un report PDF dettagliato in 1 clic."
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
      title: "Lista Spese Pet & Budget",
      desc: "Traccia cibo, giochi e cure: sai sempre quanto spendi e dove ottimizzare il budget mensile."
    },
    {
      icon: <Users className="w-6 h-6 text-amber-400" aria-hidden="true" />,
      title: "Famiglia Connessa & Dog Sitter",
      desc: "Condividi compiti con chi si prende cura del tuo cane per essere sempre allineati."
    }
  ];

  const testimonials = [
    {
      name: "Marco B.",
      dog: "Luna (Labrador, 8 mesi)",
      text: "Da quando uso Dog Kit non ho mai più saltato una scadenza di vaccini o antiparassitari per Luna. Le lezioni quotidiane hanno trasformato le nostre passeggiate in momenti di puro relax!",
      rating: 5
    },
    {
      name: "Giulia M.",
      dog: "Rex (Pastore Tedesco, 2 anni)",
      text: "La funzione di cartella clinica con storico del peso e spese mi ha fatto risparmiare centinaia di euro e tantissime ansie con Rex. Interfaccia super intuitiva e veloce!",
      rating: 5
    },
    {
      name: "Andrea T.",
      dog: "Hugo (French Bulldog, 1 anno)",
      text: "Semplicissima da usare e condivisa con tutta la famiglia. Abbiamo educato Hugo in pochissime settimane senza stress. Vale 10 volte il prezzo pagato!",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "1. Posso usare Dog Kit per più cani?",
      a: "Certamente! Puoi registrare e gestire le schede sanitarie, i promemoria e l'educazione di tutti i cani della tua famiglia senza alcun costo aggiuntivo."
    },
    {
      q: "2. Funziona offline?",
      a: "Sì! Dog Kit è sviluppato come Progressive Web App (PWA) moderna: salva i tuoi dati in locale per permetterti di consultare le scadenze e la cartella clinica anche in aree senza copertura internet (es. in montagna o al parco)."
    },
    {
      q: "3. Posso avere un rimborso?",
      a: "Offriamo una garanzia completa di soddisfazione al 100% entro 30 giorni dall'acquisto. Se per qualsiasi motivo l'app non fa al caso tuo, ti basta scriverci per ottenere il rimborso completo immediato."
    },
    {
      q: "4. I miei dati sono al sicuro?",
      a: "Assolutamente sì. I tuoi dati sanitari e anagrafici sono crittografati con standard bancari SSL a 256-bit e rimangono di tua esclusiva proprietà. Non vendiamo né condividiamo mai dati con terze parti."
    },
    {
      q: "5. Come accedo dopo l'acquisto?",
      a: "Non appena completi il pagamento su Stripe verrai reindirizzato direttamente alla web app già sbloccata a vita. Riceverai anche un'email con il tuo link di accesso rapido per salvare l'icona dell'app sulla schermata home del tuo smartphone."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* Top Banner Accesso Esistente */}
      <nav className="w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-lg tracking-tight text-white">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Dog className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span>Dog Kit</span>
          </div>

          <div className="flex items-center gap-3">
            {onEnterApp && (
              <button
                onClick={onEnterApp}
                className="text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition underline cursor-pointer"
                aria-label="Accedi se hai già acquistato Dog Kit"
              >
                Hai già acquistato? Accedi qui →
              </button>
            )}
            <a
              href="#pricing"
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
              aria-label="Vai all'offerta di sblocco a 17 euro"
            >
              Ottieni a 17€
            </a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header 
        className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Cerchi decorativi di sfondo */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <span>La guida & cartella clinica digitale n°1 in Italia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            Il tuo cucciolo felice, la tua mente tranquilla.
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Dog Kit organizza vaccinazioni, educazione e salute del tuo cane in un'unica app semplice.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white hover:bg-slate-50 text-indigo-700 font-black text-lg shadow-2xl hover:shadow-white/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
              aria-label="Sblocca Dog Kit a 17 euro ora su Stripe"
            >
              <span>Sblocca Dog Kit a 17€ Ora →</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-indigo-100/90 font-medium">
            🔒 Pagamento sicuro con Stripe • Accesso immediato dopo l'acquisto
          </p>
        </div>
      </header>

      {/* 2. BENEFIT (3 Colonne Responsive) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Perché oltre 1.200 proprietari usano Dog Kit ogni giorno
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Elimina le ansie quotidiane e prenditi cura del tuo cane in modo scientifico e sereno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/60 mb-5 group-hover:scale-110 transition-all duration-300">
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
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="py-6 px-6 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 p-2">
                {badge.icon}
                <span className="text-sm font-bold text-slate-200">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES (5 Elementi) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">Funzionalità Complete</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Tutto ciò che serve al tuo cane in un'unica app
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Dalla salute alle abitudini quotidiane: ogni modulo è progettato con educatori e veterinari.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex items-start gap-4 sm:gap-6 transition"
            >
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                {feat.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING (17€ PAGAMENTO UNICO) */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto scroll-mt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500 shadow-2xl relative overflow-hidden text-center">
          
          {/* Badge Risparmio */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-md mb-4 animate-pulse">
            🔥 Offerta di lancio - Risparmi 82€ (-83%)
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Dog Kit Completo a Vita
          </h2>
          
          {/* Urgenza */}
          <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 mt-2">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>⏰ Prezzo bloccato per i primi 100 utenti</span>
          </div>

          {/* Box Prezzo */}
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-slate-500 line-through">99€</span>
              <span className="text-5xl sm:text-7xl font-black text-white tracking-tight">17€</span>
              <span className="text-slate-400 text-base sm:text-lg font-bold">/ pagamento unico</span>
            </div>
            <p className="text-xs text-emerald-400 font-bold mt-1">
              ✓ Nessun abbonamento né costi ricorrenti futuri
            </p>
          </div>

          {/* Lista Features di Piano */}
          <div className="max-w-md mx-auto my-8 space-y-3.5 text-left border-t border-b border-slate-800 py-6">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Accesso completo</span> a tutti i moduli
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Aggiornamenti inclusi</span> a vita
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Nessun abbonamento</span> o rinnovo
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Supporto email</span> prioritario dedicato
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Accesso a vita</span> su tutti i tuoi dispositivi
            </div>
          </div>

          {/* PULSANTE CTA CON STRIPE */}
          <div className="mt-6">
            <a 
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg uppercase tracking-wider shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0"
              aria-label="Sblocca Dog Kit a 17 euro ora"
            >
              <span>Sblocca Dog Kit a 17€ Ora →</span>
              <ArrowRight className="w-6 h-6" aria-hidden="true" />
            </a>

            <p className="text-xs text-slate-400 font-medium mt-3">
              Pagamento sicuro con Stripe • Accesso immediato dopo l'acquisto
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (3 Recensioni) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">
            Cosa dicono i proprietari felici
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Esperienze reali di chi ha semplificato la cura del proprio cane con Dog Kit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-indigo-400 font-medium">{t.dog}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ (5 Domande) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">
            Domande Frequenti (FAQ)
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tutto quello che c'è da sapere prima di iniziare.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-200 hover:text-white transition cursor-pointer"
                aria-expanded={openFaq === idx}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
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

      {/* 8. DISCLAIMER LEGALE (OBBLIGATORIO) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div 
          className="p-5 sm:p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm text-xs sm:text-sm leading-relaxed"
          style={{
            backgroundColor: '#fff3cd',
            color: '#78350f'
          }}
        >
          <p className="font-bold mb-1">
            ⚠️ DISCLAIMER LEGALE:
          </p>
          <p>
            Questa applicazione è un progetto personale sviluppato al di fuori dell'orario di lavoro. Non esiste alcun rapporto, patrocinio o connessione con il mio impiego presso istituzioni pubbliche. L'utilizzo dell'app è a solo rischio dell'utente. Tutti i diritti d'autore sono riservati ai sensi della Legge 633/1941.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 py-8 border-t border-slate-900 text-center text-xs text-slate-600 max-w-5xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Dog Kit. Tutti i diritti riservati.</p>
        <p className="mt-1">Progettato per la salute e la serenità dei cani e delle loro famiglie.</p>
      </footer>

    </div>
  );
}
