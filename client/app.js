angular.module('makeitso', [
	'makeitso.form', 
	'makeitso.home',
  'makeitso.widgets',
  'makeitso.services',
	'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
  	url: '/home',
  	views: {
  		'': {
	  		templateUrl: 'app/views/home.html',
				controller: 'homeController'
  		},
  		'widgets@home': {
  			url: '/home',
  			templateUrl: 'app/views/widgets.html',
				controller: 'homeController'
  		}
  	}
  })
  .state('form', {
  	url: '/form',
		templateUrl: 'app/views/form.html',
		controller: 'formController'
  });
});

