/**
 * @file mip-hunliji-baikeTabs 组件
 * @author li_shu
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    function getBaikeList(url, element, href, page) {
        $.ajax({
            url: url,
            type: 'get',
            xhrFields: {
                withCredentials: true
            },
            data: {
                page: page,
                ajax: 1
            },
            success: function (result) {
                var html = '';
                for (var i = 0; i < result.data.list.length; i++) {
                    var htmlJing = '';
                    var tagHtml = '';
                    var item = result.data.list[i];
                    var item1 = result.data.diary_list;
                    if (item.related_mark.length) {
                        for (var j = 0; j < item.related_mark.length; j++) {
                            tagHtml += '<a class="link" href="/bai_ke/tag_'
                                    + item.related_mark[j].id + '">' + item.related_mark[j].title + '</a>';
                        }
                    }
                    if (i === 9) {
                        var num = page * 2 - 2;
                        var text = '';
                        if (item1[num].content) {
                            text = item1[num].content;
                        }
                        htmlJing = '<div class="baike_180716">\
                            <div class="baike_180716_title">\
                                <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                                 class="a1">' + item1[num].title + '</a>\
                                <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                                 class="a2">APP内打开</a></div>\
                            <div class="baike_180716_tag">\
                            <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                            >新娘日记精选</a></div>\
                            <div class="baike_180716_text">\
                            <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                            >' + text + '</a></div>\
                        </div>';
                    } else if (i === 19) {
                        var num = page * 2 - 1;
                        var text = '';
                        if (item1[num].content) {
                            text = item1[num].content;
                        }
                        htmlJing = '<div class="baike_180716">\
                            <div class="baike_180716_title">\
                                <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                                 class="a1">' + item1[num].title + '</a>\
                                <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                                 class="a2">APP内打开</a></div>\
                            <div class="baike_180716_tag">\
                            <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                            >新娘日记精选</a></div>\
                            <div class="baike_180716_text">\
                            <a href="//www.hunliji.com/p/wedding/Public/wap/activity/20170306download.html?id=347"\
                            >' + text + '</a></div>\
                        </div>';
                    }
                    html += '<div class="content__item" data-id="' + item.id + '">\
                                    <div class="content__item__left">\
                                    <a href="/bai_ke/detail_' + item.id + '">\
                                    <img src="' + item.cover_path + '?imageView2/1/w/170/h/170"\
                                     alt="' + item.title + '" />\
                                    </a>\
                                    </div>\
                                    <div class="content__item__right">\
                                        <div class="content__item__right_hd">\
                                        <a href="/bai_ke/detail_' + item.id + '"><h2>' + item.title + '</h2></a>\
                                        <div class="content__tags">' + tagHtml + '</div>\
                                        </div>\
                                        <div class="content__item__right_bd">\
                                        <div>' + item.created_at.substring(0, 10) + '</div>\
                                        <div>阅读' + item.watch_count + '</div>\
                                        </div>\
                                    </div>\
                                </div>';
                    html += htmlJing;
                }
                $(element).append(html);
                $('body').removeClass('loading');
                if (result.data.list.length <= 0) {
                    $('body').addClass('nodata');
                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var url = location.href;
        var href = $(element).attr('data-href');
        var page = 1;
        var $wrapper = $(element).parents('.order_wrapper');
        getBaikeList(url, element, href, page);
        $(window).on('scroll', function () {
            var top = document.documentElement.scrollTop + document.body.scrollTop;
            var textheight = $(document).height();
            var spt = textheight - top - $(window).height();
            if (spt < 500 * page && !$('body').hasClass('nodata')) {
                if (!$('body').hasClass('loading')) {
                    $('body').addClass('loading');
                    page++;
                    getBaikeList(url, element, href, page);
                };
            } else if (spt < 500 * page && $('body').hasClass('nodata') && !$('body').hasClass('luck')) {
                $('body').append(
                    '<div style="width:100%; float:left; border-top:0.5px solid #e2e2e2;text-align:center;\
                    padding-top:20px;padding-bottom:20px;background:#fff;font-family:arial;color:#999;font-size:14px;">\
                    浙ICP备13004478号 © 杭州火烧云科技有限公司</div>'
                );
                $('body').addClass('luck');
            };
        });
        // TODO
    };

    return customElement;
});
