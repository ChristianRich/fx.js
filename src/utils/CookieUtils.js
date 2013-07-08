fx.CookieUtils = {

    /**
     * @param key
     * @param value
     * @param days
     * @returns {string}
     */
    setItem : function(key, value, days) {
        var date,
            expires,
            expireDays = parseInt(days) || 365;

        if(expireDays) {
            date = new Date();
            date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        } else {
            expires = '';
        }

        return document.cookie = key + '=' + value + expires + '; path=/';
    },

    /**
     * @param key
     * @returns {*}
     */
	getItem : function(key){

        if(typeof key !== 'string'){
            throw new Error('Invalid argument passed to fx.CookieUtils.getItem(). String expected.');
        }

        var regExp = new RegExp(key + '=(.*?)(;|$)'),
            query = document.cookie.match(regExp);

		if(query){
			return query[1];
		}

		return null;
	},

    /**
     * @param key
     * @returns {boolean}
     */
    removeItem : function(key){

        if(!this.hasItem(key)){
            return false;
        }

        document.cookie = key + '=;' + fx.CookieUtils.EXPIRES + '; path=/';
        return true;
    },

    /**
     * Returns true if the cookie exists
     * @param key
     */
    hasItem : function(key){
        return !!this.getItem(key);
    },

    /**
     * Parses the result as JSON before it is returned. If the cookie does not exist null is returned
     * @param key
     * @returns {Object}
     */
    getItemAsJSON : function(key){

        var cookie = this.getItem(key);

        if(!cookie){
            return null;
        }

        try{
            return JSON.parse(cookie);
        } catch(e){
            throw new Error('fx.CookieUtils.getJSON(): parse error');
        }
    },

    /**
     * Sets a cookie as JSON
     * @param key
     * @param valueAsObject
     * @returns {string}
     */
    setItemAsJSON : function(key, valueAsObject){

        if(Object.prototype.toString.call(valueAsObject) !== '[object Object]'){
            throw new Error('fx.CookieUtils.setItemAsJSON(): [object Object] expected.');
        }

        try{
            var value = JSON.stringify(valueAsObject);
        } catch(e){
            throw new Error('fx.CookieUtils.setItemAsJSON(): JSON parse error.');
        }

        return this.setItem(key, value);
    },

	/**
	 * Deletes all cookies
	 */
	flush : function(){
		var cookies = document.cookie.split(';');

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				eqPos = cookie.indexOf('='),
				name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

			document.cookie = name + '=;' + fx.CookieUtils.EXPIRES + '; path=/';
		}

        return true;
	},

	/**
	 * Returns all cookies as an easy to read string (debugging  / logging purposes)
	 * @returns {string}
	 */
	dump : function(){
		var cookies = document.cookie.split(';'),
			res;

		if(cookies.length == 1 && cookies[0].length == 0){
			return 'No cookies found at ' + document.URL;
		}

		res = cookies.length.toString() + ' cookie(s) found in ' + document.URL;

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				prop = cookie.split('=')[0],
				val = cookie.split('=')[1];

			res += '\n[' + i.toString() + '] ' + prop + ' = ' + val;
		}

		return res;
	},

    getSize : function(){
        var cookies = document.cookie.split(';');

        if(cookies.length == 1 && cookies[0].length == 0){
            return 0;
        }

        var len = 0;

        for(var i = 0; i < cookies.length; i++) {
           len++;
        }

        return len;
    },

    toString : function(){
        return 'fx.CookieUtils';
    }
};

fx.CookieUtils.EXPIRES = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';