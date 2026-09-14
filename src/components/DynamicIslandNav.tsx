import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ViewKey } from '../types';
import { Home, CheckSquare, NotebookPen, CalendarDays, Folders, Search, Settings, X, Plus } from './Icons';
import { GlassButton } from './Glass';

const items:[ViewKey,string,any][]=[['home','Home',Home],['tasks','Tasks',CheckSquare],['notes','Notes',NotebookPen],['planner','Planner',CalendarDays],['categories','Areas',Folders],['search','Search',Search],['settings','Settings',Settings]];
export function DynamicIslandNav({view,setView,onNew}:{view:ViewKey;setView:(v:ViewKey)=>void;onNew:()=>void}){const [open,setOpen]=React.useState(false); return <>
  <AnimatePresence>{open&&<motion.button className="nav-backdrop" aria-label="Close navigation" onClick={()=>setOpen(false)} initial={{opacity:0,backdropFilter:'blur(0px)'}} animate={{opacity:1,backdropFilter:'blur(14px)'}} exit={{opacity:0,backdropFilter:'blur(0px)'}}/>}</AnimatePresence>
  <div className={`island-wrap ${open?'island-open':''}`}>
    <motion.div layout transition={{type:'spring',stiffness:420,damping:32}} className="island glass glass-4">
      {!open ? <motion.button layout className="island-collapsed" onClick={()=>setOpen(true)} aria-label="Open navigation"><span className="island-dot"/><span className="island-current">{items.find(i=>i[0]===view)?.[1]}</span><span className="island-chevron">⌃</span></motion.button> : <>
        <div className="island-header"><div><div className="eyebrow">CALMSPACE</div><div className="island-title">{items.find(i=>i[0]===view)?.[1]}</div></div><button className="icon-btn" onClick={()=>setOpen(false)} aria-label="Close"><X size={18}/></button></div>
        <div className="island-grid">{items.map(([key,label,Icon])=><button key={key} className={`island-item ${view===key?'active':''}`} onClick={()=>{setView(key);setOpen(false)}}><span className="island-item-icon"><Icon size={18}/></span><span>{label}</span></button>)}</div>
        <GlassButton variant="primary" className="island-create" onClick={()=>{onNew();setOpen(false)}}><Plus size={18}/> New</GlassButton>
      </>}
    </motion.div>
  </div>
</>}
