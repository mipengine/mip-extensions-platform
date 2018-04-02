/**
 * @file iframe广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var mipUtil = require('util');
    function Iframe(adBar) {
        this.adBar = adBar;
    }
    Iframe.prototype.create = function (util) {
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', fodder.src);
        iframe.setAttribute('marginheight', 0);
        iframe.setAttribute('marginwidth', 0);
        iframe.setAttribute('frameBorder', 0);
        iframe.setAttribute('scrolling', 'no');
        mipUtil.css(iframe, {
            display: 'block',
            width: fodder.width + 'px',
            height: fodder.height + 'px'
        });
        var div = document.createElement('div');
        div.classList.add('gmine_ad');
        mipUtil.css(div, {
            width: fodder.width + 'px',
            height: fodder.height + 'px'
        });
        util.ad.addAdMargin(div, fodder);
        div.appendChild(iframe);
        util.ad.addAdIcon(div, adBar);
        return {elements: [div]};
    };
    module.exports = Iframe;
});
