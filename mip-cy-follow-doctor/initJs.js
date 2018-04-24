/**
 * @file 引入百度熊掌号js-sdk～
 * @author 春雨前端开发组
 */
define(function () {
    'use strict';
    var tryCount = 0;
    var scriptId = 'BD_XZH_JS_SDK';
    var BD_XZH_JS_SDK = document.getElementById(scriptId);
    if (BD_XZH_JS_SDK) {
        return BD_XZH_JS_SDK;
    }

    asyncLoadXZHJSSDK();

    // 拼接配置数据，异步加载熊掌号JS-SDK
    function asyncLoadXZHJSSDK() {
        fetch('https://m.chunyuyisheng.com/publicwap/baidu/get_jsapi_info/?url=' + encodeURIComponent(location.href)).then(function (res) {
            return res.json();
        }).then(function (opt) {
            var s = document.createElement('script');
            s.id = scriptId;
            s.type = 'text/javascript';
            s.charset = 'utf-8';
            s.src = 'https://xiongzhang.baidu.com/sdk/c.js?'
            + 'appid=' + opt.appid
            + '&timestamp=' + opt.timestamp
            + '&nonce_str=' + opt.nonce_str
            + '&signature=' + opt.sign
            + '&url=' + opt.url;
            document.body.appendChild(s);
        }).catch(function () {
            // 加载失败后再尝试3次
            tryCount += 1;
            if (tryCount <= 3) {
                setTimeout(function () {
                    asyncLoadXZHJSSDK();
                }, 1000);
            }
            else {
                window.cambrian = {};
            }
        });
    }
});
