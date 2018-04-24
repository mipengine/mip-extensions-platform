/**
 * @file mip-cy-follow-doctor 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    require('./initJs');
    var $ = require('zepto');

    customElement.prototype.build = function () {
        var $ele = $(this.element);
        var toast = require('./toast');
        var auto = $ele.attr('auto') || 0;
        var doctorId = $ele.attr('doctor-id') || '';

        // 关注或取消关注医生
        if (auto !== '0') {
            followDoctor();
        }

        $ele.on('click', function () {
            if ($ele.hasClass('disabled')) {
                return;
            }

            $ele.addClass('disabled');
            followDoctor();
        });

        function followDoctor() {
            $.ajax({
                url: 'https://m.chunyuyisheng.com/mip/follow_doctor/',
                type: 'post',
                cache: false,
                data: {
                    'doctor_id': doctorId
                },
                dataType: 'json',
                success: function (json) {
                    if (json.status) {
                        $ele.removeClass('disabled');
                        if (json.login_url) {
                            location.href = json.login_url;
                        }
                        else {
                            toast(json.msg);
                        }
                        return;
                    }

                    if ($ele.hasClass('mip-cy-followed-doctor')) {
                        $ele.removeClass('disabled');
                        $ele.removeClass('mip-cy-followed-doctor');
                        $ele.addClass('mip-cy-follow-doctor');
                        return;
                    }

                    $ele.removeClass('mip-cy-follow-doctor');
                    $ele.addClass('mip-cy-followed-doctor');
                    // 调取熊掌号关注
                    xzSubscribe();
                },
                error: function () {
                    $ele.removeClass('disabled');
                    toast('操作失败，请稍后重试!');
                }
            });
        }

        /**
         * 百度熊掌号js-sdk提供的关注功能
         */
        function xzSubscribe() {
            var subscribe;
            if (window.cambrian) {
                subscribe = window.cambrian.subscribe;
                // 获取熊掌号失败
                if (!subscribe) {
                    $ele.removeClass('disabled');
                    return;
                }

                subscribe({
                    data: {
                        type: 'force', // 类型，optional-弱关注 force-强关注
                        title: '确认关注', // 标题文字，字数限制：4-6个字
                        describe: '可在百度首页>关注>春雨医生中查看医生', // 关注说明，字数限制：0-20个字
                        button: '关注' // 按钮文字，字数限制：2-6个字
                    },
                    complete: function (res) {
                        $ele.removeClass('disabled');
                        if (!res.status) {
                            $.ajax({
                                url: 'https://m.chunyuyisheng.com/stat/h5/event_analyse/data_upload/',
                                type: 'post',
                                data: {
                                    events: JSON.stringify([{
                                        key: 'XZHDoctorNewfans',
                                        segmentation: {
                                            result: res.result
                                        }
                                    }])
                                }
                            });
                        }

                        setTimeout(function () {
                            location.href = 'https://m.chunyuyisheng.com/mip/my_doctors_list_page/';
                        }, 0);
                    }
                });
            }
            else {
                setTimeout(xzSubscribe, 100);
            }
        }
    };

    return customElement;
});
