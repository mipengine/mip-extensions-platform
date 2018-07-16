/**
 * @file mip-ilaw66-baidu-requestSuccess 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');
    var templates = require('templates');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        var countdown = 0;
        var dateTime = new Date();
        var begin = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var jumpTo;
        var timer;
        var backOr;
        var toastOr;


        var i = 0;
        timer = setInterval(function () {
            i++;
            var date = new Date();
            countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60
                + (date.getSeconds() - sec);
            settime();
            if (i >= 120) {
                clearInterval(timer);
            }

        }, 1000);

        // 头部返回按钮
        $el.find('.glyphicon').click(function () {
            cancelRequestOr('./');
        });

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }

        function settime() {
            var id = getQueryString('data');
            var questionType = getQueryString('questionType');
            var lawyerName = getQueryString('lawyerName');
            var lawyerId = getQueryString('lawyerId');
            var askingType = getQueryString('askingType');
            var tel = getQueryString('tel');
            var goodCommentRate = getQueryString('goodCommentRate');
            console.log(countdown);

            if (countdown > 60) {
                clearInterval(timer);
                var title = '';
                var main = '抱歉，' + lawyerName + '律师临时有事，无法为您服务,系统可以为您推荐其他律师';
                var yes = '离开本页';
                var no = '立即推荐其他律师';
                backOr(title, main, yes, no, function () {
                    window.top.location.href = './';
                }, function () { // 立即推荐其他律师
                    startConsulting(questionType);
                });
            }
            else {
                if (countdown % 5 === 0) {
                    $.ajax({
                        type: 'GET',
                        url: 'timer?id=' + id,
                        dataType: 'json',
                        success: function (data) {
                            var dataStatus = data.status;
                            if (dataStatus === 5) {
                                clearInterval(timer);
                                var url = encodeURI(
                                    'linking?questionType=' + questionType + '&lawyerName=' + lawyerName
                                    + '&requestId=' + id + '&askingType=' + askingType + '&lawyerId=' + lawyerId
                                    + '&tel=' + tel + '&goodCommentRate=' + goodCommentRate);
                                window.top.location.href = url;
                            }

                        },
                        error: function (jqXHR) {
                            if (jqXHR.status === 403) {
                                window.location.reload();
                            }

                        }

                    });
                }
            }
        }

        function cancelRequestOr(jumpTo) {
            $.ajax({
                url: 'cancelRequest?requestId=' + $el.find('#requestId').val() + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    if (data === 'NG') {
                        toastOr('取消晚了，律师正在联系您');
                        setTimeout(function () {
                            window.top.location.href = jumpTo;
                        }, 2000);
                    }
                    else if (data === 'OK') {
                        clearInterval(timer);
                        toastOr('取消成功');
                        setTimeout(function () {
                            window.top.location.href = './';
                        }, 2000);
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

        function backCancel(jumpTo) {
            $.ajax({
                url: 'cancelRequest?requestId=' + $el.find('#requestId').val() + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    if (data === 'NG') {
                        alert('返回失败');
                    }
                    else if (data === 'OK') {
                        window.top.location.href = jumpTo;
                    }

                },
                error: function (jqXHR) {
                    if (jqXHR.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        function startConsulting(b) {
            $.ajax({
                url: 'greeting',
                url: 'greeting?questionType=' + b + '&_csrf=' + $el.find('#_csrf').val(),
                success: function (a) {
                    if (a === 'ERROR' || a === 'ERROR1' || a === 'ERROR2' || a === 'ERROR3' || a === 'ERROR4') {
                        backOr('温馨提示', b.error, '', '确定', function () {}, function () {});
                    }
                    else {
                        window.top.location.href = 'request?data=' + a + '&questionType=' + b;
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
        }

    };

    return customElement;
});
