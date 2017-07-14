/**
 * @file mip-nph 组件
 * @author fengzihao
 */

define(function (require) {

    var customElement = require('customElement').create();
    var callAppEvent = require('./OpenApp');

    customElement.prototype.build = function () {
        // 获取config
        try {
            var script = this.element.querySelector('script[type="application/json"]');
            var cfg = JSON.parse(script.textContent.toString().replace(/[\s\b\t]/g, ''));
        }
        catch (e) {
            return;
        }

        if (!cfg) {
            return;
        }

        cfg.forEach(function (el, index) {
            var eles = document.querySelectorAll(el.selector);

            eles.forEach(function (dom) {
                dom.addEventListener('click', function () {
                    callAppEvent.openApp(el.config);
                }, false);
            });
        });
    };

    return customElement;
});
