(function () {
  'use strict';
  /**
   * @name Devices Controller
  */
  app.controller('ProductsCtrl', ['$rootScope', '$state', '$q', '$scope', 'ProductsFactory', '$ionicModal',
    function ($rootScope, $state, $q, $scope, ProductsFactory, $ionicModal) {
      //
      var vm = this;
      //
      vm.products = [];
      /**
       * Private methods
      */
      // onload method to start controller
      function onLoad () {
        getAll();
      }
      //
      function getAll () {
        ProductsFactory.getAll().then(function (data) {
          vm.products = data.rows;
          console.log(vm.products);
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
      vm.save = function (estilo) {
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
        var responseInstalacao;
        var responseCampanha;
        var responsePagamento;
        $q.all([ProductsFactory.getModemData(), ProductsFactory.getInstalacao(), ProductsFactory.getCampanha(), ProductsFactory.getPagamento()])
          .then(function (arr) {
            console.log('ARRAY DE PROMISSE', arr);
            responseModem = arr[0].data.listaModem;
            responseInstalacao = arr[1].data;
            responseCampanha = arr[2].data;
            responsePagamento = arr[3].data;
            console.log('RESPONSE CONSULTA MODEM', responseModem);
            console.log('RESPONSE CONSULTA INSTALACAO', responseInstalacao);
            console.log('RESPONSE CONSULTA CAMPANHA', responseCampanha);
            console.log('RESPONSE CONSULTA PAGAMENTO', responsePagamento);

            $rootScope.modemData = responseModem;
            $rootScope.instalacaoData = responseInstalacao;
            $rootScope.campanhaData = responseCampanha;
            $rootScope.pagamentoData = responsePagamento;

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
      }).then(function (modal) {
        vm.modal = modal;
      });

      // call onload function to start controller rotine
      onLoad();
    }]);
})();
