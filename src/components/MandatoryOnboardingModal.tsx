import React, { useState } from 'react';
import { 
  Dog, 
  Calendar, 
  Bell, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Syringe, 
  Sparkles, 
  Weight, 
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MandatoryOnboardingModalProps {
  isOpen: boolean;
  initialDogName?: string;
  userEmail: string;
  onComplete: (data: {
    dog: {
      name: string;
      breed: string;
      dob: string;
      weight: string;
      targetWeight: string;
    };
    firstVaccine: {
      id: string;
      type: 'vaccine' | 'parasite' | 'vet';
      title: string;
      date: string;
      notes: string;
    };
    notificationsEnabled: boolean;
  }) => void;
}

export default function MandatoryOnboardingModal({
  isOpen,
  initialDogName = '',
  userEmail,
  onComplete
}: MandatoryOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Cane
  const [dogName, setDogName] = useState(initialDogName || 'Milo');
  const [breed, setBreed] = useState('Golden Retriever');
  const [dob, setDob] = useState('2026-01-15');
  const [weight, setWeight] = useState('8.5');

  // Step 2: Prima Scadenza / Vaccino
  const [vaccineType, setVaccineType] = useState<'vaccine' | 'parasite' | 'vet'>('vaccine');
  const [vaccineTitle, setVaccineTitle] = useState('Vaccino Polivalente (DHPPi)');
  const [vaccineDate, setVaccineDate] = useState(() => {
    // Default a 30 giorni da oggi
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [vaccineNotes, setVaccineNotes] = useState('Richiamo annuale consigliato');

  // Step 3: Notifiche
  const [notificationsGranted, setNotificationsGranted] = useState(false);
  const [isRequestingPerm, setIsRequestingPerm] = useState(false);

  if (!isOpen) return null;

  const handleQuickAddDays = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setVaccineDate(d.toISOString().split('T')[0]);
  };

  const handleRequestNotifications = async () => {
    setIsRequestingPerm(true);
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          setNotificationsGranted(true);
        }
      }
    } catch (e) {
      console.warn('Errore autorizzazione notifiche', e);
    } finally {
      setIsRequestingPerm(false);
      setNotificationsGranted(true);
    }
  };

  const handleFinish = () => {
    onComplete({
      dog: {
        name: dogName.trim() || 'Il mio cucciolo',
        breed: breed.trim() || 'Meticcio',
        dob: dob || new Date().toISOString().split('T')[0],
        weight: weight || '10',
        targetWeight: (parseFloat(weight || '10') * 1.3).toFixed(1)
      },
      firstVaccine: {
        id: 'v_init_' + Date.now(),
        type: vaccineType,
        title: vaccineTitle.trim() || 'Vaccino Polivalente',
        date: vaccineDate,
        notes: vaccineNotes.trim()
      },
      notificationsEnabled: notificationsGranted
    });
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* Header Step indicator */}
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider">
                Configurazione Iniziale • Passo {currentStep} di 3
              </span>
              <span className="text-xs font-bold text-indigo-200">
                {currentStep === 1 && '🐾 Profilo Cucciolo'}
                {currentStep === 2 && '💉 Prima Scadenza'}
                {currentStep === 3 && '🔔 Attiva Promemoria'}
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
              <div 
                className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              {currentStep === 1 && `Aggiungi il tuo cane per iniziare`}
              {currentStep === 2 && `Inserisci la prima scadenza sanitaria di ${dogName}`}
              {currentStep === 3 && `Attiva le notifiche intelligenti per non dimenticarla`}
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm font-medium mt-1">
              {currentStep === 1 && `Bastano 30 secondi: inserisci nome, razza ed età.`}
              {currentStep === 2 && `Calcoleremo noi i richiami e ti avviseremo per tempo.`}
              {currentStep === 3 && `Ricevi avvisi prima che scada il vaccino o l'antiparassitario.`}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">

            {/* STEP 1: DATI CANE */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Nome del cane <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="es. Milo, Luna, Charlie..."
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-base outline-none focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Razza
                    </label>
                    <input
                      type="text"
                      placeholder="es. Golden Retriever, Meticcio..."
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                      Data di nascita approssimativa
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Peso attuale (kg)
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="es. 8.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!dogName.trim()}
                  className="w-full mt-4 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Continua: Inserisci la Prima Scadenza</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2: PRIMA SCADENZA / VACCINO */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Tipo di promemoria sanitario
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVaccineType('vaccine');
                        setVaccineTitle('Vaccino Polivalente (DHPPi)');
                      }}
                      className={`p-3 rounded-xl border text-xs font-black flex flex-col items-center gap-1 transition ${
                        vaccineType === 'vaccine'
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Syringe size={18} />
                      <span>Vaccino</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVaccineType('parasite');
                        setVaccineTitle('Pipetta Antiparassitaria Mensile');
                      }}
                      className={`p-3 rounded-xl border text-xs font-black flex flex-col items-center gap-1 transition ${
                        vaccineType === 'parasite'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Sparkles size={18} />
                      <span>Antiparassitario</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVaccineType('vet');
                        setVaccineTitle('Visita Veterinaria di Controllo');
                      }}
                      className={`p-3 rounded-xl border text-xs font-black flex flex-col items-center gap-1 transition ${
                        vaccineType === 'vet'
                          ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Stethoscope size={18} />
                      <span>Visita Vet</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1.5">
                    Nome della cura o vaccino
                  </label>
                  <input
                    type="text"
                    value={vaccineTitle}
                    onChange={(e) => setVaccineTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                      Data di scadenza / richiamo
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(30)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-600"
                      >
                        +30 gg
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(180)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-600"
                      >
                        +6 mesi
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(365)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-600"
                      >
                        +1 anno
                      </button>
                    </div>
                  </div>
                  <input
                    type="date"
                    value={vaccineDate}
                    onChange={(e) => setVaccineDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition"
                  >
                    Indietro
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!vaccineTitle.trim() || !vaccineDate}
                    className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>Continua: Attiva Promemoria</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ATTIVA NOTIFICHE */}
            {currentStep === 3 && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-2xl shadow-inner border border-indigo-100">
                  <Bell size={32} className="animate-bounce" />
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    Non farti sorprendere dalle scadenze di {dogName}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-1">
                    Ricevi un promemoria push sul tuo telefono e una copia di sicurezza alla tua email (<strong>{userEmail}</strong>) prima del <strong>{new Date(vaccineDate).toLocaleDateString('it-IT')}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Scadenza registrata: <strong>{vaccineTitle}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Data richiamo: <strong>{new Date(vaccineDate).toLocaleDateString('it-IT')}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Fallback automatico via email garantito anche su iPhone</span>
                  </div>
                </div>

                {!notificationsGranted ? (
                  <button
                    type="button"
                    onClick={handleRequestNotifications}
                    disabled={isRequestingPerm}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Bell size={18} />
                    <span>{isRequestingPerm ? 'Richiesta permessi...' : 'Attiva Notifiche & Promemoria'}</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Promemoria e notifiche attivati con successo!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inizia la Prova Gratuita di Dog Kit 🐾</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
