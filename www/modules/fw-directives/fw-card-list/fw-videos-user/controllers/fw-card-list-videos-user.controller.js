'use strict';

angular
  .module('fw-card-list')
  .controller('fwCardListVideosUserController', ['$scope', '$rootScope', '$attrs', '$filter', '$stateParams', '$ionicViewSwitcher', '$state',
    function($scope, $rootScope, $attrs, $filter, $stateParams, $ionicViewSwitcher, $state) {
      var thumbsByRow = parseInt($attrs.thumbsByRow, 10) || 1;
      thumbsByRow = $rootScope.IS_MOBILE && thumbsByRow > 1 ? 2 : thumbsByRow;
      $scope.DEFAULT_THUMB = $rootScope.DEFAULT_THUMB;
      $scope.IS_IOS = $rootScope.IS_IOS;

      function getThumb(item) {
        return $filter('thumb')(item.image, 0, 0, thumbsByRow, item.extraThumbParameters);
      }

      function setProperties() {
        var items = $scope.list,
          item = null,
          i = 0,
          l = items && items.length ? items.length : 0,
          x = 0,
          le = 0;

        for (i; i < l; i++) {
          x = 0;
          le = items[i].length;
          for (x; x < le; x++) {
            item = items[i][x];
            item.imagePreview = getThumb(item);
            item.program = item.program || {};
            item.program.slug = item.program.slug || $stateParams.programSlug;
          }
        }
      }

      setProperties();

      $scope.onClickVideo = function(item) {
        $ionicViewSwitcher.nextDirection('forward');

        $state.go('show-videoteca-player', {
          programSlug: item.program.slug,
          recordingSlug: item.slug,
          recordingId: item._id
        });
      };
    }
  ]);
