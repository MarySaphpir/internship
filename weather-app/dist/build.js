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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAP_API_URL = exports.MAP_API_URL = 'https://maps.googleapis.com/maps/api/js?';
var MAP_KEY = exports.MAP_KEY = 'AIzaSyAsPZDqrpgqq65I_XWaTkX7Y8Ac5QNLZDM';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GoogleMap = __webpack_require__(2);

var _GoogleMapScript = __webpack_require__(9);

window.googleMap = new _GoogleMap.GoogleMap();
var googleMapScript = new _GoogleMapScript.GoogleMapScript();

googleMapScript.append();
googleMapScript.script.addEventListener("error", function (error) {
  return console.log(error);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaultCoordinates = __webpack_require__(3);

var _error = __webpack_require__(4);

var _ApiService = __webpack_require__(5);

var _MarkerGenerator = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleMap = exports.GoogleMap = function () {
    function GoogleMap() {
        _classCallCheck(this, GoogleMap);

        this.currentData = new _ApiService.ApiService();
    }

    _createClass(GoogleMap, [{
        key: 'initMap',
        value: function initMap() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                minZoom: 2,
                maxZoom: 10,
                center: new google.maps.LatLng(_defaultCoordinates.WIDTH, _defaultCoordinates.HEIGHT),
                mapTypeId: 'satellite'
            });
            this.markerGenerator = new _MarkerGenerator.MarkerGenerator(this.map);
            this.postLocation();
            this.map.addListener('idle', this.redrawCircles());
        }
    }, {
        key: 'redrawCircles',
        value: function redrawCircles() {
            var _this = this;

            var timer = void 0;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    _this.getCoords();
                    _this.markerGenerator.removeCircles(_this.markerGenerator.markersArray);
                }, 500);
            };
        }
    }, {
        key: 'getCoords',
        value: function getCoords() {
            var ne = this.map.getBounds().getNorthEast();
            var sw = this.map.getBounds().getSouthWest();
            this.getPoints([sw.lng(), sw.lat(), ne.lng(), ne.lat(), this.map.getZoom()]);
        }
    }, {
        key: 'getPoints',
        value: function getPoints(urlParam) {
            var _this2 = this;

            this.currentData.getWeatherInfo(urlParam).then(function (response) {
                return response.map(function (dataPoint) {
                    return {
                        city: dataPoint.city,
                        coordinates: dataPoint.coord,
                        temperature: dataPoint.temp,
                        color: _this2.setColor(dataPoint.temp)
                    };
                });
            }).then(function (response) {
                for (var circle in response) {
                    _this2.markerGenerator.createCircle(response[circle]);
                }
            });
        }
    }, {
        key: 'setColor',
        value: function setColor(temperature) {
            var weight = Math.abs(temperature) / 50;
            var hue = ((1 - weight) * 250).toString(10);
            return 'hsl(' + hue + ', 100%, 50%)';
        }
    }, {
        key: 'postLocation',
        value: function postLocation() {
            var _this3 = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    _this3.map.setCenter(currentPosition);
                }, function () {
                    _this3.handleLocationError(true);
                });
                return;
            }
            this.handleLocationError(false);
        }
    }, {
        key: 'handleLocationError',
        value: function handleLocationError(browserHasGeolocation) {
            this.infoWindow.setContent(browserHasGeolocation ? _error.SERVICE_ERROR : _error.BROWSER_ERROR);
        }
    }]);

    return GoogleMap;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var WIDTH = exports.WIDTH = 2.8;
