import{s as i}from"./CE8CCwkZ.js";import{a3 as s,t as a,v as o,aa as l}from"./Cy-Swep5.js";var p={root:{position:"relative"}},d={root:function(r){var t=r.props;return["p-skeleton p-component",{"p-skeleton-circle":t.shape==="circle","p-skeleton-none":t.animation==="none"}]}},u=s.extend({name:"skeleton",classes:d,inlineStyles:p}),c={name:"BaseSkeleton",extends:i,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},style:u,provide:function(){return{$parentInstance:this}}},h={name:"Skeleton",extends:c,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}}}};function S(e,r,t,f,m,n){return a(),o("div",l({class:e.cx("root"),style:[e.sx("root"),n.containerStyle],"aria-hidden":"true"},e.ptmi("root")),null,16)}h.render=S;export{h as default};
