'use strict';

angular
  .module('fw-card-list')
  .directive('fwCardListVideosUser', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        list: '=',
        thumbsByRow: '=',
        contest: '=',
        style: '='
      },
      templateUrl: 'modules/fw-directives/fw-card-list/fw-videos-user/views/fw-card-list-videos-user.view.html',
      controller: 'fwCardListVideosUserController as vm'
    };
  }]);
