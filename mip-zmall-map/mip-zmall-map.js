/**
 * @file mip-zol-map 组件
 * @author viewJY
 * @time 2017-11-17
 */

define(function (require) {

    var customElement = require('customElement').create();

    function initMap(ele) {

        var akAttr = ele.getAttribute('data-ak');
        var ak = akAttr ? akAttr : 'U8p2WjWVszzPyGzr1YaYgtxhjt1XIFk6';

        var headElement = document.getElementsByTagName('body')[0];
        var scriptElement = document.createElement('script');

        scriptElement.id = 'baiduMap';
        scriptElement.type = 'text/javascript';
        scriptElement.src = '//api.map.baidu.com/getscript?v=2.0&ak=' + ak;

        var scriptId = document.getElementById('baiduMap');

        if (scriptId) {
            return;
        }

        headElement.appendChild(scriptElement);
    }

    /**
     * ZMap 构造函数
     *
     * @param {Object} ele Node元素
     * @constructor
     */
    function ZMap(ele) {
        this.mapEle = ele;

        this.zmap = '';

        this.x = ele.dataset.lng ? ele.dataset.lng : '';

        this.y = ele.dataset.lat ? ele.dataset.lat : '';

        this.title = ele.dataset.title ? ele.dataset.title : '';

        this.zoom = ele.dataset.zoom || 18;
    }

    ZMap.prototype.map = function () {

        var id = this.mapEle.firstElementChild.id || 'z_map';

        if (this.x === '' || this.y === '') {
            return;
        }

        this.zmap = new window.BMap.Map(id);

        var point = new window.BMap.Point(this.x, this.y);

        this.zmap.centerAndZoom(point, this.zoom);

        this.zmap.disableDragging();

        var marker = new window.BMap.Marker(point);

        this.zmap.addOverlay(marker);
    };

    ZMap.prototype.distance = function () {
        var userLng = '';
        var userLat = '';

        var self = this;

        var countStr = '';

        var id = self.mapEle.firstElementChild.id || 'z_map';

        self.zmap = new window.BMap.Map(id);

        if (navigator.geolocation) {
            var geolocation = new window.BMap.Geolocation();

            geolocation.getCurrentPosition(function (PositionOptions) {
                if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
                    userLng = PositionOptions.longitude;
                    userLat = PositionOptions.latitude;

                    var point = new window.BMap.Point(self.x, self.y);

                    var usePoint = new window.BMap.Point(userLng, userLat);

                    var distances = self.zmap.getDistance(point, usePoint);

                    self.dis = calculate(distances);

                    self.createEle(self.dis);
                }
            }, {
                enableHighAccuracy: true
            });
        }
        else {
            self.zmap.addControl(new window.BMap.GeolocationControl());
        }

        function calculate(dis) {
            var count = parseInt(dis, 10);

            if (count > 1000) {
                countStr = (count / 1000).toFixed(1) + '千米';
            }
            else {
                countStr = count + '米';
            }

            return countStr;
        }
    };

    ZMap.prototype.createEle = function (text) {
        var type = this.mapEle.getAttribute('data-type');

        var address = this.mapEle.getAttribute('data-address');

        var dom = this.mapEle.firstElementChild;

        if (type === 'type_distance01') {
            dom.innerText = '距您现在位置约' + text;
        }
        else {
            dom.innerText = address + ' 距您约' + text;
        }
    };

    ZMap.prototype.skipLink = function () {
        var attr = this.mapEle.getAttribute('data-skip');

        if (attr === 'false') {
            return;
        }

        var link = this.mapEle.getAttribute('data-link');

        var address = this.mapEle.getAttribute('data-address');

        if (link === '' || link === null) {
            link = '//api.map.baidu.com/marker?location='
                 + this.y + ',' + this.x
                 + '&title=' + this.title
                 + '&content=' + address
                 + '&output=html&autoOpen=true/vt=map';
        }

        this.mapEle.addEventListener('click', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();

            window.location.href = link;
        });
    };

    customElement.prototype.build = function () {
        var self = this;

        var ele = self.element;

        var type = ele.getAttribute('data-type');

        initMap(ele);

        window.addEventListener('load', function () {
            var zMap = new ZMap(ele);

            ele.firstElementChild.classList.add('show');

            switch (type) {
                case 'map':
                    zMap.map();
                    zMap.skipLink();
                    break;
                case 'distance':
                case 'distance-fixed':
                    zMap.distance();
                    zMap.skipLink();
                    break;
                default:
                    break;
            }
        });
    };

    return customElement;
});
