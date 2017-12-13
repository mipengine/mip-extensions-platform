/**
 * @file mip-ueditor-out 将富文本的内容 ，以符合 mip规则的形式表现出来。
 * @author xiaojinping
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO 后期会支持自定义查询的属性。首先，这里，要分3个解决方案走，1：转化成style,2：后台开发人员尽量解决style内联问题，3：如果后台实在不能解决，前端组织，写一个富文本模板。
        var ele = this.element;
        var propertyname = ele.getAttribute('propertyname') ? ele.getAttribute('propertyname') : 'mip-data-style';
        var ueditorTaget = ele.querySelectorAll('[' + propertyname + ']');
        var len = ueditorTaget.length;
        for (var i = 0; i < len; i++) {
            var propertyVal = ueditorTaget[i].getAttribute(propertyname);
            var arr = propertyVal.split(';');
            for (var item = 0, arrlen = arr.length; item < arrlen; item++) {
                if (arr[item]) {
                    var newArr = arr[item].split(':');
                    ueditorTaget[i].style[newArr[0]] = newArr[1];
                }
            }
        }
    };
    return customElement;
});
