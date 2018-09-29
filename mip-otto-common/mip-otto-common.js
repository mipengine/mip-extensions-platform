/**
 * @file mip-otto-common 网校通用组件
 * @author xinbao
 * @date 2018年9月27日
 * @desc 更新内部链接，更灵活健壮
 * @desc 新增百度im切换
 * @desc fetch的body写法有兼容性问题，回退普通模式
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
        var loadJs = function (url, option) {
            if (/^(https?:)?\/\//gi.test(url)) {
                var position;
                if (!!option && option === 'body') {
                    position = 'body';
                }
                else {
                    position = 'haed';
                }
                var myScript = document.createElement('script');
                myScript.type = 'text/javascript';
                myScript.src = url;
                document.querySelector(position).appendChild(myScript);
            }

        };
        var kf = function (type, that) {
            var gestureKf = new Gesture(that.element.querySelector('.kf'));
            if (type === 'baidu') {
                try {
                    var targetUrl = location.origin + location.pathname + location.search;
                    fetch('https://mip.wangxiao.cn/baidu/getJsSignature', {
                        method: 'POST',
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }),
                        body: 'url=' + targetUrl
                    }).then(function (res) {
                        return res.json();
                    }).then(function (res) {
                        if (res.code === '000000') {
                            return res.data;
                        }

                    }).then(function (data) {
                        var script = document.createElement('script');
                        script.async = true;
                        var targetUrl = encodeURIComponent(location.origin + location.pathname + location.search);
                        var imsearch = 'https://xiongzhang.baidu.com/sdk/c.js?appid=' + data.appid + '&timestamp=' + data.timestamp + '&nonce_str='
                            + data.nonce_str + '&signature=' + data.signature + '&url=' + targetUrl;
                        script.src = imsearch;
                        document.body.appendChild(script);
                    }).catch(function (err) {
                        alert(err);
                    });
                }
                catch (err) {
                    throw err;
                }
                gestureKf.on('tap', function () {
                    window.cambrian && window.cambrian.invokeBcpIM({
                        data: {
                            onlyWiseIM: true,
                            sourceUrl: location.href,
                            query: that.element.params.sign
                        },
                        success: function (res) {
                            console.log(res);
                        },
                        fail: function (err) {
                            throw err;
                        }
                    });
                });
            }
            else {
                window.NTKF;
                var NTKF_PARAM = {
                    siteid: 'kf_9009',
                    uid: '',
                    uname: '',
                    userlevel: '0'
                };

                if (!that.element.params.sign) {
                    return false;
                }

                var sign = that.element.params.sign;
                var baseUrl = window.location.origin;
                if (baseUrl.search(/wap.wangxiao.cn/gi) < 0) {
                    baseUrl = 'https://wap2.wangxiao.cn';
                }

                var url = baseUrl + '/Pub/GetNtalkerSettingIdBySign?sign=' + sign;
                fetchJsonp(url, {
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    if (res.ResultCode === 0) {
                        NTKF_PARAM.settingid = res.Data.NtalkerSettingId;
                    }

                    var script4kf = document.createElement('script');
                    script4kf.text = 'var NTKF_PARAM =' + JSON.stringify(NTKF_PARAM);
                    script4kf.type = 'text/javascript';
                    document.querySelector('head').appendChild(script4kf);
                    // 审核期间请看这里！！
                    // 此处引用小能客服js，由第三方提供服务支持，暂时无法做进一步封装，这里作为百度im的回退措施一般不生效。
                    // 望通过。
                    loadJs(
                        'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=' + NTKF_PARAM.siteid, 'body'
                    );
                    gestureKf.on('tap', function () {
                        window.NTKF.im_openInPageChat(NTKF_PARAM.settingid);
                    });
                });
            }
        };
        // var addKF = function (that) {};
        var go2top = function (element) {
            var threshold = 200;
            function toggle(element) {
                if (viewport.getScrollTop() > threshold) {
                    element
                        .querySelector('#js__back2top')
                        .classList.remove('hide');
                }
                else {
                    element
                        .querySelector('#js__back2top')
                        .classList.add('hide');
                }
            }
            toggle(element);
            viewport.on('scroll', function () {
                toggle(element);
            });
            element.querySelector('#js__back2top').addEventListener(
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
            element.querySelector('.cfr').innerHTML = '<div class="cfr__kf kf" >'
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
            var sign = element.params.sign;
            var base = (location.pathname.indexOf('mip') > -1) ? '/mip/' : '/';
            element.querySelector('.cFooter').innerHTML = '<a href="' + base + 'h/'
                + sign
                + '.html" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--home"></i>'
                + '<p class="cFooter__itemText">首页</p>'
                + '</a>'
                + '<a href="/Course/Index?sign='
                + sign
                + '" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--course"></i><p class="cFooter__itemText">课程</p>'
                + '</a>'
                + '<a href="/Tiku/?sign='
                + sign
                + '" class="cFooter__item">'
                + '<i class="cFooter__itemImg cFooter__itemImg--bank"></i><p class="cFooter__itemText">题库</p>'
                + '</a>'
                + '<a href="/Book/?sign='
                + sign
                + '" class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--book"></i><p class="cFooter__itemText">图书</p>'
                + '</a>'
                + '<a href="/TikuUserData/Personal/?sign='
                + sign
                + '" class="cFooter__item">'
                + ' <i class="cFooter__itemImg cFooter__itemImg--my"></i><p class="cFooter__itemText">我的</p>'
                + '</a>';
        }
        function addBanner(element) {
            var temp = document.createElement('div');
            temp.classList.add('getApp');
            element.appendChild(temp);
            element.querySelector('.getApp').innerHTML = '<span class="pageApp_close">×</span>'
                + '<mip-img class="pageApp_img" src="http://wap2.wangxiao.cn/content/website2/img/app_logo.png" alt=""></mip-img>'
                + '<span class="pageApp_title">准题库-考试通关听课刷题神器</span>'
                + '<a class="pageApp_btn" href="http://appconfig.wangxiao.cn/DownLoad/Index?sign='
                + element.params.sign
                + '">免费下载</a>';
            element
                .querySelector('.pageApp_close')
                .addEventListener('click', function () {
                    this.parentElement.classList.add('hide');
                });
        }
        return {
            remFun: remFun,
            isType: isType,
            loadJs: loadJs,
            go2top: go2top,
            toggleBar: toggleBar,
            addFixed: addFixed,
            addFooter: addFooter,
            addBanner: addBanner,
            kf: kf
        };
    })();
    customElement.prototype.build = function () {
        var that = this;
        var element = this.element;
        // 配置默认参数
        element.params = {
            rem: false,
            basewidth: 750,
            basefont: 20,
            fixedright: false,
            fixedbottom: false,
            kf: ['baidu', 'xiaoneng'],
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
            // utilJs.addkf(that);
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
                li[0].classList.add('hover');
            }
        }

        // 设定banner下载
        if (element.params.downbanner.enable) {
            utilJs.addBanner(element);
        }

        // 设定接入的客服
        if (element.params.kf[0] === 'baidu') {
            utilJs.kf('baidu', that);
        }
        else {
            utilJs.kf('xiaoneng', that);
        }
    };

    return customElement;
});
