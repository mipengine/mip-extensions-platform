/**
 * @file mip-index-tabcontent 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        function tabConent() {
            var flg = 0;
            var tabHref = '';
            var $media = $el.find('.media');
            var $tabContent = $el.find('.tab-content__close');
            $tabContent.on('click',
            function () {
                $(this).parent().parent().removeClass().addClass('tab-pane');
                flg = 0;
            });
            $media.on('click',
            function (event) {
                tabHref = $(this).data('href');
                $('#' + $(this).data('href')).removeClass().addClass('tab-pane active');
                flg = 1;
                event.preventDefault();
            });
        }
        tabConent();
    };

    return customElement;
});