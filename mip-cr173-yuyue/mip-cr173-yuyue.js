/**
 * @file mip-cr173-yuyue
 * 1.0 实现功能：根据页面属性，对已经下架和无地址的资源判断，是软件提示“下架”，是游戏提示“预约”。 对有关联的当前设备访问的资源，根据百度手机助手 百度-黄奥 的需求，进行对应下载的提示。
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
        // 注意。此处获取的不是url地址。只是拼接的下方json的地址的标识符。
        if (phpurl !== undefined) {
            document.onreadystatechange = subSomething;
            function subSomething() {
                if (document.readyState === 'loaded' || document.readyState === 'complete') {
                    fetchJsonp('https://ca.6071.com/web/index/c/' + phpurl, {
                        jsonpCallback: 'callback'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        var azclassid = data['android-classid'];
                        // 获取配置json 里安卓栏目分类id
                        var iosclassid = data['ios-classid'];
                        // 获取配置json 里苹果栏目分类id
                        var downsize = $(ele).find('.f-game-size').text();
                        // 获取应用大小
                        var classid = $(ele).find('.f-information').attr('data-categroyId');
                        // 获取应用子分类ID 子栏目ID号
                        var rootid = $(ele).find('.f-information').attr('data-rootid');
                        // 获取应用主分类ID  主栏目ID号
                        var downattr = $(ele).find('.f-information').attr('data-attr');
                        // 获取应用是否为下架资源
                        var downurl = $(ele).find('.f-information').attr('data-downurl');
                        // 获取应用原始下载地址
                        var rootnum = parseInt(rootid, 0);
                        var classidnum = parseInt(classid, 0);
                        // 转换为纯数字
                        var qqun = '';
                        var drurl = $(ele).find('#address').attr('href');
                        // 获取当前页面的下载地址
                        var xiajiaok = data['rexiajiayuyueopen'];
                        // 获取配置json 是否下架开关
                        var xiajiaid = data['xiajiaid'];
                        // 获取配置json 下架栏目ID号
                        if ((downattr === '下架' || downurl === '') && xiajiaok && $.inArray(rootnum, xiajiaid) !== -1) {
                            xiajiaOpen();
                            return false;
                        }
                        if (drurl === fromnodown || drurl === 'javascript:;' || downsize === '0KB' || drurl === '') {
                            // 判断 是 没有下载地址
                            if (xiajiaok && $.inArray(rootnum, xiajiaid) !== -1) {
                                xiajiaOpen();
                                return false;
                            } else {
                                yuyueOpen();
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
                            // 有下载地址
                            var sys = '';
                            var colsys = '';
                            var tiyes = '';
                            var firname = $(ele).find('.f-tags-box li').eq(0).find('p').text();
                            if (platform.isIos()) {
                                // 是苹果设备
                                var sys = '苹果';
                                if ($.inArray(classidnum, azclassid) !== -1) {
                                    // 访问的是安卓资源
                                    var colsys = '安卓';
                                    var tiyes = 'yes';
                                }
                            } else {
                                // 是安卓设备
                                var sys = '安卓';
                                if ($.inArray(classidnum, iosclassid) !== -1) {
                                    // 访问的是ios资源
                                    var colsys = '苹果';
                                    var tiyes = 'yes';
                                }
                            }
                            if ($.inArray(classidnum, iosclassid) === -1 && $.inArray(classidnum, azclassid) === -1) {
                                // 是PC端资源
                                var colsys = 'pc';
                                var tiyes = 'yes';
                            }
                            var titshi = '<p class="m-tisp1"><i></i>检测到您是' + sys + '设备，';
                            titshi += '点击下载的是：<span>' + firname + '</span></p>';
                            // 有地址的情况切换
                            if (tiyes === 'yes') {
                                $(ele).find('#downAddress ul').after(titshi);
                            }
                        }
                    });
                };
            }
            function xiajiaOpen() {
                $(ele).find('#address').text('该应用已下架');
                $(ele).find('#address').removeClass('m-yuyueok').attr('href', 'javascript:;');
                $(ele).find('#address').css('background', '#8c8c8c');
            }
            function yuyueOpen() {
                $(ele).find('#address').css('background', btncolor).text('立即预约');
                $(ele).find('#address').attr('href', 'javascript:;').addClass('m-yuyueok');
            }
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
                            return false;
                        };
                        var yyphone = $(ele).find('#f-yyPhone').val();
                        var yyqq = $(ele).find('#f-QQ').val();
                        var phonereg = /^1[\d]{10}$/;
                        // 手机号段设置
                        if (yyphone !== '') {
                            if (!phonereg.test(yyphone)) {
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
                    $(ele).find('.g-yuyue,.g-yuyuebg').hide();
                });
            }
        }
    };
    return customElement;
});