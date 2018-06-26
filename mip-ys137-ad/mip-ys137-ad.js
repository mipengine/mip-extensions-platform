/**
 * @author: mj
 * @date:  2018-06-26
 * @time: 11:11
 * @file: mip-ys137-ad.js
 * @contact: regboy@qq.com
 * @description: 管理页面上的广告展现
 */
define(function (require) {
    var customElem = require('customElement').create();
    var $ = require('zepto');
    // 初始化插件
    var init = function (element) {
        var argId = element.getAttribute('id') || 0;
        var argFrom = element.getAttribute('from') || 'mobile';
        if (argId < 1) {
            return;
        }
        var timestamp = (new Date()).valueOf();
        var apiUrl = [
            'https://api.ys137.com/all_adv?',
            'id=' + argId,
            '&from=' + argFrom,
            '&v=' + timestamp
        ].join('');
        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(apiUrl, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data) {
                $(element).append(data);
            }
        });
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        init(this.element);
    };
    return customElem;
});
