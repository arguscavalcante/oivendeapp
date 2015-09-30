(function () {
  /**
   * @name Products Factory
   * @method
   * 		showApp: call external Sulamerica APP,
   * 		Products Factory: call factory to get home data,
   * 		dragItem: apply drag function to item,
   *		saveState: save items state after drag changes position
  */
  app.factory('db_pd', ['pouchDB', function (pouchDB) {
    var mydb = pouchDB('products');
    return mydb;
  }]);
  app.factory('ProductsFactory', ['$http', '$q', '$rootScope', 'db_pd',
    function ProductsFactory ($http, $q, $rootScope, db_pd) {
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
        return db_pd.allDocs(options);
      }
      //
      function createData () {
        var product = {};
        //
        if (this.savedData.$valid) {
          angular.forEach(this.savedData.$$success.parse, function (value, key) {
            if (value.hasOwnProperty('$modelValue'))
              product[value.$name] = value.$modelValue;
          });
        }
        db_pd.post(product);
      }
      //
      function readData () {
        db_pd.get(this.id).then(function (doc) {
          return doc;
        });
      }
      //
      function updateData (id) {
        db_pd.get(this.id).then(function (doc) {
          return db_pd.put({
            _id: id,
            _rev: doc._rev,
            nome: this.saveData.nome
          });
        });
      }
      //
      function deleteData () {
        db_pd.get(this.id).then(function (doc) {
          return db_pd.remove(doc);
        });
      }

      function getModemData () {
        var parametros = JSON.stringify({
          velocidade: 18,
          tipoModem: '00004',
          uf: 'MG'

        });

        return $http({
          url: 'https://services.qa.oi.com.br/OiVende/ConsultaDadosModem/consultar/',
          dataType: 'json',
          method: 'POST',
          data: parametros,
          headers: {'accept': 'application/json; charset=utf-8',
          'Authorization': 'Bearer 01.gJCNWf3wv1VJNq1NI-ZlJw'}
        });
      }

      function getInstalacao () {
        return $http({
          url: 'http://oivendeapi.mybluemix.net:80/api/Instalacaos',
          dataType: 'json',
          method: 'GET'
        });

      }

      function getCampanha () {
        return $http({
          url: 'http://oivendeapi.mybluemix.net:80/api/Campanhas',
          dataType: 'json',
          method: 'GET'
        });

      }

      function getPagamento () {
        return $http({
          url: 'http://oivendeapi.mybluemix.net:80/api/Pagamentos',
          dataType: 'json',
          method: 'GET'
        });

      }

      //
      return {
        id: 0,
        savedData: 0,
        getAll: getAllData,
        create: createData,
        read: readData,
        update: updateData,
        delete: deleteData,
        getModemData: getModemData,
        getInstalacao: getInstalacao,
        getCampanha: getCampanha,
        getPagamento: getPagamento
      };
    }]
  );
})();
