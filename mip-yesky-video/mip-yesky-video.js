/**
 * @file mip-yesky-video 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        $(element).find('#video_btn video').on('play', function () {
            $('.bf').hide();
        });
    };
    return customElement;
});
