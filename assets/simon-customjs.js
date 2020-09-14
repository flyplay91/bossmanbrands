/* option_selection.js */
function floatToString(t,e){var o=t.toFixed(e).toString();return o.match(/^\.\d+/)?"0"+o:o}if("undefined"==typeof Shopify)var Shopify={};Shopify.each=function(t,e){for(var o=0;o<t.length;o++)e(t[o],o)},Shopify.map=function(t,e){for(var o=[],i=0;i<t.length;i++)o.push(e(t[i],i));return o},Shopify.arrayIncludes=function(t,e){for(var o=0;o<t.length;o++)if(t[o]==e)return!0;return!1},Shopify.uniq=function(t){for(var e=[],o=0;o<t.length;o++)Shopify.arrayIncludes(e,t[o])||e.push(t[o]);return e},Shopify.isDefined=function(t){return"undefined"==typeof t?!1:!0},Shopify.getClass=function(t){return Object.prototype.toString.call(t).slice(8,-1)},Shopify.extend=function(t,e){function o(){}o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t,t.baseConstructor=e,t.superClass=e.prototype},Shopify.locationSearch=function(){return window.location.search},Shopify.locationHash=function(){return window.location.hash},Shopify.replaceState=function(t){window.history.replaceState({},document.title,t)},Shopify.urlParam=function(t){var e=RegExp("[?&]"+t+"=([^&#]*)").exec(Shopify.locationSearch());return e&&decodeURIComponent(e[1].replace(/\+/g," "))},Shopify.newState=function(t,e){var o;return o=Shopify.urlParam(t)?Shopify.locationSearch().replace(RegExp("("+t+"=)[^&#]+"),"$1"+e):""===Shopify.locationSearch()?"?"+t+"="+e:Shopify.locationSearch()+"&"+t+"="+e,o+Shopify.locationHash()},Shopify.setParam=function(t,e){Shopify.replaceState(Shopify.newState(t,e))},Shopify.Product=function(t){Shopify.isDefined(t)&&this.update(t)},Shopify.Product.prototype.update=function(t){for(property in t)this[property]=t[property]},Shopify.Product.prototype.optionNames=function(){return"Array"==Shopify.getClass(this.options)?this.options:[]},Shopify.Product.prototype.optionValues=function(t){if(!Shopify.isDefined(this.variants))return null;var e=Shopify.map(this.variants,function(e){var o="option"+(t+1);return void 0==e[o]?null:e[o]});return null==e[0]?null:Shopify.uniq(e)},Shopify.Product.prototype.getVariant=function(t){var e=null;return t.length!=this.options.length?e:(Shopify.each(this.variants,function(o){for(var i=!0,r=0;r<t.length;r++){var n="option"+(r+1);o[n]!=t[r]&&(i=!1)}return 1==i?void(e=o):void 0}),e)},Shopify.Product.prototype.getVariantById=function(t){for(var e=0;e<this.variants.length;e++){var o=this.variants[e];if(t==o.id)return o}return null},Shopify.money_format="$",Shopify.formatMoney=function(t,e){function o(t,e){return"undefined"==typeof t?e:t}function i(t,e,i,r){if(e=o(e,2),i=o(i,","),r=o(r,"."),isNaN(t)||null==t)return 0;t=(t/100).toFixed(e);var n=t.split("."),a=n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+i),s=n[1]?r+n[1]:"";return a+s}"string"==typeof t&&(t=t.replace(".",""));var r="",n=/\{\{\s*(\w+)\s*\}\}/,a=e||this.money_format;switch(a.match(n)[1]){case"amount":r=i(t,2);break;case"amount_no_decimals":r=i(t,0);break;case"amount_with_comma_separator":r=i(t,2,".",",");break;case"amount_with_apostrophe_separator":r=i(t,2);break;case"amount_no_decimals_with_comma_separator":r=i(t,0,".",",")}return a.replace(n,r)},Shopify.OptionSelectors=function(t,e){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.historyState=null,this.selectors=[],this.domIdPrefix=t,this.product=new Shopify.Product(e.product),this.onVariantSelected=Shopify.isDefined(e.onVariantSelected)?e.onVariantSelected:function(){},this.replaceSelector(t),this.initDropdown(),e.enableHistoryState&&(this.historyState=new Shopify.OptionSelectors.HistoryState(this)),!0},Shopify.OptionSelectors.prototype.initDropdown=function(){var t={initialLoad:!0},e=this.selectVariantFromDropdown(t);if(!e){var o=this;setTimeout(function(){o.selectVariantFromParams(t)||o.fireOnChangeForFirstDropdown.call(o,t)})}},Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown=function(t){this.selectors[0].element.onchange(t)},Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown=function(t){var e=this.selectVariantFromParams(t);e||this.selectVariantFromDropdown(t)},Shopify.OptionSelectors.prototype.replaceSelector=function(t){var e=document.getElementById(t),o=e.parentNode;Shopify.each(this.buildSelectors(),function(t){o.insertBefore(t,e)}),e.style.display="none",this.variantIdField=e},Shopify.OptionSelectors.prototype.selectVariantFromDropdown=function(t){var e=document.getElementById(this.domIdPrefix).querySelector("[selected]");if(e||(e=document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')),!e)return!1;var o=e.value;return this.selectVariant(o,t)},Shopify.OptionSelectors.prototype.selectVariantFromParams=function(t){var e=Shopify.urlParam("variant");return this.selectVariant(e,t)},Shopify.OptionSelectors.prototype.selectVariant=function(t,e){var o=this.product.getVariantById(t);if(null==o)return!1;for(var i=0;i<this.selectors.length;i++){var r=this.selectors[i].element,n=r.getAttribute("data-option"),a=o[n];null!=a&&this.optionExistInSelect(r,a)&&(r.value=a)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",e):this.selectors[0].element.onchange(e),!0},Shopify.OptionSelectors.prototype.optionExistInSelect=function(t,e){for(var o=0;o<t.options.length;o++)if(t.options[o].value==e)return!0},Shopify.OptionSelectors.prototype.insertSelectors=function(t,e){Shopify.isDefined(e)&&this.setMessageElement(e),this.domIdPrefix="product-"+this.product.id+"-variant-selector";var o=document.getElementById(t);Shopify.each(this.buildSelectors(),function(t){o.appendChild(t)})},Shopify.OptionSelectors.prototype.buildSelectors=function(){for(var t=0;t<this.product.optionNames().length;t++){var e=new Shopify.SingleOptionSelector(this,t,this.product.optionNames()[t],this.product.optionValues(t));e.element.disabled=!1,this.selectors.push(e)}var o=this.selectorDivClass,i=this.product.optionNames(),r=Shopify.map(this.selectors,function(t){var e=document.createElement("div");if(e.setAttribute("class",o),i.length>1){var r=document.createElement("label");r.htmlFor=t.element.id,r.innerHTML=t.name,e.appendChild(r)}return e.appendChild(t.element),e});return r},Shopify.OptionSelectors.prototype.selectedValues=function(){for(var t=[],e=0;e<this.selectors.length;e++){var o=this.selectors[e].element.value;t.push(o)}return t},Shopify.OptionSelectors.prototype.updateSelectors=function(t,e){var o=this.selectedValues(),i=this.product.getVariant(o);i?(this.variantIdField.disabled=!1,this.variantIdField.value=i.id):this.variantIdField.disabled=!0,this.onVariantSelected(i,this,e),null!=this.historyState&&this.historyState.onVariantChange(i,this,e)},Shopify.OptionSelectorsFromDOM=function(t,e){var o=e.optionNames||[],i=e.priceFieldExists||!0,r=e.delimiter||"/",n=this.createProductFromSelector(t,o,i,r);e.product=n,Shopify.OptionSelectorsFromDOM.baseConstructor.call(this,t,e)},Shopify.extend(Shopify.OptionSelectorsFromDOM,Shopify.OptionSelectors),Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector=function(t,e,o,i){if(!Shopify.isDefined(o))var o=!0;if(!Shopify.isDefined(i))var i="/";var r=document.getElementById(t),n=r.childNodes,a=(r.parentNode,e.length),s=[];Shopify.each(n,function(t,r){if(1==t.nodeType&&"option"==t.tagName.toLowerCase()){var n=t.innerHTML.split(new RegExp("\\s*\\"+i+"\\s*"));0==e.length&&(a=n.length-(o?1:0));var p=n.slice(0,a),l=o?n[a]:"",c=(t.getAttribute("value"),{available:t.disabled?!1:!0,id:parseFloat(t.value),price:l,option1:p[0],option2:p[1],option3:p[2]});s.push(c)}});var p={variants:s};if(0==e.length){p.options=[];for(var l=0;a>l;l++)p.options[l]="option "+(l+1)}else p.options=e;return p},Shopify.SingleOptionSelector=function(t,e,o,i){this.multiSelector=t,this.values=i,this.index=e,this.name=o,this.element=document.createElement("select");for(var r=0;r<i.length;r++){var n=document.createElement("option");n.value=i[r],n.innerHTML=i[r],this.element.appendChild(n)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(e+1)),this.element.id=t.domIdPrefix+"-option-"+e,this.element.onchange=function(o,i){i=i||{},t.updateSelectors(e,i)},!0},Shopify.Image={preload:function(t,e){for(var o=0;o<t.length;o++){var i=t[o];this.loadImage(this.getSizedImageUrl(i,e))}},loadImage:function(t){(new Image).src=t},switchImage:function(t,e,o){if(t&&e){var i=this.imageSize(e.src),r=this.getSizedImageUrl(t.src,i);o?o(r,t,e):e.src=r}},imageSize:function(t){var e=t.match(/_(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\./);return null!=e?e[1]:null},getSizedImageUrl:function(t,e){if(null==e)return t;if("master"==e)return this.removeProtocol(t);var o=t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null!=o){var i=t.split(o[0]),r=o[0];return this.removeProtocol(i[0]+"_"+e+r)}return null},removeProtocol:function(t){return t.replace(/http(s)?:/,"")}},Shopify.OptionSelectors.HistoryState=function(t){this.browserSupports()&&this.register(t)},Shopify.OptionSelectors.HistoryState.prototype.register=function(t){window.addEventListener("popstate",function(e){t.selectVariantFromParamsOrDropdown({popStateCall:!0})})},Shopify.OptionSelectors.HistoryState.prototype.onVariantChange=function(t,e,o){this.browserSupports()&&(!t||o.initialLoad||o.popStateCall||Shopify.setParam("variant",t.id))},Shopify.OptionSelectors.HistoryState.prototype.browserSupports=function(){return window.history&&window.history.replaceState};


/*! js-url - v2.5.0 - 2017-04-22 */
!function(){var a=function(){function a(){}function b(a){return decodeURIComponent(a.replace(/\+/g," "))}function c(a,b){var c=a.charAt(0),d=b.split(c);return c===a?d:(a=parseInt(a.substring(1),10),d[a<0?d.length+a:a-1])}function d(a,c){for(var d=a.charAt(0),e=c.split("&"),f=[],g={},h=[],i=a.substring(1),j=0,k=e.length;j<k;j++)if(f=e[j].match(/(.*?)=(.*)/),f||(f=[e[j],e[j],""]),""!==f[1].replace(/\s/g,"")){if(f[2]=b(f[2]||""),i===f[1])return f[2];h=f[1].match(/(.*)\[([0-9]+)\]/),h?(g[h[1]]=g[h[1]]||[],g[h[1]][h[2]]=f[2]):g[f[1]]=f[2]}return d===a?g:g[i]}return function(b,e){var f,g={};if("tld?"===b)return a();if(e=e||window.location.toString(),!b)return e;if(b=b.toString(),f=e.match(/^mailto:([^\/].+)/))g.protocol="mailto",g.email=f[1];else{if((f=e.match(/(.*?)\/#\!(.*)/))&&(e=f[1]+f[2]),(f=e.match(/(.*?)#(.*)/))&&(g.hash=f[2],e=f[1]),g.hash&&b.match(/^#/))return d(b,g.hash);if((f=e.match(/(.*?)\?(.*)/))&&(g.query=f[2],e=f[1]),g.query&&b.match(/^\?/))return d(b,g.query);if((f=e.match(/(.*?)\:?\/\/(.*)/))&&(g.protocol=f[1].toLowerCase(),e=f[2]),(f=e.match(/(.*?)(\/.*)/))&&(g.path=f[2],e=f[1]),g.path=(g.path||"").replace(/^([^\/])/,"/$1"),b.match(/^[\-0-9]+$/)&&(b=b.replace(/^([^\/])/,"/$1")),b.match(/^\//))return c(b,g.path.substring(1));if(f=c("/-1",g.path.substring(1)),f&&(f=f.match(/(.*?)\.(.*)/))&&(g.file=f[0],g.filename=f[1],g.fileext=f[2]),(f=e.match(/(.*)\:([0-9]+)$/))&&(g.port=f[2],e=f[1]),(f=e.match(/(.*?)@(.*)/))&&(g.auth=f[1],e=f[2]),g.auth&&(f=g.auth.match(/(.*)\:(.*)/),g.user=f?f[1]:g.auth,g.pass=f?f[2]:void 0),g.hostname=e.toLowerCase(),"."===b.charAt(0))return c(b,g.hostname);a()&&(f=g.hostname.match(a()),f&&(g.tld=f[3],g.domain=f[2]?f[2]+"."+f[3]:void 0,g.sub=f[1]||void 0)),g.port=g.port||("https"===g.protocol?"443":"80"),g.protocol=g.protocol||("443"===g.port?"https":"http")}return b in g?g[b]:"{}"===b?g:void 0}}();"function"==typeof window.define&&window.define.amd?window.define("js-url",[],function(){return a}):("undefined"!=typeof window.jQuery&&window.jQuery.extend({url:function(a,b){return window.url(a,b)}}),window.url=a)}();

/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();


window.theme = window.theme || {};
// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
}

theme.ProductVideo = (function() {
  var videos = {};

  var hosts = {
    html5: 'html5',
    youtube: 'youtube'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]',
    productMediaGroup: '[data-product-single-media-group]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer.length) {
      return;
    }

    var videoElement = videoContainer.find('iframe, video')[0];
    var mediaId = videoContainer.data('mediaId');

    if (!videoElement) {
      return;
    }

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function() {
        createPlayer(this);
      }
    };

    var video = videos[mediaId];

    switch (video.host) {
      case hosts.html5:
        window.Shopify.loadFeatures([
          {
            name: 'video-ui',
            version: '1.1',
            onLoad: setupPlyrVideos
          }
        ]);
        theme.LibraryLoader.load('plyrShopifyStyles');
        break;
      case hosts.youtube:
        theme.LibraryLoader.load('youtubeSdk');
        break;
    }
  }

  function setupPlyrVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos(hosts.html5);
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );
    var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

    switch (video.host) {
      case hosts.html5:
        // eslint-disable-next-line no-undef
        video.player = new Shopify.Plyr(video.element, {
          loop: { active: enableLooping }
        });

        var $productMediaGroup = $(video.container).closest(
          selectors.productMediaGroup
        );

        video.player.on('seeking', function() {
          theme.updateSlickSwipe($productMediaGroup, false);
        });

        video.player.on('seeked', function() {
          theme.updateSlickSwipe($productMediaGroup, true);
        });

        break;
      case hosts.youtube:
        var videoId = productMediaWrapper.data(attributes.videoId);

        video.player = new YT.Player(video.element, {
          videoId: videoId,
          events: {
            onStateChange: function(event) {
              if (event.data === 0 && enableLooping) event.target.seekTo(0);
            }
          }
        });
        break;
    }

    productMediaWrapper.on('mediaHidden xrLaunch', function() {
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }

      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }
    });

    productMediaWrapper.on('mediaVisible', function() {
      if (Modernizr.touch) return;
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.play();
      }

      if (video.host === hosts.youtube && video.player.playVideo) {
        video.player.playVideo();
      }
    });
  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.html5;
    }

    if (video.tagName === 'IFRAME') {
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          video.src
        )
      ) {
        return hosts.youtube;
      }
    }
    return null;
  }

  function loadVideos(host) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        if (video.host === host) {
          video.ready();
        }
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.html5) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };
})();

