/**
 * @file ZOL私有业务--版权信息
 * @author  mulianju
 * @time  2017-10-30
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        element.innerHTML = '';
        element.id = 'copyright';
        element.innerHTML = '@' + (new Date()).getFullYear() + '\u0020\u4e2d\u5173\u6751\u5728\u7ebf'
        + '\u0020\u7248\u6743\u6240\u6709\u0020\u4eacICP\u590714061128\u53f7';
    };
    return customElement;
});
