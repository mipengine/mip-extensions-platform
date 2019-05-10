/**
 * @file mip-hunliji-integralstatistic 积分埋点
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    function getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }

    function getIntegral(url, code, shareUid, entityModel, id) {
        $.ajax({
            url: url,
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: {
                'code': code,
                'share_uid': shareUid,
                'entity_model': entityModel,
                'id': id
            },
            success: function (result) {
                console.log('success');
            },
            error: function (data) {
                console.log('error');
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        // TODO
        var url = $(element).attr('data-api');
        var model = $(element).attr('data-model');
        var code = $(element).attr('data-code');
        var id = window.location.pathname.match(/detail_[\d._]+/gi)[0].split('_')[1];
        var uid = getUrlParam('share_uid');
        if (id && uid) {
            getIntegral(url, code, uid, model, id);
        }
    };

    return customElement;
});