/* ================ GLOBAL ================ */
theme.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    youtubeSdk: {
      tagId: 'youtube-sdk',
      src: 'https://www.youtube.com/iframe_api',
      type: types.script
    },
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();

$(document).ready(function() {
	$('body').on('click', '.product-faq-block > h3', function() {
		$('.product-faq-block').removeClass('active');
		$(this).closest('.product-faq-block').addClass('active');
		$(this).closest('.product-faq-block').siblings().find('p').slideUp(350);
		$(this).next().slideDown(350);
	});


  	$('body').on('click', '.close-free-shipping', function() {
	    $(this).closest('.panel').hide();
	    $(this).closest('#header').css('padding-top', '0');
  	});

  	$(window).scroll(function() {
	    if ($(window).scrollTop() > 0) {
	      $('.main-menu').css('top', '160px');
	      $('#header .container').css('position', 'unset');
	    } else {
	      $('#header .container').css('position', 'relative');
	      $('.main-menu').css('top', '62px');
	      
	    }
  	});
  
  
  	var $container = $('.product-template');
    var sectionId = $container.attr('data-section-id');

    $('[data-product-media-type-video]', $container).each(function() {
      var $videoContainer = $(this);
      theme.ProductVideo.init($videoContainer, sectionId);
    });
  	
  	if ($(window).width() > 768) {
		$('.stage-video').hover(function(){
			$(this).find('video').show();
		  	$(this).find('video').get(0).play();
	  		}, function(){
		  	$(this).find('video').hide();
		});

	} else {
		$('body').on('click', '.stage-video', function(){

			$(this).toggleClass('toggle-video');
			if ($(this).hasClass('toggle-video')) {
				$(this).find('video').show();
				$(this).find('video').get(0).play();
			} else {
				$(this).find('video').hide();
			}
	  	});
	}
  
  	if ($('#rc_container').length == 0) {
		$('.atc-button--checkout.normal-checkout').show();
	} else {
		$('.atc-button--checkout.recharge-checkout').show();
	}
  
    $('body').on('change', '.swatch :radio', function() {
        var optionIndex = $(this).closest('.swatch').attr('data-option-index');
        var optionValue = $(this).val();

        $(this)
          .closest('form')
          .find('.single-option-selector')
          .eq(optionIndex)
          .val(optionValue)
          .trigger('change');
    });

    $('body').on('click', '.guarantee-block > a', function() {
    	$(this).closest('.guarantee-block').toggleClass('active');
    	$(this).closest('.guarantee-block').siblings().removeClass('active');
    });

    $('body').on('click', '.tab-content .colors-list li', function() {
    	$('.tab-content .colors-list li').removeClass('active');
    	$(this).addClass('active');
    });

    if ($('.drop-colors-filter .filter-option.selected').length != 0) {
    	$('.stage--opener').hide();
    } else {
    	$('.stage--opener').show();
    }

    if ($('.stage-dropdown .filter-option.selected').length != 0) {
    	$('.scents--opener').hide();
    } else {
    	$('.scents--opener').show();
    }

    window.triggeredFromAjax = false;
    initProductGridOptions();
    $(".product_form").each(function(i, v) {
        var $productForm = $(v);
        //Initiate selectCallback
        if($productForm.hasClass("product_form_options") && $productForm.hasClass("viewed") == false) {
          //If form hasn't been viewed previously, run OptionSelectors function
            new Shopify.OptionSelectors($productForm.data("select-id"),
            {
                product: $productForm.data("product"),
                onVariantSelected: selectCallback,
                enableHistoryState: $productForm.data("enable-state")
            });
        }

        //Link sold out options when there is more than one option available (eg. S is selected and Yellow option appears as sold out)

        const JSONData = $productForm.data('product');
        const productID = $productForm.section_id;
        const productSection = '.product-' + productID + ' .js-product_section';
        const swatchOptions = $productForm.find('.swatch_options .swatch');
        if (swatchOptions.length > 1){
            Shopify.linkOptionSelectors(JSONData, productSection);
        }

        $productForm.closest('.product-block').find('select[name="id"]').trigger('change');
    });

    
    
    $('body').on('click', '.filter-option', function(e) {
        e.preventDefault();
        var selectedFilterName = $(this).data('value');
        if ($(this).closest('.drop-colors-filter').find('.filter-option.selected').length >= 3) {
        	if ($(this).hasClass('selected')) {
        		$(this).removeClass('selected');
        		
	        	$('.products-filter .current-colors .current-color-block[data-value="' + selectedFilterName + '"]').toggleClass('active');
		        
		        // Remove selected filter name from Selected Options.
	        	selectedOptions = $.makeArray(selectedOptions);      
		        //Loop through tags to create string to update page url
		        var selectedIndex = 0;
		        $.each(selectedOptions, function(i, value){
		        	if(selectedFilterName == value) {
		        		selectedIndex = i;
		        	}
		        });
		        selectedOptions.splice(selectedIndex, 1);

		        quickFilter.init();	
        		$('.reached-warnning').removeClass('active');
        	} else {
        		$('.reached-warnning').addClass('active');
        	}
        } else {
        	$('.reached-warnning').removeClass('active');
        	$(this).toggleClass('selected');
        	
        	$('.products-filter .current-colors .current-color-block[data-value="' + selectedFilterName + '"]').toggleClass('active');
	        
	        if ($(this).hasClass('selected')) {
	        	// Add selected filter name
	        	window.selectedOptions.push(selectedFilterName);
	        } else {
	        	// Remove selected filter name from Selected Options.
	        	selectedOptions = $.makeArray(selectedOptions);      
		        //Loop through tags to create string to update page url
		        var selectedIndex = 0;
		        $.each(selectedOptions, function(i, value){
		        	if(selectedFilterName == value) {
		        		selectedIndex = i;
		        	}
		        });
		        selectedOptions.splice(selectedIndex, 1);
	        }

	        quickFilter.init();	
        }

        if ($(this).closest('.drop-colors-filter').find('.filter-option.selected').length != 0) {
        	$('.stage--opener').hide();
        } else {
        	$('.stage--opener').show();
        }

        if ($(this).closest('.stage-dropdown').find('.filter-option.selected').length != 0) {
        	$('.scents--opener').hide();
        } else {
        	$('.scents--opener').show();
        }

    });

    if (($('.current-color-block[data-value="stage-1"].active').length == 0) 
    	&& ($('.current-color-block[data-value="stage-2"].active').length == 0)
    	&& ($('.current-color-block[data-value="stage-3"].active').length == 0)
    	&& ($('.current-color-block[data-value="stage-4"].active').length == 0)) {
    	$('.scents--opener').show();
    } else {
    	$('.scents--opener').hide();
    }

    if (($('.current-color-block[data-value="royal-oud"].active').length == 0) 
    	&& ($('.current-color-block[data-value="the-gatsby"].active').length == 0)
    	&& ($('.current-color-block[data-value="vetiver-x"].active').length == 0)
    	&& ($('.current-color-block[data-value="hammer"].active').length == 0)
    	&& ($('.current-color-block[data-value="naked"].active').length == 0) 
    	&& ($('.current-color-block[data-value="gold"].active').length == 0)
    	&& ($('.current-color-block[data-value="magic"].active').length == 0)
    	&& ($('.current-color-block[data-value="stagecoach"].active').length == 0)) {
    	$('.stage--opener').show();
    } else {
    	$('.stage--opener').hide();
    }

    $('body').on('click', '.current-colors .current-color-block', function(e) {
        e.preventDefault();
        var selectedFilterName = $(this).data('value');
        $(this).removeClass('active');
        $('.drop-colors-filter .filter-option[data-value="' + selectedFilterName + '"]').toggleClass('selected');
        $('.stage-dropdown .filter-option[data-value="' + selectedFilterName + '"]').toggleClass('selected');

        if (($('.current-color-block[data-value="stage-1"].active').length == 0) 
        	&& ($('.current-color-block[data-value="stage-2"].active').length == 0)
        	&& ($('.current-color-block[data-value="stage-3"].active').length == 0)
        	&& ($('.current-color-block[data-value="stage-4"].active').length == 0)) {
        	$('.scents--opener').show();
        }

        if (($('.current-color-block[data-value="royal-oud"].active').length == 0) 
        	&& ($('.current-color-block[data-value="the-gatsby"].active').length == 0)
        	&& ($('.current-color-block[data-value="vetiver-x"].active').length == 0)
        	&& ($('.current-color-block[data-value="hammer"].active').length == 0)
        	&& ($('.current-color-block[data-value="naked"].active').length == 0) 
        	&& ($('.current-color-block[data-value="gold"].active').length == 0)
        	&& ($('.current-color-block[data-value="magic"].active').length == 0)
        	&& ($('.current-color-block[data-value="stagecoach"].active').length == 0)) {
        	$('.stage--opener').show();
        }
        selectedOptions = $.makeArray(selectedOptions);      
        //Loop through tags to create string to update page url
        var selectedIndex = 0;
        $.each(selectedOptions, function(i, value){
        	if(selectedFilterName == value) {
        		selectedIndex = i;
        	}
        });
        selectedOptions.splice(selectedIndex, 1);

        quickFilter.init();
    });

    $('body').on('click', '.filter-open .scents--opener', function(e) {
        e.preventDefault();
        $(this).closest('.filter-open').toggleClass('active');
    });

    $('body').on('click', '.filter-open .stage--opener', function(e) {
        e.preventDefault();
        $(this).closest('.filter-open').toggleClass('stage-active');
    });

    $('body').on('click', '.stage-dropdown .filter-option', function(e) {
        e.preventDefault();
        $(this).closest('.filter-open').removeClass('stage-active');
    });

    productSwatches();
    productAddToCart();

    
    var $blogItems = $('.tags-blog-block .tag-blog-item');
   	$('.blog-tag').mouseenter(function() {
   		var selectedBlogTag = $(this).data('value');
   		$blogItems.filter('.active').removeClass('active').end()
   				  .filter('[data-value="' + selectedBlogTag + '"]').addClass('active');

	}).mouseleave(function(e) {
        const className = 'blog-list';
      	if (e.hasOwnProperty('toElement') && $(e.toElement).hasClass(className)) {
          return;
        } else if (e.hasOwnProperty('relatedTarget') && $(e.relatedTarget).hasClass(className)) {
          return;
        }

	  	$blogItems.filter('.active').removeClass('active');
   	});

   	$('.tags-blog-block').mouseleave(function() {
   		$blogItems.filter('.active').removeClass('active');
   	});
  

  	$('.beardcarepackages .package-wrapper').on('init', function(event, slick){
	    $('.beardcarepackages .package-wrapper.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

  	$('.beardcarepackages .package-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
      	arrows: true,
        responsive: [
        	{
              	breakpoint: 480,
              	settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
              	}
            }
        ]
    });
  
//     $('.featured-on-logos').on('init', function(event, slick){
//           $('.featured-on-logos.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
//       });

//       $('.featured-on-logos').slick({
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           dots: false,
//           responsive: [
//               {
//                   breakpoint: 480,
//                   settings: {
//                       slidesToShow: 1,
//                       slidesToScroll: 1,
//                       autoplay: true
//                   }
//               }
//           ]
//       });
  
  	$(window).scroll(function() {
      
        if ($('.product-bottom-sticky').length != 0) {
          if ($(window).scrollTop() > 1) {
            $('.product-bottom-sticky').addClass('active');
          } else {
            $('.product-bottom-sticky').removeClass('active');
          }
        }
	});
  
    $('body').on('click', '.product-bottom-btn a', function() {
      $('.add_to_cart.hide-cart-button').trigger('click');
      setTimeout(function(){ 
        $('.product-bottom-btn a').text('Proceed to checkout');
        $('.product-bottom-btn a').attr('href', '/cart');
      }, 2000);
    });
  
  	$(window).on('scroll', function() {
	    // if($(this).scrollTop()>=$('.article__content--sidebar').offset().top){
	    //     $('.article__content').addClass('sticky-product');
	    // } else {
	    // 	$('.article__content').removeClass('sticky-product');
	    // }

	    if ($('.article__content').length != 0) {
          if ($(window).width() > 768) {
              var contentTop = $('.article__content').offset().top;
              var $sticky = $('.article__content--sidebar');
              var $stickyrStopper = $('.sticky-stopper');
              if (!!$sticky.offset()) {

                  var generalSidebarHeight = $sticky.innerHeight();
                  var stickyTop = $sticky.offset().top;
                  var stickOffset = 0;
                  var stickyStopperPosition = $stickyrStopper.offset().top;
                  var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
                  var diff = stopPoint + stickOffset;

                  $(window).scroll(function(){ // scroll event
                      var windowTop = $(window).scrollTop(); // returns number

                      if (stopPoint < windowTop) {
                          $sticky.css({ position: 'absolute', top: diff });

                      } else if (contentTop < windowTop+stickOffset+2) {
                          $sticky.css({ position: 'fixed', top: stickOffset+100 });
                      } else {
                          $sticky.css({position: 'absolute', top: 'initial'});
                          $('.article__content--copy').css('margin-left', '430px');
                      }
                  });
              }
          }
	    }
	});
  
  
 //  	$(window).on('scroll', function() {
	// 	if ($(window).width() > 768) {
	// 	 	if ($('.product-holder').length != 0) {
	// 	    	var contentTop = $('.product-holder').offset().top;
	// 		    var $sticky = $('.product-holder .gallery-column');
	// 			var $stickyrStopper = $('.product-sticky-stopper');
	// 			if (!!$sticky.offset()) {

	// 				var generalSidebarHeight = $sticky.innerHeight();
	// 				var stickyTop = $sticky.offset().top;
	// 				var stickOffset = 0;
	// 				var stickyStopperPosition = $stickyrStopper.offset().top;
	// 				var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
	// 				var diff = stopPoint + stickOffset;

	// 				$(window).scroll(function(){ // scroll event
	// 				  	var windowTop = $(window).scrollTop(); // returns number

	// 				  	if (stopPoint < windowTop) {
	// 				      	$sticky.css({ position: 'absolute', top: diff });
 //                          	$('.product-holder .description').css('margin-left', '60%');

	// 				  	} else if (contentTop < windowTop+stickOffset+2) {
	// 				      	$sticky.css({ position: 'fixed', top: '70px' });
 //                          	$('.product-holder .description').css('margin-left', '60%');
	// 				  	} else {
	// 				      	$sticky.css({position: 'absolute', top: 'initial'});
	// 				      	$('.product-holder .description').css('margin-left', '60%');
	// 				  	}
	// 				});
	// 			}
	// 	    }
	// 	}
	// });

    

    // Product Image slider in Product pageurl
    $('.product-slider').on('init', function(event, slick){
	    $('.product-slider.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

    $('.slider-nav').on('init', function(event, slick){
	    $('.slider-nav.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

    $('.product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                dots: true,
                arrows:false,
                centerPadding: '20%',
                infinite: false
              }
            }
           
          ]
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        asNavFor: '.product-slider',
        dots: false,
        focusOnSelect: true,
        verticalSwiping: true
    });

    // Product tab
    $('body').on('click', '.product-tab-block .product-nav ul li', function() {
        $('.product-tab-block .product-nav ul li').removeClass('active');
        $(this).addClass('active');
        var selectedTabVal = $(this).data('value');
        $('.product-tab-content .tab-content').removeClass('active');
        $('.product-tab-content .tab-content[data-value="' + selectedTabVal + '"]').addClass('active');
    });

    var $gallery = $('.product-video-carousel .slideset');
    var slideCount = null;

    $gallery.on('init', function(event, slick){
        $('.product-video-carousel .slideset.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
        slideCount = slick.slideCount;
        setSlideCount();
        setCurrentSlideNumber(slick.currentSlide);
    });

    $gallery.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots: false,
        cssEase: 'linear',
        swipe: true,
        swipeToSlide: true,
        touchThreshold: 10
    });

    $gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
        var $el = $('.slide-count-wrap').find('.total');
        $el.text(slideCount);
    }

    function setCurrentSlideNumber(currentSlide) {
        var $el = $('.slide-count-wrap').find('.current');
        $el.text(currentSlide + 1);
    }

    // Product Detail page Testimonials video slider Fancy popup
    $(".product-video-area .view").fancybox();

    // Product Detailpage Testimonials video slider
    $(".testimonial-video-slider iframe").each(function (idx) {
    	$(this).addClass("data-idx-" + idx).data("idx", idx);
    });

	function getPlayer (iframe, onPlayerReady, clonned) {
		var $iframe = $(iframe);
        if ($iframe.data((clonned ? "clonned-" : "") + "player")) {
        	var isReady = $iframe.data((clonned ? "clonned-" : "") + "player-ready");
          	if (isReady) {
          		onPlayerReady && onPlayerReady($iframe.data((clonned ? "clonned-" : "") + "player"));
          	}
        	return player;
        } else {
    		var player = new YT.Player($iframe.get(0), {
	            events: {
	              	'onReady': function () {
	              		$iframe.data((clonned ? "clonned-" : "") + "player-ready", true);
	                	onPlayerReady && onPlayerReady(player);
	              	}
	            }
    		});
	        $iframe.data((clonned ? "clonned-" : "") + "player", player);
	        return player;
        }
    }
    
    //on first load, play the video
    $(".testimonial-video-slider").on('init', function(event, slick, currentSlide) {
        var currentSlide, player, command;
        currentSlide = $(slick.$slider).find(".slick-current");
        if (currentSlide.find("iframe").length != 0) {
        	onYouTubeIframeAPIReady = function() {
        		theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);

        		getPlayer(currentSlide.find("iframe"), function (player) {
	        		player.playVideo();
	        	});
        	};
        }    
        
    });

    //when new slide displays, play the video
    $(".testimonial-video-slider").on("afterChange", function(event, slick) {
        var currentSlide;
        currentSlide = $(slick.$slider).find(".slick-current");
        if (currentSlide.find("iframe").length != 0) {
        	getPlayer(currentSlide.find("iframe"), function (player) {
	        	player.playVideo();
	        });	
        }
    });
	
  	function updateClonnedFrames () {
    	frames = $(".testimonial-video-slider").find(".slick-slide").not(".slick-cloned").find("iframe");
      frames.each(function () {
      	var frame = $(this);
      	var idx = frame.data("idx");
      	clonedFrames = $(".testimonial-video-slider").find(".slick-cloned .data-idx-" + idx);
        console.log("clonedFrames", frame, idx, clonedFrames);
        clonedFrames.each(function () {
        	var clonnedFrame = this;
        	getPlayer(frame[0], function (player) {
            getPlayer(clonnedFrame, function (clonedPlayer) {         
              console.log("clonnedPlayer", clonedPlayer);
              clonedPlayer.playVideo();  
              clonedPlayer.seekTo(player.getCurrentTime(), true);
              setTimeout(function () {
              	clonedPlayer.pauseVideo();         
              }, 0);              
            }, true);
          });
        });        
      });    	    	
    }
  	
    //reset iframe of non current slide
    $(".testimonial-video-slider").on('beforeChange', function(event, slick, currentSlide) {
        var currentSlide, iframe, clonedFrame;
        currentSlide = $(slick.$slider).find(".slick-current");
        iframe = currentSlide.find("iframe");        
        getPlayer(iframe, function (player) {   
        	player.pauseVideo();
          updateClonnedFrames();
        });          
    });

    $('.product-block .image-block > a').on('init', function(event, slick){
	    $('.products-block').addClass('slick-init');
  	});

    var sliderElements = $('.product-block .image-block > a');
    $.each(sliderElements, function(i, v){
    	var initalIndex = 0;
    	if($(v).find('[data-initial-slide-item]').length > 0) {
    		initalIndex = $(v).find('[data-initial-slide-item]').index();
    	}
    	$(v).slick({
    		slidesToShow: 1,
	        slidesToShow: 1,
	        arrow: false,
    		initialSlide: initalIndex
    	})
    });

    $('.testimonial-video-slider').on('init', function(event, slick){
	    $('.testimonial-video-slider.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

    $('.testimonial-video-slider').slick({
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '150px',
        infinite: true,
        variableWidth: true,
        dots: false,
        arrow: true
    });

    $('.template-product .products-gallery').on('init', function(event, slick){
	    $('.template-product .products-gallery.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

    $('.template-product .products-gallery').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode: true,
        // centerPadding: '50px',
        infinite: true,
        dots: false,
        arrow: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.3,
                slidesToScroll: 1,
                arrows:false,
                dots:false,
                centerMode: false,
                centerPadding: '20%',
                infinite: false
              }
            }
           
          ]
    });

    $('body').on('click', '.products-block .btn-hover-add', function() {
    	if ($(this).closest('.product-block').find('.collection-product .swatch_options').find('.swatch input').length != 0) {
    		if ($(this).closest('.product-block').find('.collection-product .swatch_options .swatch:first-child input:checked').length != 0) {
				$('.select-all-variant-warnning').removeClass('active');
				// $(this).closest('.product-block').find('.select-all-variant-warnning').removeClass('active');
			} else {

				$('.select-all-variant-warnning').removeClass('active');
				$(this).closest('.product-block').find('.select-all-variant-warnning').addClass('active');
			}
    	}
	});

    // Shop By Scent Page Recommendation slider
    $('.scent-recommendation-blocks').on('init', function(event, slick){
	    $('.scent-recommendation-blocks.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

    $('.scent-recommendation-blocks').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrow: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                dots:false,
                centerMode: false,
                centerPadding: '20%',
                infinite: false
              }
            }
           
          ]
    });

    $('body').on('click', '.wrapper.main-content', function(e) {
    	$('.atc-banner--container').removeClass('show-cart-popup');
      	$('body').css('overflow', 'visible');
    })

    $('.shop-scent-featured-blocks').on('init', function(event, slick){
	    $('.shop-scent-featured-blocks.slick-initialized').css({'opacity': '1', 'visibility': 'visible'});
  	});

   $('body').on('click', '.shop-by-scent-hero .scent-list a, .scent-block-nav li a', function() {
        var selectedScent = $(this).text();
        $('html, body').animate(
            {scrollTop: $('.scent-blocks .scent-block[data-value="' + selectedScent + '"]').position().top}, 'slow'
        );
    });

    $('body').on('click', '.scent-block .scent-block-nav a', function() {
        $('.scent-blocks .scent-block').removeClass('active');
        var selectedScent = $(this).text();
        $('.scent-blocks .scent-block[data-value="' + selectedScent + '"]').addClass('active');
    });

    
	var currentUrl = window.location.href;
  	var urlParts = currentUrl.split("=");
	var variantId = urlParts[urlParts.length-1];
	
  	$('.swatch_options .swatch-element[data-id="' + variantId + '"]').find('label').trigger('click');

  if (typeof(last_selected_tag) != 'undefined') {
  	$('.swatch_options .swatch-element[data-value="' + last_selected_tag + '"]').trigger('click');
  }

});



