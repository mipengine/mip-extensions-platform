/**
 * @file mip-qqtn-shield 获取下载地址，根据不同下载地址显示不同的提示,提示内容放入模版里的https json中。1.1.0 ：根据来路，提示不同内容。1.2.0 增加对其他组件的兼容性。已经定位问题。解决和其他组件冲突问题。1.2.1 去掉除ios设备的判断
 * @author gom3250@qq.com.
 * @version 1.1.0
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
            var cpios = data.cpiosOk;
            if (cpios === 'true') {
                var cpIds = data.coatid;
                // 获取远程json文件里的用于对比的id号
                var cpUrl = data.cpdu;
                // 获取远程json文件里的用于对比的地址
                var cpiosurl = data.iosu;
                // 获取远程json文件里的苹果访问地址
                var cpazurl = data.azu;
                // 获取远程json文件里的安卓访问地址
                var where = document.referrer;
                var auso = ['sm', 'baidu', 'so', 'sogou', 'soso', 'google', 'youdao', 'bing', '360'];
                var sonum = auso.length;
                // 用于判断来路是否搜索引擎
                var catId = $(ele).find('.f-information').attr('data-categroyId');
                // 获取应用子分类ID 子栏目ID号
                var truedown = $(ele).find('.f-information').attr('data-durl');
                // 获取真实url用于比对。
                if (truedown === undefined) {
                    truedown = '';
                }
                // 兼容老页面
                var h = 0;
                for (h = 0; h < sonum; h++) {
                    if (where.indexOf(auso[h]) !== -1) {
                        if (truedown.indexOf(cpUrl) !== -1 && $.inArray(catId, cpIds) !== -1) {
                            if (platform.isIos() && cpiosurl !== '') {
                                // 是苹果设备并且值不为空
                                $(ele).find('#address').attr('href', cpiosurl);
                                // 处理苹果地址
                                $('head style').append('mip-fy-yuyue .m-tisp1{display:none}');
                                //  兼容其他组件,不显示提示。
                            }
                        }
                    }
                }
            }
        });
    };
    return customElement;
});
