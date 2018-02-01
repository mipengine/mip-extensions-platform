/**
 * @file mip-cr173-bottomjump 当页面滑动到底部时，获取最相关的页面跳转至新页面。
 * @author gom3250@qq.com.
 * @version 1.0.0
 *  */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var opengourl = $(ele).find('.f-information').attr('data-gourl');
        if (opengourl !== undefined) {
            function getRect(ele) {
                var inHeight = window.innerHeight;
                var rect = ele.getBoundingClientRect();
                rect.isVisible = rect.top - inHeight < 0;
                rect.isBottom = rect.bottom - inHeight <= 0;
                if (rect.isBottom) {
                    window.top.location.href = opengourl;
                }
                return rect;
            }
            window.addEventListener('scroll', function (event) {
                getRect(document.body);
            });
        };
    };
    return customElement;
});
