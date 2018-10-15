/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./messages/full-stack.md":
/*!********************************!*\
  !*** ./messages/full-stack.md ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"welcome-to-4geeks-academy-\">Welcome to 4Geeks Academy!</h1>\n<p>To start your learning, please click on &quot;My Journey&quot; on the left menu and start completing the <code>readings</code>, <code>exercises</code>, and <code>projects</code> one by one.</p>\n<h5 id=\"other-useful-links-\">Other Useful links:</h5>\n<ol>\n<li><a href=\"https://4geeksacademy.slack.com\">Academy Slack</a></li>\n<li><a href=\"https://repl.it/student\">Repl.it</a></li>\n<li><a href=\"https://ide.c9.io/\">Cloud 9</a></li>\n</ol>\n";

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/breadcrumb/breadcrumb.scss":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/breadcrumb/breadcrumb.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".breadcrumb {\n  padding: 0;\n  background: inherit; }\n  .breadcrumb li {\n    list-style: none;\n    width: inherit;\n    cursor: pointer;\n    display: inline;\n    padding: 0; }\n    .breadcrumb li .logo {\n      max-width: 32px; }\n    .breadcrumb li:hover {\n      color: #ffbf00; }\n    .breadcrumb li:not(:first-child):before {\n      content: \":\";\n      color: #ffbf00; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/button/button.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/button/button.scss ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bcbutton {\n  border: 1px solid #eee;\n  color: #5b5b5b;\n  background: white;\n  padding: 20px; }\n  .bcbutton .btnicon {\n    margin-right: 10px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/checkbox/checkbox.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/checkbox/checkbox.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".checkbox {\n  padding: 5px;\n  cursor: pointer; }\n  .checkbox span {\n    float: left; }\n  .checkbox:hover {\n    background: #eee; }\n  .checkbox label {\n    cursor: pointer;\n    margin-bottom: 0px; }\n  .checkbox svg {\n    margin-right: 10px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/droplink/droplink.scss":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/droplink/droplink.scss ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bcdroplink.dropdown {\n  display: inline; }\n  .bcdroplink.dropdown .btn.dropdown-toggle {\n    font-size: 22px; }\n  .bcdroplink.dropdown .dropdown-menu a {\n    cursor: pointer; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/kpi-progress/kpi-progress.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/kpi-progress/kpi-progress.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bcprogress {\n  width: 45px;\n  height: 45px;\n  font-size: 12px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 50%; }\n  .bcprogress .ko-progress-circle__slice, .bcprogress .ko-progress-circle__fill {\n    width: 45px;\n    height: 45px;\n    position: absolute;\n    -webkit-backface-visibility: hidden;\n    transition: transform 1s;\n    border-radius: 50%; }\n  .bcprogress .ko-progress-circle__slice {\n    clip: rect(0px, 45px, 45px, 22.5px); }\n    .bcprogress .ko-progress-circle__slice .ko-progress-circle__fill {\n      clip: rect(0px, 22.5px, 45px, 0px);\n      background-color: #28a745; }\n  .bcprogress .ko-progress-circle__overlay {\n    width: 38px;\n    height: 38px;\n    line-height: 38px;\n    text-align: center;\n    position: absolute;\n    margin-left: 3.5px;\n    margin-top: 3.5px;\n    background-color: #fbfbfb;\n    border-radius: 50%; }\n  .bcprogress[data-progress='0'] .ko-progress-circle__slice.full, .bcprogress[data-progress='0'] .ko-progress-circle__fill {\n    transform: rotate(0deg); }\n  .bcprogress[data-progress='0'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(0deg); }\n  .bcprogress[data-progress='1'] .ko-progress-circle__slice.full, .bcprogress[data-progress='1'] .ko-progress-circle__fill {\n    transform: rotate(1.8deg); }\n  .bcprogress[data-progress='1'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(3.6deg); }\n  .bcprogress[data-progress='2'] .ko-progress-circle__slice.full, .bcprogress[data-progress='2'] .ko-progress-circle__fill {\n    transform: rotate(3.6deg); }\n  .bcprogress[data-progress='2'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(7.2deg); }\n  .bcprogress[data-progress='3'] .ko-progress-circle__slice.full, .bcprogress[data-progress='3'] .ko-progress-circle__fill {\n    transform: rotate(5.4deg); }\n  .bcprogress[data-progress='3'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(10.8deg); }\n  .bcprogress[data-progress='4'] .ko-progress-circle__slice.full, .bcprogress[data-progress='4'] .ko-progress-circle__fill {\n    transform: rotate(7.2deg); }\n  .bcprogress[data-progress='4'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(14.4deg); }\n  .bcprogress[data-progress='5'] .ko-progress-circle__slice.full, .bcprogress[data-progress='5'] .ko-progress-circle__fill {\n    transform: rotate(9deg); }\n  .bcprogress[data-progress='5'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(18deg); }\n  .bcprogress[data-progress='6'] .ko-progress-circle__slice.full, .bcprogress[data-progress='6'] .ko-progress-circle__fill {\n    transform: rotate(10.8deg); }\n  .bcprogress[data-progress='6'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(21.6deg); }\n  .bcprogress[data-progress='7'] .ko-progress-circle__slice.full, .bcprogress[data-progress='7'] .ko-progress-circle__fill {\n    transform: rotate(12.6deg); }\n  .bcprogress[data-progress='7'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(25.2deg); }\n  .bcprogress[data-progress='8'] .ko-progress-circle__slice.full, .bcprogress[data-progress='8'] .ko-progress-circle__fill {\n    transform: rotate(14.4deg); }\n  .bcprogress[data-progress='8'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(28.8deg); }\n  .bcprogress[data-progress='9'] .ko-progress-circle__slice.full, .bcprogress[data-progress='9'] .ko-progress-circle__fill {\n    transform: rotate(16.2deg); }\n  .bcprogress[data-progress='9'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(32.4deg); }\n  .bcprogress[data-progress='10'] .ko-progress-circle__slice.full, .bcprogress[data-progress='10'] .ko-progress-circle__fill {\n    transform: rotate(18deg); }\n  .bcprogress[data-progress='10'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(36deg); }\n  .bcprogress[data-progress='11'] .ko-progress-circle__slice.full, .bcprogress[data-progress='11'] .ko-progress-circle__fill {\n    transform: rotate(19.8deg); }\n  .bcprogress[data-progress='11'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(39.6deg); }\n  .bcprogress[data-progress='12'] .ko-progress-circle__slice.full, .bcprogress[data-progress='12'] .ko-progress-circle__fill {\n    transform: rotate(21.6deg); }\n  .bcprogress[data-progress='12'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(43.2deg); }\n  .bcprogress[data-progress='13'] .ko-progress-circle__slice.full, .bcprogress[data-progress='13'] .ko-progress-circle__fill {\n    transform: rotate(23.4deg); }\n  .bcprogress[data-progress='13'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(46.8deg); }\n  .bcprogress[data-progress='14'] .ko-progress-circle__slice.full, .bcprogress[data-progress='14'] .ko-progress-circle__fill {\n    transform: rotate(25.2deg); }\n  .bcprogress[data-progress='14'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(50.4deg); }\n  .bcprogress[data-progress='15'] .ko-progress-circle__slice.full, .bcprogress[data-progress='15'] .ko-progress-circle__fill {\n    transform: rotate(27deg); }\n  .bcprogress[data-progress='15'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(54deg); }\n  .bcprogress[data-progress='16'] .ko-progress-circle__slice.full, .bcprogress[data-progress='16'] .ko-progress-circle__fill {\n    transform: rotate(28.8deg); }\n  .bcprogress[data-progress='16'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(57.6deg); }\n  .bcprogress[data-progress='17'] .ko-progress-circle__slice.full, .bcprogress[data-progress='17'] .ko-progress-circle__fill {\n    transform: rotate(30.6deg); }\n  .bcprogress[data-progress='17'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(61.2deg); }\n  .bcprogress[data-progress='18'] .ko-progress-circle__slice.full, .bcprogress[data-progress='18'] .ko-progress-circle__fill {\n    transform: rotate(32.4deg); }\n  .bcprogress[data-progress='18'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(64.8deg); }\n  .bcprogress[data-progress='19'] .ko-progress-circle__slice.full, .bcprogress[data-progress='19'] .ko-progress-circle__fill {\n    transform: rotate(34.2deg); }\n  .bcprogress[data-progress='19'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(68.4deg); }\n  .bcprogress[data-progress='20'] .ko-progress-circle__slice.full, .bcprogress[data-progress='20'] .ko-progress-circle__fill {\n    transform: rotate(36deg); }\n  .bcprogress[data-progress='20'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(72deg); }\n  .bcprogress[data-progress='21'] .ko-progress-circle__slice.full, .bcprogress[data-progress='21'] .ko-progress-circle__fill {\n    transform: rotate(37.8deg); }\n  .bcprogress[data-progress='21'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(75.6deg); }\n  .bcprogress[data-progress='22'] .ko-progress-circle__slice.full, .bcprogress[data-progress='22'] .ko-progress-circle__fill {\n    transform: rotate(39.6deg); }\n  .bcprogress[data-progress='22'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(79.2deg); }\n  .bcprogress[data-progress='23'] .ko-progress-circle__slice.full, .bcprogress[data-progress='23'] .ko-progress-circle__fill {\n    transform: rotate(41.4deg); }\n  .bcprogress[data-progress='23'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(82.8deg); }\n  .bcprogress[data-progress='24'] .ko-progress-circle__slice.full, .bcprogress[data-progress='24'] .ko-progress-circle__fill {\n    transform: rotate(43.2deg); }\n  .bcprogress[data-progress='24'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(86.4deg); }\n  .bcprogress[data-progress='25'] .ko-progress-circle__slice.full, .bcprogress[data-progress='25'] .ko-progress-circle__fill {\n    transform: rotate(45deg); }\n  .bcprogress[data-progress='25'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(90deg); }\n  .bcprogress[data-progress='26'] .ko-progress-circle__slice.full, .bcprogress[data-progress='26'] .ko-progress-circle__fill {\n    transform: rotate(46.8deg); }\n  .bcprogress[data-progress='26'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(93.6deg); }\n  .bcprogress[data-progress='27'] .ko-progress-circle__slice.full, .bcprogress[data-progress='27'] .ko-progress-circle__fill {\n    transform: rotate(48.6deg); }\n  .bcprogress[data-progress='27'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(97.2deg); }\n  .bcprogress[data-progress='28'] .ko-progress-circle__slice.full, .bcprogress[data-progress='28'] .ko-progress-circle__fill {\n    transform: rotate(50.4deg); }\n  .bcprogress[data-progress='28'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(100.8deg); }\n  .bcprogress[data-progress='29'] .ko-progress-circle__slice.full, .bcprogress[data-progress='29'] .ko-progress-circle__fill {\n    transform: rotate(52.2deg); }\n  .bcprogress[data-progress='29'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(104.4deg); }\n  .bcprogress[data-progress='30'] .ko-progress-circle__slice.full, .bcprogress[data-progress='30'] .ko-progress-circle__fill {\n    transform: rotate(54deg); }\n  .bcprogress[data-progress='30'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(108deg); }\n  .bcprogress[data-progress='31'] .ko-progress-circle__slice.full, .bcprogress[data-progress='31'] .ko-progress-circle__fill {\n    transform: rotate(55.8deg); }\n  .bcprogress[data-progress='31'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(111.6deg); }\n  .bcprogress[data-progress='32'] .ko-progress-circle__slice.full, .bcprogress[data-progress='32'] .ko-progress-circle__fill {\n    transform: rotate(57.6deg); }\n  .bcprogress[data-progress='32'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(115.2deg); }\n  .bcprogress[data-progress='33'] .ko-progress-circle__slice.full, .bcprogress[data-progress='33'] .ko-progress-circle__fill {\n    transform: rotate(59.4deg); }\n  .bcprogress[data-progress='33'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(118.8deg); }\n  .bcprogress[data-progress='34'] .ko-progress-circle__slice.full, .bcprogress[data-progress='34'] .ko-progress-circle__fill {\n    transform: rotate(61.2deg); }\n  .bcprogress[data-progress='34'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(122.4deg); }\n  .bcprogress[data-progress='35'] .ko-progress-circle__slice.full, .bcprogress[data-progress='35'] .ko-progress-circle__fill {\n    transform: rotate(63deg); }\n  .bcprogress[data-progress='35'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(126deg); }\n  .bcprogress[data-progress='36'] .ko-progress-circle__slice.full, .bcprogress[data-progress='36'] .ko-progress-circle__fill {\n    transform: rotate(64.8deg); }\n  .bcprogress[data-progress='36'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(129.6deg); }\n  .bcprogress[data-progress='37'] .ko-progress-circle__slice.full, .bcprogress[data-progress='37'] .ko-progress-circle__fill {\n    transform: rotate(66.6deg); }\n  .bcprogress[data-progress='37'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(133.2deg); }\n  .bcprogress[data-progress='38'] .ko-progress-circle__slice.full, .bcprogress[data-progress='38'] .ko-progress-circle__fill {\n    transform: rotate(68.4deg); }\n  .bcprogress[data-progress='38'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(136.8deg); }\n  .bcprogress[data-progress='39'] .ko-progress-circle__slice.full, .bcprogress[data-progress='39'] .ko-progress-circle__fill {\n    transform: rotate(70.2deg); }\n  .bcprogress[data-progress='39'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(140.4deg); }\n  .bcprogress[data-progress='40'] .ko-progress-circle__slice.full, .bcprogress[data-progress='40'] .ko-progress-circle__fill {\n    transform: rotate(72deg); }\n  .bcprogress[data-progress='40'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(144deg); }\n  .bcprogress[data-progress='41'] .ko-progress-circle__slice.full, .bcprogress[data-progress='41'] .ko-progress-circle__fill {\n    transform: rotate(73.8deg); }\n  .bcprogress[data-progress='41'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(147.6deg); }\n  .bcprogress[data-progress='42'] .ko-progress-circle__slice.full, .bcprogress[data-progress='42'] .ko-progress-circle__fill {\n    transform: rotate(75.6deg); }\n  .bcprogress[data-progress='42'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(151.2deg); }\n  .bcprogress[data-progress='43'] .ko-progress-circle__slice.full, .bcprogress[data-progress='43'] .ko-progress-circle__fill {\n    transform: rotate(77.4deg); }\n  .bcprogress[data-progress='43'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(154.8deg); }\n  .bcprogress[data-progress='44'] .ko-progress-circle__slice.full, .bcprogress[data-progress='44'] .ko-progress-circle__fill {\n    transform: rotate(79.2deg); }\n  .bcprogress[data-progress='44'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(158.4deg); }\n  .bcprogress[data-progress='45'] .ko-progress-circle__slice.full, .bcprogress[data-progress='45'] .ko-progress-circle__fill {\n    transform: rotate(81deg); }\n  .bcprogress[data-progress='45'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(162deg); }\n  .bcprogress[data-progress='46'] .ko-progress-circle__slice.full, .bcprogress[data-progress='46'] .ko-progress-circle__fill {\n    transform: rotate(82.8deg); }\n  .bcprogress[data-progress='46'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(165.6deg); }\n  .bcprogress[data-progress='47'] .ko-progress-circle__slice.full, .bcprogress[data-progress='47'] .ko-progress-circle__fill {\n    transform: rotate(84.6deg); }\n  .bcprogress[data-progress='47'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(169.2deg); }\n  .bcprogress[data-progress='48'] .ko-progress-circle__slice.full, .bcprogress[data-progress='48'] .ko-progress-circle__fill {\n    transform: rotate(86.4deg); }\n  .bcprogress[data-progress='48'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(172.8deg); }\n  .bcprogress[data-progress='49'] .ko-progress-circle__slice.full, .bcprogress[data-progress='49'] .ko-progress-circle__fill {\n    transform: rotate(88.2deg); }\n  .bcprogress[data-progress='49'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(176.4deg); }\n  .bcprogress[data-progress='50'] .ko-progress-circle__slice.full, .bcprogress[data-progress='50'] .ko-progress-circle__fill {\n    transform: rotate(90deg); }\n  .bcprogress[data-progress='50'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(180deg); }\n  .bcprogress[data-progress='51'] .ko-progress-circle__slice.full, .bcprogress[data-progress='51'] .ko-progress-circle__fill {\n    transform: rotate(91.8deg); }\n  .bcprogress[data-progress='51'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(183.6deg); }\n  .bcprogress[data-progress='52'] .ko-progress-circle__slice.full, .bcprogress[data-progress='52'] .ko-progress-circle__fill {\n    transform: rotate(93.6deg); }\n  .bcprogress[data-progress='52'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(187.2deg); }\n  .bcprogress[data-progress='53'] .ko-progress-circle__slice.full, .bcprogress[data-progress='53'] .ko-progress-circle__fill {\n    transform: rotate(95.4deg); }\n  .bcprogress[data-progress='53'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(190.8deg); }\n  .bcprogress[data-progress='54'] .ko-progress-circle__slice.full, .bcprogress[data-progress='54'] .ko-progress-circle__fill {\n    transform: rotate(97.2deg); }\n  .bcprogress[data-progress='54'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(194.4deg); }\n  .bcprogress[data-progress='55'] .ko-progress-circle__slice.full, .bcprogress[data-progress='55'] .ko-progress-circle__fill {\n    transform: rotate(99deg); }\n  .bcprogress[data-progress='55'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(198deg); }\n  .bcprogress[data-progress='56'] .ko-progress-circle__slice.full, .bcprogress[data-progress='56'] .ko-progress-circle__fill {\n    transform: rotate(100.8deg); }\n  .bcprogress[data-progress='56'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(201.6deg); }\n  .bcprogress[data-progress='57'] .ko-progress-circle__slice.full, .bcprogress[data-progress='57'] .ko-progress-circle__fill {\n    transform: rotate(102.6deg); }\n  .bcprogress[data-progress='57'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(205.2deg); }\n  .bcprogress[data-progress='58'] .ko-progress-circle__slice.full, .bcprogress[data-progress='58'] .ko-progress-circle__fill {\n    transform: rotate(104.4deg); }\n  .bcprogress[data-progress='58'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(208.8deg); }\n  .bcprogress[data-progress='59'] .ko-progress-circle__slice.full, .bcprogress[data-progress='59'] .ko-progress-circle__fill {\n    transform: rotate(106.2deg); }\n  .bcprogress[data-progress='59'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(212.4deg); }\n  .bcprogress[data-progress='60'] .ko-progress-circle__slice.full, .bcprogress[data-progress='60'] .ko-progress-circle__fill {\n    transform: rotate(108deg); }\n  .bcprogress[data-progress='60'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(216deg); }\n  .bcprogress[data-progress='61'] .ko-progress-circle__slice.full, .bcprogress[data-progress='61'] .ko-progress-circle__fill {\n    transform: rotate(109.8deg); }\n  .bcprogress[data-progress='61'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(219.6deg); }\n  .bcprogress[data-progress='62'] .ko-progress-circle__slice.full, .bcprogress[data-progress='62'] .ko-progress-circle__fill {\n    transform: rotate(111.6deg); }\n  .bcprogress[data-progress='62'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(223.2deg); }\n  .bcprogress[data-progress='63'] .ko-progress-circle__slice.full, .bcprogress[data-progress='63'] .ko-progress-circle__fill {\n    transform: rotate(113.4deg); }\n  .bcprogress[data-progress='63'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(226.8deg); }\n  .bcprogress[data-progress='64'] .ko-progress-circle__slice.full, .bcprogress[data-progress='64'] .ko-progress-circle__fill {\n    transform: rotate(115.2deg); }\n  .bcprogress[data-progress='64'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(230.4deg); }\n  .bcprogress[data-progress='65'] .ko-progress-circle__slice.full, .bcprogress[data-progress='65'] .ko-progress-circle__fill {\n    transform: rotate(117deg); }\n  .bcprogress[data-progress='65'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(234deg); }\n  .bcprogress[data-progress='66'] .ko-progress-circle__slice.full, .bcprogress[data-progress='66'] .ko-progress-circle__fill {\n    transform: rotate(118.8deg); }\n  .bcprogress[data-progress='66'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(237.6deg); }\n  .bcprogress[data-progress='67'] .ko-progress-circle__slice.full, .bcprogress[data-progress='67'] .ko-progress-circle__fill {\n    transform: rotate(120.6deg); }\n  .bcprogress[data-progress='67'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(241.2deg); }\n  .bcprogress[data-progress='68'] .ko-progress-circle__slice.full, .bcprogress[data-progress='68'] .ko-progress-circle__fill {\n    transform: rotate(122.4deg); }\n  .bcprogress[data-progress='68'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(244.8deg); }\n  .bcprogress[data-progress='69'] .ko-progress-circle__slice.full, .bcprogress[data-progress='69'] .ko-progress-circle__fill {\n    transform: rotate(124.2deg); }\n  .bcprogress[data-progress='69'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(248.4deg); }\n  .bcprogress[data-progress='70'] .ko-progress-circle__slice.full, .bcprogress[data-progress='70'] .ko-progress-circle__fill {\n    transform: rotate(126deg); }\n  .bcprogress[data-progress='70'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(252deg); }\n  .bcprogress[data-progress='71'] .ko-progress-circle__slice.full, .bcprogress[data-progress='71'] .ko-progress-circle__fill {\n    transform: rotate(127.8deg); }\n  .bcprogress[data-progress='71'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(255.6deg); }\n  .bcprogress[data-progress='72'] .ko-progress-circle__slice.full, .bcprogress[data-progress='72'] .ko-progress-circle__fill {\n    transform: rotate(129.6deg); }\n  .bcprogress[data-progress='72'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(259.2deg); }\n  .bcprogress[data-progress='73'] .ko-progress-circle__slice.full, .bcprogress[data-progress='73'] .ko-progress-circle__fill {\n    transform: rotate(131.4deg); }\n  .bcprogress[data-progress='73'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(262.8deg); }\n  .bcprogress[data-progress='74'] .ko-progress-circle__slice.full, .bcprogress[data-progress='74'] .ko-progress-circle__fill {\n    transform: rotate(133.2deg); }\n  .bcprogress[data-progress='74'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(266.4deg); }\n  .bcprogress[data-progress='75'] .ko-progress-circle__slice.full, .bcprogress[data-progress='75'] .ko-progress-circle__fill {\n    transform: rotate(135deg); }\n  .bcprogress[data-progress='75'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(270deg); }\n  .bcprogress[data-progress='76'] .ko-progress-circle__slice.full, .bcprogress[data-progress='76'] .ko-progress-circle__fill {\n    transform: rotate(136.8deg); }\n  .bcprogress[data-progress='76'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(273.6deg); }\n  .bcprogress[data-progress='77'] .ko-progress-circle__slice.full, .bcprogress[data-progress='77'] .ko-progress-circle__fill {\n    transform: rotate(138.6deg); }\n  .bcprogress[data-progress='77'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(277.2deg); }\n  .bcprogress[data-progress='78'] .ko-progress-circle__slice.full, .bcprogress[data-progress='78'] .ko-progress-circle__fill {\n    transform: rotate(140.4deg); }\n  .bcprogress[data-progress='78'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(280.8deg); }\n  .bcprogress[data-progress='79'] .ko-progress-circle__slice.full, .bcprogress[data-progress='79'] .ko-progress-circle__fill {\n    transform: rotate(142.2deg); }\n  .bcprogress[data-progress='79'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(284.4deg); }\n  .bcprogress[data-progress='80'] .ko-progress-circle__slice.full, .bcprogress[data-progress='80'] .ko-progress-circle__fill {\n    transform: rotate(144deg); }\n  .bcprogress[data-progress='80'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(288deg); }\n  .bcprogress[data-progress='81'] .ko-progress-circle__slice.full, .bcprogress[data-progress='81'] .ko-progress-circle__fill {\n    transform: rotate(145.8deg); }\n  .bcprogress[data-progress='81'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(291.6deg); }\n  .bcprogress[data-progress='82'] .ko-progress-circle__slice.full, .bcprogress[data-progress='82'] .ko-progress-circle__fill {\n    transform: rotate(147.6deg); }\n  .bcprogress[data-progress='82'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(295.2deg); }\n  .bcprogress[data-progress='83'] .ko-progress-circle__slice.full, .bcprogress[data-progress='83'] .ko-progress-circle__fill {\n    transform: rotate(149.4deg); }\n  .bcprogress[data-progress='83'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(298.8deg); }\n  .bcprogress[data-progress='84'] .ko-progress-circle__slice.full, .bcprogress[data-progress='84'] .ko-progress-circle__fill {\n    transform: rotate(151.2deg); }\n  .bcprogress[data-progress='84'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(302.4deg); }\n  .bcprogress[data-progress='85'] .ko-progress-circle__slice.full, .bcprogress[data-progress='85'] .ko-progress-circle__fill {\n    transform: rotate(153deg); }\n  .bcprogress[data-progress='85'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(306deg); }\n  .bcprogress[data-progress='86'] .ko-progress-circle__slice.full, .bcprogress[data-progress='86'] .ko-progress-circle__fill {\n    transform: rotate(154.8deg); }\n  .bcprogress[data-progress='86'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(309.6deg); }\n  .bcprogress[data-progress='87'] .ko-progress-circle__slice.full, .bcprogress[data-progress='87'] .ko-progress-circle__fill {\n    transform: rotate(156.6deg); }\n  .bcprogress[data-progress='87'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(313.2deg); }\n  .bcprogress[data-progress='88'] .ko-progress-circle__slice.full, .bcprogress[data-progress='88'] .ko-progress-circle__fill {\n    transform: rotate(158.4deg); }\n  .bcprogress[data-progress='88'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(316.8deg); }\n  .bcprogress[data-progress='89'] .ko-progress-circle__slice.full, .bcprogress[data-progress='89'] .ko-progress-circle__fill {\n    transform: rotate(160.2deg); }\n  .bcprogress[data-progress='89'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(320.4deg); }\n  .bcprogress[data-progress='90'] .ko-progress-circle__slice.full, .bcprogress[data-progress='90'] .ko-progress-circle__fill {\n    transform: rotate(162deg); }\n  .bcprogress[data-progress='90'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(324deg); }\n  .bcprogress[data-progress='91'] .ko-progress-circle__slice.full, .bcprogress[data-progress='91'] .ko-progress-circle__fill {\n    transform: rotate(163.8deg); }\n  .bcprogress[data-progress='91'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(327.6deg); }\n  .bcprogress[data-progress='92'] .ko-progress-circle__slice.full, .bcprogress[data-progress='92'] .ko-progress-circle__fill {\n    transform: rotate(165.6deg); }\n  .bcprogress[data-progress='92'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(331.2deg); }\n  .bcprogress[data-progress='93'] .ko-progress-circle__slice.full, .bcprogress[data-progress='93'] .ko-progress-circle__fill {\n    transform: rotate(167.4deg); }\n  .bcprogress[data-progress='93'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(334.8deg); }\n  .bcprogress[data-progress='94'] .ko-progress-circle__slice.full, .bcprogress[data-progress='94'] .ko-progress-circle__fill {\n    transform: rotate(169.2deg); }\n  .bcprogress[data-progress='94'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(338.4deg); }\n  .bcprogress[data-progress='95'] .ko-progress-circle__slice.full, .bcprogress[data-progress='95'] .ko-progress-circle__fill {\n    transform: rotate(171deg); }\n  .bcprogress[data-progress='95'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(342deg); }\n  .bcprogress[data-progress='96'] .ko-progress-circle__slice.full, .bcprogress[data-progress='96'] .ko-progress-circle__fill {\n    transform: rotate(172.8deg); }\n  .bcprogress[data-progress='96'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(345.6deg); }\n  .bcprogress[data-progress='97'] .ko-progress-circle__slice.full, .bcprogress[data-progress='97'] .ko-progress-circle__fill {\n    transform: rotate(174.6deg); }\n  .bcprogress[data-progress='97'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(349.2deg); }\n  .bcprogress[data-progress='98'] .ko-progress-circle__slice.full, .bcprogress[data-progress='98'] .ko-progress-circle__fill {\n    transform: rotate(176.4deg); }\n  .bcprogress[data-progress='98'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(352.8deg); }\n  .bcprogress[data-progress='99'] .ko-progress-circle__slice.full, .bcprogress[data-progress='99'] .ko-progress-circle__fill {\n    transform: rotate(178.2deg); }\n  .bcprogress[data-progress='99'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(356.4deg); }\n  .bcprogress[data-progress='100'] .ko-progress-circle__slice.full, .bcprogress[data-progress='100'] .ko-progress-circle__fill {\n    transform: rotate(180deg); }\n  .bcprogress[data-progress='100'] .ko-progress-circle__fill.ko-progress-circle__bar {\n    transform: rotate(360deg); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/list/list.scss":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/list/list.scss ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".bclist {\n  display: inline-block;\n  text-align: left; }\n  .bclist .actionable-item {\n    position: relative; }\n    .bclist .actionable-item svg {\n      margin-left: 5px;\n      opacity: 0.5; }\n    .bclist .actionable-item .done {\n      color: #28a745; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/loading/loading.scss":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/loading/loading.scss ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loading {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: white;\n  text-align: center;\n  padding-top: 100px;\n  font-size: 50px; }\n  .loading svg {\n    animation-name: rotate;\n    animation-duration: 2s;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear; }\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel-navbar/panel-navbar.scss":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel-navbar/panel-navbar.scss ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel-navbar {\n  background: white;\n  text-align: center;\n  position: relative; }\n\n.panel-navbar .btn-container {\n  width: 200px; }\n\n.panel-navbar .day-label {\n  font-size: 12px;\n  margin: 0;\n  margin-top: -7px; }\n\n.panel-navbar .btn {\n  width: 200px;\n  border-radius: 0; }\n\n.panel-navbar .btn-collapse {\n  font-size: 12px;\n  position: absolute;\n  border-radius: 100%;\n  width: 20px;\n  height: 20px;\n  bottom: -8px;\n  background: white;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  outline: none;\n  transform: translateX(-10px); }\n\n.panel-navbar .btn-collapse:hover {\n  outline: none;\n  background-color: #BDBDBD; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel/panel.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel/panel.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel {\n  border-radius: 2px;\n  overflow: auto;\n  padding: 10px;\n  margin-left: 5px;\n  height: 100vh;\n  position: relative; }\n  .panel .panel-toolbar {\n    display: inline-block;\n    margin: auto; }\n    .panel .panel-toolbar .bcbutton {\n      font-size: 20px; }\n  .panel.deph-1 {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  .panel.deph-1:hover {\n    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n  .panel.deph-2 {\n    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n  .panel.deph-3 {\n    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n  .panel.deph-4 {\n    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n  .panel.deph-5 {\n    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/sidebar/sidebar.scss":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/sidebar/sidebar.scss ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".settings-item {\n  position: absolute;\n  padding-left: 10px;\n  bottom: 10px;\n  right: 0;\n  z-index: 10;\n  width: 100%; }\n  .settings-item.collapsed {\n    right: -1px; }\n    .settings-item.collapsed .dropdown-toggle:after {\n      display: none; }\n  .settings-item .dropdown {\n    float: right;\n    margin-top: -3px; }\n    .settings-item .dropdown .up {\n      transform: translateY(calc(-100% - 40px)); }\n\n.bc-sidebar.collapsed {\n  overflow: inherit; }\n  .bc-sidebar.collapsed .dropdown-toggle:after {\n    display: none; }\n\n.bc-sidebar .nav-link {\n  padding: 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/theme/theme.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/theme/theme.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul.bcnotifier {\n  padding: 0;\n  margin: 0; }\n  ul.bcnotifier li {\n    list-style: none;\n    height: 0;\n    margin: 0;\n    text-align: center;\n    padding: 10px 0;\n    border-radius: 0px;\n    overflow: hidden; }\n    ul.bcnotifier li.bcnotification-appear {\n      opacity: 0.01;\n      padding: 10px;\n      height: 0;\n      overflow: hidden; }\n      ul.bcnotifier li.bcnotification-appear.bcnotification-appear-active {\n        opacity: 1;\n        height: inherit;\n        overflow: inherit;\n        transition: opacity 1s ease-in, height 1s ease-in; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Abril+Fatface|Khand);", ""]);

// module
exports.push([module.i, "/*!\n * Bootstrap v4.1.3 (https://getbootstrap.com/)\n * Copyright 2011-2018 The Bootstrap Authors\n * Copyright 2011-2018 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n:root {\n  --blue: #007bff;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #dc3545;\n  --orange: #fd7e14;\n  --yellow: #ffc107;\n  --green: #28a745;\n  --teal: #20c997;\n  --cyan: #17a2b8;\n  --white: #fff;\n  --gray: #6c757d;\n  --gray-dark: #343a40;\n  --primary: #007bff;\n  --secondary: #6c757d;\n  --success: #28a745;\n  --info: #17a2b8;\n  --warning: #ffc107;\n  --danger: #dc3545;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n\n@-ms-viewport {\n  width: device-width; }\n\narticle, aside, figcaption, figure, footer, header, hgroup, main, nav, section {\n  display: block; }\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: 0 !important; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  text-decoration: underline;\n  text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: 700; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\ndfn {\n  font-style: italic; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -.25em; }\n\nsup {\n  top: -.5em; }\n\na {\n  color: #007bff;\n  text-decoration: none;\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n  a:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  font-size: 1em; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n  -ms-overflow-style: scrollbar; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle;\n  border-style: none; }\n\nsvg {\n  overflow: hidden;\n  vertical-align: middle; }\n\ntable {\n  border-collapse: collapse; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #6c757d;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: inherit; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: 0.5rem; }\n\nbutton {\n  border-radius: 0; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  padding: 0;\n  border-style: none; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  overflow: auto;\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal; }\n\nprogress {\n  vertical-align: baseline; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  outline-offset: -2px;\n  -webkit-appearance: none; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button; }\n\noutput {\n  display: inline-block; }\n\nsummary {\n  display: list-item;\n  cursor: pointer; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.2;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: 400; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 0.5rem; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #6c757d; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #6c757d; }\n\ncode {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-break: break-word; }\n  a > code {\n    color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: 700; }\n\npre {\n  display: block;\n  font-size: 87.5%;\n  color: #212529; }\n  pre code {\n    font-size: inherit;\n    color: inherit;\n    word-break: normal; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n  @media (min-width: 576px) {\n    .container {\n      max-width: 540px; } }\n  @media (min-width: 768px) {\n    .container {\n      max-width: 720px; } }\n  @media (min-width: 992px) {\n    .container {\n      max-width: 960px; } }\n  @media (min-width: 1200px) {\n    .container {\n      max-width: 1140px; } }\n\n.container-fluid {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col,\n.col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm,\n.col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md,\n.col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg,\n.col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl,\n.col-xl-auto {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n\n.col {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto;\n  max-width: none; }\n\n.col-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.order-first {\n  order: -1; }\n\n.order-last {\n  order: 13; }\n\n.order-0 {\n  order: 0; }\n\n.order-1 {\n  order: 1; }\n\n.order-2 {\n  order: 2; }\n\n.order-3 {\n  order: 3; }\n\n.order-4 {\n  order: 4; }\n\n.order-5 {\n  order: 5; }\n\n.order-6 {\n  order: 6; }\n\n.order-7 {\n  order: 7; }\n\n.order-8 {\n  order: 8; }\n\n.order-9 {\n  order: 9; }\n\n.order-10 {\n  order: 10; }\n\n.order-11 {\n  order: 11; }\n\n.order-12 {\n  order: 12; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none; }\n  .col-sm-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-sm-first {\n    order: -1; }\n  .order-sm-last {\n    order: 13; }\n  .order-sm-0 {\n    order: 0; }\n  .order-sm-1 {\n    order: 1; }\n  .order-sm-2 {\n    order: 2; }\n  .order-sm-3 {\n    order: 3; }\n  .order-sm-4 {\n    order: 4; }\n  .order-sm-5 {\n    order: 5; }\n  .order-sm-6 {\n    order: 6; }\n  .order-sm-7 {\n    order: 7; }\n  .order-sm-8 {\n    order: 8; }\n  .order-sm-9 {\n    order: 9; }\n  .order-sm-10 {\n    order: 10; }\n  .order-sm-11 {\n    order: 11; }\n  .order-sm-12 {\n    order: 12; }\n  .offset-sm-0 {\n    margin-left: 0; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none; }\n  .col-md-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-md-first {\n    order: -1; }\n  .order-md-last {\n    order: 13; }\n  .order-md-0 {\n    order: 0; }\n  .order-md-1 {\n    order: 1; }\n  .order-md-2 {\n    order: 2; }\n  .order-md-3 {\n    order: 3; }\n  .order-md-4 {\n    order: 4; }\n  .order-md-5 {\n    order: 5; }\n  .order-md-6 {\n    order: 6; }\n  .order-md-7 {\n    order: 7; }\n  .order-md-8 {\n    order: 8; }\n  .order-md-9 {\n    order: 9; }\n  .order-md-10 {\n    order: 10; }\n  .order-md-11 {\n    order: 11; }\n  .order-md-12 {\n    order: 12; }\n  .offset-md-0 {\n    margin-left: 0; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none; }\n  .col-lg-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-lg-first {\n    order: -1; }\n  .order-lg-last {\n    order: 13; }\n  .order-lg-0 {\n    order: 0; }\n  .order-lg-1 {\n    order: 1; }\n  .order-lg-2 {\n    order: 2; }\n  .order-lg-3 {\n    order: 3; }\n  .order-lg-4 {\n    order: 4; }\n  .order-lg-5 {\n    order: 5; }\n  .order-lg-6 {\n    order: 6; }\n  .order-lg-7 {\n    order: 7; }\n  .order-lg-8 {\n    order: 8; }\n  .order-lg-9 {\n    order: 9; }\n  .order-lg-10 {\n    order: 10; }\n  .order-lg-11 {\n    order: 11; }\n  .order-lg-12 {\n    order: 12; }\n  .offset-lg-0 {\n    margin-left: 0; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none; }\n  .col-xl-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-xl-first {\n    order: -1; }\n  .order-xl-last {\n    order: 13; }\n  .order-xl-0 {\n    order: 0; }\n  .order-xl-1 {\n    order: 1; }\n  .order-xl-2 {\n    order: 2; }\n  .order-xl-3 {\n    order: 3; }\n  .order-xl-4 {\n    order: 4; }\n  .order-xl-5 {\n    order: 5; }\n  .order-xl-6 {\n    order: 6; }\n  .order-xl-7 {\n    order: 7; }\n  .order-xl-8 {\n    order: 8; }\n  .order-xl-9 {\n    order: 9; }\n  .order-xl-10 {\n    order: 10; }\n  .order-xl-11 {\n    order: 11; }\n  .order-xl-12 {\n    order: 12; }\n  .offset-xl-0 {\n    margin-left: 0; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  margin-bottom: 1rem;\n  background-color: transparent; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #dee2e6; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #dee2e6; }\n  .table tbody + tbody {\n    border-top: 2px solid #dee2e6; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #dee2e6; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #dee2e6; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-borderless th,\n.table-borderless td,\n.table-borderless thead th,\n.table-borderless tbody + tbody {\n  border: 0; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-primary,\n.table-primary > th,\n.table-primary > td {\n  background-color: #b8daff; }\n\n.table-hover .table-primary:hover {\n  background-color: #9fcdff; }\n  .table-hover .table-primary:hover > td,\n  .table-hover .table-primary:hover > th {\n    background-color: #9fcdff; }\n\n.table-secondary,\n.table-secondary > th,\n.table-secondary > td {\n  background-color: #d6d8db; }\n\n.table-hover .table-secondary:hover {\n  background-color: #c8cbcf; }\n  .table-hover .table-secondary:hover > td,\n  .table-hover .table-secondary:hover > th {\n    background-color: #c8cbcf; }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #c3e6cb; }\n\n.table-hover .table-success:hover {\n  background-color: #b1dfbb; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #b1dfbb; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #bee5eb; }\n\n.table-hover .table-info:hover {\n  background-color: #abdde5; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #abdde5; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #ffeeba; }\n\n.table-hover .table-warning:hover {\n  background-color: #ffe8a1; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #ffe8a1; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f5c6cb; }\n\n.table-hover .table-danger:hover {\n  background-color: #f1b0b7; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #f1b0b7; }\n\n.table-light,\n.table-light > th,\n.table-light > td {\n  background-color: #fdfdfe; }\n\n.table-hover .table-light:hover {\n  background-color: #ececf6; }\n  .table-hover .table-light:hover > td,\n  .table-hover .table-light:hover > th {\n    background-color: #ececf6; }\n\n.table-dark,\n.table-dark > th,\n.table-dark > td {\n  background-color: #c6c8ca; }\n\n.table-hover .table-dark:hover {\n  background-color: #b9bbbe; }\n  .table-hover .table-dark:hover > td,\n  .table-hover .table-dark:hover > th {\n    background-color: #b9bbbe; }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table .thead-dark th {\n  color: #fff;\n  background-color: #212529;\n  border-color: #32383e; }\n\n.table .thead-light th {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6; }\n\n.table-dark {\n  color: #fff;\n  background-color: #212529; }\n  .table-dark th,\n  .table-dark td,\n  .table-dark thead th {\n    border-color: #32383e; }\n  .table-dark.table-bordered {\n    border: 0; }\n  .table-dark.table-striped tbody tr:nth-of-type(odd) {\n    background-color: rgba(255, 255, 255, 0.05); }\n  .table-dark.table-hover tbody tr:hover {\n    background-color: rgba(255, 255, 255, 0.075); }\n\n@media (max-width: 575.98px) {\n  .table-responsive-sm {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n    .table-responsive-sm > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 767.98px) {\n  .table-responsive-md {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n    .table-responsive-md > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 991.98px) {\n  .table-responsive-lg {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n    .table-responsive-lg > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 1199.98px) {\n  .table-responsive-xl {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar; }\n    .table-responsive-xl > .table-bordered {\n      border: 0; } }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: -ms-autohiding-scrollbar; }\n  .table-responsive > .table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .form-control {\n      transition: none; } }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .form-control::placeholder {\n    color: #6c757d;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #e9ecef;\n    opacity: 1; }\n\nselect.form-control:focus::-ms-value {\n  color: #495057;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block;\n  width: 100%; }\n\n.col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5; }\n\n.col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  margin-bottom: 0;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm {\n  height: calc(1.8125rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.form-control-lg {\n  height: calc(2.875rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\nselect.form-control[size], select.form-control[multiple] {\n  height: auto; }\n\ntextarea.form-control {\n  height: auto; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px; }\n  .form-row > .col,\n  .form-row > [class*=\"col-\"] {\n    padding-right: 5px;\n    padding-left: 5px; }\n\n.form-check {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem; }\n  .form-check-input:disabled ~ .form-check-label {\n    color: #6c757d; }\n\n.form-check-label {\n  margin-bottom: 0; }\n\n.form-check-inline {\n  display: inline-flex;\n  align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem; }\n  .form-check-inline .form-check-input {\n    position: static;\n    margin-top: 0;\n    margin-right: 0.3125rem;\n    margin-left: 0; }\n\n.valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #28a745; }\n\n.valid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(40, 167, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated .form-control:valid, .form-control.is-valid, .was-validated\n.custom-select:valid,\n.custom-select.is-valid {\n  border-color: #28a745; }\n  .was-validated .form-control:valid:focus, .form-control.is-valid:focus, .was-validated\n  .custom-select:valid:focus,\n  .custom-select.is-valid:focus {\n    border-color: #28a745;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n  .was-validated .form-control:valid ~ .valid-feedback,\n  .was-validated .form-control:valid ~ .valid-tooltip, .form-control.is-valid ~ .valid-feedback,\n  .form-control.is-valid ~ .valid-tooltip, .was-validated\n  .custom-select:valid ~ .valid-feedback,\n  .was-validated\n  .custom-select:valid ~ .valid-tooltip,\n  .custom-select.is-valid ~ .valid-feedback,\n  .custom-select.is-valid ~ .valid-tooltip {\n    display: block; }\n\n.was-validated .form-control-file:valid ~ .valid-feedback,\n.was-validated .form-control-file:valid ~ .valid-tooltip, .form-control-file.is-valid ~ .valid-feedback,\n.form-control-file.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {\n  color: #28a745; }\n\n.was-validated .form-check-input:valid ~ .valid-feedback,\n.was-validated .form-check-input:valid ~ .valid-tooltip, .form-check-input.is-valid ~ .valid-feedback,\n.form-check-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:valid ~ .custom-control-label, .custom-control-input.is-valid ~ .custom-control-label {\n  color: #28a745; }\n  .was-validated .custom-control-input:valid ~ .custom-control-label::before, .custom-control-input.is-valid ~ .custom-control-label::before {\n    background-color: #71dd8a; }\n\n.was-validated .custom-control-input:valid ~ .valid-feedback,\n.was-validated .custom-control-input:valid ~ .valid-tooltip, .custom-control-input.is-valid ~ .valid-feedback,\n.custom-control-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:valid:checked ~ .custom-control-label::before, .custom-control-input.is-valid:checked ~ .custom-control-label::before {\n  background-color: #34ce57; }\n\n.was-validated .custom-control-input:valid:focus ~ .custom-control-label::before, .custom-control-input.is-valid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.was-validated .custom-file-input:valid ~ .custom-file-label, .custom-file-input.is-valid ~ .custom-file-label {\n  border-color: #28a745; }\n  .was-validated .custom-file-input:valid ~ .custom-file-label::after, .custom-file-input.is-valid ~ .custom-file-label::after {\n    border-color: inherit; }\n\n.was-validated .custom-file-input:valid ~ .valid-feedback,\n.was-validated .custom-file-input:valid ~ .valid-tooltip, .custom-file-input.is-valid ~ .valid-feedback,\n.custom-file-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-file-input:valid:focus ~ .custom-file-label, .custom-file-input.is-valid:focus ~ .custom-file-label {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545; }\n\n.invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated .form-control:invalid, .form-control.is-invalid, .was-validated\n.custom-select:invalid,\n.custom-select.is-invalid {\n  border-color: #dc3545; }\n  .was-validated .form-control:invalid:focus, .form-control.is-invalid:focus, .was-validated\n  .custom-select:invalid:focus,\n  .custom-select.is-invalid:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n  .was-validated .form-control:invalid ~ .invalid-feedback,\n  .was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,\n  .form-control.is-invalid ~ .invalid-tooltip, .was-validated\n  .custom-select:invalid ~ .invalid-feedback,\n  .was-validated\n  .custom-select:invalid ~ .invalid-tooltip,\n  .custom-select.is-invalid ~ .invalid-feedback,\n  .custom-select.is-invalid ~ .invalid-tooltip {\n    display: block; }\n\n.was-validated .form-control-file:invalid ~ .invalid-feedback,\n.was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,\n.form-control-file.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {\n  color: #dc3545; }\n\n.was-validated .form-check-input:invalid ~ .invalid-feedback,\n.was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,\n.form-check-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:invalid ~ .custom-control-label, .custom-control-input.is-invalid ~ .custom-control-label {\n  color: #dc3545; }\n  .was-validated .custom-control-input:invalid ~ .custom-control-label::before, .custom-control-input.is-invalid ~ .custom-control-label::before {\n    background-color: #efa2a9; }\n\n.was-validated .custom-control-input:invalid ~ .invalid-feedback,\n.was-validated .custom-control-input:invalid ~ .invalid-tooltip, .custom-control-input.is-invalid ~ .invalid-feedback,\n.custom-control-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before, .custom-control-input.is-invalid:checked ~ .custom-control-label::before {\n  background-color: #e4606d; }\n\n.was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before, .custom-control-input.is-invalid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.was-validated .custom-file-input:invalid ~ .custom-file-label, .custom-file-input.is-invalid ~ .custom-file-label {\n  border-color: #dc3545; }\n  .was-validated .custom-file-input:invalid ~ .custom-file-label::after, .custom-file-input.is-invalid ~ .custom-file-label::after {\n    border-color: inherit; }\n\n.was-validated .custom-file-input:invalid ~ .invalid-feedback,\n.was-validated .custom-file-input:invalid ~ .invalid-tooltip, .custom-file-input.is-invalid ~ .invalid-feedback,\n.custom-file-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-file-input:invalid:focus ~ .custom-file-label, .custom-file-input.is-invalid:focus ~ .custom-file-label {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.form-inline {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-plaintext {\n      display: inline-block; }\n    .form-inline .input-group,\n    .form-inline .custom-select {\n      width: auto; }\n    .form-inline .form-check {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      align-items: center;\n      justify-content: center; }\n    .form-inline .custom-control-label {\n      margin-bottom: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .btn {\n      transition: none; } }\n  .btn:hover, .btn:focus {\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .btn.disabled, .btn:disabled {\n    opacity: 0.65; }\n  .btn:not(:disabled):not(.disabled) {\n    cursor: pointer; }\n\na.btn.disabled,\nfieldset:disabled a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #0069d9;\n    border-color: #0062cc; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0062cc;\n    border-color: #005cbf; }\n    .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-primary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.btn-secondary {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d; }\n  .btn-secondary:hover {\n    color: #fff;\n    background-color: #5a6268;\n    border-color: #545b62; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #545b62;\n    border-color: #4e555b; }\n    .btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-secondary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.btn-success {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #218838;\n    border-color: #1e7e34; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #1e7e34;\n    border-color: #1c7430; }\n    .btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-success.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.btn-info {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #138496;\n    border-color: #117a8b; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #117a8b;\n    border-color: #10707f; }\n    .btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-info.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.btn-warning {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107; }\n  .btn-warning:hover {\n    color: #212529;\n    background-color: #e0a800;\n    border-color: #d39e00; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .btn-warning:not(:disabled):not(.disabled):active, .btn-warning:not(:disabled):not(.disabled).active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #212529;\n    background-color: #d39e00;\n    border-color: #c69500; }\n    .btn-warning:not(:disabled):not(.disabled):active:focus, .btn-warning:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-warning.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.btn-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c82333;\n    border-color: #bd2130; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #bd2130;\n    border-color: #b21f2d; }\n    .btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-danger.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.btn-light {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .btn-light:hover {\n    color: #212529;\n    background-color: #e2e6ea;\n    border-color: #dae0e5; }\n  .btn-light:focus, .btn-light.focus {\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n  .btn-light.disabled, .btn-light:disabled {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .btn-light:not(:disabled):not(.disabled):active, .btn-light:not(:disabled):not(.disabled).active,\n  .show > .btn-light.dropdown-toggle {\n    color: #212529;\n    background-color: #dae0e5;\n    border-color: #d3d9df; }\n    .btn-light:not(:disabled):not(.disabled):active:focus, .btn-light:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-light.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.btn-dark {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40; }\n  .btn-dark:hover {\n    color: #fff;\n    background-color: #23272b;\n    border-color: #1d2124; }\n  .btn-dark:focus, .btn-dark.focus {\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n  .btn-dark.disabled, .btn-dark:disabled {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .btn-dark:not(:disabled):not(.disabled):active, .btn-dark:not(:disabled):not(.disabled).active,\n  .show > .btn-dark.dropdown-toggle {\n    color: #fff;\n    background-color: #1d2124;\n    border-color: #171a1d; }\n    .btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-dark.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.btn-outline-primary {\n  color: #007bff;\n  background-color: transparent;\n  background-image: none;\n  border-color: #007bff; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #007bff;\n    background-color: transparent; }\n  .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n    .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-primary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.btn-outline-secondary {\n  color: #6c757d;\n  background-color: transparent;\n  background-image: none;\n  border-color: #6c757d; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #6c757d;\n    background-color: transparent; }\n  .btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n    .btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-secondary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.btn-outline-success {\n  color: #28a745;\n  background-color: transparent;\n  background-image: none;\n  border-color: #28a745; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #28a745;\n    background-color: transparent; }\n  .btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n    .btn-outline-success:not(:disabled):not(.disabled):active:focus, .btn-outline-success:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-success.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.btn-outline-info {\n  color: #17a2b8;\n  background-color: transparent;\n  background-image: none;\n  border-color: #17a2b8; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #17a2b8;\n    background-color: transparent; }\n  .btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n    .btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-info.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.btn-outline-warning {\n  color: #ffc107;\n  background-color: transparent;\n  background-image: none;\n  border-color: #ffc107; }\n  .btn-outline-warning:hover {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #ffc107;\n    background-color: transparent; }\n  .btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n    .btn-outline-warning:not(:disabled):not(.disabled):active:focus, .btn-outline-warning:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-warning.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.btn-outline-danger {\n  color: #dc3545;\n  background-color: transparent;\n  background-image: none;\n  border-color: #dc3545; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #dc3545;\n    background-color: transparent; }\n  .btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n    .btn-outline-danger:not(:disabled):not(.disabled):active:focus, .btn-outline-danger:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-danger.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.btn-outline-light {\n  color: #f8f9fa;\n  background-color: transparent;\n  background-image: none;\n  border-color: #f8f9fa; }\n  .btn-outline-light:hover {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .btn-outline-light:focus, .btn-outline-light.focus {\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n  .btn-outline-light.disabled, .btn-outline-light:disabled {\n    color: #f8f9fa;\n    background-color: transparent; }\n  .btn-outline-light:not(:disabled):not(.disabled):active, .btn-outline-light:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-light.dropdown-toggle {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n    .btn-outline-light:not(:disabled):not(.disabled):active:focus, .btn-outline-light:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-light.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.btn-outline-dark {\n  color: #343a40;\n  background-color: transparent;\n  background-image: none;\n  border-color: #343a40; }\n  .btn-outline-dark:hover {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .btn-outline-dark:focus, .btn-outline-dark.focus {\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n  .btn-outline-dark.disabled, .btn-outline-dark:disabled {\n    color: #343a40;\n    background-color: transparent; }\n  .btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-dark.dropdown-toggle {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n    .btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-dark.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.btn-link {\n  font-weight: 400;\n  color: #007bff;\n  background-color: transparent; }\n  .btn-link:hover {\n    color: #0056b3;\n    text-decoration: underline;\n    background-color: transparent;\n    border-color: transparent; }\n  .btn-link:focus, .btn-link.focus {\n    text-decoration: underline;\n    border-color: transparent;\n    box-shadow: none; }\n  .btn-link:disabled, .btn-link.disabled {\n    color: #6c757d;\n    pointer-events: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n  .btn-block + .btn-block {\n    margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  transition: opacity 0.15s linear; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .fade {\n      transition: none; } }\n  .fade:not(.show) {\n    opacity: 0; }\n\n.collapse:not(.show) {\n  display: none; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .collapsing {\n      transition: none; } }\n\n.dropup,\n.dropright,\n.dropdown,\n.dropleft {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem; }\n\n.dropup .dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent; }\n\n.dropup .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropright .dropdown-menu {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem; }\n\n.dropright .dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid; }\n\n.dropright .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropright .dropdown-toggle::after {\n  vertical-align: 0; }\n\n.dropleft .dropdown-menu {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem; }\n\n.dropleft .dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\"; }\n\n.dropleft .dropdown-toggle::after {\n  display: none; }\n\n.dropleft .dropdown-toggle::before {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent; }\n\n.dropleft .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropleft .dropdown-toggle::before {\n  vertical-align: 0; }\n\n.dropdown-menu[x-placement^=\"top\"], .dropdown-menu[x-placement^=\"right\"], .dropdown-menu[x-placement^=\"bottom\"], .dropdown-menu[x-placement^=\"left\"] {\n  right: auto;\n  bottom: auto; }\n\n.dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0; }\n  .dropdown-item:hover, .dropdown-item:focus {\n    color: #16181b;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #007bff; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #6c757d;\n    background-color: transparent; }\n\n.dropdown-menu.show {\n  display: block; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap; }\n\n.dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1.5rem;\n  color: #212529; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    flex: 0 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 1; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 1; }\n  .btn-group .btn + .btn,\n  .btn-group .btn + .btn-group,\n  .btn-group .btn-group + .btn,\n  .btn-group .btn-group + .btn-group,\n  .btn-group-vertical .btn + .btn,\n  .btn-group-vertical .btn + .btn-group,\n  .btn-group-vertical .btn-group + .btn,\n  .btn-group-vertical .btn-group + .btn-group {\n    margin-left: -1px; }\n\n.btn-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n\n.btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem; }\n  .dropdown-toggle-split::after,\n  .dropup .dropdown-toggle-split::after,\n  .dropright .dropdown-toggle-split::after {\n    margin-left: 0; }\n  .dropleft .dropdown-toggle-split::before {\n    margin-right: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n\n.btn-group-vertical {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .btn-group-vertical .btn,\n  .btn-group-vertical .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn + .btn,\n  .btn-group-vertical > .btn + .btn-group,\n  .btn-group-vertical > .btn-group + .btn,\n  .btn-group-vertical > .btn-group + .btn-group {\n    margin-top: -1px;\n    margin-left: 0; }\n  .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n  .btn-group-vertical > .btn-group:not(:last-child) > .btn {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .btn-group-vertical > .btn:not(:first-child),\n  .btn-group-vertical > .btn-group:not(:first-child) > .btn {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group-toggle > .btn,\n.btn-group-toggle > .btn-group > .btn {\n  margin-bottom: 0; }\n  .btn-group-toggle > .btn input[type=\"radio\"],\n  .btn-group-toggle > .btn input[type=\"checkbox\"],\n  .btn-group-toggle > .btn-group > .btn input[type=\"radio\"],\n  .btn-group-toggle > .btn-group > .btn input[type=\"checkbox\"] {\n    position: absolute;\n    clip: rect(0, 0, 0, 0);\n    pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  width: 100%; }\n  .input-group > .form-control,\n  .input-group > .custom-select,\n  .input-group > .custom-file {\n    position: relative;\n    flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group > .form-control + .form-control,\n    .input-group > .form-control + .custom-select,\n    .input-group > .form-control + .custom-file,\n    .input-group > .custom-select + .form-control,\n    .input-group > .custom-select + .custom-select,\n    .input-group > .custom-select + .custom-file,\n    .input-group > .custom-file + .form-control,\n    .input-group > .custom-file + .custom-select,\n    .input-group > .custom-file + .custom-file {\n      margin-left: -1px; }\n  .input-group > .form-control:focus,\n  .input-group > .custom-select:focus,\n  .input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {\n    z-index: 3; }\n  .input-group > .custom-file .custom-file-input:focus {\n    z-index: 4; }\n  .input-group > .form-control:not(:last-child),\n  .input-group > .custom-select:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .input-group > .form-control:not(:first-child),\n  .input-group > .custom-select:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0; }\n  .input-group > .custom-file {\n    display: flex;\n    align-items: center; }\n    .input-group > .custom-file:not(:last-child) .custom-file-label,\n    .input-group > .custom-file:not(:last-child) .custom-file-label::after {\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n    .input-group > .custom-file:not(:first-child) .custom-file-label {\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n\n.input-group-prepend,\n.input-group-append {\n  display: flex; }\n  .input-group-prepend .btn,\n  .input-group-append .btn {\n    position: relative;\n    z-index: 2; }\n  .input-group-prepend .btn + .btn,\n  .input-group-prepend .btn + .input-group-text,\n  .input-group-prepend .input-group-text + .input-group-text,\n  .input-group-prepend .input-group-text + .btn,\n  .input-group-append .btn + .btn,\n  .input-group-append .btn + .input-group-text,\n  .input-group-append .input-group-text + .input-group-text,\n  .input-group-append .input-group-text + .btn {\n    margin-left: -1px; }\n\n.input-group-prepend {\n  margin-right: -1px; }\n\n.input-group-append {\n  margin-left: -1px; }\n\n.input-group-text {\n  display: flex;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .input-group-text input[type=\"radio\"],\n  .input-group-text input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-prepend > .input-group-text,\n.input-group-lg > .input-group-append > .input-group-text,\n.input-group-lg > .input-group-prepend > .btn,\n.input-group-lg > .input-group-append > .btn {\n  height: calc(2.875rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-prepend > .input-group-text,\n.input-group-sm > .input-group-append > .input-group-text,\n.input-group-sm > .input-group-prepend > .btn,\n.input-group-sm > .input-group-append > .btn {\n  height: calc(1.8125rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.input-group > .input-group-prepend > .btn,\n.input-group > .input-group-prepend > .input-group-text,\n.input-group > .input-group-append:not(:last-child) > .btn,\n.input-group > .input-group-append:not(:last-child) > .input-group-text,\n.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.input-group > .input-group-append > .btn,\n.input-group > .input-group-append > .input-group-text,\n.input-group > .input-group-prepend:not(:first-child) > .btn,\n.input-group > .input-group-prepend:not(:first-child) > .input-group-text,\n.input-group > .input-group-prepend:first-child > .btn:not(:first-child),\n.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.custom-control {\n  position: relative;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem; }\n\n.custom-control-inline {\n  display: inline-flex;\n  margin-right: 1rem; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-label::before {\n    color: #fff;\n    background-color: #007bff; }\n  .custom-control-input:focus ~ .custom-control-label::before {\n    box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .custom-control-input:active ~ .custom-control-label::before {\n    color: #fff;\n    background-color: #b3d7ff; }\n  .custom-control-input:disabled ~ .custom-control-label {\n    color: #6c757d; }\n    .custom-control-input:disabled ~ .custom-control-label::before {\n      background-color: #e9ecef; }\n\n.custom-control-label {\n  position: relative;\n  margin-bottom: 0; }\n  .custom-control-label::before {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    pointer-events: none;\n    content: \"\";\n    user-select: none;\n    background-color: #dee2e6; }\n  .custom-control-label::after {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    content: \"\";\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-label::before {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #007bff; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {\n  background-color: #007bff; }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-radio .custom-control-label::before {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #007bff; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-select {\n  display: inline-block;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  appearance: none; }\n  .custom-select:focus {\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(128, 189, 255, 0.5); }\n    .custom-select:focus::-ms-value {\n      color: #495057;\n      background-color: #fff; }\n  .custom-select[multiple], .custom-select[size]:not([size=\"1\"]) {\n    height: auto;\n    padding-right: 0.75rem;\n    background-image: none; }\n  .custom-select:disabled {\n    color: #6c757d;\n    background-color: #e9ecef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  height: calc(1.8125rem + 2px);\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-select-lg {\n  height: calc(2.875rem + 2px);\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 125%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  margin-bottom: 0; }\n\n.custom-file-input {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  margin: 0;\n  opacity: 0; }\n  .custom-file-input:focus ~ .custom-file-label {\n    border-color: #80bdff;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-file-input:focus ~ .custom-file-label::after {\n      border-color: #80bdff; }\n  .custom-file-input:disabled ~ .custom-file-label {\n    background-color: #e9ecef; }\n  .custom-file-input:lang(en) ~ .custom-file-label::after {\n    content: \"Browse\"; }\n\n.custom-file-label {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .custom-file-label::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 3;\n    display: block;\n    height: 2.25rem;\n    padding: 0.375rem 0.75rem;\n    line-height: 1.5;\n    color: #495057;\n    content: \"Browse\";\n    background-color: #e9ecef;\n    border-left: 1px solid #ced4da;\n    border-radius: 0 0.25rem 0.25rem 0; }\n\n.custom-range {\n  width: 100%;\n  padding-left: 0;\n  background-color: transparent;\n  appearance: none; }\n  .custom-range:focus {\n    outline: none; }\n    .custom-range:focus::-webkit-slider-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-range:focus::-moz-range-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-range:focus::-ms-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .custom-range::-moz-focus-outer {\n    border: 0; }\n  .custom-range::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: -0.25rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media screen and (prefers-reduced-motion: reduce) {\n      .custom-range::-webkit-slider-thumb {\n        transition: none; } }\n    .custom-range::-webkit-slider-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .custom-range::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media screen and (prefers-reduced-motion: reduce) {\n      .custom-range::-moz-range-thumb {\n        transition: none; } }\n    .custom-range::-moz-range-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-moz-range-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .custom-range::-ms-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: 0;\n    margin-right: 0.2rem;\n    margin-left: 0.2rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media screen and (prefers-reduced-motion: reduce) {\n      .custom-range::-ms-thumb {\n        transition: none; } }\n    .custom-range::-ms-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-ms-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: transparent;\n    border-color: transparent;\n    border-width: 0.5rem; }\n  .custom-range::-ms-fill-lower {\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n  .custom-range::-ms-fill-upper {\n    margin-right: 15px;\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n\n.custom-control-label::before,\n.custom-file-label,\n.custom-select {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .custom-control-label::before,\n    .custom-file-label,\n    .custom-select {\n      transition: none; } }\n\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5rem 1rem; }\n  .nav-link:hover, .nav-link:focus {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #6c757d; }\n\n.nav-tabs {\n  border-bottom: 1px solid #dee2e6; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n    .nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {\n      border-color: #e9ecef #e9ecef #dee2e6; }\n    .nav-tabs .nav-link.disabled {\n      color: #6c757d;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #495057;\n    background-color: #fff;\n    border-color: #dee2e6 #dee2e6 #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #007bff; }\n\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  flex-basis: 0;\n  flex-grow: 1;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.5rem 1rem; }\n  .navbar > .container,\n  .navbar > .container-fluid {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:hover, .navbar-brand:focus {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem; }\n\n.navbar-collapse {\n  flex-basis: 100%;\n  flex-grow: 1;\n  align-items: center; }\n\n.navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:hover, .navbar-toggler:focus {\n    text-decoration: none; }\n  .navbar-toggler:not(:disabled):not(.disabled) {\n    cursor: pointer; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n@media (max-width: 575.98px) {\n  .navbar-expand-sm > .container,\n  .navbar-expand-sm > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-expand-sm {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-sm .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-sm .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-sm .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-sm > .container,\n    .navbar-expand-sm > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-sm .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767.98px) {\n  .navbar-expand-md > .container,\n  .navbar-expand-md > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-expand-md {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-md .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-md .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-md .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-md > .container,\n    .navbar-expand-md > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-md .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991.98px) {\n  .navbar-expand-lg > .container,\n  .navbar-expand-lg > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-expand-lg {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-lg .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-lg .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-lg .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-lg > .container,\n    .navbar-expand-lg > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-lg .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-lg .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199.98px) {\n  .navbar-expand-xl > .container,\n  .navbar-expand-xl > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-expand-xl {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-xl .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-xl .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-xl .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-xl > .container,\n    .navbar-expand-xl > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-xl .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-xl .navbar-toggler {\n      display: none; } }\n\n.navbar-expand {\n  flex-flow: row nowrap;\n  justify-content: flex-start; }\n  .navbar-expand > .container,\n  .navbar-expand > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-expand .navbar-nav {\n    flex-direction: row; }\n    .navbar-expand .navbar-nav .dropdown-menu {\n      position: absolute; }\n    .navbar-expand .navbar-nav .nav-link {\n      padding-right: 0.5rem;\n      padding-left: 0.5rem; }\n  .navbar-expand > .container,\n  .navbar-expand > .container-fluid {\n    flex-wrap: nowrap; }\n  .navbar-expand .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto; }\n  .navbar-expand .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .show > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.show,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-text a {\n    color: rgba(0, 0, 0, 0.9); }\n    .navbar-light .navbar-text a:hover, .navbar-light .navbar-text a:focus {\n      color: rgba(0, 0, 0, 0.9); }\n\n.navbar-dark .navbar-brand {\n  color: #fff; }\n  .navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {\n    color: #fff; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-dark .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-dark .navbar-nav .show > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .nav-link.show,\n.navbar-dark .navbar-nav .nav-link.active {\n  color: #fff; }\n\n.navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\"); }\n\n.navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-text a {\n    color: #fff; }\n    .navbar-dark .navbar-text a:hover, .navbar-dark .navbar-text a:focus {\n      color: #fff; }\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n  .card > hr {\n    margin-right: 0;\n    margin-left: 0; }\n  .card > .list-group:first-child .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .card > .list-group:last-child .list-group-item:last-child {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n\n.card-body {\n  flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n  .card-header + .list-group .list-group-item:first-child {\n    border-top: 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img {\n  width: 100%;\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-top {\n  width: 100%;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  width: 100%;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n.card-deck {\n  display: flex;\n  flex-direction: column; }\n  .card-deck .card {\n    margin-bottom: 15px; }\n  @media (min-width: 576px) {\n    .card-deck {\n      flex-flow: row wrap;\n      margin-right: -15px;\n      margin-left: -15px; }\n      .card-deck .card {\n        display: flex;\n        flex: 1 0 0%;\n        flex-direction: column;\n        margin-right: 15px;\n        margin-bottom: 0;\n        margin-left: 15px; } }\n\n.card-group {\n  display: flex;\n  flex-direction: column; }\n  .card-group > .card {\n    margin-bottom: 15px; }\n  @media (min-width: 576px) {\n    .card-group {\n      flex-flow: row wrap; }\n      .card-group > .card {\n        flex: 1 0 0%;\n        margin-bottom: 0; }\n        .card-group > .card + .card {\n          margin-left: 0;\n          border-left: 0; }\n        .card-group > .card:first-child {\n          border-top-right-radius: 0;\n          border-bottom-right-radius: 0; }\n          .card-group > .card:first-child .card-img-top,\n          .card-group > .card:first-child .card-header {\n            border-top-right-radius: 0; }\n          .card-group > .card:first-child .card-img-bottom,\n          .card-group > .card:first-child .card-footer {\n            border-bottom-right-radius: 0; }\n        .card-group > .card:last-child {\n          border-top-left-radius: 0;\n          border-bottom-left-radius: 0; }\n          .card-group > .card:last-child .card-img-top,\n          .card-group > .card:last-child .card-header {\n            border-top-left-radius: 0; }\n          .card-group > .card:last-child .card-img-bottom,\n          .card-group > .card:last-child .card-footer {\n            border-bottom-left-radius: 0; }\n        .card-group > .card:only-child {\n          border-radius: 0.25rem; }\n          .card-group > .card:only-child .card-img-top,\n          .card-group > .card:only-child .card-header {\n            border-top-left-radius: 0.25rem;\n            border-top-right-radius: 0.25rem; }\n          .card-group > .card:only-child .card-img-bottom,\n          .card-group > .card:only-child .card-footer {\n            border-bottom-right-radius: 0.25rem;\n            border-bottom-left-radius: 0.25rem; }\n        .card-group > .card:not(:first-child):not(:last-child):not(:only-child) {\n          border-radius: 0; }\n          .card-group > .card:not(:first-child):not(:last-child):not(:only-child) .card-img-top,\n          .card-group > .card:not(:first-child):not(:last-child):not(:only-child) .card-img-bottom,\n          .card-group > .card:not(:first-child):not(:last-child):not(:only-child) .card-header,\n          .card-group > .card:not(:first-child):not(:last-child):not(:only-child) .card-footer {\n            border-radius: 0; } }\n\n.card-columns .card {\n  margin-bottom: 0.75rem; }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem;\n    orphans: 1;\n    widows: 1; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%; } }\n\n.accordion .card:not(:first-of-type):not(:last-of-type) {\n  border-bottom: 0;\n  border-radius: 0; }\n\n.accordion .card:not(:first-of-type) .card-header:first-child {\n  border-radius: 0; }\n\n.accordion .card:first-of-type {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.accordion .card:last-of-type {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.breadcrumb {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    color: #6c757d;\n    content: \"/\"; }\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: underline; }\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: none; }\n\n.breadcrumb-item.active {\n  color: #6c757d; }\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #007bff;\n  background-color: #fff;\n  border: 1px solid #dee2e6; }\n  .page-link:hover {\n    z-index: 2;\n    color: #0056b3;\n    text-decoration: none;\n    background-color: #e9ecef;\n    border-color: #dee2e6; }\n  .page-link:focus {\n    z-index: 2;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .page-link:not(:disabled):not(.disabled) {\n    cursor: pointer; }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 1;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n\n.page-item.disabled .page-link {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-primary {\n  color: #fff;\n  background-color: #007bff; }\n  .badge-primary[href]:hover, .badge-primary[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0062cc; }\n\n.badge-secondary {\n  color: #fff;\n  background-color: #6c757d; }\n  .badge-secondary[href]:hover, .badge-secondary[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #545b62; }\n\n.badge-success {\n  color: #fff;\n  background-color: #28a745; }\n  .badge-success[href]:hover, .badge-success[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #1e7e34; }\n\n.badge-info {\n  color: #fff;\n  background-color: #17a2b8; }\n  .badge-info[href]:hover, .badge-info[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #117a8b; }\n\n.badge-warning {\n  color: #212529;\n  background-color: #ffc107; }\n  .badge-warning[href]:hover, .badge-warning[href]:focus {\n    color: #212529;\n    text-decoration: none;\n    background-color: #d39e00; }\n\n.badge-danger {\n  color: #fff;\n  background-color: #dc3545; }\n  .badge-danger[href]:hover, .badge-danger[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #bd2130; }\n\n.badge-light {\n  color: #212529;\n  background-color: #f8f9fa; }\n  .badge-light[href]:hover, .badge-light[href]:focus {\n    color: #212529;\n    text-decoration: none;\n    background-color: #dae0e5; }\n\n.badge-dark {\n  color: #fff;\n  background-color: #343a40; }\n  .badge-dark[href]:hover, .badge-dark[href]:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #1d2124; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: 700; }\n\n.alert-dismissible {\n  padding-right: 4rem; }\n  .alert-dismissible .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0.75rem 1.25rem;\n    color: inherit; }\n\n.alert-primary {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff; }\n  .alert-primary hr {\n    border-top-color: #9fcdff; }\n  .alert-primary .alert-link {\n    color: #002752; }\n\n.alert-secondary {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db; }\n  .alert-secondary hr {\n    border-top-color: #c8cbcf; }\n  .alert-secondary .alert-link {\n    color: #202326; }\n\n.alert-success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb; }\n  .alert-success hr {\n    border-top-color: #b1dfbb; }\n  .alert-success .alert-link {\n    color: #0b2e13; }\n\n.alert-info {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb; }\n  .alert-info hr {\n    border-top-color: #abdde5; }\n  .alert-info .alert-link {\n    color: #062c33; }\n\n.alert-warning {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba; }\n  .alert-warning hr {\n    border-top-color: #ffe8a1; }\n  .alert-warning .alert-link {\n    color: #533f03; }\n\n.alert-danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb; }\n  .alert-danger hr {\n    border-top-color: #f1b0b7; }\n  .alert-danger .alert-link {\n    color: #491217; }\n\n.alert-light {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe; }\n  .alert-light hr {\n    border-top-color: #ececf6; }\n  .alert-light .alert-link {\n    color: #686868; }\n\n.alert-dark {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca; }\n  .alert-dark hr {\n    border-top-color: #b9bbbe; }\n  .alert-dark .alert-link {\n    color: #040505; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #007bff;\n  transition: width 0.6s ease; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .progress-bar {\n      transition: none; } }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  animation: progress-bar-stripes 1s linear infinite; }\n\n.media {\n  display: flex;\n  align-items: flex-start; }\n\n.media-body {\n  flex: 1; }\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit; }\n  .list-group-item-action:hover, .list-group-item-action:focus {\n    color: #495057;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .list-group-item-action:active {\n    color: #212529;\n    background-color: #e9ecef; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item:hover, .list-group-item:focus {\n    z-index: 1;\n    text-decoration: none; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #6c757d;\n    background-color: #fff; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\n.list-group-item-primary {\n  color: #004085;\n  background-color: #b8daff; }\n  .list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {\n    color: #004085;\n    background-color: #9fcdff; }\n  .list-group-item-primary.list-group-item-action.active {\n    color: #fff;\n    background-color: #004085;\n    border-color: #004085; }\n\n.list-group-item-secondary {\n  color: #383d41;\n  background-color: #d6d8db; }\n  .list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {\n    color: #383d41;\n    background-color: #c8cbcf; }\n  .list-group-item-secondary.list-group-item-action.active {\n    color: #fff;\n    background-color: #383d41;\n    border-color: #383d41; }\n\n.list-group-item-success {\n  color: #155724;\n  background-color: #c3e6cb; }\n  .list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {\n    color: #155724;\n    background-color: #b1dfbb; }\n  .list-group-item-success.list-group-item-action.active {\n    color: #fff;\n    background-color: #155724;\n    border-color: #155724; }\n\n.list-group-item-info {\n  color: #0c5460;\n  background-color: #bee5eb; }\n  .list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {\n    color: #0c5460;\n    background-color: #abdde5; }\n  .list-group-item-info.list-group-item-action.active {\n    color: #fff;\n    background-color: #0c5460;\n    border-color: #0c5460; }\n\n.list-group-item-warning {\n  color: #856404;\n  background-color: #ffeeba; }\n  .list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {\n    color: #856404;\n    background-color: #ffe8a1; }\n  .list-group-item-warning.list-group-item-action.active {\n    color: #fff;\n    background-color: #856404;\n    border-color: #856404; }\n\n.list-group-item-danger {\n  color: #721c24;\n  background-color: #f5c6cb; }\n  .list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {\n    color: #721c24;\n    background-color: #f1b0b7; }\n  .list-group-item-danger.list-group-item-action.active {\n    color: #fff;\n    background-color: #721c24;\n    border-color: #721c24; }\n\n.list-group-item-light {\n  color: #818182;\n  background-color: #fdfdfe; }\n  .list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {\n    color: #818182;\n    background-color: #ececf6; }\n  .list-group-item-light.list-group-item-action.active {\n    color: #fff;\n    background-color: #818182;\n    border-color: #818182; }\n\n.list-group-item-dark {\n  color: #1b1e21;\n  background-color: #c6c8ca; }\n  .list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {\n    color: #1b1e21;\n    background-color: #b9bbbe; }\n  .list-group-item-dark.list-group-item-action.active {\n    color: #fff;\n    background-color: #1b1e21;\n    border-color: #1b1e21; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:not(:disabled):not(.disabled) {\n    cursor: pointer; }\n    .close:not(:disabled):not(.disabled):hover, .close:not(:disabled):not(.disabled):focus {\n      color: #000;\n      text-decoration: none;\n      opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n  .modal-open .modal {\n    overflow-x: hidden;\n    overflow-y: auto; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none; }\n  .modal.fade .modal-dialog {\n    transition: transform 0.3s ease-out;\n    transform: translate(0, -25%); }\n    @media screen and (prefers-reduced-motion: reduce) {\n      .modal.fade .modal-dialog {\n        transition: none; } }\n  .modal.show .modal-dialog {\n    transform: translate(0, 0); }\n\n.modal-dialog-centered {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - (0.5rem * 2)); }\n  .modal-dialog-centered::before {\n    display: block;\n    height: calc(100vh - (0.5rem * 2));\n    content: \"\"; }\n\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n  .modal-header .close {\n    padding: 1rem;\n    margin: -1rem -1rem -1rem auto; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem; }\n\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 1rem;\n  border-top: 1px solid #e9ecef; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto; }\n  .modal-dialog-centered {\n    min-height: calc(100% - (1.75rem * 2)); }\n    .modal-dialog-centered::before {\n      height: calc(100vh - (1.75rem * 2)); }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip .arrow {\n    position: absolute;\n    display: block;\n    width: 0.8rem;\n    height: 0.4rem; }\n    .tooltip .arrow::before {\n      position: absolute;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-tooltip-top, .bs-tooltip-auto[x-placement^=\"top\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-top .arrow, .bs-tooltip-auto[x-placement^=\"top\"] .arrow {\n    bottom: 0; }\n    .bs-tooltip-top .arrow::before, .bs-tooltip-auto[x-placement^=\"top\"] .arrow::before {\n      top: 0;\n      border-width: 0.4rem 0.4rem 0;\n      border-top-color: #000; }\n\n.bs-tooltip-right, .bs-tooltip-auto[x-placement^=\"right\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-right .arrow, .bs-tooltip-auto[x-placement^=\"right\"] .arrow {\n    left: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-right .arrow::before, .bs-tooltip-auto[x-placement^=\"right\"] .arrow::before {\n      right: 0;\n      border-width: 0.4rem 0.4rem 0.4rem 0;\n      border-right-color: #000; }\n\n.bs-tooltip-bottom, .bs-tooltip-auto[x-placement^=\"bottom\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-bottom .arrow, .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow {\n    top: 0; }\n    .bs-tooltip-bottom .arrow::before, .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow::before {\n      bottom: 0;\n      border-width: 0 0.4rem 0.4rem;\n      border-bottom-color: #000; }\n\n.bs-tooltip-left, .bs-tooltip-auto[x-placement^=\"left\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-left .arrow, .bs-tooltip-auto[x-placement^=\"left\"] .arrow {\n    right: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-left .arrow::before, .bs-tooltip-auto[x-placement^=\"left\"] .arrow::before {\n      left: 0;\n      border-width: 0.4rem 0 0.4rem 0.4rem;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover .arrow {\n    position: absolute;\n    display: block;\n    width: 1rem;\n    height: 0.5rem;\n    margin: 0 0.3rem; }\n    .popover .arrow::before, .popover .arrow::after {\n      position: absolute;\n      display: block;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-popover-top, .bs-popover-auto[x-placement^=\"top\"] {\n  margin-bottom: 0.5rem; }\n  .bs-popover-top .arrow, .bs-popover-auto[x-placement^=\"top\"] .arrow {\n    bottom: calc((0.5rem + 1px) * -1); }\n  .bs-popover-top .arrow::before, .bs-popover-auto[x-placement^=\"top\"] .arrow::before,\n  .bs-popover-top .arrow::after,\n  .bs-popover-auto[x-placement^=\"top\"] .arrow::after {\n    border-width: 0.5rem 0.5rem 0; }\n  .bs-popover-top .arrow::before, .bs-popover-auto[x-placement^=\"top\"] .arrow::before {\n    bottom: 0;\n    border-top-color: rgba(0, 0, 0, 0.25); }\n  \n  .bs-popover-top .arrow::after,\n  .bs-popover-auto[x-placement^=\"top\"] .arrow::after {\n    bottom: 1px;\n    border-top-color: #fff; }\n\n.bs-popover-right, .bs-popover-auto[x-placement^=\"right\"] {\n  margin-left: 0.5rem; }\n  .bs-popover-right .arrow, .bs-popover-auto[x-placement^=\"right\"] .arrow {\n    left: calc((0.5rem + 1px) * -1);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n  .bs-popover-right .arrow::before, .bs-popover-auto[x-placement^=\"right\"] .arrow::before,\n  .bs-popover-right .arrow::after,\n  .bs-popover-auto[x-placement^=\"right\"] .arrow::after {\n    border-width: 0.5rem 0.5rem 0.5rem 0; }\n  .bs-popover-right .arrow::before, .bs-popover-auto[x-placement^=\"right\"] .arrow::before {\n    left: 0;\n    border-right-color: rgba(0, 0, 0, 0.25); }\n  \n  .bs-popover-right .arrow::after,\n  .bs-popover-auto[x-placement^=\"right\"] .arrow::after {\n    left: 1px;\n    border-right-color: #fff; }\n\n.bs-popover-bottom, .bs-popover-auto[x-placement^=\"bottom\"] {\n  margin-top: 0.5rem; }\n  .bs-popover-bottom .arrow, .bs-popover-auto[x-placement^=\"bottom\"] .arrow {\n    top: calc((0.5rem + 1px) * -1); }\n  .bs-popover-bottom .arrow::before, .bs-popover-auto[x-placement^=\"bottom\"] .arrow::before,\n  .bs-popover-bottom .arrow::after,\n  .bs-popover-auto[x-placement^=\"bottom\"] .arrow::after {\n    border-width: 0 0.5rem 0.5rem 0.5rem; }\n  .bs-popover-bottom .arrow::before, .bs-popover-auto[x-placement^=\"bottom\"] .arrow::before {\n    top: 0;\n    border-bottom-color: rgba(0, 0, 0, 0.25); }\n  \n  .bs-popover-bottom .arrow::after,\n  .bs-popover-auto[x-placement^=\"bottom\"] .arrow::after {\n    top: 1px;\n    border-bottom-color: #fff; }\n  .bs-popover-bottom .popover-header::before, .bs-popover-auto[x-placement^=\"bottom\"] .popover-header::before {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    display: block;\n    width: 1rem;\n    margin-left: -0.5rem;\n    content: \"\";\n    border-bottom: 1px solid #f7f7f7; }\n\n.bs-popover-left, .bs-popover-auto[x-placement^=\"left\"] {\n  margin-right: 0.5rem; }\n  .bs-popover-left .arrow, .bs-popover-auto[x-placement^=\"left\"] .arrow {\n    right: calc((0.5rem + 1px) * -1);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n  .bs-popover-left .arrow::before, .bs-popover-auto[x-placement^=\"left\"] .arrow::before,\n  .bs-popover-left .arrow::after,\n  .bs-popover-auto[x-placement^=\"left\"] .arrow::after {\n    border-width: 0.5rem 0 0.5rem 0.5rem; }\n  .bs-popover-left .arrow::before, .bs-popover-auto[x-placement^=\"left\"] .arrow::before {\n    right: 0;\n    border-left-color: rgba(0, 0, 0, 0.25); }\n  \n  .bs-popover-left .arrow::after,\n  .bs-popover-auto[x-placement^=\"left\"] .arrow::after {\n    right: 1px;\n    border-left-color: #fff; }\n\n.popover-header {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  color: inherit;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .popover-header:empty {\n    display: none; }\n\n.popover-body {\n  padding: 0.5rem 0.75rem;\n  color: #212529; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  align-items: center;\n  width: 100%;\n  backface-visibility: hidden;\n  perspective: 1000px; }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block;\n  transition: transform 0.6s ease; }\n  @media screen and (prefers-reduced-motion: reduce) {\n    .carousel-item.active,\n    .carousel-item-next,\n    .carousel-item-prev {\n      transition: none; } }\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0; }\n\n.carousel-item-next.carousel-item-left,\n.carousel-item-prev.carousel-item-right {\n  transform: translateX(0); }\n  @supports (transform-style: preserve-3d) {\n    .carousel-item-next.carousel-item-left,\n    .carousel-item-prev.carousel-item-right {\n      transform: translate3d(0, 0, 0); } }\n\n.carousel-item-next,\n.active.carousel-item-right {\n  transform: translateX(100%); }\n  @supports (transform-style: preserve-3d) {\n    .carousel-item-next,\n    .active.carousel-item-right {\n      transform: translate3d(100%, 0, 0); } }\n\n.carousel-item-prev,\n.active.carousel-item-left {\n  transform: translateX(-100%); }\n  @supports (transform-style: preserve-3d) {\n    .carousel-item-prev,\n    .active.carousel-item-left {\n      transform: translate3d(-100%, 0, 0); } }\n\n.carousel-fade .carousel-item {\n  opacity: 0;\n  transition-duration: .6s;\n  transition-property: opacity; }\n\n.carousel-fade .carousel-item.active,\n.carousel-fade .carousel-item-next.carousel-item-left,\n.carousel-fade .carousel-item-prev.carousel-item-right {\n  opacity: 1; }\n\n.carousel-fade .active.carousel-item-left,\n.carousel-fade .active.carousel-item-right {\n  opacity: 0; }\n\n.carousel-fade .carousel-item-next,\n.carousel-fade .carousel-item-prev,\n.carousel-fade .carousel-item.active,\n.carousel-fade .active.carousel-item-left,\n.carousel-fade .active.carousel-item-prev {\n  transform: translateX(0); }\n  @supports (transform-style: preserve-3d) {\n    .carousel-fade .carousel-item-next,\n    .carousel-fade .carousel-item-prev,\n    .carousel-fade .carousel-item.active,\n    .carousel-fade .active.carousel-item-left,\n    .carousel-fade .active.carousel-item-prev {\n      transform: translate3d(0, 0, 0); } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5; }\n  .carousel-control-prev:hover, .carousel-control-prev:focus,\n  .carousel-control-next:hover,\n  .carousel-control-next:focus {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    position: relative;\n    flex: 0 1 auto;\n    width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0.5); }\n    .carousel-indicators li::before {\n      position: absolute;\n      top: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n    .carousel-indicators li::after {\n      position: absolute;\n      bottom: -10px;\n      left: 0;\n      display: inline-block;\n      width: 100%;\n      height: 10px;\n      content: \"\"; }\n  .carousel-indicators .active {\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-primary {\n  background-color: #007bff !important; }\n\na.bg-primary:hover, a.bg-primary:focus,\nbutton.bg-primary:hover,\nbutton.bg-primary:focus {\n  background-color: #0062cc !important; }\n\n.bg-secondary {\n  background-color: #6c757d !important; }\n\na.bg-secondary:hover, a.bg-secondary:focus,\nbutton.bg-secondary:hover,\nbutton.bg-secondary:focus {\n  background-color: #545b62 !important; }\n\n.bg-success {\n  background-color: #28a745 !important; }\n\na.bg-success:hover, a.bg-success:focus,\nbutton.bg-success:hover,\nbutton.bg-success:focus {\n  background-color: #1e7e34 !important; }\n\n.bg-info {\n  background-color: #17a2b8 !important; }\n\na.bg-info:hover, a.bg-info:focus,\nbutton.bg-info:hover,\nbutton.bg-info:focus {\n  background-color: #117a8b !important; }\n\n.bg-warning {\n  background-color: #ffc107 !important; }\n\na.bg-warning:hover, a.bg-warning:focus,\nbutton.bg-warning:hover,\nbutton.bg-warning:focus {\n  background-color: #d39e00 !important; }\n\n.bg-danger {\n  background-color: #dc3545 !important; }\n\na.bg-danger:hover, a.bg-danger:focus,\nbutton.bg-danger:hover,\nbutton.bg-danger:focus {\n  background-color: #bd2130 !important; }\n\n.bg-light {\n  background-color: #f8f9fa !important; }\n\na.bg-light:hover, a.bg-light:focus,\nbutton.bg-light:hover,\nbutton.bg-light:focus {\n  background-color: #dae0e5 !important; }\n\n.bg-dark {\n  background-color: #343a40 !important; }\n\na.bg-dark:hover, a.bg-dark:focus,\nbutton.bg-dark:hover,\nbutton.bg-dark:focus {\n  background-color: #1d2124 !important; }\n\n.bg-white {\n  background-color: #fff !important; }\n\n.bg-transparent {\n  background-color: transparent !important; }\n\n.border {\n  border: 1px solid #dee2e6 !important; }\n\n.border-top {\n  border-top: 1px solid #dee2e6 !important; }\n\n.border-right {\n  border-right: 1px solid #dee2e6 !important; }\n\n.border-bottom {\n  border-bottom: 1px solid #dee2e6 !important; }\n\n.border-left {\n  border-left: 1px solid #dee2e6 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.border-primary {\n  border-color: #007bff !important; }\n\n.border-secondary {\n  border-color: #6c757d !important; }\n\n.border-success {\n  border-color: #28a745 !important; }\n\n.border-info {\n  border-color: #17a2b8 !important; }\n\n.border-warning {\n  border-color: #ffc107 !important; }\n\n.border-danger {\n  border-color: #dc3545 !important; }\n\n.border-light {\n  border-color: #f8f9fa !important; }\n\n.border-dark {\n  border-color: #343a40 !important; }\n\n.border-white {\n  border-color: #fff !important; }\n\n.rounded {\n  border-radius: 0.25rem !important; }\n\n.rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important; }\n\n.rounded-right {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.rounded-left {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.rounded-circle {\n  border-radius: 50% !important; }\n\n.rounded-0 {\n  border-radius: 0 !important; }\n\n.clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-row {\n  display: table-row !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: flex !important; }\n\n.d-inline-flex {\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-row {\n    display: table-row !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-row {\n    display: table-row !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-row {\n    display: table-row !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-row {\n    display: table-row !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: inline-flex !important; } }\n\n@media print {\n  .d-print-none {\n    display: none !important; }\n  .d-print-inline {\n    display: inline !important; }\n  .d-print-inline-block {\n    display: inline-block !important; }\n  .d-print-block {\n    display: block !important; }\n  .d-print-table {\n    display: table !important; }\n  .d-print-table-row {\n    display: table-row !important; }\n  .d-print-table-cell {\n    display: table-cell !important; }\n  .d-print-flex {\n    display: flex !important; }\n  .d-print-inline-flex {\n    display: inline-flex !important; } }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.flex-row {\n  flex-direction: row !important; }\n\n.flex-column {\n  flex-direction: column !important; }\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important; }\n\n.flex-fill {\n  flex: 1 1 auto !important; }\n\n.flex-grow-0 {\n  flex-grow: 0 !important; }\n\n.flex-grow-1 {\n  flex-grow: 1 !important; }\n\n.flex-shrink-0 {\n  flex-shrink: 0 !important; }\n\n.flex-shrink-1 {\n  flex-shrink: 1 !important; }\n\n.justify-content-start {\n  justify-content: flex-start !important; }\n\n.justify-content-end {\n  justify-content: flex-end !important; }\n\n.justify-content-center {\n  justify-content: center !important; }\n\n.justify-content-between {\n  justify-content: space-between !important; }\n\n.justify-content-around {\n  justify-content: space-around !important; }\n\n.align-items-start {\n  align-items: flex-start !important; }\n\n.align-items-end {\n  align-items: flex-end !important; }\n\n.align-items-center {\n  align-items: center !important; }\n\n.align-items-baseline {\n  align-items: baseline !important; }\n\n.align-items-stretch {\n  align-items: stretch !important; }\n\n.align-content-start {\n  align-content: flex-start !important; }\n\n.align-content-end {\n  align-content: flex-end !important; }\n\n.align-content-center {\n  align-content: center !important; }\n\n.align-content-between {\n  align-content: space-between !important; }\n\n.align-content-around {\n  align-content: space-around !important; }\n\n.align-content-stretch {\n  align-content: stretch !important; }\n\n.align-self-auto {\n  align-self: auto !important; }\n\n.align-self-start {\n  align-self: flex-start !important; }\n\n.align-self-end {\n  align-self: flex-end !important; }\n\n.align-self-center {\n  align-self: center !important; }\n\n.align-self-baseline {\n  align-self: baseline !important; }\n\n.align-self-stretch {\n  align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-row {\n    flex-direction: row !important; }\n  .flex-sm-column {\n    flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-sm-fill {\n    flex: 1 1 auto !important; }\n  .flex-sm-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-sm-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-sm-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-sm-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-sm-start {\n    justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    justify-content: center !important; }\n  .justify-content-sm-between {\n    justify-content: space-between !important; }\n  .justify-content-sm-around {\n    justify-content: space-around !important; }\n  .align-items-sm-start {\n    align-items: flex-start !important; }\n  .align-items-sm-end {\n    align-items: flex-end !important; }\n  .align-items-sm-center {\n    align-items: center !important; }\n  .align-items-sm-baseline {\n    align-items: baseline !important; }\n  .align-items-sm-stretch {\n    align-items: stretch !important; }\n  .align-content-sm-start {\n    align-content: flex-start !important; }\n  .align-content-sm-end {\n    align-content: flex-end !important; }\n  .align-content-sm-center {\n    align-content: center !important; }\n  .align-content-sm-between {\n    align-content: space-between !important; }\n  .align-content-sm-around {\n    align-content: space-around !important; }\n  .align-content-sm-stretch {\n    align-content: stretch !important; }\n  .align-self-sm-auto {\n    align-self: auto !important; }\n  .align-self-sm-start {\n    align-self: flex-start !important; }\n  .align-self-sm-end {\n    align-self: flex-end !important; }\n  .align-self-sm-center {\n    align-self: center !important; }\n  .align-self-sm-baseline {\n    align-self: baseline !important; }\n  .align-self-sm-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-row {\n    flex-direction: row !important; }\n  .flex-md-column {\n    flex-direction: column !important; }\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-md-fill {\n    flex: 1 1 auto !important; }\n  .flex-md-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-md-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-md-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-md-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-md-start {\n    justify-content: flex-start !important; }\n  .justify-content-md-end {\n    justify-content: flex-end !important; }\n  .justify-content-md-center {\n    justify-content: center !important; }\n  .justify-content-md-between {\n    justify-content: space-between !important; }\n  .justify-content-md-around {\n    justify-content: space-around !important; }\n  .align-items-md-start {\n    align-items: flex-start !important; }\n  .align-items-md-end {\n    align-items: flex-end !important; }\n  .align-items-md-center {\n    align-items: center !important; }\n  .align-items-md-baseline {\n    align-items: baseline !important; }\n  .align-items-md-stretch {\n    align-items: stretch !important; }\n  .align-content-md-start {\n    align-content: flex-start !important; }\n  .align-content-md-end {\n    align-content: flex-end !important; }\n  .align-content-md-center {\n    align-content: center !important; }\n  .align-content-md-between {\n    align-content: space-between !important; }\n  .align-content-md-around {\n    align-content: space-around !important; }\n  .align-content-md-stretch {\n    align-content: stretch !important; }\n  .align-self-md-auto {\n    align-self: auto !important; }\n  .align-self-md-start {\n    align-self: flex-start !important; }\n  .align-self-md-end {\n    align-self: flex-end !important; }\n  .align-self-md-center {\n    align-self: center !important; }\n  .align-self-md-baseline {\n    align-self: baseline !important; }\n  .align-self-md-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-row {\n    flex-direction: row !important; }\n  .flex-lg-column {\n    flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-lg-fill {\n    flex: 1 1 auto !important; }\n  .flex-lg-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-lg-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-lg-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-lg-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-lg-start {\n    justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    justify-content: center !important; }\n  .justify-content-lg-between {\n    justify-content: space-between !important; }\n  .justify-content-lg-around {\n    justify-content: space-around !important; }\n  .align-items-lg-start {\n    align-items: flex-start !important; }\n  .align-items-lg-end {\n    align-items: flex-end !important; }\n  .align-items-lg-center {\n    align-items: center !important; }\n  .align-items-lg-baseline {\n    align-items: baseline !important; }\n  .align-items-lg-stretch {\n    align-items: stretch !important; }\n  .align-content-lg-start {\n    align-content: flex-start !important; }\n  .align-content-lg-end {\n    align-content: flex-end !important; }\n  .align-content-lg-center {\n    align-content: center !important; }\n  .align-content-lg-between {\n    align-content: space-between !important; }\n  .align-content-lg-around {\n    align-content: space-around !important; }\n  .align-content-lg-stretch {\n    align-content: stretch !important; }\n  .align-self-lg-auto {\n    align-self: auto !important; }\n  .align-self-lg-start {\n    align-self: flex-start !important; }\n  .align-self-lg-end {\n    align-self: flex-end !important; }\n  .align-self-lg-center {\n    align-self: center !important; }\n  .align-self-lg-baseline {\n    align-self: baseline !important; }\n  .align-self-lg-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-row {\n    flex-direction: row !important; }\n  .flex-xl-column {\n    flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-xl-fill {\n    flex: 1 1 auto !important; }\n  .flex-xl-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-xl-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-xl-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-xl-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-xl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    justify-content: center !important; }\n  .justify-content-xl-between {\n    justify-content: space-between !important; }\n  .justify-content-xl-around {\n    justify-content: space-around !important; }\n  .align-items-xl-start {\n    align-items: flex-start !important; }\n  .align-items-xl-end {\n    align-items: flex-end !important; }\n  .align-items-xl-center {\n    align-items: center !important; }\n  .align-items-xl-baseline {\n    align-items: baseline !important; }\n  .align-items-xl-stretch {\n    align-items: stretch !important; }\n  .align-content-xl-start {\n    align-content: flex-start !important; }\n  .align-content-xl-end {\n    align-content: flex-end !important; }\n  .align-content-xl-center {\n    align-content: center !important; }\n  .align-content-xl-between {\n    align-content: space-between !important; }\n  .align-content-xl-around {\n    align-content: space-around !important; }\n  .align-content-xl-stretch {\n    align-content: stretch !important; }\n  .align-self-xl-auto {\n    align-self: auto !important; }\n  .align-self-xl-start {\n    align-self: flex-start !important; }\n  .align-self-xl-end {\n    align-self: flex-end !important; }\n  .align-self-xl-center {\n    align-self: center !important; }\n  .align-self-xl-baseline {\n    align-self: baseline !important; }\n  .align-self-xl-stretch {\n    align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.position-static {\n  position: static !important; }\n\n.position-relative {\n  position: relative !important; }\n\n.position-absolute {\n  position: absolute !important; }\n\n.position-fixed {\n  position: fixed !important; }\n\n.position-sticky {\n  position: sticky !important; }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n@supports (position: sticky) {\n  .sticky-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal; }\n\n.shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important; }\n\n.shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; }\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }\n\n.shadow-none {\n  box-shadow: none !important; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.w-auto {\n  width: auto !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.h-auto {\n  height: auto !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.m-0 {\n  margin: 0 !important; }\n\n.mt-0,\n.my-0 {\n  margin-top: 0 !important; }\n\n.mr-0,\n.mx-0 {\n  margin-right: 0 !important; }\n\n.mb-0,\n.my-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0,\n.mx-0 {\n  margin-left: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem !important; }\n\n.mt-1,\n.my-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1,\n.mx-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1,\n.my-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1,\n.mx-1 {\n  margin-left: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem !important; }\n\n.mt-2,\n.my-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2,\n.mx-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2,\n.my-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2,\n.mx-2 {\n  margin-left: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem !important; }\n\n.mt-3,\n.my-3 {\n  margin-top: 1rem !important; }\n\n.mr-3,\n.mx-3 {\n  margin-right: 1rem !important; }\n\n.mb-3,\n.my-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3,\n.mx-3 {\n  margin-left: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem !important; }\n\n.mt-4,\n.my-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4,\n.mx-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4,\n.my-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4,\n.mx-4 {\n  margin-left: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem !important; }\n\n.mt-5,\n.my-5 {\n  margin-top: 3rem !important; }\n\n.mr-5,\n.mx-5 {\n  margin-right: 3rem !important; }\n\n.mb-5,\n.my-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5,\n.mx-5 {\n  margin-left: 3rem !important; }\n\n.p-0 {\n  padding: 0 !important; }\n\n.pt-0,\n.py-0 {\n  padding-top: 0 !important; }\n\n.pr-0,\n.px-0 {\n  padding-right: 0 !important; }\n\n.pb-0,\n.py-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0,\n.px-0 {\n  padding-left: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem !important; }\n\n.pt-1,\n.py-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1,\n.px-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1,\n.py-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1,\n.px-1 {\n  padding-left: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem !important; }\n\n.pt-2,\n.py-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2,\n.px-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2,\n.py-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2,\n.px-2 {\n  padding-left: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem !important; }\n\n.pt-3,\n.py-3 {\n  padding-top: 1rem !important; }\n\n.pr-3,\n.px-3 {\n  padding-right: 1rem !important; }\n\n.pb-3,\n.py-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3,\n.px-3 {\n  padding-left: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem !important; }\n\n.pt-4,\n.py-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4,\n.px-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4,\n.py-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4,\n.px-4 {\n  padding-left: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem !important; }\n\n.pt-5,\n.py-5 {\n  padding-top: 3rem !important; }\n\n.pr-5,\n.px-5 {\n  padding-right: 3rem !important; }\n\n.pb-5,\n.py-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5,\n.px-5 {\n  padding-left: 3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto,\n.my-auto {\n  margin-top: auto !important; }\n\n.mr-auto,\n.mx-auto {\n  margin-right: auto !important; }\n\n.mb-auto,\n.my-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto,\n.mx-auto {\n  margin-left: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 !important; }\n  .mt-sm-0,\n  .my-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0,\n  .mx-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0,\n  .my-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0,\n  .mx-sm-0 {\n    margin-left: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem !important; }\n  .mt-sm-1,\n  .my-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1,\n  .mx-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1,\n  .my-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1,\n  .mx-sm-1 {\n    margin-left: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem !important; }\n  .mt-sm-2,\n  .my-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2,\n  .mx-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2,\n  .my-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2,\n  .mx-sm-2 {\n    margin-left: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem !important; }\n  .mt-sm-3,\n  .my-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3,\n  .mx-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3,\n  .my-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3,\n  .mx-sm-3 {\n    margin-left: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem !important; }\n  .mt-sm-4,\n  .my-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4,\n  .mx-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4,\n  .my-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4,\n  .mx-sm-4 {\n    margin-left: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem !important; }\n  .mt-sm-5,\n  .my-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5,\n  .mx-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5,\n  .my-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5,\n  .mx-sm-5 {\n    margin-left: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 !important; }\n  .pt-sm-0,\n  .py-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0,\n  .px-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0,\n  .py-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0,\n  .px-sm-0 {\n    padding-left: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem !important; }\n  .pt-sm-1,\n  .py-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1,\n  .px-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1,\n  .py-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1,\n  .px-sm-1 {\n    padding-left: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem !important; }\n  .pt-sm-2,\n  .py-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2,\n  .px-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2,\n  .py-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2,\n  .px-sm-2 {\n    padding-left: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem !important; }\n  .pt-sm-3,\n  .py-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3,\n  .px-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3,\n  .py-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3,\n  .px-sm-3 {\n    padding-left: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem !important; }\n  .pt-sm-4,\n  .py-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4,\n  .px-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4,\n  .py-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4,\n  .px-sm-4 {\n    padding-left: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem !important; }\n  .pt-sm-5,\n  .py-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5,\n  .px-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5,\n  .py-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5,\n  .px-sm-5 {\n    padding-left: 3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto,\n  .my-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto,\n  .mx-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto,\n  .my-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto,\n  .mx-sm-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 !important; }\n  .mt-md-0,\n  .my-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0,\n  .mx-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0,\n  .my-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0,\n  .mx-md-0 {\n    margin-left: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem !important; }\n  .mt-md-1,\n  .my-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1,\n  .mx-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1,\n  .my-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1,\n  .mx-md-1 {\n    margin-left: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem !important; }\n  .mt-md-2,\n  .my-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2,\n  .mx-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2,\n  .my-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2,\n  .mx-md-2 {\n    margin-left: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem !important; }\n  .mt-md-3,\n  .my-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3,\n  .mx-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3,\n  .my-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3,\n  .mx-md-3 {\n    margin-left: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem !important; }\n  .mt-md-4,\n  .my-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4,\n  .mx-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4,\n  .my-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4,\n  .mx-md-4 {\n    margin-left: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem !important; }\n  .mt-md-5,\n  .my-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5,\n  .mx-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5,\n  .my-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5,\n  .mx-md-5 {\n    margin-left: 3rem !important; }\n  .p-md-0 {\n    padding: 0 !important; }\n  .pt-md-0,\n  .py-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0,\n  .px-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0,\n  .py-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0,\n  .px-md-0 {\n    padding-left: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem !important; }\n  .pt-md-1,\n  .py-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1,\n  .px-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1,\n  .py-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1,\n  .px-md-1 {\n    padding-left: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem !important; }\n  .pt-md-2,\n  .py-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2,\n  .px-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2,\n  .py-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2,\n  .px-md-2 {\n    padding-left: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem !important; }\n  .pt-md-3,\n  .py-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3,\n  .px-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3,\n  .py-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3,\n  .px-md-3 {\n    padding-left: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem !important; }\n  .pt-md-4,\n  .py-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4,\n  .px-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4,\n  .py-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4,\n  .px-md-4 {\n    padding-left: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem !important; }\n  .pt-md-5,\n  .py-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5,\n  .px-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5,\n  .py-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5,\n  .px-md-5 {\n    padding-left: 3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto,\n  .my-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto,\n  .mx-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto,\n  .my-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto,\n  .mx-md-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 !important; }\n  .mt-lg-0,\n  .my-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0,\n  .mx-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0,\n  .my-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0,\n  .mx-lg-0 {\n    margin-left: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem !important; }\n  .mt-lg-1,\n  .my-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1,\n  .mx-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1,\n  .my-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1,\n  .mx-lg-1 {\n    margin-left: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem !important; }\n  .mt-lg-2,\n  .my-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2,\n  .mx-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2,\n  .my-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2,\n  .mx-lg-2 {\n    margin-left: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem !important; }\n  .mt-lg-3,\n  .my-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3,\n  .mx-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3,\n  .my-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3,\n  .mx-lg-3 {\n    margin-left: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem !important; }\n  .mt-lg-4,\n  .my-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4,\n  .mx-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4,\n  .my-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4,\n  .mx-lg-4 {\n    margin-left: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem !important; }\n  .mt-lg-5,\n  .my-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5,\n  .mx-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5,\n  .my-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5,\n  .mx-lg-5 {\n    margin-left: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 !important; }\n  .pt-lg-0,\n  .py-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0,\n  .px-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0,\n  .py-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0,\n  .px-lg-0 {\n    padding-left: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem !important; }\n  .pt-lg-1,\n  .py-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1,\n  .px-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1,\n  .py-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1,\n  .px-lg-1 {\n    padding-left: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem !important; }\n  .pt-lg-2,\n  .py-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2,\n  .px-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2,\n  .py-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2,\n  .px-lg-2 {\n    padding-left: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem !important; }\n  .pt-lg-3,\n  .py-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3,\n  .px-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3,\n  .py-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3,\n  .px-lg-3 {\n    padding-left: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem !important; }\n  .pt-lg-4,\n  .py-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4,\n  .px-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4,\n  .py-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4,\n  .px-lg-4 {\n    padding-left: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem !important; }\n  .pt-lg-5,\n  .py-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5,\n  .px-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5,\n  .py-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5,\n  .px-lg-5 {\n    padding-left: 3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto,\n  .my-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto,\n  .mx-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto,\n  .my-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto,\n  .mx-lg-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 !important; }\n  .mt-xl-0,\n  .my-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0,\n  .mx-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0,\n  .my-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0,\n  .mx-xl-0 {\n    margin-left: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem !important; }\n  .mt-xl-1,\n  .my-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1,\n  .mx-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1,\n  .my-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1,\n  .mx-xl-1 {\n    margin-left: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem !important; }\n  .mt-xl-2,\n  .my-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2,\n  .mx-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2,\n  .my-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2,\n  .mx-xl-2 {\n    margin-left: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem !important; }\n  .mt-xl-3,\n  .my-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3,\n  .mx-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3,\n  .my-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3,\n  .mx-xl-3 {\n    margin-left: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem !important; }\n  .mt-xl-4,\n  .my-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4,\n  .mx-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4,\n  .my-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4,\n  .mx-xl-4 {\n    margin-left: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem !important; }\n  .mt-xl-5,\n  .my-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5,\n  .mx-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5,\n  .my-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5,\n  .mx-xl-5 {\n    margin-left: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 !important; }\n  .pt-xl-0,\n  .py-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0,\n  .px-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0,\n  .py-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0,\n  .px-xl-0 {\n    padding-left: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem !important; }\n  .pt-xl-1,\n  .py-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1,\n  .px-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1,\n  .py-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1,\n  .px-xl-1 {\n    padding-left: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem !important; }\n  .pt-xl-2,\n  .py-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2,\n  .px-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2,\n  .py-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2,\n  .px-xl-2 {\n    padding-left: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem !important; }\n  .pt-xl-3,\n  .py-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3,\n  .px-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3,\n  .py-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3,\n  .px-xl-3 {\n    padding-left: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem !important; }\n  .pt-xl-4,\n  .py-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4,\n  .px-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4,\n  .py-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4,\n  .px-xl-4 {\n    padding-left: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem !important; }\n  .pt-xl-5,\n  .py-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5,\n  .px-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5,\n  .py-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5,\n  .px-xl-5 {\n    padding-left: 3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto,\n  .my-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto,\n  .mx-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto,\n  .my-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto,\n  .mx-xl-auto {\n    margin-left: auto !important; } }\n\n.text-monospace {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-light {\n  font-weight: 300 !important; }\n\n.font-weight-normal {\n  font-weight: 400 !important; }\n\n.font-weight-bold {\n  font-weight: 700 !important; }\n\n.font-italic {\n  font-style: italic !important; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-primary {\n  color: #007bff !important; }\n\na.text-primary:hover, a.text-primary:focus {\n  color: #0062cc !important; }\n\n.text-secondary {\n  color: #6c757d !important; }\n\na.text-secondary:hover, a.text-secondary:focus {\n  color: #545b62 !important; }\n\n.text-success {\n  color: #28a745 !important; }\n\na.text-success:hover, a.text-success:focus {\n  color: #1e7e34 !important; }\n\n.text-info {\n  color: #17a2b8 !important; }\n\na.text-info:hover, a.text-info:focus {\n  color: #117a8b !important; }\n\n.text-warning {\n  color: #ffc107 !important; }\n\na.text-warning:hover, a.text-warning:focus {\n  color: #d39e00 !important; }\n\n.text-danger {\n  color: #dc3545 !important; }\n\na.text-danger:hover, a.text-danger:focus {\n  color: #bd2130 !important; }\n\n.text-light {\n  color: #f8f9fa !important; }\n\na.text-light:hover, a.text-light:focus {\n  color: #dae0e5 !important; }\n\n.text-dark {\n  color: #343a40 !important; }\n\na.text-dark:hover, a.text-dark:focus {\n  color: #1d2124 !important; }\n\n.text-body {\n  color: #212529 !important; }\n\n.text-muted {\n  color: #6c757d !important; }\n\n.text-black-50 {\n  color: rgba(0, 0, 0, 0.5) !important; }\n\n.text-white-50 {\n  color: rgba(255, 255, 255, 0.5) !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.visible {\n  visibility: visible !important; }\n\n.invisible {\n  visibility: hidden !important; }\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a:not(.btn) {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #adb5bd;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  @page {\n    size: a3; }\n  body {\n    min-width: 992px !important; }\n  .container {\n    min-width: 992px !important; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #dee2e6 !important; }\n  .table-dark {\n    color: inherit; }\n    .table-dark th,\n    .table-dark td,\n    .table-dark thead th,\n    .table-dark tbody + tbody {\n      border-color: #dee2e6; }\n  .table .thead-dark th {\n    color: inherit;\n    border-color: #dee2e6; } }\n\n.list-group-item {\n  margin: 1px;\n  border: none; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0.75rem;\n  font-size: 20px;\n  line-height: 1.5;\n  color: #6c757d;\n  background-color: #ffffff45;\n  background-clip: padding-box;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem; }\n\na {\n  text-decoration: underline; }\n\n.dropdown-menu {\n  border-radius: 0; }\n\nform .alert {\n  margin: 0; }\n  form .alert ul {\n    margin: 0;\n    padding: 0; }\n  form .alert li {\n    list-style: none; }\n\nbody {\n  font-family: 'Khand', sans-serif;\n  font-size: 21px; }\n\nh1, h2, h3, h4 {\n  font-family: 'Abril Fatface', cursive; }\n\n/**\nThe styles for the spliter component\n**/\n.Resizer {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  background: #D8D8D8;\n  opacity: .2;\n  z-index: 1;\n  -moz-background-clip: padding;\n  -webkit-background-clip: padding;\n  background-clip: padding-box; }\n\n.Resizer:hover {\n  -webkit-transition: all 1s ease;\n  transition: all 1s ease; }\n\n.Resizer.horizontal {\n  height: 11px;\n  margin: -5px 0;\n  border-top: 5px solid rgba(255, 255, 255, 0);\n  border-bottom: 5px solid rgba(255, 255, 255, 0);\n  cursor: row-resize;\n  width: 100%; }\n\n.Resizer.horizontal:hover {\n  border-top: 5px solid rgba(0, 0, 0, 0.5);\n  border-bottom: 5px solid rgba(0, 0, 0, 0.5); }\n\n.Resizer.vertical {\n  width: 11px;\n  margin: 0 -5px;\n  border-left: 5px solid rgba(255, 255, 255, 0);\n  border-right: 5px solid rgba(255, 255, 255, 0);\n  cursor: col-resize; }\n\n.Resizer.vertical:hover {\n  border-left: 5px solid rgba(0, 0, 0, 0.5);\n  border-right: 5px solid rgba(0, 0, 0, 0.5); }\n\n.vertical section {\n  width: 100vh;\n  height: 100vh;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.vertical header {\n  padding: 1rem;\n  background: #eee; }\n\n.vertical footer {\n  padding: 1rem;\n  background: #eee; }\n\n.navbar {\n  padding: 0;\n  overflow: hidden; }\n  .navbar h2 {\n    font-size: 24px;\n    margin-bottom: 0; }\n  .navbar ul {\n    padding: 0; }\n    .navbar ul li {\n      display: inline-block;\n      width: 100%;\n      padding: 5px;\n      cursor: pointer;\n      list-style: none; }\n      .navbar ul li:hover {\n        background: #eee; }\n      .navbar ul li .menuicon {\n        padding: 3px;\n        margin-left: -7px;\n        margin-right: 5px;\n        width: 100%; }\n      .navbar ul li.collapsed {\n        text-align: center; }\n        .navbar ul li.collapsed span {\n          display: none; }\n        .navbar ul li.collapsed:hover span {\n          display: inline-block;\n          position: fixed;\n          z-index: 999999;\n          color: #5b5b5b;\n          padding: 2px 5px 0px 5px;\n          background: white;\n          border: 1px solid #eee;\n          font-size: 14px;\n          margin: 0; }\n\n.timeline {\n  overflow: hidden;\n  padding: 0;\n  position: relative;\n  padding-right: 10px;\n  /* ================ Timeline Media Queries ================ */ }\n  .timeline .line {\n    position: absolute;\n    top: 0;\n    content: ' ';\n    display: block;\n    width: 1px;\n    height: 100%;\n    background: #5b5b5b;\n    background: -moz-linear-gradient(top, rgba(80, 80, 80, 0) 0%, #5b5b5b 8%, #5b5b5b 92%, rgba(80, 80, 80, 0) 100%);\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #1e5799), color-stop(100%, #7db9e8));\n    background: -webkit-linear-gradient(top, rgba(80, 80, 80, 0) 0%, #5b5b5b 8%, #5b5b5b 92%, rgba(80, 80, 80, 0) 100%);\n    background: -o-linear-gradient(top, rgba(80, 80, 80, 0) 0%, #5b5b5b 8%, #5b5b5b 92%, rgba(80, 80, 80, 0) 100%);\n    background: -ms-linear-gradient(top, rgba(80, 80, 80, 0) 0%, #5b5b5b 8%, #5b5b5b 92%, rgba(80, 80, 80, 0) 100%);\n    background: linear-gradient(to bottom, rgba(80, 80, 80, 0) 0%, #5b5b5b 8%, #5b5b5b 92%, rgba(80, 80, 80, 0) 100%);\n    z-index: 5; }\n    .timeline .line.left {\n      left: 14px; }\n    .timeline .line.right {\n      right: 5px; }\n  .timeline ul {\n    position: relative;\n    width: calc(100% + 10px);\n    height: calc(100vh - 70px);\n    margin-left: 15px;\n    overflow-y: scroll;\n    overflow-x: hidden;\n    list-style-type: none; }\n    .timeline ul:-webkit-scrollbar {\n      display: none; }\n    .timeline ul li {\n      padding: 1em 0;\n      padding-right: 20px;\n      background: white; }\n      .timeline ul li:after {\n        content: \"\";\n        display: block;\n        height: 0;\n        clear: both;\n        visibility: hidden; }\n      .timeline ul li:active {\n        background: #ffbf00; }\n      .timeline ul li.selected {\n        position: relative; }\n        .timeline ul li.selected:before, .timeline ul li.selected:after {\n          content: \"\";\n          position: absolute; }\n        .timeline ul li.selected:before {\n          top: -2px;\n          left: -2px;\n          right: -2px;\n          bottom: -2px;\n          background-image: linear-gradient(to right, #eee, transparent);\n          background-image: -webkit-linear-gradient(right, #eee, transparent);\n          background-image: -moz-linear-gradient(#eee, transparent);\n          background-image: -o-linear-gradient(#eee, transparent);\n          z-index: -2; }\n        .timeline ul li.selected:after {\n          top: 0;\n          left: 0;\n          bottom: 0;\n          right: 0;\n          background: #5b5b5b;\n          z-index: -1; }\n  .timeline .direction-l {\n    position: relative;\n    width: 100%;\n    float: left;\n    text-align: right; }\n  .timeline .direction-r {\n    position: relative;\n    width: 100%;\n    float: right; }\n  .timeline .flag-wrapper {\n    position: relative;\n    display: inline-block;\n    text-align: center; }\n  .timeline .flag {\n    position: relative;\n    display: inline;\n    background: #f8f8f8;\n    padding: 6px 10px;\n    border-radius: 5px;\n    font-weight: 600;\n    text-align: left;\n    -webkit-box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);\n    -moz-box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15);\n    box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.15); }\n  .timeline .direction-l .flag {\n    margin-right: 20px; }\n  .timeline .direction-r .flag {\n    margin-left: 20px; }\n  .timeline .direction-l .flag-point, .timeline .direction-r .flag-point {\n    position: absolute;\n    top: 20px;\n    content: ' ';\n    display: block;\n    width: 12px;\n    height: 12px;\n    margin-top: -10px;\n    background: #fff;\n    border-radius: 10px;\n    border: 4px solid #ff5050;\n    z-index: 10; }\n  .timeline .direction-l .flag-point {\n    right: -3px; }\n  .timeline .direction-r .flag-point {\n    left: -3px; }\n  .timeline .direction-l .flag:after {\n    content: \"\";\n    position: absolute;\n    left: 100%;\n    top: 50%;\n    height: 0;\n    width: 0;\n    margin-top: -8px;\n    border: solid transparent;\n    border-left-color: #5b5b5b;\n    border-width: 8px;\n    pointer-events: none; }\n  .timeline .direction-r .flag:after {\n    content: \"\";\n    position: absolute;\n    right: 100%;\n    top: 50%;\n    height: 0;\n    width: 0;\n    margin-top: -8px;\n    border: solid transparent;\n    border-right-color: #5b5b5b;\n    border-width: 8px;\n    pointer-events: none; }\n  .timeline .time-wrapper {\n    display: inline;\n    line-height: 1em;\n    font-size: 0.66666em;\n    color: #fa5050;\n    vertical-align: middle; }\n  .timeline .direction-l .time-wrapper {\n    float: left; }\n  .timeline .direction-r .time-wrapper {\n    float: right; }\n  .timeline .time {\n    display: inline-block;\n    padding: 4px 6px;\n    background: #f8f8f8;\n    max-width: 220px; }\n  .timeline .desc {\n    margin: 1em 0.75em 0 0;\n    font-size: 0.77777em;\n    font-style: italic;\n    line-height: 1.5em; }\n  .timeline .direction-r .desc {\n    margin: 1em 0 0 0.75em; }\n  .timeline.collapsed {\n    padding: 0;\n    overflow: inherit;\n    font-size: 0.8em; }\n    .timeline.collapsed .line {\n      left: 6px; }\n    .timeline.collapsed ul {\n      width: 100%;\n      margin-left: 7px;\n      padding: 0;\n      overflow: hidden; }\n      .timeline.collapsed ul li {\n        padding: 10px 0px;\n        margin-left: 6px; }\n    .timeline.collapsed .direction-l, .timeline.collapsed .direction-r {\n      float: none;\n      width: 100%;\n      text-align: left; }\n      .timeline.collapsed .direction-l .time-wrapper, .timeline.collapsed .direction-r .time-wrapper {\n        display: none;\n        min-width: 140px;\n        position: fixed;\n        text-align: left;\n        z-index: 99999999; }\n      .timeline.collapsed .direction-l:hover .time-wrapper, .timeline.collapsed .direction-r:hover .time-wrapper {\n        display: inline-block; }\n    .timeline.collapsed .flag-wrapper {\n      text-align: center; }\n    .timeline.collapsed .flag {\n      background: white;\n      z-index: 15;\n      margin: 0; }\n      .timeline.collapsed .flag:hover {\n        background: #fbf5eb; }\n    .timeline.collapsed .direction-l .flag-point, .timeline.collapsed .direction-r .flag-point {\n      left: -9px; }\n    .timeline.collapsed .direction-l .flag:after, .timeline.collapsed .direction-r .flag:after {\n      content: \"\";\n      position: absolute;\n      left: 50%;\n      top: -8px;\n      height: 0;\n      width: 0;\n      margin-left: -8px;\n      border: solid transparent;\n      border-bottom-color: white;\n      border-width: 8px;\n      pointer-events: none; }\n    .timeline.collapsed .direction-l .time-wrapper, .timeline.collapsed .direction-r .time-wrapper {\n      float: none; }\n    .timeline.collapsed .desc {\n      display: none; }\n\n.todo-menu {\n  position: relative;\n  height: calc(100vh - 70px);\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 100%; }\n  .todo-menu .show-done {\n    color: #5b5b5b;\n    font-size: 14px; }\n    .todo-menu .show-done:hover {\n      color: #004085; }\n  .todo-menu .show-status {\n    color: #5b5b5b;\n    font-size: 14px; }\n  .todo-menu ul.todolist {\n    padding: 0; }\n    .todo-menu ul.todolist li {\n      list-style: none; }\n      .todo-menu ul.todolist li .task .task-title {\n        margin: 0; }\n      .todo-menu ul.todolist li .task .task-description {\n        margin: -5px 0 0 30px;\n        font-size: 14px;\n        color: #5b5b5b; }\n      .todo-menu ul.todolist li .task.task-lesson .task-description {\n        color: #004085; }\n      .todo-menu ul.todolist li .task.task-replit .task-description {\n        color: #E6C452; }\n      .todo-menu ul.todolist li .task.task-quiz .task-description {\n        color: #28a745; }\n      .todo-menu ul.todolist li .task .task-menu {\n        position: absolute;\n        right: 0;\n        background: inherit;\n        border: indianred;\n        color: #BDBDBD;\n        font-size: 14px;\n        padding: 5px; }\n        .todo-menu ul.todolist li .task .task-menu .dropdown-toggle {\n          font-size: 13px; }\n        .todo-menu ul.todolist li .task .task-menu .dropdown-menu {\n          top: 35px;\n          left: -120px; }\n      .todo-menu ul.todolist li.send-assignment {\n        padding: 20px;\n        font-size: 16px; }\n        .todo-menu ul.todolist li.send-assignment input[type=text] {\n          font-size: 16px; }\n        .todo-menu ul.todolist li.send-assignment .btn-bar {\n          margin-top: 10px; }\n\n.search-menu {\n  position: relative;\n  height: calc(100vh - 70px);\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 100%; }\n  .search-menu .actionable {\n    position: relative; }\n    .search-menu .actionable .task-menu {\n      position: absolute;\n      right: 10px;\n      top: 10px; }\n      .search-menu .actionable .task-menu .dropdown-menu {\n        left: -130px;\n        top: 32px; }\n  .search-menu .search-input {\n    position: relative; }\n    .search-menu .search-input i, .search-menu .search-input svg {\n      position: absolute;\n      top: 5px;\n      left: 5px; }\n    .search-menu .search-input textarea, .search-menu .search-input select, .search-menu .search-input input, .search-menu .search-input input:hover {\n      outline: none; }\n    .search-menu .search-input input {\n      border: none;\n      padding-left: 40px; }\n  .search-menu .actionable-title {\n    margin: 0; }\n  .search-menu .actionable-details {\n    margin: 0;\n    font-size: 0.7em;\n    color: #5b5b5b; }\n    .search-menu .actionable-details .day {\n      color: #181818;\n      font-weight: 900; }\n    .search-menu .actionable-details .type {\n      text-transform: capitalize; }\n      .search-menu .actionable-details .type.assignment {\n        color: #D34F56; }\n      .search-menu .actionable-details .type.quiz {\n        color: #28a745; }\n      .search-menu .actionable-details .type.lesson {\n        color: #004085; }\n      .search-menu .actionable-details .type.replit {\n        color: #5b5b5b; }\n\nul.bcnotifier {\n  padding: 0;\n  margin: 0; }\n  ul.bcnotifier li {\n    list-style: none;\n    height: 0;\n    padding: 0;\n    overflow: hidden; }\n    ul.bcnotifier li.bcnotification-appear {\n      opacity: 0.01;\n      padding: 10px;\n      height: 0;\n      overflow: hidden; }\n      ul.bcnotifier li.bcnotification-appear.bcnotification-appear-active {\n        opacity: 1;\n        height: inherit;\n        overflow: inherit;\n        transition: opacity 1s ease-in, height 1s ease-in; }\n\n.layout {\n  height: 100vh; }\n  .layout .app-view {\n    overflow: auto;\n    height: 100%;\n    /* gradients - second red border, first red border, top white space, blue lines */\n    background-image: -webkit-linear-gradient(left, #f8f9fa, #f8f9fa), -webkit-linear-gradient(top, white 0px, white 69px, rgba(255, 255, 255, 0) 70px), -webkit-repeating-linear-gradient(white 0px, white 18px, #f8f9fa 19px, white 20px);\n    background-image: -moz-linear-gradient(left, #f8f9fa, #f8f9fa), -moz-linear-gradient(top, white 0px, white 69px, rgba(255, 255, 255, 0) 70px), -moz-repeating-linear-gradient(white 0px, white 18px, #f8f9fa 19px, white 20px);\n    background-image: -ms-linear-gradient(left, #f8f9fa, #f8f9fa), -ms-linear-gradient(top, white 0px, white 69px, rgba(255, 255, 255, 0) 70px), -ms-repeating-linear-gradient(white 0px, white 18px, #f8f9fa 19px, white 20px);\n    background-image: -o-linear-gradient(left, #f8f9fa, #f8f9fa), -o-linear-gradient(top, white 0px, white 69px, rgba(255, 255, 255, 0) 70px), -o-repeating-linear-gradient(white 0px, white 18px, #f8f9fa 19px, white 20px);\n    background-image: linear-gradient(left, #f8f9fa, #f8f9fa), linear-gradient(top, white 0px, white 69px, rgba(255, 255, 255, 0) 70px), repeating-linear-gradient(white 0px, white 18px, #f8f9fa 19px, white 20px);\n    background-size: 1px, 1px, auto, auto 20px;\n    background-repeat: repeat-y, repeat-y, no-repeat, repeat;\n    background-position: 90% 0px, 10% 0px, 0px 0px, 0px 0px; }\n\n.white-resizer .Resizer {\n  background: white; }\n\n.form-signin {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n  .form-signin .form-control {\n    border: none;\n    border-radius: 0px;\n    border-bottom: 1px solid #5b5b5b; }\n\n.footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 60px;\n  /* Set the fixed height of the footer here */\n  line-height: 60px;\n  /* Vertically center the text there */\n  background-color: #f5f5f5; }\n\n.codeview .bottom_toolbar {\n  position: absolute;\n  bottom: 20px;\n  right: 20px; }\n  .codeview .bottom_toolbar .timer {\n    display: inline-block;\n    color: white;\n    font-size: 20px;\n    font-weight: 900;\n    padding: 5px; }\n  .codeview .bottom_toolbar .send {\n    margin-bottom: 5px; }\n\n.dayview h1 .bcprogress {\n  position: relative;\n  top: 10px; }\n\n.dayview .description {\n  margin: 30px 10vw;\n  text-align: center; }\n\n.dayview .actionable-item .dropdown {\n  display: inline; }\n  .dayview .actionable-item .dropdown .btn {\n    padding: 0;\n    font-size: inherit;\n    color: #004085;\n    text-decoration: underline; }\n    .dayview .actionable-item .dropdown .btn:after {\n      display: none; }\n\n.searchview .input-group svg {\n  color: #eee;\n  padding: 10px;\n  font-size: 50px;\n  font-weight: 100; }\n\n.searchview input {\n  border: none; }\n  .searchview input:hover, .searchview input:focus {\n    outline: none;\n    box-shadow: none; }\n\n.searchview .bclist > li {\n  padding: 0 10px;\n  position: relative; }\n  .searchview .bclist > li:hover {\n    background: white;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n    .searchview .bclist > li:hover .toolbar {\n      display: inline-block;\n      position: absolute;\n      color: #5b5b5b; }\n      .searchview .bclist > li:hover .toolbar li {\n        list-style: none;\n        padding: 5px;\n        display: inline-block; }\n      .searchview .bclist > li:hover .toolbar.up {\n        top: 5px;\n        right: 7px;\n        font-size: 17px; }\n      .searchview .bclist > li:hover .toolbar.down {\n        bottom: 0;\n        right: 7px;\n        font-size: 20px; }\n  .searchview .bclist > li h4 {\n    margin-bottom: 16px; }\n    .searchview .bclist > li h4 svg {\n      padding: 3px;\n      color: #ffbf00; }\n      .searchview .bclist > li h4 svg:before {\n        content: attr(legend);\n        display: inline-block; }\n  .searchview .bclist > li p.technolgies {\n    font-size: 14px;\n    margin: -25px 0;\n    color: black;\n    padding: 2px 5px 0 5px;\n    display: inline-block;\n    position: absolute;\n    background: #eee; }\n  .searchview .bclist > li .result-description {\n    font-size: 70%;\n    margin-bottom: 5px; }\n  .searchview .bclist > li .toolbar {\n    display: none; }\n\n.profile-view h2 {\n  font-size: 24px; }\n\n.profile-view .profile-img {\n  margin: auto;\n  width: 120px;\n  height: 120px;\n  border-radius: 120px;\n  text-align: center;\n  cursor: pointer; }\n  .profile-view .profile-img img {\n    border-radius: 120px;\n    -webkit-filter: grayscale(0.7);\n    -moz-filter: grayscale(0.7);\n    -ms-filter: grayscale(0.7);\n    filter: grayscale(0.7);\n    opacity: 0.9;\n    width: 120px;\n    height: 120px; }\n  .profile-view .profile-img:before {\n    content: '';\n    position: absolute;\n    left: auto;\n    right: auto;\n    width: 130px;\n    height: 130px;\n    transform: translate(-5px, -5px);\n    border-radius: 162px;\n    border: 1px solid #BCBCBC; }\n  .profile-view .profile-img:after {\n    content: '';\n    position: absolute;\n    left: auto;\n    right: auto;\n    width: 140px;\n    height: 140px;\n    transform: translate(-130px, -10px);\n    border-radius: 172px;\n    border: 1px dashed #81BDA4; }\n  .profile-view .profile-img:hover img {\n    -webkit-filter: blur(2px);\n    -moz-filter: blur(2px);\n    -o-filter: blur(2px);\n    -ms-filter: blur(2px);\n    filter: blur(2px);\n    opacity: 0.8; }\n  .profile-view .profile-img:hover a {\n    background: rgba(217, 217, 217, 0.52);\n    visibility: visible;\n    transform: translate(-120px, 0px);\n    color: #494E52; }\n  .profile-view .profile-img a {\n    position: absolute;\n    left: auto;\n    right: auto;\n    width: 120px;\n    height: 120px;\n    border-radius: 120px;\n    line-height: 120px;\n    font-family: 'Oswald';\n    font-size: 20px;\n    visibility: hidden; }\n\n.choose-view .bclist {\n  width: 100%;\n  padding: 0; }\n\n.choose-view .courses li {\n  position: relative;\n  list-style: none;\n  background: white;\n  border: #f5f5f5 1px solid;\n  padding: 0px 5px 5px 5px;\n  border-radius: 5px;\n  margin-bottom: 10px; }\n  .choose-view .courses li button {\n    position: absolute;\n    top: 5px;\n    right: 5px; }\n  .choose-view .courses li .cohort-description {\n    font-size: 14px; }\n  .choose-view .courses li .cohort-name {\n    font-size: 18px;\n    text-transform: uppercase; }\n", ""]);

// exports


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, author, license, devDependencies, babel, dependencies, default */
/***/ (function(module) {

module.exports = {"name":"workspace","version":"1.1.3","description":"","main":"index.js","scripts":{"c9":"webpack-dev-server --open --host $IP --port $PORT --config webpack.dev.js","dev":"webpack --config webpack.dev.js","start":"http-server -a $IP","build":"webpack --config webpack.prod.js"},"author":"","license":"ISC","devDependencies":{"babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.0","babel-preset-react":"^6.24.1","css-loader":"^0.28.7","dotenv-webpack":"^1.5.5","file-loader":"^1.1.5","html-loader":"^0.5.5","html-webpack-plugin":"^3.2.0","markdown-loader":"^2.0.2","node-sass":"^4.8.3","react-svg-loader":"^2.1.0","sass-loader":"^6.0.6","style-loader":"^0.19.0","webpack":"^4.16.4","webpack-cli":"^2.1.5","webpack-dev-server":"^3.1.5","webpack-merge":"^4.1.4"},"babel":{"presets":["env","react"]},"dependencies":{"@4geeksacademy/react-flux-dash":"^3.0.2","@breathecode/api-js-wrapper":"^1.0.6","@fortawesome/fontawesome":"^1.1.4","@fortawesome/fontawesome-free-brands":"^5.0.9","@fortawesome/fontawesome-free-regular":"^5.0.8","@fortawesome/fontawesome-free-solid":"^5.0.8","bc-react-notifier":"^1.1.0","bc-react-session":"^1.5.1","bootstrap":"^4.1.3","events":"^1.1.1","flux":"^3.1.3","moment":"^2.19.4","prop-types":"^15.6.1","query-string":"^5.0.1","raven-js":"^3.24.2","react":"^16.4.2","react-ace":"^5.9.0","react-dom":"^16.4.2","react-flux-dash":"^1.1.6","react-marked":"^0.3.1","react-mousetrap":"^0.2.0","react-polyfills":"0.0.1","react-router":"^4.3.1","react-router-dom":"^4.3.1","react-split-pane":"^0.1.77","react-transition-group":"^1.2.1","validator":"^9.4.1","wordpress-rest-api":"^0.8.0"}};

/***/ }),

/***/ "./src/js/Layout.jsx":
/*!***************************!*\
  !*** ./src/js/Layout.jsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _bcReactNotifier = __webpack_require__(/*! bc-react-notifier */ "./node_modules/bc-react-notifier/dist/notifier.js");

