Template.logout.events({
	'click #logout': function(){
		Meteor.logout(function(err){
          if (err) {
              throw new Meteor.Error("Logout failed");
          }
		});
		return false;
	}
});