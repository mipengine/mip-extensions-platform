/**
 * @file 百度网盟广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    // 百度pc端代码
    function baiduCpro(fodder, util) {
        var div = util.dom.createElement('div', {
            id: 'cpro_' + fodder.cpro_id
        });
        (window.cproArray = window.cproArray || []).push({
            id: fodder.cpro_id
        });
        var script = util.dom.createElement('script');
        script.src = '//cpro.zol.com.cn/cpro/ui/c.js';
        return [div, script];
    }
    // 百度移动端代码
    function baiduMCpro(fodder, util) {
        var div = util.dom.createElement('div', {
            id: 'cpro_' + fodder.cpro_id
        });
        (window['cpro_mobile_slot'] = window['cpro_mobile_slot'] || []).push({
            id: fodder.cpro_id
        });
        var script = util.dom.createElement('script');
        script.src = '//cpro.zol.com.cn/cpro/ui/cm.js';
        return [div, script];
    }
    // 百度图+移动端代码
    function baiduImagePlus(fodder, util) {
        var scriptText = util.dom.createElement('script');
        scriptText.text = 'var cpro_id="' + fodder.cpro_id + '";';
        var scriptSrc = util.dom.createElement('script');
        scriptSrc.src = '//cpro.zol.com.cn/cpro/ui/mi.js';
        return [scriptText, scriptSrc];
    }
    // 百度反屏蔽代码
    function zolCpro(fodder, util) {
        var div = util.dom.createElement('div', {
            'id': fodder.cpro_id,
            'class': 'gmine_ad'
        });
        var script = util.dom.createElement('script');
        script.src = fodder.script_src;
        return [div, script];
    }
    function Baidu(adBar) {
        this.adBar = adBar;
    }
    Baidu.prototype.create = function (util) {
        var elements = [];
        var adBar = this.adBar;
        var fodder = this.adBar.conf;
        if (fodder.baidu_type === 1) {
            elements = baiduCpro(fodder, util);
        } else if (fodder.baidu_type === 2) {
            elements = baiduMCpro(fodder, util);
        } else if (fodder.baidu_type === 3) {
            elements = baiduImagePlus(fodder, util);
        } else if (fodder.baidu_type === 4) {
            elements = zolCpro(fodder, util);
        }
        return {elements: elements, height: fodder.height, appendAfterFn: function () {
            util.ad.zpv({
                range: 'bms_ad',
                dom: elements[0],
                type: 'inview',
                name: 'bms_' + adBar.loc_id + '_' + adBar.bid + '_show'
            });
        }};
    };
    module.exports = Baidu;
});