var _auth = __webpack_require__(/*! ./views/auth */ "./src/js/views/auth.jsx");

var _CourseView = __webpack_require__(/*! ./views/CourseView */ "./src/js/views/CourseView.jsx");

var _CourseView2 = _interopRequireDefault(_CourseView);

var _HomeView = __webpack_require__(/*! ./views/HomeView */ "./src/js/views/HomeView.jsx");

var _HomeView2 = _interopRequireDefault(_HomeView);

var _ProfileView = __webpack_require__(/*! ./views/ProfileView */ "./src/js/views/ProfileView.jsx");

var _ProfileView2 = _interopRequireDefault(_ProfileView);

var _ChooseView = __webpack_require__(/*! ./views/ChooseView */ "./src/js/views/ChooseView.jsx");

var _ChooseView2 = _interopRequireDefault(_ChooseView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Flux$View) {
    _inherits(Layout, _Flux$View);

    function Layout() {
        _classCallCheck(this, Layout);

        var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

        _this.state = {
            errors: null
        };
        return _this;
    }

    _createClass(Layout, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'layout' },
                _react2.default.createElement(
                    _reactRouterDom.BrowserRouter,
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_bcReactNotifier.Notifier, null),
                        _react2.default.createElement(
                            _reactRouterDom.Switch,
                            null,
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _auth.LoginView }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/forgot', component: _auth.ForgotView }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { exact: true, path: '/', component: _HomeView2.default }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { exact: true, path: '/home', component: _HomeView2.default }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { exact: true, path: '/choose', component: _ChooseView2.default }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { exact: true, path: '/profile', component: _ProfileView2.default }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { path: '/course/:course_slug', component: _CourseView2.default }),
                            _react2.default.createElement(_bcReactSession.PrivateRoute, { render: function render() {
                                    return _react2.default.createElement(
                                        'p',
                                        { className: 'text-center mt-5' },
                                        'Not found'
                                    );
                                } })
                        )
                    )
                )
            );
        }
    }]);

    return Layout;
}(_reactFluxDash2.default.View);

