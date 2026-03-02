/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dog, 
  Calendar, 
  Clock, 
  Heart, 
  ShoppingBag, 
  ShoppingCart,
  BookOpen, 
  Video, 
  Mic, 
  Bot,
  MessageSquare,
  Sun,
  Moon,
  Zap,
  Pill,
  Activity,
  HelpCircle, 
  Menu, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Send,
  Save,
  RotateCcw,
  AlertCircle,
  Stethoscope,
  Weight,
  Syringe,
  History,
  ExternalLink,
  PlayCircle,
  Headphones,
  MessageCircleQuestion,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Page, 
  RoutineItem, 
  TrainingDay, 
  ShoppingItem, 
  Resource 
} from './types';
import { RESOURCES, TRAINING_DAYS, FAQ_DATA } from './constants';

export default function App() {
  // --- State ---
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hasSeenWelcome = localStorage.getItem('dogkit_welcome_seen');
    return hasSeenWelcome ? 'home' : 'welcome';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [routine, setRoutine] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem('dogkit_routine');
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'Colazione servita', time: '08:00', completed: false, type: 'morning' },
      { id: '2', label: 'Passeggiata mattutina', time: '08:30', completed: false, type: 'morning' },
      { id: '3', label: 'Acqua fresca', completed: false, type: 'morning' },
      { id: '4', label: 'Cena servita', time: '19:00', completed: false, type: 'evening' },
      { id: '5', label: 'Passeggiata serale', time: '19:30', completed: false, type: 'evening' },
      { id: '6', label: 'Coccole e relax', completed: false, type: 'evening' },
    ];
  });

  const [training, setTraining] = useState<TrainingDay[]>(() => {
    const saved = localStorage.getItem('dogkit_training');
    return saved ? JSON.parse(saved) : TRAINING_DAYS;
  });

  const [shopping, setShopping] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('dogkit_shopping');
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'Crocchette puppy', category: 'Cibo', completed: false },
      { id: '2', label: 'Ciotola acqua', category: 'Cibo', completed: false },
      { id: '3', label: 'Antiparassitari', category: 'Salute', completed: false },
      { id: '4', label: 'Shampoo specifico', category: 'Salute', completed: false },
      { id: '5', label: 'Giochi masticabili', category: 'Giochi', completed: false },
      { id: '6', label: 'Guinzaglio e collare', category: 'Accessori', completed: false },
    ];
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('dogkit_routine', JSON.stringify(routine));
  }, [routine]);

  useEffect(() => {
    localStorage.setItem('dogkit_training', JSON.stringify(training));
  }, [training]);

  useEffect(() => {
    localStorage.setItem('dogkit_shopping', JSON.stringify(shopping));
  }, [shopping]);

  // --- Handlers ---
  const toggleRoutine = (id: string) => {
    setRoutine(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const toggleTraining = (id: string) => {
    setTraining(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const toggleShopping = (id: string) => {
    setShopping(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // --- Computed ---
  const trainingProgress = useMemo(() => {
    const completed = training.filter(t => t.completed).length;
    return (completed / 7) * 100;
  }, [training]);

  // --- Components ---
  const SidebarItem = ({ id, label, icon: Icon }: { id: Page, label: string, icon: any }) => (
    <button
      onClick={() => { setCurrentPage(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        currentPage === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {currentPage === id && <motion.div layoutId="active-pill" className="ml-auto"><ChevronRight size={16} /></motion.div>}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300 lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
              <Dog size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Dog Kit</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Milo Everwood</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            <SidebarItem id="welcome" label="Benvenuto" icon={Info} />
            <SidebarItem id="home" label="Dashboard" icon={Dog} />
            <SidebarItem id="routine" label="Routine" icon={Clock} />
            <SidebarItem id="training" label="5 Minuti" icon={Zap} />
            <SidebarItem id="planner" label="Planner" icon={Calendar} />
            <SidebarItem id="shopping" label="Shopping" icon={ShoppingCart} />
            <SidebarItem id="resources" label="Risorse" icon={BookOpen} />
            <SidebarItem id="faq" label="FAQ & Consigli" icon={MessageCircleQuestion} />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Versione App</p>
              <p className="text-xs font-bold text-slate-600">1.2.0 - Offline Mode</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold">Milo Everwood</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Digital Dog Care</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://picsum.photos/seed/dog/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              {currentPage === 'home' && <HomeView 
                routine={routine} 
                trainingProgress={trainingProgress} 
                onNavigate={setCurrentPage} 
              />}
              {currentPage === 'welcome' && <WelcomeView onStart={() => {
                localStorage.setItem('dogkit_welcome_seen', 'true');
                setCurrentPage('home');
              }} />}
              {currentPage === 'routine' && <RoutineView routine={routine} onToggle={toggleRoutine} setRoutine={setRoutine} />}
              {currentPage === 'training' && <TrainingView training={training} onToggle={toggleTraining} progress={trainingProgress} setTraining={setTraining} />}
              {currentPage === 'planner' && <PlannerView />}
              {currentPage === 'shopping' && <ShoppingView items={shopping} onToggle={toggleShopping} setItems={setShopping} />}
              {currentPage === 'resources' && <ResourcesView />}
              {currentPage === 'faq' && <FaqView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Views ---

function HomeView({ routine, trainingProgress, onNavigate }: any) {
  const completedRoutine = routine.filter((r: any) => r.completed).length;
  
  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Bentornato, Milo! 🐾</h2>
        <p className="text-slate-500 mt-1">Ecco come sta andando la giornata del tuo cucciolo.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Routine Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Routine</span>
          </div>
          <h3 className="text-2xl font-bold">{completedRoutine}/{routine.length}</h3>
          <p className="text-sm text-slate-500 mb-6">Attività completate oggi</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(completedRoutine / routine.length) * 100}%` }}
              className="h-full bg-orange-500" 
            />
          </div>
          <button onClick={() => onNavigate('routine')} className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
            Vedi dettagli <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Training</span>
          </div>
          <h3 className="text-2xl font-bold">{Math.round(trainingProgress)}%</h3>
          <p className="text-sm text-slate-500 mb-6">Progresso settimanale</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${trainingProgress}%` }}
              className="h-full bg-indigo-600" 
            />
          </div>
          <button onClick={() => onNavigate('training')} className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
            Inizia sessione <ChevronRight size={16} />
          </button>
        </div>

        {/* FAQ Quick Access */}
        <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageCircleQuestion size={24} />
            </div>
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">FAQ</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Dubbi o domande?</h3>
          <p className="text-sm text-white/80 flex-1">Consulta la nostra guida rapida con le risposte degli esperti.</p>
          <button onClick={() => onNavigate('faq')} className="mt-6 w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
            Leggi FAQ
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-600" />
          Risorse Rapide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCES.slice(0, 4).map(res => (
            <a 
              key={res.id} 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mb-3">
                {res.type === 'pdf' && <BookOpen size={20} />}
                {res.type === 'video' && <Video size={20} />}
                {res.type === 'audio' && <Mic size={20} />}
              </div>
              <p className="text-sm font-bold line-clamp-1">{res.title}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1">{res.type}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function RoutineView({ routine, onToggle, setRoutine }: any) {
  const morning = routine.filter((r: any) => r.type === 'morning');
  const evening = routine.filter((r: any) => r.type === 'evening');

  const resetRoutine = () => {
    if (confirm('Vuoi resettare tutte le attività di oggi?')) {
      setRoutine((prev: any) => prev.map((r: any) => ({ ...r, completed: false })));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Routine Quotidiana</h2>
          <p className="text-slate-500">Monitora le attività di oggi</p>
        </div>
        <button onClick={resetRoutine} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <RotateCcw size={18} />
          <span className="font-semibold text-sm">Resetta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-orange-600">
            <Sun size={20} /> Mattina
          </h3>
          <div className="space-y-3">
            {morning.map((item: any) => (
              <div 
                key={item.id} 
                onClick={() => onToggle(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  item.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                }`}>
                  {item.completed && <CheckCircle2 size={16} />}
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${item.completed ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'}`}>
                    {item.label}
                  </p>
                  {item.time && <p className="text-xs text-slate-400 font-medium">{item.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-600">
            <Moon size={20} /> Sera
          </h3>
          <div className="space-y-3">
            {evening.map((item: any) => (
              <div 
                key={item.id} 
                onClick={() => onToggle(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  item.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                }`}>
                  {item.completed && <CheckCircle2 size={16} />}
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${item.completed ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'}`}>
                    {item.label}
                  </p>
                  {item.time && <p className="text-xs text-slate-400 font-medium">{item.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TrainingView({ training, onToggle, progress, setTraining }: any) {
  const resetProgress = () => {
    if (confirm('Vuoi resettare il progresso settimanale?')) {
      setTraining((prev: any) => prev.map((t: any) => ({ ...t, completed: false })));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">5 Minuti Settimanali</h2>
          <p className="text-slate-500">Rafforza il legame con il tuo cane</p>
        </div>
        <button onClick={resetProgress} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <RotateCcw size={18} />
          <span className="font-semibold text-sm">Reset</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Progresso</span>
          <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-600" 
          />
        </div>
      </div>

      <div className="space-y-4">
        {training.map((day: any) => (
          <div 
            key={day.id}
            className={`bg-white rounded-3xl border transition-all overflow-hidden ${
              day.completed ? 'border-emerald-200' : 'border-slate-200'
            }`}
          >
            <div className="p-6 flex items-start gap-4">
              <div 
                onClick={() => onToggle(day.id)}
                className={`shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  day.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400'
                }`}
              >
                {day.completed && <CheckCircle2 size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{day.day}</span>
                  <h3 className={`font-bold text-lg ${day.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                    {day.title}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${day.completed ? 'text-slate-300' : 'text-slate-500'}`}>
                  {day.description}
                </p>
                {day.tip && !day.completed && (
                  <div className="mt-4 p-3 bg-indigo-50 rounded-xl flex items-start gap-3">
                    <Zap size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-700 font-medium">
                      <span className="font-bold">Suggerimento:</span> {day.tip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShoppingView({ items, onToggle, setItems }: any) {
  const categories = Array.from(new Set(items.map((i: any) => i.category)));

  const resetList = () => {
    if (confirm('Vuoi resettare la lista della spesa?')) {
      setItems((prev: any) => prev.map((i: any) => ({ ...i, completed: false })));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shopping List</h2>
          <p className="text-slate-500">Cose da comprare per il tuo cucciolo</p>
        </div>
        <button onClick={resetList} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <RotateCcw size={18} />
          <span className="font-semibold text-sm">Resetta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat: any) => (
          <section key={cat} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShoppingCart size={14} /> {cat}
            </h3>
            <div className="space-y-2">
              {items.filter((i: any) => i.category === cat).map((item: any) => (
                <div 
                  key={item.id}
                  onClick={() => onToggle(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    item.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                  }`}>
                    {item.completed && <CheckCircle2 size={14} />}
                  </div>
                  <span className={`font-bold text-sm ${item.completed ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ResourcesView() {
  const [filter, setFilter] = useState<'all' | 'pdf' | 'video' | 'audio'>('all');
  
  const filtered = RESOURCES.filter(r => filter === 'all' || r.type === filter);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Risorse & Guide</h2>
        <p className="text-slate-500">Tutto il materiale formativo di Milo Everwood</p>
      </header>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {(['all', 'pdf', 'video', 'audio'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f === 'all' ? 'Tutte' : f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(res => (
          <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                res.type === 'pdf' ? 'bg-red-50 text-red-600' : 
                res.type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
              }`}>
                {res.type === 'pdf' && <BookOpen size={24} />}
                {res.type === 'video' && <PlayCircle size={24} />}
                {res.type === 'audio' && <Headphones size={24} />}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 leading-tight">{res.title}</h3>
            <p className="text-sm text-slate-500 flex-1 mb-6 leading-relaxed">{res.description}</p>
            <a 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              {res.type === 'pdf' ? 'Scarica PDF' : res.type === 'video' ? 'Guarda Video' : 'Ascolta Audio'}
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerView() {
  const [plannerData, setPlannerData] = useState(() => {
    const saved = localStorage.getItem('dogkit_planner');
    return saved ? JSON.parse(saved) : {
      pasti: ['', '', '', '', '', '', ''],
      uscite: ['', '', '', '', '', '', ''],
      attivita: ['', '', '', '', '', '', ''],
      coccole: ['', '', '', '', '', '', ''],
    };
  });

  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const rows = [
    { id: 'pasti', label: 'Pasti' },
    { id: 'uscite', label: 'Uscite' },
    { id: 'attivita', label: 'Attività' },
    { id: 'coccole', label: 'Coccole' },
  ];

  const handleUpdate = (rowId: string, dayIdx: number, value: string) => {
    setPlannerData((prev: any) => {
      const newData = { ...prev };
      newData[rowId][dayIdx] = value;
      localStorage.setItem('dogkit_planner', JSON.stringify(newData));
      return newData;
    });
  };

  const clearPlanner = () => {
    if (confirm('Vuoi pulire tutto il planner?')) {
      const empty = {
        pasti: ['', '', '', '', '', '', ''],
        uscite: ['', '', '', '', '', '', ''],
        attivita: ['', '', '', '', '', '', ''],
        coccole: ['', '', '', '', '', '', ''],
      };
      setPlannerData(empty);
      localStorage.setItem('dogkit_planner', JSON.stringify(empty));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Planner Settimanale</h2>
          <p className="text-slate-500">Organizza la routine della settimana</p>
        </div>
        <button onClick={clearPlanner} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Trash2 size={18} />
          <span className="font-semibold text-sm">Pulisci</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Attività</th>
                {days.map(day => (
                  <th key={day} className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/30">{row.label}</td>
                  {days.map((_, idx) => (
                    <td key={idx} className="p-2">
                      <input 
                        type="text" 
                        value={plannerData[row.id][idx]}
                        onChange={(e) => handleUpdate(row.id, idx, e.target.value)}
                        placeholder="-"
                        className="w-full p-2 text-center text-sm bg-transparent border border-transparent hover:border-slate-200 focus:border-indigo-300 focus:bg-indigo-50/30 rounded-lg outline-none transition-all"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FaqView() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold">FAQ & Consigli</h2>
        <p className="text-slate-500">Le risposte degli esperti di Milo Everwood alle domande più comuni</p>
      </header>

      <div className="space-y-6">
        {FAQ_DATA.map((category, catIdx) => (
          <section key={catIdx} className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.questions.map((item, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div 
                    key={id} 
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      isOpen ? 'border-indigo-200 shadow-md' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : id)}
                      className="w-full p-5 flex items-center justify-between text-left"
                    >
                      <span className="font-bold text-slate-700 pr-4">{item.q}</span>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'
                      }`}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50 mt-1 pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 text-center">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">Non trovi quello che cerchi?</h3>
        <p className="text-sm text-indigo-700/70 mb-6">Contattaci direttamente per una consulenza personalizzata con i nostri esperti.</p>
        <a 
          href="mailto:mario@miloverwood.com" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Invia un'Email
        </a>
      </div>
    </div>
  );
}

function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-200 rotate-3">
          <Dog size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            Benvenuto in <span className="text-indigo-600">Milo Everwood</span>
          </h1>
          <p className="text-xl font-medium text-slate-400">Digital Dog Care</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          Questa Web App è il cuore pulsante del tuo <strong>Dog Kit Multimediale</strong>. 
          È stata progettata per essere il tuo assistente digitale quotidiano, offrendoti un accesso rapido a tutte le risorse del kit: 
          dai video tutorial ai podcast, fino al planner interattivo per gestire appunti e promemoria direttamente dal tuo smartphone.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Il nostro obiettivo è semplificare l'organizzazione della vita con il tuo cane, fornendoti strumenti pratici e contenuti educativi di alta qualità per migliorare la vostra sintonia quotidiana.
        </p>
      </div>

      <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <ShieldAlert size={24} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Nota Importante</h3>
        </div>
        <p className="text-sm text-amber-800/80 leading-relaxed">
          I contenuti presenti in questa app (testi, infografiche e suggerimenti) hanno scopo puramente informativo ed educativo. 
          Milo Everwood non fornisce consulenze mediche o veterinarie. In caso di emergenza o dubbi sulla salute del tuo cane, consulta sempre un veterinario professionista.
        </p>
      </div>

      <button 
        onClick={onStart}
        className="w-full py-5 bg-indigo-600 text-white font-bold text-xl rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
      >
        Ho capito e confermo <ChevronRight size={24} />
      </button>
    </div>
  );
}
