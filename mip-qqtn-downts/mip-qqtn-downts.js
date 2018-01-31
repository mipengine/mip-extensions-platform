/**
 * @file mip-qqtn-downts 对没有下载资源的根据访问设备进行提示,
 * 使用 addEventListener 是因为需要读取另外的组件修改过的href，请通过
 * addEventListener 无法满足效果，测试必须只有使用onload才行，请通过
 * @author gom3250@qq.com.
 * @version 1.0.0
 *  */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var fromnodown = ele.getAttribute('data-nodownurl');
        window.addEventListener('load', function () {
            var drurl = $(ele).find('#address').attr('href');
            if (drurl === fromnodown || drurl === 'javascript:;') {
                $(ele).find('#address').css({'background': '#ccc', 'color': '#fff', 'border-color': '#ddd'});
                if (platform.isIos()) {
                    $(ele).find('#address').text('暂无苹果版');
                } else {
                    $(ele).find('#address').text('暂无安卓版');
                }
            }
        }, false);
    };
    return customElement;
});
