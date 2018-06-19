/**
 * @file mip-zmall-bmap 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var mustache = require('mip-mustache/mustache');

    window.HOST_TYPE = 2;

    // 载入百度地图API
    function initBaiduMapScript(ele, callback) {
        var akAttr = ele.getAttribute('data-ak');
        var ak = akAttr ? akAttr : 'N5KBzk1oUZc92TCC0lzwlcv1wOEwsYIO';
        var scriptElement = document.createElement('script');
        scriptElement.onload = scriptElement.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                ele.mapScriptLoaded = true;
                if (typeof callback === 'function') {
                    callback();
                }
                if (scriptElement.parentNode) {
                    scriptElement.parentNode.removeChild(scriptElement);
                }
                scriptElement.onload = scriptElement.onreadystatechange = null;
            }
        };
        // 使用Lite版
        scriptElement.src = '//api.map.baidu.com/getscript?v=3.0&ak=' + ak;
        // 往组件里插入百度地图API
        ele.appendChild(scriptElement);
    }

    /**
     * 地图类
     *
     * @class
     * @param {HTMLElement} element mip元素
     */
    function MyBaiduMap(element) {
        this.element = element;
    }

    MyBaiduMap.prototype.init = function (callback) {
        var element = this.element;
        var self = this;
        initBaiduMapScript(element, function () {
            self.BMap = window.BMap;
            self.BMAP_STATUS_SUCCESS = window.BMAP_STATUS_SUCCESS;
            self.Geolocation = new window.BMap.Geolocation();
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    MyBaiduMap.prototype.setMap = function (element) {
        var x = element.dataset.lng;
        var y = element.dataset.lat;
        if (!x || x === '' || !y || y === '') {
            return;
        }
        // 经纬度
        this.x = parseFloat(x);
        this.y = parseFloat(y);

        // 缩放级别
        var zoom = element.dataset.zoom;
        this.zoom = (zoom && zoom !== '') ? parseInt(zoom, 10) : 14;
        // 创建地图容器
        var mapContainer = document.createElement('div');
        var mapContainerId = 'js_map_container' + (+new Date());
        mapContainer.id = mapContainerId;
        mapContainer.className = 'zmall-map-container zmall-bmap';
        element.appendChild(mapContainer);

        // 创建地图
        var map = new window.BMap.Map(mapContainerId);
        var point = new window.BMap.Point(this.x, this.y);
        map.centerAndZoom(point, this.zoom);

        var iconUrl = '//icon.zol-img.com.cn/newshop/mip/map-marker.png';
        var icon = new window.BMap.Icon(iconUrl, new window.BMap.Size(20, 25), {
            anchor: new window.BMap.Size(10, 25)
        });
        var marker = new window.BMap.Marker(point, {
            icon: icon
        });
        map.addOverlay(marker);
        map.disableDoubleClickZoom();
        map.disableDragging();
        map.disableInertialDragging();
        map.disablePinchToZoom();

        mapContainer.classList.add('zmall-bmap-container');
        element.classList.add('map-loaded');

        this.map = map;
    };

    // 计算距离
    MyBaiduMap.prototype.setDistance = function (element) {
        var self = this;
        // 判断支持性
        if (!navigator.geolocation) {
            return;
        }

        var lat = element.dataset.lat;
        var lng = element.dataset.lng;
        var targetPoint = new this.BMap.Point(lng, lat);

        if (!self.map) {
            self.setMap(element);
            var mapContainer = element.querySelector('.zmall-bmap-container');
            mapContainer && element.removeChild(mapContainer);
        }

        self.Geolocation.getCurrentPosition(function (PositionOptions) {
            if (this.getStatus() === self.BMAP_STATUS_SUCCESS) {
                // 用户坐标
                var userLng = PositionOptions.longitude;
                var userLat = PositionOptions.latitude;
                var userPoint = new self.BMap.Point(userLng, userLat);
                self.point = userPoint;
                // 商家坐标
                var distance = self.map.getDistance(targetPoint, userPoint);
                self.distanceRender(element, {distance: distance});
            }
        }, {
            enableHighAccuracy: true
        });
    };

    MyBaiduMap.prototype.getUserPoint = function (callback) {
        if (this.point) {
            callback(this.point);
        }
        else {
            var self = this;
            self.Geolocation.getCurrentPosition(function (PositionOptions) {
                if (this.getStatus() === self.BMAP_STATUS_SUCCESS) {
                    // 用户坐标
                    var userLng = PositionOptions.longitude;
                    var userLat = PositionOptions.latitude;
                    var userPoint = new self.BMap.Point(userLng, userLat);
                    self.point = userPoint;
                    callback(userPoint);
                }
            }, {
                enableHighAccuracy: true
            });
        }
    };

    // 格式化距离
    MyBaiduMap.prototype.distanceFormat = function (distance, english) {
        distance = Math.ceil(distance);
        var str = '';
        var kmSuffix = english ? 'km' : '千米';
        var mSuffix = english ? 'm' : '米';
        if (distance > 1000) {
            str = (distance / 1000).toFixed(1) + kmSuffix;
        }
        else {
            str = distance + mSuffix;
        }
        return str;
    };

    // 渲染distance
    MyBaiduMap.prototype.distanceRender = function (element, data) {
        var address = element.dataset.address;
        var isEnglish = !!element.dataset.english;
        data.address = address;

        data.distance = this.distanceFormat(data.distance, isEnglish);
        var template = [
            '<div class="zmall-bmap-distance">',
            '<p>{{address}}</p>',
            '<span>距您约{{distance}}</span>',
            '</div>'
        ].join('');

        var templateElement = element.querySelector('template[type="mip-mustache"]');
        if (templateElement) {
            template = templateElement.innerHTML.trim();
        }

        var html = mustache.render(template, data);
        element.innerHTML = html;
        element.classList.add('map-distance-loaded');

        var distanceElement = element.querySelector('.zmall-bmap-distance');
        setTimeout(function () {
            distanceElement && distanceElement.classList.add('visible');
        }, 50);
    };

    // 地图跳转
    MyBaiduMap.prototype.setGPSLink = function (element) {

        var gps = element.dataset.gps;
        var isGPSLink = gps === 'true';
        if (!isGPSLink) {
            return;
        }

        var x = element.dataset.lng;
        var y = element.dataset.lat;
        if (!x || x === '' || !y || y === '') {
            return;
        }
        // 经纬度
        x = parseFloat(x);
        y = parseFloat(y);

        var link = element.getAttribute('data-link');
        var address = element.getAttribute('data-address');
        var title = element.getAttribute('data-title');

        if (link === '' || link === null) {
            link = '//api.map.baidu.com/marker?location='
                 + y + ',' + x
                 + '&title=' + title
                 + '&content=' + address
                 + '&output=html&autoOpen=true/vt=map';
        }

        element.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            window.top.location.href = link;
        });
    };

    MyBaiduMap.prototype.timer = function (element, func) {
        if (element.mapScriptLoaded) {
            func();
            return;
        }
        setTimeout(function () {
            MyBaiduMap.prototype.timer(element, func);
        }, 100);
    };

    /**
     * 业务里边有多个区块需要使用百度地图，所以通过此组件来提供百度地图API的使用
     * 因此，需要build的时候就把百度地图javascript API 载入
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var map = new MyBaiduMap(element);
        map.init();
        // 自定义事件给DOM来触发
        self.addEventAction('map', function (e) {
            map.timer(element, function () {
                map.setMap(e.element);
            });
        });

        self.addEventAction('distance', function (e) {
            map.timer(element, function () {
                map.setDistance(e.element);
            });
        });

        self.addEventAction('gps', function (e) {
            map.setGPSLink(e.element);
        });

        self.addEventAction('point', function (e) {
            map.timer(element, function () {
                map.getUserPoint(function (point) {
                    e.element.setAttribute('lat', point.lat);
                    e.element.setAttribute('lng', point.lng);
                });
            });
        });
    };

    return customElement;
});
