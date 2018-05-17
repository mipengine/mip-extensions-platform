/**
 * @file mip-linkeddb-exit 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var car = require('./jquery-weui.min');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        $(ele).find('.logout').on('click', 'a', function () {
            exits();
        });
        function exits() {
            $.confirm('确认退出吗？', function () {
                $.get('https://mip.linkeddb.com/logout/', function () {
                    window.top.location.href = window.location.pathname;
                });
            });
        }
    };

    return customElement;
});
