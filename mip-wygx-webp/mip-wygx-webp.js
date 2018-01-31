/**
 * @file mip-wygx-webp 组件
 * @author qiu_rj
 */

define(function (require) {
    'use strict';
    var util = require('util');
    var customElement = require('customElement').create();
    var lazyCookie = {
        setCookie: function () {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + 30);
            document.cookie = 'lyWebp=true;expires=' + exdate.toGMTString();
        },
        getCookie: function (name) {
            var arr;
            var reg = new RegExp('(^| )' + name + '=([^\;]*)(\;|$)');
            if (arr === document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        }
    };
    var hasWebp = (function () {
        // if support webp
        var cwebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp');
        var isSupportWebp = !![].map && cwebp === 0;
        if (!isSupportWebp) {
            return false;
        }

        // if has webp cookie
        if (lazyCookie.getCookie('lyWebp')) {
            return true;
        }

        // or
        lazyCookie.setCookie();
        return true;
    })();

    function getImageUrl(ele) {
        var newsrc;
        var src = ele.getAttribute('src');
        var webpUrl = ele.getAttribute('webp-src');
        // 替换webp图片， cache处理
        newsrc = (webpUrl !== '' || hasWebp) ? util.makeCacheUrl(webpUrl, 'img') : util.makeCacheUrl(src, 'img');
        return newsrc;
    }

    function imgLoadError(ele, img) {
        var src = ele.getAttribute('src');
        // 监听图片不能加载事件
        img.addEventListener('error', function () {
            img.src = src;
        });
        // 解除图片绑定
        img.removeEventListener('error', imgLoadError);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var child = this.element.querySelector('img');
        if (child) {
            return;
        }

        var Img = new Image();
        this.applyFillContent(Img, true);
        var ele = this.element;

        var src = getImageUrl(ele);
        Img.src = src;

        if (ele.getAttribute('alt')) {
            Img.setAttribute('alt', ele.getAttribute('alt'));
        }
        ele.appendChild(Img);
        imgLoadError(ele, Img);
    };
    return customElement;
});
