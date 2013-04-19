///////////////////////////
//// energybar    .js /////
///////////////////////////

ig.module(
	'game.entities.energybar'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityEnergybar = ig.Entity.extend({
		//physical movement parameters
		size: {x:104, y:25},
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
		
		},
		
		draw: function(){
			var ctx = ig.system.context;
			//get the draw position
			var ctxX = ig.system.getDrawPos( this.pos.x - ig.game.screen.x );
			var ctxY = ig.system.getDrawPos( this.pos.y - ig.game.screen.y );
			
			//drawing
			ctx.beginPath();
			//color
			ctx.fillStyle = "rgba(255, 255, 255, 1)";
			//draw the rectangle
			ctx.fillRect(this.pos.x,this.pos.y,102,25);
			//color
			ctx.fillStyle = "rgba(110, 110, 110, 1)";
			//draw the energy bar
			ctx.fillRect(this.pos.x+1,this.pos.y+1,this.player.boostEnergy,23);
	
		}
		
		
	});
	
});