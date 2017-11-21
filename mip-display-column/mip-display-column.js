/**
 * @file mip-display-column 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var displayObj = '';
        ele.addEventListener('click', function (event) {
            event.stopPropagation();
            if (this.getAttribute('target').indexOf(this.getAttribute(','))) {
                displayObj = this.getAttribute('target').split(',');
            } else {
                displayObj = this.getAttribute('target');
            }
            for (var i = 0; i < displayObj.length; i++) {
                var obj = document.getElementsByClassName(displayObj[i])[0];
                if (obj.className.indexOf('mip_display') > -1) {
                    obj.className = obj.className.replace('mip_display', '');
                } else {
                    obj.className += ' mip_display';
                }
            }
        });
        function zlq01(z) {
            function zlq02() {
                console.log(z);
            }
            return zlq02;
        }
        function colsDisplay() {
            for (var i = 0; i < displayObj.length; i++) {
                var obj = document.getElementsByClassName(displayObj[i])[0];
                if (obj.className.indexOf('mip_display') > -1) {
                    obj.className = obj.className.replace('mip_display', '');
                }
            }
        }
        document.addEvenlistener('click', function () {
            colsDisplay();
        });
    };
    return customElement;
});
