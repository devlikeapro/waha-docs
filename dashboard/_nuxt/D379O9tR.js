import{c as re,g as ce,u as Y,s as de,C as V,W as ue}from"./5bUwhh1r.js";import Z from"./Bt-UuASH.js";import{W as pe,_ as me,a as Q,b as ve}from"./Cy-1Xf2O.js";import fe from"./CHL0Xjl6.js";import _e from"./BmYCT7GH.js";import he from"./CPVyQjzE.js";import ge from"./_V5lwTYI.js";import we from"./Q-7BIses.js";import ye from"./DJYKHze6.js";import{c as N,t as y,L as P,M as be,N as T,_ as ee,v as $,x as n,y as te,i as Ce,O as oe,P as G,z as l,Q as xe,R as Se,r as U,o as Ee,S as z,H as X,B as j,A as C,T as J,U as ke,C as De,D as Ne,V as Te}from"./6TK3dpqb.js";import $e from"./C1e-EHdu.js";import"./BdkX2sY1.js";import"./CODKawlF.js";import"./iA9qGN45.js";import"./DYZjTh-e.js";import"./BzRjU00u.js";import"./a_8tan_y.js";import"./D5WOBDns.js";import"./DVL-kLiB.js";import"./BSh_SL2I.js";import"./_IFE28sr.js";import"./Bcn8N-hA.js";import"./QRPsWnVt.js";import"./PXoplSZP.js";import"./BMxkOV6o.js";import"./MTzeOnTr.js";import"./DcWJf-qQ.js";import"./RLeQ_jAe.js";import"./Bg9aF3CB.js";import"./BDDGvBbY.js";import"./o_5UEg1K.js";import"./CQSdC3Rp.js";import"./SEC_iNFa.js";import"./Bktt6nQ0.js";import"./DGd6wErE.js";import"./B0Z5NA_-.js";import"./fz2APyno.js";function Re(r){return new Date(r).toLocaleTimeString(void 0,{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})+"."+String(new Date(r).getMilliseconds()).padStart(3,"0")}const Ie={__name:"EventTag",props:["event"],setup(r){const c=r,h=N(()=>pe[c.event]||"rgb(114,166,234)"),d=N(()=>({background:"transparent",border:"2px solid rgb(66, 75, 87)",color:h.value,"font-size":"0.9rem"})),t={"session.status":"session.status 🖥️",message:"message ✉️","message.any":"message.any ✉️","message.ack":"message.ack 👀"},v=N(()=>t[c.event]||c.event);return(m,i)=>{const f=ye;return y(),P(f,{style:be(T(d)),value:T(v)},null,8,["style","value"])}}},Ve={class:"truncate"},Be={__name:"EventDetail",props:["data"],setup(r){const c=r,h=N(()=>{var i,f,o,b,u;const t=c.data.payload,v=c.data,m=c.data.event;switch(m){case"session.status":return[t.status,(i=v.me)==null?void 0:i.id,(f=v.me)==null?void 0:f.pushName];case"message":case"message.any":case"message.ack":case"message.reaction":return[t.id,t.body,m==="message.ack"?t.ackName:null,m==="message.ack"?null:(o=t.reaction)==null?void 0:o.text,(b=t.media)!=null&&b.url?"🖼":null];case"engine.event":return[t.event,JSON.stringify(t.data)];case"presence.update":return[t.id,(u=t.presences)==null?void 0:u[0].lastKnownPresence];default:return[]}}),d=N(()=>h.value.filter(t=>t!=null).join(" | "));return(t,v)=>(y(),$("div",Ve,[n("code",null,te(T(d)),1)]))}},Oe=ee(Be,[["__scopeId","data-v-eda98894"]]),Ae={class:"flex gap-2"},Ue={style:{"margin-top":"-0.75rem"}},Le={style:{"max-width":"100%"}},Me={__name:"EventDataViewer",props:["data"],setup(r){const c=r,h=N(()=>{const t={...c.data};return delete t._json,{id:t.id,session:t.session,event:t.event,payload:t.payload,...t}});async function d(t){await navigator.clipboard.writeText(JSON.stringify(h.value,null,2)),t.preventDefault()}return(t,v)=>{const m=Z,i=Ce("vue-json-pretty"),f=oe("tooltip");return y(),$("div",Ae,[n("div",Ue,[G(l(m,{rounded:"",text:"",icon:"pi pi-copy",severity:"secondary",onClick:v[0]||(v[0]=o=>d(o))},null,512),[[f,{value:"Copied to clipboard"},void 0,{focus:!0,bottom:!0}]])]),n("div",Le,[l(i,{data:T(h),deep:2,showLine:!1,showIcon:!0,theme:"dark"},null,8,["data"])])])}}},je={key:0,class:"pi pi-angle-down"},Fe={key:1,class:"pi pi-angle-up"},He={__name:"expand",props:["rows","data"],setup(r){const c=r,h=N(()=>{var d;return!((d=c.rows)!=null&&d[c.data.id])});return(d,t)=>T(h)?(y(),$("i",je)):(y(),$("i",Fe))}};var ne={exports:{}};(function(r,c){(function(h,d){r.exports=d()})(re,function(){return function h(d,t,v){var m=window,i="application/octet-stream",f=v||i,o=d,b=!t&&!v&&o,u=document.createElement("a"),g=function(e){return String(e)},_=m.Blob||m.MozBlob||m.WebKitBlob||g,w=t||"download",x,S;if(_=_.call?_.bind(m):Blob,String(this)==="true"&&(o=[o,f],f=o[0],o=o[1]),b&&b.length<2048&&(w=b.split("/").pop().split("?")[0],u.href=b,u.href.indexOf(b)!==-1)){var E=new XMLHttpRequest;return E.open("GET",b,!0),E.responseType="blob",E.onload=function(e){h(e.target.response,w,i)},setTimeout(function(){E.send()},0),E}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(o))if(o.length>1024*1024*1.999&&_!==g)o=F(o),f=o.type||i;else return navigator.msSaveBlob?navigator.msSaveBlob(F(o),w):R(o);else if(/([\x80-\xff])/.test(o)){var k=0,O=new Uint8Array(o.length),L=O.length;for(k;k<L;++k)O[k]=o.charCodeAt(k);o=new _([O],{type:f})}x=o instanceof _?o:new _([o],{type:f});function F(e){var s=e.split(/[:;,]/),p=s[1],A=s[2]=="base64"?atob:decodeURIComponent,H=A(s.pop()),M=H.length,I=0,D=new Uint8Array(M);for(I;I<M;++I)D[I]=H.charCodeAt(I);return new _([D],{type:p})}function R(e,s){if("download"in u)return u.href=e,u.setAttribute("download",w),u.className="download-js-link",u.innerHTML="downloading...",u.style.display="none",document.body.appendChild(u),setTimeout(function(){u.click(),document.body.removeChild(u),s===!0&&setTimeout(function(){m.URL.revokeObjectURL(u.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,i)),window.open(e)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=e),!0;var p=document.createElement("iframe");document.body.appendChild(p),!s&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,i)),p.src=e,setTimeout(function(){document.body.removeChild(p)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(x,w);if(m.URL)R(m.URL.createObjectURL(x),!0);else{if(typeof x=="string"||x.constructor===g)try{return R("data:"+f+";base64,"+m.btoa(x))}catch{return R("data:"+f+","+encodeURIComponent(x))}S=new FileReader,S.onload=function(e){R(this.result)},S.readAsDataURL(x)}return!0}})})(ne);var We=ne.exports;const Pe=ce(We),B=r=>(De("data-v-850776fb"),r=r(),Ne(),r),ze={class:"mb-4"},Je=B(()=>n("h5",{class:"flex align-items-center gap-1"},[n("i",{class:"pi pi-eye"}),n("span",{class:"mr-1"}," Event Monitor ")],-1)),Ge={class:"m-0"},Ke=B(()=>n("a",{target:"_blank",href:"https://waha.devlike.pro/docs/how-to/webhooks/#events"}," WAHA Events ",-1)),qe=B(()=>n("br",null,null,-1)),Qe=B(()=>n("b",null,"development",-1)),Xe=B(()=>n("b",null,"debugging",-1)),Ye={class:"pi pi-info-circle"},Ze={class:"flex justify-content-between align-items-center flex-column sm:flex-row gap-2 sm:gap-0"},et={class:"flex flex-column sm:flex-row gap-2"},tt={class:"flex gap-2"},ot={class:"flex align-items-center justify-content-center"},nt={class:"flex justify-content-between flex-column sm:flex-row gap-2 sm:gap-2"},st={class:"p-4 text-center text-se"},at=B(()=>n("span",null," Listening for new events... ",-1)),lt=B(()=>n("i",{class:"pi pi-spin pi-spinner"},null,-1)),it={class:"event-viewer"},rt={__name:"EventTable",setup(r){const c=xe(),h=Y(),{servers:d}=Se(h),t=U(null);Ee(async()=>{var p;for(let A=0;A<30;A++)d.value.length===0&&await de(100);d.value.length>0&&(t.value=(p=d.value)==null?void 0:p[0].id,S())});const v=U([]),m=Q.filter(e=>e!=="engine.event"),i=U({global:{value:null,matchMode:z.CONTAINS},event:{value:m,matchMode:z.IN},session:{value:null,matchMode:z.CONTAINS}}),f=["_json"],o=U(!1);function b(e){e.timestamp=e.timestamp||Date.now(),e._json=e._json||JSON.stringify(e),v.value.push(e)}X(t,()=>{o.value&&(L(),S())});const u=N(()=>{var e;return i.value.event.value?(e=i.value.event.value)==null?void 0:e.includes("engine.event"):!0});X(u,()=>{o.value&&(L(),S())});let g=null;const _=U(V.DISCONNECTED),w=U({}),x=e=>{const s=w.value[e.data.id]===void 0||!w.value[e.data.id],p={...w.value};s?p[e.data.id]=!0:delete p[e.data.id],w.value={...p}},S=()=>{o.value=!0,E()};function E(){if(!o.value)return;if(!t.value){c.add({severity:"warn",summary:"No server selected",detail:"Please select a server to start listening"});return}if(g){c.add({severity:"warn",summary:"Already listening",detail:"Please stop the current listener before starting a new one or refresh the page"});return}const e=h.getServer(t.value),s=["*"];u.value&&s.push("engine.event"),g=new ue(e,s),g.connect(),_.value=V.CONNECTING,g.on("open",()=>{_.value=V.CONNECTED}),g.on("close",()=>{_.value=V.DISCONNECTED,k()}),g.on("error",()=>{_.value=V.ERROR,k()}),g.on("event",b)}function k(){O(),setTimeout(()=>{E()},300)}function O(){g==null||g.stop(),g=null}const L=()=>{o.value=!1,O(),_.value=V.DISCONNECTED},F=()=>{v.value=[]};function R(e){Pe(JSON.stringify(v.value,null,2),"events.json","text/plain")}return(e,s)=>{const p=Z,A=ve,H=fe,M=_e,I=he,D=ge,se=we,ae=Ie,le=Oe,ie=$e,K=oe("tooltip");return y(),$(J,null,[n("div",ze,[Je,n("div",null,[n("p",Ge,[j(" Monitor "),Ke,j(" from your sessions in real-time! "),qe,j(" You can use Event Monitor for "),Qe,j(" and "),Xe,j(" purposes. "),G(n("i",Ye,null,512),[[K,"Displays only new incoming events in real-time; no historical data is available."]])])])]),l(ie,{value:v.value,dataKey:"id",expandedRows:w.value,"onUpdate:expandedRows":s[4]||(s[4]=a=>w.value=a),rowHover:!0,filters:i.value,"onUpdate:filters":s[5]||(s[5]=a=>i.value=a),filterDisplay:"row",globalFilterFields:f,showGridlines:"",style:{"white-space":"nowrap"},sortField:"timestamp",sortOrder:-1,resizableColumns:"",class:"p-datatable--clickable",onRowClick:x},{header:C(()=>[n("div",Ze,[n("div",et,[n("div",tt,[o.value?(y(),P(p,{key:1,label:"Pause",icon:"pi pi-pause",severity:"secondary",onClick:L})):(y(),P(p,{key:0,label:"Listen",icon:"pi pi-play",severity:"success",onClick:S})),l(A,{placeholder:"Select Server",modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=a=>t.value=a),showClear:!1},null,8,["modelValue"])]),n("div",ot,[l(me,{status:_.value},null,8,["status"])])]),n("div",nt,[G(l(p,{icon:"pi pi-download",label:"Download",onClick:s[1]||(s[1]=a=>R(a))},null,512),[[K,"Download all events as JSON"]]),l(p,{label:"Clean Events",icon:"pi pi-trash",severity:"secondary",onClick:F}),l(I,{iconPosition:"left"},{default:C(()=>[l(H,{class:"pi pi-search"}),l(M,{modelValue:i.value.global.value,"onUpdate:modelValue":s[2]||(s[2]=a=>i.value.global.value=a),placeholder:"Search in data",style:{width:"100%"}},null,8,["modelValue"])]),_:1})])])]),empty:C(()=>[n("div",st,[_.value===T(V).CONNECTED?(y(),$(J,{key:0},[at,lt],64)):(y(),$(J,{key:1},[o.value?ke("",!0):(y(),P(p,{key:0,label:"Listen",icon:"pi pi-play",severity:"success",onClick:S}))],64))])]),expansion:C(a=>[n("div",it,[l(Me,{data:a.data},null,8,["data"])])]),default:C(()=>[l(D,{style:{width:"3rem"}},{body:C(({data:a})=>[l(He,{rows:w.value,data:a},null,8,["rows","data"])]),_:1}),l(D,{field:"event",header:"Event","show-filter-menu":!1},{filter:C(({filterModel:a,filterCallback:q})=>[l(se,{id:"events",modelValue:a.value,"onUpdate:modelValue":W=>a.value=W,placeholder:"Any","max-selected-labels":1,selectedItemsLabel:"{0} events",onChange:W=>q(),options:T(Q),showClear:!0,required:!1},null,8,["modelValue","onUpdate:modelValue","onChange","options"])]),body:C(({data:a})=>[l(ae,{event:a.event},null,8,["event"])]),_:1}),l(D,{field:"session",header:"Session","show-filter-menu":!1},{filter:C(({filterModel:a,filterCallback:q})=>[l(M,{modelValue:i.value.session.value,"onUpdate:modelValue":s[3]||(s[3]=W=>i.value.session.value=W),placeholder:"Session",style:{width:"100%"}},null,8,["modelValue"])]),_:1}),l(D,{field:"timestamp",header:"Time",sortable:""},{body:C(({data:a})=>[n("span",null,te(T(Re)(a.timestamp)),1)]),_:1}),l(D,{header:"Detail","show-filter-menu":!1},{body:C(({data:a})=>[l(le,{data:a},null,8,["data"])]),_:1})]),_:1},8,["value","expandedRows","filters"])],64)}}},ct=ee(rt,[["__scopeId","data-v-850776fb"]]),dt={class:"grid"},ut={class:"col-12"},pt={class:"card"},Qt={__name:"event-monitor",setup(r){const c=Y();return Te(()=>{c.refresh()}),(h,d)=>(y(),$("div",dt,[n("div",ut,[n("div",pt,[l(ct)])])]))}};export{Qt as default};
