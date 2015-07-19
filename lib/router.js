Router.map(function(){
    this.route('home', {path: '/'});
    this.route('handwriting');
    this.route('speech');
    this.route('speech2');
});

Router.configure({
	layoutTemplate: 'layout'
});