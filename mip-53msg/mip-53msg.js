/**
 * @file mip-vote 组件
 * @author
 */

define(function (require) {
    'use strict';
    var jquery = require('jquery');
    var customElement = require('customElement').create();

     /**
	     * 第一次进入可视区回调，只会执行一次
	     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var vid = element.getAttribute('vid');
        var sid = element.getAttribute('sid');
        var tid = element.getAttribute('tid');
        $('#' + sid + '').click(function () {
            var tval = $('#' + vid + '').val();
            var add = true;
            var reTel = /^1\d{10}$/;
            var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            if ($.trim(tval) === ' ') {
                $('#' + vid + '').css('border-color', '#FF0000');
                $('#' + vid + '').attr('placeholder', '请输入你的手机号码');
                return;
            }
            else if (reTel.test(tval) === false && reg.test(tval) === false) {
                $('#' + vid + '').css('border-color', '#FF0000');
                $('#' + vid + '').val('');
                $('#' + vid + '').attr('placeholder', '输入的联系方式不正确');
                return;
            }
            else {
                $('#' + vid + '').css('border-color', '#d2d2d2');
            }
            var loginReqbody = {
                'tid': tid,
                'type': 'addPTel',
                'tel': tval
            };
            $.ajax({
                url: 'https://m.53.com.cn/common/mipwebdo.ashx',
                type: 'POST',
                async: false,
                data: JSON.stringify(loginReqbody),
                error: function () {
                    alert('留言失败');
                },
                success: function (data, status) {
                    if (status = 'success' && data !== '') {
                        alert(data);
                        $('#' + vid + '').val('');
                    } else {
                        alert('留言失败');
                    }
                }
            });
        });
    };
    return customElement;
});