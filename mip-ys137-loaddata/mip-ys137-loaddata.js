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
    var getdata = function (container, params) {
        var fetchJsonp = require('fetch-jsonp');
        var url = ajaxurl;
        if (params !== null) {
            var ps = [];
            for (var p in params) {
                ps.push(p + '=' + params[p]);
            }
            url = ajaxurl + ps.join('&');
        }

        fetchJsonp(url, {
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
        var action = opt.action;
        var element = opt.element;
        var params = opt.params;
        if (action === 'click') {
            element.addEventListener('click', function () {
                getdata(element, params);
            }, false);
        }
        else {
            getdata(element, params);
        }
    };
    // 获取插件参数
    var getOpt = function (element) {
        // 获取元素绑定的属性
        var action = element.getAttribute('action');
        var params = null;
        if (element.getAttribute('params') !== '' && element.getAttribute('params') !== null) {
            try {
                params = JSON.parse(element.getAttribute('params').replace(/'/g, '"'));
            }
            catch (error) {}
        }

        if (action === null || action === '') {
            action = 'auto';
        }

        // 广告初始化参数
        var opt = {
            action: action,
            params: params,
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
