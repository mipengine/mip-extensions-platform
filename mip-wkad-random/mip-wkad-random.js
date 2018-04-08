/**
* 寻医问药mip改造 分流广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.04.08
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var ratioRnd = function () {
        var rand = Math.random();
        if (rand < 0.04) {
            return 0;
        }
        if (rand < 0.14) {
            return 1;
        }
        else {
            return 2;
        }
    };
    var loadAd = function (elem, content) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = null;
        var arr = [];
        var index = 0;
        var res = content.replace(/\[|\,\s*|\]/g, function (matchs) {
            if (matchs === '[') {
                return '["';
            }
            else if ($.trim(matchs) === ',') {
                return '","';
            }
            else if (matchs === ']') {
                return '"]';
            }
        });
        if (typeof window.adStore === 'undefined') {
            window.adStore = {};
        }
        json = JSON.parse(res);
        index = ratioRnd();
        arr.push('adStore["' + json[index] + '"]');
        arr.push('=');
        arr.push('"' + json[index] + '"');
        el.className = json[index] + '_div';
        script.type = 'text/javascript';
        script.innerHTML = arr.join('');
        $(elem).html('').append(el);
        $(el).append(script);
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var adStr = $(elem).attr('ads');
        loadAd(elem, adStr);
    };
    return customElem;
});
