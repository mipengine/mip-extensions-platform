/**
 * @file mip-btbcc-bdlxb 组件
 * @author microcust.com
 * @date: 2018-08-07
 */
define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var currentElement = this.element;
        var sid = currentElement.getAttribute('sid') || '';

        var elescript = document.createElement('script');
        elescript.src = 'https://lxbjs.baidu.com/lxb.js?sid=' + sid;
        $('body').append(elescript);
    };

    return customElement;

});
