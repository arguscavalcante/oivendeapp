(function () {
	"use strict";
	/**
	 * @name Devices Controller
	*/
    app.controller('TicketsCtrl', ['$rootScope', '$scope', 'TicketsFactory', '$ionicModal', '$ionicSideMenuDelegate',
		function($rootScope, $scope, TicketsFactory, $ionicModal, $ionicSideMenuDelegate) {
        //
        var vm = this;
        //
		vm.tickets = [];
		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			//$ionicSideMenuDelegate.toggleLeft();
			getAll();
		}
		//
		function getAll() {
			TicketsFactory.getAll().then(function (data) {
				vm.tickets = data.rows;
				console.log(vm.tickets)
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
			TicketsFactory.savedData = estilo;
			TicketsFactory.create();
			/* TODO -> Think another way to update vm.products */
			refresh();
			vm.modal.hide();
        };
		//
		vm.get = function (id) {
			TicketsFactory.id = id;
			TicketsFactory.get();
		};
		//
		vm.delete = function (id) {
			TicketsFactory.id = id;
			TicketsFactory.delete();
			//
			refresh();
		};
		$ionicModal.fromTemplateUrl('components/tickets/addTickets.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    vm.modal = modal;
		  });

		//call onload function to start controller rotine
		onLoad();
    }]);
})();
