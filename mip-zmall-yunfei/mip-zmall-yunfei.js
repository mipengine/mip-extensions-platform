/**
 * @file mip-zmall-yunfei 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    var util = require('util');

    // 获取运费
    function getFreight(element, data) {
        var type = element.getAttribute('type');
        var api = element.getAttribute('api');
        data = util.fn.extend(element.dataset, data, {});
        if (data.num && data.num !== '' && data.yfgoodsid) {
            data.yfgoodsid = data.yfgoodsid.replace(/_\d+$/, '_' + data.num);
        }

        var freightId = data.yfid || 0;
        var cityId = data.cityid || 0;
        var provinceId = data.provinceid || 0;

        // 到店自提不需要运费
        var delivery = parseInt(data.delivery, 10) || 2;
        var payment = parseInt(data.payment, 10) || 2;

        var url = api + '&freightId=' + freightId + '&number=' + data.num
                + '&provinceId=' + provinceId + '&cityId=' + cityId + '&delivery=' + delivery
                + '&merchantId=' + data.mid + '&goodsId=' + data.goodsid;
        if (type && type === 'YK') {
            if (!cityId || !provinceId || delivery === 1 || payment === 1) {
                window.MIP.setData({
                    yunfei: {price: 0}
                });
                return;
            }
            url = api + '&goodsIdStr=' + data.yfgoodsid + '&provinceId=' + provinceId
                + '&cityId=' + cityId + '&merchantId=' + data.mid;
        }

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            var freightPrice = res;
            if (type && type === 'YK') {
                freightPrice = {
                    price: !res.status ? res.allFreightPrice : 0
                };
            }
            window.MIP.setData({
                yunfei: freightPrice
            });
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;

        // 增加购买数量，改变收货地址，需重新计算运费
        // 自定义事件给DOM来触发
        this.addEventAction('changeFreight', function (e) {
            var data = e.target.dataset;
            getFreight(element, data);
        });

    };

    // 自定义修改运费的方法给别的组件来调用
    customElement.prototype.changeFreight = function () {
        getFreight(this.element);
    };

    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        var element = this.element;
        var type = element.getAttribute('type');
        var isAttr = attributeName === 'data-yfid'
                     || attributeName === 'data-delivery'
                     || attributeName === 'data-cityid';
        if (type && type === 'YK') {
            isAttr = attributeName === 'data-yfgoodsid' || attributeName === 'data-cityid';
        }
        if (isAttr && oldValue !== newValue && newValue > 0) {
            setTimeout(function () {
                getFreight(element);
            }, 1);
        }
    };

    customElement.prototype.hasResources = function () {
        return true;
    };

    return customElement;

});
