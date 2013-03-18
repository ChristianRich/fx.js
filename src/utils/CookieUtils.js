fx.CookieUtils = {

	set : function(name, value){
		var s = (name + '=' + value).toString();
		document.cookie = s;
		return s; 
	},

	get : function(name){
		var res = document.cookie.match(name + '=(.*?)(;|$)');
		return res ? res[1] : null;
	},

	has : function(name){
		return !!this.get(name);
	},

	'delete' : function(name){
		if(!this.has(name)){
			return;
		}

		document.cookie = (name += '=;' + fx.CookieUtils.EXPIRES).toString();
	},

	deleteAll : function(){
		var cookies = document.cookie.split(';');

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i],
				eqPos = cookie.indexOf('='),
				name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

			document.cookie = (name + '=;' + fx.CookieUtils.EXPIRES).toString();
		}
	},

	dump : function(){
		var cookies = document.cookie.split(';'),
			res;

		if(cookies.length == 0){
			return 'No cookies found in document';
		}

		res = cookies.length.toString() + ' cookie(s) found in document:\n';

		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			res += cookie + '\n';
		}

		return res;
	}
}

fx.CookieUtils.EXPIRES = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';