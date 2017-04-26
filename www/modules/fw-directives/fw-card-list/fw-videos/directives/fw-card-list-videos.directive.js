'use strict';

angular
  .module('fw-card-list', [])
  .directive('fwCardListVideos', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        list: '=',
        style: '='
      },
      templateUrl: 'modules/fw-directives/fw-card-list/fw-videos/views/fw-card-list-videos.view.html',
      controller: 'fwCardListVideosController as vm'
    };
  }]);
