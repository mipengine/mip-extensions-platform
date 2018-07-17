/**
 * @file mip 统计方法
 * @author tfguys<tfguys@alibaba-inc.com>
 *
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var PPWebUid = require('./pwid');

    var config = {};

    var userId = PPWebUid.getPWID();
    var trackConfig = {
        appid: '277c899c7008',
        'app_key': '',
        lt: '',
        sid: userId,
        uuid: userId,
        debug: false
    };
    var proxyConfig = {
        sid: userId,
        'uc_param_str': 'frvecpeimintnidnut'
    };
    var chKey = 'param-f';
    var ltAccess = 'ppweb-access';
    var ltClick = 'ppweb-click';
    var logUrl = '';
    var referrer = document.referrer;

    var queryFormat = function (url, obj) {
        typeof url !== 'string' && (url = '');

        if (typeof obj === 'object') {
            var hash = url.indexOf('#') < 0 ? '' : url.substring(url.indexOf('#'));
            var host = url.substring(0, (url.indexOf('?') < 0 ? url.length : url.indexOf('?')));
            var queryString = url.substr(host.length + 1, url.length - host.length - hash.length - 1);

            if (hash) {
                host = host.substring(0, (host.indexOf('#') < 0 ? host.length : host.indexOf('#')));
            }

            var arrs = queryString
                .split('&')
                .filter(function (v) {
                    return v !== '';
                })
                .map(function (v) {
                    return v.split('=');
                });

            for (var key in obj) {
                if (obj.hasOwnProperty(key) && checkValue(obj[key])) {
                    var flag = false;
                    for (var i = 0; i < arrs.length; i++) {
                        if (arrs[i][0] === key) {
                            arrs[i][1] = encodeURIComponent(obj[key]);
                            flag = true;
                        }
                    }
                    if (!flag) {
                        arrs.push([key, encodeURIComponent(obj[key])]);
                    }
                }
            }

            if (arrs.length > 0) {
                queryString = '?' + arrs.map(function (v) {
                    return v.join('=');
                }).join('&');
            }

            return host + queryString + hash;
        } else {
            return url;
        }

        function checkValue(val) {
            if (val !== null && val !== undefined && val !== '') {
                return true;
            }
            return false;
        }
    };

    var parsedataMap = function (data) {
        var obj = {};
        for (var key in data) {
            obj[key] = data[key];
        }
        delete obj['appIcon'];
        return obj;
    };

    var chGet = function ($dom) {
        return $dom.attr(chKey);
    };

    var chGetBy = function ($dom) {
        return $dom.closest('.log-param-f').attr(chKey);
    };

    /**
     * 使用img的方式发送日志
     *
     * @param {string} url src链接
     * @return {undefined}
     */
    var log = function (url) {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(url, '');
        } else {
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

    var getLogUrl = function ($dom, selector, path) {
        var type = '';
        var url = '';
        var dataset = $dom.get(0).dataset;
        var dataObj = parsedataMap(dataset);
        var ch = '';
        var finalyLogUrl = logUrl;
        if (path) {
            finalyLogUrl = finalyLogUrl + path;
        } else {
            finalyLogUrl = finalyLogUrl + config.path;
        }
        if (selector.match(/download/)) {
            type = 'download';
            trackConfig.lt = ltClick;
            ch = chGetBy($dom);
        } else if (selector.match(/click/)) {
            type = 'click';
            trackConfig.lt = ltClick;
            ch = chGetBy($dom);
        } else if (selector.match(/pageview/)) {
            type = 'pageview';
            trackConfig.lt = ltAccess;
            ch = chGet($dom);
        }
        var extendObj = {ch: ch, ppz: config.ppz};
        if (config.host.match(/track/)) {
            extendObj = $.extend(dataObj, extendObj, trackConfig, {type: type, referrer: referrer});
        } else {
            extendObj = $.extend(dataObj, extendObj, proxyConfig);
        }
        url = queryFormat(finalyLogUrl, extendObj);
        return url;
    };

    var initEvent = function () {
        var setting = config.setting;
        if (setting.click && setting.click.selector) {
            $(setting.click.selector).click(function () {
                var url = getLogUrl($(this), setting.click.selector, setting.click.path);
                log(url);
                var href = $(this).attr('href') || '';
                if (href) {
                    window.top.location.href = href;
                }
                return false;
            });
        }
        if (setting.download && setting.download.selector) {
            $(setting.download.selector).click(function () {
                var url = getLogUrl($(this), setting.download.selector, setting.download.path);
                log(url);
                window.top.location.href = $(this).attr('href');
                return false;
            });
        }
        if (setting.pageview && setting.pageview.selector) {
            log(getLogUrl($(setting.pageview.selector), setting.pageview.selector, setting.pageview.path));
        }
    };

    /**
     * 构造元素，只会运行一次，初始化日志配置及发送日志功能
     *
     * @return {undefined}
     */
    customElement.prototype.build = function () {
        try {
            var script = this.element.querySelector('script[type="application/json"]');
            config = JSON.parse(script.textContent.toString());
        } catch (e) {
            console.warn('json is illegal');
            console.warn(e);
            return false;
        }

        if (!(config.host && config.setting)) {
            console.warn('ensure logUrl and setting');
            return false;
        }
        logUrl = config.host;
        initEvent();
    };



    return customElement;
});