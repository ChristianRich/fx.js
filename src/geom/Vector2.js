fx.Vector2 = function(x, y){
	
	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function');
    }

    this.reset(x, y); 
}

fx.Vector2.prototype = {

	add : function(vec){
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},

	subtract : function(vec){
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},

	multiply : function(scalar){
		this.x *= scalar;
		this.y *= scalar;
		return this;
		//return new fx.Vector2(this.x * scalar, this.y * scalar);
	},

	divide : function (scalar) {
		this.x/=scalar;
		this.y/=scalar;
		return this; 
	},

	reverse : function () {
		this.x = -this.x;
		this.y = -this.y;
		return this; 
	},

	copyTo : function (vec) {
		vec.x = this.x;
		vec.y = this.y;
	},
	
	copyFrom : function (vec) {
		this.x = vec.x;
		this.y = vec.y;
	},

	reset: function(x, y){
		this.x = x || 0;
		this.y = y || 0;
		return this;
	},

	normalize : function(){
		var m = 1 / this.magnitude();
		this.x *= m;
		this.y *= m;
		return this;
	},

	project : function(vec){
		var percent = this.dot(vec) / vec.dot(vec);
    	return vec.multiply(percent);
	},
	
	perpendicular : function(vec){
		return this.subtract(this.project(vec));
	},

	/**
 	* @returns the angle betweeen this Vector and another Vector
 	*/
	angleBetween : function(vec, useRadians){
		return Math.acos(this.dot(vec) / (this.magnitude() * vec.magnitude())) * (useRadians ? 1 : fx.Vector2.TO_DEGREES);
	},

	/*
	 * Returns the vector's angle relative to the positive horizontal x-axis
	 */
	angle : function(useRadians) {
		return Math.atan2(this.y, this.x) * (useRadians ? 1 : fx.Vector2.TO_DEGREES);
	},

	/*
	 * Rotates the vector relative to the positive x-axis to the specified angle
	 */
	rotate : function (angle, useRadians) {
		var cos = Math.cos(angle * (useRadians ? 1 : fx.Vector2.TO_RADIANS)),
	    	sin = Math.sin(angle * (useRadians ? 1 : fx.Vector2.TO_RADIANS)),
	    	x = this.x,
	    	y = this.y;

		this.x = (x * cos) - (y * sin);
		this.y = (x * sin) + (y * cos);
		return this; 
	},

	/*
	* Returns the dot-product of two vectors (result is a number and not a Vector).
	*/
	dot : function(vec){
		return this.x * vec.x + this.y * vec.y;
	},

	/**
	* Returns the magnitude (or length) of the vector measured from the point of origin in the coordinate system (usually 0,0 starting from the top left corner since)
	*/
	magnitude : function(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	/*
	 * Returns the distance between this vector and another vector.
	 * This is sometimes referred to as the velocity or displacement.
	 */
	distanceTo : function(vec){
		var dx = vec.x - this.x;
		var dy = vec.y - this.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	/** 
	* Bitwise round
	*/
    round : function(){
		this.x = this.x | 0;
		this.y = this.y | 0;
    },

	equals : function (vec) {
		return this.x === vec.x && this.y === vec.y;
	},

	clone : function () {
		return new fx.Vector2(this.x, this.y);
	},

	/**
	 * Debug draw
	 */
	draw : function(ctx){
        ctx.save();

        ctx.lineWidth = 2;

        // Draw magnitude (line from 0,0 to x,y)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
        ctx.stroke();
        ctx.closePath();

        // Translate to local coords
        ctx.translate(this.x, this.y);

        // Draw vector info
        var info = 'x: ' + 
            this.x.toFixed(2) + ', y: ' + 
            this.y.toFixed(2) + ', mag: ' + 
            this.magnitude().toFixed(0);
            // + ', ' +this.angle().toFixed(1) + '°';

        ctx.fillText(info, 5, 2);
        ctx.closePath();

        // Draw arrow (displaying the vector's direction)
        var arrowSize = 10;
        ctx.beginPath();
        ctx.rotate(this.angle(true));
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, arrowSize);
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, -arrowSize);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
        ctx.stroke();
        ctx.closePath();

        ctx.fillText(this.angle().toFixed(1) + '°', -50, -5);
        ctx.restore();
        return this;
    },

	toString : function(){
		return '[Vector2] x: ' + this.x.toFixed(2) + ', y: ' + this.y.toFixed(2) + ', magnitude: ' + this.magnitude().toFixed(2) + ', angleDeg: ' + this.angle().toFixed(2);
    }
}

/**
 *
 * Converts an angle and a length to a Vector2.
 */
fx.Vector2.AngleToVector2 = function(angle, length, useRadians){
	var x = Math.cos(angle * (useRadians ? 1 : fx.Vector2.TO_RADIANS)) * length;
	var y = Math.sin(angle * (useRadians ? 1 : fx.Vector2.TO_RADIANS)) * length;
	return new fx.Vector2(x, y);
}

/**
 * Returns the distance between two points (or Vectors)
 */
fx.Vector2.Distance = function(a, b){
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Returns a new zero based Vector2
 */
fx.Vector2.Zero = function(){
	return new fx.Vector2(0, 0);
}

/**
 * Returns a new Vector2 based on a Point
 */
fx.Vector2.FromPoint = function(p){
	return new fx.Vector2(p.x, p.y);
}

/**
 * Returns true if o is an instance of Vector2
 */
fx.Vector2.isVector2 = function(o){
	return o instanceof fx.Vector2;
}

fx.Vector2.TO_DEGREES = 180 / Math.PI;
fx.Vector2.TO_RADIANS = Math.PI / 180;