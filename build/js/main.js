/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfills */ \"./js/utils/polyfills.js\");\n/* harmony import */ var _utils_ie_footer_nailing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/ie-footer-nailing */ \"./js/utils/ie-footer-nailing.js\");\n/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/scroll */ \"./js/modules/scroll.js\");\n\n\n\n\n\n// Utils\n// ---------------------------------\n\nObject(_utils_polyfills__WEBPACK_IMPORTED_MODULE_0__[\"polyfills\"])();\nObject(_utils_ie_footer_nailing__WEBPACK_IMPORTED_MODULE_1__[\"ieFooterNailing\"])();\n\n// Modules\n// ---------------------------------\n\nObject(_modules_scroll__WEBPACK_IMPORTED_MODULE_2__[\"initSmoothScrolling\"])();\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/modules/scroll.js":
/*!******************************!*\
  !*** ./js/modules/scroll.js ***!
  \******************************/
/*! exports provided: initSmoothScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initSmoothScrolling\", function() { return initSmoothScrolling; });\nconst anchorList = document.querySelectorAll('.nav__item');\n\nconst initSmoothScrolling = () => {\n  anchorList.forEach(function (anchor) {\n    anchor.addEventListener('click', function (e) {\n      e.preventDefault();\n      const blockID = e.target.getAttribute('href').substr(1);\n      window.scrollTo({\n        top: document.getElementById(blockID).offsetTop,\n        left: 0,\n        behavior: 'smooth',\n      });\n    });\n  });\n};\n\n\n\n\n//# sourceURL=webpack:///./js/modules/scroll.js?");

/***/ }),

/***/ "./js/utils/ie-footer-nailing.js":
/*!***************************************!*\
  !*** ./js/utils/ie-footer-nailing.js ***!
  \***************************************/
/*! exports provided: ieFooterNailing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ieFooterNailing\", function() { return ieFooterNailing; });\nconst main = document.querySelector('main');\nconst header = document.querySelector('.header');\nconst footer = document.querySelector('.footer');\n\nlet headerH;\nlet footerH;\nlet mainHMin;\n\nconst ieFooterNailing = () => {\n  if (!main || !(!!window.MSInputMethodContext && !!document.documentMode)) {\n    return;\n  }\n\n  const mainHeight = () => {\n    // eslint-disable-next-line no-unused-expressions\n    header ? headerH = header.getBoundingClientRect().height : headerH = 0;\n    // eslint-disable-next-line no-unused-expressions\n    footer ? footerH = footer.getBoundingClientRect().height : footerH = 0;\n    mainHMin = window.innerHeight;\n\n    main.style.minHeight = mainHMin - (headerH + footerH) + 'px';\n  };\n\n  document.addEventListener('loadDOMContentLoaded', mainHeight());\n  window.addEventListener('resize', mainHeight);\n};\n\n\n\n\n//# sourceURL=webpack:///./js/utils/ie-footer-nailing.js?");

/***/ }),

/***/ "./js/utils/polyfills.js":
/*!*******************************!*\
  !*** ./js/utils/polyfills.js ***!
  \*******************************/
