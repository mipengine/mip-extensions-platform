/**
 * @file mip-script-confirmTel 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        function getBaseUrl() {
            var ishttps = 'https:' === document.location.protocol ? true : false;
            var url = window.location.host;
            if (ishttps) {
                url = 'https://' + url;
            } else {
                url = 'http://' + url;
            }
            return url + '/jasmine/';
        }
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        }

        // 点击继续问，a有未处理订单时,设为false
        var flg = false;

        var requestId = getQueryString('requestId');
        var questionType = getQueryString('questionType');
        var csrfToken = $el.find('#csrf').val();

        /** 没有电话进来获取该订单和手机号码 */
        $.ajax({
            async: false,
            type: 'GET',
            url: 'orderInfoUncompleted?requestId=' + requestId,
            success: function (data) {
                if (data) {
                    $el.find('#defaultDate').html(data.grabTimeString);
                    /*$el.find('#defaultPhone').html(data.userPhone);*/
                    var mphone = (data.userPhone).substr(0, 3) + '****' + (data.userPhone).substr(7);
                    $el.find('#defaultPhone').html(mphone);
                    $el.find('#defaultLaywerName').html(data.lawyerName);
                    $el.find('.link_continue').attr('lawyerId', data.lawyerId);
                } else {
                    alert('系统异常，请稍后重试');
                }

            }
        });

        //  任意门更换主题色值
        window.onload = function () {
            console.log(sessionStorage.getItem('isDoor'));
            if (sessionStorage.getItem('isDoor') === 'isDoor') {
                $el.find('.link_continue').css({
                    'background-color': '#258afb',
                    'border': '1px solid #258afb'

                });
                $el.find('.link_correct').css('background-color', '#258afb');
                $el.find('#defaultPhone').css('color', '#258afb');
            }
        };

        // 继续问
        $el.find('.reAsk').click(function () {
            $el.find('.popUp_confirm').hide();
            $el.find('.loadingArea').show();
            var askingType = $el.find(this).data('type');
            var lawyerId = $el.find('.link_continue').attr('lawyerId');
            continueAsk(lawyerId, questionType, askingType, csrfToken);
        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            if (flg) {
                // 情况为b,弹出重试/咨询其他律师-
                $el.find('.popUp_uncheckErr').hide();
                $el.find('.popUp_confirm').fadeIn();
            } else {
                // 情况为a,直接关闭
                $el.find('.popUp_uncheckErr').hide();
                $el.find('.popUp_confirm').hide();
            }
        });
        // 咨询其他律师时
        $el.find('.link_others').click(function () {
            $el.find('.loadingArea').show();
            $el.find('.popUp_confirm').hide();
            startConsulting(questionType, csrfToken);
        });

        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
            $el.find('.popUp_unFinishedBillErr').hide();
        });

        $el.find('.link_btn_unpaidErrConfirm').click(function () {
            location.href = 'orderlist';
        });

        // 修改号码
        $el.find('.link_correct').click(function () {
            location.href = 'confirmCorrectTel?requestId=' + requestId + '&questionType=' + questionType;
        });

        function startConsulting(questionType, csrfToken) {
            if (checkQuestionType(questionType)) {
                $.ajax({
                    type: 'POST',
                    url: 'greeting?questionType=' + questionType + '&csrf=' + csrfToken,
                    success: function (data) {
                        if (data === 'ERROR' || data === 'ERROR1') {
                            $el.find('.popUp_sysErr').fadeIn();
                        } else if (data === 'ERROR2') {
                            $el.find('.popUp_unpaidErr').fadeIn();
                        } else if (data === 'ERROR3') {
                            $el.find('.popUp_unFinishedBillErr').fadeIn();
                        } else {
                            location.href = 'request?data=' + data + '&questionType=' + questionType;
                        }
                    },
                    error: function (jqXHR) {
                        if (jqXHR.status === 403) {
                            window.location.reload();
                        }
                    }
                });
            } else {
                location.href = getBaseUrl();
            }
        }
        function checkQuestionType(questionType) {
            var array = ['CT001', 'CT002', 'CT003', 'CT004', 'CT005', 'CT006', 'CT007', 'CT008',
'CT009', 'CT018', 'CT063', 'CT010', 'CT060', 'CT061', 'CT062'];
            for (var i = 0; i < array.length; i++) {
                if (array[i] === questionType) {
                    return true;
                }
            }
            return false;
        }
        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    var fromChannel = '';
                    if (id !== '') {
                        //  传入lawyerId
                        if (fromChannel === 'WxiaoApp' || $el.find('#channel').val() === 'WxiaoApp') {
                            location.href = 'request_wx?data=' + id;
                        } else if (fromChannel === 'fengniao' || $el.find('#channel').val() === 'fengniao') {
                            location.href = 'request_wx?data=' + id;
                        } else {
                            location.href = 'request?data=' + id;
                        }

                    } else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUp_confirm').hide();
                            $el.find('.popUp_uncheckErr').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    $el.find('.loadingArea').hide();
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                }
            });
        }
        // 继续问---通知律师跳转到informLawyer页面（orderlist页，首页slogon）
        function continueAsk2(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType=' + questionType + '&csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    if (id !== '') {
                        //  传入lawyerId
                        location.href = 'informLawyer?data=' + id;
                    } else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        } else {
                            var msg = data.error;
                            $el.find('#tips').html(msg);
                            $el.find('.popUp_confirm').hide();
                            $el.find('.popUp_uncheckErr').fadeIn();
                        }
                    }
                },
                error: function (jqXHR) {
                    $el.find('.loadingArea').hide();
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }
                }
            });
        }

        //  continueAsk2 更改为 continueAskNew
    };

    return customElement;
});