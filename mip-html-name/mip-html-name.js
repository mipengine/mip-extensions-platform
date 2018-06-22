/**
 * @file mip-html-name
 * 获取标签值然后判断
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var dataname = $(ele).find('.f-information').attr('data-categroyid');
        if (dataname === '9') {
            $(ele).find('.f-page-title').append('个性表情');
        } else if (dataname === '18') {
            $(ele).find('.f-page-title').append('QQ说说');
        } else if (dataname === '23') {
            $(ele).find('.f-page-title').append('QQ签名');
        } else if (dataname === '28') {
            $(ele).find('.f-page-title').append('QQ网名');
        } else if (dataname === '20') {
            $(ele).find('.f-page-title').append('QQ头像');
        } else if (dataname === '72') {
            $(ele).find('.f-page-title').append('个性图片');
        } else if (dataname === '74') {
            $(ele).find('.f-page-title').append('个性皮肤');
        }
    };
    return customElement;
});
