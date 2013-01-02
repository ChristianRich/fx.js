/**
* TypeUtils
* Robust and cross-browser compatible methods for determining JavaScript's 8 built-in data types (composite and primitive data types).
*/
fx.Type = {

    /**
    * Returns a String representation of the supplied object's data type
    * @param  {Object} 
    * @return {String} Type as String
    */
    get : function(o){

        // Adressing IE 7+8 bug: With below statemtent Undefined and Null returns '[object Object]' when in fact we want '[object Undefined]' and '[object Null]'.
        if(o === undefined){
            return '[object Undefined]';
        } else if(o === null){
            return '[object Null]';
        }

        return Object.prototype.toString.apply(o); 
    },
    
    /**
    *  Returns true if supplied object is of type object Object.
    *  In this context objects like object global, object HTMLDocument and such are not considered a valid Object. Only objects of type 'object Object' will pass this test.
    */
    isObject : function(o){
        return this.get(o) === '[object Object]';
    },

    /**
    * Returns true if supplied object is an Array
    */
    isArray : function(o){
        return this.get(o) === '[object Array]';
    },

    /**
    * Returns true if supplied object is a Function
    */
    isFunction : function(o){
        return this.get(o) === '[object Function]';
    },

    /**
    * Returns true if supplied object is a String
    */
    isString : function(o){
        return this.get(o) === '[object String]';
    },

    /**
    * Returns true if supplied object is a Number
    */
    isNumber : function(o){
        return this.get(o) === '[object Number]';
    },

    /**
    * Returns true if supplied object is a Boolean
    */
    isBoolean : function(o){
        return this.get(o) === '[object Boolean]';
    },

    /**
    * Returns true if supplied object is Undefined
    */
    isUndefined : function(o){
        return this.get(o) === '[object Undefined]';
    },

    /**
    * Returns true if supplied object is Null
    */
    isNull : function(o){
        return this.get(o) === '[object Null]';
    }
}