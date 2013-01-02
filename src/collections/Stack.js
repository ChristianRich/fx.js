/**
* (c) Christian Schlosrich
* Java style stack implementation based on Last In First Out (LIFO) structure.
* @param capacity {Number} : Capacity may only be set when a new Stack is created and is fixed through out its lifecycle.
*/
fx.Stack = function(capacity){

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
    }

    this._capacity = capacity || Number.MAX_VALUE;
    this._queue = [];
}

fx.Stack.prototype = {

	/**
	* Pushes an item to the top of this stack.
	*/
	push : function(value){
		if(this._queue.length + 1 > this._capacity){
			return;
		}

		this._queue.push(value);
	},

	/**
	* Removes the object at the top of this stack and returns that object.
	*/
	pop : function(){
		return this._queue.pop();
	},

	/**
	* Looks at the object at the top of this stack without removing it from the stack.
	* @return {*} [description]
	*/
	peek : function(){
		return this._queue[0];
	},

	/**
	* Returns the 1-based position where an object is on this stack.
	* @param  {Number} i index
	* @return {*}
	*/
	search : function(i){
		if(!!this._queue.length && i < this._queue.length){
			return this._queue[i];
		}

		return null;
	},

	/**
	* GetSize
	* @return {Number}
	*/
	getSize : function(){
		return this._queue.length;
	},

	getCapacity : function(){
		return this._capacity;
	},

	isFull : function(){
		return this._queue.length == this._capacity;
	},

	/**
	* Tests if this stack is empty.
	* @return {Boolean}
	*/
	empty : function(){
		return !!this._queue.length;
	},

	/**
	* Dumps the queue into a String (for debug and testing)
	* @return {String}
	*/
	dump : function(){
		var res = this.toString() + ' contains:\n';

		for(var i = 0; i< this._queue.length; i++){
			res += '\n' + 'value: ' + this._queue[i];
		}

		return res;
	},

	toArray : function(){
		return this._queue;
	},

	/**
	* Returns a String representation of the Queue
	* @return {String}
	*/
	toString : function(){
		var res = '[Stack] size: ' + this._queue.length;

		if(this._capacity !== Number.MAX_VALUE){
			res += ', capacity: ' + this._capacity; 
		}

		return res;
	}
}