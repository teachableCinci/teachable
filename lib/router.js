Router.map(function(){
    this.route('home', {path: '/'});
    this.route('handwriting');
    this.route('speech');
    this.route('speech2');
    this.route('badge');
});

Router.configure({
	layoutTemplate: 'layout'
});