/**
 * @file mip-jt-quote-his 历史组件
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
        // 调用/history/接口
        var codes = ele.getAttribute('codes');
        // 调用/quoteCenter/接口
        var code = ele.getAttribute('code');
        var ids = ele.getAttribute('ids');
        var domain = ele.getAttribute('domain');
        var style = ele.getAttribute('style');
        var currentPage = ele.getAttribute('currentPage');
        var pageSize = ele.getAttribute('pageSize');
        var digits = ele.getAttribute('digits');
        var dateFormat = ele.getAttribute('dateFormat');

        var codesFlag = (codes !== undefined && codes !== null);
        var url = getUrl(domain, currentPage, pageSize, style, codesFlag ? codes : code, codesFlag);

        fetch(url).then(function (res) {
            return res.text();
        }).then(function (text) {
            var jsonData = JSON.parse(text);
            var idArray = ids.split(',');
            if (codesFlag) {
                var quoteDataList = jsonData[0].data;
                for (var i = 0; i < quoteDataList.length; i++) {
                    var quoteData = quoteDataList[i];
                    if (quoteData === undefined || quoteData === null
                        || quoteData.quote === undefined || quoteData.quote === null) {
                        continue;
                    }
                    var result = quoteData.quote;
                    if (result.q124 === undefined || result.q124 === null) {
                        continue;
                    }

                    for (var j = 0; j < idArray.length; j++) {
                        var renderId = idArray[j];
                        var index = i + 1;
                        if (result[renderId] === undefined || result[renderId] === null) {
                            continue;
                        }
                        var renderValue = '';
                        if (renderId === 'q70' || renderId === 'q80') {
                            var textColor = '';
                            if (result[renderId] > 0) {
                                textColor = 'red';
                            } else if (result[renderId] < 0) {
                                textColor = 'green';
                            }
                            $('#' + index + '_' + result.q124 + '_' + renderId).addClass(textColor);
                            renderValue = result[renderId];
                        } else if (renderId === 'q59' && dateFormat !== undefined && dateFormat !== null) {
                            var date = new Date(Date.parse(result.q59.replace(/-/g, '/')));
                            var dateFormatStr = formatDate(date, dateFormat);
                            renderValue = dateFormatStr;
                        } else {
                            renderValue = result[renderId];
                        }
                        $('#' + index + '_' + result.q124 + '_' + renderId).html(renderValue);
                    }
                }
            } else {
            }
        });
    };

    function getUrl(domain, currentPage, pageSize, style, codeOrCodes, codesFlag) {
        if (currentPage === undefined || currentPage === null || currentPage === 0) {
            currentPage = 1;
        }
        if (pageSize === undefined || pageSize === null || pageSize === 0) {
            pageSize = 10;
        }
        if (style === undefined || style === null) {
            style = 3;
        }

        var url = domain + (codesFlag ? '/history/quote.htm?codes=' : '/quoteCenter/history.htm?dataType=json&code=');
        url = url + codeOrCodes;
        url = url + '&currentPage=' + currentPage;
        url = url + '&pageSize=' + pageSize;
        url = url + '&style=' + style;

        return url;
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
