/**
 * @file 信息流广告模板
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    module.exports = function (adBar, components) {
        switch (adBar.type) {
            case 'mInfoFlow':
                return components.MFeed;
                break;
            default:
                return false;
        }
    };
});
