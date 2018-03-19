/**
 * @file 文字广告模板
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
        var a = util.dom.createElement('a', {href: href, target: fodder.is_self ? '_self' : '_blank'});
        a.innerHTML = fodder.title;
        util.ad.addAdIcon(a, adBar);
        return {elements: [a], height: fodder.height, appendAfterFn: function () {
            util.ad.zpv({
                range: 'bms_ad',
                dom: a,
                type: 'inview',
                name: 'bms_' + adBar.loc_id + '_' + adBar.bid + '_show'
            });
            util.ad.zpv({
                range: 'bms_ad',
                dom: a,
                type: 'click',
                name: 'bms_' + adBar.loc_id + '_' + adBar.bid + '_click'
            });
        }};
    };
    module.exports = function (adBar, components) {
        return Txt;
    };
});
