ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	//plugins
	'plugins.touch-button',
	'plugins.box2d.game',
	'plugins.box2d.debug',
	//tracks
	'game.levels.track',
	//entities
	'game.entities.player',
	'game.entities.opponent',
	'game.entities.finish',
	'game.entities.breadcrumb',
	'game.entities.breadcrumbparticle',
	'game.entities.smokeparticle',
	'game.entities.powerup1',
	//UI classes
	'game.entities.inventorybox',
	'game.entities.leftbutton',
	'game.entities.rightbutton',
	'game.entities.boostbutton',
	'game.entities.energybar'
	
	//debugger
	//'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Box2DGame.extend({
	font: new ig.Font( 'media/invasionFont.png' ),
	gravity: 0,
	mps: 0,
	ready: false,
	winner: "none",
	timer: new ig.Timer(),
	loaded: false,
	screenMove: true,
	buttons: [],
	boostButtonImg: new ig.Image( 'media/boost.png' ),
	leftButtonImg: new ig.Image( 'media/lButton.png' ),
	rightButtonImg: new ig.Image( 'media/rButton.png' ),
	player: "",
	init: function() {
		//box2d debug
		this.debugCollisionRects = true;
		//bind keys
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.B, 'boost');
		ig.input.bind( ig.KEY.MOUSE1, 'space');
		ig.input.bind( ig.KEY.SPACE, 'brake');
		//bind touch buttons
		this.buttons = [
			//new ig.TouchButton( 'leftButton', 48, 246, 44, 44, this.leftButtonImg, 0 ),
			//new ig.TouchButton( 'rightButton', 118, 246, 44, 44, this.rightButtonImg, 0 ), 
			//new ig.TouchButton( 'boostButton', 474, 226, 34, 34, this.boostButtonImg, 0 )
		];	 
		// Load test level
		this.loadLevel( LevelTrack);
		//draw box2d debug
		this.debugDrawer = new ig.Box2DDebug( ig.world );
		//spawn UI
		var settings;
		ig.game.spawnEntity( EntityInventorybox,429, 181, settings );
		ig.game.spawnEntity( EntityLeftbutton,48, 246, settings );
		ig.game.spawnEntity( EntityRightbutton,118, 246, settings );
		ig.game.spawnEntity( EntityBoostbutton,474, 226, settings );
		ig.game.spawnEntity( EntityEnergybar,440, 10, settings );
		//initialise camera position
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player && this.screenMove == true) {
		    this.screen.x = player.pos.x - (ig.system.width/2);
		    this.screen.y = player.pos.y - (ig.system.height/2);
		    this.screenMove = false;
		}
		

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
			
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
		if( player /*&& this.screenMove == true*/) {
		    this.screen.x = player.pos.x - (ig.system.width/2);
		    this.screen.y = player.pos.y - (ig.system.height/2);
		    this.screenMove = false;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		//get system dimensions for drawing
		var x = ig.system.width/2,
		y = ig.system.height/2;
		//drawing text
		if (this.winner == "none"){
			this.font.draw( "mps: "+this.mps + " ready "+this.ready, x-260, y-140, ig.Font.ALIGN.LEFT );
			this.font.draw( "player score: "+ig.game.getEntitiesByType('EntityPlayer')[0].score, x-260, y-120, ig.Font.ALIGN.LEFT );
			//this.font.draw( "AI score: "+ig.game.getEntitiesByType('EntityOpponent')[0].score, x-260, y-100, ig.Font.ALIGN.LEFT );
		}
		else if(this.winner == "player"){
			this.font.draw( "You Win!!! mps: "+this.mps, x, y, ig.Font.ALIGN.CENTER );
		}
		else if(this.winner == "opponent"){
			this.font.draw( "You Lose!!! mps: "+this.mps, x, y, ig.Font.ALIGN.CENTER );
		}
		
		//Draw all touch buttons - if we have any
		for( var i = 0; i < this.buttons.length; i++ ) {
		    this.buttons[i].draw();
		}
		
		//draw box2d debug
		this.debugDrawer.draw();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 568, 320, 1 );

});
