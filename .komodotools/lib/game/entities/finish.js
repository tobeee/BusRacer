//////////////////////////////////////
// Finish item entity               //
//////////////////////////////////////

ig.module(
	'game.entities.finish'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityFinish = ig.Entity.extend({
	//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/finish.png', 80, 80),
		size: {x:80, y:80},
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
			//add animations
			this.addAnim( 'idle', 0.1, [1] );
			
		},
		
		update: function(){
			//called every frame
			var player = ig.game.getEntitiesByType('EntityPlayer')[0];
			var opponent = ig.game.getEntitiesByType('EntityOpponent')[0];
			if (this.touches(player) == true && ig.game.ready == true){
				//You win!
				ig.game.winner = "player";
				ig.game.ready = false;
			}
			else if(this.touches(opponent) == true && ig.game.ready == true){
				//You lose!
				ig.game.winner = "opponent";
				ig.game.ready = false;
			}
			//call the parent
			this.parent();
		}
		
	});
	
});
	
