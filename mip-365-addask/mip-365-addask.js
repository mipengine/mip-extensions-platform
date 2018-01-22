/**
 * @file mip-365-addask 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('jquery');
        var el = $(this.element);
        var type = el.attr('type');
        var lawyerId = el.attr('lawyerId');
        var cityId = el.attr('cityId');
        var loginuser = el.attr('loginuser');
        var islawyer = el.attr('islawyer');
        $('#btn_addAsk').on('click',
            function () {
                var quescontent = $('#form_content').val();
                if (quescontent.length < 20 || quescontent.length > 500) {
                    alert('请填写' + 20 + '个字至' + 500 + '个字的问题描述');
                    return;
                }
                if (loginuser === 0)
				{
                    $('#btnadd').hide();
                    $('#teleph').show();
                    $('#btn_authentication').on('click', function () {
                            var mobilephone = $('#format_mobilePhone').val();
                            var reg = /([0\+]\d{2,3}-)?(1[3|4|5|8|7]\d{9})/;
                            var r = mobilephone.match(reg);
                            if (r != null) {
                                $.ajax({
                                    type: 'POST',
                                    url: '/najax/Authentication/MobilePhoneLogin/',
                                    data: {
                                        'mobilePhone': mobilephone,
                                        'verificationCode': '',
                                        'password': '',
                                        'content': quescontent,
                                        'lawyerId': lawyerId,
                                        'cityId': cityId,
                                        'type': type
                                    },
                                    success: function (data) {
                                        if (data.UserId > 0) {
                                            $('#btn_addAsk').trigger('click');
                                        }
                                    }
                                });
                            } else {
                                alert('请输入正确的电话号码');
                                return;
                            }
                        });
                } else {
                    if (islawyer === 0) {
                        alert('律师不能提问');
                        return;
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: '/najax/Ask/AddQuestion/',
                            data: {
                                'content': quescontent,
                                'lawyerId': lawyerId,
                                'cityId': cityId,
                                'type': type,
                                'cks': getCookie('ba1')
                            },
                            beforeSend: function (xhr) {
                                xhr.withCredentials = true;
                            },
                            crossDomain: true,
                            success: function (data) {
                                if (data.Data.QuestionId > 0)
								{
                                    window.location.href = 'http://m2.64365.com/ask/askok.aspx?askid=' + data.QuestionId + '&typeid=0&questioncontent=' + data.Title;
                                } else {
                                }
                            },
                            error: function (e) {
                                alert(e);
                            }
                        });
                    }
                }
            });
    };
    function getCookie(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split('; ');
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split('=');
            if (arr[0] === name) {
                return arr[1];
            }
        }
        return '';
    }
    return customElement;
});
