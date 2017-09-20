/**
* 寻医问药mip改造 新版广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.09.19
* @version 1.0.3
*/
define(function (require) {
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');
    var customElem = require('customElement').create();
    var date = 0;
    var loadAd = function (elem, className, content, token) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var bdAdWrap = null;
        var bdAd = null;
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
        $(elem).append(el);
        $(el).append(script);
        if (date === 21) {
            bdAdWrap = document.createElement('mip-embed');
            bdAd = document.createElement('div');
            $(bdAdWrap).attr('layout', 'responsive');
            $(bdAdWrap).attr('type', 'baidu-wm-ext');
            $(bdAdWrap).attr('domain', 'bdmjs.xywy.com');
            $(bdAdWrap).attr('token', token);
            $(bdAd).attr('id', token);
            $(elem).html('').append(bdAdWrap);
            $(bdAdWrap).append(bdAd);
        }
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var elStr = $(elem).attr('el');
        var adStr = $(elem).attr('ads');
        var token = '';
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
        if (url.indexOf('3g.club.xywy.com') > -1) {
            fetchJsonp('http://3g.club.xywy.com/zhuanti/ad_status.php', {timeout: 3000})
            .then(function (res) {
                return res.json();
            }).then(function (data) {
                date = data.date;
                loadAd(elem, elStr, adStr, token);
            });
            if (adStr.indexOf('mobile_doctor_consult') > -1
                || adStr.indexOf('mobile_doctor_consult_depart') > -1) {
                token = 'srdhldab53';
            }
            else if (adStr.indexOf('mobile_top_float_window_depart') > -1
                || adStr.indexOf('mobile_top_float_window') > -1) {
                token = 'xskytryyovz';
            }
            else if (adStr.indexOf('mobile_bottom_tw_combine_depart') > -1
                || adStr.indexOf('mobile_bottom_tw_combine') > -1) {
                token = 'lgymivofdjn';
            }
        }
        else {
            loadAd(elem, elStr, adStr);
        }
    };
    return customElem;
});
