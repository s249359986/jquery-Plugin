'use strict';

/* Controllers */






var promise;//拨号计时器全局变量
var waitTime=30;//拨号等待时间全局变量

var controllers = angular.module('myApp.controllers', []);



/**
 * @ngdoc controller
 * @name myBillController
 *
 * @description
 * 我的账单的控制器
 *
 * @param '$scope', '$http', '$routeParams', 'SecondNum', '$location', 'PackageInfo','GlobalVar','UserM'
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('myBillController', ['$scope', '$http','UserM','GlobalVar','$location','SecondNum','$myCookieStore', function ($scope, $http,UserM,GlobalVar,$location,SecondNum,$myCookieStore) {




}]);

controllers.controller('dataController', ['$scope', '$http','UserM','GlobalVar','$location','SecondNum','$myCookieStore', function ($scope, $http,UserM,GlobalVar,$location,SecondNum,$myCookieStore) {


debugger;

}]);



controllers.controller('callNumController', ['$scope', '$http', '$window','UserM','GlobalVar','$interval', '$location','SecondNum','$myCookieStore', function ($scope, $http, $window,UserM,GlobalVar,$interval,$location,SecondNum,$myCookieStore) {


}]);


controllers.controller('moreController', ['$scope', '$http', '$location', 'UserM','$window','$cookieStore','GlobalVar','$myCookieStore', function ($scope, $http,$location,UserM,$window,$cookieStore,GlobalVar,$myCookieStore) {

}]);


/**
 * @ngdoc controller
 * @name selectNumController
 *
 * @description
 * 选号控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('selectNumController', ['$scope', '$http', '$location', '$route','UserM','GlobalVar','SecondNum','$timeout', function ($scope, $http, $location, $route,UserM,GlobalVar,SecondNum,$timeout) {



}]);


/**
 * @ngdoc controller
 * @name numListController
 *
 * @description
 * 号码列表控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('numListController', ['$scope', '$http', '$routeParams', '$location','$animate','UserM','GlobalVar','SecondNum', function ($scope, $http, $routeParams, $location,$animate,UserM,GlobalVar,SecondNum) {


}]);


/**
 * @ngdoc controller
 * @name numListSearchController
 *
 * @description
 * 搜索号码列表控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('numListSearchController', ['$scope', '$http', '$routeParams', '$location','GlobalVar','UserM', function ($scope, $http, $routeParams, $location,GlobalVar,UserM) {



}]);


/**
 * @ngdoc controller
 * @name myReserveController
 *
 * @description
 * 预留号码控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('myReserveController', ['$scope', '$http', '$routeParams', '$location','UserM','GlobalVar','SecondNum','$timeout', function ($scope, $http, $routeParams, $location,UserM,GlobalVar,SecondNum,$timeout) {


}]);

/**
 * @ngdoc controller
 * @name selectPackageController
 *
 * @description
 * 选择套餐的控制器
 *
 * @param '$scope', '$http', '$routeParams', 'SecondNum', '$location', 'PackageInfo','GlobalVar','UserM'
 * @returns {Object} Deserialized cookie value.
 */

controllers.controller('selectPackageController', ['$scope', '$http', '$routeParams', 'SecondNum', '$location', 'PackageInfo','GlobalVar','UserM','$timeout', function ($scope, $http, $routeParams, SecondNum, $location, PackageInfo,GlobalVar,UserM,$timeout) {


}]);

/**
 * @ngdoc controller
 * @name packageContentController
 *
 * @description
 * 套餐详情控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */


controllers.controller('packageContentController', ['$scope', '$http', '$routeParams', 'SecondNum','$location', function ($scope, $http, $routeParams, SecondNum,$location) {

}]);






/**
 * @ngdoc controller
 * @name packageContentController
 *
 * @description
 * 广告宣传控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */


controllers.controller('adController', ['$scope', '$http', '$routeParams', 'SecondNum','$location','GlobalVar', function ($scope, $http, $routeParams, SecondNum,$location,GlobalVar) {

}]);






