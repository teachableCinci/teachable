Router.map(function(){
    this.route('home', {path: '/'});
    this.route('handwriting');

});

Router.configure({
	layoutTemplate: 'layout'
});