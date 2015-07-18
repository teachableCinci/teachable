Template.fbLogin.events({
    'click #facebookLogin': function(event) {
    	event.preventDefault();
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }

        });
    }
});