/**
 * @ngdoc controller
 * @name findpwdController
 *
 * @description
 * 找回密码控制器
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */


controllers.controller('findpwdController', ['$scope', '$http', '$routeParams', 'SecondNum', '$location','GlobalVar', function ($scope, $http, $routeParams, SecondNum, $location,GlobalVar) {


}]);


/**
 * @ngdoc controller
 * @name findpwdStep2Controller
 *
 * @description
 * 找回密码第二步控制器
 *
 * @param
 * @returns
 */


controllers.controller('findpwdStep2Controller', ['$scope', '$http', '$routeParams', 'SecondNum', '$location','GlobalVar','$cookieStore','UserM','$interval', function ($scope, $http, $routeParams, SecondNum, $location,GlobalVar,$cookieStore,UserM,$interval) {


}]);



/**
 * @ngdoc controller
 * @name findpwdStep3Controller
 *
 * @description
 * 找回密码第三步控制器
 *
 * @param
 * @returns
 */



controllers.controller('findpwdStep3Controller', ['$scope', '$http', '$routeParams', 'SecondNum', '$location','GlobalVar','$cookieStore','UserM','$myCookieStore', function ($scope, $http, $routeParams, SecondNum, $location,GlobalVar,$cookieStore,UserM,$myCookieStore) {

}]);




/**
 * @ngdoc controller
 * @name registerStep2Controller
 *
 * @description
 * 注册第二步控制器
 *
 * @param
 * @returns
 */


controllers.controller('registerStep2Controller', ['$scope', '$http', '$routeParams', 'SecondNum','GlobalVar','UserM','$location','$interval', function ($scope, $http, $routeParams, SecondNum,GlobalVar,UserM,$location,$interval) {

}]);



/**
 * @ngdoc controller
 * @name registerController
 *
 * @description
 * 注册控制器
 *
 * @param
 * @returns
 */

controllers.controller('registerController', ['$scope', '$http', '$routeParams', 'SecondNum', '$location','GlobalVar','$window','UserM',function ($scope, $http, $routeParams, SecondNum, $location,GlobalVar,$window,UserM) {



}]);


/**
 * @ngdoc controller
 * @name accountPrepaidController
 *
 * @description
 * 账户充值控制器
 *
 * @param
 * @returns
 */


controllers.controller('accountPrepaidController', ['$scope', '$http', 'UserM','GlobalVar', function ($scope, $http, UserM,GlobalVar) {


}]);


/**
 * @ngdoc controller
 * @name alipayPrepaidController
 *
 * @description
 * 支付宝支付控制器
 *
 * @param
 * @returns
 */

controllers.controller('alipayPrepaidController', ['$scope', '$http', 'UserM','GlobalVar', function ($scope, $http, UserM,GlobalVar) {

}]);


/**
 * @ngdoc controller
 * @name mobileCardPrepaidController
 *
 * @description
 * 充值卡控制器
 *
 * @param
 * @returns
 */

controllers.controller('mobileCardPrepaidController', ['$scope', '$http', 'UserM','GlobalVar', function ($scope, $http, UserM,GlobalVar) {

}]);



/**
 * @ngdoc controller
 * @name twoPrepaidController
 *
 * @description
 * 第二号码充值卡控制器
 *
 * @param
 * @returns
 */

controllers.controller('twoPrepaidController', ['$scope', '$http', 'UserM', '$location','GlobalVar', function ($scope, $http, UserM, $location,GlobalVar) {


}]);


/**
 * @ngdoc controller
 * @name changePwdController
 *
 * @description
 * 修改密码控制器
 *
 * @param
 * @returns
 */

controllers.controller('changePwdController', ['$scope', '$http', '$location','GlobalVar','UserM','$cookieStore','$myCookieStore', function ($scope, $http, $location,GlobalVar,UserM,$cookieStore,$myCookieStore) {

}]);


