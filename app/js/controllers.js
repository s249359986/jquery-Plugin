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

    $scope.mainBodyMsg.load="show_float";
    var tempGlobalConst=GlobalVar.getGlobalConst();
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="main_footer_show";
    $scope.navClass.downLeft="nav_down_left_active";
    $scope.navClass.downCenter="nav_down_center_static";
    $scope.navClass.downRight="nav_down_right_static";

    $scope.setUpCenterNav("第二号码");
    $scope.setUpRightNav("","");
    $scope.setUpLeftNav("");
    $scope.setLeftNav("更多", "more");
    $scope.setRightNav("通话", "callNum");
    $scope.setCenterNav("第二号码", "myBill");

    //缓存数据维护开始
    var tempSecondNumInfo=SecondNum.getAllSeconNumInfo();
    GlobalVar.updateAllInfo($scope);
    var tempUserInfo=$scope.userMessage=UserM.getUserInfo();

    if(tempUserInfo.talkTimeStatus=="0")
    {
        $scope.userMessage.hClass="layout_vertical_inner layout_horizontal_outer css_text_horizontal_center css_text_center";
        $scope.userMessage.fClass="hide";
    }
    else
    {
        $scope.userMessage.hClass="hide";
        $scope.userMessage.fClass="layout_vertical_inner layout_horizontal_outer css_text_horizontal_center css_text_center";
    }
    if(tempUserInfo.isLogin)
    {
        if($scope.userMessage.bindNumberStatus=="3"&&$scope.userMessage.haveReserve)
        {
            $scope.userMessage.bindNumberStatusName="未绑定";
            $scope.userMessage.bindNumber=tempGlobalConst.secondReserve.value;
            $scope.isHaveNum="hide";
        }
        if($scope.userMessage.bindNumberStatus=="3"&&!$scope.userMessage.haveReserve)
        {
            $scope.userMessage.bindNumberStatusName="未绑定";
            $scope.userMessage.bindNumber=tempGlobalConst.noSecond.value;
            $scope.isHaveNum="hide";
        }
        if($scope.userMessage.bindNumberStatus=="0"||$scope.userMessage.bindNumberStatus=="2")
        {
            $scope.userMessage.bindNumberStatusName="正常";
            $scope.isHaveNum="css_margin_top css_background_color_white css_border_base";
        }

    }
    else
    {
        $scope.userMessage.bindNumberStatusName="";
        $scope.userMessage.bindNumber=tempGlobalConst.noLogin.value;
        $scope.isHaveNum="hide";

    }

    //缓存数据维护结束

    //begin 更新数据

(function()
{

    var user=UserM.getUserInfo();
    if(!user.isLogin) return;
    user.password=user.passWord;
    var tempValFn=GlobalVar.getGlobalFn();
    var tempState=tempValFn.loginValFn(user);
    if(tempState.isPass)
    {
        var htn = user.hostNumber;
        var pwd = user.passWord;
        var tempParams={
            action:'userExist',
            hostNumber:htn
        };
        $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
            if (data.code == 0) {
                $scope.alertConfig(
                    {
                        okTitle:"免费注册",
                        okUrl:"register",
                        noTitle:"重新输入",
                        titleTitle:"登录失败",
                        msgTitle:"您输入的号码未注册，请重新输入或免费注册"
                    });
                return;
            }
            else
            {
                var tempParams={
                    action:'userLogin',
                    password:pwd,
                    channelId:GlobalVar.getGlobalConst().CHANNELID,
                    clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                    productId:GlobalVar.getGlobalConst().PRODUCTID,
                    hostNumber:htn,
                    imsi:"89860112241106400670",
                    imei:"354589052131731",
                    versionName:GlobalVar.getGlobalConst().VERSIONNAME
                };
                $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                    //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userLogin&hostNumber=' + htn + '&password=' + pwd+'&versionName=4.6.0&clientType=android&productId=1&channelId=12000&imsi=89860112241106400670&imei=354589052131731').success(function (data) {

                    if(data=="result=1~-2")
                    {
                        $scope.alertConfig(
                            {
                                titleTitle:"提示",
                                msgTitle:"密码可能在其它地方更改请重新登录",
                                noClass:"hide",
                                fn:function(flag){
                                    if(flag)
                                    {
                                        $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                        return;
                                    }
                                }
                            });

                        return;
                    }
                    else
                    {
                        var tempParams={
                            action:'getUserInfo',
                            password:pwd,
                            productId:GlobalVar.getGlobalConst().PRODUCTID,
                            hostNumber:htn
                        };
                        $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                            //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getUserInfo&hostNumber=' + htn + '&password=' + pwd + '&productId=1').success(function (data) {
                            if(data.code=="0")
                            {
                                var tempUserM=eval(data);
                                tempUserM.passWord=pwd;
                                tempUserM.isChange=false;
                                UserM.setUserInfo(tempUserM);
                                $scope.userMessage=tempUserInfo=tempUserM;
                                if(tempUserInfo.talkTimeStatus=="0")
                                {
                                    $scope.userMessage.hClass="layout_vertical_inner layout_horizontal_outer css_text_horizontal_center css_text_center";
                                    $scope.userMessage.fClass="hide";

                                }
                                else
                                {
                                    $scope.userMessage.hClass="hide";
                                    $scope.userMessage.fClass="layout_vertical_inner layout_horizontal_outer css_text_horizontal_center css_text_center";
                                }

                                if($scope.userMessage.bindNumberStatus=="3"&&$scope.userMessage.haveReserve)
                                {
                                    $scope.userMessage.bindNumberStatusName="未绑定";
                                    $scope.userMessage.bindNumber=tempGlobalConst.secondReserve.value;
                                    $scope.isHaveNum="hide";
                                }
                                if($scope.userMessage.bindNumberStatus=="3"&&!$scope.userMessage.haveReserve)
                                {
                                    $scope.userMessage.bindNumberStatusName="未绑定";
                                    $scope.userMessage.bindNumber=tempGlobalConst.noSecond.value;
                                    $scope.isHaveNum="hide";
                                }
                                if($scope.userMessage.bindNumberStatus=="0"||$scope.userMessage.bindNumberStatus=="2")
                                {
                                    $scope.userMessage.bindNumberStatusName="正常";
                                    $scope.isHaveNum="css_margin_top css_background_color_white css_border_base";
                                }
                                $myCookieStore.put("userMessage",tempUserM);
                                if(data.bindNumberStatus==tempGlobalConst.bindNumberStatus.NUMBER_STATUS_IS_BOUND||data.bindNumberStatus=="2")
                                {
                                    var tempParams={
                                        action:'getSecondNumInfo',
                                        password:pwd,
                                        hostNumber:htn,
                                        secondNum:data.bindNumber
                                    };
                                    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
                                        //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + data.bindNumber).success(function (dataS) {
                                        var tempSecondNumberInfo1=tempSecondNumInfo=eval(dataS);
                                        SecondNum.setAllSecondNumInfo(tempSecondNumberInfo1);
                                        $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo1);

                                    }).error(function (data, status, headers, config) {
                                        $scope.alertConfig(
                                            {
                                                noClass:"hide",
                                                titleTitle:"提示",
                                                msgTitle:"系统维护中"

                                            });
                                        return;
                                    });
                                }

                                if(tempUserM.haveReserve)
                                {
                                    var tempParams={
                                        action:'getReservedSecondNum',
                                        password:pwd,
                                        hostNumber:htn

                                    };
                                    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
                                        //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + htn + '&password=' + pwd).success(function (dataR) {
                                        var tempReserveInfo=eval(dataR);
                                        tempReserveInfo.webIsHave=true;
                                        SecondNum.setReserveInfo(tempReserveInfo);
                                        $myCookieStore.put("reserveMessage",tempReserveInfo);
                                        if(tempReserveInfo.numbers[0].secondNum!=""||tempReserveInfo.numbers[0].secondNum!=undefined)
                                        {
                                            var tempParams={
                                                action:'getSecondNumInfo',
                                                password:pwd,
                                                secondNum:tempReserveInfo.numbers[0].secondNum,
                                                hostNumber:htn
                                            };
                                            $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {

                                                //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + tempReserveInfo.numbers[0].secondNum).success(function (dataRS) {

                                                var tempReserveSecondNumberInfo=eval(dataRS);
                                                SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
                                                $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);
                                                //      $scope.packageTypes = dataS.comboList;//普号套餐
                                                //    PackageInfo.setPackageList(dataS.comboList);
                                                //    $scope.mainBodyMsg.load="hide";
                                            }).error(function (data, status, headers, config) {
                                                $scope.alertConfig(
                                                    {
                                                        noClass:"hide",
                                                        titleTitle:"提示",
                                                        msgTitle:"系统维护中"

                                                    });
                                                return;
                                            });
                                        }
                                    }).error(function (data, status, headers, config) {
                                        $scope.alertConfig(
                                            {
                                                noClass:"hide",
                                                titleTitle:"提示",
                                                msgTitle:"系统维护中"

                                            });
                                        return;
                                    });

                                }


                                //    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                            }
                        }).error(function (data, status, headers, config) {

                            $scope.alertConfig(
                                {
                                    noClass:"hide",
                                    titleTitle:"提示",
                                    msgTitle:"系统维护中"

                                });
                            return;
                        });


                    }


                }).error(function (data, status, headers, config) {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"系统维护中"

                        });
                    return;
                });


            }

        }).error(function (data, status, headers, config) {

            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"

                });
            return;
        });


    }
    else
    {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:tempState.msg

            });
    }


}
        )();


 //   updateFormServece();//执行从服务器更新数据
    //end    更新数据
/*
    var tempUpdateUser={
        password:tempUserInfo.passWord,
        hostNumber:tempUserInfo.hostNumber
    };
*/
    $scope.clickSecondNum=function()
    {

        switch ($scope.userMessage.bindNumber)
        {
            case tempGlobalConst.secondReserve.value:

                $location.path(tempGlobalConst.secondReserve.url);
                return;
                break;
            case tempGlobalConst.noSecond.value:
                 $location.path(tempGlobalConst.noSecond.url);
                 return;
                 break;
            case tempGlobalConst.noLogin.value:

                $scope.alertConfig(
                    {
                        okTitle:"登录",
                        noTitle:"取消",
                        titleTitle:"提示",
                        msgTitle:"您尚未登录，请登录后发起操作！",
                        fn:function(flag)
                        {
                            if(flag)
                            {
                                $location.path(tempGlobalConst.noLogin.url);
                                return;
                            }
                            else
                            {
                                return;
                            }
                        }
                    });
                return;
                break;
            default :

                $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.SELECTNUM);
                return;
                break;
        }
    }

    $scope.clickChangePackage=function()
    {
        if(tempSecondNumInfo.reservedComboId=="")
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CHANGEPACKAGE);
        }
        else
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CHANGEPACKAGESTEP2);
        }

    }
    $scope.clAccountPrepaid=function()
    {
        if(tempUserInfo.isLogin)
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);
            return;
        }
        else
        {
            $scope.alertConfig(
                {
                    okTitle:"登录",
                    noTitle:"取消",
                    titleTitle:"提示",
                    msgTitle:"您尚未登录，请登录后发起操作！",
                    fn:function(flag)
                    {
                        if(flag)
                        {
                            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                            return;
                        }
                        else
                        {
                            return;
                        }
                    }
                });
            return;

        }


    }
    $scope.mainBodyMsg.load="hide";
}]);



controllers.controller('callNumController', ['$scope', '$http', '$window','UserM','GlobalVar','$interval', '$location','SecondNum','$myCookieStore', function ($scope, $http, $window,UserM,GlobalVar,$interval,$location,SecondNum,$myCookieStore) {

    $scope.mainBodyMsg.load="show_float";
    GlobalVar.updateAllInfo($scope);//更新数据
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("通话");
 //   $scope.setUpLeftNav("加入收藏");
    $scope.setUpLeftNav("");//加入相应文字可开启对应功能
    $scope.setUpRightNav("账户充值","accountPrepaid");
    $scope.setRightNav("第二号码", "myBill");
    $scope.setLeftNav("更多", "more");
    $scope.setCenterNav("通话", "callNum");

    $scope.navClass.down="main_footer_show";
    $scope.navClass.up="main_header_show";
    $scope.navClass.downLeft="nav_down_left_static";
    $scope.navClass.downCenter="nav_down_center_active";
    $scope.navClass.downRight="nav_down_right_static";


    $scope.navUpMessage.leftClass="nav_up_left css_text_center";



    var tempInfo=UserM.getUserInfo();
    var tempGlobalConst=GlobalVar.getGlobalConst();
    var hostNum=tempInfo.hostNumber;
    var pwd=tempInfo.passWord;
    var secondnum= tempInfo.bindNumber;
    var tempCallingNum=GlobalVar.getCallingNum();
    if(!tempInfo.isLogin)
    {
        $scope.msg={
            content0:"您尚未登录,请登录后进行拨打体验!",
            content1:"",
            styleClass1:"layout_vertical_inner css_text_vertical_center bg_img_binding"
        };

        $scope.getSecondNum=function()
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);

        }

    }
    else if(secondnum==""||secondnum==undefined)
    {
        $scope.msg={
            content0:"绑定二号才可发起呼叫,火速选号绑定使用吧!",
            content1:"",
            styleClass1:"layout_vertical_inner css_text_vertical_center bg_img_binding"
        };

        $scope.getSecondNum=function()
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.SELECTNUM);

        }

    }
    else
    {
        $scope.msg={
            content0:"呼叫后，需先接听平台来电，接通后再由系统为您呼叫对方",
            content1:"",
            styleClass1:"layout_vertical_inner css_text_vertical_center"
        };
    }


