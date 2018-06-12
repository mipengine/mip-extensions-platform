/**
 * @file mip-article-show 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);

        var ajaxUrl = ele.attr('ajaxUrl');

        // 文章标题
        var aTitleId = ele.attr('aTitleId');
        // 文章时间
        var aTimeId = ele.attr('aTimeId');
        // 文章来源
        var aSourceId = ele.attr('aSourceId');
        // 文章摘要
        var aDigestId = ele.attr('aDigestId');

        // 解析并获取链接带的参数
        var obj = {};
        var url = window.top.location;
        obj.hash = url.hash.replace('#', '');
        obj.param = {};
        url.search.slice(1).split('&').forEach(function (v) {
            var temp = v.split('=');
            obj.param[temp[0]] = temp[1];
        });

        var newsid = obj.param['newsid'];

        // 当文章id 和 接口地址存在时才请求数据
        if (newsid && ajaxUrl) {
            $.ajax({
                url: ajaxUrl,
                type: 'POST',
                dataType: 'json',
                data: {'newsid': newsid},
                success: function (msg) {
                    if (msg.status === '0') {
                        var theDataObj = msg.data;

                        // 标题
                        if (aTitleId) {
                            $('#' + aTitleId).text(theDataObj.title);
                        }
                        // 时间
                        if (aTimeId) {
                            $('#' + aTimeId).text(theDataObj.showtime);
                        }
                        // 来源
                        if (aSourceId) {
                            $('#' + aSourceId).text(theDataObj.source);
                        }
                        // 摘要
                        if (theDataObj.description && aDigestId) {
                            $('#' + aDigestId + '_con').text(theDataObj.description);
                        } else if (aDigestId) {
                            $('#' + aDigestId + '_wrap').addClass('noShow');
                        }

                        ele.html(theDataObj.body);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert("错误了");
                }
            });
        }
    };

    return customElement;
});

