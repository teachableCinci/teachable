Session.set('questionNum', '0');
var questions = [
	{
		question: "Write out \"man\" in Spanish",
		answer: "hombre",
		type: "handwriting"
	},
	{
		question: "Write out \"the car loves the man\" in Spanish",
		answer: "hombre",
		type: "handwriting"
	}
];

Template.quickQuiz1.helpers({
	question: function() {
		//return "hello";

		return questions[Session.get('questionNum')];
	}


});

Template.quickQuiz1.events({
	'click #checkAnswer': function(){

		var correct = $('#userAnswer').val() == questions[Session.get('questionNum')].answer;

		console.log('useranswer', $('#userAnswer').val(), correct, questions[Session.get('questionNum')].answer);

		//--STORE INTERACTION

		addPoints(10); // simple 10 for now.
		pointsAnimation(10);

		Session.set('questionNum', +Session.get('questionNum') + 1);

		if (correct){}

	}
});


//interaction function 
//// for reading
//// for types of quizzing
	//think more about schema

function addPoints(num){

	Meteor.users.update(Meteor.userId(), {$inc: {"profile.points.number": num}});
            
	//server call to add points to user's overall score,. tage each point instance with stuff like the question, answer, words/facts learned

	//Points collection should have a document for each user containing overall points and then a bunch of other documents.
}

function pointsAnimation(num){


    	$('.points').stop().fadeTo('slow',1,function(){
    		$(this).delay(2000).fadeOut('slow');
    	});

	// +num points will flash up on screen then fade away.
}