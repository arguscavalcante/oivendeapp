var app = angular.module('OiVendeApp');

app.controller('TelefoneCtrl', function($scope, $state, Cliente) {
    console.log("Consulta a telefone");
    $scope.tel = {};

    $scope.consultarTelefone = function(tel) {
        var telefone = tel.ddd + tel.telefone;
        var cpf = tel.cpf;
        console.log("Dados: " + telefone + " - " + cpf);
        Cliente.find({filter:
                        {where: {
                            telefone: telefone
                     }}})
               .$promise
               .then(function(result){
                   console.log("Resultado encontrado: ");
                   console.log(JSON.stringify(result));
                   // $state.go('app.browse'); //TODO: acertar essa navegação
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
