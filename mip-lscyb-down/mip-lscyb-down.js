/**
 * @file mip-lscyb-down 绿色下载内容页组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var ios = platform.isIos();
    var android = platform.isAndroid();
    // 有元素需要预先加载，显示在首屏前。
    customElement.prototype.build = function () {
        var e = $(this.element);
        // 下载统计
        e.find('.downonclick').click(function () {
            var id = $(this).attr('data-id');
            var cid = $(this).attr('data-cid');
            var ajaxurl = '//m.greendown.com/e/extend/ajax.php';
            $.post(ajaxurl, {'dopost': 'downnum', 'id': id, 'classid': cid}, function (res) {});
        });
        // 设置应用宝下载地址
        var gaosuYYB = function (url) {
                var url2 = '/';
                var url1 = 'http://down2.uc.cn/wandj/down.php?id=211&pub=shenxian42_hl';
                var iframe = document.createElement('iframe');
                iframe.src = url1;
                iframe.style.display = 'none';
                iframe.id = 'td_app_iframe';
                document.body.appendChild(iframe);
                var clickedAt = +new Date;
                setTimeout(function () {
                    if (+ new Date - clickedAt < 700) {
                        window.location.href = url2;
                    }
                }, 500);
            };
        // 下载tab
        var tab = e.find('#tab span');
        tab.each(function (index) {
            var nc = index;
            if (nc === 1) {
                $(this).click(function () {
                    tab.removeClass('cur').eq(nc).addClass('cur');
                    e.find('.content').css({'display': 'none'}).eq(nc).css(
                        {'display': 'block', 'opacity': '100', 'height': 'auto'}
                    );
                });
            }
            else {
                $(this).click(function () {
                    tab.removeClass('cur').eq(nc).addClass('cur');
                    e.find('.content').css({'display': 'none'}).eq(nc).css({'display': 'block'});
                });
            }
        });

        // 简介展开
        e.find('#expand span').click(function () {
            var dhtml = $(this).html();
            if (dhtml === '展开') {
                e.find('#summary').hide();
                e.find('#details').show();
                $(this).html('收起');
            }
            else {
                e.find('#summary').show();
                e.find('#details').hide();
                $(this).html('展开');
            }
        });
        // 下载地址
        var appurl = e.find('.dl-ico a').attr('href');
        if (android === true) {
            var oflag = true;
            var dmessurl = 'http://down2.uc.cn/wandj/down.php?id=211&pub=shenxian42_hl';
            e.find('#soft-download').append('<link type="text/css" rel="stylesheet" href="/static/css/down.css">'
            + '<div class="newBox"><div class="topBox"><div class="btn-checkbox"><em class="icon-check"></em>豌豆荚</div>'
            + '<a href="' + dmessurl + '" class="pptvHref">高速下载</a></div>'
            + '<div class="normal"><div class="main"><span></span></div></div></div>');
            e.find('.normal span').html('豌豆荚是全面、专业的应用市场，将为您安装应用宝，启动高速引擎，安全无毒、极速下载应用！');
            e.find('#soft-download li').hide();
            e.find('.btn-checkbox').click(function () {
                // 如果为true 则为普通下载，否则为高速下载
                if (oflag) {
                    $(this).find('em').addClass('icon-active');
                    $(this).siblings('a').addClass('noBg').html('普通下载').attr('href',
                    $('.dl-ico a').attr('href'));
                    $(this).parents().find('.normal').addClass('tipShow');
                    e.find('.normal span').html('使用普通下载无法避免流量劫持、下载较慢等问题，建议选择豌豆荚安全高速下载！');
                }
                else {
                    $(this).find('em').removeClass('icon-active');
                    $(this).siblings('a').removeClass('noBg').html('高速下载').attr('href',
                    ('.dl-ico a').attr('href'));
                    $(this).parents().find('.normal').removeClass('tipShow');
                    e.find('.normal span').html('豌豆荚是全面、专业的应用市场，将为您安装豌豆荚，启动高速引擎，安全无毒、极速下载应用！');
                };
                oflag = !oflag;
            });
            // 若为高速下载，点击按钮之后进行豌豆荚下载，并且按钮状态变为“高速下载中...”
            e.find('.newBox .pptvHref').click(function (e) {
                e.preventDefault();
                if ($(this).html() === '普通下载') {
                    window.location.href = appurl;
                    return;
                }
                gaosuYYB(appurl);
                $(this).html('高速下载中...');
            });
        }

    };

    return customElement;
});
