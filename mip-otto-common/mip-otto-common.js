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
            function toggle() {
                if (viewport.getScrollTop() > threshold) {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            }
            toggle();
            viewport.on('scroll', function () {
                toggle();
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
            fixedright: false
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
        if (
            element.params.fixedright
            && element.params.sign
            && element.querySelector('.kf')
        ) {
            let cfr = element.querySelector('.cfr');
            cfr.style.display = 'block';
            utilJs.addkf(element);
            let goTop = element.querySelector('#js__back2top');
            utilJs.go2top(goTop);
        }
        else {
            console.log('配置信息不完整。');
        }
    };

    return customElement;
});
