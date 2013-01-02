/**
* MathUtils
*/
fx.Math = {
	
	/**
	* Returns the supplied numbers as rounded with the specified number of decimals
	*/
	roundFloat : function(number, precision) {
		var multiple = Math.pow(10, precision);
		return Math.round(number * multiple) / multiple;
	},

	/** 
	* Returns a 'clamped' number if it falls outside the supplied range (otherwise returns the number)
	*/
	clamp : function(min, max, value){
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	},

	/**
	* Returns true if supplied amount falls within supplied range
	*/
	fallsBetween : function(min, max, amount){
		return amount >= min && amount <= max;
	},

	/**
	* Returns true if supplied number is even
	*/
	isEven : function(number){
		return this.isNumber(number) && (number % 2 == 0);
	},

	/**
	* Returns true if supplied number is odd
	*/
	isOdd : function(number){
		return this.isNumber(n) && (n % 2 == 1);
	},

	/**
	* Returns true if supplied argument is a number
	*/
	isNumber : function(number){
		return number === parseFloat(number) && Object.prototype.toString.apply(number) === '[object Number]';
	},

	/**
	* Returns a random number with optional supplied range and rounding
	*/
	random : function(min, max, round){
		var n,
			min = min || 0,
			max = max || 1,
			round = round || false;

		if(isNaN(min) || isNaN(max)){
			n = Math.random();
		} else{
			n = min + (Math.random() * (max - min));
		}

		return round ? n | 0 : n;
	},

	/**
	* Returns a random number within a range, but excluding numbers fro another range
	* Example:
	*
	* Get me random numbers between 0 and 100, but exclude numbers between 50 and 50
	* randomExclude(0, 100, 50, 60);
	*/
	randomExclude : function(min, max, excludeMin, excludeMax, round){
		var n, 
			min = min || 0, 
			max = max || 1,
			excludeMin = excludeMin || 0,
			excludeMax = excludeMax || 0,
			round = round || false;	

		do{
			n = min + (Math.random() * (max - min));
		} while(
			n > excludeMin && n < excludeMax
		);
		
		return round ? n | 0 : n;
	}
}