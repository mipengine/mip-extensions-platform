/**
 * @file mip-zmall-bmap 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var mustache = require('mip-mustache/mustache');
    var viewer = require('viewer');

    window.HOST_TYPE = 2;

    // 载入百度地图API
    function initBaiduMapScript(ele, callback) {
        var akAttr = ele.getAttribute('data-ak');
        var ak = akAttr ? akAttr : 'N5KBzk1oUZc92TCC0lzwlcv1wOEwsYIO';
        var scriptElement = document.createElement('script');
        scriptElement.onload = scriptElement.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
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

        if (window.BMap) {
            this.init();
        }
        else {
            var self = this;
            initBaiduMapScript(element, function () {
                self.init();
            });
        }
    }

    MyBaiduMap.prototype.init = function () {

        var element = this.element;
        this.linkGPS();
        // 类型
        var type = this.element.dataset.type;

        if (type === 'gps') {
            return;
        }

        // 创建地图容器
        var mapContainer = document.createElement('div');
        var mapContainerId = 'js_map_container';
        mapContainer.id = mapContainerId;
        mapContainer.className = 'zmall-bmap';
        element.appendChild(mapContainer);
        // 创建地图
        var map = new window.BMap.Map(mapContainerId);
        this.point = new window.BMap.Point(this.x, this.y);
        map.centerAndZoom(this.point, this.zoom);

        var iconUrl = '//icon.zol-img.com.cn/newshop/mip/map-marker.png';
        var icon = new window.BMap.Icon(iconUrl, new window.BMap.Size(20, 25), {
            anchor: new window.BMap.Size(10, 25)
        });
        var marker = new window.BMap.Marker(this.point, {
            icon: icon
        });
        map.addOverlay(marker);
        map.disableDoubleClickZoom();
        map.disableDragging();
        map.disableInertialDragging();
        map.disablePinchToZoom();
        this.map = map;

        if (type === 'map') {
            mapContainer.classList.add('zmall-bmap-container');
            element.classList.add('map-loaded');
        }
        else if (type === 'distance') {
            element.removeChild(mapContainer);
            this.setDistance();
        }
    };

    // 计算距离
    MyBaiduMap.prototype.setDistance = function () {
        var self = this;
        // 判断支持性
        if (!navigator.geolocation) {
            return;
        }
        var geolocation = new window.BMap.Geolocation();

        geolocation.getCurrentPosition(function (PositionOptions) {
            if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                // 用户坐标
                var userLng = PositionOptions.longitude;
                var userLat = PositionOptions.latitude;
                var usePoint = new window.BMap.Point(userLng, userLat);
                // 商家坐标
                var distance = self.map.getDistance(self.point, usePoint);
                self.distanceRender({distance: distance});
            }
        }, {
            enableHighAccuracy: true
        });
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
    MyBaiduMap.prototype.distanceRender = function (data) {
        var element = this.element;
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
    MyBaiduMap.prototype.linkGPS = function () {

        var gps = this.element.dataset.gps;
        var isGPSLink = gps === 'true';

        if (!isGPSLink) {
            return;
        }

        var link = this.element.getAttribute('data-link');
        var address = this.element.getAttribute('data-address');
        var title = this.element.getAttribute('data-title');

        if (link === '' || link === null) {
            link = '//api.map.baidu.com/marker?location='
                 + this.y + ',' + this.x
                 + '&title=' + title
                 + '&content=' + address
                 + '&output=html&autoOpen=true/vt=map';
        }

        this.element.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            window.top.location.href = link;
        });
    };

    /**
     * 组件触发本身的事件
     *
     * @param {string} eventStr 事件串
     */
    customElement.prototype.eventExcute = function (eventStr) {
        var element = this.element;
        var lat = element.dataset.lat;
        var lng = element.dataset.lng;
        var isEmptyLatAndLng = !lat || lat === '' || !lng || lng === '';

        // 触发组件本身的事件
        if (eventStr.indexOf('loaded:') > -1) {
            viewer.eventAction.execute('loaded', element, {element: element});
        }
        if (eventStr.indexOf('distance:') > -1 && !isEmptyLatAndLng) {
            viewer.eventAction.execute('distance', element, {element: element});
        }
        if (eventStr.indexOf('link:') > -1) {
            viewer.eventAction.execute('link', element, {element: element});
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var onAttr = element.getAttribute('on');
        if (onAttr && onAttr !== '') {
            this.eventExcute(onAttr);
        }
        else {
            // 等后续页面缓存更新后移除
            new MyBaiduMap(element);
        }
    };

    /**
     * 属性发生变化时, 因为有的时候需要用 mip-bind 来绑定属性
     *
     * @param {string} attributeName 属性名
     * @param {string} oldValue 旧值
     * @param {string} newValue 新值
     */
    customElement.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue) {
        var element = this.element;
        var onAttr = element.getAttribute('on');
        var lat = element.getAttribute('data-lat');
        var lng = element.getAttribute('data-lng');
        // 经纬度都发生变化的时候才执行
        if (attributeName === 'data-lng' && newValue && oldValue !== newValue) {
            element.changed = (lat && lat !== '');
        }
        if (attributeName === 'data-lat' && newValue && oldValue !== newValue) {
            element.changed = (lng && lng !== '');
        }

        if ((attributeName === 'data-lng' || attributeName === 'data-lat') && element.changed) {
            if (onAttr && onAttr !== '') {
                var self = this;
                setTimeout(function () {
                    self.eventExcute(onAttr);
                }, 0);
            }
            else {
                // 等后续页面缓存更新后移除
                new MyBaiduMap(element);
            }
        }
    };

    return customElement;
});
