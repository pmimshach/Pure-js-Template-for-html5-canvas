(function(){
	//init configuration
	var canvas 		 = document.getElementById('canvas'),
		ctx 		 =  canvas.getContext('2d'),
		CanvasWidth  = 0,
		CanvasHeight = 0,
		pageOffset 	 = {}, 
		clientSize 	 = new ClientSize (),
		mousePressed = false
		mouseX 		 = 0,
		mouseY		 = 0,
		particles = [],
		TOTALPARTICLES = 30;
	
	var Particle = function (x,y,size,speed) {
		this.x     = x;
		this.y     = y;
		this.size  = size;
		this.speed = speed;
	}

	var onDocumentReady = function () {
		
		//set up web view dimensions
		onResize();
		//creating particles
		var i = TOTALPARTICLES;
		while (i--) {
			var iniX     = Math.random() * CanvasWidth,
				iniY     = Math.random() * CanvasHeight,
				iniSize  = Math.random() * 300,
				iniSpeed = Math.random() * 2.13;
			var particle = new Particle (iniX,iniY,iniSize,iniSpeed);
			particles.push(particle);
		}
		//start the loop
		animate();
		

	};
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

		//setting document offsets
		pageOffset.offsetLeft = CanvasWidth / 2 - 500;
		pageOffset.offsetRight = CanvasWidth - pageOffset.offsetLeft;

	};
	var animate = function (){
		//disabled
		setInterval(render,40);
			
		//secure loop is more secure than setInterval loop to preserve low CPU level
		render();
	}; 

	// rendering on the canvas
	var render = function () {
		
		//clearing canvas every frame
		ctx.clearRect(0,0,CanvasWidth,CanvasHeight)

		// moving particles
		var i = TOTALPARTICLES;
		while (i--) {
		
			var tmpX 	  = particles[i].x,
				tmpY 	  = particles[i].y,
				tmpSize   = particles[i].size;

			 
			
			ctx.beginPath(); 
			ctx.fillStyle = 'rgba(20,30,130,0.6)'; 
			//drawing a square
			ctx.fillRect(tmpX,tmpY,tmpSize,tmpSize)
			ctx.fill();

		

			if((particles[i].x <  0) || (particles[i].x > CanvasWidth)) {
				particles[i].x =- 2 * particles[i].speed;
			} 
			

			particles[i].x +=  2 * particles[i].speed;
		
			

		}

		
	}

	//set Listeners
	window.addEventListener('load',onDocumentReady,false);
	window.addEventListener('resize',onResize,false);
	window.addEventListener('mousemove',updateMouseCordinates,false);
	window.addEventListener('mousedown',function () {mousePressed = true},false);
	window.addEventListener('mouseup',function () {mousePressed = false},false);
}())

