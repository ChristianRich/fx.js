/**
* Java style Array iterator featuring stack peek, shuffle, reverse and null iterator. (c) Christian Schlosrich 2012.
* @param {Array} The data to be iterated over (omitting this arg results in a null iterator)
*/
fx.ArrayIterator = function(data){

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
    }

	/**
	* If data is passed but not of type Array throw an Error (otherwise a null iterator is created)
	*/
    if(data && Object.prototype.toString.apply(data) !== '[object Array]'){
    	throw new TypeError('fx.ArrayIterator expected data type Array for argument \'data\'.');
    }

	this.data = data || [];
	this.index = -1;
}

fx.ArrayIterator.prototype = {

	/**
	* Returns the next element (if any)
	* @return {*}
	*/
	next : function(){
		if(this.hasNext()){
			return this.data[++this.index];
		}

		return null;
	},

	/**
	* Returns the previous element (if any)
	* @return {*}
	*/
	previous : function(){
		if(this.hasPrevious()){
			return this.data[--this.index];
		}

		return null;
	},

	/**
	* Returns the next element (if any) without mutation of the iterator
	* @return {*}
	*/
	peekNext : function(){
		if(this.hasNext()){
			return this.data[this.index + 1];
		}

		return null;
	},

	/**
	* Returns the previous element (if any) without mutation of the iterator
	* @return {*}
	*/
	peekPrevious : function(){
		if(this.hasPrevious()){
			return this.data[this.index - 1];
		}

		return null;
	},
	
	/**
	* Returns true if the iterator contains a next element (and is not a null iterator).
	* @return {Boolean}
	*/
	hasNext : function(){
		if(this.isNull()){
			return false;
		}

		return this.index + 1 < this.data.length;
	},

	/**
	* Returns true if the iterator contains a previous element (and is not a null iterator).
	* @return {Boolean}
	*/
	hasPrevious : function(){
		if(this.isNull()){
			return false;
		}

		return this.index > 0;
	},

	/**
	* Resets the iterator so next() returns the first element
	* @return {void}
	*/
	reset : function(){
		this.index = -1;
		return this;
	},

	/**
	* Returns the number of items contained
	* @return {Number}
	*/
	getSize : function(){
		return this.data.length; 
	},

	/**
	* Returns true if the iterator does not contain any elements (aka null iterator)
	* @return {Boolean}
	*/
	isNull : function(){
		return this.data.length === 0;
	},

	/**
	* Clones the iterator but keeps the reference to the elements intact (aka shallow clone)
	* @return {fx.ArrayIterator}
	*/
	clone : function(){
		return new fx.ArrayIterator(this.data);
	},

	/**
	* Reverses the elements in the collection
	* @return {fx.ArrayIterator}
	*/
	reverse : function(){
		if(this.isNull()){
			return;
		}

		this.data.reverse();
		return this;
	},

	/**
	* Shuffles the elements in the collection
	* @return {fx.ArrayIterator}
	*/
	shuffle : function(){
		if(this.isNull()){
			return;
		}

		var len = this.data.length;
		var i = len;

		while(i--) {
			var p = parseInt(Math.random() * len);
			var t = this.data[i];
			this.data[i] = this.data[p];
			this.data[p] = t;
		}

		return this;
	},

	/**
	* Returns a String representation of the elements currently contained in the collection (for debugging purposes)
	* @return {String}
	*/
	dump : function(){
		var res = this.toString() + ' contains:\n';

		for(var i = 0; i < this.data.length; i++){
			res += '\n' + this.data[i];
		}

		return res;
	},

	/**
	* Returns a String represenation of the ArrayIterator
	* @return {String}
	*/
	toString : function(){
		var res = '[ArrayIterator]';

		if(this.name){
			res += ' name: ' + this.name + ',';
		}

		res += ' size: ' + this.getSize() + ', index: ' + this.index + ', hasNext: ' + this.hasNext() + ', hasPrevious: ' + this.hasPrevious();
		return res;
	}
}

/**
* Static clone
*/
fx.ArrayIterator.Clone = function(itr){
	return itr.clone();
}