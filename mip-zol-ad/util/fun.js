/**
 * @file 常用方法
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    module.exports = {
        loadScript: function (src, node) {
            var script = document.createElement('script');
            script.src = src + (src.indexOf('?') > 0 ? '&' : '?') + '_=' + Math.random();
            if (node) {
                node.parentNode.insertBefore(script, node);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        getCookie: function (name) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + name + '=');
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return '';
        },
        setCookie: function (name, val) {
            document.cookie = name + '=' + val;
        },
        indexOf: function (array, search) {
            if (array.indexOf) {
                return array.indexOf(search);
            } else {
                return '#' + array.join('#') + '#' .indexOf('#' + search + '#');
            }
        },
        firstLetterUppercase: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };
});
