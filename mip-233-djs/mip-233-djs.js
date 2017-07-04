/**
 * @file 倒计时功能
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var date = new Date();
        var start = $(element).attr('data-start');
        var now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        if (!start) {
            $(element).hide();
            return;
        }
        function dateDiff(sDate1, sDate2) {
            var aDate;
            var oDate1;
            var oDate2;
            var iDays;
            aDate = sDate1.split('-');
            oDate1 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
            aDate = sDate2.split('-');
            oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]);
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24, 10);
            if (oDate2 > oDate1) {
                iDays = 0;
            }
            return iDays;
        }
        var diff = dateDiff(start, now);
        $(element).find('.time').html(diff);
    };
    return customElem;
});
