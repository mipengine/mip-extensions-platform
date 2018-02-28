/**
 * @file 获取用户信息
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var location;
    var utilFun = require('./fun');
    var config = require('../config');
    module.exports = {
        ua: window.navigator.userAgent,
        host: document.location.host,
        href: window.location.href,
        location: function () {
            var cityId;
            var provId;
            var cityStr;
            var provStr;
            var userLocationCookie;
            var userLocationCookieArr;
            if (location) {
                return location;
            }
            cityId = utilFun.getCookie('userLocationId');
            provId = utilFun.getCookie('userProvinceId');
            userLocationCookie = utilFun.getCookie('z_pro_city');
            if (!cityId || !provId || !userLocationCookie) {
                utilFun.loadScript(config.ipareaUrl);
            } else {
                userLocationCookieArr = decodeURIComponent(userLocationCookie).split('&');
                if (userLocationCookieArr.length > 1) {
                    cityStr = userLocationCookieArr[1].replace('s_city=', '');
                    provStr = userLocationCookieArr[0].replace('s_provice=', '');
                }
            }
            location = {
                cityId: cityId,
                provId: provId,
                cityStr: cityStr,
                provStr: provStr
            };
            return location;
        },
        pvtest: function (event) {
            var ipck = decodeURIComponent(utilFun.getCookie('ip_ck'));
            var url = config.pvtest.replace('{ipck}', ipck).replace('{time}', Date.now());
            return url.replace('{event}', event).replace('{url}', this.href);
        }
    };
});