$(window).on('load', function() {
    productAddToCart();
})

function productAddToCart() {
    $('body').on('click', '.add-to-cart-block a', function(e) {
        var $productItem = $(this).closest('.product-block');
        var isSubscriptionProduct = $productItem.find('.bold-ro__product').length > 0 ? true: false;
        if (isSubscriptionProduct) {
            var target = $productItem.data('url');
            e.preventDefault();
            window.location = target;
        } else {
            $(this).closest('.product-block').find('.purchase-details__buttons .action_button').trigger('click');
        }
    })
}

//Check if device is touch-enabled
function is_touch_device() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

/*============================================================================
  Swatch OptionSelectorsoptions - second and third swatch 'sold-out' will update based on availability of previous options selected
==============================================================================*/
Shopify.updateOptionsInSelector = function(selectorIndex, parent) {

    switch (selectorIndex) {
        case 0:
            var key = 'root';
            var selector = $(parent + ' .single-option-selector:eq(0)');
            break;
        case 1:
            var key = $(parent + ' .single-option-selector:eq(0)').val();
            var selector = $(parent + ' .single-option-selector:eq(1)');
            break;
        case 2:
            var key = $(parent + ' .single-option-selector:eq(0)').val();
            key += ' / ' + $(parent + ' .single-option-selector:eq(1)').val();
            var selector = $(parent + ' .single-option-selector:eq(2)');
    }

    var availableOptions = Shopify.optionsMap[key];
    $(parent + ' .swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
        if ($.inArray($(this).attr('data-value'), availableOptions) !== -1) {
            $(this).removeClass('soldout').find(':radio').removeAttr('disabled','disabled').removeAttr('checked');
        }
        else {
            $(this).addClass('soldout').find(':radio').removeAttr('checked').attr('disabled','disabled');
        }
  });

};

