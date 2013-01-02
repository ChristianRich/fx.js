/*
* (C) Christian Schlosrich 2012
* Oscillates between start and end values when step() is called using a standard linear curve 
* This is also sometimes referred to as a numeric stepper only the Oscillator calculates it's own step and supports reverse
* Useful for animation and games
*/
fx.Oscillator = function(start, end, step, reverse){
	this.start = start || 0;
	this.end = end || 1;
	this.step = step || 0.1;
	this.reverse = reverse;
	this.value = start;

	if(this.reverse === undefined){
		this.reversed = false;
	}
}

fx.Oscillator.prototype = {

	/**
	* Increases the oscillator's value with the amount defined in step or decreases it when reverse is true and the max value has been reached.
	* @return {void}
	*/
	update : function(){
		this.value += this.step;

		if(this.value >= this.end){
			if(this.reverse){
				this.step = -this.step;
			} else{
				this.reset();
			}
		} else if(this.value <= this.start){
			this.step = Math.abs(this.step);
			this.value = this.start;
		}
	},

	/**
	* Returns true if the next step does not result in overflow.
	* If reverse is true hasNext() will always return true since you can't exceed a reversed Oscillator
	* @return {Boolean}
	*/
	hasNext : function(){
		if(this.reverse){
			return true;
		}

		return this.value + this.step <= this.end;
	},

	/**
	* Converts the Oscillator to a simple Range
	* @return {fx.Range}
	*/
	toRange : function(){
		return new fx.Range(this.min, this.max);
	},

	/**
	* Returns the number of logical steps from the current value until the stepper exceeds the max value.
	* @return {Number}
	*/
	getNumSteps : function(){
		return Math.abs(this.end - this.start) / this.step; 
	},
	
	/**
	* Resets the oscillator to the initial start value
	* @return {void}
	*/
	reset : function(){
		this.value = this.start;
	},

	/**
	* Returns a String representation of the Oscillator.
	* @return {String}
	*/
	toString : function(){
		return '[Oscillator] value: ' + this.value.toFixed(2) + ', start: ' + this.start + ', end: ' + this.end + ', step: ' + this.step + ', numSteps: ' + this.getNumSteps().toFixed(2) + ', reverse: ' + this.reverse;
	}
}