//begin 更新数据
    (
    function ()
    {

        var tempUser=UserM.getUserInfo();
        if(!tempUser.isLogin) return;
        var user={
            password:tempUser.passWord,
            hostNumber:tempUser.hostNumber
        };
        var tempValFn=GlobalVar.getGlobalFn();
        var tempState=tempValFn.loginValFn(user);
        if(tempState.isPass)
        {
            var htn =tempUser.hostNumber;
            var pwd = tempUser.passWord;
            var tempParams={
                action:'userExist',
                hostNumber:htn
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {


                if (data.code == 0) {
                    $scope.alertConfig(
                        {
                            okTitle:"免费注册",
                            okUrl:"register",
                            noTitle:"重新输入",
                            titleTitle:"登录失败",
                            msgTitle:"您输入的号码未注册，请重新输入或免费注册"
                        });
                    return;
                }
                else
                {
                    var tempParams={
                        action:'userLogin',
                        password:pwd,
                        channelId:GlobalVar.getGlobalConst().CHANNELID,
                        clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                        productId:GlobalVar.getGlobalConst().PRODUCTID,
                        hostNumber:htn,
                        imsi:"89860112241106400670",
                        imei:"354589052131731",
                        versionName:GlobalVar.getGlobalConst().VERSIONNAME
                    };
                    $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                        //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userLogin&hostNumber=' + htn + '&password=' + pwd+'&versionName=4.6.0&clientType=android&productId=1&channelId=12000&imsi=89860112241106400670&imei=354589052131731').success(function (data) {

                        if(data=="result=1~-2")
                        {
                            $scope.alertConfig(
                                {
                                    titleTitle:"提示",
                                    msgTitle:"密码可能在其它地方更改请重新登录",
                                    noClass:"hide",
                                    fn:function(flag){
                                        if(flag)
                                        {
                                            $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                            return;
                                        }
                                    }
                                });
                            return;
                        }
                        else
                        {
                            var tempParams={
                                action:'getUserInfo',
                                password:pwd,
                                productId:GlobalVar.getGlobalConst().PRODUCTID,
                                hostNumber:htn
                            };
                            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                                //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getUserInfo&hostNumber=' + htn + '&password=' + pwd + '&productId=1').success(function (data) {

                                if(data.code=="0")
                                {
                                    var tempUserM=eval(data);
                                    tempUserM.passWord=pwd;
                                    tempUserM.isChange=false;
                                    UserM.setUserInfo(tempUserM);
                                    $myCookieStore.put("userMessage",eval(data));

                                    var secondnum= tempUserM.bindNumber;
                                    if(secondnum==""||secondnum==undefined)
                                    {
                                        $scope.msg={
                                            content0:"绑定二号才可发起呼叫,火速选号绑定使用吧!",
                                            content1:"",
                                            styleClass1:"layout_vertical_inner css_text_vertical_center bg_img_binding"
                                        };

                                        $scope.getSecondNum=function()
                                        {
                                            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.SELECTNUM);

                                        }


                                    }
                                    else
                                    {
                                        $scope.msg={
                                            content0:"呼叫后，需先接听平台来电，接通后再由系统为您呼叫对方",
                                            content1:"",
                                            styleClass1:"layout_vertical_inner css_text_vertical_center"
                                        };
                                    }

                                    if(data.bindNumberStatus==tempGlobalConst.bindNumberStatus.NUMBER_STATUS_IS_BOUND||data.bindNumberStatus=="2")
                                    {
                                        var tempParams={
                                            action:'getSecondNumInfo',
                                            password:pwd,

                                            hostNumber:htn,
                                            secondNum:data.bindNumber
                                        };
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
                                            //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + data.bindNumber).success(function (dataS) {
                                            var tempSecondNumberInfo=eval(dataS);
                                            SecondNum.setAllSecondNumInfo(tempSecondNumberInfo);
                                            $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo);
                                            //      $scope.packageTypes = dataS.comboList;//普号套餐
                                            //    PackageInfo.setPackageList(dataS.comboList);
                                            //    $scope.mainBodyMsg.load="hide";

                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass:"hide",
                                                    titleTitle:"提示",
                                                    msgTitle:"系统维护中"

                                                });
                                            return;
                                        });
                                    }

                                    if(tempUserM.haveReserve)
                                    {
                                        var tempParams={
                                            action:'getReservedSecondNum',
                                            password:pwd,
                                            //   channelId:GlobalVar.getGlobalConst().CHANNELID,
                                            //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
                                            //  productId:GlobalVar.getGlobalConst().PRODUCTID,
                                            hostNumber:htn
                                            //    secondNum:data.bindNumber
                                        };
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
                                            //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + htn + '&password=' + pwd).success(function (dataR) {
                                            var tempReserveInfo=eval(dataR);
                                            tempReserveInfo.webIsHave=true;


                                            SecondNum.setReserveInfo(tempReserveInfo);
                                            $myCookieStore.put("reserveMessage",tempReserveInfo);
                                            if(tempReserveInfo.numbers[0].secondNum!=""||tempReserveInfo.numbers[0].secondNum!=undefined)
                                            {
                                                var tempParams={
                                                    action:'getSecondNumInfo',
                                                    password:pwd,
                                                    //   channelId:GlobalVar.getGlobalConst().CHANNELID,
                                                    //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
                                                    //  productId:GlobalVar.getGlobalConst().PRODUCTID,
                                                    secondNum:tempReserveInfo.numbers[0].secondNum,
                                                    hostNumber:htn
                                                    //    secondNum:data.bindNumber
                                                };
                                                $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {

                                                    //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + tempReserveInfo.numbers[0].secondNum).success(function (dataRS) {

                                                    var tempReserveSecondNumberInfo=eval(dataRS);
                                                    SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
                                                    $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);
                                                    //      $scope.packageTypes = dataS.comboList;//普号套餐
                                                    //    PackageInfo.setPackageList(dataS.comboList);
                                                    //    $scope.mainBodyMsg.load="hide";
                                                }).error(function (data, status, headers, config) {
                                                    $scope.alertConfig(
                                                        {
                                                            noClass:"hide",
                                                            titleTitle:"提示",
                                                            msgTitle:"系统维护中"

                                                        });
                                                    return;
                                                });
                                            }
                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass:"hide",
                                                    titleTitle:"提示",
                                                    msgTitle:"系统维护中"

                                                });
                                            return;
                                        });

                                    }


                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                                }
                            }).error(function (data, status, headers, config) {

                                $scope.alertConfig(
                                    {
                                        noClass:"hide",
                                        titleTitle:"提示",
                                        msgTitle:"系统维护中"

                                    });
                                return;
                            });


                        }


                    }).error(function (data, status, headers, config) {

                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:"系统维护中"

                            });
                        return;
                    });


                }

            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });


        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });
        }


    }

        )();
  //  updateFormServece();//执行从服务器更新数据
//end    更新数据



    var isYl=false;

    var tempParams={
        action:'getReservedSecondNum',
        hostNumber:hostNum,
        password:pwd
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
        //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + hostNum + '&password=' + pwd).success(function (data) {

        if(data.numbers[0]!=undefined)
        {
            var tempSecondnum= data.numbers[0].secondNum;
            if(tempSecondnum!=undefined)
            {
                isYl=true;
            }
        }
        else
        {
            isYl=false;
        }
    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中,刷新页面"
            });
    });



    var WAITTIME=30;//拨号等待时长


    if(waitTime==WAITTIME)
    {
        $scope.keybord = {
            num: tempCallingNum.num==undefined?"":tempCallingNum.num,
            message:"呼叫",
            messageClass:"call_btn_static"
        };
    }
    if(waitTime!=WAITTIME)
    {

        $scope.keybord = {
            num: tempCallingNum.num==undefined?"":tempCallingNum.num,
            message: "等待接听平台来电("+waitTime+")",
            messageClass:"call_btn_active"
        };
        $interval.cancel(promise);
        promise=$interval(function(){
            waitTime--;
            // GlobalVar.minus();//临时
            if(waitTime==0)
            {
                waitTime=WAITTIME;
                $interval.cancel(promise);
                $scope.num=tempCallingNum.num==undefined?"":tempCallingNum.num;
                $scope.keybord.message="呼叫";
                $scope.keybord.messageClass="call_btn_static";
            }
            else
            {
                $scope.num=tempCallingNum.num==undefined?"":tempCallingNum.num;
                $scope.keybord.message = "等待接听平台来电("+waitTime+")";
                $scope.keybord.messageClass="call_btn_active";
            }
        },1000);

    }


    $scope.addNum = function (keynum) {
        if($scope.keybord.num.length<20)
        {

            $scope.keybord.num = $scope.keybord.num + keynum;
            GlobalVar.setCallingNum({num:$scope.keybord.num});
            return;
        }
    }
    $scope.pluseNum = function () {
        var keyNum = $scope.keybord.num;
        if (keyNum.length == 0) return;
        else
        {
            $scope.keybord.num = keyNum.substr(0, keyNum.length - 1);
            GlobalVar.setCallingNum({num:$scope.keybord.num});
            return;
        }


    }
    var tempIsPassCheck=true;
    var tempPassCheckMsg="";
    var trimNum=function(num)
    {
        var reg0086 =/^[0][0][8][6]/;
        if(num.match(reg0086)!=null)
        {
            num=num.replace("0086","");
        }

        return num;
    }
    var checkNum=function(num)
    {
        tempIsPassCheck=true;
        tempPassCheckMsg="";
        var reg4_8 =/^[4|8][0][0]/;//开头不能是400或者800
        var reg168=/^[1][6][8]/;//开头不能是168
        var reg9=/^[9]/;//开头不能是9
        var reg95040=/^[9][5][0][4][0]/;//开头不能是95040
        var reg00=/^[0][0]/;//开头不能是00
        var reg12=/^[1][2]/;//开头不能是00
        //    var r= num.match(reg4_8);
        if(secondnum==""||secondnum==undefined)
        {
            tempIsPassCheck=false;
            tempPassCheckMsg="请先绑定二号";
            return tempIsPassCheck;
        }
        if(num==""||num==undefined)
        {
            tempIsPassCheck=false;
            tempPassCheckMsg="号码不能为空";
            return tempIsPassCheck;
        }
        if((num.match(reg4_8)!=null||num.match(reg168)!=null||num.match(reg9)!=null||num.match(reg00)!=null)&&num.match(reg95040)==null||num.match(reg12)!=null)
        {
            tempIsPassCheck=false;
            tempPassCheckMsg="对不起,禁止拨打此类号码";
            return tempIsPassCheck;

        }
        if(num.length>20||num.length<7)
        {

            tempIsPassCheck=false;
            tempPassCheckMsg="请输入7位以上20位以下的电话号码";
            return tempIsPassCheck;
        }
        if(num==hostNum)
        {
            tempIsPassCheck=false;
            tempPassCheckMsg="禁止呼叫本人手机号码";
            return tempIsPassCheck;
        }
        if(num==secondnum)
        {
            tempIsPassCheck=false;
            tempPassCheckMsg="禁止呼叫本人第二号码";
            return tempIsPassCheck;
        }
        return tempIsPassCheck;

    };

    $scope.callNum = function (keybord) {

        if(!tempInfo.isLogin)
        {
            $scope.alertConfig(
                {
                    okTitle: "登录",
                    noTitle: "取消",
                    titleTitle: "提示",
                    msgTitle: "您尚未登录请登录后发起此操作",
                    fn: function (isOk) {
                        if (isOk) {
                            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                            return;
                        }
                        else
                        {
                            return;
                        }
                    }
                });
            return;

        }
        else
        {
            var tempNum=trimNum(keybord.num);

            if(checkNum(tempNum))
            {
                GlobalVar.setCallingNum({num:tempNum});
                if(waitTime==WAITTIME)
                {
                    promise=$interval(function(){
                        waitTime--;
                        //   GlobalVar.minus();

                        if(waitTime==0)
                        {
                            waitTime=WAITTIME;
                            $interval.cancel(promise);
                            $scope.keybord.message="呼叫";
                            $scope.keybord.messageClass="call_btn_static";
                        }
                        else
                        {
                            $scope.keybord.message = "等待接听平台来电("+waitTime+")";
                            $scope.keybord.messageClass="call_btn_active";
                        }


                    },1000);

                    var partNum=tempNum;

                    var tempParams={
                        action:'confStart',
                        hostNumber:hostNum,
                        partyNumber:partNum,
                        password:pwd
                    };
                    $http({url:urlAdd+'/MCSSECNUM/conferencectrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                        //    $http.post(urlAdd+'/MCSSECNUM/conferencectrl?action=confStart&hostNumber='+hostNum+'&password=' +pwd+'&partyNumber='+partNum).success(function (data) {
                    }).error(function (data, status, headers, config) {
                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:"系统维护中"
                            });
                    });

                }

            }
            else
            {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:tempPassCheckMsg
                    });

            }


        }


    }

    $scope.mainBodyMsg.load="hide";
}]);


