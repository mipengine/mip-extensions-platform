/**
 * @file mip-consultload-wl 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var btn = ele.find('.j-show');
        var showBox = ele.find('.j-all-desc');
        var hideBox = ele.find('.j-slice-desc');
        btn.on('click', function () {
            var $this = $(this);
            showBox.show();
            hideBox.hide();
        });
    };
    return customElement;
});