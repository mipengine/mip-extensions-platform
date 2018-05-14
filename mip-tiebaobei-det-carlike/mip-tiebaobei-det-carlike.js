/**
 * @file mip-tiebaobei-det-carlike 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var urlHost = window.location.host;
        var baseUrl = '';
        var ele = $(this.element);
        var baseEqid = ele.find('.carLike').attr('data-eqid');
        var apiUrl = '';
        if (urlHost === 'm.tiebaobei.com' || (urlHost === 'h5.tiebaobei.com')) {
            baseUrl = 'https://m.tiebaobei.com/';
            apiUrl = 'https://api2.tiebaobei.com/';
        }
        else if (urlHost === 'm.test.tiebaobei.com' || (urlHost === 'h5.test.tiebaobei.com')) {
            baseUrl = 'http://m.test.tiebaobei.com/';
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        else {
            baseUrl = 'http://m.test.tiebaobei.com/';
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        var fetchJsonp = require('fetch-jsonp');
        var templateFn = function (res) {
            var html = '';
            var icon = '';
            var data = res;
            for (var i = 0; i < data.length; i++) {
                icon = '';
                if (data[i].showNewUpload) {
                    icon += '<span class="new_icon"><img src="' + baseUrl + '/res/img/list-icon-new.png"></span>';
                }
                if (data[i].showTiejiaBao) {// 保真
                    icon += '<span class="bz_icon"><img src="' + baseUrl + '/res/img/list-icon-bz.png"></span>';
                }
                if (data[i].showUnRightPay) {// 车商图标
                    icon += '<span class="cs2_icon"><img src="' + baseUrl + '/res/img/index-icon-14.png"></span>';
                }
                if (data[i].showFiveRetreat) {
                    icon += '<span class="cs_icon"><img src="' + baseUrl + '/res/img/index-icon-15.png"></span>';
                }
                if (data[i].showDealer) {
                    icon += '<span class="cs_icon"><img src="' + baseUrl + '/res/img/index-icon-16.png"></span>';
                }
                if (data[i].showSelfSupport) {
                    icon += '<span class="zy_icon"><img src="' + baseUrl + '/res/img/list-icon-zy.png"></span>';
                    icon += '<span class="kt_icon"><img src="' + baseUrl + '/res/img/list-icon-7t.png"></span>';
                }
                if (data[i].showExclusive) {
                    icon += '<span class="jp_icon"><img src="' + baseUrl + '/res/img/list-icon-dj.png"></span>';
                }
                if (data[i].showInspect) {
                    icon += '<span class="jc_icon"><img src="' + baseUrl + '/res/img/list-icon-yjc.png"></span>';
                }
                if (data[i].managerRecommend) {
                    icon += '<span class="gjtj_icon"><img src="' + baseUrl + '/res/img/list-icon-gjtj.png"></span>';
                }
                if (data[i].showVerifiedLabel) {
                    icon += '<span class="yhs_icon"><img src="' + baseUrl + '/res/img/list-icon-yhs.png"></span>';
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

                html += '<li><a class="item" eqId=' + data[i].id + ' href=' + data[i].detailUrl + '>';
                html += '<div class="list-lt">';
                html += '<img src=' + data[i].firstImgPathDto.pathMid + ' class="img-lazyload pd-img">';
                html += showInspectVideo + reducedPriceStr + '</div>';
                html += '<div class="pd-info newPd_info_31">';
                html += '<h3>' + data[i].brandName + data[i].modelName + data[i].categoryName + '</h3>';
                html += '<div class="taimAddrWrap"><span class="pd-time">';
                html += data[i].complexFieldDesc.replace('|', '<i>|</i>').replace(/\s+/g, '');
                html += '<i>|</i></span>';
                html += '<span class="adr_t">' + data[i].provinceName + '-' + data[i].cityName + '</span></div>';
                html += '<div class="price-icon"><div class="price">';
                html += data[i].formatPrice + '<i>万</i>';
                html += '<div class="zxs-btn">找相似</div></div></div>';
                html += '<div class="index-icon">';
                html += icon + '</div>';
                html += downPaymentStr + '</div></a></li>';
            }
            return html;
        };
        // //优选车源点击
        fetchJsonp(apiUrl + 'api/app/eqSameBrandRecommend/' + baseEqid, {
            jsonpCallback: 'callback',
            includeEqId: 0
        }).then(function (response) {
            return response.json();
        }).then(function (res) {
            var result = {};
            //  console.log('登录成功---', res);
            result.list = res;
            var html = templateFn(result.list);
            ele.find('#similarity > ul').append(html);
        }).catch(function (ex) {
           // console.log('parsing failed', ex);
        });
        // 切换猜你喜欢
        ele.find('.carListTitle').on('click', 'p', function () {
            var ths = $(this);
            ele.find('.carListTitle p').removeClass('currentTitle');
            if (ths.hasClass('boutiqueCar')) {
                ele.find('#boutique').show();
                ele.find('#similarity').hide();
                ele.find('.boutiqueCar').addClass('currentTitle');
            }
            else {
                ele.find('#similarity').show();
                ele.find('#boutique').hide();
                ele.find('.similarityCar').addClass('currentTitle');
            }
        });
    };
    return customElement;
});
