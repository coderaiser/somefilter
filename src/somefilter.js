'use strict';

let squad       = require('squad');
let apart       = require('apart');

let unary       = fn => value => fn(value);
let notEmpty    = value => !!value;

module.exports = somefilter;

function somefilter(condition, filters) {
    if (!filters) {
        filters     = condition;
        condition   = notEmpty;
    }
    
    checkAll(condition, filters);
    
    let storify = store(condition);
    let process = apart(squad, condition, storify);
    
    let processingFilters = filters
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
    let getType     = item => typeof item,
        notEqual    = (a, b) => a !== b,
        wrong       = type => {
            throw Error(`fn should be ${ type }!`);
        },
        
        wrongType   = apart(wrong, type),
        notType     = apart(notEqual, type);
    
    if (!array.length)
        wrongType(type);
    else
        array
            .map(getType)
            .filter(notType)
            .forEach(wrongType);
}
