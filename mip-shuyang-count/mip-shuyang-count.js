/**
 * @file mip-shuyang-count 组件
 * @author EDI
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var op = element.getAttribute('op');
        var id = element.getAttribute('id');
        var modelid = element.getAttribute('modelid');
        var catid = element.getAttribute('catid');
        var url;
        if (op === 'count' && id && parseInt(id, 10).toString().length === id.length
            && modelid && parseInt(modelid, 10).toString().length === modelid.length) {
            url = 'https://api.05273.cn/?op=count&id=' + parseInt(id, 10) + '&modelid=' + parseInt(modelid, 10);
        }
        else if (op === 'stats' && catid && parseInt(catid, 10).toString().length === catid.length) {
            url = 'https://api.05273.cn/?op=stats&catid=' + parseInt(catid, 10) + '&edi=mobile';
        }
        if (url) {
            var i = new Image();
            i.src = url;
        }
    };

    return customElement;
});
