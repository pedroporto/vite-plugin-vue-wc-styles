"use strict";const a=(l,r)=>{const{moduleGraph:s,ws:t}=l,e=s.getModuleById(r);e&&(s.invalidateModule(e),t&&t.send({type:"full-reload",path:"*"}))},i=()=>{let l,r="";const s=[];return{name:"vue-wc-styles",enforce:"post",apply:"build",generateBundle:(t,e)=>{let o="";Object.keys(e).forEach(n=>{const c=e[n];c.type==="asset"&&c.fileName.includes(".css")&&(o+=c.source)}),Object.keys(e).forEach(n=>{const c=e[n];if(c.type==="chunk"&&c.code.includes("{{ CUSTOM_CSS_PLACEHOLDER }}")){const u=c.code.replace('"{{ CUSTOM_CSS_PLACEHOLDER }}"',JSON.stringify(o));c.code=u}})},configureServer(t){l=t},handleHotUpdate(){s.forEach(t=>{const e=l.moduleGraph.getModuleById(t);e&&l.reloadModule(e)})},transform(t,e){if(l){if(e.includes(".scss")){const o=t.match(/const __vite__css = [`"]([^`"]*)[`"]/s);if(o){const n=o[1];r+=n,s.includes(e)||s.push(e)}}t.includes("{{ CUSTOM_CSS_PLACEHOLDER }}")&&(t=t.replace("{{ CUSTOM_CSS_PLACEHOLDER }}",r),a(l,e),s.includes(e)||s.push(e))}return t}}};module.exports=i;
