/**
 * @file mip-trilobite-scroll 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var el = this.element;
        var end = el.getAttribute('end');
        var appid = el.getAttribute('appid');
        var siteid = el.getAttribute('siteid');
        var host = el.getAttribute('http-host');

        var list = {
            init: function () {
                this.bindEvent();
            },
            bindEvent: function () {
                var self = this;
                var stop = true;
                var totalheight;
                if (end === 'false') {
                    self.nextpage = 1;
                    $(window).scroll(function () {
                        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                        if ($(document).height() <= totalheight) {
                            if (stop === true) {
                                stop = false;
                                fetch('/dc-admin/backend/v1/trilobite/getlistdata/' + appid + '?page=' + self.nextpage)
                                .then(function (res) {
                                    return res.text();
                                }).then(function (text) {
                                    var data = JSON.parse(text);
                                    $.each(data.data, function (index, value, array) {

                                        if (value.video_screen && value.video_screen !== '') {
                                            dom = '<a href="http://' + host + '/dc-admin/article/'
                                                + siteid + '/'
                                                + value.id
                                                + '" class="article-link">'
                                                + '    <div class="one-pic">'
                                                + '        <mip-img class="one-pic-icon" src="'
                                                + value.video_screen + '" alt=""></mip-img>'
                                                + '        <div class="video-icon">'
                                                + '            <div class="circle"></div>'
                                                + '            <div class="triangle-right"></div>'
                                                + '        </div>'
                                                + '        <div class="content">'
                                                + value.title
                                                + '        </div>'
                                                + '        <div class="eye">'
                                                + '            <span class="time">'
                                                + value.created_at
                                                + '            </span>'
                                                + '        </div>'
                                                + '    </div>'
                                                + '</a>';
                                        }
                                        else {
                                            var imgnum = 0;
                                            var dom = '';
                                            var img = '';
                                            value.thumbnail = $.parseJSON(value.thumbnail);
                                            if ($.isArray(value.thumbnail)) {
                                                imgnum = value.thumbnail.length;
                                            }

                                            switch (imgnum) {
                                                case 0:
                                                    dom = '<a href="http://' + host + '/dc-admin/article/'
                                                        + siteid + '/'
                                                        + value.id
                                                        + '" class="article-link">'
                                                        + '    <div class="no-pic">'
                                                        + '        <div class="content">'
                                                        + value.title
                                                        + '        </div>'
                                                        + '        <div class="eye">'
                                                        + '            <span class="time">'
                                                        + value.created_at
                                                        + '            </span>'
                                                        + '        </div>'
                                                        + '    </div>'
                                                        + '</a>';
                                                    break;
                                                case 1:
                                                    for (var i = 0; i < imgnum; i++) {
                                                        img += '<mip-img src="' + value.thumbnail[i]
                                                            + '" alt=""></mip-img>';
                                                    }
                                                    dom = '<a href="http://' + host + '/dc-admin/article/'
                                                        + siteid + '/'
                                                        + value.id
                                                        + '" class="article-link">'
                                                        + '<div class="one-pic">'
                                                        + img
                                                        + '    <div class="content">'
                                                        + value.title
                                                        + '    </div>'
                                                        + '   <div class="eye">'
                                                        + '        <span class="time">'
                                                        + value.created_at
                                                        + '        </span>'
                                                        + '    </div>'
                                                        + '</div>'
                                                        + ' </a>';
                                                    break;
                                                case 2:
                                                case 3:
                                                default:
                                                    imgnum = imgnum > 3 ? 3 : imgnum;
                                                    for (var j = 0; j < imgnum; j++) {
                                                        img += '<mip-img src="' + value.thumbnail[j]
                                                        + '" alt=""></mip-img>';
                                                    }
                                                    dom = '<a href="http://' + host + '/dc-admin/article/'
                                                        + siteid + '/'
                                                        + value.id
                                                        + '" class="article-link">'
                                                        + '<div class="three-pic">'
                                                        + img
                                                        + '    <div class="content">'
                                                        + value.title
                                                        + '    </div>'
                                                        + '    <div class="eye">'
                                                        + '        <span class="time">'
                                                        + value.created_at
                                                        + '        </span>'
                                                        + '    </div>'
                                                        + '</div>'
                                                        + ' </a>';
                                                    break;
                                            }

                                        }
                                        $('#Loading').before(dom);
                                    });
                                    stop = true;
                                    if (data.end === 'true') {
                                        $(window).unbind('scroll');
                                    }
                                    else {
                                        self.nextpage = data.end;
                                    }
                                }, 'json');
                            }
                        }

                    });
                }

            }
        };
        list.init();

    };

    return customElement;
});
