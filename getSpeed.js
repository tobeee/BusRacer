///////////////////
//timer prototype//
///////////////////
Function.prototype.scope = function(context) {
    var f = this;
    return function() {
        return f.apply(context, arguments);
    };
};

Timer = function() {
    this.tick = 0;
    this.intervalId = null;
    this.period = 1000; // in ms
    this.isPaused = false;
};

jQuery.extend(Timer.prototype, {

    onTick: function() {
        if (!this.isPaused) {
            this.tick++;
        }
    },

    start: function() {
        this.intervalId = setInterval(function() {this.onTick()}.scope(this), this.period);
    },

    pause: function() {
        this.isPaused = !this.isPaused;
    },

    stop: function() {
        clearInterval(this.intervalId);

        var result = this.tick;
        this.tick = 0;
        this.isPaused = false;

        return result;
    }
});
///////////////////////
//END TIMER PROTOTYPE//
///////////////////////

//get speed

var posArray = [];
var distance;
var timer = new Timer();
var delta;
var speed = 0;

window.onload=function(){
	//set up geolocation controls
        var x=document.getElementById("speed");
        
	if (navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition,showError,{enableHighAccuracy: true});
	}
	else{x.innerHTML="Geolocation is not supported by this browser.";}

	function showPosition(position){
		x.innerHTML="Latitude: " + position.coords.latitude + 
		"<br>Longitude: " + position.coords.longitude + "<br>Speed: " + position.coords.speed + "<br>Calculated Speed: " + speed + "<br>accuracy: " + position.coords.accuracy + "<br>heading: " + position.coords.heading + "<br>timestamp: " + position.coords.timestamp;	
		
		timer.start();
		
		posArray.push({x:position.coords.latitude,y:position.coords.longitude});
		// calculate distance
		if (posArray.length > 1){
			delta = timer.tick;
			xd = posArray[posArray.length-1].x - posArray[posArray.length-2].x;
			yd = posArray[posArray.length-1].y - posArray[posArray.length-2].y;
			distance = Math.sqrt(xd*xd + yd*yd);
			speed = distance/delta;
                        //check if we have a speed result from gps
                        if (position.coords.speed != null){
                            //if so use gps speed
                            ig.game.mps = position.coords.speed;
                        }
                        //if not use cacl. speed, fix to 2 decimal places & cap
                        else {
                            //25 is 25 m/s == 55.92 mph
                            if(speed > 25){
                                ig.game.mps = 0;
                            }
                            else{
                                ig.game.mps = parseFloat(speed.toFixed(2));
                            }
                            
                        }
                        
		}
	}
        
        function showError(error){
            switch(error.code) 
              {
              case error.PERMISSION_DENIED:
                x.innerHTML="User denied the request for Geolocation."
                break;
              case error.POSITION_UNAVAILABLE:
                x.innerHTML="Location information is unavailable."
                break;
              case error.TIMEOUT:
                x.innerHTML="The request to get user location timed out."
                break;
              case error.UNKNOWN_ERROR:
                x.innerHTML="An unknown error occurred."
                break;
              }
        }
        
        
}


