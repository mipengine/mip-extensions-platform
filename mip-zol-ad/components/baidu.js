/**
 * @file 百度网盟广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    function Baidu(adBar) {
        this.adBar = adBar;
    }
    Baidu.prototype.create = function (util) {
        var fodder = this.adBar.conf;
        var div = util.dom.createElement('div', {
            'id': fodder.title,
            'class': 'gmine_ad'
        });
        var script = util.dom.createElement('script');
        script.src = fodder.click_url;
        util.fun.log(util.user.pvtest('bms_' + this.adBar.loc_id + '_' + this.adBar.bid + '_load'));
        return {elements: [div, script], height: fodder.height};
    };
    module.exports = Baidu;
});
