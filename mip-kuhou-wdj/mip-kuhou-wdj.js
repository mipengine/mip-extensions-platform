/**
 * @file mip-kuhou-wdj 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url');
        var typeid = element.getAttribute('typeid');
        var cpid = element.getAttribute('cpid');
        kuhou();
        function kuhou() {
            if ($('#' + cpid).length > 0) {
                fetch(url)
                .then(function (response) {
                    var str = response.text();
                    str.then(function (result) {
                        result = parseInt(result, 10);
                        if (result === 1) {
                            $('.' + typeid).replaceWith('<a class="downw" ><span></span>暂无下载</a>');
                        }
                    });
                });
            }
        }
    };
    return customElement;
});
