/**
 * @file mip-jia-swiper 组件
 * @author
 */


define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    // 修复多个组件多次加载swiper
    function swiperFn(Element) {
        var Swipers = window.Swiper;
        var elemObj = Element.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
            if (data.params.pagination) {
                $(Element).append('<div class=' + data.params.pagination + '></div>');
            }
            if (data.params.swiper) {
                Element[data.params.swiper] = new Swipers(Element, data.params);
            }
            else {
                if ($(Element).find('.swiper-wrapper').length > 0) {
                    new Swipers(Element, data.params);
                }
            }
        }
        catch (e) {
            return false;
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var Element = this.element;
        if (window.Swiper) {
            swiperFn(Element);
        } else {
            var loadNode = document.createElement('script');
            loadNode.type = 'text/javascript';

            // 加载swiper插件
            loadNode.src = 'https://mued2.jia.com/js/mobile/swiper3.min.js';
            $('body').append(loadNode);
            loadNode.onload = function () {
                swiperFn(Element);
            };
        }
    };
    return customElement;
});
