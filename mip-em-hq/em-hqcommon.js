/**
 * @file 东方财富行情自有业务组件
 * @author www.eastmoney.com技术部
 */

define(function (require) {
    var module = {};
    var $ = require('zepto');
    module.getValueWithUnit = function (val) {
        var unit = '';
        if (isNaN(val)) {
            return '-';
        }
        else if (val >= 1e4) {
            val = parseFloat(val);
            if (val >= 1e8) {
                val = val / 1e8;
                var valInt = parseInt(val, 10);
                if (valInt >= 1e3) {
                    val = valInt;
                }
                else if (valInt >= 100) {
                    val = val.toFixed(1);
                }
                else {
                    val = val.toFixed(2);
                }
                unit = '亿';
            }
            else {
                val = val / 1e4;
                var valInt = parseInt(val, 10);
                if (valInt >= 1e3) {
                    val = valInt;
                }
                else if (valInt >= 100) {
                    val = val.toFixed(1);
                }
                else {
                    val = val.toFixed(2);
                }
                unit = '万';
            }
            return val + unit;
        }
        else {
            return val;
        }
    };

    module.getIntValue = function (val) {
        var unit = '';
        if (isNaN(val)) {
            return '-';
        }
        else {
            val = parseFloat(val);
            if (val >= 1e8) {
                val = val / 1e8;
                var valInt = parseInt(val, 10);
                if (valInt >= 1e3) {
                    val = valInt;
                }
                else if (valInt >= 100) {
                    val = val.toFixed(1);
                }
                else {
                    val = val.toFixed(2);
                }
                unit = '亿';
                return val + unit;
            }
            else {
                return val.toFixed(0);
            }
        }
    };

    module.getMkt = function (sc) {
        var i = sc.substring(0, 1);
        var j = sc.substring(0, 3);
        if (i === '5' || i === '6' || i === '9') {
            return '1';
        }
        else {
            if (j === '009' || j === '126' || j === '110') {
                return '1';
            }
            else {
                return '2';
            }
        }
    };
    module.jsonP = function (url, successMethod, errorMethod) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            success: successMethod,
            error: errorMethod
        });
    };
    module.getQueryString = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };
    module.getJiduByDate = function (date) {
        var jidu = '';
        var m = date.split('-')[1];
        switch (m) {
            case '03':
                jidu = '(一)';
                break;
            case '06':
                jidu = '(二)';
                break;
            case '09':
                jidu = '(三)';
                break;
            case '12':
                jidu = '(四)';
                break;
        }
        return jidu;
    };
    return module;
});
