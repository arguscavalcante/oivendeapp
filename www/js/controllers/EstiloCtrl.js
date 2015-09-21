(function () {
	/**
	 * Any function declared here is not public, so 'use strict' has no pratical effect. The idea to place this here is to confirm that everything in a clousure
	*/
	"use strict";
	/**
	 * @name HomeController
	 * @method
	 * 		showApp: call external Sulamerica APP,
	 * 		HomeFactory: call factory to get home data,
	 * 		dragItem: apply drag function to item,
	 *		saveState: save items state after drag changes position
	*/
    app.controller('EstiloCtrl',
	 	['$rootScope', '$scope', 'EstiloFactory',
		function($rootScope, $scope, EstiloFactory) {
        //reserve controller 'this'
        var vm = this;
        //
		vm.dataEstilo = [];
		/**
		 * Private methods
		*/
		//onload
		function onLoad () {
			getAll();
		}
		//
		function getAll() {
			EstiloFactory.getAll().then(function (data) {
				vm.dataEstilo = data.rows;
				console.log(vm.dataEstilo);
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
			EstiloFactory.savedData = estilo;
			EstiloFactory.save(estilo);
			/* TODO -> Think another way to update vm.dataEstilo */
			refresh();
        };
		//
		vm.get = function (id) {
			EstiloFactory.id = id;
			EstiloFactory.get();
		};
		//
		vm.delete = function (id) {
			EstiloFactory.id = id;
			EstiloFactory.delete();
		};
		//call onload function to start controller rotine
		onLoad();
    }]);
})();
