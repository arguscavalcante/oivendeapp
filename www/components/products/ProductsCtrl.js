(function () {
	"use strict";
	/**
	 * @name Devices Controller
	*/
    app.controller('ProductsCtrl', ['$rootScope', '$state', '$http', '$scope', 'ProductsFactory', '$ionicModal',
		function($rootScope, $state, $http, $scope, ProductsFactory, $ionicModal) {
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

		vm.modemData = function () {
			var responseModem;
			var parametros = JSON.stringify({

					velocidade : 18,
					tipoModem : "00004",
					uf : "MG"

					});
					console.log('VALOR PARAMETROS', parametros);

					$http({
							url: 'https://services.qa.oi.com.br/OiVende/ConsultaDadosModem/consultar/',
							dataType: 'json',
							method: 'POST',
							data: parametros,
							headers:  {"accept": "application/json; charset=utf-8",
													'Authorization': 'Bearer 01.gJCNWf3wv1VJNq1NI-ZlJw'}
					}).then (function(response){

						responseModem = response.data.listaModem;
						console.log('RESPONSE CONSULTA MODEM', responseModem);

						$rootScope.modemData = responseModem;

						$state.go('app.fluxo');

					});
		};

		// vm.cartModal = function() {
		// 	vm.modalAddCart.show();
		// };

		// $ionicModal.fromTemplateUrl('components/products/addToCart.html', {
		//     scope: $scope,
		//     animation: 'slide-in-up'
		//   }).then(function(modal) {
		//     vm.modalAddCart = modal;
		//   });

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
