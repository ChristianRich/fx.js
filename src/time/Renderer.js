/*
 * (C) Christian Schlosrich 2012
 * Rendering engine provides handy API calls for RequestAnimationFrame and performance.now() polyfills
 * When supported by the browser the rendering engine utilizes floating point values for smoother animation.
 * Also provides delta time in miliseconds and fps to make animation speed independant of actual acquired frame rate.
 */
fx.Renderer = function(update){

	if(!(!!window.performance.now)){
		throw new Error('fx.Renderer depends on the window.performance.now() polyfill.');
	}

	if(!(!!window.requestAnimationFrame) || !(!!window.cancelAnimationFrame)){
		throw new Error('fx.Renderer depends on requestAnimationFrame / cancelAnimationFrame polyfill.');
	}

	var callBack = update,
		isRendering = false,
		lastTime = 0,
		that = this;

	this.frame = 0;
	this.ms = Infinity;

	/**
	 * Suggested rendering low threshold. Don't call draw / paint methods when ms drops below this threshold - but always keep calling renderer.update();
	 * Remener taht 60 fps equals 16.66 miliseconds which is considered an optimal frame rate while 160 ms equals 6.25 fps.
	 */
	this.MIN_DELTA = 160;

	this.start = function(){
		if(isRendering){
			return;
		}

		lastTime = 0;
		isRendering = true;
		that.frame = requestAnimationFrame(callBack);
	}

	this.stop = function(){
		if(!isRendering){
			return;
		}

		isRendering = false;
		cancelAnimationFrame(that.frame);
	}

	this.update = function(){
		if(!isRendering){
			return;
		}

		var now = performance.now();
		this.ms = now - lastTime;
		lastTime = now;

		this.frame = requestAnimationFrame(callBack);
	}

	this.toggle = function(){
		if(isRendering){
			this.stop();
			return false;
		} else{
			this.start();
			return true;
		}
	}

	this.getFps = function(){
		if(this.ms === Infinity){
			return Infinity;
		}

		return Math.round( 1000 / this.ms);
	}

	this.isRendering = function(){
		return isRendering;
	}

	this.pauseOnBlur = function(flag){

		if(flag){
			window.addEventListener('focus', self.start, false);
			window.addEventListener('blur', self.stop, false);
		} else{
			window.removeEventListener('focus', self.start, false);
			window.removeEventListener('blur', self.stop, false);
		}
	}
}