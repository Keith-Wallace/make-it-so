'use strict';

// WIDGETS TESTING ============================================================
describe('Widgets Controller', function() {
  var $controller
  var widgetsController;
  var $scope;
  var $location;
  var $anchorScroll;

  var topBountiesFactory;
  var $httpBackend;

  // LOAD AND ADD MODULES
  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('makeitso.widgets'));
  beforeEach(angular.mock.module('makeitso.services'));

  // INJECT CONTROLLER
  beforeEach(inject(function(_$controller_, $rootScope, _$location_, _$anchorScroll_, _topBountiesFactory_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    $location = _$location_;
    $anchorScroll = _$anchorScroll_;
    topBountiesFactory = _topBountiesFactory_;

    widgetsController = $controller('widgetsController', {
      $scope: $scope,
      $location: $location,
      $anchorScroll: $anchorScroll,
      topBountiesFactory: topBountiesFactory
    });
  }));

  // VERIFY THE CONTROLLER EXISTS
  it('should be defined', function() {
    expect(widgetsController).toBeDefined();
  });

  // WIDGETS FACTORY ==========================================================
  describe('Widgets Factory', function() {
    // INJECT FACTORY
    beforeEach(inject(function(_topBountiesFactory_, _$httpBackend_) {
      topBountiesFactory = _topBountiesFactory_;
      $httpBackend = _$httpBackend_;
    }));

    // VERIFY THE FACTORY EXISTS
    it('should be defined', function() {
      expect(topBountiesFactory).toBeDefined();
    });

    // TEST GET REQUEST
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    it('should return data from mySQL GET request', function() {
      var fakeTopBounties = [{}, {}, {}, {}, {}];
      $httpBackend.whenGET('/top-bounties').respond([fakeTopBounties]);

      $httpBackend.flush();
      expect($scope.data.topBounties).toEqual(fakeTopBounties);

    });
  });

});

describe('audio button', function() {
  var obj = document.createElement("audio");
  obj.src = "http://www.wavlist.com/soundfx/010/crow-1.wav";
  obj.volume = 0.10;
  obj.autoPlay = false;
  obj.preLoad = true; 

  it('should be defined', function() {
    expect(obj).toBeDefined();
  });

  describe('play', function() {
    injectt('should have a method called play', function() {
      expect(obj.play).to.be.ok;
    });
  });
});
