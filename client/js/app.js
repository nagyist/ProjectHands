angular.module('ProjectHands', ['ngResource', 'ngAria', 'ngAnimate', 'ngMessages', 'ngCookies', 'ngMaterial', 'ui.router', 'ct.ui.router.extras', 'gridster', 'ui.calendar', 'ProjectHands.dashboard'])


.config(function ($mdThemingProvider, $provide) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');

    //Decoration for ExceptionHandler
    $provide.decorator('$exceptionHandler', function($delegate) {
        return function(exception, cause) {

            exception.message = exception.message +
                '\nCaused by: ' + cause +
                '\nOrigin: ' + exception.fileName + ':' + exception.lineNumber + ':' + exception.columnNumber +
                '\n\nStacktrace:';

            $delegate(exception, cause);
        };
    });
})

.constant('COLLECTIONS', {
    RENOVATIONS: 'renovations',
    CHATS: 'chats',
    USERS: 'users',
    TEAMS: 'teams'
})

.constant('ROLES', {
    ADMIN: "admin",
    MANAGER: "manager",
    TEAM_LEAD: "teamLead",
    VOLUNTEER: "volunteer"
})

//DEV Global Methods
.run(function ($rootScope, $mdToast) {

    $rootScope.regexEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

    $rootScope.constructionToast = function (position) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('האתר תחת בניה')
            .position(position)
            .parent('#main-view')
            .capsule(true)
            .hideDelay(2000)
        );
    };
});
