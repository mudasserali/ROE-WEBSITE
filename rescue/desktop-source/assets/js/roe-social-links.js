/* Shared public social links. The shell owns one bar; booking dialogs get a local bar. */
(()=>{
 'use strict';
 const start=()=>{
  const isBooking=window.name==='roeBookingFrame';
  let current=window,hasShell=false;
  try{while(current!==current.parent){current=current.parent;if(current.__ROE_SITE_SHELL__){hasShell=true;break}}}catch(_){}
  if(hasShell&&!isBooking)return;
  if(window===window.top&&document.getElementById('roe-site-shell-entry')&&!new URLSearchParams(location.search).has('standalone'))return;
  if(document.getElementById('roe-site-socials'))return;
  const markup="<nav id=\"roe-contact-socials\" aria-label=\"Social and music links\"><a href=\"https://www.instagram.com/roseofengland\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram\" title=\"Instagram\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"18\" cy=\"6\" r=\".8\" fill=\"currentColor\"/></svg></a><a href=\"https://music.apple.com/us/artist/rose-of-england/1462804323\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Apple Music\" title=\"Apple Music\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9 18V5l11-2v13M9 8l11-2\"/><ellipse cx=\"6\" cy=\"18\" rx=\"3\" ry=\"2\"/><ellipse cx=\"17\" cy=\"16\" rx=\"3\" ry=\"2\"/></svg></a><a href=\"https://soundcloud.com/dataxpresents/rose-of-england-soft-spot\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"SoundCloud\" title=\"SoundCloud\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 13v5m3-8v9m3-12v12m3-13v13h7a3 3 0 0 0 0-6h-1a5 5 0 0 0-6-7Z\"/></svg></a></nav>";
  const mount=document.createElement('div');mount.innerHTML=markup;
  const bar=mount.firstElementChild;bar.id='roe-site-socials';
  const style=document.createElement('style');style.id='roe-site-socials-style';
  style.textContent='#roe-site-socials{position:fixed;left:12px;top:12px;z-index:2147482100;display:flex;gap:2px;padding:3px;border:1px solid #ffffff24;border-radius:99px;background:#08090dcc;backdrop-filter:blur(12px);box-sizing:border-box;max-width:calc(100vw - 16px);pointer-events:auto}#roe-site-socials[hidden]{display:none}#roe-site-socials a{display:grid;place-items:center;width:34px;height:34px;color:#eee;border-radius:50%;transition:background .2s,color .2s}#roe-site-socials a:hover,#roe-site-socials a:focus-visible{color:#fff;background:#d82b4c66;outline:1px solid #ff5c7a;outline-offset:1px}#roe-site-socials svg{width:17px;height:17px}';
  style.textContent+=`@media(max-width:760px){
   #roe-site-socials{flex-direction:column;gap:4px;padding:3px;background:#08090de6;border-color:#ffffff24}
   #roe-site-socials a{width:44px;height:44px}
  }`;
  document.head.append(style);document.body.append(bar);
  if(document.getElementById('roePageFrame'))document.documentElement.setAttribute('data-roe-social-shell','');
  let raf=0;
  const watched=new WeakSet();
  const queue=()=>{if(!raf)raf=requestAnimationFrame(place)};
  const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
  const inventory=()=>{
   const entries=[],rects=[];let bookingOpen=false;
   const visit=(doc,ox,oy,clip,depth)=>{
    if(!doc||depth>3)return;
    if(!watched.has(doc)){
     watched.add(doc);doc.addEventListener('scroll',queue,{passive:true,capture:true});
     doc.addEventListener('load',queue,{capture:true});
     const observer=new MutationObserver(queue);observer.observe(doc.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['open','hidden']});
    }
    if(doc.querySelector('#roeBookingDialog[open]'))bookingOpen=true;
    entries.push(doc);
    const selectors='a,button,input,textarea,select,h1,h2,roe-glow-menu,.roe-mobile-nav-carrier,.rps-board,.world-clock,.topbar-brand,.header-logos,.wordmark,.brand,#roeRadioHost,.hero-cinema-shell,.hero-top,.hero-bottom,.ticker,img[alt*="logo" i],img[alt*="signature" i]';
    for(const el of doc.querySelectorAll(selectors)){
     if(el===bar||bar.contains(el))continue;
     if(el.id==='roeRadioHost'&&el.shadowRoot){
      if(!watched.has(el.shadowRoot)){watched.add(el.shadowRoot);new MutationObserver(queue).observe(el.shadowRoot,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','aria-expanded']});}
      const panel=el.shadowRoot.querySelector('#console');
      if(panel&&!panel.hidden){const p=panel.getBoundingClientRect();if(p.width>2&&p.height>2)rects.push({left:p.left+ox-6,top:p.top+oy-6,right:p.right+ox+6,bottom:p.bottom+oy+6});}
     }
     const r=el.getBoundingClientRect();if(r.width<2||r.height<2)continue;
     const box={left:Math.max(clip.left,r.left+ox)-6,top:Math.max(clip.top,r.top+oy)-6,right:Math.min(clip.right,r.right+ox)+6,bottom:Math.min(clip.bottom,r.bottom+oy)+6};
     if(box.right>box.left&&box.bottom>box.top&&box.bottom>0&&box.top<innerHeight)rects.push(box);
    }
    for(const frame of doc.querySelectorAll('#roePageFrame,#roePressFrame,#roeBookingFrame')){
     try{const r=frame.getBoundingClientRect();const next={left:Math.max(clip.left,ox+r.left),top:Math.max(clip.top,oy+r.top),right:Math.min(clip.right,ox+r.right),bottom:Math.min(clip.bottom,oy+r.bottom)};
      if(next.right>next.left&&next.bottom>next.top)visit(frame.contentDocument,ox+r.left,oy+r.top,next,depth+1);
     }catch(_){}
    }
   };
   visit(document,0,0,{left:0,top:0,right:innerWidth,bottom:innerHeight},0);
   return {rects,bookingOpen};
  };
  function place(){
   raf=0;
   const mobile=matchMedia('(max-width:760px)').matches;
   const redundantBooking=hasShell&&isBooking;
   if(mobile){
    bar.hidden=redundantBooking;
    const radio=document.getElementById('roeRadioHost')?.getBoundingClientRect();
    const width=bar.offsetWidth,height=bar.offsetHeight;
    const radioLeft=radio?.width?radio.left:innerWidth-92;
    const radioWidth=radio?.width||64;
    const radioTop=radio?.width?radio.top:innerHeight-164;
    bar.style.left=Math.round(Math.max(8,Math.min(innerWidth-width-8,radioLeft+(radioWidth-width)/2)))+'px';
    bar.style.top=Math.round(Math.max(8,radioTop-height-14))+'px';
    bar.dataset.placement='above-radio';
    return;
   }
   if(window.ROE_DESKTOP_LAYOUT?.placeSocial(bar))return;
   const {rects,bookingOpen}=inventory();
   if(!isBooking&&bookingOpen){if(!bar.hidden)bar.hidden=true;return;}if(bar.hidden)bar.hidden=false;
   const width=bar.offsetWidth,height=bar.offsetHeight,gap=12;
   const headerEdges=rects.filter(r=>r.top<104&&r.bottom>0).flatMap(r=>[r.right+gap,r.left-width-gap]).filter(x=>x>=gap&&x+width<=innerWidth-gap);
   const xs=[innerWidth-width-gap,...headerEdges,gap,Math.round((innerWidth-width)/2)];
   const ys=[gap,88,140,Math.round(innerHeight*.25),Math.round(innerHeight*.45),Math.round(innerHeight*.65),innerHeight-height-gap];
   let best=null;
   for(const y0 of ys)for(const x0 of xs){
    const x=Math.min(Math.max(gap,x0),Math.max(gap,innerWidth-width-gap)),y=Math.min(Math.max(gap,y0),Math.max(gap,innerHeight-height-gap));
    const box={left:x,top:y,right:x+width,bottom:y+height};const score=rects.reduce((sum,r)=>sum+overlap(box,r),0);
    if(!best||score<best.score)best={x,y,score};if(score===0)break;
   }
   if(best){bar.style.left=best.x+'px';bar.style.top=best.y+'px';bar.dataset.placement=best.score===0?'open-area':'best-fit';}
  }
  window.addEventListener('resize',queue,{passive:true});window.addEventListener('roe:route-change',queue);
  window.addEventListener('roe:radio-position',queue);
  window.addEventListener('message',event=>{if(event.origin===location.origin&&/^roe:/.test(event.data?.type||''))queue()});
  new ResizeObserver(queue).observe(bar);queue();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
