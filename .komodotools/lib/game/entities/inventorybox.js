///////////////////////////
//// inventory box.js /////
///////////////////////////

ig.module(
	'game.entities.inventorybox'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityInventorybox = ig.Entity.extend({
		//physical movement parameters
		img: new ig.Image( 'media/powerups1.png' ),
		size: {x:88, y:88},
		collides: ig.Entity.COLLIDES.PASSIVE,
		gravityFactor: 0,
		player:"",
		timer: new ig.Timer(),
		passedTime: 0,
		activePower: "none",
		bounciness: 1,
	
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
				console.log('clicked');
				if(this.player.inventory[this.player.inventory.length-1] == "ice"){
					//ice stuff
					console.log('ice');
					this.passedTime = 0;
					this.activePower = "ice";	
				}
				//empty the inventory
				this.player.inventory = ["none"];
			}
			
			//track time
			this.passedTime += this.timer.tick();
			
			if (this.activePower == "ice"){
				if(this.passedTime<2){
					console.log('iced');
					ig.game.getEntitiesByType('EntityOpponent')[0].angle = Math.floor(Math.random()*360);;
				}
			}
		},
		
		draw: function(){
			var ctx = ig.system.context;
			//get the draw position
			var ctxX = ig.system.getDrawPos( this.pos.x - ig.game.screen.x );
			var ctxY = ig.system.getDrawPos( this.pos.y - ig.game.screen.y );
			
			//drawing
			ctx.beginPath();
			//color
			ctx.fillStyle = "rgba(255, 219, 112, 0.65)";
			ctx.fillRect(988,492,88,88);
			
			//draw the icon
			if(this.player.inventory[this.player.inventory.length-1] == "none"){
				
			}
			if(this.player.inventory[this.player.inventory.length-1] == "ice"){
				this.img.drawTile( 499, 251, 333, 34 );
			}
	
		},
		
		inFocus: function() {
			if(ig.input.mouse.x*2 > this.pos.x && ig.input.mouse.x*2 < this.pos.x + 88 && ig.input.mouse.y*2 > this.pos.y && ig.input.mouse.y*2 < this.pos.y +88){
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