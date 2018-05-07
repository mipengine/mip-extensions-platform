/**
 * @file mip-jia-tukuscreen 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    var CustomStorage = util.customStorage;

    function checkEleNum(elem, self) {

        var eleArr = elem.find('.menu-li');
        var length = eleArr.length;
        elem.find(self.more).removeClass(self.down).children().html('查看全部');
        if (length > 16) {
            eleArr.hide().slice(0, 15).show();
            elem.find(self.more).show();
        } else {
            elem.find(self.more).hide();
        }
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var thisObj = this.element;
        self.ele = thisObj.getAttribute('tab-element');
        self.cur = thisObj.getAttribute('tab-current') || 'cue';
        self.contain = thisObj.getAttribute('tab-contain');
        self.more = thisObj.getAttribute('menu-more') || '.menu-li-more';
        self.down = thisObj.getAttribute('menu-down') || 'down';
        $(thisObj).append('<div class="popmask"></div>');
        checkEleNum($(self.contain).eq(0), self);
        $(self.more).click(function () {
            if ($(this).hasClass(self.down)) {
                checkEleNum($(this).parents(self.contain), self);
                $(this).removeClass(self.down).children().html('查看全部');
            } else {
                $(this).addClass(self.down).siblings('.menu-li').show();
                $(this).children().html('收起');
            }
        });
        $(self.ele).click(function () {
            $(this).parents('.tuku-images-nav').css({
                'z-index': 12
            });
            var index = $(self.ele).index(this);
            // console.log(index)
            $(this).siblings().removeClass(self.cur);
            $(self.contain).eq(index).siblings(self.contain).css('height', 0);
            checkEleNum($(self.contain).eq(index), self);
            if ($(self.contain).eq(index).height() === 0) {
                $(this).addClass(self.cur);
                $(thisObj).find('.popmask').css({
                    'z-index': 9,
                    'position': 'fixed'
                }).show();
                $('.newHeader').css('z-index', 10);
                $(self.contain).eq(index).css({
                    'height': 'auto'
                });
            } else {
                $(this).removeClass(self.cur);
                $(thisObj).find('.popmask').hide();
                $(self.contain).eq(index).css({
                    'height': 0
                });
            }
        });
        $(thisObj).find('.popmask').click(function () {
            $(self.contain).css('height', 0);
            $(this).hide();
            $(self.ele).removeClass(self.cur);
        });
    };

    return customElement;
});