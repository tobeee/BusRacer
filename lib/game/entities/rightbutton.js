///////////////////////////
//// rightbutton  .js /////
///////////////////////////

ig.module(
	'game.entities.rightbutton'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityRightbutton = ig.Entity.extend({
		//physical movement parameters
		img: new ig.Image( 'media/rButton.png' ),
		size: {x:88, y:88},
		collides: ig.Entity.COLLIDES.NEVER,
		gravityFactor: 0,
		player:"",
		
	
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
			this.player =  ig.game.getEntitiesByType('EntityPlayer')[0];
		},
		
		update: function(){
			//call the parent constructor
			this.parent();
			//inventory has been clicked, enact loaded powerup
			if (ig.input.pressed('space') && this.inFocus()) {
				this.player.steeringAngle = +this.player.MAX_STEER_ANGLE;
			}
			
			if( ig.input.released('space') ) {
				    this.player.steeringAngle = 0;
				    console.log('steeringangle:'+this.player.steeringAngle);
			}
			
		
		},
		
		draw: function(){
			//draw the icon
			this.img.drawTile( this.pos.x, this.pos.y, 0, 44 );
	
		},
		
		inFocus: function() {
			if(ig.input.mouse.x > this.pos.x && ig.input.mouse.x < this.pos.x + 44 && ig.input.mouse.y > this.pos.y && ig.input.mouse.y < this.pos.y +44){
				var x= true;
				return x;
			}
			else{
				var x = false;
				return x;
			}
		}
		
	});
	
});