/**
 * @file mip-jt-quote-realtime 组件
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var codes = ele.getAttribute('codes');
        var ids = ele.getAttribute('ids');

        if (codes === undefined || codes === null || ids === undefined || ids === null) {
            return;
        }

        // 特殊颜色控制，比如涨跌幅涨跌额的颜色是根据现价和昨收比较得出的
        var specalColorMap = {'q70': ['q63', 'q2'], 'q80': ['q63', 'q2']};

        // 和价格相关的字段（历史报价或成交价，颜色直接和昨收比较，小数点和现价的保持一致）
        var colorSet = {'q1': true, 'q3': true, 'q4': true, 'q63': true, 'q5': true, 'q6': true, 'q9': true,
                    'q10': true, 'q13': true, 'q14': true, 'q17': true, 'q18': true, 'q21': true, 'q22': true,
                    'q27': true, 'q28': true, 'q73': true, 'q74': true};

        fetch('https://api.jijinhao.com/quoteCenter/realTime.htm?codes=' + codes + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);

            var codeArray = codes.split(',');
            var idArray = ids.split(',');
            for (var i = 0; i < codeArray.length; i++) {
                var code = codeArray[i];
                var jsonData = quoteJson[code];

                var digits = 2;
                if (jsonData.digits !== undefined && jsonData.digits !== 'NaN.undefined') {
                    digits = jsonData.digits;
                }

                for (var j = 0; j < idArray.length; j++) {
                    var type = idArray[j];
                    var id = code + '_' + type;

                    if (jsonData[type] === undefined || $('#' + id).length <= 0) {
                        continue;
                    }

                    var valueStr = undefined;
                    var textColor = undefined;

                    if (type === 'updateTime') {
                        // 判断属性updateTime元素对应的属性,有值则根据给定的值格式化日期
                        var dateFormat = $('#' + id).attr('dateFormat');
                        if (dateFormat === undefined) {
                            dateFormat = 'yyyy-MM-dd HH:mm:ss';
                        }
                        valueStr = formatDate(new Date(jsonData.time), dateFormat);
                    } else {
                        // valueStr = jsonData[type];
                        if (colorSet[type]) {
                            textColor = getColor(type, 'q2', jsonData);
                        } else if (specalColorMap[type] !== undefined) {
                            textColor = getColor('q63', 'q2', jsonData);
                        }

                        if (colorSet[type]) {
                            valueStr = format(jsonData[type], digits);
                        } else if (type === 'q70') {
                            valueStr = format(jsonData.q70, digits);
                        } else if (type === 'q80') {
                            valueStr = format(jsonData.q80, 2) + '%';
                        }
                    }
                    $('#' + id).addClass(textColor);
                    $('#' + id).html(valueStr);
                }

            }

        });

        function format(s, n) {
            if (n === 0) {
                var temp = Math.round(s);
                if (temp === 'NaN.undefined') {
                    temp = s;
                }
                return temp;
            } else {
                n = n >= 0 && n <= 20 ? n : 2;
                s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
                var l = s.split('.')[0].split('').reverse();
                var r = s.split('.')[1];
                var t = '';
                for (var i = 0; i < l.length; i++) {
                    t += l[i];
                }
                return t.split('').reverse().join('') + '.' + r;
            }
        }

        function getColor(valueType, preCloseType, data) {
            var value = data[valueType];
            var preClose = data[preCloseType];
            if (value === undefined || preCloseType === undefined) {
                return;
            }
            if (value > preClose) {
                return 'red';
            } else if (value < preClose) {
                return 'green';
            }
        }

        function formatDate(date, fmt) {
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
						? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return fmt;
        }

    };
    return customElement;
});
