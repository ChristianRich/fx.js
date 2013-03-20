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
    * Does not work when start range is lower (or negative) then end range
    */
    getValueOfPercent : function(percent){
        return (((this.end - this.start) / 100) * percent) + this.start;
    },

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

    getMin : function(){
        return Math.min(this.start, this.end);
    },

    getMax : function(){
        return Math.max(this.start, this.end);
    },

    clone : function(){
        return new fx.Range(this.start, this.end);
    },

    equals : function(range){
        return this.start === range.start && this.end === range.end;
    },

    toString : function(){
        return '[Range] start: ' + this.start + ', end: ' + this.end;
    }
}