/**
 * @file mip-st-toast 组件
 * @author nobody
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    var STATUS = {
        HIDE: 0,
        SHOW: 1
    };

    /**
     * 通过事件被其他组件调用因此尽快加载
     */
    customElement.prototype.build = function () {
        var self = this;
        self.$wrap = $('body');
        self.$duration = 2 * 1000;

        self.createHtml();

        self.addEventAction('show', function (params) {
            var text = params.text;
            self.show(text);
        });
    };

    /**
     * 创建Toast的html结构
     */
    customElement.prototype.createHtml = function () {
        this.$ins = $('<div />')
            .addClass('toast-container')
            .addClass('toast-hide');

        this.$ins.html([
            '<span class="toast-text"></span>'
        ].join(''));

        this.$wrap.append(this.$ins);
    };

    customElement.prototype.show = function (text) {
        var self = this;

        if (self.showStatus === STATUS.SHOW) {
            clearTimeout(self.$timer);
        }
        else {
            self.$ins.removeClass('toast-hide');
            self.showStatus = STATUS.SHOW;
        }

        self.$ins.find('.toast-text').text(text);
        self.$timer = setTimeout(function () {
            self.hide();
        }, self.$duration);
    };

    customElement.prototype.hide = function () {
        this.showStatus = STATUS.HIDE;
        this.$ins.addClass('toast-hide');
    };

    return customElement;
});
