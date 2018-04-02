/**
 * @file mip-linktion-fortune-listpopdetail 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var lists = $el.find('#lists').children('li');
        lists.on('click', function () {
            var listsImgSrc = $(this).children('img').attr('src');
            var listsWord = $(this).children('.card-txt').children('p').text();
            var popName = $(this).data('name');
            var popDetail = $(this).data('position');
            $el.find('#popImgSrc').children('img').attr('src', listsImgSrc);
            $el.find('#popName').text(popName);
            $el.find('#popDetail').text(popDetail);
            $el.find('#popWord').text(listsWord);
        });
    };

    return customElement;
});
