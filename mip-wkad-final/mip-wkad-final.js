/**
* 寻医问药mip改造 新版广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.12.13
* @version 1.0.6
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var loadAd = function (elem, className, content, token) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = null;
        var arr = [];
        var res = content.replace(/\[|\,\s*|\]/g, function (matchs) {
            if (matchs === '[') {
                return '["';
            }
            else if ($.trim(matchs) === ',') {
                return '","';
            }
            else if (matchs === ']') {
                return '"]';
            }
        });
        if (typeof window.adStore === 'undefined') {
            window.adStore = {};
        }
        json = JSON.parse(res);
        arr.push('adStore["' + json[0] + '"]');
        arr.push('=');
        arr.push('"' + json[1] + '"');
        el.className = className;
        script.type = 'text/javascript';
        script.innerHTML = arr.join('');
        $(elem).html('').append(el);
        $(el).append(script);
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var elStr = $(elem).attr('el');
        var adStr = $(elem).attr('ads');
        var domain = document.domain;
        var url = document.URL;
        if (domain === '3g.xywy.com') {
            $('.top-float').hide();
            $('.hot-news-panel').addClass('none');
            $('.mobile-ad-rnk1-panel').removeClass('none');
            $('.mobile-ad-rnk2-panel').removeClass('none');
        }
        if (url.indexOf('3g-xywy-com.mipcdn.com') > -1 && url.indexOf('3g.xywy.com') > -1) {
            $('mip-fixed[type="bottom"]').hide();
            $('.mobile-ad-rnk3-panel').removeClass('none');
        }
        loadAd(elem, elStr, adStr);
    };
    return customElem;
});