/*! exports provided: polyfills */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyfills\", function() { return polyfills; });\n/* eslint-disable */\nconst polyfills = () => {\n  // forEach\n  if (window.NodeList && !NodeList.prototype.forEach) {\n    NodeList.prototype.forEach = function (callback, thisArg) {\n      thisArg = thisArg || window;\n      for (let i = 0; i < this.length; i++) {\n        callback.call(thisArg, this[i], i, this);\n      }\n    };\n  }\n\n  // includes\n  if (!Array.prototype.includes) {\n    Object.defineProperty(Array.prototype, 'includes', {\n      value: function(searchElement, fromIndex) {\n\n        if (this == null) {\n          throw new TypeError('\"this\" is null or not defined');\n        }\n\n        var o = Object(this);\n\n        var len = o.length >>> 0;\n\n        if (len === 0) {\n          return false;\n        }\n\n        var n = fromIndex | 0;\n\n        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);\n\n        function sameValueZero(x, y) {\n          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));\n        }\n\n        while (k < len) {\n          if (sameValueZero(o[k], searchElement)) {\n            return true;\n          }\n          k++;\n        }\n\n        return false;\n      }\n    });\n  }\n\n  // matches\n  if (!Element.prototype.matches) {\n    Element.prototype.matches =\n      Element.prototype.matchesSelector ||\n      Element.prototype.mozMatchesSelector ||\n      Element.prototype.msMatchesSelector ||\n      Element.prototype.oMatchesSelector ||\n      Element.prototype.webkitMatchesSelector ||\n      function (s) {\n        let matches = (this.document || this.ownerDocument).querySelectorAll(s);\n        let i = matches.length;\n        // eslint-disable-next-line no-empty\n        while (--i >= 0 && matches.item(i) !== this) {}\n        return i > -1;\n      };\n  }\n\n  // closest\n  if (!Element.prototype.matches) {\n    Element.prototype.matches =\n      Element.prototype.msMatchesSelector ||\n      Element.prototype.webkitMatchesSelector;\n  }\n\n  if (!Element.prototype.closest) {\n    Element.prototype.closest = function (s) {\n      let el = this;\n\n      do {\n        if (el.matches(s)) {\n          return el;\n        }\n        el = el.parentElement || el.parentNode;\n      } while (el !== null && el.nodeType === 1);\n      return null;\n    };\n  }\n\n  // prepend\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`prepend`)) {\n        return;\n      }\n      Object.defineProperty(item, `prepend`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function prepend() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.insertBefore(docFrag, this.firstChild);\n        },\n      });\n    });\n  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);\n\n  // append\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`append`)) {\n        return;\n      }\n      Object.defineProperty(item, `append`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function append() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.appendChild(docFrag);\n        },\n      });\n    });\n  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);\n\n  // before\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`before`)) {\n        return;\n      }\n      Object.defineProperty(item, `before`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function before() {\n          // eslint-disable-next-line prefer-rest-params\n          let argArr = Array.prototype.slice.call(arguments);\n          let docFrag = document.createDocumentFragment();\n\n          argArr.forEach(function (argItem) {\n            let isNode = argItem instanceof Node;\n            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));\n          });\n\n          this.parentNode.insertBefore(docFrag, this);\n        },\n      });\n    });\n  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);\n\n  // remove\n  (function (arr) {\n    arr.forEach(function (item) {\n      if (item.hasOwnProperty(`remove`)) {\n        return;\n      }\n      Object.defineProperty(item, `remove`, {\n        configurable: true,\n        enumerable: true,\n        writable: true,\n        value: function remove() {\n          if (this.parentNode !== null) {\n            this.parentNode.removeChild(this);\n          }\n        },\n      });\n    });\n  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);\n\n  // startsWith\n  if (!String.prototype.startsWith) {\n    // eslint-disable-next-line no-extend-native\n    Object.defineProperty(String.prototype, `startsWith`, {\n      value(search, rawPos) {\n        let pos = rawPos > 0 ? rawPos | 0 : 0;\n        return this.substring(pos, pos + search.length) === search;\n      },\n    });\n  }\n\n  // ie download\n  const ie11Download = (el) => {\n    if (el.href === ``) {\n      throw Error(`The element has no href value.`);\n    }\n\n    let filename = el.getAttribute(`download`);\n    if (filename === null || filename === ``) {\n      const tmp = el.href.split(`/`);\n      filename = tmp[tmp.length - 1];\n    }\n\n    el.addEventListener(`click`, (evt) => {\n      evt.preventDefault();\n      const xhr = new XMLHttpRequest();\n      xhr.onloadstart = () => {\n        xhr.responseType = `blob`;\n      };\n      xhr.onload = () => {\n        navigator.msSaveOrOpenBlob(xhr.response, filename);\n      };\n      xhr.open(`GET`, el.href, true);\n      xhr.send();\n    });\n  };\n\n  if (window.navigator.msSaveBlob) {\n    const downloadLinks = document.querySelectorAll(`a[download]`);\n    if (downloadLinks.length) {\n      downloadLinks.forEach((el) => {\n        ie11Download(el);\n      });\n    }\n  }\n};\n\n\n\n\n//# sourceURL=webpack:///./js/utils/polyfills.js?");

/***/ })

/******/ });