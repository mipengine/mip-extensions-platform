/**
 * @file mip-stats-commontj 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        // 获取config
        try {
            var script = this.element.querySelector('script[type="application/json"]');
            var cfg = this.cfg = JSON.parse(script.textContent.toString());
        }
        catch (e) {
            console.warn('data is error'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
            return;
        }

        if (!cfg.sendparams || !cfg.hosts) {
            return;
        }
        var str = '';
        for (var prop in cfg.sendparams) {
            if (cfg.sendparams.hasOwnProperty(prop)) {
                str += prop + '=' + encodeURIComponent(cfg.sendparams[prop]) + '&';
            }
        }
        if (str) {
            if (document.referrer) {
                str += 'r=' + encodeURIComponent(document.referrer) + '&';
            }
            if (document.cookie) {
                str += 'ck=' + encodeURIComponent(document.cookie) + '&';
            }
            str = str.substring(0, str.length - 1); // 去掉末尾的&

            // 全局代理事件

            if (str) {
                log.imgSendLog(cfg.hosts + str);
            }

        }
    };

    var log = {

        /**
         * 使用img的方式发送日志
         *
         * @param {string} url src链接
         * @return {undefined}
         */
        imgSendLog: function (url) {
            var key = 'IMAGE' + (new Date()).getTime();
            var img = window[key] = new Image();
            img.onload = function () {
                // 防止多次触发onload;
                img.onload = img.onerror = img.onabort = null;
                // 清空引用,避免内存泄漏
                window[key] = null;
                img = null;
            };
            img.src = url;
        }
    };

    return customElement;
});