controllers.controller('moreController', ['$scope', '$http', '$location', 'UserM','$window','$cookieStore','GlobalVar','$myCookieStore', function ($scope, $http,$location,UserM,$window,$cookieStore,GlobalVar,$myCookieStore) {
 //   var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
   // document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Ff8999926ffc1bd1d0def4507e93eba75' type='text/javascript'%3E%3C/script%3E"));


    $scope.mainBodyMsg.load="show_float";
      GlobalVar.updateAllInfo($scope);//更新数据
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    var tempUser=UserM.getUserInfo();
    $scope.setUpCenterNav("更多");
    $scope.setUpLeftNav("");
    $scope.setUpRightNav("","");
    $scope.setRightNav("第二号码", "myBill");
    $scope.setLeftNav("通话", "callNum");
    $scope.setCenterNav("更多", "more");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="main_footer_show";
    $scope.navClass.downLeft="nav_down_left_static";
    $scope.navClass.downCenter="nav_down_center_static";
    $scope.navClass.downRight="nav_down_right_active";
    if(!tempUser.isLogin)
    {
        $scope.logoutBtnTitle="登录注册";
    }
    if(tempUser.isLogin)
    {
        $scope.logoutBtnTitle="退出登录";
    }


    /**
     * @ngdoc method
     * @name logout
     *
     * @description
     * 注销登录用户
     *
     * @param {string} key Id to use for lookup.
     * @returns {Object} Deserialized cookie value.
     */

    $scope.logout=function()
    {
        if(!tempUser.isLogin)
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
        }
        $scope.mainBodyMsg.load="show_float";

      //  UserM.clearAll();//清空用户信息
        var tempUserMessage=$myCookieStore.get("userMessage");
        if(tempUserMessage)
        {
            $myCookieStore.remove("userMessage");//清空cookies
           // UserM.setUserInfo(null);
            UserM.clearAll();
          var tempSecondNumberInfo=$myCookieStore.get("secondNumberMessage");
            if(tempSecondNumberInfo)
            {
                $myCookieStore.remove("secondNumberMessage");
              //  SecondNum.setAllSecondNumInfo(null);
            }
            var tempReserveInfo= $myCookieStore.get("reserveMessage");
              if(tempReserveInfo)
              {
                  $myCookieStore.remove("reserveMessage");
             //     SecondNum.setReserveInfo(null);
              }
        }

        var allPath=$location.absUrl().toString();
        var curPath=$location.url().toString();
        var allPathLength=$location.absUrl().toString().length;
        var curPathLength=$location.url().toString().length;
     //   $window.location.href="http://"+$location.host()+":8000/app/index.html";
        var goPath=allPath.substr(0,allPathLength-curPathLength-1);
        $scope.mainBodyMsg.load="hide";
      //  $window.location.href=goPath;//如果无法正常登录使用此登录
          $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
       return;

    }
    $scope.clickZFJS=function()
    {

      //  window.location.href="infoPage/zfjs.html";
        $window.open("infoPage/zfjs.html",'','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    }
    $scope.clickCJWT=function()
    {
      //  window.location.href="infoPage/cjwt.html";
        $window.open("infoPage/cjwt.html",'','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    }
    $scope.clickKHDXZ=function()
    {
      //  window.location.href="http://www.95040.net/fan.htm";
        $window.open("http://www.95040.net/fan.htm");

    }
    $scope.clickGZWX=function()
    {
      //  window.location.href="http://mp.weixin.qq.com/s?__biz=MjM5MzA1OTAyMQ==&mid=10019607&idx=1&sn=863864035760315183133f140c182ce6#rd";
        $window.open("http://mp.weixin.qq.com/s?__biz=MjM5MzA1OTAyMQ==&mid=10019607&idx=1&sn=863864035760315183133f140c182ce6#rd");
    }
    $scope.clickMMXG=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CHANGEPWD);
    }
    $scope.clickZHMM=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD);
    }

    $scope.mainBodyMsg.load="hide";
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

    $scope.mainBodyMsg.load="show_float";

    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.selectNum={
        num:"3元/月",
        title:"快速选号",
        imgNew:"layout_horizontal_inner_right bg_img_new"
    };
    var isYl=false;
    $scope.setUpCenterNav("快速选号");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("快速选号", "selectNum");
    $scope.navClass.down="hide";


    $scope.userMessage=UserM.getUserInfo();
   var tempUserInfo=UserM.getUserInfo();
    var tempReservSecondNum="";


    var oldPwd = $scope.userMessage.passWord;
    var hostNum = $scope.userMessage.hostNumber;
    var tempParams={
        action:'getReservedSecondNum',
        hostNumber:hostNum,
        password:oldPwd
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

  //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + hostNum + '&password=' + oldPwd).success(function (data) {
        if(data.numbers[0]!=undefined)
        {
           var tempSecondnum=tempReservSecondNum= data.numbers[0].secondNum;
            if(tempSecondnum!=undefined)
            {
                $scope.selectNum={
                    num:tempSecondnum,
                    title:"您的预留",
                    imgNew:"layout_horizontal_inner_right"
                };
                isYl=true;
            }
        }
        else
        {
            isYl=false;
        }
    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"
            });
        return;
    });
    var tempParams={
        action:'getNumberTypes',
        hostNumber:hostNum,
        password:oldPwd
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (NTdata) {
  //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getNumberTypes&hostNumber=' + hostNum + '&password=' + oldPwd).success(function (NTdata) {
        $scope.numTypes = NTdata.numberTypes;

      //  SecondNum.setAllNumberTypesInfo(eval(NTdata));
        $scope.mainBodyMsg.load="hide";
        SecondNum.setAllNumberTypesInfo(eval(NTdata));


    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"

            });
        return;
    });
    $scope.clickSearchNum=function()
    {
        var tempValue= $scope.searchInput.value;
        $location.path("numListSearch/"+tempValue+"/号码搜索");
    }
    $scope.getSecondNum=function()
    {

        if(!isYl) {

            if(tempUserInfo.userType=="1")
            {
                $scope.alertConfig(
                    {okTitle: "确定",
                        noClass:"hide",
                        titleTitle: "提示",
                        msgTitle: "对不起您目前绑定的第二号码为靓号，仅普号或无号用户可快速换号。",
                        fn: function (isOk) {
                            if(isOk)
                            {
                                return;
                            }
                        }});
                return;

            }
            else
            {
                var tempParams = {
                    action: 'quickChooseSecondNumber',
                    hostNumber: hostNum,
                    productId: GlobalVar.getGlobalConst().PRODUCTID,
                    password: oldPwd
                };
                $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {

                     var temp=eval(data);

                    if(temp.code=="0")
                    {
                        temp.webDescription=temp.comboInfo.description;
                        $scope.alertConfig(
                            {
                                okTitle: "确定",
                                noTitle: "取消",
                                titleTitle: "提示",
                                msgTitle: temp.webDescription,
                                fn: function (isOk) {
                                    if (isOk) {

                                        var tempParams = {
                                            action: 'quickBindSecondNumber',
                                            hostNumber: hostNum,
                                            productId: GlobalVar.getGlobalConst().PRODUCTID,
                                            secondNumber:temp.secondNumber,
                                            comboId:temp.comboInfo.comboId,
                                            password: oldPwd
                                        };
                                        $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {

                                            var data=eval(data);

                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.SUC)//快速选号成功
                                            {
                                                $scope.alertConfig(
                                                    {
                                                        noClass: "hide",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description,
                                                        fn: function (flag) {
                                                            if (flag) {
                                                                GlobalVar.updateAllInfo($scope);
                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                                return;
                                                            }
                                                        }
                                                    });
                                                return;
                                            }
                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.NOMONEY)//账户预存不足即将预留
                                            {
                                                $scope.alertConfig(
                                                    {
                                                        noClass: "hide",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description,
                                                        fn: function (flag) {
                                                            if (flag) {
                                                                GlobalVar.updateAllInfo($scope);

                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                            }

                                                        }
                                                    });
                                                return;
                                            }
                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.HAVEYL)//快速选号时预留情况
                                            {
                                                $scope.alertConfig(
                                                    {okTitle: "查看预留",
                                                        noTitle: "取消预留",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description,
                                                        fn: function (isOk) {

                                                            if (isOk) {
                                                                GlobalVar.updateAllInfo($scope);
                                                                $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYRESERVE);
                                                                return;
                                                            }
                                                            if (!isOk) {


                                                                var tempParams = {
                                                                    action: 'cancelSecondNum',
                                                                    hostNumber: hostNum,
                                                                    secondNum:tempReservSecondNum,//tempReserveNum
                                                                    password: oldPwd
                                                                };
                                                                $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {
                                                                    //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=cancelSecondNum&hostNumber=' + hostNum + '&password=' + pwd + '&secondNum=' + tempReserveNum).success(function (data) {
                                                                    if (data.code == "0") {
                                                                        var tempInfo = $scope.userMessage;
                                                                        tempInfo.isChange = true;
                                                                        UserM.setUserInfo(tempInfo);

                                                                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                                                        return;
                                                                    }
                                                                    else {

                                                                        $scope.alertConfig(
                                                                            {
                                                                                noClass: "hide",
                                                                                titleTitle: "提示",
                                                                                msgTitle: data.description

                                                                            });
                                                                    }

                                                                }).error(function (data, status, headers, config) {
                                                                    $scope.alertConfig(
                                                                        {
                                                                            noClass: "hide",
                                                                            titleTitle: "提示",
                                                                            msgTitle: "系统维护中"

                                                                        });
                                                                    return;
                                                                });


                                                            }
                                                            return;
                                                        }});

                                                return;

                                            }
                                            else {
                                                $scope.alertConfig(
                                                    {
                                                        noClass: "hide",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description
                                                    });
                                                return;
                                            }

                                            return;
                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass: "hide",
                                                    titleTitle: "提示",
                                                    msgTitle: "系统维护中"

                                                });
                                            return;
                                        });


                                    }
                                    if (!isOk) {
                                        return;
                                    }
                                }
                            });
                    }
                    if(temp.code=="1")
                    {
                        temp.webDescription=temp.comboInfo.description;


                        $scope.alertConfig(
                            {
                                okTitle: "确定",
                                noTitle: "取消",
                                titleTitle: "提示",
                                msgTitle: temp.webDescription,
                                fn: function (isOk) {
                                    if (isOk) {

                                        var tempParams = {
                                            action: 'quickBindSecondNumber',
                                            hostNumber: hostNum,
                                            productId: GlobalVar.getGlobalConst().PRODUCTID,
                                            secondNumber:temp.secondNumber,
                                            comboId:temp.comboInfo.comboId,
                                            password: oldPwd
                                        };
                                        $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {

                                            var data=eval(data);

                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.SUC)//快速选号成功
                                            {
                                                $scope.alertConfig(
                                                    {
                                                        noClass: "hide",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description,
                                                        fn: function (flag) {
                                                            if (flag) {
                                                                GlobalVar.updateAllInfo($scope);
                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                                return;
                                                            }
                                                        }
                                                    });
                                                return;
                                            }
                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.NOMONEY)//账户预存不足即将预留
                                            {
                                                $scope.alertConfig(
                                                    {
                                                        okTitle: "充值",
                                                        noTitle: "取消",
                                                        msgTitle: data.description,
                                                        fn: function (flag) {
                                                            if (flag) {
                                                                GlobalVar.updateAllInfo($scope);

                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);},500);
                                                            }
                                                            if (!flag) {
                                                                GlobalVar.updateAllInfo($scope);

                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                            }
                                                            return;
                                                        }
                                                    });
                                                return;
                                            }
                                            if (data.code =="-1")//账户预存不足即将预留
                                            {
                                                $scope.alertConfig(
                                                    {
                                                        okTitle: "充值",
                                                        noTitle: "取消",
                                                        msgTitle: data.description,
                                                        fn: function (flag) {
                                                            if (flag) {
                                                                GlobalVar.updateAllInfo($scope);

                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);},500);
                                                            }
                                                            if (!flag) {
                                                                GlobalVar.updateAllInfo($scope);

                                                                $timeout(function(){$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                            }
                                                            return;
                                                        }
                                                    });
                                                return;
                                            }
                                            if (data.code == GlobalVar.getGlobalConst().QUICKBINDSECONDNUMBER_CODE.HAVEYL)//快速选号时预留情况
                                            {
                                                $scope.alertConfig(
                                                    {okTitle: "查看预留",
                                                        noTitle: "取消预留",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description,
                                                        fn: function (isOk) {

                                                            if (isOk) {
                                                                GlobalVar.updateAllInfo($scope);
                                                                $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYRESERVE);
                                                                return;
                                                            }
                                                            if (!isOk) {


                                                                var tempParams = {
                                                                    action: 'cancelSecondNum',
                                                                    hostNumber: hostNum,
                                                                    secondNum:tempReservSecondNum,//tempReserveNum
                                                                    password: oldPwd
                                                                };
                                                                $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {
                                                                    //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=cancelSecondNum&hostNumber=' + hostNum + '&password=' + pwd + '&secondNum=' + tempReserveNum).success(function (data) {
                                                                    if (data.code == "0") {
                                                                        var tempInfo = $scope.userMessage;
                                                                        tempInfo.isChange = true;
                                                                        UserM.setUserInfo(tempInfo);

                                                                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                                                        return;
                                                                    }
                                                                    else {

                                                                        $scope.alertConfig(
                                                                            {
                                                                                noClass: "hide",
                                                                                titleTitle: "提示",
                                                                                msgTitle: data.description

                                                                            });
                                                                    }

                                                                }).error(function (data, status, headers, config) {
                                                                    $scope.alertConfig(
                                                                        {
                                                                            noClass: "hide",
                                                                            titleTitle: "提示",
                                                                            msgTitle: "系统维护中"

                                                                        });
                                                                    return;
                                                                });


                                                            }
                                                            return;
                                                        }});

                                                return;

                                            }
                                            else {
                                                $scope.alertConfig(
                                                    {
                                                        noClass: "hide",
                                                        titleTitle: "提示",
                                                        msgTitle: data.description
                                                    });
                                                return;
                                            }

                                            return;
                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass: "hide",
                                                    titleTitle: "提示",
                                                    msgTitle: "系统维护中"

                                                });
                                            return;
                                        });


                                    }
                                    if (!isOk) {
                                        return;
                                    }
                                }
                            });

                    }







                }).error(function (data, status, headers, config) {
                    $scope.alertConfig(
                        {
                            noClass: "hide",
                            titleTitle: "提示",
                            msgTitle: "系统维护中"

                        });
                    return;
                });




            }



        }



        else
        {

            $scope.alertConfig(
                {okTitle: "查看预留",
                    noTitle: "取消预留",
                    titleTitle: "提示",
                    msgTitle:"您有预留",
                    fn: function (isOk) {

                        if (isOk) {
                            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYRESERVE);
                            return;
                        }
                        if (!isOk) {

                            var tempParams = {
                                action: 'cancelSecondNum',
                                hostNumber: hostNum,
                                secondNum:tempReservSecondNum,//tempReserveNum
                                password: oldPwd
                            };
                            $http({url: urlAdd + '/MCSSECNUM/clientctrl?', method: GlobalVar.getGlobalConst().METHODNAME, params: tempParams}).success(function (data) {
                                //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=cancelSecondNum&hostNumber=' + hostNum + '&password=' + pwd + '&secondNum=' + tempReserveNum).success(function (data) {


                                if (data.code == "0") {
                                    var tempInfo = $scope.userMessage;
                                    tempInfo.isChange = true;
                                    UserM.setUserInfo(tempInfo);

                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                    return;
                                }
                                else {

                                    $scope.alertConfig(
                                        {
                                            noClass: "hide",
                                            titleTitle: "提示",
                                            msgTitle: data.description

                                        });
                                }


                            }).error(function (data, status, headers, config) {
                                $scope.alertConfig(
                                    {
                                        noClass: "hide",
                                        titleTitle: "提示",
                                        msgTitle: "系统维护中"

                                    });
                                return;
                            });




                        }
                        return;
                    }});

            return;




        }










    }
    $scope.clRq=function(index)
    {

      var tempAllNumberTypesInfo= SecondNum.getAllNumberTypesInfo();
        for(var i=0;i<$scope.numTypes.length;i++)
        {
            if(index==i)
            {
                $scope.numTypes[i].webIsSelect=true;
                continue;
            }
            else
            {
                $scope.numTypes[i].webIsSelect=false;
            }

        }
        tempAllNumberTypesInfo.numberTypes= $scope.numTypes;
        SecondNum.setAllNumberTypesInfo(tempAllNumberTypesInfo);
        $location.path("numList/"+ $scope.numTypes[index].id+"/"+ $scope.numTypes[index].name);


    }

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
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;

    $scope.mainBodyMsg.load="show_float";

    //   $.scope.msg.load


    var tempName = $routeParams.name;
    $scope.setUpCenterNav(tempName);
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.userMessage=UserM.getUserInfo();
    var oldPwd = $scope.userMessage.passWord;
    var hostNum = $scope.userMessage.hostNumber;
    var typeId = $routeParams.id;

    var tempAllNumberTypesInfo=SecondNum.getAllNumberTypesInfo();
    var len=tempAllNumberTypesInfo.numberTypes.length;
    var tempNumberTypes=tempAllNumberTypesInfo.numberTypes;
    for(var i=0;i<len;i++)//初始化号码类型窗口列表
    {
        if(tempNumberTypes[i].webIsSelect)
        {
            var temp=tempNumberTypes[i].setTypes;
            for(var j=0;j<temp.length;j++)
            {
                temp[j].fontColor="css_color_white";
            }
            $scope.numTypes=temp;
            break;
        }
    }
    var tempIsShow=false;
    $scope.numTypeObj={
        class:"hide",
        imgSrc:"img/triangleDown.png",
        title:"组合方式"
    };
    $scope.clShowSelNumType=function()
    {
        if(!tempIsShow)
        {
            $scope.numTypeObj.class="win_num_type css_circle";
            $scope.numTypeObj.imgSrc="img/triangleUp.png";
            tempIsShow=true;
        }
        else
        {
            $scope.numTypeObj.class="hide";
            $scope.numTypeObj.imgSrc="img/triangleDown.png";
            tempIsShow=false;
        }

    };
    var setTypeId=0;



    function getSecondNumsPost(tempParams)//获得号码列表
    {

        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
            //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNums&hostNumber=' + hostNum + '&password=' + oldPwd + '&numberType=' + typeId + '&count=10'+"&setType="+id).success(function (data) {

            $scope.numLists = data.numbers;
            if(data.numbers==undefined)
            {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"暂无号码"

                    });
            }
            $scope.mainBodyMsg.load="hide";

        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"

                });
            return;
        });

    }



    $scope.clSelectedType=function(index)
    {
        var tempNumTypes=$scope.numTypes;
        var tempSelectNumType;
        var tempSelectedNumType;
        for(var i=0;i<tempNumTypes.length;i++)
        {
            if(i==index)
            {
                tempSelectedNumType=tempNumTypes[i];
                tempSelectedNumType.fontColor="numType_font";

            }
            else
            {
                tempSelectNumType=tempNumTypes[i];
                tempSelectNumType.fontColor="css_color_white";
            }

        }
        var id=setTypeId=tempSelectedNumType.id;
        var name=tempSelectedNumType.name;



        $scope.mainBodyMsg.load="show_float";
        $scope.numTypeObj.class="hide";
        $scope.numTypeObj.imgSrc="img/triangleDown.png";
        $scope.numTypeObj.title=name;
        tempIsShow=false;

        var tempParams={
            action:'getSecondNums',
            hostNumber:hostNum,
            numberType:typeId,
            count:GlobalVar.getGlobalConst().NUMBER_LIST_COUNT,
            setType:id,
            password:oldPwd
        };
        getSecondNumsPost(tempParams);

    };



    var tempParams={
        action:'getSecondNums',
        hostNumber:hostNum,
        numberType:typeId,
        count:GlobalVar.getGlobalConst().NUMBER_LIST_COUNT,
        password:oldPwd
    };


    getSecondNumsPost(tempParams);




    $scope.mySlide = function () {
        $scope.mainBodyMsg.load="show_float";
        var tempParams={
            action:'getSecondNums',
            hostNumber:hostNum,
            numberType:typeId,
            count:GlobalVar.getGlobalConst().NUMBER_LIST_COUNT,
            setType:setTypeId,
            password:oldPwd
        };
        getSecondNumsPost(tempParams);


    }


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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    var tempName = $routeParams.name;
    $scope.setUpCenterNav(tempName);
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.mainBodyMsg.load="show_float";
    $scope.userMessage=UserM.getUserInfo();
    var oldPwd = $scope.userMessage.passWord;
    var hostNum = $scope.userMessage.hostNumber;
    var typeId = $routeParams.id;

    function getSecondNumsPost(tempParams)//获得号码列表
    {

        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
            //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNums&hostNumber=' + hostNum + '&password=' + oldPwd + '&numberType=' + typeId + '&count=10'+"&setType="+id).success(function (data) {
            $scope.numLists = data.numbers;
            if(data.numbers==undefined)
            {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"暂无号码"
                    });
            }
            $scope.mainBodyMsg.load="hide";

        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"

                });
            return;
        });

    }


    var tempParams={
        action:'getSecondNums',
        hostNumber:hostNum,
        favourNum:typeId,
        count:GlobalVar.getGlobalConst().NUMBER_LIST_COUNT,
        password:oldPwd
    };
    getSecondNumsPost(tempParams);
    $scope.mySlide = function () {
        $scope.mainBodyMsg.load="show_float";
        var tempParams={
            action:'getSecondNums',
            hostNumber:hostNum,
            favourNum:typeId,
            count:GlobalVar.getGlobalConst().NUMBER_LIST_COUNT,
            password:oldPwd
        };
        getSecondNumsPost(tempParams);

    }


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

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;


    $scope.navClass.up="hide";
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("预留号码");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    var tempInfo=UserM.getUserInfo();
    var hostNum=tempInfo.hostNumber;
    var pwd=tempInfo.passWord;
    var secondNum=tempInfo.bindNumber;
    var tempReseveInfo=SecondNum.getReserveInfo();
    var tempReseveNum="";
    if(tempInfo.haveReserve)
    {
        tempReseveNum=tempReseveInfo.numbers[0].secondNum;
    }
    var tempParams={
        action:'getSecondNumInfo',
        hostNumber:hostNum,
        secondNum:tempReseveNum,
        productId:GlobalVar.getGlobalConst().PRODUCTID,
        password:pwd
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
  //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + hostNum + '&password=' + pwd+'&productId=1&secondNum='+tempReseveNum).success(function (data) {

        var tempSecondnum= data.secondNum;

        $scope.selectNum={
            num:tempSecondnum,
            title:"预留号码"
        };
        $scope.r={
            reserveTime:data.reserveTime,
            package:data.numberType.name
        };
        $scope.navClass.up="main_header_show";
    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"

            });
        return;
    });
    $scope.clickRemoveReserve=function()
    {
        $scope.mainBodyMsg.load="show_float";
        var tempParams={
            action:'getReservedSecondNum',
            hostNumber:hostNum,
            password:pwd
        };
        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + hostNum + '&password=' + pwd).success(function (data) {

            if(data.numbers!=undefined)
            {

                if(data.numbers[0]!=undefined)
                {
                    var tempReserveNum= data.numbers[0].secondNum;
                    if(tempReserveNum!=undefined)
                    {

                        var tempParams={
                            action:'cancelSecondNum',
                            hostNumber:hostNum,
                            secondNum:tempReserveNum,
                            password:pwd
                        };
                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=cancelSecondNum&hostNumber=' + hostNum + '&password=' + pwd + '&secondNum=' + tempReserveNum).success(function (data) {

                            if(data.code=="0")
                            {

                                //tempInfo.isChange=true;
                              //  UserM.setUserInfo(tempInfo);
                            //    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                GlobalVar.updateAllInfo($scope);
                                $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                              //  $timeout(function(){ },500);

                                return;
                            }
                            else
                            {

                                $scope.alertConfig(
                                    {
                                        noClass:"hide",
                                        titleTitle:"提示",
                                        msgTitle:data.description
                                    });
                            }
                        }).error(function (data, status, headers, config) {
                            $scope.alertConfig(
                                {
                                    noClass:"hide",
                                    titleTitle:"提示",
                                    msgTitle:"系统维护中"

                                });
                            return;
                        });

                    }
                }


            }

        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"

                });
            return;
        });

    }
    $scope.clickAccountPrepaid=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);
    }

    $scope.mainBodyMsg.load="hide";
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

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.userMessage=UserM.getUserInfo();
    $scope.setUpCenterNav("选择套餐");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    var tempSelectedNum = $scope.selectedNum = $routeParams.secondNum;
    var oldPwd = $scope.userMessage.passWord;
    var hostNum = $scope.userMessage.hostNumber;
    var selectedPackage ={};
    var tempParams={
        action:'getSecondNumInfo',
        hostNumber:hostNum,
        secondNum:tempSelectedNum,
        password:oldPwd
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {

  //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + hostNum + '&password=' + oldPwd + '&secondNum=' + tempSelectedNum).success(function (dataS) {
        var tempPackageTypes=dataS.comboList;
        for(var i=0;i<tempPackageTypes.length;i++)
        {
            if(i==0)
            {
                tempPackageTypes[i].cls="layout_horizontal_inner_left_package_active";
                continue;
            }
            tempPackageTypes[i].cls="layout_horizontal_inner_left_package_static";
        }
        $scope.packageTypes = tempPackageTypes;//普号套餐
        selectedPackage = $scope.packageTypes[0];
        PackageInfo.setPackageList(tempPackageTypes);
        $scope.mainBodyMsg.load="hide";

    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"

            });
        return;
    });


    /**
     * @ngdoc method
     * @name clSelectPackage
     *
     * @description
     * 单击套菜类别选项文字变化
     *
     * @param {string} index
     * @returns {Object} Deserialized cookie value.
     */
    $scope.clSelectPackage = function (index) {

        for(var i=0;i<$scope.packageTypes.length;i++)
        {
            if(i==index)
            {
                $scope.packageTypes[i].cls="layout_horizontal_inner_left_package_active";
                continue;
            }
            $scope.packageTypes[i].cls="layout_horizontal_inner_left_package_static";
        }

        selectedPackage = $scope.packageTypes[index];
        SecondNum.setSecondNumInfo(selectedPackage);
    };
    /**
     * @ngdoc method
     * @name clSelectPackageContent
     *
     * @description
     * 单击套菜显示套餐详情页面
     *
     * @param {string} index
     * @returns {Object} Deserialized cookie value.
     */
    $scope.clSelectPackageContent=function(index)
    {
        selectedPackage = $scope.packageTypes[index];
        SecondNum.setSecondNumInfo(selectedPackage);
        $location.path("packageContent");
       // $scope.packageTypes[index]
    }
