'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var squad = require('squad');
var apart = require('apart');

var unary = function unary(fn) {
    return function (value) {
        return fn(value);
    };
};
var notEmpty = function notEmpty(value) {
    return !!value;
};

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
        var _arguments = arguments;

        processingFilters.some(function (filter) {
            return filter.apply(undefined, _arguments);
        });

        return storify();
    };
}

function store(condition) {
    var cache = undefined;

    return function (value) {
        var result = undefined;

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
    },
        notEqual = function notEqual(a, b) {
        return a !== b;
    },
        wrong = function wrong(type) {
        throw Error('fn should be ' + type + '!');
    },
        wrongType = apart(wrong, type),
        notType = apart(notEqual, type);

    if (!array.length) wrongType(type);else array.map(getType).filter(notType).forEach(wrongType);
}