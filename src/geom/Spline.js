/**
 * Implementation of splines: http://en.wikipedia.org/wiki/Spline_(mathematics)
 * Code is based on http://scaledinnovation.com/analytics/splines/aboutSplines.html
 */
fx.Spline = function(points, tension, closed, debug){

    this.points = points;
    this.tension = tension || 0.5;
    this.closed = closed || false;
    this.debug = debug || false;
}

fx.Spline.prototype = {

    draw: function(ctx) {

        var cp = [],
            n = this.points.length;

        if(n == 0){
            return;
        }

        // ctx.lineJoin = 'round';
        // ctx.lineCap = 'round';

        if(this.closed) { //   Append and prepend knots and control this.points to close the curve
        	// produces rugged lines and looks messed up

            this.points.push(this.points[0], this.points[1], this.points[2], this.points[3]);
            this.points.unshift(this.points[n - 1]);
            this.points.unshift(this.points[n - 1]);

            for (var i = 0; i < n; i += 2) {
                cp = cp.concat(this.getControlPoints(this.points[i], this.points[i + 1], this.points[i + 2], this.points[i + 3], this.points[i + 4], this.points[i + 5], this.tension));
            }

            cp = cp.concat(cp[0], cp[1]);

            for (var i = 2; i < n + 2; i += 2) {
                ctx.beginPath();
                ctx.moveTo(this.points[i], this.points[i + 1]);
                ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], this.points[i + 2], this.points[i + 3]);
                ctx.stroke();
                ctx.closePath();

                if (this.debug) {
                    this.drawControlLine(ctx, this.points[i], this.points[i + 1], cp[2 * i - 2], cp[2 * i - 1]);
                    this.drawControlLine(ctx, this.points[i + 2], this.points[i + 3], cp[2 * i], cp[2 * i + 1]);
                }
            }
        } else { // Draw an open curve, not connected at the ends
        	
            for (var i = 0; i < n - 4; i += 2) {
                cp = cp.concat(this.getControlPoints(this.points[i], this.points[i + 1], this.points[i + 2], this.points[i + 3], this.points[i + 4], this.points[i + 5], this.tension));
            }

            for (var i = 2; i < n - 5; i += 2) {
                ctx.beginPath();
                ctx.moveTo(this.points[i], this.points[i + 1]);
                ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], this.points[i + 2], this.points[i + 3]);
                ctx.stroke();
                ctx.closePath();

                if (this.debug) {
                    this.drawControlLine(ctx, this.points[i], this.points[i + 1], cp[2 * i - 2], cp[2 * i - 1]);
                    this.drawControlLine(ctx, this.points[i + 2], this.points[i + 3], cp[2 * i], cp[2 * i + 1]);
                }
            }

            //  For open curves the first and last arcs are simple quadratics.
            ctx.beginPath();
            ctx.moveTo(this.points[0], this.points[1]);
            ctx.quadraticCurveTo(cp[0], cp[1], this.points[2], this.points[3]);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(this.points[n - 2], this.points[n - 1]);
            ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], this.points[n - 4], this.points[n - 3]);
            ctx.stroke();
            ctx.closePath();

            if (this.debug) {
                this.drawControlLine(ctx, this.points[2], this.points[3], cp[0], cp[1]);
                this.drawControlLine(ctx, this.points[n - 4], this.points[n - 3], cp[2 * n - 10], cp[2 * n - 9]);
            }
        }
        
        if(this.debug) {
			for(var i = 0; i < n; i += 2) {
				this.drawPoint(ctx, this.points[i], this.points[i + 1]);
			}
        }

        return this;
    },

    drawPoint: function(ctx, x, y) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = '#666666';
		ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
    },

    drawControlLine: function(ctx, x, y, px, py) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        ctx.moveTo(x, y);
        ctx.lineTo(px, py);
        ctx.closePath();
        ctx.stroke();
        this.drawPoint(ctx, px, py);
        ctx.restore();
    },

    getControlPoints: function (x0, y0, x1, y1, x2, y2, t) {
        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var fa = t * d01 / (d01 + d12);
        var fb = t - fa;
        var p1x = x1 + fa * (x0 - x2);
        var p1y = y1 + fa * (y0 - y2);
        var p2x = x1 - fb * (x0 - x2);
        var p2y = y1 - fb * (y0 - y2);
        return [p1x, p1y, p2x, p2y];
    },

    toString : function(){
        return '[Spline] numPoints: ' + this.points.length + ', tension: ' + this.tension + ', closed: ' + this.closed + ', debug draw: ' + this.debug;
    }
}

/**
* PointsToNumbers
* Utillity method to format (or validate) an Array of Point objects [{x: 0, y: 2}, {x: 5, y: 20}] to a consecutive Array of numbers [0, 2, 5, 20]
* @param {Array} points
*/
fx.Spline.PointsToNumbers = function (points) {
    var res = [];

    if(!points || points === undefined) {
        throw new Error('fx.Spline: Missing argument points.');
    } else if (!fx.Type.isArray(points)) {
        throw new Error('fx.Spline: Type Array expected for argument points');
    } else if (points.length < 4) {
        console.warn('fx.Spline: Too few arguments: At least 3 points is required to draw a Spline');
        return points;
    } else if(fx.Type.isNumber(points[0]) && fx.Type.isNumber(points[1])){
        return points;
    } else if ('x' in points[0] && 'y' in points[0]) {

        for(var i = 0; i < points.length; i++) {
            res.push(points[i].x, points[i].y);
        }
        
        return res;
    } else {
        throw new Error('fx.Spline: Points Array does not contain valid Point objects.');
    }
}

/**
 * Returns a new Vector2 based on a Point
 */
fx.Spline.IsSpline = function(o){
    return o instanceof fx.Spline;
}