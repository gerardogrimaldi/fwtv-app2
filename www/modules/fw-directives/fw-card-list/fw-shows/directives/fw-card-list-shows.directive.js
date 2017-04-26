'use strict';

angular
  .module('fw-card-list')
  .directive('fwCardListShows', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        list: '=',
        thumbsByRow: '='
      },
      templateUrl: 'modules/fw-directives/fw-card-list/fw-shows/views/fw-card-list-shows.view.html',
      controller: 'fwCardListShowsController as vm'
    };
  }]);
