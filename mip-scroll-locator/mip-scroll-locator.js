/**
 * @file mip-scroll-locator 组件
 * @author susc
 * @description 此组件只为showcase，请勿在正式产品使用。
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var viewport = require('viewport');
    var util = require('util');
    var ascroll = require('./ascroll');
    var customElement = require('customElement').create();

    /**
     * 处理滚动时页面显示状态
     */
    customElement.prototype.scrollHandle = function () {
        var $element = $(this.element);
        var className = $element.attr('data-current-class') || 'current';
        var threshold = $element.attr('data-threshold') || 200;
        var current = null;

        if (this.$section.length) {
            this.$section.each(function (index, el) {
                var $el = $(el);
                var height = $el.height();
                var top = $el.offset().top;
                var scrollTop = window.scrollY;

                if (scrollTop + threshold >= top && (scrollTop + threshold) <= (top + height)) {
                    current = el.id;
                    return false;
                }
            });
            if (current) {
                $element.find('.' + className).removeClass(className);
                $element.find('[data-anchor="' + current + '"]').addClass(className);
            }
        }
    };

    /**
     * 页面渲染后就处理，因为很多场景是定位元素
     */
    customElement.prototype.build = function () {
        var self = this;
        var $ele = $(self.element);

        var wrapper = $ele.attr('wrapper');
        var during = $ele.attr('during') || '';
        
        var $wrapper = $('#' + wrapper);

        // 如果内容为静态则直接获取锚点绑定
        getAnchorInfo.call(self);

        // 如果为动态异步内容则依靠事件绑定
        self.addEventAction('bindanchor', function (e) {
            getAnchorInfo.call(self, Array.prototype.slice.call(arguments, 1));
        });

        $ele.on('click', '[data-anchor]', function (e) {
            var $target = $(e.target);
            var id = $target.attr('data-anchor');
            var $tar = $('#' + id);
            var tar = $tar.get(0);
            var scrolltop = 0;
            var $prevEle = $tar.parent().prev();
            while($prevEle.length) {
                scrolltop += $prevEle.height();
                $prevEle = $prevEle.prev();
            }

            if ($tar.length) {
                var rectInfo = tar.getBoundingClientRect() || {};
                if (typeof scrolltop === 'number') {
                    setTimeout(function () {
                        if (/^\d+$/g.test(during) && +during !== 0) {
                            ascroll.scrollTo($wrapper.get(0), scrolltop, during);
                        }
                        else {
                            $wrapper.get(0).scrollTo(0, scrolltop);
                        }
                        scrolltop = 0;
                    }, 0);
                }
            }
        });

        $wrapper.on('scroll', util.fn.throttle(self.scrollHandle.bind(self)));
        self.scrollHandle();
    };

    function getAnchorInfo() {
        var self = this;
        var $ele = $(self.element);
        if ($ele.length) {
            var $anchor = $ele.find('[data-anchor]');
            var selector = $anchor.map(function (index, el) {
                return '#' + el.getAttribute('data-anchor');
            }).get();
            self.$section = $(selector.join(','));
        }
        self.scrollHandle();
    }

    return customElement;
});