/**
 * @file mip-ychlyxgs-data 组件
 * @author
 */

define(function (require) {
    const $ = require('zepto');
    const util = require('util');
    const platform = util.platform;
    let customElement = require('customElement').create();
    const fetchJsonp = require('fetch-jsonp');
    // build说明：适配组件，在首屏展示，需要尽快加载
    customElement.prototype.build = function () {
        const ele = this.element;
        const pageInfo = {
            id: $(ele).find('.f-information').attr('data-id'),
            categroyId: Math.ceil($(ele).find('.f-information').attr('data-categroyId')),
            ismoney: $(ele).find('.f-information').attr('data-ismoney'),
            system: $(ele).find('.f-information').attr('data-system').toUpperCase(),
            phpUrl: $(ele).find('.f-information').attr('data-phpurl')
        };
        let downUrl = $(ele).find('.f-downbtn-url a').first().attr('href'); // 下载链接
        let downBtnLink = $(ele).find('.f-downbtn-url').find('a');
        let androidEjectData = ''; // 安卓弹出层内容初始化

        fetchJsonp('https://ca.6071.com/word/index/c/' + pageInfo.phpUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            let iossopurl = data['iossp-url'];
            let iosclassid = data['ios-classid'];
            let datawebUrl = data.webUrl;
            let azspurl = data['azsp-url'];
            let androidclassid = data['android-classid'];
            let dataIpok = data.ipok;
            let datahzUrl = data.hzurl;
            let dataOpen = data.openZs;
            let ifSwbOk = data.ifSwbOk;
            let tagSpOk = data.tagSpOk;
            let adaptationOk = data.adaptationOk;
            let mgcFilterOk = data.mgcFilterOk;
            let nodownOK = data.nodownopen;
            let nodownsize = data.nodownsize;
            let notagsurl = data.swnotagurl;
            let incity = data.ipInfo.city;
            mgcFilter(data.ffTitle, data.mgcArrayHtml, data['eject-city'], incity);
            if (nodownOK === true) {
                if ($(ele).find('.f-nodown').length <= 0) {
                    return false;
                }

                let gamesize = $(ele).find('.f-nodown').text().toUpperCase();
                for (let i = 0; i < nodownsize.length; i++) {
                    if (gamesize === nodownsize[i]) {
                        $('.f-downbtn-url').html('<li class="f-nodown-btn">暂无下载</li>');
                    }

                }
            }

        });
        function mgcFilter(dataMggl, dataReplaceHtml, dataEjectCity, incity) { // 敏感词过滤
            const mgcHtml = dataMggl;
            const mgcArrayHtml = dataReplaceHtml;
            const titleHtml = $('title').html();
            const city = incity;
            const koCity = dataEjectCity;
            const arrayTextSize = mgcHtml.length;
            const arrayHtmlSize = mgcArrayHtml.length;
            if ($.inArray(city, koCity) !== -1) {
                if (arrayTextSize === arrayHtmlSize) {
                    for (let i = 0; i < arrayTextSize; i++) {
                        for (let n = 0; n < mgcHtml[i].length; n++) {
                            if (titleHtml.indexOf(mgcHtml[i][n]) !== -1) {
                                $('title').html(mgcArrayHtml[i][0]);
                                $(ele).find('h1').html(mgcArrayHtml[i][1]);
                                $(ele).find('.f-downbtn-url').empty();
                                $(ele).find('.f-downbtn-url').html(`
								   <p class='m-down-last'>
								   <a href='+ mgcArrayHtml[i][7] +' class='m-downa' target='_blank'>立即下载</a>
								   </p>
								`);
                                $(ele).find('.m-mkutop dl dt img').attr({
                                    src: mgcArrayHtml[i][2]
                                });
                                let prevImgSize = mgcArrayHtml[i][3].length;
                                let prevImgHtml = '';
                                for (let s = 0; s < prevImgSize; s++) {
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
