/**
 * @file mip-tiebaobei-weather 天气预报组件
 * @author weiss
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var urlHost = window.location.host;
        var baseUrl = '';
        var ele = $(this.element);
        var apiUrl = '';
        if (urlHost === 'm.tiebaobei.com' || (urlHost === 'h5.tiebaobei.com')) {
            baseUrl = 'https://m.tiebaobei.com/';
            apiUrl = 'https://api2.tiebaobei.com/';
        }
        else if (urlHost === 'm.test.tiebaobei.com' || (urlHost === 'h5.test.tiebaobei.com')) {
            baseUrl = 'http://m.test.tiebaobei.com/';
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        else {
            baseUrl = 'http://m.test.tiebaobei.com/';
            apiUrl = 'http://api2.test.tiebaobei.com/';
        }
        var fetchJsonp = require('fetch-jsonp');
        ele.find('.searchbg').click(function () {
            window.top.location.href = baseUrl + 'html/ueSearch.html';
        });
        // 消息点击事件
        ele.find('.search-mess').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var href = $(this).attr('href');
            window.top.location.href = href;
        });
        // 天气点击事件
        ele.find('.search-weather').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var href = $(this).attr('href');
            window.top.location.href = href;
        });
        // 地理定位埋点
        fetchJsonp(apiUrl + 'api/app/getAreaByIP', {
            jsonpCallback: 'callback'
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            // console.log(result)
            var province = '北京';
            var city = '北京市';
            if (result.ret !== 0) {
            }
            else {
                province = result.result.provinceName;
                city = result.result.cityName;
            }
            var weatherUrl = '//wis.qq.com/weather/common?source=pc&weather_type=observe%7Crise&province=';
            weatherUrl += province + '&city=' + city;
            fetchJsonp(weatherUrl, {
                jsonpCallback: 'callback'
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                // console.log(result)
                if (result.message === 'OK') {
                    var date = new Date();
                    var d = parseInt(result.data.rise[0].sunrise.split(':')[0], 10);
                    var n = parseInt(result.data.rise[0].sunset.split(':')[0], 10);
                    var w = 'day';
                    var h = parseInt(date.getHours(), 10);
                    if (h >= n || (h < d)) {
                        w = 'night';
                    }
                    var aurl = '<mip-img src="//mat1.gtimg.com/pingjs/ext2020/weather/mobile2.0/assets/weather/';
                    aurl += w + '/' + result.data.observe.weather_code + '.svg"></mip-img>';
                    ele.find('.search-weather').html(aurl + result.data.observe.degree + '°C');
                }
                else {
                    ele.find('.search-weather').remove();
                }
            }).catch(function (ex) {
               // console.log('parsing failed', ex);
            });
        }).catch(function (ex) {
           // console.log('parsing failed', ex);
        });
    };
    return customElement;
});
