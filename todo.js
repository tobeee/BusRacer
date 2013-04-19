//todo

- simplest implementation:
    - Start race when on bus
    - race is 3 mins long
    - race is against ai opponent
    - your speed is the busses speed
    - track is infinite or a loop

- powerups
    - different types
    //- collect into inventory (max of 1 or 3?)
    //- tap inventory item to fire
    //- autotarget
    //- timered events
        - speed up for x seconds
        - slow down for x seconds
        //- spin out for x seconds
    - minigames?
        - hit button x times in y seconds
        - swipe in correct direction in time

- design tracks
- race timer
- distance guage
- particle effects!
    //- smoke from moving vehicle
    - control smoke direction
    - weapon effects
- vehicle animations
//- Brake button!
    //- when using handbrake do not kill lat. vel. on rear tyres
- multitouch
        - http://impactjs.com/forums/code/multitouch
        //- turn on debug mode and see if it's working
        //- figure out why buttons aren't processing all touches
        //- might be to do with ID's?
        - WHY THE HELL aren't the touchbutton calls working????
        - switched back to entity buttons for now. 
- box2d implementation
    - http://impactjs.com/documentation/physics-with-box2d
    //- install box2d
    //- instantiate game with basic box2d physics
    //- model car & wheel physics using tut
    //- learn how the hell to use box2d
    //- repair box2d source code
    //- fix control issues
    //- fix boost issues with control pulse
    //- fix on screen steering issues with control pulse
    //- tune car handling
    - figure out how to make skidding work
    - go back through code and reinstate opponent
    - reinstate all calls to opponent in collectables
    - generate opponent as box2d car
    //- fiddle with steering and accel and figure out how to boost
    //- figure out what force to apply with .speed in mps
        - figure out how to exaggerate scale force with mps
    //- fix up on screen controls 
    - test it on a bus
    - draw sprites: http://www.box2dflash.org/docs/2.0.2/manual#Drawing_Sprites 
- 
//- boost & energy
    //- press button to apply velocity
    //- doing so reduces energy
    //- energy replenishes with timer
    //- energy is displayed as progress bar
        //- add boostEnergy to player class
        //- create boost button class
        //- track time on button press to reduce energy
        //- make button add to accel when pressed
                //- IF there is energy
        //- make button display image
        //- swap buttons around
        //- create power bar class
        //- make it display the players boostEnergy
       // - make it replenish over timer
       // - cap it at 200
       - if car collides 0 the acceleration 
       - tweak boost amount
        - some kind of friction ?
//- buttons to steer left/right
//- top down context
//- new sprites for cars
//- new sprites for track
//- rotate sprite for steering
- implement ramming & damage
- implement drop offs
//- implement edge of screen scoring
- gyroscope controls!
    - use alpha in the gyroscope object steer
    - will need calibrating every game
    

    
//- gps error checking
- further error checking
    - expose all remaining data
    - check accuracy against .speed working
    //- demand highest accuracy data
//- fallback to calculated speed
    - smooth calculated speed
    //- stop from falling back to infinity
    - maybe use accelerometer data
        - use gravity to establish up/down
        - listen for spikes in data which are the
        - bus stopping & starting and
        - stop/start the player in response
    - movement events
    
    
        

/////////////
//assets
//- bus assets
//- track assets
//- powerup assets
//- coin assets
/////////////
//classes
//- player
//- opponent
//- finish line
//- timer (instantiate in main.js)
//- coins
//- particles
- powerups
    //- ice opponent for x seconds
    - speed up for x seconds
    - shield
    - health
    - bomb
    - cannon
    - etc
- powerup message/buttons/minigame
/////////////






////////////////////
// code snippets ///
////////////////////
// tilt controls from player.js .update
//- implement tilt controls
    //- refine + decide if necessary
        //- put threshold into tilt controls
        //- tweak accel amount
            - further tweak with scalar function
        - adjust for device rotation
            - if screen is landscape then tilt controls must rotate
            - find way to control orientation of screen
    - combine with accelerometer?
//tilt movement
if(ig.game.ready == true){
        var beta = this.beta/4;
        var gamma = this.gamme/4;
        if (this.beta<15){
                //north
                if (this.angle > 315 && this.angle < 45){
                        //tilted north & facing north
                        this.vel.y += beta;
                }
                else{
                        this.vel.y += beta/2;
                }
        }
        if (this.beta>15){
                //south
                if (this.angle > 135 && this.angle < 225){
                        //tilted south and facing south
                        this.vel.y += beta;
                }
                else{
                        this.vel.y += beta/2;
                }
        }
        if (this.gamma>15){
                //east
                if (this.angle > 45 && this.angle < 135){
                        //tilted east and facing east
                        this.vel.x += gamma;
                }
                else{
                        this.vel.x += gamma/2;
                }
        }
        if (this.gamma<15){
                //west
                if (this.angle > 225 && this.angle < 315){
                        //tilted west and facing west
                        this.vel.x += gamma;
                }
                else{
                        this.vel.x += gamma/2;
                }
        }
}
///////////////////////
// end tilt controls //
///////////////////////


