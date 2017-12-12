/**
 * @file mip-jia-distance 组件
 * @author
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
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };


    /**
     * 处理请求返回后的结果，之后扩展逻辑均在该方法中实现
     *
     */
    BaiduMap.prototype.handleResult = function () {
        var selF = this;

        /* global BMap */
        this.map = new BMap.Map(this.ele);

        var datas = {
            cp: {
                lng: '',
                lat: ''
            },
            tp: {
                lng: '',
                lat: ''
            }
        };

        // 单位处理
        var unitNumber = 1;
        switch (this.config.unit)
        {
            case '十米':
                unitNumber = 10;
                break;
            case '百米':
                unitNumber = 100;
                break;
            case '千米':
                unitNumber = 1000;
                break;
            case '万米':
                unitNumber = 10000;
                break;
            default:
                unitNumber = 1;
        }

        // 返回距离并赋值给当前组件
        this.getCurPosition().then(function (cur) {
            datas.cp.lat = cur.point.lat;
            datas.cp.lng = cur.point.lng;

            selF.getTargetPosition().then(function (target) {
                datas.tp.lat = target.point.lat;
                datas.tp.lng = target.point.lng;

                var pointA = new BMap.Point(datas.cp.lng, datas.cp.lat);
                var pointB = new BMap.Point(datas.tp.lng, datas.tp.lat);
                var distance = (selF.map.getDistance(pointA, pointB) / unitNumber).toFixed(2);

                selF.ele.innerHTML = distance;
            });
        });
    };


    /**
     * 获取当前位置经纬度
     * @return {Object}  成功返回当前位置信息
     */
    BaiduMap.prototype.getCurPosition = function () {

        /* global BMap */
        var geolocation = new BMap.Geolocation();

        return new Promise(function (resolve, reject) {
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() === 0) {
                    return resolve(r);
                } else {
                    return reject(new Error(this.getStatus()));
                }
            }, {enableHighAccuracy: true});
        });
    };


    /**
     * 获取目标位置经纬度
     * @return {Object}  成功返回目标位置信息
     */
    BaiduMap.prototype.getTargetPosition = function () {
        var selF = this;

        /* global BMap */
        var localSearch = new BMap.LocalSearch(this.map);

        return new Promise(function (resolve, reject) {
            localSearch.setSearchCompleteCallback(function (res) {
                if (res) {
                    var poi = res.getPoi(0);
                    return resolve(poi);
                } else {
                    return reject(new Error(this.getStatus()));
                }
            });
            localSearch.search(selF.config.address);
        });
    };


    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element.querySelector(TYPE);
        var cfg = this.jsonParse(ele.textContent);
        cfg && new BaiduMap(this.element, cfg).show();
    };

    return customElement;
});
