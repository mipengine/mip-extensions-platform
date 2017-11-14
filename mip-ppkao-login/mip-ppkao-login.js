/**
 * @file mip-ppkao-login 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var mipLogin = $(ele);
        var login = mipLogin.find('.login');
        var touxiang = mipLogin.find('.touxiang');
        $(document).ready(function () {
            if ($.session.get('UserIsLoginKey').equals('3')) {
                $.session.set('GetUserIPKey', '0');
            } else {
                if (!$.session.get('UserIsLoginKey').equals('1')) {
                    $.ajax({
                        type: 'get',
                        url: '//user.ppkao.com/Interface/IsLogin.ashx?action=UserIsLogin',
                        dataType: 'jsonp',
                        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                        jsonp: 'callback',
                        jsonpCallback: 'callback',
                        async: false,
                        success: function (data) {
                            if (data.name.equals('1')) {
                                $.session.set('UserIsLoginKey', data.name);
                                $.session.set('UserIsLoginusername', data.username);
                                $.session.set('UserIsLoginUserFace', data.UserFace);
                                login.hide();
                                touxiang.show();
                                touxiang.find('mip-img').attr({
                                    src: $.session.get('UserIsLoginUserFace')
                                });
                            } else {
                                if (data.name.equals('3')) {
                                    $.session.set('GetUserIPKey', '0');
                                    login.show();
                                    touxiang.hide();
                                    return;
                                }
                            }
                            login.show();
                            touxiang.hide();
                            return;
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            login.show();
                            touxiang.hide();
                            return;
                        }
                    });
                } else {
                    login.hide();
                    touxiang.show();
                    touxiang.find('mip-img').attr({
                        src: $.session.get('UserIsLoginUserFace')
                    });
                }
            }
        });
    };

    return customElement;
});
