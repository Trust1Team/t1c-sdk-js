"use strict";
/**
 * @author Maarten Somers
 * @since 2018
 */
exports.__esModule = true;
var Polyfills = /** @class */ (function () {
    function Polyfills() {
    }
    // utility to check browser compatibility with Promise, Array.from, Symbol
    Polyfills.check = function () {
        // check Promise
        var windowToCheck = window;
        if (!windowToCheck.Promise) {
            // not found, load promise polyfill (es6-promise)
            console.log('T1C-JS Lib: applying polyfill for ES6 Promise');
            require('es6-promise').polyfill();
        }
        // check Array.from
        if (!Array.from) {
            // not found, load array.from polyfill (core-js)
            console.log('T1C-JS Lib: applying polyfill for ES6 Array');
            require('core-js/es6/array');
            require('core-js/es6/typed');
        }
        // check Symbol
        if (!windowToCheck.Symbol) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Symbol');
            require('core-js/es6/symbol');
        }
        if (typeof Object.assign !== 'function') {
            console.log('T1C-JS Lib: applying polyfill for ES6 Object Assign');
            require('es6-object-assign').polyfill();
        }
        if (!String.prototype.startsWith) {
            console.log('T1C-JS Lib: applying polyfill for IE11 String.startsWith');
            String.prototype.startsWith = function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
            };
        }
        if (!String.prototype.endsWith) {
            console.log('T1C-JS Lib: applying polyfill for IE11 String.endsWith');
            String.prototype.endsWith = function (search, this_len) {
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
        // filter polyfill
        if (!Array.prototype.filter) {
            Array.prototype.filter = function (fun) {
                'use strict';
                if (this === void 0 || this === null) {
                    throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function') {
                    throw new TypeError();
                }
                var res = [];
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i];
                        if (fun.call(thisArg, val, i, t)) {
                            res.push(val);
                        }
                    }
                }
                return res;
            };
        }
        // array.find polyfill
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function (predicate) {
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }
                    var o = Object(this);
                    var len = o.length >>> 0;
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var thisArg = arguments[1];
                    var k = 0;
                    while (k < len) {
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return kValue;
                        }
                        k++;
                    }
                    return undefined;
                },
                configurable: true,
                writable: true
            });
        }
        // foreach polyfill
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (callback) {
                var T, k;
                if (this == null) {
                    throw new TypeError('this is null or not defined');
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== 'function') {
                    throw new TypeError(callback + ' is not a function');
                }
                if (arguments.length > 1) {
                    T = arguments[1];
                }
                k = 0;
                while (k < len) {
                    var kValue = void 0;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }
    };
    return Polyfills;
}());
exports.Polyfills = Polyfills;
