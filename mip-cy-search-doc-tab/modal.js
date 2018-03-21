/**
 * @file mip-cy-tab 组件
 * @author 春雨前端开发组
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    function Modal(ele, fun) {
        this.$html = $('html');
        this.$ele = ele && $(ele) || $(document.body);
        this.$modal = null;
        this.fun = fun;
    }

    Modal.prototype.open = function () {
        var that = this;
        var $modal;
        this.$html.css('overflow', 'hidden');
        if (!this.$modal) {
            this.$modal = $modal = $('<div class="mip-cy-modal"></div>');
            this.$ele.append($modal);
            $modal.on('click', function () {
                that.close();
            });
        }

    };

    Modal.prototype.close = function (fun) {
        this.$html.css('overflow', 'visible');
        if (this.$modal) {
            this.$modal.off('click');
            this.$modal.remove('<div class="mip-cy-modal"></div>');
            this.$modal = null;
        }

        if (typeof this.fun === 'function') {
            this.fun();
        }

    };

    return Modal;

});
