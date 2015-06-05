'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
/*
    angular.module('myApp.services', []).
    value('version', '0.1');
	*/
	  var serverces=angular.module('myApp.services', []).
    value('version', '0.1');



/**
 * @ngdoc serverce
 * @name PackageInfo
 *
 * @description
 * 用来存放套餐信息，在会话被所有controller共享使用
 *
 * @param $location
 * @returns
 */
	serverces.factory('PackageInfo',function(){
		var packageInfo={};
		var packageTypeInfo={};
		packageInfo.getPackageList=function()
		{
			return packageTypeInfo;
		}
		packageInfo.setPackageList=function(data)
		{
			packageTypeInfo=data;
		}
		return packageInfo;
	});

/**
 * @ngdoc serverce
 * @name UserM
 *
 * @description
 * 用来存放登录用户信息，在会话被所有controller共享使用
 *
 * @param $location
 * @returns
 */

	serverces.factory('UserM',function(){
		var userM={};
		var userInfo={//用户信息对象
            //passWord:"",
            balance:"0",
            jifen:"0",
            talkTimeRemain:"0",
            talkTimeRemainCaller:"0",
            talkTimeRemainCalled:"0",
            isLogin:false,//判断用户登录情况
            isChange:false//用户信息是否改变
        };
		userM.getUserInfo=function()
		{
			return userInfo;
		}
		userM.setUserInfo=function(data)
		{
			userInfo=data;
            userInfo.isLogin=true;
		}
        userM.clearAll=function()
        {
            userInfo=null;
            return true;
        }
		return userM;
	});

/**
 * @ngdoc serverce
 * @name SecondNum
 *
 * @description
 * 用来存放用户的二号信息，在会话被所有controller共享使用
 *
 * @param $location
 * @returns
 */

	
	serverces.factory('SecondNum',function($http){
	
	var secondNum={};
	var tempData={};
    var reserveInfo={};
	var secondNumInfo={//套餐详情信息

    };
    var allNumberTypesInfo={};//所有号码类型以及信息
    var allSecondNumInfo={//存放二号全部信息变量

    };
    var allReserveSecondNumInfo={};//存储预留号码信息
	var packageTypeInfo={};
    secondNum.getAllNumberTypesInfo=function()
    {
        return allNumberTypesInfo;
    }
    secondNum.setAllNumberTypesInfo=function(data)
    {
        allNumberTypesInfo=data;
    }

    secondNum.getAllReserveSecondNumInfo=function()
    {
        return allReserveSecondNumInfo;

    }
    secondNum.setAllReserveSecondNumInfo=function(data)
    {
        allReserveSecondNumInfo=data;
    }
	secondNum.getSeconNumInfo=function()
	{
			return secondNumInfo;
		
	}
	secondNum.setSecondNumInfo=function(data)
	{
		secondNumInfo=data;
	}
   secondNum.getAllSeconNumInfo=function()
    {
        return allSecondNumInfo;
    }
    secondNum.setAllSecondNumInfo=function(data)
    {
        allSecondNumInfo=data;


    }
        secondNum.getReserveInfo=function()
        {
            return reserveInfo;
        }
        secondNum.setReserveInfo=function(data)
        {
            reserveInfo=data;


        }
	
	return secondNum;
	
	});










/**
 * @ngdoc serverce
 * @name GlobalVar
 *
 * @description
 * 包含应用中所用到的常量和验证，
 *
 * @param $location
 * @returns
 */

