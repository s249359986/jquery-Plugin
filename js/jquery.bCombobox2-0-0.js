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
    var COMBOBOX_SERNO = 0;
    var styleClazz={
        comboboxItem:"combobox-item",
        textboxText:"textboxText"
    };

    function getRowIndex(target, value){
        debugger;
        var state = $.data(target, 'combobox');
        var opts = state.options;
        var data = state.data;
        for(var i=0; i<data.length; i++){
            if (data[i][opts.valueField] == value){
                return i;
            }
        }
        return -1;
    }

    /**
     * scroll panel to display the specified item
     */
    function scrollTo(target, value){
        var opts = $.data(target, 'combobox').options;
        var panel = $(target).combo('panel');
        var item = opts.finder.getEl(target, value);
        if (item.length){
            if (item.position().top <= 0){
                var h = panel.scrollTop() + item.position().top;
                panel.scrollTop(h);
            } else if (item.position().top + item.outerHeight() > panel.height()){
                var h = panel.scrollTop() + item.position().top + item.outerHeight() - panel.height();
                panel.scrollTop(h);
            }
        }
    }

    function nav(target, dir){
        var opts = $.data(target, 'combobox').options;
        var panel = $(target).combobox('panel');
        var item = panel.children('div.combobox-item-hover');
        if (!item.length){
            item = panel.children('div.combobox-item-selected');
        }
        item.removeClass('combobox-item-hover');
        var firstSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):first';
        var lastSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):last';
        if (!item.length){
            item = panel.children(dir=='next' ? firstSelector : lastSelector);
//			item = panel.children('div.combobox-item:visible:' + (dir=='next'?'first':'last'));
        } else {
            if (dir == 'next'){
                item = item.nextAll(firstSelector);
//				item = item.nextAll('div.combobox-item:visible:first');
                if (!item.length){
                    item = panel.children(firstSelector);
//					item = panel.children('div.combobox-item:visible:first');
                }
            } else {
                item = item.prevAll(firstSelector);
//				item = item.prevAll('div.combobox-item:visible:first');
                if (!item.length){
                    item = panel.children(lastSelector);
//					item = panel.children('div.combobox-item:visible:last');
                }
            }
        }
        if (item.length){
            item.addClass('combobox-item-hover');
            var row = opts.finder.getRow(target, item);
            if (row){
                scrollTo(target, row[opts.valueField]);
                if (opts.selectOnNavigation){
                    select(target, row[opts.valueField]);
                }
            }
        }
    }

    /**
     * select the specified value
     */
    function select(target, value){
        var opts = $.data(target, 'combobox').options;
        var values = $(target).combo('getValues');
        if ($.inArray(value+'', values) == -1){
            if (opts.multiple){
                values.push(value);
            } else {
                values = [value];
            }
            setValues(target, values);
            opts.onSelect.call(target, opts.finder.getRow(target, value));
        }
    }

    /**
     * unselect the specified value
     */
    function unselect(target, value){
        var opts = $.data(target, 'combobox').options;
        var values = $(target).combo('getValues');
        var index = $.inArray(value+'', values);
        if (index >= 0){
            values.splice(index, 1);
            setValues(target, values);
            opts.onUnselect.call(target, opts.finder.getRow(target, value));
        }
    }

    /**
     * set values
     */
    function setValues(target, values, remainText){
        var opts = $.data(target, 'combobox').options;
     //   var panel = $(target).combo('panel');

       // if (!$.isArray(values)){values = values.split(opts.separator)}
        //panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
//        var vv = [], ss = [];
//      //  for(var i=0; i<values.length; i++){
//            var v = values;//values[i];
//            var s = v;
//            opts.finder.getEl(target, v).addClass('combobox-item-selected');
//            var row = opts.finder.getRow(target, v);
//            if (row){
//                s = row[opts.textField];
//            }
//            vv.push(v);
//            ss.push(s);
      //  }

//        if (!remainText){
//            $(target).combo('setText', ss.join(opts.separator));
//        }
      //  $(target).combo('setValues', vv);


        $("."+styleClazz.textboxText).text(values);
    }

    /**
     * load data, the old list items will be removed.
     */
    function loadData(target, data, remainText){
        var state = $.data(target, 'combobox');
        var opts = state.options;

        state.data =data; //opts.loadFilter.call(target, data);
       // state.groups = [];
        data = state.data;

        var selected = $(target).combobox('getValues');
        var dd = [];
        var group = undefined;
        for(var i=0; i<data.length; i++){
            var row = data[i];
            var v = row[opts.valueField]+'';
            var s = row[opts.textField];
           // var g = row[opts.groupField];

//            if (g){
//                if (group != g){
//                    group = g;
//                    state.groups.push(g);
//                    dd.push('<div id="' + (state.groupIdPrefix+'_'+(state.groups.length-1)) + '" class="combobox-group">');
//                    dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
//                    dd.push('</div>');
//                }
//            } else {
//                group = undefined;
//            }

            var cls =styleClazz.comboboxItem;//'combobox-item' + (row.disabled ? ' combobox-item-disabled' : '') + (g ? ' combobox-gitem' : '');
            dd.push('<div id="' + (state.itemIdPrefix+'_'+i) + '" class="' + cls + '">');
           // dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
            dd.push(s);
            dd.push('</div>');

            $(".combo-panel").html(dd.join(''));
            $("."+styleClazz.comboboxItem).click(function(){
                $("."+styleClazz.textboxText).text($(this).text());
                opts.onSelect.call(target,state.options.finder.getRow(target,$(this).text()));
            });


//			if (item['selected']){
//				(function(){
//					for(var i=0; i<selected.length; i++){
//						if (v == selected[i]) return;
//					}
//					selected.push(v);
//				})();
//			}
//            if (row['selected'] && $.inArray(v, selected) == -1){
//                selected.push(v);
//            }
        }
      //  $(target).combo('panel').html(dd.join(''));

//        if (opts.multiple){
//            setValues(target, selected, remainText);
//        } else {
//            setValues(target, selected.length ? [selected[selected.length-1]] : [], remainText);
//        }

        opts.onLoadSuccess.call(target, data);
    }

    /**
     * request remote data if the url property is setted.
     */
    function request(target, url, param, remainText){
        var opts = $.data(target, 'combobox').options;
        if (url){
            opts.url = url;
        }
        param = $.extend({}, opts.queryParams, param||{});
//		param = param || {};

        if (opts.onBeforeLoad.call(target, param) == false) return;

        opts.loader.call(target, param, function(data){
            loadData(target, data, remainText);
        }, function(){
            opts.onLoadError.apply(this, arguments);
        });
    }

    /**
     * do the query action
     */
    function doQuery(target, q){
        var state = $.data(target, 'combobox');
        var opts = state.options;

        var qq = opts.multiple ? q.split(opts.separator) : [q];
        if (opts.mode == 'remote'){
            _setValues(qq);
            request(target, null, {q:q}, true);
        } else {
            var panel = $(target).combo('panel');
            panel.find('div.combobox-item-selected,div.combobox-item-hover').removeClass('combobox-item-selected combobox-item-hover');
            panel.find('div.combobox-item,div.combobox-group').hide();
            var data = state.data;
            var vv = [];
            $.map(qq, function(q){
                q = $.trim(q);
                var value = q;
                var group = undefined;
                for(var i=0; i<data.length; i++){
                    var row = data[i];
                    if (opts.filter.call(target, q, row)){
                        var v = row[opts.valueField];
                        var s = row[opts.textField];
                        var g = row[opts.groupField];
                        var item = opts.finder.getEl(target, v).show();
                        if (s.toLowerCase() == q.toLowerCase()){
                            value = v;
                            item.addClass('combobox-item-selected');
                        }
                        if (opts.groupField && group != g){
                            $('#'+state.groupIdPrefix+'_'+$.inArray(g, state.groups)).show();
                            group = g;
                        }
                    }
                }
                vv.push(value);
            });
            _setValues(vv);
        }
        function _setValues(vv){
            setValues(target, opts.multiple ? (q?vv:[]) : vv, true);
        }
    }

    function doEnter(target){
        var t = $(target);
        var opts = t.combobox('options');
        var panel = t.combobox('panel');
        var item = panel.children('div.combobox-item-hover');
        if (item.length){
            var row = opts.finder.getRow(target, item);
            var value = row[opts.valueField];
            if (opts.multiple){
                if (item.hasClass('combobox-item-selected')){
                    t.combobox('unselect', value);
                } else {
                    t.combobox('select', value);
                }
            } else {
                t.combobox('select', value);
            }
        }
        var vv = [];
        $.map(t.combobox('getValues'), function(v){
            if (getRowIndex(target, v) >= 0){
                vv.push(v);
            }
        });
        t.combobox('setValues', vv);
        if (!opts.multiple){
            t.combobox('hidePanel');
        }
    }

    /**
     * create the component
     */
    function create(target){
        var state = $.data(target, 'combobox');
        var opts = state.options;

        COMBOBOX_SERNO++;
        state.itemIdPrefix = '_easyui_combobox_i' + COMBOBOX_SERNO;
        state.groupIdPrefix = '_easyui_combobox_g' + COMBOBOX_SERNO;


        var tempH=$(target).outerHeight();
        var tempW=$(target).outerWidth();
        var tempOffset={
            left:$(target).offset().left,
            top:$(target).offset().top+tempH+2
        }


        $('<span style="position:relative;display:inline-block;width:'+tempW+'px; height:'+tempH+'px;"><span class="textbox-addon" style="position: absolute;right: 0px;top:0px;"><a class="combo-arrow" style="width: 18px;height: 22px;display: inline-block;"></a></span><div class='+styleClazz.textboxText+'></div></span>').addClass("combo").insertAfter($(target));

        $('<div class="combo-panel combo-panel-closed" style="display: none;height: 300px;width: 400px;background-color: #ff0000;"></div>').css("position","absolute").offset(tempOffset).appendTo($(document.body));
        $(target).hide();

        $(".textbox-addon").bind("click",function(){
            $(".combo-panel").hide();
            if($(".combo-panel").hasClass("combo-panel-closed"))
            {
                $(".combo-panel").removeClass("combo-panel-closed").show();
            }
            else
            {
                $(".combo-panel").addClass("combo-panel-closed").hide();
            }

        });

    }

    $.fn.combobox = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.combobox.methods[options];
            if (method){
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }

        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'combobox');
            if (state){
                $.extend(state.options, options);
                create(this);
            } else {

                state = $.data(this, 'combobox', {
                    options: $.extend({}, $.fn.combobox.defaults, options),
                    data: []
                });
                create(this);
                var data =[{id:1,title:"a1"},{id:2,title:"a2"}];// $.fn.combobox.parseData(this);
                if (data.length){
                    loadData(this, data);
                }
            }
            if (state.options.data){
                loadData(this, state.options.data);
            }
            request(this);
        });
    };


    $.fn.combobox.methods = {
        options: function(jq){
            var copts = {width:200,height:200,originalValue:"aa",disabled:true,readonly:true}//jq.combo('options');
            return $.extend($.data(jq[0], 'combobox').options, {
                width: copts.width,
                height: copts.height,
                originalValue: copts.originalValue,
                disabled: copts.disabled,
                readonly: copts.readonly
            });
        },
        getData: function(jq){
            return $.data(jq[0], 'combobox').data;
        },
        getValues: function(jq, values){
            return "aa";
        },
        setValues: function(jq, values){
            return jq.each(function(){
                setValues(this, values);
            });
        },
        setValue: function(jq, value){
            return jq.each(function(){
                setValues(this, [value]);
            });
        },
        clear: function(jq){
            return jq.each(function(){
                $(this).combo('clear');
                var panel = $(this).combo('panel');
                panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
            });
        },
        reset: function(jq){
            return jq.each(function(){
                var opts = $(this).combobox('options');
                if (opts.multiple){
                    $(this).combobox('setValues', opts.originalValue);
                } else {
                    $(this).combobox('setValue', opts.originalValue);
                }
            });
        },
        loadData: function(jq, data){
            return jq.each(function(){
                loadData(this, data);
            });
        },
        reload: function(jq, url){
            return jq.each(function(){
                if (typeof url == 'string'){
                    request(this, url);
                } else {
                    if (url){
                        var opts = $(this).combobox('options');
                        opts.queryParams = url;
                    }
                    request(this);
                }
            });
        },
        select: function(jq, value){
            return jq.each(function(){
                select(this, value);
            });
        },
        unselect: function(jq, value){
            return jq.each(function(){
                unselect(this, value);
            });
        }
    };

    $.fn.combobox.parseOptions = function(target){
        var t = $(target);
        return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target,[
            'valueField','textField','groupField','mode','method','url'
        ]));
    };

    $.fn.combobox.parseData = function(target){
        var data = [];
        var opts = $(target).combobox('options');
        $(target).children().each(function(){
            if (this.tagName.toLowerCase() == 'optgroup'){
                var group = $(this).attr('label');
                $(this).children().each(function(){
                    _parseItem(this, group);
                });
            } else {
                _parseItem(this);
            }
        });
        return data;

        function _parseItem(el, group){
            var t = $(el);
            var row = {};
            row[opts.valueField] = t.attr('value')!=undefined ? t.attr('value') : t.text();
            row[opts.textField] = t.text();
            row['selected'] = t.is(':selected');
            row['disabled'] = t.is(':disabled');
            if (group){
                opts.groupField = opts.groupField || 'group';
                row[opts.groupField] = group;
            }
            data.push(row);
        }
    };

    $.fn.combobox.defaults = $.extend({}, {}, {
        valueField: 'value',
        textField: 'text',
        groupField: null,
        groupFormatter: function(group){return group;},
        mode: 'local',	// or 'remote'
        method: 'post',
        url: null,
        data: null,
        queryParams: {},

        keyHandler: {
            up: function(e){nav(this,'prev');e.preventDefault()},
            down: function(e){nav(this,'next');e.preventDefault()},
            left: function(e){},
            right: function(e){},
            enter: function(e){doEnter(this)},
            query: function(q,e){doQuery(this, q)}
        },
        filter: function(q, row){
            var opts = $(this).combobox('options');
            return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
        },
        formatter: function(row){
            var opts = $(this).combobox('options');
            return row[opts.textField];
        },
        loader: function(param, success, error){
            var opts = $(this).combobox('options');
            if (!opts.url) return false;
            $.ajax({
                type: opts.method,
                url: opts.url,
                data: param,
                dataType: 'json',
                success: function(data){
                    success(data);
                },
                error: function(){
                    error.apply(this, arguments);
                }
            });
        },
        loadFilter: function(data){

            return data;
        },
        finder:{
            getEl:function(target, value){
                var index = getRowIndex(target, value);
                var id = $.data(target, 'combobox').itemIdPrefix + '_' + index;
                return $('#'+id);
            },
            getRow:function(target, p){
                var state = $.data(target, 'combobox');
                //var index = (p instanceof jQuery) ? p.attr('id').substr(state.itemIdPrefix.length+1) : getRowIndex(target, p);
                var index =getRowIndex(target, p);
                return state.data[parseInt(index)];
            }
        },

        onBeforeLoad: function(param){},
        onLoadSuccess: function(){},
        onLoadError: function(){},
        onSelect: function(record){
            debugger;
        },
        onUnselect: function(record){}
    });
})(jQuery);
