/**
 * @file mip-zol-distance
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    // 获取距离
    function getDistance(element) {
        var api = element.getAttribute('url');
        var lat = element.getAttribute('lat') || 0;
        var lng = element.getAttribute('lng') || 0;
        var targetLat = element.getAttribute('mlat') || 0;
        var targetLng = element.getAttribute('mlng') || 0;

        var url = api + '&lat=' + lat + '&lng=' + lng + '&mlat=' + targetLat + '&mlng=' + targetLng;

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            if (!res.status) {
                var distance = '';
                if (res.distance >= 1000) {
                    distance = (res.distance / 1000).toFixed(2) + 'km';
                }
                else {
                    distance = res.distance + 'm';
                }
                window.MIP.setData({
                    userPickDistance: distance
                });
                element.distanceLoaded = true;
            }
        });
    }

    function getCurrentDate(seperator) {
        // 获取当前日期
        var date = new Date();
        // 获取当前月份
        var nowMonth = date.getMonth() + 1;
        // 获取当前是几号
        var strDate = date.getDate();
        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = '0' + nowMonth;
        }
        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        window.MIP.setData({
            userPickDate: nowDate
        });
    }

    customElement.prototype.firstInviewCallback = function () {

        // 改变收货地址，需重新计算距离
        // 自定义事件给DOM来触发
        this.addEventAction('distance', function () {
            if (this.element.distanceLoaded) {
                return;
            }
            getDistance(this.element);
            getCurrentDate('-');
        });

    };

    // 自定义修改运费的方法给别的组件来调用
    customElement.prototype.distance = function () {
        getDistance(this.element);
        getCurrentDate('-');
    };

    customElement.prototype.hasResources = function () {
        return true;
    };

    return customElement;

});