serverces.factory('GlobalVar',['$http','$location','UserM','$myCookieStore','SecondNum',function($http,$location,UserM,$myCookieStore,SecondNum){
    var promise;
    var waitTime=30;
    var globalFn={         //全局工具类，主要包含登录找回密码等验证

        loginValFn:function(viewValue)//登录验证工具
        {
            var reg =/^[1][1-9][0-9]{9}$/;
            var state={
                isPass:true,
                msg:""
            };

            if(viewValue==undefined)
            {
                state={
                    isPass:false,
                    msg:"有未填项或者特殊字符输入"
                };
                return state;
            }
            if(viewValue.hostNumber==undefined||viewValue.hostNumber=="")
            {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };
                return state;
            }
            if(viewValue.password==undefined||viewValue.password=="")
            {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };
                return state;
            }
            if(viewValue.password.length<6||viewValue.password.length>8)
            {
                state={
                    isPass:false,
                    msg:"请输入6-8位密码"
                };
                return state;
            }
            var reg1_34578=/^[1][3|4|5|7|8]/;
            var r = viewValue.hostNumber.match(reg);
            var r2 = viewValue.hostNumber.match(reg1_34578);

            if (r ==null||viewValue.hostNumber.length!=11||r2==null) {

                state={
                    isPass:false,
                    msg:"您输入的手机号码格式错误，请重新输入"
                };
                return state;

            }

            return state;

        },
        registerValFn:function(viewValue)//注册验证函数
        {

            var state={
                isPass:true,
                msg:""
            };

            if(viewValue==undefined)
            {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };
                return state;
            }
            if(viewValue.hostNumber==undefined||viewValue.hostNumber==""||viewValue.password==""||viewValue.password==undefined)
            {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };
                return state;
            }
            if(!viewValue.ck)
            {
                state={
                    isPass:false,
                    msg:"请阅读并同意使用条款和隐私政策"
                };
                return state;
            }

            var reg1 =/^[1][1-9][0-9]{9}$/;
            var reg1_34578=/^[1][3|4|5|7|8]/;

            var tempNum=viewValue.hostNumber;

            var r1 = tempNum.toString().match(reg1);
            var r2 = tempNum.toString().match(reg1_34578);

            if (r1==null||tempNum.toString().length!=11||r2==null){

                state={
                    isPass:false,
                    msg:"您输入的手机号码格式错误，请重新输入"
                };
                return state;

            }
            if(viewValue.password.length<6||viewValue.password.length>8)
            {
                state={
                    isPass:false,
                    msg:"请输入6-8位密码"
                };
                return state;
            }

            return state;


        },
        pwdFindValFn:function(user)//找回密码验证函数
        {
            var state={
                isPass:true,
                msg:""
            };
            if (user == undefined || user.newPwd == undefined || user.surePwd == undefined) {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };

                return state;
            }
            if(user.newPwd.length<6||user.newPwd.length>8)
           {
            state={
                isPass:false,
                msg:"请输入6-8位密码"
            };
            return state;
           }

            if(user.newPwd != user.surePwd)
            {
                state={
                    isPass:false,
                    msg:"您输入的新密码不一致，请重新输入"
                };
                return state;
            }

            return state;


        },
        telNumValFn:function(viewValue){//电话号码验证函数
            var reg =/^[1][1-9][0-9]{9}$/;
            var state={
                isPass:true,
                msg:""
            };

            if(viewValue==undefined)
            {
                state={
                    isPass:false,
                    msg:"有未填项或者特殊字符输入"
                };
                return state;
            }
            if(viewValue.smscode==undefined||viewValue.smscode=="")
            {
                state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };
                return state;
            }
            var reg1_34578=/^[1][3|4|5|7|8]/;
            var r = viewValue.smscode.match(reg);
            var r2 = viewValue.smscode.match(reg1_34578);
            if (r ==null||viewValue.smscode.length!=11||r2==null) {

                state={
                    isPass:false,
                    msg:"您输入的手机号码格式错误，请重新输入"
                };
                return state;

            }

            return state;

        },
        pwdChangeValFn:function(user){//密码修改验证函数
             var state={
                 isPass:true,
                 msg:""
             };
            if (user == undefined || user.oldPassword == undefined || user.newPassword1 == undefined || user.newPassword2 == undefined) {
               state={
                    isPass:false,
                    msg:"有未填项或有特殊字符输入"
                };

                return state;
            }
            if(user.newPassword1.length<6||user.newPassword1.length>8)
            {
                state={
                    isPass:false,
                    msg:"请输入6-8位密码"
                };
                return state;
            }
            if(user.oldPassword != user.oldPwd)
            {
                state={
                    isPass:false,
                    msg:"您输入的旧密码错误，请重新输入"
                };
                return state;
            }
            if(user.newPassword1 != user.newPassword2)
            {
                state={
                    isPass:false,
                    msg:"您输入的新密码不一致，请重新输入"
                };
                return state;
            }
            return state;

        }
    };
    var globalVar={};
    //全局常量
    var globalConst={
            CHOOSESECONDNUM_CODE:{SUC:"0",HAVEYL:"2"},//SUC成功，HAVEYL已经有预留
            QUICKBINDSECONDNUMBER_CODE:{SUC:"0",NOMONEY:"1",HAVEYL:"2"},//SUC成功，NOMONEY余额不足即将预留，HAVEYL已经有预留
           ROUTEPROVIDER:{LOGIN:"login",//登录
            REGISTER:"register",//注册
            FINDPWD:"findpwd",//找回密码
            CALLNUM:"callNum",//拨号
            MYBILL:"myBill",//账单
            ACCOUNTPREPAID:"accountPrepaid",//充值
            LINK:"link",//外部程序入口
            MYRESERVE:"myReserve",//预留
            PREPAIDMESSAGE:"prepaidMessage",//付款信息
            CHANGEPACKAGE:"changePackage",//变更套餐
            CHANGEPACKAGESTEP2:"changePackageStep2",
            SELECTNUM:"selectNum",
            CHANGEPWD:"changePwd",
            MORE:"more",
            PACKAGECONTENT:"packageContent",//套餐详情
            AD:"ad"//广告

        },
        secondReserve:{value:"查看预留",key:0,url:"myReserve"},//没有绑定二号也没有预留时显示此项
        noSecond:{value:"立即选号",key:1,url:"selectNum"},//没有绑定二号但是有预留时显示此项
        noLogin:{value:"未登录",key:2,url:"login"},//没有绑定二号但是有预留时显示此项
     //   NUMBER_STATUS_IS_LOCKED:3,
       // NUMBER_STATUS_IS_BOUND:2,
        NUMBER_LIST_COUNT:"10",//号码列表数量
        PRODUCTID:"1",//产品id
        VERSIONNAME:"4.6.0",//版本编号
        CHANNELID:"12000",//channelid
        CLIENTTYPE:"android",//客户端类型
        METHODNAME:"post",//请求方式
        bindNumberStatus:{NUMBER_STATUS_IS_BOUND:"0",NUMBER_STATUS_NOT_BOUND:""}//二号绑定状态暂定为两个状态
    };
    var callingNum={};
    globalVar.getGlobalFn=function()
    {
        return globalFn;
    }
    globalVar.setCallingNum=function(data)
    {
        callingNum=data;
    }
    globalVar.getCallingNum=function()
    {
        return callingNum;
    }
    globalVar.getGlobalConst=function()
    {
        return globalConst;
    }

    var urlInfo={//服务器ip地址
   //     urlAdd:"http://211.150.170.168:8080"//异常连接
       urlAdd:"http://211.150.70.168:8080"//测试地址
   //urlAdd:"http://211.157.148.4:8080"//正式地址
    };

    /**
     * @ngdoc method
     * @name getUrlInfo
     *
     * @description
     * 获得服务器ip地址
     *
     * @param $location
     * @returns
     */

    globalVar.getUrlInfo=function()
    {
        return urlInfo;
    }
    globalVar.setUrlInfo=function(data)
    {
        urlInfo=data;
    }


    /**
     * @ngdoc
     * @name updateAllInfo
     *
     * @description
     * 更新数据：session,cookies
     *
     * @param $scope当前页面的$scope
     * @returns
     */

    globalVar.updateAllInfo=function($scope)
    {
        var tempUserInfo=UserM.getUserInfo();
        if (!tempUserInfo.isLogin)
        {
          //  $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
        }
        var tempUpdateUser={
            password:tempUserInfo.passWord,
            hostNumber:tempUserInfo.hostNumber
        };
        var user=tempUpdateUser;

        var urlAdd=globalVar.getUrlInfo().urlAdd;
        var tempGlobalConst=globalVar.getGlobalConst();
        if (user == undefined || user.password == undefined || user.hostNumber == undefined||user.password == "" || user.hostNumber =="") {

            $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
        }
        else {
            var htn = user.hostNumber;
            var pwd = user.password;
            var tempParams={
                action:'userExist',
                hostNumber:htn
            };


            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {//对象形式传参数

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
                        versionName:"4.6.0",
                        clientType:"android",
                        productId:globalVar.getGlobalConst().PRODUCTID,
                        imsi:"89860112241106400670",
                        imei:"354589052131731"

                    };
                    $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {

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
                                hostNumber:htn,
                                password:pwd,
                                productId:"1"
                            };
                            $http({url:urlAdd+'/MCSSECNUM/userctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (data) {
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
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataS) {
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
                                        $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataR) {
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
                                                $http({url:urlAdd+'/MCSSECNUM/clientctrl?',method:globalVar.getGlobalConst().METHODNAME,params:tempParams}).success(function (dataRS) {
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


        return;





    };
/*
    globalVar.updateAllInfoAsync=function($scope)
    {
        var tempUserInfo=UserM.getUserInfo();
        if (tempUserInfo==null)
        {
            $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
        }
        var tempUpdateUser={
            password:tempUserInfo.passWord,
            hostNumber:tempUserInfo.hostNumber
        };
        var user=tempUpdateUser;

        var urlAdd=globalVar.getUrlInfo().urlAdd;
        var tempGlobalConst=globalVar.getGlobalConst();
        if (user == undefined || user.password == undefined || user.hostNumber == undefined||user.password == "" || user.hostNumber =="") {

            $location.path(globalVar.getGlobalConst().ROUTEPROVIDER.LOGIN);
            return;
        }
        else {
            var htn = user.hostNumber;
            var pwd = user.password;
            var tempParams={
                action:'userExist',
                hostNumber:htn
            };




            $.ajax({
                type: "POST",
                url: urlAdd+'/MCSSECNUM/userctrl?',
                data: tempParams,
                async: false,
                success: function (data, textStatus) {
                    // data could be xmlDoc, jsonObj, html, text, etc...

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
                            versionName:"4.6.0",
                            clientType:"android",
                            productId:globalVar.getGlobalConst().PRODUCTID,
                            imsi:"89860112241106400670",
                            imei:"354589052131731"

                        };
                        $.ajax({
                            type: "POST",
                            url: urlAdd+'/MCSSECNUM/userctrl?',
                            data: tempParams,
                            async: false,
                            dataType:"html",
                                success: function (data, textStatus) {

                                // data could be xmlDoc, jsonObj, html, text, etc...
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
                                        hostNumber:htn,
                                        password:pwd,
                                        productId:"1"
                                    };

                                    $.ajax({
                                        type: "POST",
                                        url: urlAdd+'/MCSSECNUM/userctrl?',
                                        data: tempParams,
                                        async: false,
                                        success: function (data, textStatus) {

                                            // data could be xmlDoc, jsonObj, html, text, etc...
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



                                                    $.ajax({
                                                        type: "POST",
                                                        url: urlAdd+'/MCSSECNUM/clientctrl?',
                                                        data: tempParams,
                                                        async: false,
                                                        success: function (dataS, textStatus) {
                                                            // data could be xmlDoc, jsonObj, html, text, etc...
                                                            var tempSecondNumberInfo=eval(dataS);

                                                            SecondNum.setAllSecondNumInfo(tempSecondNumberInfo);
                                                            $myCookieStore.put("secondNumberMessage",tempSecondNumberInfo);
                                                        },
                                                        error :function (XMLHttpRequest, textStatus, errorThrown) {
                                                            // 通常情况下textStatus和errorThown只有其中一个有值
                                                           // this; // the options for this ajax request
                                                        }
                                                    });

                                                }

                                                if(tempUserM.haveReserve)
                                                {
                                                    var tempParams={
                                                        action:'getReservedSecondNum',
                                                        hostNumber:htn,
                                                        password:pwd
                                                    };


                                                    $.ajax({
                                                        type: "POST",
                                                        url: urlAdd+'/MCSSECNUM/clientctrl?',
                                                        data: tempParams,
                                                        async: false,
                                                        success: function (dataR, textStatus) {
                                                            // data could be xmlDoc, jsonObj, html, text, etc...
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


                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: urlAdd+'/MCSSECNUM/clientctrl?',
                                                                    data: tempParams,
                                                                    async: false,
                                                                    success: function (dataRS, textStatus) {
                                                                        // data could be xmlDoc, jsonObj, html, text, etc...
                                                                        var tempReserveSecondNumberInfo=eval(dataRS);
                                                                        SecondNum.setAllReserveSecondNumInfo(tempReserveSecondNumberInfo);
                                                                        $myCookieStore.put("reserveSecondNumberMessage",tempReserveSecondNumberInfo);

                                                                    },
                                                                    error :function (XMLHttpRequest, textStatus, errorThrown) {
                                                                        // 通常情况下textStatus和errorThown只有其中一个有值
                                                                        this; // the options for this ajax request
                                                                    }
                                                                });


                                                            }
                                                        },
                                                        error :function (XMLHttpRequest, textStatus, errorThrown) {
                                                            // 通常情况下textStatus和errorThown只有其中一个有值
                                                            // this; // the options for this ajax request
                                                        }
                                                    });

                                                }


                                            }
                                        },
                                        error :function (XMLHttpRequest, textStatus, errorThrown) {
                                            // 通常情况下textStatus和errorThown只有其中一个有值

                                        }
                                    });

                                }

                                return;
                            },
                            error :function (XMLHttpRequest, textStatus, errorThrown) {
                                // 通常情况下textStatus和errorThown只有其中一个有值


                            }
                        });



                    }

                },
                error :function (XMLHttpRequest, textStatus, errorThrown) {
                    // 通常情况下textStatus和errorThown只有其中一个有值
                //    this; // the options for this ajax request
                    $scope.alertConfig(
                        {
                            noClass:"hide",
                            titleTitle:"提示",
                            msgTitle:"系统维护中"

                        });
                    return;
                }
            });



        }


        return;





    };
    */
    return globalVar;

}]);








/**
 * @ngdoc method
 * @name $myCookieStore
 *
 * @description
 * 重写angularjs的$cookieStored对象实现关闭浏览器而不清楚cookie
 *
 * @param {string} key Id to use for lookup.
 * @returns {Object} Deserialized cookie value.
 */



serverces.factory('$myCookieStore', ['$cookies', function($cookies) {
   var setMyCookie=function(name,value)
    {


        if(window.localStorage)
        {
            localStorage.setItem(name , value);
        }
        else {


            var Days = 30; //此 cookie 将被保存 30 天

            var exp = new Date();    //new Date("December 31, 9998");

            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

            //  document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
            document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();

        }



    };
    var getMyCookie=function(name)
    {
        if(window.localStorage)
        {
           var larr= localStorage.getItem(name);
            if(larr != null) return larr; return null;
        }
        else
        {
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            // if(arr != null) return unescape(arr[2]); return null;
            if(arr != null) return decodeURIComponent(arr[2]); return null;

        }

    };
    var delMyCookie=function(name)
    {
        if(window.localStorage)
        {
            var lcval=getMyCookie(name);
            if(lcval!=null) {
                localStorage.removeItem(name);
            }
        }
        else
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            //  var cval=globalVar.getMyCookie(name);
            var cval=getMyCookie(name);
            if(cval!=null) document.cookie= name + "="+encodeURIComponent(cval)+";expires="+exp.toGMTString();

        }




    }
    return {
        /**
         * @ngdoc method
         * @name $cookieStore#get
         *
         * @description
         * Returns the value of given cookie key
         *
         * @param {string} key Id to use for lookup.
         * @returns {Object} Deserialized cookie value.
         */
        get: function(key) {
           // var value = $cookies[key];
         //   var value=GlobalVar.getMyCookie(key);
            var value=getMyCookie(key);
            return value ? angular.fromJson(value) : value;
        },

        /**
         * @ngdoc method
         * @name $cookieStore#put
         *
         * @description
         * Sets a value for given cookie key
         *
         * @param {string} key Id for the `value`.
         * @param {Object} value Value to be stored.
         */
        put: function(key, value) {
        //    $cookies[key] = angular.toJson(value);
          //  GlobalVar.setMyCookie(key,angular.toJson(value));
            setMyCookie(key,angular.toJson(value));

        },

        /**
         * @ngdoc method
         * @name $cookieStore#remove
         *
         * @description
         * Remove given cookie
         *
         * @param {string} key Id of the key-value pair to delete.
         */
        remove: function(key) {
           // delete $cookies[key];
          //  GlobalVar.delMyCookie(key);
            delMyCookie(key);
        }
    };

}]);



/*
* ajax同步请求模板
* */
/*


 $.ajax({
 type: "POST",
 url: urlAdd+'/MCSSECNUM/userctrl?',
 data: tempParams,
 async: false,
 success: function (data, textStatus) {
 // data could be xmlDoc, jsonObj, html, text, etc...
 this; // the options for this ajax request
 },
 error :function (XMLHttpRequest, textStatus, errorThrown) {
 // 通常情况下textStatus和errorThown只有其中一个有值
 this; // the options for this ajax request
 }
 });


*/