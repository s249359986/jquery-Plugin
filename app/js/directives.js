'use strict';

/* Directives */
/* 应用的所有指令在此处配置 */

var directives=angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

/**
 * @ngdoc directives
 * @name butterbar
 *
 * @description
 * 当路由变化时调用此指令，出现等待画面
 *
 * @param $rootScope
 * @returns
 */

directives.directive('butterbar',['$rootScope',function($rootScope){
return {
    link:function(scope,element,attrs){
        element.removeClass('show_float');
        element.addClass('hide');
        $rootScope.$on('$routeChangeStart',function(){

            element.removeClass('hide');
           element.addClass('show_float');
        });
        $rootScope.$on('$routeChangeSuccess',function(){
            element.removeClass('show_float');
            element.addClass('hide');
        });
    }

}

}]);


/**
 * @ngdoc directives
 * @name divbutterbar
 *
 * @description
 * 当路由变化时调用此指令，出现等待画面
 *
 * @param $rootScope
 * @returns
 */
directives.directive('divbutterbar',['$rootScope',function($rootScope){
    return {
        link:function(scope,element,attrs){

          //  element.removeClass('show_float');
            element.addClass('show_float');
        }
    }

}]);

/*验证指令模板*/

/**
 * @ngdoc directives
 * @name validateTel
 *
 * @description
 * 指令方式验证手机号码
 *
 * @param
 * @returns
 */
directives.directive("validateTel",function(){
    return {
        require: "ngModel",

    link: function(scope,elm,attrs,ctrl){

        ctrl.$parsers.push(function(viewValue) {
            var reg =/^[1][1-9][0-9]{9}$/;
            var r = viewValue.match(reg);
            if (r ==null) {

                ctrl.$setValidity("validateTel",false);

                return viewValue;

            }
            else {

                ctrl.$setValidity("validateTel", true);
                return viewValue;

            }

        });

    }

};

});

/*验证密码*/

/**
 * @ngdoc directives
 * @name validateTel
 *
 * @description
 * 指令方式验证密码
 *
 * @param
 * @returns
 */
directives.directive("validatePwd",function(){
    return {
        require: "ngModel",

        link: function(scope,elm,attrs,ctrl){

            ctrl.$parsers.push(function(viewValue) {
                var reg =/^[1][1-9][0-9]{9}$/;
                var r = viewValue.match(reg);
                if (r ==null) {

                    ctrl.$setValidity("validatePwd",false);

                    return viewValue;

                }
                else {

                    ctrl.$setValidity("validatePwd", true);
                    return viewValue;

                }

            });

        }

    };

});


