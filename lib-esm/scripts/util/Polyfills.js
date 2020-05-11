var Polyfills = (function () {
    function Polyfills() {
    }
    Polyfills.check = function () {
        var windowToCheck = window;
        if (!windowToCheck.Promise) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Promise');
            require('es6-promise').polyfill();
        }
        if (!Array.from) {
            console.log('T1C-JS Lib: applying polyfill for ES6 Array');
            require('core-js/es6/array');
            require('core-js/es6/typed');
        }
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
export { Polyfills };
//# sourceMappingURL=Polyfills.js.map