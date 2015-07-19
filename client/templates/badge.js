Template.badge.onRendered(function(){

	$(document).click(function (event) {    		
    	$('.points').stop().fadeTo('slow',1,function(){
    		$(this).delay(2000).fadeOut('slow');
    	});
	});

})