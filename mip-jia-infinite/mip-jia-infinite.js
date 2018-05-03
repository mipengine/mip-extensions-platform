/**
 * @file mip-jia-infinite 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var templates = require('templates');
    var $ = require('zepto');
    var viewport = require('viewport');
    var fetchJsonp = require('fetch-jsonp');

    var TYPE = 'script[type="application/json"]';


    /**
     * 类json对象字符串转为json对象
     *
     * @param {string} json 类json对象字符串
     * @return {json} json对象
     */
    function jsonParse(json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }


    /**
     * {name:1,age:2} 转成 name=1&age=2
     *
     * @param {Object} obj json对象
     * @return {string} 转化后的字符串
     */
    function filterString(obj) {
        var pArray = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                pArray.push(key.concat('=', obj[key]));
            }
        }
        return pArray.join('&');
    }


    /**
     * 无限加载
     *
     * @class
     * @param {Object} element 当前组件
     * @param {Object} cfg 所需参数
     */
    var Infinite = function (element, cfg) {
        this.cfg = cfg;
        this.element = element;
    };

    Infinite.prototype = {
        init: function () {
            this.setParams();
            this.bindEvent();
        },
        // 处理传进来的参数
        setParams: function () {
            // request参数
            var p = this.cfg.request;
            this.url = p.url.trim();
            this.method = p.method.trim().toLocaleLowerCase();
            this.body = p.body;
            this.headers = p.headers;
            this.jsonp = p.isJsonp;
            this.jsonpCallback = p.jsonpCallback || '';
            this.resultType = p.resultType.trim().toLocaleLowerCase();

            // 请求是否完成
            this.requestEnd = true;

            // 接口还有没有数据
            this.loadEnd = false;

            // 页码 && button && loading
            var r = this.cfg.response;
            this.pageSizeKey = r.pageSizeKey;
            this.pageSize = this.body.data[this.pageSizeKey];
            this.event = r.event.trim().toLocaleLowerCase();
            this.bottomDistance = r.bottomDistance;
            this.$btn = $(r.button);
            this.$loading = $(r.loadingBox);
        },
        bindEvent: function () {
            var that = this;
            if (that.event === 'click') {
                that.$btn && that.$btn.on('click', function () {
                    that.control();
                });
            } else {
                var dis = that.bottomDistance;
                viewport.on('scroll', function () {
                    if (viewport.getHeight() + viewport.getScrollTop() >= viewport.getScrollHeight() - dis) {
                        that.control();
                    }
                });
            }
        },
        control: function () {
            if (this.requestEnd && !this.loadEnd) {
                this.getResponse();
            }
        },
        getResponse: function () {
            var that = this;

            that.requestEnd = false;
            that.$loading.show();
            that.$btn.hide();


            var result = that.triggerRequest();
            var type = that.resultType;
            this.pageSize++;

            result.then(function (res) {
                if (!res.ok) {
                    console.error('接口请求失败:' + res.statusText);
                    return;
                }
                if (type === 'json') {
                    return res.json();
                } else if (type === 'text') {
                    return res.text();
                }
            }).then(function (res) {
                if (res) {
                    that.render(res);
                }
            }).catch(function (err) {
                that.$loading.hide();
                console.log('接口错误:' + err);
            });
        },
        render: function (res) {
            var that = this;
            var data = that.cfg.response;
            var tier = data.Datatier && data.Datatier.trim();

            // 获取数据
            var msg = res;
            if (tier) {
                tier = tier.split('.');
                for (var i = 0; i < tier.length; i++) {
                    msg = msg[tier[i]];
                }
            }


            // 计算返回数据条数
            var le = 0;
            var textIdCard = data.textIdCard;
            if (typeof msg === 'string') {
                var reg = new RegExp(textIdCard, 'ig');
                le = msg.match(reg).length;
            } else {
                le = msg.length;
            }

            // 计算数据是否加载完毕
            var size = data.size;
            if (le === 0 || le % size !== 0) {
                that.loadEnd = true;
            }

            // append元素
            var $parentBox = $(data.parentBox);
            templates.render(that.element, msg).then(function (html) {
                $parentBox.append(html);
                that.requestEnd = true;
                that.$loading.hide();
                !that.loadEnd && that.$btn.show();
            });


        },

        /**
         * 调用接口并返回结果
         *
         * @return {Promise} response-返回结果
         */
        triggerRequest: function () {
            var that = this;
            var type = that.jsonp;

            var init = that.cfg.request.init;
            var method = that.method;

            var url = that.getRequestUrl();

            var response = null;
            if (type) {
                init = {jsonpCallback: that.jsonpCallback};
                // console.log(url, init)
                response = that.fetchJsonpRequest(url, init);
            } else {
                // 不是jsonp时，加上headers和method
                init.headers = that.headers;
                init.method = that.method;

                if (that.method === 'post') {
                    init.body = that.getRequestBody();
                }
                // console.log(url, init)
                response = that.fetchRequest(url, init);
            }
            return response;
        },

        /**
         * 处理url
         *
         * @return {string} url-请求url
         */
        getRequestUrl: function () {
            var url = this.url;
            var type = this.jsonp;
            if (this.method === 'get' || type) {
                var data = this.body.data;
                data[this.pageSizeKey] = this.pageSize;

                var d = filterString(data);

                if (url.indexOf('?') === -1) {
                    url += '?' + d;
                } else {
                    url += '&' + d;
                }
            }
            return url;
        },

        /**
         * 处理参数
         *
         * @return {string|Object} body-请求body
         */
        getRequestBody: function () {
            var body = this.body;
            var type = body.format.trim().toLocaleLowerCase();
            var data = body.data;
            data[this.pageSizeKey] = this.pageSize;
            var b = '';
            switch (type) {
                case 'string':
                    b = filterString(data);
                    break;
                case 'stringify':
                    b = JSON.stringify(data);
                    break;
                default:
                    b = data;
            }
            return b;
        },

        /**
         * 发起fetch请求
         *
         * @param {string} url 请求url
         * @param {Object} init 请求体
         * @return {Promise} promise对象
         */
        fetchRequest: function (url, init) {
            return fetch(url, init);
        },

        /**
         * 发起fetchJsonp请求
         *
         * @param {string} url 请求url
         * @param {string} jsonpCallback 回调名称
         * @return {Promise} promise对象
         */
        fetchJsonpRequest: function (url, jsonpCallback) {
            return fetchJsonp(url, jsonpCallback);
        }
    };



    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;

        var scriptEle = element.querySelector(TYPE);
        var cfg = jsonParse(scriptEle.textContent);

        new Infinite(element, cfg).init();

    };

    return customElement;
});
