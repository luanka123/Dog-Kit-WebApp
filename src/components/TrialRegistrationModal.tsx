import React, { useState } from 'react';
import { 
  Dog, 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Lock, 
  KeyRound,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrialRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (accountData: {
    email: string;
    trial_start: string;
    trial_end: string;
    is_premium: boolean;
    name?: string;
  }) => void;
  onDirectCheckout?: () => void;
}

export default function TrialRegistrationModal({
  isOpen,
  onClose,
  onRegisterSuccess,
  onDirectCheckout
}: TrialRegistrationModalProps) {
  const [authMode, setAuthMode] = useState<'password' | 'magic'>('magic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Inserisci un indirizzo email valido.');
      return;
    }

    if (authMode === 'password' && password.length < 6) {
      setError('La password deve contenere almeno 6 caratteri.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();
      const trialStart = now.toISOString();
      // 14 giorni da trial_start
      const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

      onRegisterSuccess({
        email: cleanEmail,
        trial_start: trialStart,
        trial_end: trialEnd,
        is_premium: false,
        name: dogName.trim() ? `Proprietario di ${dogName.trim()}` : cleanEmail.split('@')[0]
      });

      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white p-6 sm:p-7 relative overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-white/15 hover:bg-white/25 rounded-full text-white transition-all active:scale-90"
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner border border-white/20 text-2xl">
                🐶
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-black uppercase tracking-wider">
                  Nessuna carta richiesta
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5 leading-tight">
                  Prova Gratis per 14 Giorni
                </h3>
              </div>
            </div>

            <p className="text-white/90 text-xs sm:text-sm font-medium mt-1">
              Accesso completo istantaneo: promemoria vaccini, cartella clinica digitale e academy educativa.
            </p>
          </div>

          {/* Form Registrazione */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Modalità: Magic Link rapido vs Password */}
            <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('magic')}
                className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  authMode === 'magic'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Zap size={14} className="text-amber-500" />
                <span>Magic Link Istantaneo</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('password')}
                className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  authMode === 'password'
                    ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <KeyRound size={14} className="text-indigo-600" />
                <span>Email + Password</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  La tua email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="nome@esempio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  {authMode === 'magic' 
                    ? 'Ti invieremo qui le conferme e i promemoria delle scadenze sanitarie.' 
                    : 'Usata per il login e per i promemoria di vaccini e visite.'}
                </p>
              </div>

              {/* Password opzionale/richiesta in base al tab */}
              {authMode === 'password' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Crea una password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="password"
                      required
                      placeholder="Minimo 6 caratteri"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              )}

              {/* Nome del cane (opzionale per personalizzare subito) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                  Come si chiama il tuo cane? (opzionale)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">🐾</span>
                  <input
                    type="text"
                    placeholder="es. Milo, Luna, Charlie..."
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Rassicurazioni Zero-Risk */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>Nessuna carta di credito richiesta. Nessun addebito automatico.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium pl-6">
                  <span>Dopo la prova: <strong>29€ una volta sola, per sempre</strong>. Nessun abbonamento.</span>
                </div>
              </div>

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Preparazione prova in corso...</span>
                ) : (
                  <>
                    <span>Inizia la prova gratis di 14 giorni – senza carta</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-500 font-medium">
                Dopo la prova: 29€ una volta sola, per sempre. Nessun abbonamento.
              </p>
            </form>

            {/* Link secondario in fondo */}
            {onDirectCheckout && (
              <div className="pt-3 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={onDirectCheckout}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-2"
                >
                  Hai già deciso? Sblocca subito a 29€
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
