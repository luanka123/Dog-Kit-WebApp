import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ArrowLeft, 
  Heart,
  FileText,
  Clock
} from 'lucide-react';
import { SYMPTOMS_DATA, Symptom, SymptomTriageLevel } from '../data/symptoms';
import { LEZIONI_DATA } from '../lessonsData';

interface SymptomCheckerProps {
  isPremium: boolean;
  onUnlock: (reason: any) => void;
  onNavigate: (page: string) => void;
  dogsList: any[];
  activeDogId: string;
  setActiveDogId: (id: string) => void;
  onSwitchTab: (tab: 'symptoms' | 'procedures' | 'health') => void;
  preSelectedSymptomId: string | null;
  clearPreSelectedSymptom: () => void;
}

export default function SymptomChecker({
  isPremium,
  onUnlock,
  onNavigate,
  dogsList,
  activeDogId,
  setActiveDogId,
  onSwitchTab,
  preSelectedSymptomId,
  clearPreSelectedSymptom
}: SymptomCheckerProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [activeLessonPreview, setActiveLessonPreview] = useState<any | null>(null);

  // Trova il cane attivo
  const activeDog = dogsList.find(d => d.id === activeDogId) || dogsList[0];

  // Gestione del sintomo pre-selezionato (es. lanciato da Planner o Academy)
  useEffect(() => {
    if (preSelectedSymptomId) {
      const found = SYMPTOMS_DATA.find(s => s.id === preSelectedSymptomId);
      if (found) {
        setSelectedSymptom(found);
      }
      clearPreSelectedSymptom();
    }
  }, [preSelectedSymptomId, clearPreSelectedSymptom]);

  const handleSymptomSelect = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
  };

  // Ottieni i colori del semaforo di Triage
  const getTriageStyle = (level: SymptomTriageLevel) => {
    switch (level) {
      case 'emergency':
        return {
          bg: 'bg-red-50 border-red-200',
          badgeBg: 'bg-red-600 text-white',
          text: 'text-red-700',
          dot: 'bg-red-600',
          label: 'Emergenza Subito 🚨',
          desc: 'Richiede attenzione veterinaria immediata. Non attendere.'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          badgeBg: 'bg-amber-500 text-white',
          text: 'text-amber-800',
          dot: 'bg-amber-500',
          label: 'Contatta il Veterinario Oggi 📞',
          desc: 'Monitora attentamente e prenota un controllo veterinario entro 12-24 ore.'
        };
      case 'monitor':
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          badgeBg: 'bg-emerald-600 text-white',
          text: 'text-emerald-800',
          dot: 'bg-emerald-600',
          label: 'Puoi Monitorare a Casa 🏡',
          desc: 'Segui le linee guida e tieni d\'occhio l\'evoluzione del cane.'
        };
    }
  };

  // Cerca la lezione correlata nei dati dell'Academy
  const handleOpenRelatedLesson = (lessonId: string) => {
    let foundLesson: any = null;
    for (const cat of LEZIONI_DATA) {
      const lesson = cat.lezioni.find(l => l.id === lessonId);
      if (lesson) {
        foundLesson = lesson;
        break;
      }
    }

    if (foundLesson) {
      if (!foundLesson.gratis && !isPremium) {
        onUnlock({
          title: `Corso: ${foundLesson.titolo}`,
          description: `Sblocca la lezione specialistica collegata per imparare a gestire questo stato d'animo o sintomo fisico.`,
          trigger: 'academy'
        });
        return;
      }
      setActiveLessonPreview(foundLesson);
    } else {
      alert("La lezione non è al momento disponibile.");
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedSymptom ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Sezione Multi-Cane */}
            <div className="bg-white p-5 rounded-3xl border border-slate-150 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">🐾 Stai controllando il sintomo per:</h4>
                  <p className="text-xl font-black text-slate-800 mt-0.5">{activeDog?.name || 'Milo'}</p>
                </div>
                {dogsList.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-0">
                    {dogsList.map(dog => (
                      <button
                        key={dog.id}
                        onClick={() => setActiveDogId(dog.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeDogId === dog.id
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {dog.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Griglia Sintomi - TikTok style, immediata e visuale */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Scegli un sintomo per avviare il Triage:</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SYMPTOMS_DATA.map(symptom => {
                  const triage = getTriageStyle(symptom.triageLevel);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => handleSymptomSelect(symptom)}
                      className="group bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-left hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-50/50 transition-all flex flex-col justify-between h-40 relative overflow-hidden active:scale-[98%]"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full blur-2xl group-hover:bg-indigo-50/50 transition-all -z-10" />
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${triage.dot}`} />
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            {symptom.triageLevel === 'emergency' ? 'Livello Rosso' : symptom.triageLevel === 'warning' ? 'Livello Arancione' : 'Livello Verde'}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-base text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                          {symptom.name}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {symptom.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${triage.badgeBg}`}>
                          {symptom.triageLevel === 'emergency' ? 'Emergenza' : symptom.triageLevel === 'warning' ? 'Attenzione' : 'Monitora'}
                        </span>
                        <span className="text-xs text-indigo-500 font-extrabold group-hover:translate-x-1 transition-transform">
                          Analizza →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Bottone Indietro */}
            <button
              onClick={() => setSelectedSymptom(null)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors active:scale-95"
            >
              <ArrowLeft size={14} />
              Torna all'elenco sintomi
            </button>

            {/* SCHERMATA RISULTATO TRIAGE COMPATTA (TikTok friendly: leggibile in <= 25 secondi) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-150 shadow-xl overflow-hidden">
              {/* Header con Semaforo Grafico */}
              {(() => {
                const triage = getTriageStyle(selectedSymptom.triageLevel);
                return (
                  <>
                    <div className={`p-6 md:p-8 border-b ${triage.bg} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
                      <div className="space-y-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${triage.badgeBg}`}>
                          TRIAGE: {triage.label}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                          {selectedSymptom.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium max-w-xl">
                          {selectedSymptom.description}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200">
                        <span className="relative flex h-4 w-4">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${triage.dot}`}></span>
                          <span className={`relative inline-flex rounded-full h-4 w-4 ${triage.dot}`}></span>
                        </span>
                        <span className="text-xs font-black text-slate-700 uppercase">Stato: {selectedSymptom.triageLevel}</span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      {/* Descrizione cause e gravità */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">Cosa potrebbe essere (Possibili Cause):</h4>
                        <ul className="list-disc pl-5 text-xs text-slate-600 font-medium space-y-1">
                          {selectedSymptom.causes.map((cause, idx) => (
                            <li key={idx}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Griglia delle Azioni - Cosa FARE e cosa NON fare */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* COSA FARE */}
                        <div className="p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100 space-y-3">
                          <h4 className="font-extrabold text-sm text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                            Cosa FARE a casa ✅
                          </h4>
                          <ul className="space-y-2">
                            {selectedSymptom.advice.do.map((doItem, idx) => (
                              <li key={idx} className="flex gap-2 text-xs text-emerald-950 font-medium leading-relaxed">
                                <span className="text-emerald-600 font-bold shrink-0">•</span>
                                <span>{doItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* COSA NON FARE */}
                        <div className="p-5 bg-red-50/50 rounded-3xl border border-red-100 space-y-3">
                          <h4 className="font-extrabold text-sm text-red-800 flex items-center gap-1.5">
                            <XCircle size={18} className="text-red-600 shrink-0" />
                            Cosa NON FARE assolutamente ❌
                          </h4>
                          <ul className="space-y-2">
                            {selectedSymptom.advice.dont.map((dontItem, idx) => (
                              <li key={idx} className="flex gap-2 text-xs text-red-950 font-medium leading-relaxed">
                                <span className="text-red-600 font-bold shrink-0">•</span>
                                <span>{dontItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pannello CTA Azione Rapida */}
                      <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
                        {/* Pulsante CHIAMA VET */}
                        <a
                          href={activeDog?.vetPhone ? `tel:${activeDog.vetPhone}` : '#'}
                          onClick={(e) => {
                            if (!activeDog?.vetPhone) {
                              e.preventDefault();
                              alert(`Non hai ancora salvato il numero del veterinario per ${activeDog?.name || 'questo cane'}. Vai nella tab "Salute & Clinica" per inserirlo!`);
                              onSwitchTab('health');
                            }
                          }}
                          className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                        >
                          <Phone size={16} />
                          {activeDog?.vetPhone 
                            ? `Chiama Vet (${activeDog.vetName || 'Clinica'}): ${activeDog.vetPhone}` 
                            : 'Chiama Vet (Configura Numero)'
                          }
                        </a>

                        {/* Pulsante Apri Lezione Correlata */}
                        {selectedSymptom.relatedLessonId && (
                          <button
                            onClick={() => handleOpenRelatedLesson(selectedSymptom.relatedLessonId!)}
                            className="flex-1 py-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                          >
                            <BookOpen size={16} />
                            Vedi Lezione Academy Correlata
                          </button>
                        )}

                        {/* Pulsante Vedi Storia Salute */}
                        <button
                          onClick={() => onSwitchTab('health')}
                          className="py-4 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                          <Heart size={16} className="text-red-500" />
                          Cartella Salute
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DISCLAIMER FISSO IN FONDO */}
      <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl text-slate-500 text-[10px] leading-normal flex items-start gap-2">
        <ShieldAlert size={14} className="text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>DISCLAIMER MEDICO:</strong> Questo strumento è solo educativo e non sostituisce il parere di un medico veterinario professionista. In caso di sintomi acuti, forte dolore, letargia profonda o sanguinamento, contatta immediatamente il tuo veterinario di fiducia o corri al pronto soccorso veterinario h24 più vicino.
        </p>
      </div>

      {/* OVERLAY PREVIEW LEZIONE ACADEMY */}
      <AnimatePresence>
        {activeLessonPreview && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-slate-200 shadow-2xl relative space-y-6"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <BookOpen size={20} />
                  <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">Academy Preview</span>
                </div>
                <button
                  onClick={() => setActiveLessonPreview(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-colors"
                >
                  Chiudi
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {activeLessonPreview.titolo}
                </h3>
                <p className="text-xs text-slate-500 italic">
                  {activeLessonPreview.descrizione}
                </p>

                <div className="text-xs text-slate-700 leading-relaxed space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                  <p className="font-medium whitespace-pre-line">{activeLessonPreview.contenuto}</p>
                </div>

                {activeLessonPreview.stepCompleti && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">📋 Step ed Esercizi Pratici Consigliati:</h4>
                    <div className="space-y-2">
                      {activeLessonPreview.stepCompleti.map((step: string, idx: number) => (
                        <div key={idx} className="flex gap-2.5 text-xs text-slate-600 font-medium">
                          <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{idx + 1}</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeLessonPreview.consiglio && (
                  <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-2xl flex items-start gap-2">
                    <span className="text-base">💡</span>
                    <p className="text-[11px] font-semibold">{activeLessonPreview.consiglio}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setActiveLessonPreview(null);
                    onNavigate('academy');
                  }}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <ExternalLinkIcon size={14} />
                  Apri l'intera Academy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExternalLinkIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}
