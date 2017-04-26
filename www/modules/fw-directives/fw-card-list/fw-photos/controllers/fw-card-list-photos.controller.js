'use strict';

angular
  .module('fw-card-list')
  .controller('fwCardListPhotosController', ['$scope', '$rootScope',
    function($scope, $rootScope) {
      var vm = this;
      vm.DEFAULT_THUMB = $rootScope.DEFAULT_THUMB;
    }
  ]);
