/**
 * Determines a range between two numerical values
 * @param start
 * @param end
 */
fx.Range = function(start, end){

	if(!(this instanceof arguments.callee)){
		throw new Error('Constructor called as a function.');
	}

	this.start = start || 0;
    this.end = end || 1;
}

fx.Range.prototype = {
    
    map : function(factor){
        this.start *= factor;
        this.end *= factor;
        return this;
    },

    getPercentOfValue : function(value){
        return (value - this.start) / (this.end - this.start) * 100;
    },

    /**
    * Returns a value in the range from a percentage
    * Does not work when start range is lower (or negative) then end range
    */
    getValueOfPercent : function(percent){
        return (((this.end - this.start) / 100) * percent) + this.start;
    },

    /**
     * Returns true if the supplied value lies within the range. Otherwise returns false
     * @param value
     * @returns {boolean}
     */
    inRange : function(value){
        if(this.start < this.end){ // Taking negative numbers into consideration
            return value >= this.start && value <= this.end;
        } else{
            return value <= this.start && value >= this.end;
        }
    },

    reset : function(start, end){
        this.start = start;
        this.end = end;
    },

    /**
     * Returns the lowest value of the range
     * @returns {number}
     */
    getMin : function(){
        return Math.min(this.start, this.end);
    },

    /**
     * Returns the highest value in the range
     * @returns {number}
     */
    getMax : function(){
        return Math.max(this.start, this.end);
    },

    /**
     * Returns a clone of this range
     * @returns {fx.Range}
     */
    clone : function(){
        return new fx.Range(this.start, this.end);
    },

    /**
     * Returns true if supplied range is equal to this range
     * @param range
     * @returns {boolean}
     */
    equals : function(range){
        return this.start === range.start && this.end === range.end;
    },

    /**
     * Returns a String representation of a range
     * @returns {string}
     */
    toString : function(){
        return '[Range] start: ' + this.start + ', end: ' + this.end;
    }
};