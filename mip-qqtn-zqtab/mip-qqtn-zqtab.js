/**
 * @file mip-qqtn-zqtab
 * 数据调用，抓取指定条数插入到指定地方，每12条为一个p标签差入。然后进行点击切换对应显示的p标签，并且截取设置的字符隐藏
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        if ($(ele).find('.m-addkuul li').eq(0).find('div span').length < 1) {
            // 获取div调用数据条数少于1条就隐藏最外成div
            $(ele).find('.g-addku').hide();
        }
        if ($('.g-addku').length > 0) {
            var kutitle = $('.g-addku .m-ttdiv').attr('data-kuname');
            // 获取data属性值，并且对指定值屏蔽隐藏
            var cuttitle = [kutitle, '合集', '大全'];
            var cutval = '';
            var newcutval = '';
            var newval = '';
            $('.m-addkuul li span').each(function () {
                cutval = $(this).find('a').text();
                if (cutval.indexOf('[]') !== -1) {
                    newval = cutval.split('[]')[0];
                } else {
                    if (cutval.indexOf('，') !== -1) {
                        newval = cutval.split('，')[0];
                    } else {
                        newval = cutval.split(',')[0];
                    }
                }
                for (var i = 0; i < cuttitle.length; i++) {
                    if (newval.indexOf(cuttitle[i]) !== -1) {
                        newcutval = newval.replace(cuttitle[i], '');
                        if (typeof(newcutval) !== 'undefined') {
                            $(this).find('a').text(newcutval.substr(0, 8));
                        }
                    }
                }
            });
        }
        // 没有那么多数据，调一个库里面的45条进行分割。
        $(ele).find('.m-addkuul li').eq(0).find('span').each(function (i) {
            // 给调用数据条数加数字标序号
            $(this).addClass('list' + i);
        });
        var snum = $(ele).find('.m-addkuul li').eq(0).find('span').length;
        var sheight = 46;
        $(ele).find('.m-addkuul li').width($(window).width());
        if (snum < 12) {
            // 判断调用数据条数小于12条
            if (snum <= 3) {
                $(ele).find('.g-addku').height(sheight + 84);
            } else {
                $(ele).find('.g-addku').height((sheight * 2) + 84);
            }
            $(ele).find('.g-addku .m-scroll-num').hide();
        }
        if (snum > 12 && snum < 25) {
            $(ele).find('.m-addkuul li').eq(0).find('div span').slice(0, 12).wrapAll('<p class="clearfix shuju1"></p>');
            $(ele).find('.m-addkuul li').eq(0).find('div span').slice(12, 24)
            .wrapAll('<p class="clearfix shuju2"></p>');
            $(ele).find('.m-addkuul li.m-li2 div').append($('.shuju2')[0]);
            $(ele).find('.m-scroll-num li:last').remove();
        }
        if (snum > 25) {
            // 判断调用数据条数小于大于25条
            $(ele).find('.m-addkuul li').eq(0).find('div span').slice(0, 12).wrapAll('<p class="clearfix shuju1"></p>');
            // 抓取前面12条新建一个p标签包含
            $(ele).find('.m-addkuul li').eq(0).find('div span').slice(12, 24)
            .wrapAll('<p class="clearfix shuju2"></p>');
            // 抓取前面12条数据后面的12条数据新建一个p标签包含
            $(ele).find('.m-addkuul li').eq(0).find('div span').slice(24, 36)
            .wrapAll('<p class="clearfix shuju3"></p>');
            // 抓取前面24条数据后面的12条数据新建一个p标签包含
            $(ele).find('.m-addkuul li.m-li2 div').append($('.shuju2')[0]);
            // 把新建的shuju2这个p标签放到指定m-li2 div下面展示
            $(ele).find('.m-addkuul li.m-li3 div').append($('.shuju3')[0]);
            // 把新建的shuju3这个p标签放到指定m-li3 div下面展示
            // $(ele).find(".g-addku").height(sheight+108);
            // $(ele).find(".m-addkuul li").height(160)
        }
        $(ele).find('.ad-kucolname p').find('span').eq(0).addClass('m-hover');
        $(ele).find('.m-addkuul').find('li').eq(0).addClass('block');
        $(ele).find('.g-addku .ad-kucolname p span').each(function () {
            if ($(this).text().indexOf('修改') !== -1 || $(this).text().indexOf('电脑版') !== -1
                || $(this).text().indexOf('下载') !== -1 || $(this).text().indexOf('辅助') !== -1) {
                // 读取标题名称，如果包含“修改、电脑版、下载、辅助”就移除该标题不显示
                $(this).remove();
            }
            $(this).click(function () {
                // 点击执行
                $(this).addClass('m-hover').siblings().removeClass('m-hover');
                // 自身添加class移除同级class
                var contul = $(ele).find('.g-addku .ad-kucolname p span').index(this);
                $(ele).find('.m-addkuul').find('li').eq(contul).addClass('block').siblings().removeClass('block');
                $(ele).find('.m-scroll-num').find('li').eq(contul)
                .addClass('m-hover').siblings().removeClass('m-hover');
                // 做关联对应div添加class移除同级class
            });
        });
        var kucatnum = $(ele).find('.ad-kucolname p span').size();
        // 判断标题个数
        if (kucatnum === 2) {
            // 标题个数为2个的时候移除div最后面的一个li。以及小图标的最后一个
            $('.g-addku .m-scroll-num li').last().remove();
        }
        if (kucatnum === 1) {
            $('.g-addku .m-scroll-num li').remove();
        }
    };
    return customElement;
});