//$scope.packageTypes=data.comboList;

    $scope.clickSure = function () {
        $scope.alertConfig(
            {
                okTitle:"确定",
                noTitle:"取消",
                titleTitle:"提示",
                msgTitle:"确定绑定",
                fn:function(isOk)
                {
                    if(isOk)
                    {
                        $scope.mainBodyMsg.load="show_float";
                        if (selectedPackage.comboId != null) {
                            var comboId = selectedPackage.comboId;
                            var tempParams={
                                action:'chooseSecondNum',
                                hostNumber:hostNum,
                                secondNum:tempSelectedNum,
                                comboId:comboId,
                                password:oldPwd
                            };
                            $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                           // $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=chooseSecondNum&hostNumber=' + hostNum + '&password=' + oldPwd + '&secondNum=' + tempSelectedNum + '&comboId=' + comboId).success(function (data) {

                                if (data.code == GlobalVar.getGlobalConst().CHOOSESECONDNUM_CODE.SUC) {
                                    $scope.alertConfig(
                                        {
                                            noClass:"hide",
                                            titleTitle:"提示",
                                            msgTitle:data.description,
                                            fn:function(flag)
                                            {

                                                if(flag)
                                                {

                                                  //  var tempUserm=UserM.getUserInfo();
                                                    //tempUserm.isChange=true;
                                                  //  GlobalVar.updateAllInfo($scope);
                                                  //  $timeout(function(){ $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);

                                                    return;
                                                }
                                            }

                                        });
//                                    var tempUserm=UserM.getUserInfo();
//                                    tempUserm.isChange=true;
//                                    $location.path("myBill");
                                    return;
                                    //   $location.path("packageContent");
                                }
                                if (data.code == "1") {
                                    $scope.alertConfig(
                                        {
                                            noClass:"hide",
                                            titleTitle:"提示",
                                            msgTitle:data.description,
                                            fn:function(flag)
                                            {

                                                if(flag)
                                                {
                                                    //  var tempUserm=UserM.getUserInfo();
                                                    //tempUserm.isChange=true;
                                                    GlobalVar.updateAllInfo($scope);
                                                    $timeout(function(){ $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);

                                                    return;
                                                }
                                            }

                                        });
                                //    var tempUserm=UserM.getUserInfo();
                                  //  tempUserm.isChange=true;
                                    //$location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                    return;
                                }
                                if (data.code == GlobalVar.getGlobalConst().CHOOSESECONDNUM_CODE.HAVEYL) {

                                    $scope.alertConfig(
                                        {okTitle:"查看预留",
                                            noTitle:"取消预留",
                                            titleTitle:"登录失败",
                                            msgTitle:data.description,
                                            fn:function(isOk){

                                                if(isOk)
                                                {
                                                    GlobalVar.updateAllInfo($scope);
                                                    $timeout(function(){ $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYRESERVE);},500);

                                                //    $location.path("myReserve");
                                                    return;
                                                }
                                                if(!isOk)
                                                {
                                                    var tempParams={
                                                        action:'getReservedSecondNum',
                                                        hostNumber:hostNum,
                                                        password:oldPwd
                                                    };
                                                    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                                                        //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + hostNum + '&password=' + pwd).success(function (data) {

                                                        if(data.numbers!=undefined)
                                                        {

                                                            if(data.numbers[0]!=undefined)
                                                            {
                                                                var tempReserveNum= data.numbers[0].secondNum;
                                                                if(tempReserveNum!=undefined)
                                                                {

                                                                    var tempParams={
                                                                        action:'cancelSecondNum',
                                                                        hostNumber:hostNum,
                                                                        secondNum:tempReserveNum,
                                                                        password:oldPwd
                                                                    };
                                                                    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                                                                        //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=cancelSecondNum&hostNumber=' + hostNum + '&password=' + pwd + '&secondNum=' + tempReserveNum).success(function (data) {

                                                                        if(data.code=="0")
                                                                        {
                                                                         //   var tempInfo=$scope.userMessage;

                                                                           // tempInfo.isChange=true;
                                                                            //UserM.setUserInfo(tempInfo);

                                                                          //  $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                                                            GlobalVar.updateAllInfo($scope);
                                                                            $timeout(function(){ $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},500);
                                                                            return;
                                                                        }
                                                                        else
                                                                        {

                                                                            $scope.alertConfig(
                                                                                {
                                                                                    noClass:"hide",
                                                                                    titleTitle:"提示",
                                                                                    msgTitle:data.description

                                                                                });
                                                                        }


                                                                    }).error(function (data, status, headers, config) {
                                                                        $scope.alertConfig(
                                                                            {
                                                                                noClass:"hide",
                                                                                titleTitle:"提示",
                                                                                msgTitle:"系统维护中"

                                                                            });
                                                                        return;
                                                                    });


                                                                }
                                                            }


                                                        }

                                                    }).error(function (data, status, headers, config) {
                                                        $scope.alertConfig(
                                                            {
                                                                noClass:"hide",
                                                                titleTitle:"提示",
                                                                msgTitle:"系统维护中"

                                                            });
                                                        return;
                                                    });


                                                }
                                                return;
                                            }});

                                    return;

                                }
                                else {

                                    $scope.alertConfig(
                                        {
                                            noClass:"hide",
                                            titleTitle:"提示",
                                            msgTitle:data.description

                                        });
                                    return;
                                }

                            }).error(function (data, status, headers, config) {
                                $scope.alertConfig(
                                    {
                                        noClass:"hide",
                                        titleTitle:"提示",
                                        msgTitle:"系统维护中"

                                    });
                                return;
                            });
                        }

                    }
                    if(!isOk)
                    {

                        return;
                    }
                    return;
                }

            });

    }


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
    $scope.mainBodyMsg.load="show_float";
    var info = SecondNum.getSeconNumInfo();
    $scope.setUpCenterNav(info.comboName);
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.packageTariff = info.extraInfo;
    $scope.mainBodyMsg.load="hide";
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

    $scope.mainBodyMsg.load="show_float";

 //   var tempGlobalConst=GlobalVar.getGlobalConst();
   // var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.down="hide";
    $scope.navClass.up="hide";
    $scope.setUpCenterNav("");
    $scope.setUpRightNav("","");
    $scope.setUpLeftNav("");
    $scope.adImgSrc="img/ad.png";

