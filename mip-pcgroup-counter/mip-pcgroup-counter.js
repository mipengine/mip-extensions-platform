/**
 * @file mip-pcgroup-counter 太平洋网络通用计数器组件
 * @author 谢永双
 * @v1.0.0
 * @2017.12.13
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var commonCounterCode = element.getAttribute('data-channel');
        var commonCounterUuid = element.getAttribute('data-uuid');
        var commonCounterFrom = element.getAttribute('data-from');
        var commonCounterSite = element.getAttribute('data-site');
        var domains = {
            pconline: '5.pconline.com.cn/newcount',
            pclady: '.pclady.com.cn',
            pcauto: '.pcauto.com.cn',
            pcbaby: '.pcbaby.com.cn',
            pchouse: '.pchouse.com.cn'
        };
        element.innerHTML = '';
        !(function () {
            var domain = domains[commonCounterSite];
            var reffer = document.referrer;
            var tagName = 'img';
            var elem = (document.body.insertBefore(document.createElement(tagName), document.body.firstChild));
            elem.style.display = 'none';
            elem.src = location.protocol + '//count' + domain + '/count.php?'
                + (commonCounterUuid ? commonCounterUuid : '')
                + commonCounterCode + '&screen=' + screen.width + '*'
                + screen.height + '&refer=' + encodeURIComponent(reffer)
                + '&anticache=' + new Date().getTime()
                + '&url=' + encodeURIComponent(location.href) + '&from='
                + (commonCounterFrom ? commonCounterFrom : '')
                + '&iframeCode=' + (self === top ? 0 : (top === parent ? 1 : 2));
        })();
    };
    return customElement;
});
