/**
 * @file mip-jdd-sort 组件
 * @author yangtong
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var Sort = require('./sort');

    //  build说明：组件标签含有sort属性则需要立即初始化，没有则监听sort事件(firstInviewCallback在组件display:none;的情况下仍会触发。)
    customElement.prototype.build = function () {
        var immediateSort = this.element.hasAttribute('sort');
        var self = this;
        this.hasinited = false;
        if (immediateSort) {
            initSort.call(self);
        }
        else {
            this.addEventAction('sort', function () {
                initSort.call(self);
            });
        }
    };

    /**
     * 初始化排序功能
     *
     */
    function initSort() {
        if (this.hasinited) {
            return;
        }
        this.hasinited = true;
        var sortHead = this.element.querySelector('.sort-head');
        var sortBody = this.element.querySelector('.sort-body');
        if (!sortHead || !sortBody) {
            console.warn('缺少必须的类');
        }

        var newSort = new Sort(sortBody);
        newSort.init(sortHead);
    }

    return customElement;
});
