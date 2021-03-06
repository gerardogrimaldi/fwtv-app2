angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('modules/core/views/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('CoreCtrl', function($scope, $stateParams, Home, ListGeneratorsSrv) {
  var vm = this,
    home = Home.data;
  vm.home = Home.data;

  function setFeaturedVideoList() {
    vm.featuredVideosList = getList(home.featuredVideos, 6);
  }

  function getList(items, limit) {
    return ListGeneratorsSrv.set(items, limit, true);
  }

  setFeaturedVideoList();
})

.controller('HomeCtrl', function($scope, $rootScope, $stateParams, Home, ListGeneratorsSrv) {
  var vm = this,
    home = Home.data;
  vm.home = Home.data;

  function setFeaturedVideoList() {
    vm.featuredVideosList = getList(home.featuredVideos, 6);
  }
  setFeaturedVideoList();

  function getList(items, limit) {
    return ListGeneratorsSrv.set(items, limit, true);
  }
});
