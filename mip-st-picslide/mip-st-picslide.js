/**
 * @file mip-st-picslide 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    var htmlTemplate = require('./tpl');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.innerHTML = htmlTemplate;
        var inner = element.querySelector('.inner');
        inner.addEventListener('click', function () {
            document.body.style.overflow = 'auto';
            inner.classList.add('hide');
        }, false);
        // 防止一些浏览器导航栏可以收起，滚动时会改变屏幕大小，导致遮罩面积不够
        // inner.addEventListener('touchmove', function (e) {
        //     e.preventDefault();
        //     return false;
        // }, false);

        this.addEventAction('open', function (pics) {
            templates.render(element, pics).then(function (html) {
                document.body.style.overflow = 'hidden';
                inner.classList.remove('hide');
                inner.innerHTML = html;
            });
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
