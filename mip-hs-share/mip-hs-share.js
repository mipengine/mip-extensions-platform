/**
 * @file mip-hs-share 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $('.hs-share-icon').click(function () {
            $(this).siblings('.pop-mask').show();
            $(this).siblings('mip-fixed').find('mip-share').show();
        });

        $('.pop-mask').click(function () {
            $(this).hide();
            $el.find('mip-share').hide();
        });

        $el.find('.c-share-btn').click(function () {
            $('.pop-mask').hide();
            $el.find('mip-share').hide();
        });
    };

    return customElement;
});
