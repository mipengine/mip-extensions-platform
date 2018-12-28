/**
 * @file mip-pbpix 组件
 * @author cuipengyu
 * @content 记录信息：来源，打开网页时间,离开网页时间，页面总高度，滚动长度，屏幕长宽，操作系统，浏览器型号
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.pixInfo = {
        event: '',
        cookieId: getCookiePbpixId(),
        loadId: uuid(),
        openTime: new Date().getTime(),
        closeTime: null,
        referrer: '',
        documentSize: {
            width: 0,
            height: 0
        },
        screenSize: {
            width: 0,
            height: 0
        },
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0,
        os: '',
        browser: ''
    };

    /**
     * build的时候回调，只会执行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;

        var postUrl = element.getAttribute('postUrl');
        if (postUrl == null || postUrl === '') {
            postUrl = '/index/ApiAnonyMipPix/do_pix';
        }
        customElement.postUrl = postUrl;

        var title = element.getAttribute('title');
        if (title == null) {
            title = document.title;
        }

        window.addEventListener('load', function (e) {
            customElement.pixInfo.event = 'window.load';
            customElement.pixInfo.title = title;
            customElement.pixInfo.openTime = new Date().getTime();
            customElement.pixInfo.referrer = document.referrer;
            customElement.pixInfo.os = getOSInfo();
            customElement.pixInfo.browser = getBrowserInfo();
            customElement.pixInfo.screenSize = getScreenSize();
            customElement.pixInfo.documentSize = getDocumentSize();
            customElement.pixInfo.scrollHeight = getScrollHeight();
            customElement.pixInfo.clientHeight = getClientHeight();

            var pix = customElement.pixInfo;
            postSvr(pix);
        });

        window.addEventListener('scroll', function (e) {
            var sTop = getScrollTop();
            if (customElement.pixInfo.scrollTop < sTop) {
                customElement.pixInfo.scrollTop = sTop;
            }
            customElement.pixInfo.scrollHeight = getScrollHeight();
            customElement.pixInfo.documentSize = getDocumentSize();
            customElement.pixInfo.clientHeight = getClientHeight();
        });
        window.addEventListener('beforeunload', function (e) {
            customElement.pixInfo.closeTime = new Date().getTime();

            var pix = customElement.pixInfo;
            pix.event = 'window.beforeunload';
            postSvr(pix);
        });

    };

    return customElement;


    // 获取滚动的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    function getScrollHeight() {
        var scrollHeight = 0;
        if (document.documentElement && document.documentElement.scrollHeight) {
            scrollHeight = document.documentElement.scrollHeight;
        }
        else if (document.body) {
            scrollHeight = document.body.scrollHeight;
        }
        return scrollHeight;
    }

    function getClientHeight() {
        var clientHeight = 0;
        if (document.documentElement && document.documentElement.clientHeight) {
            clientHeight = document.documentElement.clientHeight;
        }
        else if (document.body) {
            clientHeight = document.body.clientHeight;
        }
        return clientHeight;
    }

    function getScreenSize() {
        var w = screen.width;
        var h = screen.height;
        return {
            width: w,
            height: h
        };
    }

    function getDocumentSize() {
        var h = 0;
        if (document.documentElement && document.documentElement.offsetHeight) {
            h = document.documentElement.offsetHeight;
        }
        else if (document.body) {
            h = document.body.offsetHeight;
        }
        var w = 0;
        if (document.documentElement && document.documentElement.offsetWidth) {
            w = document.documentElement.offsetWidth;
        }
        else if (document.body) {
            w = document.body.offsetWidth;
        }
        return {
            width: w,
            height: h
        };
    }

    function getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        var regStrFf = /firefox\/[\d.]+/gi;
        var regStrChrome = /chrome\/[\d.]+/gi;
        var regStrSaf = /safari\/[\d.]+/gi;
        var isIE = agent.indexOf('compatible') > -1 && agent.indexOf('msie' > -1);
        var isIE11 = agent.indexOf('trident') > -1 && agent.indexOf('rv:11.0') > -1;
        if (isIE) {
            var reIE = new RegExp('msie (\\d+\\.\\d+);');
            reIE.test(agent);
            var fIEVersion = parseFloat(RegExp['$1']);
            if (fIEVersion === 7) {
                return 'IE/7';
            }
            else if (fIEVersion === 8) {
                return 'IE/8';
            }
            else if (fIEVersion === 9) {
                return 'IE/9';
            }
            else if (fIEVersion === 10) {
                return 'IE/10';
            }
        }
        if (isIE11) {
            return 'IE/11';
        }
        // firefox
        if (agent.indexOf('firefox') > 0) {
            return agent.match(regStrFf)[0];
        }
        // Safari
        if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
            return agent.match(regStrSaf)[0];
        }
        // Chrome
        if (agent.indexOf('chrome') > 0) {
            return agent.match(regStrChrome)[0];
        }
    }

    function getOSInfo() {
        var sUserAgent = navigator.userAgent;

        var isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows');
        var isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC')
            || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel');
        if (isMac) {
            return 'Mac';
        }
        var isUnix = (navigator.platform === 'X11') && !isWin && !isMac;
        if (isUnix) {
            return 'Unix';
        }
        var isLinux = (String(navigator.platform).indexOf('Linux') > -1);

        var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === 'android';
        if (isLinux) {
            if (bIsAndroid) {
                return 'Android';
            }
            else {
                return 'Linux';
            }
        }
        if (isWin) {
            var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
            if (isWin2K) {
                return 'Win2000';
            }
            var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
            if (isWinXP) {
                return 'WinXP';
            }
            var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
            if (isWin2003) {
                return 'Win2003';
            }
            var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
            if (isWinVista) {
                return 'WinVista';
            }
            var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
            if (isWin7) {
                return 'Win7';
            }
        }
        return 'other';
    }

    function uuid() {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [];
        var i;
        var radix = chars.length;
        var len = 32;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        }

        return uuid.join('');
    }

    function postSvr(info) {
        var json = JSON.stringify(info);
        fetch(customElement.postUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'tt=' + json
        });
    }

    function getCookiePbpixId() {
        var pbpixId = getCookieByKey('pbpix_id');
        if (pbpixId === null || pbpixId === '') {
            pbpixId = uuid();
            setCookie('pbpix_id', pbpixId, '/');
        }
        return pbpixId;
    }

    function setCookie(key, val, path, time) {
        if (typeof key !== 'string' || typeof val !== 'string') {
            return false;
        }
        time = time || 7 * 24 * 3600;
        if (path == null || path === '') {
            path = '/';
        }

        var exp = new Date();
        exp.setTime(exp.getTime() + time * 1000);
        document.cookie = key + '=' + val + ';path=' + path + ';expires=' + exp.toGMTString();
    }

    // 获取所有的cookies
    function getAllCookies() {
        var cookies = document.cookie.split(/;\s/g);
        var cookieObj = {};
        cookies.forEach(function (item) {
            var key = item.split('=')[0];
            cookieObj[key] = item.split('=')[1];
        });
        return cookieObj;
    }

    // 通过key来获取cookie，本方法依赖于getAllCookies()
    function getCookieByKey(key) {
        return getAllCookies()[key];
    }

    // 通过key来删除cookie
    function clearCookieByKey(key) {
        setCookie(key, '', '/', -1);
    }


});
