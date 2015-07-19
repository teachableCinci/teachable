//var env = 'test1';
var env = 'prod';

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

if(env == 'test1'){


	ServiceConfiguration.configurations.insert({
	    service: 'facebook',
	    appId: '869128049836422',
	    secret: '5d5726a37c429af7a7c1435c96d96e90'
	});
}
else if (env == 'prod'){

	ServiceConfiguration.configurations.insert({
	    service: 'facebook',
	    appId: '1463260507320148',
	    secret: '90e50fb5e8e46e5dee6dc14f87351f36'
	});


}





