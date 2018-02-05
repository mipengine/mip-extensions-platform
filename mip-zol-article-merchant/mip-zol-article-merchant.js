/**
 * @file mip-zol-article-merchant zol业务组件：zol资讯文章页首图下方的经销商推广位，业务组件，非公用
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');

    var baiduApiUrl = '//api.map.baidu.com/getscript?v=2.0&ak=16lMcz7cErnndKzCzaHh7j0N';
    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }
        return url + str;
    }

    // geo信息,同时作为获取geo信息的脚本是否已经加载完成的标志
    var geoInfo;
    // 获取ip信息的脚本是否已经加载完成
    var ipFlag = false;


    // 获取经销商信息
    function getMerchantInfo(options, element) {
        var data = util.fn.extend(true, (geoInfo.point || {}), options);
        data.ip = window.returnCitySN ? window.returnCitySN.cip : '';
        fetchJsonp(makeUrl('//m.zol.com.cn/article/article_2017_mip_ds.php', data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            if (parseInt(request.state, 10) === 1) {
                element.innerHTML = '<div class="buy-mol">\
                    <a href="' + request.info.mipUrl + '" class="relative-product">\
                        <figure>\
                            <mip-img src="' + request.info.picUrl + '" alt="' + request.info.goodsName + '"></mip-img>\
                        </figure>\
                        <h3>' + request.info.goodsName + '</h3>\
                        <div class="divrice">\u00A5' + request.info.priceStr + '</div>'
                    + (request.info.distance ? '<div class="introduction">\u8DDD\u79BB\u60A8'
                        + request.info.distance + '</div>' : '')
                    + '<div class="tags">\
                            <span class="price">\u5B9E\u4F53\u5E97</span>\
                        </div>\
                    </a>\
                </div>';
            }

        });
    }

    // 异步加载js
    function loadScript(src, callback) {
        var script = document.createElement('script');
        callback && (script.onload = callback);
        script.src = src;
        document.body.appendChild(script);
    }

    var evt = document.createEvent('Event');
    evt.initEvent('userlocated', true, true);

    // 处理发送给后台的数据
    function gotScriptCallback() {
        if (ipFlag && geoInfo) {
            window.dispatchEvent(evt);
        }
    }

    loadScript('//pv.sohu.com/cityjson?ie=utf-8', function () {
        ipFlag = true;
        gotScriptCallback();
    });
    loadScript(baiduApiUrl, function () {
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function (info) {
            geoInfo = info;
            gotScriptCallback();
        }, {enableHighAccuracy: true});
    });

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var dataset = element.dataset;
        var options = {};
        for (var key in dataset) {
            if (dataset.hasOwnProperty(key)) {
                if (/^data([A-Z][\w]+)/.test(key)) {
                    var pkey = key;
                    pkey = pkey.replace(/^data[A-Z]/, pkey.slice(4, 5).toLowerCase());
                    options[pkey] = dataset[key];
                }
            }
        }

        if (ipFlag && geoInfo) {
            getMerchantInfo(options, element);
        } else {
            window.addEventListener('userlocated', function () {
                getMerchantInfo(options, element);
            });
        }

    };
    return customElement;
});
