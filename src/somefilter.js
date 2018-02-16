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