/*
*
*点击事件
*
*
*
*
*
* */
    $scope.clLogin=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
    }
    $scope.clRegister=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER);
    }
    $scope.clSee=function()
    {
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
    }



    $scope.mainBodyMsg.load="hide";
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


    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("找回密码");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.clickSure = function (user) {

        var tempValFn=GlobalVar.getGlobalFn();

        var tempState=tempValFn.telNumValFn(user);
        if(tempState.isPass)
        {

            var hostNumber = user.smscode;
            var tempParams={
                action:'getAuthCode',
                hostNumber:hostNumber,
                type:"0"
            };
           $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getAuthCode&hostNumber=' + hostNumber + '&type=0').success(function (data) {

                if (data.code == 0) {
                    //  alert("验证码已发送注意查收");
                    $location.path("findpwdStep2/" + hostNumber);
                }
                else {
                    $scope.alertConfig(
                        {okTitle:"免费注册",
                            okUrl:"register",
                            noTitle:"重新输入",
                            noUrl:"",
                            titleTitle:"登录失败",
                            msgTitle:data.description

                        });

                }
            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });

        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });

        }

    }

    $scope.mainBodyMsg.load="hide";
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

    $scope.resms={
        class:"css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top",
        title:"重新获取验证码"
    };

 //   $interval.cancel(promise);
var isWaiting=true;
var findpwdStep2WaitTime=60;
  var  findpwdStep2Promise=$interval(function(){
        findpwdStep2WaitTime--;
       isWaiting=true;

        if(findpwdStep2WaitTime==0)
        {
            findpwdStep2WaitTime=60;
            $interval.cancel(findpwdStep2Promise);
            isWaiting=false;
            $scope.resms.title = "重新获取验证码";
            $scope.resms.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
        }
        else
        {
            $scope.resms.title = "重新获取验证码("+findpwdStep2WaitTime+")";
            $scope.resms.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
        }
    },1000);




    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("找回密码");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    var hostNumber = $routeParams.hostNumber;
    UserM.setUserInfo({hostNumber:hostNumber});
    $scope.ngclickResmsFindpwd2 = function () {
        if(!isWaiting)
        {

            if (hostNumber == undefined) {
                $scope.alertConfig(
                    {
                        noClass:"hide",

                        titleTitle:"提示",
                        msgTitle:"手机号不能为空"

                    });
                return;

            }
            else {

                var tempParams={
                    action:'getAuthCode',
                    hostNumber:hostNumber,
                    type:"0"
                };
                $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
              //  $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getAuthCode&hostNumber=' + hostNumber + '&type=0').success(function (data) {
                    if (data.code == 0) {

                        isWaiting=true;
                /*        $scope.resms={
                            class:"css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top",
                            title:"重新获取验证码"
                        };
                        */

                        findpwdStep2Promise=$interval(function(){
                            findpwdStep2WaitTime--;
                            isWaiting=true;
                            // GlobalVar.minus();//临时
                            if(findpwdStep2WaitTime==0)
                            {
                                isWaiting=false;
                                findpwdStep2WaitTime=60;
                                $interval.cancel(findpwdStep2Promise);
                                $scope.resms.title = "重新获取验证码";
                                $scope.resms.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
                            }
                            else
                            {
                                $scope.resms.title = "重新获取验证码("+findpwdStep2WaitTime+")";
                                $scope.resms.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
                            }
                        },1000);

                        $scope.alertConfig(
                            {
                                noClass:"hide",

                                titleTitle:"提示",
                                msgTitle:"验证码已发送注意查收"

                            });



                        //  alert("成功");
                      //  alert(data.description);
                    }
                    else {

                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:data.description

                            });
                    }
                }).error(function (data, status, headers, config) {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"系统维护中"

                        });
                    return;
                });

            }


        }

    }
    $scope.clickSure = function (user) {
        if (user == undefined || user.smscode == undefined||user.smscode=="") {
            $scope.alertConfig(
                {
                    noClass:"hide",

                    titleTitle:"提示",
                    msgTitle:"有未填项,未选项或特殊字符"

                });
           // alert("有未填项,未选项或特殊字符");
            return;

        }
        else
        {
            $location.path("findpwdStep3/" + user.smscode);
        }

/*
        if (user == undefined || user.smscode == undefined || user.password == undefined || hostNumber == undefined) {
            alert("有未填项或未选项");
            return;

        }
        else {

            var authcode = user.smscode;
            var pwd = user.password;
            $http.post(urlAdd+'/MCSSECNUM/userctrl?action=pwdReset&hostNumber=' + hostNumber + '&authcode=' + authcode + '&newPassword=' + pwd).success(function (data) {

                if (data == "result=0")
                {

                    var tempInfo=UserM.getUserInfo();

                    if(tempInfo.passWord==undefined||tempInfo.passWord=="")
                    {
                        alert("密码设定成功");
                        var user={
                            passWord:pwd,
                            hostNumber:hostNumber,
                            isChange:true
                        };
                        UserM.setUserInfo(user);
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                        return;
                    }
                    else
                    {
                        tempInfo.passWord = pwd;
                        tempInfo.isChange=true;
                        UserM.setUserInfo(tempInfo);
                        $cookieStore.remove("userMessage");
                      //  $scope.userMessage=UserM.getUserInfo();
                        $cookieStore.put("userMessage",tempInfo);
                        alert("密码设定成功");
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                        return;
                    }


                }
                else {
                    alert(data.description);
                }
            }).error(function (data, status, headers, config) {

                if (data == undefined) {

                    alert("密码错误");
                    return;
                }
                alert(status);
            });

        }
        */

    }
    /*
    $scope.ngclickResms = function () {

        $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getAuthCode&hostNumber=' + hostNumber + '&type=0').success(function (data) {
            if (data.code == 0) {
                //  alert("验证码已发送注意查收");
             //   $location.path("findpwdStep2/" + hostNumber);
                $scope.resms={
                    class:"css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top",
                    title:"重新获取验证码"
                };
            }
            else {
                $scope.alertConfig(
                    {okTitle:"免费注册",
                        okUrl:"register",
                        noTitle:"重新输入",
                        noUrl:"",
                        titleTitle:"登录失败",
                        msgTitle:data.description

                    });


            }
        }).error(function (data, status, headers, config) {

            if (data == undefined) {

                alert("密码错误");
                return;
            }
            alert(status);
        });




    }
    */
    $scope.mainBodyMsg.load="hide";
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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("找回密码");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    var tempCode = $routeParams.code;

    $scope.clickSure = function (user) {

        var tempValFn=GlobalVar.getGlobalFn();

        var tempState=tempValFn.pwdFindValFn(user);
        if(tempState.isPass)
        {
            var pwd = user.newPwd;
            var tempUserInfo=UserM.getUserInfo();
            var hostNumber=tempUserInfo.hostNumber;

            var tempParams={
                action:'pwdReset',
                hostNumber:hostNumber,
                newPassword:pwd,
                authcode:tempCode
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
        //    $http.post(urlAdd+'/MCSSECNUM/userctrl?action=pwdReset&hostNumber=' + hostNumber + '&authcode=' + tempCode + '&newPassword=' + pwd).success(function (data) {

                if (data == "result=0")
                {

                    var tempInfo=UserM.getUserInfo();

                    if(tempInfo.passWord==undefined||tempInfo.passWord=="")
                    {

                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:"找回密码成功",
                                fn:function(flag){
                                    if(flag)
                                    {
                                        var user={
                                            passWord:pwd,
                                            hostNumber:hostNumber
                                          //  isChange:true
                                        };
                                        UserM.setUserInfo(user);
                                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                                        return;

                                    }
                                }

                            });



                    }
                    else
                    {



                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:"找回密码成功",
                                fn:function(flag){
                                    if(flag)
                                    {
                                        tempInfo.passWord = pwd;
                                        tempInfo.isChange=true;
                                        UserM.setUserInfo(tempInfo);
                                      //  $myCookieStore.remove("userMessage");
                                        //  $scope.userMessage=UserM.getUserInfo();
                                        $myCookieStore.put("userMessage",tempInfo);

                                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                        return;
                                    }
                                }

                            });





/*

                        tempInfo.passWord = pwd;
                        tempInfo.isChange=true;
                        UserM.setUserInfo(tempInfo);
                        $cookieStore.remove("userMessage");
                        //  $scope.userMessage=UserM.getUserInfo();
                        $cookieStore.put("userMessage",tempInfo);
                        alert("密码设定成功");
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                        return;
                        */
                    }


                }
                else {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"验证码错误",
                            fn:function(flag){
                                if(flag)
                                {
                                  //  tempInfo.passWord = pwd;
                                 //   tempInfo.isChange=true;
                                //    UserM.setUserInfo(tempInfo);
                                 //   $cookieStore.remove("userMessage");
                                    //  $scope.userMessage=UserM.getUserInfo();
                                //    $cookieStore.put("userMessage",tempInfo);

                                //    $location.path("findpwdStep2/"+hostNumber);
                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD);
                                    return;
                                }
                            }

                        });

                }
            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });


        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });
        }

    }
    $scope.mainBodyMsg.load="hide";
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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("注册");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    var hostName = $routeParams.hostNumber;
    $scope.registerCode={
        class:"css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top",
        title:"重新获取登录密码"
    };

    //   $interval.cancel(promise);
    var isWaiting=true;
    var registerStep2WaitTime=60;


    var  registerStep2Promise=$interval(function(){
        registerStep2WaitTime--;
        isWaiting=true;
        // GlobalVar.minus();//临时
        if(registerStep2WaitTime==0)
        {
            registerStep2WaitTime=60;
            $interval.cancel(registerStep2Promise);
            isWaiting=false;
            $scope.registerCode.title = "重新获取登录密码";
            $scope.registerCode.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
        }
        else
        {
            $scope.registerCode.title = "重新获取登录密码("+registerStep2WaitTime+")";
            $scope.registerCode.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
        }
    },1000);






    $scope.ngclickRegisterResms = function () {


        if (hostName == undefined) {

            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"有未填项或有特殊字符输入"

                });
            return;
        }
        if(!isWaiting)
        {
            var tempParams={
                action:'userRegPass',
                hostNumber:hostName,
                clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                productId:GlobalVar.getGlobalConst().PRODUCTID
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userRegPass&hostNumber=' + hostName + '&clientType=android&productId=1').success(function (data) {
                if (data.code == 0) {

                    registerStep2Promise=$interval(function(){
                        registerStep2WaitTime--;
                        isWaiting=true;
                        // GlobalVar.minus();//临时
                        if(registerStep2WaitTime==0)
                        {
                            isWaiting=false;
                            registerStep2WaitTime=60;
                            $interval.cancel(registerStep2Promise);
                            $scope.registerCode.title = "重新获取登录密码";
                            $scope.registerCode.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
                        }
                        else
                        {
                            $scope.registerCode.title = "重新获取登录密码("+registerStep2WaitTime+")";
                            $scope.registerCode.class="css_margin_left_right css_text_vertical_center font_color_188191193 css_margin_top";
                        }
                    },1000);
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"登录密码已经发送请登录后及时修改密码"
                        });


                }
                else {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description
                        });

                }

            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });

        }



    }
    $scope.clickSure = function (user) {

        if (user == undefined || user.password == undefined || hostName == undefined) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"有未填项或有特殊字符输入"

                });
            return;
        }
        else {
            var pwd = user.password;


            var tempParams={
                action:'userRegWithPass',
                hostNumber:hostName,
                password:pwd,
                clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                productId:GlobalVar.getGlobalConst().PRODUCTID
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
        //    $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userRegWithPass&hostNumber=' + hostName + '&clientType=android&productId=1&password=' + pwd).success(function (data) {
                if(data.code=="1")
                {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description,
                            fn:function(flag){
                                if(flag)
                                {
                                    var user={
                                        passWord:pwd,
                                        hostNumber:hostName,
                                        isChange:true
                                    };
                                    UserM.setUserInfo(user);
                                    // alert(data.description);
                                   // $location.path("registerStep2/"+hostName);
                                    return;


                                }
                            }

                        });

                }
                if(data.code=="-96")
                {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description,
                            fn:function(flag){
                                if(flag)
                                {
                                    var user={
                                        passWord:pwd,
                                        hostNumber:hostName,
                                        isChange:true
                                    };
                                    UserM.setUserInfo(user);
                                    // alert(data.description);
                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                    return;


                                }
                            }

                        });



                }
                if (data.code == "0") {

                    var user={
                        passWord:pwd,
                        hostNumber:hostName,
                        isChange:true
                    };
                    UserM.setUserInfo(user);
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                }
                if(data.code=="-49")
                {
                    var user={
                        passWord:pwd,
                        hostNumber:hostName,
                        isChange:true
                    };
                    UserM.setUserInfo(user);
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                }

            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });

        }

    }
    $scope.mainBodyMsg.load="hide";
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

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("注册");
    $scope.setUpLeftNav("<");
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.user={ck:true};
    $scope.clPro=function()
    {

       window.open("infoPage/contract.html",'','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    };
    $scope.clRisterSure=function(user){

        var tempValFn=GlobalVar.getGlobalFn();

        var tempState=tempValFn.registerValFn(user);

        if(tempState.isPass)
        {



            var htn = user.hostNumber;
            var pwd=user.password;
            var tempParams={
                action:'userRegNowNew',
                hostNumber:htn,
                password:pwd,
                clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                productId:GlobalVar.getGlobalConst().PRODUCTID
            };


            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userRegPass&hostNumber=' + htn + '&clientType=android&productId=1').success(function (data) {
                if(data.code=="-1")
                {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description,
                            fn:function(flag){
                                if(flag)
                                {
                                    var user={
                                        passWord:pwd,
                                        hostNumber:htn,
                                        isChange:true
                                    };
                                    UserM.setUserInfo(user);

                                     $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                    return;
                                }
                            }

                        });
                    return;

                }
                if(data.code=="1")
                {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description,
                            fn:function(flag){
                                if(flag)
                                {
                                    var user={
                                        passWord:pwd,
                                        hostNumber:htn,
                                        isChange:true
                                    };
                                    UserM.setUserInfo(user);
                                    // alert(data.description);
                                    // $location.path("registerStep2/"+hostName);
                                    return;


                                }
                            }

                        });

                }
                if(data.code=="-96")
                {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description,
                            fn:function(flag){
                                if(flag)
                                {
                                    var user={
                                        passWord:pwd,
                                        hostNumber:htn,
                                        isChange:true
                                    };
                                    UserM.setUserInfo(user);
                                    // alert(data.description);
                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                                    return;


                                }
                            }

                        });



                }
                if (data.code == "0") {

                    var user={
                        passWord:pwd,
                        hostNumber:htn,
                        isChange:true
                    };
                    UserM.setUserInfo(user);
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                }
                if(data.code=="-49")
                {
                    var user={
                        passWord:pwd,
                        hostNumber:htn,
                        isChange:true
                    };
                    UserM.setUserInfo(user);
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                }

                return;

            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });



        return;
        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });

        }


    };
    $scope.clickRister = function (user) {

//begin

        var tempValFn=GlobalVar.getGlobalFn();

        var tempState=tempValFn.registerValFn(user);

        if(tempState.isPass)
        {


            var htn = user.hostNumber;


            var tempParams={
                action:'userRegPass',
                hostNumber:htn,
                clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                productId:GlobalVar.getGlobalConst().PRODUCTID
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userRegPass&hostNumber=' + htn + '&clientType=android&productId=1').success(function (data) {

                switch (data.code)
                {
                    case "0":

                        $location.path("registerStep2/" + user.hostNumber);
                        break;
                    case "2":
                        $scope.alertConfig(
                            {okTitle:"找回密码",
                                okUrl:"findpwd",
                                noTitle:"去登录",
                                noUrl:"login",
                                titleTitle:"登录失败",
                                msgTitle:data.description


                            });
                        break;
                    case "1":
                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:data.description

                            });
                        break;

                }



            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });




        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });

        }

