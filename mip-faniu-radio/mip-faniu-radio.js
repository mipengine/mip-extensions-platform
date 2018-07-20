/**
 * @file mip-faniu-radio 组件
 * @author
 */

define(function (require) {
    'use strict';
    var util = require('util');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var me = this.element;
        var name = me.getAttribute('name');
        var value = me.getAttribute('value');
        var validatetype = me.getAttribute('validatetype') || '';
        var validatereg = me.getAttribute('validatereg') || '';
        var validatetarget = me.getAttribute('validatetarget') || '';
        var url = me.getAttribute('url');
        var html = '';

        fetch(url).then(function (res) {
            return res.text();
        }).then(function (res) {
            res = JSON.parse(res);
            html += '<input  type="hidden" name="' + name + '" value="' + value + '"'
                + (validatetype ? ' validatetype="' + validatetype + '"' : '')
                + (validatereg ? ' validatereg="' + validatereg + '"' : '')
                + (validatetarget ? ' validatetarget="' + validatetarget + '"' : '')
                + '/>';
            for (var i in res) {
                html += '<label' + (res[i]['id'] === value ? ' class="mip-faniu-radio-check"' : '') + '>'
                    + '<input value="' + res[i]['id'] + '"'
                    + (res[i]['id'] === value ? ' checked' : '')
                    + ' type="radio" />'
                    + '<mip-img src="' + res[i]['icon'] + '"></mip-img>'
                    + '<mip-img src="' + res[i]['icon_on'] + '"></mip-img>'
                    + '<span>' + res[i]['name'] + '</span>'
                    + '</label>';
            }
            me.innerHTML = html;
            util.event.delegate(me, 'label', 'click', function () {
                var es = me.querySelectorAll('label');
                me.querySelector('[name="' + name + '"]').value = this.querySelector('input').value;
                for (var i = 0; i < es.length; i++) {
                    es[i].classList.remove('mip-faniu-radio-check');
                    if (!this.isSameNode(es[i])) {
                        es[i].querySelector('input').checked = false;
                    }
                }
                this.classList.add('mip-faniu-radio-check');
            });
        });
    };

    return customElement;
});
