'use strict';

angular
  .module('fw-card-list')
  .directive('fwCardListPhotosUser', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        list: '=',
        contest: '=',
        zoom: '='
      },
      templateUrl: 'modules/fw-directives/fw-card-list/fw-photos-user/views/fw-card-list-photos-user.view.html',
      controller: 'fwCardListPhotosUserController as vm'
    };
  }]);
