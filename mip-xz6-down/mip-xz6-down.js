/**
 * @file 小说落地页逻辑脚本
 * @author lj
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
    var down = {
        xg: function (o) {
            if ($(o).find('.keyText *').length === 0) {
                $(o).find('.tbsm').remove();
            }
            if ($(o).find('.tzz .scroll li').length === 0) {
                $(o).find('.tzz').remove();
            }
            if ($(o).find('#chapter-list li').length < 1) {
                $(o).find('.btns .goRead').remove();
                $(o).find('#bookCata').remove();
            }
            else if ($(o).find('#chapter-list li').length === 1) {
                $(o).find('#moer-chapter').hide();
            }
            if (platform.isIos()) {
                $('.book-tips a,.free-book a,#open-app').attr('href', 'https://disp.rr6.com/spread/v1/1009');
            }
        },
        yd: function (o) {
            $(o).find('#tab span').eq(1).click(function () {
                $(o).find('#bookCata,.tbsm,.tzz,.tltj,.cnxh,.rank').show();
            });
            $(o).find('#tab span').eq(2).click(function () {
                $(o).find('#bookCata,.tbsm,.tzz,.tltj,.cnxh,.rank').hide();
            });
        },
        rank: function (o) {
            if ($(o).find('.rank .list-ul').length > 0) {
                $(o).find('.rank .list-ul').each(function () {
                    $(this).find('li').hide().slice(0, 3).show();
                });
                $(o).find('.rank .getMore').click(function () {
                    var hnum = 0;
                    var vnum = 0;
                    for (var i = 0; i < $(this).prev('.list-ul').find('li').length; i++) {
                        if ($(this).prev('.list-ul').find('li').eq(i).css('display') === 'none') {
                            hnum++;
                        }
                        else {
                            vnum++;
                        }
                    }
                    if (hnum === 0) {
                        $(this).prev('.list-ul').find('li').hide().slice(0, 3).show();
                        $(this).html('<span>点击查看更多</span>');
                    }
                    else {
                        $(this).prev().find('li').slice(0, vnum + 3).show();
                        if (hnum - 3 === 0) {
                            $(this).html('<span>收起全部</span>');
                        }
                    }
                });
            }
        },
        init: function (o) {
            this.rank(o), this.xg(o), this.yd(o);
        }
    };
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        down.init(element);
    };
    return customElem;
});
