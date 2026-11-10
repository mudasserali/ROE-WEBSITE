/* Explicit desktop composition. Mobile styles and the single audio owner are retained. */
(()=>{
 'use strict';
 const frame=document.getElementById('roePageFrame');
 if(!frame)return;
 const desktop=matchMedia('(min-width:761px)');
 const EDITORIAL_HTML="<div class=\"roe-release-feature\"><img class=\"roe-contact-cover\" src=\"press-roe/assets/cover.webp\" alt=\"Official One More Ferrari single cover\" width=\"1536\" height=\"1536\"><div><p class=\"roe-release-kicker\">ROSE OF ENGLAND / DATAXSTUDIO · EMPIRE</p><h2>ONE MORE<br>FERRARI</h2><p class=\"roe-release-meta\">Out now · October 23, 2026<br>Rose of England’s debut single through EMPIRE.</p><a class=\"roe-listen\" href=\"https://empire.ffm.to/onemoreferrari\" target=\"_blank\" rel=\"noopener noreferrer\">LISTEN EVERYWHERE ↗</a></div></div><h3>Apple Music editorial highlights</h3><p class=\"roe-editorial-intro\">Release-week positions + the team’s November 9 Dance update.</p><table class=\"performance\"><caption class=\"sr-only\" style=\"position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)\">Apple Music editorial playlist positions: the original October 19–24, 2026 report and the team’s November 9, 2026 Dance update.</caption><thead><tr><th scope=\"col\">Playlist</th><th scope=\"col\">Territory</th><th scope=\"col\">Position / movement</th></tr></thead><tbody>\n        <tr class=\"highlight\" data-territory=\"ca\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"alt_pop_ca\" href=\"https://music.apple.com/ca/playlist/alt-pop/pl.cac8c8af1a654268973929161aba9e33\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Alt Pop on Apple Music — Canada\" title=\"Open Alt Pop on Apple Music — Canada\">Alt Pop</a></td><td>Canada</td><td>#1</td></tr>\n        <tr class=\"dance-placement\" data-territory=\"ca\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"breaking_dance_ca\" href=\"https://music.apple.com/ca/playlist/breaking-dance/pl.77a913605bba4a968c5cb2b93d87b2ca\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Breaking Dance on Apple Music — Canada\" title=\"Open Breaking Dance on Apple Music — Canada\">Breaking Dance</a> <span class=\"placement-tag\">Week-two update</span></td><td>Canada</td><td>#3<span class=\"rank-context\">#4 debut → #3 week two</span></td></tr>\n        <tr class=\"dance-placement\" data-territory=\"ca\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"new_in_dance_ca\" href=\"https://music.apple.com/ca/playlist/new-in-dance/pl.9bd9accafe864654aac9f2dcceca5a69\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open New in Dance on Apple Music — Canada\" title=\"Open New in Dance on Apple Music — Canada\">New in Dance</a> <span class=\"placement-tag\">Debut placement</span></td><td>Canada</td><td>#17<span class=\"rank-context\">Debut</span></td></tr>\n        <tr data-territory=\"ca ru\" data-count=\"2\" data-combined=\"true\"><td><span data-combined-playlist><a class=\"playlist-link\" data-playlist=\"new_in_pop_ca\" href=\"https://music.apple.com/ca/playlist/new-in-pop/pl.16ef2c958d6e4b20ac75d783cb787053\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open New in Pop on Apple Music — Canada\" title=\"Open New in Pop on Apple Music — Canada\" data-playlist-storefront=\"ca\">New in Pop</a><span data-combined-separator> / </span><a class=\"playlist-link\" data-playlist=\"pop_pulse_ru\" href=\"https://music.apple.com/ru/playlist/%D0%BF%D1%83%D0%BB%D1%8C%D1%81-%D0%BF%D0%BE%D0%BF-%D0%BC%D1%83%D0%B7%D1%8B%D0%BA%D0%B8/pl.16ef2c958d6e4b20ac75d783cb787053\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Pop Pulse on Apple Music — Russia\" title=\"Open Pop Pulse on Apple Music — Russia\" data-playlist-storefront=\"ru\">Pop Pulse</a></span></td><td><span data-combined-territory>Canada / Russia</span></td><td><span data-combined-rank>#9 / #4</span></td></tr>\n        <tr data-territory=\"ca\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"new_fire_ca\" href=\"https://music.apple.com/ca/playlist/new-fire/pl.f19f6b5be8474fe789e36a6242f6113e\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open New Fire on Apple Music — Canada\" title=\"Open New Fire on Apple Music — Canada\">New Fire</a></td><td>Canada</td><td>#12</td></tr>\n        <tr data-territory=\"ru\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"made_in_canada_ru\" href=\"https://music.apple.com/ru/playlist/%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D0%BD%D0%BE-%D0%B2-%D0%BA%D0%B0%D0%BD%D0%B0%D0%B4%D0%B5/pl.bbbadee633f9408c801785b5b0d56c74\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Made in Canada on Apple Music — Russia\" title=\"Open Made in Canada on Apple Music — Russia\">Made in Canada</a></td><td>Russia</td><td>#7</td></tr>\n        <tr data-territory=\"us\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"made_in_canada_us\" href=\"https://music.apple.com/us/playlist/made-in-canada/pl.bbbadee633f9408c801785b5b0d56c74\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Made in Canada on Apple Music — United States\" title=\"Open Made in Canada on Apple Music — United States\">Made in Canada</a></td><td>United States</td><td>#17</td></tr>\n        <tr data-territory=\"uk\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"made_in_canada_gb\" href=\"https://music.apple.com/gb/playlist/made-in-canada/pl.bbbadee633f9408c801785b5b0d56c74\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Made in Canada on Apple Music — United Kingdom\" title=\"Open Made in Canada on Apple Music — United Kingdom\">Made in Canada</a></td><td>United Kingdom</td><td>#17</td></tr>\n        <tr data-territory=\"au\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"made_in_canada_au\" href=\"https://music.apple.com/au/playlist/made-in-canada/pl.bbbadee633f9408c801785b5b0d56c74\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open Made in Canada on Apple Music — Australia\" title=\"Open Made in Canada on Apple Music — Australia\">Made in Canada</a></td><td>Australia</td><td>#17</td></tr>\n        <tr data-territory=\"ca\" data-count=\"1\"><td><a class=\"playlist-link\" data-playlist=\"new_music_daily_ca\" href=\"https://music.apple.com/ca/playlist/new-music-daily/pl.2b0e6e332fdf4b7a91164da3162127b5\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Open New Music Daily on Apple Music — Canada\" title=\"Open New Music Daily on Apple Music — Canada\">New Music Daily</a></td><td>Canada</td><td>#59</td></tr>\n      </tbody></table><p class=\"table-note\">Breaking Dance and New in Dance reflect the team’s November 9, 2026 update; #3 is the team-reported Breaking Dance position at that update. Other entries retain the original October 19–24 release-week positions. These are editorial playlist positions, not sales or streaming chart rankings.</p>";
 let raf=0;
 const watched=new WeakSet();
 const route=()=>window.ROE_SITE_SHELL?.route?.()||'home';
 const page=()=>{try{return frame.contentDocument}catch(_){return null}};
 const box=el=>{const r=el?.getBoundingClientRect();return r&&r.width>0&&r.height>0?r:null};
 const put=(el,name,value)=>{if(el&&el.style.getPropertyValue(name)!==value)el.style.setProperty(name,value)};
 const queue=()=>{if(!raf)raf=requestAnimationFrame(apply)};
 function placeSocial(bar){
  if(!desktop.matches)return false;
  const doc=page(),r=route(),b=box(bar);
  if(!b)return false;
  if(!['home','music','media','world','contact'].includes(r))return false;
  let left=innerWidth-b.width-24,top=22;
  if(r==='home'){
   const menu=box(doc?.querySelector('.menu-dock'));
   if(!menu)return false;
   left=24;top=menu.top+(menu.height-b.height)/2;
  }
  bar.hidden=!!doc?.querySelector('#roeBookingDialog[open]');
  put(bar,'left',Math.round(left)+'px');put(bar,'top',Math.round(top)+'px');
  bar.dataset.placement='desktop-'+r;
  return true;
 }
 function radioPlacement(r){
  if(!desktop.matches)return null;
  const doc=page();if(!doc)return null;
  if(r==='music'){
   const menu=doc.querySelector('roe-glow-menu');
   const m=box(menu?.shadowRoot?.querySelector('.glow-menu'))||box(menu);
   const s=box(document.getElementById('roe-site-socials'));
   if(!m||!s)return null;
   const width=205;
   return {left:m.right+(s.left-m.right-width)/2,top:m.top+(m.height-width*381/1436)/2,width};
  }
  if(r==='contact'){
   const logo=box(doc.querySelector('.topbar-brand .logo-script'));
   if(!logo)return null;
   const width=231;
   return {left:logo.right+18,top:logo.top+(logo.height-width*381/1436)/2,width};
  }
  return null;
 }
 const CSS=`
 #roe-contact-editorial{display:none}
 @media(min-width:761px){
  body[data-roe-mobile-page="media"] #roe-media-presave-open,
  body[data-roe-mobile-page="world"] #presave-open{display:none!important}
  body[data-roe-mobile-page="media"] #roe-page-sign,
  body[data-roe-mobile-page="world"] #roe-page-sign{
   position:fixed!important;left:var(--roe-desktop-sign-left,24px)!important;right:auto!important;
   top:var(--roe-desktop-sign-top,16px)!important;bottom:auto!important;transform:none!important;
   width:max-content!important;max-width:none!important;z-index:10002!important;
  }
  body[data-roe-mobile-page="media"] #roe-page-sign .rps-board,
  body[data-roe-mobile-page="world"] #roe-page-sign .rps-board{width:max-content;max-width:none}
  body[data-roe-mobile-page="media"] #roe-page-sign .rps-tile{flex:0 0 clamp(14px,1.4vw,20px)!important;width:clamp(14px,1.4vw,20px)!important;min-width:clamp(14px,1.4vw,20px)!important;height:34px!important}
  body[data-roe-mobile-page="media"] #roe-page-sign .rps-glyph{font-size:16px!important}
  body[data-roe-mobile-page="contact"],body[data-roe-mobile-page="contact"] .roe-app{background:#000!important;background-image:none!important}
  body[data-roe-mobile-page="contact"] .ambient,body[data-roe-mobile-page="contact"] .grain,
  body[data-roe-mobile-page="contact"] .roe-app::before,body[data-roe-mobile-page="contact"] .roe-app::after{display:none!important}
  body[data-roe-mobile-page="contact"] .topbar{background:#000!important;border-bottom-color:#ffffff15!important;}
  body[data-roe-mobile-page="contact"] .topbar #roe-front-menu-dock{
   position:fixed!important;left:var(--roe-desktop-contact-menu-left,460px)!important;right:161px!important;
   top:16px!important;width:calc(100vw - var(--roe-desktop-contact-menu-left,460px) - 161px)!important;max-width:none!important;margin:0!important;transform:none!important;justify-self:start!important;
  }
  body[data-roe-mobile-page="contact"] #roe-page-sign{top:99px!important;right:24px!important;left:auto!important}
  body[data-roe-mobile-page="contact"] .roe-app{height:auto!important;min-height:100svh!important}
  body[data-roe-mobile-page="contact"] .hero-shell{
   position:relative!important;left:auto!important;top:auto!important;bottom:auto!important;
   display:grid!important;grid-template-columns:minmax(280px,.85fr) minmax(0,1.2fr)!important;
   align-items:start;gap:28px!important;width:calc(100% - 48px)!important;max-width:1320px!important;
   margin:0 auto!important;padding:160px 0 32px!important;
  }
  body[data-roe-mobile-page="contact"] .contact-card{grid-column:1;grid-row:1;background:#080808!important;backdrop-filter:none!important}
  body[data-roe-mobile-page="contact"] .hero-logo-pack{grid-column:1;grid-row:2}
  #roe-contact-editorial{display:block;grid-column:2;grid-row:1/span 2;min-width:0;pointer-events:auto;color:#f3f1ed}
  #roe-contact-editorial .roe-release-feature{display:grid;grid-template-columns:minmax(170px,1fr) minmax(0,1fr);gap:24px;align-items:center}
  #roe-contact-editorial .roe-contact-cover{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;border:1px solid #ffffff25}
  #roe-contact-editorial .roe-release-kicker{margin:0 0 13px;font:700 9px/1.5 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#b7b2ae}
  #roe-contact-editorial h2{margin:0;font:800 clamp(25px,2.7vw,42px)/.98 Arial,sans-serif;letter-spacing:-.045em}
  #roe-contact-editorial .roe-release-meta{font:12px/1.6 Arial,sans-serif;color:#bab6b3;margin:15px 0}
  #roe-contact-editorial .roe-listen{display:inline-flex;align-items:center;gap:16px;min-height:40px;padding:0 15px;border:1px solid #ffffff45;color:#fff;text-decoration:none;font:700 9px Arial,sans-serif;letter-spacing:.08em}
  #roe-contact-editorial h3{margin:30px 0 8px;font:700 18px/1.2 Arial,sans-serif;letter-spacing:-.02em}
  #roe-contact-editorial .roe-editorial-intro{color:#aaa;font:11px/1.6 Arial,sans-serif;margin:0 0 16px}
  #roe-contact-editorial table{width:100%;border-collapse:collapse;font:12px/1.4 Arial,sans-serif;color:#eee;table-layout:fixed}
  #roe-contact-editorial th{padding:10px 6px;text-align:left;color:#999;font-size:8px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ffffff40}
  #roe-contact-editorial td{padding:11px 6px;border-bottom:1px solid #ffffff22;vertical-align:top;overflow-wrap:anywhere}
  #roe-contact-editorial th:nth-child(1){width:46%}#roe-contact-editorial th:nth-child(2){width:28%}
  #roe-contact-editorial th:last-child,#roe-contact-editorial td:last-child{text-align:right}
  #roe-contact-editorial td:last-child{font-weight:700;color:#ff4b4f}
  #roe-contact-editorial a{color:inherit;text-underline-offset:3px}#roe-contact-editorial a:hover{color:#ff4b4f}
  #roe-contact-editorial td small,#roe-contact-editorial td .placement-tag,#roe-contact-editorial td .rank-context{display:block;margin-top:3px;font:9px/1.4 Arial,sans-serif;color:#aaa}
  #roe-contact-editorial .table-note{font:10px/1.65 Arial,sans-serif;color:#96918e;margin:16px 0 0}
 }
 @media(min-width:761px) and (max-width:1100px){
  body[data-roe-mobile-page="contact"] .topbar #roe-front-menu-dock{left:24px!important;right:24px!important;top:86px!important;width:calc(100vw - 48px)!important}
  body[data-roe-mobile-page="contact"] #roe-page-sign{top:151px!important}
  body[data-roe-mobile-page="contact"] .hero-shell{padding-top:213px!important;gap:20px!important}
  #roe-contact-editorial .roe-release-feature{gap:14px;grid-template-columns:minmax(140px,1fr) minmax(0,1fr)}
  #roe-contact-editorial table{font-size:10px}
 }
 `;
 function menuStyle(doc,r){
  const menu=doc.querySelector('roe-glow-menu');if(!menu?.shadowRoot)return;
  if(!menu.shadowRoot.querySelector('#roe-desktop-menu-style')){
   const style=doc.createElement('style');style.id='roe-desktop-menu-style';
   style.textContent=`@media(min-width:761px){
    :host{min-width:0!important}
    :host([active="music"]),:host([active="media"]){position:fixed!important;left:24px!important;right:auto!important;top:16px!important;bottom:auto!important;transform:none!important;max-width:none!important}
    :host([active="music"]){width:min(872px,calc(100vw - 410px))!important}
    :host([active="media"]){width:min(872px,calc(100vw - 390px))!important}
   }@media(min-width:761px) and (max-width:1100px){.glow-face{padding-inline:4px!important;gap:4px!important}.glow-label{letter-spacing:.04em!important;font-size:8px!important}.glow-icon{width:13px!important}}
   `;
   menu.shadowRoot.append(style);
  }
 }
 function apply(){
  raf=0;const doc=page();if(!doc?.body)return;
  const r=route();
  if(!doc.getElementById('roe-desktop-layout-style')){
   const style=doc.createElement('style');style.id='roe-desktop-layout-style';style.textContent=CSS;doc.head.append(style);
  }
  menuStyle(doc,r);
  if(!watched.has(doc)){
   watched.add(doc);
   new MutationObserver(queue).observe(doc.body,{childList:true,subtree:true});
   doc.fonts?.ready.then(queue);
  }
  if(!desktop.matches)return;
  if(r==='contact'&&!doc.getElementById('roe-contact-editorial')){
   const section=doc.createElement('aside');section.id='roe-contact-editorial';section.setAttribute('aria-label','One More Ferrari release and Apple Music editorial highlights');section.innerHTML=EDITORIAL_HTML;
   doc.querySelector('.hero-shell')?.append(section);
  }
  const bar=document.getElementById('roe-site-socials');if(bar)placeSocial(bar);
  const sign=doc.querySelector('#roe-page-sign');
  if(r==='media'&&sign){
   const m=box(doc.querySelector('roe-glow-menu')?.shadowRoot?.querySelector('.glow-menu'));
   const s=box(bar),b=box(sign);
   if(m&&s&&b){put(sign,'--roe-desktop-sign-left',Math.round(m.right+(s.left-m.right-b.width)/2)+'px');put(sign,'--roe-desktop-sign-top',Math.round(m.top+(m.height-b.height)/2)+'px');}
  }
  if(r==='world'&&sign){
   const logo=box(doc.querySelector('.topbar-brand .logo-script')),b=box(sign);
   if(logo&&b){put(sign,'--roe-desktop-sign-left',Math.round(logo.right+18)+'px');put(sign,'--roe-desktop-sign-top',Math.max(8,Math.round(logo.top+(logo.height-b.height)/2))+'px');}
  }
  if(r==='contact'){
   const logo=box(doc.querySelector('.topbar-brand .logo-script'));
   if(logo)put(doc.documentElement,'--roe-desktop-contact-menu-left',Math.round(logo.right+231+54)+'px');
  }
  window.dispatchEvent(new Event('roe:desktop-layout'));
 }
 window.ROE_DESKTOP_LAYOUT={placeSocial,radioPlacement};
 frame.addEventListener('load',queue);window.addEventListener('roe:route-change',queue);
 window.addEventListener('resize',queue,{passive:true});desktop.addEventListener('change',queue);
 new MutationObserver(queue).observe(document.body,{childList:true});
 queue();
})();
