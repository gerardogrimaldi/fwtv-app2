/* eslint angular/window-service: 0 */
/* eslint angular/document-service: 0 */

'use strict';

angular
  .module('core')
  .config(['$httpProvider',
    function($httpProvider) {
      var locale = window.localStorage.getItem('FWTV-locale');

      if (locale) {
        switch (locale) {
          case 'en':
            locale = 'en-us';
            break;
          case 'es':
            locale = 'es-ar';
            break;
          default:
            locale = locale + '-' + locale.toUpperCase();
            break;
        }
      } else {
        locale = 'es-ar';
      }

      $httpProvider.defaults.headers.common['Accept-Language'] = locale;
      //$httpProvider.defaults.cache = true;
      $httpProvider.defaults.offline = !window.FWTV_DEV;
      $httpProvider.useApplyAsync(true);
    }
  ])
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }])
  .config(['lazyImgConfigProvider',
    function(lazyImgConfigProvider) {
      lazyImgConfigProvider.setOptions({
        offset: 1
      });
    }
  ])
  .config(['$ionicConfigProvider',
    function($ionicConfigProvider) {
      var transition = 'none';
      if (ionic.Platform.isIOS()) {
        transition = 'ios';
      } else if (ionic.Platform.isAndroid() && ionic.Platform.version() >= 5) {
        transition = 'android';
      }
      $ionicConfigProvider.views.transition(transition);
      $ionicConfigProvider.scrolling.jsScrolling(transition === 'ios');
      $ionicConfigProvider.views.maxCache(ionic.Platform.isAndroid() ? 4 : 8);
    }
  ])
  .config(['$logProvider',
    function($logProvider) {
      $logProvider.debugEnabled(window.FWTV_QA);
    }
  ])
  .config(['$compileProvider',
    function($compileProvider) {
      $compileProvider.debugInfoEnabled(window.FWTV_QA);
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|content|vnd.youtube):/);
    }
  ])
  .config(['$translateProvider',
    function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: !window.FWTV_DEV ? 'dist/i18n/' : 'modules/core/i18n/',
        suffix: '.json'
      });

      var locale = window.localStorage.getItem('FWTV-locale');

      if (locale) {
        switch (locale) {
          case 'en':
            locale = 'en-us';
            break;
          case 'es':
            locale = 'es-ar';
            break;
          default:
            locale = locale + '-' + locale.toLowerCase();
            break;
        }
      } else {
        locale = 'es-ar';
      }

      $translateProvider.preferredLanguage(locale);
      //$translateProvider.useLocalStorage();
    }
  ])
  .config(['offlineProvider',
    function(offlineProvider) {
      offlineProvider.debug(window.FWTV_DEV);
    }
  ]);
