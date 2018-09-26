/**
 * @file mip-169kang-correct 组件
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
        var thatEl = this.element;
        var tarId = thatEl.getAttribute('yy-id');
        var preUrl = thatEl.getAttribute('url');
        var pbSta = 'https://pb.169kang.com/statistics.gif';
        var refer = document.referrer || '-';
        var kUid = '-';
        var kCids = thatEl.getAttribute('cids');
        var kPos = thatEl.getAttribute('pos');
        var pg = thatEl.getAttribute('pg');

        // 默认隐藏
        thatEl.style.display = 'none';

        function paraget(surl) {
            var s = surl.length > 0 ? surl : location.toString().toLowerCase();
            var item = null;
            var name;
            var value;
            var r = {};
            if (s.indexOf('?') > -1 || s.indexOf('#') > -1) {
                s = s.substring(s.indexOf('?') + 1)
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

        function setCookie(key, value, expires) {
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
            document.cookie = key + '=' + escape(value) + ';expires=' + exp.toUTCString();
        }

        function getCookie(key) {
            var arr;
            var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
            return null;
        }

        function pingback(pburl, params) {
            var str = '';
            if (params) {
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        str += key + '=' + params[key] + '&';
                    }
                }
                new Image().src = pburl + '?' + str;
            }
            else {
                new Image().src = pburl;
            }
        }

        function pbyy(pburl, type) {
            if (thatEl.querySelectorAll('a').length
                && thatEl.querySelectorAll('a')[0].href) {
                var ad = paraget(thatEl.querySelectorAll('a')[0].href);
                var pbyyParams = '?k_adid=' + (ad.k_adid ? ad.k_adid : '-')
                    + '&k_adverid=' + (ad.k_adverid ? ad.k_adverid : '-')
                    + '&k_gid=' + (ad.k_gid ? ad.k_gid : '-')
                    + '&k_ck=d&k_pg=' + pg
                    + '&k_pos=' + kPos
                    + '&k_code=' + (ad.k_code ? ad.k_code : '-')
                    + '&k_cids=' + (ad.k_cids ? ad.k_cids : '-')
                    + '&k_uid=' + kUid
                    + '&k_ref=' + refer
                    + '&k_time=' + Math.floor(new Date().getTime() / 1000)
                    + Math.floor(Math.random() * 1000000)
                    + '&k_adtype=yyad';
                pburl += pbyyParams;
                if (type) {
                    pburl += '&for=' + type;
                }
                pingback(pburl);
            }
        }

        function getPos(successHandler, errorHandler) {
            if (navigator.geolocation) {
                var geoTimeStart = new Date().getTime();
                navigator.geolocation.getCurrentPosition(function (position) {
                    successHandler(position, geoTimeStart);
                }, errorHandler);
            }
        }

        function getData(position, geoTimeStart) {
            var body = {};
            if (position) {
                body = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                };
                if (new Date().getTime() - geoTimeStart < 500) {
                    setCookie('allow_geo', 1, 20 * 365);
                }
            }
            $.ajax({
                url: preUrl + '?k_cids=' + kCids,
                type: 'post',
                data: body,
                dataType: 'json',
                success: function (data) {
                    if (data.status === 200) {
                        replaceAd(data);
                    }
                }
            });
        }

        function errorHandler() {
            setCookie('geo_reject', 1, 1);
            if (getCookie('allow_geo')) {
                setCookie('allow_geo', '', new Date().getTime() - 1000);
            }
        }

        function replaceAd(data) {
            if (data.is_identical === 1) {
                return;
            }
            if ((Object.prototype.toString.call(data.lists) === '[object Array]'
                && data.lists.length)
                || (Object.prototype.toString.call(data.lists) === '[object Object]'
                && data.lists[tarId])) {
                pbyy(pbSta, 'yy_minus');
                thatEl.innerHTML = data.lists[tarId].adstr;
                pbyy(pbSta);
                thatEl.style.display = 'block';
            }
            else {
                thatEl.style.display = 'none';
                pbyy(pbSta, 'yy_minus');
            }
        }

        (function () {
            getData();
            if (!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
                return;
            }
            if (getCookie('geo_reject')) {
                return;
            }
            if (getCookie('allow_geo')) {
                getPos(getData, errorHandler);
                return;
            }
            if (getCookie('geo_citycode')) {
                if (getCookie('geo_citycode') !== document.getElementById('k_code').value) {
                    getPos(getData, errorHandler);
                }
                return;
            }
            getPos(getData, errorHandler);
        })();
    };

    return customElement;
});
