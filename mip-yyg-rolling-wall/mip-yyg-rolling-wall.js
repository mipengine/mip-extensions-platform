/**
 * @file mip-yyg-rolling-wall 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    var carouselParas = {
        boxClass: 'mip-slider-container',
        wrapBoxClass: 'mip-slider-wrapper',
        slideBox: 'mip-slider-slideBox'
    };

    /**
     * 页面中可见幻灯的个数
     * @type {number}
     */
    var showCount = 3;



    /**
     * 存储对象
     * @type {{}}
     */
    var that = {};

    var main = {

        init: function () {

            var carouselBox = $('<div class="' + carouselParas.boxClass + '"></div>');
            var wrapBox = $('<div class="' + carouselParas.wrapBoxClass + '"></div>');

            var boxWidth = 100 / that.attrs.showCount * that.childElement.length;
            var childWidht = 100 / that.childElement.length;

            wrapBox.addClass('clearfix');
            wrapBox.css('width', boxWidth + '%');
            that.childElement.css({
                'width': childWidht + '%',
                'float': 'left'
            });

            that.childElement.appendTo(wrapBox);
            wrapBox.appendTo(carouselBox);
            carouselBox.appendTo(that.elem);

            /**
             * 对mip-img元素赖加载bug的修复
             */
            that.self.applyFillContent(that.elem, true);
            // inview callback  bug, TODO
            var MIP = window.MIP || {};
            MIP.prerenderElement(that.elem);
            var allImgs = $(that.elem).find('mip-img');
            var len = allImgs.length;
            for (var idx = 0; idx < len; idx++) {
                that.self.applyFillContent(allImgs[idx], true);
                MIP.prerenderElement(allImgs[idx]);
            }

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
     * 组件初始化创建
     */
    customElement.prototype.firstInviewCallback = function () {
        that.self = this;
        that.elem = this.element;
        that.childElement = main.getChildNodes(that.elem);

        that.attrs = {
            showCount: parseFloat(this.element.getAttribute('showCount') || showCount)
        };

        main.init();
    };



    return customElement;
});
