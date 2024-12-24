import E from"./Bt-UuASH.js";import{a8 as A,aC as l,ab as h,ac as r,ad as B,aq as S,i as g,O as z,t as c,L as v,A as u,z as L,ah as R,af as s,P as H,v as f,a2 as p,T as K,ag as C,Z as b,U as k,x as m,y as F,a4 as j}from"./6TK3dpqb.js";import{O as I}from"./Bcn8N-hA.js";import{s as P}from"./QRPsWnVt.js";import{s as D}from"./CODKawlF.js";import"./BdkX2sY1.js";import"./iA9qGN45.js";import"./DYZjTh-e.js";var T={root:function(e){var i=e.instance;return["p-confirm-popup p-component",{"p-ripple-disabled":i.$primevue.config.ripple===!1}]},content:"p-confirm-popup-content",icon:"p-confirm-popup-icon",message:"p-confirm-popup-message",footer:"p-confirm-popup-footer",rejectButton:function(e){var i=e.instance;return["p-confirm-popup-reject",i.confirmation&&!i.confirmation.rejectClass?"p-button-sm p-button-text":null]},acceptButton:function(e){var i=e.instance;return["p-confirm-popup-accept",i.confirmation&&!i.confirmation.acceptClass?"p-button-sm":null]}},N=A.extend({name:"confirmpopup",classes:T}),U={name:"BaseConfirmPopup",extends:D,props:{group:String},style:N,provide:function(){return{$parentInstance:this}}},V={name:"ConfirmPopup",extends:U,inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var e=this;this.confirmListener=function(i){i&&i.group===e.group&&(e.confirmation=i,e.target=i.target,e.confirmation.onShow&&e.confirmation.onShow(),e.visible=!0)},this.closeListener=function(){e.visible=!1,e.confirmation=null},l.on("confirm",this.confirmListener),l.on("close",this.closeListener)},beforeUnmount:function(){l.off("confirm",this.confirmListener),l.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(h.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(e){(e.code==="Space"||e.code==="Enter"||e.code==="NumpadEnter")&&(this.accept(),r.focus(this.target),e.preventDefault())},onRejectKeydown:function(e){(e.code==="Space"||e.code==="Enter"||e.code==="NumpadEnter")&&(this.reject(),r.focus(this.target),e.preventDefault())},onEnter:function(e){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept",this.autoFocusReject=this.confirmation.defaultFocus==="reject",this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),h.set("overlay",e,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(e){h.clear(e)},alignOverlay:function(){r.absolutePosition(this.container,this.target,!1);var e=r.getOffset(this.container),i=r.getOffset(this.target),d=0;e.left<i.left&&(d=i.left-e.left),this.container.style.setProperty("--overlayArrowLeft","".concat(d,"px")),e.top<i.top&&(this.container.setAttribute("data-p-confirm-popup-flipped","true"),!this.isUnstyled&&r.addClass(this.container,"p-confirm-popup-flipped"))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(i){e.visible&&e.container&&!e.container.contains(i.target)&&!e.isTargetClicked(i)?(e.confirmation.onHide&&e.confirmation.onHide(),e.visible=!1):e.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new B(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!r.isTouchDevice()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus({preventScroll:!0})},isTargetClicked:function(e){return this.target&&(this.target===e.target||this.target.contains(e.target))},containerRef:function(e){this.container=e},onOverlayClick:function(e){I.emit("overlay-click",{originalEvent:e,target:this.target})},onOverlayKeydown:function(e){e.code==="Escape"&&(l.emit("close",this.closeListener),r.focus(this.target))},getCXOptions:function(e,i){return{contenxt:{icon:e,iconClass:i.class}}}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){return this.confirmation?this.confirmation.acceptLabel||this.$primevue.config.locale.accept:null},rejectLabel:function(){return this.confirmation?this.confirmation.rejectLabel||this.$primevue.config.locale.reject:null},acceptIcon:function(){return this.confirmation?this.confirmation.acceptIcon:null},rejectIcon:function(){return this.confirmation?this.confirmation.rejectIcon:null}},components:{CPButton:E,Portal:P},directives:{focustrap:S}},q=["aria-modal"];function X(t,e,i,d,o,n){var y=g("CPButton"),O=g("Portal"),w=z("focustrap");return c(),v(O,null,{default:u(function(){return[L(R,s({name:"p-confirm-popup",onEnter:n.onEnter,onAfterEnter:n.onAfterEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},t.ptm("transition")),{default:u(function(){return[o.visible?H((c(),f("div",s({key:0,ref:n.containerRef,role:"alertdialog",class:t.cx("root"),"aria-modal":o.visible,onClick:e[2]||(e[2]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)}),onKeydown:e[3]||(e[3]=function(){return n.onOverlayKeydown&&n.onOverlayKeydown.apply(n,arguments)})},t.ptmi("root")),[t.$slots.container?p(t.$slots,"container",{key:0,message:o.confirmation,onAccept:n.accept,onReject:n.reject,acceptCallback:n.accept,rejectCallback:n.reject}):(c(),f(K,{key:1},[t.$slots.message?(c(),v(C(t.$slots.message),{key:1,message:o.confirmation},null,8,["message"])):(c(),f("div",s({key:0,class:t.cx("content")},t.ptm("content")),[p(t.$slots,"icon",{},function(){return[t.$slots.icon?(c(),v(C(t.$slots.icon),{key:0,class:b(t.cx("icon"))},null,8,["class"])):o.confirmation.icon?(c(),f("span",s({key:1,class:[o.confirmation.icon,t.cx("icon")]},t.ptm("icon")),null,16)):k("",!0)]}),m("span",s({class:t.cx("message")},t.ptm("message")),F(o.confirmation.message),17)],16)),m("div",s({class:t.cx("footer")},t.ptm("footer")),[L(y,{label:n.rejectLabel,onClick:e[0]||(e[0]=function(a){return n.reject()}),onKeydown:n.onRejectKeydown,autofocus:o.autoFocusReject,class:b([t.cx("rejectButton"),o.confirmation.rejectClass]),unstyled:t.unstyled,pt:t.ptm("rejectButton")},j({_:2},[n.rejectIcon||t.$slots.rejecticon?{name:"icon",fn:u(function(a){return[p(t.$slots,"rejecticon",{},function(){return[m("span",s({class:[n.rejectIcon,a.class]},t.ptm("rejectButton").icon,{"data-pc-section":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1032,["label","onKeydown","autofocus","class","unstyled","pt"]),L(y,{label:n.acceptLabel,onClick:e[1]||(e[1]=function(a){return n.accept()}),onKeydown:n.onAcceptKeydown,autofocus:o.autoFocusAccept,class:b([t.cx("acceptButton"),o.confirmation.acceptClass]),unstyled:t.unstyled,pt:t.ptm("acceptButton")},j({_:2},[n.acceptIcon||t.$slots.accepticon?{name:"icon",fn:u(function(a){return[p(t.$slots,"accepticon",{},function(){return[m("span",s({class:[n.acceptIcon,a.class]},t.ptm("acceptButton").icon,{"data-pc-section":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1032,["label","onKeydown","autofocus","class","unstyled","pt"])],16)],64))],16,q)),[[w]]):k("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3})}V.render=X;export{V as default};
