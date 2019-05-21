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
 * 1.0.5 根据主管需求，修改提示文字
 * 1.1.0 新增：苹果设备访问安卓资源，安卓设备访问苹果资源给出的提示。
 * 1.1.1 升级less文件背景图片为https。
 * 1.1.2 修改提示描述
 * 1.1.3 根据百度手机助手 百度-黄奥 的需求，修改文本提示。
 * 1.2 根据栏目，不同栏目改为下架的提示，其余改为预约的提示。
 * 1.2.1 增加单独的，针对下架的提示.
 * 1.2.2 新增一种更合理的判断方式
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
        var phpopid = $(ele).find('.f-information').attr('data-phpurl');
        // 获取配置文件地址,
        if (phpopid !== undefined) {
            document.onreadystatechange = subSomething;
            function subSomething() {
                if (document.readyState === 'loaded' || document.readyState === 'complete') {
                // 页面加载完成,
                    fetchJsonp('https://ca.6071.com/web/index/c/' + phpopid, {
                        jsonpCallback: 'callback'
                    }).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        var azclassid = data['android-classid'];
                        // 获取配置json 里安卓栏目分类id
                        var iosclassid = data['ios-classid'];
                        // 获取配置json 里苹果栏目分类id
                        var downsize = $(ele).find('.f-game-size').text();
                        // 获取当前应用大小
                        var classid = $(ele).find('.f-information').attr('data-categroyId');
                        // 获取应用子分类ID 子栏目ID号
                        var rootid = $(ele).find('.f-information').attr('data-rootid');
                        // 获取应用主分类ID  主栏目ID号
                        var downattr = $(ele).find('.f-information').attr('data-attr');
                        // 获取应用原始下载地址
                        // 需要获取当前页面应用的不同属性来进行判断操作，均为不同属性，并非无故查询。
                        var rootnum = parseInt(rootid, 0);
                        var classidnum = parseInt(classid, 0);
                        var qqun = '';
                        var lowerOk = $(ele).find('#address').attr('lowerok');
                        var drurl = $(ele).find('#address').attr('href');
                        // 获取当前页面的下载地址
                        var xiajiaok = data['rexiajiayuyueopen'];
                        // 获取配置json 是否下架开关
                        var xiajiaid = data['xiajiaid'];
                        // 获取配置json 下架栏目ID号
                        if (drurl === fromnodown || drurl === 'javascript:;' || drurl === '' || downattr === '下架') {
                            // 判断 是 没有下载地址 或者是下架属性
                            if (platform.isIos()) {
                                // 苹果设备访问
                                if (lowerOk !== 'yes' && $.inArray(classidnum, iosclassid) !== -1) {
                                    // 判断 lowerok 值不为yes 同时 当前页面id是苹果资源
                                    if (xiajiaok && $.inArray(rootnum, xiajiaid) !== -1) {
                                    // 判断下架开关状态，同时 判断是否是下架应用栏目，必须套if。
                                        xiajiaOpen();
                                        return false;
                                    } else {
                                        // 添加预约的提示,执行预约操作
                                        yuyueOpen();
                                        addYuyue();
                                    }
                                    // 下架开关和是否是下架栏目判断结束
                                } else {
                                    $(ele).find('#address').text('暂无苹果版').attr('href', 'javascript:;');
                                    $(ele).find('#address').css({'background': '#ccc', 'color': '#fff'});
                                }
                            } else {
                                if (lowerOk !== 'yes' && $.inArray(classidnum, azclassid) !== -1) {
                                    // 判断 lowerok 值不为yes 同时 当前页面的分类id是安卓资源
                                    if (xiajiaok && $.inArray(rootnum, xiajiaid) !== -1) {
                                        // 判断下架开关状态，同时 判断是否是下架应用栏目，必须套if。
                                        xiajiaOpen();
                                        return false;
                                    } else {
                                        // 添加预约的提示,执行预约操作
                                        yuyueOpen();
                                        addYuyue();
                                    }
                                    // 对安卓资源操作结束
                                } else {
                                    // 安卓设备访问非安卓资源提示！
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
                                    systxt = '该软件没有对应苹果版';
                                    // 苹果的提示
                                } else {
                                    systxt = '该软件没有对应安卓版';
                                    //  安卓提示，非重复声明！
                                }
                                $(ele).find('#address').text(systxt);
                            }
                        } else {
                            // 有下载地址
                            var sys = '';
                            var tiyes = '';
                            var firname = $(ele).find('.f-tags-box li').eq(0).find('p').text();
                            if (platform.isIos()) {
                                // 是苹果设备
                                var sys = '苹果';
                                if ($.inArray(classidnum, azclassid) !== -1) {
                                    // 访问的是安卓资源
                                    var tiyes = 'yes';
                                }
                            } else {
                                // 是安卓设备
                                var sys = '安卓';
                                if ($.inArray(classidnum, iosclassid) !== -1) {
                                    // 访问的是ios资源
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
                            if (tiyes === 'yes' && firname !== null) {
                                // 新增一个获取内容不为null的判断
                                $(ele).find('#downAddress ul').after(titshi);
                            }
                        }
                    });
                }
            }
        };
        function xiajiaOpen() {
            $(ele).find('#address').text('该应用已下架');
            $(ele).find('#address').removeClass('m-yuyueok').attr('href', 'javascript:;');
            $(ele).find('#address').css('background', '#8c8c8c');
        }
        function yuyueOpen() {
            $(ele).find('#address').css('background', btncolor).text('立即预约');
            $(ele).find('#address').attr('href', 'javascript:;').addClass('m-yuyueok');
        }
        function addYuyue() {
            // 获取数据
            fetchJsonp(yuyueurl + '/ajax.asp?action=33&id=0', {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var qqun = data.list[0].qqgroup;
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
                        return false;
                    };
                });
                $(ele).find('.f-yyclose').click(function () {
                    // 执行关闭操作
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
                alert('预约成功');
                $(ele).find('.g-yuyue,.g-yuyuebg').hide();
            });
        }
    };
    return customElement;
});
