/**
 * @file mip-hunliji-packageScreen 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var index = '';
        var typeclass;
        var moren = '';
        var category = $(element).find('#typeclick li').eq(0).attr('data-list');
        var region = $(element).find('#typeclick li').eq(1).attr('data-list');
        var sort = $(element).find('#typeclick li').eq(2).attr('data-list');
        var price = $(element).find('#typeclick li').eq(3).attr('data-list');
        /**
         * 筛选条件打开事件
         */
        $(element).on('click', '#typeclick li', function () {
            index = $(this).index();
            typeclass = $(this).attr('data-type');
            if ($(this).hasClass('on')) {
                $(element).find('#typeclick li').removeClass('on');
                $(element).find('#package_screen_content dl').hide();
            } else {
                $(element).find('#typeclick li').removeClass('on');
                $(this).addClass('on');
                $(element).find('#package_screen_content dl').hide();
                $(element).find('#package_screen_content .' + typeclass).show();
            }
        });
        /**
         * 价格筛选清除价格
         */
        $(element).on('click', '#btn_clear', function () {
            $(element).find('#ip1').val('');
            $(element).find('#ip2').val('');
        });
        /**
         * 选择类别事件
         */
        $(element).on('click', '#package_screen_content dd', function () {
            var thisIndex = $(this).parent().index();
            moren = $(this).attr('data-list');
            $(element).find('#typeclick li').eq(thisIndex).attr('data-list', moren);
            $(element).find('#package_screen_content dl').eq(index).hide();
            category = $(element).find('#typeclick li').eq(0).attr('data-list');
            region = $(element).find('#typeclick li').eq(1).attr('data-list');
            sort = $(element).find('#typeclick li').eq(2).attr('data-list');
            location.href = location.origin + '/baidu/package/list_' + category
            + '?page=1&shop_area_id=' + region + '&sort=' + sort + '&actual_price=' + price;
        });
        /**
         * 价格筛选确定事件
         */
        $(element).on('click', '#btn_submit', function () {
            var minActualPrice = $(element).find('#ip1').val();
            var maxActualPrice = $(element).find('#ip2').val();
            price = minActualPrice + ',' + maxActualPrice;
            $(element).find('#typeclick li').eq(index).attr('data-list', price);
            $(element).find('#package_screen_content dl').eq(index).hide();
            location.href = location.origin + '/baidu/package/list_' + category
            + '?page=1&shop_area_id=' + region + '&sort=' + sort + '&actual_price=' + price;
        });
    };

    return customElement;
});
