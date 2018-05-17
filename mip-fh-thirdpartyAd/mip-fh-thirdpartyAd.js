/**
 * @file mip-fh-thirdpartyAd 组件
 * @author sunxiaopeng
 * @version 1.1.0
 * 组件中引入第三方联盟广告代码，代码由搜狗网盟提供 例如https://theta.sogoucdn.com/wap/js/wp.js
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    // 增加script外联 引入第三方联盟代码 动态加载js文件
    customElement.prototype.createdCallback = function () {
        var el = this.element;
        var adtype = el.getAttribute('type');
        var token = el.getAttribute('token');
        var adId = el.getAttribute('ad-id');
        var adSrc = el.getAttribute('src');
        var adWidth = el.getAttribute('ad-width');
        var adHeight = el.getAttribute('ad-height');
        var adFloat = el.getAttribute('ad-float');
        var adClose = el.getAttribute('ad-close');

        var $element = $(el);
        switch (adtype) {
            case 'sogou': {
                var script1 = $('<script>');
                var script2 = $('<script>');
                script1.attr('type', 'text/javascript');
                var html = '';
                if (!!adId || !!token) {
                    html += 'var sogou_ad_id=' + (adId || token) + ';';
                }
                if (!!adWidth) {
                    html += 'var sogou_ad_width=' + adWidth + ';';
                }
                if (!!adHeight) {
                    html += 'var sogou_ad_height=' + adHeight + ';';
                }
                if (!!adFloat) {
                    html += 'var sogou_ad_float=' + adFloat + ';';
                }
                if (!!adClose) {
                    html += 'var sogou_ad_close=' + adClose + ';';
                }

                script1.html(html);
                script1.append('console.log("搜狗网盟广告!");');

                script2.attr('src', adSrc); // 组件中引入第三方联盟广告代码，代码由搜狗网盟提供 例如https://theta.sogoucdn.com/wap/js/wp.js
                $element.append(script1);
                $element.append(script2);
                break;
            }
        }
    };
    return customElement;
});
