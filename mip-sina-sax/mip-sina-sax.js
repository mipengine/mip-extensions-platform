/**
 * @file mip-sina-sax 组件
 * @author fengzihao
 */
define(function (require) {
    var customElement = require('customElement').create();

    var sinaSax = (function () {
        var prtl = 'https:' === window.location.protocol ? 'https://' : 'http://';
        var timestamp = Date.now();
        var sinaSax = {
            saxType: {}, // 存储模板类型
            saxDomain: window.location.host,
            // id为数据源pdps的key; data为返回数据集的直接父级，多层嵌套用'-'分割,pv同理; urlFix为发送jsonp请求是额外字段
            sax: [
                {
                    'class': 'j_sax',
                    'url': prtl + 'sax.sina.cn/wap/impress',
                    'id': 'id',
                    'pv': 'content-0-pv',
                    'data': 'ad',
                    'urlFix': function () {
                        var am = sinaSax.getAMData(); // 反作弊
                        return '&rotate_count='
                            + (parseInt((isNaN(sinaSax.storage.getMode('sax_wap')))
                                ? (Math.random() * 1000)
                                : (sinaSax.storage.get('sax_wap')), 10)) + '&am=' + encodeURIComponent(am);
                    }
                },
                {
                    'class': 'j_native',
                    'url': prtl + 'sax.sina.cn/native/impress',
                    'id': 'pdps',
                    'pv': 'pvmonitor',
                    'urlFix': function () {
                        var am = sinaSax.getAMData(); // 反作弊
                        return '&rotate_count='
                            + (parseInt((isNaN(sinaSax.storage.getMode('sax_native')))
                                ? (Math.random() * 1000)
                                : (sinaSax.storage.get('sax_native')), 10)) + '&am=' + encodeURIComponent(am);
                    }
                }],

            init: function () {
                var iterator;
                var i = 0;
                var len = this.sax.length;
                for (; i < len; i++) {
                    this.sax[i].pdpsArr = [];
                    this.sax[i].pdpsNodes = this.sax[i].pdpsNodes || [];
                    this.sax[i].pdpsStr = this.sax[i].pdpsStr || [];
                    this.sax[i].pdpsNodes.push(this.getValidClass(this.getClass(this.sax[i].class)));
                    iterator = this.sax[i].pdpsNodes.length - 1;
                    this.sax[i].pdpsStr.push(this.getPdpsArr(this.sax[i].pdpsNodes[iterator]));
                }

                this.creatPvElement();
                this.getSaxType();
                this.ajaxHandle(iterator);
                if (location.hash.indexOf('preview') + 1) {
                    setTimeout(this.preview.call(this), 300);
                }

            },
            creatPvElement: function () {
                var id = 'sax_pv_count';
                if (!document.getElementById(id)) {
                    this.pvBox = this.creatElement('div', {id: id, style: 'display:none'});
                    document.body.appendChild(this.pvBox);
                }
                else {
                    this.pvBox = document.getElementById(id);
                }
            },
            getClass: function (value) {
                return document.getElementsByClassName(value);
            },
            getValidClass: function (dom) {
                var i = 0;
                var len = dom.length;
                var nodeArr = [];
                for (; i < len; i++) {
                    if (dom[i].getAttribute('loaded') !== 'loaded'
                        && dom[i].getAttribute('data-id')
                        && dom[i].getAttribute('sax-type')) {
                        dom[i].setAttribute('loaded', 'loaded');
                        nodeArr.push(dom[i]);
                    }
                }
                return nodeArr;
            },
            getCookie: function (ckName) {
                if (null == ckName || '' === ckName) {
                    return '';
                }
                return this.stringSplice(document.cookie, ckName, ';', '');
            },
            stringSplice: function (src, k, e, sp) {
                if (src === '') {
                    return '';
                }
                sp = (sp === '') ? '=' : sp;
                k += sp;
                var ps = src.indexOf(k);
                if (ps < 0) {
                    return '';
                }
                ps += k.length;
                var pe = src.indexOf(e, ps);
                if (pe < ps) {
                    pe = src.length;
                }

                return src.substring(ps, pe);
            },
            setCookie: function (key, value, expires, path, domain, m) {
                var s = [];
                s.push(key + '=' + escape(value));
                if (expires) {
                    var t = new Date();
                    var p = t.getTime() + expires * 3600000;
                    t.setTime(p);
                    s.push('expires=' + t.toGMTString());
                }
                if (path) {
                    s.push('path=' + path);
                }
                if (domain) {
                    s.push('domain=' + domain);
                }
                if (m) {
                    s.push(m);
                }
                document.cookie = s.join(';');
            },
            getRate: function (dom) {
                if (dom.dataset.rate) {
                    if (this.getCookie(dom.dataset.id)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            },
            getPdpsArr: function (nodeArr) {
                var pdpsStr = [];
                for (var i = 0, len = nodeArr.length; i < len; i++) {
                    pdpsStr.push(nodeArr[i].getAttribute('data-id'));
                }
                return pdpsStr.join(',');
            },
            ajaxHandle: function (iterator) {
                for (var i = 0, len = this.sax.length; i < len; i++) {
                    if (this.sax[i].pdpsStr[iterator]) {
                        var url = this.sax[i].url
                            + '?'
                            + 'adunit_id='
                            + this.sax[i].pdpsStr[iterator]
                            + '&page_url='
                            + encodeURIComponent(window.location.href)
                            + '&timestamp=' + timestamp;
                        url += this.sax[i].urlFix();
                        this.jsonp(url, this.callbackHandle, i, iterator, this.completeHandle
                            , 5000, this.timeoutFunHandle, this.sax[i].pdpsStr[iterator]);
                    }
                }
            },
            getSaxType: (function () {
                var count = 0;
                var foo = function () {
                    var script = document.querySelectorAll('.j_module');
                    var i = 0;
                    var len = script.length;
                    for (; i < len; i++) {
                        var saxType = script[i].getAttribute('sax-type');
                        if (saxType && !this.saxType.hasOwnProperty(saxType)) {
                            var id = 'sax_template_' + count++;
                            script[i].id = id;
                            this.saxType[saxType] = id;
                        }
                    }
                };
                return foo;
            }()),
            completeHandle: function () {
                sinaSax.callback('completeFunc');
            },
            timeoutFunHandle: function (pdps) {
                sinaSax.callback('timeoutFunc', [pdps]);
            },
            callbackHandle: function (data, index, iterator, self) {
                var thisArr = self.sax[index].pdpsStr[iterator].split(',');
                var dataArr = [];

                self.cmPv(data);// 添加dsp cm字段曝光

                data = self.formatData(data, index, 'data');
                self.sax[index].pdpsArr[iterator] = thisArr;

                for (var i = 0, len = data.length; i < len; i++) {
                    (function (i) {
                        var pdpsIndex = thisArr.indexOf(data[i][self.sax[index].id]); // 索引
                        var scriptId = self.getTemplateScriptId(index, iterator, pdpsIndex);
                        var pdpsDom = self.sax[index].pdpsNodes[iterator][pdpsIndex];

                        if (scriptId) {
                            try {
                                if (window.location.href.indexOf('wm=3206') !== -1) {
                                    return;// 更新百度热词的渠道广告展示
                                }
                                pdpsDom.innerHTML = self.jsTemplate(scriptId, data[i]);
                                dataArr.push(pdpsIndex);
                                self.sendPv(data[i], index);
                                if (self.getRate(pdpsDom)) {
                                    self.callback('insertSucc', [pdpsDom]);

                                    //
                                }
                            }
                            catch (e) {
                                self.callback('error', [e]);
                            }
                        }
                    })(i);
                }
                for (var j = 0, jlen = thisArr.length; j < jlen; j++) {
                    if (dataArr.indexOf(j) === -1) {
                        self.callback('nullData', [self.sax[index].pdpsNodes[iterator][j]]);
                    }
                }
            },

            cmPv: function (data) {
                if (data.cm && data.cm.length > 0) {
                    for (var i = 0; i < data.cm.length; i++) {
                        var pv = data.cm[i];
                        if (pv && !this.isBlank(pv)) {
                            var img = this.creatElement('img', {src: pv});
                            this.pvBox.appendChild(img);
                        }
                    }
                }
            },
            listener: {},
            bind: function (event, func) {
                if (!this.listener.hasOwnProperty(event)) {
                    this.listener[event] = [];
                }
                this.listener[event].push(func);
            },
            callback: function (event, args) {
                if (!this.listener.hasOwnProperty(event)) {
                    return;
                }
                for (var i = 0, len = this.listener[event].length; i < len; i++) {
                    this.listener[event][i].apply(this, args);
                }
            },
            sendPv: function (data, index) {
                if (this.formatData(data, index, 'pv')) {
                    var data = this.formatData(data, index, 'pv');
                    var i = 0;
                    var len = data.length;
                    var am = this.getAMData(); // 反作弊
                    for (; i < len; i++) {
                        var pv = data[i];
                        if (pv && !this.isBlank(pv)) {
                            pv = data[i] + '&am=' + encodeURIComponent(am);
                            var img = this.creatElement('img', {src: pv});
                            this.pvBox.appendChild(img);
                        }
                    }
                }
            },
            getAMData: function () {
                var am = {
                    ds: window.screen.width + '*' + window.screen.height,
                    ov: (navigator.userAgent).toLowerCase().indexOf('iphone') > -1 ? 'ios' : 'android'
                };
                return JSON.stringify(am);
            },
            isBlank: function (str) {
                return /^\s*$/.test(str);
            },
            formatData: function (data, index, key) {
                if (this.sax[index][key]) {
                    var treeArr = this.sax[index][key].split('-');
                    var i = 0;
                    var len = treeArr != null ? treeArr.length : undefined;
                    for (; i < len; i++) {
                        if (data) {
                            data = data[treeArr[i]];
                        }
                    }
                }
                return data;
            },
            getTemplateScriptId: function (index, iterator, pdpsIndex) {
                var pdpsEl = this.sax[index].pdpsNodes[iterator][pdpsIndex];
                return this.saxType[pdpsEl.getAttribute('sax-type')];
            },
            creatElement: function (tag, option) {
                var el = document.createElement(tag);
                for (var i in option) {
                    el.setAttribute(i, option[i]);
                }
                return el;
            },

            storage: {
                setMode: function (key, val) {
                    try {
                        this.set('check', 1);
                        this.set(key, val);
                    }
                    catch (e) {
                    }
                },
                getMode: function (key) {
                    try {
                        this.set('check', 1);
                        return this.get(key);
                    }
                    catch (e) {
                    }
                },
                set: function (key, value) {
                    sessionStorage.setItem(key, parseInt(value, 10));
                },
                get: function (key) {
                    return parseInt(sessionStorage.getItem(key), 10);
                }
            },
            jsonp: (function () {
                var count = 0;
                var foo = function (url, func, index, iterator, comple, time, timeoutFun, pdps) {
                    var countScript = count;
                    var callback = 'sax_jsonpCallback_' + count++;
                    var url = url + (url.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;
                    var s = this.creatElement('script', {src: url, id: 'sax_script_jsonp_' + countScript});
                    var self = this;
                    var timmer;
                    window[callback] = function (data) {
                        clearTimeout(timmer);
                        func(data, index, iterator, self);
                        comple && comple();
                        document.body.removeChild(document.getElementById('sax_script_jsonp_' + countScript));
                        window[callback] = null;

                    };
                    if (typeof time !== 'undefined') {
                        timmer = setTimeout(function () {
                            comple && comple();
                            timeoutFun && timeoutFun(pdps);
                            document.body.removeChild(document.getElementById('sax_script_jsonp_' + countScript));
                            window[callback] = null;
                        }, time);
                    }
                    document.body.appendChild(s);
                };
                return foo;
            }()),
            jsTemplate: (function () {
                var cache = {};
                var foo = function tmpl(str, data) {
                    var fn = !/\W/.test(str)
                        ? cache[str] = cache[str]
                        || tmpl(document.getElementById(str).innerHTML)
                        : new Function('obj',
                        'var p=[],print=function(){p.push.apply(p,arguments);};'
                        + 'with(obj){p.push(\''
                        + str
                            .replace(/[\r\t\n]/g, ' ')
                            .replace(/template__/g, '')
                            .split('{{').join('\t')
                            .replace(/((^|}})[^\t]*)'/g, '$1\r')
                            .replace(/\t(.*?)}}/g, '\',$1,\'')
                            .split('\t').join('\');')
                            .split('}}').join('p.push(\'')
                            .split('\r').join('\'')
                        + '\');}return p.join("");');
                    return data ? fn(data) : fn;
                };
                return foo;
            })()
        };
        return sinaSax;
    }());

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        sinaSax.init();
    };


    return customElement;
});
