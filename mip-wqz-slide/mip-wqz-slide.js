/**
 * @file mip-wqz-slide 组件
 * @author wangqizheng
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');
    var rect = util.rect;
    var platform = util.platform;
    var naboo = util.naboo;

    // 辅助方法
    var ut = {
        query: function (selector, el) {
            var doc = el ? el : document;
            return doc.querySelector(selector);
        },
        queryAll: function (selector, el) {
            var doc = el ? el : document;
            return doc.querySelectorAll(selector);
        },
        appendTo: function (el, node) {
            if (!this.isNodeList(node)) {
                return;
            }
            for (var i = 0; i < node.length; i++) {
                el.appendChild(node[i]);
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
        var self = this;
        var el = this.element;

        // class
        var classNameList = {
            slideContainer: 'slide-container',
            slideWrap: 'slide-wrap',
            slideItem: 'slide-item'
        };

        // 创建容器 并插入slideitem
        var slideContainer = ut.createTagWithClass(classNameList.slideContainer);
        var slideWrap = ut.createTagWithClass(classNameList.slideWrap);
        var buttonPreview = ut.createTagWithClass('slide-button slide-button-preview disable');
        var buttonNext = ut.createTagWithClass('slide-button slide-button-next');

        // slide
        var slide = {
            data: {
                el: el,
                perLength: 0,
                activeSlide: 0,
                traning: 0,
                max: 0
            },
            init: function (el) {
                this.setRect(el);
            },
            setRect: function (el) {
                var slideItem = ut.queryAll('.' + classNameList.slideItem);

                if (platform.isIos() || platform.isAndroid()) {
                    var perItemWidth = Math.floor(rect.getElementRect(slideItem[0]).width);
                    var space = parseInt(el.getAttribute('data-slide-space'), 10);
                    var slideLen = slideItem.length;
                    for (var m = 0; m < slideLen; m++) {
                        slideItem[m].style.marginRight = space + 'px';
                        slideItem[m].style.width = perItemWidth + 'px';
                    }
                    var finalWidth = (perItemWidth + space) * slideItem.length;
                    ut.query('.' + classNameList.slideWrap).style.width = finalWidth + 'px';
                } else {
                    var slideLen = slideItem.length;
                    var slideWidh = Math.floor(rect.getElementRect(el).width);
                    var space = parseInt(el.getAttribute('data-slide-space'), 10);
                    var preview = parseInt(el.getAttribute('data-slide-preview'), 10);
                    var perLength = Math.floor(slideWidh / preview);
                    this.data.perLength = perLength;
                    var perWidth = perLength - space;
                    for (var m = 0; m < slideLen; m++) {
                        slideItem[m].style.marginRight = space + 'px';
                        slideItem[m].style.width = perWidth + 'px';
                    }
                    ut.query('.' + classNameList.slideWrap).style.width = perLength * slideItem.length + 'px';
                }
                this.createBtn(el);
            },
            prevSlide: function () {
                if (slide.data.traning || slide.data.activeSlide === 0) {
                    return;
                }
                if (buttonNext.classList.contains('disable')) {
                    buttonNext.classList.remove('disable');
                }
                var nowSlide = --slide.data.activeSlide;
                slide.translateWrap(nowSlide, '100ms');
            },
            nextSlide: function () {
                if (slide.data.traning || slide.data.activeSlide === slide.data.max) {
                    return;
                }
                if (buttonPreview.classList.contains('disable')) {
                    buttonPreview.classList.remove('disable');
                }
                var nowSlide = ++slide.data.activeSlide;
                slide.translateWrap(nowSlide, '100ms');
            },
            createBtn: function (el) {
                el.appendChild(buttonPreview);
                el.appendChild(buttonNext);
            },
            translateWrap: function (index, time) {
                var value = index * this.data.perLength * -1;

                slide.data.traning = 1;
                naboo.animate(slideWrap, {
                    'transform': 'translateX(' + value + 'px)'
                }, {
                        duration: 200,
                        ease: 'ease',
                        delay: 0,
                        mode: 'transition',
                        cb: function () {
                            slide.data.traning = 0;
                            if (slide.data.activeSlide === 0) {
                                slide.hideButton('prev');
                            } else if (slide.data.activeSlide === slide.data.max) {
                                slide.hideButton('next');
                            }
                        }
                    }).start();
            },
            hideButton: function (btn) {
                if (btn === 'next') {
                    buttonNext.classList.add('disable');
                    return;
                }
                buttonPreview.classList.add('disable');
            }
        };

        var slideItems = el.querySelectorAll('.slide-item');
        slide.data.max = slideItems.length - parseInt(el.getAttribute('data-slide-preview'), 10);
        ut.appendTo(slideWrap, slideItems);
        slideContainer.appendChild(slideWrap);
        el.appendChild(slideContainer);
        slide.init(el);

        buttonNext.addEventListener('click', slide.nextSlide, false);
        buttonPreview.addEventListener('click', slide.prevSlide, false);

        // 滚动更新视图
        var updateView = util.fn.throttle(function () {
            viewport.trigger('changed');
        }, 200);
        slideContainer.addEventListener('scroll', updateView, false);
        // var slideWidh = rect.getElementRect(el).width;

        function getMark() {
            var initWidth = rect.getElementRect(el).width;
            var reloadMark = initWidth >= 600 ? 'pc' : 'phone';
            return reloadMark;
        }

        var mark = getMark();

        window.addEventListener('resize', function () {

            var markNew = getMark();
            if (markNew !== mark) {
                window.location.reload(true);
            }
        }, false);
    };

    return customElement;
});
