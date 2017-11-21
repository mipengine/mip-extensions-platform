/**
* 下载站mip改造
* @file 下载链接加密
* @author 576604471@qq.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // rem布局
        var size = $('mip-yesky-rem').attr('data-rem');
        (function (designWidth, maxWidth) {
            var doc = document;
            var win = window;
            var docEl = doc.documentElement;
            var tid;
            var rootItem;
            var rootStyle;
            function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                if (!maxWidth) {
                    maxWidth = 540;
                }
                if (width > maxWidth) {
                    width = maxWidth;
                }
                var rem = width * 100 / designWidth;
                // 兼容UC开始
                rootStyle = 'html{font-size:' + rem + 'px !important}';
                rootItem = document.getElementById('rootsize') || document.createElement('style');
                if (!document.getElementById('rootsize')) {
                    document.getElementsByTagName('head')[0].appendChild(rootItem);
                    rootItem.id = 'rootsize';
                }
                if (rootItem.styleSheet) {
                    rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle);
                } else {
                    try {
                        rootItem.innerHTML = rootStyle;
                    } catch (f) {
                        rootItem.innerText = rootStyle;
                    }
                }
                // 兼容UC结束
                docEl.style.fontSize = rem + 'px';
            }
            refreshRem();
            win.addEventListener('resize', function () {
                clearTimeout(tid); // 防止执行两次
                tid = setTimeout(refreshRem, 300);
            }, false);

            win.addEventListener('pageshow', function (e) {
                if (e.persisted) { // 浏览器后退的时候重新计算
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }
            }, false);

            if (doc.readyState === 'complete') {
                doc.body.style.fontSize = '16px';
            } else {
                doc.addEventListener('DOMContentLoaded', function (e) {
                    doc.body.style.fontSize = '16px';
                }, false);
            }
        })(size, 1024);

    };
    return customElem;
});
