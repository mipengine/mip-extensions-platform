/**
 * @file mip-yyg-meun 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 存储对象
     * @type {{}}
     */
    var that = {};

    /**
     * 对外默认参数
     * @type {{active: string}}
     */
    var parmas = {
        active: 'active',
        regStr: '',
        childClass: null
    };

    var main = {
        init: function () {
            // 需要去除百度跳转的时候添加的各类参数
            var url = util.parseCacheUrl(window.location.href).replace(/#[\s\S]*/, '');

            that.childElement.each(function (i, elem) {
                var regStr = $(elem).attr('regStr');

                var reg = new RegExp(regStr);
                if (regStr && reg.test(url)) {

                    $(elem).addClass(parmas.active);

                }

            });

        },

        getChildNodes: function (element) {

            var allChildNodes = element.children;
            var arrNode = Array.prototype.slice.call(allChildNodes);
            var childList = [];

            arrNode.map(function (ele, i) {
                if (ele.tagName.toLowerCase() !== 'mip-i-space') {
                    childList.push(ele);
                    element.removeChild(ele);
                }

            });

            return $(childList);
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        that.self = this;
        that.elem = this.element;

        that.attrs = {
            active: this.element.getAttribute('active') || parmas.active,
            childClass: this.element.getAttribute('childClass') || parmas.childClass
        };

        that.childElement = that.attrs.childClass
            ? $(that.elem).find('.' + that.attrs.childClass) : main.getChildNodes(that.elem);

        main.init();
    };

    return customElement;
});
