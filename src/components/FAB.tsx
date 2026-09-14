import { Plus, NotebookPen, CheckSquare } from './Icons';
import { GlassButton } from './Glass';
export function FAB({onTask,onNote}:{onTask:()=>void;onNote:()=>void}){return <div className="fab-wrap"><GlassButton variant="primary" className="fab-main" onClick={onTask} ariaLabel="New task"><Plus size={20}/><span>New task</span></GlassButton><button className="fab-note" onClick={onNote} aria-label="New note"><NotebookPen size={18}/></button></div>}
