'use strict';

//const console = require('console');

var exporter = window;
var node = false;

if ( module !== undefined ) {
  
  exporter = module.exports;
  node = true;

} 
  //module.exports = ( function ( log ) {
  exporter = ( function ( log, context ) {
  
      let dict = context ? 'node' : 'win';

      /**
       * api for more informative logging
       * Leverages partial functions
       * */
  
      const the = {};
      /**
       * NodeJS values
       * */
      const features = {
          node: {
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
          },
          win: {
            bg: {
              night:"%cbackground-color: black",
              error:"%cbackground-color: red",
              success:"%cbackground-color: green",
              caution:"%cbackground-color: yellow",
              official:"%cbackground-color: blue",
              priority:"%cbackground-color: purple",
              info:"%cbackground-color: light-blue",
              day:"%cbackground-color: white"
            },
            txt: {
              night:"%ccolor: black",
              error:"%ccolor: red",
              success:"%ccolor: green",
              caution:"%ccolor: yellow",
              official:"%ccolor: blue",
              priority:"%ccolor: purple",
              info:"%ccolor: light-blue",
              day:"%ccolor: white"
            }
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
  
          let bg = features[dict].bg[background];
          let txt = features[dict].txt[foreground];
  
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
  
  })( console.log, node );