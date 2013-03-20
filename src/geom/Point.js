/**
* The Point object represents a location in a two-dimensional Cartesian coordinate system, where x represents the horizontal axis and y represents the vertical axis.
* @param {Number} x
* @param {Number} y
*/
fx.Point = function(x, y){
    if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function');
    }

    this.reset(x, y);
};

fx.Point.prototype = {

    /**
    * Sets the members of Point to the specified values
    */
    reset : function(x, y){
        this.x = x || 0;
        this.y = y || 0;
        return this;
    },

    /** 
    *   Adds the coordinates of another point to the coordinates of this point.
    */
    add : function(x, y){
        this.x += x;
        this.y += y;
        return this;
    },

    /** 
    * Subtracts the coordinates of another point to the coordinates of this point.
    */
    subtract : function(x, y){
        this.x -= x;
        this.y -= y;
        return this;
    },

    /** 
    * Multiplies the coordinates of another point to the coordinates of this point.
    */
    multiply : function(x, y){ 
        this.x *= x;
        this.y *= y;
        return this;
    },

    /** 
    * Divides the coordinates of another point to the coordinates of this point.
    */
    divide : function (scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this; 
    },

    /** 
    * Bitwise round
    */
    round : function(){
        this.x = this.x | 0;
        this.y = this.y | 0;
        return this;
    },

    /**
    * Translates this point's relative position from the source Rectangle onto the destination Rectangle.
    */
    translate : function(rectSrc, rectDest){
        this.x *= (rectDest.width / rectSrc.width);
        this.y *= (rectDest.height / rectSrc.height);
        return this;
    },
    
    /**
    *  Clones this Point.
    */
    clone : function(){
        return new fx.Point(this.x, this.y);
    },

    /**
    * Determines a point between two specified points (aka linear interpolation or lerp)
    * @fraction: Determines where the new interpolated point is located between this point and the supplied point relative to the fraction
    * Note, that the original Point remains unchanged
    */
    interpolate : function(point, fraction){
        return new fx.Point(
            this.x + fraction * (point.x - this.x),
            this.y + fraction * (point.y - this.y)
        );
    },

    /**
    *  Returns the distance between this point and the supplied point
    */
    distanceTo : function(point){
        return Math.abs(Math.sqrt((point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y)));
    },

    /**
    * Returns the angle between two points measured from the positive x-axis.
    */
    angleBetween : function(point){
        var dx = point.x - this.x;
        var dy = point.y - this.y;   
        return Math.atan2(dx, dy);
    },

    /**
    *  Compare two points and returns true if the x and y value of each point has the same value
    */
    equals : function(point){
        return point.x === this.x && point.y === this.y; 
    },

    /**
    * Debug draw
    */
    draw : function(ctx, pointSize){
        var s = pointSize || 3;
        ctx.save();
        ctx.translate(this.x + s / 2, this.y + s / 2);
        ctx.fillRect(-s, -s, s, s);
        ctx.restore();
        return this;
    },
    
    /**
    * Returns a string representation of this Point
    */
    toString : function(){
        return '[Point] x: ' + this.x + ', y: ' + this.y;
    }
};

fx.Point.Zero = function(){
    return new fx.Point(0, 0);
};

fx.Point.DistanceTo = function(point1, point2){
    return point1.distanceTo(point2);
};

fx.AngleBetween = function(point1, point2){
    return point1.angleBetween(point2);
};

fx.Point.Interpolate = function(point1, point2, factor){
    return point1.interpolate(point2, factor);
};

fx.Point.IsPoint = function(o){
    return o instanceof fx.Point;
};