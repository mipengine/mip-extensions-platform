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
            url: 'https://shop.qdanyy.cn/mipextends/',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    alSpan.append('<div class="swtask">'
 + '<div id="dcy_zhuanjiahuifuxia">'
 + '<div class="YWBDAD" aid="7250" vid="1694">'
 + '<div class="zbys"> <a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" target="_blank" rel="nofollow"> <em>今日特邀专家坐诊：</em> </a>'
 + '<div><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" target="_blank" rel="nofollow">'
 + '<mip-img src="http://m5.dcpfb.com/swt/img/header.jpg" class="ysask mip-element mip-layout-fixed mip-layout-size-defined mip-img-loaded" width="40" height="45" style="width: 40px; height: 45px;"><img class="mip-fill-content mip-replaced-content" src="http://m5.dcpfb.com/swt/img/header.jpg"></mip-img>'
 + '</a> <a class="aask" href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" rel="nofollow" target="_blank">青岛皮肤病研究院<br>'
 + '<strong>于亚民主任</strong></a> <span><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" target="_blank" rel="nofollow">免费咨询</a></span></div>'
 + '</div>'
 + '</div>'
 + '</div>'
 + '<div class="g-expand mar_mip"><span>推广</span><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" rel="nofollow" class="s_add_time" target="_blank">山东省皮肤病名医</a></div>'
 + '<div class="g-expand mar_mip"><span>资讯</span><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=m5.dcpfb.com&amp;rf1=m5.dcpfb.com" rel="nofollow" class="s_add_time" target="_blank">看皮肤病去哪家医院好</a></div>'
 + '</div>');
                } else {
                    //
                }
            }
        });
    };
    return customElem;
});
