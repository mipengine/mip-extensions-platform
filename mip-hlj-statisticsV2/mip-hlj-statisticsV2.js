/**
 * @file mip-hlj-statisticsV2
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');

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
        $(element).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = {
                'page_name': $(element).attr('data-name'),
                'event_type': $(element).attr('data-event'),
                'element_parent_tag': 'div',
                'user_city': '',
                'user_id': '',
                'element_tag': $(element).attr('data-tag'),
                'element_data': {
                    'data_id': $(element).attr('data-id'),
                    'data_type': $(element).attr('data-type'),
                    'cpm_source': '',
                    'cpm_flag': ''
                }
            };
            clickPoint('wap', data);
        });
    };

    return customElement;
});
