(function () {
	"use strict";
	/**
	 * @name LoginController
	*/
    app.controller('LoginCtrl', ['$http', '$rootScope', '$state', '$scope', 'LoginFactory', '$ionicSideMenuDelegate',
		function($http, $rootScope, $state, $scope, LoginFactory, $ionicSideMenuDelegate) {

		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			ionic.Platform.ready(function () {
        //$ionicSideMenuDelegate.toggleLeft();
      });
		}
		//


    $scope.check = function (searchValue) {

      var responseClient;
      var nomes;

      $http({
          url: 'http://oivendeapi.mybluemix.net:80/api/Contatos',
          dataType: 'json',
          method: 'GET'
      }).then (function(response) {

          responseClient = response.data;

          console.log('TESTE', response);

          $scope.data = {'nomes': [], 'search': ''};
          $scope.data.search = searchValue;

          console.log('RESPONSE CLIENTE NOMES', responseClient);

          LoginFactory.getClientData(responseClient, $scope.data.search).then(

          function(matches) {
              $scope.data.nomes = matches;
              console.log('$scope.data.nomes', $scope.data.nomes);
            }
          );
      })
    };

     $scope.sendPost = function(nome) {

       console.log('nome clicado', nome);

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

            $http({
                url: 'https://services.qa.oi.com.br/OiVende/DisponibilidadeVelox/verificar/',
                dataType: 'json',
                method: 'POST',
                data: parametros,
                headers:  {"accept": "application/json; charset=utf-8",
                            'Authorization': 'Bearer 01.GTOXJNFLDrC67geKmqpFaQ'}
            }).then (function(response){

              console.log('RESPONSE DO CLICK', response);
              $rootScope.nome = nome;
              $state.go('app.home');

            })



    };

		//call onload function to start controller rotine
		onLoad();
    }]);
})();
