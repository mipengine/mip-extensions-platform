/**
 * @file mip-watch-search 组件
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
        // TODO
        $('.search-left-select').on('click', function () {
            // 级联picker
            $(window)[0].weui.picker([
                {
                    label: '飞机票',
                    value: 0,
                    children: [
                        {
                            label: '经济舱',
                            value: 1
                        },
                        {
                            label: '商务舱',
                            value: 2
                        }
                    ]
                },
                {
                    label: '火车票',
                    value: 1,
                    children: [
                        {
                            label: '卧铺',
                            value: 1,
                            disabled: true // 不可用
                        },
                        {
                            label: '坐票',
                            value: 2
                        },
                        {
                            label: '站票',
                            value: 3
                        }
                    ]
                },
                {
                    label: '汽车票',
                    value: 3,
                    children: [
                        {
                            label: '快班',
                            value: 1
                        },
                        {
                            label: '普通',
                            value: 2
                        }
                    ]
                }
            ], {
                className: 'search-left-select',
                container: 'body',
                defaultValue: [1, 3],
                onConfirm: function (result) {
                    console.log(result);
                },
                id: 'doubleLinePicker'
            });
        });

    };

    return customElement;
});
