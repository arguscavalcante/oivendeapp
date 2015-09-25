(function () {
	"use strict";
	/**
	 * @name LoginController
	*/
    app.controller('LoginCtrl', ['$rootScope', '$scope', 'LoginFactory', '$ionicSideMenuDelegate',
		function($rootScope, $scope, LoginFactory, $ionicSideMenuDelegate) {

		/**
		 * Private methods
		*/
		//onload method to start controller
		function onLoad () {
			ionic.Platform.ready(function () {
        //$ionicSideMenuDelegate.toggleLeft();
      });
		}
		//


    $scope.check = function (searchValue) {
        console.log(searchValue);
        LoginFactory.getClientData(searchValue);
    };

		//call onload function to start controller rotine
		onLoad();
    }]);
})();
