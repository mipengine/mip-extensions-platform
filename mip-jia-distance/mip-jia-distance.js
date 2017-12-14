/**
 * @file mip-jia-distance 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var MAPURL = 'https://api.map.baidu.com/getscript?';
    var TYPE = 'script[type="application/json"]';
    var baiduMapApiLoaded = false;

    function jsonParse(json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

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
     * 初始化地图请求 URL
     *
     */
    BaiduMap.prototype.init = function () {
        var cf = this.config;
        var pArray = [];
        var pObj = {
            v: cf.version || '2.0',
            ak: cf.ak || '',
            t: new Date().getTime()
        };
        for (var key in pObj) {
            if (pObj.hasOwnProperty(key)) {
                pArray.push(key.concat('=', pObj[key]));
            }
        }
        this.mapUrl = MAPURL + pArray.join('&');
    };

    /**
     * 将地图脚本插入到页面中
     *
     */
    BaiduMap.prototype.append = function () {
        if (!baiduMapApiLoaded) {
            if (!this.config.ak) {
                console.error('请配置服务密钥（ak）');
                return;
            }
            var ele = document.createElement('script');
            ele.src = this.mapUrl;
            document.body.appendChild(ele);
            baiduMapApiLoaded = true;
        }
    };

    /**
     * 根据两点的经纬度计算出距离
     *
     */
    BaiduMap.prototype.distance = function () {
        var selF = this;

        /* global BMap */
        this.map = new window.BMap.Map(this.ele);

        var datas = {
            cp: {
                lng: '',
                lat: ''
            },
            tp: {
                lng: '',
                lat: ''
            },
            beforeText: this.config.beforeText || '',
            afterText: this.config.afterText || '',
            unit: 1
        };

        // 单位处理
        switch (this.config.unit)
        {
            case '十米':
                datas.unit = 10;
                break;
            case '百米':
                datas.unit = 100;
                break;
            case '千米':
                datas.unit = 1000;
                break;
            case '万米':
                datas.unit = 10000;
                break;
            default:
                datas.unit = 1;
        }

        // 返回距离并赋值给当前组件
        this.getCurPosition().then(function (cur) {
            if (cur && cur.point)
            {
                datas.cp.lat = cur.point.lat;
                datas.cp.lng = cur.point.lng;

                selF.getTargetPosition().then(function (target) {
                    if (target && target.point)
                    {
                        datas.tp.lat = target.point.lat;
                        datas.tp.lng = target.point.lng;

                        var pointA = new BMap.Point(datas.cp.lng, datas.cp.lat);
                        var pointB = new BMap.Point(datas.tp.lng, datas.tp.lat);
                        var distance = (selF.map.getDistance(pointA, pointB) / datas.unit).toFixed(2);

                        selF.ele.innerHTML = datas.beforeText + distance + datas.afterText;
                    }
                }, function () {
                    selF.ele.innerHTML = '无法获取目标位置信息';
                });
            }

        }, function () {
            selF.ele.innerHTML = '无法获取定位信息';
        });
    };


    /**
     * 根据目标位置的经纬度绘制地图
     *
     */
    BaiduMap.prototype.drawMap = function () {
        var selF = this;

        /* global BMap */
        selF.map = new window.BMap.Map(selF.ele);

        selF.getTargetPosition().then(function (target) {
            if (target && target.point)
            {
                var point = new window.BMap.Point(target.point.lng, target.point.lat);
                selF.map.centerAndZoom(point, selF.config.zoom || 18);
                selF.map.disableDragging();
                var marker = new window.BMap.Marker(point);
                selF.map.addOverlay(marker);
            }
        }, function () {
            selF.ele.style.display = 'none';
        });
    };

    /**
     * 跳转到目标链接
     *
     */
    BaiduMap.prototype.skipLink = function () {
        var selF = this;
        if (selF.config.link) {
            selF.ele.addEventListener('click', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                window.location.href = selF.config.link;
            });
        }
    };


    /**
     * 获取当前位置经纬度
     * @return {Object}  成功返回当前位置信息
     */
    BaiduMap.prototype.getCurPosition = function () {

        /* global BMap */
        var geolocation = new window.BMap.Geolocation();

        return new Promise(function (resolve, reject) {
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() === 0) {
                    return resolve(r);
                } else {
                    console.log('定位当前位置失败, errorCode:' + this.getStatus());
                    return reject();
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
        var localSearch = new window.BMap.LocalSearch(this.map);

        return new Promise(function (resolve, reject) {
            localSearch.setSearchCompleteCallback(function (res) {
                if (res) {
                    var poi = res.getPoi(0);
                    if (poi) {
                        return resolve(poi);
                    } else {
                        console.log('无法获取目标位置信息');
                        return reject();
                    }
                } else {
                    console.log('请配置目标位置信息');
                    return reject();
                }
            });

            localSearch.search(selF.config.address);

        });
    };

    // build说明: 商家定位(需要请求百度地图API)，有多处用到，故用build
    customElement.prototype.build = function () {
        var ele = this.element.querySelector(TYPE);
        var cfg = jsonParse(ele.textContent);
        if (cfg) {
            var bMp = new BaiduMap(this.element, cfg);
            bMp.init();
            bMp.append();
            window.addEventListener('load', function () {
                switch (cfg.type) {
                    case 'map':
                        bMp.drawMap();
                        bMp.skipLink();
                        break;
                    case 'distance':
                        bMp.distance();
                        break;
                    default:
                        bMp.distance();
                }
            });
        }
    };

    return customElement;
});
