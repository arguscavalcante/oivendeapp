var app = angular.module('OiVendeApp');

app.controller('EstiloCtrl', function($scope, pouchDB) {

    var db = pouchDB('playlist');
    var options = {
      /*eslint-disable camelcase */
      include_docs: true,
      /*eslint-enable camelcase */
      live: true
    };

    $scope.estilo = {};

    $scope.save = function(estilo) {
        db.post({estiloMusical: $scope.estilo.nome});
    };

});
