/**
 * @file mip-tiebaobei-listscr 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var script = this.element.querySelector('script[type="application/json"]');
        var textContent = JSON.parse(script.textContent);
        var baseUrl = textContent.baseUrl;
        var mipBaseUrl = textContent.mipBaseUrl;
        var locBaseUrl = textContent.locBaseUrl;
        var fetchJsonp = require('fetch-jsonp');
        var getRandomNum = function (min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + Math.round(rand * range));
        };
        // //优选车源点击
        var scrollBoole = true;
        var listObj = {
            jingP: 2,
            jingPBaseButtom: true,
            getData: true,
            export: function () {
                var ths = this;
                var aug = '';
                ths.getData = true;
                // aug = '&pageOffset=' + ths.jingP;
                // ths.scroll(aug);
                ths.bindEvent();
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var windowHeight = $(this).height();
                    var scrollHeight = $(document).height() - 5;
                    if ((scrollTop + windowHeight >= scrollHeight) && scrollBoole) {
                        if (ele.find('.list-container li').length >= 10) {
                            ele.find('.list-container').find('.dropload-down').show();
                            ths.getData = true;
                            aug = ths.jingP;
                            ths.jingP += 1;
                            ele.find('.dropload-down').show();
                        //     if (ths.jingP > 40) {
                        //         ele.find('.dropload-down').hide();
                        //         ths.jingPBaseButtom ? (ths.showBottomInfo(), ele.find('.check-more-down').show()) : '';
                        //         ths.jingPBaseButtom = false;
                        //         return false;
                        //    }
                            ths.scroll(aug);
                        }
                    }
                });
            },
            templateFn: function (res) {
                var html = '';
                var icon = '';
                var data = res.result.datas;
                for (var i = 0; i < data.length; i++) {
                    icon = '';
                    if (data[i].showNewUpload) {
                        icon += '<span class="new_icon"><mip-img src="' + baseUrl;
                        icon += '/res/img/list-icon-new.png"></mip-img></span>';
                    }
                    if (data[i].showTiejiaBao) {// 保真
                        icon += '<span class="bz_icon"><mip-img src="' + baseUrl;
                        icon += '/res/img/list-icon-bz.png"></mip-img></span>';
                    }
                    // 车商图标
                    if (data[i].equipmentSource === 4 && data[i].promiseStatus === 1) {
                        icon += '<span class="cs2_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-14.png"></mip-img></span>';
                        icon += '<span class="cs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-16.png"></mip-img></span>';
                    }
                    else if (data[i].equipmentSource === 4 && data[i].promiseStatus === 2) {
                        icon += '<span class="cs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-15.png"></mip-img></span>';
                        icon += '<span class="cs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-16.png"></mip-img></span>';
                    }
                    if (data[i].equipmentSource === 4 && data[i].promiseStatus === 3) {
                        icon += '<span class="cs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-15.png"></mip-img></span>';
                        icon += '<span class="cs2_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-14.png"></mip-img></span>';
                        icon += '<span class="cs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/index-icon-16.png"></mip-img></span>';
                    }
                    if (data[i].showSelfSupport) {
                        icon += '<span class="zy_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/list-icon-zy.png"></mip-img></span>';
                        icon += '<span class="kt_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/list-icon-7t.png"></mip-img></span>';
                    }
                    if (data[i].showExclusive) {
                        icon += '<span class="jp_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/list-icon-dj.png"></mip-img></span>';
                    }
                    if (data[i].level < 3 && data[i].inspectStatus === 5) {
                        if (data[i].equipmentSource !== 4 && data[i].equipmentSource !== 5) {
                            icon += '<span class="jc_icon"><mip-img src="' + baseUrl;
                            icon += 'res/img/list-icon-yjc.png"></mip-img></span>';
                        }
                    }
                    else if (data[i].level < 3 && data[i].inspectStatus === 5) {
                        if (data[i].equipmentSource !== 4 && data[i].equipmentSource !== 5) {
                            icon += '<span class="jc_icon"><mip-img src="' + baseUrl;
                            icon += 'res/img/list-icon-yjc.png"></mip-img></span>';
                        }
                    }
                    if (data[i].managerRecommend === 1) {
                        icon += '<span class="gjtj_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/list-icon-gjtj.png"></mip-img></span>';
                    }
                    if (data[i].showVerifiedLabel) {
                        icon += '<span class="yhs_icon"><mip-img src="' + baseUrl;
                        icon += 'res/img/list-icon-yhs.png"></mip-img></span>';
                    }
                    // 首付款
                    var downPaymentStr = '';
                    if (data[i].downPaymentStr) {
                        downPaymentStr = '<div class="payment"><span>贷</span>首付' + data[i].downPaymentStr + '万</div>';
                    }
                    var showInspectVideo = '';
                    if (data[i].showInspectVideo) {
                        showInspectVideo = '<span class="video-icon"></span>';
                    }
                    var reducedPriceStr = '';
                    if (data[i].reducedPriceStr) {
                        reducedPriceStr = '<div class="down-icon">';
                        reducedPriceStr += '已降' + data[i].reducedPriceStr;
                        reducedPriceStr += '</div>';
                    }
                    var itemUrl = mipBaseUrl + 'ue/' + data[i].categoryEnName + '/';
                    var similarityUrl =  baseUrl + 'html/similarity.html?eqId="' + data[i].id;
                    itemUrl += data[i].brandEnName + '_' + data[i].modelEnName + '_' + data[i].id + '.html';
                    html += '<li><div class="log-tap-item col2">';
                    html += '<a class="TapItem" data-href="' + similarityUrl + '>';
                    html += '找相似</a>';
                    html += '<a class="xdj-btn">询底价</a></div>';
                    html += '<a class="boutiqueEqItem" eqId=' + data[i].id + ' href="' + itemUrl + '">';
                    html += '<div class="list-lt">';
                    html += '<mip-img src=' + data[i].firstImgPathDto.pathMid;
                    html += ' class="img-lazyload pd-img"></mip-img>';
                    html += showInspectVideo + reducedPriceStr + '</div>';
                    html += '<div class="pd-info newPd_info_31">';
                    html += '<h3>' + data[i].brandName + data[i].modelName + data[i].categoryName + '</h3>';
                    html += '<div class="taimAddrWrap"><span class="pd-time">';
                    html += data[i].complexFieldDesc.replace('|', '<i>|</i>').replace(/\s+/g, '');
                    html += '<i>|</i></span>';
                    html += '<span class="adr_t">' + data[i].provinceName + '-' + data[i].cityName + '</span></div>';
                    html += '<div class="price-icon"><div class="price">';
                    html += data[i].formatPrice + '<i>万</i>';
                    html += '<div class="xdj-btn" on="tap:fixcall01.telBtn_event(622779)">询底价</div></div></div>';
                    html += '<div class="index-icon">';
                    html += icon + '</div>';
                    html += downPaymentStr + '</div></a></li>';
                }
                return html;
            },
            scroll: function (aug) {
                var ths = this;
                if (!ths.getData) {
                    return false;
                }
                ths.getData = false;
                scrollBoole = false;
                fetch(locBaseUrl + aug + '/').then(function (res) {
                    return res.text();
                }).then(function (res) {
                    var res = JSON.parse(res);
                    if (res.isNoData || parseInt(res.ret, 10) === -1) {
                        ele.find('.dropload-down').hide();
                        scrollBoole = false;
                        return false;
                    }
                    else {
                        var html = ths.templateFn(res);
                        ele.find('.list-container').append(html);
                        scrollBoole = true;
                        ths.getData = true;
                    }
                    ele.find('.dropload-down').hide();
                });
            },
            errorFn: function () {
                // console.log('网络连接不好,请稍后再试!')
            },
            bindEvent: function () {
            },
            showBottomInfo: function () {
                // 已经到底的提示
                var showBi = '';
                ele.find('.is-bottom').show();
                showBi && clearTimeout(showBi);
                showBi = setTimeout(function () {
                    ele.find('.is-bottom').hide();
                    clearTimeout(showBi);
                }, 2000);
            }
        };
        listObj.export();
    };
    return customElement;
});
