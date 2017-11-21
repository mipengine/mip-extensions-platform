/**
 * @file mip-custom-passport-365caidashi  财大师专属 360统计组件。
 * @author xiaojinping
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 360统计，这是360统计。财大师专属。其他项目切勿套用。
        var ele = this.element;
        var src = (document.location.protocol === 'http:') ? 'http://js.passport.qihucdn.com/11.0.1.js?bd0a75b0b10d2dfb7f2e9ce04d46cf2c' : 'https://jspassport.ssl.qhimg.com/11.0.1.js?bd0a75b0b10d2dfb7f2e9ce04d46cf2c';
        var script = document.createElement('script');
        script.src = src;
        script.id = 'sozz';
        ele.appendChild('script');
        ele.style.display = 'none';
    };

    return customElement;
});
