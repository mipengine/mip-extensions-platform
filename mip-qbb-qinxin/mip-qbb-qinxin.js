/**
 * @file 页面针对亲信的写入
 * @author yml
*/
define(function (require) {
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {

        function setLocalStorage(cName, value, expiredays) {
            var storage = window.localStorage;
            storage.setItem(cName, value);
            setTimeout(function () {
                storage.removeItem(cName);
            }, expiredays);
        }

        function getLocalStorage(cName) {
            var storage = window.localStorage;
            if (window.localStorage.length > 0) {
                return storage.getItem(cName);
            }

            return '';
        }

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }
        var intQinxin = self.setInterval('isApp()', 50);
        function isApp() {
            // app反问名称
            var paramName = 'QINXINAPP';
            var qinxinKey = 'QINXINCOOKIE';
            var rs = getQueryString(paramName);
            var cookieRe = getLocalStorage(qinxinKey);
            if (rs || (cookieRe !== null && cookieRe !== '')) {
                setLocalStorage(qinxinKey, paramName, 30);
                if (document.getElementsByClassName('home-header').length > 0) {
                    document.getElementsByClassName('home-header')[0].style.display = 'none';
                }

                if (document.getElementsByClassName('channel-nav').length > 0) {
                    document.getElementsByClassName('channel-nav')[0].style.top = '0px';
                }

                if (document.getElementsByClassName('home-nav').length > 0) {
                    document.getElementsByClassName('home-nav')[0].style.top = '0px';
                }

                if (document.getElementsByClassName('top-down')) {
                    document.getElementsByClassName('top-down').style.display = 'none';
                    window.clearInterval(intQinxin);
                }
            }
        }
        isApp();

    };

    return customElem;
});
