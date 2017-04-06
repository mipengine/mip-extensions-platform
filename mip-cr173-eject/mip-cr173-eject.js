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
    var catearr = [151, 156, 158, 159, 160, 161, 162, 163, 164,
        256, 257, 258, 178, 179, 180, 181, 182, 183, 184, 185, 186, 207, 208,
        81, 209, 210, 211, 212, 218, 219, 220, 221, 222, 223, 224, 225, 226, 230,
        237, 238, 239, 240, 241, 308, 309, 310, 311, 328, 322, 323, 324, 325, 326, 329]; // 安卓分类
    var catearrIos = [141, 214, 215, 216, 227, 228, 229, 231, 232, 233, 234,
        235, 312, 313, 314, 315, 316, 317, 318, 319, 327, 330]; // ios分类
    var AppArray = [435, 368]; // 应用宝的id数
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'];
    function generateMixed(n) {
        var res = '';
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    var webUrl = ['L5645.net', 'L5645.com', 'i8543.net', 'i8543.com', 'u7897.net',
        'u7897.com', 'w2546.net', 'w2546.com', 'a2353.net', 'a2353.com', 'q58723.net', 'q58723.com'];
    var AppID = AppArray[Math.floor(Math.random() * (AppArray.length))];
    var downDomain = webUrl[Math.floor(Math.random() * (webUrl.length))];
    var downUrl = 'http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + AppID + generateMixed(3) + '/setup.apk';
    var myazdownLoad = [];
    myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '888' + generateMixed(3) + '/setup.apk');
    myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '386' + generateMixed(3) + '/setup.apk');
    var isAds = false;
    var downHref = $('.m-down-ul li a').attr('href');
    var noAd = ['6071.com', '1030.apk', 'duokoo.baidu.com', 'ugame.uc.cn', 'ugame.9game.cn', '360.cn', 'ewan.cn', 'anfan.com', 'caohua.com', 'open.play.cn', 'tj.tt1386.com', 'http://g.', 'http://tj.', 'yiwan.com', 'x1.241804.com', 'moban.com', 's.qq.com', '456.com.cn', 'xinkuai.com', 'g.hgame.com', 'yxgames.com', 'qianghongbaoyo.com', 'down1.qianghongbaoyo.com', 'down2.guopan.cn', 'dl.guopan.cn', 'guopan.cn', 'duowan.com'];
    var province = '';
    var city = '';
    var pageInfo = {
        id: $('.f-information').attr('data-id'),
        path: $('.f-information').attr('data-path'),
        categroyId: Math.ceil($('.f-information').attr('data-categroyId')),
        rootId: $('.f-information').attr('data-rootid'),
        commendid: $('.f-information').attr('data-commendid'),
        system: $('.f-information').attr('data-system'),
        ppaddress: $('.f-information').attr('data-ppaddress'),
        ismoney: $('.f-information').attr('data-ismoney'),
        toprecomdandroid: $('.f-toprecomd-azhtml').html(),
        toprecomdios: $('.f-toprecomd-ioshtml').html(),
        ejectandroid: $('.f-android-eject').html(),
        ejectOhterAndroid: $('.f-outer-city-android').html()
    };
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
            this.getScript(); // getScript插件
            this.addEjectHtml(); // 添加弹出推荐内容
            this.ifMatching(); // 判断设备
            this.clickFunctionEject(); // 点击触发弹层
        },
        getScript: function () {
            var getScript = function (url, callback) {
                var head = document.getElementsByTagName('head')[0];
                var js = document.createElement('script');
                js.setAttribute('type', 'text/javascript');
                js.setAttribute('src', url);
                head.appendChild(js);
                var callbackFn = function () {
                    if (typeof callback === 'function') {
                        callback();
                    }

                };
                if (document.all) {
                    js.onreadystatechange = function () {
                        if (js.readyState === 'loaded' || js.readyState === 'complete') {
                            callbackFn();
                        }

                    };
                }
                else {
                    js.onload = function () {
                        callbackFn();
                    };
                }
            };
            $.getScript = getScript;
        },
        addEjectHtml: function () {
            var azEjectData = JSON.parse(pageInfo.ejectandroid); // 获取安卓弹层数据
            var azOhterEjectData = JSON.parse(pageInfo.ejectOhterAndroid); // 获取安卓弹层数据（排除城市）
            var azEject = {
                list: []
            };
            var azOhterEject = {
                list: []
            };
            var i = 0;
            for (i = 0; i < azEjectData.length; i++) {
                azEject.list.push({title: azEjectData[i][0], url: azEjectData[i][1], smallimg: azEjectData[i][2]});
            }
            for (i = 0; i < azOhterEjectData.length; i++) {
                var title = azOhterEjectData[i][0];
                var url = azOhterEjectData[i][1];
                var smallimg = azOhterEjectData[i][2];
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
            for (i = 0; i < noAd.length; i++) {
                if (downHref.indexOf(noAd[i]) > -1) {
                    isAds = true;
                }

            }
            if (pageInfo.ismoney === 1) {
                isAds = true;
            }
            if (platform.isAndroid()) { // 安卓
                var idArray = [];
                idArray = downHref.split('.');
                if (downHref.indexOf('mo.L5645.net') !== -1 && $('.g-tags-box ul li').length <= 0) {
                    $('.m-down-ul li a').attr('href', '/down.asp?id=' + idArray[4]);
                    $('.m-down-msg .type b:last').html('系统：Android');
                }
                else {
                    if ($.inArray(pageInfo.categroyId, catearr) === -1 && $('.g-tags-box ul li').length <= 0) {
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
            else { // IOS
                if ($.inArray(pageInfo.categroyId, catearrIos) === -1 && $('.g-tags-box ul li').length <= 0) { // 没有匹配到
                    $('.m-down-ul li a').attr({href: 'javascript:;', ispc: true});
                }
                else { // 匹配资源
                    $('.m-down-ul li a').attr('issw', true);
                }
                if (!isAds) {
                    this.iossoftAdd();
                }
            }
        },
        clickFunctionEject: function () {
            $('.m-down-ul li a').click(function () {
                if (platform.isAndroid()) {
                    var setTimer = setTimeout(function () {
                        $('.m-click-show').show();
                    }, 100);
                }
                else {
                    if ($('.m-down-ul li a').attr('ispc')) {
                        window.location.href = 'http://h5channel.51pgzs.com/index.php?qid=waitui024';
                    }
                }

            });
            $('.m-close-btn,.m-black-bg').click(function () {
                $('.m-click-show').hide();
            });
            $('.m-game-down').bind('click', function () {
                window.location.href = $(this).attr('href');
            });
        },
        addhighLab: function () {
            $.getScript('https://ca.6071.com/?id=cr1731002333_utf8', function () {});
        },
        iossoftAdd: function () {
            $.getScript('https://ca.6071.com/?id=cr17310023331_utf8', function () {});
        }
    };
    customElement.prototype.build = function () {
        ejectJs.init();
    };

    return customElement;
});
