/**
* This is somewhat broken and returns incorrect values..
*/
fx.Viewport = {

	/**
	* Viewport width.
	*/
	width : function(elem){
		return this.dimensions(elem).width;
	},
	
	/**
	* Viewport height.
	*/
	height : function(elem){
		return this.dimensions(elem).height;
	},

	/**
	* Returns browser's available width and height.
	* @return {object}
	*/
	dimensions : function(elem){
		var elem = elem || window.document,
			doc = elem.documentElement;
		
		function dim(prop){
			return Math.max(
				elem.body['scroll' + prop] || 0, 
				elem.body['offset' + prop] || 0, 
				doc['scroll' + prop] || 0,
				doc['offset' + prop] || 0,
				doc['client' + prop] || 0
			)
		}

		return {width : dim('Width'), height : dim('Height')};
	}
}