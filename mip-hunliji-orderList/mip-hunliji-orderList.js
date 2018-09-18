/**
 * @file mip-hunliji-orderList 组件
 * @author li_shu
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    function getOrderList(url, sessionId, element, href, page) {
        $.ajax({
            url: url,
            type: 'get',
            xhrFields: {
                withCredentials: true
            },
            data: {
                sessionid: sessionId,
                page: page,
                'per_page': 20
            },
            success: function (result) {
                var html = '';
                if (result.data.list) {
                    for (var i = 0; i < result.data.list.length; i++) {
                        html += '<li>'
                            + '<a href="' + href + '/merchant/detail_' + result.data.list[i].merchant.id + '" mip-link>'
                            + '<div class="order-item-hd">'
                            + '<mip-img layout="container" src="' + result.data.list[i].merchant.logo_path
                            + '?imageView2/2/w/100" alt=""></mip-img>'
                            + '</div>'
                            + '<div class="order-item-mid">'
                            + '<h3>' + result.data.list[i].merchant.name + '</h3>'
                            + '<div class="order_time">'
                            + '<span>' + result.data.list[i].merchant.property.name + '</span>'
                            + '<span>' + result.data.list[i].created_at.substring(0, 10) + '预约</span>'
                            + '</div>'
                            + '</div>'
                            + '<div class="order-item-bd">'
                            + '<p>私信</p>'
                            + '</div>'
                            + '</a>'
                            + '<a href="' + href + '/p/wedding/Public/wap/m/mip_baidu/chat/dist/index.html?id='
                            + result.data.list[i].merchant.user_id + '" class="order-chat"></a>'
                            + '</li>';
                    }

                    $(element).append(html);

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
        var page = 1;
        var $wrapper = $(element).parents('.order_wrapper');
        this.addEventAction('customLogin', function (e) {
            sessionId = e.sessionId;
            getOrderList(url, sessionId, element, href, page);
        });
        $wrapper.scroll(function () {
            setTimeout(function () {
                page++;
                getOrderList(url, sessionId, element, href, page);
            }, 300);
        });
    };

    return customElement;
});
