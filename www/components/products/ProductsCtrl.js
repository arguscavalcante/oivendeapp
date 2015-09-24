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

		vm.sendPost = function() {
        var parametros = JSON.stringify({
                Ator : "Oi Vende",
                DDD : 21,
                MSISDN : 22551920,
                Login : "OI_VENDE_INTEGRACAO",
                Senha : "oivende",
                Chave : "37139",
                TipoChave : "PDV",
                Grupo : "Oi Vende"
            });
						console.log('VALOR PARAMETROS', parametros);
        // $http.post("https://services.qa.oi.com.br/OiVende/DisponibilidadeVelox/verificar/", parametros).
				// 		then(function(response) {
        //     		$scope.data = parametros;
				// 				console.log('VALOR DATA', $scope.data);
        // 		}, function(response){
				// 				console.log('ERRO', response);
				// 		});

						$http({
						    url: 'https://services.qa.oi.com.br/OiVende/DisponibilidadeVelox/verificar/',
								dataType: 'json',
						    method: 'POST',
						    data: parametros,
						    headers:  {"accept": "application/json; charset=utf-8",
            								'Authorization': 'Bearer 01.GTOXJNFLDrC67geKmqpFaQ'}
						}).success(function (response) {
						    console.log('VALOR DATA', response);
						}).error(function (error) {
								console.log('ERRO', error);
						});
    };

		//
		vm.delete = function (id) {
			ProductsFactory.id = id;
			ProductsFactory.delete();
			//
			refresh();
		};
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
