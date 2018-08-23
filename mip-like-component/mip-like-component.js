/**
 * @file mip-like-component 组件
 * @author yxl
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var tipsBox = function (options) {
        options = $.extend({
            obj: null,
            str: '+1',
            startSize: '12px',
            endSize: '20px',
            interval: 600,
            color: 'red',
            callback: function () {}
        },
        options);
        options.obj.append('<span class=\'__num\'>' + options.str + '</span>');
        var box = $(options.obj).find('.__num');
        var left = 0;
        var top = 0;
        box.css({
            'position': 'absolute',
            'left': left + 'px',
            'top': top + 'px',
            'z-index': 9999,
            'font-size': options.startSize,
            'line-height': options.endSize,
            'color': options.color
        });
        box.animate({
            'font-size': options.endSize,
            'opacity': '0',
            'top': top - parseInt(options.endSize, 0) + 'px'
        },
        options.interval,
        function () {
            box.remove();
            options.callback();
        });
    };

    customElement.prototype.firstInviewCallback = function () {
        var ele = $(this.element);
        var clicksrc = ele.attr('click-src');
        var updatesrc = ele.attr('update-src');
        var id = ele.attr('data-id');
        $.ajax({
            type: 'post',
            url: updatesrc,
            data: {
                'id': id
            },
            dataType: 'json',
            success: function (ret) {
                if (ret.state === 1) {
                    if (ele.find('.like-num')) {
                        ele.find('.like-num').html(ret.data.praiseNum);
                    }
                    if (ele.find('.eye')) {
                        ele.find('.eye').html(ret.data.readNum + '次浏览');
                    }
                }
            }
        });
        ele.find('.fabulous').on('click',
        function () {
            var self = $(this);
            $.ajax({
                url: clicksrc,
                type: 'post',
                dataType: 'json',
                data: {
                    'id': id
                },
                success: function (ret) {
                    if (ret.state === 1) {
                        tipsBox({
                            obj: self,
                            str: '+1',
                            color: 'red',
                            callback: function () {
                                var num = parseInt(ele.find('.like-num').text().replace(/,/g, ''), 0);
                                var newNum = num + 1;
                                ele.find('.like-num').text(newNum);
                            }
                        });
                    } else if (ret.state === 2) {
                        tipsBox({
                            obj: self,
                            str: '您已点赞，谢谢！',
                            color: 'red',
                            callback: function () {}
                        });
                    }
                }
            });
        });
    };
    return customElement;
});