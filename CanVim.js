var text=new Array();
text.push('This is text');
text.push('isn\' it?');
var currentLine = 1;
var debug = ''
var cusorOn = true;
function init() {
	window.setTimeout(timeout,700);
	draw();
}

function timeout(){
	draw()
	window.setTimeout(timeout,700);
}

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 300, 300);
		//text.length
		var x = 5;
		var y = 10;
		ctx.font = "10pt Courier";
		for(var index in text){
			ctx.fillText(text[index], x, y);
			y+=15
		}
		var dim = ctx.measureText(text[currentLine]);
		if (cusorOn)
			drawCursor(ctx, dim.width+5, y);
		cusorOn = !cusorOn;
		ctx.fillText(debug, x, y);
    }
}

function drawCursor(ctx, x, y){
	ctx.fillRect(x,y-24,6,10);
}

var KEY = {
    RIGHT: 39,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
	ALT: 91,
	ESC: 27,
	ENTER: 13
};

function press(evt) {
    var code = evt.keyCode;
	var keychar = String.fromCharCode(code);
	switch(code){
		case KEY.ENTER:
			text.push('');
			currentLine++;
			debug = 'keyCode: Enter';
			break;
		case KEY.ALT:
			debug = 'keyCode: Alt';
			break;
		default:
			if (evt.shiftKey){
				keychar = keychar.toUpperCase();
			}else{
				keychar = keychar.toLowerCase();
			}
			text[currentLine]+=keychar;
			debug = 'keyCode: '+code;
			break;
	}
    draw();
}