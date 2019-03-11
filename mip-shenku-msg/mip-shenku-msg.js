/**
* @file mip-shenku-msg 组件
* @author:
* @date:
*/
define(function (require) {
    // mip 组件开发支持 zepto
    var jquery = require('zepto');
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
		// URL
        var popUrl = this.element.getAttribute('popUrl');
        var projectId = this.element.getAttribute('projectId');
        var projectIdValue = '';
        var popTelValue = '';
        var popContactValue = '';
        var popInfoValue = '';
        // 点击按钮
        // $('#' + popButton + '').click(function () {
        var popTelObject = $(this.element).find('#' + popTel + '');
        var popInfoObject = null;
        var popContactObject = null;
        if (popInfo !== '') {
            popInfoObject = $(this.element).find('#' + popInfo + '');
        }
        if (popContact !== '') {
            popContactObject = $(this.element).find('#' + popContact + '');
        }
        $(this.element).find('#' + popButton + '').on('click', function (e) {
            var tval = popTelObject.text();
            var add = true;
            var reTel = /^1\d{10}$/;
            var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            // 判断名字是否为空
            if (popContact !== '') {
                if ($.trim(popContactObject.text()) === '') {
                    popContactObject.attr('placeholder', '请输入你的姓名');
                    popContactObject.css('border-color', '#FF0000');
                    alert('请输入你的姓名');
                    return;//
                }
                else {
                    // $('#' + popContact + '').css('border-color', '#d2d2d2');
                    popContactObject.css('border-color', '#d2d2d2');
                    popContactValue = $.trim(popContactObject.text());
                    popContactObject.text('');
                }
            }
            // 判断联系方式是否为空
            if ($.trim(tval) === '') {
                popTelObject.css('border-color', '#FF0000');
                popTelObject.attr('placeholder', '请输入你的手机号码');
                alert('请输入你的手机号码');
                return;
            }
            else if (reTel.test(tval) === false && reg.test(tval) === false) {
                popTelObject.css('border-color', '#FF0000');
                popTelObject.text('');
                popTelObject.attr('placeholder', '输入的联系方式不正确');
                alert('输入的联系方式不正确');
                return;
            }
            else {
                popTelObject.css('border-color', '#d2d2d2');
                popTelValue = $.trim(tval);
            }
            if (popInfo !== '') {
                popInfoValue = $.trim(popInfoObject.text());
                popInfoObject.text('');
            }
            var loginReqbody = {
                'ProjectID': projectId,
                'Tel': popTelValue,
                'Message': popInfoValue,
                'Name': popContactValue,
                'MessageSource': 'MIP-MSG001',
                'URL': window.location.href,
                'URLTitle': document.title
            };
            $.ajax({
                url: popUrl + 'mguestbook.jspx',
                type: 'POST',
                async: true,
				// dataType:"json",
                data: loginReqbody,
                // data: JSON.stringify(loginReqbody);
                error: function () {
                    alert('留言失败2');
                },
                success: function (data, status) {
                    if (status = 'success' && data !== '') {
                        alert('我们会马上贺你电话取得联系！');
                        popTelObject.text('');
                    } else {
                        alert('留言失败3');
                    }
                }
            });
        });
    };
    return customElement;
});