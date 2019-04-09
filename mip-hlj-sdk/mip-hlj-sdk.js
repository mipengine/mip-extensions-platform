/**
 * @file mip-hlj-sdk 婚礼纪网站访问v2数据统计
 * @author kong_kong
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var customElement = require('customElement').create();

    function sdkData(appName, params) {
        var data = '{"events":[' + JSON.stringify(params) + ']}';
        $.ajax({
            url: 'https://logs.hunliji.com/v2/api/app/tracker/batch.json',
            type: 'POST',
            data: data,
            headers: {appName: appName},
            success: function (res) {
                console.log(res);
            }
        });
    }

    function rans(len) {
        if (storage.get('rans')) {
            return storage.get('rans');
        } else {
            len = len || 32;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            storage.set('rans', pwd);
            return pwd;
        }
    }

    function sdk(appName, params) {
        $.ajax({
            url: 'https://www.hunliji.com/sms/ip',
            type: 'get',
            success: function (result) {
                params['user_city'] = result;
                sdkData(appName, params);
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        var resultParams = {
            'page_name': params.pageName,
            'event_type': params.action === 'view'
                ? 'element_view' : params.action === 'hit' ? 'element_hit' : params.action,
            'element_parent_tag': params.elementParentTag,
            'user_id': params.userId,
            'element_tag': params.elementTag,
            'element_data': {
                'data_id': params.dataId || rans(32),
                'data_type': params.dataType,
                'cpm_source': params.cpmSource,
                'cpm_flag': params.cpmFlag
            }
        };

        if (params.ext) {
            resultParams.element_data.ext = params.ext;
        }

        // 初始化页面的时候调用
        if (params.action === 'view') {
            sdk(params.appName, resultParams);
        }

        this.addEventAction('open', function () {
            sdk(params.appName, resultParams);
        });
    };

    return customElement;
});
