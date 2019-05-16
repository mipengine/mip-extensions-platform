/**
 * @file mip-qqtn-onblock
 * 点击查看更多按钮每次展开10个li标签的高度
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var knum = 10;
        // 注意此处一个定义整个li的个数；一个定义单个高度。没有进行相同的 DOM 查找
        // var gxcx = $(ele).find('.g-cate-list li').length;
        var kdnum = $(ele).find('#infocon').find('li').length;
        // 获取整体UL下面li的个数
        var hxcx = $(ele).find('.g-cate-list li').height();
        // 获取单个li的高度
        if (kdnum >= knum) {
            // 判断整体li的个数大于10个，就添加一个查看更多的按钮进行展开效果
            var morebtn = '<p class=\"more-cont\"><span id=\"more\" class=\"more\">点击查看更多...</span></p>';
            $(ele).find('.f-addmore').after(morebtn);
            $(ele).find('.f-vateul').height(hxcx * knum);
        }
        $(ele).find('#more').click(function () {
            // 点击查看更多按钮每次获取10个li的高度累加展开
            var kdhei = $(ele).find('.f-tenul').height();
            // var kdnum = $(ele).find('.g-cate-list').find('li').length;
            if ((kdhei + (knum * hxcx)) <= (hxcx * kdnum)) {
                $(ele).find('.g-cate-list').height(kdhei + (knum * hxcx));
            } else {
                $(ele).find('#infocon').height(hxcx * kdnum);
                $(ele).find(this).text('暂无更多内容');
            }
        });
    };
    return customElement;
});
