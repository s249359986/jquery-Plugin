/**
 * @����� selectpick
 * @���� ��Jquery������һ��������������
 * @���� ۬��ΰ
 * @���� 2014-11-25
 * @Version 0.1
 */
;
(function ($, window, document, undefined) {

    $.fn.selectpick = function (options) {

        var selectpick_config = {
            height: 30,
            width: 150,
            optionColor: "#3BAFDA",
            selectedColor: "#3BAFDA",
            disabled: false, // �Ƿ����,Ĭ��false
            selectText: "", // �����ĸ��ı���ѡ��
            onSelect: "" // �����ѡ���¼�
        }

        var settings = $.extend({}, selectpick_config, options);

        return this.each(function (elem_id) {

            var obj = this;
            var _offset = $(this).offset();
            var top = _offset.top + $(document).scrollTop();
            var elem_width = $(obj).width();
            var left = _offset.left + $(document).scrollLeft();
            var elem_id = $(obj).attr("id"); //

            var _selectBody = "<div onselectstart='return false;'><div class='selectpick_div selectpick_div_" + elem_id + "'  id='selectpick_" + elem_id + "'><span style='float:left;' id='selectpick_span_" + elem_id + "'></span><span class='selectpick_icon' id='selectpick_icon_" + elem_id + "'></span></div><div class='selectpick_options selectpick_options_" + elem_id + "'></div></div>";
            $(_selectBody).appendTo("body");
            $(obj).addClass("select_hide");


            $(".selectpick_div_" + elem_id).css({//设置选矿的样式
                "height": settings.height,
                "width": settings.width,
                "left": left,
                "top": top
            });

            //
            if (settings.selectText != "" && settings.selectText != undefined) {
                $(".selectpick_div_" + elem_id + " span").first().text(settings.selectText);
            } else {
                $(".selectpick_div_" + elem_id + " span").first().text($(obj).children("option").first().text());
            }

            //
            if (settings.disabled) {
                $(".selectpick_div_" + elem_id).addClass("selectpick_no_select");
                $("#selectpick_icon_" + elem_id).css({"cursor": "default"});
                return;
            }
            // ���div��ʾ�б�
            $(".selectpick_div_" + elem_id + ",#selectpick_span_" + elem_id + ",#selectpick_options_" + elem_id + "").bind("click", function (event) {

                debugger;
                var selected_text = $(".selectpick_div_" + elem_id + " span").first().text(); // ��ǰdiv�е�ֵ
                event.stopPropagation(); //  ��ֹ�¼�ð��

                if ($(".selectpick_ul_" + elem_id + " li").length > 0) {
                    // ���غ���ʾdiv
                    $(".selectpick_options_" + elem_id).empty().css({"border-top": "none"});
                    return;
                } else {
                    $(".selectpick_options_" + elem_id).css({"border-top": "solid 1px #CFCFCF"});
                    $(".selectpick_options ul li").remove();
                    // ����б���
                    var ul = "<ul class='selectpick_ul_" + elem_id + "'>";
                    $(obj).children("option").each(function () {
                        if ($(this).text() == selected_text) {
                            ul += "<li class='selectpick_options_selected' style='font-size:13px;background-color:" + settings.selectedColor + ";color:#fff;height:" + (settings.height - 3) + "px; line-height:" + (settings.height - 3) + "px;font-size:13px;'><label style='display:none;'>" + $(this).val() + "</label><label>" + $(this).text() + "</label></li>";
                        } else {
                            ul += "<li style='font-size:13px;height:" + (settings.height - 3) + "px; line-height:" + (settings.height - 3) + "px;'><label style='display:none;'>" + $(this).val() + "</label><label>" + $(this).text() + "</label></li>";
                        }
                    });
                    ul += "</ul>";
                    $(".selectpick_options_" + elem_id).css({
                        "width": settings.width + 5,
                        "left": left,
                        "top": top + settings.height
                    }).append(ul).show();

                    // li��껬���¼�
                    $(".selectpick_options_" + elem_id + " ul li").hover(function () {
                        $(this).css({
                            "background-color": settings.optionColor,
                            "color": "#fff"
                        });
                    }, function () {
                        if ($(this).hasClass("selectpick_options_selected")) {
                            $(this).css({
                                "background-color": settings.optionColor,
                                "color": "#fff"
                            });
                        } else {
                            $(this).css({
                                "background-color": "",
                                "color": "#000"
                            });
                        }

                    });

                    // ÿ��li����¼�
                    $(".selectpick_ul_" + elem_id + " li").bind("click", function () {

                        $(".selectpick_div_" + elem_id + " span").first().text($(this).children("label").first().next().text());
                        $(".selectpick_options_" + elem_id).empty().hide();
                        // �ص�����
                        if (settings.onSelect != undefined && settings.onSelect != "" && typeof settings.onSelect == "function") {
                            settings.onSelect($(this).children("label").first().text(), $(this).children("label").first().next().text());
                        }
                    });
                }

            });
            // ���div����ر��б�
            $(document).bind("click", function (event) {
                debugger;
                var e = event || window.event;
                var elem = e.srcElement || e.target;
                if (elem.id == "selectpick_" + elem_id || elem.id == "selectpick_icon_" + elem_id || elem.id == "selectpick_span_" + elem_id) {
                    return;
                } else {
                    $(".selectpick_options_" + elem_id).empty().hide();
                }
            });

        });
    }
})(jQuery, window, document);