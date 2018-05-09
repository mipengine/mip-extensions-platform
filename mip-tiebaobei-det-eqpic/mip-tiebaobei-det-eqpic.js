/**
 * @file mip-tiebaobei-det-eqpic 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('zepto');
        var ele = $(this.element);
        ele.on('click', '.showMoerPic', function () {
            if (ele.find('.equipImageList').hasClass('equipImageMaxHeight')) {
                ele.find('.equipImageList').removeClass('equipImageMaxHeight');
                ele.find('.showMoerPic').html('收起<i class="icon-uniE602"></i>');
            }
            else {
                ele.find('.equipImageList').addClass('equipImageMaxHeight');
                ele.find('.showMoerPic').html('查看更多<i class="icon-uniE600"></i>');
            }
        });
    };
    return customElement;
});
