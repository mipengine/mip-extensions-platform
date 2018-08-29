/**
 * @file mip-qqy-list 去去游列表下载点击加载更多
 * @author chinayubo 415204@qq.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var ajaxs = {
        nowPage: 0,
        totalPage: 0
    };
    var endhtml = '<p style="color:#f00;text-align:center;">没有了，加载完了</p>';
    function dropload(element, options) {
        ++ajaxs.nowPage;
        var count = options.count;
        var appmore = $(element).find('.appmore');
        ajaxs.ajaxUrl = options.url + '&page=' + ajaxs.nowPage;
        $.getJSON(ajaxs.ajaxUrl + '&callback=?', function (data) {
            if (ajaxs.nowPage >= count) {
                appmore.html(endhtml);
                return;
            }
            if (parseInt(count, 10) === 0) {
                return;
            }
            $(element).find('#applist').append(data);
        });
    }
    customElement.prototype.build = function () {
        var element = this.element;
        var params = JSON.parse(element.getAttribute('mip-dropload-params').replace(/'/g, '"'));
        $(element).find('.appmore a').on('click', function () {
            dropload(element, params);
        });
    };
    return customElement;
});
