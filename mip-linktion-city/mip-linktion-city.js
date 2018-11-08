/**
 * @file mip-linktion-city 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var viewer = require('viewer');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        document.addEventListener('touchmove', function (e) {
            e.returnValue = true;
        }, false);

        // 游客进入45秒后弹出弹框
        setTimeout(function () {
            if ($el.data('login') === false) {
                $el.find('#btn-open')[0].click();
                if ($(window).width() < 768) {
                    $el.find('#phone-btn-open')[0].addEventListener('click', function (event) {
                        viewer.eventAction.execute('tap', event.target, event);
                    });
                    $el.find('#phone-btn-open')[0].click();
                }
            }
        }, 45000);
        this.addEventAction('open', function (event) {
            function initLocationData(locationClass, id) {
                var domain = $el.find('.city-pop-btn').data('domain');
                var url = domain + '/common/city/' + id + '/group';
                fetch(url).then(function (res) {
                    return res.json();
                }).then(function (datas) {
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
                // $.ajax({
                //     type: 'get',
                //     url: url
                // }).done(function (datas) {
                //     var data = '';
                //     if (datas) {
                //         // 移动端城市js
                //         data = datas.data.cities;
                //         initPhone(data.AG, data.HK, data.LS, data.TZ, locationClass);
                //         // pc端城市js
                //         uploadPcData(data.AG, data.HK, data.LS, data.TZ, locationClass);
                //         puloadData(data.AG, data.HK, data.LS, data.TZ, locationClass);
                //     }
                // });
            }
            // 选择热门城市直接跳过选城市到选区县
            $el.find('.city-link').on('click', function () {
                var cityid = $(this).data('city');
                var provinceid = $(this).data('province');
                var proname = $(this).data('proname');
                var cityname = $(this).text();
                $el.find('#province-tab').data('tid', '0');
                $el.find('#province-tag p').text(proname);
                $el.find('#city-tag p').text(cityname);
                $el.find('#area-tag p').text('');
                $el.find('#street-tag p').text('');
                $el.find('#province-tag').data('value', provinceid).css('display', 'inline-table');
                $el.find('#city-tag').data('value', cityid).css('display', 'inline-table');
                $el.find('#area-tag').data('value', '').css('display', 'none');
                $el.find('#street-tag').data('value', 'cityid').css('display', 'none');
                $el.find('#area-tab').click();
            });
            initLocationData('province', 0);
            $el.find('#province-tab').on('click', function () {
                initLocationData('province', 0);
            });
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
                    $el.find('#area-tab').click();
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
                if (AGArry.length === 0) {
                    AGHtml = '<li><button class="none-city"> - </button></li>';
                } else {
                    AGArry.forEach(function (items) {
                        AGHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="location-but but-' + locationClass + '">'
                         + items.name + '</button></li>';
                    });
                };
                if (HKArry.length === 0) {
                    HKHtml = '<li><button class="none-city"> - </button></li>';
                } else {
                    HKArry.forEach(function (items) {
                        HKHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="location-but but-' + locationClass + '">'
                         + items.name + '</button></li>';
                    });
                };
                if (LSArry.length === 0) {
                    LSHtml = '<li><button class="none-city"> - </button></li>';
                } else {
                    LSArry.forEach(function (items) {
                        LSHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="location-but but-' + locationClass + '">'
                         + items.name + '</button></li>';
                    });
                };
                if (TZArry.length === 0) {
                    TZHtml = '<li><button class="none-city"> - </button></li>';
                } else {
                    TZArry.forEach(function (items) {
                        TZHtml += '<li><button id="' + items.id + '" type="button" '
                         + 'class="location-but but-' + locationClass + '">'
                         + items.name + '</button></li>';
                    });
                };
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
                            initProvince();
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
                            var areasubmitUrl = $el.find('.city-pop-btn').data('submiturl')
                             + '?cityId=' + areaid;
                            // var bodya =  {cityId: areaid};
                            // window.location.href = window.location.href;
                            // $.ajax({
                            //     type: 'post',
                            //     url: areasubmitUrl,
                            //     data: bodya
                            // }).done(function (data) {
                            //     if (data) {
                            //         $el.find('.load-mask').show();
                            //     }
                            // });
                            // fetch(areasubmitUrl, {method: 'post',
                            // body: JSON.stringify(bodya), headers: {
                            //     'content-type': 'application/json'
                            // }}).then(function (res) {
                            //     return res.json();
                            // }).then(function (datas) {
                            //     var data = '';
                            //     if (datas) {
                            //         if (data) {
                            //             $el.find('.load-mask').show();
                            //         }
                            //     }
                            // });
                            $el.find('.load-mask').show();
                            fetch(areasubmitUrl, {method: 'get',
                            credentials: 'include',
                            headers: {
                                'content-type': 'application/json'
                            }}).then(function (res) {
                                return res.json();
                            }).then(function (datas) {
                                var data = '';
                                if (datas.code === 0) {
                                    document.cookie = document.cookie;
                                    window.location.href = window.location.href;
                                }
                            });
                        }
                        else {
                            $el.find('.phone-city-but.but-street').on('click', function (event) {
                                var phstreetid = $(this).attr('id');
                                var phsubmitUrl = $el.find('.city-pop-btn').data('submiturl')
                                 + '?cityId=' + phstreetid;
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
                                var citySubmitUrl = $el.find('.city-pop-btn').data('submiturl')
                                + '?cityId=' + pcareacityid;
                                // var bodyc = {cityId: pcareacityid};
                                window.location.href = window.location.href;
                                // $.ajax({
                                //     type: 'post',
                                //     url: citySubmitUrl,
                                //     data: bodyc
                                // }).done(function (data) {
                                //     if (data) {
                                //         $el.find('.load-mask').show();
                                //     }
                                // });
                                // fetch(citySubmitUrl, {method: 'post',
                                // body: JSON.stringify(bodyc), headers: {
                                //     'content-type': 'application/json'
                                // }}).then(function (res) {
                                //     return res.json();
                                // }).then(function (datas) {
                                //     var data = '';
                                //     if (datas) {
                                //         if (data) {
                                //             $el.find('.load-mask').show();
                                //         }
                                //     }
                                // });
                                $el.find('.load-mask').show();
                                fetch(citySubmitUrl, {method: 'get',
                                credentials: 'include',
                                headers: {
                                    'content-type': 'application/json'
                                }}).then(function (res) {
                                    return res.json();
                                }).then(function (datas) {
                                    var data = '';
                                    if (datas.code === 0) {
                                        document.cookie = document.cookie;
                                        window.location.href = window.location.href;
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
                            var pcsubmitUrl = $el.find('.city-pop-btn').data('submiturl')
                             + '?cityId=' + pccityid;
                            var bodyd =  {cityId: pccityid};
                            ajaxUpload(pcsubmitUrl, bodyd);
                        }
                    });
                }
            }
            function ajaxUpload(submiturl, bodyData) {
                $el.find('.load-mask').show();
                // $.ajax({
                //     type: 'post',
                //     url: submiturl,
                //     data: bodyData
                // }).done(function (data) {
                //     if (data) {
                //         window.location.href = window.location.href;
                //     }
                // });
                // fetch(submiturl, {method: 'post',
                // body: JSON.stringify(bodyData), headers: {
                //     'content-type': 'application/json'
                // }}).then(function (res) {
                //     return res.json();
                // }).then(function (datas) {
                //     var data = '';
                //     if (datas) {
                //         if (data) {
                //             window.location.href = window.location.href;
                //         }
                //     }
                // });

                fetch(submiturl, {method: 'get',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }}).then(function (res) {
                    return res.json();
                }).then(function (datas) {
                    var data = '';
                    if (datas.code === 0) {
                        document.cookie = document.cookie;
                        window.location.href = window.location.href;
                    }
                });
            }
            // 重新选择
            function initProvince() {
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
                    initProvince();
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
