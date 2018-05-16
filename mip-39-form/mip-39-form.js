/**
 * @file mip-39-form 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var page = {
            formParamObj: {},
            init: function () {
                this.eventBind();
            },
            eventBind: function () {
                var that = this;
                ele.querySelector('#J_submit').onclick = function () {
                    that.serialize();
                    if (that.formParamObj.cure_type === '0') {
                        that.popupAlert('请选择专家类型');
                        return;
                    } else if (that.formParamObj.user_name === '') {
                        that.popupAlert('请输入您的姓名');
                        return;
                    } else if (that.formParamObj.phone_num.length === 0) {
                        that.popupAlert('请输入您的电话号码');
                        return;
                    } else if (!(/^1(3|4|5|7|8)\d{9}$/g).test(that.formParamObj.phone_num)) {
                        that.popupAlert('请输入正确的电话号码');
                        return;
                    } else if (!ele.querySelector('[agreement]').checked) {
                        that.popupAlert('请阅读并同意《39互联网医院服务条款》');
                        return;
                    } else {
                        $.ajax({
                            type: 'GET',
                            data: {'appid': 'ca95c23bfc39a7cc88', 'appsecret': '9836e18777be4a759b3a17a370833d3e'},
                            url: 'https://top.39hospital.com/v1/app/token',
                            success: function (data, textStatus) {
                                console.log(data);
                                var token = JSON.parse(data);
                                that.formParamObj['access_token'] = token.access_token;
                                that.formParamObj['source_num'] = 101;
                                $.ajax({
                                    type: 'POST',
                                    crossDomain: true,
                                    data: that.formParamObj,
                                    url: 'https://top.39hospital.com/v1/appointment/new',
                                    success: function (data, textStatus) {
                                        var yuyue = JSON.parse(data);
                                        if (yuyue.code === 0) {
                                            window.top.location.href = 'http://www.39hospital.com/home/service/appointmentsuc?tappid=0&serial_num=' + yuyue.serial_num;
                                        }
                                    }
                                });
                            }
                        });
                    };
                };

                for (var i = 0; i < ele.querySelectorAll('[on]').length; i ++) {
                    ele.querySelectorAll('[on]')[i].addEventListener('click', function (e) {
                        var clickAttr = this.getAttribute('on');
                        var elementName = clickAttr.substring(clickAttr.indexOf(':') + 1, clickAttr.indexOf('.'));
                        var valueElement;
                        var selectValue;
                        if (clickAttr.substring(clickAttr.indexOf('.') + 1) === 'toggle') {
                            that.toggleHandle(ele.querySelector('#' + elementName));
                        } else {
                            var selectBox = '#' + elementName + '-select';
                            valueElement = ele.querySelector(selectBox).querySelector('[select-value]');
                            selectValue = that.getNode(e.target).getAttribute('value');
                            that.toggleHandle(ele.querySelector('#' + elementName));
                            if (elementName === 'expert-box') {
                                var price = that.getNode(e.target).getAttribute('price');
                                valueElement.innerHTML = selectValue + '(<i class="f60">' + price + '</i>)';
                                valueElement.setAttribute('price', price.replace(/￥/g, ''));
                            } else {
                                valueElement.innerHTML = selectValue;
                            }
                            valueElement.setAttribute('value', that.getNode(e.target).getAttribute('data-type'));
                        }
                    });
                }

                ele.querySelector('#J_toast_close').onclick = function () {
                    that.toggleHandle(ele.querySelector('#J_toast_tip'));
                };
            },
            popupAlert: function (text) {
                var toastBox = ele.querySelector('#J_toast_tip');
                ele.querySelector('#J_toast_content').innerHTML = text;
                this.toggleHandle(toastBox);
            },
            toggleHandle: function (element) {
                if (element.style.display === 'block') {
                    element.style.display = 'none';
                } else {
                    element.style.display = 'block';
                }
            },
            getNode: function (node) {
                if (node.nodeName === 'LI') {
                    return node;
                } else {
                    return this.getNode(node.parentNode);
                }
            },
            serialize: function () {
                var that = this;
                var form = ele.querySelector('#form');
                var element = form.querySelectorAll('[name]');
                var len = element.length;
                for (var i = 0; i < len; i++) {
                    if (element[i].nodeName === 'INPUT' || element[i].nodeName === 'TEXTAREA') {
                        that.formParamObj[element[i].getAttribute('name')] = element[i].value;
                    } else {
                        that.formParamObj[element[i].getAttribute('name')] = element[i].getAttribute('value');
                        if (element[i].getAttribute('name') === 'cure_type') {
                            that.formParamObj['admission_price'] = element[i].getAttribute('price');
                        }
                    }

                }
            }
        };
        page.init();
    };

    return customElement;
});