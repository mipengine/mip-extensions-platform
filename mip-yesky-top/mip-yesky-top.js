/**
 * @file mip-yesky-top 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var offh = $(element).offset().top;
        $(window).scroll(function () {
            var scrh = $(this).scrollTop();
            if (scrh >= offh) {
                $(element).show();
                $(element).css({'width': '100%',
                                'position': 'fixed',
                                'top': '0px',
                                'left': '0px',
                                'z-index': 1000,
                                'background': '#fff'
                });
                $('#zhan').show();
            }
            else {
                $(element).css({'position': 'static'});
                $('#zhan').hide();
            }
        });
    };
    return customElement;
});
