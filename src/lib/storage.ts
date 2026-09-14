import type { AppData, Category, Note, Settings, Task } from '../types';

export const STORAGE_KEY = 'calmspace:data:v1';
export const SCHEMA_VERSION = 1;

const presets = {
  aurora: { primary: '#8eaaff', secondary: '#caa9ff', accent: '#ffb6cf' },
  ocean: { primary: '#76a9ff', secondary: '#84e3e7', accent: '#9c98ff' },
  sunset: { primary: '#ffc58a', secondary: '#ff9dc1', accent: '#bda6ff' },
  midnight: { primary: '#5368be', secondary: '#7869c6', accent: '#bf77a4' },
  minimal: { primary: '#b5c7f4', secondary: '#eceafd', accent: '#d7c6ec' }
} as const;

const defaultCategories: Category[] = [
  { id: 'cat-project', name: 'Project', color: '#8BA8FF', icon: 'Sparkles', createdAt: new Date().toISOString(), order: 0, archived: false },
  { id: 'cat-study', name: 'Study', color: '#81CDB5', icon: 'BookOpen', createdAt: new Date().toISOString(), order: 1, archived: false },
  { id: 'cat-personal', name: 'Personal', color: '#B59BEB', icon: 'Heart', createdAt: new Date().toISOString(), order: 2, archived: false },
  { id: 'cat-health', name: 'Health', color: '#F5A7A4', icon: 'Activity', createdAt: new Date().toISOString(), order: 3, archived: false },
  { id: 'cat-finance', name: 'Finance', color: '#E8C57B', icon: 'WalletCards', createdAt: new Date().toISOString(), order: 4, archived: false }
];

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const dayOffset = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

const demoTasks: Task[] = [
  { id: 'task-1', title: 'Finish project draft', description: 'Polish the methods section and add the last figure.', categoryId: 'cat-project', createdAt: new Date(Date.now()-864e5*3).toISOString(), updatedAt: new Date().toISOString(), dueDate: dayOffset(0), dueTime: '16:30', priority: 'high', completed: false, completedAt: null, tags: ['thesis'], subtasks: [{id:'sub-1', title:'Review methods', completed:true},{id:'sub-2', title:'Add figure', completed:false}], recurrence: null, reminder: null, archived:false },
  { id: 'task-2', title: 'Review lecture notes', description: '', categoryId: 'cat-study', createdAt: new Date(Date.now()-864e5*2).toISOString(), updatedAt: new Date().toISOString(), dueDate: dayOffset(0), dueTime: '19:00', priority: 'medium', completed: false, completedAt: null, tags: [], subtasks: [], recurrence: null, reminder: null, archived:false },
  { id: 'task-3', title: 'Read research paper', description: '', categoryId: 'cat-study', createdAt: new Date(Date.now()-864e5).toISOString(), updatedAt: new Date().toISOString(), dueDate: dayOffset(1), dueTime: null, priority: 'low', completed: false, completedAt: null, tags: ['reading'], subtasks: [], recurrence: null, reminder: null, archived:false },
  { id: 'task-4', title: 'Prepare presentation', description: 'Sketch the story arc for next week.', categoryId: 'cat-project', createdAt: new Date(Date.now()-864e5*5).toISOString(), updatedAt: new Date().toISOString(), dueDate: dayOffset(3), dueTime: '10:00', priority: 'urgent', completed: false, completedAt: null, tags: [], subtasks: [], recurrence: null, reminder: null, archived:false },
  { id: 'task-5', title: 'Buy groceries', description: '', categoryId: 'cat-personal', createdAt: new Date(Date.now()-864e5*4).toISOString(), updatedAt: new Date().toISOString(), dueDate: dayOffset(2), dueTime: null, priority: 'none', completed: false, completedAt: null, tags: [], subtasks: [], recurrence: null, reminder: null, archived:false }
];
const demoNotes: Note[] = [
  { id:'note-1', title:'Research ideas', content:'# Research ideas\n\nExplore how calibration uncertainty might propagate into crop damage estimates.\n\n- Depth-based calibration\n- Duration metrics\n- Damage functions', categoryId:'cat-project', createdAt:new Date(Date.now()-864e5*8).toISOString(), updatedAt:new Date(Date.now()-864e5).toISOString(), tags:['research','ideas'], pinned:true, favorite:true, archived:false },
  { id:'note-2', title:'Project meeting notes', content:'## Next steps\n\nClarify validation sites and organize the data inventory.', categoryId:'cat-project', createdAt:new Date(Date.now()-864e5*6).toISOString(), updatedAt:new Date(Date.now()-864e5*2).toISOString(), tags:['meeting'], pinned:false, favorite:false, archived:false },
  { id:'note-3', title:'Exam summary', content:'### Hydraulics\n\nKey relationships and assumptions to review before the quiz.', categoryId:'cat-study', createdAt:new Date(Date.now()-864e5*5).toISOString(), updatedAt:new Date(Date.now()-864e5*4).toISOString(), tags:['study'], pinned:false, favorite:false, archived:false }
];

const defaults: AppData = {
  schemaVersion: SCHEMA_VERSION,
  tasks: demoTasks, notes: demoNotes, categories: defaultCategories,
  settings: { theme:'system', gradientPreset:'aurora', gradientColors:presets.aurora, animationSpeed:1, backgroundIntensity:.85, blurAmount:24, glassAmount:.22, startPage:'home', dateFormat:'MMM d, yyyy', firstDayOfWeek:1, displayName:'Bardia', greeting:'', showCompletedOnHome:false, defaultTaskCategoryId:'cat-project', defaultTaskPriority:'none' }
};

export function presetColors(name: Settings['gradientPreset']) { return name === 'custom' ? presets.aurora : presets[name]; }
export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    if (!parsed || !Array.isArray(parsed.tasks) || !Array.isArray(parsed.notes) || !Array.isArray(parsed.categories) || !parsed.settings) return defaults;
    return { ...defaults, ...parsed, schemaVersion: SCHEMA_VERSION, settings:{...defaults.settings, ...parsed.settings} };
  } catch { return defaults; }
}
export function saveData(data: AppData) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* Best effort persistence. */ } }
export function resetData() { localStorage.removeItem(STORAGE_KEY); return defaults; }

export function exportData(data: AppData) { const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`calmspace-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
