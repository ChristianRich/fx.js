/**
* Copyright (c) 2012 Christian Schlosrich.
*
* fx is a tool belt covering data structures, math, geometry, time and a large bundle of utility classed.
* It was built along the way to solve common and recurring challenges in day to day JavaScript development.
*/
(function(window){

	var fx = {};

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
    };

    /**
    * Shortcut to fx.Type.get function
    */
    fx.getType = function(arg){
        return fx.Type.get(arg);
	};

    fx.hasClass = function(element, className) {

		if(!element){
			throw new Error('fx.hasClass: Too few arguments.');
		}

		// Using HTML5 classList API - if available
		if(!!element.classList){
			return element.classList.contains(className);
		}

		// Fallback solution
		return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    };

    fx.addClass = function(element, className) {

		if(!element || !className){
			throw new Error('fx.addClass: Too few arguments.');
		}

		if(!!element.classList){
			element.classList.add(className);
			return;
		}

        if(!fx.hasClass(element, className)){
            className = className.replace(/(^\s+|\s+$)/g, '');
            element.className = element.className.replace(/(^\s+|\s+$)/g, '');
            element.className += ' ' + className;
        } 
    };

    fx.removeClass = function(element, className) {

		if(!element || !className){
			throw new Error('fx.removeClass: Too few arguments.');
		}

		if(!!element.classList){
			element.classList.remove(className);
			return;
		}

        if(fx.hasClass(element, className)){
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
            element.className = element.className.replace(/(^\s+|\s+$)/g, '');
        }
    };

    fx.swapClass = function(element, className, newClassName){

		if(!element || !className || !newClassName){
			throw new Error('fx.swapClass: Too few arguments.');
		}

        fx.removeClass(element, className);
        fx.addClass(element, newClassName);
    };

    fx.documentReady = function(win, fn) {

        var done = false,
            top = true,
            doc = win.document,
            root = doc.documentElement,
            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
            pre = doc.addEventListener ? '' : 'on';

        var init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        };

        var poll = function() {
            try { 
                root.doScroll('left'); 
            } catch(e) { 
                setTimeout(poll, 50);
                return;
            }

            init('poll');
        };

        if(doc.readyState == 'complete'){
       		fn.call(win, 'lazy');
        } else if(doc.createEventObject && root.doScroll) {
			try {
				top = !win.frameElement;
			} catch(e) {
				//
			}

			if(top){
				poll();
			}
     	}

		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);

    };

    window.fx = fx;

})(window);