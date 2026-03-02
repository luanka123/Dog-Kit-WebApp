export type Page = 'welcome' | 'home' | 'routine' | 'training' | 'planner' | 'shopping' | 'resources' | 'faq';

export interface RoutineItem {
  id: string;
  label: string;
  time?: string;
  completed: boolean;
  type: 'morning' | 'evening';
}

export interface TrainingDay {
  id: string;
  day: string;
  title: string;
  description: string;
  tip?: string;
  completed: boolean;
}

export interface ShoppingItem {
  id: string;
  label: string;
  category: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio';
  url: string;
}
