'use strict';

angular
  .module('fw-card-list')
  .controller('fwCardListShowsController', ['$scope', '$rootScope', '$attrs', '$filter',
    function($scope, $rootScope, $attrs, $filter) {
      var thumbsByRow = parseInt($attrs.thumbsByRow, 10) || 1;
      thumbsByRow = $rootScope.IS_MOBILE && thumbsByRow > 1 ? 2 : thumbsByRow;
      $scope.DEFAULT_THUMB = $rootScope.DEFAULT_THUMB;

      function getThumb(item) {
        return $filter('thumb')(item.image || item.logo, 0, 0, thumbsByRow);
      }

      function setThumbs() {
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
          }
        }
      }

      setThumbs();
    }
  ]);
