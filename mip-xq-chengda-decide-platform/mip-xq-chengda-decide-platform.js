/**
 * @file mip-xq-chengda-decide-platform 组件
 * @author XunselF
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var util = require('util');

    var platform = util.platform;

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;

        var text = '';

        var prompt = '';

        if (platform.isIos() || platform.isAndroid()) {

            // 移动端输出

            text = '<div id="hm_t_124292"></div>';

            prompt = '已打印移动端百度推荐的异步代码';

        }
        else {

            // PC端输出


            text = '<div id="hm_t_124291"></div>';

            prompt = '已打印PC端百度推荐的异步代码';

        }


        element.innerHTML = text;

        console.log(prompt);
    };

    return customElement;
});

