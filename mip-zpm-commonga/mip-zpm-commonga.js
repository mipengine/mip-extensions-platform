/**
* @author: wangjx
* @date: 2017-04-19
* @file: mip-zpm-commonga.js
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var element = this.element;
        // 动态引入dywe.js,
        var dywe = document.createElement('script');
        dywe.type = 'text/javascript';
        dywe.async = true;
        dywe.src = 'https://img09.zhaopin.cn/2012/other/mobile/Mcontent/Scripts/dywe.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(dywe, s);
        // 动态引入dc.js,
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
        // 判断兼容
        // var isIE = !!window.ActiveXObject;
        // var isIE6 = isIE && !window.XMLHttpRequest;
        // var isIE8 = isIE && (document.documentMode === 8);
        // var isIE7 = isIE && !isIE6 && !isIE8;
        // if (isIE) {
            // var browser = navigator.appName;
            // var bversion = navigator.appVersion;
            // var version = bversion.split(';');
            // var trimVersion = version[1].replace(/[ ]/g, '');
            // isIE7 = isIE7 && (trimVersion === 'MSIE7.0' || document.documentMode === 7);
        // }
        // return {
            // isIE: isIE,
            // isIE6: isIE6,
            // isIE7: isIE7,
            // isIE8: isIE8
        // };
        // 初始化入口函数主对象ZP
        var ZP = {};
        ZP.analysis = {};
        ZP.analysis.monitorclassreg = /__ga__(\w+)_(\w+)_(((\d{3})_((\w+-\w+)|(\w+)))|(\d{3}))/;
        ZP.analysis.monitorclassselector = '[class *= __ga__]';
        // （匹配要统计点击对象，绑定click事件:initmonitoranaly）
        ZP.analysis.elementsanalysis = function (scope) {
            var zpa = ZP.analysis;
            scope = scope || document;
            var selects = zfqueryClass('__ga__');
            $.each(selects, function (key, value) {
                var monitordom = this;
                var jqmonitordom = $(this);
                var options = monitordom.className.match(zpa.monitorclassreg);
                if (!options) {
                    return true;
                }
                var category = options[1] || '';
                var action = options[2] || '';
                var listeners = options[6] || '';
                var index = (listeners === '' ? options[3] : options[5]);
                index = index ? index : '';
                if (listeners === '') {
                    ZP.analysis.bindclick(jqmonitordom, function () {
                        ZP.analysis.initmonitoranaly(monitordom, category, action, index);
                    }, 'ZP.analysis.initmonitoranaly(this,\'" + category + "\',\'" + action + "\',\'" + index + "\');');
                } else {
                    listeners = listeners.split('-');
                    for (var step = 0, len = listeners.length; step < len; step++) {
                        // 这里有遗留bug,需要与后台沟通：
                        switch (listeners(step)) {
                            case 'click':
                                var tttt = 'ZP.analysis.initmonitoranaly(this,\'" ';
                                tttt += '+ category + "\',\'" + action + "\',\'" + index + "\');';
                                ZP.analysis.bindclick(jqmonitordom, function () {
                                    ZP.analysis.initmonitoranaly(monitordom, category, action, index);
                                }, tttt);
                                break;
                            case 'mover':
                                jqmonitordom.hover(function (monitordom) {
                                    ZP.analysis.initmonitoranaly(monitordom, category, action, index);
                                }, function () {
                                });
                                break;
                        }
                    }
                }
            }
            );
        };
        // move和click触发的是同一方法，并且 switch (listeners(step))
        ZP.analysis.bindclick = function (scope, ie67Fun, w3Fun) {
            // scope传入的是zepoto
            // if (scope && (scope instanceof jQuery)) {
            var dom = scope.get(0);
            var funstr = dom.getAttribute('onclick') || '';
            dom.setAttribute('onclick', '');
            if ($.isIE6 || $.isIE7 || funstr instanceof Function) {
                if (ie67Fun instanceof Function) {
                    scope.click(ie67Fun);
                }
                if (funstr instanceof Function) {
                    scope.click(funstr);
                }
            } else {
                dom.setAttribute('onclick', w3Fun + ';' + funstr);
            }
            // else {
            //    return;
            // }
        };
        ZP.analysis.bindclick = function (scope, ie67Fun, w3Fun) {
            // scope传入的是zepoto
            // if (scope && (scope instanceof jQuery)) {
            var dom = scope.get(0);
            var funstr = dom.getAttribute('onclick') || '';
            dom.setAttribute('onclick', '');
            if ($.isIE6 || $.isIE7 || funstr instanceof Function) {
                if (ie67Fun instanceof Function) {
                    scope.click(ie67Fun);
                }
                if (funstr instanceof Function) {
                    scope.click(funstr);
                }
            } else {
                dom.setAttribute('onclick', w3Fun + ';' + funstr);
            }
        };
        // 热点绑定的入口函数
        // :标签：class=__ga__loginarea_persontag_001 cursor_p
        // 对应参数:(this,'loginarea','persontag','001')
        ZP.analysis.initmonitoranaly = function (dom, category, action, index) {
            if (index !== '') {
                action += index;
            }
            this.ontrackanaly({
                analyFun: function () {
                    if (dom && dom.tagName.toLowerCase() === 'a') {
                        recordOutboundLink(dom, category, action);
                    } else if (dom) {
                        dyweTrackEvent(category, action);
                    }
                }
            });
        };
        ZP.analysis.ontrackanaly = function (paramCfg) {
            var defaults = {
                beforeAnalyFun: new Function(),
                afterAnalyFun: new Function(),
                analyFun: new Function(),
                analyErrorFun: new Function(),
                category: '',
                action: '',
                scope: null,
                delay: 10
            };
            $.extend(defaults, paramCfg);
            try {
                defaults.beforeAnalyFun();
                defaults.analyFun();
            } catch (err) {
                defaults.analyErrorFun();
            } finally {
                setTimeout(defaults.afterAnalyFun, defaults.delay);
            }
        };
        // 主函数
        $(document).ready(function () {
            try {
                ZP.analysis.elementsanalysis();
            } catch (e) { }
        });
        dyweq.prototype.init = function () {
            this._dyweq.push(['_setAccount', window.acc4zpAnalytics || 'log000001']);
            this._dyweq.push(['_setDomainName', window.dom4zpAnalytics || '.zhaopin.com']);
            if (window.url4zpAnalytics) {
                this._dyweq.push(['_trackPageview', window.url4zpAnalytics]);
            } else {
                this._dyweq.push(['_trackPageview']);
            }
        };
        gaq.prototype.init = function () {
            this._gaq.push(['_setAccount', window.acc4googleAnalytics || 'UA-7874902-2']);
            this._gaq.push(['_setDomainName', window.dom4googleAnalytics || 'zhaopin.com']);
            this._gaq.push(['_addOrganic', 'youdao', 'q']);
            this._gaq.push(['_addOrganic', 'sogou', 'query']);
            this._gaq.push(['_addOrganic', 'soso', 'w']);
            this._gaq.push(['_addOrganic', '360', 'q']);
            if (window.url4googleAna) {
                this._gaq.push(['_trackPageview', window.url4googleAna]);
            } else {
                this._gaq.push(['_trackPageview']);
            }
        };
    };
    return customElem;
    // 数组_dyweq塞入数据
    function dyweq(name) {
        this._dyweq = this._dyweq || [];
    }
    // 数组_gaq塞入数据
    function gaq(name) {
        this._gaq = this._gaq || [];
    }
    // 如果热点是a链接，则触发
    function recordOutboundLink(link, category, action) {
        function ed(d, a) {
            var c = encodeURIComponent;
            return c instanceof Function ? (a ? encodeURI(d) : c(d)) : escape(d);
        }
        try {
            window._dywet._getTrackerByName()._trackEvent(category, action);
            try {
                window._gat._getTrackerByName()._trackEvent(category, action);
            } catch (err) { }
            if (link.target !== '_blank' && link.href) {
                setTimeout('document.location = "' + link.href + '"', 100);
            }
        } catch (err) {
            var i = new Image(1, 1);
            var e = document.location;
            i.src = 'http://lm.zhaopin.com/track_err.gif?dywee=5(' + category + '*' + action + ')&dywehn=' + ed(e.hostname) + '&dywep=' + ed(e.pathname + e.search, true);
        }
    }
    // 热点不是a，则触发
    function dyweTrackEvent(category, action) {
        function ed(d, a) {
            var c = encodeURIComponent;
            return c instanceof Function ? (a ? encodeURI(d) : c(d)) : escape(d);
        }
        try {
            window._dywet._getTrackerByName()._trackEvent(category, action);
            try {
                window._gat._getTrackerByName()._trackEvent(category, action);
            } catch (err) {
            }
        } catch (err) {
            var i = new Image(1, 1);
            var e = document.location;
            i.src = 'http://lm.zhaopin.com/track_err.gif?dywee=5(' + category + '*'
                + action + ')&dywehn=' + ed(e.hostname) + '&dywep='
                + ed(e.pathname + e.search, true);
        }
    }
    // 未使用
    function zfjudgeIE() {
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        var isIE8 = isIE && (document.documentMode === 8);
        var isIE7 = isIE && !isIE6 && !isIE8;
        if (isIE) {
            var browser = navigator.appName;
            var bversion = navigator.appVersion;
            var version = bversion.split(';');
            var trimVersion = version[1].replace(/[ ]/g, '');
            isIE7 = isIE7 && (trimVersion === 'MSIE7.0' || document.documentMode === 7);
        }
        return {
            isIE: isIE,
            isIE6: isIE6,
            isIE7: isIE7,
            isIE8: isIE8
        };
    }
    // 获取class包含某种标识的标签集合
    function zfqueryClass(strTag) {
        var classobj = [];
        var eleobj = [];
        var classint = 0;
        var tags = document.getElementsByTagName('*');
        for (var i in tags) {
            if (tags[i].nodeType === 1) {
                var classStr = tags[i].getAttribute('class');
                if (classStr != null && classStr !== undefined) {
                    if (classStr.indexOf(strTag) > -1)
                    {
                        eleobj.push(tags[i]);
                        classint++;
                    }
                }
            }
        }
        return eleobj;
    }
});
