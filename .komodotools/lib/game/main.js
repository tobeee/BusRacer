ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.levels.track',
	
	'game.entities.player',
	'game.entities.opponent',
	'game.entities.finish',
	'game.entities.breadcrumb',
	'game.entities.breadcrumbparticle',
	'game.entities.inventorybox',
	'game.entities.powerup1'
	
	//'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/invasionFont.png' ),
	gravity: 300,
	mps: 0,
	ready: false,
	winner: "none",
	timer: new ig.Timer(),
	loaded: false,
	
	init: function() {

		
		//bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.SPACE, 'space');
		ig.input.bind( ig.KEY.MOUSE1, 'space');
			
		// Load test level
		this.loadLevel( LevelTrack);
		var settings;
		ig.game.spawnEntity( EntityInventorybox,988, 492, settings );
			
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		var x = ig.system.width/2,
		y = ig.system.height/2;
		
		//ready toggle
		if (ig.input.pressed('space') && this.ready == false){
			//game is made ready
			this.ready = true;
		}
		else if(ig.input.pressed('space') && this.ready == true){
			//game is made unready
			//tapping only starts the game
			//to allow for using powerups
			//this.ready = false;
		}
		
		//camera controls
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
		    this.screen.x = player.pos.x - (ig.system.width/2);
		    this.screen.y = player.pos.y - (ig.system.height/2);
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		// Add your own, additional update code here
		var x = ig.system.width/2,
		y = ig.system.height/2;
		
		if (this.winner == "none"){
			this.font.draw( "mps: "+this.mps + " ready "+this.ready, x, y, ig.Font.ALIGN.CENTER );
		}
		else if(this.winner == "player"){
			this.font.draw( "You Win!!! mps: "+this.mps, x, y, ig.Font.ALIGN.CENTER );
		}
		else if(this.winner == "opponent"){
			this.font.draw( "You Lose!!! mps: "+this.mps, x, y, ig.Font.ALIGN.CENTER );
		}
		
		
		
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 568, 320, 2 );

});
