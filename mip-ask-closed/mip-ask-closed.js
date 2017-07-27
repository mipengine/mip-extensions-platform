/**
 * @file 120ask关闭组件
 * @author yuwei
 * @time 2017.7.25
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    function build() {
        var mipElement = this.element;
        var act = mipElement.getAttribute('act') || 'closed';
        var cboption = mipElement.getAttribute('cboption') || [];
        var cboptionArr = [];
        if (cboption) {
            try {
                cboptionArr = new Function('return ' + cboption)();
            } catch (e) {}
        }
        $(mipElement).click(function () {
            if (act === 'closed') {
                if (cboptionArr) {
                    renderCallback(cboptionArr);
                }
                $(mipElement).hide();
            }
        });
    }
    function renderCallback(callbackdata) {
        var index = 0;
        for (index = 0; index < callbackdata.length; index++)
        {
            if (callbackdata[index].type === 'show') {
                $(callbackdata[index].target).show();
            } else if (callbackdata[index].type === 'hide') {
                $(callbackdata[index].target).hide();
            } else if (callbackdata[index].type === 'remove') {
                $(callbackdata[index].target).remove();
            }
        }
    }
    customElement.prototype.build = build;
    return customElement;
});
