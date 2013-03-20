/**
* fx.Circle
* @param {x} x position
* @param {y} y position
* @param {r} r radius
*/
fx.Circle = function(x, y, r){

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
    }

	this.reset(x, y, r);
	this.regX = 0;
	this.regY = 0;
};

fx.Circle.prototype = {

	reset : function(x, y, r){
		this.x = x || 0;
		this.y = y || 0;
		this.r = r || 0;
		return this;
	},

	/**
	* Test if this circle intersects another circle
	* @param {fx.Circle} circle
	* @return {boolean} Result as Boolean
	*/
	intersectsCircle : function(circle){
		var dx = this.x - circle.x;
		var dy = this.y - circle.y;
	  	var dist = this.r + circle.r;
	  	return(dx * dx + dy * dy <= dist * dist);
	},

	/**
	* Returns true if the supplied point lies within the circle
	*/
	pointInCircle : function(point){
		var distanceSq = (point.x * point.x) + (point.y * point.y);
		return (distanceSq < this.r * this.r);
	},

	draw : function(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x - this.regX, this.y - this.regY, this.r, Math.PI * 2, 0, true);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		return this;
	},

	/**
	* String representation of a Circle object
	*/
	toString : function(){
		return '[Circle] x: ' + this.x + ', y: ' + this.y + ', r: ' + this.r;
	}
};

/**
* Returns a new zero based Circle
*/
fx.Circle.Zero = function(){
    return new fx.Circle();
};

/**
* Returns true if o is an instance of fx.Circle
*/
fx.Circle.isCircle = function(o){
    return o instanceof fx.Circle;
};