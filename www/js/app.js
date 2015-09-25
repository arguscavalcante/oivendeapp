// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('OiVendeApp', ['ionic', 'pouchdb','lbServices','angular-jquery-maskedinput'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, LoopBackResourceProvider) {

    LoopBackResourceProvider.setUrlBase('http://oivendeapi.mybluemix.net/api');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.filas', {
    url: '/filas',
    views: {
      'menuContent': {
        templateUrl: 'views/filas/filas.html'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'views/login/login.html'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'views/home/home.html'
      }
    }
  })

  .state('app.fluxo', {
    url: '/fluxo',
    views: {
      'menuContent': {
        templateUrl: 'views/fluxo/fluxo.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.telefone', {
      url: '/telefone',
      views: {
        'menuContent': {
          templateUrl: 'templates/telefone.html',
          controller: 'TelefoneCtrl'
        }
      }
    })

    .state('app.velocidade', {
      url: '/velocidade/:cliente/:portas',
      views: {
        'menuContent': {
          templateUrl: 'templates/velocidade.html',
          controller: 'VelocidadeCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:estiloId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
