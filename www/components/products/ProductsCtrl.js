(function () {
	"use strict";
	/**
	 * @name Devices Controller
	*/
    app.controller('ProductsCtrl', ['$rootScope', '$http', '$scope', 'ProductsFactory', '$ionicModal',
		function($rootScope, $http, $scope, ProductsFactory, $ionicModal) {
        //
        var vm = this;
        //
		vm.products = [];
		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			getAll();
		}
		//
		function getAll() {
			ProductsFactory.getAll().then(function (data) {
				vm.products = data.rows;
				console.log(vm.products)
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
			ProductsFactory.savedData = estilo;
			ProductsFactory.create();
			/* TODO -> Think another way to update vm.products */
			refresh();
			vm.modal.hide();
        };
		//
		vm.get = function (id) {
			ProductsFactory.id = id;
			ProductsFactory.get();
		};

		//
		vm.delete = function (id) {
			ProductsFactory.id = id;
			ProductsFactory.delete();
			//
			refresh();
		};

		vm.cartModal = function() {
			vm.modalAddCart.show();
		};

		$ionicModal.fromTemplateUrl('components/products/addToCart.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    vm.modalAddCart = modal;
		  });

		$ionicModal.fromTemplateUrl('components/products/addProducts.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    vm.modal = modal;
		  });

		//call onload function to start controller rotine
		onLoad();
    }]);
})();
