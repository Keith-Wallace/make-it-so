angular.module('makeitso.widgets', [])

.controller('widgetsController', function($scope, $location, $anchorScroll, topBountiesFactory) {

  $scope.data = {};

  // TOP BOUNTIES: REQUEST DATA AND APPEND TOP PAGE =====================================
  topBountiesFactory.topBounties()
  .success(function (topBountiesObject) {
    $scope.data.topBounties = topBountiesObject[0];
  })
  .catch(function (error) {
    console.error(error);
  });

  // HANDLE ANCHOR SCROLL FOR TOP BOUNTIES ==============================================
  $scope.goToBounty = function(bountyID) {
    $location.hash(bountyID);
    $anchorScroll();
  };

});