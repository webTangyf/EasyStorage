!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).EasyStorage=t()}(this,function(){"use strict";function c(e){return["",void 0,null].includes(e)}function e(e){return"object"===h(e)}function s(e){return"string"===h(e)}function l(o,r){if(!e(o)||!e(r))throw Error("esayCover函数的入参数仅接受plainObj");return Object.keys(o).reduce(function(e,t){return e[t]=c(r[t])&&o[t]||r[t],e},{})}function f(e){var t=h(e);return[void 0,null].includes(e)?(console.warn("formatSaveData params is "+e),""):"string"===t?e:["object","array"].includes(t)?JSON.stringify(e):["number","boolean"].includes(t)?(console.warn("formatSaveData had handle "+e+" is from "+t+" to string, please check the type will you get this data form local"),""+e):e}function d(e){return""+w.defaultPrefix+e}function m(o){if(!s(o))throw Error("clearOutTimeMemory params TypeError");if(!w.LOCAL_METHODS_LIST.includes(o))throw Error("EsayStorage no suppor this methods");Object.keys(window[o]).filter(function(e){return e.startsWith(w.defaultPrefix)}).forEach(function(e){var t=e.replace(w.defaultPrefix,"");a(e,o)||(w.DEBUG&&console.log("auto clear: "+t),n(t,o))})}function t(e){var t=0<arguments.length&&void 0!==e?e:{};console.log(t),(w=l(w,t)).DEBUG&&console.log(w)}var h=function(e){return Object.prototype.toString.call(e).replace(/\[object|\]|\s/g,"").toLowerCase()},o=864e5,r=Object.freeze({__proto__:null,SECUND:1e3,MIN:6e4,HOUR:36e5,DAY:o,MONTH:2592e6,YEAR:31536e6}),w={DEBUG:!1,IS_AUTO_CLEAR:!0,TIMEOUT:6e5,DEFAULT_METHOD:"localStorage",LOCAL_METHODS_LIST:["sessionStorage","localStorage"],defaultPrefix:"__EsayStorage__"},a=function(e,t){try{if(!w.LOCAL_METHODS_LIST.includes(t=t||w.methods))return console.warn("EsayStorage no suppor this methods: "+t),!1;var o=window[t].getItem(d(e));if(!o)return!1;if(s(a=o)&&a.startsWith("{")&&a.endsWith("}")){var r=JSON.parse(o),n=r.timeout,i=r.timestamp;return n&&i?(new Date).getTime()-i<n:!1}return!1}catch(e){console.error(e)}var a},n=function(e,t){t=t||w.DEFAULT_METHOD,window[t].removeItem(d(e))};return t.DATE=r,t.prototype={get:function(e,t){try{if(!a(e,t=t||w.methods))return void console.warn(e+" no survival, please update local data");var o=window[t].getItem(d(e)),r=JSON.parse(o),n=r.originDataType,i=r.data;return"number"===n?+i:["object","array"].includes(n)?JSON.parse(i):"boolean"===n?"true"===i:i}catch(e){console.error(e)}},set:function(t,e,o){var r=2<arguments.length&&void 0!==o?o:{};if(c(e))console.warn("set data must exist");else{var n=w.LOCAL_METHODS_LIST,i=l({timeout:w.TIMEOUT,methods:w.DEFAULT_METHOD},r);if(n.includes(i.methods))if("number"===h(i.timeout)){var a=f(e),s=(new Date).getTime(),u={originDataType:h(e),timeout:i.timeout,timestamp:s,data:a};try{window[i.methods].setItem(d(t),JSON.stringify(u))}catch(e){if(!w.IS_AUTO_CLEAR)throw e;if(function(e){return"domexception"===h(e)}(e)){if(e.message.includes("exceeded")){m(i.methods);try{window[i.methods].setItem(d(t),JSON.stringify(u))}catch(e){throw e}return}throw e}throw e}}else console.warn("set option.timeout must be number");else console.warn("set no exist this "+i.methods)}},remove:n,clear:function(t){t=t||w.DEFAULT_METHOD,Object.keys(window[t]).filter(function(e){return e.startsWith(w.defaultPrefix)}).forEach(function(e){window[t].removeItem(e)})},checkDataSurvival:a,formatSaveData:f,clearOutTimeMemory:m},t});
//# sourceMappingURL=index.js.map
