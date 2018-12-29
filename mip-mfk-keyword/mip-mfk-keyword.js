/**
 * @file mip-mfk-keyword 组件
 * @author
 */

define(function (require) {
    'use strict';
    // var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var that = this.element;
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
            tip({type: 1});
            ajaxJSON({
                url: 'https://mip.mfk.com/app/api/mip_mfk_keyword.php',
                data: {k: k},
                cache: false,
                success: function (res) {
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

        document.getElementById('bg').onclick = null;
        document.getElementById('bg').onclick = function () {
            var artEntryBox = document.getElementById('art_entry_box');
            artEntryBox.parentNode.removeChild(artEntryBox);
            document.getElementById('bg').style.display = 'none';
            that.className = 'art_entry_btn';
        };

        function ajaxJSON(params) {
            params.type = (params.type || 'GET').toUpperCase();
            params.data = params.data || {};
            var formatedParams = formateParams(params.data, params.cache);
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (!!params.success) {
                        if (typeof xhr.responseText === 'string') {
                            params.success(JSON.parse(xhr.responseText));
                        }
                        else {
                            params.success(xhr.responseText);
                        }
                    }
                }
                else {
                    params.error && params.error(status);
                }
            };
            if (params.type === 'GET') {
                xhr.open('GET', (!!formatedParams ? params.url + '?' + formatedParams : params.url), true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send();
            }
            else {
                xhr.open('POST', params.url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(formatedParams);
            }
        }

        function formateParams(data, isCache) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            if (isCache) {
                arr.push('t=' + (new Date()).getTime());
            }
            return arr.join('&');
        }

        function tip(para) {
            document.getElementById('bg').style.display = 'block';
            that.className = 'art_entry_btn art_entry_btn_cur';
            var objW = that.scrollWidth;
            var sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var winW = document.body.offsetWidth;
            var top = that.offsetTop;
            var left = that.offsetLeft;

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
            var boxH = document.getElementById('art_entry_box').offsetHeight;
            var boxW = document.getElementById('art_entry_box').offsetWidth;
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
