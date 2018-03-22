/**
 * @file mip-yesky-read 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var sitemapname = $(element).attr('data-name');
        var filepath = $(element).attr('data-url');
        var expiredays = $(element).attr('data-expiredays');
        var sub = $(element).attr('data-sub');
        var articleId = $(element).attr('data-articleId');
        var cId = $(element).attr('data-cId');
        var openId = $(element).attr('data-openId');
        var ajaxUrl = $(element).attr('data-ajax-url');
        var cStart = '';
        var cEnd = '';
        function isNull(data) {
            return data === '' || data === undefined || data === null ? true : false;
        }
        function setCookie(cName, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays * 30 * 24 * 60 * 60 * 1000);
            document.cookie = cName + '=' + escape(value) + ';expires=' + exdate;
        }
        function getCookie(cName) {
            if (document.cookie.length > 0) {
                cStart = document.cookie.indexOf(cName + '=');
                if (cStart !== -1) {
                    cStart = cStart + cName.length + 1;
                    cEnd = document.cookie.indexOf(';', cStart);
                    if (cEnd === -1) {
                        cEnd = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(cStart, cEnd));
                }
            }
            return '';
        }
        function checkCookie() {
            var clickcategory = getCookie('clickcategory' + cId);
            if (clickcategory !== null && clickcategory !== '') {
                if (sub === 'false') {
                    if (updateSubStatus(cId, 1, sitemapname, 1) === true) {
                        $(element).addClass('active').html('已订阅');
                    }
                }
            }
        }
        function updateSubStatus(keyId, type, name, status) {
            if (isNull(openId) === true) {
                getCode(filepath);
                return false;
            }
            var i = true;
            var dat = {
                keyId: keyId,
                name: name,
                type: type,
                status: status,
                openId: openId
            };
            $.ajax({
                url: ajaxUrl,
                type: 'post',
                data: dat,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data.result !== 200) {
                        i = false;
                    }
                },
                error: function () {
                    i = false;
                }
            });
            return i;
        }
        function getCode(url) {
            window.location.href = 'https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=' + 'xQmDDOrkl5nGPsDswxZesNot9gM2Ar8k&redirect_uri=' + encodeURIComponent(url) + '&scope=snsapi_userinfo&state=state';
        }
        checkCookie();
        sub === 'true' ? $(element).addClass('active').html('已订阅') : $(element).addClass('before');
        $(element).click(function () {
            if (sub === 'false') {
                var cookiename = $(this).attr('id') + cId;
                var cookievalue = $(this).attr('id');
                setCookie(cookiename, cookievalue, expiredays);
                if (updateSubStatus(cId, 1, sitemapname, 1) === true) {
                    $(this).addClass('active').html('已订阅');
                }
            }
        });
    };
    return customElement;
});

