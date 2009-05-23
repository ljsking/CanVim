var text=new Array();
text.push('This is text');
text.push('isn\' it?');
var currentLine = 1;
var debug = '';
var cusorOn = true;
var pos = 8;

var canvasID = '#canvas';
var style = {
    padding_x: 5,
    padding_y: 10,
	padding_line: 5,
	font_height: 10,
	font: 'Courier',
};

$(document).ready(function () {
	loop();
});

function loop(){
	draw()
	window.setTimeout(loop,700);
}

function draw() {
	var ctx = $(canvasID)[0].getContext("2d");
	ctx.clearRect(0, 0, 300, 300);
	var x = style.padding_x;
	var y = style.padding_y;
	ctx.font = style.font_height+"pt "+style.font;
	for(var index in text){
		ctx.fillText(text[index], x, y);
		y+=style.font_height+style.padding_line
	}
	if (cusorOn)
		drawCursor(ctx);
		
	cusorOn = !cusorOn;
	ctx.fillText(debug, x, y);
}

function drawCursor(ctx){
	var slicedText = text[currentLine].slice(0,pos);
	var dim = ctx.measureText(slicedText);
	var x = style.padding_x+dim.width;
	var y = style.padding_y+(currentLine+1)*(style.font_height+style.padding_line)
	ctx.fillRect(x,y-24,style.font_height*0.7,style.font_height);
}

var KEY = {
    RIGHT: 39,
    UP: 38,
    LEFT: 37,
    DOWN: 40,
	ALT: 91,
	ESC: 27,
	ENTER: 13,
	TAB: 9,
};

$(document).keydown(function(event){
	console.log('test')
	var code = event.keyCode;
	var keychar = String.fromCharCode(code);
	switch(code){
		case KEY.LEFT:
			if(0 < pos)
				pos--;
			debug = 'keyCode: LEFT';
			break;
		case KEY.RIGHT:
			if(text[currentLine].length > pos)
				pos++;
			debug = 'keyCode: RIGHT';
			break;
		case KEY.UP:
			if(0 < currentLine)
				currentLine--;
			debug = 'keyCode: UP';
			break;
		case KEY.DOWN:
			console.log('text size:%d', text.length)
			if(text.length-1 > currentLine)
				currentLine++;
			debug = 'keyCode: DOWN';
			break;
		case KEY.ENTER:
			text.push('');
			currentLine++;
			pos = 0;
			debug = 'keyCode: Enter';
			break;
		case KEY.TAB:
			text[currentLine]+='\t';
			pos++;
			debug = 'keyCode: TAB';
			event.preventDefault();
			break;
		case KEY.ALT:
			debug = 'keyCode: Alt';
			break;
		default:
			if (event.shiftKey){
				keychar = keychar.toUpperCase();
			}else{
				keychar = keychar.toLowerCase();
			}
			text[currentLine]+=keychar;
			pos++;
			debug = 'keyCode: '+code;
			break;
	}
    draw();
});