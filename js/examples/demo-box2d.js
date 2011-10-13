
(function(){
	//init configuration
	var canvas 		 = document.getElementById('canvas'),
		ctx 		 =  canvas.getContext('2d'),
		CanvasWidth  = 0,
		CanvasHeight = 0,
		pageOffset 	 = {}, 
		clientSize 	 = new ClientSize (),
		mousePressed = false;
		mouseX 		 = 0,
		mouseY		 = 0;

		
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-1000, -1000);
		worldAABB.maxVertex.Set(1000, 1000);
		var gravity = new b2Vec2(0, 100);
		var doSleep = true;

		var world = new b2World(worldAABB, gravity, doSleep); 
	
		

	var onDocumentReady = function () {
		//set up web view dimensions
		onResize();

		var circleSd = new b2CircleDef();
		circleSd.density = 1.0;
		circleSd.radius = 50;
		circleSd.restitution = 0;
		circleSd.friction = 1;
		var circleBd = new b2BodyDef();
		circleBd.AddShape(circleSd);
		circleBd.position.Set(CanvasWidth / 2 - 100,CanvasHeight / 2 - 100);
		var circleBody = world.CreateBody(circleBd);
		var jointDef = new b2RevoluteJointDef();
		jointDef.anchorPoint.Set(CanvasWidth / 2, CanvasHeight / 2);
		jointDef.body1 = world.GetGroundBody();
		jointDef.body2 = circleBody;
		world.CreateJoint(jointDef);
		var timeStep = 1.0/60;
		var iteration = 1;
		world.Step(timeStep, iteration);
	
		//start the loop
		animate();
		

	};
	var drawWorld = function (world, context) {
		for (var j = world.m_jointList; j; j = j.m_next) {
			drawJoint(j, context);
		}
		for (var b = world.m_bodyList; b; b = b.m_next) {
			for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
				drawShape(s, context);
			}
		}
	}
	var drawJoint = function (joint, context) {
		var b1 = joint.m_body1;
		var b2 = joint.m_body2;
		var x1 = b1.m_position;
		var x2 = b2.m_position;
		var p1 = joint.GetAnchor1();
		var p2 = joint.GetAnchor2();
		context.strokeStyle = '#f00';
		context.beginPath();
		switch (joint.m_type) {
		case b2Joint.e_distanceJoint:
			context.moveTo(p1.x, p1.y);
			context.lineTo(p2.x, p2.y);
			break;

		case b2Joint.e_pulleyJoint:
			// TODO
			break;

		default:
			if (b1 == world.m_groundBody) {
				context.moveTo(p1.x, p1.y);
				context.lineTo(x2.x, x2.y);
			}
			else if (b2 == world.m_groundBody) {
				context.moveTo(p1.x, p1.y);
				context.lineTo(x1.x, x1.y);
			}
			else {
				context.moveTo(x1.x, x1.y);
				context.lineTo(p1.x, p1.y);
				context.lineTo(x2.x, x2.y);
				context.lineTo(p2.x, p2.y);
			}
			break;
		}
		context.stroke();
	}
	var drawShape = function (shape, context) {
		context.strokeStyle = '#000';
		context.beginPath();
		switch (shape.m_type) {
		case b2Shape.e_circleShape:
			{
				var circle = shape;
				var pos = circle.m_position;
				var r = circle.m_radius;
				var segments = 16.0;
				var theta = 0.0;
				var dtheta = 2.0 * Math.PI / segments;
				// draw circle
				context.moveTo(pos.x + r, pos.y);
				for (var i = 0; i < segments; i++) {
					var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
					var v = b2Math.AddVV(pos, d);
					context.lineTo(v.x, v.y);
					theta += dtheta;
				}
				context.lineTo(pos.x + r, pos.y);
		
				// draw radius
				context.moveTo(pos.x, pos.y);
				var ax = circle.m_R.col1;
				var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
				context.lineTo(pos2.x, pos2.y);
			}
			break;
		case b2Shape.e_polyShape:
			{
				var poly = shape;
				var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
				context.moveTo(tV.x, tV.y);
				for (var i = 0; i < poly.m_vertexCount; i++) {
					var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
					context.lineTo(v.x, v.y);
				}
				context.lineTo(tV.x, tV.y);
			}
			break;
		}
		context.stroke();
	}


	var updateMouseCordinates = function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
	};
	//this object resize canvas size (it is called everytime you resize browser window)
	var onResize = function () {
		//setting canvas dimension
		CanvasWidth = clientSize.f_clientWidth();
		CanvasHeight  = clientSize.f_clientHeight();
		canvas.setAttribute('width', CanvasWidth );
		canvas.setAttribute('height', CanvasHeight );

	
	};
	var animate = function (){
		//setInterval(render,33);	

		render();
	}; 

	// rendering on the canvas
	var render = function (cnt) {
		//clearing canvas every frame
		ctx.clearRect(0,0,CanvasWidth,CanvasHeight)
		//draw something
		world.Step(1.0/60, 1);
  		drawWorld(world, ctx); 
  		setTimeout(render, 10);
	}

	//set Listeners
	window.addEventListener('load',onDocumentReady,false);
	window.addEventListener('resize',onResize,false);
	window.addEventListener('mousemove',updateMouseCordinates,false);
	window.addEventListener('mousedown',function () {mousePressed = true},false);
	window.addEventListener('mouseup',function () {mousePressed = false},false);
}())

