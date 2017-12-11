/**
 * @file 百度地图获取经纬度
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var MAPURL = 'https://api.map.baidu.com/api?';

    function BaiduMap(element, config, callback) {
        this.config = config;
        this.ele = element;
        this.callback = callback;
        this.init();
        this.append();
    }

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
     * 绑定全局 callback 函数，并返回回调名称
     *
     * @return {string} 回调名称
     */
    BaiduMap.prototype.getCb = function () {
        window.mapCallback = this.callback.bind(this);
        return 'mapCallback';
    };

    return BaiduMap;
});