exports.default = Layout;
//export default withShortcuts(Layout, keymap)

/***/ }),

/***/ "./src/js/actions/BCActions.js":
/*!*************************************!*\
  !*** ./src/js/actions/BCActions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _api = __webpack_require__(/*! ../utils/api.js */ "./src/js/utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BCActions = function (_Flux$Action) {
    _inherits(BCActions, _Flux$Action);

    function BCActions() {
        _classCallCheck(this, BCActions);

        return _possibleConstructorReturn(this, (BCActions.__proto__ || Object.getPrototypeOf(BCActions)).call(this));
    }

    _createClass(BCActions, [{
        key: 'fetch',
        value: function fetch() {
            var _this2 = this;

            return {
                syllabus: function syllabus(slug) {
                    _api2.default.syllabus().get(slug).then(function (data) {
                        _this2.dispatch('BCStore.setSyllabus', data);
                    }).catch(function (data) {
                        if (typeof data.pending === 'undefined') console.error(data);else console.warn(data.msg);
                    });
                },
                projects: function projects(syllabus_slug) {
                    _api2.default.project().all(syllabus_slug).then(function (data) {
                        _this2.dispatch('BCStore.setProjects', data);
                    }).catch(function (data) {
                        if (typeof data.pending === 'undefined') console.error(data);else console.warn(data.msg);
                    });
                }
            };
        }
    }]);

    return BCActions;
}(_reactFluxDash2.default.Action);

