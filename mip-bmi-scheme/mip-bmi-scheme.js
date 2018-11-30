/**
 * @file mip-bmi-scheme 组件
 * @author 范仕明
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('jquery');
    var viewer = require('viewer');

    customElement.prototype.firstInviewCallback = function () {

        this.addEventAction('getScheme', function (event) {

            // console.log('获取BMI方案！事件Target ID：' + JSON.stringify(event.target.id));
            var url = 'https://www.bmi.com.cn/BMI/getScheme';

            var bmi = localStorage.getItem('CURRENT_BMI');
            var gender = localStorage.getItem('CURRENT_GENDER');
            var age = localStorage.getItem('CURRENT_AGE');
            var type = localStorage.getItem('CURRENT_TYPE');
            var way = localStorage.getItem('CURRENT_WAY');
            var currentSport = localStorage.getItem('CURRENT_CURRENT_SPORT');

            var paramString = 'bmi=' + bmi + '&gender=' + gender + '&age=' + age;
            paramString += ('&type=' + type + '&way=' + way + '&currentSport=' + currentSport);
            // console.log("获取BMI方案参数 - ", paramString);
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: paramString,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(
                function (response) {

                    var data = response.json();
                    // 返回结果数据ServerResult
                    return data;

                }
            ).then(
                // 参数serverResult是上一个then的返回值。
                function (serverResult) {
                    // console.log('获取BMI方案结果 - ', serverResult);
                    if (serverResult['STATUS'] === 'Y') {
                        $('#schemeInfo').css({display: 'block'});
                        /*显示方案内容*/
                        var result = serverResult['RESULT'];
                        $('#diet').text('饮食：' + result.diet);
                        $('#breakfast').text('早餐：' + result.breakfast);
                        $('#lunch').text('午餐：' + result.lunch);
                        $('#dinner').text('晩餐：' + result.dinner);
                        $('#moreDiet').text('加餐：' + result.moreDiet);
                        $('#sportSummary').text('运动：' + result.sportSummary);
                        $('#sportDetail').text('' + result.sportDetail);
                        $('#waterSummary').text('水：' + result.waterSummary);
                        $('#waterDetail').text('' + result.waterDetail);
                    } else {
                        $('#schemeInfo').css({display: 'none'});
                        // console.log('无相应BMI方案！');
                    }

                }
            ).catch(
                function (error) {
                    // console.error('获取BMI方案错误 - Error - ', error);
                    alert('获取方案失败！');
                }
            );
        });

        // 触发获取方案按钮的Tap事件。
        viewer.eventAction.execute('tap', document.getElementById('getSchemeButton'), event);

    };

    return customElement;

});
