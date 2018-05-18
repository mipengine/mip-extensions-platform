/**
 * @file mip-tiebaobei-det-carlike 组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var urlHost = window.location.host;
        var baseUrl = '';
        var ele = $(this.element);
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
        var getRandomNum = function (min, max) {
            var range = max - min;
            var rand = Math.random();
            return (min + Math.round(rand * range));
        };
        // 找相似长按显示
        // $('.car-list1').on('longTap', 'li', function (e) {
        //     var ths = $(this);
        //     e.stopPropagation();
        //     e.preventDefault();
        //     $('.log-tap-item').removeClass('act').hide();
        //     ths.find('.log-tap-item').fadeIn();
        // });
        // // 找相似点击隐藏
        // $('.car-list1').on('tap', '.log-tap-item', function (e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        //     pointerEvents();
        //     $(this).hide();
        // });
        // 找相似按钮点击
        ele.find('.car-list1').on('click', '.zxs-btn', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var href = $(this).parents('li').find('.log-tap-item a').eq(0).attr('data-href');
            window.top.location.href = href;
            // var id = $(this).parents('li').attr('eqid');
            // // 弹出引导层或手机号输入框
            // $('#dialBox').show();
            // $('#dialBox .inp input').focus();
            // $('#dialBox .Jclose, .dialBtn').removeClass('isFreeTel');
            // $('.dialBtn').attr({
            //     'eqid': id
            // });
        });
        // 绑定事件，其它元素可通过 on='xxx' 触发
        // this.addEventAction('telBtn_event', function (event/* 对应的事件对象 */, str /* 事件参数 */) {
        // });
        ele.find('.fix-free-tel').on('click', function (e) {
            ele.find('#dialBox').show();
            ele.find('#dialBox .inp input').focus();
            ele.find('#dialBox .Jclose,.dialBtn').addClass('isFreeTel');
        });
        ele.find('#dialBox .Jclose').on('click', function (e) {
            e.stopPropagation();
            ele.find('#dialBox').hide();
        });
        // 清空输入框
        ele.find('#dialBox .clear').on('click', function () {
            $(this).closest('div').find('input').focus().val('');
        });
        ele.find('#callOutPic .co_c').on('click', function () {
            ele.find('#callOutPic').hide();
        });
        ele.find('#dialBox .conBox').on('click', function (e) {
            e.stopPropagation();
        });
        // 拨打电话提交按钮
        ele.find('.dialBtn').on('click', function (e) {
            // e.stopPropagation();
            var ths = $(this);
            var mobileReg = /^1+\d{10}$/;
            if (mobileReg.test(ele.find('#userPhone').val())) {
                ele.find('#checkUserPhone').val(ele.find('#userPhone').val());
                ele.find('#callOutPic .co_tt').html('您的手机 <span>' + ele.find('#userPhone').val() + '</span> 将接到');
                ele.find('#callOutPic .co_t').text('铁甲的来电请注意接听');
                ele.find('#callOutPic').show();
                ele.find('#dialBox').hide();
                $('#indexContent').attr('style', '');
                var uniqueSymbol = getRandomNum(10000, 99999) + '$' + getRandomNum(10000, 99999999);
                if (ths.hasClass('isFreeTel')) {
                    // scFnE28('免费通话');
                    var datass = '?customerNumber=' + ele.find('#userPhone').val();
                    datass += '&pageFromType=S';
                    datass += '&uniqueSymbol=' +  uniqueSymbol;
                    datass += '&channel:61';
                    datass += '&hotlineShare=""';
                    datass += '&currentUserId=""';
                    datass += '&currentUserWorkPhone=""';
                    datass += '&code=""';
                    datass += '&distinctId=' + getRandomNum(10000, 99999999);
                    fetchJsonp(apiUrl + 'api/app/callCenter' + datass, {
                        jsonpCallback: 'callback'
                    }).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        if (result.ret === 0) {
                            ele.find('#dialBox').hide();
                        }
                        else if (result.ret === 1106) {
                            ele.find('#dialBox').hide();
                            ele.find('.srlj-wrap-con').show();
                            ele.find('#checkYzm').focus();
                            ele.find('#callOutPic').hide();
                        }
                        else if (result.ret === 1104) {
                            ele.find('#callOutPic').find('.co_tt').text('');
                            ele.find('#callOutPic').find('.co_t').text('验证失败，请在24小时后再发起通话');
                            ele.find('#callOutPic').show();
                        }
                        else {
                            ele.find('#callOutPic').find('.co_tt').text('');
                            ele.find('#callOutPic').find('.co_t').text('信号不太好, 请再试一下吧');
                            ele.find('#callOutPic').show();
                        }
                    }).catch(function (ex) {
                       // console.log('parsing failed', ex);
                    });
                }
            }
            else {
                alert('手机号不合法');
                return false;
            }
        });
        // //优选车源点击
        var scrollBoole = true;
        var listObj = {
            jingP: 10,
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
                    var navTop = ele.find('#indexListTitle').offset().top;
                    if (scrollTop  >= navTop) {
                        ele.find('.fix-btn').show();
                    }
                    else {
                        ele.find('.fix-btn').hide();
                    }
                    if ((scrollTop + windowHeight >= scrollHeight) && scrollBoole) {
                        if (ele.find('#boutique li').length >= 10) {
                            ele.find('#boutique').find('.dropload-down').show();
                            ths.getData = true;
                            aug = '&pageOffset=' + ths.jingP;
                            ths.jingP += 10;
                            ele.find('.dropload-down').show();
                            if (ths.jingP > 40) {
                                ele.find('#boutique > .dropload-down').hide();
                                ths.jingPBaseButtom ? (ths.showBottomInfo(), ele.find('.check-more-down').show()) : '';
                                ths.jingPBaseButtom = false;
                                return false;
                            }
                            ths.scroll(aug);
                        }
                    }
                });
            },
            templateFn: function (res) {
                var html = '';
                var icon = '';
                var data = res.datas;
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
                    var itemUrl = baseUrl + 'ue/' + data[i].categoryEnName + '/';
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
                    html += '<div class="zxs-btn">找相似</div></div></div>';
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
                fetchJsonp(apiUrl + 'api/app/listCategory?pageSize=10&item=3' + aug, {
                    jsonpCallback: 'callback'
                }).then(function (response) {
                    return response.json();
                }).then(function (res) {
                    var result = {};
                    // console.log('登录成功---', res);
                    // ele.find('#similarity > ul').append(html);
                    if ((parseInt(result.totalRecord, 10) < 50)) {
                        ele.find('.check-more-down').css('display', 'none !important');
                    }
                    if (ths.jingP > res.totalRecord) {
                        return false;
                    }
                    if (res.ret === -1) {
                        ths.showBottomInfo();
                    }
                    else {
                        var html = ths.templateFn(res);
                        ele.find('#boutique > ul').append(html);
                        scrollBoole = true;
                        ths.getData = true;
                    }
                    ele.find('.dropload-down').hide();
                }).catch(function (ex) {
                   // console.log('parsing failed', ex);
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
