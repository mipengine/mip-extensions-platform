/**
 * @file mip-hunliji-collectList 组件
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
            data: {sessionid: sessionId},
            success: function (result) {
                var html = '';
                if (result.data.list) {
                    for (var i = 0; i < result.data.list.length; i++) {
                        html += '<a href="' + href + '/baidu/package/detail_' + result.data.list[i].set_meal.id + '"'
                            + ' mip-link>'
                            + '<li  data-attr="' + result.data.list[i].id + '">'
                            +  '<div class="pkg-item-hd">'
                            + '<p><i>' + result.data.list[i].set_meal.property_name + '</i></p>'
                            + '<mip-img layout="container" src="' + result.data.list[i].set_meal.cover_path
                            + '?imageView2/2/w/240" alt=""></mip-img>'
                            + '</div>'
                            + '<div class="pkg-item-bd">'
                            + '<h3>' + result.data.list[i].set_meal.title + '</h3>'
                            + '<p>￥<span>' + result.data.list[i].set_meal.show_price + '</span></p>'
                            + '</div>'
                            + '</li>'
                            + '</a>';

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
