/**
 * @file mip-pangu 组件
 * @author woke
 */
/* global cStart, cngoldStat, cEnd, cName
 */
define(function (require) {
    // 该组件需要依赖jquery
    var $ = require('jquery');
    var customElem = require('customElement').create();
    var statIdName = 'cngoldstat';
    var urlNow = window.location.href;
    var panguUv = '';

    function setCookie(cName, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        var ck;
        if (urlNow.indexOf('mipcdn') > 0) {
            ck = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires='
            + exdate.toGMTString()) + ';path=/;domain=.mip-cngold-org.mipcdn.com';
        } else if ((urlNow.indexOf('/c/s') > 0) && (urlNow.indexOf('mipcdn') === '-1')) {
            ck = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires='
            + exdate.toGMTString()) + ';path=/;domain=.www.baidu.com';
        } else {
            ck = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires='
			+ exdate.toGMTString()) + ';path=/;domain=' + '.' + document.domain.split('.').slice(-2).join('.');
        }
        document.cookie = ck;
    }
    function getCookie(cName) {
        if (document.cookie.length > 0) {
            var cStart = document.cookie.indexOf(cName + '=');
            if (cStart !== -1) {
                cStart = cStart + cName.length + 1;
                var cEnd = document.cookie.indexOf(';', cStart);
                if (cEnd === -1) {
                    cEnd = document.cookie.length;
                }
                return unescape(document.cookie.substring(cStart, cEnd));
            }
        }
        return '';
    }

    function getTimestamp() {
        var timestamp = Date.parse(new Date());
        return timestamp;
    }

    function genStatId() {
        var cookieId = getTimestamp();
		// 日期+随机数
        cookieId = cookieId + '-' + Math.round(Math.random() * 3000000000);
        return cookieId;
    }

    function setStatId() {
        var cookieId = genStatId();
        setCookie(statIdName, cookieId, 365);
    }

    function getStatId() {
        try {
            if (cngoldStat !== null && cngoldStat !== undefined) {
                return cngoldStat;
            }
        } catch (e) {}

        var statId = getCookie(statIdName);
        if (statId != null && statId.length > 0) {
            return statId;
        } else {
            setStatId();
            var statId = getCookie(statIdName);
            return statId;
			//        return getStatId();
        }
    }

    function getUA() {
        var ua = navigator.userAgent;
        if (ua.length > 250) {
            ua = ua.substring(0, 250);
        }
        return ua;
    }

    function getBrower() {
        var ua = getUA();
        if (ua.indexOf('Maxthon') !== -1) {
            return 'Maxthon';
        } else if (ua.indexOf('MSIE') !== -1) {
            return 'MSIE';
        } else if (ua.indexOf('Firefox') !== -1) {
            return 'Firefox';
        } else if (ua.indexOf('Chrome') !== -1) {
            return 'Chrome';
        } else if (ua.indexOf('Opera') !== -1) {
            return 'Opera';
        } else if (ua.indexOf('Safari') !== -1) {
            return 'Safari';
        } else {
            return 'ot';
        }
    }

    function getBrowerLanguage() {
        var lang = navigator.browserLanguage;
        return lang != null && lang.length > 0 ? lang : '';
    }

    function getPlatform() {
        return navigator.platform;
    }

    function getPageTitle() {
        return document.title;
    }

    function vlstatInitLE(cookieId, vlch, vlch1, vlch2, vlch3) {
        var p;
        var vlstatCH = vlch != null && vlch.length > 0 ? vlch : '';
        var vlstatCH1 = vlch1 != null && vlch1.length > 0 ? vlch1 : '';
        var vlstatCH2 = vlch2 != null && vlch2.length > 0 ? vlch2 : '';
        var vlstatCH3 = vlch3 != null && vlch3.length > 0 ? vlch3 : '';

        var vlstatCookieId = cookieId;
        if (!vlstatCookieId || vlstatCookieId === '') {
            vlstatCookieId = getStatId();
        }
        panguUv = vlstatCookieId;
        var vlstatUA = encodeURIComponent(getUA());
        var vlstatIPAddress = document.localName;
        vlstatIPAddress = !vlstatIPAddress ? '' : vlstatIPAddress;
        var vlstatREFURL = encodeURIComponent(document.referrer);
        var vlstatURL = encodeURIComponent(document.URL);
        var vlstatScreenX = screen.width;
        var vlstatScreenY = screen.height;
        var vlstatOS = getPlatform();
        var vlstatBrower = getBrower();
        var vlstatBrowerLanguage = getBrowerLanguage();
        var vlstatPageTitle = encodeURIComponent(getPageTitle());

        var cngoldId = getCookie('IDENTITY');
        var vlstatAction = 'index.php';
        p = 'cookieId=' + vlstatCookieId + '&cngoldId=' + cngoldId + '&ua='
			+ vlstatUA + '&ip=' + vlstatIPAddress + '&refurl='
			+ vlstatREFURL + '&url=' + handelUrl(vlstatURL) + '&screenX=' + vlstatScreenX
			+ '&screenY=' + vlstatScreenY
			+ '&os=' + vlstatOS + '&brower=' + vlstatBrower + '&browerLang='
			+ vlstatBrowerLanguage
			+ '&title=' + vlstatPageTitle;
        var urlGo = vlstatAction + '?' + p;
        return p;
    }

    function startReqAction(cookieId) {
        var params = {};
        if (document) {
            params.domain = document.domain || '';
            params.url = document.URL || '';
            params.title = document.title || '';
            params.referrer = document.referrer || '';
        }
        if (window && window.screen) {
            params.sh = window.screen.height || 0;
            params.sw = window.screen.width || 0;
            params.cd = window.screen.colorDepth || 0;
        }
        if (navigator) {
            params.lang = navigator.language || '';
        }
        var args = '';
        for (var i in params) {
            if (args !== '') {
                args += '&';
            }
            args += i + '=' + encodeURIComponent(params[i]);
        }
        var p = vlstatInitLE(cookieId, null, null, null, null);
        var img = new Image(1, 1);
        img.src = 'https://tj.zpath8888.cn/ma.gif?' + p + '&type=0';
    }

    function loadQuit() {
        if (isIOS()) {
            window.addEventListener('pagehide', myUnloadHandler, false);
        } else {
            window.onbeforeunload = function () {
                myUnloadHandler();
            };
        }
    }

    function myUnloadHandler() {
        var url = 'https://tj.zpath888.cn/ma.gif?cookieId=' + panguUv + '&type=1&url=' + handelUrl(encodeURIComponent(document.URL));
        var img = new Image(1, 1);
        img.src = url;
    }

    function isIOS() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['iPhone', 'iPad'];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    function handelUrl(url) {
        url = url.indexOf('mip.cngold.org') > 0 ? 'https://' + url.substring(url.indexOf('mip.cngold.org')) : url;
        url = url.indexOf('#') > 0 ? url.substring(0, url.indexOf('#')) + '/' : url;
        url = url.indexOf('?') > 0 ? url.substring(0, url.indexOf('?')) : url;
        return url;
    }
	// 元素插入到文档时执行，仅会执行一次，用于解析_maq配置
    customElem.prototype.build = function () {
		// this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        $(function () {
            startReqAction();
            loadQuit();
        });
    };
    return customElem;
});
