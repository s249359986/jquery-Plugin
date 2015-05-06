/**
 * Created by bill on 15/5/6.
 */
/**
 * jQuery EasyUI 1.4.2
 *
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
/**
 * combobox - jQuery EasyUI
 *
 * Dependencies:
 *   combo
 *
 */
(function($){
    var COMBOBOX_SERNO=0;
    function create(target){//target===this当前id
        var state = $.data(target, 'combobox');
        var opts = state.options;
        COMBOBOX_SERNO++;
        var tempH=$(target).outerHeight();
        var tempW=$(target).outerWidth();
        var tempOffset={
            left:$(target).offset().left,
            top:$(target).offset().top+tempH+2
        }
        var h1='<div style="background-color: #ff0000;height: 10px;width: 10px;position: absolute;left:'+tempOffset.left+'px;top:'+tempOffset.top+'px;"></div>';

        $(target).bind("click",function(){
            $(h1).appendTo($(document.body));
        });




    }
var jqueryName="combobox";

    $.fn.combobox = function(options, param){

        return this.each(function(el_id){

            var state = $.data(this, jqueryName);
            if (state){
                $.extend(state.options, options);
                create(this);

            } else {

                state = $.data(this, jqueryName, {
                    options: $.extend({}, $.fn.combobox.defaults, options)


                });
                create(this);
            }


        });
    };
    $.fn.combobox.defaults= $.extend({},{},{a:"a",b:"b"});





})(jQuery);
