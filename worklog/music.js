// User-provided YouTube link. Keep the official player mounted across date/filter changes.
(() => {
  const panel=document.getElementById('music-panel');
  const toggle=document.getElementById('music-toggle');
  let mounted=false;
  function show(open){
    if(open&&!mounted){
      const frame=document.createElement('iframe');
      frame.src='https://www.youtube-nocookie.com/embed/l9dK9-cd_xo?list=PLKzfXVPXeEVE&playsinline=1&rel=0';
      frame.title='준기 님의 YouTube 플레이리스트';
      frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.referrerPolicy='strict-origin-when-cross-origin';
      frame.allowFullscreen=true;
      document.getElementById('youtube-player').append(frame);
      mounted=true;
    }
    panel.hidden=!open;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.innerHTML=open?'플레이어 접기 <span>⌄</span>':'플레이어 열기 <span>⌃</span>';
  }
  toggle.addEventListener('click',()=>show(panel.hidden));
  document.getElementById('music-collapse').addEventListener('click',()=>{show(false);toggle.focus();});
})();
