/**
 * @file mip-maccms 组件
 * @author  苹果作者
 */

define(function (e) {

    var t = e('zepto');
    var i = t('mip-maccms');
    var n = i.attr('aid');
    var a = e('customElement').create();
    a.prototype.firstInviewCallback = function () {
        var e = document.createElement('script');
        e.type = 'text/javascript',
	// 引入Maccms核心JS，评分，会员系统，收藏等必须加载，服务提供商：http://www.maccms.com/
    e.src = 'https://api.23153373.com/mip/' + n + '.js',
    e.async = 'true';
        var t = document.getElementsByTagName('head')[0];
        t.insertBefore(e, t.firstChild);
    };
    return a;
});
