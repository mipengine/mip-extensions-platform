/**
 * @file 下拉更改表单提交插件
 * @author zhaobiao.cn
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var me = this.element;
        var options = me.getAttribute('options');
        var values = me.getAttribute('values');
        var id = me.getAttribute('id');
        var name = me.getAttribute('name');
        var html = '<select id="' + id + '" name="' + name + '">';
        if (options && options.split('|').length > 0) {
            for (var i = 0; i < options.split('|').length; i++) {
                html += '<option value="' + values.split('|')[i] + '">' + options.split('|')[i] + '</option>';
            }
        }
        html += '</select>';
        me.innerHTML = html;
        var selects = me.querySelectorAll('select');
        var sel = selects[0];
        sel.addEventListener('change', function () {
            document.getElementsById('myForm').submit();
        });
    };
    return customElement;
});
