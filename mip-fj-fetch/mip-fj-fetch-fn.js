/**
 * @file mip-fj-fetch-fn.js
 * @description mip-fj-fetch函数
 * @author Jason FJ
 */

define(function (require) {
    var templates = require('templates');
    var util = require('util');
    var viewer = require('viewer');
    var evt;

    return {

        /**
         * 处理fetch请求逻辑
         *
         * @param {string} url 请求url
         * @param {Object} params 请求参数
         */
        fetchUrl: function (url, params) {
            var me = this;
            util.css([me.successEle, me.errorEle], {display: 'none'});
            var fetchData = {
                method: me.method,
                credentials: 'include'
            };
            if (me.method === 'POST') {
                fetchData = util.fn.extend({}, fetchData, {
                    body: JSON.stringify(params)
                });
            }
            // 数据请求处理
            fetch(url, fetchData).then(function (res) {
                if (res.ok) {
                    res.json().then(function (data) {
                        if (data && parseInt(data.status, 10) === 0) {
                            me.submitSuccessHandle();
                            util.css(me.successEle, {display: 'block'});
                            me.renderTpl(me.successEle, data);
                        }
                        else {
                            me.submitErrorHandle();
                            me.fetchReject(data);
                        }
                    }).catch(function (err) {
                        me.submitErrorHandle();
                        me.fetchReject(err);
                    });
                }
                else {
                    me.submitErrorHandle();
                    me.fetchReject({});
                }
            }).catch(function (err) {
                me.submitErrorHandle();
                me.fetchReject(err);
            });
        },

        /**
         * fetch出错逻辑处理
         *
         * @param {Object} err 错误对象
         */
        fetchReject: function (err) {
            var me = this;
            util.css(me.errorEle, {display: 'block'});
            me.renderTpl(me.errorEle, err);
        },

        /**
         * 处理模板渲染
         *
         * @param {HTMLElement} ele 模板父节点
         * @param {Object} data 模板渲染数据
         */
        renderTpl: function (ele, data) {
            var me = this;
            templates.render(ele, data).then(function (html) {
                var tempTarget = me.tempHTML(ele);
                tempTarget.innerHTML = html;
            });
        },

        /**
         * 处理模板渲染
         *
         * @param {HTMLElement} ele 渲染后模板父节点
         * @return {HTMLElement} target 新建DOM节点
         */

        tempHTML: function (ele) {
            ele = ele || document;
            var target = ele.querySelector('[mip-mustache-rendered]');
            if (!target) {
                target = util.dom.create('<div mip-mustache-rendered></div>');
                ele.appendChild(target);
            }
            return target;
        },

       /**
        * 绑定触发fetch的事件
        *
        * @description 通过其他元素触发fetch请求
        * @param {Object} obj 整体对象
        */
        addEventFetch: function (obj) {
            var me = this;

            // 绑定事件，其它元素可通过 on="xxx" 触发fetch请求
            obj.addEventAction('event_fetch', function (event) {
                evt = event;
                me.onFetch(obj.element);
            });
        },

        /**
         * 触发fetch请求的处理函数
         *
         * @param  {HTMLElement} element form节点
         */
        onFetch: function (element) {
            var me = this;
            var hasFetch = element.getAttribute('fetch-url') || '';

            // fetch参数的名称
            var fetchParamsName = element.getAttribute('fetch-params-name') || 'fetchParams';
            // 判断参数是否存在
            var fetchParams = window.m.hasOwnProperty(fetchParamsName) ? window.m[fetchParamsName] : {};
            // object直接返回，否则参数名称作为键名和参数值作为键值
            if (typeof fetchParams !== 'object') {
                var fetchConstructObj = {};
                fetchConstructObj[fetchParamsName] = fetchParams;
                fetchParams = fetchConstructObj;
            }
            me.method = (element.getAttribute('method') || 'GET').toUpperCase();

            this.ele = element;
            this.successEle = element.querySelector('[submit-success]');
            this.errorEle = element.querySelector('[submit-error]');

            if (hasFetch.trim()) {
                me.fetchUrl(hasFetch, fetchParams);
            }
        },

        /**
         * 提交成功调用的在html on里使用的事件
         *
         * @param  {HTMLElement} element form节点
         */
        submitSuccessHandle: function () {
            if (!evt) {
                return;
            }
            viewer.eventAction.execute('submitSuccess', evt.target, evt);
        },

        /**
         * 提交失败调用的在html on里使用的事件
         *
         * @param  {HTMLElement} element form节点
         */
        submitErrorHandle: function () {
            if (!evt) {
                return;
            }
            viewer.eventAction.execute('submitError', evt.target, evt);
        }
    };
});
