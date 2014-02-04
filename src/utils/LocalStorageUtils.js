/**
 * HTML5 local web storage wrapper.
 * Stores simple key / value pairs as JSON Strings.
 *
 * Consider below example:
 *
 * var userData = {score : 19800, numLives: 3};
 * fx.LocalStorageUtils.setItem('settings', userData);
 *
 * Retrieve the value:
 * fx.LocalStorageUtils.getItem('settings'); // {score : 19800, numLives: 3}
 */
fx.LocalStorageUtils = {

    /**
     * Check support for LocalStorage and JSON
     * @returns {boolean}
     */
    supports : function(){
        return JSON && typeof JSON.parse === 'function' && 'localStorage' in window && window['localStorage'] !== null;
    },

    /**
     * Retrieves and returns the stored item as an object.
     * @param key
     * @returns {*}
     */
    getItem : function(key){
        var res = localStorage.getItem(key);

        if(res){
            return JSON.parse(res);
        }

        return null;
    },

    /**
     * Stores the value as a forced JSON string
     * @param key
     * @param value
     * @returns {String}
     */
    setItem : function(key, value){
        var json = JSON.stringify(value);
        localStorage.setItem(key, json);
        return json;
    },

    removeItem : function(key){

        if(!this.hasItem(key)){
            return false;
        }

        localStorage.removeItem(key);
        return true;
    },

    hasItem : function(key){
        return !!localStorage.getItem(key);
    },

    flush : function(){
        localStorage.clear();
    },

    /**
     * Returns a String representation of the current local storage object
     * @returns {string}
     */
    dump : function(){

        var len = this.getSize();

        if(!len){
            return 'Local storage is empty.';
        }

        var res = len + ' key / value pair(s) found in local storage:',
            key,
            value;

        for(var j = 0; j < len; j++){
            key = localStorage.key(j);
            value = localStorage.getItem(key);
            res += ('\n[' + j.toString() + '] ' + key + ': ' + value);
        }

        return res;
    },

    getSize : function(){
        var len = 0;

        for(var i in localStorage){
            len++;
        }

        return len;
    }
};