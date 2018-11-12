/**
 * @file mip-ilaw66-reservation2 组件
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
        var channel = localStorage.getItem('channel');
        var sessionId = getQueryString('sessionId');
        var MIP = window.MIP;
        this.addEventAction('login', function (event) {
            //          console.log('授权成功');
            var sessid = event.sessionId;
            var islogin = parseInt(event.userInfo.isLogin, 10);
            if (!islogin) { // 未注册
                var qusttype = localStorage.getItem('baiduquestionType');
                var tzurl = 'mipilaw66baidu_login?channel=baidusearch&sessionId='
                    + sessid + '&questionType=' + qusttype;
                locahost(tzurl, '准备咨询');
            }
            else {
                console.log('登录成功');
                sessionId = sessid;
            }
        });

        var hosturl = 'https://www.ilaw66.com/jasmine/';
        function returhostname() {
            var hostweb = location.protocol;
            var hostname = location.hostname;
            if (hostname === 'www-ilaw66-com.mipcdn.com' || hostname === 'www.ilaw66.com') {
                hosturl = 'https://www.ilaw66.com/jasmine/';
            }
            else if (hostname === 'localhost') {
                var hostport = location.port;
                hosturl = 'http://' + hostname + ':' + hostport + '/jasmine/';
            }
            else {
                hosturl = 'https://' + hostname + '/jasmine/';
            }
        }
        returhostname();
        console.log(hosturl);
        function locahost(topsurl, toptitle) {
            if (topsurl === './') {
                topsurl = 'baidusearch';
            }

            var topurl = hosturl + topsurl;
            if (MIP.viewer.isIframed) {
                if (topsurl === 'baidusearch') {
                    window.top.location.href = 'https://m.baidu.com/mip/c/s/www.ilaw66.com/jasmine/baidusearch';
                }
                else {
                    MIP.viewer.sendMessage('loadiframe', {
                        title: toptitle,
                        click: '',
                        url: topurl
                    });
                }
            }
            else {
                location.assign(topurl);
            }
        }

        if (channel === 'winbaoxian') {
            $el.find('.header_block').hide();
        }

        if (location.href.indexOf('myreservation') > 0) { // 进入‘我的咨询’页面
            getReservationMsg();
            return;
        }

        var id = getQueryString('id');
        // comes from no response page
        if (!id) {
            checkIfExistsReservationMsg();
        }

        var tpe = getQueryString('questionType');
        var select = $el.find('#reservationquestionType');
        appendSelect(select, tpe);

        var timestamp3 = getQueryString('reservationTime');
        var newDate = new Date();
        //      console.log(newDate + ' xxx ' + newDate.getFullYear() + '...' + newDate.getMonth() + '...' + newDate.getDate() + '...' + newDate.getHours());
        var str = newDate.getFullYear() + '-' + fix((newDate.getMonth() + 1), 2)
        + '-' + fix(newDate.getDate(), 2) + 'T' + fix(newDate.getHours(), 2)
        + ':' + fix(newDate.getMinutes(), 2);
        if (timestamp3) {
            $el.find('#reservationTime').val(str);
        }

        var now = new Date();
        $el.find('.link_confirm ,.link_btn_unpaidErrConfirm ').click(function (event) {
            $el.find('.popUp_unpaidErr').hide();
        });

        $el.find('.reservationbtn').click(function () {
            // 获取分类和预约时间
            var x = $el.find('#reservationTime').val();
            now.setFullYear(parseInt(x.substring(0, 4), 10));
            now.setMonth(parseInt(x.substring(5, 7), 10) - 1);
            now.setDate(parseInt(x.substring(8, 10), 10));
            now.setHours(parseInt(x.substring(11, 13), 10));
            now.setMinutes(parseInt(x.substring(14, 16), 10));

            var curDate = new Date();
            var nowT2 = new Date(curDate.getTime() + 24 * 60 * 60 * 1000 * 3);
            var oTimer = document.getElementById('reservationTime');
            var timeStamp = new Date(oTimer.value).getTime();

            if (!now || !x) {
                $el.find('#message').html('请选择预约时间');
                $el.find('.popUp_unpaidErr').show();
            }
            else if (timeStamp > nowT2
                || timeStamp < (new Date()).getTime()) {
                $el.find('#message').html('可预约3天内的服务');
                $el.find('.popUp_unpaidErr').show();
            }
            else if (now.getHours() < 8 || now.getHours() > 24) {
                $el.find('#message').html('可预约8:00-24:00内的服务');
                $el.find('.popUp_unpaidErr').show();
            }
            else {
                // 点击提交预约，百度统计
                //          window._hmt && window._hmt.push(['_trackEvent', "reservation_reservationbtn", 'click']);
                // 可提交预约,调用接口
                var reservationquestionType = $el.find('#reservationquestionType').val();
                var reservationTime = formatvalidTime(new Date(oTimer.value.replace('T', ' ')), 'yyyy-MM-dd HH:mm');
                console.log(reservationquestionType + ' .. ' + reservationTime);
                commitReservationMsg(reservationquestionType, reservationTime);
            }
        });

        function commitReservationMsg(reservationquestionType, reservationTime) {
            $.ajax({
                type: 'post',
                url: hosturl + 'reservation/addRequestReservation?questionType='
                    + reservationquestionType + '&reservationTimeString='
                    + reservationTime + '&_csrf=' + $el.find('#_csrf').val() + '&sessionId=' + sessionId,
                success: function (g) {
                    // console.log(g);
                    if (g.status === 0) {
                        localStorage.setItem('reservationSuccess', true);
                        $el.find('#message').text(g.message);
                        $el.find('.popUp_unpaidErr').show();
                        setTimeout(function () {
                            window.top.location.href = './';
                        }, 2000);
                    }
                    else if (g.status === 1) {
                        $el.find('#message').text(g.message);
                        $el.find('.popUp_unpaidErr').show();
                    }

                },
                error: function (a) {
                    if (a.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }
        // 获取url参数
        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }
        function appendSelect(select, tpe) {
            if (tpe === 'CT001') {
                select.append('<option value=\'CT001\' selected>婚姻家庭</option>');
            }
            else {
                select.append('<option value=\'CT001\'>婚姻家庭</option>');
            }
            if (tpe === 'CT002') {
                select.append('<option value=\'CT002\' selected>房产物业</option>');
            }
            else {
                select.append('<option value=\'CT002\'>房产物业</option>');
            }
            if (tpe === 'CT003') {
                select.append('<option value=\'CT003\' selected>交通意外</option>');
            }
            else {
                select.append('<option value=\'CT003\'>交通意外</option>');
            }
            if (tpe === 'CT006') {
                select.append('<option value=\'CT006\' selected>民间借贷</option>');
            }
            else {
                select.append('<option value=\'CT006\'>民间借贷</option>');
            }
            if (tpe === 'CT004') {
                select.append('<option value=\'CT004\' selected>劳动用工</option>');
            }
            else {
                select.append('<option value=\'CT004\'>劳动用工</option>');
            }
            if (tpe === 'CT008') {
                select.append('<option value=\'CT008\' selected>合同纠纷</option>');
            }
            else {
                select.append('<option value=\'CT008\'>合同纠纷</option>');
            }
            if (tpe === 'CT010') {
                select.append('<option value=\'CT010\' selected>人身伤害</option>');
            }
            else {
                select.append('<option value=\'CT010\'>人身伤害</option>');
            }
            if (tpe === 'CT007') {
                select.append('<option value=\'CT007\' selected>其他问题</option>');
            }
            else {
                select.append('<option value=\'CT007\'>其他问题</option>');
            }
            if (tpe === 'CT064') {
                select.append('<option value=\'CT064\' selected>消费维权</option>');
            }
            else {
                select.append('<option value=\'CT064\'>消费维权</option>');
            }
        }

        // 将日期格式化为两位，不足补零
        function fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
        }

        // 时间 毫秒转固定格式
        function formatvalidTime(time, format) {
            if (time == null) {
                return null;
            }

            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i;
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            });
        }
        function getReservationMsg() {
            $.ajax({
                type: 'GET',
                url: hosturl + 'getOrderCount' + '?sessionId=' + sessionId,
                success: function (g) {
                    if (g.RQ && g.RQ.payState === '6') { // 6:欠费时
                        $el.find('#popUp').show();
                        $el.find('#cimmentmessage').text('因您有1个未支付订单，预约已暂停。支付后预约立刻恢复');
                        $el.find('#link_done').text('去支付');
                        $el.find('#link_undo').click(function () {
                            $el.find('#popUp').hide();
                        });
                        $el.find('#link_done').click(function () {
                            var tmpUrl = 'mipilaw66baidu_couponPay?requestId='
                            + g.RQ.requestId + '&questionType=' + g.RQ.questionType + '&sessionId=' + sessionId;
                            locahost(tmpUrl, '支付订单');
                        });
                    }
                    else {
                        if (g.RV) {
                            $el.find('#reservationquestionTypeContent').text(g.RV.questionTypeString);
                            $el.find('#reservationTime').text(g.RV.reservationTimeString);
                            $el.find('.reservationbtn_change').click(function () { // 修改预约
                                var tmpUrl = 'mipilaw66baidu_reservation'
                                + '?questionType=' + g.RV.questionType
                                + '&reservationTime=' + g.RV.reservationTime
                                    + '&id=' + g.RV.id + '&sessionId=' + sessionId;
                                locahost(tmpUrl, '修改预约');
                            });
                            $el.find('.reservationbtn_cancel').click(function () { // 取消预约
                                cancelReservation(g.RV.id);
                            });
                        }
                        else {
                            console.log('获取预约信息失败');
                        }
                    }
                },
                error: function (a) {
                    if (a.status === 403) {
                        window.location.reload();
                    }

                }
            });
        }

        function checkIfExistsReservationMsg() {
            $.ajax({
                type: 'GET',
                url: hosturl + 'reservation/findRequestReservationByUserId' + '?sessionId=' + sessionId,
                async: false,
                success: function (data) {
                    console.log(data);
                    if (data.info) {
                        $el.find('#popUp').show();
                        $el.find('#cimmentmessage').text('您已经预约过了，如有需要可以修改');
                        $el.find('#link_undo').click(function () {
                            $el.find('#popUp').hide();
                        });
                        $el.find('#link_done').click(function () {
                            var tmpUrl = 'mipilaw66baidu_myreservation' + '?sessionId=' + sessionId;
                            locahost(tmpUrl, '查看预约');
                        });
                    }

                },
                error: function (a) {
                    alert('系统异常，请稍后再试');
                }
            });
        }

        $el.find('#link_undo').click(function () {
            $el.find('#popUp').hide();
        });
        function cancelReservation(cancelid) {
            $el.find('#popUp').show();
            $el.find('#cimmentmessage').text('确定取消本次咨询预约吗？');
            $el.find('#link_undo').click(function () {
                $el.find('#popUp').hide();
            });
            $el.find('#link_done').click(function () {
                $el.find('#popUp').hide();
                $.ajax({
                    type: 'POST',
                    url: hosturl + 'reservation/cancelRequestReservation?id=' + cancelid + '&_csrf='
                    + $el.find('#_csrf').val() + '&sessionId=' + sessionId,
                    success: function (g) {
                        console.log(g);
                        if (g.status === 0) {
                            $el.find('#message').text('预约已取消');
                            $el.find('.popUp_unpaidErr').show();
                            $el.find('.link_confirm ,.link_btn_unpaidErrConfirm ').click(function () {
                                window.top.location.href = './';
                            });
                        }
                        else if (g.status === 1) {
                            $el.find('#message').text('预约取消失败，请重试');
                            $el.find('.popUp_unpaidErr').show();
                        }

                    },
                    error: function (a) {
                        if (a.status === 403) {
                            window.location.reload();
                        }

                    }
                });

            });
        }

        //      function isWeiXin() {
        //          var ua = window.navigator.userAgent.toLowerCase();
        //          if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        //              return true;
        //          }
        //          else {
        //              return false;
        //          }
        //      }
    };

    return customElement;
});
