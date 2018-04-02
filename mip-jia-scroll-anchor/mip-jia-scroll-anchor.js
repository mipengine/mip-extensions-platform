/**
 * @file MIP 滚动定位及跳转组件
 * @author tao
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var viewport = require('viewport');
    var customElement = require('customElement').create();

    /**
     * 点击跳转
     * @param {Object} obj 参数
     */
    customElement.prototype.clickHandle = function (obj) {
        var self = this;
        var dom = $(document);
        var element = $(this.element);
        if (!obj.skip) {
            throw new TypeError('mip-jia-scroll-anchor 组件缺少 skip 参数');
        }
        viewport.on('scroll', function () {
            self.scrollHandle(obj);
        });
        self.scrollHandle(obj);
        if (obj.skip.click) {
            var top = obj.skip.top || 10;
            element.find(obj.skip.class).on('click', function () {
                var index = element.find(obj.skip.class).index(this);
                self.eleTop[index] = parseInt($(obj.skip.conClass).eq(index).offset().top, 10);
                var $top = self.eleTop[index] - top;
                if (obj.skip.showmore && obj.showmore) {
                    $(obj.showmore.parent).addClass(obj.showmore.statusClass);
                }
                if (typeof (document.body.scrollTo) === 'function') {
                    document.body.scrollTo(0, $top);
                }
                if (typeof (document.documentElement.scrollTo) === 'function') {
                    document.documentElement.scrollTo(0, $top);
                }
                window.scrollTo(0, $top);
            });
        }
        if (obj.showmore) {
            dom.find(obj.showmore.class).on('click', function () {
                $(this).parent().toggleClass(obj.showmore.statusClass);
            });
        }
    };

    /**
     * 处理滚动时页面显示状态
     * @class
     * @param {Object} obj 参数
     */

    customElement.prototype.scrollHandle = function (obj) {
        var self = this;
        var $element = $(this.element);
        var currentClass = obj.skip.currentClass || 'current';
        var threshold = obj.skip.threshold || 10;
        var $ele = $(obj.skip.conClass);
        var current = null;
        if ($ele.length === 0) {
            throw new TypeError('mip-jia-scroll-anchor 组件缺少内容元素');
        }

        $element.find(obj.skip.class).each(function (index, ele) {
            self.eleTop[index] = parseInt($(ele).offset().top, 10);
        });

        $ele.each(function (index, el) {
            var $el = $(el);
            var height = $el.height();
            var top = $el.offset().top;
            var scrollTop = window.scrollY;

            if (scrollTop + threshold >= top && (scrollTop + threshold) <= (top + height)) {
                current = index;
                return false;
            }
        });
        if (current !== null) {
            $element.find('.' + currentClass).removeClass(currentClass);
            $element.find(obj.skip.class).eq(current).addClass(currentClass);
        }
    };

    // 页面渲染后就处理，因为很多场景是定位元素
    customElement.prototype.build = function () {
        var thisObj = this.element;
        var self = this;
        self.eleTop = [];
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        }
        catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        this.clickHandle(data);
        if (data.skip) {
            $(thisObj).find(data.skip.class).each(function (index, ele) {
                self.eleTop[index] = parseInt($(ele).offset().top, 10);
            });
        }
    };

    return customElement;
});
