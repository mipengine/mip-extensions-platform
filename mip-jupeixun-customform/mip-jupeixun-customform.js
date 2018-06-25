/**
 * @file mip-jupeixun-customform 组件
 * @author
 */

define(function (require) {
    // 'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var obj = {
            formParam: {},
            nationOptions: '',
            init: function () {
                this.eventBind();
            },
            eventBind: function () {
                var that = this;

                ele.querySelector('.state').onchange = function () {
                    var cid = this.value;

                    // 获取国家
                    that.nationSelectOptions(cid);
                };

                ele.querySelector('.ajax-submit').onclick = function () {
                    that.serialize();
                    // console.log(that.formParam)
                    $.ajax({
                        url: that.formParam.formUrl,
                        type: 'POST',
                        data: that.formParam,
                        cache: false,
                        dataType: 'jsonp',
                        jsonpCallback: 'callback',
                        success: function (data) {
                            // console.log(data);
                            that.popupAlert(data.info);
                        }
                    });
                };
            },

            nationSelectOptions: function ($cid) {
                var that = this;
                var apiUrl = ele.querySelector('.nationApiUrl').value;
                $.ajax({
                    url: apiUrl + '?cid=' + $cid,
                    type: 'GET',
                    cache: false,
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: function (data) {
                        var options = '';
                        if (data.code === 1) {
                            for (var i = 0; i < data.data.length; i++) {
                                options += '<option value="' + data.data[i].catid + '">' + data.data[i].catname;
                                options += '</option>\n';
                            }
                        }
                        if (options === '') {
                            options = '<option value="">请选择国家</option>';
                        }
                        ele.querySelector('.nation').innerHTML = options;
                    }
                });
            },

            popupAlert: function (text) {
                var toastBox = ele.querySelector('.tips-box');
                ele.querySelector('.tips-msg').innerHTML = text;
                this.toggleHandle(toastBox);
                var timer = setTimeout(function () {
                    ele.querySelector('.tips-box').style.display = 'none';
                    clearTimeout(timer);
                },
                1000);
            },

            toggleHandle: function (element) {
                if (element.style.display === 'block') {
                    element.style.display = 'none';
                }
                else {
                    element.style.display = 'block';
                }
            },

            serialize: function () {
                var that = this;
                // var form = ele.querySelector('.form-horizontal');
                var elements = ele.querySelectorAll('[name]');
                var len = elements.length;
                for (var i = 0; i < len; i++) {
                    if (elements[i].nodeName === 'INPUT' || elements[i].nodeName === 'TEXTAREA') {
                        that.formParam[elements[i].getAttribute('name')] = elements[i].value;
                    }
                    else if (elements[i].nodeName === 'SELECT') {
                        that.formParam[elements[i].getAttribute('name')] = elements[i].value;
                    }
                    else {
                        that.formParam[elements[i].getAttribute('name')] = elements[i].getAttribute('value');
                    }
                }
            }
        };
        obj.init();
    };

    return customElement;
});
