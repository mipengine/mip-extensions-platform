/**
 * @file mip-hunliji-deleteChanel 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    function delChanel(id, element) {
        $.ajax({
            url: '/baidu/delMsg',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: {'id': +id},
            success: function (result) {
                $(element).parents('li').remove();
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var id = $(element).attr('data-id');
        $(element).on('click', '.chat-message-del', function () {
            delChanel(id, element);
        });
    };

    return customElement;
});