var app = angular.module('OiVendeApp');

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, pouchDB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, pouchDB) {
    console.log("Criando o banco");
    $scope.playlists = [];
    var db = pouchDB('playlist');
    var options = {
      /*eslint-disable camelcase */
      include_docs: true,
      /*eslint-enable camelcase */
      live: true
    };

    // db.post({ estiloMusical: 'Reggae'}, options).then(function(response) {
    //     console.log("sucesso do put");
    //     // console.log(JSON.stringify(response));
    //     // $scope.playlists.push(response);
    // }).catch(function (error) {
    //     console.log("erro");
    //     console.error(JSON.stringify(error));
    // });
    //
    // db.post({ estiloMusical: 'Chill'});
    // db.post({ estiloMusical: 'Socorro'});
    // db.post({ estiloMusical: 'Indie'});
    // db.post({ estiloMusical: 'Rap'});
    // db.post({ estiloMusical: 'Tomar Banho'});

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
})

.controller('PlaylistCtrl', function($scope, $state, $stateParams, pouchDB) {
    $scope.estilo = {};
    var db = pouchDB('playlist');
    var options = {
      /*eslint-disable camelcase */
      include_docs: true,
      /*eslint-enable camelcase */
      live: true
    };

    console.log(JSON.stringify($stateParams));
    db.get($stateParams.estiloId).then(function(doc){
        console.log(JSON.stringify(doc));
        $scope.estilo = doc;
    });

    $scope.save = function(doc) {
        db.get(doc._id).then(function(document){
            db.put({_id: doc._id, estiloMusical: doc.estiloMusical, _rev: document._rev}).then(function(success) {
                console.log("estilo atualizado com sucesso.");
                $state.go('app.playlists');
            }).catch(function(err){
                console.log("Erro atualizando o arquivo: " + JSON.stringify(err));
            });
        });
    }
});
