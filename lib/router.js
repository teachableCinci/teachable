Router.map(function(){
    this.route('home', {path: '/'});
    this.route('handwriting');
    this.route('lesson1');

});

Router.configure({
	layoutTemplate: 'layout'
});