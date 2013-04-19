//////////////////////////////////////
// Opponent item entity             //
//////////////////////////////////////

ig.module(
	'game.entities.opponent'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityOpponent = ig.Entity.extend({
		//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/mmOpponent.png', 15, 24),
		size: {x:15, y:24},
		collides: ig.Entity.COLLIDES.ACTIVE,
		flip:false,
		gravityFactor: 0,
		maxVel: {x: 300, y:150},
		friction: {x: 100, y:0},
		offset: {x:-2,y:-2},
		timer: new ig.Timer(), 
		acceleration: 0,
		angle:0,
		bounciness: 1,
		
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
			//movement
			this.acceleration = ig.game.mps * 10;
			
			//add animations
			this.addAnim( 'idle', 0.1, [0] );
			this.addAnim( 'moving', 0.1, [0] );
		
		},
		
		update: function(){
			//called every frame

			//speed checks for ai
			if(this.timer.delta() > 1){
				console.log("speed check");
				this.timer.reset();
				if(Math.random() < 0.9){
					this.acceleration = (ig.game.mps*10) + (Math.random() * 10);
				}
				else{
					this.acceleration = (ig.game.mps*10) - (Math.random() * 10);
				}
			}
		
	
			if(this.acceleration>0 && ig.game.ready == true){
				this.vel.x = Math.sin(this.angle*Math.PI/180)*this.acceleration;
				this.vel.y = -(Math.cos(this.angle*Math.PI/180)*this.acceleration);
				this.currentAnim = this.anims.moving;
			
			}
			else {
				this.accel.x = 0;
				this.accel.y = 0;
				this.currentAnim = this.anims.idle;
			}
			
			//face the right way
			this.currentAnim.angle = this.angle*(Math.PI/180);
			
			//call the parent
			this.parent();
		}
		
	});
	
});
	
