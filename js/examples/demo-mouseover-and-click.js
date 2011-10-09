(function(){
	//init configuration
	var canvas 		 = document.getElementById('canvas'),
		ctx 		 =  canvas.getContext('2d'),
		CanvasWidth  = 0,
		CanvasHeight = 0,
		pageOffset 	 = {}, 
		clientSize 	 = new ClientSize (),
		mousePressed = false,
		mouseX 		 = 0,
		mouseY		 = 0;
	
	

	var onDocumentReady = function () {
		
		//set up web view dimensions
		onResize();
		
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
		//setInterval(render,33);
			
		//secure loop is more secure than setInterval loop to preserve low CPU level
		render();
	}; 

	// rendering on the canvas
	var render = function () {
		
		//setting object coordinates
		var tmpX 	  = CanvasWidth/2-150,
			tmpY 	  = CanvasHeight/2-150,
			tmpWidth  = 300,
			tmpHeight = 300;

		//clearing canvas every frame
		ctx.clearRect(0,0,CanvasWidth,CanvasHeight)
		
		//draw something
		ctx.beginPath(); 
		
		//detect mouse hover and mouse down
		if ((mouseX >= tmpX) && mouseX <= (tmpX + tmpWidth)) {
				if((mouseY >= tmpY) && mouseY <= (tmpY + tmpHeight)) {
					if (mousePressed){
						ctx.fillStyle = "#00f"; 
					} else {
						ctx.fillStyle = "#f00"; 
					}
					document.body.style.cursor = 'pointer';
			}
		} else {
			document.body.style.cursor = 'default';
			ctx.fillStyle = "#333"; 
		}
		//drawing a square
		ctx.fillRect(tmpX,tmpY,tmpWidth,tmpHeight)
		ctx.fill();

		
		// secure loop
		/*
		you can remove it if you want try setInterval or window request animation frame loop
		*/
		setTimeout(render,20);
	}

	//set Listeners
	window.addEventListener('load',onDocumentReady,false);
	window.addEventListener('resize',onResize,false);
	window.addEventListener('mousemove',updateMouseCordinates,false);
	window.addEventListener('mousedown',function () {mousePressed = true},false);
	window.addEventListener('mouseup',function () {mousePressed = false},false);
}())

