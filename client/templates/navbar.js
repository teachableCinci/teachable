Template.navbar.onRendered(function(){

	
  $(".button-collapse").sideNav();
 // $('.button-collapse').sideNav('show');

});

Template.navbar.helpers({
	points: function() {
		return Meteor.user().profile.points.number;
	},

    'img': function(){
        return Meteor.user().profile.img;
    }

});