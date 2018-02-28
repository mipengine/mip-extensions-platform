/**
 * @file 图片广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    function Picture(adBar) {
        this.adBar = adBar;
    }
    Picture.prototype.create = function (util) {
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        var a = util.dom.createElement('a', {
            'class': 'gmine_ad',
            'href': fodder.click_url,
            'target': fodder.is_self === '1' ? '_self' : '_blank'
        }, {
            display: 'block'
        });
        util.ad.addAdMargin(a, fodder);
        var pic = new Image(fodder.width, fodder.height);
        pic.src = fodder.src;
        a.appendChild(pic);
        util.ad.addAdIcon(a, adBar);
        return {elements: [a], height: fodder.height, appendAfterFn: function () {
            util.ad.zolImpTrack(a, adBar);
            util.ad.zolClkTrack(a, adBar);
        }};
    };
    module.exports = Picture;
});
