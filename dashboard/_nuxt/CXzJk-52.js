import{_ as y,a as k}from"./JIAl9IYs.js";import S from"./DrYKIIzu.js";import{u as w}from"./CSqhHEvo.js";import{d as V,c,L as $,t as i,v as r,x as t,y as n,M as o,z as m,N as l,O as _,P as N,B as x,_ as O}from"./BuVBBthu.js";import{_ as j}from"./Bs2c94oI.js";import"./C4G7hRTR.js";import"./CbnMLACJ.js";import"./DQA2vvEj.js";import"./DK9y2b8H.js";import"./B_0FfWhu.js";import"./BJxzf_2K.js";import"./DPVw-k6D.js";import"./szLy1UaL.js";import"./BDCIb7uq.js";import"./BmeLph5r.js";import"./D04cCYGN.js";import"./DzVHKihO.js";import"./BGKoP85h.js";import"./BHW2MCzo.js";import"./COC2fnSm.js";import"./BRu05oTC.js";import"./hBWh0NAe.js";import"./-4eJZlvZ.js";import"./DZBnR2mt.js";import"./DGvlfZsy.js";import"./BSwdoi3s.js";import"./BE_cNx98.js";import"./B3Rocjtm.js";import"./XLP-tMh2.js";import"./DZfNZVwl.js";import"./CRu4r4IP.js";import"./CFDWNxsY.js";import"./_9Yl84hu.js";import"./0Fr0exb2.js";import"./pRjt_I0R.js";import"./BQazBSuR.js";import"./DCT0Mn7S.js";import"./BaDswqEN.js";import"./qb2GjFni.js";import"./B4vcrUS_.js";import"./CFFw8qQu.js";import"./CFX8qg55.js";import"./D8xGBUFq.js";import"./DCrqP3Cb.js";import"./vVez35kr.js";import"./BkZ8ObsQ.js";import"./BlmVJ2S_.js";import"./8wCydIYh.js";import"./BEU1poOj.js";import"./B8PnXHva.js";import"./CqI4NShh.js";import"./BwDDXSfY.js";import"./B_JwtIcM.js";import"./BUk7piO9.js";import"./iOiHZyuh.js";import"./NSPQIHrS.js";import"./Cuipf_0E.js";import"./CzM8L04j.js";import"./UjqxcB_i.js";const B={class:"col-12 lg:col-6 xl:col-4"},P={class:"card mb-0"},T={class:"flex justify-content-between mb-3"},D=t("span",{class:"block text-900 font-medium mb-3"},"Sessions",-1),I={class:"text-900 font-medium text-xl"},C={class:"flex"},E=t("div",{class:"flex align-items-center justify-content-center bg-green-50 border-round",style:{width:"2.5rem",height:"2.5rem"}},[t("i",{class:"pi pi-whatsapp text-green-500 text-xl"})],-1),R={class:"text-green-500 font-medium"},q=t("span",{class:"text-500"}," working",-1),G=t("span",{class:"text-500"},", ",-1),K={class:"text-orange-400 font-medium"},L=t("span",{class:"text-500"}," requires attention",-1),M=t("span",{class:"text-500"},", ",-1),U={class:"text-gray-400 font-medium"},W=t("span",{class:"text-500"}," stopped",-1),z={class:"col-12 lg:col-6 xl:col-4"},F={class:"card mb-0"},H={class:"flex justify-content-between mb-3"},A=t("span",{class:"block text-900 font-medium mb-3"},"Servers",-1),J={class:"text-900 font-medium text-xl"},Q=t("div",{class:"flex align-items-center justify-content-center bg-purple-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[t("i",{class:"pi pi-server text-purple-500 text-xl"})],-1),X={class:"text-red-500 font-medium"},Y=t("span",{class:"text-900"}," not connected",-1),Z=t("span",null," / ",-1),tt={class:"text-green-500 font-medium"},et=t("span",{class:"text-500"}," connected",-1),st={class:"col-12 lg:col-6 xl:col-4"},ot={class:"card mb-0"},nt={class:"flex justify-content-between mb-3"},it=t("span",{class:"block text-900 font-medium mb-3"}," Latest Version ",-1),rt={key:1,class:"text-900 font-medium text-xl"},ct={href:"https://waha.devlike.pro/docs/overview/changelog/",target:"_blank"},lt=t("i",{class:"pi pi-external-link"},null,-1),at=t("div",{class:"flex align-items-center justify-content-center bg-cyan-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[t("i",{class:"pi pi-cloud-download text-cyan-500 text-xl"})],-1),dt={class:"text-orange-400 font-medium"},mt=t("span",{class:"text-500"}," servers ready for updates",-1),pt={key:1,class:"text-green-500 font-medium"},_t=t("i",{class:"pi text-green-500 pi-check-circle"},null,-1),ht=V({__name:"IndexOverview",setup(f){const e=w(),a=c(()=>e.servers.filter(s=>s.connected===!1)),p=c(()=>e.servers.filter(s=>s.connected===!0)),d=c(()=>e.servers.filter(s=>e.latestVersion&&s.version&&s.version.version!==e.latestVersion)),h=c(()=>e.visibleSessions.filter(s=>s.status!=="WORKING"&&s.status!=="STOPPED")),v=c(()=>e.visibleSessions.filter(s=>s.status==="WORKING")),u=c(()=>e.visibleSessions.filter(s=>s.status==="STOPPED"));return $(()=>{e.refresh()}),(s,kt)=>{const g=y,b=S;return i(),r(l,null,[t("div",B,[t("div",P,[t("div",T,[t("div",null,[D,t("div",I,n(o(e).visibleSessions.length),1)]),t("div",C,[t("div",null,[m(g)]),E])]),t("span",R,n(o(v).length),1),q,o(h).length>0?(i(),r(l,{key:0},[G,t("span",K,n(o(h).length),1),L],64)):_("",!0),o(u).length>0?(i(),r(l,{key:1},[M,t("span",U,n(o(u).length),1),W],64)):_("",!0)])]),t("div",z,[t("div",F,[t("div",H,[t("div",null,[A,t("span",J,[t("span",null,n(o(e).servers.length),1)])]),Q]),t("div",null,[o(a).length>0?(i(),r(l,{key:0},[t("span",X,n(o(a).length),1),Y,Z],64)):_("",!0),t("span",tt,n(o(p).length),1),et])])]),t("div",st,[t("div",ot,[t("div",nt,[t("div",null,[it,t("div",null,[o(e).latestVersion?(i(),r("span",rt,[t("a",ct,[x(n(o(e).latestVersion)+" ",1),lt])])):(i(),N(b,{key:0,width:"4rem"}))])]),at]),o(d).length>0?(i(),r(l,{key:0},[t("span",dt,n(o(d).length),1),mt],64)):(i(),r("span",pt,[_t,x(" Up to date ")]))])])],64)}}}),ut={},xt={class:"grid"},ft={class:"col-12"},vt={class:"card"},gt={class:"col-12"},bt={class:"card"};function yt(f,e){const a=ht,p=j,d=k;return i(),r("div",xt,[m(a),t("div",ft,[t("div",vt,[m(p)])]),t("div",gt,[t("div",bt,[m(d)])])])}const Oe=O(ut,[["render",yt]]);export{Oe as default};