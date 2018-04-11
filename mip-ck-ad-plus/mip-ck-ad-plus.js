/**
 * @file mip-ck-ad-plus 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();
    var $body = $('body');
    var $emptyShowEle = $('[ck-ad-empty-show]');

    // 页面广告参数
    var $adKeywords = $('meta[name="ck-ad-keywords"]');
    // 是否开启ip调用
    var $locationEnabled = $('meta[name="location-enabled"]');
    var locationEnabled = $locationEnabled.attr('content') || '';
    locationEnabled = locationEnabled.length && locationEnabled !== 'false' || false;

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
    var adUrl = config.url || '//s.cnkang.com/yyk/showcodejsonp?callback=?';
    // 动态配置参数
    var adData = config.data || {};

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
            getIP(ckAdOpt, getAd);
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

    function getAd(opt) {
        opt = opt || {};
        var adUrl = opt.adUrl;
        var query = opt.query;
        var element = opt.element;
        var uid = '';

        $.getJSON(adUrl, query, function (res) {
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

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        init(opt);
    };

    return customElem;
});
