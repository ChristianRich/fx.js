/**
* HTML5 feature detection
*/
fx.System = {
    
    /**
    * Detects if touch events are supported (touchstart, touchmove and touchend)
    * @return {boolean} 
    */
    touch : function(){
        return 'createTouch' in document;
    },

    /**
    * Canvas
    * @return {boolean} 
    */
    canvas : function(){
        try { 
			return !!document.createElement('canvas').getContext;
        } catch(e) { 
			return false; 
        }
    },

    /**
    * Webgl
    * @return {boolean} 
    */
    webgl : function(){
        if(!this.canvas()){
            return false;
        }

        var contextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'],
            canvas = document.createElement('canvas'), 
            webgl;
        
        for(var i = 0; i < contextNames.length; i++){
            try{
                webgl = canvas.getContext(contextNames[i]);

            	if(webgl){
           			return true;
          		}
            } catch(e){
                // Intentionally left blank
            }
        }
        
		return false;
    },

    /**
    * Video API
    * @return {boolean} 
    */
    html5Video : function(){
        return !!document.createElement('video').canPlayType;
    },

    /**
    * Returns an object containing supported file types (this method is dodgy and incomplete btw)
    * @return {Object}
    */
    html5VideoSupportedType : function(){
        if(!this.html5Video){
            return {'result' : 'HTML5 video is unsupported'};
        }

        var result = {};

        var types = [
            'video/webm;'   ,
            'video/ogg;'    ,
            'video/mp4;'    ,
            'video/3gp;'    ,
            'video/avi;'    ,
            'video/mpeg4;'
        ];

        var v = document.createElement('video');

        for(var i = 0; i < types.length; i++){
            var r = v.canPlayType(types[i]);
            result[types[i]] = r;
        }

        return result;
    },

    /**
    * Audio API
    * @return {boolean} 
    */
    html5Audio : function(){
  		return !!document.createElement('audio').canPlayType;
    },

    /**
    * Local storage API
    * @return {boolean} 
    */
    localStorage : function(){
  		try {
  		    return 'localStorage' in window && window['localStorage'] !== null;
  		} catch(e){
  			return false;
  		}
    },

    /**
    * Web workers API
    * @return {boolean} 
    */
  	webWorkers : function(){
        return !!window.Worker;
    },

    /**
    * GeoLocation API
    * @return {boolean} 
    */
    geoLocation : function(){
        return !!('geolocation' in navigator);
    },

    /**
    * Application cache API
    * @return {boolean} 
    */
    applicationCache : function(){
        return !!window.applicationCache;
    },

    /**
    * History API
    * @return {boolean} 
    */
    history : function(){
        return !!(window.history && history.pushState);
    },

    getUserMedia : function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },

    performanceNow : function(){
        return !!window.performance.now;
    }
}