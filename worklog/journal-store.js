(function(root){
'use strict';
const KEY='junkwak.journal.v1';
function validDay(day){return typeof day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(day)&&!Number.isNaN(Date.parse(day+'T12:00:00Z'))&&new Date(day+'T12:00:00Z').toISOString().slice(0,10)===day;}
function validate(value){
 if(!value||value.format!=='junkwak-journal'||value.version!==1||!Array.isArray(value.entries)||value.entries.length>5000)throw new Error('작업일지 백업 형식이 아닙니다.');
 const days=new Set();
 return value.entries.map(e=>{if(!e||!validDay(e.date)||typeof e.body!=='string'||e.body.length>50000||days.has(e.date))throw new Error('날짜나 일지 내용이 올바르지 않습니다.');days.add(e.date);return {date:e.date,body:e.body,updated:typeof e.updated==='string'?e.updated:''};});
}
function bundle(entries){return {format:'junkwak-journal',version:1,entries};}
function read(storage){const raw=storage.getItem(KEY);return raw?validate(JSON.parse(raw)):[];}
function write(storage,entries){storage.setItem(KEY,JSON.stringify(bundle(validate(bundle(entries)))));}
function merge(existing,incoming){const map=new Map(existing.map(e=>[e.date,e]));let added=0,skipped=0;for(const e of incoming){if(map.get(e.date)?.body.trim()){skipped++;continue;}map.set(e.date,e);added++;}return {entries:[...map.values()].sort((a,b)=>a.date.localeCompare(b.date)),added,skipped};}
const api={KEY,validDay,validate,bundle,read,write,merge};root.JournalStore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(globalThis);
