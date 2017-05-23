/**
 * @file mip-sn-shop-floor 组件
 * @author 16031316@suning.com
 */

define(function (require) {

    var customEle = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 获取URL参数
     *
     * @return {boolean}
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
     * 获取URL
     *
     * @param {Object} target target
     * @return {*}
     */
    function getUrl(target) {
        var dom = target.element;
        var url = dom.getAttribute('src');
        if (!url) {
            return;
        }

        var paras = getUrlParam();
        var storeCode = paras ? paras.storeCode : '8727';

        return dom.getAttribute('src').replace('?', storeCode);
    }

    // 渲染页面
    function renderHtml(data) {
        var self = this;
        if (data) {
            templates.render(self.element, data).then(function (html) {
                var htmlNew = html.replace(/mip-link-tmp/g, 'mip-link');
                self.element.innerHTML = htmlNew;

                // 注册返回按钮事件
                document.getElementById('sn-icon-back').addEventListener('click', function () {
                    window.history.go(-1);
                });
            });
        }
        else {
        }
    }

    // 根据组件的src，获取数据，然后渲染到页面
    customEle.prototype.firstInviewCallback = function () {

        var self = this;

        // 并没有用到，保留
        window.getStoreInfoCallback = function (json) {

            if (json.code === '0' && json.data) {
                renderHtml.call(self, json.data);
            }

        };

        fetchJsonp(getUrl(this), {
            jsonpCallback: 'callback'
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (!json.status && json.data) {
                renderHtml.call(self, json.data);
            }

        }).catch(function (ex) {
        });
    };

    return customEle;

});