exports.default = new BCActions();

/***/ }),

/***/ "./src/js/actions/ContentActions.js":
/*!******************************************!*\
  !*** ./src/js/actions/ContentActions.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadAssets = exports.loadLessons = exports.loadCourses = undefined;

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _api = __webpack_require__(/*! ../utils/api.js */ "./src/js/utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadCourses = exports.loadCourses = function loadCourses() {
    _api2.default.courses().user(3).then(function (data) {
        _reactFluxDash2.default.dispatchEvent('courses', data);
    }).catch(function (err) {
        // handle error 
        console.log("ERROR!!", err);
    });
};
var loadLessons = exports.loadLessons = function loadLessons() {
    _api2.default.lessons().all().then(function (data) {
        _reactFluxDash2.default.dispatchEvent('lessons', data);
    }).catch(function (err) {
        // handle error 
        console.log("ERROR!!", err);
    });
};
var loadAssets = exports.loadAssets = function loadAssets() {
    wpEndpoint.assets().then(function (data) {
        _reactFluxDash2.default.dispatchEvent('assets', data);
    }).catch(function (err) {
        // handle error 
        console.log("ERROR!!", err);
    });
};

/***/ }),

/***/ "./src/js/actions/StudentActions.js":
/*!******************************************!*\
  !*** ./src/js/actions/StudentActions.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _wordpressRestApi = __webpack_require__(/*! wordpress-rest-api */ "./node_modules/wordpress-rest-api/wp.js");

