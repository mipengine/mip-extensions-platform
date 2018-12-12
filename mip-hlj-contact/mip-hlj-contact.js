/**
 * @file mip-hlj-contact 私信商家
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var viewer = require('viewer');

    function batchUrl() {
        if (/(m|www|admin).hunliji.com/i.test(window.location.hostname)) {
            return '//logs.hunliji.com/v2/api/app/tracker/batch.json';
        } else {
            return '//log7.hunliji.com/v2/api/app/tracker/batch.json';
        }
    }
    function clickPoint(appName, params) {
        var data = '{"events":[' + JSON.stringify(params) + ']}';

        $.ajax({
            url: batchUrl(),
            type: 'post',
            data: data,
            headers: {appName: appName},
            success: function (result) {
                console.log('success');
            },
            error: function (data) {
                console.log('error');
            }
        });
    }
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.dataset.href;

        this.addEventAction('contactCustomLogin', function (e) {
            if (e.origin === 'asynLogContact') {
                window.top.location.href = url;
            }
        });
        $(element).find('a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = {
                'page_name': '熊掌套餐详情页',
                'event_type': 'call',
                'element_parent_tag': 'div',
                'user_city': '',
                'user_id': '',
                'element_tag': 'package_item',
                'element_data': {
                    'data_id': $(this).attr('data-id'),
                    'data_type': 'Package',
                    'cpm_source': '',
                    'cpm_flag': ''
                }
            };
            clickPoint('wap', data);
            var info = JSON.parse($(element).attr('info'));
            if (!info.isLogin) {
                viewer.eventAction.execute('actionContact', e.target, e);
                return;
            }
            window.top.location.href = url;
        });
    };

    return customElement;
});
