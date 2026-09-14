import { Modal } from './Modal';
import { GlassButton } from './Glass';
export function Confirm({open,onClose,onConfirm,title,message,confirmLabel='Delete'}:{open:boolean;onClose:()=>void;onConfirm:()=>void;title:string;message:string;confirmLabel?:string}){return <Modal open={open} onClose={onClose} title={title}><p className="modal-copy">{message}</p><div className="modal-actions"><GlassButton onClick={onClose}>Cancel</GlassButton><GlassButton variant="danger" onClick={onConfirm}>{confirmLabel}</GlassButton></div></Modal>}
