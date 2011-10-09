/**
 *
 * Version: 	0.0.1
 * Author:		Gianluca Guarini
 * Contact: 	gianluca.guarini@gmail.com
 * Website:		http://www.gianlucaguarini.com/
 * Twitter:		@gianlucaguarini
 *
 * Copyright (c) 2011 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/

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
		//setInterval(render,33);	
		render();
	}; 

	// rendering on the canvas
	var render = function () {
		//clearing canvas every frame
		ctx.clearRect(0,0,CanvasWidth,CanvasHeight)
		
		//draw something

		
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

