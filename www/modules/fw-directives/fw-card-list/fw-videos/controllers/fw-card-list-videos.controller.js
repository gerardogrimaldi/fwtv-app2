'use strict';

angular
  .module('fw-card-list')
  .controller('fwCardListVideosController', ['$scope', '$rootScope', '$attrs', '$filter', '$stateParams', '$state', '$ionicViewSwitcher',
    function($scope, $rootScope, $attrs, $filter, $stateParams, $state, $ionicViewSwitcher) {
      var vm = this,
        thumbsByRow = parseInt($attrs.thumbsByRow, 10) || 1;
      thumbsByRow = $rootScope.IS_MOBILE && thumbsByRow > 1 ? 2 : thumbsByRow;
      vm.DEFAULT_THUMB = $rootScope.DEFAULT_THUMB;
      $scope.IS_MOBILE = $rootScope.IS_MOBILE;
      vm.onlyVideoTitle = !!$attrs.onlyVideoTitle;
      vm.isEpisode = !!$attrs.isEpisode;
      vm.showTags = !!$attrs.showTags;

      if (vm.IS_MOBILE && $attrs.thumbsByRowSm) {
        thumbsByRow = parseInt($attrs.thumbsByRowSm, 10);
      }

      function getEpisodeThumb(episode) {
        var img = '';

        if (episode) {
          if (episode.promoPhoto) {
            img = episode.promoPhoto;
          } else if (episode.promoVideo) {
            img = episode.promoVideo;
          } else if (episode.videos && episode.videos[0]) {
            img = episode.videos[0].video.link;
          } else if (episode.link) {
            img = episode.link;
          }
        }

        return $filter('thumb')(img, 0, 0, thumbsByRow);
      }

      vm.getThumb = function(video) {
        video = video.video || video;

        if (vm.isEpisode) {
          return getEpisodeThumb(video);
        }

        return $filter('thumb')(video.link, 0, 0, thumbsByRow, video.extraThumbParameters);
      };

      function setProperties() {
        var items = vm.list,
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
            item.program = item.program || {};
            item.program.slug = item.program.slug || $stateParams.programSlug;
          }
        }
      }

      setProperties();

      vm.onClickVideo = function(item) {
        $ionicViewSwitcher.nextDirection('forward');

        $state.go('show-player', {
          programSlug: item.program ? item.program.slug : $stateParams.programSlug,
          videoSlug: vm.isEpisode ? item.videos[0].video.slug : item.video && item.video.slug ? item.video.slug : item.slug
        });
      };
    }
  ]);
