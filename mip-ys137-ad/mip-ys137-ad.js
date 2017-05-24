/**
 * @author: mj
 * @date:  2017-05-22
 * @time: 16:33
 * @file: mip-ys137-ad.js
 * @contact: regboy@qq.com
 * @description: 管理页面上的广告展现
 */
define(function (require) {
    var customElem = require('customElement').create();
    var baiduDomain = 'dm50.ys137.com';
    // 加载百度反屏蔽代码
    var getBaiduAd = function (tuId) {
        return [
            '<mip-ad type="baidu-wm-ext" domain="',
            baiduDomain,
            '" token="',
            tuId,
            '"><div id="',
            tuId,
            '"></div></mip-ad>'].join('');
    };
    // 初始化插件
    var init = function (opt) {
        opt = opt || {}; // 设置配置项默认值
        var adId = [opt.id] || [0];
        var element = opt.element;
        var tuId = opt.tu;
        if (tuId !== '') { // 有设置tu的，优先展现
            element.innerHTML = getBaiduAd(tuId);
        }
        else {
            switch (+adId) {
                case 1: // 分页后（四图）
                    element.innerHTML = getBaiduAd('nbdqx58bef');
                    break;
                case 2: // 分页后（搜索推荐）
                    element.innerHTML = getBaiduAd('u4djpnkdfe');
                    break;
                case 3: // 头部
                    element.innerHTML = ''; // 预留
                    break;
                default:
                    element.innerHTML = '';
                    break;
            }
        }
    };
    // 获取插件参数
    var getOpt = function (element) {
        // 获取元素绑定的属性
        var adId = element.getAttribute('id');
        var isLazy = element.getAttribute('lazy');
        var tuId = element.getAttribute('tu');
        // 广告初始化参数
        var opt = {
            id: adId,
            lazy: isLazy,
            tu: tuId,
            element: element
        };
        return opt;
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.lazy === 'false' && init(opt);
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };
    return customElem;
});
