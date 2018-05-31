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
     * tab一定会出现在首屏，需要在插入文档时就执行
     */
    /**/
    customElement.prototype.build = function () {
        // 检测是否支持触摸
        var touch = 'ontouchstart' in window;
        var eClick = touch ? 'touchstart' : 'click';

        // 初始化外层容器
        var self = this;
        var tabs = self.element;
        var semiFixedTabs = tools.queryAll('mip-semi-fixed .tabs-nav-wrapper');
        var navWrapper = tools.query('.tabs-nav-wrapper', tabs);
        var tabNav = tools.query('.tabs-nav', navWrapper);
        var contentWrapper = tools.query('.tabs-content-wrapper', tabs);
        var navItem = tools.queryAll('.tabs-slide', tabNav);
        var contentItem = tools.queryAll('.tabs-slide', contentWrapper);
        var body = document.body;
        // 初始宽高
        var wrapperWidth = Math.floor(rect.getElementRect(contentWrapper).width);
        var cols = parseInt(tabs.getAttribute('tabs-col'), 10);
        var changeTop = parseInt(tabs.getAttribute('tabs-change-top'), 10);
        var buffer = parseInt(tabs.getAttribute('tabs-buffer'), 10);
        var bufferFinal = buffer ? buffer : 0;
        var perNavWidth = wrapperWidth / cols;
        var navWidth = perNavWidth * navItem.length;
        tools.query('.tabs-nav', navWrapper).style.width = navWidth + 'px';

        var navLength = navItem.length;
        for (var i = 0; i < navLength; i++) {
            var navItemNow = navItem[i];
            navItemNow.style.width = perNavWidth + 'px';
            navItemNow.classList.add('nav-slide');
            navItemNow.setAttribute('nav-index', i);
        }
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
        var contSlideArr = [];
        var initHeight = viewport.getScrollHeight() - util.rect.getElementOffset(contentItem[0]).top - bufferFinal;
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

        // 当iframe下打开时
        var navScrollIframe = null;
        if (semiFixedTabs.length > 1) {
            var temp = semiFixedTabs[1];
            var semiFixedIframe = temp.parentNode;
            semiFixedIframe.innerHTML = '';
            var navWrapperIframe = navWrapper.cloneNode(true);
            navWrapperIframe.setAttribute('id', 'navWrapperIframe');
            semiFixedIframe.appendChild(navWrapperIframe);
            var tabIframe = navWrapperIframe.querySelector('.tabs-nav');
            var navItem = navWrapperIframe.querySelector('.tabs-slide');
            // 拦截默认滑动
            navWrapperIframe.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
        }

        // 第一个tab加active
        var firstTab = document.querySelectorAll('[nav-index="0"]');
        for (var k = 0; k < firstTab.length; k++) {
            firstTab[k].classList.add('active');
        }
        contentItem[0].style.height = 'auto';
        var tabLineAll = document.querySelectorAll('.tab-line');
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

            // 展开初始化
            var navArrowAll = document.querySelectorAll('.tab-nav-arrow');
            var navContentAll = document.querySelectorAll('.nav-content');
            util.css(navContentAll, {
                width: wrapperWidth
            });

            var arrCon = Array.prototype.slice.call(navContentItem);
            document.addEventListener(eClick, updateTab, false);

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
                var el = e.target;
                if (el.classList.contains('nav-slide')) {
                    var navIndex = el.getAttribute('nav-index') * 1;
                    addActiveClass(navIndex);
                }

                navActiveClass('remove');
                if (el.classList.contains('tab-nav-arrow') || el.classList.contains('nav-arrow')) {
                    toggle();
                }
            }

            // 展开时增减class
            function navActiveClass(str) {
                if (str === 'add') {
                    for (var na = 0; na < navArrowAll.length; na++) {
                        navArrowAll[na].classList.add('active');
                    }

                    tools.addClass(navMark, 'active');
                    tools.addClass(body, 'no-scroll');
                }
                else if (str === 'remove') {
                    for (var na = 0; na < navArrowAll.length; na++) {
                        navArrowAll[na].classList.remove('active');
                    }
                    tools.removeClass(navMark, 'active');
                    tools.removeClass(body, 'no-scroll');
                }

                return false;
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

                var prevTab = document.querySelectorAll('[nav-index="' + prev + '"]');
                for (var p = 0; p < prevTab.length; p++) {
                    prevTab[p].classList.remove('active');
                }
                contentItem[prev].classList.remove('active');
                var currentTab = document.querySelectorAll('[nav-index="' + current + '"]');
                for (var c = 0; c < currentTab.length; c++) {
                    currentTab[c].classList.add('active');
                }
                contentItem[current].classList.add('active');
            }

            // 移动 nav
            function moveNav(prev, current) {
                resolveClass(prev, current);
                tabData.currentPage = current;
                var currentIndex = current - 2;
                navScroll.goToPage(currentIndex, 0, 300);
                if (semiFixedTabs.length > 1 && current >= 2 && current <= navLength) {
                    var finalCurrent = current < navLength - 3 ? current : navLength - 3;
                    var tabIframeX = perNavWidth * (finalCurrent - 2) * -1;
                    tabIframe.style.transform = 'translateX(' + tabIframeX + 'px)';
                }

                viewport.setScrollTop(changeTop);
                var lineX = current * perNavWidth;
                util.css(tabLineAll, {
                    transform: 'translateX(' + lineX + 'px)'
                });
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
                for (var i = 0; i < contLen; i++) {
                    util.css(contentItem[i], {
                        height: initHeight,
                        overflow: 'hidden'
                    });
                }
            }

        }, 20);
    };
    return customElement;
});
