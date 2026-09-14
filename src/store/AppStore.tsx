import React, { createContext, useContext, useMemo, useState } from 'react';
import { loadData, saveData, resetData, exportData as downloadExport, presetColors } from '../lib/storage';
import { uid } from '../lib/id';
import type { AppData, Category, Note, Priority, Settings, Task, ViewKey } from '../types';

interface Store {
  data: AppData; view: ViewKey; setView:(v:ViewKey)=>void;
  addTask:(input: Partial<Task> & Pick<Task,'title'>)=>void; updateTask:(id:string, patch:Partial<Task>)=>void; toggleTask:(id:string)=>void; deleteTask:(id:string)=>void;
  addNote:(input: Partial<Note> & Pick<Note,'title'>)=>void; updateNote:(id:string, patch:Partial<Note>)=>void; deleteNote:(id:string)=>void;
  addCategory:(input: Pick<Category,'name'|'color'> & Partial<Category>)=>void; updateCategory:(id:string, patch:Partial<Category>)=>void; deleteCategory:(id:string)=>void;
  updateSettings:(patch:Partial<Settings>)=>void; exportAll:()=>void; importAll:(payload:unknown, mode:'merge'|'replace')=>{ok:boolean; message:string}; clearAll:()=>void;
}
const Ctx = createContext<Store|null>(null);
export function AppStoreProvider({children}:{children:React.ReactNode}){
  const [data,setData]=useState<AppData>(()=>loadData()); const [view,setView]=useState<ViewKey>(data.settings.startPage);
  const commit=(next:AppData)=>{setData(next);saveData(next);};
  const addTask=(input: Partial<Task> & Pick<Task,'title'>)=>{const now=new Date().toISOString(); const t:Task={id:uid('task'),title:input.title,description:input.description??'',categoryId:input.categoryId??data.settings.defaultTaskCategoryId,createdAt:now,updatedAt:now,dueDate:input.dueDate??null,dueTime:input.dueTime??null,priority:input.priority??data.settings.defaultTaskPriority,completed:false,completedAt:null,tags:input.tags??[],subtasks:input.subtasks??[],recurrence:input.recurrence??null,reminder:input.reminder??null,archived:false}; commit({...data,tasks:[t,...data.tasks]});};
  const updateTask=(id:string,patch:Partial<Task>)=>commit({...data,tasks:data.tasks.map(t=>t.id===id?{...t,...patch,updatedAt:new Date().toISOString()}:t)});
  const toggleTask=(id:string)=>{const found=data.tasks.find(x=>x.id===id);if(!found)return;updateTask(id,{completed:!found.completed,completedAt:!found.completed?new Date().toISOString():null})};
  const deleteTask=(id:string)=>commit({...data,tasks:data.tasks.filter(t=>t.id!==id)});
  const addNote=(input: Partial<Note> & Pick<Note,'title'>)=>{const now=new Date().toISOString(); const n:Note={id:uid('note'),title:input.title,content:input.content??'',categoryId:input.categoryId??data.settings.defaultTaskCategoryId,createdAt:now,updatedAt:now,tags:input.tags??[],pinned:input.pinned??false,favorite:input.favorite??false,archived:false}; commit({...data,notes:[n,...data.notes]});};
  const updateNote=(id:string,patch:Partial<Note>)=>commit({...data,notes:data.notes.map(n=>n.id===id?{...n,...patch,updatedAt:new Date().toISOString()}:n)});
  const deleteNote=(id:string)=>commit({...data,notes:data.notes.filter(n=>n.id!==id)});
  const addCategory=(input:Pick<Category,'name'|'color'> & Partial<Category>)=>{const c:Category={id:uid('cat'),name:input.name,color:input.color,icon:input.icon??'FolderHeart',createdAt:new Date().toISOString(),order:data.categories.length,archived:false}; commit({...data,categories:[...data.categories,c]});};
  const updateCategory=(id:string,patch:Partial<Category>)=>commit({...data,categories:data.categories.map(c=>c.id===id?{...c,...patch}:c)});
  const deleteCategory=(id:string)=>{const fallback=null; commit({...data,categories:data.categories.filter(c=>c.id!==id),tasks:data.tasks.map(t=>t.categoryId===id?{...t,categoryId:fallback}:t),notes:data.notes.map(n=>n.categoryId===id?{...n,categoryId:fallback}:n)});};
  const updateSettings=(patch:Partial<Settings>)=>{const settings={...data.settings,...patch}; if(patch.gradientPreset && patch.gradientPreset!=='custom') settings.gradientColors=presetColors(patch.gradientPreset); commit({...data,settings});};
  const exportAll=()=>downloadExport(data);
  const importAll=(payload:unknown,mode:'merge'|'replace')=>{try{const p=payload as AppData;if(!p||!Array.isArray(p.tasks)||!Array.isArray(p.notes)||!Array.isArray(p.categories)||!p.settings)return{ok:false,message:'That backup file is not valid.'}; const next=mode==='replace'?{...data,...p,schemaVersion:1}:{...data,tasks:[...p.tasks,...data.tasks],notes:[...p.notes,...data.notes],categories:[...p.categories,...data.categories],settings:{...data.settings,...p.settings},schemaVersion:1}; commit(next);return{ok:true,message:mode==='replace'?'Backup restored':'Backup merged'};}catch{return{ok:false,message:'Could not read this backup.'}}};
  const clearAll=()=>{const next=resetData();setData(next);setView('home');};
  const value=useMemo(()=>({data,view,setView,addTask,updateTask,toggleTask,deleteTask,addNote,updateNote,deleteNote,addCategory,updateCategory,deleteCategory,updateSettings,exportAll,importAll,clearAll}),[data,view]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useAppStore(){const value=useContext(Ctx);if(!value)throw new Error('useAppStore must be used inside AppStoreProvider');return value;}
