/**
 * @author: sunxiaopeng
 * @date: 2018-09-26
 * @file: mip-fh-search-engine.js
 * 常用搜索引擎 "google", "yahoo", "msn", "baidu", "sogou", "sohu", "sina", "sn163", "lycos", "tom", "yisou", "iask", "soso", "gougou", "zhongsou", "bing"
 */

define(function () {
    var urlReferrer = window.top.document.referrer;
    var urlHref = window.top.location.href;
    var module = {};
    module.google = ((function () {
        return /\.google\./i.test(urlReferrer);
    })());
    module.google = ((function () {
        return /\.google\./i.test(urlHref);
    })());
    module.yahoo = ((function () {
        return /\.yahoo\./i.test(urlReferrer);
    })());
    module.yahoo = ((function () {
        return /\.yahoo\./i.test(urlHref);
    })());
    module.msn = ((function () {
        return /\.msn\./i.test(urlReferrer);
    })());
    module.msn = ((function () {
        return /\.msn\./i.test(urlHref);
    })());
    module.baidu = ((function () {
        return /\.baidu\./i.test(urlReferrer);
    })());
    module.baidu = ((function () {
        return /\.baidu\./i.test(urlHref);
    })());
    module.sogou = ((function () {
        return /\.sogou\./i.test(urlReferrer);
    })());
    module.sogou = ((function () {
        return /\.sogou\./i.test(urlHref);
    })());
    module.sohu = ((function () {
        return /\.sohu\./i.test(urlReferrer);
    })());
    module.sohu = ((function () {
        return /\.sohu\./i.test(urlHref);
    })());
    module.sina = ((function () {
        return /\.sina\./i.test(urlReferrer);
    })());
    module.sina = ((function () {
        return /\.sina\./i.test(urlHref);
    })());
    module.sn163 = ((function () {
        return /\.163\./i.test(urlReferrer);
    })());
    module.sn163 = ((function () {
        return /\.163\./i.test(urlHref);
    })());
    module.lycos = ((function () {
        return /\.lycos\./i.test(urlReferrer);
    })());
    module.lycos = ((function () {
        return /\.lycos\./i.test(urlHref);
    })());
    module.tom = ((function () {
        return /\.tom\./i.test(urlReferrer);
    })());
    module.tom = ((function () {
        return /\.tom\./i.test(urlHref);
    })());
    module.yisou = ((function () {
        return /\.yisou\./i.test(urlReferrer);
    })());
    module.yisou = ((function () {
        return /\.yisou\./i.test(urlHref);
    })());
    module.iask = ((function () {
        return /\.iask\./i.test(urlReferrer);
    })());
    module.iask = ((function () {
        return /\.iask\./i.test(urlHref);
    })());
    module.iask = ((function () {
        return /\.iask\./i.test(urlHref);
    })());
    module.soso = ((function () {
        return /\.soso\./i.test(urlReferrer);
    })());
    module.soso = ((function () {
        return /\.soso\./i.test(urlHref);
    })());
    module.gougou = ((function () {
        return /\.gougou\./i.test(urlReferrer);
    })());
    module.gougou = ((function () {
        return /\.gougou\./i.test(urlHref);
    })());
    module.zhongsou = ((function () {
        return /\.zhongsou\./i.test(urlReferrer);
    })());
    module.zhongsou = ((function () {
        return /\.zhongsou\./i.test(urlHref);
    })());
    module.bing = ((function () {
        return /\.bing\./i.test(urlReferrer);
    })());
    module.bing = ((function () {
        return /\.bing\./i.test(urlHref);
    })());
    module.searchEngine = (function (me) {
        var name;
        switch (true) {
            case me.google:
                name = 'google';
                break;
            case me.yahoo:
                name = 'yahoo';
                break;
            case me.msn:
                name = 'msn';
                break;
            case me.baidu:
                name = 'baidu';
                break;
            case me.sogou:
                name = 'sogou';
                break;
            case me.sohu:
                name = 'sohu';
                break;
            case me.sina:
                name = 'sina';
                break;
            case me.sn163:
                name = '163';
                break;
            case me.lycos:
                name = 'lycos';
                break;
            case me.tom:
                name = 'tom';
                break;
            case me.yisou:
                name = 'yisou';
                break;
            case me.iask:
                name = 'iask';
                break;
            case me.soso:
                name = 'soso';
                break;
            case me.gougou:
                name = 'gougou';
                break;
            case me.zhongsou:
                name = 'zhongsou';
                break;
            case me.bing:
                name = 'bing';
                break;
            default:
                name = '';
                break;
        }
        return name;
    }(module));
    return module;
});
