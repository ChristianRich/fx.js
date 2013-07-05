fx.CookieUtils = {

	/**
	 * Set a cookie
	 * @param name
	 * @param value
	 * @returns {string}
	 */
	set : function(name, value){
		var cookie = this.trim(name) + '=' + this.trim(value.toString());
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
		var query = document.cookie.match(this.trim(name) + '=(.*?)(;|$)');

		if(query){
			return asBoolean ? this.toBool(query[1]) : query[1];
		}

		return null;
	},

    /**
     * Instead of returning the raw cookie the result cookie is parsed and tried as a JSON string.
     * If the result cookie does not exist or does not qualify as a valid JSON string null is returned.
     * @param name
     * @returns {Object | null}
     */
    getJSON : function(name){

        if(typeof name !== 'string'){
            throw new Error('Invalid argument passed to fx.CookieUtils.getJSON(). String expected.');
        }

        var cookie = this.get(name);

        if(!cookie){
            return null;
        }

        try{
            return JSON.parse(cookie);
        } catch(e){
            return null;
        }
    },

    setJSON : function(name, obj){

        if(typeof obj !== 'object'){
            throw new Error('Invalid argument passed to fx.CookieUtils.setJSON(). Object expected.');
        }

        var jsonStr;

        try{
            jsonStr = JSON.stringify(obj);
        } catch(e){
            throw new Error('fx.CookieUtils.setJSON(): parse error');
        }

        this.set(name, jsonStr);
        return true;
    },

	/**
	 * Returns true if the cookie exists
	 * @param name
	 * @returns {boolean}
	 */
	has : function(name){
		return !!this.get(this.trim(name));
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

		var n = this.trim(name);
		document.cookie = n += '=;' + fx.CookieUtils.EXPIRES;
		return true;
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

			document.cookie = (name + '=;' + fx.CookieUtils.EXPIRES).toString();
		}

        return true;
	},

	/**
	 * Returns all cookies as easy to read string
	 * @returns {string}
	 */
	dump : function(){
		var cookies = document.cookie.split(';'),
			res;

		if(cookies.length == 1 && cookies[0].length == 0){
			return 'No cookies found at ' + document.URL;
		}

		res = cookies.length.toString() + ' cookie(s) found in ' + document.URL + '\n';

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				prop = cookie.split('=')[0],
				val = cookie.split('=')[1];

			res += '[' + i.toString() + '] ' + this.trim(prop) + ' = ' + val + '\n';
		}

		return res;
	},

	trim : function(str){
		return str.replace(/^\s+|\s+$/g,'');
	},

	toBool : function(str){

		if(!str || str.length == 0){
			return false;
		}

		switch(str.toLowerCase()){
			case 'true' :
			case '1' :
			case 'yes' :
				return true;
			break;

			default :
				return false;
		}
	},

    // return an array of objects according to key, value, or key and value matching
    getObjects : function(obj, key, val) {
        var objects = [];

        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val));
            } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == ''){
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1){
                    objects.push(obj);
                }
            }
        }

        return objects;
    },

    // return an array of values that match on a certain key
    getValues : function (obj, key) {
        var objects = [];

        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getValues(obj[i], key));
            } else if (i == key) {
                objects.push(obj[i]);
            }
        }

        return objects;
    },

    // return an array of keys that match on a certain value
    getKeys : function (obj, val) {
        var objects = [];

        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getKeys(obj[i], val));
            } else if (obj[i] == val) {
                objects.push(i);
            }
        }

        return objects;
    }
};

fx.CookieUtils.EXPIRES = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';