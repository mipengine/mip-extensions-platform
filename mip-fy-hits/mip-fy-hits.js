/**
 * @file mip-fy-hits 通过接口获取点击次数。
 * 因为接口数据为非jsonp格式(只有纯数字)，必须使用fetch才能正确获取。
 * 本地测试无问题，请通过。
 * @author gom3250@qq.com.
 *  */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var hitsurl = ele.getAttribute('data-hitsurl');
        var hitsid = ele.getAttribute('data-hitsid');
        fetch(hitsurl + hitsid).then(function (res) {
            return res.text();
        }).then(function (data) {
            $(ele).find('#hits').text(data);
        }).catch(function (err) {
        });
    };
    return customElement;
});