/**
 * @ngdoc controller
 * @name changePackageController
 *
 * @description
 * 修改套餐控制器
 *
 * @param
 * @returns
 */

controllers.controller('changePackageController', ['$scope', '$http', '$location', 'SecondNum', 'PackageInfo', 'UserM','GlobalVar','$timeout', function ($scope, $http, $location, SecondNum, PackageInfo, UserM,GlobalVar,$timeout) {

}]);




/**
 * @ngdoc controller
 * @name changePackageStep2Controller
 *
 * @description
 * 修改套餐第二步控制器
 *
 * @param
 * @returns
 */

controllers.controller('changePackageStep2Controller', ['$scope', '$http', '$location', 'SecondNum', 'PackageInfo', 'UserM','GlobalVar','$timeout', function ($scope, $http, $location, SecondNum, PackageInfo, UserM,GlobalVar,$timeout) {

}]);




controllers.controller('linkController', ['$scope', '$http', '$location', 'SecondNum', 'PackageInfo', 'UserM','GlobalVar','$timeout','$window','$myCookieStore', function ($scope, $http, $location, SecondNum, PackageInfo, UserM,GlobalVar,$timeout,$window,$myCookieStore) {

}]);







/**
 * @ngdoc controller
 * @name prepaidMessageController
 *
 * @description
 * 支付回调信息控制器
 *
 * @param
 * @returns
 */

controllers.controller('prepaidMessageController', ['$scope', '$http', '$location', 'SecondNum', 'PackageInfo', 'UserM','GlobalVar', function ($scope, $http, $location, SecondNum, PackageInfo, UserM,GlobalVar) {

}]);






/**
 * @ngdoc controller
 * @name loginController
 *
 * @description
 * 用户登录控制器
 *
 * @param
 * @returns
 */

