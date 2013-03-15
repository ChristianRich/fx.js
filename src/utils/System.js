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

    webRTC : function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },

    webAudio : function(){
        return !!('AudioContext' in window || 'webkitAudioContext' in window);
    }
}