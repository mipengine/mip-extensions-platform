/**
 * @file mip-hs-toggleclass 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // 因为zepto不支持slideUp方法，所以采用jquery，以方便效果实现
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    $('body').on('click', '.discuss', function () {
        var That = $(this);
        var Text = That.find('.disnum').text();
        if (Text.substring(0, Text.length - 2) === '0') {
            return false;
        }
        else {
            if (That.find('.slidup').hasClass('show')) {
                That.find('.slidup').removeClass('show');
                That.find('.slidup').hide();
                That.find('.disnum').show();
                That.parents('.answer_other').siblings('.discuss_show').slideUp();
            }
            else {
                That.find('.slidup').addClass('show');
                That.find('.slidup').show();
                That.find('.disnum').hide();
                That.parents('.answer_other').siblings('.discuss_show').slideDown();
            }
        }
    });
    customElement.prototype.firstInviewCallback = function () {};
    return customElement;
});