var _wordpressRestApi2 = _interopRequireDefault(_wordpressRestApi);

var _api = __webpack_require__(/*! ../utils/api.js */ "./src/js/utils/api.js");

var _api2 = _interopRequireDefault(_api);

var _DeliverAssignment = __webpack_require__(/*! ../components/DeliverAssignment */ "./src/js/components/DeliverAssignment.jsx");

var _DeliverAssignment2 = _interopRequireDefault(_DeliverAssignment);

var _BCStore = __webpack_require__(/*! ../stores/BCStore */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

var _bcReactNotifier = __webpack_require__(/*! bc-react-notifier */ "./node_modules/bc-react-notifier/dist/notifier.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentActions = function (_Flux$Action) {
    _inherits(StudentActions, _Flux$Action);

    function StudentActions() {
        _classCallCheck(this, StudentActions);

        var _this = _possibleConstructorReturn(this, (StudentActions.__proto__ || Object.getPrototypeOf(StudentActions)).call(this));

        _this.wp = new _wordpressRestApi2.default({ endpoint: "https://breatheco.de" + '/wp-json' });
        _this.wp.lessons = _this.wp.registerRoute('wp/v2', '/lesson/(?P<id>)');
        _this.wp.assets = _this.wp.registerRoute('wp/v2', '/lesson-asset/(?P<id>)');
        _this.wp.courses = _this.wp.registerRoute('breathecode/v1', '/courses', {
            mixins: {
                user: function user(val) {
                    console.log(this);
                    return this.param('user', val);
                }
            }
        });
        return _this;
    }

    _createClass(StudentActions, [{
        key: 'loadCourses',
        value: function loadCourses() {
            var _this2 = this;

            this.wp.courses().user(3).then(function (data) {
                _this2.dispatch('WPStore.setCourses', data);
            }).catch(function (err) {
                // handle error 
                console.log("ERROR!!", err);
            });;
        }
    }, {
        key: 'loadAssets',
        value: function loadAssets() {
            var _this3 = this;

            this.wp.assets().then(function (data) {
                _this3.dispatch('WPStore.setAssets', data);
            }).catch(function (err) {
                // handle error 
                console.log("ERROR!!", err);
            });;
        }
    }, {
        key: 'startDay',
        value: function startDay(day) {
            var _this4 = this;

            var todos = _BCStore2.default.getDayTodos(day);
            var session = _bcReactSession.Session.get();
            return _api2.default.todo().add(session.payload.bc_id, todos).then(function (data) {
                _this4.dispatch('StudentStore.appendTodos', data.data || data);
            }).catch(function () {
                _bcReactNotifier.Notify.error('There was an error creating the day todo\'s');
            });
        }
    }, {
        key: 'addUnsyncedTodos',
        value: function addUnsyncedTodos(unsyncedTodos) {
            var _this5 = this;

            var session = _bcReactSession.Session.get();
            return _api2.default.todo().add(session.payload.bc_id, unsyncedTodos).then(function (data) {
                _bcReactNotifier.Notify.success('The day was updated successfully, you can review your new todo\'s');
                _this5.dispatch('StudentStore.appendTodos', data.data || data);
            }).catch(function () {
                _bcReactNotifier.Notify.error('There was an error updating the day todo\'s');
            });
        }
    }, {
        key: 'updateTask',
        value: function updateTask(task) {
            var _this6 = this;

            return _api2.default.todo().update(task).then(function (data) {
                _bcReactNotifier.Notify.success('The task has been updated successfully');
                _this6.dispatch('StudentStore.updateSingleTodo', data.data || data);
            }).catch(function (error) {
                _bcReactNotifier.Notify.error('There was an error delivering the task');
            });
        }
    }, {
        key: 'deliverAssignment',
        value: function deliverAssignment(task) {
            var _this7 = this;

            _bcReactNotifier.Notify.info(_DeliverAssignment2.default, function (githubURL) {
                if (githubURL) {
                    task.github_url = githubURL;
                    task.status = 'done';
                    _bcReactNotifier.Notify.info("Are you sure you want to submit?", function (answer) {
                        _bcReactNotifier.Notify.clean();
                        if (answer) {
                            return _api2.default.todo().update(task).then(function (data) {
                                _bcReactNotifier.Notify.success('Your assignment has been delivered successfully');
                                _this7.dispatch('StudentStore.updateSingleTodo', data.data || data);
                            }).catch(function (error) {
                                _bcReactNotifier.Notify.error('There was an error delivering your assignment');
                            });
                        }
                    });
                } else {
                    _bcReactNotifier.Notify.clean();
                }
            }, false);
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this8 = this;

            return {
                todos: function todos(studentId) {
                    _api2.default.todo().getByStudent(studentId).then(function (data) {
                        if (typeof data.code === 'undefined' || data.code == 200) _this8.dispatch('StudentStore.setTodos', data.data || data);else console.error(data);
                    }).catch(function (data) {
                        if (typeof data.pending === 'undefined') console.error(data);else console.warn(data.msg);
                    });
                }
            };
        }
    }]);

    return StudentActions;
}(_reactFluxDash2.default.Action);

exports.default = new StudentActions();

/***/ }),

/***/ "./src/js/actions/auth.js":
/*!********************************!*\
  !*** ./src/js/actions/auth.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remind = exports.logout = exports.login = undefined;

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _api = __webpack_require__(/*! ../utils/api.js */ "./src/js/utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_api2.default.setOptions({
    getToken: function getToken() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'api';

        var session = _bcReactSession.Session.get();
        return 'Bearer ' + session.payload.access_token;
    },
    onLogout: function onLogout() {
        return logout();
    }
});

var login = exports.login = function login(username, password, history) {
    return _api2.default.credentials().autenticate(username, password).then(function (data) {

        var user = {
            bc_id: data.id,
            wp_id: data.wp_id,
            access_token: data.access_token,
            bio: data.bio,
            cohorts: data.cohorts,
            currently_active: data.currently_active,
            total_points: data.total_points,
            financial_status: data.financial_status,
            avatar: data.avatar_url,
            phone: data.phone,
            github: data.github,
            email: data.email || data.username,
            created_at: data.created_at,
            full_name: data.full_name,
            type: data.type || 'student',
            currentCohort: !Array.isArray(data.cohorts) ? null : data.cohorts.length === 1 ? data.cohorts[0] : data.cohorts
        };
        _bcReactSession.Session.start({ payload: user, expiration: 3600 * 24 });
        history.push('/');
    });
};

var logout = exports.logout = function logout() {
    var history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _bcReactSession.Session.destroy();
    if (history) history.push('/login');else window.location.href = "/login";
};

var remind = exports.remind = function remind(email) {
    return _api2.default.credentials().remind(email).then(function (data) {
        return data;
    });
};

/***/ }),

/***/ "./src/js/components/DayContent.jsx":
/*!******************************************!*\
  !*** ./src/js/components/DayContent.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayContent = function (_React$Component) {
    _inherits(DayContent, _React$Component);

    function DayContent() {
        _classCallCheck(this, DayContent);

        var _this = _possibleConstructorReturn(this, (DayContent.__proto__ || Object.getPrototypeOf(DayContent)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(DayContent, [{
        key: 'onStart',
        value: function onStart() {
            console.log('a');
            this.props.onStart();
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.props.blocked) return _react2.default.createElement(
                'div',
                { className: 'text-center' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-toolbar' },
                    _react2.default.createElement(_index.Button, { icon: 'fas fa-play', label: 'Start Day',
                        onClick: this.onStart.bind(this) }),
                    _react2.default.createElement(
                        'p',
                        { className: 'toolbar-hint' },
                        'When starting this day, all it\'s activities will be added into your todo list'
                    )
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'text-center' },
                this.props.children
            );
        }
    }]);

    return DayContent;
}(_react2.default.Component);

DayContent.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    onStart: _propTypes2.default.func.isRequired,
    blocked: _propTypes2.default.bool.isRequired
};
DayContent.defaultProps = {
    blocked: true
};
exports.default = DayContent;

/***/ }),

/***/ "./src/js/components/DeliverAssignment.jsx":
/*!*************************************************!*\
  !*** ./src/js/components/DeliverAssignment.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");

var _validator2 = _interopRequireDefault(_validator);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeliverAssignment = function (_React$Component) {
    _inherits(DeliverAssignment, _React$Component);

    function DeliverAssignment() {
        _classCallCheck(this, DeliverAssignment);

        var _this = _possibleConstructorReturn(this, (DeliverAssignment.__proto__ || Object.getPrototypeOf(DeliverAssignment)).call(this));

        _this.state = {
            github_url: ''
        };
        return _this;
    }

    _createClass(DeliverAssignment, [{
        key: 'onSend',
        value: function onSend() {
            if (_validator2.default.isURL(this.state.github_url)) {
                if (typeof this.props.onConfirm == 'function') this.props.onConfirm(this.state.github_url);
            } else _index.Notify.error('Please specify a Github URL');
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            if (typeof this.props.onConfirm == 'function') this.props.onConfirm(false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h5',
                    null,
                    'Please specify your repository github url:'
                ),
                _react2.default.createElement(
                    'form',
                    { className: 'form-inline justify-content-center', onSubmit: function onSubmit(e) {
                            return e.preventDefault();
                        } },
                    _react2.default.createElement('input', { type: 'url', style: { width: '400px' },
                        className: 'form-control mr-3',
                        placeholder: 'https://github.com/...',
                        onChange: function onChange(e) {
                            return _this2.setState({ github_url: e.target.value });
                        } }),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-success', type: 'button',
                            onClick: function onClick() {
                                return _this2.onSend();
                            }
                        },
                        'Send'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-light', type: 'button',
                            onClick: function onClick() {
                                return _this2.onCancel();
                            }
                        },
                        'Cancel'
                    )
                )
            );
        }
    }]);

    return DeliverAssignment;
}(_react2.default.Component);

exports.default = DeliverAssignment;

/***/ }),

/***/ "./src/js/components/SplitLayout.jsx":
/*!*******************************************!*\
  !*** ./src/js/components/SplitLayout.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactSplitPane = __webpack_require__(/*! react-split-pane */ "./node_modules/react-split-pane/dist/index.esm.js");

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _auth = __webpack_require__(/*! ../actions/auth */ "./src/js/actions/auth.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _menu = __webpack_require__(/*! ../utils/menu.js */ "./src/js/utils/menu.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitLayout = function (_React$Component) {
    _inherits(SplitLayout, _React$Component);

    function SplitLayout() {
        _classCallCheck(this, SplitLayout);

        var _this = _possibleConstructorReturn(this, (SplitLayout.__proto__ || Object.getPrototypeOf(SplitLayout)).call(this));

        _this.state = {
            currentSize: 200,
            maxSize: 200,
            minSize: 100,
            fixed: false,
            collapsed: false,
            dragging: false,
            duration: 0,
            student: null,
            breakPoint: 70,
            onRootLevel: true
        };
        return _this;
    }

    _createClass(SplitLayout, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var session = _bcReactSession.Session.get();

            var currentPath = (0, _menu.getCurrentPath)();
            var collapsed = currentPath.type ? true : false;
            this.setState({
                student: session.payload,
                collapsed: collapsed,
                currentSize: collapsed ? this.state.minSize : this.state.maxSize
            });
            this.props.history.listen(function (e) {
                var currentPath = (0, _menu.getCurrentPath)();
                var collapsed = currentPath.type ? true : false;
                _this2.setState({
                    collapsed: collapsed,
                    currentSize: collapsed ? _this2.state.minSize : _this2.state.maxSize
                });
            });
        }
    }, {
        key: 'onNavBarSelect',
        value: function onNavBarSelect(option) {
            if (typeof option.size !== 'undefined' && !this.state.collapsed) this.setState({ currentSize: option.size });
            if (option.slug == this.props.baseLevel.slug) this.setState({ onRootLevel: true });else this.setState({ onRootLevel: false });
            if (this.props.onNavBarSelect) this.props.onNavBarSelect(option);
        }
    }, {
        key: 'onSettingsSelect',
        value: function onSettingsSelect(item) {
            switch (item.slug) {
                case "logout":
                    (0, _auth.logout)(this.props.history);break;
                case "profile":
                    this.props.history.push('/profile');break;
                case "choose":
                    this.props.history.push('/choose');break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'layout' },
                _react2.default.createElement(
                    _reactSplitPane2.default,
                    { split: 'vertical',
                        className: 'white-resizer',
                        minSize: this.state.minSize,
                        size: this.state.currentSize
                    },
                    _react2.default.createElement(
                        'div',
                        { style: { height: "100%", padding: '10px 0px 10px 10px' } },
                        _react2.default.createElement(_index.Sidebar, {
                            breadcrumb: this.props.breadcrumb,
                            onSelect: function onSelect(opt) {
                                return _this3.onNavBarSelect(opt);
                            },
                            selectedOption: this.props.selectedOption,
                            menuItems: this.props.menuItems,
                            collapsed: this.state.collapsed
                        }),
                        this.state.onRootLevel ? _react2.default.createElement(
                            'div',
                            { className: "settings-item" + (this.state.collapsed ? ' collapsed' : '') },
                            this.state.student && !this.state.collapsed ? this.state.student.full_name : '',
                            _react2.default.createElement(
                                _index.DropLink,
                                { direction: 'up', dropdown: [{ label: 'Profile', slug: 'profile' }, { label: 'My Courses', slug: 'choose' }, { label: 'Logout', slug: 'logout' }],
                                    onSelect: this.onSettingsSelect.bind(this) },
                                _react2.default.createElement('i', { className: 'fas fa-cog' })
                            )
                        ) : ''
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'app-view', style: { marginLeft: "-5px" } },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return SplitLayout;
}(_react2.default.Component);

SplitLayout.propTypes = {
    // the initial with of the sizebar
    //sidebar menu items
    menuItems: _propTypes2.default.array.isRequired,
    selectedOption: _propTypes2.default.object,
    onNavBarSelect: _propTypes2.default.func
};
SplitLayout.defaultProps = {
    onNavBarSelect: null,
    selectedOption: null
};
exports.default = (0, _reactRouterDom.withRouter)(SplitLayout);

/***/ }),

/***/ "./src/js/components/TimeLineDay.jsx":
/*!*******************************************!*\
  !*** ./src/js/components/TimeLineDay.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeLineDay = function (_React$Component) {
  _inherits(TimeLineDay, _React$Component);

  function TimeLineDay() {
    _classCallCheck(this, TimeLineDay);

    var _this = _possibleConstructorReturn(this, (TimeLineDay.__proto__ || Object.getPrototypeOf(TimeLineDay)).call(this));

    _this.state = {
      top: ''
    };
    return _this;
  }

  _createClass(TimeLineDay, [{
    key: 'toggleSelected',
    value: function toggleSelected() {
      this.props.onClick(this.props.dayNumber);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var timeWrapperStyles = {
        top: this.state.top
      };
      return _react2.default.createElement(
        'li',
        { className: this.props.isSelected ? 'selected' : '', onClick: function onClick() {
            return _this2.toggleSelected();
          } },
        _react2.default.createElement(
          'div',
          { className: "direction-r ", onMouseOver: function onMouseOver(e) {
              var coord = e.target.getBoundingClientRect();
              _this2.setState({
                top: coord.top + 10
              });
            } },
          _react2.default.createElement(
            'div',
            { className: 'flag-wrapper' },
            _react2.default.createElement('span', { className: 'flag-point' }),
            _react2.default.createElement(
              'span',
              { className: 'flag' },
              this.props.label
            ),
            this.props.technologies.length > 0 ? _react2.default.createElement(
              'span',
              { className: 'time-wrapper', style: timeWrapperStyles },
              _react2.default.createElement(
                'span',
                { className: 'time' },
                this.props.technologies.join(', ')
              )
            ) : ''
          ),
          _react2.default.createElement(
            'div',
            { className: 'desc' },
            this.props.description
          )
        )
      );
    }
  }]);

  return TimeLineDay;
}(_react2.default.Component);

TimeLineDay.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  label: _propTypes2.default.string.isRequired,
  technologies: _propTypes2.default.array,
  description: _propTypes2.default.string,
  isSelected: _propTypes2.default.bool
};
TimeLineDay.defaultProps = {
  deph: 1,
  label: '',
  isSelected: false,
  description: "",
  technologies: []
};
exports.default = TimeLineDay;

/***/ }),

/***/ "./src/js/components/menus/SearchMenu.jsx":
/*!************************************************!*\
  !*** ./src/js/components/menus/SearchMenu.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _ContentActions = __webpack_require__(/*! ../../actions/ContentActions */ "./src/js/actions/ContentActions.js");

var _ContentStore = __webpack_require__(/*! ../../stores/ContentStore */ "./src/js/stores/ContentStore.js");

var _ContentStore2 = _interopRequireDefault(_ContentStore);

var _BCStore = __webpack_require__(/*! ../../stores/BCStore */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchMenu = function (_Flux$DashView) {
  _inherits(SearchMenu, _Flux$DashView);

  function SearchMenu() {
    _classCallCheck(this, SearchMenu);

    var _this = _possibleConstructorReturn(this, (SearchMenu.__proto__ || Object.getPrototypeOf(SearchMenu)).call(this));

    _this.state = {
      assets: _ContentStore2.default.getState('assets'),
      days: _BCStore2.default.getSyllabusDays(),
      syllabusContents: [],
      search: ''
    };
    return _this;
  }

  _createClass(SearchMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //loadAssets();
      this.subscribe(_ContentStore2.default, 'assets', function (assets) {
        return _this2.setState({ assets: assets });
      });
      var syllabusContents = [];
      this.state.days.forEach(function (day) {
        syllabusContents = syllabusContents.concat(day.assignments);
        syllabusContents = syllabusContents.concat(day.lessons);
        syllabusContents = syllabusContents.concat(day.quizzes);
      });
      this.setState({ syllabusContents: syllabusContents });
    }
  }, {
    key: "onDropdownSelect",
    value: function onDropdownSelect(actionable, option) {
      switch (option.slug) {
        case "goto":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug);
          break;
        case "vtutorial":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug + '/vtutorial/' + option.vtutorial_slug);
          break;
      }
    }
  }, {
    key: "getTaskMenu",
    value: function getTaskMenu(td) {
      switch (td.type) {
        case "lesson":
          return [{ label: 'Read the lesson', slug: 'goto' }];break;
        case "replit":
          return [{ label: 'Practice on Repl.it', slug: 'goto' }];break;
        case "quiz":
          return [{ label: 'Take the quiz', slug: 'goto' }];break;
        case "assignment":
          return [{ label: 'Read the instructions', slug: 'goto' }];break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var getLabel = function getLabel(type) {
        switch (type) {
          case "assignment":
            return "Code";
          case "lesson":
            return "Read";
          case "quiz":
            return "Answer";
          case "repl":
            return "Practice";
        }
      };

      var lessonsHTML = this.state.syllabusContents.filter(function (l) {
        if (_this3.state.search == '') return true;
        return l.title.toLowerCase().indexOf(_this3.state.search.toLowerCase()) != -1;
      }).map(function (l, i) {
        return _react2.default.createElement(
          "li",
          { className: "actionable", key: i },
          _react2.default.createElement(_index.DropLink, { className: "task-menu", dropdown: _this3.getTaskMenu(l),
            onSelect: function onSelect(option) {
              return _this3.onDropdownSelect(l, option);
            },
            direction: "left"
          }),
          _react2.default.createElement(
            "p",
            { className: "actionable-title" },
            l.title
          ),
          _react2.default.createElement(
            "p",
            { className: "actionable-details" },
            _react2.default.createElement(
              "span",
              { className: "type " + l.type },
              getLabel(l.type)
            ),
            " during ",
            _react2.default.createElement(
              "span",
              { className: "day" },
              l.day.label
            )
          )
        );
      });
      return _react2.default.createElement(
        "div",
        { className: "search-menu with-padding" },
        _react2.default.createElement(
          "p",
          { className: "search-input" },
          _react2.default.createElement("i", { className: "fas fa-search" }),
          _react2.default.createElement("input", { type: "text", className: "form-control", placeholder: "Search any lesson, project, etc.", onChange: function onChange(e) {
              return _this3.setState({ search: e.target.value });
            } })
        ),
        _react2.default.createElement(
          "ul",
          null,
          lessonsHTML
        )
      );
    }
  }]);

  return SearchMenu;
}(_reactFluxDash2.default.DashView);

exports.default = (0, _reactRouterDom.withRouter)(SearchMenu);

/***/ }),

/***/ "./src/js/components/menus/TimeLineMenu.jsx":
/*!**************************************************!*\
  !*** ./src/js/components/menus/TimeLineMenu.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _TimeLineDay = __webpack_require__(/*! ../TimeLineDay.jsx */ "./src/js/components/TimeLineDay.jsx");

var _TimeLineDay2 = _interopRequireDefault(_TimeLineDay);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeLineMenu = function (_React$Component) {
    _inherits(TimeLineMenu, _React$Component);

    function TimeLineMenu() {
        _classCallCheck(this, TimeLineMenu);

        var _this = _possibleConstructorReturn(this, (TimeLineMenu.__proto__ || Object.getPrototypeOf(TimeLineMenu)).call(this));

        _this.state = {
            layout: "one-column",
            side: "left",
            selected: null,
            course: "web-development"
        };
        _this.timeline = null;
        return _this;
    }

    _createClass(TimeLineMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //setInterval(() => this.timeline.scrollTo(0,this.timeline.scrollTop + 5), 100);
            var dayNumber = this.props.match.params.day_number;
            if (typeof dayNumber != 'undefined') {
                this.setState({ selected: dayNumber });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var timelineStyles = {
                // width: (this.state.layout === "one-column") ? "330px" : "660px"
            };
            var aditionalLineClasses = function aditionalLineClasses() {
                return _this2.state.side;
            };
            var days = this.props.data.map(function (day, i) {
                if (typeof day.dayNumber === 'undefined') throw new Error('Days must have a dayNumber property');
                return _react2.default.createElement(_TimeLineDay2.default, { key: i,
                    label: day.label,
                    description: day.description,
                    technologies: day.technologies,
                    isSelected: _this2.state.selected == day.dayNumber,
                    onClick: function onClick() {
                        day.course = _this2.state.course;
                        _this2.setState({ selected: day.dayNumber });
                        _this2.props.onClick(day);
                    } });
            });
            var collapsedClass = this.props.collapsed ? 'collapsed' : '';

            return _react2.default.createElement(
                'div',
                { className: "timeline " + collapsedClass },
                _react2.default.createElement('span', { className: "line " + aditionalLineClasses() }),
                _react2.default.createElement(
                    'ul',
                    { style: timelineStyles,
                        onWheel: function onWheel(e) {
                            _this2.timeline.scrollTo(0, _this2.timeline.scrollTop + e.deltaY);
                        },
                        ref: function ref(elm) {
                            return _this2.timeline = elm;
                        } },
                    days
                )
            );
        }
    }]);

    return TimeLineMenu;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(TimeLineMenu);

/***/ }),

/***/ "./src/js/components/menus/TodoMenu.jsx":
/*!**********************************************!*\
  !*** ./src/js/components/menus/TodoMenu.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _StudentStore = __webpack_require__(/*! ../../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _StudentActions = __webpack_require__(/*! ../../actions/StudentActions */ "./src/js/actions/StudentActions.js");

