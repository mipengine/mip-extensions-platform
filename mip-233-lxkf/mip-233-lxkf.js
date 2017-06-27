/**
 * @file 联系客服插件
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var tag = document.createElement('script');
        var tag2 = document.createElement('script');
        var type = $(element).attr('data-type');
        tag.src = 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9278';
        tag2.src = 'https://img.233.com/x/plus/kf/1.0.0/kefu.js?v=1.0.0';
        $('body').append(tag);
        $('body').append(tag2);
        $(element).find('.kefu').click(function () {
            if (type === 'presale') {
                window.kefu233.presale();
            } else {
                window.kefu233.aftersale();
            }
        });
    };
    return customElem;
});
