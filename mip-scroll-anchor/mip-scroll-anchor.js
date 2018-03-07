/**
 * @file MIP 滚动定位锚点组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElement = require('customElement').create();

    /**
     * 处理滚动时页面显示状态
     */
    customElement.prototype.scrollHandle = function () {
        var $element = $(this.element);
        var className = $element.attr('data-current-class') || 'current';
        var threshold = $element.attr('data-threshold') || 200;
        var current = null;

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
            $element.find('[anchor="' + current + '"]').addClass(className);
        }
    };

    /**
     * 页面渲染后就处理，因为很多场景是定位元素
     */
    customElement.prototype.build = function () {
        var self = this;
        var $anchor = $(self.element).find('[anchor]');

        if (!$anchor.length) {
            throw new TypeError('mip-scroll-anchor 组件缺少 [anchor] 元素');
        }

        var selector = $anchor.map(function (index, el) {
            return '#' + el.getAttribute('anchor');
        }).get();
        self.$section = $(selector.join(','));

        viewport.on('scroll', self.scrollHandle.bind(self));
        self.scrollHandle();
    };

    return customElement;
});
