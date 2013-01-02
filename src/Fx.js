/**
* Copyright (c) 2012 Christian Schlosrich.
* Fx is a utility belt covering data structures, math, geometry, time, rendering and DOM manipulation.
* It was built along the way to solve common and recurring challenges in day to day development.
*/
(function(window){

    var window = window,
        document = window.document,

        fx = function(selector, context){
            return new fx.fn.init(selector, context, fx);
        };

    // Method for dynamic creation of namespaces for sub modules
    fx.provide = function(ns) {
        var parts = ns.split('.'),
            parent = this,
            pl, 
            i;

        if(parts[0] === 'fx') {
            parts = parts.slice(1);
        }

        pl = parts.length;

        for (i = 0; i < pl; i++) {
            if (typeof parent[parts[i]] == 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }

        return parent;
    }

    /**
    * Shortcut to fx.Type.get function
    */
    fx.getType = function(arg){
        return fx.Type.get(arg);
    }

    // Wrap 'hasAttribute' since this is unsupported in IE7
    fx.hasAttribute = function(el, attr){
        if(!!el.hasAttribute){
            return el.hasAttribute(attr); 
        } else if(!!el.getAttribute){
            el.getAttribute(attr);
        }
    }
    
    /**
    * Determines if selector is a media query by comparing the first char to the list of qualifying prefixes (eg. # or :)
    */
    fx.hasPrefix = function(selector, prefix){
        if(fx.getType(selector) !== '[object String]'){
            return false;
        }
        
        var prefix = prefix.split('');

        for(var i = 0; i < prefix.length; i++){
            if(selector.substring(0, 1) === prefix[i]){
                return true;
            }
        }           

        return false; 
    }

    /**
    * Returns true if selector qualifies as a media query.
    * Examples of media queries are '#boo', ':red' or {'width' : '200px'} 
    */
    fx.isQuery = function(selector){
        if(fx.hasPrefix(selector, ':#') || fx.Type.isObject(selector)){
            return true;
        }
        
        return false;
    }

    /**
    * Returns true if supplied argument is a qualifying Node object. 
    * http://krook.org/jsdom/Node.html
    */
    fx.isNode = function(arg){
        if(fx.Type.isArray(arg) || fx.Type.isFunction(arg) || fx.Type.isString(arg) || fx.Type.isNumber(arg) || fx.Type.isBoolean(arg) || fx.Type.isUndefined(arg) || fx.Type.isNull(arg)){
            return false;
        }

        return 'nodeType' in arg && 'nodeName' in arg;
    }

    /**
    * Determines is argument is a qualifying HTMLElement object. http://krook.org/jsdom/Element.html
    */
    fx.isElement = function(node){
        if(!fx.isNode(node)){
            return false;
        }

        return node.nodeType === 1;
    }

    /**
    * Determines is argument is document. http://krook.org/jsdom/Document.html
    */
    fx.isDocument = function(node){
        if(!fx.isNode(node)){
            return false;
        }

        return node.nodeType === 9;
    }

    /*
     * Shorthand method to create fx Node objects (fx Node objects are wrapper Objects for Elements)
     */
    fx.createElement = function(selector){
        if(fx.isElement(selector)){
            return selector;
        }

        return new fx.Element(selector);   
    }

    /*
     * Returns true if argument qualifies as an fx.Element object
     */
    fx.isElement = function(arg){
        return arg instanceof fx.Element;
    }

    fx.isHTMLString = function(arg){
        return fx.Type.isString(arg) && arg.charAt(0) === '<' && arg.charAt(arg.length - 1) === '>' && arg.length >= 3; // Crude test to determine if String is HTML
    }

    fx.hasClass = function(element, className) {
        return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    // new trim: replace(/(^\s+|\s+$)/g, '');
    // old trim: replace(/^\s|\s$/, '');
    fx.addClass = function(element, className) {
        if(!fx.hasClass(element, className)){
            className = className.replace(/(^\s+|\s+$)/g, '');
            element.className = element.className.replace(/(^\s+|\s+$)/g, '');
            element.className += ' ' + className;
        } 
    }

    fx.removeClass = function(element, className) {
        if(fx.hasClass(element, className)){
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
            element.className = element.className.replace(/(^\s+|\s+$)/g, '');
        }
    }

    fx.swapClass = function(element, className, newClassName){
        fx.removeClass(element, className);
        fx.addClass(element, newClassName);
    }

    // The main entry point is a shorthand to the fx.Dom module
    fx.fn = fx.prototype = {

        constructor : fx,

        init : function(selector, context, fx){
            var queryResult;

            if(!selector){
                return [];
            } else if(fx.isElement(selector)){
                return selector;
            }

            // If no context is provided set the context to document.body
            var context = context || document.body;

            // Check if selector is a query
            if(fx.isQuery(selector)){
                queryResult = fx.Dom.find(context, selector);
            } else{
                return fx.createElement(selector);
            }

            // If result convert to FxElement and return it
            if(queryResult){
                return fx.createElement(queryResult); 
            }
            
            return []; // No match
        }
    }
    
    // Expose fx to window
    window.fx = fx;

})(window);

// http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
(function(window){
    window.performance = window.performance || {};

    performance.now = (function() {
        return  performance.now       ||
                performance.mozNow    ||
                performance.msNow     ||
                performance.oNow      ||
                performance.webkitNow ||
                function() { return new Date().getTime();
                };
    })();
})(window);

/**
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
* http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
* requestAnimationFrame polyfill by Erik Möller
* fixes from Paul Irish and Tino Zijdel
* Added presision timing (when available)
*/
(function(window){

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if(window.requestAnimationFrame === undefined || !window.requestAnimationFrame) {
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = window.performance.now(), 
                timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if(window.cancelAnimationFrame === undefined || !window.cancelAnimationFrame){
        window.cancelAnimationFrame = function ( id ) { 
            clearTimeout( id ); 
        };
    }

})(window);

/**
* Polyfill for Object.create (natively supported from js version 1.8.5 and up)
* https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
*/
if(!Object.create) {
    Object.create = function (o) {
        
        if(arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }

        function F(){}
        F.prototype = o;
        return new F();
    };
}