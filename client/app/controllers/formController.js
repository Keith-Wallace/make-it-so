angular.module('makeitso.form', [])
// controller for bounty submission form page, aka form html
.controller('formController', function ($scope, $http, $window) {

 $scope.user = {};

// this is the function that accepts the user's inputs to the form on the 
// form.html page, then assigns them to the $scope.user object and then
// converts the object to JSON to be passed to the Express server & the database

 $scope.submit = function(data) {
  //each piece of form data is saved to the $scope.user object on the server
   $scope.user.username = data.username;
   $scope.user.email = data.email;
   $scope.user.projectName = data.projectName;
   $scope.user.timeConstraint = data.timeConstraint;
   $scope.user.wanted = data.wanted;
   $scope.user.description = data.description;
   $scope.user.pledge = data.pledge;
 
   console.log('*** user info in $scope - - >', $scope.user);
    // stringify the scope.user object to be sent to the server
   var stringifiedScope = JSON.stringify($scope.user);
   // http post request with stringifiedScope data
   $http({
     'method': 'POST',
     'url': '/project',
     'Content-Type': 'application/json',
     'data': stringifiedScope
   })
   .then(function() {
    //after the the information is successfully posted to the database,
    //reload the home page
    $window.location.href = '/';
     console.log('user information submitted successfully');
   })
   .catch(function() {
    // or console log that the information was not successfully sent and received
     console.log('user information not submitted');
   });
 };

});
