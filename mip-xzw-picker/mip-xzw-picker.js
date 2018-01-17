/**
* 星座屋mip改造
* @file 星座屋picker弹层组件
* @author mipxzw@163.com
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var city = '';
    customElement.prototype.firstInviewCallback = function () {
        var xzw = {
            b: {
                layershow: function (f) {
                    if (!$('.m_layer').length) {
                        $('.wrapper').append('<div class="m_layer"></div>');
                    }

                    var A = $('.m_layer');
                    A.fadeIn(400).on('touchmove', function (e) {
                        e.preventDefault();
                    });
                    if (f && typeof (f) === 'function') {
                        A.click(function (e) {
                            f();
                        });
                    }

                },
                layerhide: function () {
                    var A = $('.m_layer');
                    A.fadeOut(400, function () {
                        $(A).hide();
                    });
                },
                bSelshow: function (a, f) {
                    xzw.b.layershow(function () {
                        xzw.b.bSelhide();
                    });
                    if (!$('.float_sbox').length) {
                        $('.wrapper').append('<div class="float_sbox"></div>');
                    }

                    var A = $('.float_sbox');
                    A.html(a).on('touchmove', function (e) {
                        e.preventDefault();
                    });
                    A.show();
                    A.animate({
                        bottom: 0
                    }, 400);
                    f && typeof (f) === 'function' ? f() : '';
                },
                bSelhide: function () {
                    var A = $('.float_sbox');
                    A.animate({
                        bottom: -A.height()
                    }, 400, function () {
                        $(A).hide();
                    });
                    xzw.b.layerhide();
                }
            }
        };
        $('.inpbox').click(function () {
            var t = $(this).attr('type');
            var that = $(this);
            var startDate = 1900;
            var endDate = 2100;
            var opa = '、';
            if (t === 'time') {
                opa = ':';
            }

            if (t === 'place') {
                city = that.attr('cityData');
            }

            if (t === 'date') {
                opa = '-';
                startDate = $(this).attr('startDate');
                endDate = $(this).attr('endDate');
            }

            xzw.b.bSelshow(picker(t, startDate, endDate), function () {
                var X = $('.time');
                var P = $('.place');
                var D = $('.date');
                var C = $('.cancel');
                var Y = $('.set');
                var S = $('.top span');
                C.click(function () {
                    xzw.b.bSelhide();
                });
                Y.click(function () {
                    xzw.b.bSelhide();
                    if (t === 'date') {
                        that.find('span').html(S.eq(0).html() + opa + S.eq(1).html() + opa + S.eq(2).html());
                        that.find('input').val(S.eq(0).html() + opa + S.eq(1).html() + opa + S.eq(2).html());
                    }
                    else {
                        that.find('span').html(S.eq(0).html() + opa + S.eq(1).html());
                        that.find('input').val(S.eq(0).html() + opa + S.eq(1).html());
                    }
                });
                $(document).on('click', '.cox li', function () {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    var i = $(this).index();
                    var p = $(this).parent().parent().index();
                    if (t === 'place') {
                        if (p === 0) {
                            $('.cox ul', P).eq(1).html(change(i));
                            S.eq(1).html(city[i].c[0]);
                        }
                    }
                    else if (t === 'date') {
                        var y = $('.cox ul', D).eq(0).find('li.cur').html();
                        var m = $('.cox ul', D).eq(1).find('li.cur').html();
                        if (p !== 2) {
                            var str = getDateHtml(mGetDate(y, m));
                            $('.cox ul', D).eq(2).html(str);
                        }
                    }

                    S.eq(p).html($(this).html());
                });

            });
        });
        $('.inpbtn').click(function () {
            var p = $(this).parent();
            var ipb = p.find('.inpbox');
            var s = false;
            ipb.each(function (i) {
                var text = $(this).find('input').val();
                if (!text) {
                    s = true;
                }
            });
            if (s) {
                xzw.b.layershow();
                $('.tbox').show();
                setTimeout(function () {
                    xzw.b.layerhide();
                    $('.tbox').hide();
                }, 1500);
            }
            else {
                window.location.href = 'https://m.xzw.com';
            }
        });
        function change(i) {
            var html = '';
            var data = city[i].c;
            for (var i = 0; i < data.length; i++) {
                html += '<li class="' + (i === 0 ? 'cur' : '') + '">' + data[i] + '</li>';
            }
            return html;
        }
        function mGetDate(year, month) {
            var d = new Date(year, month, 0);
            return d.getDate();
        }
        function getDateHtml(day) {
            var html = '';
            for (var i = 1; i < day + 1; i++) {
                html += '<li class="' + (i === 1 ? 'cur' : '') + '">' + i + '</li>';
            }
            return html;
        }
        function picker(t, startDate, endDate) {
            var html = '';
            html += '<div class="pbox">';
            if (t === 'time') {
                html += ' <div class="top time"><em class="cancel"></em>时间：<span>00</span>时';
                html += '<span>00</span>分<em class="set"></em></div>';
                html += '<div class="inner time">';
                html += '<div class="cox"><ul>';
                for (var i = 0; i < 24; i++) {
                    html += '<li class="' + (i === 0 ? 'cur' : '') + '">' + (i < 10 ? '0' + i : i) + '</li>';
                }
                html += '</ul></div><div class="cox"><ul>';
                for (var j = 0; j < 60; j++) {
                    html += '<li class="' + (j === 0 ? 'cur' : '') + '">' + (j < 10 ? '0' + j : j) + '</li>';
                }
                html += '</ul></div></div>';
            }

            if (t === 'place') {
                html += '<div class="top place"><em class="cancel"></em>地点：<span>北京</span>-';
                html += '<span>市区</span><em class="set"></em></div>';
                html += '<div class="inner place">';
                html += '<div class="cox"><ul>';
                for (var i = 0; i < city.length; i++) {
                    html += '<li class="' + (i === 0 ? 'cur' : '') + '">' + city[i].s + '</li>';
                }
                html += '</ul></div><div class="cox"><ul>';
                for (var j = 0; j < city[0].c.length; j++) {
                    html += '<li class="' + (j === 0 ? 'cur' : '') + '">' + city[0].c[j] + '</li>';
                }
                html += '</ul></div></div>';
            }

            if (t === 'date') {
                html += '<div class="top date"><em class="cancel"></em>日期:<span>' + startDate + '</span>年';
                html += '<span>1</span>月<span>1</span>日<em class="set"></em></div>';
                html += '<div class="inner date">';
                html += '<div class="cox"><ul>';
                for (var i = parseInt(startDate, 10); i < parseInt(endDate, 10) + 1; i++) {
                    html += '<li class="' + (i === parseInt(startDate, 10) ? 'cur' : '') + '">' + i + '</li>';
                }
                html += '</ul></div><div class="cox"><ul>';
                for (var j = 1; j < 13; j++) {
                    html += '<li class="' + (j === 1 ? 'cur' : '') + '">' + j + '</li>';
                }
                html += '</ul></div><div class="cox"><ul>';
                for (var k = 1; k < mGetDate(parseInt(startDate, 10), 1, 0) + 1; k++) {
                    html += '<li class="' + (k === 1 ? 'cur' : '') + '">' + k + '</li>';
                }
                html += '</ul></div></div>';
            }

            html += '</div>';
            return html;
        }

    };
    return customElement;
});
