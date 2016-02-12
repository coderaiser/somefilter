(function() {
    'use strict';
    
    let somefilter  = require('../src/somefilter');
    let apart       = require('apart');
    let test        = require('tape');
    
    let add     = (a, b) => a + b;
    let less    = (a, b) => a < b;
    
    let sub10   = apart(add, -10);
    let sub5    = apart(add, -5);
    let more6   = apart(less, 6);
    
    test('return result of first function', t => {
        let find = somefilter([sub10, sub5]);
        
        t.deepEqual(find(6), 1);
        t.end();
    });
    
    test('return result of second function', t => {
        let find = somefilter([sub10, sub5]);
        
        t.deepEqual(find(5), -5);
        t.end();
    });
    
    test('return result according to condition', t => {
        let find = somefilter(more6, [sub5, sub10]);
        
        t.deepEqual(find(12), 7);
        t.end();
    });
    
    test('arguments: no', t => {
        t.throws(somefilter, /filters should be an array!/, 'should throw when no filters');
        t.end();
    });
    
    test('arguments: no filters', t => {
        let fn  = () => somefilter(more6);
       
        t.throws(fn, /filters should be an array!/, 'should throw when no filters');
        t.end();
    });
    
    test('arguments: condition not a function', t => {
        let fn  = () => somefilter([], []);
       
        t.throws(fn, /condition should be function!/, 'should throw when condition not function');
        t.end();
    });
    
    test('arguments: filter on a function', t => {
        let fn  = () => somefilter([() => {}, 'not a function']);
       
        t.throws(fn, /fn should be function!/, 'should throw when filter not a function');
        t.end();
    });
    
    test('arguments: empty array of filters', t => {
        let fn  = () => somefilter([]);
       
        t.throws(fn, /fn should be function!/, 'should throw when filter not a function');
        t.end();
    });
})();
