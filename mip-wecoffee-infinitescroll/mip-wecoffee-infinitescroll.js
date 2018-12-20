/**
 * @file mip-wecoffee-infinitescroll 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var util = require('util');
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();
    var InfiniteScroll = require('./infinitescroll');
    var m = window.m || {};
    var MIP = window.MIP || {};
    var infiniteScroll;

    /**
     * [getUrl url 拼接函数]
     *
     * @param  {string} src 获取的最初url
     * @return {string}     拼接后的url
     */
    function getUrl(src) {
        var self = this;
        var url = src;
        if (src.indexOf('?') > 0) {
            url += src[src.length - 1] === '?' ? '' : '&';
            url += self.params.pnName + '=' + self.params.pn;
        }
        else {
            url += '?' + self.params.pnName + '=' + self.params.pn;
        }
        return url;
    }

    customElement.prototype.build = function () {
        var self = this;

        // 登录组件加载顺序问题
        if (m.sessionId) {
            self.sessionId = m.sessionId;
        }

        this.addEventAction('login', function (event) {
            if (self.sessionId) {
                return;
            }

            self.sessionId = event.sessionId;
            MIP.setData({
                sessionId: event.sessionId
            });
            self.firstInviewCallback();
        });
    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var src = element.getAttribute('data-src') || '';
        // 修复头部问题
        $('body').find('.rt-view .rt-head').addClass('fixed');
        // 如果没有写data-src, 则报错提示
        if (!src) {
            element.remove();
            return;
        }

        // 默认参数设置
        self.params = {
            rn: 20,
            prn: 10,
            pn: 1,
            pnName: 'pn',
            bufferHeightPx: 10,
            loadingHtml: '加载中...',
            loadFailHtml: '加载失败',
            loadOverHtml: '加载完毕!',
            timeout: 5000,
            loopField: 'items',
            loginAble: false
        };

        // 获取用户设置参数
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                self.params = util.fn.extend(self.params, JSON.parse(script.textContent.toString()));
                // 由于JSON.parse() 内不能填写Infinity(number), 只能填"Infinity"(string)来转换
                self.params.rn = (self.params.rn === 'Infinity' ? Infinity : self.params.rn);
            }

        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
            return;
        }

        if (self.params.loginAble && !self.sessionId) {
            return;
        }

        self.url = getUrl.call(self, src);

        // 异步请求返回后，解析数据，使用mustache 渲染插入页面
        self.pushResult = function (rn, status) {
            // 异步获取数据示例
            var deferr = $.Deferred;
            var defer = deferr();
            if (rn > self.rn) {
                defer.resolve('NULL');
            }
            else {
                if (self.params.loginAble) {
                    self.url = self.url + (~self.url.indexOf('?') ? '&' : '?') + 'sessionId=' + self.sessionId;
                }

                fetchJsonp(self.url, {
                    jsonpCallback: 'callback',
                    timeout: self.params.timeout
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    // 数据加载成功，请求返回
                    if (data && parseInt(data.status, 10) === 0 && data.data) {
                        if (rn > self.params.rn || !data.data[self.params.loopField]) {
                            defer.resolve('NULL');
                        }

                        // 特殊逻辑
                        if (self.params.loopField === 'orders') {
                            data.data[self.params.loopField].map(function (order, idx) {
                                var now = new Date(order.createdAt);
                                var temData = {
                                    id: order.id,
                                    price: order.priceCent / 100,
                                    timeshow: now.getFullYear()
                                        + '-' + (now.getMonth() + 1)
                                        + '-' + now.getDate() + ' '
                                        + now.getHours() + ':'
                                        + now.getMinutes(),
                                    idx: idx,
                                    status: ({
                                        10: '等待支付',
                                        20: '已支付',
                                        30: '等待商家接单',
                                        40: '商家已接单',
                                        50: '运送中',
                                        60: '已送达'
                                    })[order.status],
                                    statusNum: order.status,
                                    orderType: +order.orderType === 2 ? '现场点单' : undefined
                                };

                                temData.products = order.items.map(function (item) {
                                    var product = item.sku.product;
                                    return {
                                        cover: product.imageUri,
                                        name: product.name,
                                        spec: item.sku.spec,
                                        count: item.count,
                                        price: item.sku.priceCent / 100
                                    };
                                });
                                order.temData = temData;
                            });
                        }

                        templates.render(self.element, data.data[self.params.loopField]).then(function (htmls) {
                            defer.resolve(htmls);
                        });
                        self.params.pn++;
                        self.url = getUrl.call(self, src);
                    }
                    else {
                        defer.resolve('NULL');
                    }
                }, function (data) {
                    // 数据加载失败或超时，显示“loadFailHtml（加载超时）”
                    defer.reject();
                });
            }
            return defer.promise();
        };
        infiniteScroll = new InfiniteScroll({
            $result: element.querySelector('.mip-wecoffee-infinitescroll-results'),
            $loading: element.querySelector('.mip-wecoffee-infinitescroll-loading'),
            loadingHtml: self.params.loadingHtml,
            loadFailHtml: self.params.loadFailHtml,
            loadOverHtml: self.params.loadOverHtml,
            bufferHeightPx: self.params.bufferHeightPx,
            pageResultNum: self.params.prn,
            limitShowPn: 0,
            preLoadPn: 1,
            firstResult: [],
            pushResult: self.pushResult,
            $wrapper: $('.rt-body'),
            $scroller: $(element)
        });

    };

    customElement.prototype.detachedCallback = function () {
        infiniteScroll = null;
    };

    return customElement;
});