var _StudentActions2 = _interopRequireDefault(_StudentActions);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoView = function (_Flux$View) {
  _inherits(TodoView, _Flux$View);

  function TodoView() {
    _classCallCheck(this, TodoView);

    var _this = _possibleConstructorReturn(this, (TodoView.__proto__ || Object.getPrototypeOf(TodoView)).call(this));

    _this.state = {
      todos: _StudentStore2.default.getTodos(),
      includeDone: false,
      beingDelivered: null
    };
    _this.bindStore(_StudentStore2.default, 'todos', _this.tasksUpdated.bind(_this));
    _this.projectDeliveredURL = '';
    return _this;
  }

  _createClass(TodoView, [{
    key: "tasksUpdated",
    value: function tasksUpdated() {
      this.setState({
        todos: _StudentStore2.default.getTodos()
      });
    }
  }, {
    key: "updateTask",
    value: function updateTask(task, newValue) {
      if (task.type !== 'assignment') {
        task.status = newValue ? "done" : "pending";
        _StudentActions2.default.updateTask(task);
      } else {
        this.setState({ beingDelivered: task });
      }
    }
  }, {
    key: "deliverAssignment",
    value: function deliverAssignment(task) {
      if (this.projectDeliveredURL !== '') {
        task.status = "done";
        task.github_url = this.projectDeliveredURL;
        _StudentActions2.default.updateTask(task);
      } else {
        _index.NotifyActions.notify('deliver_assignment_error');
      }
    }
  }, {
    key: "getTaskDescription",
    value: function getTaskDescription(td) {
      switch (td.type) {
        case "lesson":
          return 'Read';
          break;
        case "replit":
          return 'Practice';break;
        case "assignment":
          if (td.status == 'pending') return 'Code';else {
            if (td.revision_status == 'pending') return 'Code (pending teacher approval)';else if (td.revision_status == 'approved') return 'Code - (approved by teacher)';else if (td.revision_status == 'rejected') return 'Code - (rejected by teacher)';
          }
          break;
        case "quiz":
          return 'Answer';break;
      }
    }
  }, {
    key: "onDropdownSelect",
    value: function onDropdownSelect(actionable, option) {
      switch (option.slug) {
        case "goto":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug);
          break;
        case "vtutorial":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug + '/vtutorial/' + option.vtutorial_slug);
          break;
      }
    }
  }, {
    key: "getTaskMenu",
    value: function getTaskMenu(td) {
      switch (td.type) {
        case "lesson":
          return [{ label: 'Read the lesson', slug: 'goto' }];break;
        case "replit":
          return [{ label: 'Practice on Repl.it', slug: 'goto' }];break;
        case "quiz":
          return [{ label: 'Take the quiz', slug: 'goto' }];break;
        case "assignment":
          return [{ label: 'Read the instructions', slug: 'goto' }];break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var todoElms = !this.state.todos ? [] : this.state.todos.filter(function (td) {
        return !_this2.state.includeDone ? td.status === 'pending' : true;
      }).map(function (td, i) {

        if (_this2.state.beingDelivered && td.type == _this2.state.beingDelivered.type && _this2.state.beingDelivered.associated_slug === td.associated_slug) {
          return _react2.default.createElement(
            "li",
            { key: i, className: "send-assignment" },
            "Assignments need to uploaded into github before delivering them, click \"deliver\" when you are ready to specify your repository url.",
            _react2.default.createElement(
              "div",
              { className: "btn-bar text-right" },
              _react2.default.createElement(
                "button",
                { className: "btn btn-success mr-2",
                  onClick: function onClick() {
                    return _StudentActions2.default.deliverAssignment(td);
                  } },
                "Deliver"
              ),
              _react2.default.createElement(
                "button",
                { className: "btn btn-danger mr-2",
                  onClick: function onClick() {
                    return _this2.setState({ beingDelivered: null });
                  } },
                "Cancel"
              )
            )
          );
        }

        return _react2.default.createElement(
          "li",
          { key: i },
          _react2.default.createElement(_index.CheckBox, { checked: td.status === 'done', render: function render() {
              return _react2.default.createElement(
                "div",
                { className: "task task-" + td.type },
                _react2.default.createElement(_index.DropLink, { className: "task-menu", dropdown: _this2.getTaskMenu(td),
                  onSelect: function onSelect(option) {
                    return _this2.onDropdownSelect(td, option);
                  },
                  direction: "left"
                }),
                _react2.default.createElement(
                  "p",
                  { className: "task-title" },
                  td.title
                ),
                _react2.default.createElement(
                  "p",
                  { className: "task-description" },
                  _this2.getTaskDescription(td)
                )
              );
            },
            onClick: function onClick(newvalue) {
              return _this2.updateTask(td, newvalue);
            }
          })
        );
      });
      return _react2.default.createElement(
        "div",
        { className: "todo-menu with-padding" },
        _react2.default.createElement(
          "span",
          { className: "show-status" },
          todoElms.length + " " + (!this.state.includeDone ? 'pending' : '') + " tasks..."
        ),
        _react2.default.createElement(
          "a",
          { className: "show-done", href: "#", onClick: function onClick() {
              return _this2.setState({ includeDone: !_this2.state.includeDone });
            } },
          !this.state.includeDone ? 'show done' : 'hide done'
        ),
        todoElms.length === 0 ? _react2.default.createElement(
          "p",
          null,
          "Nothing to do..."
        ) : _react2.default.createElement(
          "ul",
          { className: "todolist" },
          todoElms
        )
      );
    }
  }]);

  return TodoView;
}(_reactFluxDash2.default.View);

exports.default = (0, _reactRouterDom.withRouter)(TodoView);

/***/ }),

/***/ "./src/js/components/react-components/img/bc-icon.png":
/*!************************************************************!*\
  !*** ./src/js/components/react-components/img/bc-icon.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bc-icon.png";

/***/ }),

/***/ "./src/js/components/react-components/src/actionable-item/ActionableItem.jsx":
/*!***********************************************************************************!*\
  !*** ./src/js/components/react-components/src/actionable-item/ActionableItem.jsx ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _droplink = __webpack_require__(/*! ../droplink */ "./src/js/components/react-components/src/droplink/index.js");

var _droplink2 = _interopRequireDefault(_droplink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = ['lesson', 'replit', 'quiz', 'assignment'];

var ActionableItem = function (_React$Component) {
    _inherits(ActionableItem, _React$Component);

    function ActionableItem() {
        _classCallCheck(this, ActionableItem);

        return _possibleConstructorReturn(this, (ActionableItem.__proto__ || Object.getPrototypeOf(ActionableItem)).apply(this, arguments));
    }

    _createClass(ActionableItem, [{
        key: 'onClick',
        value: function onClick() {
            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.props.dropdown.length == 0 || force == true) {
                if (typeof this.props.to !== 'undefined') this.props.history.push(this.props.to);
                if (typeof this.props.onClick !== 'undefined') this.props.onClick();
            }
        }
    }, {
        key: 'componentDidCatch',
        value: function componentDidCatch(error, info) {
            // You can also log the error to an error reporting service
            console.log(error, info);
        }
    }, {
        key: 'prependMessage',
        value: function prependMessage() {
            switch (this.props.type) {
                case "lesson":
                    return "Read:";break;
                case "quiz":
                    return "Answer:";break;
                case "replit":
                    return "Practice:";break;
                case "assignment":
                    return "Code:";break;
                default:
                    return "";break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'li',
                { className: 'actionable-item', onClick: this.onClick.bind(this) },
                this.props.icon ? _react2.default.createElement('i', { className: this.props.icon + " menuicon" }) : '',
                this.prependMessage(),
                _react2.default.createElement(
                    _droplink2.default,
                    { dropdown: this.props.dropdown,
                        onSelect: function onSelect(option) {
                            return _this2.props.onDropdownSelect(option);
                        } },
                    this.props.label
                ),
                this.props.done ? _react2.default.createElement('i', { className: "fas fa-check done" }) : ''
            );
        }
    }]);

    return ActionableItem;
}(_react2.default.Component);

ActionableItem.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    label: _propTypes2.default.string.isRequired,
    dropdown: _propTypes2.default.array,
    isSelected: _propTypes2.default.bool,
    onDropdownSelect: _propTypes2.default.func.isRequired,
    type: _propTypes2.default.oneOf(options)
};
ActionableItem.defaultProps = {
    icon: false,
    dropdown: [],
    done: false
};
exports.default = (0, _reactRouterDom.withRouter)(ActionableItem);

/***/ }),

/***/ "./src/js/components/react-components/src/actionable-item/index.js":
/*!*************************************************************************!*\
  !*** ./src/js/components/react-components/src/actionable-item/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionableItem = __webpack_require__(/*! ./ActionableItem.jsx */ "./src/js/components/react-components/src/actionable-item/ActionableItem.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ActionableItem).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/breadcrumb/BreadCrumb.jsx":
/*!**************************************************************************!*\
  !*** ./src/js/components/react-components/src/breadcrumb/BreadCrumb.jsx ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _bcIcon = __webpack_require__(/*! ../../img/bc-icon.png */ "./src/js/components/react-components/img/bc-icon.png");

var _bcIcon2 = _interopRequireDefault(_bcIcon);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./breadcrumb.scss */ "./src/js/components/react-components/src/breadcrumb/breadcrumb.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BreadCrumb = function (_React$Component) {
    _inherits(BreadCrumb, _React$Component);

    function BreadCrumb() {
        _classCallCheck(this, BreadCrumb);

        return _possibleConstructorReturn(this, (BreadCrumb.__proto__ || Object.getPrototypeOf(BreadCrumb)).apply(this, arguments));
    }

    _createClass(BreadCrumb, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.collapsed) return _react2.default.createElement(
                'ul',
                { className: 'breadcrumb' },
                _react2.default.createElement(
                    'li',
                    { onClick: function onClick() {
                            return _this2.props.history.push(_this2.props.levels[0].path);
                        } },
                    _react2.default.createElement('img', { className: 'logo', src: "/static/" + _bcIcon2.default })
                )
            );

            var DOMPieces = this.props.levels.map(function (level, i) {
                return _react2.default.createElement(
                    'li',
                    { key: i, onClick: function onClick() {
                            return _this2.props.history.push(level.path);
                        } },
                    level.label
                );
            });
            return _react2.default.createElement(
                'ul',
                { className: 'breadcrumb' },
                DOMPieces
            );
        }
    }]);

    return BreadCrumb;
}(_react2.default.Component);

BreadCrumb.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    onClick: _propTypes2.default.func,
    mobile: _propTypes2.default.bool,
    levels: _propTypes2.default.array.isRequired
};
BreadCrumb.defaultProps = {
    mobile: false,
    levels: []
};
exports.default = (0, _reactRouterDom.withRouter)(BreadCrumb);

/***/ }),

/***/ "./src/js/components/react-components/src/breadcrumb/breadcrumb.scss":
/*!***************************************************************************!*\
  !*** ./src/js/components/react-components/src/breadcrumb/breadcrumb.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./breadcrumb.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/breadcrumb/breadcrumb.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/breadcrumb/index.js":
/*!********************************************************************!*\
  !*** ./src/js/components/react-components/src/breadcrumb/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BreadCrumb = __webpack_require__(/*! ./BreadCrumb.jsx */ "./src/js/components/react-components/src/breadcrumb/BreadCrumb.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BreadCrumb).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/button/Button.jsx":
/*!******************************************************************!*\
  !*** ./src/js/components/react-components/src/button/Button.jsx ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./button.scss */ "./src/js/components/react-components/src/button/button.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

        _this.state = {
            checked: "checked"
        };
        return _this;
    }

    _createClass(Button, [{
        key: 'buttonType',
        value: function buttonType() {
            switch (this.props.type) {
                case "light":
                    return "btn btn-light";break;
                default:
                    return "btn btn-light";break;
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'button',
                { className: "bcbutton " + this.buttonType(), onClick: this.props.onClick.bind(this) },
                _react2.default.createElement('i', { className: this.props.icon + " btnicon" }),
                ' ',
                this.props.label
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

exports.default = Button;

/***/ }),

/***/ "./src/js/components/react-components/src/button/button.scss":
/*!*******************************************************************!*\
  !*** ./src/js/components/react-components/src/button/button.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./button.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/button/button.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/button/index.js":
/*!****************************************************************!*\
  !*** ./src/js/components/react-components/src/button/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Button = __webpack_require__(/*! ./Button.jsx */ "./src/js/components/react-components/src/button/Button.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Button).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/checkbox/CheckBox.jsx":
/*!**********************************************************************!*\
  !*** ./src/js/components/react-components/src/checkbox/CheckBox.jsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _fontawesome = __webpack_require__(/*! @fortawesome/fontawesome */ "./node_modules/@fortawesome/fontawesome/index.es.js");

var _fontawesome2 = _interopRequireDefault(_fontawesome);

var _faCheckSquare = __webpack_require__(/*! @fortawesome/fontawesome-free-regular/faCheckSquare */ "./node_modules/@fortawesome/fontawesome-free-regular/faCheckSquare.js");

var _faCheckSquare2 = _interopRequireDefault(_faCheckSquare);

var _faSquare = __webpack_require__(/*! @fortawesome/fontawesome-free-regular/faSquare */ "./node_modules/@fortawesome/fontawesome-free-regular/faSquare.js");

var _faSquare2 = _interopRequireDefault(_faSquare);

__webpack_require__(/*! ./checkbox.scss */ "./src/js/components/react-components/src/checkbox/checkbox.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_fontawesome2.default.library.add(_faCheckSquare2.default);
_fontawesome2.default.library.add(_faSquare2.default);

var CheckBox = function (_React$Component) {
    _inherits(CheckBox, _React$Component);

    function CheckBox() {
        _classCallCheck(this, CheckBox);

        var _this = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this));

        _this.state = {
            checked: false
        };
        return _this;
    }

    _createClass(CheckBox, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            if (this.state.checked !== this.props.checked) this.setState({ checked: this.props.checked });
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            this.setState({
                checked: !this.state.checked
            });
            if (this.props.onClick) this.props.onClick(!this.state.checked);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var notchecked = !this.state.checked ? "d-none" : "";
            var checked = this.state.checked ? "d-none" : "";
            var Render = this.props.render;
            return _react2.default.createElement(
                'div',
                { className: 'checkbox' },
                _react2.default.createElement(
                    'span',
                    { className: notchecked, onClick: function onClick() {
                            return _this2.onClick();
                        } },
                    _react2.default.createElement('i', { className: 'far fa-check-square' })
                ),
                _react2.default.createElement(
                    'span',
                    { className: checked, onClick: function onClick() {
                            return _this2.onClick();
                        } },
                    _react2.default.createElement('i', { className: 'far fa-square' })
                ),
                Render ? _react2.default.createElement(Render, null) : _react2.default.createElement(
                    'label',
                    { htmlFor: 'checkbox' },
                    this.props.label
                )
            );
        }
    }]);

    return CheckBox;
}(_react2.default.Component);

CheckBox.propTypes = {
    //you can pass your own component to render the to-do
    render: _propTypes2.default.func,
    //what happends on click
    onClick: _propTypes2.default.func,
    checked: _propTypes2.default.bool,
    label: _propTypes2.default.string
};
CheckBox.defaultProps = {
    label: '<No label defined>',
    checked: false,
    render: null
};
exports.default = (0, _reactRouterDom.withRouter)(CheckBox);

/***/ }),

/***/ "./src/js/components/react-components/src/checkbox/checkbox.scss":
/*!***********************************************************************!*\
  !*** ./src/js/components/react-components/src/checkbox/checkbox.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./checkbox.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/checkbox/checkbox.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/checkbox/index.js":
/*!******************************************************************!*\
  !*** ./src/js/components/react-components/src/checkbox/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CheckBox = __webpack_require__(/*! ./CheckBox.jsx */ "./src/js/components/react-components/src/checkbox/CheckBox.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CheckBox).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/droplink/DropLink.jsx":
/*!**********************************************************************!*\
  !*** ./src/js/components/react-components/src/droplink/DropLink.jsx ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./droplink.scss */ "./src/js/components/react-components/src/droplink/droplink.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropLink = function (_React$Component) {
    _inherits(DropLink, _React$Component);

    function DropLink() {
        _classCallCheck(this, DropLink);

        var _this = _possibleConstructorReturn(this, (DropLink.__proto__ || Object.getPrototypeOf(DropLink)).call(this));

        _this.state = {
            opened: false
        };
        _this.beingHovered = false;
        _this.dropdown = null;
        return _this;
    }

    _createClass(DropLink, [{
        key: 'buttonType',
        value: function buttonType() {
            switch (this.props.type) {
                case "light":
                    return "btn btn-light";break;
                default:
                    return "btn btn-light";break;
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            this.setState({ opened: !this.state.opened });
            e.preventDefault();
            return false;
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut() {
            var _this2 = this;

            this.beingHovered = false;
            if (this.state.opened) setTimeout(function () {
                if (!_this2.beingHovered) _this2.setState({ opened: false });
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var styles = {
                marginLeft: this.dropdown ? "-" + this.dropdown.with : '0'
            };
            var menuOptions = this.props.dropdown.map(function (opt, i) {
                return _react2.default.createElement(
                    'a',
                    { key: i, className: 'dropdown-item', onClick: function onClick() {
                            return _this3.props.onSelect(opt);
                        } },
                    opt.label
                );
            });
            return _react2.default.createElement(
                'div',
                { className: "bcdroplink dropdown " + this.props.className + (this.state.opened ? ' show' : '') },
                _react2.default.createElement(
                    'a',
                    { className: 'btn dropdown-toggle',
                        'data-toggle': 'dropdown', onClick: function onClick(e) {
                            return _this3.onClick(e);
                        }
                    },
                    this.props.children
                ),
                this.props.dropdown.length > 0 && this.state.opened ? _react2.default.createElement(
                    'div',
                    { ref: function ref(c) {
                            return _this3.dropdown = c;
                        },
                        style: styles,
                        className: "dropdown-menu " + this.props.direction + (this.state.opened ? ' show' : ''),
                        onMouseOut: this.onMouseOut.bind(this),
                        onMouseOver: function onMouseOver() {
                            return _this3.beingHovered = true;
                        } },
                    menuOptions
                ) : ''
            );
        }
    }]);

    return DropLink;
}(_react2.default.Component);

DropLink.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    dropdown: _propTypes2.default.array,
    className: _propTypes2.default.string,
    onSelect: _propTypes2.default.func.isRequired,
    direction: _propTypes2.default.string
};
DropLink.defaultProps = {
    dropdown: [],
    className: '',
    direction: 'down'
};
exports.default = (0, _reactRouterDom.withRouter)(DropLink);

/***/ }),

/***/ "./src/js/components/react-components/src/droplink/droplink.scss":
/*!***********************************************************************!*\
  !*** ./src/js/components/react-components/src/droplink/droplink.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./droplink.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/droplink/droplink.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/droplink/index.js":
/*!******************************************************************!*\
  !*** ./src/js/components/react-components/src/droplink/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DropLink = __webpack_require__(/*! ./DropLink.jsx */ "./src/js/components/react-components/src/droplink/DropLink.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DropLink).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/index.js":
/*!*********************************************************!*\
  !*** ./src/js/components/react-components/src/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionableItem = exports.ActionableItem = __webpack_require__(/*! ./actionable-item */ "./src/js/components/react-components/src/actionable-item/index.js").default;
var BreadCrumb = exports.BreadCrumb = __webpack_require__(/*! ./breadcrumb */ "./src/js/components/react-components/src/breadcrumb/index.js").default;
var Button = exports.Button = __webpack_require__(/*! ./button */ "./src/js/components/react-components/src/button/index.js").default;
var CheckBox = exports.CheckBox = __webpack_require__(/*! ./checkbox */ "./src/js/components/react-components/src/checkbox/index.js").default;
var DropLink = exports.DropLink = __webpack_require__(/*! ./droplink */ "./src/js/components/react-components/src/droplink/index.js").default;
var List = exports.List = __webpack_require__(/*! ./list */ "./src/js/components/react-components/src/list/index.js").default;
var Loading = exports.Loading = __webpack_require__(/*! ./loading */ "./src/js/components/react-components/src/loading/index.js").default;
var Panel = exports.Panel = __webpack_require__(/*! ./panel */ "./src/js/components/react-components/src/panel/index.js").default;
var Sidebar = exports.Sidebar = __webpack_require__(/*! ./sidebar */ "./src/js/components/react-components/src/sidebar/index.js").default;
var ProgressKPI = exports.ProgressKPI = __webpack_require__(/*! ./kpi-progress */ "./src/js/components/react-components/src/kpi-progress/index.js").default;
var MenuItem = exports.MenuItem = __webpack_require__(/*! ./menu-item */ "./src/js/components/react-components/src/menu-item/index.js").default;
var Modal = exports.Modal = __webpack_require__(/*! ./modal */ "./src/js/components/react-components/src/modal/index.js").default;
var PanelNavbar = exports.PanelNavbar = __webpack_require__(/*! ./panel-navbar */ "./src/js/components/react-components/src/panel-navbar/index.js").default;
var Theme = exports.Theme = __webpack_require__(/*! ./theme */ "./src/js/components/react-components/src/theme/index.js").default;

var Forgot = exports.Forgot = __webpack_require__(/*! ./login/Forgot.jsx */ "./src/js/components/react-components/src/login/Forgot.jsx").default;
var Login = exports.Login = __webpack_require__(/*! ./login */ "./src/js/components/react-components/src/login/index.js").default;

var UserError = exports.UserError = function (_Error) {
  _inherits(UserError, _Error);

  function UserError() {
    _classCallCheck(this, UserError);

    return _possibleConstructorReturn(this, (UserError.__proto__ || Object.getPrototypeOf(UserError)).apply(this, arguments));
  }

  return UserError;
}(Error);

/***/ }),

/***/ "./src/js/components/react-components/src/kpi-progress/KPIProgress.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/components/react-components/src/kpi-progress/KPIProgress.jsx ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./kpi-progress.scss */ "./src/js/components/react-components/src/kpi-progress/kpi-progress.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KPIProgress = function (_React$Component) {
    _inherits(KPIProgress, _React$Component);

    function KPIProgress() {
        _classCallCheck(this, KPIProgress);

        return _possibleConstructorReturn(this, (KPIProgress.__proto__ || Object.getPrototypeOf(KPIProgress)).apply(this, arguments));
    }

    _createClass(KPIProgress, [{
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'bcprogress', 'data-progress': this.props.progress },
                _react2.default.createElement(
                    'div',
                    { className: 'ko-circle' },
                    _react2.default.createElement(
                        'div',
                        { className: 'full ko-progress-circle__slice' },
                        _react2.default.createElement('div', { className: 'ko-progress-circle__fill' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'ko-progress-circle__slice' },
                        _react2.default.createElement('div', { className: 'ko-progress-circle__fill' }),
                        _react2.default.createElement('div', { className: 'ko-progress-circle__fill ko-progress-circle__bar' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ko-progress-circle__overlay' },
                    this.props.progress,
                    '%'
                )
            );
        }
    }]);

    return KPIProgress;
}(_react2.default.Component);

KPIProgress.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    progress: _propTypes2.default.number.isRequired
};
KPIProgress.defaultProps = {
    progress: 0
};
exports.default = KPIProgress;

/***/ }),

/***/ "./src/js/components/react-components/src/kpi-progress/index.js":
/*!**********************************************************************!*\
  !*** ./src/js/components/react-components/src/kpi-progress/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KPIProgress = __webpack_require__(/*! ./KPIProgress.jsx */ "./src/js/components/react-components/src/kpi-progress/KPIProgress.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_KPIProgress).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/kpi-progress/kpi-progress.scss":
/*!*******************************************************************************!*\
  !*** ./src/js/components/react-components/src/kpi-progress/kpi-progress.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./kpi-progress.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/kpi-progress/kpi-progress.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/list/List.jsx":
/*!**************************************************************!*\
  !*** ./src/js/components/react-components/src/list/List.jsx ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./list.scss */ "./src/js/components/react-components/src/list/list.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'render',
    value: function render() {
      if (this.props.ordered) return _react2.default.createElement(
        'ol',
        { className: "bclist " + this.props.className },
        this.props.children
      );else return _react2.default.createElement(
        'ul',
        { className: "bclist " + this.props.className },
        this.props.children
      );
    }
  }]);

  return List;
}(_react2.default.Component);

List.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  className: _propTypes2.default.string,
  ordered: _propTypes2.default.bool
};
List.defaultProps = {
  className: '',
  ordered: false
};
exports.default = List;

/***/ }),

/***/ "./src/js/components/react-components/src/list/index.js":
/*!**************************************************************!*\
  !*** ./src/js/components/react-components/src/list/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = __webpack_require__(/*! ./List.jsx */ "./src/js/components/react-components/src/list/List.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_List).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/list/list.scss":
/*!***************************************************************!*\
  !*** ./src/js/components/react-components/src/list/list.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./list.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/list/list.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/loading/Loading.jsx":
/*!********************************************************************!*\
  !*** ./src/js/components/react-components/src/loading/Loading.jsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./loading.scss */ "./src/js/components/react-components/src/loading/loading.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_React$Component) {
    _inherits(Loading, _React$Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            if (!this.props.show) return null;
            return _react2.default.createElement(
                'div',
                { className: 'loading' },
                _react2.default.createElement('i', { className: 'fas fa-spinner' })
            );
        }
    }]);

    return Loading;
}(_react2.default.Component);

Loading.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    show: _propTypes2.default.bool
};
Loading.defaultProps = {
    show: false
};
exports.default = Loading;

/***/ }),

/***/ "./src/js/components/react-components/src/loading/index.js":
/*!*****************************************************************!*\
  !*** ./src/js/components/react-components/src/loading/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Loading = __webpack_require__(/*! ./Loading.jsx */ "./src/js/components/react-components/src/loading/Loading.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Loading).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/loading/loading.scss":
/*!*********************************************************************!*\
  !*** ./src/js/components/react-components/src/loading/loading.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./loading.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/loading/loading.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/login/Forgot.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/components/react-components/src/login/Forgot.jsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");

var _validator2 = _interopRequireDefault(_validator);

var _bcIcon = __webpack_require__(/*! ../../img/bc-icon.png */ "./src/js/components/react-components/img/bc-icon.png");

var _bcIcon2 = _interopRequireDefault(_bcIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Forgot = function (_React$Component) {
  _inherits(Forgot, _React$Component);

  function Forgot() {
    _classCallCheck(this, Forgot);

    var _this = _possibleConstructorReturn(this, (Forgot.__proto__ || Object.getPrototypeOf(Forgot)).call(this));

    _this.state = {
      errorMsg: [],
      successMsg: null,
      pending: false
    };
    _this.email = '';
    return _this;
  }

  _createClass(Forgot, [{
    key: "formSubmit",
    value: function formSubmit(e) {
      var _this2 = this;

      var errors = this.validateForm();
      if (!errors) {
        this.setState({ errorMsg: [], successMsg: null, pending: true });
        this.props.onSubmit(this.email).then(function () {
          _this2.setState({
            pending: false,
            successMsg: "Check your email for instructions, if you don't receive th email check your spam folder"
          });
        }).catch(function (errorMsg) {
          _this2.setState({ errorMsg: [errorMsg.message] || [errorMsg], pending: false });
        });
      } else this.setState({ errorMsg: errors, pending: false });

      e.preventDefault();
      return false;
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var errors = [];
      if (!_validator2.default.isEmail(this.email)) errors.push('Invalid email');

      return errors.length === 0 ? false : errors;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var errors = this.state.errorMsg.map(function (msg, i) {
        return _react2.default.createElement(
          "li",
          { key: i },
          msg
        );
      });
      return _react2.default.createElement(
        "div",
        { className: "container" },
        _react2.default.createElement(
          "div",
          { className: "form-signin text-center" },
          _react2.default.createElement("img", { src: "/static/" + _bcIcon2.default }),
          _react2.default.createElement(
            "h2",
            { className: "form-signin-heading" },
            "What's your account email?"
          ),
          _react2.default.createElement(
            "form",
            { action: "#", onSubmit: function onSubmit(e) {
                return _this3.formSubmit(e);
              } },
            errors.length > 0 ? _react2.default.createElement(
              "div",
              { className: "alert alert-danger" },
              _react2.default.createElement(
                "ul",
                null,
                errors
              )
            ) : '',
            this.state.successMsg ? _react2.default.createElement(
              "div",
              { className: "alert alert-success" },
              _react2.default.createElement(
                "ul",
                null,
                this.state.successMsg
              )
            ) : '',
            _react2.default.createElement(
              "label",
              { htmlFor: "inputEmail", className: "sr-only" },
              "What's your account email?"
            ),
            _react2.default.createElement("input", { type: "email", id: "inputEmail", className: "form-control mb-3 mt-3", placeholder: "Your account email", required: true, autoFocus: true,
              onChange: function onChange(e) {
                return _this3.email = e.target.value;
              }
            }),
            !this.state.pending ? _react2.default.createElement(
              "button",
              { className: "btn btn-lg btn-primary btn-block", type: "submit" },
              "Confirm email"
            ) : _react2.default.createElement(
              "button",
              { className: "btn btn-lg btn-secondary btn-block", type: "button", disabled: this.state.pending },
              "Loading..."
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: "text-center", to: "/login" },
              "or back to login"
            )
          )
        )
      );
    }
  }]);

  return Forgot;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(Forgot);

/***/ }),

/***/ "./src/js/components/react-components/src/login/Login.jsx":
/*!****************************************************************!*\
  !*** ./src/js/components/react-components/src/login/Login.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");

var _validator2 = _interopRequireDefault(_validator);

var _bcIcon = __webpack_require__(/*! ../../img/bc-icon.png */ "./src/js/components/react-components/img/bc-icon.png");

var _bcIcon2 = _interopRequireDefault(_bcIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

    _this.state = {
      errorMsg: [],
      pending: false
    };
    _this.username = '';
    _this.password = '';
    return _this;
  }

  _createClass(Login, [{
    key: "login",
    value: function login(e) {
      var _this2 = this;

      var errors = this.validateForm();

      if (!errors) {
        this.setState({ errorMsg: [], pending: true });
        this.props.onSubmit(this.username, this.password, this.props.history).catch(function (errorMsg) {
          _this2.setState({ errorMsg: [errorMsg.message] || [errorMsg], pending: false });
        });
      } else this.setState({ errorMsg: errors, pending: false });

      e.preventDefault();
      return false;
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var errors = [];
      if (!_validator2.default.isEmail(this.username)) errors.push('Invalid email');
      if (_validator2.default.isEmpty(this.password)) errors.push('Password cannot be empty');

      return errors.length === 0 ? false : errors;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var errors = this.state.errorMsg.map(function (msg, i) {
        return _react2.default.createElement(
          "li",
          { key: i },
          msg
        );
      });
      return _react2.default.createElement(
        "div",
        { className: "container" },
        _react2.default.createElement(
          "div",
          { className: "form-signin text-center" },
          _react2.default.createElement("img", { src: "/static/" + _bcIcon2.default }),
          _react2.default.createElement(
            "small",
            { className: "text-center d-block" },
            "[",
            "student",
            "]"
          ),
          _react2.default.createElement(
            "h2",
            { className: "form-signin-heading mt-5" },
            "Please sign in"
          ),
          _react2.default.createElement(
            "form",
            { action: "#", onSubmit: function onSubmit(e) {
                return _this3.login(e);
              } },
            errors.length > 0 ? _react2.default.createElement(
              "div",
              { className: "alert alert-danger" },
              _react2.default.createElement(
                "ul",
                null,
                errors
              )
            ) : '',
            _react2.default.createElement(
              "label",
              { htmlFor: "inputEmail", className: "sr-only" },
              "Email address"
            ),
            _react2.default.createElement("input", { type: "email", id: "inputEmail", className: "form-control", placeholder: "Email address", required: true, autoFocus: true,
              onChange: function onChange(e) {
                return _this3.username = e.target.value;
              }
            }),
            _react2.default.createElement(
              "label",
              { htmlFor: "inputPassword", className: "sr-only" },
              "Password"
            ),
            _react2.default.createElement("input", { type: "password", id: "inputPassword", className: "form-control", placeholder: "Password", required: true,
              onChange: function onChange(e) {
                return _this3.password = e.target.value;
              }
            }),
            !this.state.pending ? _react2.default.createElement(
              "button",
              { className: "btn btn-lg btn-primary btn-block", type: "submit" },
              "Sign in"
            ) : _react2.default.createElement(
              "button",
              { className: "btn btn-lg btn-secondary btn-block", type: "button", disabled: this.state.pending },
              "Loading..."
            ),
            _react2.default.createElement(
              "div",
              { className: "checkbox" },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: "/forgot" },
                "Forgot Password"
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(Login);

/***/ }),

/***/ "./src/js/components/react-components/src/login/index.js":
/*!***************************************************************!*\
  !*** ./src/js/components/react-components/src/login/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Login = __webpack_require__(/*! ./Login.jsx */ "./src/js/components/react-components/src/login/Login.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Login).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/menu-item/MenuItem.jsx":
/*!***********************************************************************!*\
  !*** ./src/js/components/react-components/src/menu-item/MenuItem.jsx ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_React$Component) {
    _inherits(MenuItem, _React$Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this));

        _this.state = {
            mobile: false
        };
        return _this;
    }

    _createClass(MenuItem, [{
        key: 'onClick',
        value: function onClick() {
            if (this.props.to) this.props.history.push(this.props.to);
            if (this.props.onClick) this.props.onClick();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'li',
                { onClick: this.onClick.bind(this), className: this.props.collapsed ? 'collapsed' : '' },
                _react2.default.createElement('i', { id: this.props.slug, className: this.props.icon + " menuicon" }),
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.label
                )
            );
        }
    }]);

    return MenuItem;
}(_react2.default.Component);

MenuItem.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    mobile: _propTypes2.default.bool,
    label: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.string,
    to: _propTypes2.default.string,
    onClick: _propTypes2.default.func.isRequired
};
MenuItem.defaultProps = {
    icon: '',
    onClick: null,
    to: null,
    mobile: false
};
exports.default = (0, _reactRouterDom.withRouter)(MenuItem);

/***/ }),

/***/ "./src/js/components/react-components/src/menu-item/index.js":
/*!*******************************************************************!*\
  !*** ./src/js/components/react-components/src/menu-item/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MenuItem = __webpack_require__(/*! ./MenuItem.jsx */ "./src/js/components/react-components/src/menu-item/MenuItem.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MenuItem).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/modal/Modal.jsx":
/*!****************************************************************!*\
  !*** ./src/js/components/react-components/src/modal/Modal.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'bcmodal modal', tabIndex: '-1', role: 'dialog', style: {
                        display: this.props.show ? 'block' : 'none'
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog', role: 'document' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2.default.createElement(
                                'h5',
                                { className: 'modal-title' },
                                this.props.title
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body' },
                            this.props.children
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-primary',
                                    onClick: function onClick() {
                                        return _this2.props.onSave();
                                    }
                                },
                                'Save changes'
                            ),
                            this.props.onCancel ? _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal',
                                    onClick: function onClick() {
                                        return _this2.props.onCancel();
                                    }
                                },
                                'Close'
                            ) : ''
                        )
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react2.default.Component);

Modal.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    show: _propTypes2.default.bool,
    title: _propTypes2.default.string,
    onCancel: _propTypes2.default.func
};
Modal.defaultProps = {
    show: true,
    title: '',
    onCancel: null
};
exports.default = Modal;

/***/ }),

/***/ "./src/js/components/react-components/src/modal/index.js":
/*!***************************************************************!*\
  !*** ./src/js/components/react-components/src/modal/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(/*! ./Modal.jsx */ "./src/js/components/react-components/src/modal/Modal.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Modal).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/panel-navbar/PanelNavbar.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/components/react-components/src/panel-navbar/PanelNavbar.jsx ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

__webpack_require__(/*! ./panel-navbar.scss */ "./src/js/components/react-components/src/panel-navbar/panel-navbar.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelNavbar = function PanelNavbar(_ref) {
  var day = _ref.day,
      previous = _ref.previous,
      next = _ref.next,
      current = _ref.current,
      match = _ref.match,
      collapsed = _ref.collapsed,
      _onClick = _ref.onClick,
      onCollapse = _ref.onCollapse;

  var styles = {
    height: collapsed ? "7px" : "initial",
    overflow: collapsed ? "hidden" : "initial"
  };
  return _react2.default.createElement(
    'div',
    { className: 'panel-navbar' },
    _react2.default.createElement(
      'nav',
      { className: 'nav', style: styles },
      _react2.default.createElement(
        'div',
        { className: 'btn-container mr-auto' },
        previous ? _react2.default.createElement(
          'button',
          { className: 'btn btn-light text-right', onClick: function onClick() {
              return _onClick(previous);
            } },
          _react2.default.createElement(
            'p',
            { className: 'm-0' },
            _react2.default.createElement(
              'small',
              null,
              'Previous'
            )
          ),
          _react2.default.createElement('i', { className: 'fas fa-arrow-left' }),
          '\xA0',
          previous.title
        ) : ''
      ),
      day ? _react2.default.createElement(
        'div',
        { className: 'mx-auto text-center' },
        _react2.default.createElement(
          'p',
          { className: 'mt-2 mb-0' },
          current.title
        ),
        _react2.default.createElement(
          'p',
          { className: 'day-label' },
          day.label
        )
      ) : '',
      _react2.default.createElement(
        'div',
        { className: 'ml-auto btn-container' },
        next ? _react2.default.createElement(
          'button',
          { className: 'btn btn-light text-left', onClick: function onClick() {
              return _onClick(next);
            } },
          _react2.default.createElement(
            'p',
            { className: 'm-0' },
            _react2.default.createElement(
              'small',
              null,
              'Up Next:'
            )
          ),
          next.title,
          ' \xA0',
          _react2.default.createElement('i', { className: 'fas fa-arrow-right' })
        ) : ''
      )
    ),
    _react2.default.createElement(
      'button',
      { className: 'btn-collapse', onClick: function onClick() {
          return onCollapse();
        } },
      collapsed ? _react2.default.createElement('i', { className: 'fas fa-angle-double-down' }) : _react2.default.createElement('i', { className: 'fas fa-angle-double-up' })
    )
  );
};
PanelNavbar.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: _propTypes2.default.func,
  onCollapse: _propTypes2.default.func,
  previous: _propTypes2.default.object,
  next: _propTypes2.default.object,
  collapsed: _propTypes2.default.bool,
  current: _propTypes2.default.object,
  className: _propTypes2.default.string
};
PanelNavbar.defaultProps = {
  previous: null,
  current: null,
  next: null,
  collapsed: false,
  className: ''
};
exports.default = (0, _reactRouterDom.withRouter)(PanelNavbar);

