!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=2)}([function(e){e.exports=[{id:"XWaQXcbk0",title:"JavaScript essentials",body:"Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",priority:2},{id:"pkXzyRp1P",title:"Refresh HTML and CSS",body:"Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",priority:1},{id:"QMom9q4Ku",title:"Get comfy with Frontend frameworks",body:"First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",priority:1},{id:"k2k0UrjZG",title:"Winter clothes",body:"Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",priority:0}]},function(e,t,o){},function(e,t,o){"use strict";o.r(t);o(1);const n={LOW:0,NORMAL:1,HIGH:2},r="edit",i="delete",s="expand_more",a="expand_less",c="delete-note",d="edit-note",l="increase-priority",u="decrease-priority",p={0:{id:0,value:0,name:"Low"},1:{id:1,value:1,name:"Normal"},2:{id:2,value:2,name:"High"}};class m{static generateUniqueId(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}static getPriorityName(e){let t=Object.values(n),o=p[e].id;if(t.includes(o))return p[e].name}constructor(e=[]){this._notes=e}saveNote(e){this._notes.push(e)}get notes(){return this._notes}findNoteById(e){return this._notes.find(t=>t.id===e)}updateNotePriority(e,t){const o=this.findNoteById(e);if(o)return o.priority=t,o}filterNotesByQuery(e=""){let t=[];for(const o of this._notes){const n=o.title.toLowerCase().includes(e.toLowerCase()),r=o.body.toLowerCase().includes(e.toLowerCase());(n||r)&&t.push(o)}return t}filterNotesByPriority(e){const t=[];for(const o of this._notes)o.priority===e&&t.push(o);return t}updateNoteContent(e,t){let o=this.findNoteById(e);if(o){for(let e in t)o[e]=t[e];return o}}deleteNote(e){this._notes=this._notes.filter(t=>t.id!==e)}}var f=o(0);const y=({id:e,title:t,body:o,priority:n})=>{const r=document.createElement("li");r.classList.add("note-list__item"),r.dataset.id=e;const i=document.createElement("div");i.classList.add("note");const s=b(t,o),a=h(n);return i.append(s,a),r.append(i),r},b=(e,t)=>{const o=document.createElement("div");o.classList.add("note_content");const n=document.createElement("h2");n.classList.add("note__title"),n.textContent=e;const r=document.createElement("p");return r.classList.add("note__body"),r.textContent=t,o.append(n,r),o},h=e=>{const t=document.createElement("footer");t.classList.add("note__footer");const o=document.createElement("section");o.classList.add("note__section");const n=g(u,s),p=g(l,a),f=document.createElement("span");f.classList.add("note__priority"),f.textContent=`Priority: ${m.getPriorityName(e)}`;const y=o.cloneNode(!1),b=g(d,r),h=g(c,i);return o.append(n,p,f),y.append(b,h),t.append(o,f,y),t},g=(e,t)=>{const o=document.createElement("button");o.classList.add("action"),o.dataset.action=e;const n=document.createElement("i");return n.classList.add("material-icons","action__icon"),n.textContent=t,o.append(n),o},_=(e,t)=>{const o=t.map(e=>y(e));return e.innerHTML="",e.append(...o),e},v=new m(f),L=(()=>({list:document.querySelector(".note-list"),inputSearchForm:document.querySelector(".search-form__input"),form:document.querySelector(".note-editor")}))(),N=L.form.querySelector("input"),S=L.form.querySelector("textarea"),E=(e,t)=>{const o=y(t);e.append(o)},w=e=>{const t=e.target,o=v.filterNotesByQuery(t.value);L.list.innerHTML="",_(L.list,o)};_(L.list,f),L.form.addEventListener("submit",e=>{e.preventDefault();const t=N.value.trim(),o=S.value.trim();if(""===t||""===o)return alert("Необходимо заполнить все поля!");const r={id:`${m.generateUniqueId()}`,title:`${t}`,body:`${o}`,priority:n.LOW};v.saveNote(r),L.form.reset(),E(L.list,r)}),L.inputSearchForm.addEventListener("focus",e=>{e.target.oninput=w}),L.list.addEventListener("click",e=>{const t=e.target,o=t.nodeName,n=t.textContent;"I"===o&&"delete"===n&&t.closest(".note-list__item").remove()}),L.list.addEventListener("click",({target:e})=>{if("BUTTON"!==e.parentNode.nodeName)return;switch(e.parentNode.dataset.action){case c:console.log("DELETE");break;case d:console.log("EDIT");break;case l:console.log("INCREASE_PRIORITY");break;case u:console.log("DECREASE_PRIORITY");break;default:alert("NOT A BUTTON")}}),console.log(L.list)}]);
//# sourceMappingURL=bundle.js.map