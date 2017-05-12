/**
 * @author: renyanwei
 * @date: 2017-05-10
 * @file: mip-tiantis-jsridge.js
 */
define(function (require) {
    var customElem = require('customElement').create();
    var $ = require('jquery');
    // 页面DOM加载完成后调用，初始化页面里面的DOM事件绑定等。
    customElem.prototype.build = function () {
        $.getScript('//ui.tiantis.com/Scripts/ShopDec/jquery.js?version=v2', function () {
            $.getScript('//ui.tiantis.com/Scripts/MShopDec/PublishNew.js?version=v2&t='
                + Math.random(), function () {});
        });
    };
    return customElem;
});
