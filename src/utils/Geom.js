/**
* Geometry Utils by Christian Schlosrich
* Collection of static functions for working with geometry
*/	
fx.Geom = {

	/**
	* Degrees to radians
	* @param {number} degrees
	* @return {number}
	*/
	degToRad : function(degrees) {
		return degrees * (Math.PI / 180);
	},

	/**
	* Radian to degrees
	* @param {number} radians
	* @return {number}
	*/
	radToDeg : function(radians){
		return radians * (180 / Math.PI);
	},

	/**
	* Percent to circular degrees (360°)
	* Eg. 0% equals 0 degrees, 50% equals 180 degrees and 100% equals 360 degrees
	* @param {number} percent
	* @return {number}
	*/
	percentToDeg : function(percent) {
		return 360 / 100 * percent;
	},

	/**
	* Percent to radians
	* Eg. 0% equals 0 radians, 50% equals Math.PI and 100% equals Math.PI * 2
	* @param {number} percent
	* @return {number}
	*/
	percentToRad : function(percent) {
		return (360 / 100 * percent) * (Math.PI / 180);
	},

	/**
	* Radian expressed as a percentage of a full circle (360°)
	* Eg. Math.PI (halv a circle in radians) equals 50% while Math.PI * 2 (a full circle in radians) equals 100%
	* @param {number} radians
	* @return {number}
	*/
	radToPercent : function(radians) {
		return (radians * (180 / Math.PI) / 360 * 100) % 100;
	},

	/**
	* Degree expressed as a percentage of a full circle (360°)
	* @param {number} degrees
	* @return {number}
	*/
	degToPercent : function(degrees) {
		return (degrees / 360 * 100) % 100;
	},

	/**
	* Returns the distance between two points as given x0, y0, x1 and y1 (implementation of Pythagoras' theorem)
	* @param {number} x0
	* @param {number} y0
	* @param {number} x1
	* @param {number} y1
	* @return {number} Distance in pixels
	*/
	distance : function(x0, y0, x1, y1) {
		return Math.abs(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)));
	},
	
	/**
	* Linear Interpolation (LERP) between two values
	* @param {number} value1
	* @param {number} value2
	* @param {number} fraction
	* @return {number} The interpolated number
	*/
	lerp : function(value1, value2, fraction) { 
		return value1 + fraction * (value2 - value1);
	},

	/**
	* Linear interpolation (lerp) between two Points 
	* @param {Object} point1
	* @param {Object} point2
	* @param {number} fraction
	* @return {Object} An object containing the interpolated x and y coordinate
	*/
	lerpPoints : function(point1, point2, fraction) { 
		return this.getPoint(
			point1.x + fraction * (point2.x - point1.x), 
			point1.y + fraction * (point2.y - point1.y)
		)
	},

	/**
	* Maps a value from one coordinate space to another
	* @param {number} value
	* @param {number} factor
	* @return {number} the mapped number
	*/
	map : function(value, factor) {
		return value * factor;
	},

	/**
	* Maps a points from one coordinate space to another
	* Example:
	* var p1 = {x: 0, y:0}
	* var pointMapped = GeomUtils.mapPoint(p1, {x: .5, y: .5});
	* The new point have now been mapped onto a new coordinate space half the size as the original one
	* @param {Object} point
	* @param {number} factor
	* @return {Object} An object containing the mapped point (x and y)
	*/
	mapPoint : function(point, factor) {
		return this.getPoint(
			this.map(point.x, factor), 
			this.map(point.y, factor)
		);
	},

	/**
	* Determines the angle / degree between the first and second point.	 
	* @param {Object} first
	* @param {Object} second
	* @return {number} The degree between the two points
	*/
	getAngle : function(first, second) {
		return Math.atan((first.y - second.y) / (first.x - second.x)) / (Math.PI / 180);
	},

	/**
	* Calculates the perimeter of a rectangle.
	* @param {number} width
	* @param {number} height
	* @return {number}
	*/
	getRectanglePerimeter : function(width, height) {
		return width * 2 + height * 2;
	},

	/**
	* Returns the radian angle between two points
	* @param {Object} startPoint the starting coordinate of the line which angle is to be calculated
	* @param {Object} endPoint the end coordinate of the line which angle is to be calculated
	* @return {number} a new Radian instance that contains the calculated angle
	*/
	getRadian : function(startPoint, endPoint) {
		return Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
	},

	/**
	* Returns the polar coordinate (or the end point) of the specified startPoint, angle and distance
	* @param {Object} startPoint the starting coordinate that is used to calculate the polar coordinate
	* @param {number} angle the angle in radians that is used to calculate the polar coordinate
	* @param {number} distance value that is used to calculate the polar coordinate
	* @return {Object} a object containing the the x and y polar coordinate
	*/
	getPolar : function(startPoint, angle, distance) {
		return {
			x: (distance * Math.cos(angle)) + startPoint.x,
			y: (distance * Math.sin(angle)) + startPoint.y
		};
	},

	/**
	* Rotates a point around another point by the specified angle
	* @param {Object} point: The Point to rotate
	* @param {Object} centerPoint: The center point to rotate the point around
	* @param {number} angle: The angle (in degrees) to rotate this point
	* @return {Object} 
	*/
	rotatePoint : function(point, centerPoint, angle) {
		var r = this.degToRad(angle);
		var baseX = point.x - centerPoint.x;
		var baseY = point.y - centerPoint.y;

		return {
			x: (Math.cos(r) * baseX) - (Math.sin(r) * baseY) + centerPoint.x,
			y: (Math.sin(r) * baseX) + (Math.cos(r) * baseY) + centerPoint.y
		};
	},

	/**
	* Returns a point in a circle from radius and angle. Can be used for creating equal random distribution within a circle.
	* @param  {number} radius
	* @param  {number} angle as radians. Use method 'radToDeg' to convert to degrees
	* @return {Object} x, y
	*/
	getPointInCircle : function(radius, angle) {
		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius
		};
	},

	/**
	* Returns the nearest point on a circle's circumference from any given point (either inside or outside the circle)
	* @param  {number} x: x position
	* @param  {number} y: y position
	* @param  {number} r: radius
	* @return {Object}
	*/
	getCircumferencePoint : function(x, y, r) {
		// Offsetting the coordinate system to the center of the circle
		x -= r;
		y -= r;
		
		var b = Math.sqrt((r * r) / (1 + ((x * x) / (y * y))));
		var a = Math.sqrt((r * r) - (b * b));
		
		if(x > 0 && y > 0){
			return {x: a, y: b};
		} else if(x < 0 && y < 0){
			return {x: -a, y: -b};
		} else if(x < 0 && y > 0){
			return {x: -a, y: b};
		} else if(x > 0 && y < 0){
			return {x: a, y: -b};
		} else{
			return {x: a, y: b};
		}
	}
}