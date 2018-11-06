/**
 * @file 横向滑动组件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

    /**
     * 默认配置
     *
     * @const
     * @type {Object}
     */
    var DEFAULTS = {
        rate: 97 / 1140 * 100,
        right: 24 / 97 * 100,
        type: null
    };

    /**
     * 验证元素节点
     */
    customElement.prototype.init = function () {
        var self = this;
        var element = self.element;

        [
            '[data-wrapper]',
            '[data-inner]',
            '[data-scroller]',
            '[data-item]'
        ].forEach(function (key) {
            if (!element.querySelectorAll(key).length) {
                self.warn('组件必须包含属性元素 `' + key + '` 。', element);
                self.build = function () { };
            }
        });
    };

    /**
     * 打印警告日志
     */
    customElement.prototype.warn = function () {
        var args = [].slice.call(arguments);
        args.unshift('<mip-scrollboxauto>:');
        console.warn.apply(console, args);
    };

    /**
     * 提前执行，因为要设置元素的宽度
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var config = util.fn.extend({}, DEFAULTS, element.dataset);
        var updateView = util.fn.throttle(function () {
            viewport.trigger('changed');
        }, 200);

        // 绑定滚动事件触发更新视图
        element.querySelector('[data-inner]').addEventListener('scroll', updateView);

        element.addEventListener('touchmove', function (e) {
            e.stopPropagation();
        });

        var scorll = element.querySelectorAll('[data-scroller]');
        if (scorll.length) {
            [].slice.call(scorll[0].children).forEach(function (node, index) {
                if (node.getAttribute('class') === 'cur') {
                    var FatherNode = element.querySelector('[data-inner]');
                    FatherNode.scrollLeft = node.offsetWidth * (index - 1);
                }
            });
        }
    };

    return customElement;
});
