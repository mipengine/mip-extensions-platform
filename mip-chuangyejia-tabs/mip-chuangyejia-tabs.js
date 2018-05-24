/**
 * @file mip-chuangyejia-nav 组件
 * @author wangqizheng
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Iscroll = require('./iscroll');
    var viewport = require('viewport');
    var viewer = require('viewer');
    var util = require('util');
    var rect = util.rect;
    var naboo = util.naboo;

    var tools = {
        query: function (selector, el) {
            var doc = el ? el : document;
            return doc.querySelector(selector);
        },
        queryAll: function (selector, el) {
            var doc = el ? el : document;
            return doc.querySelectorAll(selector);
        },
        addClass: function (el, className) {
            el.classList.add(className);
        },
        removeClass: function (el, className) {
            el.classList.remove(className);
        },
        appendTo: function (el, node) {
            if (!this.isNodeList(node)) {
                return;
            }

            for (var i = 0; i < node.length; i++) {
                el.appendChild(node[i]);
            }
        },
        cloneTo: function (el, node) {
            if (!this.isNodeList(node)) {
                return;
            }

            for (var i = 0; i < node.length; i++) {
                var nodeItem = node[i].cloneNode(true);
                el.appendChild(nodeItem);
            }
        },
        createTagWithClass: function (className, tagName) {
            tagName = tagName || 'div';
            var tag = document.createElement(tagName);
            tag.className = className || '';
            return tag;
        },
        isNodeList: function (nodes) {
            var stringRepr = Object.prototype.toString.call(nodes);

            return typeof nodes === 'object'
                && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr)
                && (typeof nodes.length === 'number')
                && (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0));
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // 初始化外层容器
        var self = this;
        var tabs = self.element;
        var navWrapper = tools.query('.tabs-nav-wrapper', tabs);
        var tabNav = tools.query('.tabs-nav', navWrapper);
        var contentWrapper = tools.query('.tabs-content-wrapper', tabs);
        var navItem = tools.queryAll('.tabs-slide', tabNav);
        var contentItem = tools.queryAll('.tabs-slide', contentWrapper);
        var body = document.body;
        var footer = document.querySelector('.footer');
        // var viewerHeight = rect.getElementRect(body)
        // var initHeight = viewport.getScrollHeight() - util.rect.getElementOffset(contentItem[0]).top - 10;
        // console.log(util.rect.getElementOffset(contentItem[0]).top)
        // var initHeight = 0 ;
        // 初始化展开
        var tabNavArrow = tools.createTagWithClass('tab-nav-arrow');
        var navContent = tools.createTagWithClass('nav-content');
        var navMark = tools.createTagWithClass('nav-mark');
        var navArrow = tools.createTagWithClass('nav-arrow');
        tabNavArrow.appendChild(navArrow);
        tabs.appendChild(navMark);
        tabNavArrow.appendChild(navContent);
        tools.cloneTo(navContent, navItem);
        navWrapper.appendChild(tabNavArrow);
        var navContentItem = tools.queryAll('.tabs-slide', navContent);

        // 初始化滑块
        var tabLine = tools.createTagWithClass('tab-line');
        tabNav.appendChild(tabLine);

        // 拦截默认滑动
        tabNav.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        // 给item绑定index
        var arrNav = Array.prototype.slice.call(navItem);

        // 初始宽高 好多重复代码啊，后面抽象出来吧
        var wrapperWidth = Math.floor(rect.getElementRect(contentWrapper).width);
        var cols = parseInt(tabs.getAttribute('tabs-col'), 10);
        var changeTop = parseInt(tabs.getAttribute('tabs-change-top'), 10);
        var perNavWidth = wrapperWidth / cols;
        var navWidth = perNavWidth * navItem.length + 30;
        tools.query('.tabs-nav', navWrapper).style.width = navWidth + 'px';
        for (var i = 0; i < navItem.length; i++) {
            navItem[i].style.width = perNavWidth + 'px';
            navContentItem[i].style.width = perNavWidth + 'px';
        }

        var contSlideArr = [];
        var footerHeight = footer ? util.rect.getElementOffset(footer).height : 0;
        var initHeight = viewport.getScrollHeight() - util.rect.getElementOffset(contentItem[0]).top - footerHeight;
        for (var n = 0; n < navItem.length; n++) {
            contSlideArr[n] = initHeight;
        }

        util.css(tabLine, {
            width: perNavWidth / 5,
            marginLeft: 2 * (perNavWidth / 5)
        });

        var perContentWidth = Math.floor(rect.getElementRect(contentWrapper).width);
        var contentWidth = perContentWidth * navItem.length;
        var tabsContent = tools.query('.tabs-content', contentWrapper);
        tabsContent.style.width = contentWidth + 'px';
        var contLen = contentItem.length;
        for (var i = 0; i < contLen; i++) {
            contentItem[i].style.width = perContentWidth + 'px';
        }

        var tabData = {
            currentPage: 0,
            activePageClass: 'active',
            visitedPageClass: 'visited'
        };

        // 初始化 iscroll
        setTimeout(function () {
            var navScroll = null;
            setTimeout(function () {
                navScroll = new Iscroll(navWrapper, {
                    scrollX: true,
                    scrollY: false,
                    snap: '.tabs-slide',
                    snapSpeed: 400,
                    deceleration: 9,
                    tap: true
                });
            }, 100);

            // 第一个tab加active
            tools.addClass(navItem[0], 'active');
            tools.addClass(navContentItem[0], 'active');
            contentItem[0].style.height = 'auto';

            // 展开初始化
            navContent.style.width = wrapperWidth + 'px';
            var arrCon = Array.prototype.slice.call(navContentItem);
            tabNav.addEventListener('tap', updateTab, false);
            navContent.addEventListener('tap', updateTab2, false);
            navMark.addEventListener('click', toggle, false);
            navArrow.addEventListener('tap', toggle, false);

            // 切换展开与关闭
            function toggle() {
                if (!tabNavArrow.classList.contains('active')) {
                    navActiveClass('add');
                }
                else {
                    navActiveClass('remove');
                }
            }

            // 点击nav 更新视图
            function updateTab(e) {
                navActiveClass('remove');

                var el = e.target;
                if (!el.classList.contains('tabs-slide')) {
                    return;
                }

                var currentPage = arrNav.indexOf(el);
                addActiveClass(currentPage);
            }

            // 点击展开 更新视图
            function updateTab2(e) {
                navActiveClass('remove');

                var el = e.target;
                if (!el.classList.contains('tabs-slide')) {
                    return;
                }

                var currentPage = arrCon.indexOf(el);
                addActiveClass(currentPage);
            }

            // 展开时增减class
            function navActiveClass(str) {
                if (str === 'add') {
                    tools.addClass(tabNavArrow, 'active');
                    tools.addClass(navMark, 'active');
                    tools.addClass(body, 'no-scroll');
                }
                else if (str === 'remove') {
                    tools.removeClass(tabNavArrow, 'active');
                    tools.removeClass(navMark, 'active');
                    tools.removeClass(body, 'no-scroll');
                }
            }

            // 增减 active class
            function addActiveClass(index) {
                var nowPage = index;
                var oldPage = tabData.currentPage;
                if (nowPage === oldPage) {
                    return;
                }

                moveNav(oldPage, nowPage);
            }

            // 统一处理 class 并移动 tab
            function resolveClass(prev, current) {
                tools.removeClass(navItem[prev], tabData.activePageClass);
                tools.removeClass(navContentItem[prev], tabData.activePageClass);
                tools.removeClass(contentItem[prev], tabData.activePageClass);

                tools.addClass(navItem[current], tabData.activePageClass);
                tools.addClass(navContentItem[current], tabData.activePageClass);
                tools.addClass(contentItem[current], tabData.activePageClass);
            }

            // 移动 nav
            function moveNav(prev, current) {
                resolveClass(prev, current);
                tabData.currentPage = current;
                var currentIndex = current - 2;
                navScroll.goToPage(currentIndex, 0, 300);
                viewport.setScrollTop(changeTop);
                var lineX = current * perNavWidth;
                tabLine.style.transform = 'translateX(' + lineX + 'px)';
                contSlideArr[prev] = initHeight;
                setHeight(contSlideArr[current]);
                util.css(contentItem[current], {
                    height: 'auto',
                    overflow: 'visible'
                });
                var posX = current * perContentWidth * (-1) + 'px';
                tabsContent.style.transform = 'translate3d(' + posX + ', 0, 0)';
                contentWrapper.addEventListener('transitionend', contenHandler, false);
            }

            function contenHandler() {
                for (var i = 0; i < contLen; i++) {
                    util.css(contentItem[i], {
                        height: initHeight,
                        overflow: 'hidden'
                    });
                }
                var currenCont = tools.queryAll('.tabs-slide.active', contentWrapper)[0];
                util.css(currenCont, {
                    height: 'auto',
                    overflow: 'visible'
                });
                viewport.trigger('refresh');
                viewport.trigger('scroll');
                contentWrapper.removeEventListener('transitionend', contenHandler, false);
            }

            function setHeight(nowHeight) {
                // for (var i = 0; i < contLen; i++) {
                //     util.css(contentItem[i], {
                //         height: initHeight,
                //         overflow: 'hidden'
                //     });
                // }
            }

        }, 20);
    };

    return customElement;
});
