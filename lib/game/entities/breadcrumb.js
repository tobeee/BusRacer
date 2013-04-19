//////////////////////////
//// breadCrumbs.js //////
//////////////////////////

ig.module(
	'game.entities.breadcrumb'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	EntityBreadcrumb = ig.Entity.extend({
		//physical movement parameters
		animSheet: new ig.AnimationSheet( 'media/coin.png', 34, 34 ),
		size: {x:34, y:34},
		maxVel: {x: 40, y: 50},
		collides: ig.Entity.COLLIDES.NEVER,
		gravityFactor: 0,
		
	
		init: function( x, y, settings ){
			//call the parent constructor
			this.parent( x, y, settings );
			
                        //record positions
                        this.initialX = this.pos.x;
                        this.initialY = this.pos.y;
                        
			//add animations
			this.addAnim( 'idle', 0.1, [0] );
			
		},
		
		update: function(){
			//called every frame
			var player = ig.game.getEntitiesByType('EntityPlayer')[0];
			var opponent = ig.game.getEntitiesByType('EntityPlayer')[0];
			//var opponent = ig.game.getEntitiesByType('EntityOpponent')[0];
			//floating animation
                       
                        if (this.pos.y > this.initialY+3){
                            this.vel.y --;
                        }
                        else{
                            this.vel.y ++;
                        }
                        
                    
                        //what happens on contact with player
                        if (this.touches(player) == true || this.touches(opponent) == true){
				//what happens when the breadcrumb and the player touch
				//destroy the breadCrumb
                                this.kill();
                                //play a sound
                                
                                //increase player score
				if(this.touches(player) == true){
					player.score +=1;
				}
				else{
					//opponent gets 1
					opponent.score +=1;
				}
				
			}
			
			//call the parent
			this.parent();
		},
                
                kill: function(){
                    for (var i = 0; i<20; i++){
                        ig.game.spawnEntity(EntityBreadcrumbparticle, this.pos.x, this.pos.y);
                        
                        //call the parent
                        this.parent();
                    }
                }
		
	});
	
});