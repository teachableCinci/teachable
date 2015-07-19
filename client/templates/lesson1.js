Session.set('teach', true);
Session.set('test', false);

Session.set('cardNum', 0);
Session.set('questionNum', '0');

var teachingCards = [
	{
		type: 'noun',
		content: {
			image: 'img/man.jpg',
			speak: 'el hombre',
			title: 'el hombre',
			text: 'The word for "man" in Spanish is "hombre". To say "the man", say "el hombre".',
			english: 'man',
			spanish: 'hombre',
		},
		facts: [
			{
				category: 'nouns',
				name:'hombre',
				english: 'man',
				spanish: 'hombre'
			}
		],
		skills: [
			{
				category: 'sentenceForming',
				name: 'articles-masculine',
				english: 'man',
				spanish: 'hombre'
			}

		]
	},
	{
		type: 'noun',
		content: {
			image: 'img/car.jpg',
			speak: 'el auto',
			title: 'el auto',
			english: 'car',
			spanish: 'auto',
		},
		facts: [
			{
				category: 'nouns',
				name:'auto',
				english: 'car',
				spanish: 'auto'
			}
		]
	},
	{
		type: 'verb',
		content: {
			image: 'img/heart.jpg',
			speak: 'ama',
			title: 'ama',
			english: '(he/she/it/[a noun] loves',
			text: '"[a noun] loves" is "ama", where [a noun] would be for example "hombre". So to say "the man loves the car", you would say "el hombre ama el auto"',
			spanish: 'ama'
		},
		facts: [
			{
				introductory: true,
				category: 'verbs',
				name:'ama',
				english: 'loves',
				spanish: 'ama'
			}
		],
		skills: [
			{
				category: 'first-conjugation-present',
				name: '3rd-singular'
			},
			{
				category: 'sentenceForming',
				name: 'simple-sentence'
			},
			{
				category: 'sentenceForming',
				name: 'directObject'
			}

		]
	}

];



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

Template.lesson1.helpers({
	teach: function() {
		return Session.get('teach');
	},
	test: function(){
		return Session.get('test');
	}
});

Template.test1.helpers({
	question: function() {
		//return "hello";

		return questions[Session.get('questionNum')];
	}


});

Template.test1.events({
	'click #checkAnswer': function(){

		var correct = $('#userAnswer').val() == questions[Session.get('questionNum')].answer;

		console.log('useranswer', $('#userAnswer').val(), correct, questions[Session.get('questionNum')].answer);

		//--STORE INTERACTION

		if (correct){

			addPoints(10); // simple 10 for now.
			pointsAnimation(10);

			Session.set('questionNum', +Session.get('questionNum') + 1);

			
		}


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