/**
 * @file 小说阅读页逻辑脚本
 * @author lj
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;
    var fetchJsonp = require('fetch-jsonp');
    var down = {
        bookid: $('mip-down-address').attr('bookid'),
        id: $('mip-down-address').attr('id'),
        qf: function (o) {
            if (platform.isIos()) {
                $('.downApp,.install a,.free-book a,.rs-app-btn a').attr('href', 'https://disp.rr6.com/spread/v1/1009');
            }
            if ($(o).find('.updown > a').last().text() === '返回列表'
            && $(o).find('.install a').attr('data-read').indexOf('http') === 0) {
                $(o).find('.updown > a').last().attr('href', $(o).find('.install a').attr('data-read')).html('下一章');
            }
        },
        ml: function (o) {
            fetchJsonp('https://www.xz6.com/ajax.php?action=getChapterList' + '&bookid=' + this.bookid, {
                method: 'get'
            }).then(function (response) {
                response.json().then(function (data) {
                    if (void 0 !== data.chapters) {
                        var d = data.chapters;
                        var html = '';
                        for (var i = 0; i < d.length; i++) {
                            if (d[i].id === this.id) {
                                html += '<li class="cur"><a href="' + d[i].murl + '">' + d[i].title + '</a></li>';
                            }
                            else {
                                html += '<li><a href="' + d[i].murl + '">' + d[i].title + '</a></li>';
                            }
                        }
                        $(o).find('#chapter-list').append(html);
                        $(o).find('.title > p').text('共' + d.length + '章');
                    }
                    if (void 0 !== data.relevant) {
                        var r = data.relevant;
                        var html1 = '';
                        for (var x = 0; x < r.length; x++) {
                            html1 += '<li><i>【' + r[x].classname + '】</i><a href="' + r[x].murl + '">'
                            + r[x].title + '</a></li>';
                        }
                        $(o).find('.morebook > ul').append(html1);
                    }
                });
            });
        },
        op: function (o) {
            $(o).find('#read').click(function (e) {
                if ($(o).find('#read-opt').hasClass('active')) {
                    if ($(e.target).parents('#read-head').length === 0
                    && $(e.target).parents('#rs-app').length === 0
                    && $(e.target).parents('#read-footer').length === 0
                    && $(e.target).parents('#blockOverlay').length === 0
                    && $(e.target).parents('#rs-chapter').length === 0) {
                        $(o).find('#read-opt,#rs-app').removeClass('active');
                    }
                }
                else {
                    if ($(e.target).parents('.updown').length === 0
                    && $(e.target).parents('.install').length === 0
                    && $(e.target).parents('.morebook').length === 0) {
                        $(o).find('#read-opt').addClass('active');
                    }
                }
            });
            $(o).find('#read-footer .rgChapter').click(function () {
                $(o).find('#blockOverlay').show();
                $(o).find('#rs-chapter').animate({right: '0'}, 50);
            });
            $(o).find('#blockOverlay').click(function () {
                $(o).find('#blockOverlay').hide();
                $(o).find('#rs-chapter').animate({right: '-100%'}, 10);
            });
            $(o).find('#read-footer .rgAPP').click(function () {
                if ($(o).find('#rs-app').hasClass('active')) {
                    $(o).find('#rs-app').removeClass('active');
                }
                else {
                    $(o).find('#rs-app').addClass('active');
                }
            });
        },
        init: function (o) {
            this.op(o), this.ml(o), this.qf(o);
        }
    };
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        down.init(element);
    };
    return customElem;
});
