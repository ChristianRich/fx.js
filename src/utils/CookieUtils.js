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

	'delete' : function(name){
		if(!this.has(name)){
			return;
		}

		var d = new Date();
  		d.setTime(d.getTime() -1 );
  		document.cookie = name += '=; expires=' + d.toGMTString();
	},

	has : function(name){
		return !!this.get(name);
	}
}