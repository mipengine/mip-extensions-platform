/**
 * @file mip-yelang-mip 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        (function (win) {
            var doc = win.document;
            var docEl = doc.documentElement;
            var tid;

            function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                if (width > 640) {
                    width = 640;
                }

                var rem = width / 15;
                docEl.style.fontSize = rem + 'px';
            }
            win.addEventListener('resize', function () {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }, false);
            win.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }

            }, false);
            refreshRem();
        })(window);
    };
    return customElement;
});
