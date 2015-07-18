var env = 'test1';
//var env = 'prod';

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});


ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '869128049836422',
    secret: '5d5726a37c429af7a7c1435c96d96e90'
});






