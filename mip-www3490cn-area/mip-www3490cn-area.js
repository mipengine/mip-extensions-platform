/**
 * @file mip-www3490cn-area 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    // 引入需要数据
    var pvcList = require('./data/data');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var pvcTag = ele.querySelector('#pvc');
        var cityTag = ele.querySelector('#city');
        var pvcArray = [];
        var cityArray = [];
        for (var i = 0; i < pvcList.length; i++) {
            var pvc = pvcList[i];
            var cityList = pvc.cityList;
            for (var s = 0; s < cityList.length; s++) {
                var city = cityList[s];
                var cityName = city.name;
                cityArray[s] = cityName;
                cityTag.add(new Option(cityName, cityName));
            }
            var pvcName = pvc.name;
            pvcArray[i] = pvcName;
            pvcTag.add(new Option(pvcName, pvcName));
        }

        pvcTag.onchange = function () {
            var index = pvcTag.selectedIndex;  // 选中文本
            var pvcName = pvcArray[index];
            for (var n = 0; n < pvcList.length; n++) {
                var provice = pvcList[n];
                if (provice.name === pvcName) {
                    cityList = provice.cityList;
                    cityTag.innerHTML = '';
                    for (var c = 0; c < cityList.length; c++) {
                        var city = cityList[c];
                        var cityName = city.name;
                        cityArray[c] = cityName;
                        cityTag.add(new Option(cityName, cityName));
                    }
                }
            }
        };
    };

    return customElement;

});