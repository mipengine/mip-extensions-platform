/**
 * @file 120ask折叠组件
 * @author yuwei
 * @time 2017.7.18
 */
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    function build() {
        var mipElement = this.element;
        if (mipElement.isRender) {
            return;
        }
        mipElement.isRender = true;
        var ansArea = mipElement.getAttribute('ansArea') || '';
        var ansAreaHeight = mipElement.getAttribute('ansAreaHeight') || '0';
        var showparam = mipElement.getAttribute('showparam') || [];
        var hiddparam = mipElement.getAttribute('hiddparam') || [];
        var showparamArr = [];
        if (showparam) {
            try {
                showparamArr = new Function('return ' + showparam)();
            } catch (e) {}
        }
        var hiddparamArr = [];
        if (hiddparam) {
            try {
                hiddparamArr = new Function('return ' + hiddparam)();
            } catch (e) {}
        }
        var divHeight = 0;
        if (ansArea) {
            divHeight = $('#' + ansArea).height();
        }
        if (divHeight > ansAreaHeight) {
            $(mipElement).parent().addClass('conHeight');
            if (hiddparamArr) {
                renderCallback(hiddparamArr);
            }
        } else {
            $(mipElement).hide();
        }
        $(mipElement).click(function () {
            $(mipElement).parent().removeClass('conHeight');
            if (showparamArr) {
                renderCallback(showparamArr);
            }
            $(mipElement).hide();
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
