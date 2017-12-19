/**
 * @file mip-app27-platform.js
 * @author kesan
 */

define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
    /**
     * 获取手机系统及版本号
     * return object: os 获取机型; osv 获取机型版本
     */
    var brower = (function () {
        // 系统
        var isiPhone = new RegExp('iPhone|iPad|iPod|iPh|iPd|iOS', 'i');
        var isAndroid = new RegExp('Android|Linux', 'i');
        // 版本号
        var iosVer = new RegExp('^.*OS\\s(\\d.*?)\\s.*$', 'i');
        var androidVer = new RegExp('^.*Android\\s(.*?);.*$', 'i');

        var userAgent = window.navigator.userAgent;

        var brower = {
            os: function () {
                if (platform.isIos()) {
                    return 'ios';
                }

                return 'android';
            },
            osv: function () {
                if (isAndroid.test(userAgent)) {
                    return userAgent.replace(androidVer, '$1');
                }
                else if (isiPhone.test(userAgent)) {
                    return userAgent.replace(iosVer, '$1').replace(/_/, '.');
                }

                return '';
            }
        };

        return brower;
    })();

    function firstInviewCallback() {
        var element = this.element;
        var pf = $(element).attr('platform');
        if (brower.os() !== 'ios') {
            if (pf === 'ios') {
                element.remove();
            }
        }
        else {
            if (pf === 'android') {
                element.remove();
            }
        }
    }
    customElem.prototype.firstInviewCallback = firstInviewCallback;
    return customElem;
});
