/**
 * HTML5 local storage wrapper
 */
fx.LocalStorageUtils = {

    supports : function(){
        return 'localStorage' in window && window['localStorage'] !== null;
    },

    getItem : function(key){
        var res = localStorage.getItem(key);

        if(res){
            return JSON.parse(res);
        }

        return null;
    },

    setItem : function(key, data){
        var json = JSON.stringify(data);
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
    }
};