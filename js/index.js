// fcn-nav event
(function() {
	var fcnNav = document.querySelector('.fcn-nav');console.log(fcnNav);
	var fcnBtn = document.querySelector('.fcn-btn');
	var clickHandler = function() {
		fcnNav.classList.toggle('on');
	}
	fcnBtn.addEventListener('click', clickHandler);
})();

// scroll event
(function() {
	var fcnNav = document.querySelector('.fcn-nav');
	var scrollTop;
	var scrollHandler = function() {
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrollTop >= 80 && !fcnNav.classList.contains('visible')) {
			fcnNav.classList.add('visible');
		} else if (scrollTop < 80 && fcnNav.classList.contains('visible')) {
			fcnNav.classList.remove('visible');
		}
	}
	window.addEventListener('scroll', scrollHandler);														
})();

// 回到顶部
function add(){
	var a =document.querySelector(".heart");
	a.classList.add("on");
}
var goTop;
var space = 50;
var scrollTime = 100;

goTop = document.getElementById("rocket");
goTop.onclick=function(){smoothlyMove(0);}

function smoothlyMove(end) {
	var curTop = document.documentElement.scrollTop || document.body.scrollTop;
	var speed = (end - curTop) / scrollTime;
	end = end - space;
	var timer = setInterval(function() {
		if (speed > 0 ? curTop < end : curTop > end) {
			curTop += speed;
			window.scrollTo(0, curTop);
		} else {
			clearTimeout(timer);
			window.scrollTo(0, end);
		}
	}, 1);
}