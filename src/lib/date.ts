import { addDays, format, isSameDay, isToday as dfIsToday, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
export const dateKey=(d:Date)=>format(d,'yyyy-MM-dd');
export const prettyDate=(d:string, fmt='MMM d, yyyy')=>{try{return format(parseISO(d),fmt.replace('yyyy','yyyy'))}catch{return d}};
export { addDays, format, isSameDay, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, dfIsToday };
