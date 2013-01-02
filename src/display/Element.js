/*
* Chainable HTMLElement (a primitive version of a JQuery object)
*/
fx.Element = function(selector){

	this.css = function(cssObj) {
	    for(var p in cssObj){
	 		this.domElement.style[p] = cssObj[p];
	    }

	    return this;
	}

	/*
	* Cross browser opacity filter. Accepted range 0-1
	*/
	this.opacity = function(value){
		this.css({
			'-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + value * 100 + '\')', // 0-100 for legacy IE
			'filter': 'alpha(opacity=' + value * 100 + ')', 
			'-moz-opacity' : value, // Mozilla
			'-khtml-opacity': value,
			'opacity' : value // modern browsers
		});

		return this;
	}

	this.html = function(html){
		this.innerHTMLappend += html;
		return this;
	}

	/*
	 * Executes any present HTML String into the innerHTML 
	 * (because any incomplete HTML injected into innerHTML will be attempted rectified by the browser. Not handy when building HTML dynamically)
	 */
	this.exec = function(){
		if(this.innerHTMLappend){
	    	this.domElement.innerHTML += this.innerHTMLappend;
	    	this.innerHTMLappend = '';
	    }

		return this;
	}

	this.clearCSS = function(){
	    this.domElement.style = '';
	    return this;
	}

	this.attr = function(property, value){
	    this.domElement.setAttribute(property, value);
	    return this;
	}

	/**
	* Shorthand to attr('id', 'boo') because it is so often used
	*/
	this.id = function(id){
	    this.domElement.setAttribute('id', id);
	    return this;
	}

	this.addClass = function(name){
	    this.domElement.className = name;
	    return this;
	}

	this.text = function(text){
	    var t = document.createTextNode(text);
	    this.domElement.appendChild(t);
	    return this;
	}

	this.prependChild = function(child){
		return this;
	}

	this.appendChild = function(arg){
		for(var i = 0; i < arguments.length; i++){
	    	var arg = arguments[i];

	    	if(fx.isElement(arg)){
	        	this.domElement.appendChild(arg.domElement);   
	        } else {
	            this.domElement.appendChild(arg);   
	        }
		}

	    return this;
	}

	this.appendTo = function(element){
		if(fx.isElement(element)){
			element.domElement.appendChild(this.domElement);   
	    } else {
			element.appendChild(this.domElement);
	    }

	    return this;
	}

	this.prependTo = function(element){
		return this;
	}

	/**
	* Find element by #id, :className or a css properties object
	*/
	this.find = function(query){
		return fx.Dom.find(this, query);
	}

	this.firstChild = function(){
		if(this.numChildren() == 0){
			return null;
		}

		return this.domElement.children[0];
	}

	this.lastChild = function(){
		if(this.numChildren() == 0){
			return null;
		}

		return this.domElement.children[this.numChildren() - 1];
	}

	this.children = function(){
		return this.domElement.children;
	}

	this.numChildren = function(){
		return this.domElement.children.length;	
	}

	this.hasChildAt = function(index){
		return this.domElement.children[index] != undefined;
	}

	this.getChildAt = function(index){
		return this.domElement.children[index];
	}

	this.hasChildren = function(){
		return this.domElement.children.length > 0;
	}

	this.toString = function(){
		var s = '[fx Element]';

		if(fx.hasAttribute(this, 'id')){
			s += ' id: ' + this.domElement.getAttribute('id'); 
		}

		if(this.hasChildren()){
			s += ', numChildren: ' + this.numChildren(); 
		}

		return s;
	}

	var el = selector || 'div';

	// Parse the selector:
	if(fx.isDocumentNode(el)){
		this.domElement = document.body;	
	} else if(fx.isElementNode(el)){
		this.domElement = el;
	} else if(fx.Type.isString(selector)){
		this.domElement = document.createElement(el);
	} else if(fx.isfxNode(el)){
		this.domElement = el.domElement;
	} else{
		throw new Error('Invalid selector: ' + selector);
	}

	this.innerHTMLappend = '';

	// Used for method chaining
	if(fx.isElement(this)){
		return this;
	} else {
		return fx.createElement(el);
	}
}