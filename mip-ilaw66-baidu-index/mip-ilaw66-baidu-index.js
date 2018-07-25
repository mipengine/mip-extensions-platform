/**
 * @file mip-ilaw66-baidu-index 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
   * 备注：部分地方存在全局选择因为部分地方规则限定
   */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var $el = $(this.element);
        bannerusernum();
        var questionType;
        var tabHref;
        var lawyerId = '';
        var flg = 0;
        var qSt = getQueryString('questionType');
        var search = location.search.toLowerCase();
        var channel = $el.find('#channel').val();
        var userId = $el.find('#userId').val();

        function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
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

        function getQueryString(name) {
            var reg = new RegExp('(^|&)'
                + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) {
                return unescape(r[2]);
            }

            return null;
        }

        var indexmessage = getQueryString('data');

        if (indexmessage === 'ERROR' || indexmessage === 'ERROR1') {
            $el.find('#' + tabHref).removeClass().addClass('tab-pane');
            flg = 0;
            $el.find('.popUp_sysErr').show();
        }
        else if (indexmessage === 'ERROR2') {
            $el.find('#' + tabHref).removeClass().addClass('tab-pane');
            flg = 0;
            $el.find('.popUp_unpaidErr').show();
        }
        else if (indexmessage === 'ERROR3') {
            $el.find('#' + tabHref).removeClass().addClass('tab-pane');
            flg = 0;
            $el.find('.popUp_unFinishedBillErr').show();
        }
        else if (indexmessage === 'ERROR4') {
            // toastOr("您今日取消咨询已达3次，请明天再来");
            $el.find('#' + tabHref).removeClass().addClass('tab-pane');
            flg = 0;
            alert('您今日取消咨询已达3次，请明天再来');
        }

        // 公共
        var flg = 0;
        // 滚屏控制 有弹出层出现 不可滚动
        function controlScroll() {
            flg = $el.find('.background_kuang').css('display') !== 'none' ? 1 : 0;
        }
        $(window).scroll(function (a) {
            controlScroll();
            if (flg === 1) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }

            a.stopPropagation();
        });
        document.addEventListener('touchmove', function (event) {
            controlScroll();
            if (flg === 1) {
                if (document.all) {
                    window.event.returnValue = false;
                }
                else {
                    event.preventDefault();
                }
            }

        });

        function haveNoPaidOrder(b) {
            $el.find('#topay').click(function () {
                var a = false;
                var d = '';
                $.ajax({
                    async: false,
                    type: 'GET',
                    data: {
                        requestIdList: b.requestId
                    },
                    url: 'checkFreeBill',
                    success: function (c) {
                        if (c.result === 2) {
                            a = true;
                            d = c.message;
                        }

                    },
                    error: function (c) {
                        if (c.status === 403) {
                            window.location.reload();
                        }

                    }
                });
                if (a) {
                    toastOr(d);
                    setTimeout(function () {
                        window.location.reload();
                    },
                        2e3);
                }
                else {
                    $.ajax({
                        type: 'get',
                        url: 'getRequestId',
                        data: {
                            requestId: b.requestId
                        },
                        async: false,
                        success: function (data) {
                            console.log('是否合并支付单号：' + data);
                            window.top.location.href = 'mipilaw66baidu_couponPay?requestId='
                            + data + '&questionType=' + b.questionType;
                        },
                        error: function () {
                            window.location.reload();
                        }
                    });
                }
            });
        }

        $el.find('.media').click(function () {
            var tabHref = $(this).data('href');
            $el.find('#' + $(this).data('href')).removeClass().addClass('tab-pane active');
            flg = 1;
            event.preventDefault();
        });

        $el.find('.tab-content__close').click(function () {
            $(this).parent().parent().removeClass().addClass('tab-pane');
        });

        $el.find('.consulting').on('click', function () {
            var questionType = $(this).data('type');

            directOrOrder(questionType);
        });

        $el.find('.link_confirm').click(function (event) {

            $el.find('.popUp_sysErr').hide();
        });

        function directOrOrder(questionType) {
            // if ($el.find('#userId').val()) {
            //   startConsulting(questionType);
            // } else {
            // var coudeurl=encodeURIComponent('request?questionType='+questionType)
            window.top.location.href = 'baidusearch/authorize?questionType='
                + questionType
                + '&urlstring=mipilaw66baidu_request';
            // window.top.location.href = 'blank?questionType=' + questionType + '&channel=' + channel;
            // }
        }
        var tabHref;

        // function startConsulting(questionType) {

        //   $.ajax({
        //     url: 'greeting?questionType=' + questionType + '&_csrf=' + $('#_csrf').val(),
        //     type: 'POST',

        // success: function(data) {
        //   if (data === 'ERROR' || data === 'ERROR1') {
        //     $el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //     flg = 0;
        //     $el.find('.popUp_sysErr').show();
        //   } else if (data === 'ERROR2') {
        //     $el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //     flg = 0;
        //     $el.find('.popUp_unpaidErr').show();
        //   } else if (data === 'ERROR3') {
        //     $el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //     flg = 0;
        //     $el.find('.popUp_unFinishedBillErr').show();
        //   } else if (data === 'ERROR4') {
        //     // toastOr("您今日取消咨询已达3次，请明天再来");
        //     $el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //     flg = 0;
        //     alert('您今日取消咨询已达3次，请明天再来');
        //   } else {
        //     $el.find('#' + tabHref).removeClass().addClass('tab-pane');
        //     flg = 0;
        //     window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
        //   }
        // },
        // error: function() {

        //   // window.location.reload();
        // }
        //   });
        // }

        // 调用banner状态
        function bannerusernum() {

            $.ajax({
                type: 'GET',
                url: 'getOrderCount',
                dataType: 'json',
                success: function (a) {
                    //                  console.log(a);
                    var rvFlg = false;
                    if (!a) {
                        return;
                    }

                    var b;
                    if (a.RQ) {
                        b = a.RQ;

                        /*slogon部位内容start*/
                        var lawyerId = b.lawyerId;
                        var questionType = b.questionType;
                        var pathnamePage = location.pathname;
                        var timestamp3;

                        if (a.RV) {
                            rvFlg = true;
                            timestamp3 = a.RV.reservationTimeString;
                        }

                        if (pathnamePage.indexOf('articleNav') < 1) { // 首页加载视频时
                            var tempMoreHtml = '';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                                + '累计服务人数&nbsp;<i class="userTotalNum">'
                                + numtransform(b.countAll) + ' </i> 人</div></li>';
                            tempMoreHtml += '<li><div class="total_user">'
                                + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                                + '今日咨询人数&nbsp;<i class="userTodayNum">'
                                + numtransform(b.countToday) + ' </i> 人 </div></li>';
                            showSlogonMsg(tempMoreHtml, 2000);
                            //                          if (b.countAll && b.countToday && !b.payState && !rvFlg) { // 未咨询过、未预约过的用户
                            //                              var tempMoreHtml = '';
                            //                              tempMoreHtml += '<li><div class="total_user">'
                            //                                  + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                            //                                  + '累计服务人数&nbsp;<i class="userTotalNum">'
                            //                                  + numtransform(b.countAll) + ' </i> 人</div></li>';
                            //                              tempMoreHtml += '<li><div class="total_user">'
                            //                                  + '<mip-img src="tempbaidu/images/bab.png"></mip-img>'
                            //                                  + '今日咨询人数&nbsp;<i class="userTodayNum">'
                            //                                  + numtransform(b.countToday) + ' </i> 人 </div></li>';
                            //                              showSlogonMsg(tempMoreHtml, 2000);
                            //                          }
                            //                          else if (!b.payState && rvFlg) { // 未咨询过、有预约的用户
                            //                              var tempHtml = '<ul>';
                            //                              tempHtml += '<li><div class="tocheckreservation">您预约了'
                            //                                  + timestamp3
                            //                                  + '的咨询&nbsp;<p id="tocheckreservation">查看预约&nbsp;&#9658</p></div></li>';
                            //                              tempHtml += '</ul>';
                            //                              $el.find('.slogonMsg').addClass('slogonMsg_new');
                            //                              $el.find('.slogonMsg').html(tempHtml);
                            //                          }

                            //                          else {

                            if (b.payState === 6) { // 咨询过，欠费的用户
                                var tempHtml = '<ul>';
                                tempHtml += '<li><div class="topay">'
                                    + '<mip-img src="tempbaidu/images/paytipicon.png"></mip-img>'
                                    + '您有一个订单未支付<p id="topay">去支付</p></div></li>';
                                //                                  if (rvFlg) {
                                //                                      tempHtml += '<li><div class="tocheckreservation">您预约了'
                                //                                          + timestamp3
                                //                                          + '的咨询&nbsp;<p id="tocheckreservation">'
                                //                                          + '查看预约&nbsp;&#9658</p></div></li>';
                                //                                  }
                                tempHtml += '</ul>';
                                $el.find('.slogonMsg').addClass('slogonMsg_new');
                                //                                  if (rvFlg) {
                                //                                      showSlogonMsg(tempHtml, 4000);
                                //                                  }
                                //                                  else {
                                $el.find('.userinteractive, .headerbf').show();
                                $el.find('.userinteractive').html(tempHtml);
                                //                                  }
                                haveNoPaidOrder(b);
                            }

                            //                              else if (b.payState === 8) { // 咨询过、未欠费的用户
                            //                                  var a = +b.starLevle;
                            //                                  //                                  if (!a || a >= 3) {
                            //                                  //                                      var j = '';
                            //                                  //                                      var lawyerName;
                            //                                  //                                      if (b.name) {
                            //                                  //                                          j = b.name.substring(0, 1);
                            //                                  //                                          lawyerName = b.name.substring(0, 1);
                            //                                  //                                      }
                            //                                  //
                            //                                  //                                      var tempHtml = '<ul>';
                            //                                  //                                      tempHtml += '<li><div class="toask">'
                            //                                  //                                          + '<mip-img src="tempbaidu/images/bab.png"></mip-img>温馨提示：向上次咨询'
                            //                                  //                                          + j + '律师提问&nbsp;<p id="toask">继续问&nbsp;&#9658</p></div></li>';
                            //                                  //                                      if (rvFlg) {
                            //                                  //                                          tempHtml += '<li><div class="tocheckreservation">您预约了'
                            //                                  //                                              + timestamp3 + '的咨询&nbsp;<p id="tocheckreservation">'
                            //                                  //                                              + '查看预约&nbsp;&#9658</p></div></li>';
                            //                                  //                                      }
                            //                                  //
                            //                                  //                                      tempHtml += '</ul>';
                            //                                  //                                      $el.find('.slogonMsg').addClass('slogonMsg_new');
                            //                                  //                                      if (rvFlg) {
                            //                                  //                                          showSlogonMsg(tempHtml, 4000);
                            //                                  //                                      }
                            //                                  //                                      else {
                            //                                  //                                          $el.find('.slogonMsg').html(tempHtml);
                            //                                  //                                      }
                            //                                  //
                            //                                  //                                      var csrfToken = $el.find('#_csrf').val();
                            //                                  //                                      var askingType = '01';
                            //                                  //                                      var continueAskPage = 'index';
                            //                                  //                                      $el.find('#toask').click(function () {
                            //                                  //                                          $el.find('.loadingArea').show();
                            //                                  //                                          continueAskNew(b.lawyerId, b.questionType,
                            //                                  //                                              askingType, csrfToken, continueAskPage);
                            //                                  //                                      });
                            //                                  //                                  }
                            //                                  //                                  else {
                            //                                  var tempMoreHtml = '';
                            //                                  tempMoreHtml += '<li><div class="total_user">'
                            //                                      + '<mip-img  src="tempbaidu/images/bab.png"></mip-img >'
                            //                                      + '累计服务人数&nbsp;<i class="userTotalNum">'
                            //                                      + numtransform(b.countAll) + ' </i> 人 </div></li>';
                            //                                  tempMoreHtml += '<li><div class="total_user">'
                            //                                      + '<mip-img  src="tempbaidu/images/bab.png"></mip-img >'
                            //                                      + '今日咨询人数&nbsp;<i class="userTodayNum">'
                            //                                      + numtransform(b.countToday) + ' </i> 人</div></li>';
                            //                                  showSlogonMsg(tempMoreHtml, 2000);
                            //                                  //                                  }
                            //                              }
                            //                          }
                            $el.find('#tocheckreservation').click(function () {
                                checkReservationExpired();
                            });
                        }
                    }

                    /*slogon部位内容end*/
                },
                error: function (a) {
                    console.log('获取访问人数：' + a.countAll);
                }
            });
        }
        //  初始化首页价格
        $.ajax({
            url: 'getPrice?channel=' + $el.find('#channel').val(),
            type: 'GET',
            //          data: {
            //              channel:  $el.find('#channel').val()
            //          },
            success: function (data) {
                console.log(data);
                if (data.code === 200) {
                    $el.find('.indexPrice').text(data.result);
                    sessionStorage.setItem('productPrice', data.result);
                }

            },
            error: function (jqXHR) {
                if (jqXHR.status === 403) {
                    window.reload();
                }

            }
        });
        //
        var agreeImgSrc = $el.find('.radio-rule').find('img').attr('src');

        $el.find('.tab-content__close').on('click', function () {
            $(this).parent().parent().removeClass().addClass('tab-pane');
            flg = 0;
        });
        $el.find('.media').on('click', function (event) {
            console.log($(this).data('href'));
            tabHref = $(this).data('href');
            $el.find('#' + $(this).data('href')).removeClass().addClass('tab-pane active');
            flg = 1;
            event.preventDefault();
        });

        /*新版操作end*/
        document.addEventListener('touchmove', function (event) { // 监听滚动事件
            if (flg === 1) { // 判断是遮罩显示时执行，禁止滚屏
                event.preventDefault(); // 最关键的一句，禁止浏览器默认行为
            }

        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUp_err').hide();
        });

        function showSlogonMsg(tempMoreHtml, delayTime) {
            var tempHtml = '<ul  id="slogonMsgId">';
            tempHtml += tempMoreHtml;
            tempHtml += '</ul>';
            $el.find('.slogonMsg').html(tempHtml);
            startmarquee(20, 2000);
        }
        // 上下轮播
        function startmarquee(speed, delay) {
            var lineH = $el.find('#slogonMsgId li').eq(0).height(); // 获取行高
            var p = false;
            var t;
            var o = document.getElementById('slogonMsgId');
            if (!o) {
                return;
            }

            o.innerHTML += o.innerHTML;
            o.style.marginTop = 0;

            function start() {
                t = setInterval(scrolling, speed);
                if (!p) {
                    o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
                }
            }

            function scrolling() {
                if (parseInt(o.style.marginTop, 10) % lineH !== 0) {
                    o.style.marginTop = parseInt(o.style.marginTop, 10) - 1 + 'px';
                    if (Math.abs(parseInt(o.style.marginTop, 10)) >= o.scrollHeight / 2) {
                        o.style.marginTop = 0;
                    }
                }
                else {
                    clearInterval(t);
                    setTimeout(start, delay);
                }
            }
            setTimeout(start, delay);
        }

        // 开始咨询调用接口
        function startConsulting(questionType) {
            $.ajax({
                url: 'greeting?questionType=' + questionType + '&_csrf=' + $el.find('#_csrf').val(),
                type: 'POST',

                success: function (data) {

                    if (data === 'ERROR' || data === 'ERROR1') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUp_sysErr').show();
                    }
                    else if (data === 'ERROR2') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUp_unpaidErr').show();
                    }
                    else if (data === 'ERROR3') {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        $el.find('.popUp_unFinishedBillErr').show();
                    }
                    else if (data === 'ERROR4') {
                        // toastOr("您今日取消咨询已达3次，请明天再来");
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        alert('您今日取消咨询已达3次，请明天再来');
                    }
                    else {
                        $el.find('#' + tabHref).removeClass().addClass('tab-pane');
                        flg = 0;
                        window.top.location.href = 'mipilaw66baidu_request?data='
                            + data + '&questionType=' + questionType;
                    }
                },
                error: function () {
                    window.location.reload();
                }
            });
        }
        // 预约咨询
        function checkReservationExpired() {
            $.ajax({
                type: 'GET',
                url: 'reservation/findRequestReservationByUserId',
                success: function (data) {
                    console.log(data);
                    if (data.info) {
                        window.top.location.href = 'mipilaw66baidu_myreservation';
                    }
                    else {
                        toastOr(data.message);
                    }
                },
                error: function (a) {
                    alert('系统异常，请稍后再试');
                    window.location.reload();
                }
            });
        }

        function numtransform(str) {
            var newStr = new Array(str.length + parseInt(str.length / 3, 10));
            var strArray = str.split('');
            newStr[newStr.length - 1] = strArray[strArray.length - 1];
            var currentIndex = strArray.length - 1;
            for (var index = newStr.length - 1; index >= 0; index--) {
                if ((newStr.length - index) % 4 === 0) {
                    newStr[index] = ',';
                }
                else {
                    newStr[index] = strArray[currentIndex--];
                }
            }
            var numafter = newStr.join('');
            if (numafter.indexOf(',') === 0) {
                numafter = numafter.substring(1, numafter.length);
            }

            return numafter;
        }

        $el.find('.link_btn_sysErrConfirm').click(function () {
            $el.find('.popUp_sysErr').hide();
        });

        $el.find('.link_btn_unFinishedBillErrConfirm').click(function () {
            $el.find('.popUp_unFinishedBillErr').hide();
        });

        $el.find('.link_btn_unpaidErrConfirm').click(function () {
            //   window.top.location.href = 'orderlist';

            $el.find('.popUp_unpaidErr').hide();
        });

        $el.find('.link_btn_uncheckErrConfirm').click(function () {
            $el.find('.popUp_uncheckErr').hide();
            $el.find('.popUp_confirm').hide();
        });

        /*暂挪去支付继续问弹窗*/

        // 希望重试
        $el.find('#still_reAsk').click(function () {
            $el.find('.popUp_confirm').hide();
            $el.find('.loadingArea').show();
            continueAsk2(lawyerId, questionType, '01', $el.find('#_csrf').val());
        });
        // 咨询其他律师时
        $el.find('.link_others').click(function () {
            $el.find('.popUp_confirm').hide();
            startConsulting(questionType);
        });

        // function startConsulting(questionType, csrfToken, lawyerId) {
        //   $.ajax({
        //     type: 'POST',
        //     //              data: {
        //     //                  questionType: questionType,
        //     //                  _csrf: csrfToken
        //     //              },
        //     url: 'greeting?questionType=' + questionType + '&_csrf=' + csrfToken,
        //     success: function(data) {
        //       if (data === 'ERROR' || data === 'ERROR1') {
        //         $el.find('#err_msg').html('系统异常，请返回重新咨询');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else if (data === 'ERROR2') {
        //         $el.find('#err_msg').html('您有订单未支付，请支付后再咨询');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else if (data === 'ERROR3') {
        //         $el.find('#err_msg').html('您有订单未结束，请等待1分钟后再试');
        //         $el.find('.popUp_sysErr').fadeIn();
        //       } else {
        //         if (lawyerId) {
        //           window.top.location.href = 'request?data=' + data + '&questionType=' + questionType + '&lawyerId=' + lawyerId;
        //         } else {

        //           window.top.location.href = 'request?data=' + data + '&questionType=' + questionType;
        //         }
        //       }
        //     },
        //     error: function(jqXHR) {
        //       if (jqXHR.status === 403) {
        //         window.location.reload();
        //       }

        //     }
        //   });
        // }

        // 继续问---通知律师跳转到request页面（开始咨询；confirmTel页）
        function continueAsk(lawyerId, questionType, askingType, csrfToken) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    if (id !== '') {
                        window.top.location.href = 'mipilaw66baidu_request?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId;
                    }
                    else {
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
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
                url: 'continueAsk?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken,
                dataType: 'json',
                success: function (data) {
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    if (id !== '') {
                        // 传入lawyerId
                        window.top.location.href = 'mipilaw66baidu_informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId;
                    }
                    else {
                        $el.find('.loadingArea').hide();
                        if (state === 1) {
                            // 点击继续问，b律师正在服务中,设为true
                            flg = true;
                            $el.find('.popUp_confirm').fadeIn();
                            $el.find('#still_reAsk').attr('lawyerId', lawyerId);
                        }
                        else {
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

        // continueAsk2 更改为 continueAskNew
        function continueAskNew(lawyerId, questionType, askingType, csrfToken, continueAskPage) {
            $.ajax({
                async: true,
                type: 'POST',
                url: 'continueAskV3?lawyerId=' + lawyerId + '&questionType='
                    + questionType + '&_csrf=' + csrfToken + '&continueAskPage=' + continueAskPage,
                dataType: 'json',
                success: function (data) {
                    console.log('继续问2', data);
                    $el.find('.loadingArea').hide();
                    var id = data.data;
                    var state = data.state;
                    localStorage.setItem('reAskAvatar', data.avatar);
                    localStorage.setItem('reAskName', data.lawyerName);
                    localStorage.setItem('reAskSex', data.sex);
                    localStorage.setItem('lawyerField', data.lawyerField);
                    localStorage.setItem('goodCommentRate', data.goodCommentRate);
                    if (id !== '') {
                        // 传入lawyerId
                        window.top.location.href = 'mipilaw66baidu_informLawyer?data='
                            + id + '&questionType=' + questionType + '&askingType='
                            + askingType + '&lawyerId=' + lawyerId + '&PABackJumpFlg=index';
                    }
                    else {
                        if (state === 1 || state === 2) { // 1.律师正在服务中 2.律师已下线
                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                            var title = '温馨提示';
                            var main = data.error + '，您可以稍后继续问，或由系统推荐其他律师';
                            var yes = '立刻推荐其他律师';
                            var no = '稍后继续问';
                            backOr(title, main, yes, no, function () {
                                startConsulting(questionType);
                            }, function () {
                                $.ajax({
                                    url: 'createContinueAskLater?lawyerId='
                                        + lawyerId + '&questionType=' + questionType
                                        + '&_csrf=' + csrfToken,
                                    type: 'POST',
                                    //                                  data: {
                                    //                                      lawyerId: lawyerId,
                                    //                                      questionType: questionType,
                                    //                                      _csrf: csrfToken
                                    //                                  },
                                    success: function (data) {
                                        if (data === 'ERROR') {
                                            alert('系统异常');
                                        }
                                        else {
                                            console.log(data);
                                        }
                                    },
                                    error: function (jqXHR) {
                                        if (jqXHR.status === 403) {
                                            window.location.reload();
                                        }

                                    }
                                });
                            });
                        }
                        else {
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

    };

    return customElement;
});
