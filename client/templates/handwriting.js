Template.handwriting.events({
	'click #clear': function(){
		alert('yolo');
		erase();
	},
	'click #checkHWR': function(){
		console.log('check called');
		recognize(strokes);
	}
});


Template.handwriting.onRendered(function(){

	init();

});



/* Stroke Storage */

var strokes = [];
var currentStroke = {};
var newPointExists = false;


/* Drawing */

	var canvas, ctx, flag = false,
	    prevX = 0,
	    currX = 0,
	    prevY = 0,
	    currY = 0,
	    dot_flag = false;

	var x = "black",
	    y = 2;

	function init() {
	    canvas = document.getElementById('can');
	    ctx = canvas.getContext("2d");
	    w = canvas.width;
	    h = canvas.height;

	    canvas.addEventListener("mousemove", function (e) {
	        findxy('move', e)
	    }, false);
	    canvas.addEventListener("touchmove", function (e) {
	        findxy('move', e)
	    }, false);
	    canvas.addEventListener("mousedown", function (e) {
	        findxy('down', e)
	    }, false);
	    canvas.addEventListener("touchstart", function (e) {
	        findxy('down', e)
	    }, false);
	    canvas.addEventListener("mouseup", function (e) {
	        findxy('up', e)
	    }, false);
	    canvas.addEventListener("touchend", function (e) {
	        findxy('up', e)
	    }, false);
	    canvas.addEventListener("mouseout", function (e) {
	        findxy('out', e)
	    }, false);
	    canvas.addEventListener("touchleave", function (e) {
	        findxy('out', e)
	    }, false);
	}


	function draw() {
	    ctx.beginPath();
	    ctx.moveTo(prevX, prevY);
	    ctx.lineTo(currX, currY);
	    ctx.strokeStyle = x;
	    ctx.lineWidth = y;
	    ctx.stroke();
	    ctx.closePath();
	}

	function erase() {
		alert('yolo');
	    var m = confirm("Want to clear");
	    if (m) {
	        ctx.clearRect(0, 0, w, h);
	        document.getElementById("canvasimg").style.display = "none";
	    }
	}

	function save() {
	    document.getElementById("canvasimg").style.border = "2px solid";
	    var dataURL = canvas.toDataURL();
	    document.getElementById("canvasimg").src = dataURL;
	    document.getElementById("canvasimg").style.display = "inline";
	}

	function findxy(res, e) {
	    if (res == 'down') {
	    	newPointExists = true;
	        prevX = currX;
	        prevY = currY;
	        currX = e.clientX - canvas.offsetLeft;
	        currY = e.clientY - canvas.offsetTop;

	        flag = true;
	        dot_flag = true;
	        if (dot_flag) {
	            ctx.beginPath();
	            ctx.fillStyle = x;
	            ctx.fillRect(currX, currY, 2, 2);
	            ctx.closePath();
	            dot_flag = false;

	            currentStroke.type = 'stroke';
	            currentStroke.x = [];
	            currentStroke.x.push(currX);
	            currentStroke.y = [];
	            currentStroke.y.push(currY);
	            console.log('mouse down', currentStroke);
	        }
	        
	    }
	    if (res == 'up' || res == "out") {


        	if (res == 'out' && !isEmpty(strokes) && newPointExists){
        		newPointExists = false;
        		recognize(strokes);
        	}

	        if (flag){
	        	strokes.push(currentStroke);
	        	currentStroke = {};
	        	console.log(strokes);

	        	console.log('mouse up or out', flag);


	        }

	        flag = false;

	        	
	        
	    }
	    if (res == 'move') {
	        if (flag) {
	            prevX = currX;
	            prevY = currY;
	            currX = e.clientX - canvas.offsetLeft;
	            currY = e.clientY - canvas.offsetTop;
	            draw();

	            currentStroke.x.push(currX);
	            currentStroke.y.push(currY);

	            console.log('mouse move', currentStroke);

	        }
	        
	    }
	}



function recognize(strokes) {
	console.log('recognize called');
	var language = 'es_ES';
	var aStr = [];
	var apiKey = "269938d5-c1fe-43b0-8e80-fc0c370b497f";
	var url = "http://cloud.myscript.com/api/myscript/v2.0/hwr/doSimpleRecognition.json";
       
	var jsonPost =	{
		"switchToChildren": true,
		"hwrParameter":{
			"language": language,
			"hwrInputMode": "CURSIVE",
			"resultDetail": "WORD",
			"hwrProperties": {
				"textCandidateListSize": 3
			}
		}, 
		"inputUnits": [{"components": strokes}]
	};
	
	var data = {
		"apiKey" : apiKey,
		"hwrInput" : JSON.stringify(jsonPost)
	};
			 
  $.post(
		url, 
	  data, 
	  function(jsonResult) {
	  		console.log('server result', jsonResult);
			var text = jsonResult.result.wordCandidates[0].candidates[0].label;
			$('#userAnswer').val(text);
	  },
	  "json"
	).error(function(xhr){
		$("#resultError").css("color", "#fe4a5d");
 		$("#resultError").html("<p>" + jQuery.parseJSON(xhr.responseText).result.error + "</p>");
  });
}




//Helper Methods

	// Speed up calls to hasOwnProperty
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function isEmpty(obj) {

	    // null and undefined are "empty"
	    if (obj == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
	}