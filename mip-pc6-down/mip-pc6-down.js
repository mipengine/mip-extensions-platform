/**
 * @file 页面逻辑脚本
 * @author fl
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
    var down = {
        webInfoId: $('#down-href').attr('downid'),
        webInfoCid: $('#down-href').attr('cid'),
        webInfoRid: $('#down-href').attr('rid'),
        platAndroidId: $('#plat_Android').attr('platid'),
        platAndroidAddress: $('#plat_Android').attr('Address'),
        platAndroidResSystem: $('#plat_Android').attr('ResSystem'),
        platAndroidResName: $('#plat_Android').attr('ResName'),
        platAndroidResVer: $('#plat_Android').attr('ResVer'),
        platAndroidCid: $('#plat_Android').attr('cid'),
        platAndroidRid: $('#plat_Android').attr('rid'),
        platIPhoneId: $('#plat_iPhone').attr('platid'),
        platIPhoneAddress: $('#plat_iPhone').attr('Address'),
        platIPhoneResSystem: $('#plat_iPhone').attr('ResSystem'),
        platIPhoneResName: $('#plat_iPhone').attr('ResName'),
        platIPhoneResVer: $('#plat_iPhone').attr('ResVer'),
        platIPhoneCid: $('#plat_iPhone').attr('cid'),
        platIPhoneRid: $('#plat_iPhone').attr('rid'),
        platIPadId: $('#plat_iPad').attr('platid'),
        platIPadAddress: $('#plat_iPad').attr('Address'),
        platIPadResSystem: $('#plat_iPad').attr('ResSystem'),
        platIPadResName: $('#plat_iPad').attr('ResName'),
        platIPadResVer: $('#plat_iPad').attr('ResVer'),
        platIPadCid: $('#plat_iPad').attr('cid'),
        platIPadRid: $('#plat_iPad').attr('rid'),
        assid: parseInt($('#info #Associate').html(), 10),
        xfNav: function () {
            if (platform.isBaiduApp()) {
                return false;
            }
            var t = $('header').height() + 90;
            $(window).scroll(function () {
                var i = $('#btns');
                if ($(window).scrollTop() >= t) {
                    i.css({position: 'fixed', top: 0}).addClass('on');
                }
                else {
                    i.css({
                        position: 'relative'
                    }).removeClass('on');
                }
                if ($('#wrapper').offset().top + $('#wrapper').height() - 35 <= $(window).scrollTop()) {
                    $('#xgk').addClass('fix');
                }
                else {
                    $('#xgk').removeClass('fix');
                }
            });
        },
        downHref: function () {
            if (this.assid > 0) {
                $('#info #btns a').attr('href', 'https://download.pc6.com/down/' + this.assid + '/');
            }

            if (platform.isAndroid() && void 0 !== this.platAndroidAddress) {
                $('#info #btns a').attr('href', 'https://download.pc6.com/down/' + this.platAndroidId + '/');
                var k = ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',');
                if ($('#ResSystem').html(this.platAndroidResSystem), k < 0) {
                    if ($('body.dnb').length < 1) {
                        $('#info .name').html('<h1>' + this.platAndroidResName + '</h1>' + this.platAndroidResVer);
                    }
                }
            }
            else if (platform.isIos() && void 0 !== this.platIPhoneAddress) {
                $('#info #btns a').attr('href', 'https://download.pc6.com/down/' + this.platIPhoneId + '/');
                var k1 = ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',');
                if ($('#ResSystem').html(this.platIPhoneResSystem), k1 < 0) {
                    if ($('body.dnb').length < 1) {
                        $('#info .name').html('<h1>' + this.platIPhoneResName + '</h1>' + this.platIPhoneResVer);
                    }
                }
            }
            else if (platform.isIos() && void 0 !== this.platIPadAddress) {
                $('#info #btns a').attr('href', 'https://download.pc6.com/down/' + this.platIPadId + '/');
                var k2 = ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',');
                if ($('#ResSystem').html(this.platIPadResSystem), k2 < 0) {
                    if ($('body.dnb').length < 1) {
                        $('#info .name').html('<h1>' + this.platIPadResName + '</h1>' + this.platIPadResVer);
                    }
                }
            }

        },
        hotRec: function () {
            var t = [];
            var i = 2;
            var r = 0;
            var o = 0;
            var s = 0;
            var a = this;
            if (platform.isAndroid()) {
                if (i = 0, void 0 !== this.platAndroidAddress) {
                    o = this.platAndroidCid, s = this.platAndroidRid, r = this.platAndroidId;
                }
            }
            else if (platform.isIos()) {
                if (i = 1, void 0 !== this.platIPhoneAddress) {
                    o = this.platIPhoneCid, s = this.platIPhoneRid, r = this.platAndroidId;
                }

            }

            if (2 !== i) {
                $('#xgk a').each(function () {
                    t.push($(this).text());
                }), 0 === t.length ? t = '' : t = t.join(',');
                var cid = (a.webInfoCid) ? a.webInfoCid : 0;
                var rid = (a.webInfoRid) ? a.webInfoRid : 0;
                fetch('https://m.pc6.com/ajax.asp?action=998&keys=' + t + '&id=' + a.webInfoId + '&platform=' + i + '&pid=' + r + '&cid=' + cid + '&rid=' + rid + '&rcid=' + o + '&rrid=' + s, {
                    method: 'get'
                }).then(function (response) {
                    response.json().then(function (data) {
                        if (void 0 !== data.list) {
                            var n = data.list;
                            var r = '';
                            if (0 === i) {
                                for (var o = 0; o < n.length; ++o) {
                                    r += '<li><a href="https://m.pc6.com/down.asp?id=' + n[o].ID + '"><mip-img src="' + n[o].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian' + (o + 1) + '\',\'' + n[o].ResName + '\'])"></mip-img>' + n[o].ResName + '</a></li>';
                                }

                            }
                            else if (1 === i) {
                                for (var b = 0; b < n.length; ++b) {
                                    r += '<li><a href="https://m.pc6.com/mipd/' + n[b].ID + '.html" target="_blank"><mip-img src="' + n[b].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian' + (o + 1) + '\',\'' + n[b].ResName + '\'])"></mip-img>' + n[b].ResName + '</a></li>';
                                }

                            }
                            $('.tjyxph #thelist3').append(r);
                        }
                    });
                }).catch(function (err) {
                });
            }

        },
        show: function () {
            if ($('#historyver p').length === 0) {
                $('#historyver').remove();
            }
            if ($('#historyver p').length <= 3) {
                $('#historyver .lookmore').remove();
            }

            if ($('#tcsyy li').length === 0) {
                $('#tcsyy').remove();
            }

            if ($('#dcatetory a').length === 0) {
                $('.tips_more').remove();
            }
            if ($('body').attr('show')) {
                $('.hot_gamerec,.rank,.tips_more').remove();
            }
        },
        jc: function () {
            var t = $('#jc');
            $('#tab span').eq(1).click(function () {
                t.empty();
                t.append($('#xgwz').prev('mip-embed').clone());
                t.append($('#xgwz').clone());
                t.append($('#rela_down').clone());
                t.find('#rela_down img').remove();
            });
        },
        rank: function () {
            if ($('.rank').length > 0) {
                var k = this;
                $('.rank .list').each(function () {
                    $(this).find('li').hide().slice(0, 4).show();
                });
                $('.tab-panel ul li').parents('section').children('.tab-content').hide().eq(1).show();
                $('.tab-panel ul li').click(function () {
                    $(this).parents('section').children('.tab-content').hide().eq($(this).index()).show();
                    $(this).addClass('active').siblings().removeClass('active');
                    k.loadmore();
                });
                k.loadmore();
            }
        },
        loadmore: function () {
            $('.rank .tab-content').eq($('.rank .tab-panel li.active').index()).find('.lookmore').click(function () {
                var hnum = 0;
                var vnum = 0;
                for (var i = 0; i < $(this).prev().find('li').length; i++) {
                    if ($(this).prev().find('li').eq(i).css('display') === 'none') {
                        hnum++;
                    }
                    else {
                        vnum++;
                    }
                }
                if (hnum === 0) {
                    $(this).remove();
                }
                else {
                    $(this).prev().find('li').slice(0, vnum + 4).show();
                }
            });
        },
        ntj: function (o) {
            $(o).find('#info #btns a').on('click', function () {
                var img = new Image();
                img.src = 'https://stat-api.20hn.cn/jf.gif?web_id=5&id=' + this.webInfoId + '&cate_id=' + this.webInfoCid + '&cate=' + $('#info .cata').text() + '&title=' + $('#info h1').text() + '&device=1';
            });
        },
        init: function (o) {
            this.xfNav(), this.rank(), this.downHref(), this.hotRec(), this.show(), this.jc(), this.ntj(o);
        }
    };
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        down.init(element);
    };
    return customElem;
});
