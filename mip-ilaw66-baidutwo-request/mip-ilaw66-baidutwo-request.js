/**
 * @file mip-ilaw66-baidutwo-request 组件
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
        var timer;
        var lawyerId;
        var dataStatus = 0;
        $el.find('#questionType').val(getQueryString('questionType'));
        var canvas = document.getElementById('canvas'); // 获取canvas元素
        var context = canvas.getContext('2d'); // 获取画图环境，指明为2d
        var centerX = canvas.width / 2; // Canvas中心点x轴坐标
        var centerY = canvas.height / 2; // Canvas中心点y轴坐标
        var rad = Math.PI * 2 / 60; // 将360度分成100份，那么每一份就是rad度
        var speed = 0; // 圈
        var textstring = 60;
        var times;
        // 绘制5像素宽的运动外圈
        function blueCircle(n) {
            context.save();
            context.strokeStyle = '#fff'; // 设置描边样式
            context.lineWidth = 4; // 设置线宽
            context.beginPath(); // 路径开始
            context.arc(centerX, centerY, 25, -Math.PI / 2, -Math.PI / 2 + n * rad, false); // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); // 绘制
            context.closePath(); // 路径结束
            context.restore();
        }
        // 绘制白色外圈
        function whiteCircle() {
            context.save();
            context.beginPath();
            context.lineWidth = 2; // 设置线宽
            context.strokeStyle = '999';
            context.arc(centerX, centerY, 25, 0, Math.PI * 2, false);
            context.stroke();
            context.closePath();
            context.restore();
        }
        // 百分比文字绘制
        function text(n) {
            context.save(); // save和restore可以保证样式属性只运用于该段canvas元素
            context.strokeStyle = '#333'; // 设置描边样式
            context.font = '14px Arial'; // 设置字体大小和字体
            // 绘制字体，并且指定位置
            if (n > 10) {
                context.strokeText(n.toFixed(0), centerX - 8, centerY + 5);
            }
            else {
                context.strokeText(n.toFixed(0), centerX - 10, centerY + 5);
            }
            context.stroke(); // 执行绘制
            context.restore();
        }
        // 动画
        function drawFrame() {
            times = setInterval(function () {
                context.clearRect(0, 0, canvas.width, canvas.height);
                whiteCircle();
                text(textstring);
                blueCircle(speed);
                if (speed > 60) {
                    speed = 0;
                }

                speed += 1;
                if (textstring <= 0) {
                    clearInterval(times);
                    textstring = 0;
                }
                else {
                    textstring -= 1;
                }
            }, 1000);
        }
        drawFrame();

        $el.find('.jingxuan_top').css('background-image', 'url("images/bg_jingxuanlvshi.png")');
        $el.find('.jingxuan_top>img').attr('src', 'images/bg_touxiangjx.png');
        var questionType = $el.find('#questionType').val();
        getLawyerImgs();
        var i = 0;
        timer = setInterval(function () {
            if (countdown > 60) {
                clearInterval(timer);
                window.top.location.href = 'mipilaw66baidu_lawyer_noresponse?questionType=' + questionType;
            }

            i++;
            $el.find('.countdownTime').text(i);
            var date = new Date();
            countdown = (date.getHours() - begin) * 3600 + (date.getMinutes() - min) * 60 + (date.getSeconds() - sec);

            if (i >= 120) {
                pauseAnimation();
                clearInterval(timer);
                $el.find('.countdownTime').text('120');
            }

        }, 1000);
        settime();
        // 取消按钮事件
        $el.find('.cancelBtn').click(function () {
            window.top.location.href = './'; // 取消跳转至首页
        });
        // 取消咨询, 头部返回按钮
        $el.find('.tocancle').click(function () {
            clickBackOr();
        });

        // 每隔更改15秒,更改律师匹配数量一次
        changeLawyerNum();

        lawyerId = getQueryString('lawyerId');

        // back键处理
        $el.find('.glyphicon').on('click', function () {
            clickBackOr();
        });

        $el.find('#requestId').val(getQueryString('data'));

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

        function clickBackOr() {
            var title = '';
            var main = '累计取消三次，当天将无法再次咨询，确定取消本次咨询吗？';
            var yes = '确定取消';
            var no = '点错了';
            $el.find('.backOr_div .back__popLayer span:nth-of-type(1)').text(title);
            $el.find('.backOr_div .back__popLayer span:nth-of-type(2)').text(main);
            $el.find('.backOr_div .back__popLayer .back-leave').text(yes);
            $el.find('.backOr_div .back__popLayer .back-continue').text(no);
            $el.find('.backOr_div').show();
            $el.find('.backOr_div .back__popLayer .back-leave').click(function () {
                $el.find('.backOr_div').hide();
                cancelRequestOr();
            });
            $el.find('.backOr_div .back__popLayer .back-continue').click(function () {
                $el.find('.backOr_div').hide();
            });
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

            var id = getQueryString('data');
            var questionType = $el.find('#questionType').val();
            var askingType = $el.find('#askingType').val();

            if (countdown <= 60) {
                var socket;
                var t;
                var MAX = 1000;
                var count = 0;

                var reconnection = function () {
                    count = count + 1;
                    // 1与服务器已经建立连接
                    if (count >= MAX || socket.readyState === 1) {
                        clearTimeout(t);
                    }
                    else {
                        // 2已经关闭了与服务器的连接
                        if (socket.readyState === 3) {
                            connection();
                        }

                        // 0正尝试与服务器建立连接,2正在关闭与服务器的连接
                        t = setTimeout(function () {
                            //              			console.log("重新连接")
                            reconnection();
                        }, 200);
                    }
                };
                var onopen = function () {
                    console.log('open...');
                };
                var onclose = function () {
                    //              		console.log("close...");
                    reconnection();
                };
                var onmessage = function (event) {
                    //              	  var ms=JSON.stringify(event);
                    //              		console.log("message..." +ms);
                    //              		console.log(event.data)
                    var data = JSON.parse(event.data);
                    dataStatus = data.status;

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
                        window.top.location.href = 'mipilaw66baidu_lawyer_noresponse?questionType='
                            + questionType;
                    }

                };
                var onerror = function () {
                    console.log('error...');
                    reconnection();
                };
                var connection = function () {
                    //                  var fromUserId = document.getElementById('fromUserId');
                    var url = 'ws://test.ilaw66.com/peony/orderpush.ws?deviceId=' + id;
                    socket = new WebSocket(url);
                    socket.onopen = onopen;
                    socket.onmessage = onmessage;
                    socket.onclose = onclose;
                    socket.onerror = onerror;
                };
                connection();
            }
        }
        function cancelRequestOr() {
            $.ajax({
                url: 'cancelRequest?requestId=' + $el.find('#requestId').val() + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',
                success: function (data) {
                    if (data === 'NG') {
                        $el.find('.toast_txt').text('取消晚了，律师正在联系您');
                        $el.find('.toast_div').show();
                        setTimeout(function () {
                            $el.find('.toast_div').hide();
                        }, 2000);
                    }
                    else if (data === 'OK') {
                        pauseAnimation();
                        clearInterval(timer);
                        $el.find('.toast_txt').text('取消成功');
                        $el.find('.toast_div').show();
                        setTimeout(function () {
                            $el.find('.toast_div').hide();
                            gobackHandle();
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
            if (!parseInt(sessionStorage.getItem('loginFlg'), 10) && sessionStorage.getItem('loginFlg') === '0') {
                window.top.location.href = 'login';
            }
            else {
                window.top.location.href = './';
            }
        }
        function getLawyerImgs() {
            var temp = {};
            temp.list = [];
            $.ajax({
                type: 'post',
                url: 'lawyerOnlines?_csrf=' + $el.find('#_csrf').val()
                    + '&questionType=' + getQueryString('questionType'),
                async: false,
                success: function (data) {
                    var data = data.data;
                    if (!data || data.length === 0) {
                    // no lawyer msg
                    }
                    else {
                        for (var h = 0; h < data.length; h++) {
                            var a = data[h];
                            temp.list.push({
                                name: a.name,
                                identifyPhoto: a.identifyPhoto
                            });
                        }
                        var tempHtml = '';
                        tempHtml += '<mip-carousel '
                            + 'autoplay '
                            + 'layout="responsive" '
                            + 'width="60" '
                            + 'height="90">';
                        temp.list.forEach(function (item) {
                            tempHtml += '<a  href="javascript:;"><mip-img class="mip_img" width="60" height="60"'
                                + ' src="' + item.identifyPhoto + '"></mip-img>'
                                + ' <div class="mip-carousle-subtitle">' + item.name + '</div></a>';
                        });
                        tempHtml += '</mip-carousel>';
                        $el.find('#mip-template-lawyerImg').html(tempHtml);
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
