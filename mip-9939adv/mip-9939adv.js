/**
 * @file mip-9939adv 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var viewport = require('viewport');
    var yOffset = 200;
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var threshold = ele.getAttribute('threshold') || yOffset;
        var closeEle = ele.getElementsByClassName('close-btn');
        var delay = parseInt(ele.getAttribute('delay'), 10) || 0;
        var timmer;
        closeEle[0].addEventListener('click', function () {
            ele.parentElement.removeChild(ele);
        }, false);


        viewport.on('scroll', function () {
            var scrollTop = viewport.getScrollTop();
            if (scrollTop > threshold) {
                ele.classList.add('fixed-adv');
                if (delay) {
                    clearTimeout(timmer);
                    timmer = setTimeout(function () {
                        ele.classList.remove('fixed-adv');
                    }, delay);
                }
            }
            else {
                ele.classList.remove('fixed-adv');
            }
        });
    };

    return customElement;
});
