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
    var getBaiduAd = function (element, tuId) {
        element.innerHTML = '<div id="' + tuId + '"></div>';
        var script = document.createElement('script');
        script.src = document.location.protocol + '//' + baiduDomain + '/' + tuId + '.js';
        document.body.appendChild(script);
    };

    // 图加广告
    var tujia = function (forClass) {
        var $ = require('jquery'); // 导入jquery
        var target = $('.' + forClass);
        target.find('mip-img').each(function () {
            var tujia = $('<div class="photo-plus-container"></div>');
            $(this).wrap(tujia);
            // 控件进入可视区域时，展现图加
            $(this).one('DOMSubtreeModified', function (e) {
                var photoContainer = this;
                var str = [
                    '<div class="div-link"><iframe src="https://m.ys137.com/tujia/tujia.html" name="ifm"',
                    ' style="width:100%;height:60px;margin:0;"',
                    ' height="60px" marginheight="0" scrolling="',
                    'no" frameborder="0" allowtransparency="true"',
                    '></iframe><span class="close-l">x</span></div>'].join('');
                $(str).insertAfter($(photoContainer)).find('.close-l').click(function () {
                    $(this).parent('.div-link').hide();
                });
            });
        });
    };
    // 初始化插件
    var init = function (opt) {
        opt = opt || {}; // 设置配置项默认值
        var adId = [opt.id] || [0];
        var element = opt.element;
        var tuId = opt.tu;
        if (tuId === null || tuId === '') { // 有设置tu的，优先展现
            switch (+adId) {
                case 1: // 分页后（四图）
                    getBaiduAd(element, 'nbdqx58bef');
                    break;
                case 2: // 分页后（搜索推荐）
                    getBaiduAd(element, 'u4djpnkdfe');
                    break;
                case 3: // 头部
                    getBaiduAd(element, 'ggdge41lc5');
                    break;
                case 99999: // 图+广告
                    tujia(opt.forclass);
                    break;
                default:
                    element.innerHTML = '';
                    break;
            }
        }
        else {
            getBaiduAd(element, tuId);
        }
    };
    // 获取插件参数
    var getOpt = function (element) {
        // 获取元素绑定的属性
        var adId = element.getAttribute('id');
        var isLazy = element.getAttribute('lazy');
        var tuId = element.getAttribute('tu');
        var forClass = element.getAttribute('for-class');
        // 广告初始化参数
        var opt = {
            id: adId,
            lazy: isLazy,
            tu: tuId,
            forclass: forClass,
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
