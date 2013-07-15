fx.CookieUtils = {

    /**
     * @param key
     * @param data
     * @param days
     * @returns {string}
     */
    setItem : function(key, data, days) {
        var date,
            expires,
            expireDays = parseInt(days) || 365,
            value = JSON.stringify(data || {});

        if(expireDays) {
            date = new Date();
            date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        } else {
            expires = '';
        }

        return document.cookie = (key + '=' + value + expires + '; path=/');
    },

    /**
     * @param key {String}
     * @returns {*}
     */
	getItem : function(key){

        var regExp = new RegExp(key + '=(.*?)(;|$)'),
            query = document.cookie.match(regExp);

		if(query){
			return JSON.parse(query[1]);
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
				prop = cookie.split('=')[0].replace(/^\s*/, '').replace(/\s*$/, ''),
				val = cookie.split('=')[1];

			res += '\n[' + i + '] ' + prop + ' = ' + val;
		}


		return res;
	},

    getSize : function(){
        var cookies = document.cookie.split(';');

        if(cookies.length == 1 && cookies[0].length == 0){
            return 0;
        }

        for(var i = 0, len = 0; i < cookies.length; i++) {
           len++;
        }

        return len;
    }
};

fx.CookieUtils.EXPIRES = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';