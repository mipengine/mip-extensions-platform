/**
 * @file mip-video-adaption 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var W = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    function record(adaption) {
        var height = $(document.getElementsByClassName(adaption))[0][0].style.height;
        if (W >= '320' && W <= '374' || W <= '320') {
            height = '245';
        }
        else if (W >= '375' && W <= '424') {
            height = '285';
        }
        else if (W >= '425' && W <= '599') {
            height = '315';
        }
        else if (W >= '600' && W <= '767') {
            height = '450';
        }
        else if (W >= '768' && W <= '1200') {
            height = '575';
        }
        else {
            height = '635';
        }
        return height;
    }

    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var recode = element.getAttribute('data-res') || '';

        // 如果没有写data-res 则报错提示
        if (!recode) {
            alert('未填写获取元素字段，不能获取数据');
            element.remove();
            return;
        }

        $('.' + recode).css('width', W + 'px');
        $('.' + recode).css('height', record(recode) + 'px');
    };

    return customElement;
});
