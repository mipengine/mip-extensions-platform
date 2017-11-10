/**
 * @file mip-jt-calendar 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        var count = ele.getAttribute('num');
        loadCalendar(count);
    };
    function loadCalendar(count) {
        var quoteCalendar = '';
        var url = 'https://calendar.cngold.org/finance/quote/calendar/';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function (json) {
                quoteCalendar = json;
                var calStr = '';
                for (var i = 0; i < count; i++) {
                    var data = quoteCalendar[i];
                    var publishTime = format.call(new Date(data.publishTime), 'hh:mm');
                    if (i === 0) {
                        calStr += '<li id="calendarFirst" class="dotted">';
                    }
                    else {
                        calStr += '<li class="dotted">';
                    }
                    calStr += '<div class="many">';
                    calStr += '<a href="http://m.cngold.org/calendar/c' + data.id + '.html">';
                    calStr += '<div class="country static">';
                    calStr += '<mip-img layout=' + 'responsive' + ' width=' + '"75"' + 'height=' + '"53"' + ' src=' + '"https://res.cngoldres.com/calendar/img/' + data.countryCode.toLowerCase() + '.png"></mip-img><p>';
                    calStr += publishTime + '</p></div>';
                    calStr += '<p class="title">' + data.quotaName + '</p>';
                    calStr += '<table class="data-ini" width="100%"><tbody>';
                    calStr += '<tr><td class="text-left">前值：' + data.previousValue + '</td>';
                    var gold = 0;
                    var oil = 0;
                    var effectStr = '--';
                    if (data.effectGold) {
                        gold = data.effectGold;
                    }
                    if (data.effectOil) {
                        oil = data.effectOil;
                    }
                    if (gold !== 0 && oil === 0) {
                        if (gold === 1) {
                            effectStr = '<span class="red">利多金银</span>';
                        }
                        if (gold === 2) {
                            effectStr = '<span class="green">利空金银</span>';
                        }
                        if (gold === 3) {
                            effectStr = '<span class="gray">影响较小</span>';
                        }
                    }
                    if (gold === 0 && oil !== 0) {
                        if (oil === 1) {
                            effectStr = '<span class="red">利多原油</span>';
                        }
                        if (oil === 2) {
                            effectStr = '<span class="green">利空原油</span>';
                        }
                        if (oil === 3) {
                            effectStr = '<span class="gray">影响较小</span>';
                        }
                    }
                    if (gold !== 0 && oil !== 0 && gold === oil) {
                        if (gold === 1) {
                            effectStr = '<span class="red">利多金银 原油</span>';
                        }
                        if (gold === 2) {
                            effectStr = '<span class="green">利空金银 原油</span>';
                        }
                        if (gold === 3) {
                            effectStr = '<span class="gray">影响较小</span>';
                        }
                    }
                    if (gold !== 0 && oil !== 0 && gold !== oil) {
                        if (gold === 1) {
                            effectStr = '<span class="red">利多金银</span>';
                            if (oil === 2) {
                                effectStr += '<span class="green">利空原油</span>';
                            }
                        }
                        if (gold === 2) {
                            effectStr = '<span class="green">利空金银 原油</span>';
                            if (oil === 1) {
                                effectStr += '<span class="red">利多原油</span>';
                            }
                        }
                        if (gold === 3) {
                            if (oil === 1) {
                                effectStr = '<span class="red">利多原油</span>';
                            }
                            if (oil === 2) {
                                effectStr = '<span class="green">利空原油</span>';
                            }
                        }
                    }
                    calStr += '<td>公布值</td><td>' + effectStr + '</td></tr>';
                    calStr += '<tr><td class= "text-left">预测值：' + data.forecastValue + '</td>';
                    calStr += '<td>' + data.value + '</td><td>';
                    calStr = createStars(calStr, data.importance);
                    calStr += '</td></tr>';
                    if (i !== 0) {
                        var id1 = '';
                        var id2 = '';
                        var timeCal = '';
                        timeCal = format.call(new Date(data.calendarAt), 'yyyy-MM-dd') + ' '
                        + format.call(new Date(data.publishTime), 'hh:mm');
                        if (i === 1) {
                            id1 = 'timeOver01';
                            id2 = 'timeM01';
                            $('#atime01').val(publishTime);
                            $('#timeM01').val(timeCal);
                        }
                        if (i === 2) {
                            id1 = 'timeOver02';
                            id2 = 'timeM02';
                            $('#atime02').val(publishTime);
                            $('#timeM02').val(timeCal);
                        }
                        calStr += '<tr class="timeLeft"><td colspan="3">剩余<span id="' + id1
                        + '">00:00:00</span>公布</td></tr>';
                        calStr += '<span style="display:none;" id="' + id2 + '">' + timeCal + '</span>';
                    }
                    calStr += '</tbody></table></a></div></li>';
                }
                $('#calendarUl').html(calStr);
                aimsTime(getOverTime('timeM01'), getOverTime('atime01'), 'timeOver01');
                aimsTime(getOverTime('timeM02'), getOverTime('atime02'), 'timeOver02');
            }
        });
    }
    function createStars(calStr, num) {
        var grayNum = 3 - num;
        for (var i = 0; i < num; i++) {
            calStr += '<mip-img layout="fixed"' + ' width="16"' + ' height="16"' + ' src="https://res.cngoldres.com/mobile/images/cal_star.png"></mip-img>';
        }
        for (var j = 0; j < grayNum; j++) {
            calStr += '<mip-img layout="fixed"' + ' width="16"' + ' height="16"' + ' src="https://res.cngoldres.com/mobile/images/cal_star_gray.png"></mip-img>';
        }
        return calStr;
    }
    function aimsTime(date, aims, ele) {
        var now = new Date();
        var nowGetMonth = now.getMonth();
        var nowGetDate = now.getDate();
        var nowGetHours = now.getHours();
        var nowGetMin = now.getMinutes();
        nowGetMonth++;
        if (nowGetMonth < 10) {
            nowGetMonth = '0' + nowGetMonth;
        }
        if (nowGetDate < 10) {
            nowGetDate = '0' + nowGetDate;
        }
        if (nowGetHours < 10) {
            nowGetHours = '0' + nowGetHours;
        }
        if (nowGetMin < 10) {
            nowGetMin = '0' + nowGetMin;
        }
        var compNow = now.getFullYear() + '' + nowGetMonth + nowGetDate + nowGetHours + nowGetMin;
        var compEnd = date.replace(/[\s\-\:]/g, '');
        if (parseInt(compNow, 10) > parseInt(compEnd, 10)) {
            $('#' + ele).html('00:00:00');
        }
        else {
            setInterval(function () {
                getServerTime(aims);
            }, 250);
        }
        function getServerTime(aimsTime) {
            var d = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + aimsTime;
            var urodz = new Date(d);
            now.setTime(now.getTime() + 250);
            var days = (urodz - now) / 1000 / 60 / 60 / 24;
            var daysRound = Math.floor(days);
            var hours = (urodz - now) / 1000 / 60 / 60 - (24 * daysRound);
            var hoursRound = Math.floor(hours);
            var minutes = (urodz - now) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
            var minutesRound = Math.floor(minutes);
            var seconds = (urodz - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound)
            - (60 * minutesRound);
            var secondsRound = Math.round(seconds);
            if (hoursRound < 10) {
                hoursRound = '0' + hoursRound;
            }
            if (minutesRound < 10) {
                minutesRound = '0' + minutesRound;
            }
            if (secondsRound < 10) {
                secondsRound = '0' + secondsRound;
            }
            $('#' + ele).html(hoursRound + ':' + minutesRound + ':' + secondsRound);
        }
    }
    function getOverTime(timeEle) {
        return $('#' + timeEle).val();
    }
    function format(fmt) {
        var o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
    return customElement;
});
