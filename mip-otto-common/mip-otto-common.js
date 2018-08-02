/**
 * @file mip-otto-common 网校通用组件
 * @author xinbao
 * @date 2018年7月31日
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewport = require('viewport');
    var util = require('util');
    var Gesture = util.Gesture;
    var fetchJsonp = require('fetch-jsonp');

    var utilJs = (function () {
        var remFun = function (element) {
            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            function recalc() {
                var clientWidth = viewport.getWidth();
                var UIWidth = element.params.basewidth;
                var baseFontSize = element.params.basefont;
                var result = ((clientWidth / UIWidth) * baseFontSize * 2).toFixed(2);
                document.querySelector('html').style.fontSize = result + 'px';
            }
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        };
        var urlRules = ['/h/', '/Course/', '/Tiku/', '/Book/', '/TikUserData/'];
        var isType = function () {
            var length = urlRules.length;
            var res;
            for (var i = 0; i < length; i++) {
                var p = new RegExp(urlRules[i].toLowerCase());
                if (p.test(window.location.href.toLowerCase())) {
                    res = i;
                    return res;
                }
                else {
                    res = -1;
                }
            }
            return res;
        };
        var loadJs = function (url) {
            if (/^(https?:)?\/\//gi.test(url)) {
                var myHead = document.querySelector('head');
                var myScript = document.createElement('script');
                myScript.type = 'text/javascript';
                myScript.src = url;
                myHead.appendChild(myScript);
            }

        };
        var addKF = function (element) {
            var NTKF_PARAM = {
                siteid: 'kf_9009',
                uid: '',
                uname: '',
                userlevel: '0'
            };
            var sign = element.params.sign;

            if (sign) {
                var baseUrl = window.location.origin;
                if (window.location.origin.search(/wangxiao.cn/gi) < 0) {
                    baseUrl = 'http://wap2.wangxiao.cn';
                }

                var url = baseUrl + '/Pub/GetNtalkerSettingIdBySign?sign=' + sign;
                fetchJsonp(url)
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        if (data.ResultCode === 0) {
                            NTKF_PARAM.settingid = data.Data.NtalkerSettingId;
                        }

                    })
                    .then(function () {
                        var script4kf = document.createElement('script');
                        script4kf.text = 'var NTKF_PARAM =' + JSON.stringify(NTKF_PARAM);
                        script4kf.type = 'text/javascript';
                        document.querySelector('head').appendChild(script4kf);

                        // 此处引用小能客服js，由第三方提供服务支持，暂时无法做进一步封装
                        loadJs('https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=' + NTKF_PARAM.siteid);
                    });
            }

            var gestureKf = new Gesture(element.querySelector('.kf'));
            gestureKf.on('tap', function () {
                window.NTKF.im_openInPageChat(NTKF_PARAM.settingid);
            });
        };
        var go2top = function (element) {
            var threshold = 200;
            function toggle(element) {
                if (viewport.getScrollTop() > threshold) {
                    element.querySelector('#js__back2top').classList.remove('hide');
                }
                else {
                    element.querySelector('#js__back2top').classList.add('hide');
                }
            }
            toggle(element);
            viewport.on('scroll', function () {
                toggle(element);
            });
            element.addEventListener(
                'click', function () {
                    viewport.setScrollTop(0);
                },
                false
            );
        };
        var toggleBar = function (element) {
            var threshold = 200;
            function toggle(element) {
                if (viewport.getScrollTop() > threshold) {
                    element.querySelector('.getApp').classList.remove('hide');
                }
                else {
                    element.querySelector('.getApp').classList.add('hide');
                }
            }
            toggle(element);
            viewport.on('scroll', function () {
                toggle(element);
            });
            element.addEventListener(
                'click', function () {
                    viewport.setScrollTop(0);
                },
                false
            );
        };
        function addFixed(element) {
            var temp = document.createElement('div');
            temp.classList.add('cfr');
            element.appendChild(temp);
            element.querySelector('.cfr').innerHTML = '<div class="cfr__kf kf">'
                + '<i class="cfr__kf_img"></i>'
                + '</div>'
                + '<div class="cfr__back2top hide" id="js__back2top">'
                + '<i class="cfr__back2top_img"></i>'
                + '</div>';
        }
        function addFooter(element) {
            var temp = document.createElement('div');
            temp.classList.add('cFooter');
            element.appendChild(temp);
            element.querySelector('.cFooter').innerHTML = '<a href="mip/h/@(Sign).html" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--home"></i>'
                + '<p class="cFooter__itemText">首页</p>'
                + '</a>'
                + '<a href="/Course/Index?sign=@(Sign)" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--course"></i><p class="cFooter__itemText">课程</p>'
                + '</a>'
                + '<a href="/Tiku/?sign=@(Sign)" href="/Tiku/?sign=@(Sign)" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--bank"></i><p class="cFooter__itemText">题库</p>'
                + '</a>'
                + '<a href="/Book/?sign=@(Sign)" class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--book"></i><p class="cFooter__itemText">图书</p>'
                + '</a>'
                + '<a href="/TikuUserData/Personal/?sign=@(Sign)" class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--my"></i><p class="cFooter__itemText">我的</p>'
                + '</a>';
        }
        function addBanner(element) {
            var temp = document.createElement('div');
            temp.classList.add('getApp');
            temp.classList.add('hide');
            element.appendChild(temp);
            element.querySelector('.getApp').innerHTML = '<span class="pageApp_close">×</span>'
                + '<img class="pageApp_img" src="http://wap2.wangxiao.cn/content/website2/img/app_logo.png" alt="">'
                + '<span class="pageApp_title">准题库-考试通关听课刷题神器</span>'
                + '<a class="pageApp_btn" href="http://appconfig.wangxiao.cn/DownLoad/Index?sign=' + element.params.sign + '">免费下载</a>';
            element.querySelector('.pageApp_close').addEventListener('click', function () {
                this.parentElement.classList.add('hide');
            });
        }
        return {
            remFun: remFun,
            isType: isType,
            loadJs: loadJs,
            go2top: go2top,
            addkf: addKF,
            toggleBar: toggleBar,
            addFixed: addFixed,
            addFooter: addFooter,
            addBanner: addBanner
        };
    })();
    customElement.prototype.build = function () {
        var element = this.element;
        window.NTKF;
        // 配置默认参数
        element.params = {
            rem: false,
            basewidth: 750,
            basefont: 20,
            fixedright: false,
            fixedbottom: false,
            downbanner: {
                enable: false,
                position: 'top'
            }
        };
        // 格式化自定义参数
        var config = element.querySelector('script[type="application/json"]');
        var data = config ? JSON.parse(config.textContent.toString()) : {};
        // 配置完成
        element.params = util.fn.extend(element.params, data);

        // 设置 rem
        if (element.params.rem) {
            utilJs.remFun(element);
        }

        // 设置悬浮

        if (element.params.fixedright && element.params.sign) {
            utilJs.addFixed(element);
            utilJs.addkf(element);
            utilJs.go2top(element);
        }
        else {
            console.warn('配置信息不完整。');
        }

        // 设定底部
        if (element.params.fixedbottom) {
            // footer
            utilJs.addFooter(element);
            var navIndex = utilJs.isType();
            var li = element.querySelectorAll('.cFooter__item');
            if (navIndex > -1) {
                li[navIndex].classList.add('hover');
            }
            else {
                console.warn('Route not match,reset to default');
                li[0].classList.add('hover');
            }
        }

        // 设定banner下载

        if (element.params.downbanner.enable) {
            utilJs.addBanner(element);
            // utilJs.toggleBar(element);
        }

    };

    return customElement;
});
