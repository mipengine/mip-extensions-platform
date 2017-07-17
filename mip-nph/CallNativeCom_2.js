/**
 * @file 呼起自动扫描呼起事件，并处理主动呼起事件
 * @author tingling
 */
define(function (require) {

    // var aUtils = require('./aUtils');
    var util = require('util');
    var aUtils = util.platform;
    var aUrlDefault = '';


    var redirectToNative = {
        openTimer: null,
        getFullNumber: function (pos) {
            !!!pos && (pos = 1);
            var aLen = pos.toString().length;

            if (aLen < 3) {
                pos = ('000' + pos).substr(-3, 3);
            }
            return pos;
        },
        init: function (aConfig) {
            var self = this;
            var isWechatApp = aUtils.isWechatApp();
            var isQQ = !isWechatApp && aUtils.isQQ();
            var isWeiboApp = aUtils.isWeiboApp();
            var config = aConfig || {};
            self.openByWeixin = config.openByWeixin || aUrlDefault;
            isQQ = !!(isQQ && self.openByWeixin) || aUrlDefault;
            self.isNotScheme = !!config.isNotScheme;

            self.targetEl = config.targetEl || null;
            self._position = self.getFullNumber(config.position);
            self.position = (!!config.calluptype && (config.calluptype || '') + self._position) || '001';
            // 触发场景还原事件

            // pc下什么都不处理,pc访问下可能href可以链接去其他地址
            if (!aUtils.isAndroid() && !aUtils.isIos()) {
                return;
            }

            if (aUtils.isIos()) {
                self.installUrl = config.iosInstallUrl || aUrlDefault;
                self.nativeUrl = config.iosNativeUrl || aUrlDefault;
                var isDownloadUrl = self.installUrl.match(/(\S*)(d\.php\?k\=)(\S*)/);
                self.openTime = config.iosOpenTime || 800;
                if (isWeiboApp && self.installUrl && isDownloadUrl) {
                    self.installUrl += '&sinainternalbrowser=external';
                }
            }
            else {
                self.installUrl = config.androidInstallUrl || aUrlDefault;
                self.nativeUrl = config.androidNativeUrl || aUrlDefault;
                self.openTime = config.androidOpenTime || (isWeiboApp ? 1500 : 3000);
            }

            // IOS9通用链接跳转
            self.aGoIOS9Native(config);
        },

        aHackChrome: function () {
            var self = this;
            // var startTime = Date.now();

            if (self.nativeUrl === aUrlDefault || !self.nativeUrl) {
                return aUrlDefault;
            }

            var paramUrlarr = self.nativeUrl.split('://');
            var scheme = paramUrlarr[0];
            var schemeUrl = paramUrlarr[1];
            return 'intent://' + schemeUrl + '#Intent;scheme=' + scheme + ';end';
        },

        aGoIOS9Native: function (config) {
            var self = this;
            var isWechatApp = aUtils.isWechatApp();
            var isIOS9 = aUtils.isIos() && parseInt(aUtils.getOsVersion(), 10) >= 9;
            var isQQ = !isWechatApp && aUtils.isQQ();
            var isWeiboApp = aUtils.isWeiboApp();
            // var isUc = aUtils.isUc();

            // 为IOS9，且不为微博、微信、qq、通用链接不为空，则直接跳转
            if (isIOS9 && config.ios9Url && !isWeiboApp && !isWechatApp && !isQQ) {
                top.location.href = config.ios9Url;
                return;
            }

            if (isIOS9 && config.ios9Weixin && (isQQ || isWechatApp)) {
                top.location.href = config.ios9Weixin;
                return;
            }

            // qq && 微信 && android，直接跳转应用宝
            if ((isQQ || isWechatApp) && aUtils.isAndroid() && !!self.openByWeixin && !self.isNotScheme) {
                self.openByWeixin += self.openByWeixin.indexOf('?') < 0 ? '?' : '';

                var aAppBaoParams = self.openByWeixin.indexOf('app.qq.com') > 0
                    ? ('&android_schema=' + encodeURIComponent(self.nativeUrl)) : '';
                top.location.href = self.openByWeixin + aAppBaoParams;
                return;
            }

            // 若不为通用链接，则跳转正常呼起
            self.aGotoNative();

        },

        aGotoNative: function () {
            var self = this;
            var isIOS9 = aUtils.isIos() && parseInt(aUtils.getOsVersion(), 10) >= 9;
            var isWeiboApp = aUtils.isWeiboApp();
            var isUc = aUtils.isUc();
            // var isAliPay = aUtils.isAliPay();
            var tag = 'iframe';

            var startTime = Date.now();
            var doc = document;
            var body = doc.body;
            var newNode = doc.createElement(tag);
            newNode.id = 'J_redirectNativeFrame';

            if (isIOS9 && !!self.installUrl && !self.isNotScheme && !isWeiboApp && !isUc) {
                // 若为IOS9，下载地址不为空，且需要呼起，直接跳转下载地址
                self.aGotoDownload(startTime);
                return;
            }
            else if (self.nativeUrl) {
                // 呼起链接不为空，则如果是IOS9&&微博则直接使用scheme呼起，否则使用iframe调用scheme呼起
                if ((isIOS9 && isWeiboApp) || self.isNotScheme) {
                    top.location.href = self.nativeUrl;
                }
                else {
                    newNode.style.display = 'none';
                    newNode.src = self.nativeUrl;
                    if (!body) {
                        setTimeout(function () {
                            body.appendChild(newNode);
                        }, 0);
                    }
                    else {
                        body.appendChild(newNode);
                    }
                }
            }

            self.aCheckWBDownload(newNode);
        },

        aCheckWBDownload: function (newNode) {
            var self = this;
            var startTime = Date.now();
            var isWBValid = 0;

            // 非微博或不符合新版微博下载进度的情况
            if (!isWBValid) {
                self.openTimer && clearTimeout(self.openTimer);
                self.openTimer = setTimeout(function () {
                    try {
                        newNode && document.body.removeChild(newNode);
                    }
                    catch (e) {
                        // console.log(e.message);
                    }
                    self.aGotoDownload(startTime);

                    /**
                     * 测试时间设置小于800ms时，在android下的UC浏览器会打开native app时并下载apk，
                     * 测试android+UC下打开native的时间最好大于800ms;
                     */
                }, self.openTime);
            }

            var visibilitychange = function () {
                var tag = document.hidden || document.webkitHidden;
                tag && clearTimeout(self.openTimer);
            };

            document.addEventListener('visibilitychange', visibilitychange, false);
            document.addEventListener('webkitvisibilitychange', visibilitychange, false);
            window.addEventListener('pagehide', function () {
                clearTimeout(self.openTimer);
            }, false);
        },
        aGotoDownload: function (startTime, newDownloadUrl) {
            var self = this;
            var endTime = Date.now();
            var isAndroid = aUtils.isAndroid() && (endTime - startTime < self.openTime + 500);
            var isIOS = aUtils.isIos();


            if ((isAndroid || isIOS) && !!self.installUrl) {

                top.location.href = newDownloadUrl || self.installUrl;
                return;
            }

        }
    };

    var callAppEvent = {
        openApp: function (config) {
            var aConfig = config || {};
            redirectToNative.init(aConfig);
        }
    };

    return callAppEvent;
});
