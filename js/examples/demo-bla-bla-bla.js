(function(){
	//init configuration
	var canvas 		 = document.getElementById('canvas'),
		ctx 		 =  canvas.getContext('2d'),
		CanvasWidth  = 0,
		CanvasHeight = 0,
		halfCanvasHeight = 0,
		halfCanvasWidth  = 0;
		pageOffset 	 = {}, 
		clientSize 	 = new ClientSize (),
		mousePressed = false
		mouseX 		 = 0,
		mouseY		 = 0
		totalbodyPath= 0
		i 			 = 0
		headSprite   = 'img/head.png',
		headImg		 = new Image;
	
	var bodyPath = [];
		// frame 1
		bodyPath[0]	   = [];
		bodyPath[0][0] = [-15,0,-35,0,-20,-15];
		bodyPath[0][1] = [-25,-20,-46,-30,-20,-120];
		bodyPath[0][2] = [-15,-120,0,-120,0,-115];
		bodyPath[0][3] = [10,-10,10,-10,5,0];
			

		// frame 2
		bodyPath[1]	   = [];
		bodyPath[1][0] = [-10,0,-45,0,-35,-20];
		bodyPath[1][1] = [-15,-20,-46,-30,-25,-125];
		bodyPath[1][2] = [-15,-120,0,-120,5,-120];
		bodyPath[1][3] = [20,-80,20,-30,40,-40];
		bodyPath[1][4] = [80,-70,70,-25,40,-25];
		bodyPath[1][5] = [20,-30,20,-50,0,0];
		bodyPath[1][6] = [10,0,10,0,30,0];
		
		// frame 3
		bodyPath[2]	   = [];
		bodyPath[2][0] = [-15,-10,-55,-10,-20,-25];
		bodyPath[2][1] = [-5,-30,-46,-40,-10,-120];
		bodyPath[2][2] = [-5,-120,-20,-120,15,-120];
		bodyPath[2][3] = [20,-70,20,-30,30,-30];
		bodyPath[2][4] = [70,-40,60,-25,30,-15];
		bodyPath[2][5] = [20,-20,20,-30,0,0];
		bodyPath[2][6] = [10,0,10,0,20,0];

		// frame 4
		bodyPath[3]	   = [];
		bodyPath[3][0] = [-10,-20,-35,-20,-20,-30];
		bodyPath[3][1] = [0,-40,-46,-50,-10,-120];
		bodyPath[3][2] = [-5,-120,-20,-120,15,-120];
		bodyPath[3][3] = [20,-70,20,-30,30,-20];
		bodyPath[3][4] = [70,-40,60,-25,30,-5];
		bodyPath[3][5] = [20,-10,20,-20,0,0];

		// frame 5
		bodyPath[4]	   = [];
		bodyPath[4][0] = [0,-20,-35,-20,-20,-35];
		bodyPath[4][1] = [0,-40,-46,-50,-10,-120];
		bodyPath[4][2] = [-5,-120,-20,-120,15,-120];
		bodyPath[4][3] = [20,-70,20,-30,30,-20];
		bodyPath[4][4] = [70,-30,50,-15,30,0];

		

	var onDocumentReady = function () {
		
		//set up web view dimensions
		onResize();
		
		//set audio volume
		document.getElementById('audio').volume = 0.3;

		totalbodyPath = bodyPath.length;
		
		headImg.src = headSprite;

		headImg.addEventListener('load',function(){
			//start the loop
			animate();
		},false);
		
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
		halfCanvasHeight = CanvasHeight / 2;
		halfCanvasWidth  = CanvasWidth / 2;
	};
	var animate = function (){
			
		//secure loop is more secure than setInterval loop to preserve low CPU level
		render();
	}; 

	// rendering on the canvas
	var render = function () {
		
		//clearing canvas every frame
		ctx.clearRect(0,0,CanvasWidth,CanvasHeight)

		ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 3;
		ctx.moveTo(0, halfCanvasHeight);
		var max = halfCanvasWidth / 20;
		
		ctx.lineTo (halfCanvasWidth - 20 - i * 10, halfCanvasHeight);
		
		for (var j = 0; j < bodyPath[i].length; j++ )
		{

			// (cp1x, cp1y, cp2x, cp2y, x, y)
			ctx.bezierCurveTo(halfCanvasWidth + bodyPath[i][j][0],halfCanvasHeight + bodyPath[i][j][1],halfCanvasWidth + bodyPath[i][j][2],halfCanvasHeight + bodyPath[i][j][3],halfCanvasWidth + bodyPath[i][j][4],halfCanvasHeight + bodyPath[i][j][5])

		}
		ctx.lineTo (CanvasWidth, halfCanvasHeight);
		ctx.stroke();	
		ctx.closePath();	
		ctx.drawImage(headImg,halfCanvasWidth - 64 + i, halfCanvasHeight - 220 + i);

		i ++;

		if (i == totalbodyPath) {
			i = 0;
		}


		setTimeout(render,70);
	}

	//set Listeners
	window.addEventListener('load',onDocumentReady,false);
	window.addEventListener('resize',onResize,false);
	window.addEventListener('mousemove',updateMouseCordinates,false);
	
}())

