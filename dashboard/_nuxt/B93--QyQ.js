import d from"./CcYQkJ2x.js";import _ from"./Dx0BJufO.js";import y from"./Cm2Z4iuO.js";import f from"./DFuthTrU.js";import k from"./ErgJcu0F.js";import{useLayout as b}from"./Chb1lcj_.js";import{r as h,G as M,c as g,v as C,x as r,z as i,W as A,N as L,i as S,t as E}from"./nvEpRij1.js";import"./C_cDa64x.js";import"./397V8pIR.js";import"./BhT0dHkP.js";import"./BSF9xere.js";import"./BjxxDgP1.js";import"./EWb-CNRW.js";import"./BGXgJSqR.js";import"./BC-ao9Fu.js";import"./CIROtneQ.js";import"./D_-Uku2c.js";import"./Bb1uVtKP.js";import"./fNC-n3Dc.js";import"./CGV2LFpW.js";import"./DXZU0KSO.js";import"./Dkzz6G-M.js";import"./DhMMElgX.js";import"./BpdbAVqt.js";const N={class:"layout-sidebar"},w={class:"layout-main-container"},$={class:"layout-main"},x=r("div",{class:"layout-mask"},null,-1),at={__name:"AppLayout",setup(B){const{layoutConfig:e,layoutState:o,isSidebarActive:n}=b(),a=h(null);M(n,t=>{t?u():m()});const c=g(()=>({"layout-theme-light":e.darkTheme.value==="light","layout-theme-dark":e.darkTheme.value==="dark","layout-overlay":e.menuMode.value==="overlay","layout-static":e.menuMode.value==="static","layout-static-inactive":o.staticMenuDesktopInactive.value&&e.menuMode.value==="static","layout-overlay-active":o.overlayMenuActive.value,"layout-mobile-active":o.staticMenuMobileActive.value,"p-ripple-disabled":e.ripple.value===!1})),u=()=>{a.value||(a.value=t=>{p(t)&&(o.overlayMenuActive.value=!1,o.staticMenuMobileActive.value=!1,o.menuHoverActive.value=!1)},document.addEventListener("click",a.value))},m=()=>{a.value&&(document.removeEventListener("click",a),a.value=null)},p=t=>{const l=document.querySelector(".layout-sidebar"),s=document.querySelector(".layout-menu-button");return!(l.isSameNode(t.target)||l.contains(t.target)||s.isSameNode(t.target)||s.contains(t.target))};return(t,l)=>{const s=S("router-view"),v=d;return E(),C(L,null,[r("div",{class:A(["layout-wrapper",c.value])},[i(_),r("div",N,[i(f)]),r("div",w,[r("div",$,[i(s)]),i(y)]),i(k),x],2),i(v,{position:"bottom-right"})],64)}}};export{at as default};