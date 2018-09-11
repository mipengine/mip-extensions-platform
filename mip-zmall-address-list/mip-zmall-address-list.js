/**
 * @file mip-zmall-address-list 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');
    var viewer = require('viewer');

    /**
     * 加载数据
     *
     * @param       {Function} callback 回调函数
     * @constructor
     */
    function loadAddressList(callback) {
        var self = this;
        var element = self.element;
        var templateId = element.getAttribute('template');
        var templateElement = element.querySelector('#' + templateId);
        var confirmUrl = element.getAttribute('url');

        var url = element.api.list;
        if (element.isNeedLogin && element.sessionId && element.sessionId !== '') {
            url = element.api.list + '&sessionId=' + element.sessionId;
        }

        fetchJsonp(url, {
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
                if (templateElement) {
                    templates.render(element, address).then(function (html) {
                        element.innerHTML = html;
                        callback(address);
                    });
                }
                else {
                    var templateType = element.templateType;
                    templates._getTemplate(templateType).then(function (impl) {
                        var html = impl.render(element.templateHtml, address);
                        element.innerHTML = html;
                        callback(address);
                    });
                }
            }
            else {
                element.innerHTML = '<p class="empty-address">没有收货地址</p>';
                if (address.msg) {
                    viewer.eventAction.execute('fail', element, {
                        msg: address.msg
                    });
                }
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
        var sessionId = element.sessionId && element.sessionId !== '' ? element.sessionId : 0;
        if (!userId && !sessionId) {
            viewer.eventAction.execute('loginTip', element, {
                msg: '请先登录才能操作'
            });
            return;
        }

        var checkedRadioParent = element.checkedRadio && element.checkedRadio.parentNode;
        var value = radio.value;
        var parent = radio.parentNode;
        var textElement = parent.querySelector('span');
        var defaultApi = element.api.default + '&addressId=' + value + '&userId=' + userId;
        if (element.isNeedLogin) {
            defaultApi = element.api.default + '&addressId=' + value + '&sessionId=' + sessionId;
        }
        fetchJsonp(defaultApi, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            var success = element.isNeedLogin ? !res.status : res.flag;
            if (success) {
                viewer.eventAction.execute('success', element, {
                    msg: '设置成功'
                });
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
                viewer.eventAction.execute('fail', element, {
                    msg: res.msg
                });
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
        var sessionId = element.sessionId && element.sessionId !== '' ? element.sessionId : 0;
        if (!userId && !sessionId) {
            viewer.eventAction.execute('loginTip', element, {
                msg: '请先登录才能操作'
            });
            return;
        }
        var addressId = delElement.dataset.id;
        var addressItemNode = delElement.parentNode.parentNode;
        var deleteApi = element.api.delete + '&addressId=' + addressId + '&userId=' + userId;
        if (element.isNeedLogin) {
            deleteApi = element.api.delete + '&addressId=' + addressId + '&sessionId=' + sessionId;
        }

        viewer.eventAction.execute('confirm', element, {
            msg: '确定删除该地址？',
            options: {
                okCallback: function () {
                    fetchJsonp(deleteApi, {
                        jsonpCallback: 'callback'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (res) {
                        var success = element.isNeedLogin ? !res.status : res.flag;
                        if (success) {
                            addressItemNode.classList.add('removing');
                            setTimeout(function () {
                                element.removeChild(addressItemNode);
                                setEmpty(element);
                                viewer.eventAction.execute('success', element, {
                                    msg: '删除成功'
                                });
                            }, 201);
                        }
                        else {
                            viewer.eventAction.execute('fail', element, {
                                msg: res.msg
                            });
                        }
                    });
                }
            }
        });
    }

    // 删除最后一个的时候设置空样式
    function setEmpty(element) {
        var items = element.querySelectorAll('.js_address_del');
        if (!items.length) {
            element.innerHTML = '<p class="empty-address">没有收货地址</p>';
        }
    }

    // 回调函数
    function bindEvents(element) {
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

        element.api = userSettings;

        // 缓存模板信息
        var templateId = element.getAttribute('template');
        var templateElement = element.querySelector('#' + templateId);
        if (templateElement) {
            var templateType = templateElement.getAttribute('type');
            element.templateHtml = templateElement.innerHTML;
            element.templateType = templateType;
        }
        else {
            return;
        }

        var needLoginAttr = element.getAttribute('isNeedLogin');
        var isNeedLogin = needLoginAttr !== null && needLoginAttr !== '0' && needLoginAttr !== 'false';
        element.isNeedLogin = isNeedLogin;
        if (!isNeedLogin) {
            // 加载数据
            loadAddressList.call(this, function () {
                bindEvents(element);
                // 添加或者修改完成返回该页面的时候，刷新数据
                window.addEventListener('pageshow', function () {
                    self.refresh();
                }, false);
            });
        }
        else {
            // 绑定评论登录
            this.addEventAction('load', function (event) {
                element.sessionId = event.sessionId;
                // 加载数据
                loadAddressList.call(this, function () {
                    bindEvents(element);
                    // 添加或者修改完成返回该页面的时候，刷新数据
                    window.addEventListener('pageshow', function () {
                        self.refresh();
                    }, false);
                });
            });
        }
    };

    customElement.prototype.refresh = function () {
        var element = this.element;
        loadAddressList.call(this, function () {
            bindEvents(element);
        });
    };

    return customElement;
});
