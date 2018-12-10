/**
 * @file mip-change-async 组件
 * @author
 */


define(function (require) {

    var customElem = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var templates = require('templates');
    var util = require('util');
    var Gesture = util.Gesture;

    /**
     * 获取元素绑定的异步属性
     *
     * @param {Object} element [组件节点]
     * @return {Object}
     */
    function getOpt(element) {
        var id = element.id;
        var url = element.getAttribute('url');
        var data = element.getAttribute('data');
        var block = element.getAttribute('block');
        var activeClass = element.getAttribute('active-class');
        var template = element.getAttribute('template');
        var jsonp = element.getAttribute('jsonp');
        var timestamp = element.hasAttribute('timestamp');

        // 元素参数
        var opt = {
            id: id,
            url: url,
            data: data,
            block: block,
            activeClass: activeClass,
            template: template,
            jsonp: jsonp,
            timestamp: timestamp
        };

        return opt;
    }

    /**
     * [render 渲染方法]
     *
     */
    function render() {
        var self = this;
        var element = self.element;

        self.disabled = false;

        // 事件注册
        self.addEventAction('send', function (event) {
            send.call(self, element, event);
        });
    }

    /**
     * [sned 发送ajax请求]
     *
     * @param  {Object} element [标签元素]
     */
    function send(element) {
        var self = this;
        var doc = document;

        if (self.disabled) {
            return;
        }

        // 获取当前元素属性
        var opt = getOpt(element);
        var data = typeof opt.data === 'string' ? JSON.parse(opt.data) : opt.data || {};
        var activeClass = opt.activeClass;
        var id = opt.id;
        var jsonp = opt.jsonp;
        var block = doc.querySelector(opt.block);
        var btn = doc.querySelectorAll('[on="tap:' + id + '.send"]');
        var timestamp = opt.timestamp;
        timestamp && (data.t = +new Date());

        var url = formatQuery(opt.url, data);

        var fetchCfg = {
            method: 'get'
        };

        new Gesture(self.element, {
            preventY: true
        });

        self.disabled = true;

        Array.prototype.map.call(btn, function (item) {
            item.classList.add(activeClass);
        });

        if (jsonp) {
            fetchJsonp(url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).catch(function () {
                alert('失败，请重试');
            }).then(function (data) {
                complete.call(self, btn, activeClass);
                display(element, data, block);
            });
        }
        else {
            fetch(url, fetchCfg).then(function (res) {
                return res.text();
            }).then(function (text) {
                var data;
                try {
                    data = typeof text === 'string' ? JSON.parse(text) : text;
                }
                catch (e) {
                    data = {};
                }

                complete.call(self, btn, activeClass);
                display(element, data, block);
            });
        }
    }

    /**
     * [display 绑定数据渲染模板]
     *
     * @param  {Object} element [标签元素]
     * @param  {Object} data [数据对象]
     * @param  {Object} block [填充的容器节点]
     */
    function display(element, data, block) {
        templates.render(element, data).then(function (html) {
            block && (block.innerHTML = html);
        });
    }

    /**
     * 请求完成回调
     *
     * @param {Object} btn [触发的节点]
     * @param {string} activeClass [按钮激活状态的class]
     */
    function complete(btn, activeClass) {
        var self = this;

        self.disabled = false;

        Array.prototype.map.call(btn, function (item) {
            item.classList.remove(activeClass);
        });
    }

    /**
     * 格式url
     *
     * @param {string} url [链接地址]
     * @param {string} data [传入的数据]
     * @return {string|*}
     */
    function formatQuery(url, data) {
        var query = '';

        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                query += (encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&');
            }
        }

        query = query.replace(/&+$/g, '');
        url += (url.indexOf('?') > -1 ? '&' : '?') + query;

        return url;
    }

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = render;

    return customElem;
});
