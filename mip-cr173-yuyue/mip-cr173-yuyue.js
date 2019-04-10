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
        // 此处url只是用来判断和比对。
        var btncolor = ele.getAttribute('data-color');
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
        }
    };
    return customElement;
});