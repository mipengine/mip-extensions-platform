/**
 * @file mip-hunliji-statistic 用于婚礼纪网站访问数据统计wap版
 * @author niu_niu
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var waptype = 'wap';
    var customElement = require('customElement').create();

    function sdkData(appName, data, met, error) {
        var obj = '{"events":[' + JSON.stringify(data) + ']}';
        $.ajax({
            url: '//www.hunliji.com/v1/api/app/tracker/batch.json',
            type: 'POST',
            data: obj,
            headers: {appName: appName},
            success: function (result) {
                if (met) {
                    met();
                }
            },
            error: function (data) {
                error && error();
            }
        });
    }
    function rans(len) {
        if (localStorage.getItem('rans')) {
            return localStorage.getItem('rans');
        } else {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            localStorage.setItem('rans', pwd);
            return pwd;
        }
    }
    function sdk(obj, type) {
        var ip;
        $.ajax({
            url: '//www.hunliji.com/sms/ip',
            type: 'get',
            success: function (result) {
                ip = result;
            }
        });
        setTimeout(function () {
            sdkData(obj, {
                action: 'view',
                eventableType: type != null ? type : '',
                additional: {
                    ip: ip,
                    url: location.href,
                    num: rans(32)
                }
            });
        }, 3000);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var type = element.getAttribute('type') || waptype;
        sdk(type);
    };

    return customElement;
});
