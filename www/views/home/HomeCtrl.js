(function () {
	"use strict";
	/**
	 * @name HomeController
	*/
    app.controller('HomeCtrl', ['$rootScope', '$scope', 'HomeFactory', '$ionicSideMenuDelegate', '$stateParams', '$ionicModal',
		function($rootScope, $scope, HomeFactory, $ionicSideMenuDelegate, $stateParams, $ionicModal) {
        //
        var vm = this;
        //
		$scope.$on('$ionicView.enter', function(e) {
				console.log('ROOTSCOPE DATA', $rootScope.data, e)
				vm.dadosCliente = $rootScope.data;
				console.log('DADOS VELOX', $rootScope.clienteVelox);
				vm.banda = $rootScope.clienteVelox.Banda;
				console.log('DADOS DO MODEM', $rootScope.modemData);
				vm.modem = $rootScope.modemData;
	  });
		vm.dataEstilo = [];



		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			ionic.Platform.ready(function () {
	    //$ionicSideMenuDelegate.toggleLeft();
	  });
			getAll();
		}
		//
		function getAll() {
			HomeFactory.getAll().then(function (data) {
				vm.dataEstilo = data.rows;
			});
		}
		//
		function refresh () {
			getAll();
		}
		/**
		 * Public methods - exposed by vm, the controller alias
		*/
		//
    vm.save = function(estilo) {
			HomeFactory.savedData = estilo;
			HomeFactory.create(estilo);
			/* TODO -> Think another way to update vm.dataEstilo */
			refresh();
    };
		//
		vm.get = function (id) {
			HomeFactory.id = id;
			HomeFactory.get();
		};
		//
		vm.delete = function (id) {
			HomeFactory.id = id;
			HomeFactory.delete();
		};
		//call onload function to start controller rotine
		onLoad();
    }]);
})();
