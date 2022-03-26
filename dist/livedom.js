!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).LiveDom=e()}(function(){return function n(o,i,a){function s(t,e){if(!i[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=i[t]={exports:{}},o[t][0].call(r.exports,function(e){return s(o[t][1][e]||e)},r,r.exports,n,o,i,a)}return i[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)s(a[e]);return s}({1:[function(e,t,r){"use strict";function n(e){this.topData={},this.scopeDataStack=[],this.lastMergeData={},this.pageData=Object.create(this.topData),this.data=Object.create(this.pageData),this.mergePageData(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.DataManager=void 0,n.prototype.mergePageData=function(e){Object.assign(this.lastMergeData,e),Object.assign(this.pageData,e)},n.prototype.commitMergeData=function(){this.lastMergeData={}},n.prototype.hasUseLastMergeData=function(e){for(var t in e)if(e[t][0]in this.lastMergeData)return!0;return!1},n.prototype.pushScopeData=function(e){this.scopeDataStack.push(e),this.data=Object.create(this.data),Object.assign(this.data,e)},n.prototype.popScopeData=function(e){if(this.scopeDataStack[this.scopeDataStack.length-1]!=e)throw new Error("popScopeData fail! scopeData not last data.");this.scopeDataStack.pop(),this.data=Object.getPrototypeOf(this.data)},r.DataManager=n},{}],2:[function(e,t,r){"use strict";function n(e){this.controller=e}Object.defineProperty(r,"__esModule",{value:!0}),r.Directive=void 0,n.hasDirective=function(e){if(!e.directives||!Array.isArray(e.directives))return!1;for(var t=0,r=e.directives;t<r.length;t++)if(r[t]instanceof this)return!0;return!1},r.Directive=n},{}],3:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),m=this&&this.__assign||function(){return(m=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},e=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementEach=void 0,e("./Directive")),y=Symbol("LiveDomKeyDataProp"),e=(o=e.Directive,i(a,o),a.setup=function(e,t,r,n){r.attrs[n.attr]&&(e=new a(e,0,r.attrs[n.attr]),t.removeAttribute(n.attr),r.attrs[n.attr].directive=e,t.hasAttribute("live:item")&&(e.itemName=t.getAttribute("live:item"),t.removeAttribute("live:item")),t.hasAttribute("live:index")&&(e.indexName=t.getAttribute("live:index"),t.removeAttribute("live:index")),r.directives.push(e))},a.prototype.render=function(e,t,r){var n=t.nodeInfo,o=this.attrInfo.exec(this.controller.dataManager.data);if(!Array.isArray(o)||0==o.length)return[];for(var i=[],a=0,s=o.length;a<s;++a){for(var c=o[a],u=c,l=null,p=0,d=t.exists;p<d.length;p++){var f=d[p];if(y in f&&f[y]==u&&i.indexOf(f)<0){l=f;break}}var l=l||this.controller.cloneNode(n.srcElement),h=m(m({},t),this.controller.getRenderInfo(l)),c=(l[y]=u,(v={})[this.itemName]=c,v[this.indexName]=a,v),v=(this.controller.dataManager.pushScopeData(c),r(l,h));this.controller.dataManager.popScopeData(c),0<v.length&&i.push(v[0])}return i},a);function a(e,t,r){e=o.call(this,e)||this;return e.itemName="item",e.indexName="index",e.attrInfo=r,e}r.DirectiveElementEach=e},{"./Directive":2}],4:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementElse=void 0,e("./Directive")),s=e("./DirectiveElementEach"),c=e("./DirectiveElementIf"),e=(o=a.Directive,i(u,o),u.setup=function(e,t,r,n){t.hasAttribute(n.attr)&&(e=new u(e),t.removeAttribute(n.attr),r.attrs[n.attr]&&(r.attrs[n.attr].directive=e),r.directives.push(e))},u.prototype.render=function(e,t,r){for(var n=t.exists[0];n=n.previousSibling;){if(this.controller.isPlaceholder(n)){var o=this.controller.getNodeInfo(n);if(c.DirectiveElementIf.hasDirective(o)||s.DirectiveElementEach.hasDirective(o))return r(e,t);break}if(1==n.nodeType)break}return[]},u);function u(e,t){return o.call(this,e)||this}r.DirectiveElementElse=e},{"./Directive":2,"./DirectiveElementEach":3,"./DirectiveElementIf":5}],5:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),e=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementIf=void 0,e("./Directive")),e=(o=e.Directive,i(a,o),a.setup=function(e,t,r,n){r.attrs[n.attr]&&(e=new a(e,0,r.attrs[n.attr]),t.removeAttribute(n.attr),r.attrs[n.attr].directive=e,r.directives.push(e))},a.prototype.render=function(e,t,r){return this.attrInfo.exec(this.controller.dataManager.data)?r(e,t):[]},a);function a(e,t,r){e=o.call(this,e)||this;return e.attrInfo=r,e}r.DirectiveElementIf=e},{"./Directive":2}],6:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),e=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveElementRender=void 0,e("./Directive")),e=(o=e.Directive,i(a,o),a.setup=function(e,t,r,n){0==Object.keys(r.attrs).length&&0==r.directives.length||(e=new a(e),r.directives.push(e))},a.disableRenderChildNodes=function(e){},a.prototype.render=function(e,t,r){var n,o=t.nodeInfo;for(n in o.attrs){var i=o.attrs[n];i.directive||(i=i.exec(this.controller.dataManager.data),e.setAttribute(n,i),t.lastAttrsVal[n]=i)}return this.controller.renderChildNodes(e),r(e,t)},a);function a(){return null!==o&&o.apply(this,arguments)||this}r.DirectiveElementRender=e},{"./Directive":2}],7:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),e=(Object.defineProperty(r,"__esModule",{value:!0}),r.DirectiveHtmlInputRender=void 0,e("./Directive")),e=(o=e.Directive,i(a,o),a.setup=function(e,t,r,n){if("input"!=t.tagName.toLocaleLowerCase())return null;var o={};t.hasAttribute("value")&&r.attrs.value&&(o.value=r.attrs.value,t.removeAttribute("value"),delete r.attrs.value),t.hasAttribute("checked")&&r.attrs.checked&&(o.checked=r.attrs.checked,t.removeAttribute("checked"),delete r.attrs.checked),0<Object.keys(o).length&&r.directives.push(new a(e,0,o))},a.prototype.render=function(e,t,r){var n;return this.attrs.value&&this.controller.dataManager.hasUseLastMergeData(this.attrs.value.paths)&&(n=this.attrs.value.exec(this.controller.dataManager.data),e.setAttribute("value",n),e.value=n),this.attrs.checked&&this.controller.dataManager.hasUseLastMergeData(this.attrs.checked.paths)&&(n=this.attrs.checked.exec(this.controller.dataManager.data),e.checked=!!n),r(e,t)},a);function a(e,t,r){e=o.call(this,e)||this;return e.attrs=r,e}r.DirectiveHtmlInputRender=e},{"./Directive":2}],8:[function(e,t,r){"use strict";function n(e,t){this.ignoreElementTags={script:!0,style:!0},this.options=t,this.doc=e,this.observer=new MutationObserver(this.mutationObserverCallback.bind(this))}Object.defineProperty(r,"__esModule",{value:!0}),r.DomScanner=void 0,n.prototype.startObserve=function(){this.observer.observe(this.doc.documentElement,{subtree:!0,childList:!0,attributes:!0})},n.prototype.mutationObserverCallback=function(e){for(var t=this,r=0,n=e;r<n.length;r++){var o=n[r];switch(o.type){case"attributes":this.options.attrChanged(o.target,o.attributeName);break;case"childList":o.addedNodes.forEach(function(e){t.walkNode(e)})}}},r.DomScanner=n},{}],9:[function(e,t,r){"use strict";var n,o,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),e=(Object.defineProperty(r,"__esModule",{value:!0}),r.DomScannerLoaded=void 0,e("./DomScanner")),e=(o=e.DomScanner,i(a,o),a.prototype.scan=function(){var r=this;return this.scanPromise||(this.scanPromise=new Promise(function(e,t){"complete"==r.doc.readyState?(r.walkNode(r.doc.documentElement),r.startObserve(),e()):r.doc.addEventListener("DOMContentLoaded",function(){r.walkNode(r.doc.documentElement),r.startObserve(),e()})}))},a.prototype.walkNode=function(e){switch(e.nodeType){case 1:this.processElement(e);break;case 3:this.processText(e);break;case 8:this.processComment(e)}},a.prototype.processElement=function(e){this.ignoreElementTags[e.tagName.toLowerCase()]||(this.processElementStart(e),this.processChildNodes(e),this.processElementEnd(e))},a.prototype.processChildNodes=function(e){var t=this;e.childNodes.forEach(function(e){t.walkNode(e)})},a.prototype.processElementStart=function(e){this.options.elementStart(e)},a.prototype.processElementEnd=function(e){this.options.elementEnd(e)},a.prototype.processComment=function(e){this.options.comment(e)},a.prototype.processText=function(e){this.options.text(e)},a);function a(){var e=null!==o&&o.apply(this,arguments)||this;return e.scanPromise=null,e}r.DomScannerLoaded=e},{"./DomScanner":8}],10:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("./Page"),o=e("./PageController");function i(){}i.initPage=function(e){void 0===e&&(e={});e=new o.PageController(document,e);return(0,n.createPage)(e)},r.default=i},{"./Page":11,"./PageController":12}],11:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Page=r.createPage=void 0,r.createPage=function(e){var t=new n;return t.updateData=e.updatePageData.bind(e),t};var n=function(){};r.Page=n},{}],12:[function(e,t,r){"use strict";var m=this&&this.__assign||function(){return(m=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},n=(Object.defineProperty(r,"__esModule",{value:!0}),r.PageController=void 0,e("./DomScannerLoaded")),i=e("./Parser"),o=e("./DataManager"),a=e("./DirectiveElementRender"),s=e("./DirectiveElementEach"),c=e("./DirectiveElementIf"),u=e("./DirectiveElementElse"),l=e("./DirectiveHtmlInputRender"),p=Symbol("LiveDomNodeInfoProp"),d=Symbol("LiveDomRenderInfoProp"),f=1001;function h(e,t){var r=this;this.scanCompletedPromise=null,this.requestRenderPagePromise=null,this.doc=e,this.options=t,this.dataManager=new o.DataManager(this.options.data||{}),this.elementDirectivesConfig=[{attr:"live:each",setup:s.DirectiveElementEach.setup},{attr:"live:if",setup:c.DirectiveElementIf.setup},{attr:"live:else",setup:u.DirectiveElementElse.setup},{attr:null,setup:l.DirectiveHtmlInputRender.setup},{attr:null,setup:a.DirectiveElementRender.setup}],this.scanner=new n.DomScannerLoaded(document,{elementStart:this.scanElementStart.bind(this),elementEnd:this.scanElementEnd.bind(this),comment:this.scanComment.bind(this),text:this.scanText.bind(this),attrChanged:this.onAttrChanged.bind(this)}),this.scanCompletedPromise=this.scanner.scan().then(function(){r.options.onPageSetupCompleted&&r.options.onPageSetupCompleted(),r.requestRenderPage()})}function y(e){e.parentNode&&e.parentNode.removeChild(e)}function g(e,t){e!=t&&(e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t))}h.prototype.updatePageData=function(e){return this.dataManager.mergePageData(e=void 0===e?{}:e),this.requestRenderPage()},h.prototype.requestRenderPage=function(){var e=this;return this.requestRenderPagePromise||(this.requestRenderPagePromise=this.scanCompletedPromise.then(function(){return t=5,new Promise(function(e){setTimeout(e,t)});var t}).then(function(){e.requestRenderPagePromise=null,e.renderElement(e.doc.documentElement),e.dataManager.commitMergeData()}))},h.prototype.scanElementStart=function(e){this.isLiveNode(e)||this.setupElement(e)},h.prototype.scanElementEnd=function(e){},h.prototype.scanComment=function(e){},h.prototype.scanText=function(e){this.isLiveNode(e)||this.setupText(e)},h.prototype.onAttrChanged=function(e,t){var r=this.getNodeInfo(e);if(!r)return this.setupElement(e);this.getRenderInfo(e);var n=e.getAttribute(t),o=r.attrs[t];if(o){if(n!=o.lastVal)return n?void(o.srcVal!=n&&((o=this.updateAttribute(o,n))||delete r.attrs[t],this.setupElementDirectives(e,r))):(delete r.attrs[t],void this.setupElementDirectives(e,r))}else n&&(o=this.createAttribute(n))&&(r.attrs[t]=o,this.setupElementDirectives(e,r))},h.prototype.setupElement=function(e){var t=this.getNodeInfo(e)||{id:"LDE"+f++,changed:!0,srcElement:e,placeholderComment:null,attrs:{},directives:[]};this.setupElementAttributes(e,t),this.setupElementDirectives(e,t),0==Object.keys(t.attrs).length&&0==t.directives.length?this.setNodeInfo(e,null):(t.render=this.renderElement.bind(this),this.setNodeInfo(e,t))},h.prototype.setupElementAttributes=function(e,t){for(var r=e.attributes,n=r.length-1;0<=n;--n){var o=r[n],i=this.createAttribute(o.value);i?t.attrs[o.name]=i:delete t.attrs[o.name]}},h.prototype.createAttribute=function(e){var t=i.Parser.parseText(e);if(!i.Parser.hasTextExpress(t))return null;var r=t.exec,n={srcVal:e,lastVal:e,paths:t.paths,exec:function(e){return n.lastVal=r(e)},directive:null};return n},h.prototype.updateAttribute=function(t,e){var r=i.Parser.parseText(e);if(!i.Parser.hasTextExpress(r))return null;var n=r.exec;return t.exec=function(e){return t.lastVal=n(e)},t.srcVal=e,t.lastVal=e,t},h.prototype.setupElementDirectives=function(e,t){t.directives=[];for(var r=0,n=this.elementDirectivesConfig;r<n.length;r++){var o=n[r];o.setup(this,e,t,o)}},h.prototype.renderElement=function(e){var t=this.getNodeInfo(e);if(t){for(var r=[e],n=e.nextSibling;n;){if(this.getNodeInfo(n)!=t)break;r.push(n),n=n.nextSibling}var o=m(m({lastAttrsVal:{}},this.getRenderInfo(e)),{nodeInfo:t,exists:r}),i=1==e.nodeType?e:t.srcElement,a=this.processElementDirectiveRender(i,o,0);if(0==a.length){var s=this.getPlaceholderComment(t);g(e,s);for(var c=0,u=r;c<u.length;c++)(v=u[c])!=s&&y(v)}else{for(var l=e,p=0,d=a;p<d.length;p++)g(l,v=d[p]),l=v;for(var f=0,h=r;f<h.length;f++){var v=h[f];a.indexOf(v)<0&&y(v)}}}else this.renderChildNodes(e)},h.prototype.processElementDirectiveRender=function(e,t,r){var n=this,o=t.nodeInfo.directives;return r<o.length?o[r].render(e,t,function(e,t){return n.processElementDirectiveRender(e,t,r+1)}):(this.setRenderInfo(e,t),[e])},h.prototype.isPlaceholder=function(e){if(8!=e.nodeType)return!1;e=this.getRenderInfo(e);return!!e&&!!e.isPlaceholder},h.prototype.getPlaceholderComment=function(e){if(e.placeholderComment)return e.placeholderComment;var t=this.doc.createComment("_LiveDomId="+e.id),r={nodeInfo:e,isPlaceholder:!0};return this.setNodeInfo(t,e),this.setRenderInfo(t,r),t},h.prototype.renderChildNodes=function(e){for(var t=f++,r=[],n=e.childNodes.length,o=0;o<n;++o)r.push(e.childNodes[o]);for(o=0;o<n;++o){var i=r[o],a=this.getNodeInfo(i);a?a._t!=t&&(a.render(i),a.changed=!1,a._t=t):1==i.nodeType&&this.renderChildNodes(i)}},h.prototype.setupText=function(e){var t,r,n=this,o=i.Parser.parseText(e.data);i.Parser.hasTextExpress(o)&&(t={id:"LDT"+f++,changed:!0},r=o.exec,t.render=function(e){e.data=r(n.dataManager.data)},this.setNodeInfo(e,t))},h.prototype.cloneNode=function(e){var t=e.cloneNode(!0);return this.cloneNodesInfo([e],[t]),t},h.prototype.cloneNodesInfo=function(e,t){for(var r=0,n=e.length;r<n;++r)t[r][p]=e[r][p],1==e[r].nodeType&&this.cloneNodesInfo(e[r].childNodes,t[r].childNodes)},h.prototype.setNodeInfo=function(e,t){e[p]=t},h.prototype.getNodeInfo=function(e){return e[p]||null},h.prototype.hasNodeInfo=function(e){return!!e[p]},h.prototype.setRenderInfo=function(e,t){e[d]=t},h.prototype.getRenderInfo=function(e){return e[d]||null},h.prototype.hasRenderInfo=function(e){return!!e[d]},h.prototype.isLiveNode=function(e){return p in e},r.PageController=h},{"./DataManager":1,"./DirectiveElementEach":3,"./DirectiveElementElse":4,"./DirectiveElementIf":5,"./DirectiveElementRender":6,"./DirectiveHtmlInputRender":7,"./DomScannerLoaded":9,"./Parser":13}],13:[function(e,t,r){"use strict";function n(){}Object.defineProperty(r,"__esModule",{value:!0}),r.Parser=void 0,n.parseText=function(e){for(var t=/\$\{\s*([a-zA-z_]\w*(\.\w+)*)\s*\}/g,r=[],n={},o=null,i=0;o=t.exec(e);){i<o.index&&r.push(e.substring(i,o.index));var a=o[1].split(/\./g);n[o[1]]=a,r.push(function(e){var t="",r=e.map(function(e){return(t=t+"."+e).substring(1)}),r="var ".concat(e[0],"=data.").concat(e[0],"; ")+"return (".concat(r.map(function(e){return"".concat(e,"!==null&&").concat(e,"!==void 0")}).join(" && "),") ? ").concat(e.join(".")," : null;");return new Function("data",r)}(a)),i=t.lastIndex}return i<e.length&&r.push(e.substring(i,e.length)),{parts:r,paths:n,exec:function(i){if(1==i.length&&"function"==typeof i[0])return i[0];if(1!=i.length||"string"!=typeof i[0])return function(e){for(var t=[],r=0,n=i;r<n.length;r++){var o=n[r];"string"==typeof o?t.push(o):t.push(o(e))}return t.join("")};var e=i[0];return function(){return e}}(r)}},n.hasTextExpress=function(e){return 1<e.parts.length||1==e.parts.length&&"string"!=typeof e.parts[0]},r.Parser=n},{}],14:[function(e,t,r){"use strict";e=e("./LiveDom");t.exports=e.default},{"./LiveDom":10}]},{},[14])(14)});
//# sourceMappingURL=livedom.js.map
