/**
 * (c) Christian Schlosrich 2012
 * Timer with additional functionality like context binding, random time intervals, pause and resume.
 *
 * Example:
 *
 * function myCallback(){
 * }
 * 
 * var timer = new fx.Timer(1000, myCallback);
 * timer.start();
 *
 * Random interval timer:
 *
 * var timer = new fx.Timer([500, 2500], myCallback);
 * timer.start();
 * 
 */

/**
 * @param time {Number | Array} time as Number or a range timer as Array with excactly two numerical values [start, end]
 * @param notify {Function} The callback function when the timer completes
 */
fx.Timer = function(time, notify){

	if(!(this instanceof arguments.callee)){
		throw new Error('Constructor called as a function.');
	}

	if(Object.prototype.toString.apply(time) === '[object Array]'){

		if(time.length !== 2){
			throw new Error('Parameter \'Time\' used as random range must contain excactly two numerical values: start and end');
		} else if(Object.prototype.toString.apply(time[0]) !== '[object Number]' || Object.prototype.toString.apply(time[1]) !== '[object Number]'){
			throw new Error('Time parameter \'min\' and \'max\' must be numerical');
		}

		this.min = time[0];
		this.max = time[1];
		this.isRandomize = true;

	} else if(Object.prototype.toString.apply(time) === '[object Number]'){
		this.time = time;
	} else{
		throw new Error('Accepted values for parameter \'time\' are Number and Array.');
	}

	if(!notify){
		throw new Error('Missing required parameter \'notify\'.');
	}

	this.notify = notify;
	this.id = 0;
	this.tick = 0;
	this.running = false;
	this.paused = false;
	this.context = this;

	var self = this;

	// @private
	this._getRndInterval = function(){
		return this.min + (Math.random() * (this.max - this.min));
	}

	// @private
	this._onNotify = function(){

		self.notify.call(self.context);
		self.tick++;

		if(self.isRandomize){
			clearTimeout(self.id);
			self.id = setTimeout(self._onNotify, self._getRndInterval());
		}
	}
}

fx.Timer.prototype = {

	_tick : function(){

	},

	/**
	* Starts the timer (applicable on timers that are not running)
	*/
	start : function(){
		if(this.running || this.paused) return this;
		this.running = true;

		if(this.isRandomize){
			this.id = setTimeout(this._onNotify, this._getRndInterval());	
		} else{
			this.id = setInterval(this._onNotify, this.time);	
		}

		return this;
	},
	
	/**
	* Stop the timer (applicable on running timers only)
	*/
	stop : function(){
		if(!this.running) return this;

		clearInterval(this.id);
		clearTimeout(this.id);

		this.running = false;
		this.paused = false;
		return this;
	},

	/**
	* Pauses the timer (applicable on running timers only)
	* The difference between pause and stop is that pause remembers the 'running' flag, while stop does not.
	* This is useful for pausing and resuming timers on window blur and focus events.
	*/
	pause : function(){
		if(this.paused || !this.running) return this;

		this.paused = true;

		clearInterval(this.id);
		clearTimeout(this.id);
		return this;
	},

	/**
	* Resumes the timer (applicable on running and paused timers only)
	*/
	resume : function(){
		if(!this.paused) return this;

        this.paused = false;

        if(this.running){
			if(this.isRandomize){
				this.id = setTimeout(this._onNotify, this._getRndInterval());	
			} else{
				this.id = setInterval(this._onNotify, this.time);	
			}
        }

        return this;
	},

	/**
	* Resets the current time to 0
	*/
	reset : function(){
		this.tick = 0;
		return this;
	},

	/**
	* Binds a context to the callback function
	*/
	bind : function(context){
		this.context = context;
		return this;
	},

	/**
	* Destroys the timer by stopping it and deleting the reference to the callback
	*/
	destroy : function(){
		this.stop();
		this.notify = null;
		this.context = null;
	},
	
	/**
	* Returns a String representation of fx.Timer
	*/
	toString : function(){
        var r = '[Timer] time: ';
        r += this.isRandomize ? (this.min + '-' + this.max) : this.time;
        r += ', running: ' + this.running + ', paused: ' + this.paused + ', tick: ' + this.tick;
        return r;
    }
}