/**
 * @file mip-zmall-baidu-coupon 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var mustache = require('mip-mustache/mustache');

    function preventTouch(e) {
        e.preventDefault();
    }

    // 设置遮罩层
    function setCover(element) {
        var elementParentNode = element.parentNode;
        if (elementParentNode.tagName === 'MIP-FIXED') {
            util.css(elementParentNode, {
                height: '100%'
            });
        }
        util.css(element, {
            height: '100%'
        });
        element.addEventListener('touchmove', preventTouch);
    }

    // 移除遮罩层
    function removeCover(element) {
        var elementParentNode = element.parentNode;
        setTimeout(function () {
            if (elementParentNode.tagName === 'MIP-FIXED') {
                util.css(elementParentNode, {
                    height: 'auto'
                });
            }
            util.css(element, {
                height: 'auto'
            });
        }, 300);
        element.removeEventListener('touchmove', preventTouch);
    }

    // 关闭
    function closeWindow(element) {
        var layerElement = element.querySelector('#js_coupon_success_layer');
        layerElement.classList.remove('visible');
        removeCover(element);
    }

    function bindEvent(element) {
        var closeElement = element.querySelector('#js_coupon_success_close');
        closeElement.addEventListener('click', function () {
            closeWindow(element);
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var self = this;
        var element = self.element;

        var script = element.querySelector('script[type="application/json"]');
        var settings = {};
        if (script) {
            var customSettings = JSON.parse(script.textContent.toString());
            settings = util.fn.extend(settings, customSettings);
        }

        var mipDialogComponent = document.querySelector('mip-zol-dialog');
        element.mipDialogComponent = mipDialogComponent;

        var templateElement = element.querySelector('template');
        if (templateElement) {
            var template = templateElement.innerHTML;
            element.template = template;
        }

        self.addEventAction('receive', function () {
            var url = settings.url + '&merchantId=' + settings.merchantId + '&storeId=' + settings.storeId;
            fetchJsonp(url, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                setCover(element);
                var html = mustache.render(element.template, res).trim();
                element.innerHTML = html;
                var successLayer = element.querySelector('#js_coupon_success_layer');
                successLayer.classList.add('visible');
                bindEvent(element);
            });
        });
    };

    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    return customElement;
});
