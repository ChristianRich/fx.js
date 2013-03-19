fx.CookieUtils = {

	/**
	 * Set a cookie
	 * @param name
	 * @param value
	 * @returns {string}
	 */
	set : function(name, value){
		var cookie = this._trim(name) + '=' + this._trim(value.toString());
		document.cookie = cookie;
		return cookie;
	},

	/**
	 * Get a cookie
	 * @param name
	 * @param asBoolean Tries to parse to return string as a boolean value
	 * @returns {*}
	 */
	get : function(name, asBoolean){
		var query = document.cookie.match(this._trim(name) + '=(.*?)(;|$)');

		if(query){
			return asBoolean ? this._toBool(query[1]) : query[1];
		}

		return null;
	},

	/**
	 * Returns true if the cookie exists
	 * @param name
	 * @returns {boolean}
	 */
	has : function(name){
		return !!this.get(this._trim(name));
	},

	/**
	 * Delete a single cookie
	 * @param name
	 * @returns {boolean}
	 */
	'delete' : function(name){
		if(!this.has(name)){
			return false;
		}

		var n = this._trim(name);
		document.cookie = n += '=;' + fx.CookieUtils.EXPIRES;
		return true;
	},

	/**
	 * Deletes all cookies
	 */
	flash : function(){
		var cookies = document.cookie.split(';');

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				eqPos = cookie.indexOf('='),
				name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

			document.cookie = (name + '=;' + fx.CookieUtils.EXPIRES).toString();
		}
	},

	/**
	 * Returns all cookies as easy to read string
	 * @returns {string}
	 */
	dump : function(){
		var cookies = document.cookie.split(';'),
			res;

		if(cookies.length == 1 && cookies[0].length == 0){
			return 'No cookies found in document';
		}

		res = cookies.length.toString() + ' cookie(s) found in document:\n';

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				prop = cookie.split('=')[0],
				val = cookie.split('=')[1];

			res += '[' + i.toString() + '] ' + this._trim(prop) + ' = ' + val + '\n';
		}

		return res;
	},

	// @private
	_trim : function(str){
		return str.replace(/^\s+|\s+$/g,'');
	},

	// @private
	_toBool : function(str){

		if(!str || str.length == 0){
			return false;
		}

		switch(str){
			case 'true' :
			case '1' :
			case 'yes' :
				return true;
			break;

			default :
				return false;
		}
	}
}

fx.CookieUtils.EXPIRES = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';