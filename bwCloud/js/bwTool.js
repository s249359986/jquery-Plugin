/**
 * Created by bill on 15/7/7.
 */
bwConfig.tool=(function(){


       var  dateFormat=function(dt,fmt){
            if(fmt==undefined)
            {
                fmt="yyyy年MM月dd日hh小时mm分ss秒";
            }
            var that=dt;
            var o = {
                "M+": that.getMonth() + 1, //月份
                "d+": that.getDate(), //日
                "h+": that.getHours(), //小时
                "m+": that.getMinutes(), //分
                "s+": that.getSeconds(), //秒
                "q+": Math.floor((that.getMonth() + 3) / 3), //季度
                "S": that.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    return {dateFormat:dateFormat};




})();
