(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//const console = require('console');


//module.exports = ( function ( log ) {
window.logger = ( function ( log ) {

    /**
     * api for more informative logging
     * Leverages partial functions
     * */

    const the = {};

    const features = {
          bg: {
            night:"\x1b[40m",
            error:"\x1b[41m",
            success:"\x1b[42m",
            caution:"\x1b[43m",
            official:"\x1b[44m",
            priority:"\x1b[45m",
            info:"\x1b[46m",
            day:"\x1b[47m"
          },
          txt: {
            night:"\x1b[30m",
            error:"\x1b[31m",
            success:"\x1b[32m",
            caution:"\x1b[33m",
            official:"\x1b[34m",
            priority:"\x1b[35m",
            info:"\x1b[36m",
            day:"\x1b[37m"
          }
        };

    const clear = '%s\x1b[0m';
    const concat = '%s';

    function lookUp ( foreground, background, line ) {
        /**
         * @param string foreground
         * @param string background
         * @param boolean line
         * @return string
         * */

        let resolved = [];

        let bg = features.bg[background];
        let txt = features.txt[foreground];

        if ( bg ) resolved.push(bg);

        if ( txt ) resolved.push(txt);

        if ( line ) resolved.push(line);

        return resolved.join('');

    }

    function curry ( func ) {
        /**
         * template for currying functions
         * @param function func
         * @return function
         * */

      return function curried (...args) {

        if ( args.length >= func.length ) {

          return func.apply(this, args);

        } else {

          return function(...args2) {

            return curried.apply(this, args.concat(args2));

          };

        }
      };

    }

    function partial ( func, ...argsBound ) {
        /**
         * template for currying functions
         * @param function func
         * @param array argsBound
         * @return function
         * */

      return function(...args) {
          // (*)
        return func.call(this, ...argsBound, ...args);

      };

    }

    the.configLog = function ( txt = 'day', bkgrnd = '\x1b[0m', persist = false ) {
       /**
         * @param string txt
         * @param string bkgrnd
         * @param boolean persist
         * @return function
         * */

        let reset = persist === true ? '' : clear;

        let styles = lookUp( txt, bkgrnd, reset );

        return partial( the.customLog, styles );

    };

    the.customLog = function ( styles , msg ) {
        /**
         * @param string styles
         * @param string msg
         * */

        log( styles, msg );

    };

    return the.configLog;

})( console.log );
},{}]},{},[1]);
