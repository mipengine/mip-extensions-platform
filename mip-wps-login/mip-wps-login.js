/**
 * @file mip-wps-login 组件
 * @author huangjing02
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var isIframed = viewer.isIframed;

    var viewport = require('viewport');

    /* global MIP,passport */

    function loadJS(src, success, fail) {

        var ref = document.getElementsByTagName('script')[0];
        var script = document.createElement('script');
        // src 为 百度pass账号服务
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
        script.onload = function () {
            script = null;
            success();
        };
        script.onerror = function (e) {
            script = null;
            fail();
        };
    }

    // 解析query
    function parse(query) {
        var res = {};
        query = query.split('&');
        var key;
        var value;
        query.forEach(function (item) {
            if (!item) {
                return;
            }

            item = item.split('=');
            key = item[0];
            value = item.length >= 2
                ? decodeURIComponent(item[1])
                : null;

            if (res[key]) {
                if (!Array.isArray(res[key])) {
                    res[key] = [res[key]];
                }
                res[key].push(value);
            }
            else {
                res[key] = value;
            }
        });

        return res;
    }

    function isBaiduDomain(url) {
        return url.indexOf('.baidu.com') >= 0;
    }

    function handleJump(result, element) {
        var state = MIP.hash.get('state') || '';
        var redirectUrl = decodeURIComponent(MIP.hash.get('redirect_uri') || '');
        var redirectTitle = decodeURIComponent(MIP.hash.get('redirect_title') || '');

        // 登录成功
        if (result) {
            // 出toast提示登录成功
            viewer.eventAction.execute('toast', element, {});
            // 分析url
            var isBaidu = isBaiduDomain(redirectUrl);

            setTimeout(function () {
                // 从url 里获取参数，如果有重定向的地址且为百度域，就直接replace，否则走正常逻辑
                if (isIframed) {
                    if (!isBaidu) {
                        viewer.sendMessage(
                            'pass-login-success',
                            {
                                state: state
                            }
                        );
                    }
                    else {
                        viewer.sendMessage(
                            'loadiframe',
                            {
                                url: redirectUrl,
                                query: {
                                    // nochche的参数需要了解一下
                                    nocache: 1,
                                    title: redirectTitle
                                },
                                click: {
                                    replace: 1
                                }
                            }
                        );
                    }
                }
                else if (isBaidu) {
                    location.href = redirectUrl;
                }
                else {
                    location.href = 'https://m.baidu.com';
                }
            }, 800);
        }
    }

    function bindEvents(element) {
        var changeLogin = element.querySelector('#' + element.dataset['change']);
        var link = element.querySelector('#' + element.dataset['link']);
        var changeLoginUrl = element.dataset['changeurl'];
        var linkUrl = element.dataset['linkurl'];

        var state = MIP.hash.get('state') || '';
        var redirectUrl = decodeURIComponent(MIP.hash.get('redirect_uri') || '');
        var redirectTitle = decodeURIComponent(MIP.hash.get('redirect_title') || '');

        changeLogin.addEventListener('click', function () {
            if (!passport) {
                throw '初始化异常，请稍后重试';
            }
            if (isIframed) {
                viewer.sendMessage(
                    'loadiframe',
                    {
                        url: changeLoginUrl,
                        query: {
                            state: state,
                            nocache: 1,
                            title: '登录',
                            /* eslint-disable fecs-camelcase */
                            redirect_uri: redirectUrl,
                            redirect_title: redirectTitle
                            /* eslint-enable fecs-camelcase */
                        },
                        click: {
                            replace: 1
                        }
                    }
                );
            }
            else {
                location.replace(changeLoginUrl + window.top.location.search);
            }
        }, false);

        link.addEventListener('click', function () {
            if (!passport) {
                throw '初始化异常，请稍后重试';
            }
            window.top.location.href = linkUrl;
        });
    }

    function init(element) {
        var login;
        var enterClass = element.getAttribute('enterClass') || '';
        var con = element.dataset['con'];
        var type = element.dataset['type'] || 'login';

        passport.use(con, {
            defaultCss: true
        }, function (magic) {
             /* eslint-disable babel/new-cap*/
            if (type === 'login') {
                login = new magic.passport.login({
                    product: 'cambrian',
                    u: '',
                    loginTip: '',
                    autosuggest: true,
                    overseas: 0,
                    staticPage: 'https://xiongzhang.baidu.com/opensc/static/wps/v3Jump.html'
                });
            }
            else {
                login = new magic.passport.smsLogin({
                    product: 'cambrian',
                    u: '',
                    phone: '',
                    smsRegTip: 1,
                    overseas: 0,
                    adapter: 3,
                    staticPage: 'https://xiongzhang.baidu.com/opensc/static/wps/v3Jump.html'
                });
            }
            /* eslint-enable babel/new-cap*/
            login.on('render', function (rsp) {
                rsp.returnValue = false;
                element.classList.add(enterClass);
            });

            login.on('loginSuccess', function (rsp) {
                rsp.returnValue = false;
                handleJump(true, element);
            });

            login.render(con);

        });
    }

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;

        loadJS(
            // 调用百度pass账号服务
            'https://wappass.baidu.com/static/touch/js/api/wrapper.js?cdnversion=' + new Date().getTime(),
            function () {
                init(element);
            },
            function () {
                element.innerHTML = '初始化异常';
            }
        );
        bindEvents(element);
    };

    return customElement;
});
