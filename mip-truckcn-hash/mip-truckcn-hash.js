/**
 * @file mip-truckcn-hash 组件
 * @author jglxzhl
 */

define(function (require) {
    var customElement = require('customElement').create();
    var MIP = window.MIP || {};
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var style = element.getAttribute('style');
        if (style) {
            switch (style) {
                case 'tel':
                    var tel = MIP.hash.get('tel');
                    if (tel) {
                        tel = (tel.split('*', 1));
                    }
                    else {
                        tel = element.getAttribute('default-tel');
                    }
                    element.innerHTML = '<a href=tel:' + tel + '>' + tel + '</a>';
                    break;
                case 'text':
                    var text = MIP.hash.get('text');
                    if (text) {
                        text = (text.split('*', 1));
                    }
                    else {
                        text = element.getAttribute('default-text');
                    }
                    element.innerHTML = text;
                    break;
            }
        }
    };
    return customElement;
});
