angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('menu.logEntry', {
    url: '/entry',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logEntry.html',
        controller: 'logEntryCtrl'
      }
    }
  })
  .state('menu.history', {
    url: '/history',
    views: {
      'side-menu21': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  })
  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })
  .state('menu.settings', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })
  .state('sampleEntry', {
    url: '/entry-1',
    templateUrl: 'templates/sampleEntry.html',
    controller: 'sampleEntryCtrl'
  });

$urlRouterProvider.otherwise('/side-menu21/entry');

});
