/**
 * @file mip-dcask组件
 * @author ljh
 * @time 2018.9.10
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
          // return false;
        } else {
            script.onload = script.onerror = function () {
                callback();
            };
        }
    };


    customElem.prototype.firstInviewCallback = function () {
        var elem = this.element;
        var alSpan = $('#dcask-body');
        $.ajax({
            url: 'https://www.bdamei.com/mipextends/',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alSpan.append('<div id="gg_AskBox_542"><div class="mobile_bottom_float_ajax_div ajax_divmip">'
 + '<div class="mobile_bottom_float_class">'
 + '<a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=mip.dcpfb.com&amp;rf1=mip.dcpfb.com" class="bot-layer" target="_blank" rel="nofollow">'
 + '<mip-img src="http://m5.dcpfb.com/swt/img/header.jpg" class="bot-img mip-element mip-layout-container mip-img-loaded" title="皮肤病 在线问医生"><img class="mip-fill-content mip-replaced-content" src="http://m5.dcpfb.com/swt/img/header.jpg" title="皮肤病 在线问医生"></mip-img><div class="bot-txt"><div class="bot-name-line"><span class="bot-name">皮肤病</span><span class="bot-zhic">在线问医生</span></div><p class="bot-info">日回复<span id="click-times-box">435</span>人次</p></div><div class="bot-btn">免费咨询</div></a>' + '</div></div></div>');
                } else {
                    // $('.addcpfb').removeClass('addDisplayNone');
                }
            }
        });
    };
    return customElem;
});
