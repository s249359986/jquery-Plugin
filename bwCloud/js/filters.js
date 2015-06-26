'use strict';

/* Filters */
/*应用的过滤配置在此设置*/
/*过滤demo*/
angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).filter("balanceLogType", function () {
        return function (value) {
            if (value == 1) {
                return "语音消耗";
            } else if (value == 2) {
                return "号码消耗";
            } else if (value == 3) {
                return "充值";
            } else if (value == 4) {
                return "赠送";
            } else {
                return "其他";
            }
        };
    });
