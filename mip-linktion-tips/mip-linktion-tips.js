/**
 * @file mip-linktion-tips 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        this.addEventAction('open', function (event, option) {
            var textString = option.split(',')[0];
            var statusString = option.split(',')[1];
            var text = textString.slice(1, textString.length - 1);
            var status = statusString.slice(1, statusString.length - 1);
            var hintsHtml = '';
            if (status === 'err') {
                hintsHtml = '<div class="web-error web-hint">'
                            + '<p>' + text + '</p>'
                            + '</div>';
            }
            else if (status === 'success') {
                hintsHtml = '<div class="web-hint web-succeed">'
                            + ' <p>' + text + '</p>'
                            + ' </div>';
            }
            $el.find('#hints_box').html(hintsHtml);
            hideHints();
        });
        function hideHints() {
            setTimeout(function () {
                $el.find('.web-hint').fadeOut();
            }, 6000);
        }
    };

    return customElement;
});
