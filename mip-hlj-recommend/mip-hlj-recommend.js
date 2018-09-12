/**
 * @file mip-hlj-recommend 推荐列表组件
 * @author kong_kong@hunliji.com
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var sessionId = '';

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var api = element.dataset.api;

        // 客户登陆成功
        this.addEventAction('customLogin', function (e) {
            sessionId = e.sessionId;
            if (sessionId) {
                var id = storage.get('recommend_id');
                var body = {
                    id: id,
                    sessionId: sessionId
                };

                $.ajax({
                    url: api,
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: body,
                    success: function (result) {
                        if (result.status.RetCode === 0) {
                            var data = result.data;
                            if (data.list && data.list.length) {
                                var html = '根据您填写的“<span class="red">' + data['property_name']
                                    + '</span>”需求信息，婚礼纪为您推荐:';
                                $(element).find('.header').html(html);
                                if (data.property_id === '13' || data.property_id === 13) {
                                    initHotel(element, data.list);
                                } else {
                                    initPackage(element, data.list);
                                }
                            } else {
                                var html = '你所在的城市无符合您需求的“<span class="red">' + data['property_name'] + '推荐';
                                $(element).find('.header').html(html);
                            }

                            $(element).find('.header').show();
                        }
                    }
                });
            }
        });
    };

    function initHotel(element, list) {
        var hotelUrl = element.dataset.hotelUrl;
        var html = '<div class="wrap">';
        for (var i = 0; i < list.length; i++) {
            var itemHtml = '<a href=' + hotelUrl + list[i].id + ' mip-link><div class="hotel">';
            itemHtml += '<div><mip-img class="left-img" width="100" height="100" src=';
            if (list[i]['logo_path_square']) {
                itemHtml += list[i]['logo_path_square'];
            } else {
                itemHtml += list[i]['logo_path'];
            }

            itemHtml += '?imageView2/1/w/100/h/100></mip-img><div class="right"><div class="mb10">';
            itemHtml += '<mip-img class="youxuan" width="28" height="16" '
                + 'src="http://qnm.hunliji.com/o_1ckhgknggtu519cu2h41r9o1psu2b.png">'
                + '</mip-img><span class="hotel-name">';
            itemHtml += list[i]['name'];
            itemHtml += '</span></div><div class="tag mb8"><div class="tag-item">';
            itemHtml += list[i]['hotel']['table_min'] + ' - ' + list[i]['hotel']['table_max'] + '桌</div>';
            itemHtml += '<div class="tag-item">' + list[i]['hotel']['kind'] + '</div>';
            if (list[i]['privilege']['platform_gift']) {
                itemHtml += '<div class="tag-right"><mip-img width="16" height="16"'
                + 'src="http://qnm.hunliji.com/o_1cm26hb8f1fjt1d331bqg8nh1bqtd.png">'
                + '</mip-img>'
                + '</div>';
            }
            if (list[i]['privilege']['free_order']) {
                itemHtml += '<div class="tag-right yellow"><mip-img width="16" height="16"'
                + 'src="http://qnm.hunliji.com/o_1cm26hb8f7pfvdp1l67m1a11qie.png">'
                + '</mip-img>'
                + '</div>';
            }

            itemHtml += '</div>';
            itemHtml += '<p class="mb8">' + list[i]['hotel']['area'] + '</p>';
            itemHtml += '<div class="order">'
                + '订单数' + list[i]['hotel_order_view_count']
                + '<div class="price">'
                + '<span class="unit">￥</span><span class="count">'
                + list[i]['hotel']['price_start']
                + '</span><span class="unit">/桌</span><span> 起</span></div></div></div></div>'
                + '<div class="address"><mip-img class="address-icon" width="9" height="12"'
                + 'src="http://qnm.hunliji.com/o_1c5i0e15a1qup1dhk18jrc5dqs7.png">'
                + '</mip-img><p class="address-detail">'
                + list[i]['address']
                + '</p></div></div></a>';

            html += itemHtml;
        }

        html += '</div>';

        $(element).find('.panel').html(html);
    }

    function initPackage(element, list) {
        var html = '';
        var packageUrl = element.dataset.packageUrl;

        for (var i = 0; i < list.length; i++) {
            var itemHtml = '<a href=' + packageUrl + list[i].id
                + ' mip-link><div class="item">'
                + '<mip-img layout="responsive" class="header-img" src="' + list[i]['cover_path']
                + '?imageView2/1/w/686/h/428"></mip-img>'
                + '<h3>' +  list[i]['title'] + '</h3>'
                + '<div class="comment">';

            if (list[i]['merchant']['comments_count'] !== 0) {
                for (var star = 0; star < 5; star++) {
                    itemHtml += '<mip-img width="11" height="11" src="http://qnm.hunliji.com/o_1clilv2gg1mqv11f11cp31og11h947.png"></mip-img>';
                }
            } else {
                itemHtml += '<span>暂无评价</span>';
            }

            itemHtml += '</div>';
            itemHtml += '<div class="desc"><a>';
            itemHtml += list[i]['merchant']['name'];
            itemHtml += '</a>';
            itemHtml += '<div class="price"><span class="unit">￥</span>';
            itemHtml += list[i]['show_price'];
            itemHtml += '</div></div></div></a>';

            html += itemHtml;
        }

        $(element).find('.panel').html(html);
    }

    return customElement;
});
