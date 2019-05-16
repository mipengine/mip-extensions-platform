/**
 * @file mip-qqtn-onblock
 * 判断div下总的li个数大于10个就添加一个查看更多按钮，并且每点击一次查看按钮累加一次10乘以单个li的高度
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
            // 在组件下添加一个查看按钮
            var nten = hxcx * knum;
            // 获取10个li的总高度
            $(ele).find('.f-vateul').height(nten);
            // 获取li的个数乘以10的高度赋值
            $(ele).find('#more').click(function () {
            // 点击查看更多按钮每次获取10个li的高度
                var tenul = $(ele).find('.f-vateul').height();
                // 定义上面获取10个li的总高度
                if ((tenul + nten) <= (hxcx * kdnum)) {
                // 判断点击一次按钮的高度加上10个乘以单个li的高度小于或者等于单个li的高度乘以总得个数
                // 如果大于直接else
                    $(ele).find('.g-cate-list').height(tenul + nten);
                    // 此处赋值的高度是每点击一次#more按钮初始10个li的总高度加上10*单个li高度
                    // 每点击一次#more按钮高度就在此值上累加一次kdhei
                } else {
                    $(ele).find('#infocon').height(hxcx * kdnum);
                    // 此处赋值高度是单个高度乘以总的个数
                    $(ele).find(this).text('暂无更多内容');
                }
            });
        }
    };
    return customElement;
});
