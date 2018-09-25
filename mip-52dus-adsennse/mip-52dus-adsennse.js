/**
 * @file mip-52dus-adsennse 组件
 * @author 52dus.com
 * @version 1.0.0
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var ele = this.element;
        var adClient = ele.getAttribute('ad-client');
        var adLayout = ele.getAttribute('ad-layout');
        var adLayoutKey = ele.getAttribute('ad-layout-key');
        var adAlign = ele.getAttribute('ad-align');
        var adSlot = ele.getAttribute('ad-slot');
        var adFormat = ele.getAttribute('ad-format');
        var insTag = document.createElement('ins');
        var responsive = ele.getAttribute('width-responsive');
        var width = ele.getAttribute('ad-width');
        var height = ele.getAttribute('ad-height');
        var scriptTag1 = document.createElement('script');
        scriptTag1.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            scriptTag1.setAttribute('async', 'true');
        var scriptTag2 = document.createElement('script');
        if (!(adSlot)) {
            scriptTag2.innerHTML = '(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"'
                + '' + adClient + '",enable_page_level_ads:true});';
            ele.appendChild(scriptTag1);
            ele.appendChild(scriptTag2);
        }
        else {
            insTag.classList.add('adsbygoogle');
            if (adLayout) {
                insTag.setAttribute('data-ad-layout', adLayout);
                if (adLayoutKey) {
                    insTag.setAttribute('data-ad-layout-key', adLayoutKey);
                }
            }
            if (adFormat) {
                insTag.setAttribute('data-ad-format', adFormat);
                if (adAlign) {
                    insTag.setAttribute('style', 'display:block; text-align:' + adAlign + ';');
                }
                else {
                    insTag.setAttribute('style', 'display:block');
                }
            }
            else {
                if (width && height) {
                    insTag.setAttribute('style', 'display:inline-block;width:' + width + 'px;height:'
                        + height + 'px');
                }
            }
            insTag.setAttribute('data-ad-client', adClient);
            insTag.setAttribute('data-ad-slot', adSlot);
            if (responsive) {
                insTag.setAttribute('data-full-width-responsive', responsive);
            }
            scriptTag2.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
            ele.appendChild(scriptTag1);
            ele.appendChild(insTag);
            ele.appendChild(scriptTag2);
        }
    };
    return customElement;
});
