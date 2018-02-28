/**
 * @file 嵌入代码模板
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    var util = require('../util');
    module.exports = function (adBar, components) {
        var type = util.fun.firstLetterUppercase(adBar.conf.type.replace('_', ''));
        return components[type] || components.Code;
    };
});
