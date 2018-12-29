/**
 * @file mip-component-head 组件
 * @author ldf
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var btnSearch = element.querySelector('.search-text');
        var btnToggle = element.querySelector('.collapse');
        var toggle = function () {
            var dom = event.target;
            var nav2 = document.querySelector('.head-nav-2');
            if (dom.classList.contains('up')) {
                nav2.classList.remove('show');
                dom.classList.remove('up');
                setTimeout(function () {
                    nav2.style.display = 'none';
                }, 300);
            } else {
                nav2.style.display = 'block';
                setTimeout(function () {
                    nav2.classList.add('show');
                    dom.classList.add('up');
                }, 0);
            }
        };

        var search = function () {
            if (!(event instanceof MouseEvent && event.target.nodeName === 'DIV')
                && !(event instanceof KeyboardEvent && event.keyCode === 13)) {
                return;
            }
            var dom = event.target.firstElementChild || event.target;
            var value = dom.value.trim();
            if (!value) {
                alert('关键字不能为空');
                return;
            }
            var url = dom.dataset.url;
            window.top.location.href = url + value;
        };

        btnSearch.addEventListener('click', search);
        btnToggle.addEventListener('click', toggle);
        btnSearch.addEventListener('keyup', search);
    };
    return customElement;
});
