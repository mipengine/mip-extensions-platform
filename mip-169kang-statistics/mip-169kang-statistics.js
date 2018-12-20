/**
 * @file mip-169kang-statistics 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 基本变量
        var $d = document;
        var pbs = [];
        var isNoImg = false; // 是否开启无图模式
        var lastAdClick = 1; // 记录上次点击广告时间
        var isSpecial = navigator.userAgent.indexOf('Edge')
            || navigator.userAgent.indexOf('Android')
            || navigator.userAgent.indexOf('NT 5.1'); // edge和部分Android XP行为异常，单独处理
        var wzTypes = [];
        var adIfms = [];
        var yyAdIds = [];

        // 1、统计pv
        // 2、页面位置的点击pv
        // 3、统计uv
        window.addEventListener('load', function () {
            if (pbs[0] && !pbs[0].complete) {
                isNoImg = true;
                for (var i = 0; i < pbs.length; i++) {
                    getAjaxData(pbs[i].src);
                }
            }
        });

        function getAjaxData(url, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (typeof success === 'function') {
                        success(xhr.responseText);
                    }
                }
                else {
                    if (typeof error === 'function') {
                        error();
                    }
                }
            };
            xhr.open('GET', url, true);
            xhr.send(null);
        }

        (function () {
            var pburl = 'https://pb.169kang.com/pgv.gif';
            var pbwzurl = 'https://pb.169kang.com/wz_pv.gif';
            // var pbanaurl = 'https://pb.169kang.com/analysis.gif'; // 分析时使用
            var pbstaurl = 'https://pb.169kang.com/statistics.gif';
            var refer = $d.referrer || '-';
            var kUid = '-';
            var kCode = '-';
            var kCids = '-';
            var kPos = '-';
            var channel = '-';
            var kAdverid = '-';

            if (
                $d.getElementById('k_pos')
                && $d.getElementById('k_pos').value
            ) {
                kPos = $d.getElementById('k_pos').value;
            }
            if (
                $d.getElementById('k_cids')
                && $d.getElementById('k_cids').value
            ) {
                kCids = $d.getElementById('k_cids').value;
            }

            (function () {
                // 获取医院广告主id
                var aArr = document.querySelectorAll('a');
                var len = aArr.length;
                for (var i = 0; i < len; i++) {
                    var href = aArr[i].href;
                    var matches;
                    if ((matches = /k_adverid=(\d+)/.exec(href))) {
                        kAdverid = matches[1];
                        break;
                    }
                }
            })();

            // 允许查找wz_count属性的标签
            var elCheckWZ = ['A', 'BUTTON'];

            // 处理window url 中的参数, 返回对象
            function paraget(surl) {
                var s = surl.length > 0
                            ? surl
                            : location.toString().toLowerCase();
                var item = null;
                var name;
                var value;
                var r = {};
                if (s.indexOf('?') > -1 || s.indexOf('#') > -1) {
                    s = s
                        .substring(s.indexOf('?') + 1)
                        .replace('#', '&')
                        .split('&');
                    for (var i = 0; i < s.length; i++) {
                        item = s[i].split('=');
                        if (item.length > 1) {
                            name = decodeURIComponent(item[0]);
                            value = decodeURIComponent(item[1]);
                            r[name] = value;
                        }
                    }
                }
                return r;
            }

            // 设置频道
            channel = 'mip01';

            // cookie需求
            function setC(key, expires) {
                kUid = new Date().getTime()
                    + ''
                    + Math.floor(Math.random() * 1000000);
                $d.cookie = key + '='
                    + kUid + ';expires='
                    + new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toGMTString();
            }

            function getC(key) {
                var arr;
                var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
                if ((arr = document.cookie.match(reg))) {
                    return unescape(arr[2]);
                }
                return null;
            }

            if (getC('Pb_clientuid')) {
                kUid = getC('Pb_clientuid');
            }
            else {
                setC('Pb_clientuid', 3650);
            }

            // 获取推广位类型
            (function () {
                var wzEles;
                if (document.querySelectorAll) {
                    wzEles = document.querySelectorAll('[wz_count]');
                }
                else if (typeof $ === 'function') {
                    wzEles = $('[wz_count]');
                }
                if (wzEles) {
                    var len = wzEles.length;
                    var arrHash = [];
                    for (var i = 0; i < len; i++) {
                        if (
                            !arrHash[
                                wzEles[i].getAttribute('wz_count').substr(7, 3)
                            ]
                        ) {
                            arrHash[
                                wzEles[i].getAttribute('wz_count').substr(7, 3)
                            ] = 0;
                        }
                    }
                    for (var key in arrHash) {
                        if (arrHash.hasOwnProperty(key)) {
                            wzTypes.push(key);
                        }
                    }
                }
            })();

            $d.onclick = function (evt) {
                // 判断用户是否是按了主鼠标
                if (
                    (evt && evt.button !== 0)
                    || (!evt && window.event.button !== 0)
                ) {
                    return;
                }
                evt = evt || window.event;
                var srcElem = evt.target ? evt.target : evt.srcElement; // 事件的目标
                // 特定标签查找wz_count属性   或者yyad-pingback
                var inElCheckWZ = false;
                while (srcElem !== $d.documentElement) {
                    if (elCheckWZ.indexOf(srcElem.tagName.toUpperCase()) > -1) {
                        inElCheckWZ = true;
                        break;
                    }
                    else if (srcElem.parentNode) {
                        srcElem = srcElem.parentNode;
                    }
                    else {
                        break;
                    }
                }
                if (inElCheckWZ) {
                    var wzCount = '';
                    var yyParams = '';
                    var tbParams = '';
                    var href = srcElem.href;
                    while (srcElem !== $d.documentElement) {
                        if (srcElem.getAttribute('wz_count')) {
                            wzCount = srcElem.getAttribute('wz_count');
                            break;
                        }
                        else if (
                            srcElem.classList
                            && srcElem.classList.contains
                            && (srcElem.classList.contains('avm_qr')
                            || srcElem.classList.contains('ad_qr'))
                        ) {
                            yyParams = href.substring(href.indexOf('?'))
                            + '&k_time='
                            + Math.floor(new Date().getTime() / 1000)
                            + Math.floor(Math.random() * 1000000)
                            + '&k_adtype=yyad';
                            break;
                        }
                        else if (
                            srcElem.classList
                            && srcElem.classList.contains
                            && srcElem.classList.contains('coupon')
                        ) {
                            var wzId = srcElem.getAttribute('coupon_id')
                                ? srcElem.getAttribute('coupon_id')
                                : '-';
                            tbParams = '?k_adid='
                                + wzId
                                + '&k_ck=c&k_pg='
                                + channel
                                + '&k_pos='
                                + kPos
                                + '&k_code='
                                + kCode
                                + '&k_cids='
                                + kCids
                                + '&k_uid='
                                + kUid
                                + '&k_ref='
                                + refer
                                + '&k_time='
                                + Math.floor(new Date().getTime() / 1000)
                                + Math.floor(Math.random() * 1000000)
                                + '&k_adtype=othad&k_adname=taobao';
                            break;
                        }
                        else if (srcElem.parentNode) {
                            srcElem = srcElem.parentNode;
                        }
                        else {
                            break;
                        }
                    }
                    if (wzCount) {
                        wzPB(wzCount);
                    }
                    else if (yyParams) {
                        clickPingback(pbstaurl, yyParams); // 医院点击pingback
                    }
                    else if (tbParams) {
                        clickPingback(pbstaurl, tbParams); // 淘宝点击pingback
                    }
                }
            };

            function wzPB(wzCount) {
                var pingbackwz = '?k_wz='
                    + wzCount
                    + '&k_pg='
                    + channel
                    + '&k_pos='
                    + kPos
                    + '&k_code='
                    + kCode
                    + '&k_cids='
                    + kCids
                    + '&k_uid='
                    + kUid
                    + '&k_ref='
                    + refer
                    + '&k_time='
                    + Math.floor(new Date().getTime() / 1000)
                    + Math.floor(Math.random() * 1000000);
                clickPingback(pbwzurl, pingbackwz);
            }

            // 初始化pingback图片方法
            function pingaction(pburl, pingbackhead, success, error) {
                var pbsrc = pburl + pingbackhead;
                var img = new Image();
                if (success && error) {
                    img.onload = success;
                    img.onerror = error;
                }
                img.src = pbsrc;
                pbs.push(img);
            }

            // 遍历医院广告进行pingback
            function pbyyad() {
                var adQr = $d.getElementsByClassName('avm_qr').length
                    ? $d.getElementsByClassName('avm_qr')
                    : $d.getElementsByClassName('ad_qr');
                for (var i = 0, len = adQr.length; i < len; i++) {
                    var a = adQr[i].getElementsByTagName('a');
                    if (a && a[0] && a[0].href) {
                        var ad = paraget(a[0].href);
                        var pingadback = '?k_adid='
                            + (ad.k_adid ? ad.k_adid : '-')
                            + '&k_adverid='
                            + (ad.k_adverid ? ad.k_adverid : '-')
                            + '&k_gid='
                            + (ad.k_gid ? ad.k_gid : '-')
                            + '&k_ck=d&k_pg='
                            + channel
                            + '&k_pos='
                            + kPos
                            + '&k_code='
                            + (ad.k_code ? ad.k_code : '-')
                            + '&k_cids='
                            + (ad.k_cids ? ad.k_cids : '-')
                            + '&k_uid='
                            + kUid
                            + '&k_ref='
                            + refer
                            + '&k_time='
                            + Math.floor(new Date().getTime() / 1000)
                            + Math.floor(Math.random() * 1000000)
                            + '&k_adtype=yyad';
                        switchMethod(pbstaurl, pingadback);
                        if (
                            ad.k_adid
                            && yyAdIds.indexOf
                            && yyAdIds.indexOf(ad.k_adid) === -1
                        ) {
                            yyAdIds.push(ad.k_adid);
                        }
                    }
                }
            }
            pbyyad();

            // 遍历淘宝广告进行pingback
            function pbtbad() {
                var $coupon = document.querySelectorAll('.coupon');
                for (var i = 0, len = $coupon.length; i < len; i++) {
                    var couponId = $coupon[i].getAttribute('coupon_id');
                    var pingadback = '?k_adid='
                        + (couponId ? couponId : '-')
                        + '&k_ck=d&k_pg='
                        + channel
                        + '&k_pos='
                        + kPos
                        + '&k_code='
                        + kCode
                        + '&k_cids='
                        + kCids
                        + '&k_uid='
                        + kUid
                        + '&k_ref='
                        + refer
                        + '&k_time='
                        + Math.floor(new Date().getTime() / 1000)
                        + Math.floor(Math.random() * 1000000)
                        + '&k_adtype=othad&k_adname=taobao';
                    switchMethod(pbstaurl, pingadback);
                }
            }
            pbtbad();

            // 自定义广告进行pingback
            function pbdiyad() {
                var $diyAd = document.querySelectorAll('.diy-ad');
                for (var i = 0, len = $diyAd.length; i < len; i++) {
                    var diyadId = $diyAd[i].getAttribute('diyad_id') || '-';
                    var kAdname = $diyAd[i].getAttribute('k_adname') || '-';
                    var pingadback = '?k_adid='
                        + (diyadId ? diyadId : '-')
                        + '&k_ck=d&k_pg='
                        + channel
                        + '&k_pos='
                        + kPos
                        + '&k_code='
                        + kCode
                        + '&k_cids='
                        + kCids
                        + '&k_uid='
                        + kUid
                        + '&k_ref='
                        + refer
                        + '&k_time='
                        + Math.floor(new Date().getTime() / 1000)
                        + Math.floor(Math.random() * 1000000)
                        + '&k_adtype=othad&k_adname='
                        + kAdname;
                    switchMethod(pbstaurl, pingadback);
                }
            }
            pbdiyad();

            // 选择pingback方式 img.src or ajax
            function switchMethod(surl, params, success, error) {
                if (isNoImg) {
                    getAjaxData(surl + params);
                }
                else {
                    pingaction(surl, params, success, error);
                }
            }

            // 点击跳转pingback单独处理
            function clickPingback(surl, params, success, error) {
                if (typeof navigator.sendBeacon === 'function') {
                    navigator.sendBeacon(surl + params);
                }
                else {
                    switchMethod(surl, params, success, error);
                }
            }

            var IframeOnClick = {};
            IframeOnClick.resolution = 200;
            IframeOnClick.iframes = [];
            IframeOnClick.interval = null;
            IframeOnClick.Iframe = function () {
                this.element = arguments[0];
                this.cb = arguments[1];
                this.isActive = false;
            };
            IframeOnClick.track = function (element, cb) {
                this.iframes.push(new this.Iframe(element, cb));
                if (!this.interval) {
                    var that = this;
                    this.interval = setInterval(function () {
                        that.checkClick();
                    }, this.resolution);
                }
            };
            IframeOnClick.checkClick = function () {
                if (document.activeElement) {
                    var activeElement = document.activeElement;
                    for (var i = 0; i < this.iframes.length; i++) {
                        if (isSpecial) {
                            if (activeElement === this.iframes[i].element) {
                                //  user is in this Iframe
                                if (this.iframes[i].hasTracked === false) {
                                    this.iframes[i].cb();
                                    this.iframes[i].hasTracked = true;
                                }
                            }
                            else {
                                this.iframes[i].hasTracked = false;
                            }
                        }
                        else {
                            if (activeElement === this.iframes[i].element) {
                                //  user is in this Iframe
                                this.iframes[i].element.blur();
                                if (
                                    new Date().getTime() - lastAdClick > this.resolution + 100
                                ) {
                                    this.iframes[i].cb();
                                    lastAdClick = new Date().getTime();
                                }
                                else {
                                    clearInterval(this.interval);
                                    this.interval = null;
                                }
                            }
                        }
                    }
                }
            };

            // 获取adFrame组成的数组
            function updateAdFrameArr() {
                var ifms = $d.getElementsByTagName('iframe');
                var len = ifms.length;
                for (var i = 0; i < len; i++) {
                    var p = paraget(ifms[i].src);
                    // 识别sg和bd广告的id
                    var tarId = getTarId(p, ifms[i]);
                    if (tarId) {
                        for (var j = 0; j < adIfms.length; j++) {
                            if (ifms[i] === adIfms[j]) {
                                break;
                            }
                        }
                        if (j === adIfms.length) {
                            addAdFrame(ifms[i], tarId);
                            adIfms.push(ifms[i]);
                        }
                    }
                }
                setTimeout(updateAdFrameArr, 200);
            }
            updateAdFrameArr();

            // 获取adid
            function getTarId(p, ifrm) {
                var tarId = 0;
                if (
                    p.id
                    && parseInt(p.id, 10)
                    && parseInt(p.id, 10) > 99999
                    && parseInt(p.id, 10) < 1000000
                ) {
                    tarId = parseInt(p.id, 10);
                }
                else if (
                    p.di
                    && parseInt(p.di.substr(1), 10)
                    && parseInt(p.di.substr(1), 10) > 999999
                    && parseInt(p.di.substr(1), 10) < 10000000
                ) {
                    tarId = parseInt(p.di.slice(1), 10);
                }
                else {
                    var tarInput = ifrm.parentNode.parentNode.firstElementChild;
                    while (
                        tarInput.tagName !== 'INPUT'
                        || tarInput.value.indexOf('u') !== 0
                    ) {
                        if (tarInput.parentNode !== document.body) {
                            tarInput = tarInput.parentNode.parentNode.firstElementChild;
                        }
                        else {
                            return tarId;
                        }
                    }
                    tarId = tarInput.value.substr(1);
                }
                return tarId;
            }

            function addAdFrame(el, adid) {
                IframeOnClick.track(el, adFrameClickPB);
                var p = paraget(el.src);
                var adSt = '?k_adid='
                    + adid
                    + '&k_ck=d&k_pg='
                    + channel
                    + '&k_pos='
                    + kPos
                    + '&k_code='
                    + kCode
                    + '&k_cids='
                    + kCids
                    + '&k_uid='
                    + kUid
                    + '&k_ref='
                    + refer
                    + '&k_time='
                    + Math.floor(new Date().getTime() / 1000)
                    + Math.floor(Math.random() * 1000000)
                    + '&k_adtype='
                    + (p.id ? 'sgad' : 'bdad');
                // 临时添加参数分析
                if (!p.id && !p.di) {
                    adSt += '&k_resist1=1';
                }
                switchMethod(pbstaurl, adSt); // 展示pingback
            }

            // 搜狗/百度广告点击pingback
            function adFrameClickPB() {
                var that = this;
                var p = paraget(that.element.src);
                var adSt = '?k_adid='
                    + getTarId(p, that.element)
                    + '&k_ck=c&k_pg='
                    + channel
                    + '&k_pos='
                    + kPos
                    + '&k_code='
                    + kCode
                    + '&k_cids='
                    + kCids
                    + '&k_uid='
                    + kUid
                    + '&k_ref='
                    + refer
                    + '&k_time='
                    + Math.floor(new Date().getTime() / 1000)
                    + Math.floor(Math.random() * 1000000)
                    + '&k_adtype='
                    + (p.id ? 'sgad' : 'bdad');
                switchMethod(pbstaurl, adSt);
            }

            // pv pingback
            var pingbackhead = '?k_pg='
                + channel
                + '&k_pos='
                + kPos
                + '&k_code='
                + kCode
                + '&k_cids='
                + kCids
                + '&k_uid='
                + kUid
                + '&k_ref='
                + refer
                + '&k_time='
                + Math.floor(new Date().getTime() / 1000)
                + Math.floor(Math.random() * 1000000)
                + '&k_wztype='
                + (wzTypes.length ? wzTypes.sort().join(',') : '-');
            if (adIfms.length || yyAdIds.length) {
                pingbackhead += '&k_sgadCount='
                    + adIfms.length
                    + '&k_yyad_ids='
                    + yyAdIds.join(',')
                    + '&k_adverid='
                    + kAdverid;
            }
            switchMethod(pburl, pingbackhead);
        })();
    };

    return customElement;
});
