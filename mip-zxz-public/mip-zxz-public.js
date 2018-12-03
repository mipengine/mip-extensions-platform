/**
 * @file mip-zxz-public 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    function seeMore() {
        var button = $('#seeMore');
        if (button.lenght === 0) {
            return;
        }
        button.on('click', function () {
            $('#IHaveMore').css({'max-height': 'none'});
            button.hide();
        });
    }
    // 文章内容分页跳转
    function showPage() {
        var obj = $('#SHOW_PAGE_SELECT');
        if (obj[0] === undefined) {
            return;
        }

        obj.change(function () {
            top.location.href = obj.val();
        });
    }
    seeMore();
    showPage();
    return customElement;
});
