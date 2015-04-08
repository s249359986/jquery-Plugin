/**
 * Created by bill on 15-1-27.
 */





(function (root, factory) {
    // debugger;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jQuery Switch
        // define(['zepto'], factory); // Zepto Switch
    } else {
        // Browser globals
        if(root.jQuery) { // Use jQuery if available
            factory(root.jQuery);
        } else { // Otherwise, use Zepto
            factory(root.Zepto);
        }
    }
}(this, function ($, undefined) {
    var self=this;
    $.fn.bComboBox = function( options,param) {
        var _self=this;

        if(typeof options =='string')
        {
            var method= $.fn.bComboBox.methods[options];
            if(method)
            {
                return method(_self,param);
            }
        }
        if (!$.data(this, "bUIbComboBox")) {
            $.data(this, "bUIbComboBox", new $.bComboBox( options, this ));
        }
        return _self;
    };
    $.bComboBox = function( options, element ) {
        var _self=this;
        var  defaultOpt={ // Instanced in $.jPlayer() constructor
            //  swfPath: "js", // Path to Jplayer.swf. Can be relative, absolute or server root relative.
            //    solution: "html, flash", // Valid solutions: html, flash. Order defines priority. 1st is highest,
            //     supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
            audioObj:null,
            count:0,
            audioInfo:{
                title:"",
                src:""
            },

            inputName:"buiSel",
            onSelect:null,//开发事件
            onSelected:null,
            asyData:null,
            Event:{
                clickSel:function(){
                    var tempImgUrl= $(".bui-selText").css("backgroundImage");

                    if($(".bui-selList").is(':hidden'))
                    {
                        tempImgUrl=tempImgUrl.replace("selDown.png","selUp.png");
                        $(".bui-selText").css("backgroundImage",tempImgUrl);
                        $(".bui-selList").show();
                    }
                    else
                    {
                       // var tempImgUrl= $(".bui-selText").css("backgroundImage");
                        tempImgUrl=tempImgUrl.replace("selUp.png","selDown.png");
                        $(".bui-selText").css("backgroundImage",tempImgUrl);
                        $(".bui-selList").hide();
                    }
                    if(_self.options.onSelect)
                    {
                        _self.options.onSelect("ddd");
                    }
                },
                clickItem:function(){
                    var tempText= $(this).text();
                    $("#"+_self.selOptId+" .bui-selText").text(tempText);
                    $(".bui-selList").hide();
                    if(_self.options.onSelected)
                    {
                        _self.options.onSelected(tempText);
                    }
                }
            },
            Method:{

            }
        };
        var newOpt= $.extend(defaultOpt,options);
        this.options=newOpt;
        this.ele=element;
        this._init();
    };
    function setValues(target,values){//this-->window


        target.find(".bui-selText").text(values);


    }
    $.fn.bComboBox.methods={
        setValue:function(jq,value){
            setValues(jq,value);
        }
    };
    $.bComboBox.bFn=$.bComboBox.prototype;
    $.bComboBox.bFn._init=function(){
        var _self=this;
        var tempTitle='请选择';
        var tempOpt=_self.options;

        var tempId=_self.ele.attr("id")+"bComboBox"+tempOpt.count;
        var tempCurObj=$(_self.ele);
        var tempOffset=tempCurObj.offset();
        var tempLeft=tempOffset.left+"px";
        var tempTop=tempOffset.top+30+"px";
        _self.selOptId=tempId;
        function eventBind(e,fn,clzz)
        {
            if(clzz)
            {
                clzz=" ."+clzz;
            }
            else
            {
                clzz="";
            }
            $("#"+tempId+clzz).bind(e,fn);
        }
        function eventBindClazz(e,fn,clzz)
        {
            if(clzz)
            {
                clzz="."+clzz;
            }
            else
            {
                clzz="";
            }
            $(clzz).bind(e,fn);
        }
        if(tempOpt.asyData)
        {

            BW_GLOBAL.utill.bwAjax("get",tempOpt.asyData.url,"",function(data){
                var tempData=data.data;
                var tempLI='';
                for(var i in tempData)
                {
                    var tempName=tempData[i]["name"];
                    var tempObjId=tempData[i]["objectId"];

                    tempLI+='<li><a class="bui-sel-item" href="javascript:;">'+tempName+'</a></li>';

                }

                var tempSelListTextH='<ul>'+tempLI+'</ul>';
                var tempSelListH='<div class="bui-selList" style="display: none;position: absolute;left:'+tempLeft+';top:'+tempTop+';">'+tempSelListTextH+'</div>';
                var tempSelTextH='<div class="bui-selText">'+tempTitle+'</div>';
                var tempSelInputH='<input type="hidden" name="'+tempOpt.inputName+'" class="bui-input" value="" />';//hideInput
                var tempWrapH='<div class="bui-selWrap" id='+tempId+' style="">'+tempSelTextH+tempSelInputH+'</div>';
                $(document.body).append(tempSelListH);
                _self.ele.append(tempWrapH);
                eventBind("click",tempOpt.Event.clickSel,"bui-selText");
                eventBindClazz("click",tempOpt.Event.clickItem,"bui-sel-item");

            });
        }
        else
        {
//            var tempSelListTextH='<ul><li><a class="bui-sel-item" href="javascript:;">娱乐</a></li><li><a class="bui-sel-item" href="javascript:;">生活</a></li></ul>';
//            var tempSelListH='<div class="bui-selList" style="display: none;position: absolute;left:'+tempLeft+';top:'+tempTop+';">'+tempSelListTextH+'</div>';
//            var tempSelTextH='<div class="bui-selText">'+tempTitle+'</div>';
//            var tempWrapH='<div id='+tempId+' style="">'+tempSelTextH+'</div>';
//            $(document.body).append(tempSelListH);
//            _self.ele.append(tempWrapH);
//            eventBind("click",tempOpt.Event.clickSel,"bui-selText");
//            eventBindClazz("click",tempOpt.Event.clickItem,"bui-sel-item");
        }


        this.options.count++;

       // eventBind("click",tempOpt.Event.clickSel,"bui-selText");
        //eventBindClazz("click",tempOpt.Event.clickItem,"bui-sel-item");
       // eventBind("progress",tempOpt.Event.progress);
      //  eventBind("timeupdate",tempOpt.Event.timeupdate);
      //  var audioObj=document.getElementById(tempId);
    };



}));

