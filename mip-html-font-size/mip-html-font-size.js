/**
 * @file mip-html-font-size 可将html的font-size设置成当前屏幕尺寸的10%,比如320px的手机屏，html根元素的font-size:32px;
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    //  创建元素时就执行这个步骤。给html设置font-size
    customElement.prototype.createdCallback = function () {
        // ;
        var that = this.element;
        var ele = document.documentElement;
        var eleW = screen.availWidth;
        var fz = eleW  * .1;
        var minfz = that.getAttribute('min-fontSizeW') || 320;
        var maxfz = that.getAttribute('max-fontSizeW') || 540;
        var minW = that.getAttribute('min-width') || 320;
        var maxW = that.getAttribute('max-width') || 750;
        //  根据条件给html 赋值 width ;
        if (eleW <= minW) {
            ele.style.width = minW + 'px';
        }
        else if (eleW >= maxW) {
            ele.style.width = maxW + 'px';
        }
        //  根据条件给html 赋值 font-size ;
        if (eleW <= minfz) {
            ele.style.fontSize = minfz / 10 + 'px';
        }
        else if (eleW >= maxfz) {
            ele.style.fontSize = maxfz / 10 + 'px';
        }
        else {
            ele.style.fontSize = fz + 'px';
        }
    };
    return customElement;
});