/***/ }),

/***/ "./src/js/components/react-components/src/panel-navbar/index.js":
/*!**********************************************************************!*\
  !*** ./src/js/components/react-components/src/panel-navbar/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PanelNavbar = __webpack_require__(/*! ./PanelNavbar.jsx */ "./src/js/components/react-components/src/panel-navbar/PanelNavbar.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PanelNavbar).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/panel-navbar/panel-navbar.scss":
/*!*******************************************************************************!*\
  !*** ./src/js/components/react-components/src/panel-navbar/panel-navbar.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./panel-navbar.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel-navbar/panel-navbar.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/panel/Panel.jsx":
/*!****************************************************************!*\
  !*** ./src/js/components/react-components/src/panel/Panel.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./panel.scss */ "./src/js/components/react-components/src/panel/panel.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_React$Component) {
    _inherits(Panel, _React$Component);

    function Panel() {
        _classCallCheck(this, Panel);

        return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
    }

    _createClass(Panel, [{
        key: 'render',
        value: function render() {
            var padding = this.props.padding === false ? "p-0" : '';
            return _react2.default.createElement(
                'div',
                { className: padding + " panel deph-" + this.props.deph + " " + this.props.className,
                    style: this.props.style },
                this.props.children
            );
        }
    }]);

    return Panel;
}(_react2.default.Component);

Panel.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    deph: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    padding: _propTypes2.default.bool
};
Panel.defaultProps = {
    deph: 1,
    style: null,
    padding: null,
    className: ''
};
exports.default = Panel;

/***/ }),

/***/ "./src/js/components/react-components/src/panel/index.js":
/*!***************************************************************!*\
  !*** ./src/js/components/react-components/src/panel/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Panel = __webpack_require__(/*! ./Panel.jsx */ "./src/js/components/react-components/src/panel/Panel.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Panel).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/panel/panel.scss":
/*!*****************************************************************!*\
  !*** ./src/js/components/react-components/src/panel/panel.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./panel.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/panel/panel.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/sidebar/Sidebar.jsx":
/*!********************************************************************!*\
  !*** ./src/js/components/react-components/src/sidebar/Sidebar.jsx ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _breadcrumb = __webpack_require__(/*! ../breadcrumb */ "./src/js/components/react-components/src/breadcrumb/index.js");

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _menuItem = __webpack_require__(/*! ../menu-item */ "./src/js/components/react-components/src/menu-item/index.js");

var _menuItem2 = _interopRequireDefault(_menuItem);

__webpack_require__(/*! ./sidebar.scss */ "./src/js/components/react-components/src/sidebar/sidebar.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function Menu(props) {
    var htmlItems = props.items.map(function (item, i) {
        return _react2.default.createElement(_menuItem2.default, { key: i,
            icon: item.icon,
            label: item.label,
            slug: item.slug,
            collapsed: props.collapsed,
            onClick: function onClick() {
                return props.onClick(item);
            }
        });
    });

    return _react2.default.createElement(
        'div',
        { className: 'main-menu' },
        _react2.default.createElement(
            'ul',
            null,
            htmlItems
        )
    );
};

var Sidebar = function Sidebar(props) {

    if (!props.selectedOption) return _react2.default.createElement(
        'small',
        null,
        'No option recognized'
    );

    var collapsedClass = props.collapsed ? 'collapsed' : '';
    var MenuComponent = props.selectedOption.component ? props.selectedOption.component : Menu;
    return _react2.default.createElement(
        'div',
        { className: "navbar bc-sidebar " + collapsedClass },
        _react2.default.createElement(
            'h2',
            null,
            _react2.default.createElement(_breadcrumb2.default, {
                levels: props.breadcrumb,
                onClick: function onClick(option) {
                    return props.onSelect(option);
                },
                collapsed: props.collapsed
            })
        ),
        MenuComponent ? _react2.default.createElement(MenuComponent, {
            collapsed: props.collapsed,
            onClick: function onClick(option) {
                return props.onSelect(option);
            },
            items: props.selectedOption ? props.selectedOption.items : null,
            data: props.selectedOption ? props.selectedOption.data : null
        }) : ''
    );
};
Sidebar.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    onSelect: _propTypes2.default.func.isRequired,
    onToggle: _propTypes2.default.func,
    menuItems: _propTypes2.default.array.isRequired
};
Sidebar.defaultProps = {
    onToggle: null
};
exports.default = (0, _reactRouterDom.withRouter)(Sidebar);

/***/ }),

/***/ "./src/js/components/react-components/src/sidebar/index.js":
/*!*****************************************************************!*\
  !*** ./src/js/components/react-components/src/sidebar/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sidebar = __webpack_require__(/*! ./Sidebar.jsx */ "./src/js/components/react-components/src/sidebar/Sidebar.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sidebar).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/sidebar/sidebar.scss":
/*!*********************************************************************!*\
  !*** ./src/js/components/react-components/src/sidebar/sidebar.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./sidebar.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/sidebar/sidebar.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/components/react-components/src/theme/Theme.jsx":
/*!****************************************************************!*\
  !*** ./src/js/components/react-components/src/theme/Theme.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(/*! ./theme.scss */ "./src/js/components/react-components/src/theme/theme.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Theme = function Theme(_ref) {
    var children = _ref.children;

    return _react2.default.createElement(
        'div',
        { className: 'theme' },
        children
    );
};
Theme.propTypes = {
    children: _propTypes2.default.array.isRequired
};

var _Context = _react2.default.createContext({
    bar: {}
});
exports.default = {
    Theme: Theme,
    Provider: _Context.Provider,
    Consumer: _Context.Consumer
};

/***/ }),

/***/ "./src/js/components/react-components/src/theme/index.js":
/*!***************************************************************!*\
  !*** ./src/js/components/react-components/src/theme/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Theme = __webpack_require__(/*! ./Theme.jsx */ "./src/js/components/react-components/src/theme/Theme.jsx");

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Theme).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/js/components/react-components/src/theme/theme.scss":
/*!*****************************************************************!*\
  !*** ./src/js/components/react-components/src/theme/theme.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader!../../../../../../node_modules/sass-loader/lib/loader.js!./theme.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/js/components/react-components/src/theme/theme.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ravenJs = __webpack_require__(/*! raven-js */ "./node_modules/raven-js/src/singleton.js");

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");

__webpack_require__(/*! ./utils/icons */ "./src/js/utils/icons.js");

var _Layout = __webpack_require__(/*! ./Layout.jsx */ "./src/js/Layout.jsx");

var _Layout2 = _interopRequireDefault(_Layout);

var _package = __webpack_require__(/*! ../../package.json */ "./package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//include your index.scss file into the bundle
if ("true" == true) {
  _ravenJs2.default.config('https://88709bb84c9f42bfbb8fd6d750369e46@sentry.io/1196496').install();

  _ravenJs2.default.setTagsContext({
    environment: "production",
    version: _package2.default.version
  });
} /* global Raven */
//import react into the bundle


console.log("BreatheCode Platform", _package2.default.version, "production", ', debug: ' + "true");

_reactDom2.default.render(_react2.default.createElement(_Layout2.default, null), document.getElementById('app'));

/***/ }),

/***/ "./src/js/reducers/DayReducers.js":
/*!****************************************!*\
  !*** ./src/js/reducers/DayReducers.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StudentStore = __webpack_require__(/*! ../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _BCStore = __webpack_require__(/*! ../stores/BCStore */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getDay: function getDay(day, index) {

        day.replits = function () {
            if (typeof day.replits === 'undefined') return [];
            return day.replits.map(function (repl) {

                var menu = [{ label: 'View it in Repl.it', slug: 'goto' }];
                if (typeof repl.vtutorial_slug !== 'undefined' && repl.vtutorial_slug != '') menu.push({ label: 'Watch video tutorial', slug: 'vtutorial', vtutorial_slug: repl.vtutorial_slug });
                menu.push({ label: 'Mark as done', slug: 'mark-done' });

                return {
                    menu: menu,
                    title: repl.title,
                    associated_slug: repl.associated_slug || repl.slug,
                    vtutorial_slug: repl.vtutorial_slug,
                    status: "pending",
                    day: {
                        label: day.label,
                        number: index
                    },
                    type: "replit"
                };
            });
        }();
        day.lessons = function () {
            if (typeof day.lessons === 'undefined') return [];
            return day.lessons.map(function (less) {
                return {
                    title: less.title,
                    associated_slug: less.associated_slug || less.slug,
                    status: "pending",
                    menu: [{ label: 'Go to lesson', slug: 'goto' }, { label: 'Mark as read', slug: 'mark-done' }],
                    day: {
                        label: day.label,
                        number: index
                    },
                    type: "lesson"
                };
            });
        }();
        day.quizzes = function () {
            if (typeof day.quizzes === 'undefined') return [];
            return day.quizzes.map(function (q) {
                return {
                    title: q.title,
                    associated_slug: q.associated_slug || q.slug,
                    menu: [{ label: 'Take quiz', slug: 'goto' }, { label: 'Mark as done', slug: 'mark-done' }],
                    status: "pending",
                    day: {
                        label: day.label,
                        number: index
                    },
                    type: "quiz"
                };
            });
        }();
        day.assignments = function () {
            if (typeof day.assignments === 'undefined') return [];
            return day.assignments.map(function (a) {
                return {
                    title: a.title,
                    associated_slug: a.associated_slug || a.slug || a,
                    menu: [{ label: 'Read instructions', slug: 'goto' }, { label: 'Deliver assignment', slug: 'mark-done' }],
                    status: "pending",
                    day: {
                        label: day.label,
                        number: index
                    },
                    type: "assignment"
                };
            });
        }();

        day.actionables = day.replits.concat(day.lessons, day.assignments, day.quizzes);

        if (day.actionables.length > 0) day.opened = true;

        return day;
    },
    withTodos: function withTodos(day) {

        day.opened = false;
        day.totalDone = 0;

        var todos = _StudentStore2.default.getTodos();
        if (!todos) return day;

        day.replits = function () {
            return day.replits.map(function (repl) {
                var todo = _StudentStore2.default.getSingleTodo(repl);
                if (todo) {
                    day.opened = true;
                    repl.status = todo.status;
                    if (todo.status === 'done') day.totalDone++;
                }
                if (day.opened && !todo) repl.status = "unsynced";

                return repl;
            });
        }();

        day.lessons = function () {
            return day.lessons.map(function (less) {
                var todo = _StudentStore2.default.getSingleTodo(less);
                if (todo) {
                    day.opened = true;
                    less.status = todo.status;
                    if (todo.status === 'done') day.totalDone++;
                }

                if (day.opened && !todo) less.status = "unsynced";
                return less;
            });
        }();

        day.quizzes = function () {
            return day.quizzes.map(function (quiz) {
                var todo = _StudentStore2.default.getSingleTodo(quiz);
                if (todo) {
                    day.opened = true;
                    quiz.status = todo.status;
                    if (todo.status === 'done') day.totalDone++;
                }
                if (day.opened && !todo) quiz.status = "unsynced";
                return quiz;
            });
        }();

        day.assignments = function () {
            return day.assignments.map(function (ass) {
                var todo = _StudentStore2.default.getSingleTodo(ass);
                if (todo) {
                    day.opened = true;
                    ass.status = todo.status;
                    if (todo.status === 'done') day.totalDone++;
                }
                if (day.opened && !todo) ass.status = "unsynced";
                return ass;
            });
        }();

        day.actionables = day.lessons.concat(day.replits, day.assignments, day.quizzes);

        if (day.actionables.length === 0) {
            day.completition = 100;
            day.opened = true;
        } else day.completition = Math.round(day.totalDone / day.actionables.length * 100);

        return day;
    },
    withProjects: function withProjects(day) {

        var projects = _BCStore2.default.getProjects();
        if (!projects) return day;

        day.actionables.map(function (actionable) {
            if (actionable.type !== 'assignment') return actionable;else {
                var project = _BCStore2.default.getSingleProject(actionable.associated_slug);
                if (project) {
                    actionable.title = project.title;
                    actionable.project = project;
                }

                return actionable;
            }
        });

        return day;
    }
};

/***/ }),

/***/ "./src/js/stores/BCStore.js":
/*!**********************************!*\
  !*** ./src/js/stores/BCStore.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _StudentStore = __webpack_require__(/*! ./StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _DayReducers = __webpack_require__(/*! ../reducers/DayReducers */ "./src/js/reducers/DayReducers.js");

var _DayReducers2 = _interopRequireDefault(_DayReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BCStore = function (_Flux$Store) {
    _inherits(BCStore, _Flux$Store);

    function BCStore() {
        _classCallCheck(this, BCStore);

        var _this = _possibleConstructorReturn(this, (BCStore.__proto__ || Object.getPrototypeOf(BCStore)).call(this));

        _this.state = {
            syllabus: null,
            projects: null,
            days: []
        };
        _StudentStore2.default.on('todos', _this._reduceSyllabus.bind(_this));
        return _this;
    }

    _createClass(BCStore, [{
        key: '__reduce',
        value: function __reduce(entity) {
            return {
                with: function _with(reducers) {
                    var index = 0;
                    for (var key in reducers) {
                        entity = reducers[key](entity, index);
                        index++;
                    }
                    return entity;
                }
            };
        }
    }, {
        key: '_setSyllabus',
        value: function _setSyllabus(syllabus) {
            var _this2 = this;

            var allDays = [];
            var dayNumber = 0;
            syllabus.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    if (day) {
                        dayNumber++;
                        day.dayNumber = dayNumber;
                        day = _this2.__reduce(day).with(_DayReducers2.default);
                        allDays.push(day);
                    }
                });
            });
            this.setStoreState({ syllabus: syllabus, days: allDays }).emit('syllabus');
        }
    }, {
        key: '_reduceSyllabus',
        value: function _reduceSyllabus() {
            if (this.state.syllabus) this._setSyllabus(this.state.syllabus);
        }
    }, {
        key: 'getSyllabus',
        value: function getSyllabus() {
            return this.state.syllabus;
        }
    }, {
        key: 'getSingleDay',
        value: function getSingleDay(number) {
            for (var i = 0; i < this.state.days.length; i++) {
                if (this.state.days[i].dayNumber === parseInt(number)) {
                    var day = this.state.days[i];
                    return day;
                }
            };

            return null;
        }
    }, {
        key: 'getSyllabusDays',
        value: function getSyllabusDays() {
            return this.state.days;
        }
    }, {
        key: 'getDayTodos',
        value: function getDayTodos(day) {
            var todos = day.lessons.map(function (l) {
                return {
                    title: l.title,
                    status: 'pending',
                    type: 'lesson',
                    associated_slug: l.associated_slug
                };
            }).concat(day.quizzes.map(function (q, i) {
                return {
                    title: q.title,
                    status: 'pending',
                    type: 'quiz',
                    associated_slug: q.associated_slug
                };
            })).concat(day.replits.map(function (r, i) {
                return {
                    title: r.title,
                    status: 'pending',
                    type: 'replit',
                    associated_slug: r.associated_slug,
                    vtutorial_slug: r.vtutorial_slug
                };
            })).concat(day.assignments.map(function (a, i) {
                return {
                    title: a.title,
                    status: 'pending',
                    type: 'assignment',
                    associated_slug: a.associated_slug
                };
            }));

            return todos;
        }
    }, {
        key: '_setProjects',
        value: function _setProjects(projects) {
            this.setStoreState({ projects: projects }).emit('projects');
            this._reduceSyllabus();
        }
    }, {
        key: 'getProjects',
        value: function getProjects() {
            return this.state.projects;
        }
    }, {
        key: 'getSingleProject',
        value: function getSingleProject(slug) {
            for (var i = 0; i < this.state.projects.length; i++) {
                if (this.state.projects[i].slug === slug) {
                    var project = this.state.projects[i];
                    return project;
                }
            };

            return null;
        }
    }]);

    return BCStore;
}(_reactFluxDash2.default.Store);

exports.default = new BCStore();

/***/ }),

/***/ "./src/js/stores/ContentStore.js":
/*!***************************************!*\
  !*** ./src/js/stores/ContentStore.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentStore = function (_Flux$DashStore) {
    _inherits(ContentStore, _Flux$DashStore);

    function ContentStore() {
        _classCallCheck(this, ContentStore);

        var _this = _possibleConstructorReturn(this, (ContentStore.__proto__ || Object.getPrototypeOf(ContentStore)).call(this));

        _this.addEvent('lessons');
        _this.addEvent('assets');
        return _this;
    }

    return ContentStore;
}(_reactFluxDash2.default.DashStore);

exports.default = new ContentStore();

/***/ }),

/***/ "./src/js/stores/StudentStore.js":
/*!***************************************!*\
  !*** ./src/js/stores/StudentStore.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global localStorage */


var StudentStore = function (_Flux$Store) {
    _inherits(StudentStore, _Flux$Store);

    function StudentStore() {
        _classCallCheck(this, StudentStore);

        var _this = _possibleConstructorReturn(this, (StudentStore.__proto__ || Object.getPrototypeOf(StudentStore)).call(this));

        _this.state.todos = null;
        return _this;
    }

    _createClass(StudentStore, [{
        key: '_setTodos',
        value: function _setTodos(todos) {
            this.setStoreState({ todos: todos }).emit('todos');
        }
    }, {
        key: 'getTodos',
        value: function getTodos() {
            return this.state.todos;
        }
    }, {
        key: '_updateSingleTodo',
        value: function _updateSingleTodo(task) {
            for (var i = 0; i < this.state.todos.length; i++) {
                if (this.state.todos[i].id === task.id) {
                    this.state.todos[i].status = task.status;
                    this.emit('todos');
                    return this.state.todos[i];
                }
            }throw new Error('Task ' + task.id + ' not found');

            return false;
        }
    }, {
        key: '_appendTodos',
        value: function _appendTodos(newTodos) {
            this.setStoreState({
                todos: this.state.todos.concat(newTodos)
            }).emit('todos');
        }
    }, {
        key: 'getSingleTodo',
        value: function getSingleTodo(actionable) {

            if (!this.state.todos) return false;

            var present = this.state.todos.find(function (item) {
                return item.type === actionable.type && item.associated_slug === actionable.associated_slug;
            });
            if (typeof present === 'undefined') return false;else return present;
        }
    }]);

    return StudentStore;
}(_reactFluxDash2.default.Store);

exports.default = new StudentStore();

/***/ }),

/***/ "./src/js/utils/api.js":
/*!*****************************!*\
  !*** ./src/js/utils/api.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global fetch, localStorage, window */
var Wrapper = function () {
    function Wrapper() {
        _classCallCheck(this, Wrapper);

        this.options = {
            assetsPath: typeof process != 'undefined' ? "https://assets.breatheco.de" + '/apis' : null,
            apiPath: typeof process != 'undefined' ? "https://api.breatheco.de" : null,
            _debug: typeof process != 'undefined' ? "true" : false,
            getToken: function getToken() {
                var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'api';

                return null;
            },
            onLogout: null
        };
        this.pending = {
            get: {}, post: {}, put: {}, delete: {}
        };
    }

    _createClass(Wrapper, [{
        key: '_logError',
        value: function _logError(error) {
            if (this.options._debug) console.error(error);
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            this.options = Object.assign(this.options, options);
        }
    }, {
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {
            return fetch.apply(undefined, arguments);
        })
    }, {
        key: 'req',
        value: function req(method, path, args) {
            var _this = this;

            var token = this.options.getToken(path.indexOf('//assets') == -1 ? 'api' : 'assets');
            var opts = {
                method: method,
                headers: { 'Content-Type': 'application/json' }
            };
            if (token) opts.headers['Authorization'] = token;

            if (method === 'get') path += this.serialize(args).toStr();else {
                if ((method == 'post' || method == 'put') && !args) throw new Error('Missing request body');
                opts.body = this.serialize(args).toJSON();
            }

            return new Promise(function (resolve, reject) {

                if (typeof _this.pending[method][path] !== 'undefined' && _this.pending[method][path]) reject({ pending: true, msg: 'Request ' + method + ': ' + path + ' was ignored because a previous one was already pending' });else _this.pending[method][path] = true;

                _this.fetch(path, opts).then(function (resp) {
                    _this.pending[method][path] = false;
                    if (resp.status == 200) return resp.json();else {
                        _this._logError(resp);
                        if (resp.status == 403) reject({ msg: 'Invalid username or password', code: 403 });else if (resp.status == 401) {
                            reject({ msg: 'Unauthorized', code: 401 });
                            if (_this.options.onLogout) _this.options.onLogout();
                        } else if (resp.status == 400) reject({ msg: 'Invalid Argument', code: 400 });else reject({ msg: 'There was an error, try again later', code: 500 });
                    }
                    return false;
                }).then(function (json) {
                    if (!json) throw new Error('There was a problem processing the request');
                    resolve(json);
                    return json;
                }).catch(function (error) {
                    _this.pending[method][path] = false;
                    _this._logError(error.message);
                    reject(error.message);
                });
            });
        }
    }, {
        key: '_encodeKeys',
        value: function _encodeKeys(obj) {
            for (var key in obj) {
                var newkey = key.replace('-', '_');

                var temp = obj[key];
                delete obj[key];
                obj[newkey] = temp;
            }
            return obj;
        }
    }, {
        key: '_decodeKeys',
        value: function _decodeKeys(obj) {
            for (var key in obj) {
                var newkey = key.replace('_', '-');

                var temp = obj[key];
                delete obj[key];
                obj[newkey] = temp;
            }
            return obj;
        }
    }, {
        key: 'post',
        value: function post() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return this.req.apply(this, ['post'].concat(args));
        }
    }, {
        key: 'get',
        value: function get() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return this.req.apply(this, ['get'].concat(args));
        }
    }, {
        key: 'put',
        value: function put() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return this.req.apply(this, ['put'].concat(args));
        }
    }, {
        key: 'delete',
        value: function _delete() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return this.req.apply(this, ['delete'].concat(args));
        }
    }, {
        key: 'serialize',
        value: function serialize(obj) {
            return {
                obj: obj,
                toStr: function toStr() {
                    var str = "";
                    for (var key in this.obj) {
                        if (str != "") {
                            str += "&";
                        }
                        str += key + "=" + encodeURIComponent(this.obj[key]);
                    }
                    return str;
                },
                toJSON: function toJSON() {
                    return JSON.stringify(this.obj);
                }
            };
        }
    }, {
        key: 'credentials',
        value: function credentials() {
            var _this2 = this;

            var url = this.options.assetsPath + '/credentials';
            return {
                autenticate: function autenticate(username, password) {
                    return _this2.post(url + '/auth', { username: username, password: password });
                },
                remind: function remind(username) {
                    return _this2.post(_this2.options.apiPath + '/remind/user/' + encodeURIComponent(username), { username: username });
                }
            };
        }
    }, {
        key: 'syllabus',
        value: function syllabus() {
            var _this3 = this;

            var url = this.options.assetsPath + '/syllabus';
            return {
                get: function get(slug) {
                    if (!slug) throw new Error('Missing slug');else return _this3.get(url + '/' + slug);
                }
            };
        }
    }, {
        key: 'todo',
        value: function todo() {
            var _this4 = this;

            var url = this.options.apiPath;
            return {
                getByStudent: function getByStudent(id) {
                    return _this4.get(url + '/student/' + id + '/task/');
                },
                add: function add(id, args) {
                    return _this4.post(url + '/student/' + id + '/task/', args);
                },
                update: function update(args) {
                    return _this4.post(url + '/task/' + args.id, args);
                }
            };
        }
    }, {
        key: 'project',
        value: function project() {
            var _this5 = this;

            var url = this.options.assetsPath;
            return {
                all: function all(syllabus_slug) {
                    return _this5.get(url + '/project/all');
                }
            };
        }
    }, {
        key: 'user',
        value: function user() {
            var _this6 = this;

            var url = this.options.apiPath;
            return {
                all: function all() {
                    return _this6.get(url + '/user/');
                },
                add: function add(args) {
                    return _this6.put(url + '/user/', args);
                },
                update: function update(id, args) {
                    return _this6.post(url + '/user/' + id, args);
                },
                delete: function _delete(id) {
                    return _this6.delete(url + '/user/' + id);
                }
            };
        }
    }, {
        key: 'event',
        value: function event() {
            var _this7 = this;

            var url = this.options.assetsPath;
            this.options.token;
            return {
                all: function all() {
                    return _this7.get(url + '/event/all');
                },
                get: function get(id) {
                    return _this7.get(url + '/event/' + id);
                },
                add: function add(args) {
                    return _this7.put(url + '/event/', args);
                },
                update: function update(id, args) {
                    return _this7.post(url + '/event/' + id, args);
                },
                delete: function _delete(id) {
                    return _this7.delete(url + '/event/' + id);
                }
            };
        }
    }, {
        key: 'student',
        value: function student() {
            var _this8 = this;

            var url = this.options.apiPath;
            var assetsURL = this.options.assetsPath;
            return {
                all: function all() {
                    return _this8.get(url + '/students/');
                },
                add: function add(args) {
                    return _this8.put(assetsURL + '/credentials/signup', args);
                },
                update: function update(id, args) {
                    return _this8.post(url + '/student/' + id, args);
                },
                delete: function _delete(id) {
                    return _this8.delete(url + '/student/' + id);
                }
            };
        }
    }, {
        key: 'cohort',
        value: function cohort() {
            var _this9 = this;

            var url = this.options.apiPath;
            return {
                all: function all() {
                    return _this9.get(url + '/cohorts/');
                },
                get: function get(id) {
                    return _this9.get(url + '/cohort/' + id);
                },
                add: function add(args) {
                    return _this9.put(url + '/cohort/', args);
                },
                update: function update(id, args) {
                    return _this9.post(url + '/cohort/' + id, args);
                },
                delete: function _delete(id) {
                    return _this9.delete(url + '/cohort/' + id);
                },
                addStudents: function addStudents(cohortId, studentsArray) {
                    studentsArray = studentsArray.map(function (id) {
                        return { student_id: id };
                    });
                    return _this9.post(url + '/student/cohort/' + cohortId, studentsArray);
                },
                removeStudents: function removeStudents(cohortId, studentsArray) {
                    studentsArray = studentsArray.map(function (id) {
                        return { student_id: id };
                    });
                    return _this9.delete(url + '/student/cohort/' + cohortId, studentsArray);
                }
            };
        }
    }, {
        key: 'location',
        value: function location() {
            var _this10 = this;

            var url = this.options.apiPath;
            return {
                all: function all() {
                    return _this10.get(url + '/locations/');
                },
                get: function get(id) {
                    return _this10.get(url + '/location/' + id);
                },
                add: function add(args) {
                    return _this10.put(url + '/location/', args);
                },
                update: function update(id, args) {
                    return _this10.post(url + '/location/' + id, args);
                },
                delete: function _delete(id) {
                    return _this10.delete(url + '/location/' + id);
                }
            };
        }
    }, {
        key: 'profile',
        value: function profile() {
            var _this11 = this;

            var url = this.options.apiPath;
            return {
                all: function all() {
                    return _this11.get(url + '/profiles/');
                },
                get: function get(id) {
                    return _this11.get(url + '/profile/' + id);
                },
                add: function add(args) {
                    return _this11.put(url + '/profile/', args);
                },
                update: function update(id, args) {
                    return _this11.post(url + '/profile/' + id, args);
                },
                delete: function _delete(id) {
                    return _this11.delete(url + '/profile/' + id);
                }
            };
        }
    }, {
        key: 'lessons',
        value: function lessons() {
            var _this12 = this;

            var url = this.options.assetsPath;
            return {
                all: function all() {
                    return _this12.get(url + '/lesson/all');
                },
                get: function get(id) {
                    return _this12.get(url + '/lessons/' + id);
                }
            };
        }
    }]);

    return Wrapper;
}();

if (true) module.exports = new Wrapper();
window.BC = new Wrapper();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/js/utils/icons.js":
/*!*******************************!*\
  !*** ./src/js/utils/icons.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fontawesome = __webpack_require__(/*! @fortawesome/fontawesome */ "./node_modules/@fortawesome/fontawesome/index.es.js");

var _fontawesome2 = _interopRequireDefault(_fontawesome);

var _faCheck = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faCheck */ "./node_modules/@fortawesome/fontawesome-free-solid/faCheck.js");

var _faCheck2 = _interopRequireDefault(_faCheck);

var _faSync = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faSync */ "./node_modules/@fortawesome/fontawesome-free-solid/faSync.js");

var _faSync2 = _interopRequireDefault(_faSync);

var _faEllipsisV = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faEllipsisV */ "./node_modules/@fortawesome/fontawesome-free-solid/faEllipsisV.js");

var _faEllipsisV2 = _interopRequireDefault(_faEllipsisV);

var _faGraduationCap = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faGraduationCap */ "./node_modules/@fortawesome/fontawesome-free-solid/faGraduationCap.js");

var _faGraduationCap2 = _interopRequireDefault(_faGraduationCap);

var _faPlay = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faPlay */ "./node_modules/@fortawesome/fontawesome-free-solid/faPlay.js");

var _faPlay2 = _interopRequireDefault(_faPlay);

var _faCog = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faCog */ "./node_modules/@fortawesome/fontawesome-free-solid/faCog.js");

var _faCog2 = _interopRequireDefault(_faCog);

var _faSpinner = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faSpinner */ "./node_modules/@fortawesome/fontawesome-free-solid/faSpinner.js");

var _faSpinner2 = _interopRequireDefault(_faSpinner);

var _faSearch = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faSearch */ "./node_modules/@fortawesome/fontawesome-free-solid/faSearch.js");

var _faSearch2 = _interopRequireDefault(_faSearch);

var _faGithub = __webpack_require__(/*! @fortawesome/fontawesome-free-brands/faGithub */ "./node_modules/@fortawesome/fontawesome-free-brands/faGithub.js");

var _faGithub2 = _interopRequireDefault(_faGithub);

var _faExternalLinkAlt = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faExternalLinkAlt */ "./node_modules/@fortawesome/fontawesome-free-solid/faExternalLinkAlt.js");

var _faExternalLinkAlt2 = _interopRequireDefault(_faExternalLinkAlt);

var _faArrowRight = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faArrowRight */ "./node_modules/@fortawesome/fontawesome-free-solid/faArrowRight.js");

var _faArrowRight2 = _interopRequireDefault(_faArrowRight);

var _faArrowLeft = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faArrowLeft */ "./node_modules/@fortawesome/fontawesome-free-solid/faArrowLeft.js");

var _faArrowLeft2 = _interopRequireDefault(_faArrowLeft);

var _faAngleDoubleDown = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faAngleDoubleDown */ "./node_modules/@fortawesome/fontawesome-free-solid/faAngleDoubleDown.js");

