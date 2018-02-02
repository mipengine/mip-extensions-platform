/**
 * @file mip-jia-log 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();

    // 页面进来就要加载百度统计,所以用build
    customElement.prototype.build = function () {
        var element = this.element;
        // 封装加载js
        var loadScript = function (url, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        // 加载百度统计
        loadScript('https://rqs.baidu.com/static/js/loader.js?t=' + (new Date().getTime()), function () {
            /* global bdLog */
            bdLog.init(element.getAttribute('pageType'), element.getAttribute('extInfo'), 'qijia');
        });
    };
    return customElement;
});
