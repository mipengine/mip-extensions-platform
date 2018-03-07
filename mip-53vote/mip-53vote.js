/**
 * @file mip-vote 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var tid = element.getAttribute('tid');
        element.addEventListener('click', function () {
            var loginReqbody = {
                'tid': tid,
                'type': 'toupiao'
            };
            $.ajax({
                url: 'https://m.53.com.cn/common/mipwebdo.ashx',
                type: 'POST',
                async: false,
                data: JSON.stringify(loginReqbody),
                error: function () {
                    alert('投票出错');
                },
                success: function (data, status) {
                    if (status = 'success' && data !== '') {
                        alert(data);
                    } else {
                        alert('投票失败');
                    }
                }
            });
        });
    };
    return customElement;
});
