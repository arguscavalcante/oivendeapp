(function () {
  /**
   * @name LoginFactory
  */
  app.factory('db', ['pouchDB', function (pouchDB) {
    var mydb = pouchDB('playlist');
    return mydb;
  }]);
  app.factory('LoginFactory', ['$http', '$state', '$q', '$timeout', '$rootScope', 'db',
    function LoginFactory ($http, $state, $q, $timeout, $rootScope, db) {
      var options = {
        /*eslint-disable camelcase */
        include_docs: true,
        continuous: true,
        /*eslint-enable camelcase */
        live: true
      };
      /**
       * CRUD -> Requirements outside the view
      */
      function getAllData () {
        return db.allDocs(options);
      }
      //
      function createData () {
        var nome = this.savedData.nome;
        db.post({estiloMusical: nome});
      }
      //
      function readData () {
        db.get(this.id).then(function (doc) {
          return doc;
        });
      }
      //
      function updateData (id) {
        db.get(this.id).then(function (doc) {
          return db.put({
            _id: id,
            _rev: doc._rev,
            nome: this.saveData.nome
          });
        });
      }
      //
      function deleteData () {
        db.get(this.id).then(function (doc) {
          return db.remove(doc);
        });
      }

      function getClientData (searchFilter) {
        console.log('Searching names for ' + searchFilter);

        var deferred = $q.defer();

        $http({
          url: 'http://oivendeapi.mybluemix.net:80/api/Contatos',
          dataType: 'json',
          method: 'GET'
        }).then(function (response) {
          responseClient = response.data;

          console.log('TESTE', response);

          console.log('RESPONSE CLIENTE NOMES', responseClient);

          var matches = responseClient
            .filter(function (nome) {
              console.log('NOME', nome);
              return (nome.nome.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);
            });

          deferred.resolve(matches);
        })
          .catch(deferred.reject);

        return deferred.promise;

      }

      function getClientOi () {
        var parametros = JSON.stringify({
          Ator: 'Oi Vende',
          DDD: 21,
          MSISDN: 22551920,
          Login: 'OI_VENDE_INTEGRACAO',
          Senha: 'oivende',
          Chave: '37139',
          TipoChave: 'PDV',
          Grupo: 'Oi Vende'
        });
        console.log('VALOR PARAMETROS', parametros);

        return $http({
          url: 'https://services.qa.oi.com.br/OiVende/DisponibilidadeVelox/verificar/',
          dataType: 'json',
          method: 'POST',
          data: parametros,
          headers: {'accept': 'application/json; charset=utf-8',
          'Authorization': 'Bearer 01.GTOXJNFLDrC67geKmqpFaQ'}
        });

      }

      // function sendPost() {
      //     var parametros = JSON.stringify({
      //             Ator : "Oi Vende",
      //             DDD : 21,
      //             MSISDN : 22551920,
      //             Login : "OI_VENDE_INTEGRACAO",
      //             Senha : "oivende",
      //             Chave : "37139",
      //             TipoChave : "PDV",
      //             Grupo : "Oi Vende"
      //         });
      // 				console.log('VALOR PARAMETROS', parametros);
      //
      // 				return $http({
      // 				    url: 'https://services.qa.oi.com.br/OiVende/DisponibilidadeVelox/verificar/',
      // 						dataType: 'json',
      // 				    method: 'POST',
      // 				    data: parametros,
      // 				    headers:  {"accept": "application/json; charset=utf-8",
      //         								'Authorization': 'Bearer 01.GTOXJNFLDrC67geKmqpFaQ'}
      // 				});
      // };

      //
      return {
        id: 0,
        savedData: 0,
        getAll: getAllData,
        create: createData,
        read: readData,
        update: updateData,
        delete: deleteData,
        getClientData: getClientData,
        getClientOi: getClientOi
      };
    }]
  );
})();
