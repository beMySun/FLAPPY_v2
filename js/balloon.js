var xMin = -320, xMax = 320;	// x coordinate range
var yMin = -320, yMax = 320;	// y coordinate range

var SVG_NS = "http://www.w3.org/2000/svg"
var n = 20;
var balloonSVG = document.querySelector("#balloon-svg");

var balloons = [];
function bInit() {
	for (var i = 0; i < n; i++) {
		balloons[i] = new Point();
		balloons[i].s.x = random(xMin + 30, xMax - 30);
		balloons[i].s.y = yMax + 30;
		balloons[i].v.y = -0.01 * random(5, 15);
		createBalloon(balloons[i]);
	}
	requestAnimFrame(update);
}

var currentTime;
var lastTime = + new Date();
var deltaTime;
function update() {
	currentTime = + new Date();
	deltaTime = currentTime - lastTime;

	balloons.forEach(function(b) {
		b.s = b.s.add(b.v.multipy(deltaTime));
		if (b.s.y < yMin - 100) {
			b.s.x = random(xMin + 30, xMax - 30);
			b.s.y = yMax + 30;
		}
		b.g.setAttribute("transform", "translate(" + b.s.x + "," + b.s.y + ")");
	})

	lastTime = currentTime;
	requestAnimFrame(update);
}

function createBalloon(b) {
	var g = document.createElementNS(SVG_NS, "g");
	var color = "hsl(" + random(0, 360) + ",100%,80%)";

	var l = document.createElementNS(SVG_NS, "line");
	l.setAttribute("x1", "0");
	l.setAttribute("y1", "0");
	l.setAttribute("x2", "0");
	l.setAttribute("y2", "100");
	l.setAttribute("stroke", "rgba(0,0,0,.2)");
	g.appendChild(l);

	var p = document.createElementNS(SVG_NS, "polygon");
	p.setAttribute("points", "0 24 -2 34 2 34");
	p.setAttribute("fill", color);
	g.appendChild(p);

	var c = document.createElementNS(SVG_NS, "circle");
	c.setAttribute("cx", "0");
	c.setAttribute("cy", "0");
	c.setAttribute("r", "30");
	c.setAttribute("fill", color);
	g.appendChild(c);

	var cs = document.createElementNS(SVG_NS, "circle");
	cs.setAttribute("cx", "-15");
	cs.setAttribute("cy", "-15");
	cs.setAttribute("r", "2");
	cs.setAttribute("fill", "rgba(255,255,255,.8)");
	g.appendChild(cs);

	var r = document.createElementNS(SVG_NS, "rect");
	r.setAttribute("x", "0");
	r.setAttribute("y", "-30");
	r.setAttribute("width", "30");
	r.setAttribute("height", "60");
	r.setAttribute("fill", "rgba(0,0,0,.1)");
	r.setAttribute("clip-path", "url(#shadow-clip)");
	g.appendChild(r);

	g.setAttribute("transform", "translate(" + b.s.x + "," + b.s.y + ")");
	b.g = g;
	balloonSVG.appendChild(g);
}

// click card
function Clicker() {
	this.list = document.querySelectorAll(".main-sec .box");
	this.index = 1;
	this.width = 980 / 3;

	this.init();
	this.bind();
}

Clicker.prototype.init = function() {
	var n = this.list.length;
	var that = this;
	var ratio = 0;
	var i = this.index;

	do {
		var scale = 1 - Math.abs(ratio) * 0.2;
		var translateX = ratio * 110;
		this.list[i].tag = i;
		this.list[i].style.webkitTransform = "scale(" + scale + ") translateX(" + translateX + "%)";
		this.list[i].style.transform = "scale(" + scale + ") translateX(" + translateX + "%)";
		this.list[i].style.zIndex = 10 -  Math.abs(ratio);

		ratio++;ratio = ratio <= n/2 ? ratio : ratio - n;
		i = (++i) % n;
	} while (i != this.index);
}

Clicker.prototype.bind = function() {
	var that = this;
	// console.log(this);
	var clickHandler = function() {
		that.index = this.tag;
		that.init();
	}

	for (var i = 0; i < this.list.length; i++) {
		this.list[i].addEventListener('click', clickHandler);
	}
}

var clicker = new Clicker();

// btn click event
(function() {
	var mask = document.querySelector('.pc-sec .screen .mask');
	var macScreen = document.querySelector('.pc-sec .screen');
	var clickHandler = function() {
		macScreen.classList.add('after');
		setTimeout(bInit, 2000);
	}
	mask.addEventListener('click', clickHandler);
})();
