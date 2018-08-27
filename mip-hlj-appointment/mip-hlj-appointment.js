/**
 * @file mip-hlj-appointment 预约组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');

    function showTip(element, text) {
        $(element).find('.tip').text(text);
        $(element).find('.tip').show();

        setTimeout(function () {
            $(element).find('.tip').hide();
        }, 2000);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.dataset.api;

        $(element).find('#submit').on('click', function (e) {
            e.preventDefault();

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

            var link = url;

            var cityList = cityes.split(',');
            if (cityList.length === 1) {
                link += ('/city_' + cityList[0]);
            } else {
                link += ('/city_' + cityList[1]);
            }

            link += ('/property_' + propertyId);

            var priceList = priceRange.split('-');
            link += ('/min_price_' + priceList[0]);
            link += ('/max_price_' + priceList[1]);
            link += ('/phone_' + phone);

            window.top.location.href = link;
        });
    };

    return customElement;
});
