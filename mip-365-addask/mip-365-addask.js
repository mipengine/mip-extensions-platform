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
                            success: function (res) {
                                if (res > 0) {
                                    alert('发布成功');
                                    window.location.href = 'http://m2.64365.com/ask/askok.aspx?askid=' + res + '&typeid=0&questioncontent=' + quescontent;
                                }
                            }
                        });
                    } else {
                        alert('请输入正确的电话号码');
                        return;
                    }
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
                                'type': type
                            },
                            beforeSend: function (xhr) {
                                xhr.withCredentials = true;
                            },
                            crossDomain: true,
                            success: function (res) {
                                if (res > 0)
								{
                                    window.location.href = 'http://m2.64365.com/ask/askok.aspx?askid=' + res + '&typeid=0&questioncontent=' + quescontent;
                                } else {
                                }
                            }
                        });
                    }
                }
            });
    };
    return customElement;
});
