'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var currify = require('currify/legacy');
var squad = require('squad/legacy');
var apart = require('apart');

var unary = currify(function (fn, value) {
    return fn(value);
});
var notEmpty = function notEmpty(value) {
    return value;
};
var apply = currify(function (args, fn) {
    return fn.apply(undefined, _toConsumableArray(args));
});

module.exports = somefilter;

function somefilter(condition, filters) {
    if (!filters) {
        filters = condition;
        condition = notEmpty;
    }

    checkAll(condition, filters);

    var storify = store(condition);
    var process = apart(squad, condition, storify);

    var processingFilters = filters.map(unary(process)).reverse();

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        processingFilters.some(apply(args));

        return storify();
    };
}

function store(condition) {
    var cache = void 0;

    return function (value) {
        var result = void 0;

        if (condition(value)) {
            cache = result = value;
        } else {
            result = cache;
            cache = null;
        }

        return result;
    };
}

function checkAll(condition, filters) {
    if (typeof condition !== 'function') throw Error('condition should be function!');

    if (!Array.isArray(filters)) throw Error('filters should be an array!');

    check('function', filters);
}

function check(type, array) {
    var getType = function getType(item) {
        return typeof item === 'undefined' ? 'undefined' : _typeof(item);
    };
    var notEqual = function notEqual(a, b) {
        return a !== b;
    };
    var wrong = function wrong(type) {
        throw Error('fn should be ' + type + '!');
    };

    var wrongType = apart(wrong, type);
    var notType = apart(notEqual, type);

    if (!array.length) return wrongType(type);

    array.map(getType).filter(notType).forEach(wrongType);
}