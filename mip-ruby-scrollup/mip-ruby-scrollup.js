/**
 * @file mip-ruby-scrollup 组件
 * @author
 */
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var step = 52;
        var delay = 2000;
        var id = 'join_stats';
        var liNum = 2;
        this.t;
        this.p = false;
        this.o = document.getElementById(id);
        this.h = this.o.innerHTML;
        var that = this;
        var len = $('#join_stats ul:last-child').find('li').length;
        var i = 1;
        var j = 1;
        this.start = function () {
                $('#join_stats').append(this.h);
                if (!this.p) {
                // $('#join_stats').animate({'margin-top': '-'+step+'px'},delay);
                    $('#join_stats').css('margin-top', -step);
                }
                i = 1;
                this.t = setInterval(function () {
                    that.scrolling();
                }, delay * liNum);
            };
        this.scrolling = function () {
                j ++;
                i ++;
                $('#join_stats').css('margin-top', -(step * j));
                // $('#join_stats').animate({'margin-top': '-'+(step*j)+'px'},delay);
                if (i >= (len / liNum)) {
                    i = 1;
                    $('#join_stats').append(this.h);
                }
                if (j === 199) {
                    i = 1;
                    j = 0;
                    $('#join_stats ul').not(':first-child').remove();
                    $('#join_stats').css('margin-top', 0);
                    // $('#join_stats').stop(false,false).animate({'margin-top': '0px'},delay);
                }
            };
        setTimeout(function () {
            that.start();
        }, delay);
    };

    return customElement;
});
