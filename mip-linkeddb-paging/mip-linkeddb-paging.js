/**
 * @file mip-linkeddb-paging 组件
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
        var ele = this.element;
        /* 翻页 */
        var pageNum = 2;
        var letter;
        var setUrl;
        $(ele).find('#more-btn').on('click', function () {
            letter = $(this).attr('data-letter');
            if (letter) {
                setUrl = 'https://mip.linkeddb.com/music/letter/' + letter + '/p' + pageNum + '/';
            } else {
                setUrl = 'https://mip.linkeddb.com/music/p' + pageNum + '/';
            }
            $.get(setUrl, function (html) {
                if (html) {
                    $(html).appendTo($(ele).find('.itemsCont'));
                    pageNum += 1;
                } else {
                    $(ele).find('#more-btn').hide();
                }
            });
        });
    };

    return customElement;
});
