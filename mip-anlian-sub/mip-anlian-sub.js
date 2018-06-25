/**
 * @file mip-anlian-sub 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // TODO
        var $element = $(this.element);
        var sub = $element.find('#sub');
        var name = $element.find('#name');
        var contact = $element.find('#contact');
        var message = $element.find('#message');
        var layer = $element.find('.layer');
        sub.click(function () {
            var names = name.val();
            var contacts = contact.val();
            var messages = message.val();
            if (names === '') {
                var msg = '称呼不能为空';
                layerMsg(msg);
                return;
            }
            if (contacts === '') {
                var msg = '联系方式不能为空';
                layerMsg(msg);
                return;
            }
            if (messages === '') {
                var msg = '留言不能为空';
                layerMsg(msg);
                return;
            }
            var url = 'action/addMes.php?username=' + names
                + '&msg=' + messages + '&contact=' + contacts;
            $.getJSON(url, function (a) {
                if (a.status === 1) {
                    layerMsg(a.msg);
                } else {
                    layerMsg(a.error);
                }
                return;
            });
        });
        function layerMsg(msg) {
            layer.addClass('on');
            layer.text(msg);
            setTimeout(function () {
                layer.removeClass('on');
            }, 2000);
            return;
        }
    };
    return customElement;
});
