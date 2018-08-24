/**
 * @file 模态框点击下滑上拉插件
 * @author wenkai(1084072318@qq.com)
 * @version 1.0.0
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var model = document.getElementById('mask-tm');
        document.getElementById('shortcut-ico').addEventListener('click', function () {
            model.style.display = 'block';
            toggleSlide('shortcut', '200');
        });

        model.addEventListener('click', function () {
            model.style.display = 'none';
            toggleSlide('shortcut', '200');
        });
    };
    function toggleSlide(id, s) {
        var div = document.getElementById(id);
        var divheight = div.offsetHeight;
        div.style.transition = 'height ' + s + 'ms';
        div.style.overflow = 'hidden';
        if (divheight) {
            slide.up(div);
        }
        else {
            slide.down(div);
        }
    }

    var slide = {
        down: function (div) {
            div.style.height = '166px';
            div.style.display = 'block';
        },
        up: function (div) {
            div.style.height = '0';
        }
    };
    return customElement;
});
