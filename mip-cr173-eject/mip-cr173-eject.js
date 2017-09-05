/**
 * @file mip-cr173-eject 组件
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
        noAd: JSON.parse($('.f-noAd').html())
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
            var azEjectData = pageInfo.ejectandroid; // 获取安卓弹层数据
            var azOhterEjectData = pageInfo.ejectOhterAndroid; // 获取安卓弹层数据（排除城市）
            var azEject = {
                list: []
            };
            var azOhterEject = {
                list: []
            };
            var i = 0;
            for (i = 0; i < azEjectData.length; i++) {
                var amp = '&amp;';
                if (azEjectData[i][1].indexOf(amp) !== -1) {
                    azEjectData[i][1] = azEjectData[i][1].replace(new RegExp(amp, 'g'), '&');
                }

                azEject.list.push({title: azEjectData[i][0], url: azEjectData[i][1], smallimg: azEjectData[i][2]});
            }
            for (i = 0; i < azOhterEjectData.length; i++) {
                var title = azOhterEjectData[i][0];
                var url = azOhterEjectData[i][1];
                var smallimg = azOhterEjectData[i][2];
                var amp = '&amp;';
                if (url.indexOf(amp) !== -1) {
                    url = url.replace(new RegExp(amp, 'g'), '&');
                }

                azOhterEject.list.push({title: title, url: url, smallimg: smallimg});
            }
            province = remotIpInfo.province;
            city = remotIpInfo.city;
            if (city !== '北京' && city !== '上海' && city !== '武汉') {
                this.addDate(document.querySelector('.m-hideshow-top'), azOhterEject);
            }
            else {
                this.addDate(document.querySelector('.m-hideshow-top'), azEject);
            }
        },
        addDate: function (htmldom, date) {
            // 获取数据后，通过 template 模板渲染到页面的
            templates.render(htmldom, date).then(function (html) {
                htmldom.innerHTML = html;
            });
        },
        ifMatching: function () {
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
                if ($.inArray(pageInfo.categroyId, pageInfo.catearrIos) === -1 && $('.g-tags-box ul li').length <= 0) { // 没有匹配到
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
                    if ($.inArray(pageInfo.categroyId, pageInfo.catearr) === -1 && $('.g-tags-box ul li').length <= 0) {
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
                if (!isAds) {
                    this.addhighLab();
                }
            }
        },
        clickFunctionEject: function () {
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
            $('#address').unbind('click');
            fetchJsonp('https://ca.6071.com/index/filter?callback=callback', {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                var clickN = 0;
                var resTitle = $('h1').text() || ''; // 资源的名称
                resTitle = resTitle.split(/(\s|\()/)[0];
                if (data === true) {
                    if (($('#address').attr('issw') || $('#address').attr('ispc'))) {
                        $('#address').click(function () {
                            $('.m-click-show').show();
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

                    $('.g-foot-nav').append('<p style="display:block">安卓360植入成功,返回值为：' + data + '</p>');
                }

            });
            $('.m-close-btn,.m-black-bg').click(function () {
                $('.m-click-show').hide();
            });
        },
        iossoftAdd: function () {}
    };
    customElement.prototype.build = function () {
        ejectJs.init();
    };
    return customElement;
});
