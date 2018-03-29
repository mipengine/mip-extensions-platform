/**
 * @file mip-zmall-yunfei 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    // 获取运费
    function getFreight(element) {
        var api = element.getAttribute('api');
        var data = element.dataset;

        var freightId = data.yfid || 0;
        var cityId = data.cityid || 0;
        var provinceId = data.provinceid || 0;

        // 到店自提不需要运费
        var delivery = data.delivery || 1;

        var url = api + '&freightId=' + freightId + '&number=' + data.num
                + '&provinceId=' + provinceId + '&cityId=' + cityId + '&delivery=' + delivery
                + '&merchantId=' + data.mid + '&goodsId=' + data.goodsid;

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            window.MIP.setData({
                yunfei: res
            });
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        var self = this;

        // 加载页面获取运费
        getFreight(self.element);

        // 增加购买数量，改变收货地址，需重新计算运费
        // 自定义事件给DOM来触发
        self.addEventAction('changeFreight', function () {
            getFreight(self.element);
        });

    };

    // 自定义修改运费的方法给别的组件来调用
    customElement.prototype.changeFreight = function () {
        getFreight(this.element);
    };

    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        if (attributeName === 'data-yfid' || attributeName === 'data-delivery') {
            if (oldValue !== newValue && newValue > 0) {
                var element = this.element;
                setTimeout(function () {
                    getFreight(element);
                }, 1);
            }
        }
    };

    customElement.prototype.hasResources = function () {
        return true;
    };

    return customElement;

});
