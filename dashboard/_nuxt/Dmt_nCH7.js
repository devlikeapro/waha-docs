import d from"./CZR_Btlx.js";import _ from"./IoJ_4yxO.js";import y from"./DqkES-ey.js";import f from"./CY59zB7Q.js";import k from"./D0BaY16q.js";import{useLayout as b}from"./9mHMxSN9.js";import{r as h,G as M,c as g,v as C,x as r,z as i,W as A,N as L,i as S,t as E}from"./DZtU7i0z.js";import"./DvkTedrz.js";import"./6aPI2vme.js";import"./C-0fWKCx.js";import"./quiqwbc8.js";import"./LxReuNFT.js";import"./81UBhpm_.js";import"./HsPgIncx.js";import"./Bs5QGmxO.js";import"./K52eEpyW.js";import"./ZHSnakwk.js";import"./wATkfIAP.js";import"./BNrvMXrN.js";import"./wPgVzwhJ.js";import"./CIUvx-db.js";import"./BlMyZwoC.js";import"./D0i-H1yH.js";import"./B65u89F4.js";const N={class:"layout-sidebar"},w={class:"layout-main-container"},$={class:"layout-main"},x=r("div",{class:"layout-mask"},null,-1),at={__name:"AppLayout",setup(B){const{layoutConfig:e,layoutState:o,isSidebarActive:n}=b(),a=h(null);M(n,t=>{t?u():m()});const c=g(()=>({"layout-theme-light":e.darkTheme.value==="light","layout-theme-dark":e.darkTheme.value==="dark","layout-overlay":e.menuMode.value==="overlay","layout-static":e.menuMode.value==="static","layout-static-inactive":o.staticMenuDesktopInactive.value&&e.menuMode.value==="static","layout-overlay-active":o.overlayMenuActive.value,"layout-mobile-active":o.staticMenuMobileActive.value,"p-ripple-disabled":e.ripple.value===!1})),u=()=>{a.value||(a.value=t=>{p(t)&&(o.overlayMenuActive.value=!1,o.staticMenuMobileActive.value=!1,o.menuHoverActive.value=!1)},document.addEventListener("click",a.value))},m=()=>{a.value&&(document.removeEventListener("click",a),a.value=null)},p=t=>{const l=document.querySelector(".layout-sidebar"),s=document.querySelector(".layout-menu-button");return!(l.isSameNode(t.target)||l.contains(t.target)||s.isSameNode(t.target)||s.contains(t.target))};return(t,l)=>{const s=S("router-view"),v=d;return E(),C(L,null,[r("div",{class:A(["layout-wrapper",c.value])},[i(_),r("div",N,[i(f)]),r("div",w,[r("div",$,[i(s)]),i(y)]),i(k),x],2),i(v,{position:"bottom-right"})],64)}}};export{at as default};