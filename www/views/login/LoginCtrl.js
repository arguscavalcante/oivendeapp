(function () {
  'use strict';
  /**
   * @name LoginController
  */
  app.controller('LoginCtrl', ['$http', '$rootScope', '$state', '$scope', 'LoginFactory', '$ionicSideMenuDelegate',
    function ($http, $rootScope, $state, $scope, LoginFactory, $ionicSideMenuDelegate) {
      /**
       * Private methods
      */
      // onload method to start controller
      function onLoad () {
        ionic.Platform.ready(function () {
          // $ionicSideMenuDelegate.toggleLeft();
        });
      }
      //

      $scope.check = function (searchValue) {
        var responseClient;
        var nomes;

        if (searchValue.length > 2) {
          return LoginFactory.getClientData(searchValue)
            .then(function (matches) {
              $scope.data = {
                clientes: matches || [],
                search: searchValue || ''
              };
              console.log('$scope.data.clientes', $scope.data.clientes);
            });
        }

      };

      $scope.sendPost = function (data) {
        console.log('nome clicado', data);

        return LoginFactory.getClientOi()
          .then(function (response) {
            console.log('RESPONSE DO CLICK', response.data);

            $rootScope.clienteVelox = undefined;

            if (data.nome.toLowerCase() === response.data.Assinante.toLowerCase()) {
              console.log('CLIENTE VELOX');
              $rootScope.clienteVelox = response.data;
            }

            $rootScope.data = data;

            $state.go('app.home');

          });

      };

      // call onload function to start controller rotine
      onLoad();
    }]);
})();
