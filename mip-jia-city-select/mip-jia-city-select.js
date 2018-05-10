/**
 * @file mip-jia-city-select 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var BaiduMap = require('./map');

    var isCity = true;
    var cityList = null;
    var classifyTitle;
    var classifyContent;
    var cityPageZxbj = {
        init: function (curEle) {
            cityPageZxbj.method.locateByGeocode(curEle);
        },
        method: {
            swiper3City: function () {
                var Swipern = window.Swiper;
                classifyTitle = new Swipern('.province-box', {
                    direction: 'vertical',
                    slidesPerView: 'auto'
                });
                classifyContent = new Swipern('.city-box', {
                    direction: 'vertical',
                    slidesPerView: 'auto'
                });
            },
            cityCommonPop: function (curEle) {
                if (isCity) {
                    // 添加所有省市
                    cityPageZxbj.method.cityFn(curEle);
                    curEle.find('.area-layer').show();
                    curEle.find('.area-select-box').addClass('slideLeft');
                    isCity = false;
                }
                else {
                    // swiper更新
                    curEle.find('.area-layer').show();
                    curEle.find('.area-select-box').addClass('slideLeft');
                    var numSide = curEle.find('.area-select-box .province-box li.cur').index();
                    var numSide2 = curEle.find('.area-select-box .city-box li.cur').index();
                    classifyTitle.init();
                    classifyTitle.slideTo(numSide, 1000);
                    classifyContent.slideTo(numSide2, 1000);
                }
            },
            cityFn: function (curEle) {
                // 接口调取省市的数据
                $.ajax({
                    url: '//m.jia.com/new_zhuangxiu/getCityNew/',
                    type: 'get',
                    dataType: 'jsonp',
                    success: function (area) {
                        cityList = area;
                        if (cityList !== '') {
                            var numSide;
                            var numSide2;
                            cityPageZxbj.method.cityProvince(cityList,
                                curEle.find('.province-box .swiper-wrapper'),
                                curEle.find('.input-city').data('pro'),
                                curEle.find('.city-box .swiper-wrapper'), curEle);
                            numSide = curEle.find('.area-select-box .province-box li.cur').index();
                            numSide2 = curEle.find('.area-select-box .city-box li.cur').index();
                            cityPageZxbj.method.swiper3City();
                            classifyTitle.slideTo(numSide, 1000);
                            classifyContent.slideTo(numSide2, 1000);
                            curEle.find('.province-box li').on('click', function (e) {
                                e.stopPropagation();
                                $(this).addClass('cur').siblings().removeClass('cur');
                                cityPageZxbj.method.cityProvince(cityList,
                                    curEle.find('.province-box .swiper-wrapper'),
                                    $(this).find('.area-name').text(),
                                    curEle.find('.city-box .swiper-wrapper'), curEle);
                                classifyContent.update();
                                classifyContent.slideTo(0);
                            });
                            curEle.on('click', '.city-box .swiper-a', function () {
                                $(this).parent().addClass('cur').siblings().removeClass('cur');
                                curEle.find('.input-city').val(curEle.find('.province-box li.cur .area-name')
                                    .text() + ' ' + $(this).text());
                                curEle.find('#provinceCn').val($(this).data('pro'));
                                curEle.find('#areaCn').val($(this).text());
                                curEle.find('.input-city').attr('data-pro', $(this).data('pro'));
                                curEle.find('.input-city').attr('data-dis', $(this).text());
                                curEle.find('#city_code').val($(this).data('id'));
                            });
                        }
                        curEle.find('.area-select-box').on('click', function () {
                            curEle.find('.area-select-box').removeClass('slideLeft');
                            curEle.find('.area-layer').hide();
                        });
                    }
                });
            },
            cityProvince: function (province, $appendProEle, targetEle, $appendTownEle, curEle) {
                var provinceStr = '';
                var townStr = '';
                for (var i in province) {
                    for (var j in province[i]) {
                        if (j === targetEle) {
                            provinceStr += '<li class="cur swiper-slide">';
                            provinceStr += '<div class="swiper-a">';
                            provinceStr += '<span class="first_letter">' + i + '</span>';
                            provinceStr += '<span class="area-name">' + j + '</span></div></li>';
                        }
                        else {
                            provinceStr += '<li class="swiper-slide">';
                            provinceStr += '<div class="swiper-a">';
                            provinceStr += '<span class="first_letter">' + i + '</span>';
                            provinceStr += '<span class="area-name">' + j + '</span></div></li>';
                        }
                    }
                    for (var k in province[i][targetEle]) {
                        if (curEle.find('.input-city').attr('data-dis') === province[i][targetEle][k].city_cn) {
                            townStr += '<li class="cur swiper-slide">';
                            townStr += '<div class="swiper-a" data-city="'
                                + province[i][targetEle][k].city_py + '" data-id="'
                                + province[i][targetEle][k].id + '" data-pro="'
                                + province[i][targetEle][k].pro_cn + '">'
                                + province[i][targetEle][k].city_cn + '</div></li>';
                        }
                        else {
                            townStr += '<li class="swiper-slide">';
                            townStr += '<div class="swiper-a" data-city="'
                                + province[i][targetEle][k].city_py
                                + '" data-id="' + province[i][targetEle][k].id
                                + '" data-pro="' + province[i][targetEle][k].pro_cn + '">'
                                + province[i][targetEle][k].city_cn + '</div></li>';
                        }
                    }
                }
                if ($.trim($appendProEle.html()) === '') {
                    $appendProEle && $appendProEle.html('').append(provinceStr);
                }
                $appendTownEle && $appendTownEle.html('').append(townStr);
            },
            locateByGeocode: function (curEle) {
                var Bmap = window.BMap;
                if (storage.get('bdPos')) {
                    var bdLocation = storage.get('bdPos').split(',');
                    cityPageZxbj.method.changeLntLat(true, bdLocation[0], bdLocation[1], 'success', curEle);
                }
                else {
                    // 获取百度定位的经纬度
                    var geolocation = new Bmap.Geolocation();
                    geolocation.getCurrentPosition(function (r) {
                        var pt = r.point;
                        cityPageZxbj.method.changeLntLat(true, pt.lat, pt.lng, 'success', curEle);
                    });
                }
            },
            changeLntLat: function (a, b, c, d, curEle) {
                var lng = c;
                var lat = b;
                if (a === true) {
                    var dataLo = {lo: lat + ',' + lng};
                    $.ajax({
                        url: '//m.jia.com/new_zhuangxiu/getAreaByLocation',
                        data: dataLo,
                        type: 'post',
                        dataType: 'jsonp',
                        success: function (data) {
                            if (data.info.city_name === data.info.province_name) {
                                curEle.find('.input-city').val(data.info.province_name + ' ' + data.info.district_name);
                                curEle.find('#city_code').val(data.info.district_id);
                                curEle.find('#provinceCn').val(data.info.province_name);
                                curEle.find('#areaCn').val(data.info.district_name);
                                curEle.find('.input-city').attr('data-pro', data.info.province_name);
                                curEle.find('.input-city').attr('data-dis', data.info.district_name);
                                storage.set('bdPos', lat + ',' + lng, 21600000);
                            }
                            else {
                                curEle.find('.input-city').val(data.info.province_name + ' ' + data.info.city_name);
                                curEle.find('#city_code').val(data.info.city_id);
                                curEle.find('#provinceCn').val(data.info.province_name);
                                curEle.find('#areaCn').val(data.info.city_name);
                                curEle.find('.input-city').attr('data-pro', data.info.province_name);
                                curEle.find('.input-city').attr('data-dis', data.info.city_name);
                                storage.set('bdPos', lat + ',' + lng, 21600000);
                            }
                            if (data.info === '定位失败' || data.info === 'error location') {
                                curEle.find('.city-box ul li').eq(0).addClass('cur');
                                curEle.find('.input-city').val('上海 闵行');
                                curEle.find('#city_code').val('310112');
                                curEle.find('#provinceCn').val('上海');
                                curEle.find('#areaCn').val('闵行');
                                curEle.find('.input-city').attr('data-pro', '上海');
                                curEle.find('.input-city').attr('data-dis', '闵行');
                            }
                        }
                    });
                }
                else {
                    tipMask('定位失败，请开启定位');
                }
            }
        }
    };
    // 弹出提示层
    function tipMask(obj, msg, duration) {
        duration = duration || 2000;
        obj.find('.popup-mask').text(msg);
        obj.find('.popup-mask').addClass('show');
        var tipMaskTimer = setTimeout(function () {
            obj.find('.popup-mask').fadeOut(100, function () {
                $(this).removeClass('show');
            });
            clearTimeout(tipMaskTimer);
        }, duration);
    }

    // 页面渲染后就处理,获取城市地理位置
    customElement.prototype.build = function () {
        var thisObj = this.element;
        var elemObj = thisObj.querySelector('script[type="application/json"]');
        try {
            var data = JSON.parse(elemObj.textContent.toString());
        } catch (e) {
            thisObj.innerHTML = '';
            return false;
        }
        new BaiduMap(thisObj, data, function () {
            cityPageZxbj.init($(thisObj));
        });

        $(thisObj).find('.input-city').click(function () {
            // 第一次点击调取城市接口、后面则更新swiper
            cityPageZxbj.method.cityCommonPop($(thisObj));
        });
        $(thisObj).find('.input-city').on({
            focus: function () {
                $(this).blur();
            }
        });
    };
    return customElement;
});
