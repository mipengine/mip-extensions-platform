/**
 * @file 嵌入代码广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var mipUtil = require('util');
    function Code(adBar) {
        this.adBar = adBar;
    }
    Code.prototype.create = function (util) {
        var node;
        var style;
        var script;
        var styleTags;
        var scriptTags;
        var elements = [];
        var fodder = this.adBar.conf;
        var div = document.createElement('div');
        mipUtil.css(div, 'display', 'none');
        // ie中第一个元素是script或style获取不到
        div.innerHTML = '<span style="display:none">code</span>' + fodder.code;
        document.getElementsByTagName('body')[0].appendChild(div);
        scriptTags = div.getElementsByTagName('script');
        for (var i = 0, scriptTagLength = scriptTags.length; i < scriptTagLength; i++) {
            node = scriptTags[i];
            script = document.createElement('script');
            if (node.src) {
                script.src = node.src;
            } else {
                script.text = node.innerHTML;
            }
            node.parentNode.appendChild(script);
            node.parentNode.removeChild(node);
        }
        styleTags = div.getElementsByTagName('style');
        for (var j = 0, styleTagLength = styleTags.length; j < styleTagLength; j++) {
            node = styleTags[j];
            style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) { // ie
                style.styleSheet.cssText = node.innerHTML;
            } else {
                style.appendChild(document.createTextNode(node.innerHTML));
            }
            node.parentNode.appendChild(style);
            node.parentNode.removeChild(node);
        }
        for (var n = 1, childNodeLength = div.childNodes.length; n < childNodeLength; n++) {
            node = div.childNodes[n];
            elements.push(node);
        }
        div.parentNode.removeChild(div);
        return {elements: elements};
    };
    module.exports = Code;
});
