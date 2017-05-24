/**
 * @author: mj
 * @date:  2017-05-23
 * @time: 14:25
 * @file: mip-ys137-loaddata.js
 * @contact: regboy@qq.com
 * @description: 数据异步加载
 */
define(function (require) {
    var customElem = require('customElement').create();
    var ajaxurl = 'https://api.ys137.com/get_mipdata?';

    // 加载数据
    var getdata = function (container) {
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(ajaxurl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.html !== '') {
                container.innerHTML = data.html;
            }

        });

    };
    // 初始化插件
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var action = [opt.action] || ['auto'];
        var element = opt.element;

        if (action === 'click') {
            element.addEventListener('click', function () {
                getdata(element);
            }, false);
        }
        else {
            getdata(element);
        }
    };
    // 获取插件参数
    var getOpt = function (element) {
        // 获取元素绑定的属性
        var action = element.getAttribute('action');
        if (action === '') {
            action = 'auto';
        }

        // 广告初始化参数
        var opt = {
            action: action,
            element: element
        };
        return opt;
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.action !== 'roll' && init(opt);
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.action === 'roll' && init(opt);
    };

    return customElem;
});
