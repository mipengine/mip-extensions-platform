/**
 * @file mip-component-head 组件
 * @author
 */

define(function (require) {
    'use strict';
    const customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        const element = this.element;
        const btnSearch = element.querySelector('.search-text');
        const btnToggle = element.querySelector('.collapse');
        const toggle = function () {
            const dom = event.target;
            if (dom.classList.contains('up')) {
                const nav2 = document.querySelector('.head-nav-2');
                nav2.classList.remove('show');
                setTimeout(() => {
                    nav2.style.display = 'none';
                }, 300);
                dom.classList.remove('up');
            } else {
                const nav2 = document.querySelector('.head-nav-2');
                nav2.style.display = 'block';
                setTimeout(() => {
                    nav2.classList.add('show');
                    dom.classList.add('up');
                }, 0);
            }

        };
        const search = function () {
            if (event.target.nodeName !== 'DIV') {
                return;
            }
            const dom = event.target.firstElementChild;
            const value = dom.value.trim();
            if (!value) {
                alert('关键字不能为空');
                return;
            }
            const url = dom.dataset.url;
            window.top.location.href = url + value;
        };
        btnSearch.addEventListener('click', search);
        btnToggle.addEventListener('click', toggle);
    };
    return customElement;
});
