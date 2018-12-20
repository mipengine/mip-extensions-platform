/**
 * @file mip-cy-event-analyse 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ele = $(this.element);
        var type = $ele.attr('type') || 'load';
        var href = $ele.attr('href') || '';
        var key = $ele.attr('key') || '';
        try {
            var segmentation = JSON.parse($ele.attr('segmentation'));
        }
        catch (e) {
            var segmentation = {};
        }

        if (type === 'click') {
            $ele.on('click', function () {
                dataUpload(key, segmentation);
                if (href) {
                    window.location.href = href;
                    window.parent.location.href = href;
                }
            });
        } else if (type === 'load') {
            dataUpload(key, segmentation);
        }
    };

    function dataUpload(key, segmentation) {
        $.ajax({
            url: 'https://m.chunyuyisheng.com/stat/h5/event_analyse/data_upload/',
            type: 'post',
            data: {
                events: JSON.stringify([{
                    key: key,
                    segmentation: segmentation
                }])
            }
        });
    }

    return customElement;
});
