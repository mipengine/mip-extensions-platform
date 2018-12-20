/**
 * @file mip-component-head 组件
 * @author
 */

define(function (require) {
    'use strict';
    let customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        let element = this.element;
        let btnSearch = element.querySelector('.search-text');
        let btnToggle = element.querySelector('.collapse');
        let toggle = function () {
            let dom = event.target;
            if (dom.classList.contains('up')) {
                let nav2 = document.querySelector('.head-nav-2');
                nav2.classList.remove('show');
                setTimeout(() => {
                    nav2.style.display = 'none';
                }, 300);
                dom.classList.remove('up');
            } else {
                let nav2 = document.querySelector('.head-nav-2');
                nav2.style.display = 'block';
                setTimeout(() => {
                    nav2.classList.add('show');
                    dom.classList.add('up');
                }, 0);
            }
        };
        let search = function () {
            if (event.target.nodeName !== 'DIV') {
                return;
            }
            let dom = event.target.firstElementChild;
            let value = dom.value.trim();
            if (!value) {
                alert('关键字不能为空');
                return;
            }
            let url = dom.dataset.url;
            window.top.location.href = url + value;
        };
        btnSearch.addEventListener('click', search);
        btnToggle.addEventListener('click', toggle);
    };
    return customElement;
});
