/**
 * @file mip-st-submitappraise 组件
 * @author
 */

/* global MIP, m */
/* eslint-disable no-console */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var util = require('util');

    function toQueryString(query) {
        var str = [];
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                var value = query[key];
                if (({}).toString.call(value) === '[object Object]') {
                    str.push(key + '=' + JSON.stringify(value));
                }
                else {
                    str.push(key + '=' + encodeURIComponent(value));
                }
            }
        }
        return str.join('&');
    }


    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var script = element.querySelector('script');
        var config = JSON.parse(script.innerHTML);
        var text = element.getAttribute('text');
        var html = '';
        html += '<div class="st-button">' + text + '</div>';
        element.innerHTML = html;

        function error(text) {
            viewer.eventAction.execute('showMsg', element, {
                text: text
            });
        }

        this.addEventAction('redirect', function () {
            history.back();
        });

        util.event.delegate(element, '.st-button', 'click', function () {
            var submitData = [];
            for (var key in config.fields) {
                if (config.fields.hasOwnProperty(key)) {
                    var conf = config.fields[key];
                    var data = m[key];
                    // 是否必填
                    if (conf.required && !data) {
                        error(conf.text);
                        return;
                    }
                    if (data && conf.min) {
                        if (typeof data === 'number') {
                            if (data < conf.min) {
                                error(conf.text);
                                return;
                            }
                        }
                        else if (data.length < conf.min) {
                            error(conf.text);
                            return;
                        }
                    }
                    if (conf.max) {
                        if (typeof data === 'number') {
                            if (data > conf.min) {
                                error(conf.text);
                                return;
                            }
                        }
                        else if (data.length > conf.min) {
                            error(conf.text);
                            return;
                        }
                    }
                    if (conf.type === 'boolean') {
                        submitData[key] = data ? 1 : 0;
                    }
                    else {
                        submitData[key] = data;
                    }
                }
            }
            /* eslint-disable */
            submitData.order_id = m.data.order_info.order_id;
            /* eslint-enable */
            // console.log(submitData);
            var options = JSON.parse(JSON.stringify(config.options));
            options.body = toQueryString(submitData);
            options.credentials = 'include';
            fetch(config.url, options).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (res.code) {
                    viewer.eventAction.execute('showerrmsg', element, {
                        text: res.msg,
                        buttons: [
                            {
                                id: 'ok',
                                value: '重新提交'
                            }
                        ]
                    });
                }
                else {
                    viewer.eventAction.execute('submitok', element, {
                        title: '评价完成',
                        text: '发布成功！感谢您让我们更进一步！',
                        buttons: [
                            {
                                id: 'ok',
                                value: '返回订单'
                            }
                        ]
                    });
                }
            }).catch(function (err) {
                viewer.eventAction.execute('showerrmsg', element, {
                    text: '很抱歉，网络故障<br>导致评价出错，请重新提交',
                    buttons: [
                        {
                            id: 'ok',
                            value: '重新提交'
                        }
                    ]
                });
            });
        });

    };

    return customElement;
});
/* eslint-enable no-console */
