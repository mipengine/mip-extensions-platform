/**
 * @file mip-131-load 修改阿里妈妈链接为https第三方阿里妈妈、谷歌联盟广告插件和自定义广告
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var UA = navigator.userAgent.toLowerCase();
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var el = this.element;
        var adtype = el.getAttribute('type');
        var token = el.getAttribute('token');
        var client = el.getAttribute('client');
        var $element = $(el);
        var html = [];
        switch (adtype) {
            case 'alimama':
                if (!/micromessenger/.test(UA)) {
                    html.push('<a style="display:none!important" id="tanx-a-mm_' + token + '"></a>');
                    html.push('<script type="text/javascript">');
                    html.push('tanx_s = document.createElement("script");');
                    html.push('tanx_s.type = "text/javascript";');
                    html.push('tanx_s.charset = "gbk";');
                    html.push('tanx_s.id = "tanx-s-mm_' + token + '";');
                    html.push('tanx_s.async = true;');
                    // 阿里妈妈广告支持https，按要求修改为https下面这个链接用途是阿里妈妈联盟的广告链接，是必须的。当选择type为alimama才用到
                    html.push('tanx_s.src = "https://p.tanx.com/ex?i=mm_' + token + '";');
                    html.push('tanx_h = document.getElementsByTagName("head")[0];');
                    html.push('if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);');
                    html.push('</script>');
                }
                break;

            case 'google' :
            // 下面js用途是谷歌的广告js 必须，没有则不能显示广告。当选择type为google时才用到
                html.push('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>');
                html.push('<ins class="adsbygoogle"');
                html.push('     style="display:block"');
                html.push('     data-ad-client="ca-pub-' + client + '"');
                html.push('     data-ad-slot="' + token + '"');
                html.push('     data-ad-format="auto">');
                html.push('</ins>');
                html.push('<script>');
                html.push('(adsbygoogle = window.adsbygoogle || []).push({});');
                html.push('</script>');
                break;

            case 'diy' :
                html.push('<script>');
                html.push('$(function(){');
                // 下面链接用途是调用自身广告 没有则不显示内容，当选择type为diy才用到。
                html.push('$.get(\'//www.131mm.cc/share/getmip.php\',');
                html.push('{');
                html.push('act:"' + token + '",');
                html.push('},');
                html.push('function (data){');
                html.push('$("#' + client + '").html(data);');
                html.push('});');
                html.push('});');
                html.push('</script>');
                break;
        }
        $element.append(html.join(''));
    };
    return customElement;
});