//end



    }
    $scope.mainBodyMsg.load="hide";

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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    GlobalVar.updateAllInfo($scope);
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("账户充值");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("账户充值", "accountPrepaid");
    var info = UserM.getUserInfo();
    var hostNum = info.hostNumber;

    var items = [
        {name: "第二号码充值卡", url: "twoPrepaid"},
      //  {name: "手机话费充值", url: ""},
        {name: "支付宝充值", url: "alipayPrepaid"}
      //  {name: "财付通充值", url: ""},
    //    {name: "充值卡充值", url: "mobileCardPrepaid"}
    ];

    $scope.prepaidTypes = items;
    $scope.mainBodyMsg.load="hide";

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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("支付宝充值");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("支付宝充值", "alipayPrepaid");
    $scope.msg={
        load:"show_float"
    }
    var info = UserM.getUserInfo();
    var hostNum = info.hostNumber;
    var tempParams={
        action:'rechargeConfiguration',
        hostNumber:hostNum

    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
//    $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=rechargeConfiguration&hostNumber=' + hostNum).success(function (data) {
        $scope.prepaidTypes = data.list;
        $scope.mainBodyMsg.load="hide";
    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"
            });
        return;
    });
    $scope.clPlipay=function(index)
    {
        var selectPrepaidType=$scope.prepaidTypes[index];

        selectPrepaidType.price="0.01";

        var strJson="{'totalFee':"+selectPrepaidType.price+",'subject':'qianbi','body':'good','params':{'telephone':"+hostNum+"}}";

        window.location.href="http://211.157.148.7:8080/payplat/api/charge/platform?platAlias=alipay_mobileweb&busAlias=snb&orderInfo="+strJson;
     //   window.location.href="http://211.150.70.168:8080/payplat/api/charge/platform?platAlias=alipay_mobileweb&busAlias=snb&orderInfo="+strJson;
      //  http://211.150.70.168:8080/payplat/api/charge/platform?platAlias=alipay_mobileweb&busAlias=snb&orderInfo={totalFee:'0.01',subject:'qianbi',body:'good',params:{telephone:'18032227799'}}
    }

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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.cardType={
        YDCard:"移动充值卡",
        YDClass:"mobileCard_circle_active",
        LTCard:"联通充值卡",
        LTClass:"mobileCard_circle_static",
        DXCard:"电信充值卡",
        DXClass:"mobileCard_circle_static"

    };
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("充值卡充值");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("充值卡充值", "mobileCardPrepaid");
    var info = UserM.getUserInfo();
    var hostNum = info.hostNumber;
    var tempParams={
        action:'rechargeConfiguration',
        hostNumber:hostNum
    };
    $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
   // $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=rechargeConfiguration&hostNumber=' + hostNum).success(function (data) {
        $scope.prepaidTypes = data.list;
        $scope.mainBodyMsg.load="hide";

    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"
            });
        return;
    });

    $scope.clickYd=function()
    {
        $scope.cardType.YDClass="mobileCard_circle_active";
        $scope.cardType.LTClass="mobileCard_circle_static";
        $scope.cardType.DXClass="mobileCard_circle_static";
    }
    $scope.clickLt=function()
    {
        $scope.cardType.YDClass="mobileCard_circle_static";
        $scope.cardType.LTClass="mobileCard_circle_active";
        $scope.cardType.DXClass="mobileCard_circle_static";
    }
    $scope.clickDx=function()
    {
        $scope.cardType.YDClass="mobileCard_circle_static";
        $scope.cardType.LTClass="mobileCard_circle_static";
        $scope.cardType.DXClass="mobileCard_circle_active";
    }
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
    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.up="main_header_show";
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("第二号码充值卡");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("第二号码充值卡", "twoPrepaidController");

    var info = UserM.getUserInfo();
    var hostNum = info.hostNumber;
    var pwd = info.passWord;
    var tempParams={
        action:'getExchangeSecuritiesCode',
        hostNumber:hostNum,
        password:pwd
    };
    $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
  //  $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getExchangeSecuritiesCode&hostNumber=' + hostNum + '&password=' + pwd).success(function (data) {
        $scope.imgSrc = data.securityPath;

    }).error(function (data, status, headers, config) {
        $scope.alertConfig(
            {
                noClass:"hide",
                titleTitle:"提示",
                msgTitle:"系统维护中"

            });
        return;
    });

    $scope.ngclickResms = function () {

        var tempParams={
            action:'getExchangeSecuritiesCode',
            hostNumber:hostNum,
            password:pwd
        };
        $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
      //  $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getExchangeSecuritiesCode&hostNumber=' + hostNum + '&password=' + pwd).success(function (data) {
            $scope.imgSrc = data.securityPath;
        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"
                });
            return;
        });
    }
    $scope.clickSure = function (user) {
        var exchangeNum = user.password;
        var code = user.smscode;
        if (user == undefined || exchangeNum == undefined || code == undefined) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"有未填项或有特殊字符输入"

                });
            return;
        }
        else {
            var tempParams={
                action:'exchangeSecurities',
                hostNumber:hostNum,
                password:pwd,
                securityCode:code,
                clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                productId:GlobalVar.getGlobalConst().PRODUCTID,
                exchangeNumber:exchangeNum
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
          //  $http.post(urlAdd+'/MCSSECNUM/userctrl?action=exchangeSecurities&hostNumber=' + hostNum + '&password=' + pwd + '&securityCode=' + code + '&exchangeNumber=' + exchangeNum + '&productId=1&clientType=android').success(function (data) {
                if (data.code == "0") {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description
                        });
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                }
                else {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:data.description
                        });
                    $scope.ngclickResms();
                }

            }).error(function (data, status, headers, config) {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });

        }
    }

    $scope.mainBodyMsg.load="hide";

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
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.setUpCenterNav("密码修改");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    var tempInfo=UserM.getUserInfo();
    $scope.changePwd = function (user) {
        var newPwd = user.newPassword1;
        var oldPwd = tempInfo.passWord;
        var hostNum = tempInfo.hostNumber;

       var tempValFn=GlobalVar.getGlobalFn();
        user.oldPwd=oldPwd;
       var tempState=tempValFn.pwdChangeValFn(user);
        if(tempState.isPass)
        {
            var tempParams={
                action:'pwdModify',
                hostNumber:hostNum,
                password:newPwd,
                oldPassword:oldPwd,
                newPassword:newPwd,
                productId:GlobalVar.getGlobalConst().PRODUCTID
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=pwdModify&password=' + newPwd + '&hostNumber=' + hostNum + '&oldPassword=' + oldPwd + '&newPassword=' + newPwd + '&product=1').success(function (data) {

                if (data == "result=0") {

                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"密码修改成功",
                            fn:function(flag){
                                if(flag)
                                {
                                    tempInfo.passWord = newPwd;
                                    //tempInfo.isChange=true;
                                    UserM.setUserInfo(tempInfo);
                                //    $myCookieStore.remove("userMessage");
                                  //  $scope.userMessage=UserM.getUserInfo();
                                    $myCookieStore.put("userMessage",tempInfo);
                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                                    return;
                                }
                            }

                        });
                }
                else {
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"密码修改失败"

                        });
                }
            }).error(function (data, status, headers, config) {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });
        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });

        }

    }
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
 //   var tempSecondNum=SecondNum.getAllSeconNumInfo();

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.down="hide";
    var tempSecondNumInfo=SecondNum.getAllSeconNumInfo();
    $scope.setUpCenterNav("选择套餐");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    $scope.setRightNav("通话", "callNum");
    $scope.setLeftNav("<", "myBill");
    $scope.setCenterNav("选择套餐", "changePackage");

    var info = UserM.getUserInfo();
    $scope.comboName = info.comboName;//当前套餐名字
    $scope.nextRechargeTime = info.nextRechargeTime;//续费时间

 //   $scope.packageTypes = PackageInfo.getPackageList();
    var tempPackageTypes=tempSecondNumInfo.comboList;
    for(var i=0;i<tempPackageTypes.length;i++)
    {
        if(i==0)
        {
            tempPackageTypes[i].cls="layout_horizontal_inner_left_package_active";
            continue;
        }
        tempPackageTypes[i].cls="layout_horizontal_inner_left_package_static";
    }

    $scope.packageTypes=tempPackageTypes;
    var selectedPackage=$scope.packageTypes[0];;


    $scope.clChangePackage = function (index) {

        for(var i=0;i<$scope.packageTypes.length;i++)
        {
            if(i==index)
            {
                $scope.packageTypes[i].cls="layout_horizontal_inner_left_package_active";
                continue;
            }
            $scope.packageTypes[i].cls="layout_horizontal_inner_left_package_static";
        }
        selectedPackage = $scope.packageTypes[index];
        SecondNum.setSecondNumInfo(selectedPackage);
    }
    $scope.clChangePackageContent=function(index)
    {
        selectedPackage = $scope.packageTypes[index];
        SecondNum.setSecondNumInfo(selectedPackage);
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.PACKAGECONTENT);
    }
    $scope.clickBind = function () {


        $scope.alertConfig(
            {
                okTitle: "确定",
                noTitle: "取消",
                titleTitle: "提示",
                msgTitle: "确定绑定",
                fn: function (isOk) {
                    if (isOk)
                    {
                        $scope.mainBodyMsg.load="show_float";
                        if (selectedPackage.comboId != null) {
                            var oldPwd = info.passWord;
                            var hostNum = info.hostNumber;
                            var comboId = selectedPackage.comboId;

                            var tempParams={
                                action:'chooseSecondCombo',
                                hostNumber:hostNum,
                                password:oldPwd,
                                comboId:comboId
                            };
                            $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                                //    $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=chooseSecondCombo&hostNumber=' + hostNum + '&password=' + oldPwd + '&comboId=' + comboId).success(function (data) {

                                if (data.code == "0") {

                                    GlobalVar.updateAllInfo($scope);

                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                                    return;

                                }
                                if (data.code == "1") {
                                    $scope.alertConfig(
                                        {
                                            noClass:"hide",
                                            titleTitle:"提示",
                                            msgTitle:data.description

                                        });
                                    $scope.mainBodyMsg.load="hide";
                                    return;
                                }
                                else
                                {
                                    $scope.alertConfig(
                                        {
                                            noClass:"hide",
                                            titleTitle:"提示",
                                            msgTitle:data.description

                                        });
                                    $scope.mainBodyMsg.load="hide";
                                    return;
                                }

                                //   $location.path("myBill");
                            }).error(function (data, status, headers, config) {
                                $scope.alertConfig(
                                    {
                                        noClass:"hide",
                                        titleTitle:"提示",
                                        msgTitle:"系统维护中"

                                    });
                                return;
                            });

                        }
                        else {

                            return;
                        }


                    }
                    if(!isOk)
                    {
                        return;
                    }
                }

                });
    }
    $scope.mainBodyMsg.load="hide";
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

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    var info = UserM.getUserInfo();
    $scope.navClass.down="hide";
    $scope.setUpCenterNav("选择套餐");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    var tempReserveInfo=SecondNum.getReserveInfo();
    var tempSecondNum = SecondNum.getAllSeconNumInfo();
    var tempcomboId=tempSecondNum.comboId;
    var tempReservedComboId=tempSecondNum.reservedComboId;
    var comboLists=tempSecondNum.comboList;
    var tempComboName="";
    var tempReserveComboName="";
    var tempReserveComboTime="";
    for(var i=0;i<comboLists.length;i++)
    {
      if(comboLists[i].comboId==tempcomboId)
      {
          tempComboName=comboLists[i].comboName;

        continue;
      }
      if(comboLists[i].comboId==tempReservedComboId)
      {
          tempReserveComboName=comboLists[i].comboName;
          continue;
      }
    }
    var myDate = new Date();

   var month=myDate.getMonth()+2;

   var year=myDate.getFullYear();
    if(month==13)
    {
        year+=1;
        month=1;
    }
    tempReserveComboTime=year+"年"+month+"月"+"1日";
    $scope.packageState={
       currentPackageName:tempComboName,
       nextPackageName:tempReserveComboName,
       nextPackageTime:tempReserveComboTime
    };
    $scope.clickRemoveReservePackage=function()
    {
        $scope.mainBodyMsg.load="show_float";
        var oldPwd = info.passWord;
        var hostNum = info.hostNumber;
        var tempParams={
            action:'cancelChangePricePackage',
            hostNumber:hostNum,
            password:oldPwd
        };
        $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {


            if(data.code=="0")
            {
                GlobalVar.updateAllInfo($scope);
                $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                return;
            }
            else
            {
                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:data.description

                    });
            }
        }).error(function (data, status, headers, config) {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"系统维护中"
                });
            return;
        });
    }
    $scope.mainBodyMsg.load="hide";
}]);




