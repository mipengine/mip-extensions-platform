/**
 * @file mip-ck-ad-plus 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var util = require('util');

    var customElem = require('customElement').create();
    var $body = $('body');
    var $emptyShowEle = $('[ck-ad-empty-show]');

    // 页面广告参数
    var $adKeywords = $('meta[name="ck-ad-keywords"]');
    // 是否开启ip调用
    var $locationEnabled = $('meta[name="location-enabled"]');
    var locationEnabled = $locationEnabled.attr('content') || 'true';
    locationEnabled = locationEnabled.length && locationEnabled !== 'false' || false;
    var hashIp = window.MIP.hash.get('ip');
    if (hashIp) {
        locationEnabled = hashIp === 'true' ? true : false;
    }

    var paramObj = $adKeywords.attr('content');
    // 增加配置对象
    var $config = $('meta[name="ck-ad-config"]');
    var config = $config.attr('content');
    try {
        config = JSON.parse(config);
    }
    catch (e) {
        config = {};
    }

    // 直投广告请求url
    var adUrl = config.url || '//s.cnkang.com/yyk/showcodejsonp';
    // 动态配置参数
    var adData = config.data || {};

    // 为了加载高德地图脚本，编写的loadScript加载脚本方法
    function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url; // 用途：页面地理定位，获取省市地区。服务商：高德地图。JS地址：//webapi.amap.com/maps?v=1.3&key=41a6673dd49056f4f7d1d3a4816ed582&callback=onApiLoaded'

        script.onreadystatechange = callback;
        script.onload = callback;

        head.appendChild(script);
    }

    // 通过高德地图获取定位相关信息
    function getAMapLocation(cb) {

        cb = typeof cb === 'function' ? cb : function () {};
        var map;
        var geolocation;
        var AMap = window.AMap;
        // 加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });

        map.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                timeout: 1000 // 超过10秒后停止定位，默认：无穷大

            });
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); // 返回定位出错信息
        });

        // 解析定位结果
        function onComplete(data) {
            regeocoder(data.position.getLng(), data.position.getLat());
        }

        // 解析定位错误信息
        function onError(data) {
            cb();
        }

        // 解析
        function regeocoder(getLng, getLat) { // 逆地理编码
            var lnglatXY = [getLng, getLat]; // 已知点坐标

            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: 'all'
            });
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoderCallBack(result);
                }
                else {
                    cb();
                }
            });
        }

        function geocoderCallBack(data) {
            var locData = {
                pro: data.regeocode.addressComponent.province, // 返回地址描述
                city: data.regeocode.addressComponent.city, // 返回地址描述
                district: data.regeocode.addressComponent.district // 区
            };

            cb(locData);
        }
    }

    // 初始化直 投广告
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var posId = [opt.posId] || [1];
        var kw = opt.kw || '';
        var element = opt.element;
        var $plus = $('mip-ck-ad-plus');
        var ckAdPutNum = $plus.length;
        var ckAdNum = $body.attr('ck-ad-num') || 0;

        // 接口参数值
        var query = {
            kw: kw,
            pid: posId.join(',')
        };

        // 如果adData不是一个Object，强制转为{}
        if (!(adData && $.isPlainObject(adData))) {
            adData = {};
        }

        query = $.extend(adData, query);

        query.pid = getPids($plus).join(',');

        $body.attr('ck-ad-num', ++ckAdNum);

        var ckAdOpt = {
            adUrl: adUrl,
            query: query,
            element: element
        };

        // 广告组件数量 不等于 已经渲染的广告组件数量 直接退出 不请求接口
        if (ckAdNum !== ckAdPutNum) {
            return;
        }

        if (locationEnabled) {

            // 页面配置了定位允许项，开始加载高德地图定位脚本
            loadScript('//webapi.amap.com/maps?v=1.3&key=41a6673dd49056f4f7d1d3a4816ed582&'
            + 'callback=onApiLoaded', function () {
                // 给JSAPI引用地址url加上callback参数
                window.onApiLoaded = function () { // 使用原因：异步调用高德地图API,官方文档要求注册一个callback回调全局方法(onApiLoaded),文档示例链接：http://lbs.amap.com/api/javascript-api/example/map/asynchronous-loading-map/
                    getAMapLocation(function (data) {
                        data = data || {};
                        ckAdOpt.query = util.fn.extend(data, ckAdOpt.query);
                        getIP(ckAdOpt, getAd);
                    });
                };
            });
        }
        else {
            getAd(ckAdOpt);
        }
    };

    function getOpt(element) {
        var $element = $(element);
        // 获取元素绑定的广告位id、uid(医生id)和关键词
        var posId = $element.attr('pid');

        // 广告初始化参数
        var opt = {
            posId: $.trim(posId),
            kw: paramObj,
            element: $element
        };

        return opt;
    }

    function getPids(ele) {
        var res = [];

        $.each(ele, function (k, v) {
            res.push($(v).attr('pid'));
        });

        return res;
    }

    // 广告请求成功回调
    function getAdSuccess(res, element, uid, query) {
        var isHasCkAd;
        var data = $.parseJSON(res.result);

        // 遍历直投广告ID
        $.each(data, function (k, v) {

            // 获取投放直销广告的节点
            element = $('mip-ck-ad-plus[pid="' + k + '"]');
            uid = element.attr('ck-ad-uid');

            // 根据医生id判断物料类型
            v = (query.uid && $.isPlainObject(v)) ? v[uid] : v;

            // 有特定广告位id的直投广告 先隐藏网盟 再显示直投
            if ($.trim(v)) {
                element.children(':first-child').remove();
                element.html(v);

                $body.addClass('view-ck-ad-' + (+k));

                isHasCkAd = true;
            }
            // 无特定广告位id直投广告显示网盟
            else {
                element.children(':first-child').show();

                $body.addClass('view-ck-ad-' + (+k) + '-union');
            }
        });

        // 所有的直投广告位均无直投广告
        if (!isHasCkAd) {
            $body.addClass('view-ck-ad-union');
            $emptyShowEle.show();
        }
    }

    function getAd(opt) {
        opt = opt || {};
        var adUrl = opt.adUrl;
        var query = opt.query;
        var element = opt.element;
        var uid = '';

        $.ajax({
            url: adUrl,
            data: query,
            dataType: 'jsonp',
            success: function (res) {
                getAdSuccess(res, element, uid, query);
            }
        });
    }

    function getIP(opt, cb) {
        opt = opt || {};
        if ((typeof cb).toLocaleLowerCase() === 'function') {
            cb(opt);
        }
    }

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
    };

    // 该组件可能会投放在页面顶部，在首屏展示，需要尽快加载。而且有可能在页面多个位置引用该组件, 但展示位置是在首屏
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        init(opt);
    };

    return customElem;
});
