/**
 * @file MIP 页面预览组件，包括切换浏览模式、打开、关闭、处理嵌入页面的跳转
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* eslint-disable max-nested-callbacks */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 初始化后注册事件
     */
    customElement.prototype.build = function () {
        var self = this;
        var $element = $(self.element);

        self.addEventAction('open', function (event, url) {
            var $iframe = $element.find('[iframe] iframe');
            if (!$iframe.length) {
                $iframe = $('<iframe />').attr({
                    sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals'
                }).appendTo($element.find('[iframe]'));
                $iframe.on('load', function () {
                    var el = this;
                    if (el.src && el.src !== 'about:blank') {
                        $(el.contentWindow.document.body).on('click', 'a', function () {
                            el.contentWindow.location.href = this.href;
                            return false;
                        });
                    }
                });
            }

            $iframe.attr('src', url);
            $element.show();
            document.documentElement.classList.add('mip-mipengine-preview-v3-noscroll');
        });

        self.addEventAction('close', function () {
            $element.find('[iframe] iframe').attr('src', 'about:blank');
            $element.hide();
            document.documentElement.classList.remove('mip-mipengine-preview-v3-noscroll');
        });

        self.addEventAction('toggleMode', function (event, type) {
            $element.attr('mode', type);
        });
    };

    return customElement;
});
/* eslint-enable max-nested-callbacks */
