/**
 * @file mip-otto-scrollnews 组件
 * @author
 */

define(function (require) {
    'use strict';

    const customElement = require('customElement').create();
    const $ = require('zepto');

    customElement.prototype.firstInviewCallback = function () {
        let element = this.element;
        let sbox = element.querySelector('.scrollNews__box');
        let swrap = element.querySelector('.scrollNews__wrap');
        let sul = element.querySelectorAll('.scrollNews__box ul');
        element
            .querySelector('.scrollNews__type')
            .addEventListener('click', function () {});
        $('.scrollNews__type').on('click', function () {
            // 改变选中状态
            let index = $(this).index();
            $(this)
                .parent()
                .find('.scrollNews__type--hover')
                .removeClass('scrollNews__type--hover');
            $(this).addClass('scrollNews__type--hover');

            let relativeOffset = sul[index].offsetTop - swrap.offsetTop;
            sbox.scrollTo(0, relativeOffset);
        });

        function getIndex(offsetop) {
            let i = 0;
            Array.prototype.slice.call(sul).forEach(function (item, index) {
                if (offsetop > item.offsetTop) {
                    i = index;
                }
            });
            return i;
        }
        sbox.addEventListener('scroll', function (e) {
            let i = getIndex(e.target.scrollTop);
            element
                .querySelector('.scrollNews__type--hover')
                .classList.remove('scrollNews__type--hover');
            element
                .querySelectorAll('.scrollNews__type')[i].classList.add('scrollNews__type--hover');
        });
    };

    return customElement;
});