controllers.controller('loginController', ['$scope', '$http', '$location', 'SecondNum', 'UserM', 'PackageInfo','GlobalVar','$window','$cookies','$myCookieStore','$interval', function ($scope, $http, $location, SecondNum, UserM, PackageInfo,GlobalVar,$window,$cookies,$myCookieStore,$interval) {

//
//
//    var tempGlobalConst=GlobalVar.getGlobalConst();
//    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
//    $scope.navClass.down="hide";
//    $scope.navClass.up="main_header_show";
//    $scope.setUpCenterNav("登录");
//    $scope.setUpRightNav("","");
//    $scope.setUpLeftNav("");
//
//    $scope.hostNumberKeyup=function()
//    {
//        /*
//        if($scope.user.hostNumber.length>11)
//        {
//            $scope.user.hostNumber=$scope.user.hostNumber.substr(0,11);
//        }
//        */
//    }
//    $scope.passWordKeyup=function()
//    {
//      /*  if($scope.user.password.length>8)
//        {
//            $scope.user.password=$scope.user.password.substr(0,8);
//
//        }
//        */
//
//    }
//
//
//
//
//
//    $scope.login = function (user) {
//
//
//        var tempValFn=GlobalVar.getGlobalFn();
//
//        var tempState=tempValFn.loginValFn(user);
//        if(tempState.isPass)
//        {
//            var htn = user.hostNumber;
//            var pwd = user.password;
//
//            var tempParams={
//                action:'userExist',
//                hostNumber:htn
//            };
//            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
//      //      $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userExist&hostNumber=' + htn).success(function (data) {
//
//                if (data.code == 0) {
//                    $scope.alertConfig(
//                        {
//                            okTitle:"免费注册",
//                            okUrl:"register",
//                            noTitle:"重新输入",
//                            titleTitle:"登录失败",
//                            msgTitle:"您输入的号码未注册，请重新输入或免费注册"
//                        });
//                    return;
//                }
//                else
//                {
//                    var tempParams={
//                        action:'userLogin',
//                        password:pwd,
//                        channelId:GlobalVar.getGlobalConst().CHANNELID,
//                        clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
//                         productId:GlobalVar.getGlobalConst().PRODUCTID,
//                        hostNumber:htn,
//                        imsi:"89860112241106400670",
//                        imei:"354589052131731",
//                        versionName:GlobalVar.getGlobalConst().VERSIONNAME
//                    };
//                    $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
//                 //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userLogin&hostNumber=' + htn + '&password=' + pwd+'&versionName=4.6.0&clientType=android&productId=1&channelId=12000&imsi=89860112241106400670&imei=354589052131731').success(function (data) {
//
//                        if(data=="result=1~-2")
//                        {
//                            $scope.alertConfig(
//                                {
//                                    titleTitle:"提示",
//                                    msgTitle:"您输入的密码错误，请重新输入",
//                                    noClass:"hide"
//                                });
//                            return;
//                        }
//                        else
//                        {
//                            var tempParams={
//                                action:'getUserInfo',
//                                password:pwd,
//                                productId:GlobalVar.getGlobalConst().PRODUCTID,
//                                hostNumber:htn
//                            };
//                            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
//
//                         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getUserInfo&hostNumber=' + htn + '&password=' + pwd + '&productId=1').success(function (data) {
//                                if(data.code=="0")
//                                {
//                                    var tempUserM=eval(data);
//                                    tempUserM.passWord=pwd;
//                                    tempUserM.isChange=false;
//                                    UserM.setUserInfo(tempUserM);
//                                    $myCookieStore.put("userMessage",eval(data));
//                                    if(data.bindNumberStatus==tempGlobalConst.bindNumberStatus.NUMBER_STATUS_IS_BOUND||data.bindNumberStatus=="2")
//                                    {
//                                        var tempParams={
//                                            action:'getSecondNumInfo',
//                                            password:pwd,
//
//                                            hostNumber:htn,
//                                            secondNum:data.bindNumber
//                                        };
//                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
//                                     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + data.bindNumber).success(function (dataS) {
//                                            var tempSecondNumberInfo=eval(dataS);
//                                            SecondNum.setAllSecondNumInfo(tempSecondNumberInfo);
//                                            $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo);
//                                            //      $scope.packageTypes = dataS.comboList;//普号套餐
//                                            //    PackageInfo.setPackageList(dataS.comboList);
//                                            //    $scope.mainBodyMsg.load="hide";
//
//                                        }).error(function (data, status, headers, config) {
//                                            $scope.alertConfig(
//                                                {
//                                                    noClass:"hide",
//                                                    titleTitle:"提示",
//                                                    msgTitle:"系统维护中"
//
//                                                });
//                                            return;
//                                        });
//                                    }
//
//                                    if(tempUserM.haveReserve)
//                                    {
//                                        var tempParams={
//                                            action:'getReservedSecondNum',
//                                            password:pwd,
//                                            //   channelId:GlobalVar.getGlobalConst().CHANNELID,
//                                            //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
//                                            //  productId:GlobalVar.getGlobalConst().PRODUCTID,
//                                            hostNumber:htn
//                                        //    secondNum:data.bindNumber
//                                        };
//                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
//                                     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + htn + '&password=' + pwd).success(function (dataR) {
//                                            var tempReserveInfo=eval(dataR);
//                                            tempReserveInfo.webIsHave=true;
//
//
//                                            SecondNum.setReserveInfo(tempReserveInfo);
//                                            $myCookieStore.put("reserveMessage",tempReserveInfo);
//                                            if(tempReserveInfo.numbers[0].secondNum!=""||tempReserveInfo.numbers[0].secondNum!=undefined)
//                                            {
//                                                var tempParams={
//                                                    action:'getSecondNumInfo',
//                                                    password:pwd,
//                                                    //   channelId:GlobalVar.getGlobalConst().CHANNELID,
//                                                    //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
//                                                    //  productId:GlobalVar.getGlobalConst().PRODUCTID,
//                                                    secondNum:tempReserveInfo.numbers[0].secondNum,
//                                                    hostNumber:htn
//                                                    //    secondNum:data.bindNumber
//                                                };
//                                                $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {
//
//                                              //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + tempReserveInfo.numbers[0].secondNum).success(function (dataRS) {
//
//                                                    var tempReserveSecondNumberInfo=eval(dataRS);
//                                                    SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
//                                                    $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);
//                                                    //      $scope.packageTypes = dataS.comboList;//普号套餐
//                                                    //    PackageInfo.setPackageList(dataS.comboList);
//                                                    //    $scope.mainBodyMsg.load="hide";
//                                                }).error(function (data, status, headers, config) {
//                                                    $scope.alertConfig(
//                                                        {
//                                                            noClass:"hide",
//                                                            titleTitle:"提示",
//                                                            msgTitle:"系统维护中"
//
//                                                        });
//                                                    return;
//                                                });
//                                            }
//                                        }).error(function (data, status, headers, config) {
//                                            $scope.alertConfig(
//                                                {
//                                                    noClass:"hide",
//                                                    titleTitle:"提示",
//                                                    msgTitle:"系统维护中"
//
//                                                });
//                                            return;
//                                        });
//
//                                    }
//
//
//                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
//                                }
//                            }).error(function (data, status, headers, config) {
//
//                                $scope.alertConfig(
//                                    {
//                                        noClass:"hide",
//                                        titleTitle:"提示",
//                                        msgTitle:"系统维护中"
//
//                                    });
//                                return;
//                            });
//
//
//                        }
//
//
//                    }).error(function (data, status, headers, config) {
//
//                        $scope.alertConfig(
//                            {
//                                noClass:"hide",
//                                titleTitle:"提示",
//                                msgTitle:"系统维护中"
//
//                            });
//                        return;
//                    });
//
//
//                }
//
//            }).error(function (data, status, headers, config) {
//
//                $scope.alertConfig(
//                    {
//                        noClass:"hide",
//                        titleTitle:"提示",
//                        msgTitle:"系统维护中"
//
//                    });
//                return;
//            });
//
//
//        }
//        else
//        {
//            $scope.alertConfig(
//                {
//                    noClass:"hide",
//                    titleTitle:"提示",
//                    msgTitle:tempState.msg
//
//                });
//        }
//
//
//
//
//
//
//    }
//
//    var tempUserM=UserM.getUserInfo();
//    if(tempUserM!=null)
//    {
//        if(UserM.getUserInfo().isChange)
//        {
//            var user=UserM.getUserInfo();
//            var tempUser={
//                password:user.passWord,
//                hostNumber:user.hostNumber
//            };
//            user.isChange=false;
//            UserM.setUserInfo(user);
//            $scope.login(tempUser);
//            return;
//        }
//
//    }
//
//
//    $scope.mainBodyMsg.load="hide";
//

}]);



/**
 * @ngdoc controller
 * @name bodyController
 *
 * @description
 * 主控制器
 *
 * @param
 * @returns
 */

controllers.controller('bodyController', ['$scope', '$http','$element','UserM','$location','PackageInfo','SecondNum','GlobalVar','$cookies','$myCookieStore', function ($scope, $http,$element,UserM,$location,PackageInfo,SecondNum,GlobalVar,$cookies,$myCookieStore) {





}]);
/*
controllers.controller('BalanceLogCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.pageNumber = 1;
    $scope.pageSize = 20;
    $scope.pageCount = 1;
    $scope.recordCount = 20;

    $scope.refreshData = function (page) {
        $http.get('http://127.0.0.1:8080/vp/api/user/getBalanceLog?appKey=2884686&page=' + page + '&size=10').success(function (data) {
            $scope.balanceLogs = data.list;
            $scope.pageNumber = data.pager.pageNumber;
            $scope.pageSize = data.pager.pageSize;
            $scope.pageCount = data.pager.pageCount;
            $scope.recordCount = data.pager.recordCount;
        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"

                });
            return;
        });
    };
    $scope.refreshData(0);
}]);
*/
