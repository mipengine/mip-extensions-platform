/**
 * @file  作用：滚动显示简介，点击显示简介。默认显示X条数据，点击显示更多数据。
 * @author gom
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var conHeight = $(ele).find('#content .g-cont-scroll').height();
        var i = 0;
        var setTimer = '';
        setTimer = setTimeout(function () {
            window.setInterval(function () {
                i++;
                if (i <= conHeight) {
                    $(ele).find('#content .g-cont-scroll').animate({top: -i}, 0);
                } else {
                    i = 0;
                    $(ele).find('#content .g-cont-scroll').animate({top: -i}, 0);
                }
            }, 50);
        }, 3000);
        // 滚动结束
        var descHtml = $(ele).find('.g-cont-scroll').html();
        $(ele).find('.m-desc-alert p').html(descHtml);
        $(ele).find('#content,#g-look-desc').click(function () {
            $(ele).find('.m-desc-div').show();
        });

        // 显示内容结束
        // 点击加载页面隐藏内容
        var onedivliheight = $(ele).find('.m-tabdivtxt div div').height() + 10;
        // 获取单个内容的高度
        var keyshownum = Number($(ele).find('.m-tabdivtxt').attr('data-shownum'));
        // 获取页面上指定的每次显示数量
        $(ele).find('.m-tabdivtxt .m-tab-cont').each(function (i) {
        // 设置高度
            var tabdivnum = $(this).find('.g-coll-gamedown').length;
            // 获取每个选项卡里面的内容的数量
            if (tabdivnum === 0) {
                $(ele).find('.g-coll-btn li').eq(i).remove();
                $(ele).find('.m-tabdivtxt .m-tab-cont').eq(i).remove();
            }
            if (tabdivnum < keyshownum) {
            // 假如数量小于指定的数量
                $(this).height(tabdivnum * onedivliheight);
                // 将第一页高度设置为高度乘以数量
            } else {
                $(this).height(onedivliheight * keyshownum);
                // 反之将第一个div高度设置为模版限制高度
            }

        });
        // 自用选项卡开始
        $(ele).find('.m-tab-box .m-tab-cont').hide().eq(0).show();
        $(ele).find('.m-tab-box .m-tab-btn li').eq(0).addClass('m-hover');
        $(ele).find('.m-tab-box .m-tab-btn li').click(function () {
            $(ele).find('.f-loading-font').html('点击加载更多.....');
            $(ele).find('.m-tab-btn li').removeClass('m-hover');
            $(this).addClass('m-hover');
            // 设置文提示
            var btnin =  $(this).index();
            console.log(btnin);
            $(ele).find('.m-tabdivtxt .m-tab-cont').hide();
            $(ele).find('.m-tabdivtxt .m-tab-cont').eq(btnin).show();
        });
        var waidivheight = $(ele).find('.m-tabdivtxt').height();
        // 获取设置后的高度
        $(ele).find('.f-loading-font').click(function () {
        // 点击更多时候判断属于哪个选项卡的内容
            var btnindex =  $(ele).find('.g-coll-btn li.m-hover').index();
            // 获取选项卡的位置
            var dqtabdiv = $(ele).find('.m-tabdivtxt .m-tab-cont').eq(btnindex);
            console.log(dqtabdiv);
            // 设置当前的内容div
            var hoverdivheight = dqtabdiv.height();
            // 获取当前高度
            var clicklen = dqtabdiv.find('.g-coll-gamedown').length;
            // 获取点击时，div内容的个数
            console.log(hoverdivheight);
            console.log(clicklen * onedivliheight);
            if (hoverdivheight < clicklen * onedivliheight) {
            // 数量大于模版规定的数量
                if (hoverdivheight + (onedivliheight * keyshownum) < clicklen * onedivliheight) {
                    dqtabdiv.height(hoverdivheight + (onedivliheight * keyshownum));
                    // 设置高度
                } else {
                    dqtabdiv.height(clicklen * onedivliheight);
                    $(ele).find('.f-loading-font').html('没有更多内容了.....');
                }
            } else {
                $(ele).find('.f-loading-font').html('没有更多内容了.....');
            }
        });
    };
    return customElement;
});
