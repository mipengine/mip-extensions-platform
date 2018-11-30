/**
 * @file mip-bmi-record 组件
 * @author 范仕明
 */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {

        /**
         * 显示历史记录
         */
        function showBMIRecord() {
            // console.log('展示BMI_RECORD');
            var bmiRecord = JSON.parse(localStorage.getItem('BMI_RECORD'));
            if (!bmiRecord) {
                bmiRecord = [];
            }
            $('#bmiRecordInfoContent').empty();

            var tempRow = '';
            var tempRecord = {};

            for (var i = 0; i < bmiRecord.length; i++) {
                tempRecord = bmiRecord[i];
                tempRow += '<div>';
                tempRow += '<div class=\'bmi-record-info-body-n\'>' + (i + 1) + '</div>';
                tempRow += '<div class=\'bmi-record-info-body-height\'>' + tempRecord.height + '</div>';
                tempRow += '<div class=\'bmi-record-info-body-weight\'>' + tempRecord.weight + '</div>';
                tempRow += '<div class=\'bmi-record-info-body-bmi\'>' + tempRecord.bmi + '</div>';
                tempRow += '<div class=\'bmi-record-info-body-dateTime\'>' + tempRecord.dateTime + '</div>';
                tempRow += '<div class=\'bmi-record-info-body-operation\'';
                tempRow += ' on=\'tap:mipBmiRecord.deleteBMIRecord(' + i + ')\'>' + tempRecord.operation;
                tempRow += '</div>';
                tempRow += '</div>';
                $('#bmiRecordInfoContent').append(tempRow);
                tempRow = '';
            }
        }

        showBMIRecord();

        this.addEventAction('showBMIRecord', showBMIRecord);

        this.addEventAction('deleteBMIRecord', function (event/*对应的事件对象*/, param/*事件参数*/) {
            // console.log('删除BMI_RECORD Index = ', param);
            var bmiRecord = JSON.parse(localStorage.getItem('BMI_RECORD'));
            bmiRecord.splice(param, 1);
            localStorage.setItem('BMI_RECORD', JSON.stringify(bmiRecord));
            showBMIRecord();
        });
    };

    return customElement;
});
