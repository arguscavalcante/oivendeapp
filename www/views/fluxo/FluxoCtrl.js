(function () {
	"use strict";
	/**
	 * @name HomeController
	*/
    app.controller('FluxoCtrl', ['$rootScope', '$scope', 'FluxoFactory',
		function($rootScope, $scope, FluxoFactory) {
        //
        var vm = this;
        //
		vm.fluxo = [];
		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			getAll();
		}
		//
		function getAll() {
			FluxoFactory.getAll().then(function (data) {
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
			FluxoFactory.savedData = estilo;
			FluxoFactory.create(estilo);
			/* TODO -> Think another way to update vm.dataEstilo */
			refresh();
        };
		//
		vm.get = function (id) {
			FluxoFactory.id = id;
			FluxoFactory.get();
		};
		//
		vm.delete = function (id) {
			FluxoFactory.id = id;
			FluxoFactory.delete();
		};
		//call onload function to start controller rotine
		onLoad();
    }]);
})();
