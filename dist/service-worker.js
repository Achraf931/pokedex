if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const t=e=>r(e,o),c={module:{uri:o},exports:l,require:t};s[o]=Promise.all(i.map((e=>c[e]||t(e)))).then((e=>(n(...e),l)))}}define(["./workbox-4f586afe"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pokedex"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/392.f7153d7d.css",revision:null},{url:"/css/app.1703be81.css",revision:null},{url:"/index.html",revision:"9809afab0a1d8ce337f5c413e3e077e1"},{url:"/js/345.8c22ea8b.js",revision:null},{url:"/js/392.7ee81cfd.js",revision:null},{url:"/js/app.06527506.js",revision:null},{url:"/js/chunk-vendors.4a2b9e30.js",revision:null},{url:"/manifest.json",revision:"c6db0a64228772c78eafe99538e1ab39"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map