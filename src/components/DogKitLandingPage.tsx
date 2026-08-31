import React, { useState } from 'react';
import { 
  Calendar, 
  GraduationCap, 
  HeartPulse, 
  Wallet, 
  Users, 
  Check, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Dog,
  Lock,
  MailCheck
} from 'lucide-react';

export default function DogKitLandingPage() {
  // Stato per gestire le FAQ a fisarmonica
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-amber-300" />,
      title: "Risparmia Tempo Prezioso",
      desc: "Niente più scartoffie o promemoria sparsi: scadenze, peso e visite sincronizzati in 1 solo tocco."
    },
    {
      icon: <Check className="w-6 h-6 text-emerald-300" />,
      title: "Zero Errori & Dimenticanze",
      desc: "Ricevi alert tempestivi per antiparassitari, richiami vaccinali e routine quotidiane dei pasti."
    },
    {
      icon: <Wallet className="w-6 h-6 text-cyan-300" />,
      title: "Previeni Spese Improvvise",
      desc: "Prevenzione costante ed educazione precoce per evitare costose visite veterinarie d'urgenza."
    }
  ];

  const features = [
    {
      icon: <Calendar className="w-7 h-7 text-indigo-500" />,
      title: "1. Calendario Vaccini & Antiparassitari",
      desc: "Promemoria automatici intelligenti per ogni ciclo vaccinale, filaria, pulci, zecche e visite periodiche di controllo con il tuo veterinario.",
      badge: "Salute Preventiva"
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-purple-500" />,
      title: "2. Percorso Educativo Step-by-Step",
      desc: "Più di 50 micro-lezioni da 5 minuti con timer ed esercizi guidati per insegnare richiamo, condotta al guinzaglio e gestione dei morsi.",
      badge: "Academy 5 Minuti"
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-rose-500" />,
      title: "3. Monitoraggio Salute & Peso Ideale",
      desc: "Curva di crescita interattiva, calcolatore nutrizionale per le dosi giornaliere e triage rapido a semaforo per i sintomi d'allarme.",
      badge: "Cartella Clinica"
    },
    {
      icon: <Wallet className="w-7 h-7 text-emerald-500" />,
      title: "4. Gestione Spese & Budget Cane",
      desc: "Traccia con precisione i costi per cibo, cure mediche, toelettatura e accessori per tenere sempre sotto controllo il bilancio familiare.",
      badge: "Controllo Spese"
    },
    {
      icon: <Users className="w-7 h-7 text-amber-500" />,
      title: "5. Condivisione in Famiglia & Dog Sitter",
      desc: "Sincronizza in tempo reale lo stato dei pasti, le passeggiate fatte e i farmaci somministrati con tutti i membri della famiglia o il sitter.",
      badge: "Multi-Utente"
    }
  ];

  const testimonials = [
    {
      name: "Marco B. con Rocky (Labrador 8 mesi)",
      text: "La gestione dei richiami e dell'antiparassitario era un incubo con le date sui foglietti. Con Dog Kit non abbiamo più saltato un giorno e la parte educativa ci ha salvato le passeggiate!",
      rating: 5,
      role: "Proprietario Verificato"
    },
    {
      name: "Chiara V. con Maya (Border Collie 1 anno)",
      text: "Il percorso educativo da 5 minuti al giorno è fantastico. Chiara e stimolante: Maya ha imparato il richiamo al parco in meno di due settimane. Consigliatissimo!",
      rating: 5,
      role: "Proprietaria Verificata"
    },
    {
      name: "Dott. Stefano M. con Leo (Barboncino)",
      text: "App utilissima per tenere lo storico del peso e le scadenze cliniche sempre sottomano durante le visite. Interfaccia pulita, veloce e davvero alla portata di tutti.",
      rating: 5,
      role: "Veterinario & Dog Lover"
    }
  ];

  const faqs = [
    {
      q: "Come funziona l'accesso a Dog Kit dopo il pagamento?",
      a: "Subito dopo il pagamento riceverai via email l'accesso istantaneo alla web app. Potrai aprirla direttamente dal browser del tuo smartphone (iPhone o Android) e salvarla sulla schermata Home come una vera applicazione."
    },
    {
      q: "Posso utilizzare Dog Kit su più dispositivi (es. smartphone e tablet)?",
      a: "Sì, assolutamente. I tuoi dati, la cartella clinica e i progressi sono sincronizzati nel cloud sul tuo account, accessibile da qualsiasi dispositivo connesso a internet."
    },
    {
      q: "È previsto un periodo di prova o garanzia di rimborso?",
      a: "Offriamo una garanzia soddisfatti o rimborsati di 14 giorni. Se per qualsiasi motivo ritieni che Dog Kit non faccia al caso tuo, ti basta scriverci per ricevere un rimborso completo senza domande."
    },
    {
      q: "Il piano include anche gli aggiornamenti e le nuove lezioni future?",
      a: "Sì! Sia con il piano mensile sia con quello annuale hai accesso illimitato a tutti i contenuti attuali e a tutti i nuovi moduli, schede sanitarie ed esercizi educativi che vengono rilasciati."
    },
    {
      q: "Posso cancellare o modificare il mio abbonamento in qualsiasi momento?",
      a: "Sì, puoi gestire o annullare il rinnovo del tuo piano con 1 solo clic direttamente dalla tua area personale in qualsiasi momento, senza vincoli né penali."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      
      {/* 1. HERO SECTION CON GRADIENTE VIOLA/BLU (#667eea -> #764ba2) */}
      <section 
        className="w-full text-white relative overflow-hidden pb-16 sm:pb-24 pt-8 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Decorazione di sfondo */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-indigo-900/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header Brand */}
          <nav className="flex items-center justify-between pb-10 sm:pb-14">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                <Dog className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">Dog Kit</span>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-200">Smart Care & Training</span>
              </div>
            </div>

            <a 
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition backdrop-blur-sm"
            >
              Vedi i Piani
            </a>
          </nav>

          {/* Titoli & Hook Hero */}
          <div className="text-center max-w-3xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>La PWA Tutto-in-Uno per il tuo cane</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Il tuo cucciolo felice, la tua mente tranquilla
            </h1>

            <p className="mt-5 text-base sm:text-xl text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed">
              Dog Kit organizza vaccinazioni, educazione e salute del tuo cane.
            </p>

            {/* CTA Primaria Hero */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#pricing" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <span>Inizia Ora — Scegli il Piano</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Badges nella Hero */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-indigo-100">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <Lock className="w-3.5 h-3.5 text-emerald-300" />
                <span>🔒 SSL Sicuro</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <span>🇮🇹 Italia</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <MailCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>🚫 No spam</span>
              </div>
            </div>
          </div>

          {/* 3. I 3 BENEFIT CON ICONE ( ⏰ 💰) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((b, i) => (
              <div 
                key={i} 
                className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all text-left flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2">{b.title}</h3>
                  <p className="text-indigo-100 text-xs sm:text-sm font-medium leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. LE 5 FEATURE DETTAGLIATE */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Funzionalità Complete
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tutto ciò che ti serve per gestire il tuo cane al meglio
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base font-medium">
            Progettato da esperti cinofili e proprietari per coprire ogni singolo aspetto della vita quotidiana del cane.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between ${
                i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-indigo-600 text-xs font-bold">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Incluso nell'abbonamento</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SEZIONE PREZZI CON 2 CARTE (MENSILE & ANNUALE) & 6. CTA STRIPE */}
      <section id="pricing" className="w-full bg-slate-900 text-white py-16 sm:py-24 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest block mb-2">
              Piani Flessibili & Trasparenti
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Scegli il piano ideale per te e il tuo cane
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base font-medium">
              Attivazione immediata, zero costi nascosti e cancellazione libera in qualsiasi momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* Card 1: Mensile (19€/mese) */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Piano Mensile</h3>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
                    Flessibile
                  </span>
                </div>
                
                <p className="text-slate-400 text-xs sm:text-sm mb-6">
                  Perfetto per provare tutte le funzionalità di Dog Kit mese per mese senza impegni a lungo termine.
                </p>

                <div className="mb-6 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-white">19€</span>
                  <span className="text-slate-400 text-sm font-bold">/ mese</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calendario Vaccini & Antiparassitari con alert</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Percorso educativo completo (50+ lezioni)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Monitoraggio salute, diario peso & pasti</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tracciamento spese & budget</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Accesso da smartphone, tablet e PC</span>
                  </li>
                </ul>
              </div>

              {/* Pulsante CTA Mensile Stripe */}
              <a 
                href="#stripe-monthly"
                className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm uppercase tracking-wider transition text-center block shadow-md border border-slate-700 active:scale-95"
              >
                Abbonati a 19€/mese
              </a>
            </div>

            {/* Card 2: Annuale (169€/anno - Risparmi 59€) */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/80 to-slate-950 border-2 border-indigo-500 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Badge Risparmio in evidenza */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wider">
                ⭐ Risparmi 59€
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Piano Annuale</h3>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
                    Più Popolare
                  </span>
                </div>
                
                <p className="text-slate-400 text-xs sm:text-sm mb-6">
                  La scelta più conveniente per accompagnare la crescita del tuo cucciolo per un intero anno.
                </p>

                <div className="mb-2 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-white">169€</span>
                  <span className="text-slate-400 text-sm font-bold">/ anno</span>
                </div>
                <p className="text-emerald-400 text-xs font-bold mb-6">
                  Equivalente a soli 14,08€ al mese (2 mesi GRATIS)
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>TUTTE</strong> le funzionalità del piano mensile</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Risparmio netto di 59€</strong> all'anno</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Condivisione con tutta la famiglia & Sitter</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Tutti i futuri aggiornamenti e schede incluse</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Supporto prioritario 7 giorni su 7</span>
                  </li>
                </ul>
              </div>

              {/* Pulsante CTA Annuale Stripe */}
              <a 
                href="#stripe-yearly"
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wider transition text-center block shadow-lg shadow-indigo-600/40 active:scale-95 transform hover:-translate-y-0.5"
              >
                Abbonati Annuale a 169€
              </a>
            </div>

          </div>

          <p className="text-center text-xs text-slate-400 mt-8 font-medium">
            🔒 Transazioni sicure gestite tramite crittografia Stripe a 256-bit.
          </p>

        </div>
      </section>

      {/* 7. 3 TESTIMONIALS CON STELLE E NOMI */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
            Dicono di Noi
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Amato da oltre 1.500 proprietari di cani in Italia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* 5 Stelle */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</p>
                <p className="text-[11px] text-indigo-600 font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 5 FAQ CON DOMANDE/RISPOSTE */}
      <section className="w-full bg-slate-100 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest block mb-2">
              Domande Frequenti
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Hai dubbi? Ecco le risposte
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 shrink-0">
                    {openFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA di Chiusura */}
          <div className="mt-12 text-center">
            <a 
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition"
            >
              <span>Scegli il tuo Piano Dog Kit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 9. DISCLAIMER LEGALE IN FONDO (SFONDO GIALLO) */}
      <footer className="w-full bg-amber-100 border-t-2 border-amber-300 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/80 rounded-full text-amber-900 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <span>Disclaimer Legale & Istituzionale</span>
          </div>

          <p className="text-amber-950 font-bold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            "Questa applicazione è un progetto personale sviluppato al di fuori dell'orario di lavoro. 
            Non esiste alcun rapporto con il mio impiego presso istituzioni pubbliche."
          </p>

          <p className="text-[11px] text-amber-800/80 font-medium pt-2 border-t border-amber-200/60">
            Dog Kit © {new Date().getFullYear()} • Tutti i diritti riservati • Progetto indipendente per il benessere canino.
          </p>
        </div>
      </footer>

    </div>
  );
}
