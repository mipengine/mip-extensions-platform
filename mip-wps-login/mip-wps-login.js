/**
 * @file mip-wps-login 组件
 * @author huangjing02
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var isIframed = viewer.isIframed;

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

    function handleJump(result, errmsg) {
        var state = MIP.hash.get('state') || '';

        // 登录成功
        if (result) {
            if (isIframed) {
                viewer.sendMessage(
                    'pass-login-success',
                    {
                        state: state
                    }
                );
            }
            else {
                var search = location.search.split('?');
                var parseData = search[1] ? parse(search[1]) : {};
                var redirectUrl = parseData.redirect || 'https://m.baidu.com';
                location.href = decodeURIComponent(redirectUrl);
                // window.history.back();
            }
        }
    }

    function bindEvents(element) {
        var smsLogin = element.querySelector('#' + element.dataset['sms']);
        var problem = element.querySelector('#' + element.dataset['problem']);
        var state = MIP.hash.get('state') || '';

        smsLogin.addEventListener('click', function () {
            if (!passport) {
                throw '初始化异常，请稍后重试';
            }
            if (isIframed) {
                viewer.sendMessage(
                    'loadiframe',
                    {
                        url: 'https://xiongzhang.baidu.com/opensc/wps/smsLogin',
                        query: {
                            state: state,
                            nocache: 1,
                            title: '登录'
                        },
                        click: {
                            replace: 1
                        }
                    }
                );
            }
            else {
                location.replace('https://xiongzhang.baidu.com/opensc/wps/smsLogin' + window.top.location.search);
            }
        }, false);

        problem.addEventListener('click', function () {
            if (!passport) {
                throw '初始化异常，请稍后重试';
            }
            window.top.location.href = 'https://wappass.baidu.com/v3/security/manager';
        });
    }

    function init(element) {
        var login;
        passport.use(element.dataset['con'], {
            defaultCss: true
        }, function (magic) {
            /* eslint-disable babel/new-cap*/
            login = new magic.passport.login({
                product: 'cambrian',
                u: '',
                loginTip: '',
                autosuggest: true,
                overseas: 0,
                staticPage: 'https://xiongzhang.baidu.com/opensc/static/wps/v3Jump.html'
            });
            /* eslint-enable babel/new-cap*/

            login.on('render', function (rsp) {
                rsp.returnValue = false;

            });

            login.on('loginSuccess', function (rsp) {
                rsp.returnValue = false;
                handleJump(true);
            });

            login.render('login');

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
