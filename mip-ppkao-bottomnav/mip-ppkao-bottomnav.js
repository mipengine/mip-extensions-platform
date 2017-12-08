/**
 * @file mip-ppkao-bottomnav 组件
 * @author
 */

define(function (require) {
    // var $ = require('zepto');
    var customElement = require('customElement').create();

    // build说明: 导航组件，在首屏展示，需要尽快加载
    customElement.prototype.build = render;

    function render() {
        var ele = this.element;
        this.addEventAction('toggle', function (event) {
            event.preventDefault();
            ele.classList.toggle('active');
        });
    }

    return customElement;
});
