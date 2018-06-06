/**
 * @file mip-xxd-round-list 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var DEFAULT_SIZE = 5;

    function round() {
        var self = this;
        if (self.started) {
            self.index = (self.index + self.size) % self.total;
        }
        else {
            self.started = true;
        }
        var newList = [];
        for (var i = self.index; i < self.index + self.size; i++) {
            newList.push(self.items[i % self.total]);
        }
        var currList = Array.prototype.slice.call(self.list.children);
        currList.forEach(function (child) {
            self.list.removeChild(child);
        });
        newList.forEach(function (child) {
            self.list.appendChild(child);
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;
        self.size = Number(element.getAttribute('size')) || DEFAULT_SIZE;
        self.list = element.querySelector('[mip-xxd-round-container]');
        self.index = 0;
        self.started = false;
        if (!self.list) {
            console.error('必须有 [mip-xxd-round-container] 子节点');
            return;
        }
        self.items = Array.prototype.slice.call(self.list.children);
        self.total = self.items.length;
        self.trigger = element.querySelector('[mip-xxd-round-trigger]');
        if (self.trigger) {
            self.trigger.addEventListener('click', round.bind(self));
        }
        round.call(self);
    };

    return customElement;
});
