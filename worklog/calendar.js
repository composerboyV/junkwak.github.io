(function(root){
  'use strict';
  function iso(d){return d.toISOString().slice(0,10);}
  function monthDays(month){
    const [y,m]=month.split('-').map(Number);
    const first=new Date(Date.UTC(y,m-1,1));
    const offset=(first.getUTCDay()+6)%7;
    return Array.from({length:42},(_,i)=>iso(new Date(Date.UTC(y,m-1,1-offset+i))));
  }
  function shiftMonth(day,delta,today){
    const [y,m,d]=day.split('-').map(Number);
    const target=new Date(Date.UTC(y,m-1+delta,1));
    const last=new Date(Date.UTC(target.getUTCFullYear(),target.getUTCMonth()+1,0)).getUTCDate();
    target.setUTCDate(Math.min(d,last));
    const result=iso(target);return today&&result>today?today:result;
  }
  function activity(entry,project){
    const p=entry?.projects||{};
    const items=Object.entries(p).filter(([id])=>project==='all'||id===project);
    return {commits:items.reduce((n,[,v])=>n+v.commits,0),files:items.reduce((n,[,v])=>n+v.files,0),note:!!entry?.note,projects:items};
  }
  const api={monthDays,shiftMonth,activity};
  root.WorklogCalendar=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(globalThis);
