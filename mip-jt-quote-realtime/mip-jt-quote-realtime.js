/**
 * @file mip-jt-quote-realtime 组件
 * @author jt
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var codes = $('#realTimeCodes').val();

        fetch('https://api.jijinhao.com/quoteCenter/realTime.htm?codes=' + codes + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);
            var codeArray = codes.split(',');
            for (var i = 0; i < codeArray.length; i++) {
                var code = codeArray[i];
                var jsonData = quoteJson[code];

                var quoteItemList = $('#' + code + '_contain').children();
                for (var j = 0; j < quoteItemList.length; j++) {
                    var quoteItem = quoteItemList[j];
                    var id = $(quoteItem).attr('id');

                    if (id !== undefined && id !== '') {
                        var qKey = id.replace(code + '_', '');
                        var qValue = jsonData[qKey];
                        if (qValue !== undefined && qKey !== 'time') {
                            $('#' + id).html(qValue);
                        }
                        else {
                            var updateTimeStr = formatDate(new Date(jsonData.time), 'yyyy-MM-dd hh:mm:ss');
                            $('#' + id).html(updateTimeStr);
                        }
                    }
                }

            }
        });

        function formatDate(date, fmt) {
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
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
