angular.module('makeitso.home', [])

	.controller('homeController', function($scope, $http) {
		//scope.data MUST be an array for the $index functionality to work in the home.html form.
		$scope.data = [];

		//getBounties is the main get request for all bounty data. 
		//It is used in conjunction with the contribute and claim functions below.
		$scope.getBounties = function(){
			console.log("getBounties() called!!!!")
			$http({
     			'method': 'GET',
     			'url': '/projects',
     			'Content-Type': 'application/json'
   			})
			.success(function(response){
				$scope.data = response;
				console.log("Success loading bounties!!!! scope.data: ", $scope.data);
			}).error(function(error){
				console.log(error);
			})		
		}	

		$scope.values = {};
		$scope.contribute = function(username, amount, id){			
			$scope.values.username = username;
			$scope.values.amount = amount;
			$scope.values.project_id = id;
 			var stringifiedValues = JSON.stringify($scope.values);
			$http({
				'method': 'POST',
     		'url': '/pledges',
     		'Content-Type': 'application/json',
     		'data': stringifiedValues
   		})
			.then(function(){
				console.log('post to pledges went through, all vals:', stringifiedValues);
				//scope.getBounties below refreshes all info on the page 
				//to account for the pledge added to the given project
				$scope.getBounties();
			})
			.catch(function(error){
				console.log('error submitting post to pledges', error)
			});
		}

		//DELETE functionality below uses params instead of data. 
		//It needs to + projectId in the url to delete the selected project.
		$scope.remove = {};
		$scope.claim = function(projectId){
			$scope.remove.projectId = projectId;
			var stringifiedRemove = JSON.stringify($scope.remove);
			console.log('this is stringifiedRemove:', stringifiedRemove);
			$http({
				method: 'DELETE',
				url: "/project/" + projectId,
				headers: {'Content-Type': 'application/json,charset=utf-8'},
				params: stringifiedRemove
			})
			.then(function(response){
				console.log('project is deleted!',response);
				//call to getBounties below refreshes the info on 
				//the page to remove the deleted project from the list.
				
				$scope.getBounties();
			})
			.catch(function(error){
				console.log('there was an error deleting your project!',error);
			})
		}

		$scope.stripe = function(projectId){
			console.log('stripe called!')		
			var amount = $('.amountInput').val();
			var username = $('.userInput').val();			

			var handler = StripeCheckout.configure({
			  key: 'pk_test_SWgrpVGHysx0jQNi5vRoheHv',
			  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
			  locale: 'auto',
			  bitcoin: true,
			  token: function(token) {
			  	$scope.contribute(username,amount,projectId);
			    // You can access the token ID with `token.id`.
			    // Get the token ID to your server-side code for use.
			  }
			});

			  // Open Checkout with further options:
			  handler.open({
			    name: 'Shady Crows',
			    description: 'Bounty',
			    amount: amount * 100
			  });
			  // e.preventDefault();
			

			// Close Checkout on page navigation:
			window.addEventListener('popstate', function() {
			  handler.close();
			});
		}

});
