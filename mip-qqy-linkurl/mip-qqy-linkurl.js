/**
 * @file mip-qqy-linkurl 去去游戏处理durl客户端链接组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var ios = platform.isIos();
    var android = platform.isAndroid();

    customElement.prototype.build = function () {
        var e = $(this.element);
        var downBtns =  e.find($('.durl'));
        var downurl = e.find('.downurl');
        if (ios === true) {
            $(downBtns).each(function () {
                if ($(this).attr('ios') === '') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
                else {
                    $(this).attr('href', $(this).attr('ios'));
                }
                if ($(this).text() === '查看') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
            });
        }
        else if (android === true) {
            $(downBtns).each(function () {
                if ($(this).attr('an') === '') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
                else {
                    $(this).attr('href', $(this).attr('an'));
                }
                if ($(this).text() === '查看') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
            });
        }
        else {
            $(downBtns).each(function () {
                if ($(this).attr('an') === '') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
                else {
                    $(this).attr('href', $(this).attr('an'));
                }
                if ($(this).text() === '查看') {
                    $(this).attr('href', $(this).attr('yuan'));
                }
            });
        }

        if (ios === true) {
            if (downurl.length > 0) {
                downurl.find('.android').hide();
                downurl.find('.ios').css('display', 'block');
                var filesize = downurl.find('.ios em').text();
                if (filesize === '') {
                    filesize = '暂无';
                }
                $('.grfile').text(filesize);
            }
        }
    };

    return customElement;
});
