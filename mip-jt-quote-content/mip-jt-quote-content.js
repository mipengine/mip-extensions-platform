/**
 * @file mip-jt-quote-content 组件
 * @author
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var marketUrl = '';
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
    function format(s, n) {
        s = parseFloat(s, 10);
        n = parseInt(n, 10);
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
    var refreshHq = function (HqData) {
        var hv = '';
        var ov = '';
        var lv = '';
        var pc = '';
        var uc = '';
        var pt = '';
        if (HqData !== undefined) {
            var q3 = '';
            var q2 = '';
            var q1 = '';
            var q4 = '';
            var statusStr = '';
            var digits = HqData.fixed;
            var showName = HqData.name;
            q3 = format(HqData.high, digits);
            q2 = format(HqData.prevclose, digits);
            q1 = format(HqData.open, digits);
            q4 = format(HqData.low, digits);
            if (q3 !== 0) {
                if (parseFloat(q3) > parseFloat(q2)) {
                    hv = '<span>最高</span> <em class="red">' + q3 + '</em>';
                }
                else if (parseFloat(q3) < parseFloat(q2)) {
                    hv = '<span>最高</span> <em class="green">' + q3 + '</em>';
                }
                else {
                    hv = '<span>最高</span> <em>' + q3 + '</em>';
                }
            }
            else {
                hv = '<span>最高</span> <em>----</em>';
            }

            if (q1 !== 0) {
                if (parseFloat(q1) > parseFloat(q2)) {
                    ov = '<span>开盘</span> <em class="red">' + q1 + '</em>';
                }
                else if (parseFloat(q1) < parseFloat(q2)) {
                    ov = '<span>开盘</span> <em class="green">' + q1 + '</em>';
                }
                else {
                    ov = '<span>开盘</span> <em>' + q1 + '</em>';
                }
            }
            else {
                ov = '<span>开盘</span> <i>----</i>';
            }
            if (q4 !== 0) {
                if (parseFloat(q4) > parseFloat(q2)) {
                    lv = '<span>最低</span> <em class="red">' + q4 + '</em>';
                }
                else if (parseFloat(q4) < parseFloat(q2)) {
                    lv = '<span>最低</span> <em class="green">' + q4 + '</em>';
                }
                else {
                    lv = '<span>最低</span> <em>' + q4 + '</em>';
                }
            }
            else {
                lv = '<span>最低</span> <em>----</em>';
            }

            if (HqData.price !== undefined && HqData.prevclose !== undefined) {
                var q63 = '';
                var q2 = '';
                var q70 = '';
                var q80 = '';
                q63 = format(HqData.price, digits);
                q2 = format(HqData.prevclose, digits);
                q70 = format(parseFloat(HqData.pricedownPrice), digits);
                q80 = format(HqData.pricedownPrecent, 2);

                if (isNaN(q63)) {
                    q63 = '----';
                }
                if (isNaN(q70)) {
                    q70 = '----';
                }
                if (isNaN(q2)) {
                    q2 = '----';
                }
                if (isNaN(q80)) {
                    q80 = '----';
                }
                $('#fixed-nav-color').removeClass('red');
                $('#fixed-nav-color').removeClass('green');
                $('#fixed-nav-color').removeClass('grey');

                if (parseFloat(q63) > parseFloat(q2)) {
                    $('#fixed-nav-color').addClass('red');
                    pc = '<em class="red">' + q63 + '</em>';
                    uc = '<em class="red">' + q70 + '</em>';
                    pt = '<em class="red">' + q80 + '%</em>';
                }
                else if (parseFloat(q63) < parseFloat(q2)) {
                    $('#fixed-nav-color').addClass('green');
                    pc = '<em class="green">' + q63 + '</em>';
                    uc = '<em class="green">' + q70 + '</em>';
                    pt = '<em class="green">' + q80 + '%</em>';
                }
                else {
                    $('#fixed-nav-color').addClass('grey');
                    pc = '<em>' + q63 + '</em>';
                    uc = '<em>' + q70 + '</em>';
                    pt = '<em>' + q80 + '%</em>';
                }
            }
            var quoteToday =  HqData.quoteToday;
            var quoteTime = HqData.quotetime;
            if (typeof (quoteTime) === 'undefined' || quoteTime === 'aN:aN:aN') {
                quoteTime = '----';
            }
            if (typeof (quoteToday) === 'undefined' || quoteToday === 'NaN-aN-aN') {
                quoteToday = '----';
            }
            if (parseInt(HqData.status, 10) === 110) {
                statusStr = '(休市&nbsp;&nbsp;' + quoteToday + '&nbsp' + quoteTime + ')';
            }
            else if (parseInt(HqData.status, 10) === 120) {
                statusStr = '(已收盘&nbsp;&nbsp;' + quoteToday + '&nbsp' + quoteTime + ')';
            }
            else {
                statusStr = '(交易中&nbsp;&nbsp;' + quoteToday + '&nbsp' + quoteTime + ')';
            }
            $('#lsHeader .stockPercent').html(pt);
            $('#lsHeader .stockPrice').html(pc);
            $('#lsHeader .stockName').html(showName);
            if (isNaN(q2)) {
                q2 = '----';
            }
            $('#yts').val(q2);
            var quoteUpdownfixed = q70 > 0 ? ('+' + q70) : q70;
            if (isNaN(quoteUpdownfixed)) {
                quoteUpdownfixed = '----';
            }
            var quotePercentfixed = '';
            if (isNaN(q80)) {
                quotePercentfixed = '----';
            }
            else {
                quotePercentfixed = q80 > 0 ? ('+' + q80 + '%') : (q80 + '%');
            }
            $('#quotePricefixed').html(q63);
            $('#quotePriceAndUnit').html(q63);
            $('#quoteUpdownfixed').html(quoteUpdownfixed);
            $('#quotePercentfixed').html(quotePercentfixed);
            $('#quotePrice').html(pc);
            $('#quoteUpdown').html(uc);
            $('#quotePercent').html(pt);
            $('#highVal').html(hv);
            $('#openVal').html(ov);
            $('#lowVal').html(lv);
            $('#closeVal').html('<span>收盘</span> <em>' + q2 + '</em>');
            $('#timeShow').html(statusStr);
        }
        else {
            $('#lsHeader .stockPercent').html('<em>----</em>');
            $('#lsHeader .stockPrice').html('<em>----</em>');
            $('#lsHeader .stockName').html('<em>----</em>');
            $('#yts').val('----');
            $('#quoteUpdownfixed').html('<em>----</em>');
            $('#quotePriceAndUnit').html('<em>----</em>');
            $('#quotePercentfixed').html('<em>----</em>');
            $('#quotePrice').html('<em>----</em>');
            $('#quoteUpdown').html('<em>----</em>');
            $('#quotePercent').html('<em>----</em>');
            $('#highVal').html('<span>最高</span> <em>----</em>');
            $('#openVal').html('<span>开盘</span> <em>----</em>');
            $('#lowVal').html('<span>最低</span> <em>----</em>');
            $('#closeVal').html('<span>收盘</span> <em>----</em>');
            $('#timeShow').html('--' + formatDate(new Date(new Date().getTime()), 'yyyy-MM-dd HH:mm:ss'));
        }

        if (marketUrl === 'xnhb' || marketUrl === 'jjs') {
            refreshJjsFive();
        }
    };
    function refreshJjsFive() {
        var code = $('#currentCode').val();
        var url = 'https://api.jijinhao.com/quoteCenter/realTime.htm';
        url += '?codes=' + code;
        fetch(url + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);
            var data = quoteJson[code];
            var digits = data.digits;
            var fiveGradeDigits = 0;
            if (marketUrl === 'xnhb') {
                fiveGradeDigits = 4;
            }
            refershFiveGradeQuote(data.q5, data.q2, 'buyPrice1', true, digits);
            refershFiveGradeQuote(data.q7, data.q2, 'buyVol1', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q9, data.q2, 'buyPrice2', true, digits);
            refershFiveGradeQuote(data.q11, data.q2, 'buyVol2', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q13, data.q2, 'buyPrice3', true, digits);
            refershFiveGradeQuote(data.q15, data.q2, 'buyVol3', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q17, data.q2, 'buyPrice4', true, digits);
            refershFiveGradeQuote(data.q19, data.q2, 'buyVol4', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q21, data.q2, 'buyPrice5', true, digits);
            refershFiveGradeQuote(data.q23, data.q2, 'buyVol5', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q6, data.q2, 'sellPrice1', true, digits);
            refershFiveGradeQuote(data.q8, data.q2, 'sellVol1', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q10, data.q2, 'sellPrice2', true, digits);
            refershFiveGradeQuote(data.q12, data.q2, 'sellVol2', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q14, data.q2, 'sellPrice3', true, digits);
            refershFiveGradeQuote(data.q16, data.q2, 'sellVol3', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q18, data.q2, 'sellPrice4', true, digits);
            refershFiveGradeQuote(data.q20, data.q2, 'sellVol4', false, fiveGradeDigits);
            refershFiveGradeQuote(data.q22, data.q2, 'sellPrice5', true, digits);
            refershFiveGradeQuote(data.q24, data.q2, 'sellVol5', false, fiveGradeDigits);
        });
    }

    function refershFiveGradeQuote(price, prePrice, itemId, changeColor, fixed) {
        var color = '';
        if (changeColor) {
            if (parseFloat(price) < parseFloat(prePrice)) {
                color = 'sell_green';
            }
            else if (parseFloat(price) > parseFloat(prePrice)) {
                color = 'buy_red';
            }
        }

        if (price === undefined || price === 0) {
            price = '----';
        }
        else {
            price = format(price, fixed);
        }
        $('#' + itemId).html(price);
        $('#' + itemId).attr('class', color + ' wudang_p');
    }
    var symbolFlagSet = {'ghzhj1': 'ghzhj2', 'ghzby1': 'ghzby2', 'ghzpt1': 'ghzpt2', 'ghzpd1': 'ghzpd2',
                            'jh9999': 'jhzhj3', 'jhzby1': 'jhzby3', 'jhzpt1': 'jhzpt3',
                            'ghzhj2': 'ghzhj1', 'ghzby2': 'ghzby1', 'ghzpt2': 'ghzpt1', 'ghzpd2': 'ghzpd1',
                            'jhzhj3': 'jh9999', 'jhzby3': 'jhzby1', 'jhzpt3': 'jhzpt1'};
    function load() {
        var originalCode = $('#originalCode').val();
        symbolH(originalCode, 1);
        symbolB(originalCode, 1);
    }
    var isChanging = false;
    function change() {
        if (!isChanging) {
            isChanging = true;
            setTimeout(
                function () {
                    isChanging = false;
                }, 1000);
            var isCalc = $('#isCalc').val();
            var changeFlag = $('#changeFlag').val();
            symbolH(changeFlag, 2, isCalc);
            symbolB(changeFlag, 2, isCalc);
        }
    }
    function symbolH(code, type, isCalc) {
        var isCalc = $('#isCalc').val();
        var url = 'https://api.jijinhao.com/downVariety/query.htm';
        if (type === 1) {
            var currentCode = $('#currentCode').val();
            url += '?codes=' + currentCode;
        }
        else if (type === 2) {
            if (code === 'selfChange' || code === '') {
                code = $('#originalCode').val();
                url += '?codes=' + code;
            }
            else {
                url += '?codes=' + code;
                var changeFlag = $('#changeFlag').val();
                if (changeFlag === $('#originalCode').val()) {
                    $('#changeFlag').val($('#originalChangeFlag').val());
                    $('#currentCode').val(code);
                }
                else {
                    $('#changeFlag').val(('#originalCode').val());
                    $('#currentCode').val(code);
                }
            }
        }
        fetch(url).then(function (res) {
            return res.text();
        }).then(function (text) {
            text = text.substring(text.indexOf('{'));
            var quoteJson = JSON.parse(text);
            var data = quoteJson[code];
            if (data !== undefined) {
                if ($('#originalChangeFlag').val() === 'selfChange') {
                    if (type === 1) {
                        if (isCalc === '1') {
                            $('#quoteUnit').html('元/克');
                        }
                        else if (isCalc === '0') {
                            $('#quoteUnit').html('美元/盎司');
                        }
                    }
                    else if (type === 2) {
                        if (isCalc === '0') {
                            $('#quoteUnit').html('元/克');
                        }
                        else if (isCalc === '1') {
                            $('#quoteUnit').html('美元/盎司');
                        }
                    }
                }
                else {
                    if ($('#currentCode').val() === 'JO_143251') {
                        $('#quoteUnit').html('人民币');
                    }
                    else if ($('#currentCode').val() === 'JO_143252') {
                        $('#quoteUnit').html('美元');
                    }
                    else {
                        if (data.unit !== 'null') {
                            $('#quoteUnit').html(data.unit);
                        }
                    }
                }
                var showName = data.showName;
                var unit = data.code;
                if (showName === '' || showName === undefined) {
                    showName = '----';
                }
                if (unit === '' || unit === undefined) {
                    unit = '----';
                }
                $('#quoteTitle').html(showName);
                $('#quoteTitlefixed').html(showName);
                $('#quoteCode').html(unit);
            }
        });
    }
    function symbolB(code, type, isCalc) {
        var url = 'https://api.jijinhao.com/quoteCenter/realTime.htm';
        if (code === 'selfChange') {
            code = $('#originalCode').val();
            url += '?codes=' + code;
            if (type === 1) {
                if (isCalc === '0') {
                }
                else {
                    url += '&isCalc=true';
                }
            }
            else if (type === 2) {
                if (isCalc === '0') {
                    url += '&isCalc=true';
                    $('#isCalc').val('1');
                }
                else {
                    $('#isCalc').val('0');
                }
            }
        }
        else {
            url += '?codes=' + code;
            if (isCalc === '1') {
                url += '&isCalc=true';
            }
        }
        fetch(url + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);
            var data = quoteJson[code];
            var hv = '----';
            var ov = '----';
            var lv = '----';
            var pc = '----';
            var uc = '----';
            var pt = '----';
            if (data !== undefined) {
                var q3 = '';
                var q2 = '';
                var q1 = '';
                var q4 = '';
                var statusStr = '';
                var digits = data.digits;
                q3 = format(data.q3, digits);
                q2 = format(data.q2, digits);
                q1 = format(data.q1, digits);
                q4 = format(data.q4, digits);
                if (!isNaN(q3)) {
                    if (parseFloat(q3) > parseFloat(q2)) {
                        hv = '<span>最高</span> <em class="red">' + q3 + '</em>';
                    }
                    else if (parseFloat(q3) < parseFloat(q2)) {
                        hv = '<span>最高</span> <em class="green">' + q3 + '</em>';
                    }
                    else {
                        hv = '<span>最高</span> <em>' + q3 + '</em>';
                    }
                }
                else {
                    hv = '<span>最高</span> <em>----</em>';
                }
                if (!isNaN(q1)) {
                    if (parseFloat(q1) > parseFloat(q2)) {
                        ov = '<span>开盘</span> <em class="red">' + q1 + '</em>';
                    }
                    else if (parseFloat(q1) < parseFloat(q2)) {
                        ov = '<span>开盘</span> <em class="green">' + q1 + '</em>';
                    }
                    else {
                        ov = '<span>开盘</span> <em>' + q1 + '</em>';
                    }
                }
                else {
                    ov = '<span>开盘</span> <em>----</em>';
                }
                if (!isNaN(q4)) {
                    if (parseFloat(q4) > parseFloat(q2)) {
                        lv = '<span>最低</span> <em class="red">' + q4 + '</em>';
                    }
                    else if (parseFloat(q4) < parseFloat(q2)) {
                        lv = '<span>最低</span> <em class="green">' + q4 + '</em>';
                    }
                    else {
                        lv = '<span>最低</span> <em>' + q4 + '</em>';
                    }
                }
                else {
                    lv = '<span>最低</span> <em>----</em>';
                }
                if (data.q63 !== undefined && data.q2 !== undefined) {
                    var q63 = '';
                    var q2 = '';
                    var q70 = '';
                    var q80 = '';
                    q63 = format(data.q63, digits);
                    q2 = format(data.q2, digits);
                    q70 = format(data.q70, digits);
                    q80 = format(data.q80, 2);
                    if (isNaN(q63)) {
                        q63 = '----';
                    }
                    if (isNaN(q70)) {
                        q70 = '----';
                    }
                    if (isNaN(q80)) {
                        q80 = '----';
                    }
                    if (parseFloat(q63) > parseFloat(q2)) {
                        $('#fixed-nav-color').addClass('red');
                        pc = '<em class="red">' + q63 + '</em>';
                        uc = '<em class="red">' + q70 + '</em>';
                        pt = '<em class="red">' + q80 + '%</em>';
                    }
                    else if (parseFloat(q63) < parseFloat(q2)) {
                        $('#fixed-nav-color').addClass('green');
                        pc = '<em class="green">' + q63 + '</em>';
                        uc = '<em class="green">' + q70 + '</em>';
                        pt = '<em class="green">' + q80 + '%</em>';
                    }
                    else {
                        $('#fixed-nav-color').addClass('grey');
                        pc = '<em>' + q63 + '</em>';
                        uc = '<em>' + q70 + '</em>';
                        pt = '<em>' + q80 + '%</em>';
                    }
                }
                else {
                    $('#fixed-nav-color').addClass('grey');
                }
                var quoteTime = data.time;
                if (isNaN(quoteTime)) {
                    quoteTime = '----';
                }
				else {
                    var dataFormat = 'yyyy-MM-dd HH:mm:ss';
                    quoteTime = formatDate(new Date(quoteTime), dataFormat);
                }
                if (parseInt(data.status, 10) === 110) {
                    statusStr = '(休市&nbsp;&nbsp;' + quoteTime + ')';
                }
                else if (parseInt(data.status, 10) === 120) {
                    statusStr = '(已收盘&nbsp;&nbsp;' + quoteTime + ')';
                }
                else {
                    statusStr = '(交易中&nbsp;&nbsp;' + quoteTime + ')';
                }
                if (isNaN(q2)) {
                    q2 = '----';
                }
                $('#yts').val(q2);
                var quoteUpdownfixed = q70 > 0 ? ('+' + q70) : q70;
                if (isNaN(quoteUpdownfixed)) {
                    quoteUpdownfixed = '----';
                }
                var quotePercentfixed = '';
                if (isNaN(q80)) {
                    quotePercentfixed = '----';
                }
                else {
                    quotePercentfixed = q80 > 0 ? ('+' + q80 + '%') : (q80 + '%');
                }
                $('#quoteUpdownfixed').html(quoteUpdownfixed);
                $('#quotePriceAndUnit').html(q63);
                $('#quotePercentfixed').html(quotePercentfixed);
                $('#quotePrice').html(pc);
                $('#quoteUpdown').html(uc);
                $('#quotePercent').html(pt);
                $('#highVal').html(hv);
                $('#openVal').html(ov);
                $('#lowVal').html(lv);
                $('#closeVal').html('<span>收盘</span> <em>' + q2 + '</em>');
                $('#timeShow').html(statusStr);
            }
            else {
                $('#yts').val('----');
                $('#quotePricefixed').html('<em>----</em>');
                $('#quotePrice').html('<em>----</em>');
                $('#quoteUpdown').html('<em>----</em>');
                $('#quotePercent').html('<em>----</em>');
                $('#quotePercentfixed').html('<em>----</em>');
                $('#highVal').html('<span>最高</span> <em>----</em>');
                $('#openVal').html('<span>开盘</span> <em>----</em>');
                $('#lowVal').html('<span>最低</span> <em>----</em>');
                $('#closeVal').html('<span>收盘</span> <em>----</em>');
                $('#timeShow').html('--' + formatDate(new Date(data.time), 'yyyy-MM-dd HH:mm:ss'));
            }
            if (marketUrl !== null && marketUrl !== undefined && (marketUrl === 'jjs' || marketUrl === 'xnhb')) {
                var fiveGradeDigits = 0;
                if (marketUrl === 'xnhb') {
                    fiveGradeDigits = 4;
                }
                refershFiveGradeQuote(data.q5, data.q2, 'buyPrice1', true, digits);
                refershFiveGradeQuote(data.q7, data.q2, 'buyVol1', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q9, data.q2, 'buyPrice2', true, digits);
                refershFiveGradeQuote(data.q11, data.q2, 'buyVol2', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q13, data.q2, 'buyPrice3', true, digits);
                refershFiveGradeQuote(data.q15, data.q2, 'buyVol3', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q17, data.q2, 'buyPrice4', true, digits);
                refershFiveGradeQuote(data.q19, data.q2, 'buyVol4', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q21, data.q2, 'buyPrice5', true, digits);
                refershFiveGradeQuote(data.q23, data.q2, 'buyVol5', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q6, data.q2, 'sellPrice1', true, digits);
                refershFiveGradeQuote(data.q8, data.q2, 'sellVol1', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q10, data.q2, 'sellPrice2', true, digits);
                refershFiveGradeQuote(data.q12, data.q2, 'sellVol2', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q14, data.q2, 'sellPrice3', true, digits);
                refershFiveGradeQuote(data.q16, data.q2, 'sellVol3', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q18, data.q2, 'sellPrice4', true, digits);
                refershFiveGradeQuote(data.q20, data.q2, 'sellVol4', false, fiveGradeDigits);
                refershFiveGradeQuote(data.q22, data.q2, 'sellPrice5', true, digits);
                refershFiveGradeQuote(data.q24, data.q2, 'sellVol5', false, fiveGradeDigits);
            }
        });
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
        }
        else if (value < preClose) {
            return 'green';
        }
    }
    var specalColorMap = {'q70': ['q63', 'q2'], 'q80': ['q63', 'q2']};
    var colorSet = {'q1': true, 'q3': true, 'q4': true, 'q63': true, 'q5': true, 'q6': true, 'q9': true,
                'q10': true, 'q13': true, 'q14': true, 'q17': true, 'q18': true, 'q21': true, 'q22': true,
                'q27': true, 'q28': true, 'q73': true, 'q74': true, 'q83': true, 'q84': true, 'q85': true,
                'q86': true};
    function renderQuote(codes, ids, updateTimeDiv, domian, cata, marUrl) {
        var timeSpan = 0;
        var url = 'https://api.jijinhao.com/quoteCenter/realTime.htm?codes=' + codes;
        fetch(url + '&dataType=json').then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);
            var codeArray = codes.split(',');
            var idArray = ids.split(',');
            var content =  '<tr class="head-tr"><td>品种</td><td>最新价</td><td>涨跌</td><td>涨跌幅</td></tr>';
            for (var i = 0; i < codeArray.length; i++) {
                if (i >= 10) {
                    break;
                }
                var code = codeArray[i];
                var jsonData = quoteJson[code];
                var digits = 2;
                if (jsonData.digits !== undefined && jsonData.digits !== 'NaN.undefined') {
                    digits = jsonData.digits;
                }
                content += '<tr>';
                for (var j = 0; j < idArray.length; j++) {
                    var type = idArray[j];
                    if (jsonData[type] === undefined) {
                        continue;
                    }
                    var valueStr = undefined;
                    var textColor = undefined;
                    if (type === 'time') {
                        var currentTimeSpan = new Date(jsonData.time).getTime();
                        timeSpan = currentTimeSpan > timeSpan ? currentTimeSpan : timeSpan;
                    }
                    else {
                        if (colorSet[type]) {
                            textColor = getColor(type, 'q2', jsonData);
                        }
                        else if (specalColorMap[type] !== undefined) {
                            textColor = getColor('q63', 'q2', jsonData);
                        }
                        if (colorSet[type]) {
                            valueStr = format(jsonData[type], digits);
                        }
                        else if (type === 'q70') {
                            valueStr = format(jsonData.q70, digits);
                        }
                        else if (type === 'q80') {
                            valueStr = format(jsonData.q80, 2) + '%';
                        }
                        else {
                            valueStr = jsonData[type];
                        }
                        if (type === 'showName') {
                            content += '<td class="type"><em><a href="' + domian + '/quote/'
                                + cata + '/' + marUrl + '_' + jsonData.showCode + '.html" title=' + jsonData.showName
                                + '><em>' + jsonData.showName + '</em></a></td>';
                        }
                        else {
                            content += '<td><em class="' + textColor + '">' + valueStr + '</em></td>';
                        }
                    }
                }
                content += '</tr>';
            }
            if (codeArray.length > 10) {
                content += '<tr><td colspan=4><a class= "see-more" href="' + domian
                    + '/quote/' + cata + '/' + marUrl + '.html">';
                content += '查看更多</a></td></tr>';
            }
            $('#' + marUrl + 'RelateCodesQhDiv').html(content);
            if (timeSpan > 0) {
                var dateFormat = 'yyyy-MM-dd HH:mm:ss';
                $('#' + updateTimeDiv).html(formatDate(new Date(timeSpan), dateFormat));
            }
        });
    }
    function searchGold(code) {
        var url = 'https://api.jijinhao.com/quoteCenter/history.htm?code='
            + code + '&style=3&pageSize=10&needField=70&endDate='
            + formatDate(new Date(), 'yyyy-MM-dd') + '&dataType=json';
        var dataStr = '';
        fetch(url).then(function (res) {
            return res.text();
        }).then(function (text) {
            var quoteJson = JSON.parse(text);
            if (quoteJson !== null && quoteJson !== '') {
                var jdata = quoteJson.data;
                if (jdata) {
                    for (var j = 0; j < jdata.length; j++) {
                        var quote = jdata[j];
                        var quoteName = quoteJson.productName;
                        if (quoteName === undefined) {
                            quoteName = '----';
                        }
                        var unit = quoteJson.unit;
                        if (unit === undefined) {
                            unit = '----';
                        }
                        var q1 = format(quote.q1, quoteJson.digits);
                        if (isNaN(q1)) {
                            q1 = '----';
                        }
                        var updateTime = formatDate(new Date(quote.time), 'yyyy-MM-dd');
                        dataStr += '<tr>';
                        dataStr += '<td class="blue">' + quoteName + '</td>';
                        var q70 = quote.q70;
                        if (isNaN(q70) || q70 === 0) {
                            dataStr += '<td>' + q1 + '</td>';
                        }
                        else if (q70 > 0) {
                            dataStr += '<td class="red">' + q1 + '</td>';
                        }
                        else {
                            dataStr += '<td class="green">' + q1 + '</td>';
                        }
                        dataStr += ' <td>' + unit + '</td>';
                        dataStr += ' <td>' + updateTime + '</td>';
                        dataStr += '</tr>';
                    }
                }
            }
            $('#' + code + '_realGoldTr').html(dataStr);
        });
    }
    function changeStatusIndicator(obj) {
        window.showIndicatorName = obj.id;
        $('#landSpaceVarietyIndicator').children().not('#' + obj.id).removeClass('select');
        $('#landSpaceVarietyIndicator > ' + '#' + obj.id).addClass('select');
        if (obj.id.toString() !== 'noStatus') {
            var generatorIndicatorInterval = window.generatorIndicatorInterval;
            window.indicatorShowStatus = true;
            if (generatorIndicatorInterval) {
                generatorIndicatorInterval('', true);
            }
        }
        else {
            var updateDataAllFunction =  window.updateDataAll;
            window.updateDataAll = false;
            if (updateDataAllFunction) {
                updateDataAllFunction();
            }
        }
    }
    function getCookieStatus(objName) {
        var arrStr = document.cookie.split(';');
        for (var i = 0; i < arrStr.length; i++) {
            var cookieKV = decodeURIComponent(arrStr[i]);
            var temp = cookieKV.split('=');
            if (temp[0].trim() === objName) {
                return temp[1];
            }
        }
        return '';
    }
    function addCookieStatus(cookieStatus, objName, expireTimeSpan) {
        var expiresDays = new Date();
        if (expireTimeSpan === null || expireTimeSpan === undefined) {
            expireTimeSpan = 0;
        }
        expiresDays.setTime(expiresDays.getTime() + parseInt(expireTimeSpan, 10));
        document.cookie = objName + '=' + cookieStatus + ';expires=' + expiresDays.toGMTString() + ';path=/';
    }
    function showLandscapeChart() {
        var cssBarrageDiv = $('#landscapeChartBarrageDiv').css('display');
        if (getCookieByKey('CASTGC') !== '' && getCookieByKey('CASTGC') !== undefined) {
            $('#landscapeLoginBtn').css('visibility', 'hidden');
        }
        else {
            $('#landscapeLoginBtn').css('visibility', 'visible');
        }
        $('#landscapeBarrageContent').val('');
        if (cssBarrageDiv === 'block') {
            $('#landscapeChartBarrageDiv').css('display', 'none');
        }
        else if (cssBarrageDiv === 'none') {
            var loginUri = 'https://passport2.cngold.org/account/login.htm?service=' + window.location.href;
            $('#landscapeChartBarrageDivLoginUrl').attr('href', loginUri);
            $('#landscapeChartBarrageDiv').css('display', 'block');
        }
    }
    window.showLandscapeChart = showLandscapeChart;
    function showPortraitChart() {
        var url = window.location.href;
        window.location.href = window.location.href.replace('mip.cngold.org', 'm.cngold.org') + '?key=formMip';
    }
    function showPortraitChart1() {
        if ($('.b_controll i')[0].getAttribute('class') === 'off') {
            window.widets.alert('请点击弹幕开启按钮');
            return;
        }
        if (getCookieByKey('CASTGC') !== '' && getCookieByKey('CASTGC') !== undefined) {
            $('#ChartBarrageLoginBtn').css('visibility', 'hidden');
        }
        else {
            $('#ChartBarrageLoginBtn').css('visibility', 'visible');
        }
        var cssBarrageDiv = $('#ChartBarrageDiv').css('display');
        $('#chartBarrageDivContent').val('');
        if (cssBarrageDiv === 'block') {
            $('#ChartBarrageDiv').css('display', 'none');
        }
        else if (cssBarrageDiv === 'none') {
            var loginUri = 'https://passport2.cngold.org/account/login.htm?service=' + window.location.href;
            $('#ChartBarrageDivLoginUrl').attr('href', loginUri);
            $('#ChartBarrageDiv').css('display', 'block');
        }
    }
    window.showPortraitChart = showPortraitChart;
    function includeJavaScript(url) {
            var c = document.createElement('script');
            c.async = true;
            c.type = 'text/javascript';
            c.src = url;
            document.getElementsByTagName('head')[0].appendChild(c);
        }
    function getCookieByKey(cookieKey) {
        var arrStr = document.cookie.split(';');
        for (var i = 0; i < arrStr.length; i++) {
            var cookieKV = decodeURIComponent(arrStr[i]);
            var temp = cookieKV.split('=');
            if (temp[0].trim() === cookieKey) {
                return temp[1];
            }
        }
        return '';
    }
    window.getCookieByKey = getCookieByKey;
    function sendPortraitBullet() {
        var val = $('#chartBarrageDivContent').val();
        showPortraitChart();
        $('#comment_comment_detail').val(val);
        if (window.addMsg({'text': val})) {
            $('.comment_fabiao').click();
        }
    }
    function sendLandscapeBullet() {
        var val = $('#landscapeBarrageContent').val();
        $('#comment_comment_detail').val(val);
        showLandscapeChart();
        if (window.addMsg({'text': val})) {
            $('.comment_fabiao').click();
        }
    }
    customElement.prototype.firstInviewCallback = function () {
        var elements = this.element;
        var dataType = $(elements).attr('data-type');
        if (dataType === 'contentRealTime') {
            var isQhExpireCategory = $(elements).attr('isQhExpireCategory');
            if (typeof (isQhExpireCategory) !== 'undefined' && isQhExpireCategory === 'isQhExpireCategory') {
                return;
            }
            var key = $(elements).attr('key');
            var sUrl = $(elements).attr('sUrl');
            marketUrl = $(elements).attr('marketUrl');
            var jsVersion = $(this).attr('jsVersion');
            if (sUrl.indexOf('xh') !== -1 && key) {
                change();
            }
            else {
                load();
            }
            $('#changeSymbol').click(function () {
                var domian = $(this).attr('data-domian');
                var cata = $(this).attr('data-cata');
                var mUrl = $(this).attr('data-mUrl');
                var sUrl = $(this).attr('data-sUrl');
                if (cata === 'gjs' && mUrl === 'gjhj') {
                    window.location.href = domian + '/quote/' + cata + '/' + mUrl + '_' + sUrl + '.html?key=au';
                }
                else if (cata === 'gjs' && mUrl === 'yhzhj') {
                    var symolUrl = symbolFlagSet[sUrl];
                    window.location.href = domian + '/quote/' + cata + '/' + mUrl + '_' + symolUrl + '.html';
                }
            });
            $('.quote-article-nav .xiala').click(function () {
                var offsetTop = document.getElementById('barrageContain') ? $('#barrageContain').offset().top : 0;
                if ($(this).hasClass('rotate')) {
                    $(this).removeClass('rotate');
                    offsetTop >= 0 ? ($('#barrageContain').css('top', parseInt(offsetTop, 10) - 55 + 'px')) : '';
                    $('.top-price').hide();
                }
                else {
                    $(this).addClass('rotate');
                    offsetTop >= 0 ? ($('#barrageContain').css('top', parseInt(offsetTop, 10) + 55 + 'px')) : '';
                    $('.top-price').css('display', 'flex');
                }
            });
            setTimeout(function () {
                document.getElementById('hqLoadGif') ? document.getElementById('hqLoadGif').style.display = 'none' : '';
            }, 4000);
        }
        if (dataType === 'refreshRealTime') {
            var isQhExpireCategory = $(elements).attr('isQhExpireCategory');
            if (!(typeof (isQhExpireCategory) !== 'undefined' && isQhExpireCategory === 'isQhExpireCategory')) {
                window.callBackFunctions = {'realTimeFunction': refreshHq};
            }
            $(window).scroll(function () {
                var topadH = $('.top-important').height();
                var toplogoH = $('.top-logo').height();
                var quotenavH = $('.quote-article-nav').height();
                var toppriceH = $('.top-price').height();
                var infosectionH = $('.hqContainer').height();
                var scrollH = topadH + toplogoH + quotenavH + toppriceH + infosectionH;
                if ($(window).scrollTop() >= scrollH) {
                    $('.fixed-nav').show();
                }
                else {
                    $('.fixed-nav').hide();
                }
            });
            window.ChangeStatusIndicator = changeStatusIndicator;
            $('#indicatorTable li').click(function () {
                $(this).addClass('on').siblings().removeClass('on');
                changeStatusIndicator(this);
            });
            $('.ce_btn').click(function () {
                $('#quote_icon').css('display', 'none');
                $('#indicatorTable li[id=' + window.showIndicatorName + ']').addClass('on');
                $('.ce_layer').show();
            });
            $('.ce_layer .bg_layer').click(function () {
                $('.ce_layer').hide();
            });
        }
        if (dataType === 'ajaxData') {
            var firstCodes = elements.getAttribute('data-id');
            var firstDomian = elements.getAttribute('data-domian');
            var firstCata = elements.getAttribute('data-cata');
            var firstMarUrl = elements.getAttribute('data-marUrl');
            var firstIds = elements.getAttribute('data-showLines');
            var firstNewUpdateTime = elements.getAttribute('data-updateTimeId');
            renderQuote(firstCodes, firstIds, firstNewUpdateTime, firstDomian, firstCata, firstMarUrl);
            $('.qhChangeMarket').bind('click', function () {
                var codes = $(this).attr('data-id');
                var domian = $(this).attr('data-domian');
                var cata = $(this).attr('data-cata');
                var marUrl = $(this).attr('data-marUrl');
                var ids = $(this).attr('data-showLines');
                var newUpdateTime = $(this).attr('data-updateTimeId');
                renderQuote(codes, ids, newUpdateTime, domian, cata, marUrl);
            });
            $('.swiper-slide').bind('click', function () {
                var code = $(this).attr('data-id');
                searchGold(code);
            });
            searchGold($('#swiper-slide_1').attr('data-id'));
        }
    };
    return customElement;
});
