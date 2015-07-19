Template.fbLogin.events({
    'click #facebookLogin': function(event) {
    	event.preventDefault();
        Meteor.loginWithFacebook({}, function(err){
        	//update user image
        	Meteor.users.update(Meteor.userId(), {$set: {"profile.img": "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large"}});
            var firstname = Meteor.user().services.facebook.first_name;

            // welcome the user.
            var messages = [
                {intro: "Waddup, ", outro: '.'},
                {intro: "Hi ", outro: '!'},
                {intro: "Hello, ", outro: '.'},
                {intro: "Welcome, ", outro: '.'},

            ];

            var messageIndex = Math.floor(Math.random() * messages.length);
            var message = messages[messageIndex]['intro'] + firstname + messages[messageIndex]['outro'];
            $.snackbar({content: message});


            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }

        });
    }
});
