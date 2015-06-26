'use strict';


// Declare app level module which depends on filters, and services
/*模块配置*/
angular.module('myApp', [
        'ui.bootstrap',
        'ngRoute',
         'ngTouch',//临时去掉，会导致双击
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'myApp.auth-service',
        'ngCookies',
        ]).//路由配置
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/callNum', {templateUrl: 'partials/callNum.html', controller: 'callNumController'});//拨打号码
        $routeProvider.when('/myBill', {templateUrl: 'partials/myBill.html', controller: 'myBillController'});//我的账单
      //  $routeProvider.when('/balanceLog', {templateUrl: 'partials/costlist.html', controller: 'BalanceLogCtrl'});
		$routeProvider.when('/selectNum', {templateUrl: 'partials/selectNum.html', controller: 'selectNumController'});//选号
		$routeProvider.when('/numList/:id/:name', {templateUrl: 'partials/numList.html', controller: 'numListController'});
        $routeProvider.when('/numListSearch/:id/:name', {templateUrl: 'partials/numListSearch.html', controller: 'numListSearchController'});
		$routeProvider.when('/selectPackage/:secondNum', {templateUrl: 'partials/selectPackage.html', controller: 'selectPackageController'});
		$routeProvider.when('/packageContent', {templateUrl: 'partials/packageContent.html', controller: 'packageContentController'});
		$routeProvider.when('/accountPrepaid', {templateUrl: 'partials/accountPrepaid.html', controller: 'accountPrepaidController'});
        $routeProvider.when('/changePackage', {templateUrl: 'partials/changePackage.html', controller: 'changePackageController'});
	    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'});
	    $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'registerController'});
		$routeProvider.when('/registerStep2/:hostNumber', {templateUrl: 'partials/registerStep2.html', controller: 'registerStep2Controller'});
	    $routeProvider.when('/findpwd', {templateUrl: 'partials/findpwd.html', controller: 'findpwdController'});
        $routeProvider.when('/findpwdStep2/:hostNumber', {templateUrl: 'partials/findpwdStep2.html', controller: 'findpwdStep2Controller'});
        $routeProvider.when('/findpwdStep3/:code', {templateUrl: 'partials/findpwdStep3.html', controller: 'findpwdStep3Controller'});
		$routeProvider.when('/more', {templateUrl: 'partials/more.html', controller: 'moreController'});
		$routeProvider.when('/changePwd', {templateUrl: 'partials/changePwd.html', controller: 'changePwdController'});
		$routeProvider.when('/changePackageStep2', {templateUrl: 'partials/changePackageStep2.html', controller: 'changePackageStep2Controller'});
        $routeProvider.when('/twoPrepaid', {templateUrl: 'partials/twoPrepaid.html', controller: 'twoPrepaidController'});
        $routeProvider.when('/alipayPrepaid', {templateUrl: 'partials/alipayPrepaid.html', controller: 'alipayPrepaidController'});
        $routeProvider.when('/myReserve', {templateUrl: 'partials/myReserve.html', controller: 'myReserveController'});
        $routeProvider.when('/mobileCardPrepaid', {templateUrl: 'partials/mobileCardPrepaid.html', controller: 'mobileCardPrepaidController'});
        $routeProvider.when('/prepaidMessage', {templateUrl: 'partials/prepaidMessage.html', controller: 'prepaidMessageController'});
        $routeProvider.when('/link', {templateUrl: 'partials/link.html', controller: 'linkController'});
        $routeProvider.when('/ad', {templateUrl: 'partials/ad.html', controller: 'adController'});
        $routeProvider.when('/data', {templateUrl: 'partials/data.html', controller: 'dataController'});
	    $routeProvider.otherwise({redirectTo: '/login'});
    }]);