/**
* Utility for accessing query strings from the current url.
*/

fx.QueryString = {

    /**
    * Returns the value of the requested key if it exists, otherwise returns null.
    * @param  {String} value Key value
    * @return {String | Boolean} value
    */
    getValue : function(value){

		if(!value){
			return false;
		}

		var r = this.parse();
		return r[value] ? r[value] : null;
    },

    /**
    * Returns true if the requested query string key name exists, no matter the value of the key. Otherwise returns false.
    * @param  {String} value Key value
    * @return {Boolean} result
    */
    hasKey : function(value){
        return !!this.getValue(value);
    },

	/**
	* Returns the number of key / value pairs in the query string
	* @returns {number}
	*/
	getLength : function(){

		var r = this.parse(),
			len = 0;

		for(var prop in r){
			len++;
		}

		return len;
	},

	/**
	* Dumps the key / value pairs into a readable string (for debug and logging purposes)
	*/
	dump : function(){

		var len = this.getLength(), r, s, c;

		if(len == 0){
			return 'No query string found in url';
		} else{
			s = 'Query string contains ' + len + ' key / value pairs:\n';
		}

		r = this.parse();
		c = 0;

		for(var i in r){
			if(r[i]){
				s += '[' + c.toString() + '] ' + i + ': ' + r[i] + '\n';
				c++;
			}
		}

		return s;
	},

	/**
	* Return the query string as on object
	* @return {object}
	*/
	parse : function(){

		var dict  = {},
			decode = function (s) {
				return decodeURIComponent(s.replace(/\+/g, " "));
			},
			queryString = location.search.substring(1),
			keyValues = queryString.split('&');

		for(var i in keyValues) {
			var key = keyValues[i].split('=');

			if(key.length > 1) {
				dict[decode(key[0])] = decode(key[1]);
			}
		}

		return dict;
	}
};