/**
 * @file mip-ajaxform 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var obj = {
            formParam: {},
            init: function () {
                this.eventBind();
            },
            eventBind: function () {
                var that = this;
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