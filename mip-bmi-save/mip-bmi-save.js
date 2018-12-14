/**
 * @file mip-bmi-save 组件
 * @author 范仕明
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewer = require('viewer');

    customElement.prototype.firstInviewCallback = function () {

        var height = localStorage.getItem('CURRENT_HEIGHT');
        var weight = localStorage.getItem('CURRENT_WEIGHT');
        var bmi = localStorage.getItem('CURRENT_BMI');
        var mobile = $('#mobile').val();
        $('#resultData').text(localStorage.getItem('CURRENT_RESULT'));
        $('#resultPN').text('(' + localStorage.getItem('CURRENT_PN') + ')');
        $('#heightWeight').html('（身高:' + height + ' cm，体重：' + weight + ' kg）');
        $('#info').text(localStorage.getItem('CURRENT_INFO'));
        this.addEventAction('saveBMI', function (event) {

            var url = 'https://www.bmi.com.cn/BMI/saveBMI';

            height = localStorage.getItem('CURRENT_HEIGHT');
            weight = localStorage.getItem('CURRENT_WEIGHT');
            bmi = localStorage.getItem('CURRENT_BMI');
            mobile = $('#mobile').val();
            localStorage.setItem('CURRENT_MOBILE', mobile);

            if (!mobile) {
                alert('请填写你的手机号码！');
                return;
            }

            var param = {
                height: height,
                weight: weight,
                bmi: bmi,
                mobile: mobile
            };

            // console.log('保存BMI信息！ - ', param);
            var paramString = 'mobile=' + mobile + '&height=' + height + '&weight=' + weight + '&bmi=' + bmi;
            fetch(url, {
                method: 'POST',
                // body: JSON.stringify(param),
                // 发起非同源又没返回CORS头的请求。无法获取服务端响应数据。
                // mode: 'no-cors',
                // 发起非同源又返回CORS头的请求。
                mode: 'cors',
                // Cookie Session
                // credentials: 'include',
                body: paramString,
                headers: {
                    // 'Content-Type': 'application/json;charset=utf-8'
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(
                // response => response.text()
                // response => response.json()
                // Lambda等同函数
                function (response) {

                    var data = response.text();
                    // var data = response.json();
                    // 返回结果数据ServerResult
                    return data;

                }
            ).then(
                // 参数serverResult是上一个then的返回值。
                function (serverResult) {

                    alert(JSON.stringify(serverResult));
                    // console.log('保存BMI信息 - ', paramString);
                    // console.log('保存BMI信息结果 - ', serverResult);

                }
            ).catch(
                // error => console.error('保存BMI信息错误 - Error - ', error)
                function (error) {
                    console.error('保存BMI信息错误 - Error - ', error);
                    alert('失败！');
                }
            );

        });

    };

    return customElement;

});
