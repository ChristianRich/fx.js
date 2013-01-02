/**
* Utility for accessing query strings in the current url.
*/
fx.QueryString = {

    /**
    * Returns the value of the requested key if it exists, otherwise returns null.
    * @param  {String} fn Keyname
    * @return {String} value
    */
    get : function(fn){
        var name = fn.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]'),
            regexS = '[\\?&]' + name + '=([^&#]*)',
            regex = new RegExp(regexS),
            results = regex.exec(window.location.search);

        if(!results){
            return null;
        } else{
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    },

    /**
    * Returns true if the requested query string is present, no matter the value of the key. Otherwise returns false.
    * @param  {String} fn Keyname
    * @return {Boolean} result
    */
    has : function(fn){
        return !!this.get(fn);
    }
}