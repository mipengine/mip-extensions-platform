/**
 * @file mip-hunliji-CollectPackage 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    function postPackage(element, divid, api, packageid, type) {
        $.ajax({
            url: api,
            type: 'post',
            data: {
                'set_meal_id': packageid
            },
            success: function (result) {
                if (type === 'collect') {
                    if (+result.status.RetCode === 1000) {
                        window.top.location.href = location.origin + '/baidu/authorize?url=' + location.href;
                    } else if (+result.status.RetCode === 0) {
                        $(divid).find('p').html('收藏成功');
                        $(divid).show();
                        setTimeout(function () {
                            $(divid).hide();
                            window.top.location.href = location.href;
                        }, 2000);
                    }
                } else {
                    if (+result.status.RetCode === 1000) {
                        window.top.location.href = location.origin + '/baidu/authorize?url=' + location.href;
                    } else if (+result.status.RetCode === 0) {
                        $(divid).find('p').html('取消收藏成功');
                        $(divid).show();
                        setTimeout(function () {
                            $(divid).hide();
                            window.top.location.href = location.href;
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
        $(element).on('click', function () {
            postPackage(element, divid, api, packageid, type);
        });
    };

    return customElement;
});
