/**
 * @file 百度网盟广告，所有广告需添加gmine_ad样式名
 * @author jiang.weiwei@zol.com.cn
 */

define(function (require, exports, module) {
    // 百度移动端代码
    function baiduMCpro(fodder) {
        var div = document.createElement('div');
        div.id = 'cpro_' + fodder.cpro_id;
        div.classList.add('gmine_ad');
        (window['cpro_mobile_slot'] = window['cpro_mobile_slot'] || []).push({
            id: fodder.cpro_id
        });
        var script = document.createElement('script');
        script.src = '//cpro.zol.com.cn/cpro/ui/cm.js';
        return [div, script];
    }
    // 百度图+移动端代码
    function baiduImagePlus(fodder) {
        var scriptText = document.createElement('script');
        scriptText.text = 'var cpro_id="' + fodder.cpro_id + '";';
        var scriptSrc = document.createElement('script');
        scriptSrc.src = '//cpro.zol.com.cn/cpro/ui/mi.js';
        return [scriptText, scriptSrc];
    }
    // 百度反屏蔽代码
    function zolCpro(fodder) {
        var div = document.createElement('div');
        div.id = fodder.cpro_id;
        div.classList.add('gmine_ad');
        var script = document.createElement('script');
        script.src = fodder.script_src;
        return [div, script];
    }
    function Baidu(adBar) {
        this.adBar = adBar;
    }
    Baidu.prototype.create = function (util) {
        var elements = [];
        var fodder = this.adBar.conf;
        if (fodder.baidu_type === 2) {
            elements = baiduMCpro(fodder);
        } else if (fodder.baidu_type === 3) {
            elements = baiduImagePlus(fodder);
        } else if (fodder.baidu_type === 4) {
            elements = zolCpro(fodder);
        }
        return {elements: elements};
    };
    module.exports = Baidu;
});
