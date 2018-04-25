/**
 * @file mip-qqtn-shield 获取下载地址，根据不同下载地址显示不同的提示,提示内容放入模版里的https json中。
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
        var pkurlm = $('#address').attr('href');
        fetchJsonp('https://ca.6071.com/shield/index/c/' + fhieldurl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var shieldOk = data.shieldOk;
            var province = data.province;
            var city = data.city;
            if (shieldOk === 'true') {
                var koCity = data.cityArray;
                if ($.inArray(city, koCity) !== -1) {
                    var arrayTextSize = data.mgcArrayText.length;
                    var arrayHtmlSize = data.mgcArrayHtml.length;
                    if (arrayTextSize === arrayHtmlSize) {
                        var i = 0;
                        for (i = 0; i < arrayTextSize; i++) {
                            var n = 0;
                            for (n = 0; n < data.mgcArrayText[i].length; n++) {
                                if (pkurlm.indexOf(data.mgcArrayText[i][n]) !== -1) {
                                    $('title').html(data.mgcArrayHtml[i][0]);
                                    $(ele).find('h1').html(data.mgcArrayHtml[i][1]);
                                    $(ele).find('.f-game-img').each(function () {
                                        $(ele).find(this).find('img').attr('src', data.mgcArrayHtml[i][2]);
                                    });
                                    var prevImgSize = data.mgcArrayHtml[i][3].length;
                                    var prevImgHtml = '';
                                    var s = 0;
                                    for (s = 0; s < prevImgSize; s++) {
                                        var previmg = $(ele).find('.g-previmg-show li img');
                                        previmg.eq(s).attr('src', data.mgcArrayHtml[i][3][s]);
                                    }
                                    $(ele).find('.f-maincms-cont').html('<p>' + data.mgcArrayHtml[i][4] + '</p>');
                                    if (platform.isIos()) {
                                        $(ele).find('.m-down-ul').each(function () {
                                            $(this).find('a').attr('href', 'javascript:;');
                                        });
                                    } else {
                                        $(ele).find('.m-down-ul').each(function () {
                                            $(this).find('a').attr('href', data.mgcArrayHtml[i][6]);
                                        });
                                    }
                                    $(ele).find('.f-tags-box,.g-key-ohter').hide();
                                    $(ele).find('.f-tags-box').remove();
                                    $(ele).find('#g-recomd-game,.g-down-information ul').hide();
                                    $(ele).find('.f-admorediv').hide();
                                    var shieldmore = $(ele).find('mip-showmore');
                                    shieldmore.attr('style', 'height: auto;padding-bottom:10px;visibility: visible;');
                                }
                            }
                        }
                    }
                }
            }
            var lowerOk = data.lowerOk;
            if (lowerOk === 'true') {
                var lowerkoCity = data.cityLower;
                if ($.inArray(city, lowerkoCity) !== -1) {
                    var lowerurlSize = data.lowerurl.length;
                    if ($.inArray(pkurlm, data.lowerurl) !== -1) {
                        $(ele).find('.m-down-last').html('<p class="m-xiajia">该应用已下架</p>');
                        $(ele).find('.m-xiajia').css({'background': '#ccc', 'color': '#fff'});
                        $('title').html($('title').html().replace(/下载/g, ''));
                    }
                }
            }
        });
    };
    return customElement;
});
