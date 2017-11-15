/**
 * @file mip-jt-quote-rt 获取行情排序组件
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('zepto');

    var specalColorMap = {'q70': ['q63', 'q2'], 'q80': ['q63', 'q2']};

    var colorSet = {'q1': true, 'q3': true, 'q4': true, 'q63': true, 'q5': true, 'q6': true, 'q9': true,
                'q10': true, 'q13': true, 'q14': true, 'q17': true, 'q18': true, 'q21': true, 'q22': true,
                'q27': true, 'q28': true, 'q73': true, 'q74': true, 'q83': true, 'q84': true, 'q85': true,
                'q86': true};

    function renderRealTime(codes, ids, domain, updateTimeId, dateFormat) {
        if (codes === undefined || codes === null || ids === undefined || ids === null) {
            return;
        }

        if (dateFormat === undefined || dateFormat === null) {
            dateFormat = 'yyyy-MM-dd HH:mm:ss';
        }

        fetch(domain + '/quoteCenter/realTime.htm?codes=' + codes + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);

            var codeArray = codes.split(',');
            var idArray = ids.split(',');
            var maxTime = 0;
            for (var i = 0; i < codeArray.length; i++) {
                var code = codeArray[i];
                var jsonData = quoteJson[code];

                if (jsonData === undefined) {
                    continue;
                }

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

                    if (maxTime < jsonData.time) {
                        maxTime = jsonData.time;
                    }

                    var valueStr = undefined;
                    var textColor = undefined;

                    if (type === 'updateTime') {
                        var customDateFormat = $('#' + id).attr('dateFormat');
                        if (customDateFormat === undefined || customDateFormat === null) {
                            customDateFormat = dateFormat;
                        }
                        valueStr = formatDate(new Date(jsonData.time), customDateFormat);
                    } else {
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
                        } else {
                            valueStr = jsonData[type];
                        }
                    }

                    $('#' + id).addClass(textColor);
                    $('#' + id).html(valueStr);
                }

            }

            if (updateTimeId !== undefined && updateTimeId !== null) {
                var str = formatDate(new Date(maxTime), dateFormat);
                $('#' + updateTimeId).html(str);
            }

        });
    }

    function getSortUrl(domianApi, categoryIds, sortFiled, pageSize, pageNum, direction, boardId) {
        if (sortFiled === undefined || sortFiled === null) {
            sortFiled = '80';
        }
        if (pageSize === undefined || pageSize === null || pageSize === 0) {
            pageSize = 6;
        }
        if (pageNum === undefined || pageNum === null || pageNum === 0) {
            pageNum = 10;
        }
        if (direction === undefined || direction === null) {
            direction = 'desc';
        }
        var queryUrl = domianApi + '/sortQuote/categorySort.htm?categoryIds=' + categoryIds + '&sortFiled=' + sortFiled
                        + '&pageSize=' + pageSize + '&dataType=json&currentPage=' + pageNum + '&direction=' + direction;
        if (boardId !== undefined && boardId !== null) {
            queryUrl += '&boardId=' + boardId;
        }

        return queryUrl;
    }

    function renderSort(queryUrl, categoryIds, ids, linkUrl, linkUrlJson) {
        var newTime = 0;
        try {
            fetch(queryUrl).then(function (res) {
                return res.text();
            }).then(function (text) {
                var parse = JSON.parse(text);
                var data = parse[0].data;
                var categoryIdsReplace = categoryIds.replace(/,/g, '_');
                var idsArry = ids.split(',');
                $.each(data, function (index, val) {
                    var quote = val.quote;
                    var digits = 2;
                    var time = quote.q59;
                    if (typeof (time) !== 'undefined') {
                        if (new Date(time).getTime() > newTime) {
                            newTime = time;
                        }
                    }
                    digits = quote.digits;
                    if (isNaN(digits)) {
                        digits = 2;
                    }
                    index += 1;
                    $.each(idsArry, function (idsIndex, val) {
                        var textColor = undefined;
                        var valueStr = undefined;
                        if (colorSet[val]) {
                            textColor = getColor(val, 'q2', quote);
                        } else if (specalColorMap[val] !== undefined) {
                            textColor = getColor('q63', 'q2', quote);
                        }

                        if (colorSet[val]) {
                            valueStr = format(quote[val], digits);
                        } else if (val === 'q70') {
                            valueStr = format(quote[val], digits);
                        } else if (val === 'q80') {
                            valueStr = format(quote[val], 2) + '%';
                        } else {
                            valueStr = quote[val];
                        }
                        if (val === 'q68' || val === 'q67') {
                            var alinkUrl = linkUrl;
                            var ahtml = dealALinkUrl(alinkUrl, quote, val, linkUrlJson);
                            $('#' + index + '_' + categoryIdsReplace + '_' + val).html(ahtml);
                        } else {
                            $('#' + index + '_' + categoryIdsReplace + '_' + val).html(valueStr);
                        }
                        $('#' + index + '_' + categoryIdsReplace + '_' + val).addClass(textColor);
                    });

                    var dateFormat = $('#' + categoryIdsReplace + '_updateTime').attr('dateFormat');
                    if (dateFormat === undefined) {
                        dateFormat = 'yyyy-MM-dd HH:mm:ss';
                    }
                    $('#' + categoryIdsReplace + '_updateTime').html('更新时间  ' + formatDate(new Date(time), dateFormat));



                });
            });
        } catch (e) {
            console.error('获取数据错误异常' + e);
            return;
        }
    }

    function dealALinkUrl(alinkUrl, quote, val, linkUrlJson) {
        if (alinkUrl === undefined || alinkUrl === null || alinkUrl === '') {
            return quote[val];
        }
        while (true) {
            var num1 = alinkUrl.indexOf('{');
            if (num1 > -1) {
                var num2 = alinkUrl.indexOf('}');
                var key = alinkUrl.substring(num1 + 1, num2);
                var value = quote[key];
                if (linkUrlJson !== '' && linkUrlJson !== undefined) {
                    if (linkUrlJson[value] !== undefined) {
                        alinkUrl = alinkUrl.replace(alinkUrl.substring(num1, num2 + 1), linkUrlJson[value]);
                        continue;
                    }
                }
                alinkUrl = alinkUrl.replace(alinkUrl.substring(num1, num2 + 1), value);
                console.info(alinkUrl);
            } else {
                break;
            }
        }

        var returnUrl =  '<a class="blue" href="' + alinkUrl + '" title="' + quote[val] + '" target="_blank">';
        returnUrl = returnUrl + quote[val] + '</a>';
        return returnUrl;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var codes = ele.getAttribute('codes');
        var ids = ele.getAttribute('ids');

        if (codes !== undefined && codes !== null) {
            var domain = ele.getAttribute('domain');
            var updateTimeId = ele.getAttribute('updateTimeId');
            var dateFormat = ele.getAttribute('dateFormat');
            renderRealTime(codes, ids, domain, updateTimeId, dateFormat);
        } else {
            var categoryIds = ele.getAttribute('categoryIds');
            var ids = ele.getAttribute('ids');
            var domain = ele.getAttribute('domain');
            var linkUrl = ele.getAttribute('linkUrl');
            var pageNum = ele.getAttribute('pageNum');
            var pageSize = ele.getAttribute('pageSize');
            var sortFiled = ele.getAttribute('sortFiled');
            var direction = ele.getAttribute('direction');
            var linkUrlJson = ele.getAttribute('linkUrlJson');
            var boardId = ele.getAttribute('boardId');
            if (!categoryIds || !ids || !domain) {
                console.error('参数非法！！！');
                return;
            }
            if (linkUrlJson !== undefined || linkUrlJson !== '') {
                linkUrlJson = JSON.parse(linkUrlJson);
            }
            var queryUrl = getSortUrl(domain, categoryIds, sortFiled, pageSize, pageNum, direction, boardId);
            renderSort(queryUrl, categoryIds, ids, linkUrl, linkUrlJson);
        }

    };

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
        value = parseFloat(value);
        preClose = parseFloat(preClose);
        if (value === undefined || preClose === undefined || isNaN(value) || isNaN(preClose)) {
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

    return customElement;
});
