/*
	Note: need to add some sliding values; have to add the lerp thing
*/

var f;
var Fs, Fc, Fe;
var incr = 0.0001;
var start = 0;
var t = 0;
let xoff = 0.0;
let yoff = 0.5;
let zoff = 2.0;

function setup() {
	var clientW = document.getElementById('sketch-holder').clientWidth;
	var clientH = document.getElementById('sketch-holder').clientHeight;
	var canvas = createCanvas(clientW, clientH);
	canvas.parent('sketch-holder');
}

function draw() {
	background(0, 90);
	translate(width / 2, height / 2);
	for (i = 0; i < width / 3; i++) {
		let y = noise(xoff, yoff, zoff);
		c = y;
		Fc = map(c, 0, 1, 0, 255);
		Fe = map(c, 0, 1, 0.01, 5);
		Fs = map(c, 0, 1,  -0.000001, 0.00001);
		rotate(sin(t) + Fs);
		scale(1.01);
		stroke(Fc);
		strokeWeight(Fe);
		point(t, i);
		t += Fs;
		xoff += 0.0005;
			yoff += 0.0001;
		
	}
	
	start += incr;
	t += incr;
	zoff += 0.0003
}
