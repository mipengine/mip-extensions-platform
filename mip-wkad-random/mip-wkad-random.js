/**
* 寻医问药mip改造 分流广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.08.09
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var ratioRnd = function (array) {
        var rand = Math.random();
        var length = array.length;
        var total = 0;
        for (var i = 0; i < length; i++) {
            if (!i) {
                if (rand < array[0]) {
                    return 0;
                }
            }
           else {
                total = array.slice(0, i + 1).reduce(function (prev, next) {
                    return prev + next;
                });
                if (rand < total) {
                    return i;
                }
            }
        }
    };
    var loadAd = function (elem, content, index) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = null;
        var arr = [];
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
        arr.push('adStore["' + json[index] + '"]');
        arr.push('=');
        arr.push('"' + json[index] + '"');
        el.className = json[index] + '_div';
        script.type = 'text/javascript';
        script.innerHTML = arr.join('');
        $(elem).append(el);
        $(el).append(script);
    };
    // firstInviewCallback  方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.firstInviewCallback = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var ratio = $(elem).attr('ratio').split(/%,?/);
        var adStr = $(elem).attr('ads');
        var exAdStr = $(elem).attr('extra');
        var ratioArr = null;
        var idx = 0;
        ratioArr = ratio.slice(0, ratio.length - 1).map(function (value) {
            return parseFloat(value) / 100;
        });
        idx = ratioRnd(ratioArr);
        loadAd(elem, adStr, idx);
        if (exAdStr) {
            loadAd(elem, exAdStr, idx);
        }
    };
    return customElem;
});
