/**
 * @file mip-zol-comment-floor zol业务组件：zol资讯文章页评论列表模块，楼层嵌套交互处理
 * @mulianju
 */

define(function (require) {
    'use strict';
    var util = require('util');
    var customElement = require('customElement').create();

    var defaults = {
        maxlength: 3,
        expandText: '\u67E5\u770B\u66F4\u591A\u697C\u5C42',
        foldText: '\u6536\u8D77\u697C\u5C42'
    };

    /**
     * 需要干扰结构显示样式，避免页面闪烁，生命周期需要提前
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var dataset = element.dataset;
        var floors = element.querySelectorAll('.floor');
        var len = floors.length;

        var options = util.fn.extend(true, defaults, dataset);
        if (len > options.maxlength) {
            for (var i = options.maxlength - 1; i < len; i++) {
                floors[i].classList.add('folded');
            }
            var btn = document.createElement('div');
            var lastFloor = floors[len - 1];
            btn.classList.add('expanded-btn');
            btn.innerHTML = options.expandText;
            lastFloor.nextElementSibling
                ? lastFloor.parentElement.insertBefore(btn, lastFloor.nextElementSibling)
                : lastFloor.parentElement.appendChild(btn);

            btn.addEventListener('click', function () {
                if (element.classList.contains('expanded')) {
                    element.classList.remove('expanded');
                    btn.innerHTML = options.expandText;
                } else {
                    element.classList.add('expanded');
                    btn.innerHTML = options.foldText;
                }
            });
        }
    };

    return customElement;
});
