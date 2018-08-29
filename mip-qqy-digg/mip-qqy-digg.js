/**
 * @file mip-qqy-digg 去去游戏digg组件
 * @author chinayubo 415204@qq.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var e = this.element;
        var val = e.getAttribute('val');
        var url = e.getAttribute('url');
        $(e).find('.diggget').on('click', function () {
            var rVal = $(e).find(val);
            $.getJSON(url + '&callback=?', function (data) {
                if (data.status) {
                    rVal.text(Number(rVal.text()) + 1);
                }
                else {
                    alert(data.message);
                    return false;
                }
            });
        });
        // 读取digg ajax
        $.getJSON(url + '&type=1&callback=?', function (data) {
            var rVal = $(e).find(val);
            rVal.text(data.num);
        });
    };
    return customElement;
});