controllers.controller('linkController', ['$scope', '$http', '$location', 'SecondNum', 'PackageInfo', 'UserM','GlobalVar','$timeout','$window','$myCookieStore', function ($scope, $http, $location, SecondNum, PackageInfo, UserM,GlobalVar,$timeout,$window,$myCookieStore) {

    $scope.mainBodyMsg.load="show_float";
    $scope.navClass.up="hide";
    $scope.navClass.down="hide";
    var tempSearch=$location.search();
    if(tempSearch.channel=="weixin")
    {
        var tempUserMessage=$myCookieStore.get("userMessage");
        if(tempUserMessage)
        {
            UserM.setUserInfo(tempUserMessage);
            var tempSecondNumInfo=$myCookieStore.get("secondNumberMessage");
            if(tempSecondNumInfo)
            {
                SecondNum.setAllSecondNumInfo(tempSecondNumInfo);
            }
            var tempReserveInfo= $myCookieStore.get("reserveMessage");
            if(tempReserveInfo)
            {
                SecondNum.setReserveInfo(tempReserveInfo);
            }
//            if(tempSearch.channel=="weixin")
//            {
                //  tempSearch={requestPage:GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER};

                switch (tempSearch.requestPage)
                {
                    case  GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER:
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                        $scope.mainBodyMsg.load="hide";
                        return;
                        break;
                    case GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN:
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                        $scope.mainBodyMsg.load="hide";
                        return;
                        break;
                    case GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD:
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD);
                        $scope.mainBodyMsg.load="hide";
                        return;
                        break;
                    case  GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM:

                        $scope.mainBodyMsg.load="hide";
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                        //  $timeout(function(){ $scope.mainBodyMsg.load="hide"; $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);},200);
                        return;
                        break;
                    case  GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL:
                        //   GlobalVar.updateAllInfo($scope);

                        $scope.mainBodyMsg.load="hide";
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
                        //  $timeout(function(){ $scope.mainBodyMsg.load="hide"; $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);},200);
                        return;
                        break;
                    case  GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID:
                        //  GlobalVar.updateAllInfo($scope);
                        $scope.mainBodyMsg.load="hide";
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);
                        //  $timeout(function(){ $scope.mainBodyMsg.load="hide"; $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.ACCOUNTPREPAID);},200);
                        return;
                        break;

                    default :
                        $scope.mainBodyMsg.load="hide";
                        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                        return;
                        break;

            }


        }
        else
        {
            switch (tempSearch.requestPage)
            {
                case  GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER:
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER);
                    $scope.mainBodyMsg.load="hide";
                    return;
                    break;
                case GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN:
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                    $scope.mainBodyMsg.load="hide";
                    return;
                    break;
                case GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD:
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.FINDPWD);
                    $scope.mainBodyMsg.load="hide";
                    return;
                    break;
                default :
                    $scope.mainBodyMsg.load="hide";
                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                    return;
                    break;
            }

        }



    }
    else
    {
            $scope.mainBodyMsg.load="hide";
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
      }















//$scope.$watch(tempSearch,function(){
//    if(tempSearch.id!=undefined)
//    {


//
//    }
//    });

