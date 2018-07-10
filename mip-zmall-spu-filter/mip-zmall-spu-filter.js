/**
 * @file mip-zmall-spu-filter 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var viewer = require('viewer');

    // 阻止滚动
    function preventTouch(e) {
        e.preventDefault();
    }

    // 处理弹层上面的滚动
    function smartScroll(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
        if (!selectorScrollable || container.isBindScroll) {
            return;
        }

        var data = {
            posY: 0,
            maxscroll: 0
        };

        // 事件处理
        container.addEventListener('touchstart', function (e) {
            var events = e.touches[0] || e;
            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = container.scrollTop;
            // 是否可以滚动
            data.maxscroll = container.scrollHeight - container.clientHeight;
        });

        container.addEventListener('touchmove', function (e) {
            e.stopPropagation();
            var events = e.touches[0] || e;
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 && e.cancelable) {
                // 禁止滚动
                e.preventDefault();
            }
            // 当前的滚动高度
            var scrollTop = container.scrollTop;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            // 上下边缘检测
            if (distanceY > 0 && scrollTop === 0 && e.cancelable) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll) && e.cancelable) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                e.preventDefault();
                return;
            }
        });

        container.addEventListener('touchend', function (e) {
            data.maxscroll = 0;
        });

        // 防止多次重复绑定
        container.isBindScroll = true;
    }

    // 显示分类筛选
    function showCategoryPanel(element) {
        element.classList.add('animate', 'visible');
        var elementParentNode = element.parentNode;
        var parentTagName = elementParentNode.tagName;
        if (parentTagName === 'MIP-FIXED' || parentTagName === 'MIP-SEMI-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        element.categoryPanelShow = true;
        var categroyBox = element.querySelector('.category-list-box');
        smartScroll(categroyBox, true);
    }

    // 关闭分类筛选
    function closeCategoryPanel(element) {
        element.classList.remove('animate');
        var elementParentNode = element.parentNode;
        var parentTagName = elementParentNode.tagName;
        if (parentTagName === 'MIP-FIXED' || parentTagName === 'MIP-SEMI-FIXED') {
            setTimeout(function () {
                util.css(elementParentNode, {
                    height: 'auto'
                });
                element.classList.remove('visible');
            }, 250);
        }
        element.categoryPanelShow = false;
    }

    // 筛选事件
    function initCategoryEvent(element) {
        // 触发筛选弹层显示
        var trigger = element.querySelector('#js_spu_category_trigger');
        trigger.addEventListener('click', function () {
            var classList = this.classList;
            if (classList.contains('current')) {
                closeCategoryPanel(element);
                classList.remove('current');
            }
            else {
                showCategoryPanel(element);
                classList.add('current');
            }
        });
        // 返回按钮
        var closeElm = element.querySelector('#js_spu_category_back');
        closeElm.addEventListener('click', function () {
            closeCategoryPanel(element);
            trigger.classList.remove('current');
        });
        closeElm.addEventListener('touchmove', preventTouch);
        // 筛选栏
        var sortBar = element.querySelector('.spu-sort');
        sortBar.addEventListener('touchmove', preventTouch);
        // 筛选项
        var filterItemsBox = element.querySelector('#js_spu_category_list');
        filterItemsBox.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                var categoryId = e.target.dataset.cateId;
                var extra = [];
                extra.push({
                    name: 'category',
                    value: categoryId
                });
                e.extraQuery = extra;
                viewer.eventAction.execute('filter', e.target, e);
                closeCategoryPanel(element);
                trigger.classList.remove('current');
            }
        });
    }

    function initSortEvent(element) {
        var sortElementItems = element.querySelectorAll('[data-sort]');
        [].forEach.call(sortElementItems, function (item) {
            item.addEventListener('click', function (e) {
                if (this.classList.contains('current')) {
                    return;
                }
                if (element.categoryPanelShow) {
                    closeCategoryPanel(element);
                    var trigger = element.querySelector('#js_spu_category_trigger');
                    trigger.classList.remove('current');
                }
                var sortCurrent = this.parentNode.querySelector('.current[data-sort]');
                sortCurrent && sortCurrent.classList.remove('current');
                this.classList.add('current');

                var sortId = this.dataset.sort;
                var extra = [];
                extra.push({
                    name: 'sort',
                    value: sortId
                });
                e.extraQuery = extra;
                viewer.eventAction.execute('sort', item, e);
            });
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var categoryApi = element.getAttribute('data-category-api');
        var filterFunctionName = element.getAttribute('data-filter-fun');

        var categoryBoxElm = element.querySelector('#js_spu_category');
        var categoryListElm = element.querySelector('#js_spu_category_list');
        // 获取分类
        fetchJsonp(categoryApi, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            var categoryListHtml = '';
            var cate = res.data;
            if (cate && cate.length) {
                cate.forEach(function (item) {
                    categoryListHtml += [
                        '<li on="filter:' + filterFunctionName + '" data-cate-id="' + item.id + '">',
                        item.name + '</li>'
                    ].join('');
                });
                categoryListElm.innerHTML = categoryListHtml;
                setTimeout(function () {
                    categoryBoxElm.classList.add('visible');
                }, 200);
            }
            else {
                categoryBoxElm.classList.add('visible');
            }
        });

        initCategoryEvent(element);
        initSortEvent(element);
    };

    return customElement;
});