var _faAngleDoubleDown2 = _interopRequireDefault(_faAngleDoubleDown);

var _faAngleDoubleUp = __webpack_require__(/*! @fortawesome/fontawesome-free-solid/faAngleDoubleUp */ "./node_modules/@fortawesome/fontawesome-free-solid/faAngleDoubleUp.js");

var _faAngleDoubleUp2 = _interopRequireDefault(_faAngleDoubleUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 3) Tell font-awesome that you want to replace your icons with SVGs (recomended for performance)
*/


/**
 * 2) Then you have to import every icon that you will use
*/
_fontawesome2.default.config = {
  autoReplaceSvg: 'nest'
};

/**
 * 4) Add the icons into the font-awesome library
*/
/* global FontAwesomeConfig */

/**
 * 1) First you have to import the @fortawesome/fontawesome library
*/
_fontawesome2.default.library.add(_faCheck2.default, _faGraduationCap2.default, _faPlay2.default, _faSpinner2.default, _faSearch2.default, _faGithub2.default, _faCog2.default, _faSync2.default, _faEllipsisV2.default, _faExternalLinkAlt2.default, _faArrowRight2.default, _faArrowLeft2.default, _faAngleDoubleDown2.default, _faAngleDoubleUp2.default);

/**
 * 5) Now, you can place the icon tag anywhere you want to icon to show, for example:
 *    <i className="fas fa-check"></i>
*/

/***/ }),

/***/ "./src/js/utils/menu.js":
/*!******************************!*\
  !*** ./src/js/utils/menu.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentPath = exports.menuModes = undefined;

var _TimeLineMenu = __webpack_require__(/*! ../components/menus/TimeLineMenu */ "./src/js/components/menus/TimeLineMenu.jsx");

var _TimeLineMenu2 = _interopRequireDefault(_TimeLineMenu);

var _TodoMenu = __webpack_require__(/*! ../components/menus/TodoMenu */ "./src/js/components/menus/TodoMenu.jsx");

var _TodoMenu2 = _interopRequireDefault(_TodoMenu);

var _SearchMenu = __webpack_require__(/*! ../components/menus/SearchMenu */ "./src/js/components/menus/SearchMenu.jsx");

var _SearchMenu2 = _interopRequireDefault(_SearchMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuModes = exports.menuModes = {
    home: [{ slug: "home", label: "BreatheCode" }],
    course: [{ slug: "course", label: "Course", items: [{
            slug: "syllabus",
            label: "My Journey",
            icon: "fas fa-graduation-cap",
            component: _TimeLineMenu2.default,
            size: 370
        }, {
            slug: "todos",
            label: "Todo's",
            icon: "fas fa-check",
            component: _TodoMenu2.default,
            size: 370
        }, {
            slug: "search",
            label: "Search",
            icon: "fas fa-search",
            component: _SearchMenu2.default,
            size: 370
        }] }, { slug: "search", label: "Search" }],
    todos: null,
    syllabus: null
};

var getCurrentPath = exports.getCurrentPath = function getCurrentPath() {
    var pathname = window.location.pathname;
    var fullRegex = /course\/(.+)\/(\d+)\/([l|r|a|q])\/(.+)$/;
    var fullMatch = pathname.match(fullRegex);
    var dayRegex = /course\/(.+)\/(\d+)(.*)$/;
    var dayMatch = pathname.match(dayRegex);

    var course = !dayMatch ? null : dayMatch[1];
    var day = !dayMatch ? null : dayMatch[2];
    var type = !fullMatch ? null : fullMatch[3]; //l|r|a|q
    var view = !fullMatch ? null : fullMatch[4]; //l|r|a|q

    return { day: day, type: type, course: course, view: view };
};

/***/ }),

/***/ "./src/js/views/ChooseView.jsx":
/*!*************************************!*\
  !*** ./src/js/views/ChooseView.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChooseView = function (_Flux$View) {
  _inherits(ChooseView, _Flux$View);

  function ChooseView() {
    _classCallCheck(this, ChooseView);

    var _this = _possibleConstructorReturn(this, (ChooseView.__proto__ || Object.getPrototypeOf(ChooseView)).call(this));

    _this.state = {
      student: {
        cohorts: []
      }
    };
    return _this;
  }

  _createClass(ChooseView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var session = _bcReactSession.Session.get();
      this.setState({ student: session.payload });
      var unsubscribe = _bcReactSession.Session.onChange(function (session) {
        if (typeof unsubscribe == 'function') unsubscribe();

        var currentCohort = session.payload ? session.payload.currentCohort : null;
        if (currentCohort && typeof currentCohort !== 'undefined' && !Array.isArray(currentCohort)) _this2.props.history.push('/course/' + currentCohort.profile_slug);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var cohorts = this.state.student.cohorts.map(function (cohort, i) {
        return _react2.default.createElement(
          'li',
          { key: i },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-light ml-3',
              onClick: function onClick() {
                _bcReactSession.Session.setPayload({ currentCohort: cohort });
              } },
            _react2.default.createElement('i', { className: 'fas fa-external-link-alt' }),
            ' launch this course'
          ),
          _react2.default.createElement(
            'span',
            { className: 'cohort-name' },
            cohort.profile_slug
          ),
          _react2.default.createElement(
            'p',
            { className: 'cohort-description m-0' },
            'Cohort: ',
            cohort.name
          )
        );
      });
      return _react2.default.createElement(
        _index.Panel,
        { className: 'choose-view', style: { padding: "10px" }, zDepth: 1 },
        _react2.default.createElement(
          'div',
          { className: 'col-10 col-sm-6 mx-auto pt-5' },
          _react2.default.createElement(
            'h4',
            null,
            'Please choose a course to launch:'
          ),
          _react2.default.createElement(
            _index.List,
            { className: 'courses' },
            cohorts
          ),
          _react2.default.createElement(
            'div',
            { className: 'text-center' },
            _react2.default.createElement(
              'a',
              { className: 'btn btn-light', href: '#', onClick: function onClick() {
                  return (0, _index.logout)();
                } },
              'or go ahead and logout'
            )
          )
        )
      );
    }
  }]);

  return ChooseView;
}(_reactFluxDash2.default.View);

exports.default = ChooseView;

/***/ }),

/***/ "./src/js/views/CourseIntro.jsx":
/*!**************************************!*\
  !*** ./src/js/views/CourseIntro.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseIntro = function (_Flux$View) {
  _inherits(CourseIntro, _Flux$View);

  function CourseIntro() {
    _classCallCheck(this, CourseIntro);

    return _possibleConstructorReturn(this, (CourseIntro.__proto__ || Object.getPrototypeOf(CourseIntro)).apply(this, arguments));
  }

  _createClass(CourseIntro, [{
    key: 'getMarkdownText',
    value: function getMarkdownText() {
      var rawMarkup = __webpack_require__(/*! ../../../messages/full-stack.md */ "./messages/full-stack.md");
      return { __html: rawMarkup };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'with-padding' },
        _react2.default.createElement(
          _index.Panel,
          { style: { padding: "10px" }, zDepth: 1 },
          _react2.default.createElement('div', { dangerouslySetInnerHTML: this.getMarkdownText() })
        )
      );
    }
  }]);

  return CourseIntro;
}(_reactFluxDash2.default.View);

exports.default = CourseIntro;

/***/ }),

/***/ "./src/js/views/CourseView.jsx":
/*!*************************************!*\
  !*** ./src/js/views/CourseView.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _SplitLayout = __webpack_require__(/*! ../components/SplitLayout */ "./src/js/components/SplitLayout.jsx");

var _SplitLayout2 = _interopRequireDefault(_SplitLayout);

var _BCStore = __webpack_require__(/*! ../stores/BCStore */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

var _BCActions = __webpack_require__(/*! ../actions/BCActions */ "./src/js/actions/BCActions.js");

var _BCActions2 = _interopRequireDefault(_BCActions);

var _CourseIntro = __webpack_require__(/*! ../views/CourseIntro */ "./src/js/views/CourseIntro.jsx");

var _CourseIntro2 = _interopRequireDefault(_CourseIntro);

var _DayView = __webpack_require__(/*! ../views/DayView */ "./src/js/views/DayView.jsx");

var _DayView2 = _interopRequireDefault(_DayView);

var _LessonView = __webpack_require__(/*! ../views/panel/LessonView */ "./src/js/views/panel/LessonView.jsx");

var _LessonView2 = _interopRequireDefault(_LessonView);

var _QuizView = __webpack_require__(/*! ../views/panel/QuizView */ "./src/js/views/panel/QuizView.jsx");

var _QuizView2 = _interopRequireDefault(_QuizView);

var _ReplitView = __webpack_require__(/*! ../views/panel/ReplitView */ "./src/js/views/panel/ReplitView.jsx");

var _ReplitView2 = _interopRequireDefault(_ReplitView);

var _AssignmentView = __webpack_require__(/*! ../views/panel/AssignmentView */ "./src/js/views/panel/AssignmentView.jsx");

var _AssignmentView2 = _interopRequireDefault(_AssignmentView);

var _VTurorialView = __webpack_require__(/*! ../views/panel/VTurorialView */ "./src/js/views/panel/VTurorialView.jsx");

var _VTurorialView2 = _interopRequireDefault(_VTurorialView);

var _StudentActions = __webpack_require__(/*! ../actions/StudentActions */ "./src/js/actions/StudentActions.js");

var _StudentActions2 = _interopRequireDefault(_StudentActions);

var _StudentStore = __webpack_require__(/*! ../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _menu = __webpack_require__(/*! ../utils/menu */ "./src/js/utils/menu.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseView = function (_Flux$View) {
    _inherits(CourseView, _Flux$View);

    function CourseView() {
        _classCallCheck(this, CourseView);

        var _this = _possibleConstructorReturn(this, (CourseView.__proto__ || Object.getPrototypeOf(CourseView)).call(this));

        _this.state = {
            courseSlug: null,
            currentCohort: null,
            menuItems: _menu.menuModes.course,
            currentMenuOption: _menu.menuModes.course[0],
            context: _this.getCurrentContext()
        };
        //this.sessionUpdated();
        _this.bindStore(_BCStore2.default, 'syllabus', _this.syllabusUpdated.bind(_this));
        return _this;
    }

    _createClass(CourseView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var courseSlug = this.props.match.params.course_slug;
            var syllabus = _BCStore2.default.getSyllabus(courseSlug);
            var _session = _bcReactSession.Session.get();
            if (!_session.payload.currentCohort || Array.isArray(_session.payload.currentCohort)) this.props.history.push('/choose');
            if (!syllabus || syllabus.profile != courseSlug) _BCActions2.default.fetch().syllabus(courseSlug);

            var state = {
                courseSlug: courseSlug,
                currentCohort: _session.payload.currentCohort
            };
            if (this.state.context.path.day) state.currentOption = _menu.menuModes.course[0].items[0];
            this.setState(state);
        }
    }, {
        key: 'getCurrentContext',
        value: function getCurrentContext() {
            var path = (0, _menu.getCurrentPath)();
            var breadcrumb = [{ label: "BreatheCode", path: '/home' }];
            if (path.course) breadcrumb.push({ label: 'Course', path: '/course/' + path.course });
            if (path.day) breadcrumb.push({ label: 'Day', path: '/course/' + path.course + '/' + path.day });
            if (path.type) breadcrumb.push({ label: path.type, path: '/course/' + path.course + '/' + path.day + '/' + path.type + '/' + path.view });

            return { path: path, breadcrumb: breadcrumb };
        }
    }, {
        key: 'syllabusUpdated',
        value: function syllabusUpdated() {
            this.fetchSecondSyllabusPhase();
            this.setState({ menuItems: _menu.menuModes.course });
        }
    }, {
        key: 'fetchSecondSyllabusPhase',
        value: function fetchSecondSyllabusPhase() {
            var todos = _StudentStore2.default.getTodos();
            if (!todos) {
                var student = _bcReactSession.Session.get().payload;
                if (student) _StudentActions2.default.fetch().todos(student.bc_id);
            }
            var projects = _BCStore2.default.getProjects();
            if (!projects) {
                _BCActions2.default.fetch().projects();
            }
        }
    }, {
        key: 'onSelect',
        value: function onSelect(option) {
            if (typeof option.slug != 'undefined' && this.state.menuItems.find(function (item) {
                return item.slug = option.slug;
            })) {
                if (option.slug == 'syllabus') option.data = _BCStore2.default.getSyllabusDays();
                this.setState({
                    currentMenuOption: option
                });
            } else if (typeof option.dayNumber != 'undefined') {
                this.props.history.push(this.props.match.url + '/' + option.dayNumber);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _SplitLayout2.default,
                {
                    menuItems: this.state.menuItems,
                    breadcrumb: this.state.context.breadcrumb,
                    selectedOption: this.state.currentMenuOption,
                    onNavBarSelect: this.onSelect.bind(this),
                    baseLevel: 'course'
                },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/r/:replit_slug', component: _ReplitView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/q/:quiz_slug', component: _QuizView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/a/:assignment_slug', component: _AssignmentView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/l/:lesson_slug', component: _LessonView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number', component: _DayView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number/l/:lesson_slug', component: _LessonView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number/q/:quiz_slug', component: _QuizView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number/r/:replit_slug', component: _ReplitView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number/r/:replit_slug/vtutorial/:vtutorial_slug', component: _VTurorialView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path + '/:day_number/a/:assignment_slug', component: _AssignmentView2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.props.match.path, component: _CourseIntro2.default })
                    )
                )
            );
        }
    }]);

    return CourseView;
}(_reactFluxDash2.default.View);

exports.default = CourseView;
//export default withShortcuts(Layout, keymap)

/***/ }),

/***/ "./src/js/views/DayView.jsx":
/*!**********************************!*\
  !*** ./src/js/views/DayView.jsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _DayContent = __webpack_require__(/*! ../components/DayContent.jsx */ "./src/js/components/DayContent.jsx");

var _DayContent2 = _interopRequireDefault(_DayContent);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _BCStore = __webpack_require__(/*! ../stores/BCStore */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

var _StudentActions = __webpack_require__(/*! ../actions/StudentActions */ "./src/js/actions/StudentActions.js");

var _StudentActions2 = _interopRequireDefault(_StudentActions);

var _StudentStore = __webpack_require__(/*! ../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayView = function (_Flux$View) {
  _inherits(DayView, _Flux$View);

  function DayView() {
    _classCallCheck(this, DayView);

    var _this = _possibleConstructorReturn(this, (DayView.__proto__ || Object.getPrototypeOf(DayView)).call(this));

    _this.state = {
      day: null,
      blocked: true,
      blockedError: null,
      visibleLesson: null,
      actionables: []
    };
    _this.bindStore(_BCStore2.default, 'syllabus', _this.syllabusUpdated.bind(_this));
    _this.stopDayChangeListener = null;
    return _this;
  }

  _createClass(DayView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.syllabusUpdated();
    }
  }, {
    key: "syllabusUpdated",
    value: function syllabusUpdated() {
      var _this2 = this;

      this.loadDay();
      if (!this.stopDayChangeListener) {
        this.stopDayChangeListener = this.props.history.listen(function (location, action) {
          var courseRegex = /course\/(.*)\/(\d*)$/;
          var match = location.pathname.match(courseRegex);
          if (match) {
            var newDayNumber = match[2]; // id = 'Ahg6qcgoay4'
            if (parseInt(newDayNumber) !== _this2.state.day.dayNumber) _this2.loadDay(newDayNumber);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.stopDayChangeListener) {
        this.stopDayChangeListener();
        this.stopDayChangeListener = null;
      }
    }
  }, {
    key: "loadDay",
    value: function loadDay() {
      var newDayNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var student = _bcReactSession.Session.get().payload;
      var singleDay = _BCStore2.default.getSingleDay(newDayNumber || this.props.match.params.day_number);
      if (singleDay) {
        this.setState({
          day: singleDay,
          blocked: student.type === 'teacher' ? false : !singleDay.opened,
          actionables: singleDay.actionables
        });
      }
    }
  }, {
    key: "actionableSelected",
    value: function actionableSelected(actionable, option) {
      switch (option.slug) {
        case "mark-done":
          var task = _StudentStore2.default.getSingleTodo(actionable);
          if (task.type != 'assignment') {
            task.status = "done";
            _StudentActions2.default.updateTask(task);
          } else {
            _StudentActions2.default.deliverAssignment(task);
          }
          break;
        case "goto":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug);
          break;
        case "vtutorial":
          this.props.history.push(this.props.match.url + ("/" + actionable.type.charAt(0) + "/") + actionable.associated_slug + '/vtutorial/' + option.vtutorial_slug);
          break;
      }
    }
  }, {
    key: "enableDay",
    value: function enableDay() {
      _StudentActions2.default.startDay(this.state.day);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!this.state.day) return _react2.default.createElement(
        _index.Panel,
        { className: "dayview" },
        _react2.default.createElement(
          "h1",
          null,
          "Loading..."
        )
      );

      var unsynced = this.state.actionables.filter(function (act) {
        return act.status === 'unsynced';
      });

      var actionable = this.state.actionables.filter(function (act) {
        return act.status !== 'unsynced';
      }).map(function (l, i) {
        return _react2.default.createElement(_index.ActionableItem, { key: i, type: l.type,
          done: l.status === "done",
          label: typeof l.title !== 'undefined' ? l.title : l.associated_slug,
          dropdown: l.menu,
          onDropdownSelect: function onDropdownSelect(option) {
            return _this3.actionableSelected(l, option);
          }
        });
      });

      return _react2.default.createElement(
        _index.Panel,
        { className: "dayview" },
        _react2.default.createElement(
          "h1",
          null,
          ":",
          this.state.day.label,
          " ",
          _react2.default.createElement(_index.ProgressKPI, { progress: this.state.day.completition })
        ),
        _react2.default.createElement(
          "p",
          { className: "description" },
          this.state.day.description
        ),
        actionable.length > 0 ? _react2.default.createElement(
          _DayContent2.default,
          { onStart: this.enableDay.bind(this), blocked: this.state.blocked },
          unsynced.length > 0 ? _react2.default.createElement(
            "div",
            { className: "alert alert-warning" },
            _react2.default.createElement(
              "span",
              null,
              "There are ",
              unsynced.length,
              " new activities on this day \xA0"
            ),
            _react2.default.createElement(
              "button",
              { className: "btn btn-warning",
                onClick: function onClick() {
                  return _StudentActions2.default.addUnsyncedTodos(unsynced);
                } },
              _react2.default.createElement("i", { className: "fas fa-sync" }),
              " Sync now"
            )
          ) : '',
          _react2.default.createElement(
            "h3",
            null,
            "To finish this day you have to complete the following actions:"
          ),
          _react2.default.createElement(
            _index.List,
            null,
            actionable
          )
        ) : ''
      );
    }
  }]);

  return DayView;
}(_reactFluxDash2.default.View);

exports.default = (0, _reactRouterDom.withRouter)(DayView);

/***/ }),

/***/ "./src/js/views/HomeView.jsx":
/*!***********************************!*\
  !*** ./src/js/views/HomeView.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _StudentStore = __webpack_require__(/*! ../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _auth = __webpack_require__(/*! ../actions/auth */ "./src/js/actions/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = function (_Flux$View) {
  _inherits(HomeView, _Flux$View);

  function HomeView() {
    _classCallCheck(this, HomeView);

    return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).apply(this, arguments));
  }

  _createClass(HomeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var session = _bcReactSession.Session.get();
      if (session.active) {
        var currentCohort = session.payload.currentCohort;
        if (currentCohort) {
          if (Array.isArray(currentCohort)) this.props.history.push('/choose');else this.props.history.push('/course/' + currentCohort.profile_slug);
        }
      }
      // let user = StudentStore.getUser();
      //if(user.type === 'student' && currentCohort) this.props.history.push('/course/'+currentCohort.profile_slug);
      //else this.setState({ user, currentCohort });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'with-padding' },
        _react2.default.createElement(
          _index.Panel,
          { style: { padding: "10px" }, zDepth: 1 },
          _react2.default.createElement(
            'h2',
            null,
            'We couldn\'t find your courses, ',
            _react2.default.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  return (0, _auth.logout)();
                } },
              'please logout to refresh'
            )
          )
        )
      );
    }
  }]);

  return HomeView;
}(_reactFluxDash2.default.View);

exports.default = HomeView;

/***/ }),

/***/ "./src/js/views/ProfileView.jsx":
/*!**************************************!*\
  !*** ./src/js/views/ProfileView.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileView = function (_Flux$View) {
  _inherits(ProfileView, _Flux$View);

  function ProfileView() {
    _classCallCheck(this, ProfileView);

    var _this = _possibleConstructorReturn(this, (ProfileView.__proto__ || Object.getPrototypeOf(ProfileView)).call(this));

    _this.state = {
      student: {
        full_name: 'Profile'
      }
    };
    return _this;
  }

  _createClass(ProfileView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var session = _bcReactSession.Session.get();
      if (session.payload) this.setState({ student: session.payload });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _index.Panel,
        { className: 'profile-view', style: { padding: "10px" }, zDepth: 1 },
        _react2.default.createElement(
          'h2',
          null,
          _react2.default.createElement(_index.BreadCrumb, { levels: [{ slug: 'breathecode', label: 'BreatheCode' }, { slug: 'profile', label: 'Profile' }],
            onClick: function onClick(opt) {
              switch (opt) {
                case "breathecode":
                  _this2.props.history.goBack();
                  _this2.props.history.push('/home');
                  break;
              }
            }
          })
        ),
        _react2.default.createElement(
          'p',
          { className: 'text-center mb-3' },
          this.state.student.full_name
        ),
        _react2.default.createElement(
          'div',
          { className: 'profile-img', onClick: function onClick() {
              return window.open('https://en.gravatar.com/emails/');
            } },
          _react2.default.createElement('img', { src: this.state.student.avatar }),
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'https://en.gravatar.com/emails/', className: 'btn' },
            'edit'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row text-center mt-5' },
          _react2.default.createElement(
            'div',
            { className: 'col-12 col-md-6 mx-auto' },
            'Points Accumulated: ',
            this.state.student.total_points
          )
        ),
        this.state.student.github ? _react2.default.createElement(
          'div',
          { className: 'row text-center' },
          _react2.default.createElement(
            'div',
            { className: 'col-12 col-md-6 mx-auto' },
            _react2.default.createElement('i', { className: 'fab fa-github' }),
            ' ',
            this.state.student.github
          )
        ) : ''
      );
    }
  }]);

  return ProfileView;
}(_reactFluxDash2.default.View);

exports.default = ProfileView;

/***/ }),

/***/ "./src/js/views/auth.jsx":
/*!*******************************!*\
  !*** ./src/js/views/auth.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgotView = exports.LoginView = undefined;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _auth = __webpack_require__(/*! ../actions/auth.js */ "./src/js/actions/auth.js");

var _index = __webpack_require__(/*! ../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginView = exports.LoginView = function LoginView() {
  return _react2.default.createElement(_index.Login, { onSubmit: _auth.login });
};
var ForgotView = exports.ForgotView = function ForgotView() {
  return _react2.default.createElement(_index.Forgot, { onSubmit: _auth.remind });
};

/***/ }),

/***/ "./src/js/views/panel/AssignmentView.jsx":
/*!***********************************************!*\
  !*** ./src/js/views/panel/AssignmentView.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LessonView = function (_Flux$View) {
  _inherits(LessonView, _Flux$View);

  function LessonView() {
    _classCallCheck(this, LessonView);

    var _this = _possibleConstructorReturn(this, (LessonView.__proto__ || Object.getPrototypeOf(LessonView)).call(this));

    var session = _bcReactSession.Session.store.getSession();
    _this.state = {
      loading: true,
      token: session.access_token || ''
    };
    return _this;
  }

  _createClass(LessonView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var url = "https://breatheco.de/en/project/?plain=true&slug=" + this.props.match.params.assignment_slug + '&access_token=' + this.state.token;
      return _react2.default.createElement(
        _index.Panel,
        { padding: false },
        _react2.default.createElement(_index.Loading, { show: this.state.loading }),
        _react2.default.createElement('iframe', { onLoad: function onLoad() {
            return _this2.setState({ loading: false });
          }, className: 'assignment-iframe', src: url,
          height: '100%', width: '100%', frameBorder: '0' })
      );
    }
  }]);

  return LessonView;
}(_reactFluxDash2.default.View);

exports.default = LessonView;

/***/ }),

/***/ "./src/js/views/panel/LessonView.jsx":
/*!*******************************************!*\
  !*** ./src/js/views/panel/LessonView.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _BCStore = __webpack_require__(/*! ../../stores/BCStore.js */ "./src/js/stores/BCStore.js");

var _BCStore2 = _interopRequireDefault(_BCStore);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

var _menu = __webpack_require__(/*! ../../utils/menu */ "./src/js/utils/menu.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LessonView = function (_Flux$View) {
  _inherits(LessonView, _Flux$View);

  function LessonView() {
    _classCallCheck(this, LessonView);

    var _this = _possibleConstructorReturn(this, (LessonView.__proto__ || Object.getPrototypeOf(LessonView)).call(this));

    _this.state = {
      loading: true,
      navbarCollapsed: false,
      token: _bcReactSession.Session.get().payload.access_token || ''
    };
    return _this;
  }

  _createClass(LessonView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dayNumber = this.props.match.params.day_number;
      this.loadDay(dayNumber);
      this.bindStore(_BCStore2.default, 'syllabus', function () {
        var dayNumber = _this2.props.match.params.day_number;
        _this2.loadDay(dayNumber);
      });
    }
  }, {
    key: 'loadDay',
    value: function loadDay() {
      var newDay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var day = _BCStore2.default.getSingleDay(newDay || this.props.match.params.day_number);
      if (day) {
        var currentSlug = (0, _menu.getCurrentPath)().view;
        var previousAction = void 0,
            nextAction = void 0,
            currentAction = null;
        day.actionables.forEach(function (act, i) {
          if (act.associated_slug == currentSlug) {
            currentAction = day.actionables[i] || null;
            previousAction = day.actionables[i - 1] || null;
            nextAction = day.actionables[i + 1] || null;
          }
        });
        this.setState({ day: day, currentAction: currentAction, previousAction: previousAction, nextAction: nextAction });
      }
    }
  }, {
    key: 'getCurrentSlug',
    value: function getCurrentSlug() {
      var quiz = this.props.match.params.quiz_slug;
      var lesson = this.props.match.params.lesson_slug;
      var replit = this.props.match.params.replit_slug;
      return quiz || lesson || replit;
    }
  }, {
    key: 'render',
    value: function render(option) {
      var _this3 = this;

      var course_slug = this.props.match.params.course_slug;
      var getSlug = function getSlug(as) {
        return '/course/' + course_slug + '/' + _this3.state.day.dayNumber + '/' + as.type.charAt(0) + '/' + as.associated_slug;
      };
      var src = "https://breatheco.de" + '/en/lesson/' + this.props.match.params.lesson_slug + '?plain=true&access_token=' + this.state.token;
      return _react2.default.createElement(
        _index.Panel,
        { padding: false, style: { overflow: 'hidden' } },
        _react2.default.createElement(_index.Loading, { show: this.state.loading }),
        _react2.default.createElement(_index.PanelNavbar, {
          collapsed: this.state.navbarCollapsed,
          day: this.state.day,
          current: this.state.currentAction,
          previous: this.state.previousAction,
          next: this.state.nextAction,
          onClick: function onClick(option) {
            _this3.props.history.push(getSlug(option));
            _this3.setState({ loading: true });
            _this3.loadDay(option.day.number);
          },
          onCollapse: function onCollapse() {
            return _this3.setState({ navbarCollapsed: !_this3.state.navbarCollapsed });
          }
        }),
        _react2.default.createElement('iframe', { onLoad: function onLoad() {
            return _this3.setState({ loading: false });
          }, className: 'lesson-iframe', src: src,
          height: '100%', width: '100%', frameBorder: '0' })
      );
    }
  }]);

  return LessonView;
}(_reactFluxDash2.default.View);

exports.default = LessonView;

/***/ }),

/***/ "./src/js/views/panel/QuizView.jsx":
/*!*****************************************!*\
  !*** ./src/js/views/panel/QuizView.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LessonView = function (_Flux$View) {
  _inherits(LessonView, _Flux$View);

  function LessonView() {
    _classCallCheck(this, LessonView);

    var _this = _possibleConstructorReturn(this, (LessonView.__proto__ || Object.getPrototypeOf(LessonView)).call(this));

    _this.state = {
      loading: true,
      token: _bcReactSession.Session.store.getSession().access_token || ''
    };
    return _this;
  }

  _createClass(LessonView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var src = "https://assets.breatheco.de" + '/apps/quiz/' + this.props.match.params.quiz_slug + '?access_token=' + this.state.token;
      return _react2.default.createElement(
        _index.Panel,
        { padding: false },
        _react2.default.createElement(_index.Loading, { show: this.state.loading }),
        _react2.default.createElement('iframe', { onLoad: function onLoad() {
            return _this2.setState({ loading: false });
          }, className: 'quiz-iframe', src: src,
          height: '100%', width: '100%', frameBorder: '0' })
      );
    }
  }]);

  return LessonView;
}(_reactFluxDash2.default.View);

exports.default = LessonView;

/***/ }),

/***/ "./src/js/views/panel/ReplitView.jsx":
/*!*******************************************!*\
  !*** ./src/js/views/panel/ReplitView.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _StudentStore = __webpack_require__(/*! ../../stores/StudentStore */ "./src/js/stores/StudentStore.js");

var _StudentStore2 = _interopRequireDefault(_StudentStore);

var _ravenJs = __webpack_require__(/*! raven-js */ "./node_modules/raven-js/src/singleton.js");

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplitView = function (_Flux$View) {
  _inherits(ReplitView, _Flux$View);

  function ReplitView() {
    _classCallCheck(this, ReplitView);

    var _this = _possibleConstructorReturn(this, (ReplitView.__proto__ || Object.getPrototypeOf(ReplitView)).call(this));

    _this.state = {
      loading: true,
      cohort: '',
      error: false
    };
    return _this;
  }

  _createClass(ReplitView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var session = _bcReactSession.Session.get();
      this.setState({ cohort: session.payload.currentCohort });
    }
  }, {
    key: 'getReplitURL',
    value: function getReplitURL() {
      var replit_slug = this.props.match.params.replit_slug;
      var cohort_slug = this.state.cohort.slug;
      var url = "https://assets.breatheco.de/apps/replit?r=" + replit_slug + '&c=' + cohort_slug;
      if (typeof replit_slug === 'undefined' || typeof cohort_slug === 'undefined' || "string" === 'undefined') _ravenJs2.default.captureException(new Error('Invalid Replit URL ' + url));

      return url;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _index.Panel,
        { padding: false },
        !this.state.error ? _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_index.Loading, { show: this.state.loading }),
          _react2.default.createElement('iframe', { onLoad: function onLoad(e) {
              _this2.setState({ loading: false });
            }, className: 'replit-iframe', src: this.getReplitURL(),
            height: '100%', width: '100%', frameBorder: '0' })
        ) : _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          this.state.error
        )
      );
    }
  }]);

  return ReplitView;
}(_reactFluxDash2.default.View);

exports.default = ReplitView;

/***/ }),

/***/ "./src/js/views/panel/VTurorialView.jsx":
/*!**********************************************!*\
  !*** ./src/js/views/panel/VTurorialView.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactFluxDash = __webpack_require__(/*! @4geeksacademy/react-flux-dash */ "./node_modules/@4geeksacademy/react-flux-dash/dist/react-flux-dash.js");

var _reactFluxDash2 = _interopRequireDefault(_reactFluxDash);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _index = __webpack_require__(/*! ../../components/react-components/src/index */ "./src/js/components/react-components/src/index.js");

var _bcReactSession = __webpack_require__(/*! bc-react-session */ "./node_modules/bc-react-session/dist/session.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VTurorialView = function (_Flux$View) {
  _inherits(VTurorialView, _Flux$View);

  function VTurorialView() {
    _classCallCheck(this, VTurorialView);

    var _this = _possibleConstructorReturn(this, (VTurorialView.__proto__ || Object.getPrototypeOf(VTurorialView)).call(this));

    _this.state = {
      loading: true,
      alertMsg: null,
      token: _bcReactSession.Session.get().payload.access_token || ''
    };
    return _this;
  }

  _createClass(VTurorialView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        alertMsg: _react2.default.createElement(
          "span",
          null,
          "You should only watch this video if you are stuck ",
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/course/' + this.props.match.params.course_slug + '/' + this.props.match.params.day_number + '/r/' + this.props.match.params.replit_slug },
            "continue working on the exercises"
          )
        )
      });
      setTimeout(function () {
        return _this2.setState({ alertMsg: null });
      }, 4000);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var src = "https://assets.breatheco.de" + "/apps/video/?v=" + this.props.match.params.vtutorial_slug + "&access_token=" + this.state.token;
      return _react2.default.createElement(
        _index.Panel,
        { padding: false, style: { overflow: 'hidden' } },
        _react2.default.createElement(_index.Loading, { show: this.state.loading }),
        this.state.alertMsg ? _react2.default.createElement(
          "div",
          { className: "alert alert-warning m-0 text-center" },
          this.state.alertMsg
        ) : '',
        _react2.default.createElement("iframe", { onLoad: function onLoad() {
            return _this3.setState({ loading: false });
          }, className: "lesson-iframe", src: src,
          height: "100%", width: "100%", frameBorder: "0" })
      );
    }
  }]);

  return VTurorialView;
}(_reactFluxDash2.default.View);

exports.default = VTurorialView;

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/styles/index.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map