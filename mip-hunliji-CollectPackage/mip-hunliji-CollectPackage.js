/**
 * @file mip-hunliji-CollectPackage 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewer = require('viewer');
    var sessionId = '';

    function postPackage(element, divid, api, packageid, type) {
        var addApi = $(element).attr('data-api-add');
        var deleteApi = $(element).attr('data-api-del');

        var api = addApi;
        if ($(element).find('#btn_collect').text() === '已收藏') {
            api = deleteApi;
        }

        $.ajax({
            url: api,
            type: 'post',
            data: {
                'set_meal_id': packageid,
                sessionId: sessionId
            },
            success: function (result) {
                if (api === addApi) {
                    if (+result.status.RetCode === 0) {
                        $(divid).find('p').html('收藏成功');
                        $(divid).show();
                        $(element).find('#btn_collect').text('已收藏');
                        setTimeout(function () {
                            $(divid).hide();
                        }, 2000);
                    }
                } else {
                    if (+result.status.RetCode === 0) {
                        $(divid).find('p').html('取消收藏成功');
                        $(divid).show();
                        $(element).find('#btn_collect').text('收藏');
                        setTimeout(function () {
                            $(divid).hide();
                        }, 2000);
                    }
                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var api = $(element).attr('data-api');
        var packageid = $(element).attr('package-id');
        var type = $(element).attr('data-type');
        var divid = $('#collect_openbox');
        $(element).find('#btn_collect').on('click', function (e) {
            var info = JSON.parse($(element).attr('info'));

            if (info.isLogin) {
                e.stopPropagation();
                e.preventDefault();
                sessionId = info.sessionId;
                postPackage(element, divid, api, packageid, type);
            } else {
                viewer.eventAction.execute('login', e.target, e);
            }
        });
    };

    return customElement;
});
