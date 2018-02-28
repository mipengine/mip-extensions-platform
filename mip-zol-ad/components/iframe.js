/**
 * @file iframe广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    function Iframe(adBar) {
        this.adBar = adBar;
    }
    Iframe.prototype.create = function (util) {
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        var iframe = util.dom.createElement('iframe', {
            src: fodder.src,
            marginheight: 0,
            marginwidth: 0,
            frameBorder: 0,
            scrolling: 'no'
        }, {
            width: fodder.width + 'px',
            height: fodder.height + 'px'
        });
        var div = util.dom.createElement('div', {
            'class': 'gmine_ad'
        });
        util.ad.addAdMargin(div, fodder);
        div.appendChild(iframe);
        util.ad.addAdIcon(div, adBar);
        return {elements: [div], height: fodder.height, appendAfterFn: function () {
            util.ad.zolImpTrack(div, adBar);
        }};
    };
    module.exports = Iframe;
});
