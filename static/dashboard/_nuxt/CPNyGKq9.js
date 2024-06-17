import{u as F,a as me,_ as ve,l as ce}from"./Hh9f8yKD.js";import W from"./-ljNKFgD.js";import Ie from"./mIuDQZZ3.js";import te from"./86vxX2CF.js";import Ne from"./T3K0J0jK.js";import Re from"./BLIDc29b.js";import{c as k,M as g,t as c,P as T,O as D,v as S,N as q,z as o,y as I,r as w,A as u,x as e,X as le,R as j,U as fe,B as R,Y as Me,W as Le,_ as qe,o as _e,Z as be,$ as se,C as Oe,D as Ee,a0 as he,Q as ge,G as Ae,i as Pe,a1 as je,S as Fe,L as We,V as ne,a2 as He}from"./D8ZcFDtt.js";import ze from"./j9gGEQ7c.js";import Ge from"./B6RHG7Hv.js";import Je from"./BHQMsfIX.js";import Ke from"./fri30qoR.js";import{a as ye,_ as Se,u as $e}from"./B4MhIwOf.js";import ue from"./bVxCi-vH.js";import Qe from"./BOy_UrD7.js";import Ye from"./uF64Cm4B.js";import Xe from"./BW7FZp81.js";import Ze from"./W_FOL18v.js";import we from"./DRA93YmO.js";import es from"./D9MBE91a.js";import ss from"./DSgBDFZN.js";import os from"./CpMnYjOg.js";import xe from"./DRKcrxdX.js";import ke from"./n6hKQMJ9.js";import ns from"./BTOX3u9j.js";import ts from"./BkrRmnkr.js";import ls from"./BiYJeNR8.js";const Ce={__name:"SessionChip",props:{session:Object,image:String},setup(n){const t=n,s=k(()=>{if(t.session.me)return`${t.session.me.pushName} (${t.session.me.id})`});return(a,d)=>{const i=Re;return g(s)?(c(),T(i,{key:0,label:g(s),image:n.image},null,8,["label","image"])):D("",!0)}}},Ve={__name:"RefreshButton",props:["refreshing"],setup(n){const t=n,s=k(()=>t.refreshing?"pi pi-refresh pi-spin":"pi pi-refresh");return(a,d)=>{const i=W;return c(),T(i,{icon:g(s),rounded:"",text:"",disabled:n.refreshing},null,8,["icon","disabled"])}}},is=["src"],as={__name:"Base64Img",props:{data:String,mimetype:String},setup(n){const t=n,s=k(()=>`data:${t.mimetype};base64, ${t.data}`);return(a,d)=>(c(),S("img",{src:s.value,style:{"max-width":"100%"}},null,8,is))}};function rs(n){return new Promise(t=>setTimeout(t,n))}const ds={key:2,style:{"background-color":"#f8f9fa",padding:"1rem",color:"red","white-space":"pre-wrap"}},De={__name:"SessionScreenshot",props:{session:Object},setup(n,{expose:t}){const s=F(),a=n,{data:d,pending:i,error:m,refresh:r}=me(`session-screenshot-${a.session.server.id}-${a.session.name}`,async()=>(await rs(1e3),await s.getScreenshot(a.session.server.id,a.session.name)));return t({refresh:r}),(_,v)=>{const y=Ge,x=Je,b=as;return c(),S(q,null,[g(i)?(c(),S(q,{key:0},[o(y,{mode:"indeterminate",style:{height:"3px"}}),!g(d)&&!g(m)?(c(),T(x,{key:0,width:"100%",height:"20rem"})):D("",!0)],64)):D("",!0),g(d)?(c(),T(b,{key:1,data:g(d).data,mimetype:g(d).mimetype},null,8,["data","mimetype"])):D("",!0),g(m)?(c(),S("pre",ds,""+I(g(m).cause.response.data.message||g(m).cause.response.data||g(m))+`
  `,1)):D("",!0)],64)}}},cs={class:"",style:{"min-width":"20rem"}},us={class:"flex justify-content-center align-items-center"},ps=e("h5",{class:"m-0"},"Screenshot",-1),ms={class:"m-auto w-full"},vs={__name:"ScreenshotButton",props:["disabled","session"],setup(n){const t=w(null),s=w(null),a=i=>{t.value.toggle(i)},d=()=>{s.value.refresh()};return(i,m)=>{const r=W,_=Ve,v=De,y=Ke;return c(),S(q,null,[o(r,{disabled:n.disabled,type:"button",icon:"pi pi-camera",onClick:a,rounded:"",outlined:""},null,8,["disabled"]),o(y,{ref_key:"op",ref:t,appendTo:"body",showCloseIcon:!0},{default:u(()=>[e("div",cs,[e("div",us,[ps,o(_,{onClick:d})]),e("div",ms,[o(v,{ref_key:"screenshot",ref:s,session:n.session},null,8,["session"])])])]),_:1},512)],64)}}},fs={class:"ml-1"},_s={key:1},bs={class:"ml-1"},Te={__name:"ServerDropdown",props:le({showClear:Boolean,placeholder:String,required:Boolean,invalid:Boolean,disabled:Boolean},{server:{},serverModifiers:{}}),emits:["update:server"],setup(n){const t=j(n,"server"),s=F();return(a,d)=>{const i=ye,m=ue;return c(),T(m,{optionValue:"id",modelValue:t.value,"onUpdate:modelValue":d[0]||(d[0]=r=>t.value=r),options:g(s).servers,onChange:d[1]||(d[1]=r=>a.$emit("change",t.value)),placeholder:n.placeholder,class:"p-column-filter",showClear:n.showClear,required:n.required,invalid:n.invalid,disabled:n.disabled},{value:u(r=>[r.value?(c(),S(q,{key:0},[o(i,{connected:g(s).getServer(r.value).connected},null,8,["connected"]),e("span",fs,I(g(s).getServer(r.value).name),1)],64)):(c(),S("span",_s,I(r.placeholder),1))]),option:u(r=>[o(i,{connected:r.option.connected},null,8,["connected"]),e("span",bs,I(r.option.name)+" ("+I(r.option.connection.url)+") ",1)]),_:1},8,["modelValue","options","placeholder","showClear","required","invalid","disabled"])}}},hs={class:"p-dialog-title flex gap-2 align-items-center"},gs=e("span",null,"(",-1),ys={class:"ml-1"},Ss=e("span",null,")",-1),$s=["disabled"],ws=e("i",{class:"pi pi-refresh"},null,-1),xs=[ws],Ue={__name:"SessionHeader",props:{session:Object,refresh:Boolean},setup(n){const t=n,s=F(),{refreshing:a}=fe(s),d=k(()=>t.session.server.id?t.session.server:s.getServer(t.session.server));async function i(){await s.refresh()}return(m,r)=>{var x;const _=Se,v=ye,y=ve;return c(),S("div",hs,[e("span",null,I((x=n.session)==null?void 0:x.name),1),o(_,{status:n.session.status},null,8,["status"]),e("div",null,[gs,o(v,{connected:d.value.connected},null,8,["connected"]),e("span",ys,I(d.value.name),1),Ss]),n.refresh?(c(),S("button",{key:0,onClick:r[0]||(r[0]=b=>i()),class:"p-link layout-topbar-button",disabled:g(a)},xs,8,$s)):D("",!0),o(y,{refreshing:g(a)},null,8,["refreshing"])])}}},ks={class:"-mt-4 p-0 line-height-3 block",style:{"font-family":"monaco, Consolas, 'Lucida Console', monospace"}},Cs={__name:"CodeHighlight",props:["invalid"],setup(n){const t=n,s=k(()=>t.invalid?"p-invalid p-component p-inputtext":"");return(a,d)=>(c(),S("pre",{class:Le(["border-round surface-ground text-900 p-5 overflow-auto",s.value])},[R("        "),e("code",ks,[Me(a.$slots,"default")])],2))}},pe=n=>(Oe("data-v-ca11cfb1"),n=n(),Ee(),n),Vs={class:"h-full flex flex-column"},Ds={class:"flex justify-content-center align-items-center"},Ts=pe(()=>e("h5",{class:"m-0"},"Request",-1)),Us={class:"flex flex-column justify-content-between h-full"},Bs={class:"flex flex-column gap-2"},Is={class:"flex gap-2"},Ns={class:"text-center"},Rs=pe(()=>e("div",{class:"mb-2"},"Body",-1)),Ms={class:"text-center mt-2"},Ls={class:"flex flex-column h-full"},qs={class:"flex justify-content-center align-items-center"},Os=pe(()=>e("h5",{class:"m-0"},"Response",-1)),Es={__name:"SessionRequestResponse",props:["session"],setup(n){const t=F(),s=n,a=w(null),d=w("POST"),i=w("/api/sendText"),m=w(""),r=w(!1),_=w(!1);function v($){return JSON.stringify($,null,2)}function y($){try{return JSON.parse($)}catch{return $}}const x=k(()=>({method:d.value,uri:i.value,params:void 0,body:y(m.value)})),b=["GET","POST","PUT","DELETE","PATCH"];async function U($){await navigator.clipboard.writeText(a.value),$.preventDefault()}async function B($){await navigator.clipboard.writeText(v(x.value)),$.preventDefault()}async function O(){try{_.value=!1,r.value=!0;const $=await t.callServerAPI(s.session.server.id,x.value);a.value=v($)}catch($){_.value=!0,$.response?a.value=v($.response.data):a.value=v($)}finally{r.value=!1}}return _e(()=>{const $={chatId:"11111111111@c.us",text:"Hi there!",session:s.session.name};m.value=v($),a.value="..."}),($,C)=>{const E=W,H=ue,z=te,Y=Xe,G=Ze,A=Cs,V=be("tooltip");return c(),S(q,null,[e("div",null,[e("div",Vs,[e("div",Ds,[Ts,se(o(E,{rounded:"",text:"",tabindex:0,icon:"pi pi-copy",onClick:C[0]||(C[0]=l=>B(l))},null,512),[[V,{value:"Copied to clipboard"},void 0,{focus:!0,bottom:!0}]])]),e("div",Us,[e("div",Bs,[e("div",Is,[o(H,{modelValue:d.value,"onUpdate:modelValue":C[1]||(C[1]=l=>d.value=l),options:b},null,8,["modelValue"]),o(z,{type:"text",class:"w-full",modelValue:i.value,"onUpdate:modelValue":C[2]||(C[2]=l=>i.value=l),placeholder:"API Endpoint"},null,8,["modelValue"])]),e("div",Ns,[Rs,o(Y,{modelValue:m.value,"onUpdate:modelValue":C[3]||(C[3]=l=>m.value=l),rows:"8",class:"w-full",placeholder:"Request"},null,8,["modelValue"])])]),e("div",Ms,[o(E,{onClick:O,loading:r.value,label:"Send",icon:"pi pi-send","icon-pos":"right"},null,8,["loading"])])])])]),o(G),e("div",null,[e("div",Ls,[e("div",qs,[Os,se(o(E,{rounded:"",text:"",tabindex:0,icon:"pi pi-copy",onClick:C[4]||(C[4]=l=>U(l))},null,512),[[V,{value:"Copied to clipboard"},void 0,{focus:!0,bottom:!0}]])]),o(A,{class:"m-0 p-4 pretty",invalid:_.value},{default:u(()=>[R(I(a.value),1)]),_:1},8,["invalid"])])])],64)}}},As=qe(Es,[["__scopeId","data-v-ca11cfb1"]]),Ps={class:"grid pt-4"},js={class:"col-12 sm:col-6 h-full"},Fs={class:"grid"},Ws={class:"col-12"},Hs={class:""},zs={class:"flex justify-content-center align-items-center"},Gs={class:"col-12"},Js={class:""},Ks={class:"flex justify-content-center align-items-center"},Qs=e("h5",{class:"m-0"},"Screenshot",-1),Ys={class:"m-auto w-full"},Xs={class:"col-12 sm:col-6 h-full card"},Zs={__name:"SessionControl",props:["session"],setup(n){const t=F(),s=n,a=w(null),d=()=>{a.value.refresh()},i=w(null);return _e(()=>{var m,r;(r=(m=s.session)==null?void 0:m.me)!=null&&r.id&&t.getProfilePicture(s.session.server.id,s.session.name,s.session.me.id).then(_=>{i.value=_.profilePictureURL})}),(m,r)=>{const _=Ce,v=Ve,y=De,x=As;return c(),S("div",Ps,[e("div",js,[e("div",Fs,[e("div",Ws,[e("div",Hs,[e("div",zs,[n.session.me?(c(),T(_,{key:0,session:n.session,image:g(i)},null,8,["session","image"])):D("",!0)])])]),e("div",Gs,[e("div",Js,[e("div",Ks,[Qs,o(v,{onClick:d})]),e("div",Ys,[o(y,{ref_key:"screenshot",ref:a,session:n.session},null,8,["session"])])])])])]),e("div",Xs,[o(x,{session:n.session},null,8,["session"])])])}}},eo={__name:"SessionControlDialog",props:{visible:{},visibleModifiers:{},session:{},sessionModifiers:{}},emits:["update:visible","update:session"],setup(n){const t=j(n,"visible"),s=j(n,"session");return he(),(a,d)=>{const i=Ue,m=Zs,r=we;return c(),T(r,{visible:t.value,"onUpdate:visible":d[0]||(d[0]=_=>t.value=_),modal:!0,maximizable:""},{header:u(()=>[o(i,{session:s.value},null,8,["session"])]),default:u(()=>[o(m,{session:s.value},null,8,["session"])]),_:1},8,["visible"])}}},so={class:"field"},oo=e("label",{for:"url"},"URL",-1),no={class:"field mb-4"},to=e("label",{for:"events"},"Events",-1),lo=e("div",{class:"font-bold mb-2"},"Retries",-1),io={class:"flex gap-3"},ao={class:"field"},ro=e("label",{for:"retries-attempts"},"Attempts",-1),co=e("span",{class:"pi pi-plus"},null,-1),uo=e("span",{class:"pi pi-minus"},null,-1),po={class:"field"},mo=e("label",{for:"retries-delay-seconds"},"Delay, seconds",-1),vo=e("span",{class:"pi pi-plus"},null,-1),fo=e("span",{class:"pi pi-minus"},null,-1),_o={class:"field"},bo=e("label",{for:"hmac"},"HMAC Key (optional)",-1),ho={__name:"SessionWebhook",props:le({disabled:Boolean,index:Number},{webhook:{},webhookModifiers:{}}),emits:["update:webhook"],setup(n){const t=j(n,"webhook"),s=n,a=["session.status","message","message.any","message.reaction","message.ack","message.revoked","state.change","group.join","group.leave","presence.update","poll.vote","poll.vote.failed"];return(d,i)=>{const m=te,r=ns,_=ts,v=W,y=xe,x=ke;return c(),T(x,{activeIndex:0},{default:u(()=>[o(y,{header:`Webhook ${s.index+1}`},{default:u(()=>[e("div",so,[oo,o(m,{id:"url",modelValue:t.value.url,"onUpdate:modelValue":i[0]||(i[0]=b=>t.value.url=b),modelModifiers:{trim:!0},required:"true",disabled:n.disabled},null,8,["modelValue","disabled"])]),e("div",no,[to,o(r,{id:"events",modelValue:t.value.events,"onUpdate:modelValue":i[1]||(i[1]=b=>t.value.events=b),options:a,placeholder:"Select Events","max-selected-labels":1,selectedItemsLabel:"{0} events selected",disabled:n.disabled},null,8,["modelValue","disabled"]),e("ul",null,[(c(!0),S(q,null,ge(t.value.events,b=>(c(),S("li",{key:b},I(b),1))),128))])]),e("div",null,[lo,e("div",io,[e("div",ao,[ro,o(_,{modelValue:t.value.retries.attempts,"onUpdate:modelValue":i[2]||(i[2]=b=>t.value.retries.attempts=b),inputId:"retries-delay-attempts",showButtons:"",buttonLayout:"horizontal",min:1,step:1,disabled:n.disabled},{incrementbuttonicon:u(()=>[co]),decrementbuttonicon:u(()=>[uo]),_:1},8,["modelValue","disabled"])]),e("div",po,[mo,o(_,{modelValue:t.value.retries.delaySeconds,"onUpdate:modelValue":i[3]||(i[3]=b=>t.value.retries.delaySeconds=b),inputId:"retries-delay-seconds",showButtons:"",buttonLayout:"horizontal",min:1,step:1,disabled:n.disabled},{incrementbuttonicon:u(()=>[vo]),decrementbuttonicon:u(()=>[fo]),_:1},8,["modelValue","disabled"])])])]),e("div",_o,[bo,o(m,{id:"hmac",modelValue:t.value.hmac.key,"onUpdate:modelValue":i[4]||(i[4]=b=>t.value.hmac.key=b),modelModifiers:{trim:!0},disabled:n.disabled},null,8,["modelValue","disabled"])]),o(v,{label:"Remove Webhook",icon:"pi pi-trash",text:"",onClick:i[5]||(i[5]=b=>d.$emit("remove")),severity:"warning",disabled:n.disabled},null,8,["disabled"])]),_:1},8,["header"])]),_:1})}}},go={class:"flex flex-column gap-2"},yo=e("div",null,[e("label",null,"Webhooks")],-1),So={key:0,class:"text-300 text-center"},$o={__name:"SessionWebhooksField",props:le({disabled:Boolean},{webhooks:{},webhooksModifiers:{}}),emits:["update:webhooks"],setup(n){const t=j(n,"webhooks");function s(){t.value.push({url:"https://httpbin.org/post",events:["session.status","message","message.reaction"],hmac:{key:null},retries:{delaySeconds:2,attempts:15}})}function a(d){t.value.splice(d,1)}return(d,i)=>{const m=ho,r=W;return c(),S("div",go,[yo,t.value.length===0?(c(),S("div",So," No webhooks configured ")):(c(!0),S(q,{key:1},ge(t.value,(_,v)=>(c(),T(m,{webhook:t.value[v],"onUpdate:webhook":y=>t.value[v]=y,index:v,onRemove:y=>a(v),disabled:n.disabled},null,8,["webhook","onUpdate:webhook","index","onRemove","disabled"]))),256)),e("div",null,[o(r,{label:"Add Webhook",icon:"pi pi-plus",text:"",onClick:s,severity:"secondary",disabled:n.disabled},null,8,["disabled"])])])}}},wo={class:"mb-2"},xo=e("b",null,"Server",-1),ko=e("b",null,"Name",-1),Co={class:"field"},Vo=e("label",{for:"server"},"Server",-1),Do={key:0,class:"p-invalid"},To={class:"field"},Uo=e("label",{for:"name"},"Name",-1),Bo={key:0,class:"p-invalid"},Io={key:0,class:"mb-4"},No=e("div",{class:"mb-3"},[e("label",null,"Engine Settings ")],-1),Ro={class:"flex flex-column gap-2"},Mo=e("div",null,[e("a",{href:"https://waha.devlike.pro/docs/engines/noweb",target:"_blank"},"Read more about NOWEB settings")],-1),Lo={class:"field"},qo={class:"field flex justify-content-between align-items-center"},Oo=e("div",null,[e("label",{for:"debug"},"Proxy")],-1),Eo={key:0,class:"card mb-4"},Ao={class:"field"},Po=e("label",{for:"proxy-server"},"Server",-1),jo={key:0,class:"p-invalid"},Fo={class:"flex gap-3"},Wo={class:"field w-full"},Ho=e("label",{for:"proxy-username"},"Username (optional)",-1),zo={class:"field w-full"},Go=e("label",{for:"proxy-password"},"Password (optional)",-1),Jo={class:"field flex justify-content-between align-items-center"},Ko=e("div",null,[e("label",{for:"debug"},"Debug Mode")],-1),Qo={class:"w-full flex flex-column gap-2"},Yo={class:"flex justify-content-end"},Xo={__name:"SessionDialog",props:le({mode:String},{visible:{},visibleModifiers:{},session:{},sessionModifiers:{}}),emits:["update:visible","update:session"],setup(n){var G,A;const t=j(n,"visible"),s=j(n,"session"),a=n,d=k(()=>a.mode==="new"),i=k(()=>a.mode==="view"),m=k(()=>a.mode==="start"),r=k(()=>i.value),_=k(()=>r.value||m.value),v=$e(),y=F(),x=k(()=>y.getServer(s.value.server)),b=k(()=>x.value.version.engine==="NOWEB");k(()=>x.value.version.engine==="WEBJS");const U=w(!!((A=(G=s.value.config)==null?void 0:G.proxy)!=null&&A.server));Ae(s,async(V,l)=>{var f,P;U.value=!!((P=(f=V.config)==null?void 0:f.proxy)!=null&&P.server)});const B=w(!1),O=w(!1),$=k(()=>{const V=ce.cloneDeep(s.value.config);return U.value||(V.proxy=void 0),V}),C=k(()=>{const V={...$.value};return b.value||delete V.noweb,{name:s.value.name,config:V}});async function E(){if(B.value=!0,!!s.value.name){try{O.value=!0,await v(y.startSession(s.value.server,C.value),"Session Started","Failed to start session")}finally{O.value=!1}s.value=void 0,H()}}function H(){B.value=!1,t.value=!1}const z=k(()=>m.value&&!["STOPPED","FAILED"].includes(s.value.status));async function Y(V){await navigator.clipboard.writeText(JSON.stringify({method:"POST",uri:"/api/sessions/start",body:C.value},null,2)),V.preventDefault()}return(V,l)=>{const f=Ue,P=es,M=Te,X=te,ie=ss,J=Pe("font-awesome-icon"),K=os,Q=xe,ae=ke,oe=$o,re=ls,Z=W,de=we,ee=be("tooltip");return c(),T(de,{visible:t.value,"onUpdate:visible":l[11]||(l[11]=h=>t.value=h),header:"Session",modal:!0,class:"p-fluid",maximizable:""},je({footer:u(()=>[e("div",Qo,[e("div",null,[z.value?(c(),T(P,{key:0,severity:"warn"},{default:u(()=>[R(" The session is in '"),e("b",null,I(s.value.status)+"'",1),R(" status! If you want to change config - please stop it first and run again. ")]),_:1})):D("",!0)]),e("div",Yo,[se(o(Z,{label:"Copy Request",text:"",tabindex:0,icon:"pi pi-copy",severity:"secondary",onClick:l[10]||(l[10]=h=>Y(h))},null,512),[[ee,{value:"Copied to clipboard"},void 0,{focus:!0,bottom:!0}]]),o(Z,{label:i.value?"Close":"Cancel",icon:"pi pi-times",text:"",severity:"secondary",onClick:H},null,8,["label"]),i.value?D("",!0):(c(),T(Z,{key:0,label:d.value?"Start New":"Start",icon:"pi pi-play",text:"",onClick:E,loading:O.value,disabled:z.value},null,8,["label","loading","disabled"]))])])]),default:u(()=>[e("div",wo,[m.value?(c(),T(P,{key:0,severity:"info"},{default:u(()=>[R(" To change the "),xo,R(" or "),ko,R(" - please logout from the session and run again. ")]),_:1})):D("",!0)]),e("div",Co,[Vo,o(M,{placeholder:"Select Server",modelValue:s.value.server,"onUpdate:modelValue":l[0]||(l[0]=h=>s.value.server=h),showClear:!1,required:!0,invalid:B.value&&!s.value.server,disabled:_.value},null,8,["modelValue","invalid","disabled"]),B.value&&!s.value.server?(c(),S("small",Do,"Server is required.")):D("",!0)]),e("div",To,[Uo,o(X,{id:"name",modelValue:s.value.name,"onUpdate:modelValue":l[1]||(l[1]=h=>s.value.name=h),modelModifiers:{trim:!0},required:"true",autofocus:"",invalid:B.value&&!s.value.name,disabled:!d.value},null,8,["modelValue","invalid","disabled"]),B.value&&!s.value.name?(c(),S("small",Bo,"Name is required.")):D("",!0)]),b.value?(c(),S("div",Io,[No,o(ae,{activeIndex:0},{default:u(()=>[o(Q,{header:"NOWEB"},{header:u(()=>[R("  "),o(ie,{value:"New"})]),default:u(()=>[e("div",Ro,[Mo,e("div",null,[se((c(),T(K,{modelValue:s.value.config.noweb.store.enabled,"onUpdate:modelValue":l[2]||(l[2]=h=>s.value.config.noweb.store.enabled=h),onLabel:"Store: Enabled",offLabel:"Store: Disabled",disabled:_.value},{icon:u(()=>[o(J,{icon:"fa-solid fa-folder",class:"mr-2"})]),_:1},8,["modelValue","disabled"])),[[ee,"Store contacts, chats, messages in the database, so you can get it in API"]])]),e("div",null,[se((c(),T(K,{modelValue:s.value.config.noweb.store.fullSync,"onUpdate:modelValue":l[3]||(l[3]=h=>s.value.config.noweb.store.fullSync=h),onLabel:"Store: Full Sync On",offLabel:"Store: Full Sync Off",disabled:_.value},{icon:u(()=>[o(J,{icon:"fa-solid fa-sync",class:"mr-2"})]),_:1},8,["modelValue","disabled"])),[[ee,`Sync all contacts, chats, messages from the phone at the start.
Otherwise the store can miss some information.`]])])])]),_:1})]),_:1})])):D("",!0),e("div",Lo,[o(oe,{ref:"webhooks",webhooks:s.value.config.webhooks,"onUpdate:webhooks":l[4]||(l[4]=h=>s.value.config.webhooks=h),disabled:r.value},null,8,["webhooks","disabled"])]),e("div",null,[e("div",qo,[Oo,o(K,{modelValue:U.value,"onUpdate:modelValue":l[5]||(l[5]=h=>U.value=h),onLabel:"Proxy On",offLabel:"Proxy Off",disabled:r.value},{icon:u(()=>[o(J,{icon:"fa-solid fa-server",class:"mr-2"})]),_:1},8,["modelValue","disabled"])]),U.value?(c(),S("div",Eo,[e("div",Ao,[Po,o(X,{id:"proxy-server",modelValue:s.value.config.proxy.server,"onUpdate:modelValue":l[6]||(l[6]=h=>s.value.config.proxy.server=h),modelModifiers:{trim:!0},required:"true",invalid:B.value&&!s.value.config.proxy.server,disabled:i.value,placeholder:"host:port"},null,8,["modelValue","invalid","disabled"]),B.value&&!s.value.config.proxy.server?(c(),S("small",jo,"Server is required.")):D("",!0)]),e("div",Fo,[e("div",Wo,[Ho,o(X,{id:"proxy-username",modelValue:s.value.config.proxy.username,"onUpdate:modelValue":l[7]||(l[7]=h=>s.value.config.proxy.username=h),modelModifiers:{trim:!0},disabled:i.value},null,8,["modelValue","disabled"])]),e("div",zo,[Go,o(re,{id:"proxy-password",modelValue:s.value.config.proxy.password,"onUpdate:modelValue":l[8]||(l[8]=h=>s.value.config.proxy.password=h),modelModifiers:{trim:!0},disabled:i.value,feedback:!1,toggleMask:""},null,8,["modelValue","disabled"])])])])):D("",!0)]),e("div",Jo,[Ko,o(K,{modelValue:s.value.config.debug,"onUpdate:modelValue":l[9]||(l[9]=h=>s.value.config.debug=h),onLabel:"Debug Enabled",offLabel:"Debug Disabled",onIcon:"fa fa-bug",disabled:r.value},{icon:u(()=>[o(J,{icon:"fa-solid fa-bug",class:"mr-2"})]),_:1},8,["modelValue","disabled"])])]),_:2},[d.value?void 0:{name:"header",fn:u(()=>[o(f,{session:s.value},null,8,["session"])]),key:"0"}]),1032,["visible"])}}},Zo=["WORKING","FAILED","STARTING","SCAN_QR_CODE","STOPPED"],en={class:"flex justify-content-between"},sn={class:"flex align-items-center gap-1"},on=e("i",{class:"pi pi-whatsapp"},null,-1),nn=e("span",{class:"mr-1"}," Sessions ",-1),tn=["disabled"],ln=e("i",{class:"pi pi-refresh"},null,-1),an=[ln],rn={class:"flex justify-content-between flex-column sm:flex-row gap-2 sm:gap-0"},dn={class:"flex gap-2 align-items-center"},cn={class:"flex gap-2"},un={class:"my-auto"},pn={class:"flex flex-row gap-2 justify-content-end"},En={__name:"SessionTable",setup(n){const t=he(),s=Fe(),a=F(),{allSessions:d,refreshing:i,servers:m}=fe(a),r=d,_=$e(),v=w({config:{webhooks:[]}}),y=w(!1),x=w(void 0),b=w(!1);w(null);const U=w({}),B=w(null);We(()=>{O()});const O=()=>{U.value={global:{value:null,matchMode:ne.CONTAINS},status:{value:null,matchMode:ne.EQUALS},"server.id":{value:null,matchMode:ne.EQUALS},name:{operator:He.AND,constraints:[{value:null,matchMode:ne.STARTS_WITH}]}}};function $(){const l=m.value.find(f=>f.connected);if(!l){t.add({severity:"error",summary:"No connected server",detail:"Please connect to a server first",life:3e3});return}v.value={server:l.id,name:"session_"+Math.random().toString(36).substring(7),config:{webhooks:[{url:"https://httpbin.org/post",events:["session.status","message","message.reaction"],hmac:{key:null},retries:{delaySeconds:2,attempts:15}}],noweb:{store:{enabled:!0,fullSync:!1}},proxy:{}}},x.value="new",y.value=!0}function C(l){v.value=ce.cloneDeep({name:l.name,status:l.status,server:l.server.id,config:l.config}),x.value="view",y.value=!0}function E(l){v.value=ce.cloneDeep({name:l.name,status:l.status,server:l.server.id,config:l.config}),x.value="start",y.value=!0}function H(l,f){s.require({target:l.target,message:`Stop '${f.name}' session?
`,icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined p-button-sm",acceptClass:"p-button-warning p-button-sm",rejectLabel:"No",acceptLabel:"Yes, Stop",accept:async()=>{await _(a.stopSession(f.server.id,f.name,!1),"Stopped","Failed to stop session")},reject:()=>{}})}function z(l,f){s.require({target:l.target,message:`Logout '${f.name}' session?
`,icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined p-button-sm",acceptClass:"p-button-danger p-button-sm",rejectLabel:"No",acceptLabel:"Yes, Logout",accept:async()=>{await _(a.logoutSession(f.server.id,f.name),"Logged out","Failed to logout session")},reject:()=>{}})}function Y(){me("store",async()=>await a.refresh())}function G(l){A(l.data)}function A(l){b.value=!0,v.value=l}const V=["name","me.id"];return(l,f)=>{const P=ve,M=W,X=Ie,ie=te,J=Ne,K=Ce,Q=ze,ae=vs,oe=Se,re=ue,Z=Te,de=Qe,ee=Ye,h=eo,Be=Xo;return c(),S(q,null,[e("div",en,[e("div",null,[e("h5",sn,[on,nn,o(P,{refreshing:g(i)},null,8,["refreshing"])])]),e("div",null,[e("button",{onClick:Y,class:"p-link layout-topbar-button",disabled:g(i)},an,8,tn)])]),o(de,{value:g(r).length>0?g(r):[],paginator:!0,rows:20,dataKey:p=>`${p.name}-${p.server.id}-${p.status}`,rowHover:!0,filters:U.value,"onUpdate:filters":f[1]||(f[1]=p=>U.value=p),filterDisplay:"row",loading:B.value,globalFilterFields:V,onRowClick:G,showGridlines:"",class:"p-datatable--clickable",style:{"white-space":"nowrap"}},{header:u(()=>[e("div",rn,[o(M,{label:"Start New",icon:"pi pi-play",severity:"success",onClick:$}),o(J,{iconPosition:"left"},{default:u(()=>[o(X,{class:"pi pi-search"}),o(ie,{modelValue:U.value.global.value,"onUpdate:modelValue":f[0]||(f[0]=p=>U.value.global.value=p),placeholder:"Search by name or phone number",style:{width:"100%"}},null,8,["modelValue"])]),_:1})])]),empty:u(()=>[R(" No sessions found")]),loading:u(()=>[R(" Loading sessions...")]),default:u(()=>[o(Q,{field:"name",header:"Name",sortable:""},{body:u(({data:p})=>[e("div",dn,[o(M,{icon:"pi pi-info",rounded:"",outlined:"",onClick:N=>A(p)},null,8,["onClick"]),e("span",null,I(p.name),1),o(K,{session:p},null,8,["session"])])]),_:1}),o(Q,{field:"status",header:"Status",showFilterMenu:!1,style:{width:"9rem"}},{body:u(({data:p})=>[e("div",cn,[e("div",null,[o(ae,{session:p},null,8,["session"])]),e("div",un,[o(oe,{status:p.status},null,8,["status"])])])]),filter:u(({filterModel:p,filterCallback:N})=>[o(re,{modelValue:p.value,"onUpdate:modelValue":L=>p.value=L,options:g(Zo),onChange:L=>N(),placeholder:"Any",class:"p-column-filter",showClear:!0},{option:u(({option:L})=>[o(oe,{status:L,value:L},null,8,["status","value"])]),_:2},1032,["modelValue","onUpdate:modelValue","options","onChange"])]),_:1}),o(Q,{field:"server.name",filterField:"server.id",header:"Server",showFilterMenu:!1},{filter:u(({filterModel:p,filterCallback:N})=>[o(Z,{placeholder:"Any",onChange:L=>N(),modelValue:p.value,"onUpdate:modelValue":L=>p.value=L,showClear:!0,required:!1},null,8,["onChange","modelValue","onUpdate:modelValue"])]),_:1}),o(Q,null,{body:u(({data:p})=>[e("div",pn,[o(M,{icon:"pi pi-cog",severity:"secondary",rounded:"",outlined:"",onClick:N=>C(p)},null,8,["onClick"]),o(M,{icon:"pi pi-play",severity:"success",rounded:"",outlined:"",onClick:N=>E(p)},null,8,["onClick"]),o(M,{icon:"pi pi-stop",severity:"warning",rounded:"",outlined:"",onClick:N=>H(N,p)},null,8,["onClick"]),o(M,{icon:"pi pi-trash",severity:"danger",rounded:"",outlined:"",onClick:N=>z(N,p)},null,8,["onClick"])])]),_:1})]),_:1},8,["value","dataKey","filters","loading"]),o(ee),o(h,{visible:b.value,"onUpdate:visible":f[2]||(f[2]=p=>b.value=p),session:v.value,"onUpdate:session":f[3]||(f[3]=p=>v.value=p)},null,8,["visible","session"]),o(Be,{visible:y.value,"onUpdate:visible":f[4]||(f[4]=p=>y.value=p),session:v.value,"onUpdate:session":f[5]||(f[5]=p=>v.value=p),mode:x.value},null,8,["visible","session","mode"])],64)}}};export{En as _};