//    var tempSearch=$location.search();
//
//    var tempUrlData=angular.fromJson(tempSearch.urlData);
//
//    $scope.mainBodyMsg.load="show_float";
//    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
//    var info = UserM.getUserInfo();
//    $scope.navClass.down="hide";
//    $scope.navClass.up="main_header_show";
//    $scope.setUpCenterNav("充值成功");
//    $scope.setUpLeftNav("<");
//    $scope.setUpRightNav("","");
//    if(tempUrlData.status="success")
//    {
//        $scope.prepaid={
//            pic:"img/prepaidSuc.png",
//            msg:"充值成功",
//            class:"prepaid_message_suc"
//        };
//    }
//    else
//    {
//        $scope.prepaid={
//            pic:"img/prepaidFal.png",
//            msg:"充值失败",
//            class:"prepaid_message_fal"
//        };
//    }

  //  $scope.mainBodyMsg.load="hide";
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

    var tempSearch=$location.search();

    var tempUrlData=angular.fromJson(tempSearch.urlData);

    $scope.mainBodyMsg.load="show_float";
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    var info = UserM.getUserInfo();
    $scope.navClass.down="hide";
    $scope.navClass.up="main_header_show";
    $scope.setUpCenterNav("充值成功");
    $scope.setUpLeftNav("<");
    $scope.setUpRightNav("","");
    if(tempUrlData.status="success")
    {
        $scope.prepaid={
            pic:"img/prepaidSuc.png",
            msg:"充值成功",
            class:"prepaid_message_suc"
        };
    }
    else
    {
        $scope.prepaid={
            pic:"img/prepaidFal.png",
            msg:"充值失败",
            class:"prepaid_message_fal"
        };
    }

    $scope.mainBodyMsg.load="hide";
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



    var tempGlobalConst=GlobalVar.getGlobalConst();
    var urlAdd=GlobalVar.getUrlInfo().urlAdd;
    $scope.navClass.down="hide";
    $scope.navClass.up="main_header_show";
    $scope.setUpCenterNav("登录");
    $scope.setUpRightNav("","");
    $scope.setUpLeftNav("");

    $scope.hostNumberKeyup=function()
    {
        /*
        if($scope.user.hostNumber.length>11)
        {
            $scope.user.hostNumber=$scope.user.hostNumber.substr(0,11);
        }
        */
    }
    $scope.passWordKeyup=function()
    {
      /*  if($scope.user.password.length>8)
        {
            $scope.user.password=$scope.user.password.substr(0,8);

        }
        */

    }
 //   $scope.alertMsg.alertClass="web_alert_outer";
 //   $scope.alertConfig({ok:"测试",okUrl:"register"});
    /*
    $scope.alertMsg={
        titleTitle:"提示",
        msgTitle:"信息",
        okTitle:"确定",
        noTitle:"取消",
        alertClass:"hide"
    }


    var tempAlertConfig={
        ok:"ok",
        okUrl:"myBIll",
        noUrl:""
    }
    $scope.alertConfig=function(alertConfig)
    {

        tempAlertConfig=alertConfig;
    }
    $scope.clickAlertOk=function()
    {

        //   alert("ss"+tempAlertConfig.ok);
        $scope.alertMsg.alertClass="hide";
        $location.path(tempAlertConfig.okUrl);
    }
    $scope.clickAlertNo=function()
    {
        $scope.alertMsg.alertClass="hide";
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.REGISTER);
    }
    */





    $scope.login = function (user) {


        var tempValFn=GlobalVar.getGlobalFn();

        var tempState=tempValFn.loginValFn(user);
        if(tempState.isPass)
        {
            var htn = user.hostNumber;
            var pwd = user.password;

            var tempParams={
                action:'userExist',
                hostNumber:htn
            };
            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
      //      $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userExist&hostNumber=' + htn).success(function (data) {

                if (data.code == 0) {
                    $scope.alertConfig(
                        {
                            okTitle:"免费注册",
                            okUrl:"register",
                            noTitle:"重新输入",
                            titleTitle:"登录失败",
                            msgTitle:"您输入的号码未注册，请重新输入或免费注册"
                        });
                    return;
                }
                else
                {
                    var tempParams={
                        action:'userLogin',
                        password:pwd,
                        channelId:GlobalVar.getGlobalConst().CHANNELID,
                        clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
                         productId:GlobalVar.getGlobalConst().PRODUCTID,
                        hostNumber:htn,
                        imsi:"89860112241106400670",
                        imei:"354589052131731",
                        versionName:GlobalVar.getGlobalConst().VERSIONNAME
                    };
                    $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
                 //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userLogin&hostNumber=' + htn + '&password=' + pwd+'&versionName=4.6.0&clientType=android&productId=1&channelId=12000&imsi=89860112241106400670&imei=354589052131731').success(function (data) {

                        if(data=="result=1~-2")
                        {
                            $scope.alertConfig(
                                {
                                    titleTitle:"提示",
                                    msgTitle:"您输入的密码错误，请重新输入",
                                    noClass:"hide"
                                });
                            return;
                        }
                        else
                        {
                            var tempParams={
                                action:'getUserInfo',
                                password:pwd,
                                productId:GlobalVar.getGlobalConst().PRODUCTID,
                                hostNumber:htn
                            };
                            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

                         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getUserInfo&hostNumber=' + htn + '&password=' + pwd + '&productId=1').success(function (data) {
                                if(data.code=="0")
                                {
                                    var tempUserM=eval(data);
                                    tempUserM.passWord=pwd;
                                    tempUserM.isChange=false;
                                    UserM.setUserInfo(tempUserM);
                                    $myCookieStore.put("userMessage",eval(data));
                                    if(data.bindNumberStatus==tempGlobalConst.bindNumberStatus.NUMBER_STATUS_IS_BOUND||data.bindNumberStatus=="2")
                                    {
                                        var tempParams={
                                            action:'getSecondNumInfo',
                                            password:pwd,

                                            hostNumber:htn,
                                            secondNum:data.bindNumber
                                        };
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
                                     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + data.bindNumber).success(function (dataS) {
                                            var tempSecondNumberInfo=eval(dataS);
                                            SecondNum.setAllSecondNumInfo(tempSecondNumberInfo);
                                            $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo);
                                            //      $scope.packageTypes = dataS.comboList;//普号套餐
                                            //    PackageInfo.setPackageList(dataS.comboList);
                                            //    $scope.mainBodyMsg.load="hide";

                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass:"hide",
                                                    titleTitle:"提示",
                                                    msgTitle:"系统维护中"

                                                });
                                            return;
                                        });
                                    }

                                    if(tempUserM.haveReserve)
                                    {
                                        var tempParams={
                                            action:'getReservedSecondNum',
                                            password:pwd,
                                            //   channelId:GlobalVar.getGlobalConst().CHANNELID,
                                            //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
                                            //  productId:GlobalVar.getGlobalConst().PRODUCTID,
                                            hostNumber:htn
                                        //    secondNum:data.bindNumber
                                        };
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
                                     //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + htn + '&password=' + pwd).success(function (dataR) {
                                            var tempReserveInfo=eval(dataR);
                                            tempReserveInfo.webIsHave=true;


                                            SecondNum.setReserveInfo(tempReserveInfo);
                                            $myCookieStore.put("reserveMessage",tempReserveInfo);
                                            if(tempReserveInfo.numbers[0].secondNum!=""||tempReserveInfo.numbers[0].secondNum!=undefined)
                                            {
                                                var tempParams={
                                                    action:'getSecondNumInfo',
                                                    password:pwd,
                                                    //   channelId:GlobalVar.getGlobalConst().CHANNELID,
                                                    //   clientType:GlobalVar.getGlobalConst().CLIENTTYPE_ANDROID,
                                                    //  productId:GlobalVar.getGlobalConst().PRODUCTID,
                                                    secondNum:tempReserveInfo.numbers[0].secondNum,
                                                    hostNumber:htn
                                                    //    secondNum:data.bindNumber
                                                };
                                                $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {

                                              //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + tempReserveInfo.numbers[0].secondNum).success(function (dataRS) {

                                                    var tempReserveSecondNumberInfo=eval(dataRS);
                                                    SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
                                                    $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);
                                                    //      $scope.packageTypes = dataS.comboList;//普号套餐
                                                    //    PackageInfo.setPackageList(dataS.comboList);
                                                    //    $scope.mainBodyMsg.load="hide";
                                                }).error(function (data, status, headers, config) {
                                                    $scope.alertConfig(
                                                        {
                                                            noClass:"hide",
                                                            titleTitle:"提示",
                                                            msgTitle:"系统维护中"

                                                        });
                                                    return;
                                                });
                                            }
                                        }).error(function (data, status, headers, config) {
                                            $scope.alertConfig(
                                                {
                                                    noClass:"hide",
                                                    titleTitle:"提示",
                                                    msgTitle:"系统维护中"

                                                });
                                            return;
                                        });

                                    }


                                    $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
                                }
                            }).error(function (data, status, headers, config) {

                                $scope.alertConfig(
                                    {
                                        noClass:"hide",
                                        titleTitle:"提示",
                                        msgTitle:"系统维护中"

                                    });
                                return;
                            });


                        }


                    }).error(function (data, status, headers, config) {

                        $scope.alertConfig(
                            {
                                noClass:"hide",
                                titleTitle:"提示",
                                msgTitle:"系统维护中"

                            });
                        return;
                    });


                }

            }).error(function (data, status, headers, config) {

                $scope.alertConfig(
                    {
                        noClass:"hide",
                        titleTitle:"提示",
                        msgTitle:"系统维护中"

                    });
                return;
            });


        }
        else
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:tempState.msg

                });
        }






    }

    var tempUserM=UserM.getUserInfo();
    if(tempUserM!=null)
    {
        if(UserM.getUserInfo().isChange)
        {
            var user=UserM.getUserInfo();
            var tempUser={
                password:user.passWord,
                hostNumber:user.hostNumber
            };
            user.isChange=false;
            UserM.setUserInfo(user);
            $scope.login(tempUser);
            return;
        }

    }


    $scope.mainBodyMsg.load="hide";


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





    /*
    *
    * 初始化消息提示框
    *
    *
    *
    * */

     $scope.alertMsg={
        titleTitle:"提示",
        msgTitle:"信息",
        okTitle:"确定",
        noTitle:"取消",
        noUrl:"",
        alertClass:"alertHide",//hide
        okUrl:"",
        noClass:"web_alert_button_no",
        okClass:"web_alert_button_ok"
    }


    var tempAlertConfig={
        ok:"ok",
        okUrl:"myBIll",
        noUrl:"",
        fn:""
    }

    $scope.mainBodyMsg={
        load:"show_float"

    }
    /**
     * @ngdoc method
     * @name alertConfig
     *
     * @description
     * 弹出一个类似于系统confirm或alert的窗口，通过noClass可以控制confirm和alert的切换
     *
     * @param   配置窗口的参数，
     * titleTitle:消息名称：例如提示，警告···如需要将相应样式高度设定，现在高度为零及不显示
     * msgTitle:消息提示内容
     * okTitle:确定按钮名称，在调用中可自定义，默认为确定
     * noTitle:取消按钮名称，在调用中可自定义，默认为取消
     * noUrl:点击取消后跳转路径，默认为空，在调用中可自定义
     * okUrl
     * alertClass；消息框样式，（不建议自定义）
     * noClass：取消按钮样式（默认样式为居中）如果需要一个只有单个确定按钮的消息框，设置该样式为hide
     * okClass：确定按钮样式（默认样式为居中）
     * fn:回调函数，可以再配置中自定义用户点击确定或取消后要执行的函数返回值：true为确定，false为取消
     * @returns
     */
    $scope.alertConfig=function(alertConfig)
    {
        $scope.alertMsg={
            titleTitle:"提示",
            msgTitle:"信息",
            okTitle:"确定",
            noTitle:"取消",
            noUrl:"",
            alertClass:"alertHide",//hide
            okUrl:"",
            noClass:"web_alert_button_no",
            okClass:"web_alert_button_ok",
            fn:""
        }

        $scope.alertMsg.alertClass="web_alert_outer";

        $scope.alertMsg.titleTitle=alertConfig.titleTitle==undefined?$scope.alertMsg.titleTitle:alertConfig.titleTitle;
        $scope.alertMsg.msgTitle=alertConfig.msgTitle==undefined?$scope.alertMsg.msgTitle:alertConfig.msgTitle;
        $scope.alertMsg.okTitle=alertConfig.okTitle==undefined?$scope.alertMsg.okTitle:alertConfig.okTitle;
        $scope.alertMsg.noTitle=alertConfig.noTitle==undefined?$scope.alertMsg.noTitle:alertConfig.noTitle;
        $scope.alertMsg.okUrl=alertConfig.okUrl==undefined?$scope.alertMsg.okUrl:alertConfig.okUrl;
        $scope.alertMsg.fn=alertConfig.fn==undefined?$scope.alertMsg.fn:alertConfig.fn;
        $scope.alertMsg.noClass=alertConfig.noClass==undefined?$scope.alertMsg.noClass:alertConfig.noClass;
        $scope.alertMsg.noUrl=alertConfig.noUrl==undefined?$scope.alertMsg.noUrl:alertConfig.noUrl;

        if(alertConfig.noClass=="hide")
        {
            $scope.alertMsg.okClass="web_alert_button_ok_hide";
        }
        else
        {
            $scope.alertMsg.noClass="web_alert_button_no";
            $scope.alertMsg.okClass="web_alert_button_ok";
        }


    }
    /**
     * @ngdoc method
     * @name clickAlertOk
     *
     * @description
     * 消息框的确定函数
     *
     * @param   配置窗口的参数，
     * @returns
     */
    $scope.clickAlertOk=function()
    {
        $scope.alertMsg.alertClass="alertHide";//hide
        if($scope.alertMsg.okUrl!="")
        {
            $location.path($scope.alertMsg.okUrl);
        }
        if( $scope.alertMsg.fn!="")
        {
            $scope.alertMsg.fn(true);
        }
        return;

    }
    /**
     * @ngdoc method
     * @name clickAlertNo
     *
     * @description
     * 消息框的取消回调函数
     *
     * @param   配置窗口的参数，

     * @returns
     */
    $scope.clickAlertNo=function()
    {
        $scope.alertMsg.alertClass="alertHide";//hide
        if($scope.alertMsg.noUrl!="")
        {
            $location.path($scope.alertMsg.noUrl);
        }
        if( $scope.alertMsg.fn!="")
        {
            $scope.alertMsg.fn(false);
        }
        return;

    }
    /**
     * @ngdoc method
     * @name navClass
     *
     * @description
     * 头部和底部导航的初始化配置
     *
     * @param   配置窗口的参数，
     * @returns
     */
    $scope.navClass={
        up:'hide',
        down:'hide',
        downLeft:'nav_down_left_static',
        downCenter:'nav_down_center_active',
        downRight:'nav_down_right_static'
    }
    /**
     * @ngdoc method
     * @name rightClick
     *
     * @description
     * 头部右侧的点击函数初始化
     *
     * @param   配置窗口的参数，
     * @returns
     */
    $scope.rightClick=function(){

    }
    $scope.userMessage = {};
    $scope.userMessage.comboName = "";
    /**
     * @ngdoc method
     * @name clickNavUpBack
     *
     * @description
     * 头部左侧的返回函数
     *
     * @param   配置窗口的参数，
     * @returns
     */

    $scope.clickNavUpBack=function(TnavUpMessage)
    {
        /*
        if(TnavUpMessage.leftTitle=="加入收藏")
        {
            $scope.alertConfig(
                {
                    noClass:"hide",
                    titleTitle:"提示",
                    msgTitle:"请手动添加书签"

                });

            return;
        }
        */
        if(TnavUpMessage.leftTitle!="")
        {
            window.history.back();
            return;
        }
    }



    $scope.setRightNav = function (title, url) {

        $scope.navMessage.rightTitle = title;
        $scope.navMessage.rightUrl = url;
    }
    $scope.setLeftNav = function (title, url) {

        $scope.navMessage.leftTitle = title;
        $scope.navMessage.leftUrl = url;
    }
    $scope.setCenterNav = function (title, url) {

        $scope.navMessage.centerTitle = title;
        $scope.navMessage.centerUrl = url;
    }

    $scope.setUpRightNav = function (title,click) {

        $scope.navUpMessage.rightTitle = title;
        $scope.navUpMessage.rightClick = click;
    }
    $scope.setUpLeftNav = function (title) {
        if(title!="")
        {
            $scope.navUpMessage.leftClass="nav_up_left css_text_center bg_img_return nav_up_left_fontCollor";
        }
        else
        {
            $scope.navUpMessage.leftClass="nav_up_left css_text_center nav_up_left_fontCollor";
        }

        $scope.navUpMessage.leftTitle = title;

    }
    $scope.setUpCenterNav = function (title) {

        $scope.navUpMessage.centerTitle = title;

    };

    $scope.navMessage = {
        leftTitle: '更多',
        centerTitle: '通话',
        rightTitle: '第二号码',
        leftUrl: 'more',
        centerUrl: 'callNum',
        rightUrl: 'myBill'

    };

    /**
     * @ngdoc method
     * @name navUpMessage
     *
     * @description
     * 初始化头部导航
     *
     * @param   配置窗口的参数，
     * @returns
     */




    $scope.navUpMessage = {
        leftTitle: '',
        centerTitle: '登录',
        rightTitle: '',
        rightClick:'',
        leftClass:"nav_up_left css_text_center"

    }

    /**
     * @ngdoc method
     * @name updateAllInfo
     *
     * @description
     * 数据更新函数.此函数暂时被抽取到服务中
     *
     * @param   配置窗口的参数，
     * @returns
     */
     $scope.updateAllInfo=function(user)
     {

     var urlAdd=GlobalVar.getUrlInfo().urlAdd;
     var tempGlobalConst=GlobalVar.getGlobalConst();
     if (user == undefined || user.password == undefined || user.hostNumber == undefined||user.password == "" || user.hostNumber =="") {

     $scope.alertConfig(
     {
     titleTitle:"输入错误",
     msgTitle:"密码或用户名为空"
     });
     return;
     }

     else {
     var htn = user.hostNumber;
     var pwd = user.password;
         var tempParams={
                 action:'userExist',
                     hostNumber:htn
         };
         $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {//对象形式传参数

     if (data.code == 0) {
     $scope.alertConfig(
     {
     okTitle:"免费注册",
     okUrl:"register",
     noTitle:"重新输入",
     titleTitle:"登录失败",
     msgTitle:"您输入的号码未注册，请重新输入或免费注册"

     });
     return;
     }
     else
     {
         var tempParams={
             action:'userLogin',
             hostNumber:htn,
             password:pwd,
             versionName:GlobalVar.getGlobalConst().VERSIONNAME,
             clientType:GlobalVar.getGlobalConst().CLIENTTYPE,
             productId:GlobalVar.getGlobalConst().PRODUCTID,
             imsi:"89860112241106400670",
             imei:"354589052131731"

         };
         $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

         //   $http.post(urlAdd+'/MCSSECNUM/userctrl?action=userLogin&hostNumber=' + htn + '&password=' + pwd+'&versionName=4.6.0&clientType=android&productId=1&channelId=12000&imsi=89860112241106400670&imei=354589052131731').success(function (data) {

     if(data=="result=1~-2")
     {

     $scope.alertConfig(
     {
     titleTitle:"提示",
     msgTitle:"密码可能在其它地方更改请重新登录",
     noClass:"hide",
         fn:function(flag){
             if(flag)
             {

                 $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
                 return;
             }
         }
     });

     return;
     }
     else
     {
         var tempParams={
             action:'getUserInfo',
             hostNumber:htn,
             password:pwd,
             productId:"1"

         };
         $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
   //  $http.post(urlAdd+'/MCSSECNUM/userctrl?action=getUserInfo&hostNumber=' + htn + '&password=' + pwd + '&productId=1').success(function (data) {

     if(data.code=="0")
     {
         var tempUserM=eval(data);
         tempUserM.passWord=pwd;
         tempUserM.isChange=false;
         UserM.setUserInfo(tempUserM);
         $myCookieStore.put("userMessage",eval(data));
     if(data.bindNumberStatus==tempGlobalConst.bindNumberStatus.NUMBER_STATUS_IS_BOUND||data.bindNumberStatus=="2")
     {

         var tempParams={
             action:'getSecondNumInfo',
             hostNumber:htn,
             password:pwd,
             secondNum:data.bindNumber
         };
         $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
      //   $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + data.bindNumber).success(function (dataS) {

         var tempSecondNumberInfo=eval(dataS);
         SecondNum.setAllSecondNumInfo(tempSecondNumberInfo);
         $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo);

     }).error(function (data, status, headers, config) {
         $scope.alertConfig(
             {
                 noClass:"hide",
                 titleTitle:"提示",
                 msgTitle:"系统维护中"

             });
         return;
     });
     }

     if(tempUserM.haveReserve)
     {
         var tempParams={
             action:'getReservedSecondNum',
             hostNumber:htn,
             password:pwd
         };
         $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
   //  $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getReservedSecondNum&hostNumber=' + htn + '&password=' + pwd).success(function (dataR) {
     var tempReserveInfo=eval(dataR);
     tempReserveInfo.webIsHave=true;
     SecondNum.setReserveInfo(tempReserveInfo);
     $myCookieStore.put("reserveMessage",tempReserveInfo);
     if(tempReserveInfo.numbers[0].secondNum!=""||tempReserveInfo.numbers[0].secondNum!=undefined)
     {

         var tempParams={
             action:'getSecondNumInfo',
             hostNumber:htn,
             secondNum:tempReserveInfo.numbers[0].secondNum,
             password:pwd
         };
         $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:GlobalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {
    // $http.post(urlAdd+'/MCSSECNUM/clientctrl?action=getSecondNumInfo&hostNumber=' + htn + '&password=' + pwd + '&secondNum=' + tempReserveInfo.numbers[0].secondNum).success(function (dataRS) {

     var tempReserveSecondNumberInfo=eval(dataRS);
     SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
     $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);




     }).error(function (data, status, headers, config) {
         $scope.alertConfig(
             {
                 noClass:"hide",
                 titleTitle:"提示",
                 msgTitle:"系统维护中"

             });
         return;
     });
     }
     }).error(function (data, status, headers, config) {
         $scope.alertConfig(
             {
                 noClass:"hide",
                 titleTitle:"提示",
                 msgTitle:"系统维护中"

             });
         return;
     });

     }




     }
     }).error(function (data, status, headers, config) {

         $scope.alertConfig(
             {
                 noClass:"hide",
                 titleTitle:"提示",
                 msgTitle:"系统维护中"

             });
         return;
     });


     }

return;
     }).error(function (data, status, headers, config) {

         $scope.alertConfig(
             {
                 noClass:"hide",
                 titleTitle:"提示",
                 msgTitle:"系统维护中"

             });
         return;
     });


     }

     }).error(function (data, status, headers, config) {

             $scope.alertConfig(
                 {
                     noClass:"hide",
                     titleTitle:"提示",
                     msgTitle:"系统维护中"

                 });
             return;
     });

     }


     }

    $scope.clickNavDownLeft=function()
    {
        var tempUserM=UserM.getUserInfo();

        var user={
            password:tempUserM.passWord,
                hostNumber:tempUserM.hostNumber
        };
     //   $scope.updateAllInfo(user);
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MYBILL);
    }
    $scope.clickNavDownCenter=function()
    {
        var tempUserM=UserM.getUserInfo();

        var user={
            password:tempUserM.passWord,
            hostNumber:tempUserM.hostNumber
        };
      //  $scope.updateAllInfo(user);
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
    }
    $scope.clickNavDownRight=function()
    {
        var tempUserM=UserM.getUserInfo();
        var user={
            password:tempUserM.passWord,
            hostNumber:tempUserM.hostNumber
        };
      //  $scope.updateAllInfo(user);
        $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.MORE);
    }


    var tempUserMessage=$myCookieStore.get("userMessage");
    if(tempUserMessage)
    {
        UserM.setUserInfo(tempUserMessage);
        var tempSecondNumInfo=$myCookieStore.get("secondNumberMessage");
        if(tempSecondNumInfo)
        {
            SecondNum.setAllSecondNumInfo(tempSecondNumInfo);
        }
        var tempReserveInfo= $myCookieStore.get("reserveMessage");
        if(tempReserveInfo)
        {
            SecondNum.setReserveInfo(tempReserveInfo);
        }
        var tempath=$location.path();
//        if(tempath=="/"+GlobalVar.getGlobalConst().ROUTEPROVIDER.LINK)
//        {
//            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LINK);
//            return;
//        }
        if(tempath==""||"/login")
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.CALLNUM);
            return;
        }
         $location.path(tempath);


        return;
    }
    else
    {
        var tempath=$location.path();
        if(tempath=="/"+GlobalVar.getGlobalConst().ROUTEPROVIDER.LINK)
        {

            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.LINK);
            return;
        }
        else
        {
            $location.path(GlobalVar.getGlobalConst().ROUTEPROVIDER.AD);
            return;
        }

    }

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
