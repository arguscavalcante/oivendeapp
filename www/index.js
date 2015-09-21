<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->
    <!-- ionic/angularjs js -->
    <script src="lib/jquery/dist/jquery.min.js"></script>
    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="lib/angular-resource/angular-resource.min.js"></script>
    <script src="lib/jquery.maskedinput/dist/jquery.maskedinput.min.js"></script>

    <!-- pouchdb -->
    <script src="lib/pouchdb/dist/pouchdb.min.js"></script>
    <script src="lib/angular-pouchdb/angular-pouchdb.js"></script>
    <script src="lib/angular-jquery-maskedinput/angular-jquery-maskedinput.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="js/controllers/controllers.js"></script>
    <script src="js/controllers/EstiloFactory.js"></script>
    <script src="js/controllers/EstiloCtrl.js"></script>
    <script src="js/controllers/TelefoneCtrl.js"></script>
    <script src="js/controllers/VelocidadeCtrl.js"></script>
    <script src="js/services/lb-services.js"></script>

    <!-- VIEWS / HOME -->
    <script src="views/home/HomeFactory.js"></script>
    <script src="views/home/HomeCtrl.js"></script>
    <!-- COMPONENTS / DEVICES -->
    <script src="components/devices/DevicesFactory.js"></script>
    <script src="components/devices/DevicesCtrl.js"></script>
    <!-- COMPONENTS / PRODUCTS -->
    <script src="components/products/ProductsFactory.js"></script>
    <script src="components/products/ProductsCtrl.js"></script>
    <!-- COMPONENTS / TICKETS -->
    <script src="components/tickets/TicketsFactory.js"></script>
    <script src="components/tickets/TicketsCtrl.js"></script>
  </head>

  <body ng-app="OiVendeApp">
    <ion-nav-view></ion-nav-view>
  </body>
</html>
