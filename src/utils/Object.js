/**
    ObjectUtils by Christian Schlosrich
    Utils for interacting with object.
*/
fx.Object = {
    
    /**
        Returns all keys as an Array
    */
    getKeys : function(o) {
        var keys = [];
        for (var i in o) keys.push(i);
        return keys;
    },

    /**
        Returns all values as an Array
    */
    getValues : function(o) {
        var values = [];
        for (var value in o) values.push(o[value]);
        return values;
    },

	dump : function(o){
		var res = '';

		for(var i in o){
			if(o[i]){
				res += i + ': ' + o[i] + ', ';
			}
		}

		return res;
	},

	/**
        Returns the length of an Object
    */
    length : function(o) {
        var len = 0;
        for (var prop in o) len++;
        return len;
    },

    /**
        Checks if an Object is empty
    */
    isEmpty : function(o) {
        return this.length(o) === 0;
    },

	/**
        Returns true if supplied object is of type object Object
    */
    isObject : function(o) {
        return Object.prototype.toString.apply(o) === '[object Object]';
    },

    /**
        Maps all key / value pairs into an associative array (hash map).
        @Example:
        
        var o = {x: 7, y: 10, b : 500};
        var map = fx.Object.toHashMap(o);
        console.log(map['x']); // 7
        console.log(map['y']); // 10
        console.log(map['b']); // 500
    */
    toHashMap : function(o) {
        var map = [];
        for (var key in o) map[key] = o[key];
        return map;
    },

    /**
        Maps all key / value pairs from an Object into an Array.
        In the result Array keys occupy even index numbers and values occupy odd index numbers.
        @Example:
        
        var o = {x: 7, y: 10, b : 500};
        var a = fx.Object.toArray(o); // [x, 7, y, 10, b, 500]
    */
    toArray : function(o) {
        var res = [];

        for (var key in o){
            res.push(key);
            res.push(o[key]);    
        } 
        return res;
    },

    /**
        Maps all key / value pairs into a multidimensional array
        @Example:
        
        var o = {x: 7, y: 10, b : 500};
        var a = fx.Object.toMultidimensionalArray(o); // [[x, 7], [y, 10], [b, 500]]
    */
    toMultidimensionalArray : function(o) { /*Array*/
        var res = [];
        for (var key in o) res.push([key, o[key]]);
        return res;
    },

    /**
        Clones an object by copying the key / value pairs into a new object (shallow clone only)
    */
    clone: function(o) {
        var n = {};
        for(var key in o) n[key] = o[key];
        return n;
    }
};