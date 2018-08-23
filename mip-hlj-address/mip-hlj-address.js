/**
 * @file mip-hlj-address 地址选择组件
 * @author kong_kong@hunliji.com
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var Picker = require('./picker');
    var $ = require('zepto');

    function pickerMaskOpen(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
    }

    function pickerMaskClose(element) {
        var picker = element.querySelector('.picker');
        picker.classList.remove('open');
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
    }

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        var idInput = element.dataset.idEl;
        var valueInput = element.dataset.valueEl;

        params = util.fn.extend(params, {
            successCallback: function (val) {
                if ($('#' + idInput) && $('#' + idInput).length > 0) {
                    $('#' + idInput)[0].value = val.code;
                }
                if ($('#' + valueInput) && $('#' + valueInput).length > 0) {
                    $('#' + valueInput)[0].value = val.value;
                }

                pickerMaskClose(element);
            },
            cancelCallback: function () {
                pickerMaskClose(element);
            },
            createCallback: function () {
                var mask = element.querySelector('.picker-mask');
                mask.addEventListener('click', function (e) {
                    pickerMaskClose(element);
                    element.myPicker.hidePicker();
                });
            }
        });

        this.addEventAction('open', function () {
            var url = element.dataset.api;

            if (params && params.data) {
                element.myPicker = new Picker(params, element);
                pickerMaskOpen(element);
                return;
            }

            if (url) {
                // 请求数据
                fetch(url).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (!res.status.RetCode) {
                        const apiKey = element.dataset.apiKey;
                        var result = apiKey ? res.data[apiKey] : res.data;
                        params = util.fn.extend(params, {
                            data: result
                        });
                        element.myPicker = new Picker(params, element);
                        pickerMaskOpen(element);
                    }
                });
            }
        });

        this.addEventAction('close', function () {
            pickerMaskClose(element);
            element.myPicker.hidePicker();
        });
    };

    return customElement;
});
