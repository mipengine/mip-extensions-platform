/**
* 下载站mip改造
* @file 区分显示安卓板块 ios板块
* @author 576604471@qq.com
* @version 1.0.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var isios = $(element).attr('data-ios');
        if (isios) {
            $(element).find('.ios').show();
            $(element).find('.android').hide();
        } else {
            $(element).find('.android').show();
            $(element).find('.ios').hide();
        }
    };
    return customElem;
});
