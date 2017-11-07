/**
 * @file mip-chinabyte-titlehide 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

  /**
   * 修改首屏样式，需早执行
   * 第一次进入可视区回调，只会执行一次
   *
   */
    customElement.prototype.build = function () {
        if (window.frames.length !== parent.frames.length) {
            document.getElementById('headerlogo').style.display = 'none';
            var head = document.getElementsByTagName('header')[0];
            head.style.background = '#fff';
            head.style.height = 'auto';
        }
    };

    return customElement;
});
