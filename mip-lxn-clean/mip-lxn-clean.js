/**
 * @file mip-lxn-clean 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    // 支付成功清除本地缓存的数据
    function cleacLs(key) {
        localStorage.removeItem(key);
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        // 车型
        cleacLs('cartype');
        // 距离
        cleacLs('distance');
        // 当前城市
        cleacLs('focuscity');
        // 搬入搬出楼层
        cleacLs('move');
        // 搬家数据
        cleacLs('moveAddress');
        // 搬家时间

        cleacLs('move_time');
        cleacLs('move_time_formate');
        // 开放城市
        cleacLs('open_citys');
        // 订单信息
        cleacLs('orderMsg');

        var goBack = ele.querySelector('#back-order');
        goBack.addEventListener('click', function () {
            window.top.location.href = 'order.html';
        }, false);
    };

    return customElement;
});
