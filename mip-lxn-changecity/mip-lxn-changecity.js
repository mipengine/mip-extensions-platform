/**
 * @file mip-lxn-changecity 组件
 * @author lxnauther@lanxiniu.com
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    // var util = require('util');
    var customElement = require('customElement').create();
    setHtmlRem();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        // 显示当前城市
        var currentCity = ele.querySelector('#current-city');
        // 显示城市列表
        var cityList = ele.querySelector('#citylist');
        console.log(cityList);
        // 获取默认城市
        var city = localStorage.getItem('focuscity');
        // 获取默认城市列表
        var openCitys = JSON.parse(localStorage.getItem('open_citys'));
        var lis = '';
        currentCity.innerHTML = city;
        openCitys.forEach(function (item) {
            lis += '<li class="city-li">' + item + '</li>';
        });
        cityList.innerHTML = lis;

        // var util = require('util');

        // var undelegate = util.event.delegate(cityList, cityList.querySelectorAll('.city-li'), 'click', function(){
        //     console.log('点击');
        // });
        // undelegate();

        $(cityList).on('click', 'li', function () {
            var currents = $(this).text();
            localStorage.setItem('focuscity', currents);
            window.top.location.href = 'order';
        });

    };

    function setHtmlRem() {
        var b = document;
        var a = {};
        a.Html = b.getElementsByTagName('html')[0];
        a.widthProportion = function () {
            var c = (b.body && b.body.clientWidth || a.Html.offsetWidth) / 750;
            return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
        };
        a.changePage = function () {
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + 'px!important;height:auto');
        };

        a.changePage();
        setInterval(a.changePage, 1000);
    }

    return customElement;
});
