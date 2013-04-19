//////////////////////////////////////
// Player item entity               //
//////////////////////////////////////

ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityPlayer = ig.Entity.extend({
		//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/mmCar.png', 15, 24),
		size: {x:15, y:24},
		collides: ig.Entity.COLLIDES.ACTIVE,
		flip:false,
		gravityFactor: 0,
		maxVel: {x: 300, y:150},
		friction: {x: 100, y:0},
		offset: {x:-2,y:-2},
		score: 0,
		inventory: ["none"],
		angle:0,
		
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
			
			//add animations
			this.addAnim( 'idle', 0.1, [0] );
			this.addAnim( 'moving', 0.1, [0] );
		
		},
		
		update: function(){
			//called every frame
			
			//movement
			if (ig.input.state("left")) {
				this.angle -= 3;
			};
			     
			if (ig.input.state("right")) {
				this.angle += 3;    
			};
			
			
			var accel = ig.game.mps * 10;
			
			if(accel>0 && ig.game.ready == true){
				this.vel.x = Math.sin(this.angle*Math.PI/180)*accel;
				this.vel.y = -(Math.cos(this.angle*Math.PI/180)*accel);
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
	
