/**
 * @file mip-zol-wapmerchant 组件
 * @author liu.xianggui@zol.com.cn
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');

    // IP定位接口，主要返回省、市、县等ID
    var IP_LOCATION_API = '//wap.zol.com.cn/index.php?c=Ajax&f=Public_AreaInfo_GetUserArea';

    /**
     * 判断是否是函数
     *
     * @param  {Function} fn 传入函数
     * @return {boolean}
     */
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    }

    /**
     * 执行回调函数
     *
     * @param  {Function} callback 传入的函数，可以是一组函数
     * @param  {Object}   data     所需数据
     */
    function executeCallbacks(callback, data) {
        if (Array.isArray(callback) && callback.length) {
            [].forEach.call(callback, function (fn) {
                if (isFunction(fn)) {
                    try {
                        fn(data);
                    }
                    catch (error) {}
                }
            });
        }
        else if (isFunction(callback)) {
            callback(data);
        }
    }

    /**
     * 拼接接口地址
     *
     * @param  {string} src   原始API地址
     * @param  {Object} query 查询参数对象
     * @return {string}       接口地址
     */
    function getQueryUrl(src, query) {
        var arr = [];
        for (var key in query) {
            if (query.hasOwnProperty(key)) {
                arr.push(key + '=' + query[key]);
            }
        }
        var queryStr = arr.join('&');
        var url = src;
        if (src.indexOf('?') > -1) {
            url += ('&' + queryStr);
        }
        else {
            url += ('?' + queryStr);
        }
        return url;
    }

    /**
     * IP识别函数
     *
     * @param  {Function} callback 回调函数
     */
    function getLocationByIp(callback) {
        fetchJsonp(IP_LOCATION_API, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (res) {
            try {
                window.localStorage && localStorage.setItem('location', JSON.stringify(res));
            }
            catch (error) {
                console.warn('can not use localStorage!');
            }
            executeCallbacks(callback, res);
        });
    }

    /**
     * 加载区块数据
     *
     * @param  {Object} options 参数对象
     */
    function loadData(options) {

        var element = this.element;
        var data = element.dataset;

        var params = options || {};
        params.limit = data.limit;

        // 传入appkey
        if (this.appkey && this.appkey !== '') {
            params.appkey = this.appkey;
        }

        // 传入token
        if (this.token && this.token !== '') {
            params.token = this.token;
        }

        // 获取用户设置参数
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                var customParams = JSON.parse(script.textContent.toString());
                params = util.fn.extend(customParams, params);
            }
        }
        catch (e) {
            // eslint-disable-line
            console.warn('json is illegal');
            // eslint-disable-line
            console.warn(e);
            return;
        }

        var url = getQueryUrl(data.src, params);

        // 无数据的时候是否移除该区块
        var emptyRemove = (data.emptyRemove && data.emptyRemove === 'true');
        var emptyTip = '<div class="lazy-load-empty">对不起，暂无数据~</div>';

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (result) {
            return result.json();
        }).then(function (result) {
            if (!result.status) {
                element.innerHTML = result.data.list;
                if (result.data.list === '' || !result.data.list.length) {
                    if (emptyRemove) {
                        var parent = element.parentNode;
                        parent.parentNode.removeChild(parent);
                    }
                    else {
                        element.innerHTML = emptyTip;
                    }
                }
            } else {
                if (emptyRemove) {
                    var parent = element.parentNode;
                    parent.parentNode.removeChild(parent);
                }
                else {
                    element.innerHTML = emptyTip;
                }
            }
        });
    }

    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     * 元素插入到文档时获取token (必须)
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = this.element;
        var token = element.getAttribute('token');
        var isNeedToken = (token && token === 'true');

        // 如果需要token
        if (isNeedToken) {
            var appkey = element.getAttribute('appkey') || '';
            // token 获取
            var tokenApi = '//wap.zol.com.cn/mip/api/MakeToken/GetToken?appkey=' + appkey;

            fetchJsonp(tokenApi, {
                jsonpCallback: 'callback'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                if (!res.status) {
                    self.token = res.token;
                    self.appkey = appkey;
                }
            });
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 元素
        var self = this;
        var element = self.element;
        var data = element.dataset;
        var isLocation = (data.location && data.location === 'true');

        // 如果需要IP或者GPS定位, GPS定位暂时不支持
        if (isLocation) {
            getLocationByIp(function (res) {
                loadData.call(self, {
                    provinceid: res.provinceId,
                    cityid: res.cityId,
                    countyid: res.countyId
                });
            });
        }
        else {
            loadData.call(self);
        }
    };

    return customElement;
});
