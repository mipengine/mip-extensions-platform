/**
 * @file mip-count 有来统计代码
 * @author youlai
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var biaoqian = document.createElement('script');
        biaoqian.setAttribute('type', 'text/javascript');
        biaoqian.setAttribute('src', 'https://hm.youlai.cn/hm.js');
        document.body.appendChild(biaoqian);
    };
    return customElement;
});