var HEIGHT = exports.HEIGHT = -187.3;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SERVICE_ERROR = exports.SERVICE_ERROR = 'Error: The Geolocation service failed.';
var BROWSER_ERROR = exports.BROWSER_ERROR = 'Error: Your browser doesn\'t support geolocation.';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApiService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weatherApiConfig = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiService = exports.ApiService = function () {
    function ApiService() {
        _classCallCheck(this, ApiService);
    }

    _createClass(ApiService, [{
        key: 'getWeatherInfo',
        value: function getWeatherInfo(position) {
            return fetch('' + _weatherApiConfig.WEATHER_API_URL + position + '&appid=' + _weatherApiConfig.WEATHER_API_KEY).then(function (response) {
                return response.json();
            }).then(function (res) {
                return res.list.map(function (_ref) {
                    var coord = _ref.coord,
                        main = _ref.main,
                        name = _ref.name;
                    return { coord: coord, temp: Math.round(main.temp), city: name };
                });
            }).catch(position);
        }
    }]);

    return ApiService;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var WEATHER_API_KEY = exports.WEATHER_API_KEY = '4c82d0abdf5e396e4d75d19a72f5a2e6';
var WEATHER_API_URL = exports.WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/box/city?bbox=';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MarkerGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _markerParam = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarkerGenerator = exports.MarkerGenerator = function () {
    function MarkerGenerator(map) {
        _classCallCheck(this, MarkerGenerator);

        this.markersArray = [];
        this.map = map;
    }

    _createClass(MarkerGenerator, [{
        key: 'removeCircles',
        value: function removeCircles(markersArray) {
            for (var i in markersArray) {
                markersArray[i].setMap(null);
            }
        }
    }, {
        key: 'showInfo',
        value: function showInfo(_ref, cityCircle) {
            var _this = this;

            var coordinates = _ref.coordinates,
                temperature = _ref.temperature,
                city = _ref.city;

            var infowindow = new google.maps.InfoWindow({
                content: 'In ' + city + ' temperature is: ' + temperature + ' C',
                position: { lat: coordinates.Lat, lng: coordinates.Lon }
            });
            cityCircle.addListener('click', function () {
                return infowindow.open(_this.map, cityCircle);
            });
            cityCircle.addListener('mouseout', function () {
                return infowindow.close(_this.map, cityCircle);
            });
        }
    }, {
        key: 'getRadius',
        value: function getRadius() {
            var radius = this.map.getZoom() < _markerParam.AVERAGE_RADIUS ? _markerParam.MAX_CIRCLE_RADIUS - _markerParam.RADIUS_COEFFICIENT : _markerParam.MIN_CIRCLE_RADIUS - _markerParam.RADIUS_COEFFICIENT;
            return radius / this.map.getZoom();
        }
    }, {
        key: 'createCircle',
        value: function createCircle(circleParam) {
            var circle = new google.maps.Circle({
                strokeColor: circleParam.color,
                strokeOpacity: 0.8,
                strokeWeight: .2,
                fillColor: circleParam.color,
                fillOpacity: .5,
                map: this.map,
                center: { lat: circleParam.coordinates.Lat, lng: circleParam.coordinates.Lon },
                radius: this.getRadius()
            });
            this.showInfo(circleParam, circle);
            this.markersArray.push(circle);
        }
    }]);

    return MarkerGenerator;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MIN_CIRCLE_RADIUS = exports.MIN_CIRCLE_RADIUS = 170000;
var MAX_CIRCLE_RADIUS = exports.MAX_CIRCLE_RADIUS = 280000;
var RADIUS_COEFFICIENT = exports.RADIUS_COEFFICIENT = 6000;
var AVERAGE_RADIUS = exports.AVERAGE_RADIUS = 6;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleMapScript = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GoogleMapUrl = __webpack_require__(10);

var _googleMapConfig = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleMapScript = exports.GoogleMapScript = function () {
    function GoogleMapScript() {
        _classCallCheck(this, GoogleMapScript);

        this.script = document.createElement('script');
        this.script.defer = true;
        this.script.async = true;
    }

    _createClass(GoogleMapScript, [{
        key: 'generateUrl',
        value: function generateUrl() {
            var newUrl = new _GoogleMapUrl.GoogleMapUrl();
            this.script.src = 'https://maps.googleapis.com/maps/api/js?key=' + _googleMapConfig.MAP_KEY + '&libraries=visualization&callback=googleMap.initMap';
        }
    }, {
        key: 'append',
        value: function append() {
            this.generateUrl();
            document.getElementsByTagName('body')[0].appendChild(this.script);
        }
    }]);

    return GoogleMapScript;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GoogleMapUrl = undefined;

var _AbstractUrlBuilder2 = __webpack_require__(11);

var _googleMapConfig = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleMapUrl = exports.GoogleMapUrl = function (_AbstractUrlBuilder) {
    _inherits(GoogleMapUrl, _AbstractUrlBuilder);

    function GoogleMapUrl() {
        _classCallCheck(this, GoogleMapUrl);

        var _this = _possibleConstructorReturn(this, (GoogleMapUrl.__proto__ || Object.getPrototypeOf(GoogleMapUrl)).call(this));

        _this.params = {
            key: _googleMapConfig.MAP_KEY,
            libraries: 'visualization',
            callback: 'googleMap.initMap'
        };
        return _this;
    }

    return GoogleMapUrl;
}(_AbstractUrlBuilder2.AbstractUrlBuilder);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class AbstractUrlBuilder {
    constructor() {
        this.params = {};
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            throw new Error(`Can't be converted to number!`)
        }
        return Object
            .keys(this.params)
            .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(this.params[param])}`)
            .join('&');
    }
}
/* harmony export (immutable) */ __webpack_exports__["AbstractUrlBuilder"] = AbstractUrlBuilder;


/***/ })
/******/ ]);