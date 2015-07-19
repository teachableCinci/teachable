Session.set('teach', true);
Session.set('test', false);
Session.set('done', false);

Session.set('cardNum', '0');
Session.set('questionNum', '0');

var teachingCards = [
	{
		type: 'tutorial',
		content: {
			title: 'Lesson 1 - Introduction',
			image: 'img/lesson1.jpg',
			text: 'This lesson will teach you a few basic spanish words and how to say a sentence. Afterwards you will be quizzed on what you learned',
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
			image: 'img/heart.png',
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
	},
	done: function(){
		return Session.get('done');
	}
});

Template.teach1.helpers({
	card: function() {
		return teachingCards[Session.get('cardNum')];
	}
});

Template.teach1.events({
	'click #cardContinue': function(){
		Session.set('cardNum', +Session.get('cardNum') + 1);
		addPoints(2);
		pointsAnimation(2);

		updateSection();
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
		updateSection();


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

		num = 10;
    	$('#badge'+num).stop().fadeTo('fast',1,function(){
    		$(this).delay(1000).fadeOut('slow');
    	});

	// +num points will flash up on screen then fade away.
}


function updateSection(){
	if(Session.get('cardNum') >= teachingCards.length){
		Session.set('teach', false);
		Session.set('test', true);
	}
	if (Session.get('questionNum') >= questions.length){
		Session.set('test', false);
		Session.set('done', true);
	}

	console.log(Session.get('teach'), Session.get('test'), Session.get('done'));
}