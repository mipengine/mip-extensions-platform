/**
 * @file mip-ychlyxgs-data 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
	// build说明：适配组件，在首屏展示，需要尽快加载
    customElement.prototype.build = function () {
        var ele = this.element;
        var pageInfo = {
            id: $(ele).find('.f-information').attr('data-id'),
            categroyId: Math.ceil($(ele).find('.f-information').attr('data-categroyId')),
            ismoney: $(ele).find('.f-information').attr('data-ismoney'),
            system: $(ele).find('.f-information').attr('data-system').toUpperCase(),
            phpUrl: $(ele).find('.f-information').attr('data-phpurl')
        };
        var isAds = false; // 商务包初始值
        var downUrl = $(ele).find('.f-downbtn-url a').first().attr('href'); // 下载链接
        var downBtnLink = $(ele).find('.f-downbtn-url').find('a');
        var androidEjectData = ''; // 安卓弹出层内容初始化

        fetchJsonp('https://ca.6071.com/word/index/c/' + pageInfo.phpUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            var iossopurl = data['iossp-url'];
            var iosclassid = data['ios-classid'];
            var datawebUrl = data.webUrl;
            var azspurl = data['azsp-url'];
            var androidclassid = data['android-classid'];
            var dataIpok = data.ipok;
            var datahzUrl = data.hzurl;
            var dataOpen = data.openZs;
            var ifSwbOk = data.ifSwbOk;
            var tagSpOk = data.tagSpOk;
            var adaptationOk = data.adaptationOk;
            var mgcFilterOk = data.mgcFilterOk;
            var nodownOK = data.nodownopen;
            var nodownsize = data.nodownsize;
            var notagsurl = data.swnotagurl;
            var incity = data.ipInfo.city;
            mgcFilter(data.ffTitle, data.mgcArrayHtml, data['eject-city'], incity);
            if (nodownOK === true) {
                if ($(ele).find('.f-nodown').length <= 0) {
                    return false;
                }

                var gamesize = $(ele).find('.f-nodown').text().toUpperCase();
                for (var i = 0; i < nodownsize.length; i++) {
                    if (gamesize === nodownsize[i]) {
                        $('.f-downbtn-url').html('<li class="f-nodown-btn">暂无下载</li>');
                    }

                }
            }

        });
        function mgcFilter(dataMggl, dataReplaceHtml, dataEjectCity, incity) { // 敏感词过滤
            var mgcHtml = dataMggl;
            var mgcArrayHtml = dataReplaceHtml;
            var titleHtml = $('title').html();
            var city = incity;
            var koCity = dataEjectCity;
            if ($.inArray(city, koCity) !== -1) {
                var arrayTextSize = mgcHtml.length;
                var arrayHtmlSize = mgcArrayHtml.length;
                if (arrayTextSize === arrayHtmlSize) {
                    for (var i = 0; i < arrayTextSize; i++) {
                        for (var n = 0; n < mgcHtml[i].length; n++) {
                            if (titleHtml.indexOf(mgcHtml[i][n]) !== -1) {
                                $('title').html(mgcArrayHtml[i][0]);
                                $(ele).find('h1').html(mgcArrayHtml[i][1]);
                                $(ele).find('.m-mkutop dl dt img').attr({
                                    src: mgcArrayHtml[i][2]
                                });
                                var prevImgSize = mgcArrayHtml[i][3].length;
                                var prevImgHtml = '';
                                for (var s = 0; s < prevImgSize; s++) {
                                    prevImgHtml += '<li><mip-img src=\'' + mgcArrayHtml[i][3][s] + '\'/></li>';
                                }
                                $(ele).find('.f-previmg-cont').html(prevImgHtml);
                                $(ele).find('.m-downmain').html(mgcArrayHtml[i][4]);
                                $(ele).find('.tag-new').hide();
                                $(ele).find('.zw_bqfl a').eq(0).attr('href', mgcArrayHtml[i][5]);
                                $(ele).find('.zw_bqfl a').eq(0).html(mgcArrayHtml[i][6]);
                                $('.m-down-ul,.w-ljxz').each(function () {
                                    $(this).find('a').attr('href', mgcArrayHtml[i][7]);
                                });
                                $(ele).find('.ullist li').each(function () {
                                    if ($(this).find('p').html().indexOf(mgcHtml[i][n]) !== -1) {
                                        $(this).find('p').html(mgcArrayHtml[i][1]);
                                        $(this).find('img').attr('src', mgcArrayHtml[i][2]);
                                    }

                                });
                                $(ele).find('.m-m-addxggame li').each(function () {
                                    if ($(this).find('span').html().indexOf(mgcHtml[i][n]) !== -1) {
                                        $(this).find('span').html(mgcArrayHtml[i][1]);
                                        $(this).find('img').attr('src', mgcArrayHtml[i][2]);
                                    }

                                });
                                $(ele).find('#comment_list').prev('h3').hide();
                                $(ele).find('#comment_list').hide();
                            }

                        }
                    }
                }
            }
        }

    };
    return customElement;
});
