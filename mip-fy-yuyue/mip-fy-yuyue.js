/**
 * @file mip-fy-yuyue 对没有进行预约，记录预约手机号,
 * 要给多个站点使用，jsonp地址为模版内获取，页面地址为https路径
 * 本JS没有console.log。
 * 本功能需要在其他组件执行完以后再执行，所以必须用load ，麻烦过一下，谢谢。
 * addEventListener 无法满足效果，测试必须只有使用onload才行，请通过
 * 1.0.1 增加一种判断方式。增加提示文字。
 * @author gom3250@qq.com.
 * @version 1.0.0
 *  */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fromnodown = ele.getAttribute('data-nodownurl');
        var btncolor = ele.getAttribute('data-color');
        var yuyueid = ele.getAttribute('data-id');
        var yuyueurl = ele.getAttribute('data-yuyueurl');
        window.addEventListener('load', function () {
            // 页面加载完成
            var drurl = $(ele).find('#address').attr('href');
            var downsize = $(ele).find('.f-game-size').text();
            var qqun = '';
            if (drurl === fromnodown || drurl === 'javascript:;' || downsize === '0KB') {
                // 判断下载地址
                $(ele).find('#address').css('background', btncolor).text('立即预约');
                $(ele).find('#address').attr('href', 'javascript:;').addClass('m-yuyueok');
                addyuyue();
            }
        }, false);
        function addyuyue() {
            // 获取数据
            fetchJsonp(yuyueurl + '/ajax.asp?action=33&id=0', {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var qqun = data.list[0].qqgroup;
                var weixinname = '';
                var yuyuediv = '<div class="g-yuyue" data-click="0"><div class="m-yytit">请输入您的预约信息：';
                yuyuediv += '<span class="f-fr f-yyclose">×</span></div><div class="m-yyinfo"><span></span>';
                yuyuediv += '<input type="text" id="f-yyPhone" placeholder="输入手机号码" maxlength="11">';
                yuyuediv += '</div><div class="m-yuyuenum">预约后可及时接受<span>';
                yuyuediv += '活动，礼包，开测和开放下载</span>的提醒</div><div class="m-qqweixin clearfix">';
                yuyuediv += '<p><a target="_blank" href="' + qqun + '" class="m-yyqq">';
                yuyuediv += '<span></span>加入预约QQ群</a></p></div><div class="m-yyqdbtn">';
                yuyuediv += '<a href="javascript:;" class="m-yybtn f-yybtn">预约</a>';
                yuyuediv += '<a href="javascript:;" class="m-yycl f-yyclose">关闭</a></div></div>';
                yuyuediv += '<div class="g-yuyuebg f-yyclose"></div>';
                $(ele).find('.f-yydiv').after(yuyuediv);
                $(ele).find('.m-yuyueok').click(function () {
                    // 打开
                    var yyclinum = $(ele).find('.g-yuyue').attr('data-click');
                    if (yyclinum === '0') {
                        $(ele).find('.g-yuyue,.g-yuyuebg').fadeIn();
                    } else {
                        alert('您已经预约过拉');
                    };
                });
                $(ele).find('.f-yyclose').click(function () {
                // 关闭
                    $(ele).find('.g-yuyue,.g-yuyuebg').hide();
                });
                $(ele).find('.f-yybtn').click(function () {
                // 提交
                    var iputxt = $(ele).find('.g-yuyue input').val();
                    if (iputxt === '') {
                    // 为空
                        alert('手机号不能为空');
                        return false;
                    };
                    var yyphone = $(ele).find('#f-yyPhone').val();
                    var yyqq = $(ele).find('#f-QQ').val();
                    var phonereg = /^1[\d]{10}$/;
                    // 手机号段设置
                    if (yyphone !== '') {
                        if (!phonereg.test(yyphone)) {
                            alert('请输入有效的手机号！');
                            return false;
                        }
                    }
                    yuyue();
                });
            });
            // 获取数据结束
        }
        function yuyue() {
            var yuyuephome = $(ele).find('#f-yyPhone').val();
            fetchJsonp(yuyueurl + '/ajax.asp?action=34&id=' + yuyueid + '&phone=' + yuyuephome, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                $(ele).find('.g-yuyue').attr('data-click', 1);
                $(ele).find('.m-yuyueok').text('成功预约');
                alert('预约成功');
                $(ele).find('.g-yuyue,.g-yuyuebg').hide();
            });
        }
    };
    return customElement;
});
