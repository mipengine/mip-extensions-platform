/**
 * @file mip-bmi-calculate 组件
 * @author Fanshiming
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var viewer = require('viewer');
    var $ = require('jquery');

    /**
     * 第一次进入可视区回调，只执行一次。
     */
    customElement.prototype.firstInviewCallback = function () {

        var element = this.element;
        // console.log('自定义组件：',element);
        var info = element.getAttribute('info') || 'Fanshiming-默认信息！';
        element.addEventListener('click', function () {
            // console.log('BMI Calculate组件Click事件处理：'+info);
        });

        this.addEventAction('showHeightInput', function (event) {
            console.log('身高：', $('#height').val());
            console.log('处理Input Change事件：', JSON.stringify(event));
            console.log('处理Input Change事件Target ID：' + JSON.stringify(event.target.id)); //
        });

        function getDateTimeString(format) {

            /* 年月日时分秒格式化 */
            var date = new Date();
            // 获取完整的年份
            var year = date.getFullYear();
            // 获取当前月份0-11
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            // 获取当前日1-31
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            // 获取当前小时数0-23
            var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            // 获取当前分钟数0-59
            var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            // 获取当前秒数0-59
            var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            var dateTimeString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

            if (format === 'YYYY-MM-DD') {

                dateTimeString = year + '-' + month + '-' + day;

            } else {

                dateTimeString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

            }

            return dateTimeString;
        }

        function saveBMIRecord(height, weight, bmi, result) {

            var dateTime = getDateTimeString();

            var bmiRecord = JSON.parse(localStorage.getItem('BMI_RECORD'));
            if (!bmiRecord) {
                bmiRecord = [];
            }
            var tempBmiInfo = {};
            tempBmiInfo.height = height;
            tempBmiInfo.weight = weight;
            tempBmiInfo.bmi = bmi;
            tempBmiInfo.dateTime = getDateTimeString('YYYY-MM-DD');
            tempBmiInfo.operation = '删除';
            bmiRecord.unshift(tempBmiInfo);// 头部填加

            localStorage.setItem('BMI_RECORD', JSON.stringify(bmiRecord));

        }

        // 绑定自定义事件处理
        this.addEventAction('calculate', function (event/*对应的事件对象*/, param/*事件参数*/) {

            // console.log('处理计算按钮Tap事件：' + JSON.stringify(event));
            // console.log('处理计算按钮Tap事件参数：' + param);
            // viewer.eventAction.execute('change', document.getElementById('height'),event);

            var height = $('#height').val();
            var weight = $('#weight').val();
            var bmi = 0;
            if (!height || height < 100 || height > 300) {
                alert('请填写您的身高（100 < = 数字 < = 300）');
                return;
            }
            if (!weight || weight < 30 || weight > 300) {
                alert('请填写您的体重（30 < = 数字 < = 300）');
                return;
            }

            // console.log('提交表单计算BMI');
            /* 计算BMI */
            // 偏瘦<= 18.4、正常[18.5, 23.9]、过重[24.0, 27.9]、肥胖>= 28.0。
            bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
            // console.log('BMI = '+bmi);
            var resultData = bmi;
            var weightAdjustmentData = '';
            var standardWeightMin = (18.5 * ((height / 100) * (height / 100))).toFixed(2);
            var standardWeightMax = (23.9 * ((height / 100) * (height / 100))).toFixed(2);
            var info = '';

            if (bmi < 18.5) {
                resultData += '（偏瘦）';
                info = '你偏瘦。';
                weightAdjustmentData = (standardWeightMin - weight).toFixed(2);

            } else if (bmi >= 18.5 && bmi < 24.0) {
                resultData += '（正常）';
                info = '你的BMI正常。';
                weightAdjustmentData = 0;
            } else if (bmi >= 24.0 && bmi < 28.0) {
                resultData += '（偏重）';
                info = '你偏重，请填写手机号码，免费获取塑身方案。';
                weightAdjustmentData = (weight - standardWeightMax).toFixed(2);
            } else {
                resultData += '（肥胖）';
                info = '你肥胖。';
                weightAdjustmentData = (weight - standardWeightMax).toFixed(2);
            }

            localStorage.setItem('CURRENT_HEIGHT', height);
            localStorage.setItem('CURRENT_WEIGHT', weight);
            localStorage.setItem('CURRENT_BMI', bmi);
            localStorage.setItem('CURRENT_RESULT', resultData);
            localStorage.setItem('CURRENT_INFO', info);
            localStorage.setItem('CURRENT_GENDER', $('input[name=\'gender\']:checked').val());
            localStorage.setItem('CURRENT_AGE', $('#age').val());
            localStorage.setItem('CURRENT_TYPE', $('#type option:selected').val());
            localStorage.setItem('CURRENT_WAY', $('#way option:selected').val());
            localStorage.setItem('CURRENT_CURRENT_SPORT', $('#currentSport option:selected').val());

            var recordSwitch = $('#recordSwitch').prop('checked');
            // console.log('保存BMI计算结果到本地 - '+recordSwitch);
            if (recordSwitch) {
                // 保存BMI计算结果到本地
                // console.log('保存BMI计算结果到本地');
                saveBMIRecord(height, weight, bmi, resultData);
            }

            window.location.href = './Interaction.html';

        });

    };

    return customElement;

});
