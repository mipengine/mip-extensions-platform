



/**
* @file 显示与隐藏更多导航栏
* @date 2017/10/10
* @author dengzihao(2362588961@qq.com)
* @version 1.1.0
*/

define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();

    function open() {
        $('.triangle').on('click', function () {
            $('.triangle').css('display', 'none');
            $('.re').css('display', 'block');
            $('.index-nav').css('height', 'auto');
        });
        $('.re').on('click', function () {
            $('.re').css('display', 'none');
            $('.triangle').css('display', 'block');
            $('.index-nav').css('height', '40px');
        });
    }

    function init() {
        open();
    }

    customElem.prototype.build = init;

    return customElem;
});
