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
            this.render();
        },

        render: function () {
            var adDom = '<div id="sytownAd" class="sytown-flex flex-align sytown-ad">'
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
        },

        closeListen: function () {
            var elDom = this.el;
            var adElem = elDom.querySelector('#sytownAd');
            var adClose = adElem.querySelector('.ad-close');
            adClose.addEventListener('click', function () {
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
