/**
 * @author: Qi
 * @date: 2017-6-15
 * @file: mip-shouji-down.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;

    function htmlSet() {
        var theDs = $('.versions dd').length;
        if (theDs > 1) {
            $('.tabnav span').eq(0).after(
                '<span shouji-hide=".intro,.imgview" '
                + 'shouji-show=".verview,.app_info,.app_soft,.app_article" '
                + 'shouji-cur="cur">历史版本<i>(' + theDs + ')</i></span>'
            );
        }
        $('[shouji-hide],[shouji-show]').click(function () {
            var hideVal = $(this).attr('shouji-hide') || '';
            var showVal = $(this).attr('shouji-show') || '';
            var curVal = $(this).attr('shouji-cur') || '';
            if (hideVal !== '') {
                $(hideVal).hide();
            }
            if (showVal !== '') {
                $(showVal).show();
            }
            if (curVal !== '') {
                $(this).addClass(curVal).siblings().removeClass(curVal);
            }
        });
    }
    function htmlType(url) {
        if (platform.isIos()) {
            return false;
        }
        var Padownurl = $('.topdown a').attr('href') || '';
        var Pbdownurl = url || '';
        if (Padownurl !== '' && Pbdownurl !== '') {
            $('.topdown').hide();
            $('.safe-link').hide();
            $('.app').append(
                '<div class="Qdowns"><div class="Q_top"><div class="Q_btn">'
                + '<em class="Q_ck"></em>使用手机乐园客户端<i></i></div>'
                + '<a href="' + Pbdownurl + '" class="Q_ds">高速下载</a>'
                + '<a href="' + Padownurl + '" class="Q_ds" style="display:none;">普通下载</a>'
                + '</div><div class="Q_tip"><em class="Q_ioc"></em><span>'
                + '手机乐园客户端是全面、专业的应用市场，将为您安装手机乐园客户端，'
                + '安全、无毒、极速下载应用！</span><span style="display:none;">'
                + '普通下载无法避免流量劫持、下载较慢等问题，建议选择手机乐园客户端安全高速下载！'
                + '</span></div></div>'
            );
            $('.Qdowns .Q_btn').click(function () {
                if ($('.Qdowns').hasClass('Qcur')) {
                    $('.Qdowns').removeClass('Qcur');
                    $('.Qdowns .Q_ds').hide().eq(0).show();
                    $('.Qdowns .Q_tip span').hide().eq(0).show();
                }
				else {
                    $('.Qdowns').addClass('Qcur');
                    $('.Qdowns .Q_ds').hide().eq(1).show();
                    $('.Qdowns .Q_tip span').hide().eq(1).show();
                }
            });
            $('.Qdowns .Q_ds').eq(0).click(function () {
                $('.Qdowns .Q_btn').click();
            });
        }
    }
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var Element = this.element;
        var ToDown = Element.getAttribute('down') || '';
        if (ToDown !== '') {
            htmlType(ToDown);
        }
        htmlSet();
    };
    return customElem;
});
