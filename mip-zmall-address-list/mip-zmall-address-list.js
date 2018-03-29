/**
 * @file mip-zmall-address-list 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');

    /**
     * 加载数据
     *
     * @param       {Function} callback 回调函数
     * @constructor
     */
    function loadAddressList(callback) {
        var self = this;
        var element = self.element;
        var confirmUrl = element.getAttribute('url');

        fetchJsonp(element.api.list, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            var address = res.address;
            if (address.status === 200) {
                if (confirmUrl) {
                    address.addressListUrl = function () {
                        return confirmUrl.replace('{{ADDRESSID}}', this.addressId);
                    };
                }
                templates.render(element, address).then(function (html) {
                    element.innerHTML = html;
                    callback(address);
                });
            }
            else {
                element.innerHTML = '<p class="empty-address">没有收货地址</p>';
                element.mipDialogComponent.customElement.toast(address.msg);
            }
        });
    }

    // 设置默认
    function setDefaultAddress(element, radio) {
        var userId = 0;
        var userInfo = window.ZOL_USER_INFO;
        if (userInfo && userInfo.sid && userInfo.sid !== '') {
            userId = userInfo.sid;
        }

        if (!userId) {
            element.mipDialogComponent.customElement.toast('请先登录才能操作');
            return;
        }

        var checkedRadioParent = element.checkedRadio && element.checkedRadio.parentNode;
        var value = radio.value;
        var parent = radio.parentNode;
        var textElement = parent.querySelector('span');
        var defaultApi = element.api.default + '&addressId=' + value + '&userId=' + userId;
        fetchJsonp(defaultApi, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (res.flag) {
                element.mipDialogComponent.customElement.toast('设置成功');
                if (element.checkedRadio) {
                    checkedRadioParent.classList.remove('label-radio--checked');
                    checkedRadioParent.querySelector('span').textContent = '设置默认';
                }
                parent.classList.add('label-radio--checked');
                textElement.textContent = '默认地址';
                element.checkedRadio = radio;
                checkedRadioParent = parent;
            }
            else {
                element.checkedRadio && (element.checkedRadio.checked = true);
                radio.checked = false;
                element.mipDialogComponent.customElement.toast(res.msg);
            }
        });
    }

    // 删除地址
    function delAddress(element, delElement) {
        var userId = 0;
        var userInfo = window.ZOL_USER_INFO;
        if (userInfo && userInfo.sid && userInfo.sid !== '') {
            userId = userInfo.sid;
        }
        if (!userId) {
            element.mipDialogComponent.customElement.toast('请先登录才能操作');
            return;
        }
        var addressId = delElement.dataset.id;
        var addressItemNode = delElement.parentNode.parentNode;
        var deleteApi = element.api.delete + '&addressId=' + addressId + '&userId=' + userId;
        element.mipDialogComponent.customElement.confirm('确定删除该地址？', {
            okCallback: function () {
                fetchJsonp(deleteApi, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (res.flag) {
                        addressItemNode.classList.add('removing');
                        setTimeout(function () {
                            element.removeChild(addressItemNode);
                            element.mipDialogComponent.customElement.toast('删除成功');
                        }, 201);
                    }
                    else {
                        element.mipDialogComponent.customElement.toast(res.msg);
                    }
                });
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;

        var userSettings = {};

        // 获取用户设置参数
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customParams = JSON.parse(script.textContent.toString());
                userSettings = util.fn.extend(userSettings, customParams);
            }

        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
            return;
        }

        var mipDialogComponent = document.querySelector('mip-zol-dialog');

        element.api = userSettings;
        element.mipDialogComponent = mipDialogComponent;

        // 加载数据
        loadAddressList.call(this, function (data) {
            // 设置为默认
            var radios = element.querySelectorAll('input[name="default"]');
            element.checkedRadio = element.querySelector('input[name="default"]:checked');
            [].forEach.call(radios, function (item) {
                item.addEventListener('change', function () {
                    setDefaultAddress(element, item);
                });
            });

            // 删除地址
            var delBtns = element.querySelectorAll('.js_address_del');
            [].forEach.call(delBtns, function (item) {
                // 为了一个动画效果
                var addressItemNode = item.parentNode.parentNode;
                var h = addressItemNode.clientHeight;
                util.css(addressItemNode, {
                    height: h
                });
                item.addEventListener('click', function () {
                    delAddress(element, item);
                });
            });
        });
    };

    return customElement;
});
