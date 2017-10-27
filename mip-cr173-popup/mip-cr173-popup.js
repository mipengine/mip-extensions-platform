/**
 * @file mip-cr173-eject 组件,该效果为点击显示弹层组件，要在第一屏显示，必须使用build，否则无法加载数据，不要再打回了。
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var templates = require('templates');
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var pageInfo = {
        id: $('.f-information').attr('data-id'),
        categroyId: Math.ceil($('.f-information').attr('data-categroyId')),
        ismoney: $('.f-information').attr('data-ismoney'),
        ejectandroid: JSON.parse($('.f-android-eject').html()),
        ejectOhterAndroid: JSON.parse($('.f-outer-city-android').html()),
        catearr: JSON.parse($('.f-androidxz-url').html()),
        catearrIos: JSON.parse($('.f-iosxz-url').html()),
        AppArray: JSON.parse($('.f-AppArray').html()),
        chars: JSON.parse($('.f-chars').html()),
        webUrl: JSON.parse($('.f-webUrl').html()),
        noAd: JSON.parse($('.f-noAd').html()),
        openEject: $('.f-open-eject').html(),
        koCity: JSON.parse($('.f-eject-city').html()),
        azspUrl: JSON.parse($('.f-azsp-url').html()),
        iosspUrl: JSON.parse($('.f-iossp-url').html())
    };
    function generateMixed(n) {
        var res = '';
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += pageInfo.chars[id];
        }
        return res;
    }
    var AppID = pageInfo.AppArray[Math.floor(Math.random() * (pageInfo.AppArray.length))];
    var downDomain = pageInfo.webUrl[Math.floor(Math.random() * (pageInfo.webUrl.length))];
    var downUrl = 'http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + AppID + generateMixed(3) + '/setup.apk';
    var myazdownLoad = [];
    myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '888' + generateMixed(3) + '/setup.apk');
    myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '386' + generateMixed(3) + '/setup.apk');
    window.AppID = AppID;
    window.downUrl = downUrl;
    window.myazdownLoad = myazdownLoad;
    var isAds = false;
    var downHref = $('.m-down-ul li a').attr('href');
    var province = '';
    var city = '';
    var remotIpInfo = {
        ret: 1,
        start: -1,
        end: -1,
        country: '\u4e2d\u56fd',
        province: '\u6e56\u5317',
        city: '\u6b66\u6c49',
        district: '',
        isp: '',
        type: '',
        desc: ''
    };
    var ejectJs = {
        init: function () {
            this.addEjectHtml(); // 添加弹出推荐内容
            this.ifMatching(); // 判断设备
            this.clickFunctionEject(); // 点击触发弹层
        },
        addEjectHtml: function () {
            province = remotIpInfo.province;
            city = remotIpInfo.city;
            var koCity = pageInfo.koCity;
            var aurl = $('.f-ajul').attr('data-topdateurl');
            var ajatkurl = aurl + 'app/show_az_outercity.json';
            if ($.inArray(city, koCity) !== -1) {
                var ajatkurl = aurl + 'app/show_az_allcity.json';
            }
            fetch(ajatkurl)
            .then(function (res) {
                return res.text();
            }).then(function (data) {
                var html = '';
                var data = (new Function('', 'return' + data))();
                var n = data.list;
                for (var o = 0; o < n.length; ++o) {
                    html += '<li><a href="' + n[o].url + '"><mip-img src="' + n[o].SmallImg;
                    html += '" onclick="_czc.push([\'_trackEvent\',\'MIPtankuang\',\'MIPtankuang' + (o + 1) + '\',\'';
                    html += n[o].ResName + '\'])"></mip-img><p><strong>';
                    html += n[o].ResName + '</strong><b>下载</b></p></a></li>';
                }
                $('.f-tkul').append(html);
            }).catch(function (err) {
            });

        },
        addDate: function (htmldom, date) {
            // 获取数据后，通过 template 模板渲染到页面的
            templates.render(htmldom, date).then(function (html) {
                htmldom.innerHTML = html;
            });
        },
        ifMatching: function () {
            var spDownUrl = $('#address').attr('href');
            var i = 0;
            for (i = 0; i < pageInfo.noAd.length; i++) {
                if (downHref.indexOf(pageInfo.noAd[i]) > -1) {
                    isAds = true;
                }

            }
            if (pageInfo.ismoney === 1) {
                isAds = true;
            }

            if (platform.isIos()) { // IOS
                var iosspUrlid = 0; // 0位适配失败，1为适配成功
                if ($.inArray(spDownUrl, pageInfo.iosspUrl) !== -1) {
                    iosspUrlid = 1;
                }
                var ifiosSp = $.inArray(pageInfo.categroyId, pageInfo.catearrIos);
                if (ifiosSp === -1 && $('.g-tags-box ul li').length <= 0 && iosspUrlid === 0) { // 没有匹配到
                    $('.m-down-ul li a').attr({href: 'javascript:;', ispc: true});
                }
                else { // 匹配资源
                    $('.m-down-ul li a').attr('issw', true);
                }
                if (!isAds) {
                    this.iossoftAdd();
                }
            }
            else { // 安卓
                var idArray = [];
                idArray = downHref.split('.');
                if (downHref.indexOf('mo.L5645.net') !== -1 && $('.g-tags-box ul li').length <= 0) {
                    $('.m-down-ul li a').attr('href', '/down.asp?id=' + idArray[4]);
                    $('.m-down-msg .type b:last').html('系统：Android');
                }
                else {
                    var azspUrlid = 0; // 0位适配失败，1为适配成功
                    if ($.inArray(spDownUrl, pageInfo.azspUrl) !== -1) {
                        azspUrlid = 1;
                    }
                    var ifazSp = $.inArray(pageInfo.categroyId, pageInfo.catearr);
                    if (ifazSp === -1 && $('.g-tags-box ul li').length <= 0 && azspUrlid === 0) {
                        $('.m-down-ul li a').attr({href: 'javascript:;', ispc: true});
                    }
                    else {
                        $('.m-down-ul li a').attr('issw', true);
                    }
                }
                if ($('.m-down-ul li a').attr('ispc')) {
                    $('.g-show-title p').html('该软件无安卓版，大家<span>还下载了</span>这些：');
                }
                else {
                    $('.g-show-title p').html('大家<span>还下载了</span>这些：');
                }
                $('.g-foot-nav').append('<p style="display:block">是否为商务包：' + isAds + '</p>');
                if (!isAds) {
                    $('.g-foot-nav').append('<p style="display:block">不是商务包进入成功</p>');
                    this.addhighLab();
                }
            }
        },
        clickFunctionEject: function () {
            if (pageInfo.openEject === '关闭弹层') {
                return false;
            }

            $('.m-down-ul li a').click(function () {
                if (platform.isIos()) {
                }
                else {
                    var setTimer = setTimeout(function () {
                        $('.m-click-show').show();
                    }, 100);
                }
            });
            $('.m-close-btn,.m-black-bg').click(function () {
                $('.m-click-show').hide();
            });
        },
        addhighLab: function () {
            fetchJsonp('https://ca.6071.com/index/filter', {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var clickN = 0;
                var resTitle = $('h1').text() || ''; // 资源的名称
                resTitle = resTitle.split(/(\s|\()/)[0];
                $('.g-foot-nav').append('<p style="display:block">成功进入,返回值为：' + data + '</p>');
                if (data === true) {
                    if (($('#address').attr('issw') || $('#address').attr('ispc'))) {
                        $('#address').click(function () {
                            if (clickN <= 0) {
                                var hzUrl = $('.f-hzurl').html().replace(/\&amp;/g, '&');
                                window.location.href = hzUrl;
                                clickN++;
                                return false;
                            }
                            else {
                                if ($('#address').attr('ispc')) {
                                    $('#address').attr('href', 'javascript:;');
                                }
                            }
                        });
                    }

                    $('.g-foot-nav').append('<p style="display:block">点击成功启动,返回值为：' + data + '</p>');
                }

            });
            $('.g-foot-nav').append('<p style="display:block">进入成功</p>');
        },
        iossoftAdd: function () {}
    };
    customElement.prototype.build = function () {
        ejectJs.init();
    };
    return customElement;
});
