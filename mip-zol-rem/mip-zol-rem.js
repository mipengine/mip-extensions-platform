/**
 * @file mip-zol-rem 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var cssLoader = require('dom/css-loader');

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var rootElement = document.documentElement;
        var remStyle = document.createElement('style');
        var defaultDesignWidth = 750;
        var defaultMaxWidth = 540;
        var defaultFontSize = parseInt(window.getComputedStyle(rootElement)['font-size'], 10);
        var designWidth = parseInt(element.getAttribute('design-width'), 10) || defaultDesignWidth;
        var maxWidth = parseInt(element.getAttribute('max-width'), 10) || defaultMaxWidth;
        var percentValue = element.getAttribute('percent');
        var isPercent = (percentValue && percentValue === 'true') ? true : false;

        function refreshRem() {
            var width = rootElement.getBoundingClientRect().width;
            width > maxWidth && (width = maxWidth);
            var rem = width * 100 / designWidth;
            remStyle.innerHTML = 'html{font-size:'
                               + rem + 'px;-webkit-text-size-adjust: 100%;}body{font-size:'
                               + defaultFontSize + 'px!important}';
        }

        var headElement = rootElement.firstElementChild;
        if (headElement) {
            var targetElement = headElement.getElementsByTagName('style')[0];
            headElement.insertBefore(remStyle, targetElement);
            if (isPercent) {
                var percentCssText = '';
                for (var i = 1; i <= 100; i++) {
                    percentCssText += ('.percent-' + i + '{width: ' + i + '%;}');
                }
                cssLoader.insertStyleElement(document, headElement, percentCssText, 'mip-zol-percent');
            }
        }

        // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
        refreshRem();

        var timer = null;
        // 处理resize的情况
        window.addEventListener('resize', function () {
            clearTimeout(timer), timer = setTimeout(refreshRem, 100);
        }, false);

        // 处理bfcache的情况,UC等浏览器下存在
        window.addEventListener('pageshow', function (e) {
            e.persisted && (clearTimeout(timer), timer = setTimeout(refreshRem, 100));
        }, false);

    };

    return customElement;
});
