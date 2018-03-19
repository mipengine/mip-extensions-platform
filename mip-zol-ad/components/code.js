/**
 * @file 嵌入代码广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    function Code(adBar) {
        this.adBar = adBar;
    }
    Code.prototype.create = function (util) {
        var node;
        var style;
        var script;
        var zpvDom; // zpv.js统计监测的dom
        var styleTags;
        var scriptTags;
        var zpvDomFlag = true;
        var elements = [];
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        var div = util.dom.createElement('div');
        util.css(div, 'display', 'none');
        // ie中第一个元素是script或style获取不到
        div.innerHTML = '<span style="display:none">code</span>' + fodder.code;
        document.getElementsByTagName('body')[0].appendChild(div);
        scriptTags = div.getElementsByTagName('script');
        for (var i = 0, len = scriptTags.length; i < len; i++) {
            node = scriptTags[i];
            script = util.dom.createElement('script');
            if (node.src) {
                script.src = node.src;
            } else {
                script.text = node.innerHTML;
            }
            node.parentNode.appendChild(script);
            node.parentNode.removeChild(node);
        }
        styleTags = div.getElementsByTagName('style');
        for (var i = 0, len = styleTags.length; i < len; i++) {
            node = styleTags[i];
            style = util.dom.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) { // ie
                style.styleSheet.cssText = node.innerHTML;
            } else {
                style.appendChild(document.createTextNode(node.innerHTML));
            }
            node.parentNode.appendChild(style);
            node.parentNode.removeChild(node);
        }
        for (var i = 1; i < div.childNodes.length; i++) {
            node = div.childNodes[i];
            if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                if (zpvDomFlag) {
                    zpvDomFlag = false;
                    zpvDom = node;
                }
            }
            elements.push(node);
        }
        div.parentNode.removeChild(div);
        return {elements: elements, height: fodder.height, appendAfterFn: function () {
            util.ad.zpv({
                range: 'bms_ad',
                dom: zpvDom,
                type: 'inview',
                name: 'bms_' + adBar.loc_id + '_' + adBar.bid + '_show'
            });
        }};
    };
    module.exports = Code;
});
