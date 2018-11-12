/**
 * @file mip-html-name
 * 获取标签值然后判断
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var contentHeight = $(ele).find('.g-cont').height();
        $(ele).find('.g-cont').height(680);
        $(ele).find('.g-cont').addClass('on-hover');
        $(ele).find('.m-show-content p').click(function () {
            var btnText = $(ele).find(this).text();
            if (btnText === '加载全部内容' || btnText === '点击查看更多')
            {
                $(ele).find('.g-cont').animate({height: contentHeight}, 300);
                $(ele).find('.g-cont').removeClass('on-hover');
                $(ele).find(this).text('点击收起内容').append('<b class="u-up"></b>');
            }
            else {
                $(ele).find('.g-cont').animate({height: 680}, 300);
                $(ele).find(this).text('加载全部内容').append('<b></b>');
                $(ele).find('.g-cont').addClass('on-hover');
            }
        });
    };
    return customElement;
});