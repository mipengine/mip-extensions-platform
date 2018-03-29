/**
 * @file mip-zol-input ç»„ä»¶
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 因为需要配合mip-bind来使用
     * 业务里边有个地方需要输入发票title, 但是发票信息是跟着订单一起提交，所以需要提前输入
     * 并不能把所有字段都放进mip-form里边
     * 需要build的时候就把输入框填入，要不然没法获取mip-data的一些数据
     */
    customElement.prototype.build = function () {

        var self = this;

        var element = self.element;
        var type = element.getAttribute('type');
        var id = element.getAttribute('data-id') || '';
        var name = element.getAttribute('data-name') || '';
        var value = element.getAttribute('value') || '';
        var placeholder = element.getAttribute('placeholder') || '';
        var on = element.getAttribute('on') || '';

        var inputElement = '';
        if (type === 'input') {
            inputElement = [
                '<input id="' + id + '" type="text" name="' + name + '" on="' + on + '" ',
                'value="' + value + '" placeholder="' + placeholder + '">'
            ].join('');
        }
        else if (type === 'textarea') {
            inputElement = [
                '<textarea id="' + id + '" name="' + name + '" on="' + on + '" ',
                'placeholder="' + placeholder + '">' + value + '</textarea>'
            ].join('');
        }
        element.innerHTML = inputElement;

        // äº‹ä»¶
        self.addEventAction('blur', function () {
            var childNode = element.firstChild;
            if (childNode.nodeType === 1) {
                if (childNode.tagName === 'INPUT' || childNode.tagName === 'TEXTAREA') {
                    childNode.blur();
                }
            }
        });
    };

    return customElement;

});
