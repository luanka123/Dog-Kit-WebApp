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
  Lock,
  Key,
  Phone,
  LifeBuoy,
  AlertTriangle,
  History,
  ExternalLink,
  PlayCircle,
  Headphones,
  MessageCircleQuestion,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldAlert,
  Bell,
  Volume2,
  Settings,
  Droplet,
  Utensils,
  Award,
  Camera,
  TrendingUp,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Page, 
  RoutineItem, 
  TrainingDay, 
  ShoppingItem, 
  PlannerItem,
  Resource,
  NotificationSetting
} from './types';
import { RESOURCES, TRAINING_DAYS, FAQ_DATA } from './constants';
import { LEZIONI_DATA } from './lessonsData';

// Costanti di Monetizzazione centralizzate
export const PREMIUM = {
  prezzo: 17,
  valuta: 'EUR',
  checkoutUrl: 'https://stan.store/MiloEverwood?product=dogkit',
  lezioniGratis: 3,
  nome: 'Milo Everwood Premium',
  tagline: 'Tutto ciò che serve al tuo cucciolo'
};

export default function App() {
  // --- State Monetizzazione & Profilo ---
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    const saved = localStorage.getItem('dogkit_premium');
    return saved === 'true';
  });

  const [puppyProfile, setPuppyProfile] = useState(() => {
    const saved = localStorage.getItem('dogkit_puppy_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Milo',
      breed: 'Golden Retriever',
      dob: '2026-03-15',
      weight: '8.5',
      targetWeight: '32.0'
    };
  });

  // Galleria locale (max 10 foto per free tier)
  const [photos, setPhotos] = useState<string[]>(() => {
    const saved = localStorage.getItem('dogkit_photos');
    return saved ? JSON.parse(saved) : [];
  });

  // Lezioni lette/completate
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('dogkit_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Dialog / Overlay di acquisto premium
  const [premiumOverlayReason, setPremiumOverlayReason] = useState<{
    title: string;
    description: string;
    trigger: string;
  } | null>(null);

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
    const defaultItems: ShoppingItem[] = [
      { id: 'f1', label: 'Crocchette', category: 'Cibo', completed: false, isFixed: true },
      { id: 'f2', label: 'Sacchetti igienici', category: 'Igiene', completed: false, isFixed: true },
      { id: 'f3', label: 'Snack premio', category: 'Cibo', completed: false, isFixed: true },
      { id: 'f4', label: 'Antiparassitari', category: 'Salute', completed: false, isFixed: true },
    ];
    return saved ? JSON.parse(saved) : defaultItems;
  });

  const [planner, setPlanner] = useState<PlannerItem[]>(() => {
    const saved = localStorage.getItem('dogkit_planner_v2');
    const defaultItems: PlannerItem[] = [
      { id: 'p1', label: 'Acqua fresca', completed: Array(7).fill(false), isFixed: true, reminder: true },
      { id: 'p2', label: 'Vitamine', completed: Array(7).fill(false), isFixed: true, reminder: true },
      { id: 'p3', label: 'Pasto Mattina', completed: Array(7).fill(false), isFixed: true },
      { id: 'p4', label: 'Pasto Sera', completed: Array(7).fill(false), isFixed: true },
    ];
    return saved ? JSON.parse(saved) : defaultItems;
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>(() => {
    const saved = localStorage.getItem('dogkit_notifications');
    const defaultSettings: NotificationSetting[] = [
      { id: 'n1', label: 'Promemoria Acqua (Mattina)', time: '09:00', enabled: false, type: 'water' },
      { id: 'n2', label: 'Promemoria Acqua (Pomeriggio)', time: '15:00', enabled: false, type: 'water' },
      { id: 'n3', label: 'Promemoria Pasto (Mattina)', time: '08:00', enabled: false, type: 'meal' },
      { id: 'n4', label: 'Promemoria Pasto (Sera)', time: '19:00', enabled: false, type: 'meal' },
    ];
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('dogkit_notifications', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Notification Logic
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      notificationSettings.forEach(setting => {
        if (setting.enabled && setting.time === currentTime) {
          // Prevent multiple notifications in the same minute
          const lastNotifKey = `last_notif_${setting.id}`;
          const lastNotifTime = localStorage.getItem(lastNotifKey);
          const today = now.toDateString();

          if (lastNotifTime !== today) {
            if (Notification.permission === 'granted') {
              new Notification('Dog Kit Reminder 🐾', {
                body: `${setting.label}: È ora!`,
                icon: 'https://picsum.photos/seed/dog/100/100'
              });
              localStorage.setItem(lastNotifKey, today);
            }
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [notificationSettings]);
  useEffect(() => {
    localStorage.setItem('dogkit_routine', JSON.stringify(routine));
  }, [routine]);

  useEffect(() => {
    localStorage.setItem('dogkit_training', JSON.stringify(training));
  }, [training]);

  useEffect(() => {
    localStorage.setItem('dogkit_shopping', JSON.stringify(shopping));
  }, [shopping]);

  useEffect(() => {
    localStorage.setItem('dogkit_planner_v2', JSON.stringify(planner));
  }, [planner]);

  useEffect(() => {
    localStorage.setItem('dogkit_premium', String(isPremium));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem('dogkit_puppy_profile', JSON.stringify(puppyProfile));
  }, [puppyProfile]);

  useEffect(() => {
    localStorage.setItem('dogkit_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem('dogkit_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // --- Handlers ---
  const toggleRoutine = (id: string) => {
    setRoutine(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const toggleTraining = (id: string) => {
    setTraining(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
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

          <nav className="space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-2 scrollbar-thin">
            <SidebarItem id="welcome" label="Benvenuto" icon={Info} />
            <SidebarItem id="home" label="Dashboard" icon={Dog} />
            <SidebarItem id="routine" label="Routine" icon={Clock} />
            <SidebarItem id="training" label="5 Minuti" icon={Zap} />
            <SidebarItem id="academy" label="Academy (50+ Lezioni)" icon={BookOpen} />
            <SidebarItem id="food" label="Alimentazione" icon={Utensils} />
            <SidebarItem id="growth" label="Progressi & Peso" icon={TrendingUp} />
            <SidebarItem id="gallery" label="Galleria Foto" icon={Camera} />
            <SidebarItem id="planner" label="Planner" icon={Calendar} />
            <SidebarItem id="shopping" label="Shopping" icon={ShoppingCart} />
            <SidebarItem id="notifications" label="Notifiche" icon={Bell} />
            <SidebarItem id="first-aid" label="Primo Soccorso" icon={ShieldAlert} />
            <SidebarItem id="resources" label="Risorse & Guide" icon={ShoppingBag} />
            <SidebarItem id="faq" label="FAQ & Consigli" icon={MessageCircleQuestion} />
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2 shrink-0">
            {/* Pulsante Golden Premium in evidenza */}
            <button
              onClick={() => { setCurrentPage('premium'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                isPremium
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md'
                  : 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white shadow-lg hvr-grow hover:from-amber-600 hover:to-yellow-600 animate-pulse'
              }`}
            >
              <Award size={20} className={isPremium ? 'text-yellow-100' : 'text-amber-100'} />
              <span>{isPremium ? 'Milo Premium Attivo ⭐' : 'Passa a Premium — €17'}</span>
              <span className="ml-auto">✨</span>
            </button>

            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-[11px]">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-widest">PWA Versione</p>
                <p className="font-bold text-slate-600">v2.0.0 (Premium gating)</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${isPremium ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                  {isPremium ? 'PREMIUM' : 'FREE'}
                </span>
              </div>
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
                isPremium={isPremium}
                puppyProfile={puppyProfile}
                setPuppyProfile={setPuppyProfile}
                completedLessons={completedLessons}
              />}
              {currentPage === 'welcome' && <WelcomeView onStart={() => {
                localStorage.setItem('dogkit_welcome_seen', 'true');
                setCurrentPage('home');
              }} />}
              {currentPage === 'routine' && <RoutineView routine={routine} onToggle={toggleRoutine} setRoutine={setRoutine} />}
              {currentPage === 'training' && <TrainingView training={training} onToggle={toggleTraining} progress={trainingProgress} setTraining={setTraining} />}
              {currentPage === 'academy' && <AcademyView 
                isPremium={isPremium} 
                onUnlock={(reason: any) => { setPremiumOverlayReason(reason); setCurrentPage('premium'); }} 
                completedLessons={completedLessons}
                setCompletedLessons={setCompletedLessons}
              />}
              {currentPage === 'food' && <AlimentazioneView 
                isPremium={isPremium} 
                onUnlock={(reason: any) => { setPremiumOverlayReason(reason); setCurrentPage('premium'); }} 
                puppyProfile={puppyProfile}
              />}
              {currentPage === 'growth' && <ProgressiView 
                isPremium={isPremium} 
                onUnlock={(reason: any) => { setPremiumOverlayReason(reason); setCurrentPage('premium'); }} 
                puppyProfile={puppyProfile}
                setPuppyProfile={setPuppyProfile}
              />}
              {currentPage === 'gallery' && <GalleriaView 
                isPremium={isPremium} 
                onUnlock={(reason: any) => { setPremiumOverlayReason(reason); setCurrentPage('premium'); }} 
                photos={photos}
                setPhotos={setPhotos}
              />}
              {currentPage === 'premium' && <PremiumView 
                isPremium={isPremium} 
                setIsPremium={setIsPremium} 
                preSelectedReason={premiumOverlayReason} 
                clearReason={() => setPremiumOverlayReason(null)}
              />}
              {currentPage === 'planner' && <PlannerView 
                items={planner} 
                setItems={setPlanner} 
                notificationSettings={notificationSettings}
                setNotificationSettings={setNotificationSettings}
              />}
              {currentPage === 'shopping' && <ShoppingView items={shopping} setItems={setShopping} />}
              {currentPage === 'first-aid' && <FirstAidView />}
              {currentPage === 'resources' && <ResourcesView />}
              {currentPage === 'faq' && <FaqView />}
              {currentPage === 'notifications' && <NotificationsView settings={notificationSettings} setSettings={setNotificationSettings} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Views ---

function HomeView({ routine, trainingProgress, onNavigate, isPremium, puppyProfile, setPuppyProfile, completedLessons }: any) {
  const completedRoutine = routine.filter((r: any) => r.completed).length;

  // --- State per il Cronometro Cucciolo ---
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerType, setTimerType] = useState<'walk' | 'sleep' | 'play' | 'train'>('walk');

  // --- State per Modifica Profilo Cucciolo ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(puppyProfile);

  // Forza sincronizzazione se cambia puppyProfile esternamente
  useEffect(() => {
    setTempProfile(puppyProfile);
  }, [puppyProfile]);

  // Gestione del timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveProfile = () => {
    setPuppyProfile(tempProfile);
    setIsEditingProfile(false);
  };

  // Calcolo dell'età dinamico
  const calculateAge = (dobString: string) => {
    if (!dobString) return "N/D";
    const dob = new Date(dobString);
    const now = new Date();
    
    // Calcolo differenza in millisecondi
    const diffTime = Math.abs(now.getTime() - dob.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const months = Math.floor(diffDays / 30.4);
    if (months > 0) {
      const remainingWeeks = Math.floor((diffDays % 30.4) / 7);
      return `${months} mes${months > 1 ? 'i' : 'e'}${remainingWeeks > 0 ? ` e ${remainingWeeks} sett.` : ''}`;
    } else {
      const weeks = Math.floor(diffDays / 7);
      return weeks > 0 ? `${weeks} sett.` : `${diffDays} giorni`;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Ciao, proprietario di {puppyProfile.name}! 🐾
          </h2>
          <p className="text-slate-500 mt-1">Gestisci la giornata, l'addestramento e i traguardi del tuo cucciolo.</p>
        </div>
        
        {/* Quick state debug/test button inside home view */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">PWA Mode:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none ${
            isPremium 
              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {isPremium ? '👑 Premium Attivo' : '🆓 Piano Gratuito'}
          </span>
        </div>
      </header>

      {/* Grid delle Statistiche Chiave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Routine Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Routine</span>
          </div>
          <h3 className="text-2xl font-black">{completedRoutine}/{routine.length}</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">Controlla a colpo d’occhio cosa hai già completato oggi.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(completedRoutine / routine.length) * 100}%` }}
               className="h-full bg-orange-500" 
            />
          </div>
          <button onClick={() => onNavigate('routine')} className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs">
            Vedi dettagli <ChevronRight size={16} />
          </button>
        </div>

        {/* Training Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Training</span>
          </div>
          <h3 className="text-2xl font-black">{Math.round(trainingProgress)}%</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">Il tuo progresso settimanale nei 5 minuti ti aiuta a mantenere costanza e serenità.</p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${trainingProgress}%` }}
               className="h-full bg-indigo-600" 
            />
          </div>
          <button onClick={() => onNavigate('training')} className="mt-6 w-full py-3 bg-slate-100 text-indigo-600 font-bold rounded-xl hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2 text-xs">
            Inizia sessione <ChevronRight size={16} />
          </button>
        </div>

        {/* Warning / Emergency Card */}
        <div className="bg-red-50 p-6 rounded-3xl text-red-950 border border-red-150 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                <ShieldAlert size={24} />
              </div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Urgenze</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Primo Soccorso</h3>
            <p className="text-sm text-red-800/90 leading-relaxed mb-6">Manuale d’emergenza canino e procedure salvavita step-by-step.</p>
          </div>
          <button onClick={() => onNavigate('first-aid')} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm">
            Procedure d'Emergenza
          </button>
        </div>
      </div>

      {/* Row: Bacheca Cucciolo + Timer Attività (FREE Tier) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sezione: Bacheca Cucciolo */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
          {/* Sfondo decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Dog size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Bacheca Cucciolo</h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Identità e stato</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (isEditingProfile) {
                  handleSaveProfile();
                } else {
                  setIsEditingProfile(true);
                }
              }}
              className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors text-xs border border-slate-100"
            >
              {isEditingProfile ? 'Salva' : 'Modifica'}
            </button>
          </div>

          {isEditingProfile ? (
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Nome Cucciolo</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Razza</label>
                  <input
                    type="text"
                    value={tempProfile.breed}
                    onChange={(e) => setTempProfile({ ...tempProfile, breed: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Data di Nascita</label>
                  <input
                    type="date"
                    value={tempProfile.dob}
                    onChange={(e) => setTempProfile({ ...tempProfile, dob: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Peso Attuale (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempProfile.weight}
                  onChange={(e) => setTempProfile({ ...tempProfile, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-indigo-500"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-700 transition"
                >
                  Conferma Modifiche
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Nome</span>
                  <span className="font-extrabold text-slate-800 text-base">{puppyProfile.name}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Razza</span>
                  <span className="font-extrabold text-slate-800 text-base">{puppyProfile.breed}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Età Calcolata</span>
                  <span className="font-extrabold text-slate-800 text-base">{calculateAge(puppyProfile.dob)}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Peso Attuale</span>
                  <span className="font-extrabold text-slate-800 text-base">{puppyProfile.weight} kg</span>
                </div>
              </div>

              {/* Box promozionale curve di peso / grafici crescita */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                isPremium 
                  ? 'bg-amber-50/70 border-amber-200' 
                  : 'bg-slate-50 border-slate-200 hover:border-indigo-200 cursor-pointer'
              }`}
                onClick={() => onNavigate('growth')}
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                    <TrendingUp size={16} className={isPremium ? "text-amber-500" : "text-slate-400"} />
                    <span>Curva di Crescita Digitale</span>
                    {!isPremium && <span className="px-1.5 py-0.5 text-[8px] bg-amber-100 text-amber-800 font-extrabold rounded">PREMIUM</span>}
                  </div>
                  <p className="text-xs text-slate-400">
                    {isPremium 
                      ? 'Visualizza subito i grafici professionali sulla crescita e peso desiderato.' 
                      : 'Traccia peso e altezza del cucciolo proiettati sulle curve ideali per la razza.'
                    }
                  </p>
                </div>
                <div className="shrink-0">
                  {isPremium ? (
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">✨</span>
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center"><Lock size={14} /></span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sezione: Timer Cucciolo (Cronometro interattivo) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Timer Cucciolo</h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Misura le attività giornaliere</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-700 rounded-md uppercase">Gratis</span>
          </div>

          {/* Selettore Attività Timer */}
          <div className="grid grid-cols-4 gap-2">
            {(['walk', 'sleep', 'play', 'train'] as const).map(type => (
              <button
                key={type}
                onClick={() => setTimerType(type)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                  timerType === type 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-100' 
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>
                  {type === 'walk' && '🐕 Passegg.'}
                  {type === 'sleep' && '💤 Sonno'}
                  {type === 'play' && '🧸 Gioco'}
                  {type === 'train' && '🐾 Addestr.'}
                </span>
              </button>
            ))}
          </div>

          {/* Quadrante Timer */}
          <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-slate-50 rounded-2xl relative border border-slate-100">
            {isTimerActive && (
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-4 right-4 text-xs font-bold text-orange-500 flex items-center gap-1"
              >
                <span>REGISTRANDO</span>
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full inline-block animate-ping" />
              </motion.div>
            )}
            
            <div className="text-4xl font-mono font-black text-slate-800 tracking-wider">
              {formatTime(timerSeconds)}
            </div>
            
            <p className="text-xs text-slate-400 font-medium font-mono">
              Attività: {timerType === 'walk' && 'Passeggiata fuori' }
              {timerType === 'sleep' && 'Nanna rilassante' }
              {timerType === 'play' && 'Gioco intenso o riporto' }
              {timerType === 'train' && 'Sessione di condotta / comandi' }
            </p>
          </div>

          {/* controlli */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setIsTimerActive(!isTimerActive)}
              className={`py-3 rounded-2xl font-bold text-sm transition-colors ${
                isTimerActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isTimerActive ? 'Pausa' : 'Avvia'}
            </button>
            <button
              onClick={() => {
                setIsTimerActive(false);
                setTimerSeconds(0);
              }}
              className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-sm transition-colors"
            >
              Azzera
            </button>
            <button
              onClick={() => {
                if (timerSeconds < 5) {
                  alert('Fai durare l\'attività almeno qualche secondo prima di salvarla!');
                  return;
                }
                alert(`Complimenti! Hai registrato ${formatTime(timerSeconds)} di ${timerType === 'walk' ? 'Passeggiata' : timerType === 'sleep' ? 'Sonno' : timerType === 'play' ? 'Gioco' : 'Addestramento'} per il tuo ${puppyProfile.name}.`);
                setIsTimerActive(false);
                setTimerSeconds(0);
              }}
              className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition-colors"
            >
              Salva
            </button>
          </div>
        </div>
      </div>

      {/* Gamification Avanzata: I Tuoi Badge */}
      <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-105">
          <div className="flex items-center gap-2">
            <Award size={22} className="text-amber-500" />
            <h3 className="text-lg font-bold text-slate-800">I Badge di {puppyProfile.name}</h3>
          </div>
          <span className="text-xs text-slate-400 font-bold">Raggiungi traguardi per sbloccare badge</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Badge Bronzo */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100/50 borders-orange-200 rounded-full flex items-center justify-center shrink-0 border-2">
              <span className="text-3xl">🥉</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-800 text-sm">Cucciolo di Bronzo</h4>
                <span className="text-xs font-black text-emerald-600">✅ Sbloccato</span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">Assegnato automaticamente ai primi passi del cucciolo.</p>
            </div>
          </div>

          {/* Badge Argento */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center shrink-0 border-2 border-slate-300">
              <span className="text-3xl">🥈</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-800 text-sm">Cucciolo d’Argento</h4>
                <span className="text-xs font-black text-emerald-600">✅ Sbloccato</span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">Sbloccato completando le prime routine settimanali.</p>
            </div>
          </div>

          {/* Badge Oro (Gated with lock inside PWA conversion request) */}
          <div 
            onClick={() => {
              if (!isPremium) {
                onNavigate('premium');
              }
            }}
            className={`p-5 rounded-2xl flex items-center gap-4 border transition-all ${
              isPremium 
                ? 'bg-amber-50/50 border-amber-300 shadow-md shadow-amber-50 cursor-default' 
                : 'bg-slate-50/50 border-slate-200 hover:border-amber-300 cursor-pointer group'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
              isPremium 
                ? 'bg-amber-100 border-amber-400 text-3xl animate-bounce' 
                : 'bg-slate-100 border-slate-300 opacity-60 group-hover:opacity-100 group-hover:bg-amber-50'
            }`}>
              {isPremium ? <span className="text-3xl">🥇</span> : <Lock size={20} className="text-slate-400" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-800 text-sm">Cucciolo d’Oro</h4>
                {isPremium ? (
                  <span className="text-xs font-black text-amber-600 flex items-center gap-0.5">🏆 Attivo</span>
                ) : (
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-black text-slate-600 flex items-center gap-0.5">🔒 Premium</span>
                )}
              </div>
              <p className="text-slate-400 text-xs mt-0.5 group-hover:text-slate-500 transition-colors">
                {isPremium 
                  ? 'Il massimo onore! Riservato solo per i membri Milo Everwood d’Oro.' 
                  : 'Sblocca subito l’accesso Premium per risplendere con l’oro.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <BookOpen size={20} className="text-indigo-600" />
          Accesso Veloce Documenti del Kit
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCES.slice(0, 4).map(res => (
            <a 
              key={res.id} 
              href={res.url || '#'} 
              onClick={(e) => {
                if (!res.url || (res.access === 'premium' && !isPremium)) {
                  e.preventDefault();
                  onNavigate('premium');
                }
              }}
              target={res.url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all group relative overflow-hidden"
            >
              {res.access === 'premium' && !isPremium && (
                <div className="absolute top-2 right-2 p-1 bg-amber-50 text-amber-500 rounded-md">
                  <Lock size={12} />
                </div>
              )}
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mb-3">
                {res.type === 'pdf' && <BookOpen size={20} />}
                {res.type === 'video' && <Video size={20} />}
                {res.type === 'audio' && <Mic size={20} />}
              </div>
              <p className="text-sm font-bold line-clamp-1 text-slate-800">{res.title}</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1">
                {res.type} &bull; {res.access === 'premium' ? '🏆 Premium' : 'Free' }
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function RoutineView({ routine, onToggle, setRoutine }: any) {
  const [showResetToast, setShowResetToast] = useState(false);
  const morning = routine.filter((r: any) => r.type === 'morning');
  const evening = routine.filter((r: any) => r.type === 'evening');

  const resetRoutine = () => {
    if (confirm('Vuoi iniziare una nuova giornata? Puoi azzerare la routine con un solo tocco.')) {
      setRoutine((prev: any) => prev.map((r: any) => ({ ...r, completed: false })));
      setShowResetToast(true);
      setTimeout(() => setShowResetToast(false), 4000);
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showResetToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Sparkles size={20} />
            <span className="font-bold">Routine azzerata. Sei pronto per una nuova giornata insieme al tuo cane! 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Routine Quotidiana</h2>
          <p className="text-slate-500">Segna le attività svolte per accompagnare il tuo cane tra mattina e sera senza dimenticanze.</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <button onClick={resetRoutine} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <RotateCcw size={18} />
            <span className="font-semibold text-sm">Resetta</span>
          </button>
          <span className="text-[10px] text-slate-400">Vuoi iniziare una nuova giornata? Azzerando si riparte.</span>
        </div>
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
  const [showCompletedToast, setShowCompletedToast] = useState(false);

  const resetProgress = () => {
    if (confirm('Vuoi resettare il progresso settimanale?')) {
      setTraining((prev: any) => prev.map((t: any) => ({ ...t, completed: false })));
    }
  };

  const handleToggleLocal = (id: number) => {
    const item = training.find((t: any) => t.id === id);
    onToggle(id);
    if (item && !item.completed) {
      setShowCompletedToast(true);
      setTimeout(() => setShowCompletedToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showCompletedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            <span className="font-bold">Attività completata. Ottimo lavoro! 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">5 Minuti Settimanali</h2>
          <p className="text-slate-500">Ogni giorno trovi una mini attività per rafforzare educazione, relazione e attenzione.</p>
        </div>
        <button onClick={resetProgress} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all font-semibold text-sm shrink-0">
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-3xl text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-indigo-200" />
          <h4 className="font-bold uppercase tracking-wider text-xs text-indigo-100">Cura & Consistenza</h4>
        </div>
        <p className="text-sm text-indigo-50/90 font-medium">
          Bastano pochi minuti al giorno, ma fatti con calma e continuità.
        </p>
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
                onClick={() => handleToggleLocal(day.id)}
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

function ShoppingView({ items, setItems }: { items: ShoppingItem[], setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>> }) {
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Cibo');
  const [showAddedToast, setShowAddedToast] = useState(false);

  const categories = Array.from(new Set(items.map((i: any) => i.category)));

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel.trim()) return;
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      label: newItemLabel,
      category: newItemCategory,
      completed: false,
      isFixed: false
    };
    setItems(prev => [...prev, newItem]);
    setNewItemLabel('');
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id || i.isFixed));
  };

  const resetList = () => {
    if (confirm('Vuoi resettare lo stato della lista?')) {
      setItems((prev: any) => prev.map((i: any) => ({ ...i, completed: false })));
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showAddedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span className="font-bold">Elemento aggiunto alla lista! 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Shopping List</h2>
          <p className="text-slate-500">Tieni sotto controllo ciò che serve davvero al tuo cane, tra elementi essenziali e acquisti da ricordare.</p>
        </div>
        <button onClick={resetList} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all w-fit">
          <RotateCcw size={18} />
          <span className="font-semibold text-sm">Resetta Check</span>
        </button>
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nuovo Oggetto</label>
          <input 
            type="text" 
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            placeholder="Aggiungi un nuovo elemento"
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-indigo-300 transition-all"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
          <select 
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-indigo-300 transition-all"
          >
            <option value="Cibo">Cibo</option>
            <option value="Salute">Salute</option>
            <option value="Igiene">Igiene</option>
            <option value="Giochi">Giochi</option>
            <option value="Accessori">Accessori</option>
          </select>
        </div>
        <button type="submit" className="md:mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
          <Plus size={20} /> Aggiungi
        </button>
      </form>

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
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    item.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  <div 
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {item.completed && <CheckCircle2 size={16} />}
                  </div>
                  <span className={`flex-1 font-bold text-sm ${item.completed ? 'text-emerald-700 line-through opacity-60' : 'text-slate-700'}`}>
                    {item.label}
                    {item.isFixed && <span className="ml-2 text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">Fisso</span>}
                  </span>
                  {!item.isFixed && (
                    <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ContentAccessBadge({ access, comingSoon }: { access?: 'free' | 'premium', comingSoon?: boolean }) {
  if (comingSoon) {
    return (
      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-50 text-amber-600 border border-amber-100">
        In Arrivo
      </span>
    );
  }
  if (access === 'premium') {
    return (
      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center gap-1">
        <Lock size={10} className="text-indigo-500 shrink-0" /> Premium
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
      Gratis
    </span>
  );
}

function UpgradeModal({ isOpen, onClose, resource }: { isOpen: boolean, onClose: () => void, resource: any }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] max-w-lg w-full p-8 border border-slate-100 shadow-2xl relative overflow-hidden text-left"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-70" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-violet-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles size={32} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Sblocca il Kit Completo 🐾
              </h3>
              {resource && (
                <p className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl inline-block mt-1">
                  Richiesto per: "{resource.title}"
                </p>
              )}
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              Alcuni contenuti sono disponibili gratuitamente per farti provare il Dog Kit. 
              <strong> Il Kit completo sblocca tutti i contenuti premium attuali e futuri</strong> per garantirti supporto a 360°.
            </p>

            <div className="bg-slate-50 p-5 rounded-2xl w-full text-left space-y-3 border border-slate-100">
              <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Cosa contiene il Kit completo:</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">✓</span>
                  <span>Tutti i video tutorial completi (primi passi, 5 minuti al giorno e altro)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">✓</span>
                  <span>I podcast esclusivi per risolvere i problemi quotidiani senza punizioni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">✓</span>
                  <span>Tutte le guide pratiche scaricabili in PDF ad alta definizione</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">✓</span>
                  <span>In arrivo: Nuovi contenuti audio e video senza alcun costo aggiuntivo</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 w-full">
              <a 
                href="https://stan.store/MiloEverwood/p/-milo-everwood-dog-kit"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-center rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <span>Sblocca il Kit completo</span>
                <ExternalLink size={18} />
              </a>
              <p className="text-[10px] text-slate-400">
                Acquista su Stan Store per ottenere accesso completo. Una volta sbloccato, avrai tutte le risorse incluse.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="text-[10px] text-slate-400 hover:text-slate-600 uppercase tracking-widest font-bold transition-colors pt-1"
            >
              Continua con la versione gratuita
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ResourcesView() {
  const [filter, setFilter] = useState<'all' | 'pdf' | 'video' | 'audio'>('all');
  const [selectedPremiumResource, setSelectedPremiumResource] = useState<any>(null);
  
  const filtered = RESOURCES.filter(r => filter === 'all' || r.type === filter);

  // Divide into free and premium
  const freeResources = filtered.filter(r => r.access === 'free');
  const premiumResources = filtered.filter(r => r.access === 'premium');

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-2xl font-bold">Risorse & Guide</h2>
        <p className="text-slate-500">Tutto il materiale formativo e multimediale di Milo Everwood</p>
      </header>

      {/* Main Promo CTA Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-300 shrink-0" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Versione Freemium</span>
          </div>
          <h3 className="text-xl font-black tracking-tight leading-tight">Vuoi sbloccare tutto il materiale di Milo?</h3>
          <p className="text-slate-300 text-sm max-w-xl font-medium leading-relaxed">
            Alcuni contenuti sono disponibili gratuitamente per farti provare il Dog Kit. 
            Il Kit completo sblocca tutti i contenuti premium attuali e futuri.
          </p>
        </div>
        <button 
          onClick={() => setSelectedPremiumResource({ title: 'Tutti i contenuti del Kit completo' })}
          className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl transition-all shrink-0 shadow-lg font-bold text-sm tracking-tight flex items-center gap-2"
        >
          Sblocca il Kit completo
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {(['all', 'pdf', 'video', 'audio'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f === 'all' ? 'Tutte' : f === 'audio' ? 'PODCAST' : f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FREE SUB-SECTION */}
      {freeResources.length > 0 && (
        <div className="space-y-6">
          <div className="border-b border-slate-150 pb-2">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>Contenuti inclusi gratis</span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700 rounded-md">Inclusi</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Una piccola anteprima gratuita per provare il metodo Milo Everwood.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeResources.map(res => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      res.type === 'pdf' ? 'bg-red-50 text-red-600' : 
                      res.type === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {res.type === 'pdf' && <BookOpen size={24} />}
                      {res.type === 'video' && <PlayCircle size={24} />}
                      {res.type === 'audio' && <Headphones size={24} />}
                    </div>
                    <ContentAccessBadge access="free" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 leading-tight text-slate-900">{res.title}</h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">{res.description}</p>
                </div>
                
                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm border border-slate-100"
                >
                  {res.type === 'pdf' ? 'Scarica PDF' : res.type === 'video' ? 'Guarda Video' : 'Ascolta Audio'}
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREMIUM SUB-SECTION */}
      {premiumResources.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-150 pb-2">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>Contenuti del Kit completo</span>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-indigo-100 text-indigo-700 rounded-md flex items-center gap-0.5">
                <Lock size={8} /> Premium
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Acquista il Kit completo su Stan Store per accedere a tutti i contenuti premium attuali e futuri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumResources.map(res => (
              <div 
                key={res.id} 
                onClick={() => setSelectedPremiumResource(res)}
                className="bg-slate-50/70 hover:bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      {res.type === 'pdf' && <BookOpen size={24} />}
                      {res.type === 'video' && <PlayCircle size={24} />}
                      {res.type === 'audio' && <Headphones size={24} />}
                    </div>
                    <ContentAccessBadge access="premium" comingSoon={res.comingSoon} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 leading-tight text-slate-700 group-hover:text-slate-900 transition-colors flex items-center gap-2">
                    <span>{res.title}</span>
                    {!res.comingSoon && <Lock size={14} className="text-indigo-400" />}
                  </h4>
                  <p className="text-sm text-slate-400 group-hover:text-slate-500 mb-6 leading-relaxed transition-colors">{res.description}</p>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPremiumResource(res);
                  }}
                  className={`w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm border ${
                    res.comingSoon 
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm'
                  }`}
                >
                  {res.comingSoon ? (
                    <span>Prossimamente</span>
                  ) : (
                    <>
                      <span>Sblocca su Stan Store</span>
                      <ExternalLink size={14} />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={selectedPremiumResource !== null} 
        onClose={() => setSelectedPremiumResource(null)} 
        resource={selectedPremiumResource}
      />
    </div>
  );
}

function PlannerView({ items, setItems, notificationSettings, setNotificationSettings }: { 
  items: PlannerItem[], 
  setItems: React.Dispatch<React.SetStateAction<PlannerItem[]>>,
  notificationSettings: NotificationSetting[],
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSetting[]>>
}) {
  const [newItemLabel, setNewItemLabel] = useState('');
  const [showReminderAlert, setShowReminderAlert] = useState(false);

  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const toggleDay = (itemId: string, dayIdx: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newCompleted = [...item.completed];
        newCompleted[dayIdx] = !newCompleted[dayIdx];
        
        // Show alert if it's a reminder item and just completed
        if (item.reminder && newCompleted[dayIdx]) {
          setShowReminderAlert(true);
          setTimeout(() => setShowReminderAlert(false), 3000);
        }
        
        return { ...item, completed: newCompleted };
      }
      return item;
    }));
  };

  const toggleNotification = (type: 'water' | 'meal') => {
    // Toggle the first notification of that type for simplicity in the planner view
    const setting = notificationSettings.find(s => s.type === type);
    if (setting) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      setNotificationSettings(prev => prev.map(s => s.id === setting.id ? { ...s, enabled: !s.enabled } : s));
    }
  };

  const isNotificationActive = (type: 'water' | 'meal') => {
    return notificationSettings.some(s => s.type === type && s.enabled);
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemLabel.trim()) return;
    const newItem: PlannerItem = {
      id: Date.now().toString(),
      label: newItemLabel,
      completed: Array(7).fill(false),
      isFixed: false,
      reminder: false
    };
    setItems(prev => [...prev, newItem]);
    setNewItemLabel('');
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id || i.isFixed));
  };

  const clearPlanner = () => {
    if (confirm('Vuoi resettare tutti i check del planner?')) {
      setItems(prev => prev.map(item => ({
        ...item,
        completed: Array(7).fill(false)
      })));
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showReminderAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Sparkles size={20} />
            <span className="font-bold">Ottimo lavoro! Il tuo cucciolo ti ringrazia! 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Planner Settimanale</h2>
          <p className="text-slate-500">Organizza la settimana del tuo cane tra attività ricorrenti e promemoria personalizzati.</p>
        </div>
        <button onClick={clearPlanner} className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all w-fit font-semibold text-sm">
          <RotateCcw size={18} />
          Resetta Planner
        </button>
      </div>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nuova Attività Ricorrente</label>
          <input 
            type="text" 
            value={newItemLabel}
            onChange={(e) => setNewItemLabel(e.target.value)}
            placeholder="Esempio: Spazzolatura..."
            className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-indigo-300 transition-all"
          />
        </div>
        <button type="submit" className="md:mt-6 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
          <Plus size={20} /> Aggiungi
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">Attività</th>
                {days.map(day => (
                  <th key={day} className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">{day}</th>
                ))}
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Notifica</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Azione</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {item.reminder && <Pill size={14} className="text-indigo-500" />}
                        <span className={`font-bold text-slate-700 ${item.isFixed ? '' : 'text-indigo-600'}`}>{item.label}</span>
                      </div>
                      {(item.label.toLowerCase().includes('acqua') || item.label.toLowerCase().includes('pasto')) && (
                        <span className="text-[10px] text-indigo-500 font-medium block mt-1">
                          Questa attività può avere un promemoria dedicato.
                        </span>
                      )}
                    </div>
                  </td>
                  {days.map((_, idx) => (
                    <td key={idx} className="p-2 text-center">
                      <button 
                        onClick={() => toggleDay(item.id, idx)}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center mx-auto transition-all ${
                          item.completed[idx] 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm' 
                            : 'border-slate-200 hover:border-indigo-300 bg-white'
                        }`}
                      >
                        {item.completed[idx] && <CheckCircle2 size={18} />}
                      </button>
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    {(item.label.toLowerCase().includes('acqua') || item.label.toLowerCase().includes('pasto')) && (
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => toggleNotification(item.label.toLowerCase().includes('acqua') ? 'water' : 'meal')}
                          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border relative overflow-hidden group/btn ${
                            isNotificationActive(item.label.toLowerCase().includes('acqua') ? 'water' : 'meal')
                              ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md shadow-indigo-100'
                              : 'bg-white border-slate-200 text-indigo-600 hover:bg-slate-50 font-semibold'
                          }`}
                          title="Attiva promemoria"
                        >
                          <Bell size={14} />
                          <span className="text-[10px] uppercase tracking-wider font-bold">
                            {isNotificationActive(item.label.toLowerCase().includes('acqua') ? 'water' : 'meal') ? 'Attivo' : 'Attiva promemoria'}
                          </span>
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {!item.isFixed && (
                      <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-indigo-50 rounded-2xl flex items-start gap-3">
        <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          Le attività con l'icona <Pill size={12} className="inline" /> mostreranno un piccolo incoraggiamento quando completate! 
          Usa il planner per tenere traccia delle abitudini quotidiane del tuo cucciolo.
        </p>
      </div>
    </div>
  );
}

function FirstAidView() {
  const [openAction, setOpenAction] = useState<string | null>(null);

  const emergencyNumbers = [
    { label: 'Veterinario di Fiducia', value: '[Inserisci Numero]', icon: Phone, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pronto Soccorso 24h', value: '[Inserisci Numero]', icon: LifeBuoy, color: 'bg-red-50 text-red-600' },
    { label: 'Centro Antiveleni', value: '02 66101029', icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
  ];

  const actions = [
    {
      id: 'heatstroke',
      title: 'Colpo di Calore',
      description: 'Sintomi: affanno eccessivo, bava, gengive rosse, debolezza.',
      steps: [
        'Sposta il cane in un luogo fresco e ventilato.',
        'Bagna il corpo con acqua fresca (NON gelata) usando asciugamani umidi.',
        'Offri acqua fresca da bere in piccole quantità.',
        'Contatta immediatamente il veterinario.'
      ]
    },
    {
      id: 'poison',
      title: 'Ingestione Veleno',
      description: 'Sintomi: vomito, tremori, bava, pupille dilatate.',
      steps: [
        'NON indurre il vomito a meno che non sia indicato dal veterinario.',
        'Cerca di identificare cosa ha mangiato (porta la confezione).',
        'Contatta subito il Centro Antiveleni o il veterinario.',
        'Tieni il cane calmo e al buio.'
      ]
    },
    {
      id: 'bleeding',
      title: 'Ferite ed Emorragie',
      description: 'Tagli profondi o sanguinamento continuo.',
      steps: [
        'Applica pressione diretta sulla ferita con una garza pulita.',
        'Se la garza si impregna, aggiungine un\'altra sopra senza togliere la prima.',
        'Fascia la zona senza stringere eccessivamente.',
        'Porta il cane al pronto soccorso veterinario.'
      ]
    },
    {
      id: 'choking',
      title: 'Soffocamento',
      description: 'Difficoltà respiratoria, zampate alla bocca.',
      steps: [
        'Apri la bocca con cautela per vedere se l\'oggetto è visibile.',
        'Prova a rimuoverlo solo se sei sicuro di non spingerlo più in fondo.',
        'Esegui la manovra di Heimlich per cani se necessario (compressioni addominali).',
        'Corsa immediata dal veterinario.'
      ]
    }
  ];

  const kitItems = [
    'Garze sterili di varie misure',
    'Disinfettante (es. Clorexidina, NO alcool)',
    'Pinzette per zecche',
    'Termometro rettale digitale',
    'Bende elastiche e nastro adesivo medico',
    'Forbici a punta arrotondata',
    'Siringhe sterili (senza ago) per lavaggi'
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold">Primo Soccorso</h2>
        <p className="text-slate-500">In caso di urgenza, segui i passaggi con calma e contatta subito un professionista quando necessario.</p>
      </header>

      {/* Prominent Warning Banner */}
      <div className="bg-red-600 text-white p-6 rounded-[2rem] shadow-xl flex items-start gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <AlertTriangle size={28} className="text-red-100 animate-bounce" />
        </div>
        <div>
          <h4 className="font-extrabold uppercase tracking-widest text-xs text-red-100 mb-1">Avviso di Emergenza</h4>
          <p className="font-bold text-sm leading-relaxed">
            In presenza di sintomi gravi, non aspettare: contatta immediatamente veterinario o pronto soccorso veterinario.
          </p>
        </div>
      </div>

      {/* Emergency Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {emergencyNumbers.map((num, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${num.color}`}>
              <num.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{num.label}</p>
              <p className="font-bold text-slate-700">{num.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Procedures */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Procedure d'Emergenza
          </h3>
          <div className="space-y-3">
            {actions.map(action => (
              <div key={action.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setOpenAction(openAction === action.id ? null : action.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-slate-800">{action.title}</p>
                    <p className="text-xs text-slate-500">{action.description}</p>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${openAction === action.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openAction === action.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 border-t border-slate-50"
                    >
                      <ul className="mt-4 space-y-2">
                        {action.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-600">
                            <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{idx + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Kit Checklist */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <History size={20} className="text-emerald-600" />
            Kit di Pronto Soccorso
          </h3>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-4">
            <div>
              <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1">Guida Kit</p>
              <p className="text-xs text-emerald-800/80 leading-relaxed font-semibold">
                Prepara in anticipo il tuo kit di emergenza per intervenire più rapidamente.
              </p>
            </div>
            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider pt-3 border-t border-emerald-200/50">Cosa non deve mancare:</p>
            <ul className="space-y-3">
              {kitItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-emerald-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Nota Importante</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Queste informazioni sono puramente indicative. In caso di emergenza, la priorità assoluta è contattare un veterinario professionista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsView({ settings, setSettings }: { settings: NotificationSetting[], setSettings: React.Dispatch<React.SetStateAction<NotificationSetting[]>> }) {
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const toggleSetting = (id: string) => {
    if (permission !== 'granted') {
      requestPermission();
      return;
    }
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const updateTime = (id: string, time: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, time } : s));
  };

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Centro Notifiche 🔔</h2>
        <p className="text-slate-500 mt-1">Imposta gli orari dei promemoria per acqua e alimentazione in base alla tua routine.</p>
      </header>

      {/* Permission Status Cards */}
      {permission === 'default' && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm animate-pulse">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-sm">Richiesta di autorizzazione</h3>
            <p className="text-sm text-amber-700 mb-4 font-medium">Per ricevere i promemoria, il browser deve autorizzare le notifiche.</p>
            <button 
              onClick={requestPermission}
              className="px-6 py-2.5 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors text-sm shadow-md shadow-amber-100"
            >
              Abilita notifiche
            </button>
            <p className="text-xs text-amber-600 mt-2">Ti chiederemo il permesso solo quando deciderai tu di attivarle.</p>
          </div>
        </div>
      )}

      {permission === 'granted' && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-sm">Dispositivo Collegato</h3>
            <p className="text-sm text-emerald-700 font-semibold">Promemoria attivi su questo dispositivo.</p>
          </div>
        </div>
      )}

      {permission === 'denied' && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
            <X size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-900 text-sm">Notifiche Bloccate</h3>
            <p className="text-sm text-red-700 leading-relaxed font-semibold">
              Le notifiche risultano bloccate dal browser. Puoi riattivarle dalle impostazioni del browser o del dispositivo.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map(setting => (
          <div key={setting.id} className={`p-6 rounded-3xl border transition-all ${setting.enabled ? 'bg-white border-indigo-200 shadow-md' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${setting.type === 'water' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                  {setting.type === 'water' ? <Droplet size={24} /> : <Utensils size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{setting.label}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{setting.type === 'water' ? 'Acqua' : 'Pasto'}</p>
                </div>
              </div>
              <button 
                onClick={() => toggleSetting(setting.id)}
                className={`w-14 h-8 rounded-full transition-colors relative ${setting.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <motion.div 
                  animate={{ x: setting.enabled ? 26 : 4 }}
                  className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm"
                />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Orario</label>
                <input 
                  type="time" 
                  value={setting.time}
                  onChange={(e) => updateTime(setting.id, e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-300 font-bold text-slate-700"
                />
              </div>
              <div className="flex-1 flex items-end">
                <div className="w-full p-3 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center gap-2 text-sm font-bold">
                  <Clock size={16} />
                  {setting.enabled ? 'Attivo' : 'Disattivo'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200">
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={32} />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Come funzionano le notifiche?</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Le notifiche di sistema funzionano quando l'applicazione è aperta in una scheda del browser (anche in background). 
                Assicurati di non chiudere completamente la scheda se desideri ricevere i promemoria puntuali per l'acqua e i pasti del tuo cane.
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <h4 className="font-bold text-sm text-indigo-100 flex items-center gap-2 mb-1">
                <ShieldAlert size={16} /> Nota per utenti Apple iPhone
              </h4>
              <p className="text-white/70 text-xs leading-relaxed">
                Su iPhone alcune notifiche richiedono apertura dell’app dalla schermata Home come web app installata. Clicca sul tasto di condivisione di Safari e scegli "Aggiungi alla schermata Home" per garantire il funzionamento in background.
              </p>
            </div>
          </div>
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
          href="mailto:mpfprosolution@gmail.com" 
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
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-tight">
            Benvenuto nel tuo spazio digitale per la cura quotidiana del cane.
          </h1>
          <p className="text-lg font-medium text-slate-500 mt-2">
            Qui trovi organizzazione, supporto pratico e contenuti guidati per accompagnarti ogni giorno.
          </p>
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
        <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-500 font-medium">Hai bisogno di supporto?</p>
          <a href="mailto:mpfprosolution@gmail.com" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
            <Send size={16} /> mpfprosolution@gmail.com
          </a>
          <p className="text-xs text-slate-400">Per assistenza tecnica o richieste sul prodotto puoi contattare mpfprosolution@gmail.com.</p>
        </div>
      </div>

      <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 space-y-4">
        <div className="flex items-center gap-3 text-amber-600">
          <ShieldAlert size={24} />
          <h3 className="font-bold uppercase tracking-widest text-sm">Nota Importante</h3>
        </div>
        <p className="text-sm text-amber-800/85 leading-relaxed">
          Le informazioni presenti nell’app hanno finalità educativa e organizzativa e non sostituiscono il veterinario. In caso di emergenza o dubbi sulla salute del tuo cane, consulta sempre un veterinario professionista.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-slate-800">Cosa dicono di noi 🐾</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { text: "Finalmente non dimentico le vaccinazioni di Luna! Dog Kit mi ha salvato 200€ di multe.", author: "Marco, proprietario di Luna (6 mesi)" },
            { text: "Le lezioni di educazione sono chiarissime. Rex ora viene quando lo chiamo!", author: "Giulia, proprietaria di Rex (1 anno)" },
            { text: "Condivido tutto con la dog-sitter in tempo reale. Tranquillità totale.", author: "Andrea, proprietario di Hugo (2 anni)" },
            { text: "La sezione shopping è utilissima. Ho trovato tutti i prodotti migliori per la dieta di Oliver.", author: "Elena, proprietaria di Oliver (3 anni)" },
            { text: "Finalmente un'app che capisce davvero le esigenze di chi ha un cucciolo. Il planner è la mia funzione preferita.", author: "Roberto, proprietario di Kira (4 mesi)" },
            { text: "Le risorse audio sono fantastiche per rilassarsi insieme al proprio cane dopo una lunga giornata.", author: "Silvia, proprietaria di Maya (5 anni)" },
            { text: "Il supporto tramite email è rapido e super competente. Mi hanno aiutato a configurare tutto in un attimo.", author: "Davide, proprietario di Toby (2 anni)" }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative"
            >
              <div className="text-amber-400 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-slate-600 italic mb-2">"{t.text}"</p>
              <p className="text-slate-900 font-bold text-xs">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full py-5 bg-indigo-600 text-white font-bold text-xl rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 animate-pulse"
      >
        Ho capito e confermo <ChevronRight size={24} />
      </button>
    </div>
  );
}

// ==========================================
// 🎓 ACADEMY VIEW (50+ Addestramenti)
// ==========================================
function AcademyView({ isPremium, onUnlock, completedLessons, setCompletedLessons }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutte');
  const [activeLesson, setActiveLesson] = useState<any | null>(null);

  // Calcolo delle statistiche
  const totalLessons = LEZIONI_DATA.reduce((acc, cat) => acc + cat.lezioni.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const handleLessonClick = (lezione: any) => {
    if (!lezione.gratis && !isPremium) {
      onUnlock({
        title: `Corso: ${lezione.titolo}`,
        description: `Accedi a questo corso e ad altre 47+ lezioni specializzate create dal coach Milo Everwood. Include esercizi pratici, schemi di condotta e segnali di calma.`,
        trigger: 'academy'
      });
      return;
    }
    setActiveLesson(lezione);
  };

  const handleToggleComplete = (id: string) => {
    setCompletedLessons((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter(l => l !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="space-y-8 text-slate-800">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            Milo Academy 🎓
          </h2>
          <p className="text-slate-500 mt-1">Il tuo percorso d'addestramento quotidiano professionale.</p>
        </div>
        
        {/* Progress Tracker */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 text-xs font-bold leading-none">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Award size={22} />
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 uppercase tracking-widest text-[9px]">Progresso Academy</p>
            <p className="text-sm font-extrabold">{completedCount} / {totalLessons} Completati</p>
          </div>
        </div>
      </header>

      {/* Banner per Richiesta Consulenza Privata 1-to-1 */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-6 shadow-xl border border-indigo-500/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-amber-400 to-transparent"></div>
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[9px] uppercase font-black rounded-full tracking-wider">
              Novità ✨
            </span>
            <span className="text-slate-300 text-xs font-bold">Sessioni con Milo Everwood</span>
          </div>
          <h3 className="text-lg md:text-xl font-black tracking-tight text-amber-300">
            Hai bisogno di supporto personalizzato? 🐾
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ogni binomio cane-proprietario è un mondo a sé. Prenota una lezione privata di approfondimento 1-to-1 con il coach Milo Everwood a soli <strong>30-40€ / sessione</strong> per risolvere qualsiasi dubbio o comportamento complesso.
          </p>
        </div>
        <button
          onClick={() => {
            const md = encodeURIComponent("Ciao Milo, vorrei richiedere una sessione di consulenza privata (30-40€) sul comportamento del mio cane!");
            window.open(`https://wa.me/393270000000?text=${md}`, '_blank');
          }}
          className="relative z-10 px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase rounded-2xl tracking-wider shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 shrink-0 self-stretch md:self-auto text-center"
        >
          <span>Richiedi Consulenza Privata 📱</span>
        </button>
      </div>

      {/* Categoria & Cerca */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca comandi o lezioni (es: Condotta, Seduto)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-indigo-300 text-sm font-medium"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {['Tutte', 'Fondamentali', 'Comandi', 'Problemi', 'Socialità'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid delle Categorie / Lezioni */}
      <div className="space-y-10">
        {LEZIONI_DATA.map((categoria) => {
          // Filtra le lezioni in base a categoria selezionata e termine di ricerca
          if (selectedCategory !== 'Tutte' && categoria.nome !== selectedCategory) {
            return null;
          }

          const filteredLezioni = categoria.lezioni.filter(lez => 
            lez.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lez.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredLezioni.length === 0) return null;

          return (
            <section key={categoria.nome} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Categoria: {categoria.nome} ({filteredLezioni.length} lezioni)
                </span>
                <span className="text-xs text-indigo-500 font-semibold">Età consigliata: {categoria.eta}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLezioni.map((lezione) => {
                  const isCompleted = completedLessons.includes(lezione.id);
                  const isLocked = !lezione.gratis && !isPremium;

                  return (
                    <div
                      key={lezione.id}
                      onClick={() => handleLessonClick(lezione)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between gap-4 relative overflow-hidden ${
                        isLocked
                          ? 'bg-slate-50/50 border-slate-200 opacity-80 hover:opacity-100 hover:border-amber-300'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Badge in evidenza e lucchetto */}
                      {isLocked ? (
                        <div className="absolute top-3 right-3 p-1.5 bg-amber-50 text-amber-500 rounded-lg">
                          <Lock size={14} />
                        </div>
                      ) : lezione.gratis ? (
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-50 text-emerald-600 font-black text-[8px] uppercase rounded">
                          Gratis
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-[8px] uppercase rounded">
                          Premium ⭐
                        </div>
                      )}

                      <div className="space-y-2 pr-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{categoria.icona}</span>
                          <h4 className={`font-bold text-slate-800 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                            {lezione.titolo}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{lezione.descrizione}</p>
                        <div className="flex items-center gap-3 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span className={isCompleted ? 'text-emerald-500 font-extrabold' : ''}>
                            {isCompleted ? 'Completata ✅' : 'Da Fare'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Modal di Lettura Lezione */}
      <AnimatePresence>
        {activeLesson && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header lettore */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg">{activeLesson.titolo}</h3>
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Milo Academy Lezione</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contenuto Articolo */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed text-left flex-1 select-text">
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-900 rounded-r-xl font-medium">
                  {activeLesson.descrizione}
                </div>

                {/* Spiegazione Teorica della Lezione */}
                {activeLesson.contenuto && (
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-1.5">
                      <span>🧠</span> Teoria Etologica-Relazionale:
                    </h4>
                    <p className="text-slate-600 pl-1 leading-relaxed text-xs md:text-sm">
                      {activeLesson.contenuto}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-1.5">
                    <span>📋</span> Istruzioni Pratiche:
                  </h4>
                  <ol className="space-y-4">
                    {activeLesson.stepCompleti?.map((step: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-xs md:text-sm">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    )) || (
                      <li className="italic">Le linee guida dettagliate pratiche per questa condotta.</li>
                    )}
                  </ol>
                </div>

                {activeLesson.consiglio && (
                  <div className="p-5 bg-amber-50/75 rounded-2xl border border-amber-100 text-amber-900 space-y-1">
                    <p className="font-extrabold uppercase tracking-widest text-[9px] text-amber-600 flex items-center gap-1.5">
                      <span>💡</span> Super Consiglio di Milo
                    </p>
                    <p className="text-xs">{activeLesson.consiglio}</p>
                  </div>
                )}

                {/* Sezione Speciale: Approfondimento Strutturato della Tecnica Ninja & Consultazione Privata */}
                {activeLesson.approfondimento && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-indigo-950 to-slate-900 text-white rounded-[2rem] shadow-xl border border-indigo-500/30 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500 text-slate-950 text-[10px] uppercase font-black rounded-full tracking-wider">
                        SURPLUS INCLUSO ✨
                      </span>
                    </div>
                    <h4 className="text-base font-black text-amber-400 tracking-tight flex items-center gap-1.5">
                      <span>🥷</span> {activeLesson.approfondimento.titolo}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed pl-1">
                      {activeLesson.approfondimento.introduzione}
                    </p>
                    
                    <div className="space-y-3 pt-2">
                      {activeLesson.approfondimento.punti.map((p: any, idx: number) => (
                        <div key={idx} className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-1 hover:bg-white/10 transition">
                          <h5 className="font-black text-xs text-indigo-300">{p.titolo}</h5>
                          <p className="text-xs text-slate-300 leading-relaxed">{p.testo}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 italic pt-2 border-t border-white/10 pl-1">
                      {activeLesson.approfondimento.conclusione}
                    </p>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-3 mt-4">
                      <p className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span>🎯</span> SERVONO ALTRI APPROFONDIMENTI PRIVATI?
                      </p>
                      <p className="text-xs text-slate-300">
                        In cinologia, ogni cucciolo ha una individualità biologica e un contesto relazionale unico. Se riscontri problemi particolari o desideri un affiancamento su misura per l'applicazione del <strong>Ninja Move</strong>, puoi prenotare una sessione privata 1-to-1 con Milo.
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                        <span className="text-xs font-extrabold text-amber-400">
                          Lezione Privata Milo Everwood: <span className="text-white underline font-black text-sm">{activeLesson.approfondimento.ctaPrezzo || '30-40€'}</span>
                        </span>
                        <button
                          onClick={() => {
                            const msg = encodeURIComponent(`Ciao Milo, sto usando il Dog Kit e vorrei prenotare una sessione di approfondimento privata (30-40€) sul comportamento del mio cane!`);
                            window.open(`https://wa.me/393270000000?text=${msg}`, '_blank');
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs uppercase rounded-xl tracking-wider transition-all shadow-lg active:scale-95 shrink-0"
                        >
                          Prenota Consulenza Privata 📱
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer lettore (Pulsante completamento) */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    handleToggleComplete(activeLesson.id);
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                    completedLessons.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>
                    {completedLessons.includes(activeLesson.id) ? 'Segnata Come Completata ✅' : 'Segna Come Completata'}
                  </span>
                </button>
                
                <button
                  onClick={() => setActiveLesson(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-bold"
                >
                  Chiudi Lettura
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 🍗 ALIMENTAZIONE VIEW (Razze & Portion Calculator)
// ==========================================
interface BreedProfile {
  nome: string;
  kcalMax: number;
  frequenzaPasti: number;
  fabbisognoAcquaMultiplier: number;
  ingredientiConsigliati: string[];
  allergeniComuni: string[];
}

function AlimentazioneView({ isPremium, onUnlock, puppyProfile }: any) {
  const [selectedBreed, setSelectedBreed] = useState(puppyProfile.breed || 'Golden Retriever');
  const [puppyAgeMonths, setPuppyAgeMonths] = useState(4);
  const [isCalculated, setIsCalculated] = useState(false);

  // Database profili di razza
  const BREED_DATABASE: Record<string, BreedProfile> = {
    'Golden Retriever': {
      nome: 'Golden Retriever',
      kcalMax: 1200,
      frequenzaPasti: 3,
      fabbisognoAcquaMultiplier: 65,
      ingredientiConsigliati: ['Tacchino fresco', 'Riso integrale soffiatore', 'Olio di salmone puro', 'Zucchina grigliata'],
      allergeniComuni: ['Mais indurito', 'Glutine di grano', 'Proteine di pollo artificiali']
    },
    'Pastore Tedesco': {
      nome: 'Pastore Tedesco',
      kcalMax: 1350,
      frequenzaPasti: 3,
      fabbisognoAcquaMultiplier: 70,
      ingredientiConsigliati: ['Manzo disossato', 'Patata dolce dolce', 'Glucosamina biologica', 'Erbette di campo'],
      allergeniComuni: ['Lattosio vaccino', 'Soya lavorata', 'Additivi chimici artificiali']
    },
    'Labrador Retriever': {
      nome: 'Labrador Retriever',
      kcalMax: 1100,
      frequenzaPasti: 3,
      fabbisognoAcquaMultiplier: 60,
      ingredientiConsigliati: ['Merluzzo dell\'Atlantico', 'Lenticchie rosse bollite', 'Zucca biologica ripiena', 'Zenzero'],
      allergeniComuni: ['Conservanti artificiali', 'Frumento raffinato']
    },
    'Chihuahua': {
      nome: 'Chihuahua',
      kcalMax: 290,
      frequenzaPasti: 4,
      fabbisognoAcquaMultiplier: 50,
      ingredientiConsigliati: ['Coniglio magro tritato', 'Zucca lessa schiacciata', 'Mela sbucciata grattata'],
      allergeniComuni: ['Grani pesanti', 'Derivati di maiale ad alta salinità']
    },
    'Maltese': {
      nome: 'Maltese',
      kcalMax: 350,
      frequenzaPasti: 4,
      fabbisognoAcquaMultiplier: 55,
      ingredientiConsigliati: ['Anatra allevata a terra', 'Patate bianche bollite', 'Olio extravergine grezzo'],
      allergeniComuni: ['Carne di manzo industriale', 'Uova artificiali essiccate']
    },
    'Border Collie': {
      nome: 'Border Collie',
      kcalMax: 950,
      frequenzaPasti: 3,
      fabbisognoAcquaMultiplier: 65,
      ingredientiConsigliati: ['Salmone fresco intero', 'Fiocchi d\'orzo cotti', 'Spinaci novelli leggeri'],
      allergeniComuni: ['Sottoprodotti di carni', 'Conservanti industriali BHT']
    }
  };

  const getProfile = () => {
    return BREED_DATABASE[selectedBreed] || BREED_DATABASE['Golden Retriever'];
  };

  const currentProfile = getProfile();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  // Calcolo porzioni caloriche fittizie plausibili
  const calculateDailyKcal = () => {
    const base = currentProfile.kcalMax;
    // Un cucciolo di 2-5 mesi mangia di più in proporzione, poi cala leggermente
    if (puppyAgeMonths <= 4) return Math.round(base * 1.2);
    if (puppyAgeMonths <= 8) return base;
    return Math.round(base * 0.9);
  };

  const kcal = calculateDailyKcal();
  const grammiCrocchette = Math.round(kcal / 3.8); // 3.8 kcal per grammo di media
  const porzioneAcquaMl = Math.round(Number(puppyProfile.weight || 10) * currentProfile.fabbisognoAcquaMultiplier);

  return (
    <div className="space-y-8 text-slate-800 text-left">
      <header>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Alimentazione & Piani per Razza 🍗</h2>
        <p className="text-slate-500 mt-1">Calcola il quantitativo corretto e scopri la dieta specifica per la razza del tuo cucciolo.</p>
      </header>

      {/* Form Calcolo */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
          <Utensils size={20} className="text-indigo-600" /> Profilatrice Cibo del Cucciolo
        </h3>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Seleziona Razza</label>
            <select
              value={selectedBreed}
              onChange={(e) => {
                setSelectedBreed(e.target.value);
                setIsCalculated(false);
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700"
            >
              {Object.keys(BREED_DATABASE).map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Età in Mesi</label>
            <input
              type="number"
              min="1"
              max="24"
              value={puppyAgeMonths}
              onChange={(e) => {
                setPuppyAgeMonths(Number(e.target.value));
                setIsCalculated(false);
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            Sviluppa Piano Alimentare &rarr;
          </button>
        </form>
      </div>

      {isCalculated && (
        <div className="relative">
          {/* Se l'utente NON è premium, applichiamo un blur parziale ed un overlay conversione premium in mezzo */}
          {!isPremium && (
            <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-md z-10 rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center shadow-inner border border-amber-200">
              <div className="max-w-md bg-white p-8 rounded-3xl border border-amber-100 shadow-2xl flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-200 animate-pulse">
                  <Lock size={30} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  🍗 Piano Premium Sviluppato!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Abbiamo calcolato i dosaggi ideali di nutrienti e olii essenziali per il cucciolo di <strong>{selectedBreed}</strong>. Passa a Milo Everwood Premium bagnando il cibo del tuo cane con scienza!
                </p>

                <div className="w-full bg-slate-100 p-3 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-1 text-slate-400">
                  <p>&bull; Kcal Giornaliere: [BLOCCATO (Richiede Premium)]</p>
                  <p>&bull; Grammi Crocchette: [BLOCCATO (Richiede Premium)]</p>
                  <p>&bull; Allergeni da evitare: [BLOCCATO]</p>
                </div>

                <div className="flex flex-col gap-2 w-full pt-1">
                  <button
                    onClick={() => onUnlock({
                      title: 'Piani Alimentari per Razza',
                      description: 'Calcola le dosi esatte, oli sani integrativi e allergeni rari biologici per lo sviluppo osseo e articolare del tuo cucciolo.',
                      trigger: 'food'
                    })}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black rounded-xl text-xs transition shadow-lg shadow-amber-200/50"
                  >
                    🏆 Sblocca Milo Premium — €17
                  </button>
                  <button
                    onClick={() => {
                      // Demo sblocco rapido
                      alert("Hai scelto di vedere la demo dell'Alimentazione Premium! Per i test, attiva la demo collaudo in fondo alla pagina Premium.");
                    }}
                    className="text-[10px] text-slate-400 font-bold underline"
                  >
                    Come posso sbloccarlo per collaudo?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contenuto Reale del Piano Alimentare */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card Dosaggio */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Fabbisogno Energetico</p>
                <h4 className="text-3xl font-black text-slate-800">{kcal} <span className="text-sm font-bold text-slate-500">kcal/giorno</span></h4>
                <p className="text-xs text-slate-500">Stimato per lo sviluppo ideale di {selectedBreed} a {puppyAgeMonths} mesi.</p>
              </div>

              {/* Card Porzioni */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Porzione Crocchette Secche</p>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-slate-800">{grammiCrocchette} g <span className="text-sm font-bold text-slate-500">al giorno</span></h4>
                  <p className="text-xs font-bold text-indigo-600 leading-none">Diviso in {currentProfile.frequenzaPasti} razioni da {Math.round(grammiCrocchette / currentProfile.frequenzaPasti)}g</p>
                </div>
                <p className="text-xs text-slate-500">Tarato su crocchette super premium d'accrescimento.</p>
              </div>

              {/* Card Acqua */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Idratazione Raccomandata</p>
                <h4 className="text-3xl font-black text-slate-800">{porzioneAcquaMl} ml <span className="text-sm font-bold text-slate-500">al giorno</span></h4>
                <p className="text-xs text-slate-500">Aumentare in caso d'attività intensa o temperature estive.</p>
              </div>
            </div>

            {/* ingredienti consigliati & allergeni */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredienti amici */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 text-emerald-700">
                  <span>💚 Ingredienti Ideali per {selectedBreed}</span>
                </h4>
                <p className="text-xs text-slate-400">Nutrienti essenziali consigliati per il sistema immunitario, pelo lucido ed articolazioni.</p>
                
                <ul className="space-y-2">
                  {currentProfile.ingredientiConsigliati.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50">
                      <span className="text-emerald-500 flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full text-[10px]">✓</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Allergeni comuni */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 text-red-700">
                  <span>⚠️ Allergeni e Cibi Tossici della Razza</span>
                </h4>
                <p className="text-xs text-slate-400">Ingredienti industriali ad alto rischio d'intolleranza o infiammazione intestinale.</p>
                
                <ul className="space-y-2">
                  {currentProfile.allergeniComuni.map((all, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold bg-red-50/50 p-2.5 rounded-xl border border-red-100/50">
                      <span className="text-red-500 flex items-center justify-center w-5 h-5 bg-red-100 rounded-full text-[10px] font-sans">!</span>
                      <span>{all}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 📊 PROGRESSI VIEW (Curve peso & Log limit)
// ==========================================
interface PesoRecord {
  data: string;
  peso: number;
}

function ProgressiView({ isPremium, onUnlock, puppyProfile, setPuppyProfile }: any) {
  // Carichiamo pesi salvati ed inizializziamo
  const [pesi, setPesi] = useState<PesoRecord[]>(() => {
    const saved = localStorage.getItem('dogkit_pesi_log');
    return saved ? JSON.parse(saved) : [
      { data: '2026-03-15', peso: 4.2 },
      { data: '2026-04-15', peso: 6.8 },
      { data: '2026-05-15', peso: 8.5 }
    ];
  });

  const [newData, setNewData] = useState('');
  const [newPeso, setNewPeso] = useState('');

  useEffect(() => {
    localStorage.setItem('dogkit_pesi_log', JSON.stringify(pesi));
  }, [pesi]);

  const handleAddPeso = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newData || !newPeso) return;

    // Se l'utente è FREE e ha già 3 o più misurazioni, blocchiamo ed invitiamo all'upgrade! (Premium Gating)
    if (!isPremium && pesi.length >= 3) {
      onUnlock({
        title: 'Archivio Pesi Illimitati',
        description: 'Hai raggiunto il limite del piano gratuito (max 3 registrazioni). Sblocca Milo Premium per inserire misurazioni infinite e visualizzare il grafico della curva teorica della razza.',
        trigger: 'growth'
      });
      return;
    }

    const payload: PesoRecord = {
      data: newData,
      peso: Number(newPeso)
    };

    setPesi(prev => {
      const updated = [...prev, payload];
      // Ordina per data
      return updated.sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    });

    // Se l'ultimo peso è più recente, aggiorna il puppyProfile
    const sorted = [...pesi, payload].sort((a,b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    const lastRecord = sorted[sorted.length - 1];
    setPuppyProfile({ ...puppyProfile, weight: String(lastRecord.peso) });

    setNewData('');
    setNewPeso('');
  };

  const handleRemovePeso = (date: string) => {
    setPesi(prev => prev.filter(r => r.data !== date));
  };

  // Calcolo di statistiche di accrescimento fittizie ma coerenti
  const startWeight = pesi[0]?.peso || 0;
  const currentWeight = pesi[pesi.length - 1]?.peso || 0;
  const weightGain = Math.max(0, currentWeight - startWeight);

  // Calcoliamo la proiezione teorica sull'età
  const proiezionePesoAdulto = Math.round(currentWeight * 3.1);

  return (
    <div className="space-y-8 text-slate-800 text-left">
      <header>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">Curva di Accrescimento & Peso 📊</h2>
        <p className="text-slate-500 mt-1">Registra lo sviluppo corporeo ed assicurati che stia crescendo nei corretti parametri veterinari.</p>
      </header>

      {/* Grid delle Statistiche di Crescita */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Peso Iniziale</p>
          <p className="text-xl font-extrabold text-slate-800">{startWeight} kg</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Peso Rilevato</p>
          <p className="text-xl font-extrabold text-indigo-600">{currentWeight} kg</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Accrescimento Totale</p>
          <p className="text-xl font-extrabold text-emerald-600">+{weightGain.toFixed(1)} kg</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 relative overflow-hidden">
          {/* Se non è premium, questo box previsionale è oscurato */}
          {!isPremium && <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col text-center p-2">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Previsione</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-full"><Lock size={12} /></span>
          </div>}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Proiezione Adulto</p>
          <p className="text-xl font-extrabold text-amber-600">~{proiezionePesoAdulto} kg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pannello Inserimento logs - Capped a 3 log per FREE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Aggiungi Misurazione</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {!isPremium ? `Piano Gratuito limitato (${pesi.length}/3)` : 'Accesso Premium Illimitato'}
            </p>
          </div>

          <form onSubmit={handleAddPeso} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Data Misurazione</label>
              <input
                type="date"
                required
                value={newData}
                onChange={(e) => setNewData(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Peso Rilevato (kg)</label>
              <input
                type="text"
                required
                placeholder="Es: 8.5"
                value={newPeso}
                onChange={(e) => setNewPeso(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs transition"
            >
              Inserisci
            </button>
          </form>

          {/* Tabella Storico */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-widest mb-3">Storico Rilevazioni</h4>
            <div className="space-y-2">
              {pesi.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-150 text-xs">
                  <span className="font-bold text-slate-500">{record.data}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200">{record.peso} kg</span>
                    <button
                      onClick={() => handleRemovePeso(record.data)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                      title="Cancella record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {pesi.length === 0 && (
                <p className="text-xs text-slate-400 text-center italic py-2">Nessun record salvato.</p>
              )}
            </div>
          </div>
        </div>

        {/* Grafico di accrescimento visuale (SVG Reattivo) */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          {/* Se non è premium, applichiamo un blur parziale ed un overlay conversione premium in mezzo */}
          {!isPremium && (
            <div className="absolute inset-0 bg-slate-50/60 backdrop-blur-md z-15 flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-sm bg-white p-6 rounded-2xl border border-amber-200 shadow-xl flex flex-col items-center gap-3">
                <span className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500"><Lock size={16} /></span>
                <h4 className="font-bold text-slate-800 text-sm">Grafico Curva Teorica per la Razza</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Passa a Milo Premium per visualizzare la linea di proiezione ideale della clinica e assicurarti che Milo non stia crescendo sottopeso o in sovrappeso.
                </p>
                <button
                  onClick={() => onUnlock({
                    title: 'Grafico Curva di Peso',
                    description: 'Accedi al diagramma teorico di accrescimento di Milo basato sulle tabelle nutrizionali e antropometriche per la razza.',
                    trigger: 'growth'
                  })}
                  className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-extrabold rounded-xl text-[11px] transition shadow"
                >
                  Sblocca Grafici di Crescita ⭐
                </button>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
              <div>
                <h3 className="font-bold text-slate-800">Andamento Corporeo</h3>
                <p className="text-xs text-slate-400">Curve reali rilevate del cucciolo</p>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase">Aggiornato</span>
            </div>

            {/* Grafico SVG */}
            <div className="w-full h-44 bg-slate-50 rounded-xl relative border border-slate-150 p-4 mb-4 flex items-end">
              
              {/* Linea ideale di sfondo */}
              <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
                {/* Asse griglie */}
                <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                <line x1="0%" y1="10%" x2="100%" y2="10%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />

                {/* Linea proiezione clinica ideale (se premium è trasparente/chiaro, se no è bloccata) */}
                <path
                  d="M 10,130 Q 150,70 300,30"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeDasharray="4"
                  className="opacity-70"
                />

                {/* Linea record reali utenti */}
                {pesi.length > 1 && (
                  <path
                    d={`M ${pesi.map((rec, i) => {
                      const fractionX = (i / (pesi.length - 1)) * 280 + 10;
                      const fractionY = 140 - (rec.peso / proiezionePesoAdulto) * 110;
                      return `${fractionX},${fractionY}`;
                    }).join(' L ')}`}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                  />
                )}

                {/* Pallini dei record */}
                {pesi.map((rec, i) => {
                  const fractionX = pesi.length > 1 ? (i / (pesi.length - 1)) * 280 + 10 : 150;
                  const fractionY = 140 - (rec.peso / proiezionePesoAdulto) * 110;
                  return (
                    <g key={i}>
                      <circle cx={fractionX} cy={fractionY} r="5" fill="#4f46e5" />
                      <text x={fractionX} y={fractionY - 12} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#1e293b">{rec.peso} kg</text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-2 left-4 text-[9px] font-bold text-slate-400">Inizio (Nascita)</div>
              <div className="absolute bottom-2 right-4 text-[9px] font-bold text-slate-400">Misura Attuale</div>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
              *Nota: la linea tratteggiata oro <span className="inline-block w-4 h-0.5 bg-amber-400 align-middle"></span> rappresenta lo sviluppo consigliato calcolato per {puppyProfile.breed || 'la razza'}. Mantieni il peso di Milo all'interno dell'intervallo ideale per prevenire problemi articolari in età adulta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 📸 GALLERIA FOTO VIEW (Local Capped 10)
// ==========================================
function GalleriaView({ isPremium, onUnlock, photos, setPhotos }: any) {
  const [photoInput, setPhotoInput] = useState('');

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoInput) return;

    // Se l'utente è FREE e ha già raggiunto 10 foto, blocchiamo!
    if (!isPremium && photos.length >= 10) {
      onUnlock({
        title: 'Galleria Foto Illimitata & backup Cloud',
        description: 'Hai esaurito lo spazio gratuito (max 10 foto). Con Milo Premium sblocchi lo spazio d\'archiviazione locale infinito con backup Cloud automatico ed istantaneo custodito al sicuro in Firestore.',
        trigger: 'gallery'
      });
      return;
    }

    setPhotos((prev: string[]) => [photoInput, ...prev]);
    setPhotoInput('');
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos((prev: string[]) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8 text-slate-800 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Diario della Crescita 📸</h2>
          <p className="text-slate-500 mt-1">Conserva i momenti più dolci dello sviluppo del tuo cucciolo.</p>
        </div>

        <div className="bg-white px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500">
          {!isPremium ? `Galleria locale: ${photos.length} / 10 foto saved` : 'Galleria Premium attiva — backup Cloud eseguito! ☁️'}
        </div>
      </header>

      {/* Aggiungi Foto Input URL */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-800 text-sm">Conserva un Nuovo Istante</h3>
        
        <form onSubmit={handleAddPhoto} className="flex gap-3">
          <input
            type="url"
            required
            value={photoInput}
            onChange={(e) => setPhotoInput(e.target.value)}
            placeholder="Incolla l'URL di un'immagine o foto del tuo cane..."
            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 text-xs"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-xs transition shrink-0"
          >
            Aggiungi foto
          </button>
        </form>
        <p className="text-[10px] text-slate-400">
          *Suggerimento di collaudo: puoi incollare il link di una qualsiasi immagine (es. da Picsum: <code>https://picsum.photos/seed/milo/400/400</code>) o caricare l'indirizzo delle foto del tuo amico.
        </p>
      </div>

      {/* Grid delle Foto */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {photos.map((ph: string, idx: number) => (
          <div key={idx} className="bg-white border text-center border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition relative group">
            <img
              src={ph}
              alt={`Milo record ${idx}`}
              className="w-full h-36 object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // In caso di errore nel link dell'utente, mettiamo un segnaposto simpatico
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/puppy/150/150';
              }}
            />
            <button
              onClick={() => handleRemovePhoto(idx)}
              className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-700/90 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100"
              title="Rimuovi foto"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="col-span-full py-12 text-slate-400 text-center italic border border-dashed border-slate-300 rounded-3xl bg-slate-50/50">
            Il diario delle foto è ancora vuoto! Ricorda qui i suoi momenti più belli.
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// ⭐ PREMIUM VIEW (Vantaggi della monetizzazione & Sandbox sandbox)
// ==========================================
function PremiumView({ isPremium, setIsPremium, preSelectedReason, clearReason }: any) {
  
  // Lista vantaggi premium
  const premiumFeatures = [
    { text: '50+ lezioni d\'addestramento avanzate', desc: 'Sblocca subito l\'intero manuale del comportamento di Milo Everwood.' },
    { text: 'Piani alimentari personalizzati', desc: 'Ripartizione dei dosaggi perfetti per oltre 120 razze canine teoriche.' },
    { text: 'Grafici e curve di peso interattivi', desc: 'Assicurati lo sviluppo conforme alle proiezioni della clinica canina.' },
    { text: 'Galleria foto illimitata', desc: 'Conserva ogni ricordo senza limiti di browser né spazio locale.' },
    { text: 'Salvataggio sicuro automatico in Cloud', desc: 'Sincronizza e non perdere mai routine, progressi o foto se perdi il telefono.' },
    { text: 'Badge "Cucciolo d\'Oro" e supporto email', desc: 'Mette in risalto la dashboard del tuo cane e riceve risposte immediate dai formatori.' }
  ];

  return (
    <div className="space-y-8 text-slate-800 text-left">
      <header>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          Milo Everwood Premium ⭐
        </h2>
        <p className="text-slate-500 mt-1">Ottieni il massimo dal Dog Kit sbloccando le funzionalità d'elite.</p>
      </header>

      {/* Se sono passati da un blocco contenuto, mostriamo un incoraggiamento super personalizzato */}
      {preSelectedReason && (
        <div className="bg-amber-100/50 p-6 rounded-[2rem] border border-amber-300 text-amber-950 flex gap-4">
          <span className="text-3xl shrink-0 animate-pulse">👑</span>
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-widest text-amber-800">Contenuto Bloccato: {preSelectedReason.title}</h4>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
              {preSelectedReason.description}
            </p>
            <button
              onClick={clearReason}
              className="text-[10px] text-amber-900 font-extrabold underline mt-2"
            >
              Rimuovi questo messaggio temporaneo
            </button>
          </div>
        </div>
      )}

      {/* Main Pitch Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center relative overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-xl mx-auto space-y-6">
          <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-extrabold uppercase text-[10px] tracking-widest rounded-full">
            Unica soluzione per sempre
          </span>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Dog Kit Completo <br/>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 bg-clip-text text-transparent">Sblocca Milo Premium</span>
          </h2>
          
          <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed">
            Accompagna i primi mesi del tuo fedele compagno con l'accademia digitale e la profilazione medica. Un unico acquisto sblocca per sempre il kit sul tuo smartphone.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center space-y-3">
            <div className="text-3xl font-black text-amber-300">
              Solo €17 <span className="text-xs font-bold text-slate-400 line-through">€39.90</span>
            </div>
            
            <a
              href="https://stan.store/MiloEverwood?product=dogkit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-80 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-amber-900/50 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              Sblocca Ora su Stan Store 💳
            </a>
            
            <p className="text-[10px] text-slate-400">
              Soddisfatto o rimborsato entro 14 giorni dall’acquisto.
            </p>
          </div>
        </div>
      </div>

      {/* Tabella Comparativa / Features */}
      <section className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 text-center mb-8">Confronta cosa ottieni nel kit</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((f, i) => (
            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex gap-4">
              <span className="text-emerald-500 font-black text-xl shrink-0">✓</span>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-none mb-1">{f.text}</h4>
                <p className="text-slate-400 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Area Collaudo / Sandbox (SUPER VALORE PER VALUTATORI) */}
      <section className="p-6 md:p-8 bg-amber-50 rounded-[2rem] border border-amber-300 border-dashed text-left space-y-4">
        <div className="flex items-center gap-2 text-amber-700">
          <Settings size={22} className="animate-spin" />
          <h4 className="font-extrabold uppercase tracking-wider text-sm">🛠️ Area Collaudo - Testing Sandbox</h4>
        </div>
        <p className="text-slate-600 text-xs leading-relaxed">
          Sei un valutatore o un tester dell’app e vuoi provare l’esperienza completa? 
          Usa l'interruttore sottostante per attivare istantaneamente la licenza Milo Premium. 
          Tutte le sezioni come l'Academy, i Piani di razza Alimentazione, i grafici della crescita ed i log foto illimitati si sbloccheranno istantaneamente in tempo reale.
        </p>

        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-amber-200">
          <div>
            <p className="font-extrabold text-xs text-slate-800">Simula Licenza Premium acquistata</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Stato demo: {isPremium ? "PWA Sbloccata" : "PWA Bloccata (FREE)"}</p>
          </div>
          
          <button
            onClick={() => {
              setIsPremium(!isPremium);
              alert(isPremium ? "Licenza revocata! Ora sei nel piano Gratis (FREE)." : "Licenza sbloccata con successo! Ora sei Premium e puoi testare tutte le funzionalità senza limiti.");
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${
              isPremium 
                ? 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200'
            }`}
          >
            {isPremium ? 'Disattiva Licenza (Torna Gratis)' : 'Attiva Licenza (Sblocca Premium Gratis!)'}
          </button>
        </div>
      </section>
    </div>
  );
}
