///////////////////////////
//// boostbutton  .js /////
///////////////////////////

ig.module(
	'game.entities.boostbutton'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityBoostbutton = ig.Entity.extend({
		//physical movement parameters
		img: new ig.Image( 'media/boost.png' ),
		size: {x:88, y:88},
		collides: ig.Entity.COLLIDES.NEVER,
		gravityFactor: 0,
		player:"",
		activePower: "none",
		pulse: false,
	
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
			this.player =  ig.game.getEntitiesByType('EntityPlayer')[0];
		},
		
		update: function(){
			//call the parent constructor
			this.parent();
			//boost has been clicked, enact boost
			if (ig.input.state('space') && this.inFocus() && ig.game.ready == true && this.player.boostEnergy>0) {
				console.log('clicked');
				this.pulse = true;
				//apply boost
				var boostAmount = 0.8;
				this.player.body.WakeUp();
				this.player.engineSpeed -=  boostAmount;
				console.log('enginespeed:'+this.player.engineSpeed);
				
				//deduct from boostEnergy
				this.player.boostEnergy -= 0.35;
				
				//spawn smokeparticles
				for (var i = 0; i<1; i++){
					if(Math.random()>0.6){
						var cx = this.player.pos.x + 7.5;
						var cy = this.player.pos.y + 12;
						var r = 12;
						var a = (this.player.angle + 95) * (Math.PI/180);
						var circleX = cx + r * Math.cos(a) + Math.floor(Math.random() * 4);
						var circleY = cy + r * Math.sin(a) + Math.floor(Math.random() * 4);
						ig.game.spawnEntity(EntitySmokeparticle, circleX, circleY);
					}
				}
			}
			if( ig.input.released('space') && this.pulse == true) {
				    this.player.engineSpeed = 0;
				    this.pulse = false;
				    console.log('enginespeed:'+this.player.engineSpeed);
			}
		
		},
		
		draw: function(){
			//draw the icon
			this.img.drawTile( this.pos.x, this.pos.y, 0, 34 );
		},
		
		inFocus: function() {
			if(ig.input.mouse.x+5 > this.pos.x && ig.input.mouse.x+5 < this.pos.x + 44 && ig.input.mouse.y > this.pos.y && ig.input.mouse.y < this.pos.y +44){
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