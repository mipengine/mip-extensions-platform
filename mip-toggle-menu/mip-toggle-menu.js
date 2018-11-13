/**
 * @file mip-toggle-menu 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('jquery');

// 左侧列表切换
    $(document).ready(function () {
        $('.menubox .ulbox li').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('.menubox .ulbox li').each(function (ind) {
            if (ind === 0) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });

// 右侧abox宽度
        var h = $(window).height();
        var w = $(window).width();
        var w1 = w - 100;
        var h1 = h - 50;
        $('.menubox .dbox .abox').css({width: w1 + 'px', height: h1 + 'px'});
    });

/**
* 第一次进入可视区回调，只会执行一次
*/
    customElement.prototype.firstInviewCallback = function () {
// 导航菜单的显示隐藏
        var ele = this.element;
        var menubox = document.querySelector('.menubox');
        var myclose = document.querySelector('.menubox .myclose');

        ele.addEventListener('click', function () {
            menubox.className += ' active';
        }, false);

        myclose.addEventListener('click', function () {
            menubox.className = menubox.className.replace('active', '');
        }, false);

// TODO
    };

    return customElement;
});
