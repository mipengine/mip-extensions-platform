/**
 * @file mip-lscyb-list 绿色下载列表数据组件
 * @author chinayubo 415204@qq.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewport = require('viewport');
    var ajaxs = {
        nowPage: 0,
        totalPage: 0,
        downhtml: '<div class="dropload-down"><p class="dropload-load"><span class="loading"></span>加载中...</p></div>'
    };
    var endhtml = '<p style="color:#f00;text-align:center;">没有了，加载完了</p>';
    function dropload(element, options) {
        ++ajaxs.nowPage;
        var count = options.count;
        var appmore = $(element).find('.appmore');
        appmore.html(ajaxs.downhtml);
        ajaxs.ajaxUrl = options.url + '&page=' + ajaxs.nowPage;
        $.getJSON(ajaxs.ajaxUrl + '&callback=?', function (data) {
            if (ajaxs.nowPage >= count) {
                $(element).find('.dropload-down').html(endhtml);
                return;
            }
            if (parseInt(count, 10) === 0) {
                return;
            }
            $(element).find('#applist').append(data);
            appmore.html('<div class="dropload-down"><div class="dropload-refresh">↑上拉加载更多</div></div>');
        });
    }
    customElement.prototype.build = function () {
        var element = this.element;
        var params = JSON.parse(element.getAttribute('mip-dropload-params').replace(/'/g, '"'));
        $(element).find('.appmore').on('click', function () {
            dropload(element, params);
        });
        if (params.isclick) {
            viewport.on('scroll', function (e) {
                if (viewport.getScrollTop() + viewport.getHeight() >= viewport.getScrollHeight()) {
                    if (ajaxs.nowPage === params.count || ajaxs.nowPage >=  params.count) {
                        $(element).find('.dropload-down').html(endhtml);
                        return;
                    }
                    else {
                        dropload(element, params);
                    }
                }

            });
        }

    };
    return customElement;
});
