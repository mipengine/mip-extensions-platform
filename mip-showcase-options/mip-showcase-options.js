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
        me.addEventAction('refresh', function() {
            var id = arguments[1];
            if (id) {
                me.getData(id);
                me.id = id;
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
                    me.skulist = data.data.skuList || [];
                    if (data.data.types) {
                        var str = me.getHTMLStr(data.data.types);
                        if (str) {
                            me.renders(str);
                        }
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
        var scal = [];
        if (Array.isArray(data)) {
            data.forEach(function (it) {
                var content = '';
                var list = it.list;
                var types = it.type || {};
                var type = types.name || '';
                if (Array.isArray(list)) {
                    list.forEach(function (i) {
                        var n = i || '';
                        if (it.default === n) {
                            content += '<div class="menuitem menuitemact" data-type="'+ types.key +'">' + n + '</div>';
                        }
                        else {
                            content += '<div class="menuitem" data-type="'+ types.key +'">' + n + '</div>';
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
        html.push('<div class="diaprice">¥<span class="diapricetext"></span></div>');
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

        var d = me.getOptions();
        var goodsInfo = me.getPrice();

        $(ele).on('click', '.' + itemClass, function (e) {
            var $target = $(e.target);
            $target.siblings().removeClass(activeClass);
            $target.addClass(activeClass);

            var d = me.getOptions();
            var goodsInfo = me.getPrice();
            goodsInfo.options = d;
            goodsInfo.itemid = me.id;
            viewer.eventAction.execute(change, ele, goodsInfo);
        });

    };

    customElement.prototype.getPrice = function() {
        var pctt = {};
        $('.menuitemact').each(function(i, it) {
            var $target = $(it);
            var t = $target.attr('data-type') || '';
            if (!/^_\w+$/.test(t)) {
                pctt[t] = $target.text();
            }
        });
        var skulist = this.skulist;
        if (Array.isArray(skulist)) {
            var flag = false;
            for(var i=0; i<skulist.length;i++) {
                var it = skulist[i];
                var spec = it.spec || {};
                if (ojbIsEquel(spec, pctt)) {
                    var p = it.price || 0;
                    $(this.element).find('.diapricetext').text(p);
                    return {
                        id: it.id,
                        price: p
                    }
                }
            }
        }
        return {id: '', price: 0};
    };

    function ojbIsEquel(a, b){
        var fKeys = Object.keys(a);
        var sKeys = Object.keys(b);
        if (fKeys.length !== sKeys.length) {
            return false;
        }
        for (var item in a) {
            if (!(item in b)) {
                return false;
            }
            if (a[item] !== b[item]) {
                return false;
            }
        }
        return true;
    }

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
