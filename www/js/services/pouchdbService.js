var app = angular.module('OiVendeApp');

app.service('pouchDB', function(pouchDB) {
  var db = pouchDB('name');
});
