'use strict';

angular
  .module('app.services', [])
  .factory('HomeSrv', ['$http', 'PATHS', '$q', '$rootScope',
    function($http, PATHS, $q, $rootScope) {
      function getTranslations() {
        if ($rootScope.LOCALE && $rootScope.LOCALE.indexOf('es') === -1) {
          return ',translations(' + $rootScope.LOCALE + '(description))';
        }

        return '';
      }

      var fields = '';
      fields = '?fields=';
      fields += $rootScope.IS_TABLET ? 'landing,' : '';
      fields += 'liveNow(_id,url,liveId,liveFrameUrl,liveStreamUrl,image,title,program(_id,slug,title,slogan' + getTranslations() + '))';
      fields += ',newNow(_id,logo,slug,title,description,slogan' + getTranslations() + ')';
      fields += ',popularShows(_id,logo,slug,title,description,slogan' + getTranslations() + ')';
      fields += ',popularVideos(_id,link,slug,title,image,date,duration,program(_id,slug,title))';
      fields += ',recentVideos(_id,link,slug,title,image,date,duration,program(_id,slug,title))';
      fields += ',featuredVideos(_id,link,slug,title,image,program(_id,slug,title),video(_id,link,slug,title,date,enabledForProducts,duration))';
      fields += ',highlightedShowsByFavorites(_id,link,slug,title,image,date,duration,videos(_id,link,slug,title,date,duration,program(_id,slug,title)))';
      fields += ',highlightedShows(_id,link,slug,title,image,logo,date,duration,videos(_id,link,slug,title,date,duration,program(_id,slug,title,image,logo)))';

      return {
        get: function(signature) {
          return $http.get(PATHS.HOME + fields, {
            headers: signature
          });
        }
      };
    }
  ])
  .service('ListGeneratorsSrv', ['$rootScope',
    function($rootScope) {
      var isForce = false;

      function Split(arr, n) {
        var res = [];
        while (arr ? arr.length : 0) {
          res.push(arr.splice(0, n));
        }
        return res;
      }

      function calculateRowCardAmount(amount) {
        var $rs = $rootScope;
        $rs.IS_PORTRAIT = true;
        amount = amount || 6;

        if (!isForce) {
          if ($rs.IS_MOBILE) {
            amount = $rs.IS_PORTRAIT ? 2 : 3;
          } else if ($rs.IS_TABLET) {
            amount = $rs.IS_PORTRAIT ? 3 : 4;
          }
        }

        return amount;
      }

      function calculateFlexSize(items, amount) {
        amount = amount || calculateRowCardAmount(amount);
        var lastCollection = items[items.length - 1],
          item = null,
          i = 0,
          l = lastCollection ? amount - lastCollection.length : 0;

        if (items[1] && items[0].length !== lastCollection.length || (!items[1] && items[0] && items[0].length - 1 < amount)) {

          item = lastCollection[0];
          if (item) {
            if (item.link) {
              item = {
                extraThumbParameters: item.extraThumbParameters,
                link: item.link
              };
            } else if (item.logo) {
              item = {
                logo: item.logo
              };
            } else if (item.thumb) {
              item = {
                thumb: item.thumb
              };
            }

            for (i; i < l; i++) {
              lastCollection.push(angular.extend({
                _id: i,
                hiddenCard: 'hidden-card'
              }, item));
            }
          }
        }

        return items;
      }

      return {
        set: function(items, amount, force) {
          isForce = force;
          return calculateFlexSize(new Split([].concat(items), calculateRowCardAmount(amount)), amount);
        },
        getItemsPerRow: function() {
          return calculateRowCardAmount();
        }
      };
    }
  ]);
;
