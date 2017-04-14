/**
 * @file mip-sn-shop-list 组件
 * @author 16031316@suning.com
 */

// var mustMod = ['require', 'customElement', 'templates', 'fetch-jsonp', 'fetch'];
define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetch = require('fetch');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 页面渲染
     *
     * @param {string} t 参数1的说明
     */
    function renderHtml(t) {
        var self = this;
        if (t && t.items && t.items instanceof Array) {
            templates.render(self.element, t.items).then(render.bind(self));
        }
        else {
        }
    }

    function render(t) {
        var e = this;
        t.map(function (html) {
            var i = document.createElement('div');
            i.innerHTML = html.replace(/mip-link-tmp/g, 'mip-link');
            var n = i.childNodes[1];
            if (!n.hasAttribute('role')) {
                n.setAttribute('role', 'listitem');
            }

            e.container.appendChild(n);
        });
    }

    function getMore(url) {
        var self = this;
        if (!self.isEnd) {
            self.button = document.querySelector('.mip-list-more'), self.button.innerHTML = '加载中...';
            var n = getUrl(url, self.pnName, self.pn++);
            fetchJsonp(n, {
                jsonpCallback: 'callback'
            }).then(function (url) {
                return url.json();
            }).then(function (suc) {
                if (!suc.status && suc.data) {
                    if (renderHtml.call(self, suc.data), self.button.innerHTML = '点击查看更多', suc.data.isEnd) {
                        self.isEnd = suc.isEnd, self.button.innerHTML = '已经加载完毕';
                    }
                }
                else {
                    self.button.innerHTML = '加载失败';
                }
            });
        }
    }

    /**
     * 获取当前页面url参数
     *
     * @return {string}
     */
    function getUrlParam() {
        var t = location.href.split('?');
        var o = t[1] ? t[1].split('&') : [];
        var e = {};

        if (!o.length) {
            return false;
        }

        return o.forEach(function (t) {
            var o = t.split('=');
            e[o[0]] = o[1];
        }), e;
    }

    /**
     * 获取组件的url
     *
     * @param {string} url url参数
     * @param {string} e e参数
     * @param {string} i i参数
     * @return {string}
     */
    function getUrl(url, e, i) {
        if (!url) {
            return;
        }

        if (e && i) {
            var n = url;
            if (url.indexOf('?') > 0) {
                n += '?' === url[url.length - 1] ? '' : '&', n += e + '=' + i;
            }
            else {
                n += '?' + e + '=' + i;
            }
            return n;
        }

        return url;
    }



    /**
     * 根据组件的src，获取数据，然后渲染到页面
     *
     * @return {*}
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var i = this.element;

        self.container = document.createElement('div');
        self.applyFillContent(this.container);
        self.element.appendChild(this.container);
        if (!self.container.hasAttribute('role')) {
            self.container.setAttribute('role', 'list');
        }


        if (i.hasAttribute('synchronous-data')) {
            var r = i.querySelector('script[type="application/json"]');
            var s = r ? JSON.parse(r.textContent.toString()) : null;
            return void renderHtml.call(self, s);
        }

        var l = i.getAttribute('src') || '';
        var url = l;
        var paras;
        var storeCode;


        if (i.hasAttribute('has-more')) {
            self.pnName = i.getAttribute('pnName') || 'pn';
            self.pn = i.getAttribute('pn') || 1;

            self.addEventAction('more', function () {
                getMore.call(self, l);
            });
        }

        if (i.hasAttribute('preLoad')) {
            paras = getUrlParam(),
                storeCode = paras ? paras.storeCode : '8727';
            url = getUrl(l, self.pnName, self.pn++).replace('?', storeCode);

            // fetchJsonp有问题
            window.activityListInfoCallback = function (json) {
                if (json.code === '0' && json.data && json.data.storeActivityList) {
                    json.data.items = json.data.storeActivityList;
                    renderHtml.call(self, json.data);

                    setLikes(json.data.storeActivityList);
                }

            };

            /**
             * 设置点赞按钮
             *
             * @param {Array} items items
             */
            function setLikes(items) {
                var dom = document.getElementsByClassName('meta-praise');
                var time = 1;

                if (dom && dom.length) {
                    for (var i = 0, len = items.length; i < len; i++) {
                        var item = items[i];
                        var num = parseInt(item.praiseNumber, 10);
                        if (num > 9999) {
                            dom[i].innerHTML = '9999+';
                        }
                        else {
                            0 === num ? dom[i].style.display = 'none' : dom[i].innerHTML = num;
                        }

                    }
                }
                else {
                    if (time < 10000) {
                        setTimeout(function () {
                            setLikes(items);
                            time++;
                        }, 50);
                    }
                }
            }

            fetchJsonp(url, {
                jsonpCallback: 'callback'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                if (!json.status && json.data) {
                    renderHtml.call(require, json.data);
                }

            }).catch(function (ex) {
            });
        }

    };

    /**
     * 以下是埋点相关功能
     *
     * @return {{init: Function}}
     */
    function lazyLoadScripts() {
        var h = document;
        var a;
        var i = [];
        var c = [];
        var b;

        function f(j, m) {
            var d;
            var k;
            e();
            if (j.src) {
                j.src = j.src.constructor === Array ? j.src : [j.src];
                for (var l = 0; l < j.src.length; l++) {
                    if (j.src[l].constructor !== Array) {
                        j.src[l] = [j.src[l]];
                    }

                    c.push(j.src[l]);
                }
            }

            i = c.shift();
            a = a || h.getElementsByTagName('head')[0];
            j.src = i;
            for (var l = 0; l < j.src.length; l++) {
                k = j.src[l];
                d = h.createElement('script');
                d.src = k;
                d.type = 'text/javascript';
                if (b.ie) {
                    d.onreadystatechange = function () {
                        var n = this.readyState;
                        if (n === 'loaded' || n === 'complete') {
                            this.onreadystatechange = null;
                            g(j, m);
                        }

                    };
                }
                else {
                    d.onload = d.onerror = function () {
                        g(j, m);
                    };
                }
                a.appendChild(d);
            }
        }

        function g(d, k) {
            var j = i;
            if (!j) {
                return;
            }

            j.shift();
            if (!j.length) {
                if (c.length) {
                    f(d, k);
                }
                else {
                    if (typeof k === 'function') {
                        k();
                    }

                    return;
                }
            }
        }

        function e() {
            if (b) {
                return;
            }

            var d = /msie/i.test(navigator.userAgent.toLowerCase());
            b = {
                ie: d
            };
        }

        return {
            init: function (d, j) {
                f(d, j);
            }
        };
    }

    // 自动构建wap 流量埋点, 判断是否在客户端
    if (navigator.userAgent.match(/SNEBUY-APP/i)) {
        document.body.insertAdjacentHTML('beforeend', '<input type="hidden" id="resourceType" value="inapp">');
    }
    else {
        document.body.insertAdjacentHTML('beforeend', '<input type="hidden" id="resourceType" value="wap">');
    }
    var protocol = window.location.protocol;

    // 异步加载埋点统计JS
    lazyLoadScripts().init({
        // 埋点的js地址,数组方式引入
        src: [protocol + '//res.suning.cn/javascript/sn_da/??sa_simple.js,sa_click.js,sa-analytics.js']

    });

    // 以上是埋点相关功能


    return customElement;

});
