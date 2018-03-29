/**
 * @file mip-zol-picker 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var Picker = require('./picker');

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

    customElement.prototype.build = function () {
        var element = this.element;

        var script = element.querySelector('script[type="application/json"]');
        var params = {};
        if (script) {
            var customParams = JSON.parse(script.textContent.toString());
            params = util.fn.extend(params, customParams);
        }

        var pickerType = params.pickerType || 'time';

        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = pickerType;
        element.appendChild(input);

        if (pickerType === 'time') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    window.MIP.setData({
                        userPickDate: val.value
                    });
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
        }
        else if (pickerType === 'city') {
            params = util.fn.extend(params, {
                successCallback: function (val) {
                    input.value = val.value;
                    var ids = val.code.split(',');
                    window.MIP.setData({
                        userSelectedCityName: val.value,
                        userSelectedProvinceId: ids[0],
                        userSelectedCityId: ids[1]
                    });
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
        }

        this.addEventAction('open', function () {
            // 城市数据
            if (pickerType === 'city') {
                var url = element.dataset.api;
                // 请求数据
                fetchJsonp(url, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (!res.status) {
                        params = util.fn.extend(params, {
                            data: res.data
                        });
                        element.myPicker = new Picker(params, element);
                        pickerMaskOpen(element);
                    }
                });
            }
            else {
                element.myPicker = new Picker(params, element);
                pickerMaskOpen(element);
            }
        });

        this.addEventAction('close', function () {
            pickerMaskClose(element);
            element.myPicker.hidePicker();
        });
    };

    return customElement;
});
