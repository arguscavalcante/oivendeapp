var app = angular.module('OiVendeApp');

app.controller('TelefoneCtrl', function($scope, $state, Cliente, Porta) {
    console.log("Consulta a telefone");
    $scope.tel = {};
    $scope.cliente = {};
    $scope.portas = [];
    $scope.exibirDadosCliente = false;
    $scope.exibirConsultaTelefone = true;
    $scope.msgConsultaTelefone = "";

    $scope.consultarTelefone = function(tel) {
        console.log(JSON.stringify(tel));
        $scope.msgConsultaTelefone = "";
        var telefone = tel.ddd.replace('(','').replace(')', '') + tel.telefone.replace('(','').replace('-', '') ;
        var cpf = tel.cpf.split('.').join('').replace('-','');
        Cliente.find({filter: { where: { telefone: telefone }}})
               .$promise
               .then(function(result){
                   console.log("Cliente encontrado: ");
                   console.log(JSON.stringify(result));
                   $scope.cliente = result[0];
                   Porta.find({filter: {where: { telefone: telefone }}})
                        .$promise
                        .then(function(result) {
                            console.log("Portas encontradas: ");
                            console.log(JSON.stringify(result));
                            $scope.portas = result;
                            // $state.go("app.velocidade", {cliente: $scope.cliente, portas: $scope.portas});
                            $scope.exibirConsultaTelefone = false;
                            $scope.exibirDadosCliente = true;
                            if ($scope.cliente == null) {
                                $scope.msgConsultaTelefone = "Cliente não encontrado";
                            } else {

                            }
                        });
        });
    }

    $scope.$on('$ionicView.enter', function(e) {

    });

});

/*
app.controller('TelefoneCtrl', function($scope, pouchDB) {
    console.log("Criando o banco");
    $scope.tel = {};
    var db = pouchDB('playlist');
    var options = {
      include_docs: true,
      live: true
    };

    function onChange(change) {
        // $scope.playlists.push(change);
    }

    $scope.$on('$ionicView.enter', function(e) {
        db.allDocs({include_docs: true})
          .then(function(result){
              console.log("consulta ao DB concluída");
             $scope.playlists = result.rows;
          //    console.log(JSON.stringify(result.rows[0].doc));
        });
    });

  db.changes(options).$promise
      .then(null, null, onChange);
  // db.destroy();
});
*/
