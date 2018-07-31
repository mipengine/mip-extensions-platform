/**
 * @file mip-otto-common 组件
 * @author xinbao
 */

define(function (require) {
    'use strict';

    const customElement = require('customElement').create();
    const viewport = require('viewport');
    const util = require('util');
    const Gesture = util.Gesture;
    const fetchJsonp = require('fetch-jsonp');

    let utilJs = (function () {
        let remFun = function (element) {
            let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            function recalc() {
                let clientWidth = viewport.getWidth();
                let UIWidth = element.params.basewidth;
                let baseFontSize = element.params.basefont;
                let result = ((clientWidth / UIWidth) * baseFontSize * 2).toFixed(2);
                document.querySelector('html').style.fontSize = result + 'px';
            }
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        };
        let urlRules = ['/h/', '/Course/', '/Tiku/', '/Book/', '/TikUserData/'];
        let isType = function () {
            let length = urlRules.length;
            let res;
            for (let i = 0; i < length; i++) {
                let p = new RegExp(urlRules[i].toLowerCase());
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
        let loadJs = function (url) {
            if (/^(https?:)?\/\//gi.test(url)) {
                let myHead = document.querySelector('head');
                let myScript = document.createElement('script');
                myScript.type = 'text/javascript';
                myScript.src = url;
                myHead.appendChild(myScript);
            }

        };
        let addKF = function (element) {
            let NTKF_PARAM = {
                siteid: 'kf_9009',
                uid: '',
                uname: '',
                userlevel: '0'
            };
            let sign = element.params.sign;

            if (sign) {
                let baseUrl = window.location.origin;
                if (window.location.origin.search(/wangxiao.cn/gi) < 0) {
                    baseUrl = 'http://wap2.wangxiao.cn';
                }

                let url = baseUrl + '/Pub/GetNtalkerSettingIdBySign?sign=' + sign;
                fetchJsonp(url, {
                    jsonpCallbackFunction: 'cb'
                })
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        if (data.ResultCode === 0) {
                            NTKF_PARAM.settingid = data.Data.NtalkerSettingId;
                        }

                    })
                    .then(function () {
                        let script4kf = document.createElement('script');
                        script4kf.text = 'var NTKF_PARAM =' + JSON.stringify(NTKF_PARAM);
                        script4kf.type = 'text/javascript';
                        document.querySelector('head').appendChild(script4kf);

                        // 此处引用小能客服js，由第三方提供服务支持，暂时无法做进一步封装
                        loadJs('https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=' + NTKF_PARAM.siteid);
                    });
            }

            let gestureKf = new Gesture(element.querySelector('.kf'));
            gestureKf.on('tap', function () {
                window.NTKF.im_openInPageChat(NTKF_PARAM.settingid);
            });
        };
        let go2top = function (element) {
            let threshold = 200;
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
        return {
            remFun: remFun,
            isType: isType,
            loadJs: loadJs,
            go2top: go2top,
            addkf: addKF
        };
    })();
    customElement.prototype.build = function () {
        let element = this.element;
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
        let config = element.querySelector('script[type="application/json"]');
        let data = config ? JSON.parse(config.textContent.toString()) : {};
        // 配置完成
        element.params = util.fn.extend(element.params, data);

        // 设置 rem
        if (element.params.rem) {
            utilJs.remFun(element);
        }

        // 设置悬浮
        function addFixed(element) {
            let temp = document.createElement('div');
            temp.classList.add('cfr');
            element.appendChild(temp);
            element.querySelector('.cfr').innerHTML = '<div class="cfr__kf kf">'
                + '<i class="cfr__kf_img"></i>'
                + '</div>'
                + '<div class="cfr__back2top hide" id="js__back2top">'
                + '<i class="cfr__back2top_img"></i>'
                + '</div>';
        }
        if (element.params.fixedright && element.params.sign) {
            addFixed(element);
            utilJs.addkf(element);
            utilJs.go2top(element);
        }
        else {
            console.warn('配置信息不完整。');
        }

        // 设定底部
        function addFooter(element) {
            let temp = document.createElement('ul');
            temp.classList.add('cFooter');
            element.appendChild(temp);
            element.querySelector('.cFooter').innerHTML = '<li class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--home"></i>'
                + '<p class="cFooter__itemText">首页</p>'
                + '</li>'
                + '<li class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--course"></i><p class="cFooter__itemText">课程</p>'
                + '</li>'
                + '<li class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--bank"></i><p class="cFooter__itemText">题库</p>'
                + '</li>'
                + '<li class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--book"></i><p class="cFooter__itemText">图书</p>'
                + '</li>'
                + '<li class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--my"></i><p class="cFooter__itemText">我的</p>'
                + '</li>';
        }
        if (element.params.fixedbottom) {
            // footer
            addFooter(element);
            let navIndex = utilJs.isType();
            let li = element.querySelectorAll('.cFooter__item');
            if (navIndex > -1) {
                li[navIndex].classList.add('hover');
            }
            else {
                console.warn('Route not match,reset to default');
                li[0].classList.add('hover');
            }
        }

        // 设定banner下载
        function addBanner(element) {
            let temp = document.createElement('div');
            temp.classList.add('getApp');
            element.appendChild(temp);
            element.querySelector('.getApp').innerHTML = '<span class="pageApp_close">×</span>'
                + ' <img class="pageApp_img" src="http://wap2.wangxiao.cn/content/website2/img/app_logo.png" alt="">'
                + '<span class="pageApp_title">准题库-考试通关听课刷题神器</span>'
                + '<a class="pageApp_btn" href="http://appconfig.wangxiao.cn/DownLoad/Index?sign=' + element.params.sign + '">免费下载</a>';
        }
        if (element.params.downbanner.enable) {
            addBanner(element);
        }

    };

    return customElement;
});
