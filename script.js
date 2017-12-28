var canvas = document.querySelector("canvas");
//size of the canvas 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var radius = 30;
var gravity = 0.98;
var friction = 0.9;
var number_of_circles = 100;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

addEventListener('click', function () {
    init();
});

function circle(x, y, r, dx, dy, rgb) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.rgb = rgb;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = rgb;
        c.fill();
        c.strokeStyle = 'grey';
        c.stroke();
    }


    this.update = function () {

        if (((this.y + this.dy) > (canvas.height - this.r))) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if ((((this.x + this.dx) > (canvas.width - this.r))) ||
            (((this.x + this.dx) < (this.r)))) {
            this.dx = (-this.dx);
        }
        this.x += (this.dx);
        this.y += this.dy;
        this.draw();
    }
}

var arr = [];

function init() {
    arr = [];
    for (var i = 0; i < number_of_circles; i++) {
        var r = randomIntRange(10, 40);
        var x = randomIntRange(r, canvas.width - r);
        var y = randomIntRange(r, canvas.height - r * 10);
        var dy = randomIntRange(1,5);
        var dx = randomIntRange(-5, 5);
        var rgb = getcolor();
        arr.push(new circle(x, y, r, dx, dy, rgb));
    }

    
}
//animate circle
function animate() {
    requestAnimationFrame(animate);
    //clearing previous drawn circle
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < arr.length; i++) {
        arr[i].update();
    }
}
animate();
init();

function getcolor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgb;
}

function randomIntRange(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}