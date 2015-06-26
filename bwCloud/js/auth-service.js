/**
 * @license Auth Service
 * (c) 2013 Gaetan Giraud
 * License: MIT
 *
 * Inspired by Witold Szczerba's Angular Auth.
 *
 */

angular.module('myApp.auth-service', []).
    /*
     *  This factory handles the Login - Logout logic.
     *  It saves the current user into the $rootScope.currentUser model.
     *  It uses the Angula-UI bootstrap implementation for the $dialog directive . http://angular-ui.github.com/bootstrap/
     */

/**
 * $http interceptor.
 *
 */
    config(function ($httpProvider) {
        var interceptor = function ($rootScope, $q) {
            function success(response) {
                return response;
            }

            function error(response) {
                return $q.reject(response);
            }

            return function (promise) {
                return promise.then(success, error);
            }

        };


        $httpProvider.defaults.transformRequest=function(data){

//            var toData="";
//            if(data!=undefined)
//         {
//             toData=$.param(data);

//              return toData;
//            }
//            else
//            {
//                return;
//            }
        };
        $httpProvider.responseInterceptors.push(interceptor);
    });
