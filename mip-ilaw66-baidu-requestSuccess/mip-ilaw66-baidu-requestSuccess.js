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
                    + This.option.yes + '</div>'
                    + '<div class="back-continue" id="js-back-continue">'
                    + This.option.no + '</div>';
                if (!This.option.yes) {
                    btnN = '<div class="back-continue back-continue__one" id="js-back-continue">'
                        + This.option.no + '</div>';
                }

                This.main = '<div class="back__pop popUP" style="display:none;" id="back__pop">'
                    + '<div class="layer__wrapper"></div>'
                    + '<div class="back__popLayer">' + '<span>'
                    + This.option.title + '</span>' + '<span>'
                    + This.option.main + '</span>'
                    + btnN + '</div>' + '</div>';
                This.body.append(This.main);
                This.PopUp = $('.popUP');
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
                    + '<div class="back__popLayer__toast">'
                    + '<span>' + This.option.main + '</span>'
                    + '</div>' + '</div>';
                This.body.append(This.main);
                This.ToastUp = $('.ToastUp');
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

        /*

                var temp = {
                    imgUrl: 'http://images.ilaw66.com/images/authorize/banner_new_first.png',
                    lawyerName: '某律师',
                    questionType: '婚姻家庭',
                    count: 2541,
                    score: [0, 0 ,0 ,0],
                    cardId: '13101xxx10862612'
                };
                var tp = document.getElementById("mip-template-lawyerMsg");
                templates.render(tp, temp).then(function (html) {
                    tp.innerHTML = html;
                });

        */

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
                                    'mip_linking?questionType=' + questionType + '&lawyerName=' + lawyerName
                                    + '&requestId=' + id + '&askingType=' + askingType + '&lawyerId=' + lawyerId
                                    + '&tel=' + tel + '&goodCommentRate=' + goodCommentRate);
                                window.top.location.href = url;
                            }
                            else {
                                var temp = {
                                    imgUrl: data.avatar,
                                    lawyerName: data.lawyerName,
                                    questionType: data.lawyerField,
                                    count: data.count,
                                    score: data.score,
                                    // count: data.count, //律师服务次数
                                    // score: [1,1,1,1], //律师的用户评价 数组，如4颗星数组长度为4
                                    // cardId: "13101xxx10862612"
                                    cardId: data.cardId // 律师执业证号
                                };
                                var tp = document.getElementById('mip-template-lawyerMsg');
                                templates.render(tp, temp).then(function (html) {
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

        function startConsulting(b) {
            $.ajax({
                url: 'greeting',
                url: 'greeting?questionType=' + b + '&_csrf=' + $el.find('#_csrf').val(),
                success: function (a) {
                    if (a === 'ERROR' || a === 'ERROR1' || a === 'ERROR2' || a === 'ERROR3' || a === 'ERROR4') {
                        backOr('温馨提示', b.error, '', '确定', function () {}, function () {});
                    }
                    else {
                        window.top.location.href = 'mip_request?data=' + a + '&questionType=' + b;
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
