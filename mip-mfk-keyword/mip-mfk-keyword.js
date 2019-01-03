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
            $.get(
                'https://mip.mfk.com/app/api/mip_mfk_keyword.php',
                {k: k},
                function (res) {
                    if (res.code === 200) {
                        tip({type: 2, data: res.data});
                    }
                    else {
                        tip({type: 3, data: res.msg});
                    }
                },
                'json'
            ).error(function () {
                tip({type: 3, data: '词条内容加载失败！'});
            });
        }, false);

        document.getElementById('bg').onclick = null;
        document.getElementById('bg').onclick = function () {
            that.showtip = false;
            var artEntryBox = document.getElementById('art_entry_box');
            artEntryBox.parentNode.removeChild(artEntryBox);
            document.getElementById('bg').style.display = 'none';
            that.className = 'art_entry_btn';
        };

        function tip(para) {
            if (!that.showtip) {
                return false;
            }
            document.getElementById('bg').style.display = 'block';
            that.className = 'art_entry_btn art_entry_btn_cur';
            var objW = $(that).width();
            var sTop = $(window).scrollTop();
            var winW = $(window).width();
            var top = $(that).offset().top;
            var left = $(that).offset().left;

            var artEntryBox = document.createElement('div');
            artEntryBox.className = 'art_entry_box';
            artEntryBox.id = 'art_entry_box';
            if (para.type === 1) {
                artEntryBox.innerHTML = '<div class="art_entry_title"></div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p style="text-align:center;">\
<img src="https://mip.mfk.com/statics/images/loading.gif" class="img_load"/>词条内容加载中...\
</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }
            else if (para.type === 2) {
                artEntryBox.innerHTML = '<div class="art_entry_title">' + para.data.title + '</div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p>' + para.data.content + '</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }
            else if (para.type === 3) {
                artEntryBox.innerHTML = '<div class="art_entry_title"></div>\
<div id="arrow_top" class="arrow_top" style="border-top: .1rem solid #fff;bottom:-.09rem;"></div>\
<p>' + para.msg + '</p>\
<div id="arrow_down" class="arrow_down" style="border-bottom: .1rem solid #fff;top:-.07rem;"></div>';
            }

            document.getElementsByTagName('body')[0].appendChild(artEntryBox);
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
                document.getElementById('arrow_top').style.display = 'block';
                document.getElementById('arrow_down').style.display = 'none';
                var jiao = document.getElementById('arrow_top');
                document.getElementById('art_entry_box').style.top = (top - boxH - 9) + 'px';
                document.getElementById('art_entry_box').style.left = boxL + 'px';
            }
            else {
                document.getElementById('arrow_top').style.display = 'none';
                document.getElementById('arrow_down').style.display = 'block';
                var jiao = document.getElementById('arrow_down');
                document.getElementById('art_entry_box').style.top = (top + 30) + 'px';
                document.getElementById('art_entry_box').style.left = boxL + 'px';
            }
            document.getElementById('bg').style.display = 'block';
            jiao.style.left = jiaoL + 'px';
        }
    };

    return customElement;
});
