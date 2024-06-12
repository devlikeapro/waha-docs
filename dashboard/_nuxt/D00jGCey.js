import{a3 as m,a7 as d,t as o,v as u,x as p,aa as l,O as h}from"./Cy-Swep5.js";import{s as v}from"./CE8CCwkZ.js";var b={handle:{position:"absolute"},range:{position:"absolute"}},y={root:function(e){var n=e.props;return["p-slider p-component",{"p-disabled":n.disabled,"p-slider-horizontal":n.orientation==="horizontal","p-slider-vertical":n.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},D=m.extend({name:"slider",classes:y,inlineStyles:b}),S={name:"BaseSlider",extends:v,props:{modelValue:[Number,Array],min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:D,provide:function(){return{$parentInstance:this}}};function w(t){return P(t)||E(t)||L(t)||c()}function c(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function L(t,e){if(t){if(typeof t=="string")return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}}function E(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function P(t){if(Array.isArray(t))return f(t)}function f(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var A={name:"Slider",extends:S,inheritAttrs:!1,emits:["update:modelValue","change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var e=this.$el.getBoundingClientRect();this.initX=e.left+d.getWindowScrollLeft(),this.initY=e.top+d.getWindowScrollTop(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(e){var n,r=e.touches?e.touches[0].pageX:e.pageX,s=e.touches?e.touches[0].pageY:e.pageY;this.orientation==="horizontal"?n=(r-this.initX)*100/this.barWidth:n=(this.initY+this.barHeight-s)*100/this.barHeight;var a=(this.max-this.min)*(n/100)+this.min;if(this.step){var i=this.range?this.value[this.handleIndex]:this.value,g=a-i;g<0?a=i+Math.ceil(a/this.step-i/this.step)*this.step:g>0&&(a=i+Math.floor(a/this.step-i/this.step)*this.step)}else a=Math.floor(a);this.updateModel(e,a)},updateModel:function(e,n){var r=parseFloat(n.toFixed(10)),s;this.range?(s=this.value?w(this.value):[],this.handleIndex==0?(r<this.min?r=this.min:r>=this.max&&(r=this.max),s[0]=r):(r>this.max?r=this.max:r<=this.min&&(r=this.min),s[1]=r)):(r<this.min?r=this.min:r>this.max&&(r=this.max),s=r),this.$emit("update:modelValue",s),this.$emit("change",s)},onDragStart:function(e,n){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.value[0]===this.max?this.handleIndex=0:this.handleIndex=n,e.currentTarget.focus(),e.preventDefault())},onDrag:function(e){this.dragging&&(this.setValue(e),e.preventDefault())},onDragEnd:function(e){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:e,value:this.value}))},onBarClick:function(e){this.disabled||d.getAttribute(e.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(e))},onMouseDown:function(e,n){this.bindDragListeners(),this.onDragStart(e,n)},onKeyDown:function(e,n){switch(this.handleIndex=n,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,n),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,n),e.preventDefault();break;case"PageDown":this.decrementValue(e,n,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,n,!0),e.preventDefault();break;case"Home":this.updateModel(e,this.min),e.preventDefault();break;case"End":this.updateModel(e,this.max),e.preventDefault();break}},decrementValue:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,s;this.range?this.step?s=this.value[n]-this.step:s=this.value[n]-1:this.step?s=this.value-this.step:!this.step&&r?s=this.value-10:s=this.value-1,this.updateModel(e,s),e.preventDefault()},incrementValue:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,s;this.range?this.step?s=this.value[n]+this.step:s=this.value[n]+1:this.step?s=this.value+this.step:!this.step&&r?s=this.value+10:s=this.value+1,this.updateModel(e,s),e.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)}},computed:{value:function(){var e;if(this.range){var n,r,s,a;return[(n=(r=this.modelValue)===null||r===void 0?void 0:r[0])!==null&&n!==void 0?n:this.min,(s=(a=this.modelValue)===null||a===void 0?void 0:a[1])!==null&&s!==void 0?s:this.max]}return(e=this.modelValue)!==null&&e!==void 0?e:this.min},horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},rangeStyle:function(){if(this.range){var e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,n=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{left:n+"%",width:e+"%"}:{bottom:n+"%",height:e+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{left:this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},handlePosition:function(){return this.value<this.min?0:this.value>this.max?100:(this.value-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.value&&this.value[0]?(this.value[0]<this.min?0:this.value[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.value&&this.value.length===2?(this.value[1]>this.max?100:this.value[1]-this.min)*100/(this.max-this.min):100},rangeStartHandleStyle:function(){return this.horizontal?{left:this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{left:this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}}},V=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],M=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],k=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"];function H(t,e,n,r,s,a){return o(),u("div",l({class:t.cx("root"),onClick:e[15]||(e[15]=function(){return a.onBarClick&&a.onBarClick.apply(a,arguments)})},t.ptmi("root"),{"data-p-sliding":!1}),[p("span",l({class:t.cx("range"),style:[t.sx("range"),a.rangeStyle]},t.ptm("range")),null,16),t.range?h("",!0):(o(),u("span",l({key:0,class:t.cx("handle"),style:[t.sx("handle"),a.handleStyle],onTouchstartPassive:e[0]||(e[0]=function(i){return a.onDragStart(i)}),onTouchmovePassive:e[1]||(e[1]=function(i){return a.onDrag(i)}),onTouchend:e[2]||(e[2]=function(i){return a.onDragEnd(i)}),onMousedown:e[3]||(e[3]=function(i){return a.onMouseDown(i)}),onKeydown:e[4]||(e[4]=function(i){return a.onKeyDown(i)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("handle")),null,16,V)),t.range?(o(),u("span",l({key:1,class:t.cx("handle"),style:[t.sx("handle"),a.rangeStartHandleStyle],onTouchstartPassive:e[5]||(e[5]=function(i){return a.onDragStart(i,0)}),onTouchmovePassive:e[6]||(e[6]=function(i){return a.onDrag(i)}),onTouchend:e[7]||(e[7]=function(i){return a.onDragEnd(i)}),onMousedown:e[8]||(e[8]=function(i){return a.onMouseDown(i,0)}),onKeydown:e[9]||(e[9]=function(i){return a.onKeyDown(i,0)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue?t.modelValue[0]:null,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("startHandler")),null,16,M)):h("",!0),t.range?(o(),u("span",l({key:2,class:t.cx("handle"),style:[t.sx("handle"),a.rangeEndHandleStyle],onTouchstartPassive:e[10]||(e[10]=function(i){return a.onDragStart(i,1)}),onTouchmovePassive:e[11]||(e[11]=function(i){return a.onDrag(i)}),onTouchend:e[12]||(e[12]=function(i){return a.onDragEnd(i)}),onMousedown:e[13]||(e[13]=function(i){return a.onMouseDown(i,1)}),onKeydown:e[14]||(e[14]=function(i){return a.onKeyDown(i,1)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue?t.modelValue[1]:null,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("endHandler")),null,16,k)):h("",!0)],16)}A.render=H;export{A as default};
