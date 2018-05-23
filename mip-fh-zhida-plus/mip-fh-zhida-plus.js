/**
 * @author: laoono
 * @date:  2017-01-13
 * @time: 15:35
 * @file: mip-fh-zhida-plus.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {

    var $ = require('zepto');
    var util = require('util');

    var customElem = require('customElement').create();
    var $body = $('body');
    var $emptyShowEle = $('[fh-ad-empty-show]');

    // 页面广告参数
    var $adKeywords = $('meta[name="fh-ad-keywords"]');
    // 是否开启ip调用
    var $ipEnabled = $('meta[name="ip-enabled"]');
    var ipEnabled = $ipEnabled.attr('content') || '';
    ipEnabled = ipEnabled.length && ipEnabled !== 'false' || false;

    var paramObj = $adKeywords.attr('content');


    // 直投广告请求url
    var adUrl = '//partners.fh21.com.cn/partners/showcodejsonp?callback=?';
    // 获取ip请求url;
    var ipUrl = '//ips.fh21.com.cn/getArea.php?callback=?&t=' + new Date().getTime();

    // 初始化直 投广告
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var posId = [opt.posId] || [1];
        var kw = opt.kw || '';
        var element = opt.element;
        var uid = opt.uid;
        var $plus = $('mip-fh-zhida-plus');
        var fhAdPutNum = $plus.length;
        var fhAdNum = $body.attr('fh-ad-num') || 0;

        // 接口参数值
        var query = {
            kw: kw,
            pid: posId.join(',')
        };

        uid && (query.uid = uid);

        query.pid = getPids($plus).join(',');
        query.uid = getUids($plus).join(',');

        var cids = getUids($plus, 'fh-ad-cid');
        cids.length && (query.cmscateid = cids.join(','));
        var mids = getUids($plus, 'fh-ad-mid');
        mids.length && (query.medium = mids.join(','));

        $body.attr('fh-ad-num', ++fhAdNum);

        var fhAdOpt = {
            adUrl: adUrl,
            query: query,
            element: element
        };

        if (fhAdNum !== fhAdPutNum) {
            return;
        }

        if (ipEnabled) {
            getIP(fhAdOpt, getFhAd);
        }
        else {
            getFhAd(fhAdOpt);
        }
    };

    function getOpt(element) {
        var $element = $(element);
        // 获取元素绑定的广告位id、uid(医生id)和关键词
        var posId = $element.attr('fh-ad-pid');
        var keywords = $element.attr('fh-ad-keywords') || paramObj;
        var lazy = $element.attr('lazy') || 'false';
        var uid = $element.attr('fh-ad-uid');

        // 广告初始化参数
        var opt = {
            posId: $.trim(posId),
            kw: $.trim(keywords),
            lazy: lazy,
            uid: $.trim(uid),
            element: $element
        };

        return opt;
    }

    function getPids(ele) {
        var res = [];

        $.each(ele, function (k, v) {
            res.push($(v).attr('fh-ad-pid'));
        });

        return res;
    }

    function getUids(ele, type) {
        type = type || 'fh-ad-uid';
        var res = [];

        $.each(ele, function (k, v) {
            var combo = $(v).attr(type);
            if (combo) {
                res.push(combo);
            }
        });

        return res;
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.lazy === 'false' && init(opt);
    };


    function getFhAd(opt) {
        opt = opt || {};
        var adUrl = opt.adUrl;
        var query = opt.query;
        var element = opt.element;
        var uid = '';

        $.getJSON(adUrl, query, function (res) {
            var isHasFhAd;
            var data = $.parseJSON(res.result);

            // 遍历直投广告ID
            $.each(data, function (k, v) {

                // 获取投放直销广告的节点
                element = $('mip-fh-zhida-plus[fh-ad-pid="' + k + '"]');
                uid = element.attr('fh-ad-uid');

                // 根据医生id判断物料类型
                v = (query.uid && $.isPlainObject(v)) ? v[uid] : v;

                // 有特定广告位id的直投广告 先隐藏网盟 再显示直投
                if ($.trim(v)) {
                    element.children(':first-child').remove();
                    element.html(v);

                    $body.addClass('view-fh-ad-' + (+k));

                    isHasFhAd = true;
                }
                // 无特定广告位id直投广告显示网盟
                else {
                    element.children(':first-child').show();

                    $body.addClass('view-fh-ad-' + (+k) + '-union');
                }
            });

            // 所有的直投广告位均无直投广告
            if (!isHasFhAd) {
                $body.addClass('view-fh-ad-union');
                $emptyShowEle.show();
            }
        });

    }

    function getIP(opt, cb) {
        opt = opt || {};

        $.getJSON(ipUrl, function (json) {
            var res = json || {};
            util.fn.isPlainObject(opt.query) && (opt.query.ip = res.ip);

            if ((typeof cb).toLocaleLowerCase() === 'function') {
                cb(opt);
            }
        });
    }

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };

    return customElem;
});