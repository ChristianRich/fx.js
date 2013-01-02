fx.RidgidBody = function(x, y, vx, vy){

	this.p = new fx.geom.Vector2(x || 0, y || 0);
    this.velocity = new fx.geom.Vector2(vx || 0, vy || 0);
    this.m = 10; // mass: kg
    this.r = 10; // Math.round(5 + (Math.random() * (20 - 5)));
    this.cr = 0.5; // Bounciness: 0 - 1;
    this.rotation = 0;
}

fx.RidgidBody.prototype = {

    setElement : function(el){
        this.el = el;
        this.el.x = this.p.x;
        this.el.y = this.p.y;
    },

	update : function(gravity, dt, ppm) {
		this.velocity.y += gravity * dt;
		this.p.x += this.velocity.x * dt * ppm;
		this.p.y += this.velocity.y * dt * ppm;

		this.el.rotation += this.velocity.x;// * 0.01;
		
		this.el.x = this.p.x;
		this.el.y = this.p.y;
	},

	collide : function(obj) {
        var dt, mT, v1, v2, cr, sm,
            dn = new fx.geom.Vector2(this.p.x - obj.p.x, this.p.y - obj.p.y),
            sr = this.r + obj.r, // sum of radii
            dx = dn.length(); // pre-normalized magnitude

        if(dx > sr) {
            return; // no collision
        }

        // sum the masses, normalize the collision fx.geom.Vector2 and get its tangential
        sm = this.m + obj.m;
        dn.normalize();
        dt = new fx.geom.Vector2(dn.y, -dn.x);

        // avoid double collisions by "un-deforming" balls (larger mass == less tx)
        // this is susceptible to rounding errors, "jiggle" behavior and anti-gravity
        // suspension of the object get into a strange state
        mT = dn.multiply(this.r + obj.r - dx);
        this.p.add(mT.multiply(obj.m / sm));
        obj.p.add(mT.multiply(-this.m / sm));
         
        // this interaction is strange, as the CR describes more than just
        // the ball's bounce properties, it describes the level of conservation
        // observed in a collision and to be "true" needs to describe, rigidity, 
        // elasticity, level of energy lost to deformation or adhesion, and crazy
        // values (such as cr > 1 or cr < 0) for stange edge cases obviously not
        // handled here (see: http://en.wikipedia.org/wiki/Coefficient_of_restitution)
        // for now assume the ball with the least amount of elasticity describes the
        // collision as a whole:
        cr = Math.min(this.cr, obj.cr);

        // cache the magnitude of the applicable component of the relevant velocity
        v1 = dn.multiply(this.velocity.dot(dn)).length();
        v2 = dn.multiply(obj.velocity.dot(dn)).length(); 

        // maintain the unapplicatble component of the relevant velocity
        // then apply the formula for inelastic collisions
        this.velocity = dt.multiply(this.velocity.dot(dt));
        this.velocity.add(dn.multiply((cr * obj.m * (v2 - v1) + this.m * v1 + obj.m * v2) / sm));

        // do this once for each object, since we are assuming collide will be called 
        // only once per "frame" and its also more effiecient for calculation cacheing 
        // purposes
        obj.velocity = dt.multiply(obj.velocity.dot(dt));
        obj.velocity.add(dn.multiply((cr * this.m * (v1 - v2) + obj.m * v2 + this.m * v1) / sm));
    }
}