/**
 * @file mip-nszxyu-login 组件
 * @author nszxyu
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    customElement.prototype.build = function () {
        var element = this.element;
        showLogin(element);
    };

    /**
     * [判断登录状态]
     *
     * @param {Object} element [mip-nszxyu-login内部元素]
     */
    function showLogin(element) {
        var tplSuccess = $(element).find('div[login-success]');
        var tplError   = $(element).find('div[login-error]');

        if (tplSuccess.length === 0 || tplError.length === 0) {
            console.error('请包含div[login-success]和div[login-error]模板');
            return;
        }

        var jieqiUserId = 0;
        var jieqiUserName = '';

        if (document.cookie.indexOf('jieqiUserInfo') >= 0) {
            var jieqiUserInfo = getCookieValue('jieqiUserInfo');

            var start = 0;
            var offset = jieqiUserInfo.indexOf(',', start);
            while (offset > 0) {
                var tmpval = jieqiUserInfo.substring(start, offset);
                var tmpidx = tmpval.indexOf('=');
                if (tmpidx > 0) {
                    var tmpname = tmpval.substring(0, tmpidx);
                    tmpval = tmpval.substring(tmpidx + 1, tmpval.length);
                    if (tmpname === 'jieqiUserId') {
                        jieqiUserId = tmpval;
                    }
                    else if (tmpname === 'jieqiUserName_un') {
                        jieqiUserName = tmpval;
                    }
                }
                start = offset + 1;
                if (offset < jieqiUserInfo.length) {
                    offset = jieqiUserInfo.indexOf(',', start);
                    if (offset === -1) {
                        offset = jieqiUserInfo.length;
                    }
                }
                else {
                    offset = -1;
                }
            }
        }

        if (jieqiUserId !== 0 && jieqiUserName !== '' && document.cookie.indexOf('PHPSESSID') !== -1) {
            $(element).html(tplSuccess.html());
        }
        else {
            $(element).html(tplError.html());
        }
    }


    /**
     * [获取cookie中的值]
     *
     * @param {string} name [cookie中的key值]
     * @return {string}
     */
    function getCookieValue(name) {
        var search = name + '=';
        var returnvalue = '';
        if (document.cookie.length > 0) {
            var offset = document.cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                var end = document.cookie.indexOf(';', offset);
                if (end === -1) {
                    end = document.cookie.length;
                }
                returnvalue = decodeURIComponent(document.cookie.substring(offset, end));
            }
        }
        return returnvalue;
    }

    return customElement;
});
