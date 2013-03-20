/**
 * Various scaling methods
 */
fx.Scale = {

	keepAspect : function(elem, viewportWidth, viewportHeight){
		if(viewportWidth / viewportHeight < elem.width / elem.height) {
			elem.style.height = '100%';
			elem.style.width = 'auto';
		} else {
			elem.style.width = '100%';
			elem.style.height = 'auto';
		}
	},

	/**
	 * Scales an HTMLElement
	 * @param el
	 * @param scaleX
	 * @param scaleY
	 */
	element : function(el, scaleX, scaleY){
		var scaleX = scaleX || 1,
			scaleY = scaleY || 1;
				
		el.style.width = el.width * scaleX + 'px';
		el.style.height = el.height * scaleY + 'px';
	},

	/**
	 * Keeps a video full screen centered without black bars.
	 * If the aspect ratio differs from the video cropping will occur either at the top / bottom or left / right.
	 *
	 * @param video The HTML5 video element
	 * @param videoNativeWidth Optional width specified for video (typically when meta-data has not yet been received)
	 * @param videoNativeHeight Optional height specified for video (typically when meta-data has not yet been received)
	 */
	videoFullScreenKeepAspect : function(video, videoNativeWidth, videoNativeHeight){
		var stageWidth = window.innerWidth,
			stageHeight = window.innerHeight,

			// If meta-data has not yet been loaded, we need to assume some default values for width and height - or used supplied values
			videoNativeWidth = video.videoWidth || videoNativeWidth || 1280,
			videoNativeHeight = video.videoHeight || videoNativeHeight || 720,

			newWidth = (videoNativeWidth / videoNativeHeight) * stageHeight,
			newHeight = stageHeight,
			left = -((newWidth - stageWidth) / 2),
			top = -((newHeight - stageHeight) / 2);

		if(newWidth < stageWidth){
			newHeight = (videoNativeHeight / videoNativeWidth) * stageWidth;
			newWidth = stageWidth;
			top = -((newHeight - stageHeight) / 2);
			left = -((newWidth - stageWidth) / 2);
		}

		video.width = ~~newWidth;
		video.height = ~~newHeight;
		video.style.top = ~~top + 'px';
		video.style.left = ~~left + 'px';
	}
}