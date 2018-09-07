/**
 * @file mip-otto-subclass 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;

        var addMore = element.querySelector('#addMore');
        addMore.addEventListener(
            'click', function () {
                var data = this.dataset;
                var that = this;
                var page = 1;
                var ul = element.querySelector('.curseList_list');
                var baseurl = (/wangxiao\.cn/g.test(location.host)) ? '' : 'http://dev.com:8004/wap2';
                var args = 'classid=' + data.cid
                    + '&subjectid=' + data.subjectid
                    + '&areaid=' + data.areaid
                    + '&page=' + (page + 1);

                fetch(baseurl + '/MipNewsClass/SubClassAjaxList?' + args).then(function (res) {
                    return res.text();
                }).then(function (res) {
                    ul.insertAdjacentHTML('beforeend', res);
                });
            },
            false
        );

        if (element.querySelector('.curseList_loc')) {
            var getCity = (function () {
                var cities = [
                    '北京',
                    '天津',
                    '上海',
                    '重庆',
                    '河北',
                    '山西',
                    '内蒙古',
                    '黑龙江',
                    '吉林',
                    '辽宁',
                    '江苏',
                    '浙江',
                    '安徽',
                    '福建',
                    '江西',
                    '山东',
                    '河南',
                    '湖南',
                    '湖北',
                    '广东',
                    '海南',
                    '四川',
                    '云南',
                    '贵州',
                    '广西',
                    '陕西',
                    '甘肃',
                    '宁夏',
                    '青海',
                    '西藏',
                    '新疆',
                    '全国'
                ];
                var patt = new RegExp(/_(\d+)\.html$/i);
                var index = patt.exec(location.pathname);
                var currentCity = '全国';
                if (index) {
                    currentCity = cities[Number(index[1]) - 1] || '全国';
                }

                return currentCity;
            })();
            element.querySelector('.curseList_loc_lf').innerText = getCity;
            element.querySelector('.curseList__toggleBtn').addEventListener(
                'click', function () {
                    this.nextElementSibling.classList.toggle('flex');
                },
                false
            );
        }

    };

    return customElement;
});
