/**
 * HTML5 local storage wrapper
 */
fx.LocalStorageUtils = {

    supports : function(){
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    getItem : function(key){
        return localStorage.getItem(key);
    },

    setItem : function(key, value){
        localStorage.setItem(key, value);
        return key;
    },

    removeItem : function(key){

        if(!this.hasItem(key)){
            return false;
        }

        localStorage.removeItem(key);
        return true;
    },

    hasItem : function(key){
        return !!this.getItem(key);
    },

    getItemAsJSON : function(key){
        var res = this.getItem(key);

        if(!res){
            return null;
        }

        try{
            return JSON.parse(res);
        } catch(e){
            throw new Error('fx.LocalStorageUtils.getItemAsJSON(): parse error');
        }

    },

    setItemAsJSON : function(key, valueAsObject){

        if(Object.prototype.toString.call(valueAsObject) !== '[object Object]'){
            throw new Error('fx.LocalStorageUtils.setItemAsJSON(): [object Object] expected.');
        }

        try{
            var value = JSON.stringify(valueAsObject);
        } catch(e){
            throw new Error('fx.LocalStorageUtils.setItemAsJSON(): JSON parse error.');
        }

        return this.setItem(key, value);
    },

    flush : function(){
        localStorage.clear();
        return true;
    },

    dump : function(){

        var len = this.getSize();

        if(!len){
            return 'Local storage is empty.';
        }

        var res = len + ' keys / value pairs found in local storage:';

        for(var j in localStorage){
            res += ('\n' + j + ': ' + localStorage[j]);
        }

        return res;
    },

    getSize : function(){
        var len = 0;

        for(var i in localStorage){
            len++;
        }

        return len;
    },

    toString : function(){
        return 'fx.LocalStorageUtils';
    }
};