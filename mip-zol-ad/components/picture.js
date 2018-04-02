/**
 * @file 图片广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var mipUtil = require('util');
    function Picture(adBar) {
        this.adBar = adBar;
    }
    Picture.prototype.create = function (util) {
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        var a = document.createElement('a');
        a.classList.add('gmine_ad');
        a.setAttribute('href', fodder.click_url);
        a.setAttribute('target', fodder.is_self === '1' ? '_self' : '_blank');
        mipUtil.css(a, {
            display: 'block',
            width: fodder.width + 'px',
            height: fodder.height + 'px'
        });
        util.ad.addAdMargin(a, fodder);
        var pic = new Image(fodder.width, fodder.height);
        pic.src = fodder.src;
        a.appendChild(pic);
        util.ad.addAdIcon(a, adBar);
        return {elements: [a]};
    };
    module.exports = Picture;
});
