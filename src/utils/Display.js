/**
 * Display / Element utils by Christian Schlosrich
 */
fx.DisplayUtils = {

	scaleKeepAspect : function(elem, viewportWidth, viewportHeight){
		if(viewportWidth / viewportHeight < elem.width / elem.height) {
			elem.style.height = '100%';
			elem.style.width = 'auto';
		} else {
			elem.style.width = '100%';
			elem.style.height = 'auto';
		}
	},
	
	scale : function(elem, scaleX, scaleY){
		var scaleX = scaleX || 1,
			scaleY = scaleY || 1;
				
		elem.style.width = elem.width * scaleX + 'px';
		elem.style.height = elem.height * scaleY + 'px';
	}
}