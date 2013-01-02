/*
 * (C) Christian Schlosrich 2012
 * Defines the boundaries and psysics of your world (aka game area)
 */
fx.World = function(width, height, scale){
	
	this.scale = scale || 1;
	this.width = width * this.scale;
	this.height = height * this.scale;

	// Strength of Earth's gravity acceleration measured as 9.81 meters per second. http://en.wikipedia.org/wiki/Gravitation
	this.gravity = 9.81;

	// Pixels per meter
	this.ppm = 30;

	// Storing key positions for handy retrival 
	this.TL 	= {x: 0, y: 0};	
	this.TC 	= {x: this.width / 2, y: 0};
	this.TR 	= {x: this.width, y: 0};
	this.ML 	= {x: 0, y: this.height / 2};
	this.CENTER = {x: this.width / 2, y: this.height / 2};
	this.MR 	= {x: this.width, y: this.height / 2};
	this.BL 	= {x: 0, y: this.height};
	this.BC 	= {x: this.width / 2, y: this.height};
	this.BR 	= {x: this.width, y: this.height};
}

/*
 * Calculates the distance between point a and b.
 */
fx.World.Distance = function(a, b){
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}