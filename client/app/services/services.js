// APPLICATION FACTORY SERVICES
angular.module('makeitso.services', [])

// WIDGET: TOP BOUNTIES =============================================================
.factory('topBountiesFactory', function($http) {
  var topBounties = function() {
    // REQUEST 
    return $http({
      'method': 'GET',
      'url': '/top-bounties',
      'Content-Type': 'application/json'
    })
    // HANDLE SUCCESSFUL RESPONSE DATA
    .success(function(response) {
      return response;
    })
    // HANDLE ANY ERRORS
    .error(function(error){
      console.log(error);
    });
  };
  
  return {
    topBounties: topBounties
  };
});