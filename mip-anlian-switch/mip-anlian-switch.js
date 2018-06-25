/**
 * @file mip-anlian-switch 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        // TODO
        var $element = $(this.element);
        var hdLi = $element.find('.hd li');
        hdLi.on('click', function () {
            var indexNew = $(this).attr('data-index');
            hdLi.each(function (i, v) {
                var consultantContentBoxI = $element.find('.consultant_content_box_' + i);
                var consultantImgBoxI = $element.find('.consultant_img_box_' + i);
                if (i === parseInt(indexNew, 10)) {
                    hdLi.eq(i).addClass('on' + indexNew);
                    consultantContentBoxI.addClass('on');
                    consultantImgBoxI.addClass('on');
                } else {
                    hdLi.removeClass('on' + i);
                    consultantContentBoxI.removeClass('on');
                    consultantImgBoxI.removeClass('on');
                }
            });
        });
    };

    return customElement;
});
