angular.module('ProjectHands', ['ngResource', 'ngAria', 'ngAnimate', 'ngMessages', 'ngCookies', 'ngMaterial', 'ui.router', 'ct.ui.router.extras', 'gridster', 'ui.calendar', 'ProjectHands.dashboard', 'ProjectHands.auth'])


.config(function ($mdThemingProvider, $provide) {
    //Set Angular-Material Theme
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');

    //Decoration for ExceptionHandler
    $provide.decorator('$exceptionHandler', function ($delegate) {
        return function (exception, cause) {

            exception.message = exception.message +
                '\nCaused by: ' + cause +
                '\nOrigin: ' + exception.fileName + ':' + exception.lineNumber + ':' + exception.columnNumber +
                '\n\nStacktrace:';

            $delegate(exception, cause);
        };
    });
})

/**************************************/
/***** Application Wide Constants *****/
/**************************************/
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
    VOLUNTEER: "volunteer",
    GUEST: "guest"
})

.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS, SessionService, $mdToast, $q, ROLES) {

    //Email Regex according to RFC 5322. - http://emailregex.com/
    $rootScope.regexEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    $rootScope.rootToastAnchor = '#main-view';
    SessionService.getSession(); //Restore session on page refresh

    var ROLES_HIERARCHY = [ROLES.GUEST, ROLES.VOLUNTEER, ROLES.TEAM_LEAD, ROLES.MANAGER, ROLES.ADMIN];


    /**
     * Authenticating user based on role
     * @param   {string} role : The lowest role in the hierarchy that is allowed
     * @returns {object} A resolved/rejected promise based on authentication
     */
    $rootScope.authenticate = function (authorizedRole) {
        console.log('Lowest Authorized Role', authorizedRole);
        var deferred = $q.defer();
        AuthService.authenticate()
            .$promise
            .then(function (result) {
                console.log('authenticate result', result);
                if (ROLES_HIERARCHY.indexOf(result.role) <= ROLES_HIERARCHY.indexOf(authorizedRole)) {
                    deferred.reject('No Permission');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                }
                else
                    deferred.resolve(result);
            })
            .catch(function (error) {
                console.log('authenticate error', error);
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                deferred.reject("Not Logged in");
            });

        return deferred.promise;
    };

    /********************************************/
    /***** Application Wide Event Listeners *****/
    /********************************************/
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, args) {
        SessionService.startSession();
        var toState = 'dashboard.main-page';
        if(ROLES_HIERARCHY.indexOf(args.role) < 1)
            toState = 'home';

        $state.go(toState)
            .then(function () {
                $rootScope.makeToast('ברוך הבא ' + args.userName, '#main-view', 'top right');
            });
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event) {
        SessionService.clearSession();
        $state.go('home')
            .then(function () {
                $rootScope.makeToast('להתראות!', '#main-view', 'top right');
            });
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function (event) {
//        $state.go('login');
        $rootScope.makeToast('אינך מורשה לעשות זאת', $rootScope.rootToastAnchor, 'top right');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
        SessionService.clearSession();
        $state.go('login')
            .then(function() {
            $rootScope.makeToast('Session Expired, Please login again', $rootScope.rootToastAnchor, 'top right');
        });
    });

    //Check if user is authenticated when State changed.
    $rootScope.$on('$stateChangeSuccess', function(event) {
        if($rootScope.isLoggedIn && !SessionService.getSession())
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    });

    /**************************************/
    /***** Application Wide Functions *****/
    /**************************************/
    //TODO move these to service

    $rootScope.logout = function () {
        AuthService.logout()
            .$promise
            .then(function (result) {
                console.log(result);
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

            })
            .catch(function (error) {
                console.log(error);
                SessionService.clearSession();
                $rootScope.makeToast('יציאה נכשלה', $rootScope.rootToastAnchor, 'top right');
            });
    };

    $rootScope.constructionToast = function (position) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('האתר תחת בניה')
            .position(position)
            .parent($rootScope.rootToastAnchor)
            .capsule(true)
            .hideDelay(2000)
        );
    };

    $rootScope.toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    /**
     * Invoke Angular-Material's Toast
     * @param {string} message  : The message to be shown in the toast
     * @param {string} anchor   : Element selector of the element the toast will attach to.
     * @param {string} position : The position of the toast in relation to the anchor element
     */
    $rootScope.makeToast = function (message, anchor, position) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(message)
            .position(position)
            .parent(anchor)
            .capsule(true)
            .hideDelay(2000)
        );
    };
});
