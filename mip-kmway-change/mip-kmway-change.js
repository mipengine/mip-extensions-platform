/**
 * @file mip-kmway-change 组件
 * @author
 */

define(function (require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

     /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var $ele = $(ele);
        var i = $ele.attr('tabsNextI');
        var ind1 = 1;
        var ind2 = 1;
        var ind3 = 1;
        var arr = [ind1, ind2, ind3];
        ele.addEventListener('click', function () {
            var tabsCtn =  ele.parentNode.nextElementSibling;
            var $tabsCtn = $(tabsCtn);
            var indLen = $tabsCtn.children().length;
            $tabsCtn.children().hide().eq(arr[i]).show();
            arr[i]++;
            if (arr[i] === indLen) {
                arr[i] = 0;
            }
        }, false);
        // TODO
    };
    return customElement;
});
