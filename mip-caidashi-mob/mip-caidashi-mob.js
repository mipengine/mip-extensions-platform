/**
 * @file mip-caidashi-mob 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 检测是否是pc端访问移动端，如果是，强制进入pc端，例如：我在PC端访问移动端，只要我的域名前面是m开头的，强制进入到我的 PC端，不会出现PC端看到的是移动端的情况。如果后续域名升级发生变化，后续再做相应处理。
        // TODO 关于http或者是https的情况，无论移动端是什么协议，我只需要处理PC端的url协议。具体是什么协议，开发人员可自定义，也可以让程序自动选择当前的协议。
        var ele = this.element;
        var url = location.href;
        var dataProtocol = ele.getAttribute('data-protocol');
        if (dataProtocol !== 'http:' && dataProtocol !== 'https:') {
            dataProtocol = document.location.protocol;
        }
        var src = ele.getAttribute('src');
        var mobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i);
        if ((url.indexOf(src) !== -1) && mobile == null) {
            var newUrl = url.replace(document.location.protocol + '//m', dataProtocol + '//www');
            location.href = newUrl;
        }
    };

    return customElement;
});
