fx.Dom = {

	getElementByPropVal : function(element, prop, value){
		var el = element,
			prop = prop,
		    value = value,
		    result = null;

		if(fx.isElement(element)){
			el = element.domElement;
		} else if(element.nodeType == 9){ // Cast to body if document is recieved
			el = document.body;     
      	} else if(element.nodeType == 1){
      		el = el;
      	} else{
      		throw new Error('Unsupported type for element');
      	}

		var traverse = function(el){
		    if(el[prop] == value){
		        result = el;
		    }

		    if(result){
		        return result;
		    }

		    for(var i = 0; i < el.children.length; i++){
		        traverse(el.children[i]);
		    }
		}

		traverse(el);
		return this.toNode(result);
	},

	getElementByCSS : function(element, cssObj){
		var el = element,
			css = cssObj,
	    	result = null;

		if(fx.isElement(element)){
			el = element.el;
		}

		var traverse = function(el){
		    for(var property in css){
	   			if(el.style[property] == css[property]){
	   				result = el;
	   			}
	 		}

		    if(result){
		        return result;
		    }

		    for(var i = 0; i < el.children.length; i++){
		        traverse(el.children[i]);
		    }
		}

		traverse(el);

		return this.toNode(result);
	},

	/*
	* Casts a qualified HTMLElement to a fx Node
	*/
	toNode : function(element){
		return fx.createElement(element);
	},

	find : function(element, query){
		var res;

		if(fx.hasPrefix(query, '#')){
			res = this.getElementByPropVal(element, 'id', query.substring(1, query.length));
		} else if(fx.hasPrefix(query, ':')){
			res = this.getElementByPropVal(element, 'className', query.substring(1, query.length));
		} else if(fx.type(query) === '[object Object]'){
			res = this.getElementByCSS(element, query);
		}

		return res;
	},

	ready : function(callback){
		var callback = callback,
			hasFired = false;

		var DOMReady = function(e){
			if(!!document.addEventListener) {
				document.removeEventListener('DOMContentLoaded', DOMReady, false);
			} else if(document.readyState === 'complete') {
				document.detachEvent('onreadystatechange', DOMReady);
				window.detachEvent('onload', ready);
			}

			ready();
		}

		var ready = function(){
			if(hasFired){
				return;
			}

			hasFired = true;
			callback.call(window);
		}

		if(!!document.addEventListener){
			document.addEventListener('DOMContentLoaded', DOMReady, false);
		} else if(!!document.attachEvent){ // IE legacy
			document.attachEvent('onreadystatechange', DOMReady);
			window.attachEvent('onload', ready);
		} else{
			window.onload = ready; // Generic legacy
			document.body.onload = ready; // Absolutely last resort
		}
	}
}