/**
* 
* Extension to the native Image class.
* Supports: 
*  *) Automatic adding to an HTMLElement once fully loaded
*  *) Get the ImageData as Uint8ClampedArray (conditions apply)
*
* var i = new fx.Image(
*	'http://resources3.news.com.au/images/2012/08/13/1226448/821651-durant.jpg', {
*		onload : onload,
*	    onerror : onerror,
*	    onabort : onabort,
*		target : document.getElementById('imageContainer')
*	}
* )
*/

/**
* @param {String} src   
* @param {object} options
*/
fx.Image = function(src, options){

    this.isLoaded = false;
    this.canvas = null;
    this.ctx = null;

    var options = options || {},
        that = this;

    var onLoadHandler = function(e){
        that.isLoaded = true;
        
       	that.image.onload = null;
    	that.image.onerror = null;
    	that.image.onabort = null;

        if(options.onload){
            options.onload.call(this, e);
        }

      	if(options.target){
            options.target.appendChild(that.image);
       	}
    }

 	var onErrorHandler= function(e){
 		if(options.onerror){
 			options.onerror.call(this, e);
 		}
    }  
   
    var onAbortHandler= function(e){
        if(options.onabort){
 			options.onabort.call(this, e);
 		}
    }

    this.image = new Image();
    this.image.onload = onLoadHandler;
    this.image.onerror = onErrorHandler;
    this.image.onabort = onAbortHandler;
    this.image.src = src;
}

fx.Image.prototype = {

    /**
    * Removed the HTMLImageElement from it's parent container (if present).
    * @return {void}
    */
    remove : function(){
        if(this.image.parentNode){
            this.image.parentNode.removeChild(this.image);
        }
    },

    /**
    * Returns a new Canvas element. Used by the imageData function
    * @return {HTML5CanvasElement}
    */
    getCanvas : function(){
        if(this.canvas){
            return this.canvas;
        } else if(!this.isLoaded){
            console.warn('Cannot create canvas or image data until image is fully loaded.');
            return null;
        } else{
            var supportsCanvas;    

            try { 
                supportsCanvas = !!document.createElement('canvas').getContext;
            } catch(e) { 
                return null;
            }

            if(supportsCanvas){
                this.canvas = document.createElement('canvas');
                return this.canvas;
            }
        }

        return null;
    },

    /**
    * Returns the raw image data. Use with causion. This operation is CPU extensive.
    * @return {ImageData} The image data as a Uint8ClampedArray or null if not supported by the browser or image cross-domain tainted.
    */
    getImageData : function(){
        if(!this.isLoaded){
            console.warn('Cannot return ImageData since image has not yet fully loaded.');
            return null;
        }

        var canvas = this.getCanvas(),
            ctx,
            imageData;

        if(!canvas){
            console.warn('Cannot return ImageData since Canvas is unsupported.');
            return null;
        }

        ctx = canvas.getContext('2d');

        if(!ctx){
            console.warn('Cannot return ImageData since CanvasRenderingContext2d is unsupported.');
            return null;
        }

        try{
            ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch(e){
            return null;
        }

        return imageData;
    }
}