/**
 * @file mip-ilaw66-baidu-request 组件
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
        var lawyerId;

        function PopUp(option) {
            this.init(option);
            return this;
        }

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
                var btnN = '<div class="back-leave" id="js-back-leave">'
                    + This.option.yes + '</div>' + '<div class="back-continue" id="js-back-continue">'
                    + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>' + '<div class="back__popLayer">' + '<span>'
                    + This.option.title + '</span>' + '<span>' + This.option.main
                    + '</span>' + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $el.find('.popUP');
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

                /*This.PopUp.on('click', '.layer__wrapper', function () {
                 This.PopUp.remove();
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
                This.main = '<div class="back__pop ToastUp" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper layer__wrapper__toast"></div>'
                    + '<div class="back__popLayer__toast">' + '<span>'
                    + This.option.main + '</span>' + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $el.find('.ToastUp');
                This.ToastUp.show();
            },
            bindEvent: function () {
                var This = this;
                //  显示内容2秒
                setTimeout(function () {
                        This.ToastUp.remove();
                    },
                    2000);
            }
        };

        window.ToastUp = ToastUp;

        function backOr(f, a, e, d, c, b) {
            new PopUp({
                title: f,
                main: a,
                yes: e,
                no: d,
                popYes: function (g) {
                    c.call(this, g);
                },
                popNo: function (g) {
                    b.call(this, g);
                }
            });
        }

        function toastOr(a) {
            new ToastUp({
                main: a
            });
        }

           /*     var temp = {};
                temp.list = [];
                temp.list.push({
                    value: 0,
                    name: '某律师0',
                    identifyPhoto: 'http://images.ilaw66.com/images/authorize/banner_new_first.png'
                });
                temp.list.push({
                    value: 1,
                    name: '某律师1',
                    identifyPhoto: 'http://images.ilaw66.com/images/authorize/banner_new_first.png'
                });
                // var tp = $el.find('#mip-template-lawyerImg');
                var tp = document.getElementById('mip-template-lawyerImg');
                templates.render(tp, temp).then(function (html) {
                    tp.innerHTML = html;
                });*/

        $el.find('.jingxuan_top').css('background-image', 'url("images/bg_jingxuanlvshi.png")');
        $el.find('.jingxuan_top>img').attr('src', 'images/bg_touxiangjx.png');

        getLawyerImgs();
        var i = 0;
        timer = setInterval(function () {
            i++;
            $el.find('.countdownTime').text(i);
            var date = new Date();
            countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);
            settime();
            if (i >= 120) {
                pauseAnimation();
                clearInterval(timer);
                $el.find('.countdownTime').text('120');
            }

        }, 1000);
        // 取消按钮事件
        $el.find('.cancelBtn').click(function () {
            window.top.location.href = './'; // 取消跳转至首页
        });
        // 取消咨询, 头部返回按钮
        $el.find('.tocancle').click(function () {
            cancelRequestOr('./');
        });

        // 每隔更改15秒,更改律师匹配数量一次
        changeLawyerNum();

        lawyerId = getQueryString('lawyerId');

        // back键处理
        $el.find('.glyphicon').on('click', function () {
            gobackHandle();
        });

        $el.find('#requestId').val(getQueryString('data'));
        $el.find('#questionType').val(getQueryString('questionType'));
        $el.find('#askingType').val(getQueryString('askingType'));

        // 根据咨询类型：是否继续问显示不同内容
        if ($el.find('#askingType').val() === '02') {
            $el.find('.request_txt').html('请耐心等待，联系律师中...');
            $el.find('.icon_title').html('<span class=\'failed_icon\'>'
                + '</span>请求失败!');
            $el.find('.failed_txt').html('<span class=\'failed_title\'>'
                + '可能因为</span><br/>1.处于非工作时间<br/>'
                + '2.您所选的律师正在服务中<br/>3.您所选的律师目前不在线');
            $el.find('#reAsk').html('重新咨询');
        }

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }

            return null;
        }

        function settime() {
            var id = $el.find('#requestId').val();
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();
            // console.log(countdown);

            if (countdown > 60) {
                clearInterval(timer);
                window.top.location.href = 'mip_lawyer_noresponse?questionType=' + questionType;
            }
            else {
                if (countdown % 5 === 0) {
                    $.ajax({
                        type: 'GET',
                        url: 'timer?id=' + id,
                        dataType: 'json',
                        success: function (data) {
                            var dataStatus = data.status;
                            if (dataStatus === 2 || dataStatus === 5 || dataStatus === 6
                                || dataStatus === 7 || dataStatus === 8
                                || dataStatus === 11 || dataStatus === 12) {
                                clearInterval(timer);
                                var url = encodeURI(
                                    'mipilaw66baidu_linking?questionType=' + questionType + '&lawyerName='
                                    + data.lawyerName + '&requestId=' + id + '&askingType='
                                    + askingType + '&lawyerId=' + data.lawyerId + '&tel='
                                    + data.tel + '&goodCommentRate=' + data.goodCommentRate);
                                window.top.location.href = url;
                            }
                            else if (dataStatus === 4 || dataStatus === 1 || dataStatus === 3
                                || dataStatus === 9 || dataStatus === 10
                                || dataStatus === 'ERROR' || dataStatus === 'ERROR1') {
                                clearInterval(timer);
                                window.top.location.href = 'mip_lawyer_noresponse?questionType=' + questionType;
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
                        pauseAnimation();
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

        // 停止定时器
        function pauseAnimation() {
            $el.find('.leftcircle').css('animation-play-state', 'paused');
            $el.find('.rightcircle').css('animation-play-state', 'paused');
            $el.find('.leftcircle').css('-webkit-animation-play-state', 'paused');
            $el.find('.rightcircle').css('-webkit-animation-play-state', 'paused');
        }

        // 改变精选律师匹配数量
        function changeLawyerNum() {
            var lawyerNumTime = 0;
            var initNum = Math.ceil(Math.random() * 5 + 8);
            $el.find('.jingxuanLawyer_num').text(initNum);
            setInterval(function () {
                lawyerNumTime += 15;
                var num;
                if (lawyerNumTime >= 0 && lawyerNumTime < 15) {
                    num = Math.ceil(Math.random() * 5 + 8 * 2);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 15 && lawyerNumTime < 30) {
                    num = Math.ceil(Math.random() * 6 + 8 * 3);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 30 && lawyerNumTime < 45) {
                    num = Math.ceil(Math.random() * 7 + 8 * 4);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }
                else if (lawyerNumTime >= 45 && lawyerNumTime < 60) {
                    num = Math.ceil(Math.random() * 8 + 8 * 5);
                    // console.log(num);
                    $el.find('.jingxuanLawyer_num').text(num);
                }

            }, 15000);
        }
        function gobackHandle() {
            if (!sessionStorage.getItem('loginFlg') && sessionStorage.getItem('loginFlg') === 0) {
                window.top.location.href = 'mipilaw66baidu_login';
            }
            else {
                window.top.location.href = './';
            }
        }
        function getLawyerImgs() {
            var b = {};
            b.list = [];
            $.ajax({
                type: 'post',
                url: 'lawyerOnlines?_csrf=' + $el.find('#_csrf').val()
                    + '&questionType=' + getQueryString('questionType'),
                async: false,
                success: function (data) {
                    if (!data || data.length === 0) {
                    // no lawyer msg
                    }
                    else {
                        for (var h = 0; h < data.length; h++) {
                            var a = data[h];
                            b.list.push(a);
                        }
                        var tp = $el.find('#mip-template-lawyerImg');
                        templates.render(tp, b).then(function (html) {
                            tp.innerHTML = html;
                        });
                    }
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
