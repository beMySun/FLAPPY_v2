(function() {
	function Vector(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	Vector.prototype = {
		constructor: Vector,
		square: function() {
			return this.x * this.x + this.y * this.y;
		},
		length: function() {
			return Math.sqrt(this.square());
		},
		add: function(q) {
			return new Vector(this.x + q.x, this.y + q.y);
		},
		minus: function(q) {
			return new Vector(this.x - q.x, this.y - q.y);
		},
		multipy: function(scale) {
			return new Vector(this.x * scale, this.y * scale);
		},
		normalize: function(length) {
			if (length == undefined) {
				length = 1;
			}
			return this.multipy(length / this.length());
		}
	};
	Vector.fromPoints = function(p1, p2) {
		return new Vector(p2.x - p1.x, p2.y - p1.y);
	};
	window.Vector = Vector;
})();

(function() {
	function Point() {
		this.s = new Vector();
		this.v = new Vector();
		this.a = new Vector();
	}
	window.Point = Point;
})();

function random(min, max) {
	return Math.round(min + (max - min) * Math.random());
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();