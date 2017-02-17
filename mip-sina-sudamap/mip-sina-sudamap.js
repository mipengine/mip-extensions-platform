/**
 * @file mip-sina-sudamap 组件
 * @author fengzihao
 */

define(function (require) {

    var customElement = require('customElement').create();
    require('./suda_map.min');

    function isJsonScriptTag(element) {
        return element.tagName === 'SCRIPT'
            && element.getAttribute('type')
            && element.getAttribute('type').toUpperCase() === 'APPLICATION/JSON';
    }

    customElement.prototype.build = function () {
        var element = this.element;
        var scriptEle = element.querySelector('script') || null;
        if (scriptEle != null) {
            if (isJsonScriptTag(scriptEle)) {
                var sudaMapConfigStr = scriptEle.textContent.toString();
                try {
                    window.sudaMapConfig = JSON.parse(sudaMapConfigStr);
                    window.suda_init(window.sudaMapConfig.pageId, 100);
                }
                catch (e) {
                    // console.error('error sudaMapConfig', sudaMapConfigStr);
                    return false;
                }
            }
        }
    };

    return customElement;
});
