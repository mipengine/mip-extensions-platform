/**
 * @file 文字广告模板，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    function Txt(adBar) {
        this.adBar = adBar;
    }
    Txt.prototype.create = function (util) {
        var adBar = this.adBar;
        var fodder = adBar.conf;
        var href = fodder.click_url || 'javascript:;';
        var a = document.createElement('a');
        a.classList.add('gmine_ad');
        a.setAttribute('href', href);
        a.setAttribute('target', fodder.is_self ? '_self' : '_blank');
        a.innerHTML = fodder.title;
        util.ad.addAdIcon(a, adBar);
        return {elements: [a]};
    };
    module.exports = function (adBar, components) {
        return Txt;
    };
});
