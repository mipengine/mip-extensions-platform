



/**
* 微友巴巴mip改造 javascript功能插件
* @file 导航条单击展开更多分类
* @date 2016.12.12
* @author dinglei (375234944@qq.com)
* @version 1.0.1
*/

define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();

    function open() {
        $('.seek-inp').on('click', function () {
            $('.show').css('display', 'none');
            $('.hide').css('display', 'block');
        });
        $('.close').on('click', function () {
            $('.hide').css('display', 'none');
            $('.show').css('display', 'block');
        });
    }

    function init() {
        open();
    }

    customElem.prototype.build = init;

    return customElem;
});
