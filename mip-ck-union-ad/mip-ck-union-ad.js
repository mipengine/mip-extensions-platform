/**
 * @file mip-ck-union-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    // 工具方法
    var utils = {
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        isFunction: function (func) {
            return (typeof func).toLowerCase() === 'function';
        }
    };
    // 加载脚本链接
    function loadScript(url, element, callback) {
        var tempElement;
        var tempCallback;
        var script = document.createElement('script');

        if (arguments.length === 2) { // 判断参数长度
            if (utils.isFunction(element)) { // 第二个参数是function
                tempElement = document.getElementsByTagName('head')[0];
                tempCallback = element;
            }
            else { // 非function
                tempElement = element;
            }
        }

        script.type = 'text/javascript';
        script.src = url;

        tempCallback = tempCallback || function () { };

        script.onreadystatechange = tempCallback;
        script.onload = tempCallback;

        tempElement.appendChild(script);
    }

    // 加载脚本字符串
    function loadScriptString(code, element, callback) {
        var tempElement;
        var tempCallback;
        var script = document.createElement('script');

        if (arguments.length === 2) {
            if (utils.isFunction(element)) {
                tempElement = document.body;
                tempCallback = element;
            }
            else {
                tempElement = element;
            }
        }

        tempCallback = tempCallback || function () { };

        script.type = 'text/javascript';

        try {
            script.appendChild(document.createTextNode(code));
        }
        catch (ex) {
            script.text = code;
        }

        tempElement.appendChild(script);
        tempCallback();
    }

    // 主功能方法
    function setHtmlDomain(element) {
        var adId = element.getAttribute('ad-id');
        var adType = element.getAttribute('ad-type');
        var adWidth = element.getAttribute('ad-width');
        var adHeight = element.getAttribute('ad-height');
        var src = element.getAttribute('ad-src');
        var div;
        var script;

        if (!adId) { // 没有广告id直接退出
            return;
        }

        switch (adType) {
            // 搜狗广告、默认也是
            case 'sogou':
            default:
                div = document.createElement('div');
                script = 'var sogou_div = document.getElementById("sogou_wap_'
                    + adId + '");'
                    + 'window.sogou_un = window.sogou_un || [];';

                script += ('window.sogou_un.push(' + '{id: "' + adId + '",ele:sogou_div');
                // 属性追加
                if (adWidth) {
                    script += (',w:' + adWidth);
                }
                if (adHeight) {
                    script += (',h:' + adHeight);
                }

                script += '})';

                div.id = 'sogou_wap_' + adId;

                element.appendChild(div);

                src = src || '//theta.sogoucdn.com/wap/js/aw.js'; // 默认搜狗网盟提供地址

                // 加载脚本和广告外链js
                loadScriptString(script, function () {
                    loadScript(src, element);
                });
                break;
        }

    }

    /**
     * 展示逻辑内容在首屏展示，需要尽快加载
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        setHtmlDomain(element);
    };
    return customElement;
});

