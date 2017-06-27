/**
 * @file 新闻详情改变字体大小
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var btn = $(element).find('.news-ziti');
        btn.click(function () {
            var value = $(this).html();
            if (value.indexOf('小') >= 0) {
                $(this).html('<i class="ziti-ico"></i>中');
                $('.news-content').removeClass('big').removeClass('small').addClass('mid');
                return;
            }
            if (value.indexOf('中') >= 0) {
                $(this).html('<i class="ziti-ico"></i>大');
                $('.news-content').removeClass('mid').removeClass('small').addClass('big');
                return;
            }
            if (value.indexOf('大') >= 0) {
                $(this).html('<i class="ziti-ico"></i>小');
                $('.news-content').removeClass('big').removeClass('mid').addClass('small');
                return;
            }
        });
    };
    return customElem;
});
