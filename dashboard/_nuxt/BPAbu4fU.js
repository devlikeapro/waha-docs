import{a8 as g,ab as u,ac as s,ad as E,aa as O,aq as K,ae as S,i as D,O as y,t as r,L as v,A as p,z as T,ah as B,af as l,P as m,v as d,a2 as f,T as I,x as z,ag as A,U as L}from"./6TK3dpqb.js";import{s as R}from"./_IFE28sr.js";import{O as a}from"./Bcn8N-hA.js";import{s as H}from"./QRPsWnVt.js";import{s as P}from"./CODKawlF.js";import"./DYZjTh-e.js";var U={root:function(e){var i=e.instance;return["p-overlaypanel p-component",{"p-ripple-disabled":i.$primevue.config.ripple===!1}]},content:"p-overlaypanel-content",closeButton:"p-overlaypanel-close p-link",closeIcon:"p-overlaypanel-close-icon"},Z=g.extend({name:"overlaypanel",classes:U}),x={name:"BaseOverlayPanel",extends:P,props:{dismissable:{type:Boolean,default:!0},showCloseIcon:{type:Boolean,default:!1},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeIcon:{type:String,default:void 0},closeOnEscape:{type:Boolean,default:!0}},style:Z,provide:function(){return{$parentInstance:this}}},N={name:"OverlayPanel",extends:x,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(e){e?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&u.clear(this.container),this.overlayEventListener&&(a.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(e,i){this.visible?this.hide():this.show(e,i)},show:function(e,i){this.visible=!0,this.eventTarget=e.currentTarget,this.target=i||e.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(e){var i=this;this.container.setAttribute(this.attributeSelector,""),s.addStyles(e,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&u.set("overlay",e,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(o){i.container.contains(o.target)&&(i.selfClick=!0)},this.focus(),a.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),a.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(e){this.autoZIndex&&u.clear(e)},alignOverlay:function(){s.absolutePosition(this.container,this.target,!1);var e=s.getOffset(this.container),i=s.getOffset(this.target),o=0;e.left<i.left&&(o=i.left-e.left),this.container.style.setProperty("--overlayArrowLeft","".concat(o,"px")),e.top<i.top&&(this.container.setAttribute("data-p-overlaypanel-flipped","true"),!this.isUnstyled&&s.addClass(this.container,"p-overlaypanel-flipped"))},onContentKeydown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.hide(),s.focus(this.target))},onButtonKeydown:function(e){switch(e.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":e.preventDefault()}},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus()},onKeyDown:function(e){e.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var e=this;!this.outsideClickListener&&s.isClient()&&(this.outsideClickListener=function(i){e.visible&&!e.selfClick&&!e.isTargetClicked(i)&&(e.visible=!1),e.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new E(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!s.isTouchDevice()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(e){return this.eventTarget&&(this.eventTarget===e.target||this.eventTarget.contains(e.target))},containerRef:function(e){this.container=e},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var e;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",s.setAttribute(this.styleElement,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.head.appendChild(this.styleElement);var i="";for(var o in this.breakpoints)i+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-overlaypanel[`).concat(this.attributeSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=i}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(e){a.emit("overlay-click",{originalEvent:e,target:this.target})}},computed:{attributeSelector:function(){return O()},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{focustrap:K,ripple:S},components:{Portal:H,TimesIcon:R}},q=["aria-modal"],V=["aria-label"];function j(t,e,i,o,h,n){var b=D("Portal"),w=y("ripple"),C=y("focustrap");return r(),v(b,{appendTo:t.appendTo},{default:p(function(){return[T(B,l({name:"p-overlaypanel",onEnter:n.onEnter,onLeave:n.onLeave,onAfterLeave:n.onAfterLeave},t.ptm("transition")),{default:p(function(){return[h.visible?m((r(),d("div",l({key:0,ref:n.containerRef,role:"dialog","aria-modal":h.visible,onClick:e[5]||(e[5]=function(){return n.onOverlayClick&&n.onOverlayClick.apply(n,arguments)}),class:t.cx("root")},t.ptmi("root")),[t.$slots.container?f(t.$slots,"container",{key:0,onClose:n.hide,onKeydown:function(c){return n.onButtonKeydown(c)},closeCallback:n.hide,keydownCallback:function(c){return n.onButtonKeydown(c)}}):(r(),d(I,{key:1},[z("div",l({class:t.cx("content"),onClick:e[0]||(e[0]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onMousedown:e[1]||(e[1]=function(){return n.onContentClick&&n.onContentClick.apply(n,arguments)}),onKeydown:e[2]||(e[2]=function(){return n.onContentKeydown&&n.onContentKeydown.apply(n,arguments)})},t.ptm("content")),[f(t.$slots,"default")],16),t.showCloseIcon?m((r(),d("button",l({key:0,class:t.cx("closeButton"),"aria-label":n.closeAriaLabel,type:"button",autofocus:"",onClick:e[3]||(e[3]=function(){return n.hide&&n.hide.apply(n,arguments)}),onKeydown:e[4]||(e[4]=function(){return n.onButtonKeydown&&n.onButtonKeydown.apply(n,arguments)})},t.ptm("closeButton")),[f(t.$slots,"closeicon",{},function(){return[(r(),v(A(t.closeIcon?"span":"TimesIcon"),l({class:[t.cx("closeIcon"),t.closeIcon]},t.ptm("closeIcon")),null,16,["class"]))]})],16,V)),[[w]]):L("",!0)],64))],16,q)),[[C]]):L("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}N.render=j;export{N as default};
