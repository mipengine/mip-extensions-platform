/**
 * @file mip-retract 组件
 */
define(function (require) {
    var customElement = require('customElement').create();
    var w = window.innerWidth;
    var h = window.innerHeight;
    window.onresize = function () {
        if (w > window.innerWidth || h > window.innerHeight) {
            console.log('缩小');
            alert(123);
        };
    };
    return customElement;
});