(function () {
	/**
	 * @name EstiloFactory
	 * @method
	 * 		showApp: call external Sulamerica APP,
	 * 		HomeFactory: call factory to get home data,
	 * 		dragItem: apply drag function to item,
	 *		saveState: save items state after drag changes position
	*/
    app.factory('db', ['pouchDB',function(pouchDB) {
        var mydb = pouchDB('playlist');
        return mydb;
    }]);
    app.factory("EstiloFactory",
        ['$http', '$q', '$rootScope', 'db',
            function EstiloFactory ($http, $q, $rootScope, db)  {

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
                    db.get(this.id).then(function(doc) {
                        return doc;
                    });
                }
                //
                function updateDate () {
                    
                }
                //
                function deleteData () {
                    db.get(this.id).then(function(doc) {
                        return db.remove(doc);
                    });
                }
                //
            	return {
                    id: 0,
                    savedData: 0,
                    getAll: getAllData,
                    save: createData,
                    delete: deleteData,
                    get: readData
                };
            }
        ]
    );
})();
