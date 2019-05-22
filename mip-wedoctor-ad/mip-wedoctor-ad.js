/**
 * @file mip-wedoctor-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var type = element.getAttribute('wd-ad-type');
        var iframe = document.createElement('mip-iframe');
        var uri = window.location.href.split('#')[0].split('?')[0];
        var width = window.innerWidth;
        var height = window.innerHeight;
        var fosi = 20 * (width / 375);
        var adtypeWidth = {
            firstadtype: {
                height: 2.5
            },
            secondadtype: {
                height: 3
            },
            thirdadtype: {
                height: 2.5
            }
        };
        if (type === 'secondadtype') {
            // XMLHttpRequest对象用于在后台与服务器交换数据
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://houtai.xindingwealth.com/api/throwin/getPictureNum', true);
            xhr.onreadystatechange = function () {
                // readyState == 4说明请求已完成
                if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
                    // 从服务器获得数据
                    append(JSON.parse(xhr.responseText).data.num);
                }
            };
            xhr.send();
        }
        else
        {
            append(1);
        };
        function append(num) {
            num = num !== null ? num : 1;
            iframe.setAttribute('style', 'display: block;');
            iframe.setAttribute('width', width);
            iframe.setAttribute('height', adtypeWidth[type] && adtypeWidth[type].height * fosi * num);
            // iframe.setAttribute('src', 'http://192.168.128.223:9999/index.html?ad-type=' + type + '&uri=' + uri + '&width=' + width + '&height=' + height + '');
            iframe.setAttribute('src', 'https://houtai.xindingwealth.com/ad-index.html?ad-type=' + type + '&uri=' + uri + '&width=' + width + '&height=' + height + '');
            element.append(iframe);
        }
    };

    return customElement;
});
