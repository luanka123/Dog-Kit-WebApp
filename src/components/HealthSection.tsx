import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  User, 
  Heart, 
  Activity, 
  Phone, 
  MapPin, 
  PlusCircle, 
  Check, 
  AlertCircle,
  FileText,
  Clock,
  Syringe,
  Pill,
  AlertOctagon,
  BookOpen
} from 'lucide-react';

interface HealthEvent {
  id: string;
  date: string;
  type: 'visit' | 'vaccine' | 'medication' | 'allergy' | 'note';
  title: string;
  description: string;
}

interface HealthSectionProps {
  dogsList: any[];
  setDogsList: React.Dispatch<React.SetStateAction<any[]>>;
  activeDogId: string;
  setActiveDogId: (id: string) => void;
  setPuppyProfile: (profile: any) => void;
}

export default function HealthSection({
  dogsList,
  setDogsList,
  activeDogId,
  setActiveDogId,
  setPuppyProfile
}: HealthSectionProps) {
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // Form Stati Cane
  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const [newDogDob, setNewDogDob] = useState('2026-03-15');
  const [newDogWeight, setNewDogWeight] = useState('8.5');
  const [newDogTargetWeight, setNewDogTargetWeight] = useState('32.0');

  // Form Stati Evento Salute
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventType, setEventType] = useState<'visit' | 'vaccine' | 'medication' | 'allergy' | 'note'>('visit');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  // Trova il cane attivo
  const activeDog = dogsList.find(d => d.id === activeDogId) || dogsList[0];

  // Aggiorna info veterinario sul cane attivo
  const handleUpdateVetInfo = (field: string, value: string) => {
    setDogsList(prev => prev.map(dog => {
      if (dog.id === activeDogId) {
        return {
          ...dog,
          [field]: value
        };
      }
      return dog;
    }));
  };

  // Aggiorna date dei promemoria sul cane attivo
  const handleUpdateReminderDate = (field: string, value: string) => {
    setDogsList(prev => prev.map(dog => {
      if (dog.id === activeDogId) {
        return {
          ...dog,
          [field]: value
        };
      }
      return dog;
    }));
  };

  // Aggiungi un nuovo cane
  const handleAddDog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDogName.trim()) return;

    const newDog = {
      id: 'dog_' + Date.now(),
      name: newDogName,
      breed: newDogBreed || 'Incrocio',
      dob: newDogDob,
      weight: newDogWeight || '10.0',
      targetWeight: newDogTargetWeight || '10.0',
      vetName: '',
      vetPhone: '',
      vetClinic: '',
      healthEvents: [],
      nextAppointmentDate: '',
      nextVaccineDate: ''
    };

    setDogsList(prev => [...prev, newDog]);
    setActiveDogId(newDog.id);
    
    // Aggiorna anche il profilo puppyProfile attivo per mantenere compatibilità
    setPuppyProfile({
      name: newDog.name,
      breed: newDog.breed,
      dob: newDog.dob,
      weight: newDog.weight,
      targetWeight: newDog.targetWeight
    });

    // Reset form
    setNewDogName('');
    setNewDogBreed('');
    setShowAddDogModal(false);
  };

  // Elimina un cane (non l'ultimo rimasto)
  const handleDeleteDog = (dogId: string) => {
    if (dogsList.length <= 1) {
      alert("Devi avere almeno un cane registrato nell'app!");
      return;
    }
    if (window.confirm("Sei sicuro di voler eliminare questo cane e tutta la sua storia medica?")) {
      const remainingDogs = dogsList.filter(d => d.id !== dogId);
      setDogsList(remainingDogs);
      
      const newActive = remainingDogs[0];
      setActiveDogId(newActive.id);
      setPuppyProfile({
        name: newActive.name,
        breed: newActive.breed,
        dob: newActive.dob,
        weight: newActive.weight,
        targetWeight: newActive.targetWeight
      });
    }
  };

  // Cambia cane attivo
  const handleSelectDog = (dogId: string) => {
    setActiveDogId(dogId);
    const selectedDog = dogsList.find(d => d.id === dogId);
    if (selectedDog) {
      setPuppyProfile({
        name: selectedDog.name,
        breed: selectedDog.breed,
        dob: selectedDog.dob,
        weight: selectedDog.weight,
        targetWeight: selectedDog.targetWeight
      });
    }
  };

  // Aggiungi un evento salute al cane attivo
  const handleAddHealthEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent: HealthEvent = {
      id: 'event_' + Date.now(),
      date: eventDate,
      type: eventType,
      title: eventTitle,
      description: eventDesc
    };

    setDogsList(prev => prev.map(dog => {
      if (dog.id === activeDogId) {
        const events = dog.healthEvents ? [...dog.healthEvents, newEvent] : [newEvent];
        // Ordina eventi per data discendente (più recente prima)
        events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return {
          ...dog,
          healthEvents: events
        };
      }
      return dog;
    }));

    // Reset form
    setEventTitle('');
    setEventDesc('');
    setShowAddEventModal(false);
  };

  // Rimuovi evento salute
  const handleDeleteEvent = (eventId: string) => {
    setDogsList(prev => prev.map(dog => {
      if (dog.id === activeDogId) {
        return {
          ...dog,
          healthEvents: (dog.healthEvents || []).filter((e: any) => e.id !== eventId)
        };
      }
      return dog;
    }));
  };

  // Genera etichetta/colore per tipo di evento
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'visit':
        return { label: 'Visita Medica 🏥', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'vaccine':
        return { label: 'Vaccino 💉', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'medication':
        return { label: 'Farmaco / Antiparassitario 💊', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'allergy':
        return { label: 'Allergia / Intolleranza ⚠️', color: 'bg-red-100 text-red-800 border-red-200 animate-pulse' };
      case 'note':
      default:
        return { label: 'Nota Libera 📝', color: 'bg-slate-100 text-slate-800 border-slate-250' };
    }
  };

  return (
    <div className="space-y-6">
      {/* SELETTORE CANI E GESTIONE MULTI-DOG */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-150 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <User size={20} className="text-indigo-600" />
              I Miei Cani ({dogsList.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Seleziona o aggiungi un profilo per aggiornare le sue informazioni sanitarie.</p>
          </div>
          <button
            onClick={() => setShowAddDogModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Plus size={14} />
            Aggiungi Cane
          </button>
        </div>

        {/* Lista Cani Toccabili */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {dogsList.map(dog => (
            <div
              key={dog.id}
              className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${
                activeDogId === dog.id
                  ? 'bg-indigo-50/50 border-indigo-300 shadow-sm ring-1 ring-indigo-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <button
                onClick={() => handleSelectDog(dog.id)}
                className="flex-1 text-left"
              >
                <p className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                  {dog.name}
                  {activeDogId === dog.id && <span className="text-[10px] text-indigo-600 font-bold bg-indigo-100/60 px-1.5 py-0.5 rounded">Attivo</span>}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">{dog.breed || 'Incrocio'}</p>
              </button>

              {dogsList.length > 1 && (
                <button
                  onClick={() => handleDeleteDog(dog.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
                  title="Elimina cane"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD SALUTE CANE ATTIVO */}
      {activeDog && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLONNA SINISTRA: DATI VET & PROMEMORIA BASE */}
          <div className="space-y-6 lg:col-span-1">
            {/* PROMEMORIA BASE */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-150 shadow-sm space-y-4">
              <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={14} className="text-indigo-600" />
                Promemoria Scadenze
              </h4>

              <div className="space-y-3">
                {/* Prossima Visita */}
                <div className="p-3.5 bg-indigo-50/30 rounded-2xl border border-indigo-100 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={12} />
                    Prossima Visita Veterinario
                  </label>
                  <input
                    type="date"
                    value={activeDog.nextAppointmentDate || ''}
                    onChange={(e) => handleUpdateReminderDate('nextAppointmentDate', e.target.value)}
                    className="w-full bg-white px-3 py-1.5 rounded-xl border border-indigo-100 text-xs font-semibold text-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                  {activeDog.nextAppointmentDate ? (
                    <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-wider">In data: {new Date(activeDog.nextAppointmentDate).toLocaleDateString('it-IT')}</p>
                  ) : (
                    <p className="text-[9px] text-slate-400 font-medium">Nessuna visita inserita</p>
                  )}
                </div>

                {/* Prossimo Vaccino */}
                <div className="p-3.5 bg-emerald-50/30 rounded-2xl border border-emerald-100 flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Syringe size={12} />
                    Prossimo Richiamo Vaccino
                  </label>
                  <input
                    type="date"
                    value={activeDog.nextVaccineDate || ''}
                    onChange={(e) => handleUpdateReminderDate('nextVaccineDate', e.target.value)}
                    className="w-full bg-white px-3 py-1.5 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  {activeDog.nextVaccineDate ? (
                    <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">In data: {new Date(activeDog.nextVaccineDate).toLocaleDateString('it-IT')}</p>
                  ) : (
                    <p className="text-[9px] text-slate-400 font-medium">Nessun vaccino inserito</p>
                  )}
                </div>
              </div>
            </div>

            {/* DATI DEL VETERINARIO */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-150 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Heart size={14} className="text-red-500" />
                  Contatto Veterinario
                </h4>
                <span className="px-2 py-0.5 text-[8px] bg-slate-100 text-slate-500 font-bold uppercase rounded">Salvataggio automatico</span>
              </div>

              <div className="space-y-3">
                {/* Nome Veterinario */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nome Vet / Clinica</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400"><User size={14} /></span>
                    <input
                      type="text"
                      value={activeDog.vetName || ''}
                      onChange={(e) => handleUpdateVetInfo('vetName', e.target.value)}
                      placeholder="es. Dott. Rossi / Vet Clinic"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Telefono Veterinario */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Numero di Telefono</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400"><Phone size={14} /></span>
                    <input
                      type="tel"
                      value={activeDog.vetPhone || ''}
                      onChange={(e) => handleUpdateVetInfo('vetPhone', e.target.value)}
                      placeholder="es. +39 347 1234567"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Indirizzo Clinica */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Indirizzo Clinica</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400"><MapPin size={14} /></span>
                    <input
                      type="text"
                      value={activeDog.vetClinic || ''}
                      onChange={(e) => handleUpdateVetInfo('vetClinic', e.target.value)}
                      placeholder="es. Via Garibaldi 12, Milano"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {activeDog.vetPhone && (
                  <a
                    href={`tel:${activeDog.vetPhone}`}
                    className="w-full mt-2 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-150 text-emerald-700 font-extrabold text-xs text-center rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone size={12} />
                    Componi Numero Vet
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* COLONNA DESTRA (LARGHEZZA 2/3): HISTORIC HEALTH EVENTS */}
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-150 shadow-sm space-y-4 min-h-[400px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <Activity size={20} className="text-indigo-600 animate-pulse" />
                      Cartella Clinica & Storico Eventi ({activeDog.healthEvents?.length || 0})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Traccia visite, vaccini, farmaci assunti, allergie del cane.</p>
                  </div>
                  <button
                    onClick={() => setShowAddEventModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0"
                  >
                    <PlusCircle size={14} />
                    Registra Evento
                  </button>
                </div>

                {/* Lista Eventi Loggati */}
                <div className="space-y-3 mt-4">
                  {!activeDog.healthEvents || activeDog.healthEvents.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 space-y-2">
                      <FileText size={40} className="mx-auto text-slate-300" />
                      <p className="text-xs font-bold uppercase tracking-wider">Nessun evento registrato per {activeDog.name}</p>
                      <p className="text-[11px] font-medium text-slate-400 max-w-sm mx-auto">Tieni traccia delle scadenze sanitarie, vaccinazioni ed allergie cliccando sul bottone in alto.</p>
                    </div>
                  ) : (
                    activeDog.healthEvents.map((event: any) => {
                      const badge = getEventBadge(event.type);
                      return (
                        <div
                          key={event.id}
                          className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start justify-between gap-4 hover:border-slate-350 transition-colors"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-black uppercase text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(event.date).toLocaleDateString('it-IT')}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            <h5 className="font-extrabold text-sm text-slate-800 leading-tight">
                              {event.title}
                            </h5>

                            {event.description && (
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {event.description}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Elimina evento"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Informazioni d'uso */}
              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium leading-relaxed">
                ℹ️ I dati sanitari inseriti sono archiviati localmente e protetti nel tuo browser. Sostituiscono e arricchiscono il classico libretto sanitario cartaceo.
              </div>

            </div>
          </div>

        </div>
      )}

      {/* MODAL AGGIUNGI CANE */}
      <AnimatePresence>
        {showAddDogModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  <PlusCircle size={18} className="text-indigo-600" />
                  Aggiungi Nuovo Cane
                </h4>
                <button
                  onClick={() => setShowAddDogModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 font-bold"
                >
                  Annulla
                </button>
              </div>

              <form onSubmit={handleAddDog} className="space-y-3.5">
                {/* Nome */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Nome Cane *</label>
                  <input
                    type="text"
                    required
                    value={newDogName}
                    onChange={(e) => setNewDogName(e.target.value)}
                    placeholder="es. Stella"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Razza */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Razza</label>
                  <input
                    type="text"
                    value={newDogBreed}
                    onChange={(e) => setNewDogBreed(e.target.value)}
                    placeholder="es. Pastore Tedesco, Incrocio"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Data di Nascita */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Data di Nascita</label>
                  <input
                    type="date"
                    value={newDogDob}
                    onChange={(e) => setNewDogDob(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Pesi */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Peso Attuale (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newDogWeight}
                      onChange={(e) => setNewDogWeight(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Peso Target (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newDogTargetWeight}
                      onChange={(e) => setNewDogTargetWeight(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
                >
                  Crea Profilo Cane
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL REGISTRA EVENTO SALUTE */}
      <AnimatePresence>
        {showAddEventModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                  <Activity size={18} className="text-indigo-600 animate-pulse" />
                  Registra Evento Sanitario
                </h4>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 font-bold"
                >
                  Annulla
                </button>
              </div>

              <form onSubmit={handleAddHealthEvent} className="space-y-3.5">
                {/* Tipo Evento */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Tipo di Evento *</label>
                  <select
                    value={eventType}
                    onChange={(e: any) => setEventType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="visit">Visita Medica 🏥</option>
                    <option value="vaccine">Vaccino 💉</option>
                    <option value="medication">Farmaco / Antiparassitario 💊</option>
                    <option value="allergy">Allergia / Intolleranza ⚠️</option>
                    <option value="note">Nota Libera 📝</option>
                  </select>
                </div>

                {/* Data */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Data Evento *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Titolo */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Titolo / Oggetto *</label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="es. Vaccino Annuale Antirabbico"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Descrizione */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Descrizione / Dettagli</label>
                  <textarea
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    placeholder="es. Richiamo vaccino eseguito con successo, nessuna reazione avversa registrata. Prossimo richiamo tra 1 anno."
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
                >
                  Registra Evento Clinico
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
