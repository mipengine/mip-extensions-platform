/**
* 寻医问药点击和展示量统计组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.10.26
* @version 1.0.0
*/
define(function (require) {
    var customElem = require('customElement').create();
    customElem.prototype.firstInviewCallback = function () {
        var elem = this.element;
        var items = elem.getAttribute('items');
        var parseJSON = function (jsonStr) {
            return JSON.parse(jsonStr.replace(/\'|\s+/g, '').replace(/(\d+),(.+)\]/g, '"$1","$2"]'));
        };
        var params = [];
        if (items) {
            params = parseJSON(items);
            setTimeout(function () {
                window.__sendVisitOdm(params[0], params[1]);
            }, 1000);
        }
        this.addEventAction('send', function (e, str) {
            var args = parseJSON(str);
            window.__sendClickOdm(args[0], e.target, args[1]);
        });
    };
    return customElem;
});
