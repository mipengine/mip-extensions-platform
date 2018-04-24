/**
 * @file mip-gm-ad 更美问答 统计banner广告位点击
 * @author liuqingtao@igengmei.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var href = ele.getAttribute('href');
        $(ele).on('click', function () {
            $.ajax({
                url: '//log.igengmei.com/log/collect/web?',
                dataType: 'json',
                type: 'POST',
                data: query('on_click_mip_banner', JSON.stringify({
                    url: href
                })),
                success: function (data) {
                    window.location.href = href;
                }
            });

        });
        function getUrlParam(str) {
            var s = location.search;
            var tmp = [];
            var value = '';
            if (s) {
                tmp = s.substr(1).split('&');
            }
            for (var i = 0; i < tmp.length; i++) {
                if (tmp[i].substring(0, tmp[i].indexOf('=')) === str) {
                    value = tmp[i].substr(tmp[i].indexOf('=') + 1);
                    break;
                }
            }
            return value;
        }

        function query(trackName, paramsData) {
            return {
                type: trackName,
                params: paramsData,
                app: {name: 'm_web', version: '', channel: getUrlParam('channel') || ''},
                ua: window.navigator.userAgent
            };
        }
    };
    return customElement;
});
