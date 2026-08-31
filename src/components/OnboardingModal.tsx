import React, { useState, useEffect } from 'react';
import { 
  Dog, 
  Smartphone, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Stethoscope, 
  Calendar, 
  X, 
  ChevronRight, 
  ArrowRight,
  ExternalLink,
  Info,
  LogOut,
  User,
  HeartHandshake,
  Download,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface UserAccount {
  name: string;
  email: string;
  photoUrl?: string;
  provider: 'google' | 'email' | 'guest';
  id: string;
  joinedAt: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLoginWithGoogle: (customUser?: Partial<UserAccount>) => void;
  onLogout: () => void;
  installPromptEvent: any;
  onTriggerInstall: () => void;
  isStandalone: boolean;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  currentUser,
  onLoginWithGoogle,
  onLogout,
  installPromptEvent,
  onTriggerInstall,
  isStandalone
}: OnboardingModalProps) {
  const [activeTab, setActiveTab] = useState<'welcome' | 'install' | 'login' | 'guide'>('welcome');
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loginSuccessToast, setLoginSuccessToast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
      setIsAndroid(/android/.test(userAgent));
    }
  }, []);

  const handleGoogleLogin = () => {
    // Simulazione autenticazione Google OAuth veloce ed elegante
    onLoginWithGoogle({
      name: customName.trim() || 'Proprietario Milo',
      email: customEmail.trim() || 'utente.dogkit@gmail.com',
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      provider: 'google',
      id: 'google_' + Date.now(),
      joinedAt: new Date().toISOString()
    });
    setLoginSuccessToast(true);
    setTimeout(() => {
      setLoginSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    onLoginWithGoogle({
      name: customName.trim() || customEmail.split('@')[0],
      email: customEmail.trim(),
      photoUrl: undefined,
      provider: 'email',
      id: 'email_' + Date.now(),
      joinedAt: new Date().toISOString()
    });
    setLoginSuccessToast(true);
    setTimeout(() => {
      setLoginSuccessToast(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header con gradiente elegante */}
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white p-6 sm:p-7 relative overflow-hidden shrink-0">
            {/* Texture di sfondo */}
            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 translate-y-6 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-white/15 hover:bg-white/25 rounded-full text-white transition-all active:scale-90"
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-amber-300 shadow-inner border border-white/20">
                <Dog size={28} className="rotate-[-6deg]" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-extrabold uppercase tracking-widest">
                  Benvenuto su Dog Kit 🐾
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                  La Guida Rapida all'Uso
                </h3>
              </div>
            </div>

            <p className="text-indigo-100/90 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mt-1">
              Scopri subito come scaricare l'app sulla schermata Home, registrarti con Google e sfruttare al massimo ogni funzione per il tuo cane.
            </p>

            {/* Tab di navigazione */}
            <div className="flex gap-1.5 mt-5 bg-white/10 p-1 rounded-2xl backdrop-blur-sm text-xs font-bold overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('welcome')}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'welcome'
                    ? 'bg-white text-indigo-900 shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles size={14} />
                <span>Panoramica</span>
              </button>
              <button
                onClick={() => setActiveTab('install')}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'install'
                    ? 'bg-white text-indigo-900 shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Download size={14} />
                <span>Scarica in Home</span>
                {isStandalone && <span className="text-[10px] text-emerald-500 font-black">✓</span>}
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'bg-white text-indigo-900 shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <User size={14} />
                <span>{currentUser ? 'Il Tuo Account' : 'Accedi con Google'}</span>
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-white text-indigo-900 shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen size={14} />
                <span>Come Funziona</span>
              </button>
            </div>
          </div>

          {/* Contenuto scorrevole delle Tab */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
            {/* Toast successo login */}
            <AnimatePresence>
              {loginSuccessToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-emerald-500 text-white rounded-2xl flex items-center gap-2 text-sm font-bold shadow-lg"
                >
                  <CheckCircle2 size={18} />
                  <span>Accesso eseguito con successo! Benvenuto in Dog Kit.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB 1: PANORAMICA DI BENVENUTO */}
            {activeTab === 'welcome' && (
              <div className="space-y-5">
                <div className="p-5 bg-indigo-50/80 rounded-3xl border border-indigo-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-indigo-700 uppercase tracking-wider">
                      Primi 2 Passaggi Consigliati
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                      Configura l'esperienza perfetta sul tuo telefono
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Salva l'icona in home per aprirla a tutto schermo e accedi con Google per salvare i tuoi dati.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: Scarica in Home */}
                  <div 
                    onClick={() => setActiveTab('install')}
                    className="p-5 bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                        <Smartphone size={22} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base flex items-center justify-between">
                        1. Scarica in Home
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                      </h5>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        Usala come una vera app nativa: accesso rapido con 1 tocco, notifiche e modalità schermo intero.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Vedi come fare</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  {/* Card 2: Registrati con Google */}
                  <div 
                    onClick={() => setActiveTab('login')}
                    className="p-5 bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                        <User size={22} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base flex items-center justify-between">
                        2. Registrati con Google
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                      </h5>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {currentUser 
                          ? `Accesso attivo come ${currentUser.name}. I tuoi progressi sono salvati!` 
                          : 'Sincronizza profilo cane, cartella medica, vaccini e lezioni completate nel cloud.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>{currentUser ? 'Gestisci Account' : 'Accedi Subito'}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>

                {/* 3 Pilastri dell'App */}
                <div className="pt-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                    Cosa puoi fare con Dog Kit
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-start gap-2.5">
                      <Stethoscope size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-slate-800">Triage Sintomi</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Semaforo urgenza e consigli immediati di primo soccorso.</p>
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-start gap-2.5">
                      <BookOpen size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-slate-800">50+ Lezioni</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Educazione pratica, morsi, guinzaglio e socializzazione.</p>
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-start gap-2.5">
                      <Calendar size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-slate-800">Routine & Peso</p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">Cartella clinica, vaccini, planner pasti e peso ideale.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SCARICA IN SCHERMATA HOME (PWA) */}
            {activeTab === 'install' && (
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                  <Smartphone className="text-amber-600 shrink-0 mt-0.5" size={22} />
                  <div>
                    <h4 className="font-extrabold text-sm text-amber-950">
                      Perché aggiungere Dog Kit alla Schermata Home?
                    </h4>
                    <p className="text-xs text-amber-800/90 font-medium leading-relaxed mt-1">
                      Si apre istantaneamente a schermo intero come una vera App dal Play Store o App Store, non consuma spazio di memoria e puoi usarla anche senza connessione internet!
                    </p>
                  </div>
                </div>

                {/* Pulsante rapido nativo se l'evento è supportato */}
                {installPromptEvent && (
                  <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-indigo-600">Installazione Istantanea</p>
                      <h4 className="text-base font-extrabold text-slate-900">Il tuo browser supporta il download diretto</h4>
                    </div>
                    <button
                      onClick={onTriggerInstall}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95 shrink-0"
                    >
                      <Download size={16} />
                      Installa Subito in Home
                    </button>
                  </div>
                )}

                {/* Guida iPhone / iPad (iOS Safari) */}
                <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                      🍎
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900">Su iPhone e iPad (Safari):</h5>
                  </div>
                  <ol className="space-y-2.5 text-xs text-slate-600 font-medium pl-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <span>Tocca il pulsante di <strong>Condivisione</strong> in basso al centro di Safari <Share size={14} className="inline text-blue-500 mx-1" />.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <span>Scorri il menu e tocca <strong>"Aggiungi alla schermata Home"</strong> <PlusSquare size={14} className="inline text-slate-700 mx-1" />.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <span>In alto a destra tocca <strong>"Aggiungi"</strong>. Fatto! Troverai l'icona con Milo tra le tue app.</span>
                    </li>
                  </ol>
                </div>

                {/* Guida Android / Chrome */}
                <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                      🤖
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900">Su Android e PC (Google Chrome):</h5>
                  </div>
                  <ol className="space-y-2.5 text-xs text-slate-600 font-medium pl-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <span>Tocca i <strong>3 puntini ⋮</strong> in alto a destra su Chrome.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <span>Seleziona <strong>"Installa app"</strong> oppure <strong>"Aggiungi a schermata Home"</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <span>Conferma premendo su <strong>"Installa"</strong>.</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 3: REGISTRATI / ACCEDI CON GOOGLE */}
            {activeTab === 'login' && (
              <div className="space-y-6">
                {currentUser ? (
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md border-2 border-white overflow-hidden">
                      {currentUser.photoUrl ? (
                        <img src={currentUser.photoUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-wider">
                        ✓ Account Connesso
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-2">{currentUser.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-left text-xs space-y-1.5">
                      <p className="font-bold text-slate-700 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Sincronizzazione Dati Attiva
                      </p>
                      <p className="text-slate-500">
                        La cartella medica del tuo cane, i promemoria del planner e il registro dei progressi sono salvati per questo profilo.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center pt-2">
                      <button
                        onClick={onLogout}
                        className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                      >
                        <LogOut size={14} />
                        Disconnetti Account
                      </button>
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
                      >
                        Continua
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="p-5 bg-indigo-50/70 rounded-3xl border border-indigo-100 text-center space-y-2">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mx-auto shadow-sm">
                        <ShieldCheck size={26} />
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        Salva i dati del tuo cane nel Cloud
                      </h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
                        Registrandoti non perderai mai la cartella vaccini, il diario del peso e le impostazioni personalizzate del tuo cucciolo.
                      </p>
                    </div>

                    {/* Bottone Google Login Ufficiale Stylizzato */}
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full py-4 px-5 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-800 font-extrabold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 active:scale-[98%]"
                    >
                      {/* Logo Google SVG */}
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span>Continua con Google (1 Tocco)</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">oppure</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {!showEmailForm ? (
                      <button
                        onClick={() => setShowEmailForm(true)}
                        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                      >
                        Registrati con Nome & Email
                      </button>
                    ) : (
                      <form onSubmit={handleEmailLogin} className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Il tuo Nome</label>
                          <input
                            type="text"
                            placeholder="Es. Mario Rossi"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Indirizzo Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="Es. nome@dominio.com"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
                        >
                          Crea Profilo Gratuito
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: GUIDA D'USO E SEZIONI CHIAVE */}
            {activeTab === 'guide' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900">🚨 Triage Sintomi & Primo Soccorso</h5>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                        Se il tuo cane ha vomito, tosse, letargia o diarrea, apri il Triage per ottenere subito il semaforo di urgenza (Verde/Giallo/Rosso) e le istruzioni salvavita.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900">🎓 Academy & Addestramenti 5 Minuti</h5>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                        Più di 50 lezioni guidate con audio sintetico, timer di sessione ed esercizi pratici per educare il cucciolo senza stress.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900">📅 Routine, Peso e Cartella Clinica</h5>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                        Traccia la crescita con la curva del peso, registra vaccini e visite veterinarie con promemoria e pianifica i pasti quotidiani.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer fisso con pulsante di avvio rapido */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition px-2 py-2"
            >
              Continua come Ospite
            </button>

            <div className="flex gap-2">
              {!currentUser && activeTab !== 'login' && (
                <button
                  onClick={() => setActiveTab('login')}
                  className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl transition"
                >
                  Accedi con Google
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Inizia a Esplorare</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
