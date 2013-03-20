/**
* A line represents two interconnected points 
* @param {fx.Point} a Point
* @param {fx.Point} b Point
*/
fx.Line = function(a, b){

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
    } 

   	if(!fx.Point.IsPoint(a) || !fx.Point.IsPoint(b)){
    	throw new Error('Argument a and b must be fx.Point objects.');
    }

    this.reset(a, b);
};

fx.Line.prototype = {

	/**
	* Reset a and b
	* @return {void}
	*/
	reset : function(a, b){
		this.a = a;
		this.b = b;
		return this;
	},

	/**
	* Returns the distance between a and b (length of the line)
	* @return {Number}
	*/
	getLength : function(){
		return this.a.distanceTo(this.b);
	},

	/**
	* Checks if two lines intersect.
	* @param  {fx.Line} line
	* @return {fx.Point | String | null} Returns the intersecting Point if the lines intersect. Otherwise returns null.     
	*/
	intersectsLine : function(line){
		var	a1 = this.a,
			a2 = this.b,
			b1 = line.a,
			b2 = line.b,
			ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
			ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
			u_b =  (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

		if(u_b != 0) {
			var ua = ua_t / u_b;
			var ub = ub_t / u_b;

			// If lines intersect return that intersecting point
			if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
				return new fx.Point(
				    a1.x + ua * (a2.x - a1.x), 
				    a1.y + ua * (a2.y - a1.y)
				);
			} else {
				return null;
			}
		} else {
			if(ua_t == 0 || ub_t == 0) {
				return fx.Line.COINCIDENT;
			} else {
				return fx.Line.PARALLEL;
			}
		}
	},

	/**
	* Checks if two lines are parallel
	* @return {Boolean}
	*/
	isParallel : function(line){
		return this.intersectsLine(line) === fx.Line.PARALLEL;
	},

	/**
	* Checks if two lines are coincicent (meaning that they lay precisely on top of each other)
	* @return {Boolean}
	*/
	isCoincicent : function(line){
		return this.intersectsLine(line) === fx.Line.COINCIDENT;
	},
	
	/**
	* Debug draw
	* @return {void}
	*/
	draw : function(ctx){
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(this.a.x, this.a.y);
		ctx.lineTo(this.b.x, this.b.y);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.a.x, this.a.y, 2, Math.PI * 2, 0, true);
		ctx.arc(this.b.x, this.b.y, 2, Math.PI * 2, 0, true);
		ctx.fill();
		ctx.closePath();

		ctx.restore();
		return this;
	},
	
	/**
	* Returns a String representation of a line object
	* @return {String}
	*/
	toString : function(){
		return '[Line] a: ' + this.a.x + ', ' + this.a.y + ',  b: ' + this.b.x + ', ' + this.b.y + ', length: ' + this.getLength().toFixed(2);
	}
};

/**
* Returns a new zero based Line
* @return {fx.Line}
*/
fx.Line.Zero = function(){
    return new fx.Line();
};

/**
* Returns true if Line qualifies as a fx.Line object
* @return {Boolean}
*/
fx.Line.IsLine = function(o){
	return o instanceof fx.Line;
};

fx.Line.PARALLEL = 'parallel';
fx.Line.COINCIDENT = 'coincicent';