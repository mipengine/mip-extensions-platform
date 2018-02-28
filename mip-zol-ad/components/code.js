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
        var script;
        var elements = [];
        var fodder = this.adBar.conf;
        var ins = util.dom.createElement('div');
        ins.innerHTML = fodder.code;
        for (var i = 0; i < ins.childNodes.length; i++) {
            node = ins.childNodes[i];
            if (node.nodeName === 'SCRIPT') {
                script = util.dom.createElement('script');
                if (node.src) {
                    script.src = node.src;
                } else {
                    script.text = node.innerText;
                }
                elements.push(script);
            } else {
                elements.push(node);
            }
        }
        return {elements: elements, height: fodder.height};
    };
    module.exports = Code;
});
