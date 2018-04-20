/**
 * @file mip-sytown-ad 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var sytownList = {

        init: function (element) {
            this.el = element;
            this.adId = this.el.getAttribute('ad-id');
            this.type = this.el.getAttribute('type');
            this.type = this.type ? parseInt(this.type, 0) : 1;
            this.contHtml = this.el.innerHTML;
            this.DOMAIN = '//api.sytown.cn';
            this.ALINK = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname;

            this.getList();
        },

        getList: function () {
            var that = this;
            var urls = this.DOMAIN + '/sytown_service/DoctorAroundService/Api';
            var data = '{"_type":"getlist","_datatype":"",'
            + '"_dataid":"Select_MipAdvertByResourceId","_timestamp":1522118544,'
            + '"_source":"weixin","_platform":"h5","_equipment":"","_version":"",'
            + '"_userid":"","_param":{"resourceId":"' + this.adId + '","type":' + this.type + '},'
            + '"_sign":"d7efac0b2ea6b8025de58a686f6159b0","dataType":"json"}';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                url: urls,
                data: data,
                success: function (res) {
                    that.render(res);
                }
            });
        },

        render: function (res) {
            var adDom = '';
            if (res.errcode === 0 && res.data && res.data.picture) {
                adDom = '<a id="sytownAd" class="sytown-ad-2" href="' + res.data.url + '">'
                            + '<i class="flex-none btn_style ad-close"></i>'
                            + '<span class="adv-tis">广告</span>'
                            + '<img class="ad-img" src="' + res.data.picture + '" alt="" />'
                        + '</a>';
                this.el.innerHTML = adDom;
                this.closeListen();
            } else if (!this.contHtml || this.contHtml.length <= 0) {
                adDom = '<div id="sytownAd" class="sytown-flex flex-align sytown-ad">'
                            + '<i class="flex-none btn_style ad-close"></i>'
                            + '<span class="adv-tis">广告</span>'
                            + '<img class="flex-none adv-logo" src="https://m.sytown.cn/sytown_mobile/Skin/Blue/images/logo1.png" alt="" />'
                            + '<div class="flex-1 adv-info">'
                                + '<p class="name">尚医健康APP</p>'
                                + '<small class="desc">三甲名医免费问</small>'
                            + '</div>'
                            + '<a class="flex-none adv-btn" href="http://m.sytown.cn/sytown_mobile/view/download/download.html">立即下载</a>'
                        + '</div>';
                this.el.innerHTML = adDom;
                this.closeListen();
            }
        },

        closeListen: function () {
            var elDom = this.el;
            var adElem = elDom.querySelector('#sytownAd');
            var adClose = adElem.querySelector('.ad-close');
            adClose.addEventListener('click', function (event) {
                event.preventDefault();
                elDom.style.display = 'none';
                adElem.style.display = 'none';
            }, false);
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
