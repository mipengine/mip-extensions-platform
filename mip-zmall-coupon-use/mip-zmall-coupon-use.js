/**
 * @file mip-zmall-coupon-use 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var mustache = require('mip-mustache/mustache');
    var util = require('util');
    var sessionId = 0;
    var couponTemplate = '';

    function render(element, e) {
        var api = element.getAttribute('src');
        var data = element.dataset;
        if (e.target) {
            data = util.fn.extend(data, e.target.dataset, {});
        }
        var goodsIdStr = data.goodsIdStr;

        if (data.num && data.num !== '') {
            goodsIdStr = goodsIdStr.replace(/_\d+$/, '_' + data.num);
        }

        var url = api + '&goodsIdStr=' + goodsIdStr + '&sessionId=' + sessionId;

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.userCoupons.status && res.userCoupons.data.length) {
                var couponData = res.userCoupons;
                var html = mustache.render(couponTemplate, couponData).trim();
                element.innerHTML = html;
                window.MIP.setData({
                    isCouponCanUse: 1
                });
            }
            else {
                window.MIP.setData({
                    isCouponCanUse: 0
                });
            }
        });
    }

    // 因为需要默认加载能否使用的状态，而且需要登录
    // 所以这里采用build方式
    customElement.prototype.build = function () {

        var element = this.element;

        var templateElement = element.querySelector('template');
        if (templateElement) {
            couponTemplate = templateElement.innerHTML;
        }

        this.addEventAction('setsessionid', function (e) {
            sessionId = e.sessionId ? e.sessionId : 0;
        });

        this.addEventAction('render', function (e) {
            render(element, e);
        });
    };

    return customElement;
});
