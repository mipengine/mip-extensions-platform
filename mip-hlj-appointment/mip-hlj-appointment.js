/**
 * @file mip-hlj-appointment 预约组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');
    var viewer = require('viewer');
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);

    function showTip(element, text) {
        $(element).find('.tip-msg-info').text(text);
        $(element).find('.tip-msg-info').show();

        setTimeout(function () {
            $(element).find('.tip-msg-info').hide();
        }, 2000);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var api = element.dataset.api;
        var url = element.dataset.url;

        $(element).find('#submit').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var info = JSON.parse($(element).attr('info'));

            if (!info.sessionId) {
                viewer.eventAction.execute('tap', e.target, e);
                return;
            }

            var cityes = $(element).find('#city_code').val();

            if (!cityes) {
                showTip(element, '城市必选');
                return;
            }

            var propertyId = $(element).find('#property_id').val();
            if (!propertyId) {
                showTip(element, '婚礼服务必选');
                return;
            }

            var priceRange = $(element).find('#price_range').val();
            if (!priceRange) {
                showTip(element, '价格区间必选');
                return;
            }

            var phone = $(element).find('#phone').val();
            if (!phone) {
                showTip(element, '手机号必填');
                return;
            } else if (!/^0?(13[0-9]|15[0-9]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(phone)) {
                showTip(element, '请输入正确格式的手机号');
                return;
            }
            var body = {};

            var cityList = cityes.split(',');
            if (cityList.length === 1) {
                body['city_code'] = cityList[0];
            } else {
                body['city_code'] = cityList[1];
            }

            var priceList = priceRange.split('-');

            body['property_id'] = propertyId;
            body['min_price'] = priceList[0];
            body['max_price'] = priceList[1];
            body['phone'] = phone;
            body['sessionId'] = info.sessionId;

            $.ajax({
                url: api,
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                data: body,
                success: function (result) {
                    if (result.status.RetCode === 0) {
                        storage.set('recommend_id', result.data.id);
                        window.MIP.viewer.open(url, {isMipLink: true});
                    }
                }
            });
        });
    };

    return customElement;
});
