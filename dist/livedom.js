!function(t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).LiveDom=t()}(function(){return function n(o,i,s){function a(e,t){if(!i[e]){if(!o[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(c)return c(e,!0);throw(t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}r=i[e]={exports:{}},o[e][0].call(r.exports,function(t){return a(o[e][1][t]||t)},r,r.exports,n,o,i,s)}return i[e].exports}for(var c="function"==typeof require&&require,t=0;t<s.length;t++)a(s[t]);return a}({1:[function(t,e,r){"use strict";function n(t){this.topData={},this.scopeDataStack=[],this.lastMergeData={},this.pageData=Object.create(this.topData),this.data=Object.create(this.pageData),this.mergePageData(t)}Object.defineProperty(r,"__esModule",{value:!0}),r.DataManager=void 0,n.prototype.mergePageData=function(t){Object.assign(this.lastMergeData,t),Object.assign(this.pageData,t)},n.prototype.commitMergeData=function(){this.lastMergeData={}},n.prototype.hasUseLastMergeData=function(t){for(var e in t)if(t[e][0]in this.lastMergeData)return!0;return!1},n.prototype.pushScopeData=function(t){this.scopeDataStack.push(t),this.data=Object.create(this.data),Object.assign(this.data,t)},n.prototype.popScopeData=function(t){if(this.scopeDataStack[this.scopeDataStack.length-1]!=t)throw new Error("popScopeData fail! scopeData not last data.");this.scopeDataStack.pop(),this.data=Object.getPrototypeOf(this.data)},r.DataManager=n},{}],2:[function(t,e,r){"use strict";function n(t){this.controller=t}Object.defineProperty(r,"__esModule",{value:!0}),r.Directive=void 0,n.hasDirective=function(t){if(!t.directives||!Array.isArray(t.directives))return!1;for(var e=0,r=t.directives;e<r.length;e++)if(r[e]instanceof this)return!0;return!1},r.Directive=n},{}],3:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveDisableChildNodes=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){var o;e.hasAttribute(n.attr)&&(r.attrs[n.attr],t=new s(t),o=e.getAttribute(n.attr)||"true",r.disableChildNodes="false"!=o.toLowerCase(),e.removeAttribute(n.attr),r.directives.push(t))},s.prototype.render=function(t,e,r){return r(t,e)},s);function s(t,e,r){return o.call(this,t)||this}r.DirectiveDisableChildNodes=t},{"./Directive":2}],4:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),m=this&&this.__assign||function(){return(m=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementEach=void 0,t("./Directive")),y=Symbol("LiveDomKeyDataProp"),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){r.attrs[n.attr]&&(t=new s(t,0,r.attrs[n.attr]),e.removeAttribute(n.attr),r.attrs[n.attr].directive=t,e.hasAttribute("live:item")&&(t.itemName=e.getAttribute("live:item"),e.removeAttribute("live:item")),e.hasAttribute("live:index")&&(t.indexName=e.getAttribute("live:index"),e.removeAttribute("live:index")),r.directives.push(t))},s.prototype.render=function(t,e,r){var n=e.nodeInfo,o=this.attrInfo.exec(this.controller.dataManager.data);if(!Array.isArray(o)||0==o.length)return[];for(var i=[],s=0,a=o.length;s<a;++s){for(var c=o[s],u=c,l=null,p=0,d=e.exists;p<d.length;p++){var f=d[p];if(y in f&&f[y]==u&&i.indexOf(f)<0){l=f;break}}var l=l||this.controller.cloneNode(n.srcElement),h=m(m({},e),this.controller.getRenderInfo(l)),c=(l[y]=u,(v={})[this.itemName]=c,v[this.indexName]=s,v),v=(this.controller.dataManager.pushScopeData(c),r(l,h));this.controller.dataManager.popScopeData(c),0<v.length&&i.push(v[0])}return i},s);function s(t,e,r){t=o.call(this,t)||this;return t.itemName="item",t.indexName="index",t.attrInfo=r,t}r.DirectiveElementEach=t},{"./Directive":2}],5:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),s=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementElse=void 0,t("./Directive")),a=t("./DirectiveElementEach"),c=t("./DirectiveElementIf"),t=(o=s.Directive,i(u,o),u.setup=function(t,e,r,n){e.hasAttribute(n.attr)&&(t=new u(t),e.removeAttribute(n.attr),r.attrs[n.attr]&&(r.attrs[n.attr].directive=t),r.directives.push(t))},u.prototype.render=function(t,e,r){for(var n=e.exists[0];n=n.previousSibling;){if(this.controller.isPlaceholder(n)){var o=this.controller.getNodeInfo(n);if(c.DirectiveElementIf.hasDirective(o)||a.DirectiveElementEach.hasDirective(o))return r(t,e);break}if(1==n.nodeType)break}return[]},u);function u(t,e){return o.call(this,t)||this}r.DirectiveElementElse=t},{"./Directive":2,"./DirectiveElementEach":4,"./DirectiveElementIf":6}],6:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementIf=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){r.attrs[n.attr]&&(t=new s(t,0,r.attrs[n.attr]),e.removeAttribute(n.attr),r.attrs[n.attr].directive=t,r.directives.push(t))},s.prototype.render=function(t,e,r){return this.attrInfo.exec(this.controller.dataManager.data)?r(t,e):[]},s);function s(t,e,r){t=o.call(this,t)||this;return t.attrInfo=r,t}r.DirectiveElementIf=t},{"./Directive":2}],7:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementInnerHtml=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){r.attrs[n.attr]&&(t=new s(t,0,r.attrs[n.attr]),r.disableChildNodes=!0,e.removeAttribute(n.attr),r.attrs[n.attr].directive=t,r.directives.push(t))},s.prototype.render=function(t,e,r){var n=this.attrInfo.exec(this.controller.dataManager.data);return t.innerHTML=n,r(t,e)},s);function s(t,e,r){t=o.call(this,t)||this;return t.attrInfo=r,t}r.DirectiveElementInnerHtml=t},{"./Directive":2}],8:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementInnerText=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){r.attrs[n.attr]&&(t=new s(t,0,r.attrs[n.attr]),r.disableChildNodes=!0,e.removeAttribute(n.attr),r.attrs[n.attr].directive=t,r.directives.push(t))},s.prototype.render=function(t,e,r){var n=this.attrInfo.exec(this.controller.dataManager.data);return t.innerText=n,r(t,e)},s);function s(t,e,r){t=o.call(this,t)||this;return t.attrInfo=r,t}r.DirectiveElementInnerText=t},{"./Directive":2}],9:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementRender=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){0==Object.keys(r.attrs).length&&0==r.directives.length||(t=new s(t),r.directives.push(t))},s.disableRenderChildNodes=function(t){},s.prototype.render=function(t,e,r){var n,o=e.nodeInfo;for(n in o.attrs){var i=o.attrs[n];i.directive||(i=i.exec(this.controller.dataManager.data),t.setAttribute(n,i),e.lastAttrsVal[n]=i)}return o.disableChildNodes||this.controller.renderChildNodes(t),r(t,e)},s);function s(){return null!==o&&o.apply(this,arguments)||this}r.DirectiveElementRender=t},{"./Directive":2}],10:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveHtmlInputRender=void 0,t("./Directive")),t=(o=t.Directive,i(s,o),s.setup=function(t,e,r,n){if("input"!=e.tagName.toLocaleLowerCase())return null;var o={};e.hasAttribute("value")&&r.attrs.value&&(o.value=r.attrs.value,e.removeAttribute("value"),delete r.attrs.value),e.hasAttribute("checked")&&r.attrs.checked&&(o.checked=r.attrs.checked,e.removeAttribute("checked"),delete r.attrs.checked),0<Object.keys(o).length&&r.directives.push(new s(t,0,o))},s.prototype.render=function(t,e,r){var n;return this.attrs.value&&this.controller.dataManager.hasUseLastMergeData(this.attrs.value.paths)&&(n=this.attrs.value.exec(this.controller.dataManager.data),t.setAttribute("value",n),t.value=n),this.attrs.checked&&this.controller.dataManager.hasUseLastMergeData(this.attrs.checked.paths)&&(n=this.attrs.checked.exec(this.controller.dataManager.data),t.checked=!!n),r(t,e)},s);function s(t,e,r){t=o.call(this,t)||this;return t.attrs=r,t}r.DirectiveHtmlInputRender=t},{"./Directive":2}],11:[function(t,e,r){"use strict";function n(t,e){this.ignoreElementTags={script:!0,style:!0},this.options=e,this.doc=t,this.observer=new MutationObserver(this.mutationObserverCallback.bind(this))}Object.defineProperty(r,"__esModule",{value:!0}),r.DomScanner=void 0,n.prototype.startObserve=function(){this.observer.observe(this.doc.documentElement,{subtree:!0,childList:!0,attributes:!0})},n.prototype.mutationObserverCallback=function(t){for(var e=this,r=0,n=t;r<n.length;r++){var o=n[r];switch(o.type){case"attributes":this.options.attrChanged(o.target,o.attributeName);break;case"childList":o.addedNodes.forEach(function(t){e.walkNode(t)})}}},r.DomScanner=n},{}],12:[function(t,e,r){"use strict";var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),t=(Object.defineProperty(r,"__esModule",{value:!0}),r.DomScannerLoaded=void 0,t("./DomScanner")),t=(o=t.DomScanner,i(s,o),s.prototype.scan=function(){var r=this;return this.scanPromise||(this.scanPromise=new Promise(function(t,e){"complete"==r.doc.readyState?(r.walkNode(r.doc.documentElement),r.startObserve(),t()):r.doc.addEventListener("DOMContentLoaded",function(){r.walkNode(r.doc.documentElement),r.startObserve(),t()})}))},s.prototype.walkNode=function(t){switch(t.nodeType){case 1:this.processElement(t);break;case 3:this.processText(t);break;case 8:this.processComment(t)}},s.prototype.processElement=function(t){this.ignoreElementTags[t.tagName.toLowerCase()]||(this.processElementStart(t),this.processChildNodes(t),this.processElementEnd(t))},s.prototype.processChildNodes=function(t){var e=this;t.childNodes.forEach(function(t){e.walkNode(t)})},s.prototype.processElementStart=function(t){this.options.elementStart(t)},s.prototype.processElementEnd=function(t){this.options.elementEnd(t)},s.prototype.processComment=function(t){this.options.comment(t)},s.prototype.processText=function(t){this.options.text(t)},s);function s(){var t=null!==o&&o.apply(this,arguments)||this;return t.scanPromise=null,t}r.DomScannerLoaded=t},{"./DomScanner":11}],13:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("./Page"),o=t("./PageController");function i(){}i.initPage=function(t){void 0===t&&(t={});t=new o.PageController(document,t);return(0,n.createPage)(t)},r.default=i},{"./Page":14,"./PageController":15}],14:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Page=r.createPage=void 0,r.createPage=function(t){var e=new n;return e.updateData=t.updatePageData.bind(t),e};var n=function(){};r.Page=n},{}],15:[function(t,e,r){"use strict";var m=this&&this.__assign||function(){return(m=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},n=(Object.defineProperty(r,"__esModule",{value:!0}),r.PageController=void 0,t("./DomScannerLoaded")),i=t("./Parser"),o=t("./DataManager"),s=t("./DirectiveElementRender"),a=t("./DirectiveElementEach"),c=t("./DirectiveElementIf"),u=t("./DirectiveElementElse"),l=t("./DirectiveHtmlInputRender"),p=t("./DirectiveDisableChildNodes"),d=t("./DirectiveElementInnerHtml"),f=t("./DirectiveElementInnerText"),h=Symbol("LiveDomNodeInfoProp"),v=Symbol("LiveDomRenderInfoProp"),y=1001;function g(t,e){var r=this;this.scanCompletedPromise=null,this.requestRenderPagePromise=null,this.doc=t,this.options=e,this.dataManager=new o.DataManager(this.options.data||{}),this.elementDirectivesConfig=[{attr:"live:each",setup:a.DirectiveElementEach.setup},{attr:"live:if",setup:c.DirectiveElementIf.setup},{attr:"live:else",setup:u.DirectiveElementElse.setup},{attr:null,setup:l.DirectiveHtmlInputRender.setup},{attr:"live:html",setup:d.DirectiveElementInnerHtml.setup},{attr:"live:text",setup:f.DirectiveElementInnerText.setup},{attr:"live:disable-children",setup:p.DirectiveDisableChildNodes.setup},{attr:null,setup:s.DirectiveElementRender.setup}],this.scanner=new n.DomScannerLoaded(document,{elementStart:this.scanElementStart.bind(this),elementEnd:this.scanElementEnd.bind(this),comment:this.scanComment.bind(this),text:this.scanText.bind(this),attrChanged:this.onAttrChanged.bind(this)}),this.scanCompletedPromise=this.scanner.scan().then(function(){r.options.onPageSetupCompleted&&r.options.onPageSetupCompleted(),r.requestRenderPage()})}function D(t){t.parentNode&&t.parentNode.removeChild(t)}function b(t,e){t!=e&&(t.nextSibling?t.parentNode.insertBefore(e,t.nextSibling):t.parentNode.appendChild(e))}g.prototype.updatePageData=function(t){return this.dataManager.mergePageData(t=void 0===t?{}:t),this.requestRenderPage()},g.prototype.requestRenderPage=function(){var t=this;return this.requestRenderPagePromise||(this.requestRenderPagePromise=this.scanCompletedPromise.then(function(){return e=5,new Promise(function(t){setTimeout(t,e)});var e}).then(function(){t.requestRenderPagePromise=null,t.renderElement(t.doc.documentElement),t.dataManager.commitMergeData()}))},g.prototype.scanElementStart=function(t){this.isLiveNode(t)||this.setupElement(t)},g.prototype.scanElementEnd=function(t){},g.prototype.scanComment=function(t){},g.prototype.scanText=function(t){this.isLiveNode(t)||this.setupText(t)},g.prototype.onAttrChanged=function(t,e){var r=this.getNodeInfo(t);if(!r)return this.setupElement(t);var n=this.getRenderInfo(t),o=t.getAttribute(e),i=r.attrs[e];if(i){if(o!=n.lastAttrsVal[e])return o?void(i.srcVal!=o&&((i=this.updateAttribute(i,o))||delete r.attrs[e],this.setupElementDirectives(t,r))):(delete r.attrs[e],void this.setupElementDirectives(t,r))}else o&&(i=this.createAttribute(o))&&(r.attrs[e]=i,this.setupElementDirectives(t,r))},g.prototype.setupElement=function(t){var e=this.getNodeInfo(t)||{id:"LDE"+y++,srcElement:t,attrs:{},directives:[],disableChildNodes:!1};this.setupElementAttributes(t,e),this.setupElementDirectives(t,e),0==Object.keys(e.attrs).length&&0==e.directives.length?this.setNodeInfo(t,null):(e.render=this.renderElement.bind(this),this.setNodeInfo(t,e))},g.prototype.setupElementAttributes=function(t,e){for(var r=t.attributes,n=r.length-1;0<=n;--n){var o=r[n],i=this.createAttribute(o.value);i?e.attrs[o.name]=i:delete e.attrs[o.name]}},g.prototype.createAttribute=function(t){var e=i.Parser.parseText(t);if(!i.Parser.hasTextExpress(e))return null;var r=e.exec,n={srcVal:t,lastVal:t,paths:e.paths,exec:function(t){return n.lastVal=r(t)},directive:null};return n},g.prototype.updateAttribute=function(t,e){var r=i.Parser.parseText(e);if(!i.Parser.hasTextExpress(r))return null;r=r.exec;return t.exec=r,t.srcVal=e,t},g.prototype.setupElementDirectives=function(t,e){e.directives=[];for(var r=0,n=this.elementDirectivesConfig;r<n.length;r++){var o=n[r];o.setup(this,t,e,o)}},g.prototype.renderElement=function(t){var e=this.getNodeInfo(t);if(e){for(var r=[t],n=t.nextSibling;n;){if(this.getNodeInfo(n)!=e)break;r.push(n),n=n.nextSibling}var o=m(m({lastAttrsVal:{}},this.getRenderInfo(t)),{nodeInfo:e,exists:r}),i=1==t.nodeType?t:e.srcElement,s=this.processElementDirectiveRender(i,o,0);if(0==s.length){var a=this.getPlaceholderComment(e);b(t,a);for(var c=0,u=r;c<u.length;c++)(v=u[c])!=a&&D(v)}else{for(var l=t,p=0,d=s;p<d.length;p++)b(l,v=d[p]),l=v;for(var f=0,h=r;f<h.length;f++){var v=h[f];s.indexOf(v)<0&&D(v)}}}else this.renderChildNodes(t)},g.prototype.processElementDirectiveRender=function(t,e,r){var n=this,o=e.nodeInfo.directives;return r<o.length?o[r].render(t,e,function(t,e){return n.processElementDirectiveRender(t,e,r+1)}):(this.setRenderInfo(t,e),[t])},g.prototype.isPlaceholder=function(t){if(8!=t.nodeType)return!1;t=this.getRenderInfo(t);return!!t&&!!t.isPlaceholder},g.prototype.getPlaceholderComment=function(t){var e=this.doc.createComment("_LiveDomId="+t.id),r={nodeInfo:t,isPlaceholder:!0};return this.setNodeInfo(e,t),this.setRenderInfo(e,r),e},g.prototype.renderChildNodes=function(t){for(var e=y++,r=[],n=t.childNodes.length,o=0;o<n;++o)r.push(t.childNodes[o]);for(o=0;o<n;++o){var i=r[o],s=this.getNodeInfo(i);s?s._t!=e&&(s.render(i),s._t=e):1==i.nodeType&&this.renderChildNodes(i)}},g.prototype.setupText=function(t){var e,r,n=this,o=i.Parser.parseText(t.data);i.Parser.hasTextExpress(o)&&(e={id:"LDT"+y++},r=o.exec,e.render=function(t){t.data=r(n.dataManager.data)},this.setNodeInfo(t,e))},g.prototype.cloneNode=function(t){var e=t.cloneNode(!0);return this.cloneNodesInfo([t],[e]),e},g.prototype.cloneNodesInfo=function(t,e){for(var r=0,n=t.length;r<n;++r)e[r][h]=t[r][h],1==t[r].nodeType&&this.cloneNodesInfo(t[r].childNodes,e[r].childNodes)},g.prototype.setNodeInfo=function(t,e){t[h]=e},g.prototype.getNodeInfo=function(t){return t[h]||null},g.prototype.hasNodeInfo=function(t){return!!t[h]},g.prototype.setRenderInfo=function(t,e){t[v]=e},g.prototype.getRenderInfo=function(t){return t[v]||null},g.prototype.hasRenderInfo=function(t){return!!t[v]},g.prototype.isLiveNode=function(t){return h in t},r.PageController=g},{"./DataManager":1,"./DirectiveDisableChildNodes":3,"./DirectiveElementEach":4,"./DirectiveElementElse":5,"./DirectiveElementIf":6,"./DirectiveElementInnerHtml":7,"./DirectiveElementInnerText":8,"./DirectiveElementRender":9,"./DirectiveHtmlInputRender":10,"./DomScannerLoaded":12,"./Parser":16}],16:[function(t,e,r){"use strict";function n(){}Object.defineProperty(r,"__esModule",{value:!0}),r.Parser=void 0,n.parseText=function(t){for(var e=/\$\{\s*([a-zA-z_]\w*(\.\w+)*)\s*\}/g,r=[],n={},o=null,i=0;o=e.exec(t);){i<o.index&&r.push(t.substring(i,o.index));var s=o[1].split(/\./g);n[o[1]]=s,r.push(function(t){var e="",r=t.map(function(t){return(e=e+"."+t).substring(1)}),r="var ".concat(t[0],"=data.").concat(t[0],"; ")+"return (".concat(r.map(function(t){return"".concat(t,"!==null&&").concat(t,"!==void 0")}).join(" && "),") ? ").concat(t.join(".")," : null;");return new Function("data",r)}(s)),i=e.lastIndex}return i<t.length&&r.push(t.substring(i,t.length)),{parts:r,paths:n,exec:function(i){if(1==i.length&&"function"==typeof i[0])return i[0];if(1!=i.length||"string"!=typeof i[0])return function(t){for(var e=[],r=0,n=i;r<n.length;r++){var o=n[r];"string"==typeof o?e.push(o):e.push(o(t))}return e.join("")};var t=i[0];return function(){return t}}(r)}},n.hasTextExpress=function(t){return 1<t.parts.length||1==t.parts.length&&"string"!=typeof t.parts[0]},r.Parser=n},{}],17:[function(t,e,r){"use strict";t=t("./LiveDom");e.exports=t.default},{"./LiveDom":13}]},{},[17])(17)});
//# sourceMappingURL=livedom.js.map
