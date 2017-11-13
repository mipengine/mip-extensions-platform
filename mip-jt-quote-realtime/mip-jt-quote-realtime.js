/**
 * @file mip-jt-quote-realtime 组件
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

    function renderRealTime(codes, ids, domianApi) {
        if (codes === undefined || codes === null || ids === undefined || ids === null) {
            return;
        }

        fetch(domianApi + '/realTime.htm?codes=' + codes + '&dataType=json').then(function (res) {
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
                        } else {
                            valueStr = jsonData[type];
                        }
                    }

                    $('#' + id).addClass(textColor);
                    $('#' + id).html(valueStr);
                }
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
            } else {
                break;
            }
        }

        if (alinkUrl === undefined || alinkUrl === '') {
            return quote[val];
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
        var categoryIds = ele.getAttribute('categoryIds');
        var linkUrl = ele.getAttribute('linkUrl');
        window.quoteDomain = ele.getAttribute('quoteDomain');

        if (codes !== undefined && codes !== null) {
            renderRealTime(codes, ids, linkUrl);
        } else if (categoryIds !== undefined && categoryIds !== null) {
            var ids = ele.getAttribute('ids');
            var domianApi = ele.getAttribute('domianApi');
            var linkUrl = ele.getAttribute('linkUrl');
            var pageNum = ele.getAttribute('pageNum');
            var pageSize = ele.getAttribute('pageSize');
            var sortFiled = ele.getAttribute('sortFiled');
            var direction = ele.getAttribute('direction');
            var linkUrlJson = ele.getAttribute('linkUrlJson');
            var boardId = ele.getAttribute('boardId');
            console.info(categoryIds, ids, domianApi);
            if (!categoryIds || !ids || !domianApi) {
                console.error('参数非法！！！');
                return;
            }
            if (linkUrlJson !== undefined || linkUrlJson !== '') {
                linkUrlJson = JSON.parse(linkUrlJson);
            }
            var queryUrl = getSortUrl(domianApi, categoryIds, sortFiled, pageSize, pageNum, direction, boardId);
            renderSort(queryUrl, categoryIds, ids, linkUrl, linkUrlJson);
        } else {
            readerQuote();
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

    function readerQuote() {
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.src = 'https://res.cngoldres.com/quote/js/quote_realTime.js';
        document.getElementsByTagName('head')[0].appendChild(c);
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
