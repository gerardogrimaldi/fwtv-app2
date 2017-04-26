'use strict';

angular
  .module('fw-card-list')
  .controller('fwCardListPhotosUserController', ['$scope', '$rootScope', '$stateParams',
    function($scope, $rootScope, $stateParams) {
      var vm = $scope;
      vm.DEFAULT_THUMB = $rootScope.DEFAULT_THUMB;
      vm.showSlug = $stateParams.programSlug;
    }
  ]);
