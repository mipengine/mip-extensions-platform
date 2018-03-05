/**
 * @file mip-truckcn-hash 组件
 * @author jglxzhl
 */

define(function (require) {
    var customElement = require('customElement').create();
    var MIP = window.MIP || {};
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var type = element.getAttribute('type');
        var tel = MIP.hash.get('tel');
        var name = MIP.hash.get('name');
        var text = MIP.hash.get('text');
        var url = location.protocol + '//' + location.hostname + location.pathname;
        if (type) {
            switch (type) {
                case 'name':
                    if (name) {
                        name = (name.split('*', 1));
                        name = decodeURIComponent(name);
                        name = '<div class="name">' + name + '：</div>';
                    }
                    else if (tel) {
                        name = '';
                    }
					else {
                        name = element.getAttribute('default-name');
                        name = '<div class="name">' + name + '：</div>';
                    }
                    element.innerHTML = name;
                    break;
                case 'tel':
                    if (tel) {
                        tel = (tel.split('*', 1));
                    }
                    else {
                        tel = element.getAttribute('default-tel');
                    }
                    element.innerHTML = '<div class="tel"><a href=tel:' + tel + '>' + tel + '</a></div>';
                    break;
                case 'fixed-top':
                    if (tel) {
                        tel = (tel.split('*', 1));
                    }
                    else {
                        tel = element.getAttribute('default-tel');
                    }
                    element.innerHTML = '<div class="fixed">咨询热线：<a href=tel:' + tel + '>' + tel + '</a></div>';
                    break;
                case 'fixed-bottom':
                    if (tel) {
                        tel = (tel.split('*', 1));
                    }
                    else {
                        tel = element.getAttribute('default-tel');
                    }
                    var sms = '<a class="sms" href="sms:' + tel + '?body=咨询车辆,网址:' + url + ',请回电!"> 发送短信</a>';
                    tel = '<a class="tel" href=tel:' + tel + '>拨打电话</a>';
                    element.innerHTML = '<div class="fixed">' + tel + sms + '</div>';
                    break;
                case 'text':
                    if (text) {
                        text = (text.split('*', 1));
                        text = decodeURIComponent(text);
                    }
                    else {
                        text = element.getAttribute('default-text');
                    }
                    element.innerHTML = '<div class="text">' + text + '</div>';
                    break;
            }
        }
    };
    return customElement;
});
