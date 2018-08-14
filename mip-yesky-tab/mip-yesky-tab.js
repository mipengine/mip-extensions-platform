/**
 * @file mip-yesky-tab 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var productId = $(element).attr('productId');
        var link = window.location.href;
        var inx = link.indexOf('product');
        var common = link.slice(0, inx);
        var offh = $(element).offset().top;
        $(window).scroll(function () {
            var scrh = $(this).scrollTop();
            if (scrh >= offh) {
                $(element).show();
                $(element).css({'width': '100%',
                    'position': 'fixed',
                    'top': '45px',
                    'left': '0px',
                    'z-index': 1000,
                    'background': '#fff'
                });
                $('#zhan').show();
            }
            else {
                $(element).css('position', 'static');
                $('#zhan').hide();
            }
        });
        // 点击其他分类执行结果
        $(element).on('click', '#line li', function () {
            var ThisIndex = $(this).index();
            $('.piclist ul').eq(ThisIndex).show().addClass('active')
                .siblings('ul').removeClass('active').hide();
        });
    };
    return customElement;
});
