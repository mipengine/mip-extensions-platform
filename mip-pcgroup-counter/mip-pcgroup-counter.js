/**
 * @file mip-pcgroup-counter 太平洋网络通用计数器组件
 * @author 谢永双
 * @v1.0.1
 * @2017.12.13
 * @2018.02.07 增加点击事件统计功能，增加geeknev.com计数器
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
            pchouse: '.pchouse.com.cn',
            greeknev: '.greeknev.com'
        };
        element.innerHTML = '';

        function commonCountDo() {
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
        }

        commonCountDo(); // 默认统计页面

        // 增加样式绑定点击统计功能，可以统计页面，也可以统计点击事件。
        if (document.querySelectorAll('.pcgroup-click-count').length > 0) {
            var btn = document.querySelectorAll('.pcgroup-click-count');
            btn.forEach(function (obj, index) {
                obj.addEventListener('click', function () {
                    var t = this;
                    if (!t.getAttribute('data-channel')) {
                        return;
                    }

                    commonCounterCode = t.getAttribute('data-channel');
                    commonCounterSite = t.getAttribute('data-site') ? t.getAttribute('data-site') : commonCounterSite;
                    commonCounterFrom = t.getAttribute('data-from') ? t.getAttribute('data-from') : commonCounterFrom;
                    commonCounterUuid = t.getAttribute('data-uuid') ? t.getAttribute('data-uuid') : commonCounterUuid;
                    // 点击统计
                    commonCountDo();
                });
            });
        }

    };
    return customElement;
});
