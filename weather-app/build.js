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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _connectMap = __webpack_require__(1);

_connectMap.myMap.initMap();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleMap = function () {
    function GoogleMap() {
        _classCallCheck(this, GoogleMap);
    }

    _createClass(GoogleMap, [{
        key: 'initMap',
        value: function initMap() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: new google.maps.LatLng(_const.DEFAULT_WIDTH_LOCATION, _const.DEFAULT_HEIGHT_LOCATION),
                mapTypeId: 'terrain'
            });
            this.infoWindow = new google.maps.InfoWindow({ map: this.map });

            this.setLocation();
        }
    }, {
        key: 'setLocation',
        value: function setLocation() {
            var _this = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    _this.pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    _this.configInfoWindow();
                    _this.map.setCenter(_this.pos);
                }, function () {
                    _this.handleLocationError(true);
                });

                return;
            }

            this.handleLocationError(false);
        }
    }, {
        key: 'configInfoWindow',
        value: function configInfoWindow() {
            this.infoWindow.setPosition(this.pos);
            this.infoWindow.setContent(_const.FOUND_LOCATION_MESSAGE);
        }
    }, {
        key: 'handleLocationError',
        value: function handleLocationError(browserHasGeolocation) {
            this.infoWindow.setContent(browserHasGeolocation ? _const.SERVICE_ERROR : _const.BROWSER_ERROR);
        }
    }]);

    return GoogleMap;
}();

var myMap = exports.myMap = new GoogleMap();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SERVICE_ERROR = 'Error: The Geolocation service failed.';
var BROWSER_ERROR = 'Error: Your browser doesn\'t support geolocation.';
var DEFAULT_WIDTH_LOCATION = 2.8; // rename
var DEFAULT_HEIGHT_LOCATION = -187.3;
var FOUND_LOCATION_MESSAGE = 'Your location';

exports.SERVICE_ERROR = SERVICE_ERROR;
exports.BROWSER_ERROR = BROWSER_ERROR;
exports.DEFAULT_WIDTH_LOCATION = DEFAULT_WIDTH_LOCATION;
exports.DEFAULT_HEIGHT_LOCATION = DEFAULT_HEIGHT_LOCATION;
exports.FOUND_LOCATION_MESSAGE = FOUND_LOCATION_MESSAGE;

/***/ })
/******/ ]);