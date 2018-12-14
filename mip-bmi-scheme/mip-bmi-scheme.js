/**
 * @file mip-bmi-scheme 组件
 * @author 范仕明
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewer = require('viewer');

    customElement.prototype.firstInviewCallback = function () {

        this.addEventAction('getScheme', function (event) {

            // console.log('获取BMI方案！事件Target ID：' + JSON.stringify(event.target.id));
            var url = 'https://www.bmi.com.cn/BMI/getScheme';

            var bmi = localStorage.getItem('CURRENT_BMI');
            var gender = localStorage.getItem('CURRENT_GENDER');
            var age = $('#age').val();
			// type = $('#type option:selected').val();
            // way = $('#way option:selected').val();
            // currentSport = $('#currentSport option:selected').val();
            var type = $('#type').val();
            var way = $('#way').val();
            var currentSport = $('#currentSport').val();

            localStorage.setItem('CURRENT_AGE', age);
            localStorage.setItem('CURRENT_TYPE', type);
            localStorage.setItem('CURRENT_WAY', way);
            localStorage.setItem('CURRENT_CURRENT_SPORT', currentSport);

            var paramString = 'bmi=' + bmi + '&gender=' + gender + '&age=' + age;
            paramString += ('&type=' + type + '&way=' + way + '&currentSport=' + currentSport);
            // console.log('获取BMI方案参数 - ', paramString);
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
                        $('#schemeY').css({display: 'block'});
                        $('#schemeN').css({display: 'none'});
                        $('.scheme-info-label').css({display: 'block'});
                        /*显示方案内容*/
                        var result = serverResult['RESULT'];
                        $('#diet').text('饮食：' + result.diet);
                        $('#breakfast').text(result.breakfast);
                        $('#lunch').text(result.lunch);
                        $('#dinner').text(result.dinner);
                        $('#moreDiet').text('加餐：' + result.moreDiet);
                        $('#sportSummary').text('运动：' + result.sportSummary);
                        $('.scheme-info-label').css({display: 'none'});
                        // 清空
                        $('#sportDetail').empty();
                        var sd = result.sportDetail;
                        // $('#sportDetail').text('运动详细：' + sd);
                        if (sd.indexOf(',') === -1) {
                            $('#sportDetail').append('<div class=\'sport-detail-item\'>' + sd + '</div>');
                        } else {
                            var sdArray = sd.split(',');
                            var sdItemInfo = [];
                            var tempLeft = '';
                            var tempRight = '';
                            var shownum = 0;
                            for (var i = 0; i < sdArray.length; i++) {
                                shownum = shownum + 1;
                                sdItemInfo = sdArray[i].split('-');
                                tempLeft = '<div class=\'sport-detail-item-num\'>';
                                tempLeft = tempLeft + '<div class=\'numquan\'>' + shownum + '</div>';
                                tempLeft = tempLeft + '</div>';
                                tempLeft = tempLeft + '<div class=\'sport-detail-item-left\'>';
                                tempLeft = tempLeft + sdItemInfo[0] + '</div>';
                                tempRight = '<div class=\'sport-detail-item-right\'>' + sdItemInfo[1] + '</div>';

                                $('#sportDetail').append('<div class=\'sport-detail-item\'>');
                                $('#sportDetail').append(tempLeft);
                                $('#sportDetail').append(tempRight);
                                $('#sportDetail').append('<div class=\'clear\'></div></div>');
                            }
                        }

                        $('#waterSummary').text('水：' + result.waterSummary);
                        $('#waterDetail').text('' + result.waterDetail);
                    } else {
                        $('#schemeN').css({display: 'block'});
                        $('#schemeY').css({display: 'none'});
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
        // viewer.eventAction.execute('tap', document.getElementById('getSchemeButton'), event);

    };

    return customElement;

});
