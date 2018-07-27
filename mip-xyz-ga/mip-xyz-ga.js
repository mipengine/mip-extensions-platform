/**
 * @file mip-xyz-ga 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        this.core();
        this.bindEvent();
    };

    /**
     * GA核心
     */
    customElement.prototype.core = function (){
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-31142439-6', 'auto');
        ga('send', 'pageview');
    };

    /**
     * 自定义事件
     */
    customElement.prototype.bindEvent = function (){
        var _this = this;
        _this.initJSON();
        _this.data.forEach(function(item) {
            var el = document.querySelector(item.el);
            el && el.addEventListener(item.event.type, function() {
                if ('ga' in window) {
                    var code;
                    if(typeof item.depend !== 'undefined') {
                        if(el.classList.contains(item.depend)) {
                            code =  item.event.code[0];
                        }else {
                            code = item.event.code[1];
                        }
                    }else {
                        code = item.event.code;
                    }
                    ga('send', 'event', '用户行为', item.event.name, code);
                }
            });
        });
    };

    /**
     * 注入组件中的 JSON 配置到数据
     */
    customElement.prototype.initJSON = function () {
        var _this = this;
        var scripts = _this.element.querySelectorAll('script[type="application/json"]');
        [].slice.call(scripts).forEach(function (script) {
            _this.data = JSON.parse(script.innerText);
        });
    };

    return customElement;
});
