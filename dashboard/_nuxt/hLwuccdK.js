import{aI as B,r as k,L as S,G as N,v as u,y as d,O as s,W as c,x as r,P as f,A as x,ac as D,i as h,t as i,$ as L,ad as W,N as E,Q as O}from"./ql5q8IH5.js";import{useLayout as R}from"./BNg-oOYj.js";const T={key:0,class:"layout-menuitem-root-text"},j=["href","target"],z={class:"layout-menuitem-text"},F={key:0,class:"pi pi-fw pi-angle-down layout-submenu-toggler"},G={class:"layout-menuitem-text"},P={key:0,class:"pi pi-fw pi-angle-down layout-submenu-toggler"},Q={class:"layout-submenu"},q={__name:"AppMenuItem",props:{item:{type:Object,default:()=>({})},index:{type:Number,default:0},root:{type:Boolean,default:!0},parentItemKey:{type:String,default:null}},setup(e){const I=B(),{layoutConfig:M,layoutState:b,setActiveMenuItem:C,onMenuToggle:K}=R(),m=e,o=k(!1),n=k(null);S(()=>{n.value=m.parentItemKey?m.parentItemKey+"-"+m.index:String(m.index);const t=b.activeMenuItem;o.value=t===n.value||t?t.startsWith(n.value+"-"):!1}),N(()=>M.activeMenuItem.value,t=>{o.value=t===n.value||t.startsWith(n.value+"-")});const g=(t,a)=>{if(a.disabled){t.preventDefault();return}const{overlayMenuActive:v,staticMenuMobileActive:y}=b;(a.to||a.url)&&(y.value||v.value)&&K(),a.command&&a.command({originalEvent:t,item:a});const l=a.items?o.value?m.parentItemKey:n:n.value;C(l)},w=t=>I.path===t.to;return(t,a)=>{const v=h("router-link"),y=h("app-menu-item",!0);return i(),u("li",{class:c({"layout-root-menuitem":e.root,"active-menuitem":o.value})},[e.root&&e.item.visible!==!1?(i(),u("div",T,d(e.item.label),1)):s("",!0),(!e.item.to||e.item.items)&&e.item.visible!==!1?(i(),u("a",{key:1,href:e.item.url,onClick:a[0]||(a[0]=l=>g(l,e.item,e.index)),class:c(e.item.class),target:e.item.target,tabindex:"0"},[r("i",{class:c([e.item.icon,"layout-menuitem-icon"])},null,2),r("span",z,d(e.item.label),1),e.item.items?(i(),u("i",F)):s("",!0)],10,j)):s("",!0),e.item.to&&!e.item.items&&e.item.visible!==!1?(i(),f(v,{key:2,onClick:a[1]||(a[1]=l=>g(l,e.item,e.index)),class:c([e.item.class,{"active-route":w(e.item)}]),tabindex:"0",to:e.item.to},{default:x(()=>[r("i",{class:c([e.item.icon,"layout-menuitem-icon"])},null,2),r("span",G,d(e.item.label),1),e.item.items?(i(),u("i",P)):s("",!0)]),_:1},8,["class","to"])):s("",!0),e.item.items&&e.item.visible!==!1?(i(),f(D,{key:3,name:"layout-submenu"},{default:x(()=>[L(r("ul",Q,[(i(!0),u(E,null,O(e.item.items,(l,A)=>(i(),f(y,{key:l,index:A,item:l,parentItemKey:n.value,root:!1},null,8,["index","item","parentItemKey"]))),128))],512),[[W,e.root?!0:o.value]])]),_:1})):s("",!0)],2)}}};export{q as default};