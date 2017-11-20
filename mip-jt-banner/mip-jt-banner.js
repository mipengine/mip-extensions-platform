/**
 * @file mip-jt-banner 金投网头部banner
 * @author jt
 */
define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('zepto');

    var adModule = (function (window) {
        var adModule = function (ad, func) {
            return adModule.fn.init(ad, func);
        };
        adModule.fn = adModule.prototype = {
            constructor: adModule,
            init: function (ad, func) {
                this.ad = ad;
                this.func = func;
                this.tip = '<mip-img src=\"https://res.cngoldres.com/mobile/images/leftTip.png\" alt=\"标识\" class=\"banner_left_tip\"></mip-img>';
                this.closebutton = '<span class=\"top_banner_close\"><mip-img src=\"https://res.cngoldres.com/mobile/images/top_banner_close.png\" alt=\"关闭\"></mip-img></span>';
                this.htmladtop();
                this.htmladbottom();
            },
            htmladtop: function () {
                var topadarr = this.ad.top;
                if (topadarr && topadarr.length > 0) {
                    var isEmpty = this.jointtophtml(topadarr);
                    if (isEmpty) {
                        this.jointtophtml(this.ad.topDefault);
                    }
                }
                else {
                    this.jointtophtml(this.ad.topDefault);
                }
            },
            htmladbottom: function () {
                var bottomarr = this.ad.bottom;
                if (bottomarr && bottomarr.length > 0) {
                    var isEmpty = this.joinbottomhtml(bottomarr);
                    if (isEmpty) {
                        this.joinbottomhtml(this.ad.bottomDefault);
                    }
                }
                else {
                    this.joinbottomhtml(this.ad.bottomDefault);
                }

                if (this.func) {
                    this.func();
                }
            },
            joinbottomhtml: function (bottomarr) {
                var isEmpty = true;
                if (bottomarr && bottomarr.length > 0) {
                    for (var k = 0, length = bottomarr.length; k < length; k++) {
                        var bottomad = bottomarr[k];
                        if (!bottomad.begin) {
                            bottomad.begin = new Date().getTime();
                        }
                        if (!bottomad.end) {
                            bottomad.end = new Date().getTime();
                        }
                        if (bottomad.begin <= bottomad.end) {
                            isEmpty = false;
                            var bottomhtml = '';
                            if (bottomad.url) {
                                bottomhtml = ''
                                    + '<div class="swiper-slide" > '
                                    + '	<a href="' + bottomad.url + '">'
                                    + '		<mip-img src="' + bottomad.img + '"></mip-img>'
                                    + '	</a>'
                                    + this.tip
                                    + this.closebutton
                                    + '</div>';
                                $('.bottom_important').append(bottomhtml);
                            }
                            else {
                                bottomhtml = ''
                                    + '<div class="swiper-slide" id="baiduclb' + k + '"> '
                                    + '</div>';
                                $('.bottom_important').append(bottomhtml);
                                var extra = bottomad.extra;
                                if (extra.indexOf('BAIDU_CLB_fillSlot') >= 0) {
                                    var scripst = document.createElement('script');
                                    scripst.text = extra;
                                    document.getElementById('baiduclb' + k).appendChild(scripst);
                                }
                                else {
                                    $('#baiduclb' + k + '').append(extra);
                                }
                            }
                        }
                    }
                }
                $('body').on('click', '.bottom-banner .top_banner_close', function () {
                    $('.bottom-banner').hide();
                });
                return isEmpty;
            },
            jointtophtml: function (topadarr) {
                var isEmpty = true;
                var topad = weightRand(topadarr);
                if (!topad.begin) {
                    topad.begin = new Date().getTime();
                }
                if (!topad.end) {
                    topad.end = new Date().getTime();
                }
                if (topad.begin <= topad.end) {
                    isEmpty = false;
                    var tophtml = '';
                    if (topad.url) {
                        tophtml = ''
                            + '<div class="swiper-slide" >'
                            + '	<a href="' + topad.url + '">'
                            + '		<mip-img src="' + topad.img + '"></mip-img>'
                            + '	</a>' + this.tip + this.closebutton
                            + '</div>';
                        $('.top_important').append(tophtml);
                    }
                    else {
                        var k = 1;
                        tophtml = ''
                            + '<div class = "swiper-slide" id = "baiduclbtop' + k + '"> '
                            + '</div>';
                        $('.top_important').append(tophtml);
                        var extra = topad.extra;
                        if (extra.indexOf('BAIDU_CLB_fillSlot') >= 0) {
                            var scripst = document.createElement('script');
                            scripst.text = extra;
                            document.getElementById('baiduclbtop' + k).appendChild(scripst);
                        }
                        else {
                            $('#baiduclbtop' + k + '').append(extra);
                        }
                    }
                }

                $('body').on('click', '.top-banner .top_banner_close', function () {
                    $('.top-banner').hide();
                });
                return isEmpty;
            }
        };
        adModule.fn.init.prototype = adModule.fn;
        return adModule;
    })(window);

    function weightRand(arr) {
        var total = 0;
        var i;
        var j;
        var percent;
        var index = [];
        for (i = 0; i < arr.length; i++) {
            percent = 'undefined' !== typeof (arr[i].weight) ? parseInt(arr[i].weight * 100, 10) : 10;
            for (j = 0; j < percent; j++) {
                index.push(i);
            }
            total += percent;
        }
        var rand = Math.floor(Math.random() * total);
        return arr[index[rand]];
    }

    customElement.prototype.firstInviewCallback = function () {
        var forurl = window.location.href;
        var arrone = ['index', 'home', 'simu', 'credit', 'insurance', 'loan', 'zhubao', 'finance', 'news'];
        var arrtwo = ['lux', 'usstock', 'hkstock', 'price', 'hao', 'gold', 'ag', 'cang', 'forex', 'xianhuo'];
        var arrthree = ['futures', 'energy', 'licai', 'p2p', 'bank', 'fund', 'trust', 'stock', 'caipiao', 'quote'];
        var sites = arrone.concat(arrtwo).concat(arrthree);
        fetch('https://res.cngoldres.com/mobile/cngold/js/mip-jt-banner.js').then(function (res) {
            return res.text();
        }).then(function (text) {
            var adData = JSON.parse(text);
            if (forurl.split('/').length === 4) {
                adModule(adData.index);
            }
            else {
                for (var i in sites) {
                    if (forurl.indexOf('/' + sites[i]) >= 0) {
                        var siteName = sites[i];
                        if (siteName === 'quote') {
                            if (forurl.indexOf('/gp') >= 0) {
                                adModule(adData[siteName].gp);
                            }
                            else if (forurl.indexOf('/oil') >= 0) {
                                adModule(adData[siteName].oil);
                            }
                            else {
                                adModule(adData[siteName].index);
                            }
                        }
                        else if (adData[siteName]) {
                            adModule(adData[siteName]);
                        }
                    }
                }
            }
        });

    };
    return customElement;
});
