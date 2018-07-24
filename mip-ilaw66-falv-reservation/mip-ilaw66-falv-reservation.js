/**
 * @file mip-ilaw66-falv-reservation 组件
 * @author
 */

define(function (require) {
    var $ = require('jquery');
    // zepto不支持一些方法，比如is方法，所以要使用jquery
    var customElement = require('customElement').create();

    /**
	 * 第一次进入可视区回调，只会执行一次
	 */
    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);

        /* pop.js  */

        //  封装弹窗插件
        // back弹框样式
        function PopUp(option) {
            this.init(option);
            return this;
        }

        PopUp.prototype = {
            constructor: PopUp,
            init: function (option) {
                var This = this;
                This.option = {
                    title: '弹窗标题',
                    main: '弹窗内容',
                    yes: '确定',
                    no: '取消',
                    popYes: function () {},
                    popNo: function () {}
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                var btnN = '<div class="back-leave" id="js-back-leave">' + This.option.yes + '</div>'
                + '<div class="back-continue" id="js-back-continue">' + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                    + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUp" style="display:none;" id="back__pop">'
                + '<div class="layer__wrapper"></div>'
                + '<div class="back__popLayer">'
                + '<span>' + This.option.title + '</span>'
                + '<span>' + This.option.main + '</span>'
                + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = This.body.find('.popUp');
                This.PopUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  点击离开事件
                This.PopUp.on('click', '#js-back-leave', function () {
                    This.PopUp.remove();
                    This.option.popYes();
                });
                //  点击确认事件
                This.PopUp.on('click', '#js-back-continue', function () {
                    This.PopUp.remove();
                    This.option.popNo();

                });
                //  点击遮罩层事件 --- 点击不关闭，必须点按钮

                /*This.popUp.on('click', '.layer__wrapper', function () {
                    This.popUp.remove();
                })*/

            }
        };

        window.PopUp = PopUp;

        // 取消内容显示样式
        function ToastUp(option) {
            this.init(option);
            return this;
        }
        ToastUp.prototype = {
            constructor: ToastUp,
            init: function (option) {
                var This = this;
                This.option = {
                    main: '显示内容'
                };
                $.extend(true, this.option, option || {});
                This.dom();
                This.bindEvent();
            },
            dom: function () {
                var This = this;
                This.body = $('body');
                This.main = '<div class="back__pop toastUp" style="display:none;" id="back__pop">'
                + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                + '<div class="back__popLayer__toast">'
                + '<span>' + This.option.main + '</span>'
                + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = This.body.find('.toastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                    This.ToastUp.remove();
                }, 2000);
            }
        };

        window.ToastUp = ToastUp;

        $el.find('#btn1').on('click', function () {
            new PopUp({
                title: '温馨提示',
                main: '优惠不等人，请三思而行',
                yes: '狠心离开',
                no: '我再想想',
                popYes: function () {
                    alert('狠心离开');
                },
                popNo: function () {
                    alert('我再想想');
                }
            });
        });

        $el.find('#btn2').on('click', function () {
            new PopUp({
                title: '弹窗提醒',
                main: '如果说你真的要走',
                yes: '我真的要走',
                no: '其实我想留',
                popYes: function () {
                    alert('我先走了');
                },
                popNo: function () {
                    alert('我要留下');
                }
            });
        });

        function backOr(title, main, yes, no, sfunc, ffunc) {
            new PopUp({
                title: title,
                main: main,
                yes: yes,
                no: no,
                popYes: function (a) {
                    //  alert('离开本页');
                    sfunc.call(this, a);
                },
                popNo: function (a) {
                    //  alert('留下等待');
                    ffunc.call(this, a);
                }
            });
        }

        function toastOr(main) {
            new ToastUp({
                main: main
            });
        }
        // reservation.js
        $(function () {
            if (location.href.indexOf('mip_myreservation') > 0) { // 进入‘我的咨询’页面
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
            console.log(newDate + ' xxx ' + newDate.getFullYear() + '...'
            + newDate.getMonth() + '...' + newDate.getDate() + '...' + newDate.getHours());
            var str = newDate.getFullYear() + '-' + fix((newDate.getMonth() + 1), 2) + '-'
            + fix(newDate.getDate(), 2) + 'T' + fix(newDate.getHours(), 2)
            + ':' + fix(newDate.getMinutes(), 2);
            if (timestamp3) {
                $el.find('#reservationTime').val(str);
            }

            var now = new Date();
            $el.find('.reservationbtn').click(function () {
                // 获取分类和预约时间
                var x = $el.find('#reservationTime').val();
                now.setFullYear(parseInt(x.substring(0, 4), 10));
                now.setMonth(parseInt(x.substring(5, 7), 10) - 1);
                now.setDate(parseInt(x.substring(8, 10), 10));
                now.setHours(parseInt(x.substring(11, 13), 10));
                now.setMinutes(parseInt(x.substring(14, 16), 10));
                console.log('预约时间：' + formatvalidTime(now, 'yyyy/MM/dd HH:mm'));
                var nowT = new Date();
                nowT.setDate(nowT.getDate() + 3);
                console.log('可预约时间范围：' + formatvalidTime(nowT, 'yyyy/MM/dd HH:mm'));

                if (!now || !x) {
                    toastOr('请选择预约时间');
                }
                else if (formatvalidTime(now, 'yyyy/MM/dd HH:mm')
                > formatvalidTime(nowT, 'yyyy/MM/dd HH:mm') || formatvalidTime(new Date(), 'yyyy/MM/dd HH:mm')
                > formatvalidTime(now, 'yyyy/MM/dd HH:mm')) {
                    toastOr('可预约3天内的服务');
                }
                else if (now.getHours() < 8 || now.getHours() > 24) {
                    toastOr('可预约8:00-24:00内的服务');
                }
                else {
                    // 可提交预约,调用接口
                    var reservationquestionType = $el.find('#reservationquestionType').val();
                    var reservationTime = formatvalidTime(now, 'yyyy-MM-dd HH:mm');
                    console.log(reservationquestionType + ' .. ' + reservationTime);
                    commitReservationMsg(reservationquestionType, reservationTime);
                }
            });
        });

        function commitReservationMsg(reservationquestionType, reservationTime) {
            $.ajax({
                type: 'post',
                url: 'reservation/addRequestReservation?questionType=' + reservationquestionType
                + '&reservationTimeString=' + reservationTime + '&_csrf=' + $el.find('#_csrf').val(),
                success: function (g) {
                    console.log(g);
                    if (g.status === 0) {
                        localStorage.setItem('reservationSuccess', true);
                        window.top.location.href = './';
                    }
                    else if (g.status === 1) {
                        toastOr(g.message);
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
            else {
                return null;
            }
        }

        function appendSelect(select, tpe) {
            if (tpe === 'CT001') {
                select.append('<option value="CT001" selected>婚姻家庭</option>');
            }
            else {
                select.append('<option value="CT001">婚姻家庭</option>');
            }
            if (tpe === 'CT002') {
                select.append('<option value="CT002" selected>房产物业</option>');
            }
            else {
                select.append('<option value="CT002">房产物业</option>');
            }
            if (tpe === 'CT003') {
                select.append('<option value="CT003" selected>交通意外</option>');
            }
            else {
                select.append('<option value="CT003">交通意外</option>');
            }
            if (tpe === 'CT006') {
                select.append('<option value="CT006" selected>民间借贷</option>');
            }
            else {
                select.append('<option value="CT006">民间借贷</option>');
            }
            if (tpe === 'CT004') {
                select.append('<option value="CT004" selected>劳动用工</option>');
            }
            else {
                select.append('<option value="CT004">劳动用工</option>');
            }
            if (tpe === 'CT008') {
                select.append('<option value="CT008" selected>合同纠纷</option>');
            }
            else {
                select.append('<option value="CT008">合同纠纷</option>');
            }
            if (tpe === 'CT010') {
                select.append('<option value="CT010" selected>人身伤害</option>');
            }
            else {
                select.append('<option value="CT010">人身伤害</option>');
            }
            if (tpe === 'CT007') {
                select.append('<option value="CT007" selected>其他问题</option>');
            }
            else {
                select.append('<option value="CT007">其他问题</option>');
            }
            if (tpe === 'CT064') {
                select.append('<option value="CT064" selected>消费维权</option>');
            }
            else {
                select.append('<option value="CT064">消费维权</option>');
            }
        }

        // 将日期格式化为两位，不足补零
        function fix(num, length) {
            return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : ''
            + num;
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
                url: 'getOrderCount',
                success: function (g) {
                    if (g.RQ && g.RQ.payState === 6) { // 6:欠费时
                        backOr('', '因您有1个未支付订单，预约已暂停。支付后预约立刻恢复', '', '去支付', function () {}, function () {
                            // location.href = 'order?requestId=' + g.RQ.requestId + '&questionType=' + g.RQ.questionType;
                            window.top.location.href = 'mip_couponPay?requestId='
                            + g.RQ.requestId + '&questionType=' + g.RQ.questionType;
                        });
                    }
                    else {
                        if (!g.RV) {
                            $el.find('#reservationquestionTypeContent').text(g.RV.questionTypeString);
                            $el.find('#reservationTime').text(g.RV.reservationTimeString);
                            $el.find('.reservationbtn_change').click(function () { // 修改预约
                                window.top.location.href = 'mip_reservation?questionType=' + g.RV.questionType
                                + '&reservationTime=' + g.RV.reservationTime
                                + '&id=' + g.RV.id;
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
                url: 'reservation/findRequestReservationByUserId',
                async: false,
                success: function (data) {
                    console.log(data);
                    if (data.info) {
                        backOr('', '您已经预约过了，如有需要可以修改', '', '我知道了', function () {}, function () {
                            window.top.location.href = 'mip_myreservation';
                        });
                    }

                },
                error: function (a) {
                    console.log('系统异常，请稍后再试');
                    // window.location.reload();
                }
            });
        }

        function cancelReservation(cancelid) {
            var title = '';
            var main = '确定取消本次咨询预约吗？';
            var yes = '取消';
            var no = '确定';
            backOr(title, main, yes, no, function () {}, function () {
                $.ajax({
                    type: 'POST',
                    url: 'reservation/cancelRequestReservation?id='
                    + cancelid + '&_csrf=' + $el.find('#_csrf').val(),
                    success: function (g) {
                        console.log(g);
                        if (g.status === 0) {
                            toastOr('预约已取消');
                            setTimeout(function () {
                                window.top.location.href = './';
                            }, 2000);
                        }
                        else if (g.status === 1) {
                            toastOr('预约取消失败，请重试');
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
    };

    return customElement;
});
