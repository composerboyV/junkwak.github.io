'use strict';
const $=s=>document.querySelector(s),store=JournalStore;
const today=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const label=day=>new Intl.DateTimeFormat('ko-KR',{month:'long',day:'numeric',weekday:'long',timeZone:'Asia/Seoul'}).format(new Date(day+'T12:00:00+09:00'));
const shift=(day,n)=>{const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
let day=today(),entries=[],baseline='',dirty=false,healthy=true,timer;
function message(text){$('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(timer);timer=setTimeout(()=>$('#toast').hidden=true,4500);}
function failure(e){$('#error').hidden=false;$('#error').textContent='저장소를 읽거나 쓰지 못했습니다. 작성한 내용은 먼저 .md로 다운로드해 주세요. '+e.message;}
function read(){try{const result=store.read(localStorage);healthy=true;return result;}catch(e){healthy=false;failure(e);return entries;}}
function render(){
 const entry=entries.find(e=>e.date===day);baseline=entry?.body||'';$('#note').value=baseline;dirty=false;
 $('#day-title').textContent=label(day);$('#day-label').textContent=day===today()?'오늘의 기록':day.slice(0,4)+'년';$('#date').value=day;$('#date').max=today();$('#next-day').disabled=day>=today();
 $('#note-status').textContent=baseline?'이 브라우저에 저장됨':'아직 작성한 일지가 없습니다.';renderCalendar();renderEntries();window.renderGitActivity?.(day);
}
function renderEntries(){
 const saved=entries.filter(e=>e.body.trim()).sort((a,b)=>b.date.localeCompare(a.date));$('#entry-count').textContent=saved.length;$('#entry-list').replaceChildren();
 if(!saved.length){const p=document.createElement('p');p.className='empty-journal';p.textContent='첫 기록을 남겨보세요.';$('#entry-list').append(p);}
 for(const entry of saved.slice(0,60)){const b=document.createElement('button');b.className='entry-link';b.dataset.date=entry.date;if(entry.date===day)b.setAttribute('aria-current','date');b.textContent=entry.date;const text=document.createElement('small');text.textContent=entry.body.split('\n').find(x=>x.trim())||'';b.append(text);$('#entry-list').append(b);}
}
function renderCalendar(){
 const month=day.slice(0,7);$('#month-year').textContent=day.slice(0,4);$('#month-title').textContent=Number(day.slice(5,7))+'월';$('#month').value=month;$('#month').max=today().slice(0,7);$('#next-month').disabled=month>=today().slice(0,7);
 const saved=new Set((window.portfolioActivity?.days||[]).map(e=>e.date));const count=[...saved].filter(x=>x.startsWith(month)).length;$('#month-summary').textContent=count?'이달의 업데이트 '+count+'일':'이달에 반영된 GitHub 기록이 없습니다.';
 $('#month-grid').innerHTML=WorklogCalendar.monthDays(month).map(d=>`<button class="calendar-day ${d===day?'selected':''} ${d===today()?'is-today':''} ${d.startsWith(month)?'':'outside'}" data-day="${d}" aria-label="${label(d)}${saved.has(d)?', GitHub 업데이트 있음':''}" aria-pressed="${d===day}" ${d>today()?'disabled':''}><span class="day-number">${Number(d.slice(-2))}</span>${saved.has(d)?'<i class="journal-marker" aria-hidden="true"></i>':''}</button>`).join('');
}
function changeDate(next){if(!store.validDay(next)||next>today())return;if(dirty&&!confirm('저장하지 않은 내용이 있습니다. 저장하지 않고 날짜를 바꿀까요?')){$('#date').value=day;$('#month').value=day.slice(0,7);return;}entries=read();day=next;render();}
function save(){
 try{const latest=store.read(localStorage),current=latest.find(e=>e.date===day)?.body||'';if(current!==baseline){message('다른 탭에서 이 날짜를 수정했습니다. 현재 글을 .md로 내려받고 새로고침해 주세요.');return false;}
 const body=$('#note').value;const updated=latest.filter(e=>e.date!==day);updated.push({date:day,body,updated:new Date().toISOString()});store.write(localStorage,updated);entries=updated;baseline=body;dirty=false;healthy=true;$('#error').hidden=true;$('#note-status').textContent='이 브라우저에 저장했습니다';renderCalendar();renderEntries();return true;
 }catch(e){failure(e);return false;}
}
function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
function backup(){if(dirty&&!save())return;entries=read();if(!healthy)return;download(JSON.stringify(store.bundle(entries),null,2),'작업일지-'+today()+'.json','application/json');}
$('#note').addEventListener('input',()=>{dirty=true;$('#note-status').textContent='저장하지 않은 내용';});$('#save-note').addEventListener('click',()=>{if(save())message('저장했습니다.');});
$('#export-button').addEventListener('click',()=>download('# '+day+' 작업일지\n\n'+$('#note').value+'\n',day+'-작업일지.md','text/markdown;charset=utf-8'));
$('#backup').addEventListener('click',backup);$('#mobile-backup').addEventListener('click',backup);
for(const id of ['import-open','mobile-import'])$('#'+id).addEventListener('click',()=>$('#import-file').click());
$('#import-file').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5*1024*1024)throw new Error('5 MB 이하 백업 파일을 선택해 주세요.');const incoming=store.validate(JSON.parse(await file.text()));if(dirty&&!save())return;const result=store.merge(store.read(localStorage),incoming);store.write(localStorage,result.entries);entries=result.entries;render();message(result.added+'일 가져왔습니다. 기존 내용이 있는 '+result.skipped+'일은 유지했습니다.');}catch(err){message(err.message);}finally{e.target.value='';}});
$('#entry-list').addEventListener('click',e=>{const b=e.target.closest('[data-date]');if(b)changeDate(b.dataset.date);});
$('#month-grid').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(b)changeDate(b.dataset.day);});
$('#month-grid').addEventListener('keydown',e=>{const b=e.target.closest('[data-day]'),offset={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];if(!b||!offset)return;e.preventDefault();const next=shift(b.dataset.day,offset);changeDate(next);document.querySelector(`[data-day="${next}"]`)?.focus();});
$('#date').addEventListener('change',e=>changeDate(e.target.value));$('#month').addEventListener('change',e=>changeDate(e.target.value+'-01'));
$('#previous-day').addEventListener('click',()=>changeDate(shift(day,-1)));$('#next-day').addEventListener('click',()=>changeDate(shift(day,1)));$('#today').addEventListener('click',()=>changeDate(today()));
$('#previous-month').addEventListener('click',()=>changeDate(WorklogCalendar.shiftMonth(day,-1,today())));$('#next-month').addEventListener('click',()=>changeDate(WorklogCalendar.shiftMonth(day,1,today())));
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
window.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save();}});
window.addEventListener('storage',e=>{if(e.key!==store.KEY)return;if(dirty){message('다른 탭에서 일지가 변경됐습니다. 작성 중인 글은 유지합니다.');return;}entries=read();render();});
entries=read();render();

document.addEventListener('portfolio-activity',()=>{renderCalendar();window.renderGitActivity?.(day);});
