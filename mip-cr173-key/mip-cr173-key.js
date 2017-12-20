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
                $(ele).find('.g-coll-btn').find('li').eq(i).hide();
                $(this).remove();
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
        var divnum = $(ele).find('.m-tabdivtxt .m-tab-cont').length;
        // 获取隐藏无内容后的正确选项卡数量
        if (divnum <= 1) {
            $(ele).find('.m-tab-box .m-tab-btn li').addClass('m-hover');
        } else {
            // 超过2个选项卡判断设备默认显示内容。
            if (/iphone|ipad/i.test(navigator.userAgent)) {
            //  苹果设备
                $(ele).find('.m-tab-box .m-tab-cont').hide().eq(1).show();
                // 隐藏并且显示苹果选项卡
                $(ele).find('.m-tab-box .m-tab-btn li').removeClass('m-hover').eq(1).addClass('m-hover');
                // 将第二个按钮加上css
            } else {
                $(ele).find('.m-tab-box .m-tab-cont').hide().eq(0).show();
                // 隐藏并且显示前边的
                $(ele).find('.m-tab-box .m-tab-btn li').removeClass('m-hover').eq(0).addClass('m-hover');
                // 将第一个按钮加上css
            }
            $(ele).find('.m-tab-box .m-tab-btn li').click(function () {
                $(ele).find('.f-loading-font').html('点击加载更多.....');
                $(ele).find('.m-tab-btn li').removeClass('m-hover');
                $(this).addClass('m-hover');
                // 设置文提示
                var btnin =  $(this).index();
                $(ele).find('.m-tabdivtxt .m-tab-cont').hide();
                $(ele).find('.m-tabdivtxt .m-tab-cont').eq(btnin).show();
            });
        }
        var waidivheight = $(ele).find('.m-tabdivtxt').height();
        // 获取设置后的高度
        $(ele).find('.f-loading-font').click(function () {
        // 点击更多时候判断属于哪个选项卡的内容
            var btnindex =  $(ele).find('.g-coll-btn li.m-hover').index();
            // 获取选项卡的位置
            var dqtabdiv = $(ele).find('.m-tabdivtxt .m-tab-cont').eq(btnindex);
            // 设置当前的内容div
            var hoverdivheight = dqtabdiv.height();
            // 获取当前高度
            var clicklen = dqtabdiv.find('.g-coll-gamedown').length;
            // 获取点击时，div内容的个数
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

        // K专用
        if (/iphone|ipad/i.test(navigator.userAgent)) {
            $(ele).find('.g-soft-ul-box').prepend($(ele).find('#f-ul-ios')[0]);
            // 假如苹果设备访问，将苹果内容提到前边去
        };
        var knum = Number($(ele).find('.f-list').attr('data-shownum'));
        var klihei = $(ele).find('.f-list li').height() + 10;
        $(ele).find('.f-list .f-list-div').each(function (i) {
            var klinum = $(this).find('ul li').length;
            if (klinum === 0) {
                $(this).remove();
            } else if (klinum < (knum + 1)) {
                $(this).find('.g-scoll-bottom').remove();
            } else {
                $(this).find('.g-newgame-ul').height(klihei * knum);
            }
            $(this).find('.g-scoll-bottom').click(function () {
                var kdhei = $(this).prev('.g-newgame-ul').height();
                var kdnum = $(this).prev('.g-newgame-ul').find('li').length;
                if ((kdhei + (knum * klihei)) <= (klihei * kdnum)) {
                    $(this).prev('.g-newgame-ul').height(kdhei + (knum * klihei));
                } else {
                    $(this).prev('.g-newgame-ul').height(klihei * kdnum);
                    $(this).remove();
                }
            });
        });
    };
    return customElement;
});
