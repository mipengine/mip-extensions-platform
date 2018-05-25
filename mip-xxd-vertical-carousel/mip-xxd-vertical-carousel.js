/**
 * @file mip-xxd-vertical-carousel 组件
 * @author xwchris
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 无限滚动轮播图
     *
     * @param {dom} containerElement 列表容器
     * @param {number} index 当前索引
     * @param {number} height 单个元素高度
     * @param {number} interval 间隔时间（ms）
     * @param {number} length 列表长度
     */
    function startCarousel(containerElement, index, height, interval, length) {
        var offset = index * height;
        util.css(containerElement, {
            transition: 'transform .3s ease',
            transform: 'translateY(-' + offset + 'px)'
        });
        var nextIndex = (++index) % length === 1 ? 1 : index;

        if (nextIndex === 1) {
            setTimeout(function () {
                util.css(containerElement, {
                    transition: '',
                    transform: 'translateY(0)'
                });
            }, 300);
        }

        setTimeout(function () {
            startCarousel(containerElement, nextIndex, height, interval, length);
        }, interval);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // 头尾各加一个元素 当滑动到边界时，跳到其性引导的位置
        // 传入列表、轮播时间、滚动方向
        var self = this;
        var element = self.element;

        var interval = Number(element.getAttribute('interval'));

        // 创建一个列表容器
        var containerElement = document.createElement('div');
        containerElement.className = 'mip-xxd-vertical-carousel-list';

        // 创建一个视图容器
        var viewerElement = document.createElement('div');
        viewerElement.className = 'mip-xxd-vertical-carousel-viewer';

        // 克隆节点
        var children = Array.prototype.slice.call(element.children);
        var firstChildCloned = children[0].cloneNode(true);
        var lastChildCloned = children[children.length - 1].cloneNode(true);
        children.push(firstChildCloned);
        children.unshift(lastChildCloned);

        viewerElement.appendChild(containerElement);
        util.dom.insert(containerElement, children);

        element.appendChild(viewerElement);

        // 计算高度
        var firstChild = containerElement.children[0];
        var height = firstChild.offsetHeight;
        util.css(viewerElement, {height: height + 'px'});

        // 滚动逻辑判断
        var currentIndex = 1;
        var length = children.length - 2;

        util.css(containerElement, {transition: 'transform .3s ease'});
        startCarousel(containerElement, currentIndex, height, interval, length);
    };

    return customElement;
});
