/**
 * @file mip-dcpfb-swtad 页面问答首页图片展示
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
                    alSpan.append('<div class="tubiaoqu cl">'
 + '<ul>'
 + '<li class="li1"><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=http://mip.dcpfb.com/" rel="nofollow" target="_blank"><span class="ico"></span><span class="zi">快速提问</span> </a> </li>'
 + '<li class="li2"><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=http://mip.dcpfb.com/" rel="nofollow" target="_blank"><span class="ico"></span><span class="zi">问答专家</span> </a> </li>'
 + '<li class="li3"><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=http://mip.dcpfb.com/" rel="nofollow" target="_blank"><span class="ico"></span><span class="zi">热门问答</span> </a> </li>'
 + '</ul>'
 + '<div class="h10 cl"> </div>'
 + '<ul>'
 + '<li class="li4"><a href="tel:0532-58724120" target="_blank"><span class="ico">'
 + '</span><span class="zi">电话咨询</span> </a> </li>'
 + '<li class="li5"><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=http://mip.dcpfb.com/" rel="nofollow" target="_blank"><span class="ico"></span><span class="zi">疾病查询</span> </a> </li>'
 + '<li class="li6"><a href="http://knq.zoossoft.net/lr/chatpre.aspx?id=knq75134940&amp;p=http://mip.dcpfb.com/" rel="nofollow" target="_blank"><span class="ico"></span><span class="zi">一键咨询</span> </a> </li>'
 + '</ul>'
 + '</div>');
                } else {
                    //
                }
            }
        });
    };
    return customElem;
});