Shopify.linkOptionSelectors = function(product, parent) {
    // Building our mapping object.
    Shopify.optionsMap = {};
    for (var i=0; i<product.variants.length; i++) {
        var variant = product.variants[i];
        if (variant.available) {
            // Gathering values for the 1st drop-down.
            Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
            Shopify.optionsMap['root'].push(variant.option1);
            Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
            // Gathering values for the 2nd drop-down.
            if (product.options.length > 1) {
                var key = variant.option1;
                Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                Shopify.optionsMap[key].push(variant.option2);
                Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
            // Gathering values for the 3rd drop-down.
            if (product.options.length === 3) {
                var key = variant.option1 + ' / ' + variant.option2;
                Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                Shopify.optionsMap[key].push(variant.option3);
                Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
        }
    }
    // Update options right away.
    Shopify.updateOptionsInSelector(0, parent);
    if (product.options.length > 1) Shopify.updateOptionsInSelector(1, parent);
    if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
    // When there is an update in the first dropdown.
    $(parent + " .single-option-selector:eq(0)").change(function() {
        Shopify.updateOptionsInSelector(1, parent);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
        return true;
    });
    // When there is an update in the second dropdown.
    $(parent + " .single-option-selector:eq(1)").change(function() {
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
        return true;
    });
};

selectCallback = function(variant, selector) {

    var $product = $('.product-block--' + selector.product.id);
    var $productForm = $('.product_form, .shopify-product-form', $product);
    var variantInventory = $productForm.data('variant-inventory');

    if (variant) {
    	var variantId = variant.id;
        $('.product-bottom-title').text(variant.title);
        $('.product-bottom-price').text(Shopify.formatMoney(variant.price, $('body').data('money-format')));
      
      	if ($('.variant-image').length == 0) {
      		if ($('.product-holder .slider-nav').hasClass('slick-initialized')) {
	          	if (variant.featured_image != null) {
		    		var variantImgIndex = variant.featured_image.position;
					$('.product-holder .slider-nav').slick('slickGoTo', variantImgIndex - 1);
	          	}
    		}
      	} else {
      		if ($('.product-holder .slider-nav').hasClass('slick-initialized')) {

	          	if (variant.featured_image != null) {
		          	$selectedVariantOption = $product.find('.variant-image[data-variant-id="' + variantId + '"]');
		    		var variantImgIndex = $selectedVariantOption.closest('.slick-slide').data('slickIndex');
					$('.product-holder .slider-nav').slick('slickGoTo', variantImgIndex);
	          	}
	    	}
      	}

      	if(!window.triggeredFromAjax) {
	      	if ($('.variant-image').length == 0) {
		    	if ($product.find('.image-block > a').hasClass('slick-initialized')) {
		    		if (variant.featured_image != null) {
		    			var variantImgIndex = variant.featured_image.position;
						$product.find('.image-block > a').slick('slickGoTo', variantImgIndex - 1);	
		    		}
		    	}	
	      	} else {
		    	if ($product.find('.image-block > a').hasClass('slick-initialized')) {
		    		if (variant.featured_image != null) {
		    			$selectedVariantOption = $product.find('.variant-image[data-variant-id="' + variantId + '"]');

		    			var variantImgIndex = $selectedVariantOption.closest('.slick-slide').data('slickIndex');
						$product.find('.image-block > a').slick('slickGoTo', variantImgIndex);	
		    		}
		    	}
	      	}
	    }
    	

    	$product.find('.collection-add-cart > input').val(variant.id);
    	


        if (variantInventory) {
            variantInventory.forEach(function(v){
                if (v.id === variant.id) {

                    variant.inventory_quantity = v.inventory_quantity;
                    variant.inventory_management = v.inventory_management;
                    variant.inventory_policy = v.inventory_policy;
                }
            });
        }

        for (var i=0,length=variant.options.length; i<length; i++) {
            var radioButton = $productForm.find('.swatch[data-option-index="' + escape(i) + '"] :radio[value="' + variant.options[i].replace(/\"/g,'\\"') +'"]');
            if (radioButton.length) {
                radioButton.get(0).checked = true;
            }
        }
    }

    if (variant && variant.available == true) {
        if(variant.price < variant.compare_at_price){
            $('.was_price', $product).html('<span class="money">' + Shopify.formatMoney(variant.compare_at_price, $('body').data('money-format')) + '</span>');
            $('.current_price', $product).parent().addClass('sale');
        } else {
            $('.was_price', $product).html('');
            $('.current_price', $product).parent().removeClass('sale');
        }

        $('.sold_out', $product).text('');

        if (variant.price > 0) {
            $('.current_price', $product).html('<span class="money">' + Shopify.formatMoney(variant.price, $('body').data('money-format')) + '</span>');
        } else {
            $('.current_price', $product).html("Free");
        }
        $('.add_to_cart', $product).removeClass('disabled').removeAttr('disabled').find('span').text($('.add_to_cart', $product).data('label'));

    } else {
        var message = variant ? "Sold Out" : "Unavailable";
        $('.was_price', $product).html('');
        $('.current_price', $product).html('<span class="money">' + Shopify.formatMoney(variant.price, $('body').data('money-format')) + '</span>');
        $('.sold_out', $product).text(message);
        $('.add_to_cart', $product).addClass('disabled').attr('disabled', 'disabled').find('span').text(message);
        $('.add-to-cart-block a', $product).addClass('disabled').attr('disabled', 'disabled').text(message);
    }

};

function productSwatches(){
    //Swatches linked with selected options
    if ($('.product-block').length){
        var $productForms = $('.product-block').find('.product_form');
        $productForms.addClass('is-visible');

        //Loop through each product and set the initial option value state
        $productForms.each(function(){
            var JSONData = $(this).data('product');
            var productID = $(this).data('product-id');
            var productSection = '.product-' + productID + ' .product-block';
            var swatchOptions = $(this).find('.swatch_options .swatch');
            if (swatchOptions.length > 1){
                Shopify.linkOptionSelectors(JSONData, productSection);
            }
        });
    }

    //Add click event when there is more than one product on the page (eg. Collection in Detail)
    if ($('.product-block').length > 1){
        $('body').on('click', '.swatch-element', function(){
            var swatchValue = $(this).data('value').toString();
            var selectedVariant = $(this).closest('form').find('.multi_select option:selected').val();

            $(this).closest('.product-block').find('.collection-add-cart > input').val(selectedVariant);

            $(this)
                .siblings('input[value="'+ swatchValue.replace(/\"/g,'\\"') +'"]')
                .prop("checked", true)
                .trigger("change");

            var JSONData = $(this).parents('.product_form').data('product');
            var productID = $(this).parents('.product_form').data('product-id');
            var productSection = '.product-' + productID + ' .product-block';
            var swatchOptions = $(this).parents('.product_form').find('.swatch_options .swatch');

            if (swatchOptions.length > 1){
                Shopify.linkOptionSelectors(JSONData, productSection);
            }
        })
    }
}

Shopify.queryParams = {};
if (location.search.length) {
    for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
            Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
    }
}

window.selectedOptions = [];

var quickFilter = {
    init: function(){
        // var selectedOptions = [];
        var query = '',
            currentTags = '',
            siteUrl = 'https://' + window.url('hostname'),
            url1 = window.url('1') ? '/' + window.url('1') + '/' : '',
            url2 = window.url('2') ? window.url('2') + '/' : '',
            url3 = window.url('3'),
            path = url1 + url2;
        //
        //Add all checkbox values to array
        // $('.filter-option.selected').each(function () {
        //     selectedOptions.push($(this).data('value'));
        // });
        selectedOptions = $.makeArray(selectedOptions);

        
        //Loop through tags to create string to update page url
        $.each(selectedOptions, function(i, value){

            if (i != selectedOptions.length - 1) {
                currentTags += selectedOptions[i] + '+';
            } else {
                currentTags += selectedOptions[i];
            }
            
            if (i == 0) {
            	$('.products-block').empty();
            }
            newCurrentTags = selectedOptions[i];
            newUrlString = path + newCurrentTags + query;
            quickFilter.updateView(newUrlString);
        });

        query = $.param(Shopify.queryParams);

        quickFilter.processUrl(path, currentTags, query);
    },

    updateView: function(filterURL) {

        $.ajax({
            type: 'GET',
            url: filterURL,
            beforeSend: function() {
                $(".products-block").addClass('fadeOut animated loading-in-progress filter-loading');
                $('.load-more__icon').addClass('active');
                Waypoint.destroyAll()
            },
            success: function(data) {
                $('.load-more__icon').removeClass('active');
                $(".products-block").removeClass('loading-in-progress');
                $(".products-block").removeClass('filter-loading');
                var filteredBreadcrumb = $(data).find('.breadcrumb').html();
                $('.breadcrumb').html(filteredBreadcrumb);

                var filteredPagination = $(data).find('.pagination').html();
                $('.pagination').html(filteredPagination);

                var filteredPageLinks = $(data).find('.pagination').html();
                $('.pagination').empty();
                $('.pagination').html(filteredPageLinks);

                var filteredData = $(data).find('.products-block > div');
                // $(".products-block").removeClass('fadeOut animated');
                
				// $('.products-block').remove();
                // filteredData.insertBefore( $('.load-more__icon') );
                $('.products-block').append(filteredData);



                $('.products-block').addClass('slick-init');

                var sliderElements = filteredData.find('.image-block > a');
                $.each(sliderElements, function(i, v){
                	var initalIndex = 0;
                	if($(v).find('[data-initial-slide-item]').length > 0) {
                		initalIndex = $(v).find('[data-initial-slide-item]').index();
                	}
                	$(v).slick({
                		initialSlide: initalIndex
                	})
                });

            	$('body').on('click', '.products-block .btn-hover-add', function() {
			    	if ($(this).closest('.product-block').find('.collection-product .swatch_options').find('.swatch input').length != 0) {
			    		if ($(this).closest('.product-block').find('.collection-product .swatch_options .swatch:first-child input:checked').length != 0) {
							$('.select-all-variant-warnning').removeClass('active');
							// $(this).closest('.product-block').find('.select-all-variant-warnning').removeClass('active');
						} else {

							$('.select-all-variant-warnning').removeClass('active');
							$(this).closest('.product-block').find('.select-all-variant-warnning').addClass('active');
						}
			    	}
				});

            },
            error: function(x, t, m) {
                console.log(x);
                console.log(t);
                console.log(m);
                location.replace(location.protocol + '//' + location.host + filterURL);

            },
            dataType: "html"
        }).done(function(data) {
        	
        	var lowerLastSelectedOption = selectedOptions[selectedOptions.length-1];
        	var lastSelectedOption = lowerLastSelectedOption.charAt(0).toUpperCase() + lowerLastSelectedOption.slice(1);

        	var productCount = $('.products-block .product-block').length;
            for (var i = 0; i < productCount; i++) {
            	var mainClass = $($('.products-block .product-block')[i]).attr('data-id');
            	var $element = $(`.${mainClass}`);

            	if($element.length > 1) {
                	$element.each(function(i, v){
                		if($(this).find('.product_form .swatch_options .swatch').first().find('.swatch-element').length == 0) {
                			if (i != 0) {
                				$(this).remove();
                			}
                		}
                	})

                	var hasMultipleVariants = false;
                	$element.each(function(i, v){
                		if($(this).find('.product_form .swatch_options .swatch').first().find('.swatch-element').length > 1) {
                			hasMultipleVariants = true;
                			return false;
                		}
                	})

                	if (hasMultipleVariants) {
	            		$element.each(function(i, v){
	                		if($(this).find('.product_form .swatch_options .swatch').first().find('.swatch-element').length == 1) {
	                			$(this).remove();
	                		}
	                	})
	            	}
            	}
            }

            window.triggeredFromAjax = true;
        	// initProductGridOptions();
        	$(".product_form").each(function(i, v) {
		        var $productForm = $(v);
		        //Initiate selectCallback
		        if($productForm.hasClass("product_form_options") && $productForm.hasClass("viewed") == false) {
		          //If form hasn't been viewed previously, run OptionSelectors function
		            new Shopify.OptionSelectors($productForm.data("select-id"),
		            {
		                product: $productForm.data("product"),
		                onVariantSelected: selectCallback,
		                enableHistoryState: $productForm.data("enable-state")
		            });
		        }

		        //Link sold out options when there is more than one option available (eg. S is selected and Yellow option appears as sold out)

		        const JSONData = $productForm.data('product');
		        const productID = $productForm.section_id;
		        const productSection = '.product-' + productID + ' .js-product_section';
		        const swatchOptions = $productForm.find('.swatch_options .swatch');
		        if (swatchOptions.length > 1){
		            Shopify.linkOptionSelectors(JSONData, productSection);
		        }

		        $productForm.closest('.product-block').find('select[name="id"]').trigger('change');
		    });

		    $('.swatch_options .swatch-element[data-value="' + lastSelectedOption + '"]').trigger('click');
        });
    },
    processUrl: function(path, tags, query) {

        var query = query.replace(/\page=(\w+)&/, ''),
        urlString = '';

        urlString = path + tags + query;

        if (tags.indexOf('+') > -1 || tags == '')  {
        	quickFilter.updateView(urlString);
        }

        window.history && window.history.pushState && window.history.pushState("", "", urlString);
    }
}

function initProductGridOptions() {
	$('body').on('click', '.swatch_options .swatch-element', function() {
		console.log('t');
		triggeredFromAjax = false;
	})
}