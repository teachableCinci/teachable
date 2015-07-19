// output: text candidates
var recognize = function(strokes) {
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
			recoResult = jsonResult.result;
			console.log('server result', jsonResult);
			resultIdx = recoResult.textSegmentResult.selectedCandidateIdx;
			if ((resultIdx >= 0) && (recoResult.textSegmentResult.candidates.length > 0)) {
				for (var idx = 0; idx < 3; idx++) {
					var theClass = (idx == resultIdx) ? "selectedCandidate" : "candidate";
					aStr[idx] = "<p id='rslt_" + idx + "' onclick='selectCandidate(this.id);' class='" + theClass + "'>" + recoResult.textSegmentResult.candidates[idx].label + "</p>";
				}
				$("#result").html(aStr[0] + "<p class='separator'>|</p>" + aStr[1] + "<p class='separator'>|</p>" + aStr[2]);
				drawTextResult();
			}
	  },
	  "json"
	).error(function(xhr){
		$("#result").css("color", "#fe4a5d");
 		$("#result").html("<p>" + jQuery.parseJSON(xhr.responseText).result.error + "</p>");
  });
};
