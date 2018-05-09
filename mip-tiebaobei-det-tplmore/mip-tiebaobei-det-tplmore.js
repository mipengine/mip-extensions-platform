/**
 * @file mip-tiebaobei-det-tplmore 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('zepto');
        var ele = $(this.element);
        // 拓品类查看更多
        ele.find('.carBasic').on('click', '.JcheckMorePar', function () {
            $(this).remove();
            ele.find('#basicData_show li').removeClass('is-hide');
        });
    };
    return customElement;
});
