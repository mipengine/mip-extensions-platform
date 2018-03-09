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
        // 姓名Id
        var popContact = this.element.getAttribute('popContact');
		// 联系方式ID
        var popTel = this.element.getAttribute('popTel');
		// 留言内容id
        var popInfo = this.element.getAttribute('popInfo');
		// 提交按钮Id
        var popButton = this.element.getAttribute('popButton');
        var projectId = this.element.getAttribute('projectId');
        var projectIdValue = '';
        var popTelValue = '';
        var popContactValue = '';
        var popInfoValue = '';

        // 点击按钮
        $('#' + popButton + '').click(function () {
            var tval = $('#' + popTel + '').val();
            var add = true;
            var reTel = /^1\d{10}$/;
            var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            // 判断名字是否为空
            if (popContact !== '') {
                if ($.trim($('#' + popContact + ' ').val()) === '') {
                    $('#' + popContact + ' ').attr('placeholder', '请输入你的姓名');
                    $('#' + popContact + ' ').css('border-color', '#FF0000');
                }
                else {
                    $('#' + popContact + '').css('border-color', '#d2d2d2');
                    popContactValue = $.trim($('#' + popContact + '').val());
                    $('#' + popContact + '').val('');
                }
            }
            // 判断联系方式是否为空
            if ($.trim(tval) === ' ') {
                $('#' + popTel + '').css('border-color', '#FF0000');
                $('#' + popTel + '').attr('placeholder', '请输入你的手机号码');
                return;
            }
            else if (reTel.test(tval) === false && reg.test(tval) === false) {
                $('#' + popTel + '').css('border-color', '#FF0000');
                $('#' + popTel + '').val('');
                $('#' + popTel + '').attr('placeholder', '输入的联系方式不正确');
                return;
            }
            else {
                $('#' + popTel + '').css('border-color', '#d2d2d2');
                popTelValue = $.trim(tval);
            }
            if (popInfo !== '') {
                popInfoValue = $.trim($('#' + popInfo + '').val());
                $('#' + popInfo + '').val('');
            }
            var loginReqbody = {
                'tid': projectId,
                'type': 'addMsg',
                'tel': popTelValue,
                'popInfo': popInfoValue,
                'popContact': popContactValue
            };
            $.ajax({
                url: 'https://m.53.com.cn/common/mipwebdo.ashx',
                type: 'POST',
                async: false,
                data: JSON.stringify(loginReqbody),
                error: function () {
                    alert('留言失败2');
                },
                success: function (data, status) {
                    if (status = 'success' && data !== '') {
                        alert(data);
                        $('#' + popTel + '').val('');
                    } else {
                        alert('留言失败3');
                    }
                }
            });
        });
    };
    return customElement;
});