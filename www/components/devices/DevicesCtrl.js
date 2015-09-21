(function () {
	"use strict";
	/**
	 * @name Devices Controller
	*/
    app.controller('DevicesCtrl', ['$rootScope', '$scope', 'DevicesFactory', '$ionicModal',
		function($rootScope, $scope, DevicesFactory, $ionicModal) {
        //
        var vm = this;
        //
		vm.devices = [];
		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			getAll();
		}
		//
		function getAll() {
			DevicesFactory.getAll().then(function (data) {
				vm.devices = data.rows;
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
			DevicesFactory.savedData = estilo;
			DevicesFactory.create();
			/* TODO -> Think another way to update vm.dataEstilo */
			refresh();
			vm.modal.hide();
        };
		//
		vm.get = function (id) {
			DevicesFactory.id = id;
			DevicesFactory.get();
		};
		//
		vm.delete = function (id) {
			DevicesFactory.id = id;
			DevicesFactory.delete();
		};
		$ionicModal.fromTemplateUrl('components/devices/addDevices.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    vm.modal = modal;
		  });

		//call onload function to start controller rotine
		onLoad();
    }]);
})();
