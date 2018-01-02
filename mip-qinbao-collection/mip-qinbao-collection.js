/**
 * @file mip-qinbao-collection 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var yhscFlag = true;
    var ajaxLoginStatusUrl = 'https://m.qbaobei.com/Member/api/getUserMsg/theme/mobile/time/' + new Date().getTime();
    var collection = {
        ajaxLoginStatus: function () {
            var token = this.getCookieLogin('mobile_token');
            var docId = $('#doc-id').val();
            var type = $('#doc-type').val();
            var tags = $('#doc-tags').val();
            var url = window.location.href;
            url = this.base64encode(url);
            var statusUrl = 'https://m.qbaobei.com/Member/MLogin/login/returnUrl/' + url + '/';
            var htmlStr;
            if (token !== null && token !== '' && ajaxLoginStatusUrl !== '') {
                $.ajax({
                    type: 'POST',
                    async: true,
                    url: ajaxLoginStatusUrl,
                    dataType: 'json',
                    data: {docId: docId, type: type, tags: tags, theme: 'mobile'},
                    success: function (d) {
                        var json = d.user_info;
                        var colletionInfo;
                        if (typeof (json.user_info) !== 'undefined' && json.user_info !== null
                        && typeof (json.user_info.userid) !== 'undefined') {
                            if (json.user_info.userid > 0) {
                                colletionInfo = d.colletionInfo;
                                var data = json.user_info;
                                if (data.head_img) {
                                    htmlStr = '<img src="' + data.head_img + '">';
                                }
                                else {
                                    htmlStr = '<img src="https://m.qbaobei.com/Public/Member/images/user-me.png">';
                                }
                                htmlStr += '<input type="hidden" id="data-login-status" value="1"/>';
                                $('.isuser-circle').html(htmlStr);
                                statusUrl = 'https://m.qbaobei.com/Member/MIndex/index';
                                if (colletionInfo !== null && colletionInfo.status !== null
                                && typeof (colletionInfo.status) !== 'undefined') {
                                    if (colletionInfo.status === '0') {
                                        yhscFlag = true;
                                    }
                                    else if (colletionInfo.status === '1') {
                                        yhscFlag = false;
                                        if ($('#doc-id').val() > 0) {
                                            $('.me-sc').text('已收藏').addClass('me-ysc');
                                        }
                                    }
                                }

                            }
                            else {
                                htmlStr = '<input type="hidden" id="data-login-status" value="0"/>';
                                $('.isuser-circle').append(htmlStr);
                            }
                        }
                        else {
                            htmlStr = '<input type="hidden" id="data-login-status" value="0"/>';
                            $('.isuser-circle').append(htmlStr);
                        }
                        $('.isuser-circle').unbind().on('click', function () {
                            location.href = statusUrl;
                        });
                    }
                });
            }
            else {
                htmlStr = '<input type="hidden" id="data-login-status" value="0"/>';
                $('.isuser-circle').append(htmlStr);
                $('.isuser-circle').unbind().on('click', function () {
                    location.href = statusUrl;
                });
            }
        },
        getCookieLogin: function (cName) {
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
        },
        base64encode: function (str) {
            var out;
            var i;
            var len;
            var c1;
            var c2;
            var c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += '=';
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        collectionFn: function (o) {
            var t = this;
            $(o).click(function () {
                var loginSt = $('#data-login-status').val();
                var ajaxUserCollectionUrl;
                var url = window.location.href;
                url = t.base64encode(url);
                if (yhscFlag) {
                    ajaxUserCollectionUrl = 'https://m.qbaobei.com/Member/UserCollection/setCollectionAjax';
                }
                else {
                    ajaxUserCollectionUrl = 'https://m.qbaobei.com/Member/UserCollection/deleteUserCollAjax';
                }
                var docID = $('#doc-id').val();
                var type = $('#doc-type').val();
                var status = 0;
                var loginUrl = 'https://m.qbaobei.com/Member/MLogin/login/returnUrl/' + url + '/';
                if (loginSt > 0) {
                    $.ajax({
                        type: 'GET',
                        async: true,
                        url: ajaxUserCollectionUrl,
                        dataType: 'json',
                        data: {docId: docID, type: type, theme: 'mobile'},
                        success: function (json) {
                            if (json.status === 1) {
                                status = 1;
                                if (yhscFlag) {
                                    $('.me-sc').text('已收藏').addClass('me-ysc');
                                    $('.scroll-sc .text').fadeIn();
                                    setTimeout(function () {
                                        $('.scroll-sc .text').fadeOut();
                                    }, 2000);
                                }
                                else {
                                    $('.me-sc').text('收藏').removeClass('me-ysc');
                                }
                                yhscFlag = !yhscFlag;
                            }
                            else if (json.status === 100302) {
                                loginSt = 0;
                            }
                        }
                    });
                }
                else {
                    window.location.href = loginUrl;
                    status = 1;
                }
                if (!status && loginSt < 1) {
                    window.location.href = loginUrl;
                }
                $('#data-login-status').val(loginSt);
            });
        },
        init: function () {
            this.ajaxLoginStatus(), this.collectionFn('.collection');
        }
    };
    customElement.prototype.build = function () {
        collection.init();
    };

    return customElement;
});

