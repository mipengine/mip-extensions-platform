/**
 * @file mip-zmall-mobile-bind 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var viewer = require('viewer');
    var templates = require('templates');

    function preventTouch(e) {
        e.preventDefault();
    }

    // 设置遮罩层
    function setCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
        element.addEventListener('touchmove', preventTouch);
    }

    // 移除遮罩层
    function removeCover(element) {
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
        }, 300);
        element.removeEventListener('touchmove', preventTouch);
    }

    // 关闭
    function closeWindow(element) {
        var layerElement = element.querySelector('#js_bind_layer');
        layerElement.classList.remove('visible');
        removeCover(element);
    }

    // 获取用户配置
    function getCustomConfig(element) {

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        return settings;
    }

    var userMobile = {
        // 检查是否绑定手机号
        ajax: function (url, callback) {
            fetchJsonp(url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                callback(res);
            });
        },
        // 发送倒计时
        codeTimerCountdown: function (timerElement) {
            var countdown = parseInt(timerElement.getAttribute('data-timer'), 10);
            var timer = null;
            var setTimer = function () {
                if (countdown === 0) {
                    timerElement.classList.remove('sending');
                    timerElement.innerHTML = '获取验证码';
                    countdown = 60;
                    clearTimeout(timer);
                }
                else {
                    timerElement.classList.add('sending');
                    timerElement.innerHTML = countdown + 's后重发';
                    countdown--;
                }
                timer = setTimeout(function () {
                    setTimer();
                }, 1000);
            };
            setTimer();
        },

        showBindLayer: function (element, config) {
            setCover(element);
            var layer = element.querySelector('#js_bind_layer');
            if (layer) {
                layer.classList.add('visible');
            }
            else {
                var data = {};
                data.input = config.input;
                templates.render(element, data).then(function (html) {
                    element.innerHTML = html;
                    var mobileBindElement = element.querySelector('#js_bind_layer');
                    mobileBindElement.classList.add('visible');

                    // 绑定事件
                    userMobile.bindEvent(element, config);
                });
            }
        },

        bindEvent: function (element, config) {
            // 输入验证码后
            var codeInputElement = element.querySelector('input[name="code"]');
            var numberInputElement = element.querySelector('input[name="number"]');
            var bindButton = element.querySelector('#js_bind_button');
            var codeSendBtn = element.querySelector('#js_get_code');
            var closeElement = element.querySelector('#js_bind_close');
            var submitButton = element.querySelector('#js_bind_button');

            var mobileReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

            codeSendBtn.addEventListener('click', function () {
                var timerElement = this;
                var mobileNumber = numberInputElement.value + '';
                // 验证
                if (mobileNumber.trim().length < 11 || !mobileReg.test(mobileNumber.trim())) {
                    viewer.eventAction.execute('toast', element, {
                        msg: '手机号码有误'
                    });
                    return;
                }
                var codeUrl = config.code + '&mobile=' + mobileNumber;

                userMobile.ajax(codeUrl, function (data) {
                    var success = config.isNotCookie ? !data.status : data.flag;
                    if (success) {
                        userMobile.codeTimerCountdown(timerElement);
                    }
                    else {
                        viewer.eventAction.execute('toast', element, {
                            msg: data.msg
                        });
                    }
                });
            });

            codeInputElement.addEventListener('input', function () {
                var numberValue = numberInputElement.value;
                var codeValue = codeInputElement.value;
                // 验证码是6位
                if (numberValue.trim() !== '' && codeValue.trim() !== '' && codeValue.trim().length === 6) {
                    bindButton.disabled = false;
                    bindButton.classList.add('enable');
                }
                else {
                    bindButton.disabled = true;
                    bindButton.classList.remove('enable');
                }
            });

            closeElement.addEventListener('click', function () {
                closeWindow(element);
            });

            submitButton.addEventListener('click', function () {
                var self = this;
                var numberValue = numberInputElement.value;
                var codeValue = codeInputElement.value;
                self.innerHTML = '绑定中...';
                var url = config.bind + '&mobile=' + numberValue + '&bindCode=' + codeValue;
                if (config.isNotCookie) {
                    url += '&sessionId=' + element.sessionId;
                }
                userMobile.ajax(url, function (data) {
                    var success = config.isNotCookie ? !data.status : data.flag;
                    if (success) {
                        self.innerHTML = '绑定成功';
                        viewer.eventAction.execute('bindSuccess', element, {
                            target: config.clickElement,
                            sessionId: element.sessionId
                        });
                        setTimeout(function () {
                            closeWindow(element);
                        }, 100);
                    }
                    else {
                        viewer.eventAction.execute('toast', element, {
                            msg: data.msg
                        });
                    }
                });
            });
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var self = this;
        var element = self.element;

        var config = getCustomConfig(element);

        self.addEventAction('setsessionid', function (e) {
            element.sessionId = e.sessionId ? e.sessionId : 0;
        });

        // 绑定手机号事件
        self.addEventAction('check', function (e) {
            var url = config.check;
            if (config.isNotCookie) {
                url += '&sessionId=' + element.sessionId;
            }
            userMobile.ajax(url, function (data) {
                var isNotBind = config.isNotCookie ? (!data.status && !data.isBindPhone) : !data.flag;
                if (isNotBind) {
                    config.clickElement = e.target;
                    userMobile.showBindLayer(element, config);
                }
                else {
                    viewer.eventAction.execute('binded', element, {
                        target: e.target,
                        sessionId: element.sessionId
                    });
                }
            });
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
