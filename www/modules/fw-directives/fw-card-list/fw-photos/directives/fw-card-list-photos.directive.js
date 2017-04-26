'use strict';

angular
  .module('fw-card-list')
  .directive('fwCardListPhotos', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        list: '='
      },
      templateUrl: 'modules/fw-directives/fw-card-list/fw-photos/views/fw-card-list-photos.view.html',
      controller: 'fwCardListPhotosController as vm'
    };
  }]);
