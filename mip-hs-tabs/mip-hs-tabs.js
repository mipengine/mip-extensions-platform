/**
 * @file mip-hs-tabs 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var Parts = function () {
            this.mNav = $el.find('.showActive');
            this.mSection = $el.find('#m-section');
            this.slidNav = function ($obj, $warp) {
                var moveX = $obj.position().left + $obj.parent().scrollLeft();
                var pageX = document.documentElement.clientWidth;
                var blockWidth = $obj.width();
                var left = moveX - (pageX / 2) + (blockWidth / 2);
                $warp.scrollLeft(left);
            };
        };
        Parts.prototype = {
            classSlid: function () {
                this.slidNav(this.mNav, this.mSection);
                $el.find('#lists-section div').each(function () {
                    if ($el.find('#lists-section div').children('a').hasClass('showActive')) {
                        $el.find('.FAQ_co_warp').find('.FAQ_co').eq($el.find('.showActive')
                        .parent().index()).show().siblings().hide();
                    }

                });

                $el.find('#lists-section div').on('click', function () {
                    $(this).children('a').addClass('showActive');
                    $(this).siblings().children('a').removeClass('showActive');
                    $el.find('.FAQ_co_warp').find('.FAQ_co').eq($(this).index()).show().siblings().hide();
                });

            }
        };
        var methods = new Parts().classSlid();
    };

    return customElement;
});
