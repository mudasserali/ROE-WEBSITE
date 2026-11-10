
/* ROSE OF ENGLAND RADIO — 33.3 FM
   Portable floating player. Embed on any ROE page with:
   <script src="roe-radio-33-3.js" defer data-stream="" data-station="ROSE OF ENGLAND RADIO"><\/script>
   Default source: locally hosted ROE tracks, shuffled automatically. SoundCloud is optional.
   To provide a public live stream to all visitors, set data-stream to a real HTTPS MP3/AAC or browser-compatible stream URL.
*/
(()=>{
 'use strict';
 // Structural ownership: the ROE shell owns audio, including when embedded in a preview.
 // Old cached child pages and retired standalone players fail closed.
 const __radioScript=document.currentScript;
 if(window.name==='roePageFrame'||window.name==='roeBookingFrame')return;
 if(__radioScript?.dataset.shell!=='true'||!window.__ROE_SITE_SHELL__||!document.getElementById('roePageFrame'))return;
 if(window.__ROE_ACTIVE_AUDIO_ENGINE__)return;
 window.__ROE_ACTIVE_AUDIO_ENGINE__=true;
 if(document.getElementById('roeRadioHost'))return;
 // A top-level source page redirects into the shell; never start a transient radio while redirecting.
 if(window===window.top&&document.getElementById('roe-site-shell-entry')&&!new URLSearchParams(location.search).has('standalone'))return;
 // In the persistent ROE shell the parent owns one audio engine and one receiver.
 // Keep embedded section pages visually untouched and prevent duplicate audio.
 if(window.parent!==window){try{if(window.frameElement?.id==='roePageFrame'||window.parent.__ROE_SITE_SHELL__||window.parent.__ROE_SINGLE_RADIO_OWNER__)return;}catch(_){}}
 const current=document.currentScript;
 const configuredStream=(current?.dataset.stream||'').trim();
 const configuredStation=(current?.dataset.station||'ROSE OF ENGLAND RADIO').trim().slice(0,80);
 const remixUrl='https://soundcloud.com/nikehousemafia/sets/12-essential-roe-remixes';
 // These are broadcaster-published public listening endpoints. Audio streams are linked, never rebroadcast or proxied.
 const STATIONS=[
  {id:'nts1',flag:'🇬🇧',name:'NTS 1',city:'LONDON / GLOBAL',genre:'UNDERGROUND • ECLECTIC',src:'https://stream-relay-geo.ntslive.net/stream?client=direct',site:'https://www.nts.live/'},
  {id:'nts2',flag:'🇬🇧',name:'NTS 2',city:'LONDON / GLOBAL',genre:'EXPERIMENTAL • FUTURE',src:'https://stream-relay-geo.ntslive.net/stream2?client=direct',site:'https://www.nts.live/'},
  {id:'worldwide',flag:'🌍',name:'WORLDWIDE FM',city:'LONDON / WORLD',genre:'GLOBAL CULTURE • DANCE',src:'https://worldwide-fm.radiocult.fm/stream',site:'https://www.worldwidefm.net/'},
  {id:'electro',flag:'🇫🇷',name:'FIP ELECTRO',city:'PARIS / FRANCE',genre:'LEFTFIELD • ELECTRONIC',src:'https://icecast.radiofrance.fr/fipelectro-midfi.mp3?id=openapi',site:'https://www.radiofrance.fr/fip'},
  {id:'groove',flag:'🇫🇷',name:'FIP GROOVE',city:'PARIS / FRANCE',genre:'SOUL • FUNK • DISCO',src:'https://icecast.radiofrance.fr/fipgroove-midfi.mp3?id=openapi',site:'https://www.radiofrance.fr/fip'},
  {id:'monde',flag:'🇫🇷',name:'FIP MONDE',city:'PARIS / WORLD',genre:'GLOBAL • AFRO • JAZZ',src:'https://icecast.radiofrance.fr/fipworld-midfi.mp3?id=openapi',site:'https://www.radiofrance.fr/fip'},
  {id:'kexp',flag:'🇺🇸',name:'KEXP 90.3',city:'SEATTLE / USA',genre:'INDEPENDENT • ALTERNATIVE',src:'https://kexp.streamguys1.com/kexp160.aac',site:'https://www.kexp.org/'},
  {id:'blender',flag:'🇺🇸',name:'SOMAFM BEAT BLENDER',city:'SAN FRANCISCO / USA',genre:'DEEP HOUSE • DOWNTEMPO',src:'https://ice5.somafm.com/beatblender-128-mp3',site:'https://somafm.com/beatblender/'},
  {id:'salad',flag:'🇺🇸',name:'SOMAFM GROOVE SALAD',city:'SAN FRANCISCO / USA',genre:'CHILL • ELECTRONIC',src:'https://ice5.somafm.com/groovesalad-128-mp3',site:'https://somafm.com/groovesalad/'},
  {id:'paradise',flag:'🇺🇸',name:'RADIO PARADISE',city:'USA / WORLD',genre:'ECLECTIC • ALT • WORLD',src:'https://stream.radioparadise.com/mp3-192',site:'https://radioparadise.com/'},
 ];
 const BUILTIN_ROE_TRACKS=[{"id":"omf-remix-intro-team-zissou","title":"OMF REMIX INTRO (UNRELEASED TEAM ZISSOU) +","artist":"ROSE OF ENGLAND","src":"assets/radio/omf-remix-intro-team-zissou-20261109.mp3","durationSec":104.0},{"id":"beep","title":"Beep (ROSE OF ENGLAND REMIX)","artist":"Qiraz","src":"assets/radio/tracks/qiraz-beep-roe-remix-premiere-20261016.mp3","durationSec":126.666667},{"id":"ride","title":"Ride (ft. Rose of England)","artist":"DATA-X","src":"assets/radio/tracks/01-ride.mp3","durationSec":191.29},{"id":"ruger","title":"Ruger (ft. Rose of England) [NIKEHOUSEMAFIA Remix]","artist":"DATA-X","src":"assets/radio/tracks/02-ruger.mp3","durationSec":182.0},{"id":"ez","title":"EZ (ft. Rose of England)","artist":"DATA-X","src":"assets/radio/tracks/03-ez.mp3","durationSec":224.68},{"id":"dvp","title":"DVP (Rose of England Remix)","artist":"BAKA & SMILEY","src":"assets/radio/tracks/04-dvp.mp3","durationSec":122.83},{"id":"bramalea","title":"Bramalea (prod. DATA-X)","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/05-bramalea.mp3","durationSec":189.05},{"id":"mala","title":"MALA","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/07-mala.mp3","durationSec":129.8},{"id":"soft-spot","title":"Soft Spot (DATA-X Remix)","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/08-soft-spot.mp3","durationSec":289.96},{"id":"go-dumb-and-dumber","title":"GO DUMB & DUMBER","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/09-go-dumb-and-dumber.mp3","durationSec":220.84},{"id":"bey-niqab","title":"Dil Hai Ke Manta Nahi","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/11-bey-niqab.m4a","durationSec":216.669},{"id":"kiss-me","title":"KISS ME","artist":"DATA-X ft. ROSE OF ENGLAND","src":"assets/radio/tracks/12-kiss-me.m4a","durationSec":164.04},{"id":"endless-transmission-3047","title":"Endless Transmission 3047","artist":"ROSE OF ENGLAND ft. NIKEHOUSEMAFIA & DATA-X","src":"assets/radio/tracks/13-endless-transmission-3047.m4a","durationSec":195.023},{"id":"truth","title":"SONY","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/15-truth.m4a","durationSec":184.12},{"id":"soft-spot-uk-garage-remix","title":"Soft Spot — DATA-X Remix","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/16-soft-spot-uk-garage-remix-data-x.m4a","durationSec":193.576},{"id":"piano-girl-nikehousemafia-remix","title":"Piano Girl — NIKEHOUSEMAFIA Remix","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/17-piano-girl-nikehousemafia-remix.m4a","durationSec":154.597},{"id":"blood-moon","title":"Blood Moon","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/18-blood-moon.m4a","durationSec":153.761},{"id":"vunerablex","title":"VUNERABLE","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/19-vunerablex.m4a","durationSec":148.064},{"id":"new-dumber-333","title":"Go Dumb & Dumber","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/20-new-dumber-333.m4a","durationSec":220.8},{"id":"black-madonna-x4","title":"Black Madonna","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/21-black-madonna-x4.m4a","durationSec":186.666},{"id":"caravana-2026","title":"Caravana","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/22-caravana-2026.m4a","durationSec":187.96},{"id":"doesn-t-matter-eu-monster-mix","title":"Doesn't Matter [EU MONSTER MIX]","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/24-doesnt-matter-eu-monster-mix.m4a","durationSec":217.126},{"id":"fuego","title":"Fuego","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/25-fuego.m4a","durationSec":177.96},{"id":"gori","title":"Gori","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/28-gori.m4a","durationSec":145.92},{"id":"just-too-high","title":"High High High","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/29-just-too-high.m4a","durationSec":151.56},{"id":"baddie-with-my-thoughts","title":"Baddie With My Thoughts","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/30-baddie-with-my-thoughts.m4a","durationSec":180.93},{"id":"paper-umbrella","title":"YOU OWE ME","artist":"ROSE OF ENGLAND feat. DATA-X","src":"assets/radio/tracks/31-paper-umbrella.m4a","durationSec":131.4},{"id":"777-339-supercharger","title":"777 333","artist":"ROSE OF ENGLAND & DATA-X","src":"assets/radio/tracks/32-777-339-supercharger.m4a","durationSec":194.64},{"id":"teri-gali","title":"Teri Gali","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/33-teri-gali.m4a","durationSec":167.04},{"id":"jupiter-jazz","title":"Jazz in Me","artist":"ROSE OF ENGLAND","src":"assets/radio/tracks/35-jupiter-jazz.m4a","durationSec":93.48},{"id":"apple-ft-rose-of-england-and-nikehousemafia","title":"APPLE (ft. Rose of England & NIKEHOUSEMAFIA)","artist":"DATA-X","src":"assets/radio/tracks/36-apple-ft-rose-of-england-nikehousemafia.mp3","durationSec":229.277}];
 const key='roe.radio.33.3.v1';
 const read=()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(_){return {}}};
 const stored=read();
 const companion=current?.dataset.companion==='true';
 const shellMode=current?.dataset.shell==='true';
 const playerCanDrive=true; // no ROE radio control launches a second browser window
 const scriptUrl=current?.src?new URL(current.src):new URL('assets/js/roe-radio-33-3.js',document.baseURI);
 const playerUrl=new URL('../../roe-radio-player.html',scriptUrl);
 const playerName='ROE_RADIO_CONTINUOUS_33_3';
 // The separate named player owns audio across page navigation; ordinary site pages yield to it.
 const companionHeartbeatKey='roe.radio.33.3.companion-heartbeat';
 const companionIsActive=()=>{if(shellMode)return false;try{return Date.now()-Number(localStorage.getItem(companionHeartbeatKey)||0)<5500;}catch(_){return false;}};
 if(companion){
   const markCompanion=()=>{try{localStorage.setItem(companionHeartbeatKey,String(Date.now()));}catch(_){}};
   markCompanion();setInterval(markCompanion,2000);
   addEventListener('pagehide',()=>{try{localStorage.removeItem(companionHeartbeatKey);}catch(_){}});
 }
 // Retained legacy API name, now an entirely IN-PAGE action. No window.open.
 function launchCompanion(selected='mp3s',trackIndex=-1,stationId=''){
   setOpen(true);
   if(selected!==mode)changeMode(selected);
   if(trackIndex>=0)selectTrack(trackIndex,true);
   if(stationId)selectStation(stationId,true);
   return true;
 }

 const host=document.createElement('div');host.id='roeRadioHost';
 host.style.cssText='position:fixed;top:66%;right:clamp(14px,2.6vw,42px);width:min(231px,calc(100vw - 28px));z-index:2147482000;pointer-events:none;isolation:isolate;';
 let isHome=matchMedia('(max-width:760px)').matches|| (shellMode?(window.ROE_SITE_SHELL?.route()==='home'):/\/(?:index\.html)?$/i.test(location.pathname));
  const launcherArt=(isHome&&!companion)?'assets/roe-radio-home-square.png':'assets/roe-radio-panel.png';
  if(isHome&&!companion) host.classList.add('roe-radio-square-home');
 // HOME: anchor the radio directly LEFT of the top-right official logo group.
 // Other pages retain their existing placements and the player stays independent.
 // One positioning registry for the ORIGINAL radio artwork. The single audio
 // element remains mounted in the shell; this only moves its launcher host.
 const RADIO_ASPECT=381/1436;
 let previousPlacementRoute='',mediaDockPlacement=null;
 const rectOK=r=>r&&[r.left,r.top,r.right,r.bottom,r.width,r.height].every(Number.isFinite)&&r.width>2&&r.height>2;
 const constrain=(v,lo,hi)=>Math.min(Math.max(lo,v),Math.max(lo,hi));
 // Read the actual same-origin iframe menu docks without changing any page files.
 // This avoids relying on stale/late generic radio coordinates while sections load.
 const pageBox=selector=>{
   try{
     const doc=document.getElementById('roePageFrame')?.contentDocument;
     const el=doc?.querySelector(selector);
     const r=el?.getBoundingClientRect();
     return rectOK(r)?r:null;
   }catch(_){return null;}
 };
 const placeLauncher=(left,top,width)=>{
   const height=width*(isHome?1:RADIO_ASPECT);
   Object.assign(host.style,{
     position:'fixed',width:Math.round(width)+'px',
     left:Math.round(constrain(left,8,innerWidth-width-8))+'px',
     top:Math.round(constrain(top,8,innerHeight-height-8))+'px',
     right:'auto',bottom:'auto'
   });
 };
 const positionRadio=()=>{
   const mobile=matchMedia('(max-width:760px)').matches;
   if(shellMode){
     const route=window.ROE_SITE_SHELL?.route()||'home';
     const metrics=window.ROE_SITE_SHELL?.metrics?.()||{};
     if(previousPlacementRoute!==route){mediaDockPlacement=null;previousPlacementRoute=route;}
     isHome=mobile||route==='home';
     host.classList.toggle('roe-radio-square-home',isHome);
     host.classList.toggle('roe-radio-mobile-compact',mobile);
     const img=host.shadowRoot?.querySelector('#dock .radio-panel-art');
     const art=isHome?'assets/roe-radio-home-square.png':'assets/roe-radio-panel.png';
     if(img&&img.getAttribute('src')!==art)img.setAttribute('src',art);
     if(mobile){
       // The same compact, fully functional receiver on every mobile page.
       // Keep one audio engine; only its launcher artwork and position change.
       const menu=pageBox('.roe-mobile-nav-carrier')||metrics.mobileNav;
       const edge=Math.min(20,innerWidth*.05),width=64;
       const right=rectOK(menu)?menu.right:innerWidth-edge;
       const menuTop=rectOK(menu)?menu.top:innerHeight-78;
       placeLauncher(right-width-8,menuTop-width-34,width);
       return;
     }
     const desktopPlacement=window.ROE_DESKTOP_LAYOUT?.radioPlacement(route);
     if(desktopPlacement){placeLauncher(desktopPlacement.left,desktopPlacement.top,desktopPlacement.width);return;}
     const outer=mobile?12:Math.max(18,Math.min(40,innerWidth*.026));
     const width=isHome?(innerWidth<=400?68:mobile?78:104):route==='media'?
       (mobile?Math.min(180,innerWidth*.38):Math.min(310,Math.max(245,innerWidth*.195))):
       (mobile?Math.min(196,innerWidth*.56):231);
     const gap=mobile?12:20;

     if(route==='home'){
       // HOME: the compact square sits at the RIGHT side of the actual
       // bottom navigation, with its vertical centre aligned to the menu.
       // When the menu spans a phone/tablet viewport, stack just ABOVE its
       // right edge rather than covering a menu item or clipping the dial.
       const menu=pageBox('.menu-dock');
       if(rectOK(menu)){
         const beside=menu.right+gap+width <= innerWidth-8;
         const x=beside?menu.right+gap:menu.right-width;
         const y=beside?menu.top+(menu.height-width)/2:menu.top-width-gap;
         placeLauncher(x,y,width);
       }else{
         const menuW=Math.min(760,innerWidth-32);
         const menuRight=(innerWidth+menuW)/2;
         const beside=menuRight+gap+width<=innerWidth-8;
         placeLauncher(beside?menuRight+gap:innerWidth-outer-width,
           beside?innerHeight-56-29-width/2:innerHeight-(mobile?138:164),width);
       }
       return;
     }
     if(route==='music'){
       const clock=metrics.musicClock;
       if(rectOK(clock)){
         const edge=mobile?12:Math.max(16,Math.min(36,innerWidth*.022));
         const spaceRight=innerWidth-clock.right-edge;
         if(innerWidth>760&&spaceRight>=145){
           const w=Math.min(width,spaceRight-24);
           const x=clock.right+(spaceRight-w)/2;
           placeLauncher(x,clock.top+(clock.height-w*RADIO_ASPECT)/2,w);
         }else{
           // On narrow devices the receiver is a second row below all six clocks.
           const w=mobile?Math.min(188,Math.max(128,innerWidth*.43)):Math.min(width,185);
           const y=clock.bottom+12;
           placeLauncher(clock.right-w,y,w);
         }
       }else{
         // Page dimensions have not arrived yet. Position the radio where its
         // final bottom row belongs, never in the old generic mid-right position.
         placeLauncher(innerWidth-outer-(mobile?156:205),innerHeight-(mobile?78:100),mobile?156:205);
       }
       return;
     }
     if(route==='media'){
       const footer=metrics.mediaFooter;
       if(!mediaDockPlacement&&rectOK(footer)){
         // Record the WHITE CINEMA CAPTION position once per route/viewport.
         // Subsequent scroll reports must NOT move the fixed radio.
         const inset=mobile?12:Math.max(18,Math.min(30,innerWidth*.018));
         const stableY=footer.top+(Number(metrics.mediaScrollY)||0);
         mediaDockPlacement={x:footer.right-inset-width,y:stableY+(footer.height-width*RADIO_ASPECT)/2,width};
       }
       if(mediaDockPlacement)placeLauncher(mediaDockPlacement.x,mediaDockPlacement.y,mediaDockPlacement.width);
       else placeLauncher(innerWidth-outer-width,innerHeight-width*RADIO_ASPECT-(mobile?34:45),width);
       return;
     }
     if(route==='world'){
       // WORLD: align under the right-hand London PNG, in the open strip
       // BETWEEN the poster and bottom-right menu (both fixed in its iframe).
       const poster=rectOK(metrics.worldBanner)?metrics.worldBanner:
         pageBox('#roe-world-london-sign');
       const menu=pageBox('#roe-front-menu-dock');
       if(rectOK(poster)){
         const posterGap=mobile?12:19,menuGap=mobile?12:18;
         const available=rectOK(menu)?menu.top-poster.bottom:innerHeight-poster.bottom-(mobile?125:155);
         // Preserve the PNG-strip proportions; scale DOWN on short windows.
         const w=available>posterGap+menuGap+RADIO_ASPECT*115?
           Math.min(width,poster.width,(available-posterGap-menuGap)/RADIO_ASPECT):Math.min(width,poster.width,mobile?148:178);
         const h=w*RADIO_ASPECT;
         let y=rectOK(menu)?poster.bottom+(available-h)/2:poster.bottom+posterGap;
         if(rectOK(menu))y=Math.min(y,menu.top-menuGap-h);
         placeLauncher(poster.left+(poster.width-w)/2,y,w);
       }else{
         // Placeholder near the right poster until its actual dimensions arrive.
         placeLauncher(innerWidth-outer-width,Math.min(innerHeight*.67,innerHeight-160),width);
       }
       return;
     }
     if(route==='contact'){
       // Follow the actual flip board, with a small gap and matched centre line.
       const sign=pageBox('#roe-page-sign .rps-board')||metrics.contactFlip;
       if(rectOK(sign)){
         const gap=mobile?10:16;
         const w=Math.min(width,Math.max(24,sign.left-gap-12));
         placeLauncher(sign.left-gap-w,sign.top+(sign.height-w*RADIO_ASPECT)/2,w);
       }else{
         // Wait for the flip board's layout rather than flash over the form.
         placeLauncher(innerWidth-outer-width,120,width);
       }
       return;
     }
     // Toronto entrance and other shell views: approved unobtrusive lower right.
     placeLauncher(innerWidth-outer-width,innerHeight-width*RADIO_ASPECT-(mobile?115:innerHeight*.19),width);
     return;
   }
   host.style.position='fixed';
   host.style.width=mobile?'min(196px,56vw)':'min(231px,calc(100vw - 28px))';
   host.style.top='auto';
   host.style.bottom=mobile?'calc(115px + env(safe-area-inset-bottom, 0px))':'26%';
   host.style.left='auto';
   host.style.right=mobile?'12px':'clamp(14px,2.6vw,42px)';
   if(companion){
     host.style.cssText='position:relative;top:auto;bottom:auto;left:auto;right:auto;width:100%;max-width:520px;margin:0 auto;z-index:1;pointer-events:auto;isolation:isolate;';
     return;
   }
    if(isHome){
      // HOME ONLY: compact square receiver anchored to the live HOME split-flap sign.
      // The popup/player remains the original universal radio implementation.
      const board=document.querySelector('#roe-page-sign .rps-board');
      const sign=board?.getBoundingClientRect();
      const width=innerWidth<=400?68:innerWidth<=700?78:104;
      const gap=innerWidth<=700?12:20;
      if(sign&&sign.width){
        host.style.width=width+'px';
        host.style.left=Math.round(Math.max(8,sign.left-gap-width))+'px';
        host.style.top=Math.round(Math.max(8,sign.top+(sign.height-width)/2))+'px';
        host.style.right='auto';host.style.bottom='auto';
      }else{
        // Do not flash the previous wide radio while the sign is being inserted.
        host.style.width=width+'px';
        host.style.left='auto';host.style.right='190px';
        host.style.top='98px';host.style.bottom='auto';
      }
    }
 };
 positionRadio();
 window.addEventListener('resize',()=>{mediaDockPlacement=null;positionRadio();},{passive:true});
 if(shellMode){window.addEventListener('roe:route-change',positionRadio);window.addEventListener('roe:desktop-layout',positionRadio);}
  if(isHome&&!companion&&!shellMode){
    requestAnimationFrame(positionRadio);
    window.addEventListener('load',positionRadio,{once:true});
    const board=document.querySelector('#roe-page-sign .rps-board');
    if(board&&'ResizeObserver' in window){
      const observer=new ResizeObserver(positionRadio);
      observer.observe(board);
    }
    // Handle sites where the portable sign mounts after the radio script.
    if(!board){
      const observer=new MutationObserver(()=>{
        const target=document.querySelector('#roe-page-sign .rps-board');
        if(target){observer.disconnect();positionRadio();
          if('ResizeObserver' in window)new ResizeObserver(positionRadio).observe(target);
        }
      });
      observer.observe(document.body,{childList:true,subtree:true});
    }
  }
 document.body.append(host);
 const root=host.attachShadow({mode:'open'});
 root.innerHTML=`
 <style>
 :host{font-family:Arial,Helvetica,sans-serif;color:#f3eadf;font-synthesis:none;font-weight:400;-webkit-font-smoothing:antialiased}
 *,*::before,*::after{box-sizing:border-box}
 button,input{font:inherit}button{color:inherit;cursor:pointer}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #ffd59c;outline-offset:3px}
 [hidden]{display:none!important}
 .rack{width:min(392px,calc(100vw - 24px));display:flex;flex-direction:column;gap:12px;align-items:flex-end;pointer-events:none}
 .rack>*{pointer-events:auto}
 .dock{width:min(312px,calc(100vw - 24px));min-height:84px;display:grid;grid-template-columns:88px 1fr 34px;align-items:center;gap:12px;padding:10px 12px;text-align:left;border:2px solid #6c5439;border-radius:18px;background:linear-gradient(180deg,#705032 0%,#47311f 13%,#1a1715 14%,#1b1817 100%);box-shadow:0 16px 40px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,236,200,.18), inset 0 -10px 18px rgba(0,0,0,.34);transition:transform .2s ease,border-color .2s ease}
 .dock:hover{transform:translateY(-2px);border-color:#b18a60}
 .dock-freq{height:60px;min-width:88px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;border-radius:12px;border:1px solid #83684b;background:linear-gradient(180deg,#362615,#151311);box-shadow:inset 0 0 0 2px rgba(252,206,138,.08), inset 0 0 24px rgba(255,165,77,.08)}
 .dock-freq::before{content:'';position:absolute;inset:8px;border-radius:8px;background:linear-gradient(180deg,rgba(255,192,110,.14),rgba(0,0,0,.18));box-shadow:inset 0 0 20px rgba(255,177,76,.28)}
 .dock-freq b,.dock-freq sup{position:relative;z-index:1;text-shadow:0 0 14px rgba(255,165,58,.5)}
 .dock-freq b{font-size:28px;font-weight:700;line-height:.95;letter-spacing:-.08em;color:#ffc96c;font-variant-numeric:tabular-nums}
 .dock-freq sup{margin-top:4px;font-size:9px;font-weight:700;letter-spacing:.2em;color:#f6b15c}
 .dock-lines{min-width:0}.dock-lines strong{display:block;font-size:11px;font-weight:800;letter-spacing:.16em;color:#f5e7d1;white-space:nowrap}
 .dock-lines small{display:flex;align-items:center;gap:6px;margin-top:7px;font-size:9px;letter-spacing:.14em;color:#e4c89a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .dot{width:7px;height:7px;background:#ffb947;border-radius:50%;display:inline-block;box-shadow:0 0 14px #ff9f30}
 .dock-arrow{width:34px;height:34px;display:grid;place-items:center;border:1px solid #8c6a45;border-radius:50%;background:linear-gradient(180deg,#584229,#241c16);font-size:18px;color:#f5cf99;transition:transform .25s ease}
 .rack.open .dock-arrow{transform:rotate(180deg)}
 .console{width:100%;padding:18px;border:2px solid #6c5334;border-radius:28px;background:linear-gradient(180deg,#725334 0%,#4c3522 10%,#181514 12%,#111011 100%);box-shadow:0 24px 70px rgba(0,0,0,.72), inset 0 1px 0 rgba(255,236,196,.18), inset 0 -18px 28px rgba(0,0,0,.38);animation:arrive .24s cubic-bezier(.2,1,.3,1) both;max-height:min(80dvh,700px);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#8d6d47 transparent}
 @keyframes arrive{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
 .console-inner{padding:14px;border-radius:22px;background:linear-gradient(180deg,#2e241c 0%,#141314 12%,#0f1011 100%);box-shadow:inset 0 0 0 1px rgba(255,239,208,.06)}
 .upper{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
 .brand{display:flex;align-items:center;gap:10px;min-width:0}
 .brand-mark{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(180deg,#f6d2a2,#b97f4b);color:#28160f;font-size:12px;font-weight:900;letter-spacing:-.1em;box-shadow:inset 0 1px rgba(255,255,255,.65),0 4px 12px rgba(0,0,0,.28)}
 .brand-lines strong{display:block;font-size:11px;font-weight:800;letter-spacing:.16em;color:#f7eddc}
 .brand-lines span{display:block;font-size:8px;color:#c4b39a;letter-spacing:.18em;margin-top:4px}
 .close{width:32px;height:32px;border-radius:50%;border:1px solid #7d5d3b;background:linear-gradient(180deg,#4f3c28,#251d18);font-size:17px;line-height:1;color:#efcd95;box-shadow:inset 0 1px rgba(255,255,255,.12)}
 .face{display:grid;grid-template-columns:minmax(0,1fr) 118px;gap:12px;align-items:stretch}
 .display-panel{min-width:0;padding:14px;border-radius:18px;border:1px solid #6d553b;background:linear-gradient(180deg,#231c17,#101012);box-shadow:inset 0 0 0 1px rgba(255,255,255,.03), inset 0 0 18px rgba(255,158,67,.06)}
 .glass-window{padding:14px 14px 12px;border-radius:14px;border:1px solid rgba(209,152,80,.35);background:linear-gradient(180deg,rgba(104,69,27,.32),rgba(0,0,0,.22) 24%,rgba(16,16,17,.82));box-shadow:inset 0 0 18px rgba(255,173,73,.22), inset 0 1px rgba(255,236,184,.14)}
 .display-meta{display:flex;align-items:center;justify-content:space-between;gap:10px}
 .display-meta small{font-size:8px;letter-spacing:.18em;color:#f1c67d}
 .display-lamp{display:flex;align-items:center;gap:6px;font-size:8px;letter-spacing:.18em;color:#f3d6a6}
 .display-lamp::before{content:'';width:7px;height:7px;border-radius:50%;background:#ffbc4d;box-shadow:0 0 14px rgba(255,181,68,.95)}
 .frequency{display:flex;align-items:flex-end;gap:9px;margin:12px 0 0}
 .numbers{font-size:clamp(74px,19vw,102px);line-height:.8;letter-spacing:-.12em;font-weight:700;font-variant-numeric:tabular-nums;color:#ffd789;text-shadow:0 0 16px rgba(255,177,78,.3),0 0 34px rgba(255,177,78,.2);white-space:nowrap}
 .numbers .decimal{color:#ffb45f}
 .unit{font-size:13px;letter-spacing:.24em;font-weight:700;margin-bottom:7px;color:#f7be69;text-shadow:0 0 12px rgba(255,170,66,.22)}
 .channel{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:13px 0 0}
 .channel span,.channel b{font-size:9px;letter-spacing:.18em}
 .channel span{color:#f1cb8f}
 .channel b{font-weight:600;color:#cdb48e}
 .tuner{height:42px;margin:13px 0 0;position:relative;display:flex;align-items:flex-end;justify-content:space-between;padding:0 8px 8px;border-radius:10px;border:1px solid rgba(255,214,150,.12);background:linear-gradient(180deg,rgba(255,208,110,.06),rgba(0,0,0,.16));overflow:hidden}
 .tuner::before{content:'FM BAND';position:absolute;left:10px;top:6px;font-size:8px;letter-spacing:.18em;color:#a98d66}
 .tuner i{display:block;width:1px;height:10px;background:#8b724d;flex:none}.tuner i:nth-child(5n){height:18px;background:#c8a261}
 .needle{position:absolute;left:34%;top:5px;width:3px;height:31px;border-radius:2px;background:#ffd18b;box-shadow:0 0 10px rgba(255,192,98,.85),0 0 20px rgba(255,135,72,.45)}
 .mode-dials{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px}
 .modes{display:grid;grid-template-columns:1fr 1fr;padding:4px;border:1px solid #6c5438;border-radius:14px;background:linear-gradient(180deg,#171413,#090909);gap:4px;flex:1}
 .mode{padding:10px 6px;border:0;border-radius:10px;background:none;color:#beab8c;font-size:9px;font-weight:700;letter-spacing:.12em}
 .mode[aria-pressed="true"]{background:linear-gradient(180deg,#eac98f,#b98346);color:#22140d;box-shadow:inset 0 1px rgba(255,255,255,.45),0 4px 12px rgba(0,0,0,.28)}
 .knob-stack{display:flex;gap:8px;flex:none}
 .knob{width:34px;height:34px;border-radius:50%;border:1px solid #8f6f47;background:radial-gradient(circle at 35% 35%,#7f6644 0%,#433320 42%,#181413 74%);box-shadow:inset 0 1px rgba(255,255,255,.12),0 3px 10px rgba(0,0,0,.3);position:relative}
 .knob::after{content:'';position:absolute;left:50%;top:6px;transform:translateX(-50%);width:2px;height:9px;border-radius:2px;background:#ffd188;box-shadow:0 0 6px rgba(255,206,132,.45)}
 .speaker-panel{padding:12px;border-radius:18px;border:1px solid #695138;background:linear-gradient(180deg,#241c18,#0f1011);display:flex;flex-direction:column;gap:12px;justify-content:space-between}
 .speaker-title{font-size:8px;letter-spacing:.24em;color:#d1ba95;text-align:center}
 .speaker-grid{flex:1;min-height:182px;border-radius:14px;border:1px solid rgba(255,255,255,.05);background:
 radial-gradient(circle,rgba(255,226,174,.28) 0 1px,transparent 1.4px) 0 0/10px 10px,
 linear-gradient(180deg,#0a0a0a,#161617);box-shadow:inset 0 0 0 1px rgba(255,255,255,.03)}
 .speaker-badge{padding:8px;border-radius:10px;border:1px solid #6d553b;background:linear-gradient(180deg,#111,#181818);text-align:center}
 .speaker-badge b{display:block;font-size:9px;letter-spacing:.22em;color:#f0cc94}.speaker-badge span{display:block;margin-top:5px;font-size:8px;letter-spacing:.12em;color:#baab92}
 .now{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:16px 0 8px;padding:12px 14px;border-radius:15px;border:1px solid #5f4b35;background:linear-gradient(180deg,#171412,#0d0d0e)}
 .now small{display:block;font-size:8px;letter-spacing:.2em;color:#baa987}.now b{display:block;margin-top:6px;font-size:12px;letter-spacing:.03em;line-height:1.35;font-weight:700;color:#f4ead7}
 .waves{height:31px;display:flex;align-items:center;gap:3px}.waves i{width:4px;height:7px;border-radius:7px;background:linear-gradient(#ffd68e,#a96533);opacity:.55}.rack[data-playing="true"] .waves i{animation:pulse .6s ease-in-out infinite alternate;opacity:1}.waves i:nth-child(3n){height:17px;animation-delay:.12s}.waves i:nth-child(4n){height:25px;animation-delay:.27s}.waves i:nth-child(5n){height:13px;animation-delay:.39s}@keyframes pulse{from{transform:scaleY(.33)}to{transform:scaleY(1)}}
 .transport{display:flex;align-items:center;gap:10px;margin-top:14px}
 .primary{min-height:46px;flex:1;padding:0 15px;border:1px solid #8f6d43;border-radius:14px;background:linear-gradient(180deg,#f1cf94,#ba8446);color:#24140d;font-size:10px;font-weight:800;letter-spacing:.15em;box-shadow:inset 0 1px rgba(255,255,255,.5);transition:filter .2s}
 .primary:hover{filter:brightness(1.08)}
 .volume{width:108px;display:flex;gap:6px;align-items:center;padding:0 8px;height:46px;border-radius:14px;border:1px solid #5e4934;background:linear-gradient(180deg,#181515,#0e0f0f)}
 .volume label{font-size:15px;opacity:.75;color:#e8c789}.volume input{width:65px;accent-color:#d49a4b;min-width:0;cursor:pointer}
 .iconbtn{width:44px;min-height:46px;border:1px solid #5d4834;border-radius:14px;background:linear-gradient(180deg,#181515,#0e0f10);font-size:17px;color:#f3ca88}
 .soundcloud{margin-top:14px;border:1px solid #5f4a35;border-radius:14px;overflow:hidden;background:#08080b;box-shadow:inset 0 0 0 1px rgba(255,255,255,.03)}.soundcloud iframe{display:block;width:100%;height:143px;border:0}
 .fine{font-size:9px;line-height:1.55;color:#b8a78b;margin:11px 0 0}.fine a{color:#ffd08f;text-decoration:none}.fine a:hover{text-decoration:underline}
 .live-setup{margin-top:14px;border-top:1px solid rgba(255,222,168,.15);padding-top:12px}.setup-title{width:100%;padding:0;border:0;background:none;text-align:left;color:#efc88b;display:flex;justify-content:space-between;align-items:center;font-size:9px;font-weight:700;letter-spacing:.16em}.setup-form{margin-top:12px;display:grid;gap:10px}.setup-form label{display:grid;gap:6px;color:#cbb799;font-size:9px;letter-spacing:.09em}.setup-form input{width:100%;min-width:0;border:1px solid #5d4935;border-radius:10px;padding:11px;background:#0d0d10;color:white;font-size:11px;letter-spacing:0}.setup-form button{min-height:39px;border:1px solid #8c6942;border-radius:11px;color:#23140d;background:linear-gradient(180deg,#f0cb8e,#bc8447);font-size:10px;font-weight:800;letter-spacing:.1em}.hint{margin-top:11px;font-size:9px;color:#b8a78b;line-height:1.55}.status{font-size:9px;letter-spacing:.08em;line-height:1.5;min-height:1.4em;margin-top:11px;color:#d4be95}
 .metadata{display:flex;justify-content:space-between;gap:8px;margin-top:16px;padding-top:11px;border-top:1px solid rgba(255,219,154,.12);color:#95836b;font-size:8px;letter-spacing:.16em}
 @media(max-width:570px){.rack{width:min(352px,calc(100vw - 24px))}.console{padding:14px;border-radius:22px;max-height:calc(100dvh - 102px)}.console-inner{padding:12px}.face{grid-template-columns:1fr}.speaker-panel{order:3}.speaker-grid{min-height:84px}.numbers{font-size:82px}.dock{width:min(268px,calc(100vw - 24px));grid-template-columns:74px 1fr 30px;padding:8px 10px}.dock-freq{min-width:74px;height:54px}.dock-freq b{font-size:24px}.dock-lines strong{font-size:10px}}
 @media(prefers-reduced-motion:reduce){.waves i,.rack[data-playing="true"] .waves i{animation:none}.dock,.dock-arrow{transition:none}.console{animation:none}}

/* ROE radio panel / user-supplied artwork front end. The entire fascia opens functional radio controls. */
:host{display:block;width:100%;}
.rack{width:100%;gap:0;align-items:flex-end;position:static;}
.rack>*{pointer-events:auto}
.dock,.dock:hover{appearance:none;position:relative;display:block;width:100%;height:auto;min-height:0;overflow:visible;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;text-align:center;line-height:0;filter:drop-shadow(0 9px 20px rgba(0,0,0,.54));transform-origin:center;}
.dock:hover{transform:translateY(-3px);border:0;filter:drop-shadow(0 11px 24px rgba(255,110,21,.19)) drop-shadow(0 9px 20px rgba(0,0,0,.58));}
.dock:active{transform:translateY(-1px) scale(.99)}
.radio-panel-art{display:block;width:100%;height:auto;object-fit:contain;pointer-events:none;user-select:none;-webkit-user-drag:none}
  /* Home square: original rose artwork, compact header launcher. */
  :host(.roe-radio-square-home) .dock{aspect-ratio:1/1;width:100%;overflow:visible;filter:drop-shadow(0 5px 13px rgba(0,0,0,.60));}
  :host(.roe-radio-square-home) .dock:hover{transform:translateY(-2px) scale(1.035);filter:drop-shadow(0 4px 13px rgba(255,159,46,.23)) drop-shadow(0 5px 13px rgba(0,0,0,.60));}
  :host(.roe-radio-square-home) .radio-panel-art{aspect-ratio:1/1;width:100%;height:100%;object-fit:contain;}
  .radio-dock-state{display:none}
  :host(.roe-radio-mobile-compact) .radio-dock-state{display:block;position:absolute;top:calc(100% + 4px);left:0;width:100%;height:14px;line-height:12px;border:1px solid #bd8c4d70;border-radius:4px;background:#09090bea;color:#ffe0a0;font:700 7px/12px Arial,sans-serif;letter-spacing:.08em;white-space:nowrap}
  :host(.roe-radio-mobile-compact) .rack[data-playing="true"] .radio-dock-state{color:#b6ffd2;border-color:#7ae5a570}
  .visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.58);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);pointer-events:auto;z-index:1}
.console{position:fixed;top:50dvh;bottom:auto;right:clamp(12px,2.6vw,42px);width:min(410px,calc(100vw - 24px));max-height:calc(100dvh - 26px);overflow-y:auto;z-index:2;animation:radio-rise .24s cubic-bezier(.2,1,.3,1) both;}
@keyframes radio-rise{from{opacity:0;transform:translateY(calc(-50% + 12px)) scale(.98)}to{opacity:1;transform:translateY(-50%) scale(1)}}
.rack.open .dock{position:relative;z-index:3;}
@media(max-width:700px){.console{right:12px;max-height:calc(100dvh - 24px);width:min(380px,calc(100vw - 24px))}}
@media(max-width:420px){.console{top:50dvh}.speaker-grid{min-height:70px}}
@media(prefers-reduced-motion:reduce){.console{animation:none;transform:translateY(-50%)}}

/* OCT 02 / REFERENCE-IMAGE RADIO: compact launcher + integrated golden receiver */
:host{display:block;width:100%;}
.rack{width:100%;gap:0;align-items:flex-end}
.dock,.dock:hover{width:100%;}
.rack.open>.dock{display:none!important}
.scrim{background:rgba(0,0,0,.67);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.console{
 top:50dvh;right:clamp(12px,2.6vw,42px);width:min(515px,calc(100vw - 24px));
 max-height:calc(100dvh - 24px);overflow-y:auto;overflow-x:hidden;
 padding:13px;border:2px solid #9b7446;border-radius:30px;
 background:linear-gradient(180deg,#89653c 0%,#38281d 5.5%,#161312 10%,#111113 87%,#63482c 100%);
 box-shadow:0 30px 86px rgba(0,0,0,.84),0 0 0 1px rgba(255,218,153,.1),inset 0 1px 0 rgba(255,227,177,.55),inset 0 -2px 0 rgba(255,214,143,.12);
 scrollbar-width:thin;scrollbar-color:#765435 #0c0b0b;
}
.console-inner{padding:16px;border-radius:23px;border:1px solid rgba(210,169,104,.2);background:linear-gradient(180deg,#2e261e 0%,#141313 10%,#0b0c0e 92%,#121213 100%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.68)}
.upper{margin-bottom:15px;padding:1px 3px 0}
.brand-mark{width:38px;height:38px;border-radius:10px;background:linear-gradient(145deg,#ffe0a4,#c28a4c);color:#25140c;font-size:14px}
.brand-lines strong{font-size:13px;letter-spacing:.14em;white-space:nowrap}
.brand-lines span{font-size:9px;letter-spacing:.16em}
.close{width:38px;height:38px;flex:none;border-color:#ad824d;background:radial-gradient(circle at 35% 25%,#765633,#251a13);color:#ffd9a2;font-size:22px}
.face{grid-template-columns:minmax(0,1fr) 132px;gap:12px}
.display-panel{padding:11px;border-radius:18px;border:1px solid #7d5a32;background:linear-gradient(160deg,#221a14,#0c0d0e 67%);box-shadow:inset 0 1px 0 rgba(255,212,135,.15)}
.glass-window{padding:16px 13px 13px;border-radius:14px;min-height:248px;background:linear-gradient(180deg,#624322 0%,#1b1410 18%,#100f0e 50%,#181512 100%);box-shadow:inset 0 0 16px rgba(255,171,61,.17),inset 0 1px rgba(255,229,159,.2)}
.display-meta small{font-size:10px;font-weight:700;line-height:1.15;max-width:65%;color:#fbd58d;letter-spacing:.11em}
.display-lamp{font-weight:700;font-size:9px;letter-spacing:.08em;max-width:60px;line-height:1.2}
.frequency{margin:14px 0 0;gap:5px;justify-content:center}
.numbers{font-size:clamp(91px,8vw,120px);font-weight:800;letter-spacing:-.105em;color:#ffdc93;line-height:.89;text-shadow:0 0 21px rgba(253,158,59,.33)}
.unit{font-size:14px;margin-bottom:5px;letter-spacing:0;color:#ffc16c}
.channel{margin:17px 0 0;gap:6px}.channel span,.channel b{font-size:9px;letter-spacing:.08em;line-height:1.3;max-width:48%}
.tuner{margin-top:16px;height:44px}
.mode-dials{margin-top:11px;gap:8px}
.modes{border-color:#765839;border-radius:12px;padding:3px;gap:3px}
.mode{padding:10px 5px;font-size:9px;letter-spacing:.04em}
.knob-stack{gap:5px}.knob{width:33px;height:33px}
.speaker-panel{padding:11px;border-radius:18px;border-color:#775733;gap:9px;background:linear-gradient(160deg,#2c2017,#0a0c0d)}
.speaker-title{font-size:9px;font-weight:700;line-height:1.2;letter-spacing:.13em}
.speaker-grid{min-height:188px;border:1px solid #3a3028;background:radial-gradient(circle,rgba(238,193,112,.38) 0 .85px,transparent 1.2px) 0 0/9px 9px,linear-gradient(180deg,#070808,#161719)}
.speaker-badge{padding:10px 5px}.speaker-badge b{font-size:10px;letter-spacing:.1em}.speaker-badge span{font-size:9px;line-height:1.2;letter-spacing:.06em}
.now{margin:13px 0 0;padding:13px 14px;min-height:62px;border-color:#7a5835;border-radius:14px;background:linear-gradient(#181412,#0b0c0e)}
.now small{font-size:9px;font-weight:700}.now b{font-size:12px}.waves i{background:linear-gradient(#ffdf99,#99572b)}
.transport{margin-top:12px}.primary{min-height:46px;border-radius:13px;border-color:#c79956;background:linear-gradient(180deg,#ffdfa1,#cc9351);font-size:11px;font-weight:900;box-shadow:inset 0 2px rgba(255,255,255,.56),0 3px 8px rgba(0,0,0,.3)}
.fascia-bridge{display:block;width:calc(100% + 22px);margin:12px -11px 0;padding:0;line-height:0;overflow:hidden;position:relative;border:1px solid #bc8745;border-radius:13px;background:#0d0c0d;box-shadow:0 0 0 2px rgba(251,176,80,.12),0 6px 21px rgba(0,0,0,.75),inset 0 1px rgba(255,229,179,.44);transition:filter .18s,transform .18s}
.fascia-bridge::before{content:'';position:absolute;inset:0;border-radius:12px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.45);pointer-events:none}
.fascia-bridge:hover{filter:brightness(1.16)}.fascia-bridge:active{transform:scale(.991)}
.fascia-bridge img{display:block;width:100%;height:auto;aspect-ratio:1436/381;object-fit:contain;-webkit-user-drag:none;pointer-events:none}
.fine{font-size:10px;line-height:1.52;margin:15px 2px 0;color:#cab89b}.fine a{color:#ffcd7b;font-weight:800}
.soundcloud{margin:13px 0 0;border-radius:12px;overflow:hidden;border-color:#6d5235}.soundcloud iframe{height:130px}
.status{font-size:10px;line-height:1.4;margin:10px 2px 0;color:#cab18e;letter-spacing:.02em}
.metadata{font-size:9px;letter-spacing:.06em;color:#a29278;margin:14px 0 0;padding:11px 0 0}
@media(max-width:700px){
 .console{right:10px;width:min(500px,calc(100vw - 20px));max-height:calc(100dvh - 20px)}
}
@media(max-width:570px){
 .console{padding:9px;border-radius:23px}.console-inner{padding:11px;border-radius:17px}
 .upper{margin-bottom:10px;gap:6px}.brand{gap:7px}.brand-mark{width:32px;height:32px;font-size:11px}.brand-lines strong{font-size:10px;letter-spacing:.11em}.brand-lines span{font-size:7px;letter-spacing:.06em}
 .close{width:32px;height:32px;font-size:18px}
 .face{grid-template-columns:minmax(0,1fr) 91px;gap:7px}
 .display-panel{display:flex;flex-direction:column;padding:7px;border-radius:12px}.glass-window{display:flex;flex:1;flex-direction:column;justify-content:space-between;min-height:205px;padding:11px 8px 9px}
 .display-meta small{font-size:8px;letter-spacing:0}.display-lamp{font-size:7px;gap:3px}.display-lamp::before{width:5px;height:5px;flex:none}
 .frequency{margin-top:14px;gap:3px}.numbers{font-size:clamp(62px,19vw,78px);line-height:.9}.unit{font-size:10px}
 .channel{margin-top:14px}.channel span,.channel b{font-size:7px;letter-spacing:0}
 .tuner{height:34px;margin-top:12px;padding:0 4px 6px}.tuner::before{font-size:6px}.tuner i{height:7px}.tuner i:nth-child(5n){height:13px}.needle{height:23px}
 .mode-dials{gap:3px;margin-top:8px}.mode{padding:8px 2px;font-size:7px}.knob-stack{gap:3px}.knob{width:21px;height:21px}.knob::after{height:6px;top:3px}
 .speaker-panel{order:0;padding:7px;gap:5px;border-radius:12px}.speaker-title{font-size:6px;letter-spacing:.05em}.speaker-grid{min-height:149px;background-size:7px 7px,auto}.speaker-badge{padding:6px 2px}.speaker-badge b{font-size:7px}.speaker-badge span{font-size:7px;letter-spacing:0}
 .now{padding:10px;margin-top:10px;min-height:54px}.now small{font-size:7px}.now b{font-size:10px}.waves{gap:2px}.waves i{width:3px}
 .transport{margin-top:9px}.primary{min-height:40px}.fascia-bridge{width:calc(100% + 12px);margin:9px -6px 0;border-radius:9px}
 .fine{font-size:9px;margin-top:11px}.status{font-size:9px}.metadata{font-size:8px;letter-spacing:0}
}
@media(max-width:350px){.face{grid-template-columns:1fr 77px}.numbers{font-size:47px}.knob-stack{display:none}.speaker-grid{min-height:140px}.brand-lines strong{font-size:9px}}
@media(prefers-reduced-motion:reduce){.fascia-bridge{transition:none}}

/* 33.3 / playlist & portable listening controls */
.modes{grid-template-columns:repeat(3,minmax(0,1fr));min-width:0}
.mode{font-size:8px;letter-spacing:.025em;white-space:nowrap}
.continuity-row{display:flex;align-items:center;justify-content:space-between;gap:9px;margin:11px 0 0;padding:8px 1px;border-top:1px solid rgba(255,215,152,.14)}

.continuity-note{font-size:9px;color:#d1b287;line-height:1.35;margin-top:4px;max-width:260px}
.mp3-list{margin-top:12px;display:grid;gap:5px;max-height:148px;overflow:auto}
.mp3-item{display:flex;width:100%;align-items:center;gap:10px;padding:9px;border:1px solid rgba(228,175,96,.24);border-radius:10px;background:#161310;text-align:left;font-size:10px;color:#efd6a9;min-width:0}
.mp3-item:hover,.mp3-item[aria-current=true]{background:#4f3520;border-color:#d2a163}
.mp3-item span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.mp3-item small{flex:none;color:#bda282}
.mp3-empty{font-size:10px;color:#ddbd8f;padding:10px;border:1px dashed #5c4125;border-radius:8px;line-height:1.5}
:host(.roe-radio-companion) .dock,:host(.roe-radio-companion) .scrim{display:none!important}
:host(.roe-radio-companion) .console{display:block!important;position:relative!important;top:auto!important;right:auto!important;bottom:auto!important;transform:none!important;animation:none!important;width:100%!important;max-height:none!important;overflow:visible!important;box-shadow:0 15px 45px rgba(0,0,0,.7)!important}
:host(.roe-radio-companion) .rack{width:100%!important;pointer-events:auto!important}
@media(max-width:420px){.mode{font-size:7px;padding:8px 1px}.continuity-note{font-size:8px}}

/* ROE RADIO 33.3 / on-air identity, real-time record display & worldwide selector */
.now{margin-bottom:0;border-color:#be8144;position:relative;overflow:hidden}
.now::before{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(105deg,transparent 0 30px,rgba(255,180,67,.05) 32px,transparent 34px);opacity:.6}
.now small{color:#dca866;font-weight:900;letter-spacing:.18em}.now b{color:#ffe2af}
.record{position:relative;margin:9px 0 2px;padding:15px 16px 13px;border:1px solid #84572d;border-radius:16px;overflow:hidden;background:radial-gradient(ellipse at 83% 15%,rgba(161,40,18,.26),transparent 54%),linear-gradient(125deg,#17110e,#0b0a0b 72%);box-shadow:inset 0 0 0 1px rgba(255,200,93,.05),0 6px 25px rgba(0,0,0,.3)}
.record::before{content:'';pointer-events:none;position:absolute;inset:0;background:linear-gradient(115deg,transparent 14%,rgba(255,199,102,.07) 48%,transparent 60%);background-size:230% 100%;animation:radioSweep 6s ease-in-out infinite}
@keyframes radioSweep{0%,18%{background-position:100% 0}75%,100%{background-position:-90% 0}}
.record-kicker{display:flex;justify-content:space-between;align-items:center;gap:8px;color:#d0a16b;font-size:9px;letter-spacing:.17em;font-weight:900}
.record-kicker .record-on{display:flex;align-items:center;gap:7px;color:#ffc36d}
.record-kicker .record-on::before{content:'';width:6px;height:6px;border-radius:50%;background:#ff6039;box-shadow:0 0 10px #ff6339}
.record-content{position:relative;display:flex;align-items:center;gap:14px;margin:12px 0 14px;min-width:0}
.record-disc{flex:none;width:59px;height:59px;border-radius:50%;border:2px solid #ba7439;display:grid;place-items:center;position:relative;color:#fbc477;font-size:26px;background:repeating-radial-gradient(circle at center,#2a1810 0 1px,#100f10 2px 4px);box-shadow:inset 0 0 0 5px #0b0a0b,0 0 18px #a23d1329}
.record-disc::before{content:'';position:absolute;inset:10px;border:1px solid #795735;border-radius:50%}
.rack[data-playing="true"] .record-disc{animation:rotateROE 7s linear infinite}
@keyframes rotateROE{to{transform:rotate(360deg)}}
.record-copy{flex:1;min-width:0}.record-title{font-weight:950;font-family:Impact,'Arial Narrow',Arial,sans-serif;letter-spacing:.015em;text-transform:uppercase;color:#ffdfaa;font-size:clamp(21px,5.4vw,31px);line-height:1.05;max-height:2.2em;overflow:hidden;overflow-wrap:anywhere;text-shadow:0 0 21px #ed79273a}
.record-artist{color:#e9af78;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-top:8px;overflow-wrap:anywhere}
.record.switch .record-title,.record.switch .record-artist{animation:recordReveal .38s ease-out both}
@keyframes recordReveal{from{opacity:.15;transform:translateY(9px);filter:blur(3px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
.seek{display:block;width:100%;height:5px;cursor:pointer;appearance:none;-webkit-appearance:none;border:0;border-radius:10px;background:linear-gradient(to right,#f8bf71 0%,#cf642b var(--seek-progress,0%),#372c25 var(--seek-progress,0%),#372c25 100%);outline-offset:5px}
.seek::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:50%;border:2px solid #ffde9b;background:#cc672b;box-shadow:0 0 9px #ffa137}
.seek::-moz-range-thumb{width:10px;height:10px;border:2px solid #ffde9b;border-radius:50%;background:#cc672b}
.record-timing{display:flex;justify-content:space-between;color:#a89174;font-size:9px;letter-spacing:.08em;font-variant-numeric:tabular-nums;margin-top:8px}
.record-next{margin-top:10px;color:#a79273;font-size:9px;letter-spacing:.07em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.record-next strong{color:#e6b67e}
.record-controls{display:flex;align-items:center;gap:7px;margin-top:12px}
.record-controls button{flex:1;border:1px solid #715130;border-radius:9px;background:linear-gradient(#2b2017,#101011);padding:9px 7px;font-size:10px;font-weight:900;letter-spacing:.12em;color:#e9c392;min-height:33px}
.record-controls button:hover,.record-controls button[aria-pressed="true"]{border-color:#d7a064;background:linear-gradient(#a46f37,#4e2916);color:#fff1d8}
.record-controls #shuffle{flex:1.7;color:#ffc46c}
.station-browser{margin:12px 0;padding:11px;border:1px solid #68482b;border-radius:13px;background:#120f0d}
.station-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#f3cd96;font-weight:900;font-size:10px;letter-spacing:.15em;margin-bottom:10px}
.station-heading span{color:#af9273;font-size:9px;letter-spacing:0}
.station-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;max-height:340px;overflow:auto;scrollbar-width:thin;scrollbar-color:#995d2e transparent}
.station{border:1px solid #5c412b;border-radius:9px;background:linear-gradient(140deg,#251a14,#131113);text-align:left;padding:9px 8px;min-width:0;display:flex;gap:7px;align-items:flex-start;color:#ebd5b5}
.station:hover,.station[aria-pressed="true"]{border-color:#eab778;background:linear-gradient(130deg,#4b2b1c,#181312)}
.station-flag{font-size:16px;flex:none}.station-text{min-width:0}.station strong{display:block;font-size:9px;font-weight:900;letter-spacing:.045em;line-height:1.18}.station small{display:block;margin-top:4px;color:#c3a078;font-size:8px;line-height:1.2;overflow:hidden;text-overflow:ellipsis}
.station-footnote{font-size:9px;line-height:1.4;color:#bfa17c;margin-top:9px}
.station-footnote a{color:#eac18b;text-decoration:underline;text-underline-offset:2px}
.radio-source-tabs{display:flex;gap:6px;margin-top:10px;font-size:9px;color:#baa17e}
@media(max-width:570px){.record{padding:12px}.record-disc{width:44px;height:44px;font-size:20px}.record-content{gap:9px}.record-title{font-size:clamp(19px,6.3vw,25px)}.record-artist{font-size:9px}.station-grid{max-height:225px}.station strong{font-size:8px}.record-controls button{font-size:9px;padding:8px 5px}}
@media(prefers-reduced-motion:reduce){.record::before,.record.switch .record-title,.record.switch .record-artist,.rack[data-playing="true"] .record-disc{animation:none!important}}

/* ROE RADIO / COMPACT STUDIO EDITION — fixed 33.3 chassis, focus on music */
:host(.roe-radio-shell) .scrim{background:rgba(0,0,0,.39);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}
:host(.roe-radio-shell) .rack.open .dock{opacity:0;pointer-events:none!important}
:host(.roe-radio-shell) .console{box-shadow:0 22px 100px #000d,0 0 0 1px #edb56d31,inset 0 1px 0 #ffe1ac4d}

:host{--roe-amber:#ecc391;--roe-edge:rgba(232,173,97,.34);--roe-white:#f5ecde;--roe-muted:#a99783}
.scrim{background:rgba(2,2,4,.67);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.console{width:min(390px,calc(100vw - 24px));padding:7px;border-radius:22px;border:1px solid #89633f;background:linear-gradient(145deg,#785537 0%,#26201c 8%,#121112 17%,#0a0a0c 91%,#533923 100%);box-shadow:0 22px 65px #000c,inset 0 1px 0 #ffdb9e4d;max-height:calc(100dvh - 26px);overscroll-behavior:contain}
.console-inner{padding:14px;border-radius:15px;border:1px solid #a87b4d47;background:linear-gradient(155deg,#1b1817,#0c0c0e 40%,#0d0c0d 100%);box-shadow:inset 0 1px 0 #f4c88612}
.upper{padding:0;margin:0 0 12px;gap:9px}.brand{gap:9px}.brand-mark{width:31px;height:31px;border-radius:8px;font-size:11px;box-shadow:none}.brand-lines strong{font-size:11px;letter-spacing:.15em;white-space:normal}.brand-lines span{font-size:7px;letter-spacing:.14em;margin-top:3px;color:#b8a18a}.close{height:29px;width:29px;font-size:17px;border:1px solid #805834;background:#211915;box-shadow:none}
.face{display:block}.speaker-panel{display:none!important}.display-panel{padding:0;background:none;border:0;border-radius:0;box-shadow:none;display:flex;flex-direction:column;gap:8px}
.glass-window{padding:11px 13px;min-height:0!important;height:auto;border:1px solid #85582f;border-radius:11px;background:linear-gradient(110deg,#21160f 0%,#110e0c 55%,#18100c 100%);box-shadow:inset 0 0 25px #e0842311,inset 0 1px 0 #e9be7e20;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto;align-items:center;gap:3px}
.display-meta{display:flex;grid-column:1;grid-row:1;gap:4px;justify-content:flex-start}.display-meta small{font-size:7px!important;letter-spacing:.16em!important;line-height:1.4!important;max-width:none!important;color:#ccae84!important}.display-lamp{font-size:7px!important;max-width:none!important;letter-spacing:.13em!important;white-space:nowrap}.display-lamp::before{height:5px;width:5px}
.frequency{grid-column:1;grid-row:2;margin:1px 0 0!important;justify-content:flex-start;gap:7px}.numbers{font-size:48px!important;line-height:.85!important;letter-spacing:-.08em!important;color:#ffd99a!important;font-family:Arial,sans-serif;font-weight:800}.unit{margin:0 0 3px!important;font-size:11px!important;letter-spacing:.1em!important}
.channel{display:flex;grid-row:2;grid-column:2;flex-direction:column;align-items:flex-end;gap:3px;margin:0!important;text-align:right}.channel span,.channel b{font-size:7px!important;letter-spacing:.04em!important;line-height:1.25}.channel b{color:#8f7f6a}
.tuner{display:none!important}
.mode-dials{margin:0!important;gap:0}.knob-stack{display:none!important}.modes{grid-template-columns:repeat(3,minmax(0,1fr));width:100%;border-radius:10px;padding:3px;gap:3px;background:#101012;border:1px solid #54402c}.mode{font-size:8px!important;letter-spacing:.08em!important;padding:9px 2px!important;min-height:34px;border-radius:7px;white-space:nowrap}.mode[aria-pressed="true"]{background:linear-gradient(180deg,#f0c98e,#bc8246);color:#1e130d;box-shadow:none}
.now{display:none!important}.fascia-bridge{display:none!important}
.record{margin:11px 0 0;padding:12px 13px 11px;border:1px solid #674629;border-radius:12px;background:radial-gradient(ellipse at 99% 10%,#893d1b27,transparent 60%),linear-gradient(130deg,#17120f,#0d0d0f 67%);box-shadow:inset 0 1px 0 #d4984d16}
.record-kicker{font-size:8px;letter-spacing:.13em;color:#dcb582}.record-on::before{width:5px!important;height:5px!important}
.record-content{gap:11px;margin:11px 0 11px}.record-disc{width:43px;height:43px;font-size:18px;border:1px solid #ac7039;box-shadow:inset 0 0 0 4px #090909}.record-disc::before{inset:8px}
.record-title{font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:clamp(21px,5vw,27px)!important;line-height:1.02!important;max-height:2.2em}.record-artist{font-size:9px!important;letter-spacing:.075em!important;margin-top:5px!important;color:#ce9c75}
.record-timing{font-size:9px!important;margin-top:7px}.record-next{font-size:8px;margin-top:8px;color:#9d8b78}.record-controls{margin-top:10px;gap:6px}.record-controls button{min-height:31px;border-radius:7px;padding:7px 5px;font-size:9px;letter-spacing:.07em;background:#201813}.record-controls #shuffle{flex:1.5;color:#f3c78a}
.transport{margin-top:10px;gap:7px}.primary{min-height:40px!important;border:1px solid #bd894b;border-radius:9px;background:linear-gradient(#f1cd92,#c08a4d);box-shadow:inset 0 1px 0 #ffeadb80;color:#29180d;font-size:10px;font-weight:900}.volume{height:40px;width:100px;border-radius:9px;padding:0 8px}.volume input{width:57px}.iconbtn{width:38px;min-height:40px;border-radius:9px}
.library-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;margin:10px 0 0;padding:9px 10px;border:1px solid #59432e;border-radius:9px;background:#161312;color:#dec298;font-size:9px;font-weight:800;letter-spacing:.14em;text-align:left}
.library-toggle span{display:flex;gap:10px;align-items:center;color:#a88c6c;font-size:8px;letter-spacing:.05em}.library-toggle b{font-size:14px;line-height:.7;transition:transform .2s}.library-toggle[aria-expanded="true"] b{transform:rotate(180deg)}
.mp3-list{margin-top:5px;max-height:174px;gap:3px}.mp3-item{padding:8px;border-radius:7px;font-size:10px}.mp3-item small{font-size:9px}
.station-browser{margin:10px 0 0;padding:10px;border-radius:10px}.station-heading{font-size:9px}.station-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-height:178px;gap:5px}.station{border-radius:7px;padding:8px 7px}.station strong{font-size:8px}.station small{font-size:7px}.station-footnote{font-size:8px}
.soundcloud{margin-top:9px}.soundcloud iframe{height:110px}.fine{font-size:8px;line-height:1.4;margin:8px 0 0}.live-setup{margin-top:9px;padding-top:9px}.status{font-size:8px;margin:8px 0 0;min-height:12px;color:#aa9170;letter-spacing:.02em}
.continuity-row{margin:9px 0 0;padding:8px 0 0;gap:7px}.continuity-note{font-size:8px;line-height:1.4;color:#ad9577;max-width:195px}.metadata{display:none!important}
:host(.roe-radio-companion) .console{width:100%!important;max-width:390px;margin:0 auto;max-height:none!important}
@media(max-width:570px){.console{width:min(390px,calc(100vw - 16px));right:8px;padding:6px;border-radius:18px;max-height:calc(100dvh - 16px)}.console-inner{padding:11px;border-radius:12px}.face{display:block}.glass-window{min-height:0!important;padding:10px 11px}.frequency{margin:0!important}.numbers{font-size:43px!important}.unit{font-size:10px!important}.record{padding:11px}.record-title{font-size:22px!important}.record-content{gap:9px}.station-grid{max-height:170px}.record-disc{width:39px;height:39px}.mode{padding:8px 2px!important}}
@media(max-width:350px){.brand-lines strong{font-size:10px}.record-title{font-size:19px!important}.volume{width:82px}.volume input{width:40px}.mode{letter-spacing:0!important}.record-controls button{font-size:8px}}
@media(prefers-reduced-motion:reduce){.library-toggle b{transition:none}}

/* Restored illustrated rectangular ROE radio strip inside expanded receiver. */
.fascia-bridge{display:block!important;position:relative;width:100%!important;margin:12px 0 2px!important;padding:0!important;line-height:0;border:1px solid rgba(233,171,89,.36);border-radius:12px;overflow:hidden;background:#0b0a0b;box-shadow:0 5px 20px rgba(0,0,0,.45);cursor:pointer}
.fascia-bridge img{display:block;width:100%;height:auto;aspect-ratio:1436/381;object-fit:contain;pointer-events:none;user-select:none}
.fascia-bridge:hover{filter:brightness(1.075)}
@media(max-width:570px){.fascia-bridge{margin:9px 0 1px!important;border-radius:9px}}

 /* Keep the complete current title readable on narrow phones. */
@media(max-width:760px){
 .record-title{max-height:none!important;font-size:clamp(17px,5.4vw,22px)!important;line-height:1.12!important;overflow:visible;overflow-wrap:anywhere}
 .record-content{align-items:flex-start}
 .console{overscroll-behavior:contain;max-height:calc(100dvh - 16px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px))!important}
}
 </style>
 <div class="scrim" id="scrim" hidden></div>
 <div class="rack" data-playing="false">
  <div class="console" id="console" hidden aria-label="ROSE OF ENGLAND RADIO 33.3 FM player">
   <div class="console-inner">
    <div class="upper"><div class="brand"><span class="brand-mark">ROE</span><span class="brand-lines"><strong>ROSE OF ENGLAND</strong><span>OLD SCHOOL RADIO / SOUND SYSTEM 001</span></span></div><button type="button" class="close" id="close" aria-label="Minimize radio">×</button></div>
    <div class="face">
     <div class="display-panel">
      <div class="glass-window">
       <div class="display-meta"><small>${configuredStation}</small><span class="display-lamp">ON AIR</span></div>
       <div class="frequency"><div class="numbers">33<span class="decimal">.3</span></div><div class="unit">FM</div></div>
       <div class="channel"><span id="modeStatus">● FEATURED ROTATION</span><b>TORONTO / WORLDWIDE</b></div>
       <div class="tuner" aria-hidden="true">${Array.from({length:35},()=>'<i></i>').join('')}<span class="needle"></span></div>
      </div>
      <div class="mode-dials"><div class="modes" aria-label="Select audio source"><button type="button" class="mode" id="remixes" aria-pressed="false">SOUNDCLOUD</button><button type="button" class="mode" id="live" aria-pressed="false">WORLD RADIO</button><button type="button" class="mode" id="mp3s" aria-pressed="true">ROE 33.3</button></div><div class="knob-stack" aria-hidden="true"><span class="knob"></span><span class="knob"></span></div></div>
     </div>
     <div class="speaker-panel" aria-hidden="true"><div class="speaker-title">SHORTWAVE / LOCAL / FM</div><div class="speaker-grid"></div><div class="speaker-badge"><b>ROE RADIO</b><span>TRANSISTOR SERIES 33.3</span></div></div>
    </div>
    <div class="now"><div><small>NOW TUNED TO</small><b id="nowTitle">ROE ORIGINAL ROTATION / 30 TRACKS</b></div><div class="waves" aria-hidden="true">${Array.from({length:13},()=>'<i></i>').join('')}</div></div>
    <section class="record" id="record" aria-label="ROE Radio now playing">
      <div class="record-kicker"><span class="record-on" id="recordLabel">ROE / ON AIR</span><span id="trackNumber">-- / 30</span></div>
      <div class="record-content"><div class="record-disc" aria-hidden="true">✹</div><div class="record-copy"><div class="record-title" id="trackTitle" aria-live="polite">ROSE OF ENGLAND RADIO</div><div class="record-artist" id="trackArtist">30 TRACKS. INFINITE ROTATION.</div></div></div>
      <input class="seek" type="range" id="seek" min="0" max="1000" value="0" aria-label="Seek through current ROE song"><div class="record-timing"><span id="elapsed">00:00</span><span id="length">--:--</span></div>
      <div class="record-next" id="nextUp">NEXT FREQUENCY / SHUFFLED AUTOMATICALLY</div>
      <div class="record-controls" id="recordControls"><button type="button" id="previous" aria-label="Previous track">⏮ PREV</button><button type="button" id="shuffle" aria-pressed="true" aria-label="Shuffle a fresh ROE rotation">⤨ SHUFFLE</button><button type="button" id="next" aria-label="Skip to next track">NEXT ⏭</button></div>
    </section>
    <section class="station-browser" id="stationBrowser" hidden aria-label="Ten free worldwide radio presets"><div class="station-heading">WORLD RADIO / 10 FREQUENCIES <span>LIVE · SCROLL ↓</span></div><div class="station-grid" id="stationGrid"></div><div class="station-footnote">Direct links to independent broadcaster streams. Availability, metadata and regional restrictions are controlled by each station. <a id="stationVisit" href="https://www.nts.live/" target="_blank" rel="noopener noreferrer">VISIT STATION ↗</a></div></section>
    <div class="transport"><button type="button" class="primary" id="play">TUNE IN ↗</button><div class="volume" id="volumeWrap"><label for="volume">♫</label><input id="volume" aria-label="Live stream volume" type="range" min="0" max="100" value="70"></div><button type="button" class="iconbtn" id="mute" aria-label="Mute audio">♪</button></div>
    <button type="button" class="fascia-bridge" id="fasciaTune" aria-label="Tune in to ROE Radio"><img src="assets/roe-radio-panel.png" alt="Rose of England Radio 33.3 FM illustrated receiver" draggable="false"></button>
    <div class="soundcloud" id="soundcloudBox" hidden><iframe id="scFrame" title="NIKEHOUSEMAFIA — 12 Essential ROE Remixes" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
    <button type="button" class="library-toggle" id="libraryToggle" aria-expanded="false" aria-controls="mp3List">FULL ROE PLAYLIST <span><span id="libraryCount">30 TRACKS</span> <b aria-hidden="true">⌄</b></span></button><div class="mp3-list" id="mp3List" hidden></div>
    <div class="fine" id="scCredit" hidden>Curated ROE remix rotation via SoundCloud. Use the embedded player to start listening. <a target="_blank" rel="noopener noreferrer" href="${remixUrl}">OPEN COLLECTION ↗</a></div>
    <div class="live-setup" id="liveSetup" hidden><button type="button" class="setup-title" id="setupToggle" aria-expanded="false">CONNECT YOUR RADIO STREAM <span>＋</span></button><form class="setup-form" id="setupForm" hidden><label>STREAM AUDIO URL <input type="url" id="streamUrl" placeholder="https://your-host.com/stream.mp3" autocomplete="url" inputmode="url" required></label><label>ON-AIR TITLE <input type="text" id="streamName" maxlength="70" value="ROE WORLD / LIVE AUDIO"></label><button type="submit">CONNECT SOURCE ↗</button><span class="hint">This preference saves in this browser only. To publish a live source for everyone, set the script's data-stream attribute on your website. Direct MP3/AAC and browser-compatible streams are supported.</span></form></div>
    <p class="status" id="status" role="status" aria-live="polite">Select a channel to tune in.</p>
    <div class="continuity-row"><span class="continuity-note">♫ NONSTOP ROE AUDIO / STAYS IN THIS TAB.</span></div>
    <div class="metadata"><span>RX • 33.3 MHZ / DIGITAL</span><span>ROE WORLD © 2026</span></div>
    <audio id="audio" preload="none"></audio>
   </div>
  </div>
  <button type="button" class="dock" id="dock" aria-label="Open Rose of England Radio 33.3 FM" aria-expanded="false" aria-controls="console" title="Tune in to ROSE OF ENGLAND RADIO"><img class="radio-panel-art" src="${launcherArt}" alt="" loading="eager" draggable="false"><span class="radio-dock-state" id="dockState" aria-hidden="true">RADIO ▶</span><span class="visually-hidden">Open Rose of England Radio 33.3 FM</span></button>
 </div>`;
 if(companion){host.style.visibility='visible';host.style.pointerEvents='auto';root.host.classList.add('roe-radio-companion');}
 if(shellMode){root.host.classList.add('roe-radio-shell');}
 // The host remains on the parent document, so its backdrop spans the actual viewport.

 const $=s=>root.querySelector(s);
 const rack=$('.rack'),consoleEl=$('#console'),dock=$('#dock'),playBtn=$('#play'),audio=$('#audio'),vol=$('#volume'),frame=$('#scFrame'),status=$('#status');
 let mode='mp3s',open=false,scWidget=null,scReady=false,scApiPending=false,frameLoaded=false;
 let stream=(typeof stored.stream==='string'?stored.stream:configuredStream).trim();
 let title=(typeof stored.title==='string'?stored.title:'ROE WORLD / LIVE AUDIO').slice(0,70);
 const persist=()=>{try{localStorage.setItem(key,JSON.stringify({stream,title,volume:audio.volume}))}catch(_){}};
 const setStatus=message=>{status.textContent=message};
 // No independent sound-enable button: autoplay fallback is handled unobtrusively.
 const setPlaying=playing=>{rack.dataset.playing=String(playing);$('#dockState').textContent=playing?'ON AIR ●':'RADIO ▶';dock.setAttribute('aria-label',playing?'Open Rose of England Radio 33.3 FM — playing':'Open and play Rose of England Radio 33.3 FM');if(shellMode)window.dispatchEvent(new CustomEvent('roe:radio-state',{detail:{playing}}));playBtn.textContent=playing?'PAUSE RADIO Ⅱ':(mode==='remixes'?'TUNE IN / SOUNDCLOUD ↗':mode==='mp3s'?'PLAY ROE RADIO ▶':'PLAY LIVE STATION ▶');};
 const validSource=src=>/^(https:\/\/|http:\/\/|\.\.?\/|assets\/|media\/)/i.test(src)&&!/^javascript:/i.test(src);
 let publishedTracks=[],publishedOpeningTrackId='omf-remix-intro-team-zissou',activeTrack=-1,shuffleDeck=[],history=[],selectedStation=null,stationPlaySeq=0;
 // Preserve the MP3 deck and its exact position when the single sound engine retunes.
 let roeReturnCheckpoint=null;
 // Autostart locally on the actual site, not just inside the optional companion window.
 // On strict browsers, retry from the first page gesture with no requirement to hit PLAY.
 let inlineAutoWanted=!companion,autoUnlockListening=false,autoPlayPending=false,playGeneration=0;
 function requestSinglePlayback(onBlocked){
   if((!inlineAutoWanted&&!companion)||mode!=='mp3s'||!publishedTracks.length)return false;
   if(autoPlayPending||!audio.paused)return true;
   const currentGeneration=playGeneration;
   autoPlayPending=true;
   let attempt;
   try{attempt=audio.play();}
   catch(_){if(currentGeneration===playGeneration){autoPlayPending=false;onBlocked?.();}return false;}
   Promise.resolve(attempt).then(
     ()=>{if(currentGeneration===playGeneration){autoPlayPending=false;stopAutoUnlock();}},
     ()=>{if(currentGeneration===playGeneration){autoPlayPending=false;onBlocked?.();}}
   );
   return true;
 }
 const autoEvents=['pointerdown','touchstart','keydown'];
 function stopAutoUnlock(){
   if(!autoUnlockListening)return;
   autoUnlockListening=false;
   autoEvents.forEach(type=>document.removeEventListener(type,autoUnlockGesture,true));
 }
 function autoUnlockGesture(){
   if(!inlineAutoWanted||companionIsActive()){stopAutoUnlock();return;}
   if(!publishedTracks.length||mode!=='mp3s')return;
   if(activeTrack<0){nextTrack(true);return;}
   // Only one pending play promise. Child pointer/touch/keydown events may fire close together.
   requestSinglePlayback();
 }
 function installAutoUnlock(){
   if(autoUnlockListening||!inlineAutoWanted)return;
   autoUnlockListening=true;
   autoEvents.forEach(type=>document.addEventListener(type,autoUnlockGesture,{capture:true,passive:true}));
 }
 function autoStartROERotation(){
   if(!inlineAutoWanted||companionIsActive()||mode!=='mp3s'||!publishedTracks.length)return;
   installAutoUnlock();
   if(!audio.paused){stopAutoUnlock();return;}
   if(activeTrack<0){nextTrack(true);return;}
   // A queued track can play after an initial rejection and a later permitted gesture.
   requestSinglePlayback();
 }
 const cleanText=x=>String(x??'').replace(/[<>\u0000-\u001f]/g,'').slice(0,110);
 const timeFmt=(n,round=false)=>{if(!Number.isFinite(n))return '--:--';const secs=round?Math.round(n):Math.floor(n);return String(Math.floor(secs/60)).padStart(2,'0')+':'+String(secs%60).padStart(2,'0');};
 const clipIndex=i=>Number.isInteger(i)&&i>=0&&i<publishedTracks.length;
 function makeDeck(exclude=-1){const a=publishedTracks.map((_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
   if(a.length>1&&a[0]===exclude)[a[0],a[1]]=[a[1],a[0]];
   shuffleDeck=a;return a;
 }
 function peekNext(){if(!shuffleDeck.length)makeDeck(activeTrack);return shuffleDeck[0];}
 function nextUpLabel(){const idx=peekNext();$('#nextUp').textContent=clipIndex(idx)?'UP NEXT / '+cleanText(publishedTracks[idx].title).toUpperCase():'NEXT / MORE ROE';}
 function transitionRecord(){const el=$('#record');el.classList.remove('switch');void el.offsetWidth;el.classList.add('switch');}
 function displayRecord(t,index){
   $('#recordLabel').textContent=mode==='mp3s'?'ROE / SHUFFLED ROTATION':mode==='live'?'WORLD RADIO / LIVE':'SOUNDCLOUD / MIXTAPE';
   $('#trackTitle').textContent=cleanText(t?.title||'ROSE OF ENGLAND RADIO');
   $('#trackArtist').textContent=cleanText(t?.artist||(mode==='mp3s'?'ROE ORIGINAL ROTATION':'INDEPENDENT BROADCAST'));
   $('#trackNumber').textContent=mode==='mp3s'?(clipIndex(index)?String(index+1).padStart(2,'0')+' / '+String(publishedTracks.length).padStart(2,'0'):'-- / '+String(publishedTracks.length).padStart(2,'0')):(mode==='live'?'LIVE / 24H':'MIX / 001');
   $('#length').textContent=mode==='mp3s'?timeFmt(t?.durationSec,true):'LIVE';
   $('#elapsed').textContent=mode==='mp3s'?'00:00':'● ON AIR';
   $('#seek').disabled=mode!=='mp3s';$('#seek').value='0';$('#seek').style.setProperty('--seek-progress','0%');
   $('#recordControls').hidden=mode!=='mp3s';$('#nextUp').hidden=mode!=='mp3s';if(mode==='mp3s')nextUpLabel();
   transitionRecord();
 }
 function renderMP3s(){
   const list=$('#mp3List');list.replaceChildren();
   if(!publishedTracks.length){const info=document.createElement('div');info.className='mp3-empty';info.textContent='No ROE tracks are currently available.';list.append(info);return;}
   publishedTracks.forEach((t,i)=>{
    const b=document.createElement('button');b.type='button';b.className='mp3-item';b.setAttribute('aria-current',String(i===activeTrack));
    const idx=document.createElement('small');idx.textContent=String(i+1).padStart(2,'0');
    const label=document.createElement('span');label.textContent=cleanText(t.title||'Untitled')+' — '+cleanText(t.artist||'ROE');
    const dur=document.createElement('small');dur.textContent=timeFmt(t.durationSec,true);
     b.append(idx,label,dur);b.addEventListener('click',()=>{inlineAutoWanted=true;if(!playerCanDrive){launchCompanion('mp3s',i);setStatus('Your continuous radio will play the requested track.');return;}changeMode('mp3s');selectTrack(i,true);});list.append(b);
   });
 }
 async function loadMP3s(){
   // The locally packaged ROE library is the permanent offline-first default.
   // A newly published playlist.json can override this list on deployed HTTP(S) sites.
   publishedTracks=BUILTIN_ROE_TRACKS.map(track=>({...track}));
   if(location.protocol==='https:'||location.protocol==='http:'){
     const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),1100);
     try{const r=await fetch(new URL('../../assets/radio/playlist.json',scriptUrl),{cache:'no-store',signal:controller.signal});
       if(r.ok){const parsed=await r.json();if(Array.isArray(parsed.tracks))publishedTracks=parsed.tracks.filter(t=>t&&typeof t.src==='string'&&validSource(t.src)).slice(0,150);if(typeof parsed.openingTrackId==='string'&&parsed.openingTrackId.trim())publishedOpeningTrackId=parsed.openingTrackId.trim();}
     }catch(_){/* use bundled default tracks */}finally{clearTimeout(timer);}
   }
   // Each fresh session opens with the premiere, then all other songs in random order.
   const preferredOpeningId=publishedOpeningTrackId||'omf-remix-intro-team-zissou';
   const opener=publishedTracks.find(t=>t.id===preferredOpeningId)||BUILTIN_ROE_TRACKS.find(t=>t.id===preferredOpeningId)||publishedTracks[0];
   if(opener){publishedTracks=publishedTracks.filter(t=>t.id!==opener.id);publishedTracks.unshift({...opener});}
   makeDeck();const openingIndex=opener?publishedTracks.findIndex(t=>t.id===opener.id):0;
   shuffleDeck=[openingIndex,...shuffleDeck.filter(i=>i!==openingIndex)];
   $('#libraryCount').textContent=String(publishedTracks.length).padStart(2,'0')+' TRACKS';
   renderMP3s();displayRecord({title:'ROE ORIGINAL ROTATION',artist:publishedTracks.length+' TRACKS • NEVER THE SAME ORDER'},-1);$('#nowTitle').textContent=publishedTracks.length+' ROE TRACKS / SHUFFLED EVERY SESSION';return publishedTracks;
 }
 async function selectTrack(index,autoplay=false,keepDeck=false){
   if(!clipIndex(index))return;
   const old=activeTrack;if(old>=0&&old!==index)history.push(old);
   activeTrack=index;
   if(!keepDeck)shuffleDeck=shuffleDeck.filter(i=>i!==index);
   const t=publishedTracks[index];
   playGeneration++;autoPlayPending=false;
   audio.pause();audio.preload='auto';audio.src=new URL('../../'+t.src.replace(/^\//,''),scriptUrl).href;audio.load();
   $('#nowTitle').textContent=cleanText(t.title||'ROE TRACK');$('#modeStatus').textContent='● ROE / AUTOMATIC SHUFFLE';
   displayRecord(t,index);renderMP3s();setPlaying(false);setStatus('CUED / '+cleanText(t.title)+' — '+cleanText(t.artist));
   if(autoplay){
     requestSinglePlayback(()=>{
       setStatus('READY / TAP PLAY ROE RADIO TO ENABLE SOUND.');
       if(inlineAutoWanted)installAutoUnlock();
     });
   }
 }
 async function nextTrack(autoplay=true){if(!publishedTracks.length)return;
   if(!shuffleDeck.length)makeDeck(activeTrack);
   const i=shuffleDeck.shift();await selectTrack(i,autoplay,true);
 }
 async function previousTrack(){if(!history.length){await nextTrack(true);return;}
   const back=history.pop();if(clipIndex(activeTrack)&&activeTrack!==back)shuffleDeck.unshift(activeTrack);
   activeTrack=-1;await selectTrack(back,true,true);
 }
 function reshuffle(){makeDeck(activeTrack);history=[];nextUpLabel();setStatus('Fresh ROE shuffle loaded — '+publishedTracks.length+' songs, no repeats.');}
 function renderStations(){const list=$('#stationGrid');list.replaceChildren();STATIONS.forEach(st=>{
   const b=document.createElement('button');b.type='button';b.className='station';b.dataset.station=st.id;b.setAttribute('aria-pressed',String(selectedStation?.id===st.id));
   const flag=document.createElement('span');flag.className='station-flag';flag.textContent=st.flag;
   const body=document.createElement('span');body.className='station-text';const name=document.createElement('strong');name.textContent=st.name;const city=document.createElement('small');city.textContent=st.city;const genre=document.createElement('small');genre.textContent=st.genre;
   body.append(name,city,genre);b.append(flag,body);b.addEventListener('click',async()=>{
     if(!playerCanDrive){launchCompanion('live',-1,st.id);setStatus('Opening '+st.name+' in the persistent player.');return;}
     await selectStation(st.id,true);
   });list.append(b);
 });}
 async function selectStation(id,autoplay=false){
   const st=STATIONS.find(s=>s.id===id);if(!st)return false;
   changeMode('live');selectedStation=st;setStream(st.src,st.name);$('#streamUrl').value=st.src;$('#streamName').value=st.name;$('#stationVisit').href=st.site;renderStations();
   if(autoplay){const seq=++stationPlaySeq;try{await audio.play();if(seq===stationPlaySeq)setStatus('LIVE / '+st.name+' — '+st.city);}catch(_){if(seq===stationPlaySeq)setStatus('Station loaded. Press PLAY LIVE STATION to try again.');}}
   return true;
 }
 function ensureIframe(){
  if(!frameLoaded){frame.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(remixUrl)+'&color=%23d99c87&auto_play=false&hide_related=true&show_comments=false&show_reposts=false&show_user=true&show_teaser=false&visual=false';frameLoaded=true;}
  if(scApiPending||scReady)return;scApiPending=true;
  const init=()=>{if(!window.SC?.Widget)return;try{scWidget=window.SC.Widget(frame);const events=window.SC.Widget.Events;scWidget.bind(events.READY,()=>{scReady=true;setStatus('ROE remix player ready.');});scWidget.bind(events.PLAY,()=>{if(mode==='remixes')setPlaying(true)});scWidget.bind(events.PAUSE,()=>{if(mode==='remixes')setPlaying(false)});scWidget.bind(events.FINISH,()=>{if(mode==='remixes')setPlaying(false)});}catch(_){setStatus('Use the SoundCloud player below to listen.')}};
  if(window.SC?.Widget){init();return;}
  const s=document.createElement('script');s.src='https://w.soundcloud.com/player/api.js';s.async=true;s.onload=init;s.onerror=()=>{setStatus('Use the embedded SoundCloud player below to listen.')};document.head.append(s);
 }
 function setOpen(value){open=companion?true:!!value;consoleEl.hidden=!open;$('#scrim').hidden=!open;dock.setAttribute('aria-expanded',String(open));dock.setAttribute('aria-label',open?'Minimize Rose of England Radio':'Open Rose of England Radio 33.3 FM');rack.classList.toggle('open',open);if(open){$('#close').focus()}else dock.focus();}
 function checkpointROERotation(){
   if(mode!=='mp3s'||!clipIndex(activeTrack))return;
   roeReturnCheckpoint={
     index:activeTrack,
     seconds:Math.max(0,Number.isFinite(audio.currentTime)?audio.currentTime:0),
     wasPlaying:!audio.paused||autoPlayPending
   };
 }
 function showROEReturnTime(seconds){
   $('#elapsed').textContent=timeFmt(seconds);
   const length=Number.isFinite(audio.duration)&&audio.duration>0
     ?audio.duration:Number(publishedTracks[activeTrack]?.durationSec)||0;
   const progress=length?Math.min(1000,Math.round(seconds/length*1000)):0;
   $('#seek').value=String(progress);
   $('#seek').style.setProperty('--seek-progress',(progress/10)+'%');
 }
 function restoreROERotation(){
   const point=roeReturnCheckpoint;
   if(!point||!clipIndex(point.index))return false;
   const index=point.index;
   const expected=new URL('../../'+publishedTracks[index].src.replace(/^\//,''),scriptUrl).href;
   // Retuning always cancels a pending request from the previous audio source.
   const generation=++playGeneration;
   autoPlayPending=false;
   activeTrack=index;
   audio.pause();
   audio.preload='auto';
   let restored=false;
   const resume=()=>{
     if(restored||generation!==playGeneration||mode!=='mp3s'||activeTrack!==index)return;
     if(audio.readyState<1)return;
     restored=true;
     const duration=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:Infinity;
     const position=Math.min(point.seconds,Math.max(0,duration-0.15));
     try{audio.currentTime=position;}catch(_){}
     showROEReturnTime(position);
     if(point.wasPlaying){
       inlineAutoWanted=true;
       installAutoUnlock();
       requestSinglePlayback(()=>{
         setStatus('ROE READY / RESUMES FROM '+timeFmt(position)+' ON NEXT INTERACTION');
         if(inlineAutoWanted)installAutoUnlock();
       });
     }else{
       inlineAutoWanted=false;
       stopAutoUnlock();
       setStatus('ROE PAUSED / '+timeFmt(position)+' — PRESS PLAY TO RESUME');
     }
   };
   audio.addEventListener('loadedmetadata',resume,{once:true});
   audio.src=expected;
   audio.load();
   displayRecord(publishedTracks[index],index);
   showROEReturnTime(point.seconds);
   renderMP3s();
   $('#nowTitle').textContent=cleanText(publishedTracks[index].title);
   setPlaying(false);
   if(audio.readyState>=1)resume();
   return true;
 }
 function changeMode(next){
   if(!['mp3s','live','remixes'].includes(next)||next===mode)return;
   if(mode==='mp3s')checkpointROERotation();
   // One audio element is shared, so stop the outgoing source before retuning.
   if(mode==='live'||mode==='mp3s'){
     if(mode==='mp3s'){++playGeneration;autoPlayPending=false;}
     audio.pause();
   }else if(scReady&&scWidget){try{scWidget.pause()}catch(_){}}
   mode=next;
   if(!companion&&next!=='mp3s'){inlineAutoWanted=false;stopAutoUnlock();}
   setPlaying(false);
   $('#remixes').setAttribute('aria-pressed',String(mode==='remixes'));
   $('#live').setAttribute('aria-pressed',String(mode==='live'));
   $('#mp3s').setAttribute('aria-pressed',String(mode==='mp3s'));
   const isLive=mode==='live',isMP3=mode==='mp3s';
   $('#soundcloudBox').hidden=mode!=='remixes'||!frameLoaded;
   $('#scCredit').hidden=mode!=='remixes';
   $('#libraryToggle').hidden=!isMP3;
   $('#mp3List').hidden=!isMP3||$('#libraryToggle').getAttribute('aria-expanded')!=='true';
   $('#liveSetup').hidden=!isLive;$('#stationBrowser').hidden=!isLive;
   $('#volumeWrap').hidden=!(isLive||isMP3);$('#mute').hidden=!(isLive||isMP3);
   $('#modeStatus').textContent=isLive?'● 10 WORLDWIDE STATIONS':isMP3?'● ROE / AUTO SHUFFLE':'● CURATED SOUNDCLOUD MIXES';
   $('#nowTitle').textContent=isLive?(selectedStation?.name||(stream?title:'CHOOSE A WORLD STATION')):(isMP3?(publishedTracks[activeTrack]?.title||('ROE / '+publishedTracks.length+' TRACK ROTATION')):'12 ESSENTIAL ROE REMIXES');
   if(isLive){
     displayRecord({title:selectedStation?.name||(stream?title:'CHOOSE A WORLD STATION'),artist:selectedStation?.city||'SELECT YOUR WORLD FREQUENCY'},-1);
     if(stream&&audio.src!==stream){audio.src=stream;audio.load();}
     playBtn.textContent='PLAY LIVE STATION ▶';
     setStatus('Select one of ten free international radio streams.');
   }else if(isMP3){
     playBtn.textContent='PLAY ROE RADIO ▶';
     if(!restoreROERotation()){
       displayRecord(publishedTracks[activeTrack]||{title:'ROE RADIO 33.3',artist:'SHUFFLED EVERY SESSION'},activeTrack);
       setStatus('ROE original rotation — '+publishedTracks.length+' tracks. Auto-start when permitted.');
       if(playerCanDrive&&clipIndex(activeTrack)){
         const expected=new URL('../../'+publishedTracks[activeTrack].src.replace(/^\//,''),scriptUrl).href;
         if(audio.src!==expected)selectTrack(activeTrack,false,true);
       }
     }
   }else{
     displayRecord({title:'12 ESSENTIAL ROE REMIXES',artist:'NIKEHOUSEMAFIA / SOUNDCLOUD'},-1);
     playBtn.textContent='TUNE IN / SOUNDCLOUD ↗';
     setStatus('Press play to load the SoundCloud collection.');
   }
 }
 function setStream(src,name){stream=src;title=cleanText(name||'ROE WORLD / LIVE AUDIO');audio.pause();audio.removeAttribute('src');audio.load();if(stream){audio.src=stream;audio.load();}persist();$('#nowTitle').textContent=stream?title:'CHOOSE WORLD RADIO';$('#modeStatus').textContent=stream?'● WORLD / DIRECT STREAM':'○ CHOOSE SOURCE';displayRecord({title:stream?title:'WORLD RADIO',artist:selectedStation?.city||'LIVE / GLOBAL FREQUENCIES'},-1);setPlaying(false);setStatus(stream?'Tuned to '+title+'.':'Select a station.');}
 audio.volume=0.7;vol.value='70';
 if(stream&&validSource(stream)){$('#streamUrl').value=stream;$('#streamName').value=title;}else stream='';
 renderStations();
 dock.addEventListener('click',()=>{const opening=!open;setOpen(opening);if(opening&&mode==='mp3s'&&audio.paused){inlineAutoWanted=true;installAutoUnlock();if(activeTrack<0)nextTrack(true);else requestSinglePlayback(()=>setStatus('Tap PLAY ROE RADIO to enable sound.'));}});$('#close').addEventListener('click',()=>{if(companion){window.close();setStatus('Closing the companion player stops the radio.');}else setOpen(false)});$('#scrim').addEventListener('click',()=>setOpen(false));$('#fasciaTune').addEventListener('click',()=>playBtn.click());
 $('#remixes').addEventListener('click',()=>changeMode('remixes'));$('#live').addEventListener('click',()=>changeMode('live'));$('#mp3s').addEventListener('click',()=>changeMode('mp3s'));
 $('#libraryToggle').addEventListener('click',()=>{const b=$('#libraryToggle'),show=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(show));$('#mp3List').hidden=!show;});
 $('#previous').addEventListener('click',()=>{inlineAutoWanted=true;if(playerCanDrive)previousTrack();else launchCompanion('mp3s');});
 $('#next').addEventListener('click',()=>{inlineAutoWanted=true;if(playerCanDrive)nextTrack(true);else launchCompanion('mp3s');});
 $('#shuffle').addEventListener('click',()=>{inlineAutoWanted=true;if(playerCanDrive){reshuffle();nextTrack(true);}else launchCompanion('mp3s');});
 $('#seek').addEventListener('input',()=>{if(mode==='mp3s'&&playerCanDrive&&Number.isFinite(audio.duration)){audio.currentTime=audio.duration*(+$('#seek').value)/1000;}});
 playBtn.addEventListener('click',async()=>{
   if(!playerCanDrive){setStatus(launchCompanion(mode)?'Radio opened.':'Unable to open the radio.');return;}
   if(mode==='mp3s'){
     if(!publishedTracks.length){setStatus('No published tracks found. Redeploy the full radio ZIP.');return;}
     if(activeTrack<0)await nextTrack(false);
     if(!audio.paused){inlineAutoWanted=false;stopAutoUnlock();audio.pause();return;}
     const expected=new URL('../../'+publishedTracks[activeTrack].src.replace(/^\//,''),scriptUrl).href;
     if(audio.src!==expected){await selectTrack(activeTrack,false,true);}
     inlineAutoWanted=true;installAutoUnlock();requestSinglePlayback(()=>{setPlaying(false);setStatus('READY / TAP PLAY ROE RADIO TO ENABLE SOUND.');});
     return;
   }
   if(mode==='remixes'){
     $('#soundcloudBox').hidden=false;ensureIframe();if(scReady&&scWidget){try{if(rack.dataset.playing==='true')scWidget.pause();else scWidget.play()}catch(_){setStatus('Press Play inside the SoundCloud player.')}}else {setStatus('Press Play inside the SoundCloud player.');frame.focus();}return;
   }
   if(!stream){$('#stationBrowser').hidden=false;setStatus('Select one of ten stations to start.');return;}
   if(!audio.paused){audio.pause();return;}
   try{if(audio.src!==stream){audio.src=stream;audio.load();}await audio.play();}catch(_){setPlaying(false);setStatus('Stream unavailable in this browser or region. Please try a different station.');}
 });
 // Other pages stop local audio if the persistent companion begins broadcasting.
 if(!companion&&!shellMode)addEventListener('storage',e=>{if(e.key===companionHeartbeatKey&&companionIsActive()&&!audio.paused){inlineAutoWanted=false;stopAutoUnlock();audio.pause();}});
 audio.addEventListener('playing',()=>{if(!companion)stopAutoUnlock();if(mode==='live'||mode==='mp3s'){setPlaying(true);setStatus('ON AIR / '+(mode==='mp3s'?cleanText(publishedTracks[activeTrack]?.title):title));}});
 audio.addEventListener('pause',()=>{if(mode==='live'||mode==='mp3s'){setPlaying(false);}});
 audio.addEventListener('loadedmetadata',()=>{if(mode==='mp3s'&&clipIndex(activeTrack))$('#length').textContent=timeFmt(audio.duration,true)});
 audio.addEventListener('timeupdate',()=>{if(mode!=='mp3s')return;$('#elapsed').textContent=timeFmt(audio.currentTime);const pct=Number.isFinite(audio.duration)&&audio.duration>0?Math.min(1000,Math.round(audio.currentTime/audio.duration*1000)):0;$('#seek').value=String(pct);$('#seek').style.setProperty('--seek-progress',(pct/10)+'%');});
 audio.addEventListener('waiting',()=>{if(mode==='live'||mode==='mp3s')setStatus('Buffering audio…')});
 audio.addEventListener('error',()=>{if(mode==='live'||mode==='mp3s'){setPlaying(false);setStatus(mode==='mp3s'?'Track unavailable. Confirm assets/radio/tracks is published.':'Station stream failed. Try another preset.');}});
 audio.addEventListener('ended',()=>{if(mode==='mp3s'&&publishedTracks.length)nextTrack(true);});
 vol.addEventListener('input',()=>{audio.volume=+vol.value/100;audio.muted=false;$('#mute').textContent='♪';persist()});
 $('#mute').addEventListener('click',()=>{audio.muted=!audio.muted;$('#mute').textContent=audio.muted?'♩':'♪';$('#mute').setAttribute('aria-label',audio.muted?'Unmute':'Mute')});
 $('#setupToggle').addEventListener('click',()=>{const form=$('#setupForm'),wasClosed=form.hidden;form.hidden=!wasClosed;$('#setupToggle').setAttribute('aria-expanded',String(wasClosed))});
 $('#setupForm').addEventListener('submit',e=>{e.preventDefault();const url=$('#streamUrl').value.trim(),name=$('#streamName').value.trim();if(!validSource(url)){setStatus('Enter a valid HTTPS direct audio stream URL.');return}selectedStation=null;setStream(url,name);renderStations();$('#setupForm').hidden=true;$('#setupToggle').setAttribute('aria-expanded','false');});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open&&document.activeElement!==$('#streamUrl')&&!companion)setOpen(false)});
 loadMP3s().then(()=>{
   if(companion){const query=new URLSearchParams(location.search),requested=query.get('mode')||'mp3s';if(['remixes','live','mp3s'].includes(requested)&&requested!==mode)changeMode(requested);
     const idx=Number(query.get('track'));
     if(requested==='mp3s'&&query.has('track')&&clipIndex(idx)){
       const seek=Math.max(0,Math.min(3600,Number(query.get('seek'))||0));
       if(seek)audio.addEventListener('loadedmetadata',()=>{try{audio.currentTime=seek;}catch(_){}},{once:true});
       selectTrack(idx,true);
     }else if(requested==='mp3s'&&publishedTracks.length){nextTrack(true);}else if(requested==='live'&&query.has('station')){selectStation(query.get('station'),true);}setOpen(true);
   }else if(publishedTracks.length){
     $('#nowTitle').textContent='ROE / '+publishedTracks.length+' TRACKS / ENDLESS SHUFFLE';
     autoStartROERotation();
   }
 });
 window.ROE_RADIO_33_3={unlockFromGesture:()=>{if(shellMode&&inlineAutoWanted&&autoUnlockListening&&audio.paused&&mode==='mp3s')autoUnlockGesture();},isPlaying:()=>!audio.paused&&!audio.ended,debug:()=>({track:publishedTracks[activeTrack]?.title||'',time:audio.currentTime,paused:audio.paused,mode,roeReturn:roeReturnCheckpoint?{...roeReturnCheckpoint}:null,playPending:autoPlayPending,hostCount:document.querySelectorAll('#roeRadioHost').length,route:window.ROE_SITE_SHELL?.route?.()||''}),startAudio:async()=>{try{if(mode!=='mp3s')changeMode('mp3s');if(activeTrack<0)await nextTrack(false);inlineAutoWanted=true;installAutoUnlock();return requestSinglePlayback();}catch(_){return false;}},open:()=>setOpen(true),close:()=>setOpen(false),changeMode,selectTrack:(i)=>{changeMode('mp3s');return selectTrack(i,false)},nextTrack,reshuffle,launchCompanion,selectStation,setStream:(url,name)=>{if(validSource(url)){selectedStation=null;changeMode('live');setStream(url,name);return true}return false},pause:()=>{inlineAutoWanted=false;stopAutoUnlock();audio.pause();if(scReady&&scWidget)try{scWidget.pause()}catch(_){}}};
})();
