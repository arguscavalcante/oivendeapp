(function () {
	/**
	 * @name Tickets Factory
	 * @method
	 * 		showApp: call external Sulamerica APP,
	 * 		Products Factory: call factory to get home data,
	 * 		dragItem: apply drag function to item,
	 *		saveState: save items state after drag changes position
	*/
    app.factory('db_tk', ['pouchDB',function(pouchDB) {
        var mydb = pouchDB('tickets');
        return mydb;
    }]);
    app.factory("TicketsFactory", ['$http', '$q', '$rootScope', 'db_tk',
        function TicketsFactory ($http, $q, $rootScope, db_tk)  {

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
                return db_tk.allDocs(options);
            }
            //
            function createData () {
                var ticket = {};
                //
                if (this.savedData.$valid) {
                    angular.forEach(this.savedData.$$success.parse, function (value, key) {
                        if (value.hasOwnProperty('$modelValue'))
                            ticket[value.$name] = value.$modelValue;
                    });
                }
                db_tk.post(ticket);
            }
            //
            function readData () {
                db_tk.get(this.id).then(function(doc) {
                    return doc;
                });
            }
            //
            function updateData (id) {
                db_tk.get(this.id).then(function(doc) {
                    return db_pd.put({
                        _id: id,
                        _rev: doc._rev,
                        nome: this.saveData.nome
                    });
                });
            }
            //
            function deleteData () {
                db_tk.get(this.id).then(function(doc) {
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
