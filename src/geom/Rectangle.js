/**
* The Rectangle object represents a rectangle
* The following code creates a Rectangle at 0,0 position with a width of 20 and a height of 40
* var r = new fx.Rectangle(0, 0, 20, 40);
*/
fx.Rectangle = function(x, y, width, height){

    if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function');
    }

    this.reset(x, y, width, height);
    this.regX = 0;
    this.regY = 0;
};

fx.Rectangle.prototype = {

	/**
	 * Reset's this rectangle's intrinsic properties
	 * @param  {Number} x
	 * @param  {Number} y
	 * @param  {Number} width
	 * @param  {Number} height
	 * @return {fx.Rectangle}
	 */
	reset: function (x, y, width, height) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
		return this;
	},

	/**
	 * Returns the top left corner
	 * @return {fx.Point} A Point object containing the x and y coordinate
	 */
	getTopLeft: function () {
		return new fx.Point(this.getLeft(), this.getTop());
	},

	/**
	 * Returns the top right corner
	 * @return {fx.Point} A Point object containing the x and y coordinate
	 */
	getTopRight: function () {
		return new fx.Point(this.getRight(), this.getTop());
	},

	/**
	 * Returns the bottom left corner
	 * @return {fx.Point} A Point object containing the x and y coordinate
	 */
	getBottomLeft: function () {
		return new fx.Point(this.getLeft(), this.getBottom());
	},

	/**
	 * Returns the bottom right corner
	 * @return {fx.Point} A Point object containing the x and y coordinate
	 */
	getBottomRight: function () {
		return new fx.Point(this.getRight(), this.getBottom());
	},

	/**
	 * Returns the center point
	 * @return {fx.Point} A Point object containing the x and y coordinate
	 */
	getCenter: function () {
		return new fx.Point(this.width / 2, this.height / 2);
	},

	/**
	 * The y coordinate of the top-left corner
	 * @return {Number}
	 */
	getTop: function () {
		return this.y;
	},

	/**
	 * The sum of the y and height properties.
	 * @return {Number}
	 */
	getBottom: function () {
		return this.y + this.height;
	},

	/**
	 * The x coordinate of the top-left corner
	 * @return {Number}
	 */
	getLeft: function () {
		return this.x;
	},

	/**
	 * The sum of the x and width
	 * @return {Number}
	 */
	getRight: function () {
		return this.x + this.width;
	},

	/**
	 * Bitwise round. Faster than Math.round()
	 * @return {fx.Rectangle}
	 */
	round: function () {
		this.x = this.x | 0;
		this.y = this.y | 0;
		this.width = this.width | 0;
		this.height = this.height | 0;
		return this;
	},

	/**
	 * Increases the size of the Rectangle object by the specified amounts, in pixels.
	 * The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
	 * @param  {number} dx
	 * @param  {number} dy
	 * @return {void}
	 */
	inflate: function (dx, dy) {
		this.x -= dx;
		this.width += 2 * dx;
		this.y -= dy;
		this.height += 2 * dy;
	},

	/**
	 * Scale a rectangle
	 * @return {fx.Rectangle}
	 */
	scale: function (scalar) {
		this.reset(this.x, this.y, this.width * scalar, this.height * scalar);
		return this;
	},

	/**
	 * Intersection as Boolean
	 * @return {Boolean}
	 */
	intersects: function (rectangle) {
		return !!this.intersection(rectangle);
	},

	/**
	 * Returns the intersecting part of two Rectangles as a new Rectangle
	 * @return {fx.Rectangle | null}
	 */
	intersection: function (rect) {
		var tx = this.x - this.regX;
		var ty = this.y - this.regY;
		var tw = this.width;
		var th = this.height;

		var rx = rect.x - rect.regX;
		var ry = rect.y - rect.regY;
		var rw = rect.width;
		var rh = rect.height;

		var x0 = Math.max(tx, rx);
		var x1 = Math.min(tx + tw, rx + rw);

		if (x0 <= x1) {
			var y0 = Math.max(ty, ry);
			var y1 = Math.min(ty + th, ry + rh);

			if (y0 <= y1) {
				return new fx.Rectangle(x0, y0, x1 - x0, y1 - y0);
			}
		}

		return null;
	},

	/**
	 * Translates a point's relative position from this Rectangle to another Rectangle.
	 * @return {fx.Point}
	 */
	translatePoint: function (point, rect) {
		return new fx.Point(
			point.x * (rect.width / this.width),
			point.y * (rect.height / this.height)
		);
	},

	/**
	 * Determines if a point falls within the boundaries of the Rectangle
	 * @return {boolean}
	 */
	containsPoint: function (point) {
		return !(point.x < this.x || point.x > this.x + this.width || point.y < this.y || point.y > this.y + this.height);
	},

	/**
	 * Debug draw
	 * @return {void}
	 */
	draw: function (ctx, fill) {
		var fill = fill || false;

		ctx.save();
		ctx.translate(this.x, this.y);

		if (fill) {
			ctx.fillRect(-this.regX, -this.regY, this.width, this.height);
		} else {
			ctx.strokeRect(-this.regX, -this.regY, this.width, this.height);
		}

		ctx.restore();
	},

	/**
	 * Returns a clone of this Rectangle preserving it's intrinsic properties.
	 * @return {String}
	 */
	clone: function () {
		return new fx.Rectangle(this.x, this.y, this.width, this.height);
	},

	/**
	 * Returns a String representation of a Rectangle
	 * @return {String}
	 */
	toString: function () {
		return '[Rectangle] x: ' + this.x + ', y: ' + this.y + ', width: ' + this.width + ', height: ' + this.height;
	}
};

/**
* Translates a point's relative position from this Rectangle to another Rectangle (aka mapping)
* @return {fx.Point}
*/
fx.Rectangle.TranslatePoint = function(point, sourceRect, destRect){
    return new fx.Point(
        point.x * (destRect.width / sourceRect.width),
        point.y * (destRect.height / sourceRect.height)
    )
};

/**
* Returns a new zero based Rectangle
* @return {fx.Rectangle}
*/
fx.Rectangle.Zero = function(){
    return new fx.Rectangle();
};

/**
* Return true if object qualifies as a Rectangle
* @return {Boolean}
*/
fx.Rectangle.IsRectangle = function(o){
    return o instanceof fx.Rectangle;
};