/**
 * @file 看准页面统计
 * @author wangshikun@kanzhun.com
 * */
define(function (require) {
    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var utils = require('./utils/util');
        var cookie = require('./utils/cookie');
        var path = require('./utils/path');
        var util = require('util');
        var $that = this;

        // 当前秒数
        var nowMillions = new Date().getTime();

        // 是否修改过cookie
        var cookieModifyCalled = false;

        /*
         cookies:

         __l: session cookie: landing page of current session
         __s: session cookie, injected when session start, it's value is current sessions
         __a: uniqueId, initVisitTime, previousSessionTime, currentSessionTime, totalPages, sessions, sessionPages(concat by ., expire in the far future: 10 years

         totolPages:   total pages this visitor has visit this site, duplicate count.
         sessions:     no. of sessions
         sessionPages: how many pages this visitor has visit since the start of this session
         */
        var UTMA = '__a'; //
        var UTMC = '__c'; // 当前session开始时间
        var LAND_FROM = '__l'; // landing页面: {s: session_landing, g: sid_landing}
        var AD_C = '__g'; // 广告sid

        // 过去当前时间的秒数
        function currentTimeInSecond() {
            return Math.round(new Date().getTime() / 1000);
        }

        /**
         * 获取参数
         * @param  {Object}  extras   额外的参数
         * @param  {boolean} isEvent  是否带事件（在点击ka元素、js出错时为true）
         * @return {Object}           完整的参数
         */
        function getParams(extras, isEvent) {
            var cookieNames = [UTMA, LAND_FROM, AD_C, 't', 'ab_t'];
            var params = {};

            for (var i = 0; i < cookieNames.length; i++) {
                var name = cookieNames[i];
                var c = cookie.readCookie(name);
                if (c) {
                    params[name] = c;
                }
            }

            var referrer = document.referrer;
            if (referrer) {
                if (location.hostname === path.getHostname(referrer)) {
                    referrer = path.removeDomain(referrer, location.hostname);
                }
            }

            if (isEvent) {
                params['e'] = new Date().getTime() - nowMillions;
            } else {
                if (window.performance && window.performance.timing) {
                    var t = window.performance.timing;
                    if (t.fetchStart) {
                        // 端到端时间
                        params['e'] = nowMillions - t.fetchStart;
                    }
                }
            }

            params.r = referrer;
            params['_'] = currentTimeInSecond();

            // 页面可以指定page_key
            var pageKey = $that.element.querySelector('#page_key_name');
            if (pageKey) {
                pageKey = pageKey.getAttribute('value');
                if (pageKey) {
                    params['pk'] = pageKey;
                }
            }

            // 合并额外数据
            if (extras) {
                for (var key in extras) {
                    params[key] = extras[key];
                }
            }

            return params;
        }

        // 设置与修改Cookie，在统计发生时会被调用
        function setAndModifyCookiesIfNeeded() {

            // 是否修改过cookie
            if (cookieModifyCalled) {
                return;
            }
            cookieModifyCalled = true;

            var utma = cookie.readCookie(UTMA);
            var utmc = cookie.readCookie(UTMC); // session cookie

            var landings = path.parseParams(cookie.readCookie(LAND_FROM), '&');

            var seconds = currentTimeInSecond();

            if (!utmc || !landings.l) {
                landings.l = path.removeDomain(location.href); // session 着陆页
            }

            // 用户新landing，把landing的referrer设置为document.referrer
            if (!utmc) {
                landings.r = document.referrer;
            }

            // 创建新session
            if (!utmc) {
                cookie.createCookie(UTMC, seconds);
                utmc = seconds + ''; // to string
            }

            // 广告
            var sid = path.getQueryVariable('sid');
            var isNewSid = false;

            if (sid) {
                // 更新sid
                if (sid !== cookie.readCookie(AD_C)) {
                    isNewSid = true;
                }
                cookie.createCookie(AD_C, sid);
                landings.g = path.removeDomain(location.href);
            } else {
                // 创建广告sid Cookie
                sid = cookie.readCookie(AD_C);
                // TODO
                if (!sid) { // we always has a sid
                    sid = '-';
                    cookie.createCookie(AD_C, sid);
                }
            }

            // 创建landing Cookie
            cookie.createCookie(LAND_FROM, path.packParams(landings, '&'));

            var uniqueId;
            var initVisitTime;
            var previousSessionTime;
            var currentSessionTime;
            var totalSeq;
            var sessions;
            var sessionSeq;
            var sidSeq;

            if (utma && utma.split('.').length === 8) {
                // old user
                var parts = utma.split('.');
                uniqueId = parts[0];
                initVisitTime = parts[1];
                previousSessionTime = parts[2];
                currentSessionTime = parts[3];
                totalSeq = +parts[4]; // convert to int
                sessions = +parts[5];
                sessionSeq = +parts[6];
                sidSeq = +parts[7];

                totalSeq += 1;

                if (currentSessionTime !== utmc) { // a new session
                    previousSessionTime = currentSessionTime;
                    currentSessionTime = utmc;
                    sessions += 1;
                    sessionSeq = 1;
                } else {
                    sessionSeq += 1;
                }
            } else {
                // new user
                uniqueId = Math.floor(Math.random() * 100000000); // 8 digits
                initVisitTime = seconds;
                previousSessionTime = '';
                currentSessionTime = utmc;
                totalSeq = 1;
                sessions = 1;
                sessionSeq = 1;
                sidSeq = 0;
            }

            if (isNewSid) {
                sidSeq = 0;
            }

            sidSeq += 1;

            utma = [
                uniqueId,
                initVisitTime,
                previousSessionTime,
                currentSessionTime,
                totalSeq,
                sessions,
                sessionSeq,
                sidSeq
            ].join('.');

            // 创建UTMA Cookie
            if (utils.inProduction) {
                if (location.hostname.indexOf('kanzhun.com') >= 0) {
                    cookie.createCookie(UTMA, utma, 365 * 10, '.kanzhun.com'); // 10 years
                } else {
                    // do not erase cookie
                    cookie.createCookie(UTMA, utma, 365 * 10); // 10 years
                }
            } else {
                cookie.createCookie(UTMA, utma, 365 * 10); // 10 years
            }
        }

        // 统计页面PV，此方法是公共方法，可导出调用，默认在页面一进来就会调用一次
        function sendPageView() {
            setAndModifyCookiesIfNeeded();
            utils.loadImg('/_.gif', getParams());
        }

        /**
         * 统计点击与js报错（'button', 'click', 'nav buttons', 4）
         * @param  {string} label 统计字段（ka值、errrorjs、impression）
         * @param  {[type]} p1    [description]
         * @param  {[type]} p2    [description]
         * @param  {[type]} p3    [description]
         */
        function sendEvent(label, p1, p2, p3) {
            if (!label) {
                throw 'event track\'s label params is required';
            }
            setAndModifyCookiesIfNeeded();
            var toSent = {'ca': label};

            function addParams(data, key, value) {
                value = cleanEventParams(value);
                if (value) {
                    data[key] = value;
                }
            }

            function cleanEventParams(val) {
                if (!val || val.indexOf('javascript') === 0) {
                    return '';
                }
                return val;
            }

            // 添加参数
            addParams(toSent, 'p1', p1);
            addParams(toSent, 'p2', p2);
            addParams(toSent, 'p3', p3);

            // 获取所有并发送统计
            var params = getParams(toSent, true);
            utils.loadImg('/e.gif', params);
        }

        // 设置全局变量
        window._T = {
            config: function (args) {
                args = args || {};
            },
            sendPageView: sendPageView,
            sendEvent: sendEvent
        };

        // 统计PV
        sendPageView();

        // 在生产环境中调用
        if (utils.inProduction) {
            // fix a bug. will create 2 cookies. Can't login
            var login = cookie.readCookie('t');
            if (login && location.hostname) {
                cookie.removeCookie('t');
                cookie.createCookie('t', login, 365 * 10);
            }
        }

        (function () {
            window.Upp = function (url) {
                this._url = url;
                this.init();
            };

            window.Upp.prototype = {

                // 初始化
                init: function () {
                    this._params = {};

                    // 锚点
                    var urlArr = this._url.split('#');
                    var anthor = urlArr[1];

                    if (anthor) {
                        this._params.__anthor = anthor;
                    }

                    var addressPair = urlArr[0].split('?');
                    var i = 0;
                    var keypairs = [];
                    this.host = addressPair[0].replace(/#.+/, '');

                    if (addressPair.length > 1) {
                        keypairs = addressPair[1].split('&');
                        for (; i < keypairs.length; i++) {
                            var keypair = keypairs[i].split('=');
                            if (keypair.length === 2) {
                                this.add(keypair[0], keypair[1]);
                            }
                        }
                    }
                },

                // 添加参数
                add: function (key, value) {
                    this._params[key] = value;
                    return this;
                },

                // 删除参数
                remove: function (key) {
                    delete this._params[key];
                    return this;
                },

                // 是否存在参数
                contains: function (key, value) {
                    return this._params[key] !== undefined;
                },

                // 更新参数
                update: function (key, value) {
                    this._params[key] = value;
                },

                // 获取参数
                get: function (key) {
                    return this._params[key];
                },

                // 获取所有参数
                all: function () {
                    return this._params;
                },

                // 将参数转换为url
                url: function () {
                    var queryStrings = [];
                    var anthor = '';
                    for (var key in this._params) {
                        if (key !== '__anthor') {
                            queryStrings.push(key + '=' + this._params[key]);
                        } else {
                            anthor = '#' + this._params[key];
                        }
                    }
                    return this.host + (queryStrings.length > 0 ? '?' : '') + queryStrings.join('&') + anthor;
                }
            };

            if (window._T) {
                var documentBody = document.querySelector('body');
                util.event.delegate(documentBody, 'body', 'click', function (e) {
                    var target = e.target || e.srcElement;
                    while (target !== document && target !== document.body && !target.getAttribute('ka')
                        && !target.getAttribute('p2') && !target.getAttribute('p3') && target.parentNode
                    ) {
                        target = target.parentNode;
                    }

                    var ka = target.getAttribute('ka');
                    var p2 = target.getAttribute('p2');
                    var p3 = target.getAttribute('p3') || '';

                    if (ka) {
                        var href = target.getAttribute('href') || '';

                        if (href && href.indexOf('#') !== 0 && href.indexOf('javascript:;') === -1
                            && !target.getAttribute('noa')
                        ) {
                            var u = new window.Upp(href);

                            // 加白名单判断--start
                            var whiteLlist = ['bosszhipin.com', 'zhipin.com', 'kanzhun.com'];
                            var len = whiteLlist.length;
                            var flag = false;
                            if (href.indexOf('http://') >= 0 || href.indexOf('https://') >= 0) {
                                for (var i = 0; i < len; i++) {
                                    if (href.indexOf(whiteLlist[i]) >= 0) {
                                        flag = true;
                                        break;
                                    }
                                }
                            } else {
                                flag = true;
                            }
                            if (flag) {
                                u.add('ka', encodeURIComponent(ka));
                            }
                            // 加白名单判断--end

                            target.setAttribute('href', u.url());
                        }

                        window._T.sendEvent(ka, '', p2, p3, href);
                    }
                }, false);
            }
        })();
    };

    return customElem;

});