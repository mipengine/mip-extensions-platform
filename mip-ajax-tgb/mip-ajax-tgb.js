/**
 * @file mip-ajax-tgb 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('url') || ' ';
        var funId = element.getAttribute('funId') || '';
        var asyncType = element.getAttribute('asyncType') || true;
        var codeDataDiv = document.getElementById(funId);
        asyncfun(url, codeDataDiv, asyncType);
    };
    function asyncfun(url, codeDataDiv, asyncType) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (json) {
                codeDataDiv.value = JSON.stringify(json);
            },
            timeout: 30000,
            async: asyncType,
            // 超时时间设置，单位毫秒
            complete: function (XMLHttpRequest, status) {
                // 请求完成后最终执行参数
                if (status === 'timeout') {
                    // 超时,status还有success,error等值的情况
                    alert('超时');
                }
            }
        });
    }
    return customElement;
});