import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Eye,
  Mail,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrialExpiredModalProps {
  isOpen: boolean;
  onCloseReadOnly: () => void;
  dogName: string;
  checkoutUrl: string;
  userEmail: string;
  onUnlockWithEmail: (email: string) => void;
}

export default function TrialExpiredModal({
  isOpen,
  onCloseReadOnly,
  dogName,
  checkoutUrl,
  userEmail,
  onUnlockWithEmail
}: TrialExpiredModalProps) {
  const [showEmailCheck, setShowEmailCheck] = useState(false);
  const [inputEmail, setInputEmail] = useState(userEmail || '');
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    onUnlockWithEmail(inputEmail.trim());
    setVerifiedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-7 sm:p-8 relative overflow-hidden text-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
              🔒
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-300/30">
              Periodo di Prova Terminato
            </span>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              La tua prova è finita.<br />
              <span className="text-amber-300">I dati di {dogName} sono al sicuro.</span>
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-2 max-w-md mx-auto">
              Sblocca Dog Kit per sempre a 29€ – garanzia 14 giorni soddisfatti o rimborsati.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Status box: I dati sono al sicuro */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>La cartella clinica di <strong>{dogName}</strong> e i vaccini sono memorizzati.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <Lock size={16} className="text-amber-500 shrink-0" />
                <span>L'app è attualmente in <strong>sola lettura</strong> (promemoria in pausa).</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <ShieldCheck size={16} className="text-indigo-600 shrink-0" />
                <span>Nessun canone mensile: <strong>29€ una volta sola</strong> per l'accesso a vita.</span>
              </div>
            </div>

            {/* CTA Principale verso Checkout Stripe */}
            <div className="space-y-3">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2.5 cursor-pointer text-center no-underline"
              >
                <span>Sblocca Dog Kit per sempre a 29€</span>
                <ArrowRight size={20} />
              </a>

              <p className="text-center text-xs text-slate-500 font-semibold">
                🛡️ Garanzia 14 giorni soddisfatti o rimborsati • Pagamento sicuro con Stripe
              </p>
            </div>

            {/* Azioni secondarie */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs font-bold">
              <button
                type="button"
                onClick={onCloseReadOnly}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition py-2 px-3 rounded-xl hover:bg-slate-100"
              >
                <Eye size={16} />
                <span>Visualizza i dati in sola lettura</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEmailCheck(!showEmailCheck)}
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 py-2 px-3"
              >
                Hai già pagato con Stripe?
              </button>
            </div>

            {/* Form per verifica pagamento con email */}
            {showEmailCheck && (
              <form onSubmit={handleVerifyEmail} className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-indigo-900">
                  Inserisci l'email usata per l'acquisto su Stripe per attivare istantaneamente la licenza:
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="tuaemail@esempio.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition"
                  >
                    Verifica
                  </button>
                </div>
                {verifiedSuccess && (
                  <p className="text-xs text-emerald-700 font-bold">
                    ✓ Licenza verificata e collegata con successo!
                  </p>
                )}
              </form>
            )}

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
