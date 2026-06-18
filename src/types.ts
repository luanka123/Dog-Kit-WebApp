export type Page = 'welcome' | 'home' | 'routine' | 'training' | 'planner' | 'shopping' | 'resources' | 'faq' | 'first-aid' | 'notifications' | 'academy' | 'food' | 'growth' | 'gallery' | 'premium';

export interface NotificationSetting {
  id: string;
  label: string;
  time: string; // "HH:mm"
  enabled: boolean;
  type: 'water' | 'meal';
}

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
  isFixed?: boolean;
}

export interface PlannerItem {
  id: string;
  label: string;
  completed: boolean[]; // 7 days
  isFixed?: boolean;
  reminder?: boolean;
}

export interface FirstAidAction {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio';
  url: string;
  access?: 'free' | 'premium';
  comingSoon?: boolean;
}
