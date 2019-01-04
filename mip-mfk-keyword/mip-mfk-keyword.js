/**
 * @file mip-mfk-keyword 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this.element;
        that.showtip = false;
        that.style.display = 'inline';
        that.className = 'art_entry_btn';
        if (!document.getElementById('bg')) {
            var bg = document.createElement('div');
            bg.className = 'bg';
            bg.id = 'bg';
            bg.style.display = 'none';
            document.getElementsByTagName('body')[0].appendChild(bg);
        }
        that.addEventListener('click', function () {
            var k = that.innerHTML;
            k = k.replace(/\s*/g, '');
            if (k === '') {
                return false;
            }
            that.showtip = true;
            tip({type: 1});
            $.ajax({
                url: 'https://mip.mfk.com/app/api/mip_mfk_keyword.php',
                data: {k: k},
                dataType: 'jsonp',
                success: function (res) {
                    console.log(res);
                    if (res.code === 200) {
                        tip({type: 2, data: res.data});
                    }
                    else {
                        tip({type: 3, data: res.msg});
                    }
                },
                error: function () {
                    tip({type: 3, data: '词条内容加载失败！'});
                }
            });
        }, false);

        $('#bg').unbind('click').bind('click', function () {
            that.showtip = false;
            $('#art_entry_box').remove();
            $('#bg').hide();
            $('.art_entry_btn').removeClass('art_entry_btn_cur');
        });

        function tip(para) {
            if (!that.showtip) {
                return false;
            }
            $(that).addClass('art_entry_btn_cur');
            var objW = $(that).width();
            var sTop = $(window).scrollTop();
            var winW = $(window).width();
            var top = $(that).offset().top;
            var left = $(that).offset().left;

            var innerHTML;
            if (para.type === 1) {
                innerHTML = '<div class="art_entry_title"></div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p style="text-align:center;">\
<img src="https://mip.mfk.com/statics/images/loading.gif" class="img_load"/>词条内容加载中...\
</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }
            else if (para.type === 2) {
                innerHTML = '<div class="art_entry_title">' + para.data.title + '</div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p>' + para.data.content + '</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }
            else if (para.type === 3) {
                innerHTML = '<div class="art_entry_title"></div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p>' + para.msg + '</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }
            if ($('#art_entry_box').length > 0) {
                $('#art_entry_box').html(innerHTML);
            }
            else {
                $('body').append('<div class="art_entry_box" id="art_entry_box">' + innerHTML + '</div>');
            }

            var boxH = $('#art_entry_box').height();
            var boxW = $('#art_entry_box').width();
            if ((left + (objW / 2)) < (boxW / 2)) {
                var boxL = 10;
            }
            else if (winW - (left + (objW / 2)) < (boxW / 2)) {
                var boxL = winW - boxW - 10;
            }
            else {
                var boxL = (left + (objW / 2)) - (boxW / 2) + 10;
            }
            var jiaoL = (left + (objW / 2)) - boxL;

            if ((top - sTop) > boxH) {
                $('#arrow_top').show();
                $('#arrow_down').hide();
                var jiao = $('#arrow_top');
                $('#art_entry_box').css('top', (top - boxH - 9) + 'px');
                $('#art_entry_box').css('left', boxL + 'px');
            }
            else {
                $('#arrow_top').hide();
                $('#arrow_down').show();
                var jiao = $('#arrow_down');
                $('#art_entry_box').css('top', (top + 30) + 'px');
                $('#art_entry_box').css('left', boxL + 'px');
            }
            $('#bg').show();
            jiao.css('left', jiaoL + 'px');
        }
    };

    return customElement;
});
