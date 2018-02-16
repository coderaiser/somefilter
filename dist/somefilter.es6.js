(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somefilter = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var tail = function tail(list) {
    return slice(list, 1);
};

module.exports = apart;

function apart(fn) {
    check(fn);

    var first = tail(arguments);

    return function () {
        var args = [].concat(_toConsumableArray(first), Array.prototype.slice.call(arguments));

        return fn.apply(undefined, _toConsumableArray(args));
    };
}

function slice(list, from, to) {
    return [].slice.call(list, from, to);
}

function check(fn) {
    if (typeof fn !== 'function') throw Error('fn should be function!');
}
},{}],2:[function(require,module,exports){
module.exports = require('./squad');

},{"./squad":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function () {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
    }

    check('function', funcs);

    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return funcs.reduceRight(apply, args).pop();
    };
};

function apply(value, fn) {
    return [fn.apply(undefined, _toConsumableArray(value))];
}

function check(type, array) {
    var wrongType = partial(wrong, type);
    var notType = partial(notEqual, type);

    if (!array.length) return wrongType(type);

    array.map(getType).filter(notType).forEach(wrongType);
}

function partial(fn, value) {
    return fn.bind(null, value);
}

function getType(item) {
    return typeof item === 'undefined' ? 'undefined' : _typeof(item);
}

function notEqual(a, b) {
    return a !== b;
}

function wrong(type) {
    throw Error('fn should be ' + type + '!');
}
},{}],"somefilter":[function(require,module,exports){
'use strict';

const squad = require('squad/legacy');
const apart = require('apart');

const unary = fn => value => fn(value);
const notEmpty = value => !!value;

module.exports = somefilter;

function somefilter(condition, filters) {
    if (!filters) {
        filters     = condition;
        condition   = notEmpty;
    }
    
    checkAll(condition, filters);
    
    const storify = store(condition);
    const process = apart(squad, condition, storify);
    
    const processingFilters = filters
        .map(unary(process))
        .reverse();
    
    return function() {
        processingFilters
            .some(filter =>
                filter(...arguments)
            );
        
        return storify();
    };
}

function store(condition) {
    let cache;
   
    return value => {
       let result;
       
        if (condition(value)) {
            cache   =
            result  = value;
        } else {
            result  = cache;
            cache   = null;
        }
       
        return result;
   };
}

function checkAll(condition, filters) {
    if (typeof condition !== 'function')
        throw Error('condition should be function!');
    
    if (!Array.isArray(filters))
        throw Error('filters should be an array!');
    
    check('function', filters);
}

function check(type, array) {
    const getType = item => typeof item;
    const notEqual = (a, b) => a !== b;
    const wrong = type => {
        throw Error(`fn should be ${ type }!`);
    };
    
    const wrongType = apart(wrong, type);
    const notType = apart(notEqual, type);
    
    if (!array.length)
        return wrongType(type);
    
    array
        .map(getType)
        .filter(notType)
        .forEach(wrongType);
}

},{"apart":1,"squad/legacy":2}]},{},["somefilter"])("somefilter")
});