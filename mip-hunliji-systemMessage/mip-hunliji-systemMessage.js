/**
 * @file mip-hunliji-systemMessage 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    function getOrderList(url, sessionId, element, href) {
        $.ajax({
            url: url,
            type: 'get',
            xhrFields: {
                withCredentials: true
            },
            data: {
                sessionid: sessionId,
                'per_page': 99999999
            },
            success: function (result) {
                var html = '';
                var data;
                var content = '';
                if (result.data.list) {
                    for (var i = 0; i < result.data.list.length; i++) {
                        data = result.data.list;
                        if (data[i].content) {
                            for (var j = 0; j < data[i].content.length; j++) {
                                if (data[i].property_id !== '13') {
                                    content = '<a href="' + href + '/baidu/package/detail_' + data[i].content[j].id
                                        + '" mip-link>'
                                        + '<li>'
                                        + '<div class="message_pack_hd">'
                                        + '<mip-img layout="container" src="' + data[i].content[j].cover_path
                                        + '?imageView2/1/w/196/h/122" alt=""></mip-img>'
                                        + '</div>'
                                        + '<div class="message_pack_bd">'
                                        + '<h3>' + data[i].content[j].title + '</h3>'
                                        + '<p>￥<span>' + data[i].content[j].show_price + '</span></p>'
                                        + '</div>'
                                        + '</li>'
                                        + '</a>';
                                } else {
                                    content = '<a href="' + href + '/baidu/hotel/detail_' + data[i].content[j].id + '"'
                                        + ' mip-link>'
                                        + '<li>'
                                        + '<div class="message_pack_hd hotel">'
                                        + '<mip-img layout="container"  src="' + data[i].content[j].logo_path
                                        + '?imageView2/1/w/196/h/196" alt=""></mip-img>'
                                        + '</div>'
                                        + '<div class="message_pack_bd">'
                                        + '<h3>' + data[i].content[j].name + '</h3>'
                                        + '<p>￥<span>' + data[i].content[j].hotel.price_start + '起</span></p>'
                                        + '</div>'
                                        + '</li>'
                                        + '</a>';
                                }
                            }
                        }

                        if (data[i].property_id !== '13') {
                            html += '<div class="message_info">'
                                + '<div class="message_time">' + data[i].created_at.substring(5, 11) + '</div>'
                                + '<div class="message_content">'
                                + '<h3>系统根据您提交的需求，已为你推荐' + data[i].content.length
                                + '个适合您的' + data[i]._property.name + '套餐，点击查看：</h3>'
                                + '<div class="message_pack_list">'
                                + '<ul>' + content + '</ul>'
                                + '</div>'
                                + '</div>'
                                + '</div>';

                        } else {
                            html += ' <div class="message_info">'
                                + '<div class="message_time">' + data[i].created_at.substring(5, 11) + '</div>'
                                + '<div class="message_content">'
                                + '<h3>系统根据您提交的需求，已为你推荐' + data[i].content.length
                                + '个适合您的' + data[i]._property.name + '，点击查看：</h3>'
                                + '<div class="message_pack_list">'
                                + '<ul>' + content + '</ul>'
                                + '</div>'
                                + '</div>'
                                + '</div>';
                        }
                    }

                    $(element).html(html);

                }
            }
        });
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var sessionId = '';
        var url = $(element).attr('data-url');
        var href = $(element).attr('data-href');
        this.addEventAction('customLogin', function (e) {
            sessionId = e.sessionId;
            getOrderList(url, sessionId, element, href);
        });
    };

    return customElement;
});
