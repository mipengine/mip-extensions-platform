/**
 * @file mip-masonry 组件
 * @author Twinkleee
 * @copyright 2018 wjdhcms.com, Inc. All Rights Reserved
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
		// 特殊情况：使用jQuery的.data()特性，Zepto不支持
        var $ = require('jquery');
        var $el = $(this.element);
        (function ($) {
            var Cascade = function (element, options) {
                this.init('cascade', element, options);
            };
            Cascade.prototype = {
                constructor: Cascade,
                init: function (type, element, options) {
                    this.type = type;
                    this.$element = $(element);
                    this.options = this.getOptions(options);
                    this.layout();
                },
                getOptions: function (options) {
                    options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options);
                    return options;
                },
                layout: function () {
                    this.item();
                    this.box();
                },
                item: function () {
                    var $box = this.$element;
                    var twCoord = [];
                    var twNum = 0;
                    var options = this.options;
                    var i = 0;
                    var $items = $box.find(this.options.fallsCss);
                    var fallsWidth = $items.eq(0).outerWidth() + this.options.margin;
                    var boxWidth = $box.outerWidth() + this.options.margin;
                    var twAutoWidth = 0;
                    twNum = Math.floor(boxWidth / fallsWidth);
                    twAutoWidth = (boxWidth - twNum * fallsWidth) / 2;
                    for (; i < twNum; i++) {
                        twCoord.push([i * fallsWidth, 0]);
                    }
                    $items.each(function () {
                        var $item = $(this);
                        var fallsHeight = $item.outerHeight() + options.margin;
                        var temp = 0;
                        for (i = 0; i < twNum; i++) {
                            if (twCoord[i][1] < twCoord[temp][1]) {
                                temp = i;
                            }
                        }
                        $item.stop().animate({
                            left: twCoord[temp][0] + twAutoWidth + 'px',
                            top: twCoord[temp][1] + 'px'
                        });
                        twCoord[temp][1] += fallsHeight;
                    });
                    this.coord = twCoord;
                    this.num = twNum;
                    this.autoWidth = twAutoWidth;
                },
                box: function () {
                    this.$element.height(this.getFallsMaxHeight());
                },
                getFallsMaxHeight: function () {
                    var maxHeight = 0;
                    var i = 0;
                    var heightArry = [];
                    var twCoord = this.coord;
                    var twNum = this.num;
                    for (; i < twNum; i++) {
                        heightArry.push(twCoord[i][1]);
                    }
                    heightArry.sort(function (a, b) {
                        return a - b;
                    });
                    return heightArry[twNum - 1];
                }
            };
            var old = $.fn.cascade;
            $.fn.cascade = function (option) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data('cascade');
                    var options = typeof option === 'object' && option;
                    if (!data) {
                        $this.data('cascade', data = new Cascade(this, options));
                        $(window).on('resize.cascade', function () {
                            data['layout']();
                        });
                    }
                    if (typeof option === 'string') {
                        data[option]();
                    }
                });
            };
            $.fn.cascade.Constructor = Cascade;
            $.fn.cascade.defaults = {
                fallsCss: '.item',
                margin: 15
            };
            $.fn.cascade.noConflict = function () {
                $.fn.cascade = old;
                return this;
            };
        })($);
        $el.cascade();
    };

    return customElement;
});
