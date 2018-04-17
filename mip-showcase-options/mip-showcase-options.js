/**
 * @file mip-showcase-options 组件
 * @author susc
 * @
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var viewer = require('viewer');
    var $ = require('zepto');
    var itemClass = 'menuitem';
    var activeClass = 'menuitemact';
    var change = 'change';

    /**
     * 组件构建
     */
    customElement.prototype.build = function () {
        var me = this;
        me.getData();
        me.addEventAction('refresh', function() {
            var id = arguments[1];
            if (id) {
                me.getData(id);
            }
        });
    };

    /**
     * 获取接口信息
     * @param {string} url 请求数据url
     */
    customElement.prototype.getData = function(id) {
        var me = this;
        var url = this.element.getAttribute('url');
        if (url && id) {
            fetchJsonp(url + '?pid=' + id, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                if (!data.status && data.data) {
                    var str = me.getHTMLStr(data.data);
                    if (str) {
                        me.renders(str);
                    }
                }
            });
        }
    };

    /**
     * 根据数据组装html
     * @param {Object} data 返回html
     */
    customElement.prototype.getHTMLStr = function(data) {
        var html = [];
        if (Array.isArray(data)) {
            data.forEach(function (it) {
                var content = '';
                var list = it.list;
                var type = it.types || '';
                if (Array.isArray(list)) {
                    list.forEach(function (i) {
                        var n = i || '';
                        if (it.default === n) {
                            content += '<div class="menuitem menuitemact" data-type="'+ type +'">' + n + '</div>';
                        }
                        else {
                            content += '<div class="menuitem" data-type="'+ type +'">' + n + '</div>';
                        }
                    });
                }

                var htmlCodes = [
                    '<header class="menuheader">' + type + '</header>',
                    '<div class="itemlist">',
                    content,
                    '</div>'
                    ].join("");
                html.push(htmlCodes);
            });
        }
        return html.join('');
    }

    /**
     * 刷新dom内容
     * @param {string} str html字符串
     */
    customElement.prototype.renders = function(str) {
        var ele = this.element;
        if (typeof str === 'string') {
            this.contentDestroy();
            ele.innerHTML = str;
            this.bindEvent();
        }
    };
    
    /**
     * 清除事件绑定
     */
    customElement.prototype.contentDestroy = function() {
        var ele = this.element;
        $(ele).off('click');
    };

    /**
     * 绑定选项点击事件
     * @param {string} str html字符串
     */
    customElement.prototype.bindEvent = function() {
        var me = this;
        var ele = this.element;
        $(ele).on('click', '.' + itemClass, function (e) {
            var $target = $(e.target);
            $target.siblings().removeClass(activeClass);
            $target.addClass(activeClass);

            var d = me.getOptions();
            viewer.eventAction.execute(change, ele, d);
        });
    };

    /**
     * 获取选项信息
     */
    customElement.prototype.getOptions = function() {
        var ele = this.element;
        var rs = {};
        $(ele).find('.' + activeClass).each(function(i, it) {
            var attr = $(it).attr('data-type');
            if (attr) {
                rs[attr] = $(it).text();
            }
        });
        return rs;
    };

    return customElement;
});
