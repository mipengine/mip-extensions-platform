/**
 * @file mip-jia-bottomshare 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);

        $('.jia-share-icon').click(function () {
            $('.pop-mask').show();
            $ele.find('mip-share').show();
        });

        $('.pop-mask').click(function () {
            $(this).hide();
            $ele.find('mip-share').hide();
        });

        $ele.find('.c-share-btn').click(function () {
            $('.pop-mask').hide();
            $ele.find('mip-share').hide();
        });
    };

    return customElement;
});
