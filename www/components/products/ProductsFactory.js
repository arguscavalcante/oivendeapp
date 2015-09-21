(function () {
	/**
	 * @name Products Factory
	 * @method
	 * 		showApp: call external Sulamerica APP,
	 * 		Products Factory: call factory to get home data,
	 * 		dragItem: apply drag function to item,
	 *		saveState: save items state after drag changes position
	*/
    app.factory('db_pd', ['pouchDB',function(pouchDB) {
        var mydb = pouchDB('products');
        return mydb;
    }]);
    app.factory("ProductsFactory", ['$http', '$q', '$rootScope', 'db_pd',
        function ProductsFactory ($http, $q, $rootScope, db_pd)  {

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
                db_pd.get(this.id).then(function(doc) {
                    return doc;
                });
            }
            //
            function updateData (id) {
                db_pd.get(this.id).then(function(doc) {
                    return db_pd.put({
                        _id: id,
                        _rev: doc._rev,
                        nome: this.saveData.nome
                    });
                });
            }
            //
            function deleteData () {
                db_pd.get(this.id).then(function(doc) {
                    return db_pd.remove(doc);
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
                delete: deleteData
            };
        }]
    );
})();
