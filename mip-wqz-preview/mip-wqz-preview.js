/**
 * @file mip-wqz-preview 组件
 * @author wangqizheng
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 检测是否支持触摸
        var touch = 'ontouchstart' in window;
        var EClick = touch ? 'touchstart' : 'click';

        // 缓存dom对象
        var $frameWrap;
        var $frame;
        var $frameClose;
        var $html = $('html');
        var self = this;
        var $el = $(self.element);

        // 开
        function openFrame() {
            var $this = $(this);
            var $link = $this.attr('data-preview-link');
            $frameWrap.addClass('preview-active');
            $html.addClass('preview-no-scroll');
            $frame.attr('src', $link);
        }

        // 关
        function closeFrame() {
            $frameWrap.removeClass('preview-active');
            $html.removeClass('preview-no-scroll');
            $frame.attr('src', '');
        }

        // 只插入一次dom
        function createFrame() {
            $('<div id="preview-wrap">'
                + '    <div id="preview-phone">'
                + '        <iframe id="preview-frame" src="" frameborder="0" sandbox="allow-scripts '
                + 'allow-same-origin allow-forms allow-popups allow-modals"></iframe>'
                + '    </div>'
                + '    <div class="close preview-close"></div>'
                + '    <div class="close preview-close-bg"></div>'
                + '</div>').appendTo($el);
            setTimeout(function () {
                $frameWrap = $('#preview-wrap');
                $frame = $('#preview-frame');
                $frameClose = $('.close');
                $frameClose.on(EClick, closeFrame);
            }, 20);
        }
        createFrame();

        // 代理
        $el.on(EClick, '[preview]', openFrame);
    };

    return customElement;
});
