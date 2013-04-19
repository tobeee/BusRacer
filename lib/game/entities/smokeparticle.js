//////////////////
//smoke particle//
//////////////////

ig.module(
	'game.entities.smokeparticle'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntitySmokeparticle = ig.Entity.extend({
		//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/bigSmoke.png', 10, 10 ),
		size: {x:10, y:10},
		collides: ig.Entity.COLLIDES.NEVER,
		
		maxVel: {x: 160, y: 200},
		lifeTime: 0.5,
		fadeTime: 0.5,
		bounciness: 0.3,
		vel: {x: 40, y: 40},
		friction: {x: 20, y: 20},
		gravityFactor: 0,
		
	
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			//get player
			this.player =  ig.game.getEntitiesByType('EntityPlayer')[0];
			
			//random velocities
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			//set a timer so we know how long to keep it around for
			this.idleTimer = new ig.Timer();
			
			//add animations
			this.addAnim( 'idle', 0.1, [0] );
			
		},
		
		update: function(){
			if ( this.idleTimer.delta() > this.lifeTime ){
				this.kill();
				return;
			}
			
			this.currentAnim.alpha = this.idleTimer.delta().map(this.lifeTime - this.fadeTime, this.lifeTime, 1, 0);
			
			//call the parent
			this.parent();
		}
		
	});
	
});