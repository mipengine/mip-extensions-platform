/**
 * @file mip-xiaomi-router 组件
 * @author diydyq@126.com
 */

define(function (require) {

    var util = require('util');
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = this.element;

        var packageName = element.getAttribute('packageName');
        var appName = element.getAttribute('appName');
        var page = element.getAttribute('page');
        var confirm = !!element.getAttribute('confirm');
        var appRouter = !!element.getAttribute('appRouter');
        // 参数名称
        var paramsName = element.getAttribute('params');
        // 获取参数
        var params = this.getParams(paramsName);

        console.info('Parse element attributes: ', packageName, appName, page, confirm, appRouter, params);

        // 事件绑定
        this.addEventAction('evtAppRouter', function (event, str) {
            var paramsEvent = self.getParams(str);
            var paramsFinal = util.fn.extend({}, params, paramsEvent);
            self.appRouter(packageName, page, paramsFinal, confirm);
        });
        this.addEventAction('evtInstallShortcut', function (event, str) {
            self.installShortcut(packageName, appName);
        });
        this.addEventAction('evtCallNative', function (event, str) {
            var paramsEvent = self.getParams(str);
            var paramsFinal = util.fn.extend({}, params, paramsEvent);
            self.callNative(packageName, page, paramsFinal);
        });

        // 启动服务
        if (appRouter) {
            this.appRouter(packageName, page, params, confirm);
        }
    };

    customElement.prototype.getParams = function (name) {
        var paramsNameType = typeof window[name];
        if (paramsNameType === 'function') {
            return window[name](this.element);
        } else if (paramsNameType === 'object') {
            return window[name];
        } else {
            return name;
        }
    };

    customElement.prototype.appRouter = function (packageName, page, params, confirm) {
        params = params || {};

        if (confirm) {
            params.__PROMPT__ = 1;
            params.__NAME__ = confirm;
        }

        return this.callNative(packageName, page, params);
    };

    customElement.prototype.installShortcut = function (packageName, appName) {
        return this.callNative('command', '', {
            'type': 'shortcut',
            'package': packageName,
            'name': appName
        });
    };

    customElement.prototype.callNative = function (packageName, page, params) {
        var src = location.protocol + '//thefatherofsalmon.com';
        var query = '';
        if (packageName) {
            src = src + '?i=' + packageName;
        }
        if (page) {
            src = src + '&p=' + page;
        }

        function isEmptyObject(obj) {
            if (!obj) {
                return !0;
            }
            var t = void 0;
            for (t in obj) {
                return !1;
            }
            return !0;
        }

        if (isEmptyObject(params)) {
            var url = window.location.search;
            var index = url.indexOf('?');
            if (index > -1) {
                query = url.substr(1);
            }
        } else {
            var items = Object.keys(params).map(function (key) {
                return key + '=' + encodeURIComponent(params[key]);
            });
            query = items.join('&');
        }

        if (query !== '') {
            src = src + '&a=' + encodeURIComponent(query);
        }

        fetchJsonp(src)
            .then(function (response) {
                return response.text();
            }).then(function (data) {
                console.info('parsed json', data);
            }).catch(function (err) {
                console.info('parsing failed', err);
            });
    };

    return customElement;
});
