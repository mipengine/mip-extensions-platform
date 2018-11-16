/**
 * @file mip-ilaw66xzh-informLawyer2 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var countdown = 0;
        var timer;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var lawyerId = getQueryString('lawyerId');
        var questionType = getQueryString('questionType');
        var askingType = getQueryString('askingType');
        var fromRoute = getQueryString('fromRoute');
        var clericalName = localStorage.getItem('clericalName');
        var clericalAvatar = localStorage.getItem('clericalAvatar');
        var timerRequestId = getQueryString('data');

        getInfo();

        $el.find('#requestId').val(getQueryString('data'));
        $el.find('#questionType').val(getQueryString('questionType'));
        $el.find('#askingType').val(getQueryString('askingType'));

        timer = setInterval(function () {
            var date = new Date();
            countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);
            $el.find('.inform_time').text(countdown + '秒');
            settime();
            if (countdown >= 60) {
                // clearInterval(timer);
                $el.find('.countdownTime').html('60秒');
            }
            else {
                $el.find('.countdownTime').html(countdown + '秒');
            }
        }, 1000);
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }

        function getType(questionType) {
            switch (questionType) {
                case 'CT001':
                    return '婚姻家庭';
                case 'CT002':
                    return '房产物业';
                case 'CT003':
                    return '交通意外';
                case 'CT006':
                    return '民间借贷';
                case 'CT004':
                    return '劳动用工';
                case 'CT008':
                    return '合同纠纷';
                case 'CT010':
                    return '人身伤害';
                case 'CT007':
                    return '其他问题';
                case 'CT064':
                    return '消费维权';
                default:
                    return false;
                    break;
            }
        }

        function settime() {
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();
            if (countdown % 5 === 0) {
                $.ajax({
                    type: 'GET',
                    url: 'timer?id=' + timerRequestId + '&lawyerId=' + lawyerId,
                    dataType: 'json',
                    success: function (data) {
                        var dataStatus = data.status;
                        var url;
                        $el.find('.end_name').text(data.lawyerName);
                        if (dataStatus && dataStatus !== 3 && dataStatus !== 'undefined') {
                            localStorage.setItem('reAskAvatar', data.avatar);
                            localStorage.setItem('reAskSex', data.sex);
                            localStorage.setItem('reAskName', data.lawyerName);
                            localStorage.setItem('lawyerField', data.lawyerField);
                        }

                        timerRequestId = data.requestId;

                        url = 'mipilaw66xzh_informLawyer_failed'
                        + '?lawyerId=' + lawyerId
                        + '&requestId=' + timerRequestId + '&questionType='
                        + questionType + '&askingType=' + askingType
                        + '&secondAskFlg=' + data.reCallNoAnswerTimes + '&lawyerName='
                        + data.lawyerName;
                        window.top.location.href = url;

                        /*if (dataStatus === 5 || dataStatus === 6
                            || dataStatus === 7 || dataStatus === 8 || dataStatus === 11 || dataStatus === 12) {
                            clearInterval(timer);
                            if (fromRoute) {
                                url = encodeURI('mipilaw66xzh_linking?questionType=' + questionType
                                    + '&lawyerName=' + data.lawyerName + '&requestId=' + timerRequestId + '&askingType='
                                    + askingType + '&lawyerId=' + lawyerId + '&tel=' + data.tel
                                    + '&fromRoute=clerical');
                            }
                            else {
                                url = encodeURI('mipilaw66xzh_linking?questionType=' + questionType
                                    + '&lawyerName='
                                    + data.lawyerName + '&requestId=' + timerRequestId + '&askingType=' + askingType
                                    + '&lawyerId=' + lawyerId + '&tel=' + data.tel);
                            }
                            window.top.location.href = url;
                        }
                        else if (dataStatus === 4 || dataStatus === 1 || dataStatus === 3
                            || dataStatus === 9 || dataStatus === 10 || dataStatus === 'ERROR'
                            || dataStatus === 'ERROR1' || countdown >= 65) {
                            clearInterval(timer);
                            if (fromRoute) {
                                url = 'mipilaw66xzh_informLawyer_failed' + '?lawyerId=' + lawyerId
                                    + '&requestId='
                                    + timerRequestId + '&questionType=' + questionType + '&askingType='
                                    + askingType + '&fromRoute=clerical' + '&lawyerName='
                                    + data.lawyerName;
                            }
                            else {
                                url = 'mipilaw66xzh_informLawyer_failed'
                                    + '?lawyerId=' + lawyerId
                                    + '&requestId=' + timerRequestId + '&questionType='
                                    + questionType + '&askingType=' + askingType
                                    + '&secondAskFlg=' + data.reCallNoAnswerTimes + '&lawyerName='
                                    + data.lawyerName;
                            }
                            window.top.location.href = url;
                        }*/

                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }

                    }

                });
            }
        }

        function getInfo() {
            $.ajax({
                type: 'GET',
                url: 'timer?id=' + timerRequestId + '&lawyerId=' + lawyerId,
                dataType: 'json',
                success: function (data) {
                    if (!data || data.status === 'ERROR') {
                        alert(data.status);
                        return;
                    }

                    timerRequestId = data.requestId;
                    // 未上传头像则选择默认头像
                    if (!data.avatar) {
                        if (data.sex === 'male') {
                            $el.find('.inform_top_img').attr('src', 'images/bg_touxaingnan.png');
                        }
                        else if (data.sex === 'female') {
                            $el.find('.inform_top_img').attr('src', 'images/bg_touxiangnv.png');
                        }
                    }
                    else {
                        $el.find('.inform_top_img').attr('src', data.avatar);
                    }
                    var temp = {
                        avatar: data.avatar,
                        lawyerName: data.lawyerName,
                        lawyerField: data.lawyerField,
                        serviceTimes: data.serviceTimes,
                        lightStar: data.lightStar,
                        grayStar: data.grayStar,
                        authorizedNo: data.authorizedNo
                    };
                    // $el.find(".inform_middle_con").text("正在通知" + temp.lawyerName + "...");
                    $el.find('.end_name').text(temp.lawyerName);

                    var tp = getType(questionType);
                    if (tp && temp.lawyerField && temp.lawyerField.indexOf(tp) >= 0) {
                        $el.find('.linking_lawyerField').text(tp);
                    }
                    else {
                        $el.find('.linking_lawyerFieldTxt').hide();
                        $el.find('.linking_lawyerField').hide();
                    }
                    if (!temp.serviceTimes || temp.serviceTimes === 0) {
                        $el.find('.linking_serviceTimesTxt').hide();
                        $el.find('.linking_serviceTimes').hide();
                    }
                    else {
                        $el.find('.linking_serviceTimes').text(temp.serviceTimes + '次');
                    }

                    if (temp.authorizedNo) {
                        $el.find('.linkingconntent_lawyerid').text('律师执业证号：' + temp.authorizedNo);
                    }
                    else {
                        $el.find('.linkingconntent_lawyerid').hide();
                    }
                    var starHtml = '';
                    starHtml += '<span class="star_blockindex">';
                    if (temp.lightStar) {
                        temp.lightStar.forEach(function () {
                            starHtml += '<mip-img src="./images/icon_star_c_c.png"></mip-img>';
                        });
                    }

                    if (temp.grayStar) {
                        temp.grayStar.forEach(function () {
                            starHtml += '<mip-img src="./images/icon_star.png"></mip-img>';
                        });
                    }

                    if (temp.lightStar) {
                        starHtml += ' ' + temp.lightStar.length + '.0';
                        starHtml += '<input type="hidden" class="common_arg" name="score" value="'
                            + temp.lightStar.length + '" readonly="readonly"/>';
                    }

                    starHtml += '</span>';
                    $el.find('.linking_star').html(starHtml);
                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

    };

    return customElement;
});
