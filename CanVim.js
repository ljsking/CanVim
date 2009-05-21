var text=new Array();
text.push('This is text');
text.push('isn\' it?');
var currentLine = 1;
var debug = ''

function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 300, 300);
		//text.length
		var x = 5;
		var y = 10;
		for(var index in text){
			ctx.fillText(text[index], x, y);
			y+=15
		}
		ctx.fillText(debug, x, y);
    }
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
			text[currentLine]+=keychar;
			debug = 'keyCode: '+code;
			break;
	}
    draw();
}