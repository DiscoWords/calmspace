import { useEffect, useState } from 'react';
import { Check } from './Icons';
export function useToast(){const [message,setMessage]=useState(''); const toast=(m:string)=>setMessage(m); useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),2200);return()=>clearTimeout(t)},[message]); return {message,toast};}
export function Toast({message}:{message:string}){if(!message)return null;return <div className="toast glass glass-3"><span className="toast-icon"><Check size={15}/></span>{message}</div>}
