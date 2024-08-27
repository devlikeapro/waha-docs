import{u as P,l as W,a as Q,_ as he}from"./B6RulKZr.js";import Y from"./CRxyBSjV.js";import be from"./DHEQvaAA.js";import X from"./BU_RrG7K.js";import ge from"./BZwEZi4I.js";import Z from"./CarjS7So.js";import{_ as ye,u as H,a as J}from"./C7XVvI88.js";import $e from"./vk6p3lMp.js";import{c as T,Q as K,t as c,v as y,B as i,y as w,M as _,R,x as e,N,S as ee,z as n,O as C,T as Se,P as k,U as E,r as U,A as p,G,V as ke,W as we,X as xe,Y as Ce,L as Ve,Z as De}from"./BA58ITfh.js";import te from"./C3FuBF2h.js";import ne from"./EE2Tt43f.js";import Ue from"./BSIHZAtT.js";import oe from"./HAfGc3KV.js";import Ie from"./DMtILRzV.js";import Me from"./uoB8HW6T.js";import Te from"./CAcnjshT.js";import Re from"./WTNuW7-Q.js";function Ne(o){const l=Math.floor(o/864e5),t=Math.floor(o/36e5)%24,u=Math.floor(o/6e4)%60,a=Math.floor(o/1e3)%60,d=`${String(t).padStart(2,"0")}:${String(u).padStart(2,"0")}:${String(a).padStart(2,"0")}`;return l===0?d:l===1?`${d} 1 day`:`${d} ${l} days`}const Ae={class:"pi pi-info-circle"},se={__name:"ServerUptime",props:["status"],setup(o){const l=o,t=T(()=>{const a=l.status.uptime;if(a)return Ne(a)}),u=T(()=>{const a=l.status.startTimestamp;if(a)return new Date(a)});return(a,d)=>{var f;const v=K("tooltip");return c(),y(N,null,[i(w(_(t))+" up ",1),R(e("i",Ae,null,512),[[v,`Start time: ${(f=_(u))==null?void 0:f.toLocaleString()}`]])],64)}}},Be=e("code",null," (",-1),Le=e("code",null,")",-1),Fe={key:0},Pe={__name:"ServerInfoColumn",props:["server"],setup(o){const l=P();return(t,u)=>{const a=se;return c(),y(N,null,[e("div",null,[e("code",null,w(o.server.version.engine),1),Be,e("code",{class:ee({"text-orange-400":o.server.version.version!==_(l).latestVersion})},w(o.server.version.version),3),Le]),o.server.status?(c(),y("div",Fe,[n(a,{status:o.server.status},null,8,["status"])])):C("",!0)],64)}}},je={__name:"ServerSessionSummary",props:{sessions:{required:!0}},setup(o){const l=o,t=T(()=>W.groupBy(l.sessions||[],"status"));return(u,a)=>{const d=ye;return c(!0),y(N,null,Se(_(t),(v,f)=>(c(),k(d,{key:f+v.length,status:f,value:`${f}: ${v.length}`},null,8,["status","value"]))),128)}}},qe={class:"mb-4"},We=e("b",null,"browser's local storage",-1),Oe=e("br",null,null,-1),Ee={class:"field"},Ye=e("label",{for:"name"},"Name",-1),He={key:0,class:"p-invalid"},Ke={class:"field"},ze=e("label",{for:"connection-url"},"API URL",-1),Ge={key:0,class:"p-invalid"},Qe={key:1,class:"p-invalid"},Xe=e("b",null,"https://",-1),Ze=e("b",null,"http://",-1),Je=e("br",null,null,-1),et=e("a",{href:"https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#developer_console",target:"_blank"}," Mixed Content ",-1),tt=e("b",null,"http://",-1),nt=e("br",null,null,-1),ot=e("br",null,null,-1),st=e("a",{href:"https://waha.devlike.pro/docs/how-to/security/#https",target:"_blank"},"🔒 Security ->",-1),rt={class:"field"},lt=e("label",{for:"connection-key"},"API Key (optional)",-1),it={__name:"ServerDialog",props:{visible:{},visibleModifiers:{},server:{},serverModifiers:{}},emits:["update:visible","update:server"],setup(o){const l=E(o,"visible"),t=E(o,"server"),u=P(),a=H(),d=U(!1),v=T(()=>{var r;const b=(r=t.value.connection)==null?void 0:r.url;return b?b.startsWith("http://")||b.startsWith("https://"):!1});async function f(){d.value=!0,!(!t.value.name||!v.value)&&(t.value.id?await a(u.editServer(t.value.id,t.value),"Server updated","Failed to update server",t.value.name,t.value.name):await a(u.addServer(t.value),"Connected to server","Failed to connect to server",t.value.name,t.value.name),S(),t.value={connection:{}})}function S(){d.value=!1,l.value=!1}const V=T(()=>{var r;const b=(r=t.value.connection)==null?void 0:r.url;return b?b.startsWith("http://"):!1}),$=T(()=>location.protocol==="https:");return(b,r)=>{const m=ne,D=X,A=Ue,I=Y,B=oe;return c(),k(B,{visible:l.value,"onUpdate:visible":r[3]||(r[3]=x=>l.value=x),header:"Server",modal:!0,class:"p-fluid"},{footer:p(()=>[n(I,{label:"Cancel",icon:"pi pi-times",text:"",onClick:S,severity:"secondary"}),n(I,{label:t.value.id?"Save":"Connect",icon:{"pi pi-check":!!t.value.id,"pi pi-link":!t.value.id},text:"",onClick:f},null,8,["label","icon"])]),default:p(()=>[e("div",qe,[n(m,{severity:"info"},{default:p(()=>[i(" Servers data is saved in your "),We,i(". "),Oe,i(" It's safe to put server API and key here. ")]),_:1})]),e("div",Ee,[Ye,n(D,{id:"name",modelValue:t.value.name,"onUpdate:modelValue":r[0]||(r[0]=x=>t.value.name=x),modelModifiers:{trim:!0},required:"true",autofocus:"",invalid:d.value&&!t.value.name},null,8,["modelValue","invalid"]),d.value&&!t.value.name?(c(),y("small",He,"Name is required.")):C("",!0)]),e("div",Ke,[ze,n(D,{id:"connection-url",modelValue:t.value.connection.url,"onUpdate:modelValue":r[1]||(r[1]=x=>t.value.connection.url=x),modelModifiers:{trim:!0},required:"true",invalid:d.value&&!_(v)},null,8,["modelValue","invalid"]),d.value&&!t.value.connection.url?(c(),y("small",Ge,"URL is required.")):C("",!0),d.value&&!_(v)?(c(),y("small",Qe,"URL is not correct.")):C("",!0),_($)&&_(V)?(c(),k(m,{key:2,severity:"error",class:"mt-2"},{default:p(()=>[i(" You're using "),Xe,i(" connection but server is using "),Ze,i(" connection. "),Je,i(" It's not possible to use it due to "),et]),_:1})):C("",!0),_(V)?(c(),k(m,{key:3,severity:"warn",class:"mt-2"},{default:p(()=>[i(" You're using "),tt,i(" connection which is not secure. "),nt,i(" Kindly configure HTTPS Connection. "),ot,i(" Read more about "),st]),_:1})):C("",!0)]),e("div",rt,[lt,n(A,{id:"connection-key",modelValue:t.value.connection.key,"onUpdate:modelValue":r[2]||(r[2]=x=>t.value.connection.key=x),modelModifiers:{trim:!0},feedback:!1,toggleMask:""},null,8,["modelValue"])])]),_:1},8,["visible"])}}},at={class:"p-3 flex flex-column gap-2"},ct={class:"flex gap-2"},ut=e("div",null," Status: ",-1),dt={class:"flex flex-column gap-1"},vt={class:"flex gap-1"},pt=e("div",null," API URL: ",-1),mt=["href"],_t=e("i",{class:"pi pi-external-link"},null,-1),ft={class:"flex gap-2"},ht=e("div",null," Engine: ",-1),bt={class:"flex gap-2"},gt=e("div",null," Version: ",-1),yt={key:0,class:"text-green-500 font-medium ml-2"},$t=e("i",{class:"pi text-green-500 pi-check-circle"},null,-1),St={class:"flex gap-2"},kt=e("div",null," Uptime: ",-1),wt={key:0},xt={class:"text-900 font-medium"},Ct={href:"https://waha.devlike.pro/docs/overview/changelog/",target:"_blank"},Vt=e("i",{class:"pi pi-external-link"},null,-1),Dt={__name:"ServerStatus",props:["server"],setup(o){const l=o,t=P(),u=T(()=>{var a;return((a=l.server.version)==null?void 0:a.version)!==t.latestVersion});return(a,d)=>{var V,$,b,r;const v=J,f=se,S=ne;return c(),y("div",at,[e("div",ct,[ut,e("div",dt,[e("div",null,[n(v,{class:"mr-1",connected:o.server.connected},null,8,["connected"]),e("span",null,[e("b",null,[o.server.connected?(c(),y(N,{key:0},[i(" Connected ")],64)):(c(),y(N,{key:1},[i(" Disconnected ")],64))])])])])]),e("div",vt,[pt,e("div",null,[e("a",{href:(V=o.server.connection)==null?void 0:V.url,target:"_blank",class:"ml-2"},[i(w(($=o.server.connection)==null?void 0:$.url)+" ",1),_t],8,mt)])]),e("div",ft,[ht,e("div",null,[e("code",null,w((b=o.server.version)==null?void 0:b.engine),1)])]),e("div",bt,[gt,e("div",null,[e("code",{class:ee({"text-orange-400":_(u)})},w((r=o.server.version)==null?void 0:r.version),3),_(u)?C("",!0):(c(),y("span",yt,[$t,i(" Up to date ")]))])]),e("div",St,[kt,o.server.status?(c(),y("div",wt,[n(f,{status:o.server.status},null,8,["status"])])):C("",!0)]),_(u)?(c(),k(S,{key:0,severity:"info"},{default:p(()=>[i(" There's a new "),e("span",xt,[e("a",Ct,[i(w(_(t).latestVersion)+" ",1),Vt])]),i(" version available! ")]),_:1})):C("",!0)])}}},Ut={class:"flex flex-wrap justify-content-between"},It={class:"flex gap-2 align-items-center"},Mt=e("span",{class:"text-xl font-bold"},"Copy",-1),Tt={class:"flex gap-2 align-items-center"},Rt=e("label",{for:"show-all"},"Show All",-1),Nt={__name:"ServerVariablesTable",props:["server"],setup(o){const l=o,t=P(),u=U(!1),a=H();function d(r){return W.sortBy(r,m=>m.name.startsWith("DEBUG")?0:m.name.startsWith("WAHA_")?1:m.name.startsWith("WHATSAPP_")?2:3)}function v(r){return r.map(m=>`${m.name}=${m.value}`).join(`
`)}const{data:f,pending:S,error:V,refresh:$}=Q(`server-environment-${l.server.id}`,async()=>{if(!l.server.id)return[];const r=await a(t.getServerEnvironment(l.server.id,u.value),void 0,"Failed to fetch server environment",void 0,l.server.name),m=Object.keys(r).map(D=>({name:D,value:r[D]}));return d(m)});G(()=>l.server,$,{immediate:!0}),G(u,$);async function b(r){const m=v(f.value);await navigator.clipboard.writeText(m),r.preventDefault()}return(r,m)=>{const D=Y,A=Ie,I=Z,B=te,x=K("tooltip");return c(),k(B,{value:_(f),loading:_(S)},{header:p(()=>[e("div",Ut,[e("div",It,[Mt,R(n(D,{rounded:"",text:"",icon:"pi pi-copy",onClick:m[0]||(m[0]=M=>b(M))},null,512),[[x,{value:"Copied to clipboard"},void 0,{focus:!0,bottom:!0}]])]),e("div",Tt,[n(A,{inputId:"show-all",modelValue:_(u),"onUpdate:modelValue":m[1]||(m[1]=M=>ke(u)?u.value=M:null)},null,8,["modelValue"]),Rt])])]),default:p(()=>[n(I,{field:"name",header:"Environment Variable"},{body:p(({data:M})=>[e("code",null,w(M.name),1)]),_:1}),n(I,{field:"value",header:"Value"})]),_:1},8,["value","loading"])}}},At=e("h4",null,"Variables",-1),Bt={__name:"ServerControlDialog",props:we(["server"],{visible:{},visibleModifiers:{}}),emits:["update:visible"],setup(o){const l=E(o,"visible"),t=o;return(u,a)=>{const d=Dt,v=Nt,f=oe;return c(),k(f,{visible:l.value,"onUpdate:visible":a[0]||(a[0]=S=>l.value=S),modal:!0,class:"p-fluid",style:{"max-width":"100%","min-width":"50%"},header:"Server"},{default:p(()=>[e("h4",null,w(o.server.name),1),n(d,{server:t.server},null,8,["server"]),At,n(v,{server:t.server},null,8,["server"])]),_:1},8,["visible"])}}},Lt={class:"flex justify-content-between"},Ft={class:"flex align-items-center gap-1"},Pt=e("i",{class:"pi pi-server"},null,-1),jt=e("span",{class:"mr-1"}," Servers ",-1),qt=["disabled"],Wt=e("i",{class:"pi pi-refresh"},null,-1),Ot=[Wt],Et={class:"flex justify-content-between flex-column sm:flex-row gap-2 sm:gap-0"},Yt=["href"],Ht={class:"flex gap-1"},Kt={class:"flex flex-row gap-2 justify-content-end"},zt=e("p",null,[i(" It'll call "),e("code",null,"POST api/server/stop"),i(", but if you're using Docker "),e("br"),i(" and followed "),e("a",{href:"https://waha.devlike.pro/docs/how-to/install/",target:"_blank"},[e("b",null,"🔧 Install & Update")]),i(" guide, Docker will start a new container. ")],-1),Gt=e("p",null," By default it will gracefully stop the server, but you can force restart. ",-1),Qt=e("i",{class:"pi pi-replay mr-2"},null,-1),_n={__name:"ServerTable",setup(o){const l=xe(),t=P(),u=H(),{servers:a,refreshing:d}=Ce(t),v=U({connection:{}}),f=U(!1),S=U(!1),V=U(!1);U(null);const $=U({}),b=U(null);Ve(()=>{r()});const r=()=>{$.value={global:{value:null,matchMode:De.CONTAINS}}};function m(){v.value={connection:{}},f.value=!0}function D(g){A(g.data)}function A(g){v.value=W.cloneDeep(g),S.value=!0}function I(g){v.value=W.cloneDeep(g),f.value=!0}function B(g,h){l.require({group:"popup",target:g.target,message:`Disconnect '${h.name}?'`,icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined p-button-sm",acceptClass:"p-button-danger p-button-sm",rejectLabel:"No",acceptLabel:"Yes, Disconnect",accept:()=>u(t.deleteServer(h.id),"Disconnected","Failed to disconnect server"),reject:()=>{}})}const x=g=>{l.require({group:"restart",message:g.name,header:`Restart '${g.name}' server?`,icon:"pi pi-replay",rejectClass:"p-button-secondary p-button-outlined p-button-sm",acceptClass:"p-button-warning p-button-sm",rejectLabel:"No",acceptLabel:"Yes, Restart",accept:async()=>{await u(t.stopServer(g,V.value),"Restarting...","Failed to restart server",g.name,g.name)},reject:()=>{}})};function M(){Q("store",async()=>await t.refresh())}return(g,h)=>{const re=he,j=Y,le=be,ie=X,ae=ge,L=Z,O=J,z=$e,ce=Pe,ue=je,de=te,ve=it,pe=Bt,me=Me,_e=Te,fe=Re,q=K("tooltip");return c(),y(N,null,[e("div",Lt,[e("div",null,[e("h5",Ft,[Pt,jt,n(re,{refreshing:_(d)},null,8,["refreshing"])])]),e("div",null,[R((c(),y("button",{onClick:M,class:"p-link layout-topbar-button",disabled:_(d)},Ot,8,qt)),[[q,"Refresh",void 0,{top:!0}]])])]),n(de,{value:_(a).length>0?_(a):[],paginator:!0,rows:10,dataKey:"id",rowHover:!0,filters:$.value,"onUpdate:filters":h[1]||(h[1]=s=>$.value=s),filterDisplay:"menu",loading:b.value,globalFilterFields:["name","id","connection.url"],showGridlines:"",onRowClick:D,class:"p-datatable--clickable",style:{"white-space":"nowrap"}},{header:p(()=>[e("div",Et,[n(j,{label:"Connect",icon:"pi pi-link",severity:"success",onClick:m}),n(ae,{iconPosition:"left"},{default:p(()=>[n(le,{class:"pi pi-search"}),n(ie,{modelValue:$.value.global.value,"onUpdate:modelValue":h[0]||(h[0]=s=>$.value.global.value=s),placeholder:"Keyword Search",style:{width:"100%"}},null,8,["modelValue"])]),_:1})])]),empty:p(()=>[i(" No servers found")]),loading:p(()=>[i(" Loading servers...")]),default:p(()=>[n(L,{field:"name",header:"Name"},{body:p(({data:s})=>[i(w(s.name),1)]),_:1}),n(L,{header:"API"},{body:p(({data:s})=>[e("div",null,[n(O,{connected:s.connected},null,8,["connected"]),e("a",{class:"ml-1",href:s.connection.url,target:"_blank"},w(s.connection.url),9,Yt)])]),_:1}),n(L,{header:"Info"},{body:p(({data:s})=>[s.connected===void 0?(c(),k(z,{key:0,width:"9rem"})):s.connected===!1?(c(),k(O,{key:1,connected:s.connected},null,8,["connected"])):(c(),k(ce,{key:2,server:s},null,8,["server"]))]),_:1}),n(L,{header:"Sessions"},{body:p(({data:s})=>[e("div",Ht,[s.connected===void 0?(c(),k(z,{key:0,width:"10rem"})):C("",!0),s.connected===!1?(c(),k(O,{key:1,connected:s.connected},null,8,["connected"])):C("",!0),n(ue,{sessions:_(t).sessions.get(s.id)},null,8,["sessions"])])]),_:1}),n(L,null,{body:p(({data:s})=>[e("div",Kt,[R(n(j,{icon:"pi pi-pencil",severity:"success",rounded:"",outlined:"",onClick:F=>I(s)},null,8,["onClick"]),[[q,"Edit Server",void 0,{top:!0}]]),R(n(j,{icon:"pi pi-replay",severity:"warning",rounded:"",outlined:"",onClick:F=>x(s)},null,8,["onClick"]),[[q,"Restart Server",void 0,{top:!0}]]),R(n(j,{icon:"pi pi-times",severity:"danger",rounded:"",outlined:"",onClick:F=>B(F,s)},null,8,["onClick"]),[[q,"Disconnect Server",void 0,{top:!0}]])])]),_:1})]),_:1},8,["value","filters","loading"]),n(ve,{visible:f.value,"onUpdate:visible":h[2]||(h[2]=s=>f.value=s),server:v.value,"onUpdate:server":h[3]||(h[3]=s=>v.value=s)},null,8,["visible","server"]),n(pe,{visible:S.value,"onUpdate:visible":h[4]||(h[4]=s=>S.value=s),server:v.value,"onUpdate:server":h[5]||(h[5]=s=>v.value=s)},null,8,["visible","server"]),n(me,{group:"popup"}),n(fe,{group:"restart"},{message:p(s=>[e("div",null,[e("p",null,[i(" You're going to restart "),e("b",null,w(s.message.message),1),i(" server. ")]),zt,e("div",null,[Gt,n(_e,{modelValue:V.value,"onUpdate:modelValue":h[6]||(h[6]=F=>V.value=F),id:"forceRestart",onLabel:"Force Restart On",offLabel:"Force Restart Off"},{icon:p(()=>[Qt]),_:1},8,["modelValue"])])])]),_:1})],64)}}};export{_n as _};
