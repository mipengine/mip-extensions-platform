/**
 * @file mip-fy-yuyue 对没有进行预约，记录预约手机号,
 * 要给多个站点使用，jsonp地址为模版内获取，页面地址为https路径
 * 本JS没有console.log。
 * 本功能需要在其他组件执行完以后再执行，所以必须用load ，麻烦过一下，谢谢。
 * addEventListener 无法满足效果，测试必须只有使用onload才行，请通过
 * 1.0.1 增加一种判断方式。增加提示文字。
 * 1.0.2 增加一种不处理的判断。
 * 1.0.3 增加了根据设备和对应栏目ID判断，获取安卓分类ID，苹果分类ID，非同设备访问同资源显示暂无对应设备资源，对应设备访问则预约。
 * 1.0.4 增加了很对访问PC端资源的判断，根据不同设备访问PC资源，给出不同的提示。
 * @author gom3250@qq.com.
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
        var phpurl = $(ele).find('.f-information').attr('data-phpurl');
        if (phpurl !== undefined) {
            window.addEventListener('load', function () {
            // 页面加载完成
                fetchJsonp('https://ca.6071.com/web/index/c/' + phpurl, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    var azclassid = data['android-classid'];
                    var iosclassid = data['ios-classid'];
                    var downsize = $(ele).find('.f-game-size').text();
                    var classid = $(ele).find('.f-information').attr('data-categroyId');
                    var classidnum = Number(classid);
                    var qqun = '';
                    var lowerOk = $(ele).find('#address').attr('lowerok');
                    var drurl = $(ele).find('#address').attr('href');
                    if (drurl === fromnodown || drurl === 'javascript:;' || downsize === '0KB' || drurl === '') {
                        // 判断 是 没有下载地址
                        if (platform.isIos()) {
                            // 苹果设备访问
                            if (lowerOk !== 'yes' && $.inArray(classidnum, iosclassid) !== -1) {
                                $(ele).find('#address').css('background', btncolor).text('立即预约');
                                $(ele).find('#address').attr('href', 'javascript:;').addClass('m-yuyueok');
                                addyuyue();
                            } else {
                                $(ele).find('#address').text('暂无苹果版').attr('href', 'javascript:;');
                                $(ele).find('#address').css({'background': '#ccc', 'color': '#fff'});
                            }
                        } else {
                            if (lowerOk !== 'yes' && $.inArray(classidnum, azclassid) !== -1) {
                                $(ele).find('#address').css('background', btncolor).text('立即预约');
                                $(ele).find('#address').attr('href', 'javascript:;').addClass('m-yuyueok');
                                addyuyue();
                            } else {
                                $(ele).find('#address').text('暂无安卓版').attr('href', 'javascript:;');
                                $(ele).find('#address').css({'background': '#ccc', 'color': '#fff'});
                            }
                        }
                        if ($.inArray(classidnum, iosclassid) === -1 && $.inArray(classidnum, azclassid) === -1) {
                            //  没有下载地址，并且是PC端资源
                            var systxt = '';
                            if (platform.isIos()) {
                                // 是苹果设备
                                $(ele).find('#address').text('暂无安卓版');
                                var systxt = '该软件没有对应苹果版';

                            } else {
                                var systxt = '该软件没有对应安卓版';
                            }
                            $(ele).find('#address').text(systxt);
                        }
                    } else {
                        // 有对应设备的下载地址
                        if ($.inArray(classidnum, iosclassid) === -1 && $.inArray(classidnum, azclassid) === -1) {
                            // 是PC端资源
                            var sys = '';
                            if (platform.isIos()) {
                                // 是苹果设备
                                var sys = '苹果';
                            } else {
                                var sys = '安卓';
                            }
                            var firname = $(ele).find('.f-tags-box li').eq(0).find('p').text();
                            var titshi = '<p class="m-tisp1">本页面是PC端资源，为了适配';
                            titshi += '<span>' + sys + '</span>用户的下载需求</p>';
                            titshi += '<p class="m-tisp2">该地址下载的是：';
                            titshi += '<span>' + firname + '</span></p>';
                            $(ele).find('#downAddress ul li').append(titshi);
                        }
                    }
                });
            }, false);
        };
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
