/**
 * @file mip-tiebaobei-det-download 组件
 * @author weiss
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var urlHost = window.location.host;
        var baseUrl = '';
        var h5baseUrl = '';
        var baseEqid = ele.find('.downloadTop').attr('data-eqid');
        if (urlHost === 'm.tiebaobei.com' || (urlHost === 'h5.tiebaobei.com')) {
            baseUrl = 'https://m.tiebaobei.com/';
            h5baseUrl = 'https://h5.tiebaobei.com/';
        }
        else if (urlHost === 'm.test.tiebaobei.com' || (urlHost === 'h5.test.tiebaobei.com')) {
            baseUrl = 'http://m.test.tiebaobei.com/';
            h5baseUrl = 'http://h5.test.tiebaobei.com/';
        }
        else {
            baseUrl = 'http://m.test.tiebaobei.com/';
            h5baseUrl = 'http://h5.test.tiebaobei.com/';
        }
        var getCookie = function (name) {
            var arr = '';
            var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
            return null;
        };
        var setCookie = function (name, value, time) {
            var Days = time;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        };
        // 判断微信浏览器
        var isWeiXin = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) === 'micromessenger') {
                return true;
            }
            return false;
        };
        var FnE25 = function (buttonName, href) {
            if (href) {
                window.location.href = href;
            }
        };
        // 下载逻辑修改1023
        setCookie('popDownAppStorageDetail', true, 1);
        if (navigator.appVersion.indexOf('Android') > -1) {
            // 安卓
            ele.find('.JDownApp').removeAttr('target').attr('href', 'javascript:;');
            if (!isWeiXin()) {
                if (getCookie('popDownAppStorageDetail') === null) {
                    if (navigator.appVersion.indexOf('Android') > -1) {
                        setTimeout(function () {
                            window.location = 'https://bbs.cehome.com/app/appget/tiebaobei_channel_M_release.apk';
                        }, 100);
                        var ifr = document.createElement('iframe');
                        var url = 'tiebaobeiapp://home';
                        if (baseEqid !== null) {
                            url = 'tiebaobeiapp://threadDetail?threadurl=' + h5baseUrl + 'res/hweb/detail.html?eqId=' + baseEqid + '&tid=0';
                        }
                        ifr.src = url;
                        // ifr.src = 'tiebaobeiapp://threadDetail?threadurl=https://m.test.tiebaobei.com/ue/wajueji/doosan_s130w-3_605322.html';
                        ifr.style.display = 'none';
                        document.body.appendChild(ifr);
                        window.setTimeout(function () {
                            document.body.removeChild(ifr);
                        }, 3000);
                    }
                    setCookie('popDownAppStorageDetail', true, 1);
                }
                ele.find('.JDownApp, .app-download-mid').removeAttr('target').attr('href', 'javascript:;');
                ele.find('[data-icon="checkmark"]').removeAttr('target').attr('href', 'javascript:;');
            }
        }
        else {
            ele.find('.JDownApp').attr('href', ele.find('.JDownApp').attr('href') + '?eqid=' + baseEqid);
            if (!isWeiXin()) {
                if (getCookie('popDownAppStorageDetail') === null) {
                    setCookie('popDownAppStorageDetail', true, 1);
                    window.location.href = baseUrl + 'html/downApp.html?eqid=' + baseEqid;
                }
            }
        }
        ele.find('.JDownApp').click(function () {
            if (navigator.appVersion.indexOf('Android') > -1) {
                setTimeout(function () {
                    window.location = 'https://bbs.cehome.com/app/appget/tiebaobei_channel_M_release.apk';
                }, 100);
                var ifr = document.createElement('iframe');
                var url = 'tiebaobeiapp://home';
                if (baseEqid !== null) {
                    url = 'tiebaobeiapp://threadDetail?threadurl=' + h5baseUrl + 'res/hweb/detail.html?eqId=' + baseEqid + '&tid=0';
                }
                ifr.src = url;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                window.setTimeout(function () {
                    document.body.removeChild(ifr);
                }, 3000);
            }
        });
        ele.find('.downloadTop .close').click(function () {
            ele.find('.downloadTop').hide();
           // ele.find('.downloadTop').attr('class', 'downloadTop ani');
        });
    };
    return customElement;
});
