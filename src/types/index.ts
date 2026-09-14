export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';
export type ThemeMode = 'light' | 'dark' | 'system';
export type GradientPreset = 'aurora' | 'ocean' | 'sunset' | 'midnight' | 'minimal' | 'custom';
export type ViewKey = 'home' | 'tasks' | 'notes' | 'planner' | 'categories' | 'search' | 'settings';

export interface Subtask { id: string; title: string; completed: boolean; }
export interface Task {
  id: string; title: string; description: string; categoryId: string | null;
  createdAt: string; updatedAt: string; dueDate: string | null; dueTime: string | null;
  priority: Priority; completed: boolean; completedAt: string | null; tags: string[];
  subtasks: Subtask[]; recurrence: string | null; reminder: string | null; archived: boolean;
}
export interface Note {
  id: string; title: string; content: string; categoryId: string | null;
  createdAt: string; updatedAt: string; tags: string[]; pinned: boolean; favorite: boolean; archived: boolean;
}
export interface Category {
  id: string; name: string; color: string; icon: string; createdAt: string; order: number; archived: boolean;
}
export interface GradientColors { primary: string; secondary: string; accent: string; }
export interface Settings {
  theme: ThemeMode; gradientPreset: GradientPreset; gradientColors: GradientColors;
  animationSpeed: number; backgroundIntensity: number; blurAmount: number; glassAmount: number;
  startPage: ViewKey; dateFormat: 'MMM d, yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd'; firstDayOfWeek: 0 | 1;
  displayName: string; greeting: string; showCompletedOnHome: boolean; defaultTaskCategoryId: string | null; defaultTaskPriority: Priority;
}
export interface AppData { schemaVersion: number; tasks: Task[]; notes: Note[]; categories: Category[]; settings: Settings; }
