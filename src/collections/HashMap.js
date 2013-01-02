/**
* HashMap implementation
*/
fx.HashMap = function(){

	if(!(this instanceof arguments.callee)){
		throw new Error('Constructor called as a function.');
	}

	this.dict = {};

	/**
	* To avoid the expensive 'for..in' loop when returning random elements an Array is used to store the keys.
	*/
    this.keys = [];
}

fx.HashMap.prototype = {
	
	/**
	* Adds an item into the collection
	*/
	add : function(key, value){
		this.dict[key] = value;
		this.keys.push(key);
	},

	/**
	* Gets an item (if it exists)
	*/
	get : function(key){
		if(this.contains(key)){
			return this.dict[key];
		}

		return null;
	},

	/**
	* Returns true if an item exists in the collection
	*/
	contains : function(key){
		return !!this.dict[key];
	},

	/**
	* Returns a random element from the collection
	*/
	random : function(){
		if(this.getSize() === 0){
			return null;
		}

		var index = Math.floor(Math.random() * this.keys.length);
		return this.get(this.keys[index]);
	},

	/**
	* Delete an item (if it exists).  
	*/
	'delete' : function(key){
		if(!this.contains(key)){
			return false;
		}

		delete this.dict[key];
		
		var index = this.keys.indexOf(key);
		this.keys.splice(index, 1);
		return true;
	},
	
	/**
	* Reset / clear the map
	*/
	flush : function(){
		for(var key in this.dict){
			delete this.dict[key];
		}

		this.dict = {};
		this.keys = [];
	},

	/**
	* Returns the size of the map
	*/
	getSize : function(){
		return this.keys.length;
	},

	/**
	* Dumps all key / value pairs into a String (for debug and testing)
	*/
	dump : function(){
		var res = this.toString() + ' contains:\n';

		for(var key in this.dict){
			res += '\n' + 'key: ' + key + ', value: ' + this.dict[key];
		}

		return res;
	},

	/**
	* Returns a String representation of the HashMap
	*/
	toString : function(){
		return '[HashMap] size: ' + this.getSize();
	}
}