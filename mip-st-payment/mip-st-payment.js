/**
 * @file mip-st-payment 组件
 * @author
 */

/* global cambrian */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var templates = require('templates');

    function getQuery(url) {
        url = url || location.href;
        var query = url.split('?')[1] || '';
        if (!query) {
            return {};
        }
        return query.split('&').reduce(function (obj, item) {
            var data = item.split('=');
            obj[data[0]] = decodeURIComponent(data[1]);
            return obj;
        }, {});
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var querys = getQuery();

        var script = document.createElement('script');
        script.onload = function () {
            // 获取关注状态，决定是否展现熊掌号
            // cambrian.isSubscribe({
            //     success: function (res) {
            //         if (!res.result) {
            //             element.querySelector('.subscribe').style.opacity = 1;
            //         }
            //     }
            // });

            // 获取熊掌号名称
            cambrian.getInfo({
                success: function (res) {
                    var data = {
                        icon: 'data:image/svg+xml;utf8,<svg width="209" height="209" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M160.25 22.48C144.362 11.661 125.17 5.337 104.5 5.337c-54.766 0-99.163 44.397-99.163 99.163s44.397 99.163 99.163 99.163 99.163-44.397 99.163-99.163c0-13.314-2.624-26.015-7.382-37.614" stroke="#3C76FF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path stroke="#3C76FF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" d="M53.983 90.43l41.205 41.205L180.324 46.5"/></g></svg>',
                        checkbox: {
                            unchecked: 'data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M23.993 6C14.072 6 6 14.071 6 23.993c0 9.922 8.072 17.993 17.993 17.993 9.922 0 17.993-8.071 17.993-17.993C41.986 14.071 33.915 6 23.993 6m0 38.986C12.417 44.986 3 35.568 3 23.993 3 12.417 12.417 3 23.993 3c11.575 0 20.993 9.417 20.993 20.993 0 11.575-9.418 20.993-20.993 20.993" fill="#EEE" fill-rule="evenodd"/></svg>',
                            checked: 'data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M23.993 44.986C12.417 44.986 3 35.568 3 23.993 3 12.417 12.417 3 23.993 3c11.575 0 20.993 9.417 20.993 20.993 0 11.575-9.418 20.993-20.993 20.993" fill="#555"/><path d="M20.903 29.276l-5.36-5.592a1.464 1.464 0 0 0-2.092-.022 1.52 1.52 0 0 0-.017 2.132l6.063 6.265a3 3 0 0 0 4.27.042l12.6-12.52a1.493 1.493 0 0 0 .003-2.114 1.503 1.503 0 0 0-2.122-.004L22.33 29.294a1 1 0 0 1-1.427-.018z" fill="#FFF"/></g></svg>'
                        },
                        text: querys.text || '',
                        xzhName: res.result.name
                    };
                    templates.render(element, data).then(function (html) {
                        element.innerHTML = html;
                        var subscribe = element.querySelector('.subscribe');
                        subscribe.addEventListener('click', function () {
                            var checked = subscribe.classList.contains('checked');
                            if (checked) {
                                subscribe.classList.remove('checked');
                                subscribe.classList.add('unchecked');
                            }
                            else {
                                subscribe.classList.add('checked');
                                subscribe.classList.remove('unchecked');
                            }
                        }, false);
                        var button = element.querySelector('.button');
                        button.addEventListener('click', function () {
                            var checked = subscribe.classList.contains('checked');
                            if (checked) {
                                cambrian.follow({
                                    data: {
                                        isSub2Box: false,
                                        opType: 'add',
                                        appid: querys.id,
                                        source: 'pay_success',
                                        store: 'uid_cuid'
                                    },
                                    success: function () {
                                        // 跳转mip页面
                                        location.replace(querys.redirect);
                                    },
                                    fail: function () {
                                        // 跳转mip页面
                                        location.replace(querys.redirect);
                                    }
                                });
                            }
                            else {
                                // 跳转mip页面
                                location.replace(querys.redirect);
                            }
                        }, false);
                    });
                }
            });
        };
        script.src = 'https://xiongzhang.baidu.com/sdk/c.js?appid=' + querys.id + '&timestamp=' + (+new Date());
        document.body.appendChild(script);
    };

    return customElement;
});
