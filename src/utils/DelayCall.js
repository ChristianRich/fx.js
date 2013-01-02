/**
* DelayCall
*
* Examples:
* 
* var d = new fx.DelayCall(1000, myFunction); // creates a call
* d.cancel(); // Cancels a call
*
* Anonymous inline style:
* 
* new fx.DelayCall(function(){
*     video.play();
* }, 500);
*
* @param {Function} 	callback
* @param {Number}   	time
* @param {Object}   	optional context to pass to the callback
*/
fx.DelayCall = function(callback, time, context){

	if(!(this instanceof arguments.callee)){
		throw new Error('Constructor called as a function.');
	}

	if(!time){
		throw new Error('Missing required parameter time.');	
	}

	if(!callback){
		throw new Error('Missing required parameter callback.');	
	}

	var callback = callback,
		time = time,
		context = context || window;

	var onTimer = function(){
		if(callback){
			callback.call(context);
			callback = null;
		}
	}

	var id = setTimeout(onTimer, time);

	/**
	* Cancels the current delayed call
	* @return {void}
	*/
	this.cancel = function(){
		if(!id){
			return;
		}

		clearTimeout(id);
		id = null;
		callback = null;
	}
}