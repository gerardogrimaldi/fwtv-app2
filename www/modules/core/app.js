// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'fw-card-list', 'app.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'modules/core/views/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'modules/core/views/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'modules/core/views/browse.html'
        }
      }
    })

  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'modules/core/views/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'modules/core/views/playlists.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.core', {
    url: '/core',
    views: {
      'menuContent': {
        templateUrl: 'modules/core/views/core.html',
        controller: 'CoreCtrl'
      }
    }
  })
  .state('app.home',{
    url:'/home',
    views: {
      'menuContent': {
        templateUrl: 'modules/core/views/home.view.html',
        controller: 'HomeCtrl as vm',
       /* resolve: {
          Home: ['HomeSrv',
            function(HomeSrv) {
              return HomeSrv.get();
            }
          ]
        }*/
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
