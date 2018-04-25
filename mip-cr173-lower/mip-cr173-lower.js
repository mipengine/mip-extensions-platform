/**
 * @file mip-cr173-lower 获取httpsjspn接口的地址，包含的话则提示该应用下架,使用了$('title')因为需要将标题部分文字去掉。
 * @author gom3250@qq.com.
 * @version 1.0.0
 *  */
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fhieldurl = ele.getAttribute('data-shield');
        var pkurlm = $(ele).find('#address').attr('href');
        fetchJsonp('https://ca.6071.com/shield/index/c/' + fhieldurl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var lowerOk = data.lowerOk;
            if (lowerOk === 'true') {
                var province = data.province;
                var lowercity = data.city;
                var lowerkoCity = data.cityLower;
                if ($.inArray(lowercity, lowerkoCity) !== -1) {
                    var lowerurlSize = data.lowerurl.length;
                    if ($.inArray(pkurlm, data.lowerurl) !== -1) {
                        $(ele).find('#address').attr({href: 'javascript:;', lower: 'yes'});
                        $(ele).find('#address').text('该应用已下架');
                        $(ele).find('#address').css({'background': '#ccc', 'color': '#fff'});
                        $('title').html($('title').html().replace(/下载/g, ''));
                    }
                }
            }
        });
    };
    return customElement;
});
