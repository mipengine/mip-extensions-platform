/**
 * @file mip-linktion-city 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        // 游客进入45秒后弹出弹框
        setTimeout(function () {
            if ($el.data('login') === false) {
                $el.find('#btn-open')[0].click();
                if ($(window).width() < 768) {
                    $el.find('#phone-btn-open').trigger('tap');
                }
            };
        }, 45000);
        this.addEventAction('open', function (event) {
            function initLocationData(locationClass, id) {
                var domain = $el.find('.city-pop-btn').data('domain');
                var url = domain + '/common/city/' + id + '/group';
                $.ajax({
                    type: 'get',
                    url: url
                }).done(function (datas) {
                    var data = '';
                    if (datas) {
                        // 移动端城市js
                        data = datas.data.cities;
                        initPhone(data.AG, data.HK, data.LS, data.TZ, locationClass);
                        // pc端城市js
                        uploadPcData(data.AG, data.HK, data.LS, data.TZ, locationClass);
                        puloadData(data.AG, data.HK, data.LS, data.TZ, locationClass);
                    }
                });
            }
            initLocationData('province', 0);
            $el.find('#city-tab').on('click', function () {
                if ($el.find('#province-tag').data('value') !== '') {
                    var provinceId = $el.find('#province-tag').data('value');
                    initLocationData('city', provinceId);
                }
                else {
                    showTips('请先选择省级', 'err');
                    $el.find('#province-tab').click();
                }
            });
            $el.find('#area-tab').on('click', function () {
                if ($el.find('#city-tag').data('value') !== '') {
                    var cityId = $el.find('#city-tag').data('value');
                    initLocationData('area', cityId);
                }
                else {
                    showTips('请先选择市级', 'err');
                    $el.find('#province-tab').click();
                }
            });
            $el.find('#street-tab').on('click', function () {
                if ($el.find('#area-tag').data('value')  !== '') {
                    var areaId = $el.find('#area-tag').data('value');
                    initLocationData('street', areaId);
                }
                else {
                    $el.find('#province-tab').click();
                    showTips('请先选择区县级', 'err');
                }
            });
            function hideHints() {
                setTimeout(function () {
                    $el.find('.web-hint').fadeOut();
                }, 6000);
            }
            function showTips(text, status) {
                var hintsHtml = '';
                if (status === 'err') {
                    hintsHtml = '<div class="web-error web-hint">'
                                + '<p>' + text + '</p>'
                                + '</div>';
                }
                else if (status === 'success') {
                    hintsHtml = '<div class="web-hint web-succeed">'
                                + ' <p>' + text + '</p>'
                                + ' </div>';
                }
                $el.find('.hints').html(hintsHtml);
                hideHints();
            }
            // 判断pc端获取数据
            function uploadPcData(AGArry, HKArry, LSArry, TZArry, locationClass) {
                var AGHtml = '';
                var HKHtml = '';
                var LSHtml = '';
                var TZHtml = '';
                var AGSeletor = '#' + locationClass + ' .AG';
                var HKSeletor = '#' + locationClass + ' .HK';
                var LSSeletor = '#' + locationClass + ' .LS';
                var TZSeletor = '#' + locationClass + ' .TZ';
                AGArry.forEach(function (items) {
                    AGHtml += '<li><button id="' + items.id + '" type="button" '
                     + 'class="location-but but-' + locationClass + '">' + items.name + '</button></li>';
                });
                HKArry.forEach(function (items) {
                    HKHtml += '<li><button id="' + items.id + '" type="button" '
                     + 'class="location-but but-' + locationClass + '">' + items.name + '</button></li>';
                });
                LSArry.forEach(function (items) {
                    LSHtml += '<li><button id="' + items.id + '" type="button" '
                     + 'class="location-but but-' + locationClass + '">' + items.name + '</button></li>';
                });
                TZArry.forEach(function (items) {
                    TZHtml += '<li><button id="' + items.id + '" type="button" '
                     + 'class="location-but but-' + locationClass + '">' + items.name + '</button></li>';
                });
                $el.find(AGSeletor).html(AGHtml);
                $el.find(HKSeletor).html(HKHtml);
                $el.find(LSSeletor).html(LSHtml);
                $el.find(TZSeletor).html(TZHtml);
            }
            // 判断移动端获取数据
            function initPhone(AGArry, HKArry, LSArry, TZArry, locationClass) {
                if ($(window).width() < 768) {
                    var phoneCityHtml = '';
                    AGArry.forEach(function (items) {
                        phoneCityHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="phone-city-but  but-' + locationClass + '">' + items.name + '</button></li>';
                    });
                    HKArry.forEach(function (items) {
                        phoneCityHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="phone-city-but  but-' + locationClass + '">' + items.name + '</button></li>';
                    });
                    LSArry.forEach(function (items) {
                        phoneCityHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="phone-city-but  but-' + locationClass + '">' + items.name + '</button></li>';
                    });
                    TZArry.forEach(function (items) {
                        phoneCityHtml += '<li><button id="' + items.id + '" type="button" '
                         + ' class="phone-city-but  but-' + locationClass + '">' + items.name + '</button></li>';
                    });
                    if (locationClass === 'province') {
                        $el.find('#phone-province').html(phoneCityHtml);
                    }
                    else if (locationClass === 'city') {
                        $el.find('#phone-city').html(phoneCityHtml);
                    }
                    else if (locationClass === 'area') {
                        $el.find('#phone-area').html(phoneCityHtml);
                    }
                    else if (locationClass === 'street') {
                        $el.find('#phone-street').html(phoneCityHtml);
                    }
                }
            }
            // 选取数据并提交
            function puloadData(AGArry, HKArry, LSArry, TZArry, locationClass) {
                if (locationClass === 'province') {
                    // 移动端城市js
                    if ($(window).width() < 768) {
                        $el.find('.phone-city-but.but-province').on('click', function () {
                            initLocationData('city', $(this).attr('id'));
                            $el.find('#phone-province-tab').data('val', $(this).attr('id'));
                            $el.find('#phone-city-tab').click();
                        });
                    }
                    else {
                        $el.find('.location-but.but-province').on('click', function () {
                            $el.find('#province-tag p').text($(this).text());
                            $el.find('#province-tag').data('value', $(this).attr('id')).css('display', 'inline-table');
                            $el.find('#city-tab').click();
                            initPeovince();
                        });
                    }
                }
                else if (locationClass === 'city') {
                    if ($(window).width() < 768) {
                        $el.find('.phone-city-but.but-city').on('click', function () {
                            initLocationData('area', $(this).attr('id'));
                            $el.find('#phone-city-tab').data('val', $(this).attr('id'));
                            $el.find('#phone-area-tab').click();
                        });
                    }
                    else {
                        $el.find('.location-but.but-city').on('click', function () {
                            $el.find('#city-tag p').text($(this).text());
                            $el.find('#city-tag').data('value', $(this).attr('id')).css('display', 'inline-table');
                            $el.find('#area-tab').click();
                            initCity();
                        });
                    }
                }
                else if (locationClass === 'area') {
                    if ($(window).width() < 768) {
                        $el.find('.phone-city-but.but-area').on('click', function () {
                            initLocationData('street', $(this).attr('id'));
                            $el.find('#phone-area-tab').data('val', $(this).attr('id'));
                            $el.find('#phone-street-tab').click();
                        });
                    }
                    else {
                        $el.find('.location-but.but-area').on('click', function () {
                            $el.find('#area-tag p').text($(this).text());
                            $el.find('#area-tag').data('value', $(this).attr('id')).css('display', 'inline-table');
                            $el.find('#street-tab').click();
                            initArea();
                        });
                    }
                }
                else if (locationClass === 'street') {
                    if ($(window).width() < 768) {
                        if ((AGArry.length === 0) && (HKArry.length === 0)
                         && (LSArry.length === 0) && (TZArry.length === 0)) {
                            var areaid = $el.find('#phone-area-tab').data('val');
                            var areasubmitUrl = $el.find('.city-pop-btn').data('submiturl');
                            var bodya =  {cityId: areaid};
                            window.location.reload();
                            $.ajax({
                                type: 'post',
                                url: areasubmitUrl,
                                data: bodya
                            }).done(function (data) {
                                if (data) {
                                    $el.find('.load-mask').show();
                                }
                            });
                        }
                        else {
                            $el.find('.phone-city-but.but-street').on('click', function (event) {
                                var phstreetid = $(this).attr('id');
                                var phsubmitUrl = $el.find('.city-pop-btn').data('submiturl');
                                var bodyb =  {cityId: phstreetid};
                                ajaxUpload(phsubmitUrl, bodyb);
                            });
                        }
                    }
                    else {
                        if ((AGArry.length === 0) && (HKArry.length === 0)
                         && (LSArry.length === 0) && (TZArry.length === 0)) {
                            if ($el.find('#area-tag').data('value') !== '') {
                                var pcareacityid = $el.find('#area-tag').data('value');
                                var citySubmitUrl = $el.find('.city-pop-btn').data('submiturl');
                                var bodyc = {cityId: pcareacityid};
                                window.location.reload();
                                $.ajax({
                                    type: 'post',
                                    url: citySubmitUrl,
                                    data: bodyc
                                }).done(function (data) {
                                    if (data) {
                                        $el.find('.load-mask').show();
                                    }
                                });
                            }
                        }
                    }
                    $el.find('.location-but.but-street').on('click', function () {
                        $el.find('#street-tag p').text($(this).text());
                        $el.find('#street-tag').data('value', $(this).attr('id'));
                        $el.find('#street-tag').css('display', 'inline-table');
                        if ($el.find('#street-tag').data('value')  !== '') {
                            var pccityid = $el.find('#street-tag').data('value');
                            var pcsubmitUrl = $el.find('.city-pop-btn').data('submiturl');
                            var bodyd =  {cityId: pccityid};
                            ajaxUpload(pcsubmitUrl, bodyd);
                        }
                    });
                }
            }
            function ajaxUpload(submiturl, bodyData) {
                $el.find('.load-mask').show();
                $.ajax({
                    type: 'post',
                    url: submiturl,
                    data: bodyData
                }).done(function (data) {
                    if (data) {
                        window.location.reload();
                    }
                });
            }
            // 重新选择
            function initPeovince() {
                $el.find('.city-label.second-tag').data('value', '');
                $el.find('.city-label.second-tag').css('display', 'none');
            }
            function initCity() {
                $el.find('.city-label.third-tag').data('value', '');
                $el.find('.city-label.third-tag').css('display', 'none');
            }
            function initArea() {
                $el.find('.city-label.forth-tag').data('value', '');
                $el.find('.city-label.forth-tag').css('display', 'none');
            }
            // 移动端添加tab点击事件
            $el.find('#phone-city-tab').on('click', function () {
                if ($el.find('#phone-province-tab').data('val') === '') {
                    showTips('请先选择省级', 'err');
                    $el.find('#phone-province-tab').click();
                }
            });
            $el.find('#phone-area-tab').on('click', function () {
                if ($el.find('#phone-city-tab').data('val') === '') {
                    showTips('请先选择市级', 'err');
                    $el.find('#phone-province-tab').click();
                }
            });
            $el.find('#phone-street-tab').on('click', function () {
                if ($el.find('#phone-area-tab').data('val') === '') {
                    showTips('请先选择区县', 'err');
                    $el.find('#phone-province-tab').click();
                }
            });
            // 城市删除按钮
            $el.find('.city-label button').on('click', function () {
                var location = $(this).data('location');
                if (location === 'province') {
                    $el.find('#province-tab').click();
                    initPeovince();
                }
                else if (location === 'city') {
                    $el.find('#province-tab').click();
                    initCity();
                }
                else if (location === 'area') {
                    $el.find('#province-tab').click();
                    initArea();
                }
                else if (location === 'street') {
                    $el.find('#province-tab').click();
                    initArea();
                }
                $(this).parent('.city-label').css('display', 'none').data('value', '');
            });
        });
    };
    return customElement;
});
