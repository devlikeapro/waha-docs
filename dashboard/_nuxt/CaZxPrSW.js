import{s as i}from"./CE8CCwkZ.js";import{a3 as a,t as s,v as t,aa as r,x as o}from"./Cy-Swep5.js";var p={root:"p-progress-spinner",spinner:"p-progress-spinner-svg",circle:"p-progress-spinner-circle"},l=a.extend({name:"progressspinner",classes:p}),c={name:"BaseProgressSpinner",extends:i,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:l,provide:function(){return{$parentInstance:this}}},d={name:"ProgressSpinner",extends:c,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},g=["fill","stroke-width"];function m(e,u,v,f,y,n){return s(),t("div",r({class:e.cx("root"),role:"progressbar"},e.ptmi("root")),[(s(),t("svg",r({class:e.cx("spinner"),viewBox:"25 25 50 50",style:n.svgStyle},e.ptm("spinner")),[o("circle",r({class:e.cx("circle"),cx:"50",cy:"50",r:"20",fill:e.fill,"stroke-width":e.strokeWidth,strokeMiterlimit:"10"},e.ptm("circle")),null,16,g)],16))],16)}d.render=m;export{d as default};
