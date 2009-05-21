var text = 'Sample String';

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, 300, 300)
		ctx.fillText(text, 10, 50);  
    }
}

var KEY = {
    RIGHT: 39,
    UP: 38,
    LEFT: 37,
    DOWN: 40
};

function press(evt) {
    var code = evt.keyCode;
	var keychar = String.fromCharCode(code);
	text+=keychar;
    draw();
}