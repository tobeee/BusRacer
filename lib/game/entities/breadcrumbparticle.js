///////////////////////////
/// breadCrumb particle ///
///////////////////////////

//////////////////////////
//// breadCrumbs.js //////
//////////////////////////

ig.module(
	'game.entities.breadcrumbparticle'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityBreadcrumbparticle = ig.Entity.extend({
		//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/breadCrumbParticle.png', 2, 2 ),
		size: {x:2, y:2},
		collides: ig.Entity.COLLIDES.NEVER,
		
		maxVel: {x: 160, y: 200},
		lifeTime: 1,
		fadeTime: 1,
		bounciness: 0.3,
		vel: {x: 40, y: 50},
		friction: {x: 20, y: 20},
		
		
	
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			//random velocities
			this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
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