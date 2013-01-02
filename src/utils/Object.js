/**
    ObjectUtils by Christian Schlosrich
    Utils for interacting with object.
*/
fx.Object = {
    
    /**
        Returns all keys as an Array
    */
    getKeys : function(o ) {
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
        Returns all key / value pairs as a String representation of an object (for debugging purposes)
    */
    toString : function(o, name) {
        var s, val, i = 0;
        s = (name ? '\'' + name + '\'' : 'Object') + ' contains ' + this.length(o) + ' key/value pairs:\n';

        for(var k in o){
            if(Object.prototype.toString.apply(o[k]) === '[object Object]'){ // Because [object Object] does not support toString() method and will throw Error in IE
                if(this.isEmpty(o[k])){
                    val = 'Empty [object Object]'; 
                } else{
                    val = this.getKeys(o[k]);
                }
            } else{     
                val = o[k];
            }
            
            s += '[' + (i++) + '] ' + k + ' : ' + val + '\n';
        } 

        return s;
    },

    /**
        Maps all key / value pairs into an associative array (hash map).
        @Example:
        
        var o = {x: 7, y: 10, b : 500};
        var map = CS.ObjectUtils.toHashMap(o);
        console.log(map['x']); // 7
        console.log(map['y']); // 10
        console.log(map['b']); // 500
    */
    toHashMap : function(o) { /*Array*/
        var map = [];
        for (var key in o) map[key] = o[key];
        return map;
    },

    /**
        Maps all key / value pairs into an Array, where keys accupy even index numbers and values occupy odd index numbers.
        @Example:
        
        var o = {x: 7, y: 10, b : 500};
        var a = CS.ObjectUtils.toArray(o); // [x, 7, y, 10, b, 500]
    */
    toArray : function(o) { /*Array*/
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
        var a = CS.ObjectUtils.toMultidimensionalArray(o); // [[x, 7], [y, 10], [b, 500]]
    */
    toMultidimensionalArray : function(o) { /*Array*/
        var res = [];
        for (var key in o) res.push([key, o[key]]);
        return res;
    },

    /**
        Clones an object by copying the key / value pairs into a new object.
    */
    clone: function(o) {
        var n = {};

        for(var key in o){
            n[key] = o[key]; 
        } 

        return n;
    }
}