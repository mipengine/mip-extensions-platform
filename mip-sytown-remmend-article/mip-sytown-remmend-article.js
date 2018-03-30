/**
 * @file mip-sytown-remmend-article 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();



    var sytownList = {

        init: function (element) {
            this.el = element;
            this.ids = this.el.getAttribute('article-id') || '';
            this.DOMAIN = 'https://api.sytown.cn';
            this.ALINK = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname;
            if (!this.ids) {
                return;
            }

            this.getList();
        },

        getList: function () {
            var that = this;
            var urls = this.DOMAIN + '/FrameWeb/FrameService/Api.ashx';
            var data = '{"_type":"getnormal","_source":"weixin","_platform":"H5","_equipment":"","_version":""'
            + ',"_userid":"","_datatype":"text","_dataid":"ArticleRelatedArticle_Select","_timestamp":1522205359,'
            + '"_param":{"ArticleID":"' + this.ids + '"},'
            + '"_sign":"93b56bfe526210fca9002978dc601ac4"}';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                url: urls,
                data: data,
                success: function (res) {
                    that.render(res.data);
                }
            });
        },

        createHtml: function (res) {
            var remmendList = res || [];
            if (remmendList.length <= 0) {
                return;
            }

            var str = '';
            for (var i = 0, len = remmendList.length; i < len; i++) {
                str += '<a class="remmend-item" href=' + this.ALINK + '?id=' + remmendList[i].ArticleID + '>'
                        + remmendList[i].Name
                    + '</a>';
            }
            return str;
        },

        render: function (res) {
            var str = this.createHtml(res);
            if (!str || str.length <= 0) {
                return;
            }

            var parentDom = '<section class="list-panel">'
                            + '<h5 class="sytown-flex flex-align panel-title">推荐</h5>'
                                + '<div class="panel-body">'
                                    + str
                                + '</div>'
                            + '</section>';
            this.el.innerHTML = parentDom;
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        sytownList.init(element);
    };

    return customElement;
});
