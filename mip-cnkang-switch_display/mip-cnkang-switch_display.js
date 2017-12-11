/**
 * @file mip-cnkang-switch_display 有来切换显示组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        $('.stateDoc').on('click', function () {
            if ($(this).hasClass('stateUp')) {
                $(this).removeClass('stateUp');
                $(this).parent().children('.con').addClass('conoverflow');
            } else {
                $(this).addClass('stateUp');
                $(this).parent().children('.con').removeClass('conoverflow');
            }
        });
        $('.docVisitClick').click(function () {
            $('.zhezhao').show();
            $('.visitTimeBigBox1').show();
        });
        $('.docBigClose').click(function () {
            $('.zhezhao').hide();
            $('.visitTimeBigBox1').hide();
        });
        $('.yl_header_right').click(function () {
            $('.zhezhao').show();
            $('.siteMap').show();
        });
        $('.mapClick').click(function () {
            $('.zhezhao').hide();
            $('.siteMap').hide();
        });
    };
    return customElement;
});

