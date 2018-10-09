/**
 * @file mip-258-map 组件
 * @author hongzequan
 * @mail hongzequan@258.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var MAPURL = 'https://api.map.baidu.com/api?';
    var TYPE = 'script[type="application/json"]';

    /**
     * 地图类
     *
     * @class
     * @param {HTMLElement} element 地图组件元素
     * @param {Object} config 地图参数
     */
    function BaiduMap(element, config) {
        this.config = config;
        this.ele = element;
    }

    /**
     * 展现地图逻辑入口
     *
     */
    BaiduMap.prototype.show = function () {
        this.init();
        this.append();
    };

    /**
     * 初始化地图请求 URL
     *
     */
    BaiduMap.prototype.init = function () {
        var cf = this.config;
        var pArray = [];
        var pObj = {
            v: cf.version || '2.0',
            ak: cf.ak || '',
            t: new Date().getTime(),
            callback: this.getCb()
        };
        for (var key in pObj) {
            if (pObj.hasOwnProperty(key)) {
                pArray.push(key.concat('=', pObj[key]));
            }
        }
        this.mapUrl = MAPURL + pArray.join('&');
    };

    /**
     * 绑定全局 callback 函数，并返回回调名称
     *
     * @return {string} 回调名称
     */
    BaiduMap.prototype.getCb = function () {
        window.mapCallback = this.handleResult.bind(this);
        return 'mapCallback';
    };

    /**
     * 处理请求返回后的结果，之后扩展逻辑均在该方法中实现
     *
     */
    BaiduMap.prototype.handleResult = function () {
        /* global BMap */
        var cfg = this.config;
        var point = new BMap.Point(cfg.location.lng, cfg.location.lat);
        this.map = new BMap.Map(this.ele);
        this.map.centerAndZoom(point, cfg.location.zoom);
        this.map.enableScrollWheelZoom();
        this.map.enableContinuousZoom();
        this.map.addControl(new BMap.NavigationControl());
        this.map.addControl(new BMap.OverviewMapControl());
        var marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
        var infoWindow = new BMap.InfoWindow('<div>' + cfg.marker.address + '</div>');
        marker.addEventListener('click', function () {
            this.openInfoWindow(infoWindow);
        });
        marker.setAnimation('BMAP_ANIMATION_BOUNCE');
    };

    /**
     * 将地图脚本插入到页面中
     *
     */
    BaiduMap.prototype.append = function () {
        if (!this.config.ak) {
            console.error('请配置服务密钥（ak）');
            return;
        }
        var ele = document.createElement('script');
        ele.src = this.mapUrl;
        document.body.appendChild(ele);
    };

    /**
     * JSON 解析，如果出错则在浏览器中进行提示
     *
     * @param {Object} json 地图参数回调还名称
     * @return {Object|boolean}  解析成功返回 JSON 数据，否则返回 false
     */
    customElement.prototype.jsonParse = function (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            return false;
        }
    };

    /**
     * 首次进入页面之后加载地图组件
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element.querySelector(TYPE);
        var cfg = this.jsonParse(ele.textContent);
        cfg && new BaiduMap(this.element, cfg).show();
    };

    return customElement;
});
