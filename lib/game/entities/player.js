//////////////////////////////////////
// Player item entity               //
//////////////////////////////////////

ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

	EntityPlayer = ig.Box2DEntity.extend({
		
		//box2d handles collisions so turn off impact collision handling
		collides: ig.Entity.COLLIDES.NEVER,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		//gameplay vars
		score: 0,
		inventory: ["none"],
		boostEnergy: 100,
		pulse: false,
		//we'll use these to store gyro values
		alpha: 0,
		beta: 0,
		gamma: 0,
		
		MAX_STEER_ANGLE : Math.PI/3,
		STEER_SPEED : 3,
		SIDEWAYS_FRICTION_FORCE : 10,
		HORSEPOWERS : 100,
		CAR_STARTING_POS : new b2.Vec2(30,140),
		 
		leftRearWheelPosition : new b2.Vec2(-1.1,2),
		rightRearWheelPosition : new b2.Vec2(1.1,2),
		leftFrontWheelPosition : new b2.Vec2(-1.1,-2),
		rightFrontWheelPosition : new b2.Vec2(1.1,-2),
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
		},
	
	
		createBody: function(x,y,settings) {
			this.parent(x,y,settings);
			
			
			this.engineSpeed=0;
			this.steeringAngle=0;
			
			// define our body
			var bodyDef = new b2.BodyDef();
			bodyDef.type = b2.dynamicBody;
			bodyDef.linearDamping = 1.5;
			bodyDef.angularDamping = 20;
			bodyDef.position = this.CAR_STARTING_POS.Copy()
			 
			this.body = ig.world.CreateBody(bodyDef);
			this.body.SetMassFromShapes();
			 
			var leftWheelDef = new b2.BodyDef();
			leftWheelDef.position = this.CAR_STARTING_POS.Copy();
			leftWheelDef.position.Add(this.leftFrontWheelPosition);
			this.leftWheel = ig.world.CreateBody(leftWheelDef);
			 
			var rightWheelDef = new b2.BodyDef();
			rightWheelDef.position = this.CAR_STARTING_POS.Copy();
			rightWheelDef.position.Add(this.rightFrontWheelPosition);
			 
			this.rightWheel = ig.world.CreateBody(rightWheelDef);
			var leftRearWheelDef = new b2.BodyDef();
			leftRearWheelDef.position = this.CAR_STARTING_POS.Copy();
			leftRearWheelDef.position.Add(this.leftRearWheelPosition);
			this.leftRearWheel = ig.world.CreateBody(leftRearWheelDef);
			 
			var rightRearWheelDef = new b2.BodyDef();
			rightRearWheelDef.position = this.CAR_STARTING_POS.Copy();
			rightRearWheelDef.position.Add(this.rightRearWheelPosition);
			this.rightRearWheel = ig.world.CreateBody(rightRearWheelDef);
			
			// define our shapes
			var shapeDef = new b2.PolygonDef();
			shapeDef.SetAsBox(0.5,2.5);
			shapeDef.density = 1;
			this.body.CreateShape(shapeDef);
			 
			//Left Wheel shape
			var leftWheelShapeDef = new b2.PolygonDef();
			leftWheelShapeDef.SetAsBox(0.2,0.5);
			leftWheelShapeDef.density = 0.3;
			leftWheelShapeDef.friction = 2;
			//leftWheelShapeDef.isSensor = true;
			this.leftWheel.CreateShape(leftWheelShapeDef);
			 
			//Right Wheel shape
			var rightWheelShapeDef = new b2.PolygonDef();
			rightWheelShapeDef.SetAsBox(0.2,0.5);
			rightWheelShapeDef.density = 0.3;
			rightWheelShapeDef.friction = 2;
			//rightWheelShapeDef.isSensor = true;
			this.rightWheel.CreateShape(rightWheelShapeDef);
			 
			//Left Wheel shape
			var leftRearWheelShapeDef = new b2.PolygonDef();
			leftRearWheelShapeDef.SetAsBox(0.2,0.5);
			leftRearWheelShapeDef.density = 5;
			leftRearWheelShapeDef.friction = 5;
			leftRearWheelShapeDef.isSensor = false;
			this.leftRearWheel.CreateShape(leftRearWheelShapeDef);
			 
			//Right Wheel shape
			var rightRearWheelShapeDef = new b2.PolygonDef();
			rightRearWheelShapeDef.SetAsBox(0.2,0.5);
			rightRearWheelShapeDef.density = 5;
			rightRearWheelShapeDef.friction = 5;
			rightRearWheelShapeDef.isSensor = false;
			this.rightRearWheel.CreateShape(rightRearWheelShapeDef);
			 
			this.body.SetMassFromShapes();
			this.leftWheel.SetMassFromShapes();
			this.rightWheel.SetMassFromShapes();
			this.leftRearWheel.SetMassFromShapes();
			this.rightRearWheel.SetMassFromShapes();
			
			// Joints
			var leftJointDef = new b2.RevoluteJointDef();
			console.log(this.leftWheel.GetWorldCenter());
			leftJointDef.Initialize(this.body, this.leftWheel, this.leftWheel.GetWorldCenter());
			leftJointDef.enableMotor = true;
			leftJointDef.maxMotorTorque = 100;
			 
			var rightJointDef = new b2.RevoluteJointDef();
			rightJointDef.Initialize(this.body, this.rightWheel, this.rightWheel.GetWorldCenter());
			rightJointDef.enableMotor = true;
			rightJointDef.maxMotorTorque = 100;
			
			this.leftJoint = ig.world.CreateJoint(leftJointDef);
			this.rightJoint= ig.world.CreateJoint(rightJointDef);
			 
			var leftRearJointDef = new b2.RevoluteJointDef();
			leftRearJointDef.Initialize(this.body, this.leftRearWheel, this.leftRearWheel.GetWorldCenter(), new b2.Vec2(1,0));
			leftRearJointDef.enableLimit = true;
			leftRearJointDef.lowerTranslation = leftRearJointDef.upperTranslation = 0;
			 
			var rightRearJointDef = new b2.RevoluteJointDef();
			rightRearJointDef.Initialize(this.body, this.rightRearWheel, this.rightRearWheel.GetWorldCenter(), new b2.Vec2(1,0));
			rightRearJointDef.enableLimit = true;
			rightRearJointDef.lowerTranslation = rightRearJointDef.upperTranslation = 0;
			 
			ig.world.CreateJoint(leftRearJointDef);
			ig.world.CreateJoint(rightRearJointDef);
			console.log(this);
		},
		
		update: function(){
			if (ig.game.ready == true){
				//ig.world.Step(1/30, 8);
				
				//add to boostEnergy
				if(this.boostEnergy <= 100){
					this.boostEnergy += 0.01;
				}
				
				//input states
				//trigolleto uses ig.input.pressed, we might want .state
				if(ig.input.pressed("up")){
					this.body.WakeUp();
					this.engineSpeed = -this.HORSEPOWERS;
					console.log('enginespeed:'+this.engineSpeed);
				}
				
				if(ig.input.pressed("down")){
					this.engineSpeed = this.HORSEPOWERS;
					console.log('enginespeed:'+this.engineSpeed);
				}
				
				if(ig.input.state("brake")){
					//this.engineSpeed = -(this.HORSEPOWERS/3);
					//console.log('enginespeed:'+this.engineSpeed);
					//only kill unwanted lat vel for front wheels
					this.killOrthogonalVelocity(this.leftWheel);
					this.killOrthogonalVelocity(this.rightWheel);
				}
				else{
					//kill unwanted lateral wheel velocity for all wheels
					this.killOrthogonalVelocity(this.leftWheel);
					this.killOrthogonalVelocity(this.rightWheel);
					this.killOrthogonalVelocity(this.leftRearWheel);
					this.killOrthogonalVelocity(this.rightRearWheel);
				}
				
				if (ig.input.pressed("left") || ig.input.pressed("leftButton")) {
					this.steeringAngle = -this.MAX_STEER_ANGLE;
					console.log('steeringangle:'+this.steeringAngle);
				}
				     
				if (ig.input.pressed("right") || ig.input.pressed("rightButton")) {
					this.steeringAngle = +this.MAX_STEER_ANGLE;
					console.log('steeringangle:'+this.steeringAngle);
				}
				
				// Key released
				if(( ig.input.released('up') ) || (ig.input.released('down'))) {
				    this.engineSpeed = 0;
				    console.log('enginespeed:'+this.engineSpeed);
				}
				
				if(( ig.input.released('left') ) || (ig.input.released('right'))) {
				    this.steeringAngle = 0;
				    console.log('steeringangle:'+this.steeringAngle);
				}
				
				if(ig.input.released("brake") && ig.input.state('up')){
					//this.engineSpeed = -this.HORSEPOWERS;
					console.log('enginespeed:'+this.engineSpeed);
				}
				
				//we need to handle the case where the user
				//brakes but is not accelerating
				if(ig.input.released("brake")){
					//this.engineSpeed = 0;
					console.log('enginespeed:'+this.engineSpeed);
				}
			
				//accept gps input
				var accel = ig.game.mps * 10;
				//use it to set velocity (pre box2d)
				if(accel > 0 && ig.game.ready == true){
					this.pulse = true;
					this.body.WakeUp();
					this.engineSpeed = -accel;
					//console.log(pulse);
				} 
				if (accel == 0 && this.pulse == true){
					this.engineSpeed = 0;
					this.pulse = false;
					//console.log(pulse);
				}
				
				var ldirection = this.leftWheel.GetXForm().R.col2.Copy();
				var rdirection = this.rightWheel.GetXForm().R.col2.Copy();
				
				ldirection.Multiply(this.engineSpeed);
				rdirection.Multiply(this.engineSpeed);
				
				this.leftWheel.ApplyForce(ldirection, this.leftWheel.GetPosition());
				this.rightWheel.ApplyForce(rdirection, this.rightWheel.GetPosition());
			     
				//Steering
				var mspeed;
				mspeed = this.steeringAngle - this.leftJoint.GetJointAngle();
				this.leftJoint.SetMotorSpeed(mspeed * this.STEER_SPEED);
				mspeed = this.steeringAngle - this.rightJoint.GetJointAngle();
				this.rightJoint.SetMotorSpeed(mspeed * this.STEER_SPEED);
			
			
			}
			else{
				this.engineSpeed = 0;
				this.steeringAngle = 0;
			}
			//score if you hit the edge
			if (this.pos.x < ig.game.screen.x || this.pos.x > ig.game.screen.x+ig.system.width || this.pos.y < ig.game.screen.y || this.pos.y > ig.game.screen.y+ig.system.height){
				//you've hit the edge
				console.log('hit the edge');
				//shift the screen
				ig.game.screenMove = true;
				//increment player score
				this.score += 10;
				//stop the players -game not ready
				ig.game.ready = false;
				//move the loser to the winner
				//ig.game.getEntitiesByType('EntityOpponent')[0].pos.x = this.pos.x - 35;
				//ig.game.getEntitiesByType('EntityOpponent')[0].pos.y = this.pos.y + 15;
				//wait 	
				setTimeout(function(){
					//game is ready again
					ig.game.ready = true;
				},3000)
			}
			
			//call the parent
			this.parent();
		},
		killOrthogonalVelocity: function(targetBody) {
			var localPoint = new b2.Vec2(0,0);
			//we get the linear velocity of the targetBody (the wheel) from the localPoint
			var velocity = targetBody.GetLinearVelocityFromLocalPoint(localPoint);

			var sidewaysAxis = targetBody.GetXForm().R.col2.Copy();
		
			sidewaysAxis.Multiply(b2.Math.Dot(velocity,sidewaysAxis));

			targetBody.SetLinearVelocity(sidewaysAxis);
			
		        //sidewaysAxis.multiplyN(velocity.b2.Dot(sidewaysAxis));
			
			//console.log(targetBody.GetInertia());
			targetBody.SetAngularVelocity(2 * targetBody.GetInertia() * targetBody.GetAngularVelocity() );
			//targetBody.GetWorldPoint(localPoint);
		},
		draw: function(){
			this.parent();
		}
		
	});
	
});
	
