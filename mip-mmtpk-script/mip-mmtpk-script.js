/**
 * @file mip-mmtpk-script 组件
 * @author cwqiangne@163.com
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    var themeApp = {
        backToTop: function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 200) {
                    $('#back-to-top').css('display', 'inline');
                } else {
                    $('#back-to-top').css('display', 'none');
                }
            });
            $('#back-to-top').on('click', function (e) {
                e.preventDefault();
                $('html, body').scrollTop(0);
                return false;
            });
        },
        voting: function () {
            $('.picture-like').on('click', function () {
                var a = $(this);
                var aid = a.attr('id').replace('like_picture_', '');
                if (a.attr('disabled') !== 'disabled') {
                    fetch(window.phpurl + '/digg_ajax.php?action=good&id=' + aid);
                    var n1 = a.find('.num');
                    var n2 = a.parent().prev().find('.num');
                    var num = n1.length === 0 ? n2 : n1;
                    num.text(parseInt(num.html(), 10) + 1), a.attr('disabled', 'disabled'), $('#like').text(num.html());
                    VoteHistory.voteState(aid, 1);
                }
            });
        },
        init: function () {
            themeApp.voting();
            themeApp.backToTop();
        }
    };
    var VoteHistory = {
        vHistorys: null,
        vIsValid: null,
        voteState: function (a, b) {
            if (this.isValid()) {
                return null == b ? this.vHistorys[a] : (this.vHistorys[a] = b, void this.saveHistory());
            }
            return 0;
        },
        isValid: function () {
            if (this.vIsValid == null) {
                this.vIsValid = !!window.localStorage;
            }
            return this.vIsValid;
        },
        readHistory: function () {
            this.vHistorys = window.localStorage.getItem('vote_history'),
            this.vHistorys = JSON.parse(this.vHistorys),
            null == this.vHistorys && (this.vHistorys = {});
        },
        saveHistory: function () {
            if (null != this.vHistorys) {
                var a = 500;
                var b = function (m) {
                    var n = [];
                    for (var j in m) {
                        n.push(j);
                    }
                    return n;
                };
                var c = b(this.vHistorys);
                if (c.length > a) {
                    var d = c.length - a;
                    for (var i = 0; d > i; i++) {
                        delete this.vHistorys[c[i]];
                    }
                }
                var e = JSON.stringify(this.vHistorys);
                window.localStorage.setItem('vote_history', e);
            }
        },
        init: function () {
            this.isValid() && this.readHistory();
        },
        updateArticleStates: function () {
            if (this.isValid()) {
                var articles = [];
                $.each($('button[id^=like_picture_]'),
                function () {
                    articles.push(+this.id.replace('like_picture_', ''));
                });
                $.each(articles,
                function (a) {
                    var b = articles[a];
                    var c = VoteHistory.voteState(b);
                    if (void 0 !== c) {
                        var d = $('#like_picture_' + b);
                        var n1 = d.find('.num');
                        var n2 = d.parent().prev().find('.num');
                        var num = n1.length === 0 ? n2 : n1;
                        num.text(parseInt(num.html(), 10) + 1),
                        d.attr('disabled', 'disabled'), $('#like').text(num.html());
                    }
                });
            }
        }
    };

    customElement.prototype.build = function () {
        var ele = this.element;
        window.phpurl = ele.getAttribute('phpurl');

        var aid = ele.getAttribute('aid');
        if (aid) {
            var now = ele.getAttribute('now');
            if (now === '1') {
                fetch(window.phpurl + '/count.php?aid=' + aid);
            }
        }

        themeApp.init();
        VoteHistory.init();
        VoteHistory.updateArticleStates();
    };

    return customElement;
});
